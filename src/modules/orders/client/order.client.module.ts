import { Module } from '@nestjs/common';
import { OrderAppController } from './controllers/order.client.controller';
import { OrderAppService } from './services/order.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderAppController],
  providers: [OrderAppService],
})
export class OrderAppModule {}
