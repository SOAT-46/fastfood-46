import {InMemoryProductsRepository} from '../../../infrastructure/repositories/doubles/in_memory_products_repository';
import {CreateProductUseCase} from '../../../../../../src/modules/products/application/usecases/create_product_use_case';
import {InMemoryCategoriesRepository} from '../../../../categories/infrastructure/repositories/doubles/in_memory_categories_repository';

export class CreateProductUseCaseStub extends CreateProductUseCase {
  public constructor() {
    super(new InMemoryProductsRepository(), new InMemoryCategoriesRepository())
  }
}
