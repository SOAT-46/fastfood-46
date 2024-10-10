import { GetOrdersPort } from "modules/orders/domain/gateways/get_orders_port";
import { Order } from "modules/orders/domain/entities/order";
import { PaginatedResponse } from "../../../shared";
import { OrdersRepository } from "modules/orders/adapters/repositories/contracts/orders_repository";

export class GetOrdersGateway implements GetOrdersPort {
  public constructor(private readonly ordersRepository: OrdersRepository) {}

  public async Execute(page: number, limit: number): Promise<PaginatedResponse<Order>> {
    const entities = await this.ordersRepository.GetOrders(page, limit);
    const orders = entities.data.map(entity => entity.toDomain());
    return new PaginatedResponse(orders, entities.meta);
  }
}
