import { AwilixContainer, asClass } from 'awilix';

import {
  CreateOrderController,
  GetOrderByIdController,
  GetOrdersController,
  UpdateOrderController
} from '../adapters/http';

import {
  CreateOrderUseCase,
  GetOrderByIdUseCase,
  GetOrdersUseCase,
  UpdateOrderUseCase
} from '../application/usecases';

import {
  GetOrderByIdGateway,
  SaveOrderGateway,
  GetOrdersGateway,
  UpdateOrderGateway
 } from '../adapters/gateways';

import { PrismaOrdersRepository } from '../adapters/repositories';

export const ordersDIContainer = (container: AwilixContainer<any>) => {
  container.register({
    ordersRepository: asClass(PrismaOrdersRepository).singleton(),

    getOrderByIdGateway: asClass(GetOrderByIdGateway).singleton(),
    getOrdersGateway: asClass(GetOrdersGateway).singleton(),
    saveOrderGateway: asClass(SaveOrderGateway).singleton(),
    updateOrderGateway: asClass(UpdateOrderGateway).singleton(),

    createOrderUseCase: asClass(CreateOrderUseCase).singleton(),
    getOrderByIdUseCase: asClass(GetOrderByIdUseCase).singleton(),
    getOrdersUseCase: asClass(GetOrdersUseCase).singleton(),
    updateOrderUseCase: asClass(UpdateOrderUseCase).singleton(),

    getOrdersController: asClass(GetOrdersController).singleton(),
    getOrderByIdController: asClass(GetOrderByIdController).singleton(),
    createOrderController: asClass(CreateOrderController).singleton(),
    updateOrderController: asClass(UpdateOrderController).singleton(),
  });
};
