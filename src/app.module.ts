import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ServeStaticModule.forRoot(StaticServeOptions),
    TypeOrmModule.forRoot(TypeOrmConfigs),
    AuthModule,
    CategoryModule,
    ImageModule,
    ProductModule,
    BasketModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
