import { Order } from './../../domain/models/order';
import { OrderProduct } from './../../domain/models/order_product';
import { SaveOrderPort } from './../../domain/gateways';

export interface Listeners {
  onSuccess: (order: Order) => void;
  onInvalid: () => void;
}

export class CreateOrderUseCase {
  public constructor(private readonly saveOrderGateway: SaveOrderPort) { }

  public async execute(products: OrderProduct[], listeners: Listeners, userId?: number): Promise<void> {
    const allValid = products.every(orderProduct => orderProduct.isValid());
    if (!allValid) {
      return listeners.onInvalid();
    }

    const created = await this.saveOrderGateway.Execute(products, userId);
    if (created == undefined) {
      return listeners.onInvalid();
    } else {
      return listeners.onSuccess(created);
    }
  }
}
