import {Product} from '../../../../../src/modules/products/domain/models/product';
import {InMemoryProductsRepository} from '../../infrastructure/repositories/doubles/in_memory_products_repository';
import {UpdateProductUseCase, Listeners} from '../../../../../src/modules/products/application/usecases/update_product_use_case';

describe('UpdateProductUseCase', () => {
  it('should call onSuccess when the product was updated', async () => {
    // arrange
    const product = new Product('test', 'test', 100, 1, 1);

    const productsRepository = new InMemoryProductsRepository().withProducts([product]);
    const useCase = new UpdateProductUseCase(productsRepository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onNotFound: jest.fn(),
    };

    // act
    await useCase.execute(product, listenersMock);

    // assert
    expect(listenersMock.onSuccess).toHaveBeenCalledTimes(1);
  })

  it('should call onNotFound when there is no product by the target id', async () => {
    // arrange
    const product = new Product('test', 'test', 100, 1, 1);

    const productsRepository = new InMemoryProductsRepository();
    const useCase = new UpdateProductUseCase(productsRepository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onNotFound: jest.fn(),
    };

    // act
    await useCase.execute(product, listenersMock);

    // assert
    expect(listenersMock.onNotFound).toHaveBeenCalledTimes(1);
  })
})
