import { Order } from './../models/order';
import { PaginatedResponse } from "../../../shared/paginated_response";

export interface OrdersRepository {

  // GetOrders(page: number, limit: number): Promise<PaginatedResponse<Order>>;
  GetById(id: number): Promise<Order | undefined>;

  // Save(order: Order): Promise<Order>;
}
