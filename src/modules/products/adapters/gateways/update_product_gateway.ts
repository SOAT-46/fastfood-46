import { UpdateProductPort } from "modules/products/domain/gateways";
import { Product } from "modules/products/domain/models/product";
import { ProductsRepository } from "modules/products/domain/repositories/products_repository";

export class UpdateProductGateway implements UpdateProductPort {
  public constructor(private readonly productsRepository: ProductsRepository) { }

  public async Execute(product: Product): Promise<Product> {
    return this.productsRepository.Update(product);
  }
}
