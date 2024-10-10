import { Product } from "../../domain/models";
import { GetProductsByCategoryPort } from "../../domain/gateways";
import { PaginatedResponse } from "../../../shared";

export interface Listeners {
  onSuccess: (product: PaginatedResponse<Product>) => void;
  onEmpty: () => void;
}

export class GetProductsByCategoryUseCase {
  public constructor(private readonly getProductsByCategoryGateway: GetProductsByCategoryPort) { }

  public async execute(categoryId: number, page: number, limit: number, listeners: Listeners): Promise<void> {
    const response = await this.getProductsByCategoryGateway.Execute(
      categoryId, page, limit);

    if (response.IsEmpty()) {
      return listeners.onEmpty();
    }
    return listeners.onSuccess(response);
  }
}
