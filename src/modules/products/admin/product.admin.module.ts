import { Module } from '@nestjs/common';
import { ProductAdminController } from './controllers/product.admin.controller';
import { ProductAdminService } from './services/product.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthAdminFactory } from 'src/modules/auth/admin/auth.admin.factory';
import { AuthAdminService } from 'src/modules/auth/admin/auth.admin.service';
import { AdminEntity } from 'src/modules/auth/entities/admin.entity';
import { CategoryAdminService } from 'src/modules/category/admin/services/category.admin.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { ImageService } from 'src/modules/image/image.service';
import { SubCategoryAdminService } from 'src/modules/category/admin/services/subCategory.admin.service';
import { SubCategoryEntity } from 'src/modules/category/entities/subCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      AdminEntity,
      CategoryEntity,
      SubCategoryEntity,
    ]),
  ],
  controllers: [ProductAdminController],
  providers: [
    ProductAdminService,
    JwtService,
    AuthAdminFactory,
    AuthAdminService,
    CategoryAdminService,
    SubCategoryAdminService,
    ImageService,
  ],
})
export class ProductAdminModule {}
