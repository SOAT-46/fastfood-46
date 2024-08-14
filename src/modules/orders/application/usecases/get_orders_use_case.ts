import { Order } from "../../domain/models/order";
import { OrdersRepository } from "../../domain/repositories/orders_repository";
import { PaginatedResponse } from "../../../shared/paginated_response";

export interface Listeners {
  onSuccess: (order: PaginatedResponse<Order>) => void;
  onEmpty: () => void;
}

export class GetOrdersUseCase {
  public constructor(private readonly ordersRepository: OrdersRepository) { }

  public async Execute(page: number, limit: number, listeners: Listeners): Promise<void> {
    const response = await this.ordersRepository.GetOrders(page, limit);

    if (response.IsEmpty()) {
      return listeners.onEmpty();
    }

    return listeners.onSuccess(response);
  }
}
