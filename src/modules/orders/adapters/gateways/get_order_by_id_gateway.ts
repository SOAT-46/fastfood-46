import { GetOrderByIdPort } from "modules/orders/domain/gateways/get_order_by_id_port";
import { Order } from "modules/orders/domain/entities/order";
import { OrdersRepository } from "modules/orders/adapters/repositories/contracts/orders_repository";

export class GetOrderByIdGateway implements GetOrderByIdPort {
  public constructor(private readonly ordersRepository: OrdersRepository) { }

  public async Execute(id: number): Promise<Order | undefined> {
    const entity = await this.ordersRepository.GetById(id);
    return entity?.toDomain();
  }
}
