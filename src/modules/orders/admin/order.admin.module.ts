import { Module } from '@nestjs/common';
import { OrderAdminController } from './controllers/order.admin.controller';
import { OrderAdminService } from './services/order.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { AdminEntity } from 'src/modules/auth/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthAdminService } from 'src/modules/auth/admin/auth.admin.service';
import { AuthAdminFactory } from 'src/modules/auth/admin/auth.admin.factory';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, AdminEntity])],
  controllers: [OrderAdminController],
  providers: [
    OrderAdminService,
    JwtService,
    AuthAdminService,
    AuthAdminFactory,
  ],
})
export class OrderAdminModule {}
