import {Order} from './../models/order';
import {PaginatedResponse} from '../../../shared/paginated_response';
import {OrderProduct} from '../models/order_product';

export interface OrdersRepository {
  GetOrders(page: number, limit: number): Promise<PaginatedResponse<Order>>;
  GetById(id: number): Promise<Order | undefined>;
  Save(orderProducts: OrderProduct[], userId?: number): Promise<Order>;
}
