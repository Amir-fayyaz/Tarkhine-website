import { Module } from '@nestjs/common';
import { AuthAdminModule } from './admin/auth.admin.module';
import { AuthAppModule } from './client/auth.client.module';
import { JwtModule } from '@nestjs/jwt';

import { config } from 'dotenv';
config();

@Module({
  imports: [
    AuthAdminModule,
    AuthAppModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_DEV_EXPIRE,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
