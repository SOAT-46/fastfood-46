import {Order} from '../../domain/models/order';
import {PaginatedResponse} from '../../../shared/paginated_response';
import {GetOrdersPort} from 'modules/orders/domain/gateways/get_orders_port';

export interface Listeners {
  onSuccess: (order: PaginatedResponse<Order>) => void;
  onEmpty: () => void;
  onBadRequest: () => void;
}

export class GetOrdersUseCase {
  public constructor(private readonly getOrdersGateway: GetOrdersPort) { }

  public async Execute(page: number, limit: number, listeners: Listeners): Promise<void> {
    if (page <= 0 || limit <= 0) {
      return listeners.onBadRequest();
    }

    const response = await this.getOrdersGateway.Execute(page, limit);
    if (response.IsEmpty()) {
      return listeners.onEmpty();
    }
    return listeners.onSuccess(response);
  }
}
