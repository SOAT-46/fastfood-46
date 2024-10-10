import { AwilixContainer, asClass } from 'awilix';

import {
  CreateOrderController,
  GetOrderByIdController,
  GetOrdersController
} from '../adapters/http';

import {
  CreateOrderUseCase,
  GetOrderByIdUseCase,
  GetOrdersUseCase
} from '../application/usecases';

import { GetOrderByIdGateway, SaveOrderGateway, GetOrdersGateway } from '../adapters/gateways';

import { PrismaOrdersRepository } from '../adapters/repositories';

export const ordersDIContainer = (container: AwilixContainer<any>) => {
  container.register({
    ordersRepository: asClass(PrismaOrdersRepository).singleton(),

    getOrderByIdGateway: asClass(GetOrderByIdGateway).singleton(),
    getOrdersGateway: asClass(GetOrdersGateway).singleton(),
    saveOrderGateway: asClass(SaveOrderGateway).singleton(),

    createOrderUseCase: asClass(CreateOrderUseCase).singleton(),
    getOrderByIdUseCase: asClass(GetOrderByIdUseCase).singleton(),
    getOrdersUseCase: asClass(GetOrdersUseCase).singleton(),

    getOrdersController: asClass(GetOrdersController).singleton(),
    getOrderByIdController: asClass(GetOrderByIdController).singleton(),
    createOrderController: asClass(CreateOrderController).singleton(),
  });
};
