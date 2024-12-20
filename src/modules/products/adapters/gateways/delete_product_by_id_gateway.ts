import { DeleteProductByIdPort } from "modules/products/domain/gateways";
import { ProductsRepository } from "modules/products/adapters/repositories/contracts/products_repository";

export class DeleteProductByIdGateway implements DeleteProductByIdPort {
  public constructor(private readonly productsRepository: ProductsRepository) { }

  public async Execute(id: number): Promise<void> {
    return this.productsRepository.DeleteById(id);
  }
}
