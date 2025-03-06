import { Module } from '@nestjs/common';
import { CategoryAppController } from './controllers/category.client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { SubCategoryEntity } from '../entities/subCategory.entity';
import { CategoryAppService } from './services/category.client.service';
import { SubCategoryAppController } from './controllers/subCategory.client.controller';
import { SubCategoryAppService } from './services/subCategory.client.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, SubCategoryEntity])],
  controllers: [CategoryAppController, SubCategoryAppController],
  providers: [CategoryAppService, SubCategoryAppService],
})
export class CategoryAppModule {}
