import {FastifySchema} from 'fastify';

export const createUserSchema: FastifySchema = {
  summary: 'Creates a new user',
  description: 'Creates a new user',
  tags: ['users'],
  body: {
    type: 'object',
    properties: {
      name: {type: 'string'},
      cpf: {type: 'string'},
      email: {type: 'string'},
    },
    required: ['name', 'email'],
  },
  response: {
    201: {
      description: 'User created',
      type: 'object',
      properties: {
        name: {type: 'string'},
        cpf: {type: 'string'},
        email: {type: 'string'},
      },
    },
    200: {
      description: 'User already exists',
      type: 'object',
      properties: {
        name: {type: 'string'},
        cpf: {type: 'string'},
        email: {type: 'string'},
      },
    },
    400: {
      description: 'Validation error: One or more fields are missing or invalid. Ensure all required fields are provided and conform to the expected data types.',
      type: 'object',
      properties: {
        name: {type: 'string'},
        cpf: {type: 'string'},
        email: {type: 'string'},
      }
    }
  }
};
