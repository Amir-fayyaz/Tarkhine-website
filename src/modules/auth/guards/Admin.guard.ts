import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { config } from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { AuthAdminFactory } from '../admin/auth.admin.factory';

config();

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly AuthFactory: AuthAdminFactory,
  ) {}
  // logic
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

      if (!paylod.email) {
        throw new UnauthorizedException('Access denied , You are not admin');
      }

      const admin = await this.AuthFactory.FindAdmin(paylod.email as string);

      if (!admin) {
        throw new UnauthorizedException('There is no admin with this email');
      }

      request.admin = admin;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
