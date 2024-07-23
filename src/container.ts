import {asClass, asValue, createContainer, InjectionMode} from 'awilix';
import {FastifyInstance} from 'fastify';
import {PrismaClient} from '@prisma/client';
import {CreateProductUseCase} from './core/products/usecases/create_product_use_case';
import {CreateProductController} from './core/products/presentation/create_product_controller';

export const createDIContainer = (server: FastifyInstance) => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  const prisma = new PrismaClient();

  container.register({
    prisma: asValue(prisma),
    createProductUseCase: asClass(CreateProductUseCase).singleton(),
    createProductController: asClass(CreateProductController).singleton(),
  });

  server.decorate('diContainer', container);
};
