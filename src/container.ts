import {FastifyInstance} from 'fastify';
import {PrismaClient} from '@prisma/client';
import {asClass, asValue, createContainer, InjectionMode} from 'awilix';

import {
  CreateProductUseCase,
  DeleteProductUseCase,
  UpdateProductUseCase,
  GetProductsByCategoryUseCase} from './modules/products/application/usecases';

import {
  CreateProductController,
  UpdateProductController,
  DeleteProductController,
  GetProductsByCategoryController} from './modules/products/adapters/http';

import {PrismaProductsRepository} from './modules/products/infrastructure/repositories/prisma_products_repository';
import {PrismaCategoriesRepository} from './modules/categories/infrastructure/repositories/prisma_categories_repository';

export const createDIContainer = (server: FastifyInstance) => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  const prisma = new PrismaClient();

  container.register({
    prisma: asValue(prisma),

    productsRepository: asClass(PrismaProductsRepository).singleton(),
    categoriesRepository: asClass(PrismaCategoriesRepository).singleton(),

    createProductUseCase: asClass(CreateProductUseCase).singleton(),
    updateProductUseCase: asClass(UpdateProductUseCase).singleton(),
    deleteProductUseCase: asClass(DeleteProductUseCase).singleton(),
    getProductsUseCase: asClass(GetProductsByCategoryUseCase).singleton(),

    createProductController: asClass(CreateProductController).singleton(),
    updateProductController: asClass(UpdateProductController).singleton(),
    deleteProductController: asClass(DeleteProductController).singleton(),
    getProductsController: asClass(GetProductsByCategoryController).singleton(),
  });

  server.decorate('diContainer', container);
};
