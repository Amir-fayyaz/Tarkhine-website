import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import { AdminEntity } from 'src/modules/auth/entities/admin.entity';
import { OtpEntity } from 'src/modules/auth/entities/otp.entity';
import { BasketEntity } from 'src/modules/basket/entities/basket.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { SubCategoryEntity } from 'src/modules/category/entities/subCategory.entity';
import { AddressEntity } from 'src/modules/orders/entities/address.entity';
import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import { PaymentEntity } from 'src/modules/payment/entities/payment.entity';
import { GlobalCouponEntity } from 'src/modules/products/entities/global_coupon.entity';
import { LikeEntity } from 'src/modules/products/entities/like.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { StarEntity } from 'src/modules/products/entities/stars.entity';
import { UserCouponEntity } from 'src/modules/products/entities/user_coupon.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
config();

const { DB_USERNAME, DB_PASSWORD, DB_PORT, DB_HOST, DB_DATABASE } = process.env;
export const TypeOrmConfigs: TypeOrmModuleOptions = {
  type: 'mysql',
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  database: DB_DATABASE,
  host: DB_HOST,
  entities: [
    OtpEntity,
    UserEntity,
    AdminEntity,
    CategoryEntity,
    ProductEntity,
    LikeEntity,
    SubCategoryEntity,
    StarEntity,
    GlobalCouponEntity,
    UserCouponEntity,
    BasketEntity,
    OrderEntity,
    AddressEntity,
    PaymentEntity,
  ],
  synchronize: true,
};
