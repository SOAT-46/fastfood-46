import { GetOrdersPort } from "modules/orders/domain/gateways/get_orders_port";
import { Order } from "modules/orders/domain/models/order";
import { PaginatedResponse } from "modules/shared/paginated_response";
import { OrdersRepository } from "modules/orders/domain/repositories/orders_repository";

export class GetOrdersGateway implements GetOrdersPort {
  public constructor(private readonly ordersRepository: OrdersRepository) {}

  public async Execute(page: number, limit: number): Promise<PaginatedResponse<Order>> {
    return this.ordersRepository.GetOrders(page, limit);
  }
}
