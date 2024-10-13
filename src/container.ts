import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { asValue, createContainer, InjectionMode } from 'awilix';

import { categoriesDIContainer } from './modules/categories/infrastructure/container';
import { ordersDIContainer } from './modules/orders/infrastructure/container';
import { productsDIContainer } from './modules/products/infrastructure/container';
import { usersDIContainer } from './modules/users/infrastructure/container';
import { paymentsDIContainer } from './modules/payments/infrastructure/container';

export const createDIContainer = (server: FastifyInstance) => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  const prisma = new PrismaClient({log: ['info', 'query']});

  container.register({
    prisma: asValue(prisma),
  });

  categoriesDIContainer(container);
  ordersDIContainer(container);
  productsDIContainer(container);
  paymentsDIContainer(container);
  usersDIContainer(container);

  server.decorate('diContainer', container);
};
