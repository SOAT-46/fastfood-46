import {Product} from '../../../../../src/modules/products/domain/models/product';
import {CreateProductUseCase, Listeners} from '../../../../../src/modules/products/application/usecases/create_product_use_case';
import {CategoriesRepositoryStub} from '../../../categories/infrastructure/repositories/doubles/categories_repository_stub';
import {ProductsRepositoryStub} from '../../infrastructure/repositories/doubles/products_repository_stub';

describe('CreateProductUseCase', () => {
  it('should call onSuccess when the product is created successfully', async() => {
    // arrange
    const product = new Product('test', 'test', 100, 1, undefined);
    const productsRepository = new ProductsRepositoryStub();
    const categoriesRepository = new CategoriesRepositoryStub().withCategory();

    const useCase = new CreateProductUseCase(productsRepository, categoriesRepository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onExists: jest.fn(),
      onInvalid: jest.fn(),
    };

    // act
    useCase.execute(product, listenersMock);

    // assert
    expect(listenersMock.onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should call onInvalid when the product is invalid', async() => {
    // arrange
    const product = new Product('', '', -10, 1, undefined);
    const productsRepository = new ProductsRepositoryStub();
    const categoriesRepository = new CategoriesRepositoryStub();

    const useCase = new CreateProductUseCase(productsRepository, categoriesRepository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onExists: jest.fn(),
      onInvalid: jest.fn(),
    };

    // act
    useCase.execute(product, listenersMock);

    // assert
    expect(listenersMock.onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should call onInvalid when there is no valid category', async() => {
    // arrange
    const product = new Product('test', 'test', 10, 1, undefined);
    const productsRepository = new ProductsRepositoryStub();
    const categoriesRepository = new CategoriesRepositoryStub();

    const useCase = new CreateProductUseCase(productsRepository, categoriesRepository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onExists: jest.fn(),
      onInvalid: jest.fn(),
    };

    // act
    useCase.execute(product, listenersMock);

    // assert
    expect(listenersMock.onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should call onExists when the product was already created', async() => {
    // arrange
    const product = new Product('test', 'test', 10, 1, undefined);
    const productsRepository = new ProductsRepositoryStub().withProduct();
    const categoriesRepository = new CategoriesRepositoryStub();

    const useCase = new CreateProductUseCase(productsRepository, categoriesRepository);
    const listenersMock: Listeners = {
      onSuccess: jest.fn(),
      onExists: jest.fn(),
      onInvalid: jest.fn(),
    };

    // act
    useCase.execute(product, listenersMock);

    // assert
    expect(listenersMock.onExists).toHaveBeenCalledTimes(1);
  });

})
