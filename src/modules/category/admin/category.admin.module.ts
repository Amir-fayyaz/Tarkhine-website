import { Module } from '@nestjs/common';
import { SubCategoryAdminController } from './controllers/subCategory.admin.controller';
import { CategoryAdminController } from './controllers/category.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryEntity } from '../entities/subCategory.entity';
import { CategoryEntity } from '../entities/category.entity';
import { SubCategoryAdminService } from './services/subCategory.admin.service';
import { CategoryAdminService } from './services/category.admin.service';
import { SubCategoryFactory } from '../subCategory.factory';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity, CategoryEntity])],
  controllers: [SubCategoryAdminController, CategoryAdminController],
  providers: [
    SubCategoryAdminService,
    CategoryAdminService,
    SubCategoryFactory,
  ],
})
export class CategoryAdminModule {}
