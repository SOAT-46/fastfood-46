import { PaginatedResponse } from "modules/shared/paginated_response";
import { OrderProduct, Order } from 'modules/orders/domain/entities';
import { PrismaOrder } from '../models';

export interface OrdersRepository {

  GetOrders(page: number, limit: number): Promise<PaginatedResponse<PrismaOrder>>;
  GetById(id: number): Promise<PrismaOrder | undefined>;
  Save(orderProducts: OrderProduct[], userId?: number): Promise<PrismaOrder>;
  Update(order: Order): Promise<PrismaOrder>;
}
