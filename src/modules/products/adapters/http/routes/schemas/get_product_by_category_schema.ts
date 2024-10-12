import {FastifySchema} from 'fastify';
import {productProperties} from './types';

export const getProductByCategorySchema: FastifySchema = {
  summary: 'Get all products by the target category',
  description: 'Get all products by the target category',
  tags: ['products'],
  params: {
    type: 'object',
    properties: {
      id: {type: 'number'}
    },
    required: ['id']
  },
  querystring: {
    title: 'pagination',
    type: 'object',
    properties: {
      limit: {type: 'number'},
      page: {type: 'number'},
    }
  },
  response: {
    200: {
      description: 'Products by the target category to show',
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: productProperties,
            required: ['id', 'name', 'description', 'price']
          }
        },
        meta: {
          type: 'object',
          properties: {
            totalCount: {type: 'number'},
            totalPages: {type: 'number'},
            currentPage: {type: 'number'},
            perPage: {type: 'number'},
          },
          required: ['totalCount', 'totalPages', 'currentPage', 'perPage']
        }
      },
      required: ['data', 'meta']
    },
    204: {
      description: 'There is no product with this category to show',
      type: 'object'
    },
  }
};
