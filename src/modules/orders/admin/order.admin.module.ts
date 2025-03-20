import { Module } from '@nestjs/common';
import { OrderAdminController } from './controllers/order.admin.controller';
import { OrderAdminService } from './services/order.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderAdminController],
  providers: [OrderAdminService],
})
export class OrderAdminModule {}
