import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {fastifyAwilixPlugin} from '@fastify/awilix';
import {createDIContainer} from './container';
import {productRoutes} from './modules/products/adapters/http/routes/products';

import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { UserRoutes } from './modules/users/adapters/http/routes/users';

const buildServer = () => {
  const server = Fastify({logger: true});

  server.register(cors);
  server.register(sensible);

  server.register(swagger, {
    openapi: {
      info: {
        title: 'fastfood-46',
        description: 'FIAP fastfood-46',
        version: '0.0.1'
      },
      servers: [{url: 'http://localhost:3000'}],
    },
    hideUntagged: true,
  });
  server.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    },
    staticCSP: true,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true
  });

  createDIContainer(server);
  server.register(productRoutes, {prefix: '/v1/products'});

  server.register(UserRoutes, {prefix: '/v1/users'});

  return server;
}

export {buildServer};
