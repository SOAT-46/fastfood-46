import {FastifySchema} from 'fastify';

export const getUserByCPFSchema: FastifySchema = {
  summary: 'Get user by cpf',
  description: 'Get user by cpf',
  tags: ['users'],
  params: {
    type: 'object',
    properties: {
      cpf: {type: 'string'},
    },
    required: ['cpf'],
  },
  response: {
    201: {
      description: 'User created',
      type: 'object',
      properties: {
        cpf: {type: 'string'},
      },
    },
    200: {
      description: 'User already exists',
      type: 'object',
      properties: {
        cpf: {type: 'string'},
      },
    },
    400: {
      description: 'Validation error: One or more fields are missing or invalid. Ensure all required fields are provided and conform to the expected data types.',
      type: 'object',
      properties: {
        cpf: {type: 'string'},
      }
    }
  }
};
