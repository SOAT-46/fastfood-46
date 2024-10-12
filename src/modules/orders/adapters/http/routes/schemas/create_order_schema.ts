import { FastifySchema } from 'fastify';
import { orderProperties, validationProperties } from './types';

export const createOrderSchema: FastifySchema = {
  summary: 'Creates a new order',
  description: 'Creates a new order',
  tags: ['orders'],
  body: {
    type: 'object',
    properties: {
      userId: { type: 'number', nullable: true, default: null },
      products: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productId: { type: 'number' },
            quantity: { type: 'number' }
          }
        },
        default: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 1 },
          { productId: 3, quantity: 1 },
          { productId: 4, quantity: 1 }
        ]
      }
    },
    required: ['products'],
  },
  response: {
    201: {
      description: 'Order created',
      type: 'object',
      properties: orderProperties,
    },
    200: {
      description: 'Order already exists',
      type: 'object',
      properties: orderProperties,
    },
    400: {
      description: 'Validation error: One or more fields are missing or invalid. Ensure all required fields are provided and conform to the expected data types.',
      type: 'object',
      properties: validationProperties
    }
  }
};
