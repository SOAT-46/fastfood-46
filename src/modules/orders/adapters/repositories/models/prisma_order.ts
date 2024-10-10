import { OrderStatus } from './order_status';

export interface PrismaOrder {
  id: number;
  number: number;
  status: OrderStatus;
  receivedAt: Date;
  updatedAt: Date;
  paymentId?: number | null;
  userId?: number | null;
}
