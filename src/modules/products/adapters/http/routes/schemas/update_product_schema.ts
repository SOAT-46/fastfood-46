import { FastifySchema } from 'fastify';
import {productProperties, validationProperties} from './types';

export const updateProductSchema: FastifySchema = {
  summary: 'Updates a product by the target id',
  description: 'Updates a product by the target id',
  tags: ['products'],
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
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number' },
    },
  },
  response: {
    200: {
      description: 'Updated product',
      type: 'object',
      properties: productProperties,
    },
    404: {
      description: 'Product not found',
      type: 'object',
      properties: validationProperties
    }
  }
};
