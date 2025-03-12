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

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, AdminEntity])],
  controllers: [CategoryAdminController],
  providers: [
    CategoryAdminService,
    SubCategoryFactory,
    AuthAdminFactory,
    AuthAdminService,
    JwtService,
  ],
})
export class CategoryAdminModule {}
