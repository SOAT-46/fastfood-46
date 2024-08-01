import { FastifySchema } from 'fastify';
import { productProperties } from './types';

export const updateProductSchema: FastifySchema = {
  summary: 'Updates a product by the target id',
  description: 'Updates a product by the target id',
  tags: ['products'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    properties: productProperties,
  },
  response: {
    200: {
      description: 'Updated product',
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
