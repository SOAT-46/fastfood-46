import { Payment } from '../models';

export interface UpdatePaymentPort {
  Execute(payment: Payment): Promise<void>;
}
