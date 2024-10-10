import { AwilixContainer, asClass } from 'awilix';

import {
  CreateProductController,
  DeleteProductController,
  GetProductsByCategoryController,
  UpdateProductController
} from '../adapters/http';

import { PrismaProductsRepository } from '../adapters/repositories';

import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetProductsByCategoryUseCase,
  UpdateProductUseCase
} from '../application/usecases';

export const productsDIContainer = (container: AwilixContainer<any>) => {
  container.register({

    productsRepository: asClass(PrismaProductsRepository).singleton(),

    createProductUseCase: asClass(CreateProductUseCase).singleton(),
    updateProductUseCase: asClass(UpdateProductUseCase).singleton(),
    deleteProductUseCase: asClass(DeleteProductUseCase).singleton(),
    getProductsUseCase: asClass(GetProductsByCategoryUseCase).singleton(),

    createProductController: asClass(CreateProductController).singleton(),
    updateProductController: asClass(UpdateProductController).singleton(),
    deleteProductController: asClass(DeleteProductController).singleton(),
    getProductsController: asClass(GetProductsByCategoryController).singleton(),
  });
};
