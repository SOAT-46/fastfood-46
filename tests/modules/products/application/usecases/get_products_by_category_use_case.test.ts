import {Product} from '../../../../../src/modules/products/domain/models/product';
import {InMemoryProductsRepository} from '../../infrastructure/repositories/doubles/in_memory_products_repository';
import {GetProductsByCategoryUseCase, Listeners} from '../../../../../src/modules/products/application/usecases/get_products_by_category_use_case';

describe('GetProductsByCategoryUseCase', () => {
  it('should call onSuccess when there are products to show', async () => {
    // arrange
    const categoryId = 1;
    const page = 1;
    const limit = 1;

    const repository = new InMemoryProductsRepository().withProducts([new Product('test', 'test', 100, 1, undefined)]);
    const useCase = new GetProductsByCategoryUseCase(repository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onEmpty: jest.fn(),
    };

    // act
    await useCase.Execute(categoryId, page, limit, listenersMock);

    // assert
    expect(listenersMock.onSuccess).toHaveBeenCalledTimes(1);
  })

  it('should call onEmpty when there is no product to show', async () => {
    // arrange
    const categoryId = 1;
    const page = 1;
    const limit = 1;

    const repository = new InMemoryProductsRepository();
    const useCase = new GetProductsByCategoryUseCase(repository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onEmpty: jest.fn(),
    };

    // act
    await useCase.Execute(categoryId, page, limit, listenersMock);

    // assert
    expect(listenersMock.onEmpty).toHaveBeenCalledTimes(1);
  })
})
