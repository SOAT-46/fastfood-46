import {GetProductPort} from 'modules/products/domain/gateways';
import {Product} from 'modules/products/domain/models/product';
import {ProductsRepository} from 'modules/products/domain/repositories/products_repository';

export class GetProductGateway implements GetProductPort {
  public constructor(private readonly productsRepository: ProductsRepository) { }

  public async Execute(product: Product): Promise<Product | undefined> {
    return this.productsRepository.GetByName(product.name);
  }
}
