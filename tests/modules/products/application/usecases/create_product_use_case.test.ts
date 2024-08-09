import {Product} from '../../../../../src/modules/products/domain/models/product';
import {Category} from '../../../../../src/modules/categories/domain/models/category';
import {CreateProductUseCase, Listeners} from '../../../../../src/modules/products/application/usecases/create_product_use_case';
import {InMemoryCategoriesRepository} from '../../../categories/infrastructure/repositories/doubles/in_memory_categories_repository';
import {InMemoryProductsRepository} from '../../infrastructure/repositories/doubles/in_memory_products_repository';

describe('CreateProductUseCase', () => {
  it('should call onSuccess when the product is created successfully', async() => {
    // arrange
    const product = new Product('test', 'test', 100, 1, undefined);
    const productsRepository = new InMemoryProductsRepository();
    const categoriesRepository = new InMemoryCategoriesRepository().withCategories([new Category(1, 'test')]);

    const useCase = new CreateProductUseCase(productsRepository, categoriesRepository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onExists: jest.fn(),
      onInvalid: jest.fn(),
    };

    // act
    await useCase.execute(product, listenersMock);

    // assert
    expect(listenersMock.onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should call onInvalid when the product is invalid', async() => {
    // arrange
    const product = new Product('', '', -10, 1, undefined);
    const productsRepository = new InMemoryProductsRepository();
    const categoriesRepository = new InMemoryCategoriesRepository();

    const useCase = new CreateProductUseCase(productsRepository, categoriesRepository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onExists: jest.fn(),
      onInvalid: jest.fn(),
    };

    // act
    await useCase.execute(product, listenersMock);

    // assert
    expect(listenersMock.onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should call onInvalid when there is no valid category', async() => {
    // arrange
    const product = new Product('test', 'test', 10, 1, undefined);
    const productsRepository = new InMemoryProductsRepository();
    const categoriesRepository = new InMemoryCategoriesRepository();

    const useCase = new CreateProductUseCase(productsRepository, categoriesRepository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onExists: jest.fn(),
      onInvalid: jest.fn(),
    };

    // act
    await useCase.execute(product, listenersMock);

    // assert
    expect(listenersMock.onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should call onExists when the product was already created', async() => {
    // arrange
    const product = new Product('test', 'test', 10, 1, undefined);
    const productsRepository = new InMemoryProductsRepository().withProducts([product]);
    const categoriesRepository = new InMemoryCategoriesRepository();

    const useCase = new CreateProductUseCase(productsRepository, categoriesRepository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onExists: jest.fn(),
      onInvalid: jest.fn(),
    };

    // act
    await useCase.execute(product, listenersMock);

    // assert
    expect(listenersMock.onExists).toHaveBeenCalledTimes(1);
  });

})
