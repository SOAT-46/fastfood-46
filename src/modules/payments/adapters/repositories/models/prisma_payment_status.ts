import { PaymentStatus } from "../../../domain/models/enums";

export type PrismaPaymentStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED';

export const mapToPrismaPaymentStatus = (status: PaymentStatus): PrismaPaymentStatus => {
  const options: Record<PaymentStatus, PrismaPaymentStatus> = {
    [PaymentStatus.PENDING]: 'PENDING',
    [PaymentStatus.COMPLETED]: 'COMPLETED',
    [PaymentStatus.FAILED]: 'FAILED',
    [PaymentStatus.REFUNDED]: 'REFUNDED',
  };

  return options[status];
};
