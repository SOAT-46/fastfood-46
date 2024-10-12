import { Order } from '../../domain/entities/order';
import { GetOrderByIdPort, UpdateOrderPort } from '../../domain/gateways';

export interface Listeners {
  onSuccess: (order: Order) => void;
  onNotFound: () => void;
  onError: () => void;
}

export class UpdateOrderUseCase {
  public constructor(
    private readonly getOrderByIdGateway: GetOrderByIdPort,
    private readonly updateOrderGateway: UpdateOrderPort,
  ) {}

  public async Execute(order: Order, listeners: Listeners): Promise<void> {
    const found = await this.getOrderByIdGateway.Execute(order.id);
    if (!found) {
      return listeners.onNotFound();
    }
    const updated = await this.updateOrderGateway.Execute(order);
    if (updated) {
      return listeners.onSuccess(updated);
    }
    return listeners.onError();
  }
}
