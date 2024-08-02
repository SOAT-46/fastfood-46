import { FastifySchema } from 'fastify';
import {productProperties, validationProperties} from './types';

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
      description: 'Validation error: One or more fields are missing or invalid. Ensure all required fields are provided and conform to the expected data types.',
      type: 'object',
      properties: validationProperties
    }
  }
};
