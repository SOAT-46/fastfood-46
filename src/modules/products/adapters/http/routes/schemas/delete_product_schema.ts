import { FastifySchema } from 'fastify'
import {validationProperties} from "./types";

export const deleteProductSchema: FastifySchema = {
  summary: 'Deletes a product by the target id',
  description: 'Deletes a product by the target id',
  tags: ['products'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    },
    required: ['id']
  },
  response: {
    204: {
      description: 'Product was deleted',
      type: 'object'
    },
    404: {
      description: 'The product was not found',
      type: 'object',
      properties: validationProperties
    }
  }
};
