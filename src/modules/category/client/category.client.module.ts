import { Module } from '@nestjs/common';
import { CategoryAppController } from './controllers/category.client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryAppService } from './services/category.client.service';
import { AuthAppFactory } from 'src/modules/auth/client/auth.client.factory';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SubCategoryAppController } from './controllers/subCategory.client.controller';
import { SubCategoryAppService } from './services/subCategory.client.service';
import { SubCategoryEntity } from '../entities/subCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, UserEntity, SubCategoryEntity]),
  ],
  controllers: [CategoryAppController, SubCategoryAppController],
  providers: [
    CategoryAppService,
    AuthAppFactory,
    UserAppService,
    JwtService,
    SubCategoryAppService,
  ],
})
export class CategoryAppModule {}
