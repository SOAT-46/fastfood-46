import { GetProductPort } from "modules/products/domain/gateways";
import { Product } from "modules/products/domain/models/product";
import { ProductsRepository } from "modules/products/adapters/repositories/contracts/products_repository";

export class GetProductGateway implements GetProductPort {
  public constructor(private readonly productsRepository: ProductsRepository) { }

  public async Execute(product: Product): Promise<Product | undefined> {
    const entity = await this.productsRepository.GetByName(product.name);
    return entity?.toDomain();
  }
}
