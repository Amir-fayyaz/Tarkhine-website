import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from '../entities/like.entity';
import { ProductAdminService } from '../admin/services/product.admin.service';
import { ProductEntity } from '../entities/product.entity';
import { ProductAdminFactory } from '../admin/product.admin.factory';
import { ImageService } from 'src/modules/image/image.service';
import { CategoryAdminService } from 'src/modules/category/admin/services/category.admin.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { SubCategoryAdminService } from 'src/modules/category/admin/services/subCategory.admin.service';
import { SubCategoryEntity } from 'src/modules/category/entities/subCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LikeEntity,
      ProductEntity,
      CategoryEntity,
      SubCategoryEntity,
    ]),
  ],
  controllers: [],
  providers: [
    ProductAdminService,
    ProductAdminFactory,
    ImageService,
    CategoryAdminService,
    SubCategoryAdminService,
  ],
})
export class ProductAppModule {}
