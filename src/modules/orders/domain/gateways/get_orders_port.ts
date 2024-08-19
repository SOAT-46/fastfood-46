import {PaginatedResponse} from 'modules/shared/paginated_response';
import {Order} from '../models/order';

export interface GetOrdersPort {
  Execute(page: number, limit: number): Promise<PaginatedResponse<Order>>;
}
