import {Product} from '../../domain/models/product';
import {ProductsRepository} from '../../domain/repositories/products_repository';

export interface Listeners {
  onSuccess: (product: Product) => void;
  onInvalid: (product: Product) => void;
  onExists: (product: Product) => void;
}

export class CreateProductUseCase {
  public constructor(private readonly productsRepository: ProductsRepository) {}

  public async execute(product: Product, listeners: Listeners): Promise<void> {
    if(!product.isValid()) {
      return listeners.onInvalid(product);
    }

    const existentProduct = await this.productsRepository.GetByName(product.name);
    if (existentProduct) {
      return listeners.onExists(existentProduct);
    }

    const created = await this.productsRepository.Save(product);
    return listeners.onSuccess(created);
  }
}
