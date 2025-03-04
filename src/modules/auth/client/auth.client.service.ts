import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from '../entities/otp.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { generateCode } from 'src/common/types/generateCode.type';
import { SignInDto } from './dto/signIn.dto';
import { AuthAppFactory } from './auth.client.factory';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

@Injectable()
export class AuthAppService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly OtpRepository: Repository<OtpEntity>,
    private readonly AuthAppFactory: AuthAppFactory,
    private readonly JwtService: JwtService,
  ) {}

  // private methods
  private async CheckExpire(otp: OtpEntity) {
    return otp.expireAt < new Date(Date.now());
  }

  private async CheckRateForCreateOtp(mobile: string) {
    const otp = await this.OtpRepository.findOne({
      where: {
        mobile,
      },
      order: { createdAt: 'DESC' },
    });

    if (otp) {
      const RateResult = await this.CheckExpire(otp);

      if (!RateResult) {
        throw new HttpException(
          'Too many request for otp',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    }
  }

  private async DeleteOtp(otp: OtpEntity) {
    return await this.OtpRepository.delete({
      mobile: otp.mobile,
      code: otp.code,
    });
  }

  private async ValidateOtp(mobile: string, otpCode: string) {
    const otp = await this.OtpRepository.findOne({
      where: {
        mobile,
      },
      order: { createdAt: 'DESC' },
    });

    if (!otp) {
      throw new NotFoundException('There is no otp for this Mobile-number');
    }

    const isMatch = await bcrypt.compare(otpCode, otp.code);

    if (!isMatch) {
      throw new BadRequestException('Wrong otp for this mobile-number');
    }

    return otp;
  }

  private async generateOtp(): Promise<generateCode> {
    const otpCode = randomInt(10000, 99999).toString();
    const hashedOtpCode = await bcrypt.hash(otpCode, 10);

    return {
      otp: otpCode,
      hashedOtp: hashedOtpCode,
    };
  }

  // public methods

  public async createOtp(mobile: string) {
    await this.CheckRateForCreateOtp(mobile);

    const newOtpCode = await this.generateOtp();

    const newOtp = await this.OtpRepository.create({
      mobile,
      code: newOtpCode.hashedOtp,
    });

    await this.OtpRepository.save(newOtp);

    return newOtpCode.otp;
  }

  public async VerifyOtp(data: SignInDto) {
    const otp = await this.ValidateOtp(data.mobile, data.otpCode);

    const exprireResult = await this.CheckExpire(otp);

    if (exprireResult) {
      throw new BadRequestException('Otp has expired');
    }

    await this.DeleteOtp(otp);
  }

  public async getUser(data: SignInDto) {
    const user = await this.AuthAppFactory.FindUserByMobile(data.mobile);

    if (user) {
      return await this.JwtService.signAsync(
        {
          userId: user.id,
          mobile: user.mobile,
        },
        {
          secret: process.env.JWT_SECRET,
        },
      );
    } else {
      const newUser = await this.AuthAppFactory.CreateUser({
        mobile: data.mobile,
      });

      return await this.JwtService.signAsync(
        {
          userId: newUser.id,
          mobile: newUser.mobile,
        },
        {
          secret: process.env.JWT_SECRET,
        },
      );
    }
  }
}
