import { Module } from '@nestjs/common';
import { LikeAppController } from './controllers/like.client.controller';
import { LikeAppService } from './services/like.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from '../entities/like.entity';
import { ProductAdminService } from '../admin/services/product.admin.service';
import { ProductEntity } from '../entities/product.entity';
import { ProductAdminFactory } from '../admin/product.admin.factory';
import { ImageService } from 'src/modules/image/image.service';
import { CategoryAdminService } from 'src/modules/category/admin/services/category.admin.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity, ProductEntity, CategoryEntity]),
  ],
  controllers: [LikeAppController],
  providers: [
    LikeAppService,
    ProductAdminService,
    ProductAdminFactory,
    ImageService,
    CategoryAdminService,
  ],
})
export class ProductAppModule {}
