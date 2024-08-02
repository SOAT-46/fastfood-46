import {Product} from '../../domain/models/product';
import {ProductsRepository} from '../../domain/repositories/products_repository';
import {CategoriesRepository} from "../../../categories/domain/repositories/categories_repository";

export interface Listeners {
  onSuccess: (product: Product) => void;
  onInvalid: (product: Product) => void;
  onExists: (product: Product) => void;
}

export class CreateProductUseCase {
  public constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository) {}

  public async execute(product: Product, listeners: Listeners): Promise<void> {
    if(!product.isValid()) {
      return listeners.onInvalid(product);
    }

    const existentProduct = await this.productsRepository.GetByName(product.name);
    if (existentProduct) {
      return listeners.onExists(existentProduct);
    }

    const category = await this.categoriesRepository.GetById(product.categoryId);
    if (!category) {
      return listeners.onInvalid(product);
    }

    const created = await this.productsRepository.Save(product);
    return listeners.onSuccess(created);
  }
}
