import {SaveOrderPort} from 'modules/orders/domain/gateways/save_order_port';
import {Order} from 'modules/orders/domain/models/order';
import {OrderProduct} from 'modules/orders/domain/models/order_product';
import {OrdersRepository} from 'modules/orders/domain/repositories/orders_repository';

export class SaveOrderGateway implements SaveOrderPort {

  public constructor(private readonly ordersRepository: OrdersRepository) {}

  public async Execute(products: OrderProduct[], userId?: number): Promise<Order | undefined> {
    try {
      const created = await this.ordersRepository.Save(products, userId);
      return created;
    } catch {
      return undefined;
    }
  }
}
