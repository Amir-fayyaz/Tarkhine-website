import { Module } from '@nestjs/common';
import { CategoryAdminController } from './controllers/category.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryAdminService } from './services/category.admin.service';
import { SubCategoryFactory } from '../subCategory.factory';
import { AuthAdminFactory } from 'src/modules/auth/admin/auth.admin.factory';
import { AuthAdminService } from 'src/modules/auth/admin/auth.admin.service';
import { AdminEntity } from 'src/modules/auth/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { SubCategoryAdminController } from './controllers/subCategory.admin.controller';
import { SubCategoryEntity } from '../entities/subCategory.entity';
import { SubCategoryAdminService } from './services/subCategory.admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, AdminEntity, SubCategoryEntity]),
  ],
  controllers: [CategoryAdminController, SubCategoryAdminController],
  providers: [
    CategoryAdminService,
    SubCategoryFactory,
    AuthAdminFactory,
    AuthAdminService,
    JwtService,
    SubCategoryAdminService,
  ],
})
export class CategoryAdminModule {}
