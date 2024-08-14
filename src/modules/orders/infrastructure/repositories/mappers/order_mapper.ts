import { Order } from '../../../domain/models/order';
import { PrismaOrder } from '../types';

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
