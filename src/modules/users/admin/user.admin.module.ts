import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserAdminController } from './user.admin.controller';
import { UserAdminService } from './user.admin.service';
import { JwtService } from '@nestjs/jwt';
import { AuthAdminFactory } from 'src/modules/auth/admin/auth.admin.factory';
import { AuthAdminService } from 'src/modules/auth/admin/auth.admin.service';
import { AdminEntity } from 'src/modules/auth/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AdminEntity])],
  controllers: [UserAdminController],
  providers: [UserAdminService, JwtService, AuthAdminFactory, AuthAdminService],
})
export class UserAdminModule {}
