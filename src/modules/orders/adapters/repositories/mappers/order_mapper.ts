import { PrismaOrder } from '../models';
import { Order } from '../../../domain/models/order';

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
