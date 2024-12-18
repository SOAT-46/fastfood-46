import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fastifyAwilixPlugin } from '@fastify/awilix';
import { createDIContainer } from '../container';
import { productRoutes } from '../modules/products/adapters/http/routes/products';
import { orderRoutes } from '../modules/orders/adapters/http/routes/orders';
import { UserRoutes } from '../modules/users/adapters/http/routes/users';

import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fastifyHealthcheck from 'fastify-healthcheck';

const buildServer = () => {
  const server = Fastify({ logger: true });

  server.register(cors);
  server.register(sensible);

  server.register(swagger, {
    openapi: {
      info: {
        title: 'fastfood-46',
        description: 'FIAP fastfood-46',
        version: '1.0.0'
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
    hideUntagged: true,
  });
  server.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true
    },
    staticCSP: true,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true
  });

  createDIContainer(server);
  server.register(productRoutes, {prefix: '/v1/products'});
  server.register(orderRoutes, {prefix: '/v1/orders'});
  server.register(UserRoutes, {prefix: '/v1/users'});
  server.register(fastifyHealthcheck);
  return server;
}

export { buildServer };
