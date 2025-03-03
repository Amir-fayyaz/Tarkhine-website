import { Module } from '@nestjs/common';
import { AuthAdminController } from './auth.admin.controller';
import { AuthAdminService } from './auth.admin.service';
import { AuthAdminFactory } from './auth.admin.factory';

@Module({
  imports: [],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, AuthAdminFactory],
})
export class AuthAdminModule {}
