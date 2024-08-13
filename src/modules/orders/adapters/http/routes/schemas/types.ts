import { orderStatus } from "@prisma/client";

export const orderProperties = {
  id: { type: 'number' },
  number: { type: 'number' },
  status: { type: 'string' },
  receivedAt: { type: 'string' },
  updatedAt: { type: 'string' },
  paymentId: { type: 'number' },
  userId: { type: 'number' }
};

export const validationProperties = {
  statusCode: { type: 'number' },
  error: { type: 'string' },
  message: { type: 'string' }
}
