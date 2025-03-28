import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigs } from './common/configs/typeorm.config';
import { CategoryModule } from './modules/category/category.module';
import { ImageModule } from './modules/image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { StaticServeOptions } from './common/configs/StaticServe.config';
import { ProductModule } from './modules/products/product.module';
import { BasketModule } from './modules/basket/basket.module';
import { OrderModule } from './modules/orders/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { UserModule } from './modules/users/user.module';
import { IntializeSuperAdminService } from './common/services/admin/create-superAdmin.service';
import { AdminEntity } from './modules/auth/entities/admin.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot(StaticServeOptions),
    TypeOrmModule.forRoot(TypeOrmConfigs),
    TypeOrmModule.forFeature([AdminEntity]),
    AuthModule,
    CategoryModule,
    ImageModule,
    ProductModule,
    BasketModule,
    OrderModule,
    PaymentModule,
    UserModule,
  ],
  controllers: [],
  providers: [IntializeSuperAdminService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly InitializeSuperAdminService: IntializeSuperAdminService,
  ) {}
  async onApplicationBootstrap() {
    await this.InitializeSuperAdminService.createSuperAdmin();
  }
}
