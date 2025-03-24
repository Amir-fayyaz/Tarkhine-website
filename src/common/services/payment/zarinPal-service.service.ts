import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ZarinPalInstance, create } from 'zarinpal-checkout';
import { Payment } from '../../interfaces/payment.interface';
import { config } from 'dotenv';
import { requestPayemnt } from 'src/common/types/requestPayment.type';

config();
@Injectable()
export class ZarinPalService implements Payment {
  private readonly zarinPal: ZarinPalInstance;
  constructor() {
    this.zarinPal = create(
      process.env.ZARINPAL_MERCHANT_ID,
      Boolean(process.env.ZARINPAL_SANDBOX),
    );
  }

  async requestPayment(data: requestPayemnt) {
    try {
      const requestResult = await this.zarinPal.PaymentRequest({
        Amount: data.amount,
        CallbackURL: data.callBackUrl,
        Description: data.description,
      });

      if (requestResult && requestResult.status) {
        return {
          url: requestResult.url,
          authority: requestResult.authority,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  verifyPayment() {}
}
