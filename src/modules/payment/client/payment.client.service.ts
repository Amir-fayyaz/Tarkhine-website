import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { ZarinPalService } from 'src/common/services/payment/zarinPal-service.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { RequestPaymentDto } from './dto/requestPayment.dto';
import { VerfiyPaymentDto } from './dto/verifyPayment.dto';

@Injectable()
export class PaymentAppService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly Payment_Repository: Repository<PaymentEntity>,
    private readonly ZarinPalService: ZarinPalService,
  ) {}

  // private methods
  private async FindPaymentByAuthority(authority: string) {
    const payment = await this.Payment_Repository.findOne({
      where: {
        authority,
      },
      relations: ['user'],
    });

    if (!payment)
      throw new NotFoundException('There is no payment with this authority');

    return payment;
  }

  //public methods
  public async requestPayment(data: RequestPaymentDto, user: UserEntity) {
    try {
      const requestResult = await this.ZarinPalService.requestPayment({
        amount: data.amount,
        description: data.description,
        callBackUrl: data.callBackUrl,
      });

      const newPayment = this.Payment_Repository.create({
        authority: requestResult.authority,
        amount: data.amount,
        user,
      });

      await this.Payment_Repository.save(newPayment);

      return {
        url: requestResult.url,
        authority: requestResult.authority,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async verifyPayment(authority: string, data: VerfiyPaymentDto) {
    // sure to exist payment with this authority

    await this.FindPaymentByAuthority(authority);

    const verifyResult = await this.ZarinPalService.verifyPayment({
      amount: data.amount,
      authority,
    });

    return {
      status: verifyResult.status,
      refId: verifyResult.refId,
    };
  }
}
