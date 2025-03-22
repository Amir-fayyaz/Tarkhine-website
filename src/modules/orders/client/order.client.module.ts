import { Module } from '@nestjs/common';
import { OrderAppController } from './controllers/order.client.controller';
import { OrderAppService } from './services/order.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { AddressAppController } from './controllers/address.client.controller';
import { AddressAppService } from './services/address.client.service';
import { AddressEntity } from '../entities/address.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { AuthAppFactory } from 'src/modules/auth/client/auth.client.factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, AddressEntity, UserEntity])],
  controllers: [OrderAppController, AddressAppController],
  providers: [
    OrderAppService,
    AddressAppService,
    UserAppService,
    AuthAppFactory,
    JwtService,
  ],
})
export class OrderAppModule {}
