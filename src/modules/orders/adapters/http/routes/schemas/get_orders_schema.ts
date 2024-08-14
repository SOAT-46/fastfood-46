import { FastifySchema } from 'fastify';
import { orderProperties } from './types';

export const getOrdersSchema: FastifySchema = {
  summary: 'Get all orders',
  description: 'Get all orders',
  tags: ['orders'],
  querystring: {
    title: "pagination",
    type: 'object',
    properties: {
      limit: { type: 'number' },
      page: { type: 'number' },
    }
  },
  response: {
    200: {
      description: 'Orders to show',
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: orderProperties,
            required: ['id', 'number', 'status', 'receivedAt', 'updatedAt']
          }
        },
        meta: {
          type: 'object',
          properties: {
            totalCount: { type: 'number' },
            totalPages: { type: 'number' },
            currentPage: { type: 'number' },
            perPage: { type: 'number' },
          },
          required: ['totalCount', 'totalPages', 'currentPage', 'perPage']
        }
      },
      required: ['data', 'meta']
    },
    204: {
      description: 'There is no order to show',
      type: 'object'
    },
  }
};
