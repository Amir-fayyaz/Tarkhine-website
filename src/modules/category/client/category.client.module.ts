import { Module } from '@nestjs/common';
import { CategoryAppController } from './controllers/category.client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryAppService } from './services/category.client.service';
import { AuthAppFactory } from 'src/modules/auth/client/auth.client.factory';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, UserEntity])],
  controllers: [CategoryAppController],
  providers: [CategoryAppService, AuthAppFactory, UserAppService, JwtService],
})
export class CategoryAppModule {}
