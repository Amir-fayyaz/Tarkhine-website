import { Module } from '@nestjs/common';
import { AuthAdminModule } from './admin/auth.admin.module';
import { AuthAppModule } from './client/auth.client.module';

@Module({
  imports: [AuthAdminModule, AuthAppModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
