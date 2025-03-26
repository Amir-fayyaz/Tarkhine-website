import { Module } from '@nestjs/common';
import { UserAppModule } from './client/user.client.module';
import { UserAdminModule } from './admin/user.admin.module';

@Module({
  imports: [UserAppModule, UserAdminModule],
  controllers: [],
  providers: [],
})
export class UserModule {}
