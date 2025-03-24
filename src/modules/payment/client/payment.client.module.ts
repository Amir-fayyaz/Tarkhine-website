import { Module } from '@nestjs/common';
import { PaymnetAppController } from './payment.client.controller';
import { PaymentAppService } from './payment.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { PaymentEntity } from '../entities/payment.entity';
import { ZarinPalService } from 'src/common/services/payment/zarinPal-service.service';
import { AuthAppFactory } from 'src/modules/auth/client/auth.client.factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PaymentEntity])],
  controllers: [PaymnetAppController],
  providers: [
    PaymentAppService,
    ZarinPalService,
    AuthAppFactory,
    UserAppService,
    JwtService,
  ],
})
export class PaymentAppModule {}
