
import { OrdersRepository } from "../../domain/repositories/orders_repository";
import {PaginatedResponse} from "../../../shared/paginated_response";
import { Order } from "../../domain/models/order";

export interface Listeners {
  onSuccess: (order: Order) => void;
  onEmpty: () => void;
}

export class GetOrderByIdUseCase {
  public constructor(private readonly ordersRepository: OrdersRepository) {}

  public async Execute(orderId: number, listeners: Listeners): Promise<void> {
    const response = await this.ordersRepository.GetById(orderId);

    if (response === undefined) {
      return listeners.onEmpty();
    }

    return listeners.onSuccess(response);
  }
}
