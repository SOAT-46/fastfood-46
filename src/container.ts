import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { asValue, createContainer, InjectionMode } from 'awilix';

import { categoriesDIContainer } from './modules/categories/infrastructure/container';
import { ordersDIContainer } from './modules/orders/infrastructure/container';
import { productsDIContainer } from './modules/products/infrastructure/container';
import { usersDIContainer } from './modules/users/infrastructure/container';
import { paymentsDIContainer } from './modules/payments/infrastructure/container';
import { HttpClient } from './modules/shared/http_client';

export const createDIContainer = (server: FastifyInstance) => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  const prisma = new PrismaClient({log: ['info', 'query']});
  const mpHttpClient = new HttpClient(
    `${process.env.APP_DOMAIN}/v1/payments`,
    `${process.env.API_BASE_URL}/instore/orders/qr/seller/collectors/${process.env.MP_USER_ID}/pos/${process.env.MP_EXTERNAL_POS_ID}/qrs`,
    `${process.env.ACCESS_TOKEN}`
  )

  container.register({
    prisma: asValue(prisma),
    httpClient: asValue(mpHttpClient),
  });

  categoriesDIContainer(container);
  ordersDIContainer(container);
  productsDIContainer(container);
  paymentsDIContainer(container);
  usersDIContainer(container);

  server.decorate('diContainer', container);
};
