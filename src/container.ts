import {FastifyInstance} from 'fastify';
import {PrismaClient} from '@prisma/client';
import {asClass, asValue, createContainer, InjectionMode} from 'awilix';

import {
  CreateProductUseCase,
  DeleteProductUseCase,
  UpdateProductUseCase,
  GetProductsByCategoryUseCase} from './modules/products/application/usecases';
import {
  GetOrdersUseCase,
  GetOrderByIdUseCase,
  CreateOrderUseCase
} from './modules/orders/application/usecases';

import {
  CreateProductController,
  UpdateProductController,
  DeleteProductController,
  GetProductsByCategoryController} from './modules/products/adapters/http';
import {
  GetOrdersController,
  GetOrderByIdController,
  CreateOrderController
} from './modules/orders/adapters/http';

import {PrismaProductsRepository} from './modules/products/infrastructure/repositories/prisma_products_repository';
import {PrismaCategoriesRepository} from './modules/categories/infrastructure/repositories/prisma_categories_repository';

import { CreateUserUseCase } from './modules/users/application/usecases/create_user_use_case';
import { GetUsersByCPFUseCase } from './modules/users/application/usecases/get_user_by_cpf_use_case';

import { CreateUserController, GetUsersByCPFController } from './modules/users/adapters/http';

import { PrismaUsersRepository } from './modules/users/infrastructure/repositories/prisma_users_repository';
import { PrismaOrdersRepository } from './modules/orders/infrastructure/repositories/prisma_orders_repository';

export const createDIContainer = (server: FastifyInstance) => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  const prisma = new PrismaClient({log: ['info', 'query']});

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
    getUsersByCPFUseCase: asClass(GetUsersByCPFUseCase).singleton(),

    getOrdersUseCase: asClass(GetOrdersUseCase).singleton(),
    getOrderByIdUseCase: asClass(GetOrderByIdUseCase).singleton(),
    createOrderUseCase: asClass(CreateOrderUseCase).singleton(),

    createProductController: asClass(CreateProductController).singleton(),
    updateProductController: asClass(UpdateProductController).singleton(),
    deleteProductController: asClass(DeleteProductController).singleton(),
    getProductsController: asClass(GetProductsByCategoryController).singleton(),
    createUserController: asClass(CreateUserController).singleton(),
    getUserByCPFController: asClass(GetUsersByCPFController).singleton(),
    getOrdersController: asClass(GetOrdersController).singleton(),
    getOrderByIdController: asClass(GetOrderByIdController).singleton(),
    createOrderController: asClass(CreateOrderController).singleton(),
  });

  server.decorate('diContainer', container);
};
