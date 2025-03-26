import { Module } from '@nestjs/common';
import { UserAppController } from './user.client.controller';
import { UserAppService } from './user.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthAppFactory } from 'src/modules/auth/client/auth.client.factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserAppController],
  providers: [UserAppService, AuthAppFactory, JwtService],
})
export class UserAppModule {}
