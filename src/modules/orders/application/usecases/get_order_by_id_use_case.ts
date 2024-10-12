import {Order} from '../../domain/models/order';
import {GetOrderByIdPort} from '../../domain/gateways';

export interface Listeners {
  onSuccess: (order: Order) => void;
  onEmpty: () => void;
}

export class GetOrderByIdUseCase {
  public constructor(private readonly getOrderByIdGateway: GetOrderByIdPort) {}

  public async Execute(orderId: number, listeners: Listeners): Promise<void> {
    const response = await this.getOrderByIdGateway.Execute(orderId);

    if (response === undefined) {
      return listeners.onEmpty();
    }
    return listeners.onSuccess(response);
  }
}
