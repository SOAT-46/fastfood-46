import { AwilixContainer, asClass } from 'awilix';

import { PrismaCategoriesRepository } from '../adapters/repositories';
import { GetCategoryByIdGateway } from '../adapters/gateways';

export const categoriesDIContainer = (container: AwilixContainer<any>) => {
  container.register({
    categoriesRepository: asClass(PrismaCategoriesRepository).singleton(),

    getCategoryByIdGateway: asClass(GetCategoryByIdGateway).singleton(),
  });
}
