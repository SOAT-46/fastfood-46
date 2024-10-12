import { FastifySchema } from 'fastify';
import { updateOrderProperties, validationProperties } from './types';

export const UpdateOrderSchema: FastifySchema = {
  summary: 'Updates an order',
  description: 'Updates an order',
  tags: ['orders'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    properties: {
      status: { type: 'string', default: 'PENDING', nullable: false },
    },
    required: ['status'],
  },
  response: {
    200: {
      description: 'Updated order',
      type: 'object',
      properties: updateOrderProperties,
    },
    404: {
      description: 'Order not found',
      type: 'object',
      properties: validationProperties
    }
  }
};
