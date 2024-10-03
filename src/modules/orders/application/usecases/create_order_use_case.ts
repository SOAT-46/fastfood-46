import { Order } from './../../domain/models/order';
import { OrderProduct } from './../../domain/models/order_product';
import { OrdersRepository } from './../../domain/repositories/orders_repository';

export interface Listeners {
  onSuccess: (order: Order) => void;
  onInvalid: () => void;
}

export class CreateOrderUseCase {
  public constructor(
    private readonly ordersRepository: OrdersRepository
  ) {}

  public async execute(products: OrderProduct[], listeners: Listeners, userId?: number): Promise<void> {
    const allValid = products.every(orderProduct => orderProduct.isValid());
    if (!allValid) {
      return listeners.onInvalid();
    }

    try {
      const created = await this.ordersRepository.Save(products, userId);
      return listeners.onSuccess(created);
    } catch {
      return listeners.onInvalid();
    }
  }
}
