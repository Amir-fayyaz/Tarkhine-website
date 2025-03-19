import { Module } from '@nestjs/common';
import { BasketAppModule } from './client/basket.client.module';
import { BasketAdminModule } from './admin/basket.admin.module';

@Module({
  imports: [BasketAppModule, BasketAdminModule],
  controllers: [],
  providers: [],
})
export class BasketModule {}
