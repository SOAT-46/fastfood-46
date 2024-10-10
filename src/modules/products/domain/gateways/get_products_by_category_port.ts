import { PaginatedResponse } from "modules/shared/paginated_response";
import { Product } from "../models";

export interface GetProductsByCategoryPort {
  Execute(id: number, page: number, limit: number): Promise<PaginatedResponse<Product>>;
}
