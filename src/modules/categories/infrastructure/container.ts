import { AwilixContainer, asClass } from 'awilix';

import { PrismaCategoriesRepository } from '../adapters/repositories/prisma_categories_repository';

export const categoriesDIContainer = (container: AwilixContainer<any>) => {
  container.register({
    categoriesRepository: asClass(PrismaCategoriesRepository).singleton(),
  });
}
