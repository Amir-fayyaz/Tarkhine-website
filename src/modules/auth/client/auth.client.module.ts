import { Module } from '@nestjs/common';
import { AuthAppController } from './auth.client.controller';
import { AuthAppService } from './auth.client.service';
import { AuthAppFactory } from './auth.client.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from '../entities/otp.entity';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { config } from 'dotenv';
config();

const { JWT_SECRET, JWT_DEV_EXPIRE } = process.env;
console.log(JWT_DEV_EXPIRE, JWT_SECRET);
@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity, UserEntity])],
  controllers: [AuthAppController],
  providers: [AuthAppService, AuthAppFactory, UserAppService, JwtService],
})
export class AuthAppModule {}
