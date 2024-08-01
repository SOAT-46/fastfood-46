import {Product} from '../../domain/models/product';
import {ProductsRepository} from '../../domain/repositories/products_repository';

export interface Listeners {
  onSuccess: (product: Product) => void;
  onNotFound: (id: number | undefined) => void;
}

export class UpdateProductUseCase {
  public constructor(private readonly productsRepository: ProductsRepository) {}

  public async execute(product: Product, listeners: Listeners): Promise<void> {
    const exists = await this.productsRepository.GetById(product.id!);
    if (!exists) {
      return listeners.onNotFound(product.id);
    }

    const updatedProduct = await this.productsRepository.Update(product);
    return listeners.onSuccess(updatedProduct);
  }
}
