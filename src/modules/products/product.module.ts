import { Module } from '@nestjs/common';
import { ProductAdminModule } from './admin/product.admin.module';
import { ProductAppModule } from './client/product.client.module';

@Module({
  imports: [ProductAdminModule, ProductAppModule],
  controllers: [],
  providers: [],
})
export class ProductModule {}
