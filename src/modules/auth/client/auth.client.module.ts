import { Module } from '@nestjs/common';
import { AuthAppController } from './auth.client.controller';
import { AuthAppService } from './auth.client.service';
import { AuthAppFactory } from './auth.client.factory';

@Module({
  imports: [],
  controllers: [AuthAppController],
  providers: [AuthAppService, AuthAppFactory],
})
export class AuthAppModule {}
