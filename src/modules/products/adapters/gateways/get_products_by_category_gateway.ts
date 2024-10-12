import { GetProductsByCategoryPort } from "modules/products/domain/gateways";
import { Product } from "modules/products/domain/models/product";
import { ProductsRepository } from "modules/products/adapters/repositories/contracts/products_repository";
import { PaginatedResponse } from "../../../shared";

export class GetProductsByCategoryGateway implements GetProductsByCategoryPort {
  public constructor(private readonly productsRepository: ProductsRepository) { }

  public async Execute(id: number, page: number, limit: number): Promise<PaginatedResponse<Product>> {
    const entities = await this.productsRepository.GetProductsByCategoryId(id, page, limit);
    const orders = entities.data.map(entity => entity.toDomain());
    return new PaginatedResponse(orders, entities.meta);
  }
}
