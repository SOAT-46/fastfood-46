import {GetProductsByCategoryPort} from 'modules/products/domain/gateways';
import {Product} from 'modules/products/domain/models/product';
import {ProductsRepository} from 'modules/products/domain/repositories/products_repository';
import {PaginatedResponse} from 'modules/shared/paginated_response';

export class GetProductsByCategoryGateway implements GetProductsByCategoryPort {
  public constructor(private readonly productsRepository: ProductsRepository) { }

  public async Execute(id: number, page: number, limit: number): Promise<PaginatedResponse<Product>> {
    return this.productsRepository.GetProductsByCategoryId(id, page, limit);
  }

}
