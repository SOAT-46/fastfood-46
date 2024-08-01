import { FastifySchema } from 'fastify'

export const deleteProductSchema: FastifySchema = {
  summary: 'Deletes a product by the target id',
  description: 'Deletes a product by the target id',
  tags: ['products'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  response: {
    200: {
      description: 'Product was deleted',
      type: 'object',
      properties: {},
    },
    400: {
      description: 'Validation error',
      type: 'object',
      properties: {}
    }
  }
};
