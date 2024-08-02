import { FastifySchema } from 'fastify';
import { productProperties } from './types';

export const createProductSchema: FastifySchema = {
  summary: 'Creates a new product',
  description: 'Creates a new product',
  tags: ['products'],
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number' },
      categoryId: { type: 'number' },
    },
    required: ['name', 'description', 'price', 'categoryId'],
  },
  response: {
    201: {
      description: 'Product created',
      type: 'object',
      properties: productProperties,
    },
    200: {
      description: 'Product already exists',
      type: 'object',
      properties: productProperties,
    },
    400: {
      description: 'Validation error',
      type: 'object',
      properties: {}
    }
  }
};
