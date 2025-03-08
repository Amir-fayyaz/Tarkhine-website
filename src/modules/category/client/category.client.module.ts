import { Module } from '@nestjs/common';
import { CategoryAppController } from './controllers/category.client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { SubCategoryEntity } from '../entities/subCategory.entity';
import { CategoryAppService } from './services/category.client.service';
import { SubCategoryAppController } from './controllers/subCategory.client.controller';
import { SubCategoryAppService } from './services/subCategory.client.service';
import { AuthAppFactory } from 'src/modules/auth/client/auth.client.factory';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, SubCategoryEntity, UserEntity]),
  ],
  controllers: [CategoryAppController, SubCategoryAppController],
  providers: [
    CategoryAppService,
    SubCategoryAppService,
    AuthAppFactory,
    UserAppService,
    JwtService,
  ],
})
export class CategoryAppModule {}
