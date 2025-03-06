import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

import { config } from 'dotenv';

config();

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly Admin_Repository: Repository<AdminEntity>,
    private readonly JwtService: JwtService,
  ) {}

  // private methods
  private async ComparePassword(password: string, hashedPassword: string) {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatch) throw new BadRequestException('Wrong password');
  }

  private async FindAdmin(email: string) {
    return await this.Admin_Repository.findOne({
      where: {
        email,
      },
    });
  }

  // public methods

  public async login(data: LoginDto) {
    const admin = await this.FindAdmin(data.email);

    if (!admin) {
      throw new NotFoundException('There is no admin with this email');
    }

    await this.ComparePassword(data.password, admin.password);
    return await this.JwtService.signAsync(
      {
        email: data.email,
        adminId: admin.id,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
  }
}
