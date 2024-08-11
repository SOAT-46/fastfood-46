import {Product} from "../../domain/models/product";
import {ProductsRepository} from "../../domain/repositories/products_repository";
import {PaginatedResponse} from "../../../shared/paginated_response";

export interface Listeners {
  onSuccess: (product: PaginatedResponse<Product>) => void;
  onEmpty: () => void;
}

export class GetProductsByCategoryUseCase {
  public constructor(private readonly productsRepository: ProductsRepository) {}

  public async Execute(categoryId: number, page: number, limit: number, listeners: Listeners): Promise<void> {
    const response = await this.productsRepository.GetProductsByCategoryId(
      categoryId, page, limit);

    if (response.IsEmpty()) {
      return listeners.onEmpty();
    }

    return listeners.onSuccess(response);
  }
}
