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
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { throttlerOptions } from './common/configs/Throttler.config';
import { APP_GUARD } from '@nestjs/core';
import { RemoveExpireOtpService } from './common/services/clean-otp/clean-otp.service';
import { OtpEntity } from './modules/auth/entities/otp.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot(StaticServeOptions),
    TypeOrmModule.forRoot(TypeOrmConfigs),
    TypeOrmModule.forFeature([AdminEntity, OtpEntity]),
    ThrottlerModule.forRoot({
      throttlers: [throttlerOptions],
      errorMessage: 'Too many request , wait for seconds',
    }),
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
  providers: [
    RemoveExpireOtpService,
    IntializeSuperAdminService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly InitializeSuperAdminService: IntializeSuperAdminService,
  ) {}
  async onApplicationBootstrap() {
    await this.InitializeSuperAdminService.createSuperAdmin();
  }
}
