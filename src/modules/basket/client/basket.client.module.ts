import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketEntity } from '../entities/basket.entity';
import { BasketAppController } from './controllers/basket.client.controller';
import { BasketAppService } from './services/basket.client.service';
import { AuthAppFactory } from 'src/modules/auth/client/auth.client.factory';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { ProductAdminService } from 'src/modules/products/admin/services/product.admin.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { CategoryAdminService } from 'src/modules/category/admin/services/category.admin.service';
import { SubCategoryEntity } from 'src/modules/category/entities/subCategory.entity';
import { SubCategoryAdminService } from 'src/modules/category/admin/services/subCategory.admin.service';
import { S3Service } from 'src/modules/image/image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BasketEntity,
      UserEntity,
      ProductEntity,
      CategoryEntity,
      SubCategoryEntity,
    ]),
  ],
  controllers: [BasketAppController],
  providers: [
    BasketAppService,
    AuthAppFactory,
    UserAppService,
    JwtService,
    ProductAdminService,
    CategoryAdminService,
    SubCategoryAdminService,
    S3Service,
  ],
})
export class BasketAppModule {}
