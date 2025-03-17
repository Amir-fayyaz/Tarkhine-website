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
import { UserCouponAdminController } from './controllers/user-coupon.admin.controller';
import { UserCouponAdminService } from './services/user-coupon.admin.service';
import { UserCouponEntity } from '../entities/user_coupon.entity';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { GlobalCouponAdminController } from './controllers/global-coupon.admin.controller';
import { GlobalCouponAdminService } from './services/global-coupon.admin.service';
import { GlobalCouponEntity } from '../entities/global_coupon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      AdminEntity,
      CategoryEntity,
      SubCategoryEntity,
      UserCouponEntity,
      UserEntity,
      GlobalCouponEntity,
    ]),
  ],
  controllers: [
    ProductAdminController,
    UserCouponAdminController,
    GlobalCouponAdminController,
  ],
  providers: [
    ProductAdminService,
    JwtService,
    AuthAdminFactory,
    AuthAdminService,
    CategoryAdminService,
    SubCategoryAdminService,
    ImageService,
    UserCouponAdminService,
    UserAppService,
    GlobalCouponAdminService,
  ],
})
export class ProductAdminModule {}
