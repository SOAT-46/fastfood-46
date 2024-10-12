import { Order } from "modules/orders/domain/entities/order";
import { UpdateOrderPort } from "modules/orders/domain/gateways";
import { OrdersRepository } from "modules/orders/adapters/repositories/contracts/orders_repository";

export class UpdateOrderGateway implements UpdateOrderPort {
  public constructor(private readonly ordersRepository: OrdersRepository) { }

  public async Execute(order: Order): Promise<Order | undefined> {
    try {
      const entity = await this.ordersRepository.Update(order);
      return entity.toDomain();
    } catch {
      return undefined;
    }
  }
}
