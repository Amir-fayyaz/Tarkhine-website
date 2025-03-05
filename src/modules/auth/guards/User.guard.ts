import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthAppFactory } from '../client/auth.client.factory';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly AuthFactory: AuthAppFactory,
    private readonly JwtService: JwtService,
  ) {}

  //logic
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer')
    ) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = request.headers.authorization.split(' ')[1];

    try {
      const paylod = this.JwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!paylod.mobile) {
        throw new UnauthorizedException('Access denied , You are not user');
      }

      const user = await this.AuthFactory.FindUserByMobile(paylod.mobile);

      if (!user) {
        throw new UnauthorizedException(
          'Acess denied , There is no user with this mobile-number',
        );
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
