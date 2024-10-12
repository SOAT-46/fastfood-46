import { SaveOrderPort } from "modules/orders/domain/gateways/save_order_port";
import { Order } from "modules/orders/domain/entities/order";
import { OrdersRepository } from "modules/orders/adapters/repositories/contracts/orders_repository";
import { CreateOrderInput } from "../../domain/entities/create_order_input";

export class SaveOrderGateway implements SaveOrderPort {
  public constructor(private readonly ordersRepository: OrdersRepository) { }

  public async Execute(input: CreateOrderInput): Promise<Order | undefined> {
    try {
      const created = await this.ordersRepository.Save(input.products, input.userId);
      return created.toDomain();
    } catch (exception) {
      return undefined;
    }
  }
}
