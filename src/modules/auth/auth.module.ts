import { Module } from '@nestjs/common';
import { AuthAdminModule } from './admin/auth.admin.module';
import { AuthAppModule } from './client/auth.client.module';
import { JwtModule } from '@nestjs/jwt';

import { config } from 'dotenv';
config();

const { JWT_SECRET, JWT_DEV_EXPIRE } = process.env;
@Module({
  imports: [
    AuthAdminModule,
    AuthAppModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_DEV_EXPIRE,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
