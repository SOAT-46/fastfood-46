import {FastifyInstance} from 'fastify';
import {PrismaClient} from '@prisma/client';
import {asClass, asValue, createContainer, InjectionMode} from 'awilix';

import {
  CreateProductUseCase,
  DeleteProductUseCase,
  UpdateProductUseCase,
  GetProductsByCategoryUseCase} from './modules/products/application/usecases';
import { CreateUserUseCase } from './modules/users/application/usecases/create_user_use_case';
import {
  GetOrdersUseCase,
  GetOrderByIdUseCase
} from './modules/orders/application/usecases';

import {
  CreateProductController,
  UpdateProductController,
  DeleteProductController,
  GetProductsByCategoryController} from './modules/products/adapters/http';
import { CreateUserController } from './modules/users/adapters/http/create_user_controller';
import {
  GetOrdersController,
  GetOrderByIdController
} from './modules/orders/adapters/http';

import {PrismaProductsRepository} from './modules/products/infrastructure/repositories/prisma_products_repository';
import {PrismaCategoriesRepository} from './modules/categories/infrastructure/repositories/prisma_categories_repository';
import { PrismaUsersRepository } from './modules/users/infrastructure/repositories/prisma_users_repository';
import { PrismaOrdersRepository } from './modules/orders/infrastructure/repositories/prisma_orders_repository';





import {  } from './modules/orders/application/usecases/get_orders_use_case';

export const createDIContainer = (server: FastifyInstance) => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  const prisma = new PrismaClient();

  container.register({
    prisma: asValue(prisma),

    productsRepository: asClass(PrismaProductsRepository).singleton(),
    categoriesRepository: asClass(PrismaCategoriesRepository).singleton(),
    usersRepository: asClass(PrismaUsersRepository).singleton(),
    ordersRepository: asClass(PrismaOrdersRepository).singleton(),

    createProductUseCase: asClass(CreateProductUseCase).singleton(),
    updateProductUseCase: asClass(UpdateProductUseCase).singleton(),
    deleteProductUseCase: asClass(DeleteProductUseCase).singleton(),
    getProductsUseCase: asClass(GetProductsByCategoryUseCase).singleton(),
    createUserUseCase: asClass(CreateUserUseCase).singleton(),
    getOrdersUseCase: asClass(GetOrdersUseCase).singleton(),
    getOrderByIdUseCase: asClass(GetOrderByIdUseCase).singleton(),

    createProductController: asClass(CreateProductController).singleton(),
    updateProductController: asClass(UpdateProductController).singleton(),
    deleteProductController: asClass(DeleteProductController).singleton(),
    getProductsController: asClass(GetProductsByCategoryController).singleton(),
    createUserController: asClass(CreateUserController).singleton(),
    getOrdersController: asClass(GetOrdersController).singleton(),
    getOrderByIdController: asClass(GetOrderByIdController).singleton(),
  });

  server.decorate('diContainer', container);
};
