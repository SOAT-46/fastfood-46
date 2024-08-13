import { Order } from '../../../domain/models/order';
import { PrismaOrder } from '../types';
import { orderStatus } from '../../../domain/enums/order_status';

export const toDomain = (order: PrismaOrder): Order => {
  const {
    id,
    number,
    status,
    receivedAt,
    updatedAt,
    paymentId,
    userId
  } = order;

  return new Order(id, number, status, receivedAt, updatedAt, paymentId, userId);
};
