import { CreateProductPort } from "modules/products/domain/gateways/create_product_port";
import { Product } from "modules/products/domain/models/product";
import { ProductsRepository } from "modules/products/adapters/repositories/contracts/products_repository";

export class CreateProductGateway implements CreateProductPort {
  public constructor(private readonly productsRepository: ProductsRepository) { }

  public async Execute(product: Product): Promise<Product> {
    const entity = await this.productsRepository.Save(product);
    return entity.toDomain();
  }
}
