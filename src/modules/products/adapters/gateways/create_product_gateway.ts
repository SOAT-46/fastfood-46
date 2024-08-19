import {CreateProductPort} from 'modules/products/domain/gateways/create_product_port';
import {Product} from 'modules/products/domain/models/product';
import {ProductsRepository} from 'modules/products/domain/repositories/products_repository';

export class CreateProductGateway implements CreateProductPort {
  public constructor(private readonly productsRepository: ProductsRepository) { }

  public async Execute(product: Product): Promise<Product> {
    return this.productsRepository.Save(product);
  }
}
