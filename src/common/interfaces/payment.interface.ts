import { requestPayemnt } from '../types/requestPayment.type';

export interface Payment {
  verifyPayment();

  requestPayment(data: requestPayemnt): Promise<any>;
}
