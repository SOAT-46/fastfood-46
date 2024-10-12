import { GetProductByIdPort } from "modules/products/domain/gateways";
import { Product } from "modules/products/domain/models/product";
import { ProductsRepository } from "modules/products/adapters/repositories/contracts/products_repository";

export class GetProductByIdGateway implements GetProductByIdPort {
  public constructor(private readonly productsRepository: ProductsRepository) { }

  public async Execute(id: number): Promise<Product | undefined> {
    const entity = await this.productsRepository.GetById(id);
    return entity?.toDomain();
  }

}
