import { PaginatedResponse } from "modules/shared/paginated_response";
import { Product } from "../models/product";

export interface GetProductsByCategoryPort {
  Execute(id: number, page: number, limit: number): Promise<PaginatedResponse<Product>>;
}