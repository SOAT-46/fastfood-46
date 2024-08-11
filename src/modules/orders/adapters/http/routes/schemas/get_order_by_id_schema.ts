import { FastifySchema } from 'fastify';
import { orderProperties } from "./types";

export const getOrderByIdSchema: FastifySchema = {
  summary: 'Get all products by the target category',
  description: 'Get all products by the target category',
  tags: ['orders'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    },
    required: ['id']
  },
  response: {
    200: {
      description: 'Products by the target category to show',
      type: 'object',
      properties: orderProperties
    },
    204: {
      description: 'There is no product with this category to show',
      type: 'object'
    },
  }
};
