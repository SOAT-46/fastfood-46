import {Product} from '../../../../../src/modules/products/domain/models/product';
import {InMemoryProductsRepository} from '../../infrastructure/repositories/doubles/in_memory_products_repository';
import {DeleteProductUseCase, Listeners} from '../../../../../src/modules/products/application/usecases/delete_product_use_case';

describe('DeleteProductUseCase', () => {
  it('should call onSuccess when the product was deleted', async () => {
    // arrange
    const id = 1;
    const product = new Product('test', 'test', 100, 1, id);
    const repository = new InMemoryProductsRepository().withProducts([product]);
    const useCase = new DeleteProductUseCase(repository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onNotFound: jest.fn(),
    };

    // act
    await useCase.execute(id, listenersMock);

    // assert
    expect(listenersMock.onSuccess).toHaveBeenCalledTimes(1);
  })

  it('should call onNotFound when there is no product by the target id', async () => {
    // arrange
    const id = 1;

    const repository = new InMemoryProductsRepository();
    const useCase = new DeleteProductUseCase(repository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onNotFound: jest.fn(),
    };

    // act
    await useCase.execute(id, listenersMock);

    // assert
    expect(listenersMock.onNotFound).toHaveBeenCalledTimes(1);
  })
});
