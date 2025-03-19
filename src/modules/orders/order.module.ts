import { Module } from '@nestjs/common';
import { OrderAdminModule } from './admin/order.admin.module';
import { OrderAppModule } from './client/order.client.module';

@Module({
  imports: [OrderAdminModule, OrderAppModule],
  controllers: [],
  providers: [],
})
export class OrderModule {}
