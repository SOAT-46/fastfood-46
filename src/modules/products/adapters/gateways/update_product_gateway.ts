import { UpdateProductPort } from "modules/products/domain/gateways";
import { Product } from "modules/products/domain/models/product";
import { ProductsRepository } from "modules/products/adapters/repositories/contracts/products_repository";

export class UpdateProductGateway implements UpdateProductPort {
  public constructor(private readonly productsRepository: ProductsRepository) { }

  public async Execute(product: Product): Promise<Product> {
    const entity = await this.productsRepository.Update(product);
    return entity.toDomain();
  }
}
