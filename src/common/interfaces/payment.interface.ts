import { requestPayemnt } from '../types/requestPayment.type';
import { verifyPayment } from '../types/verifyPayment.type';

export interface Payment {
  verifyPayment(data: verifyPayment): Promise<any>;

  requestPayment(data: requestPayemnt): Promise<any>;
}
