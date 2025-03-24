import { Injectable } from '@nestjs/common';
import zarinPalCheckout from 'zarinpal-checkout';
import { Payment } from '../interfaces/payment.interface';

@Injectable()
export class ZarinPalService implements Payment {
  createPayment() {}

  verifyPayment() {}
}
