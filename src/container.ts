import {FastifyInstance} from 'fastify';
import {PrismaClient} from '@prisma/client';
import {asClass, asValue, createContainer, InjectionMode} from 'awilix';

import {CreateProductUseCase} from './modules/products/application/usecases/create_product_use_case';
import {DeleteProductUseCase} from './modules/products/application/usecases/delete_product_use_case';
import {UpdateProductUseCase} from './modules/products/application/usecases/update_product_use_case';

import {CreateProductController} from './modules/products/adapters/http/create_product_controller';
import {UpdateProductController} from './modules/products/adapters/http/update_product_controller';
import {DeleteProductController} from './modules/products/adapters/http/delete_product_controller';

import {PrismaProductsRepository} from './modules/products/infrastructure/repositories/prisma_products_repository';

export const createDIContainer = (server: FastifyInstance) => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  const prisma = new PrismaClient();

  container.register({
    prisma: asValue(prisma),

    productsRepository: asClass(PrismaProductsRepository).singleton(),

    createProductUseCase: asClass(CreateProductUseCase).singleton(),
    updateProductUseCase: asClass(UpdateProductUseCase).singleton(),
    deleteProductUseCase: asClass(DeleteProductUseCase).singleton(),

    createProductController: asClass(CreateProductController).singleton(),
    updateProductController: asClass(UpdateProductController).singleton(),
    deleteProductController: asClass(DeleteProductController).singleton(),
  });

  server.decorate('diContainer', container);
};
