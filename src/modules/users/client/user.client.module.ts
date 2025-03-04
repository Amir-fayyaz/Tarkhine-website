import { Module } from '@nestjs/common';
import { UserAppController } from './user.client.controller';
import { UserAppService } from './user.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserAppController],
  providers: [UserAppService],
})
export class UserAppModule {}
