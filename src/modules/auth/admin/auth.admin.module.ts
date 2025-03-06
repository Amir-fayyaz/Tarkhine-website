import { Module } from '@nestjs/common';
import { AuthAdminController } from './auth.admin.controller';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminFactory } from './auth.admin.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { config } from 'dotenv';

config();

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, AuthAdminFactory, JwtService],
})
export class AuthAdminModule {}
/*
JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_DEV_EXPIRE,
      },
    }),
*/
