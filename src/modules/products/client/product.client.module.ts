import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductAppController } from './controllers/product.client.controller';
import { AuthAppFactory } from 'src/modules/auth/client/auth.client.factory';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ProductAppService } from './services/product.client.service';
import { LikeEntity } from '../entities/like.entity';
import { LikeAppController } from './controllers/like.client.controller';
import { LikeAppService } from './services/like.client.service';
import { ProductAdminService } from '../admin/services/product.admin.service';
import { CategoryAdminService } from 'src/modules/category/admin/services/category.admin.service';
import { SubCategoryAdminService } from 'src/modules/category/admin/services/subCategory.admin.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { SubCategoryEntity } from 'src/modules/category/entities/subCategory.entity';
import { StarAppService } from './services/star.client.service';
import { StarAppController } from './controllers/star.client.controller';
import { StarEntity } from '../entities/stars.entity';
import { UserCouponAppController } from './controllers/user-coupon.client.controller';
import { UserCouponAppService } from './services/user-coupon.client.service';
import { UserCouponEntity } from '../entities/user_coupon.entity';
import { S3Service } from 'src/modules/image/image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      UserEntity,
      LikeEntity,
      CategoryEntity,
      SubCategoryEntity,
      StarEntity,
      UserCouponEntity,
    ]),
  ],
  controllers: [
    ProductAppController,
    LikeAppController,
    StarAppController,
    UserCouponAppController,
  ],
  providers: [
    AuthAppFactory,
    UserAppService,
    JwtService,
    ProductAppService,
    LikeAppService,
    ProductAdminService,
    CategoryAdminService,
    SubCategoryAdminService,
    S3Service,
    StarAppService,
    UserCouponAppService,
  ],
})
export class ProductAppModule {}
