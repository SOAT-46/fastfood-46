import { FastifySchema } from 'fastify';
import { orderProperties } from "./types";

export const getOrderByIdSchema: FastifySchema = {
  summary: 'Get order by the target id',
  description: 'Get order by the target id',
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
      description: 'Order by the target id to show',
      type: 'object',
      properties: orderProperties
    },
    204: {
      description: 'There is no order with this id to show',
      type: 'object'
    },
  }
};
