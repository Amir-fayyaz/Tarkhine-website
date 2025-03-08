import { Module } from '@nestjs/common';
import { SubCategoryAdminController } from './controllers/subCategory.admin.controller';
import { CategoryAdminController } from './controllers/category.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryEntity } from '../entities/subCategory.entity';
import { CategoryEntity } from '../entities/category.entity';
import { SubCategoryAdminService } from './services/subCategory.admin.service';
import { CategoryAdminService } from './services/category.admin.service';
import { SubCategoryFactory } from '../subCategory.factory';
import { AuthAdminFactory } from 'src/modules/auth/admin/auth.admin.factory';
import { AuthAdminService } from 'src/modules/auth/admin/auth.admin.service';
import { AdminEntity } from 'src/modules/auth/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubCategoryEntity, CategoryEntity, AdminEntity]),
  ],
  controllers: [SubCategoryAdminController, CategoryAdminController],
  providers: [
    SubCategoryAdminService,
    CategoryAdminService,
    SubCategoryFactory,
    AuthAdminFactory,
    AuthAdminService,
    JwtService,
  ],
})
export class CategoryAdminModule {}
