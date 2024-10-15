import { PaymentStatus } from './enums';
import { OrderStatus } from '../../../orders/domain/entities/enums';

export class Payment {
  public constructor(
    public readonly id: number,
    public readonly status: PaymentStatus,
    public readonly orderStatus: OrderStatus
    ) {}

  public static build(id: number, paymentStatus: string): Payment {
    const mappedStatus = mapPayment(paymentStatus);
    const orderStatus = matchOrderStatus(mappedStatus);
    return new Payment(id, mappedStatus, orderStatus);
  }
}

const mapPayment = (orderStatus: string): PaymentStatus => {
  const options: Record<string, PaymentStatus> = {
    'paid': PaymentStatus.COMPLETED,
    'payment_required': PaymentStatus.PENDING,
    'reverted': PaymentStatus.REFUNDED,
    'partially_reverted': PaymentStatus.REFUNDED,
    'partially_paid': PaymentStatus.COMPLETED,
    'payment_in_process': PaymentStatus.PENDING,
    'undefined': PaymentStatus.FAILED,
    'expired': PaymentStatus.FAILED
  }
  return options[orderStatus] || PaymentStatus.FAILED;
}

const matchOrderStatus = (paymentStatus: PaymentStatus): OrderStatus => {
  const options: Record<string, OrderStatus> = {
    'COMPLETED': OrderStatus.RECEIVED,
    'PENDING': OrderStatus.PENDING,
    'REFUNDED': OrderStatus.CANCELLED,
    'FAILED': OrderStatus.CANCELLED
  }
  return options[paymentStatus] || OrderStatus.CANCELLED;
}
