import { Module } from '@nestjs/common';
import { PaymentAppModule } from './client/payment.client.module';
import { PaymentAdminModule } from './admin/payment.admin.module';

@Module({
  imports: [PaymentAppModule, PaymentAdminModule],
  controllers: [],
  providers: [],
})
export class PaymentModule {}
