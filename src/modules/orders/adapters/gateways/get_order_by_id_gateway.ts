import { GetOrderByIdPort } from "modules/orders/domain/gateways/get_order_by_id_port";
import { Order } from "modules/orders/domain/models/order";
import { OrdersRepository } from "modules/orders/domain/repositories/orders_repository";

export class GetOrderByIdGateway implements GetOrderByIdPort {

  public constructor(private readonly ordersRepository: OrdersRepository) {}

  public async Execute(id: number): Promise<Order | undefined> {
    return await this.ordersRepository.GetById(id);
  }
}
