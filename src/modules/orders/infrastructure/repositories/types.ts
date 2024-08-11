import { orderStatus } from "../../domain/enums/order_status";

export interface PrismaOrder {
  id: number,
  number: number,
  status: 'PENDING' | 'RECEIVED' | 'PREPARATION' | 'READY' | 'DELIVERED' | 'CANCELLED',
  receivedAt: Date,
  updatedAt: Date,
  paymentId?: number | null,
  userId?: number | null
}
