import { Order } from "../../domain/entities/order";
import { SaveOrderPort } from "../../domain/gateways";
import {CreateOrderInput} from "../../domain/entities/create_order_input";

export interface Listeners {
  onSuccess: (order: Order) => void;
  onInvalid: () => void;
}

export class CreateOrderUseCase {
  public constructor(private readonly saveOrderGateway: SaveOrderPort) { }

  public async execute(dto: CreateOrderInput, listeners: Listeners): Promise<void> {
    if (!dto.isValid()) {
      return listeners.onInvalid();
    }

    const created = await this.saveOrderGateway.Execute(dto);
    if (created) {
      return listeners.onSuccess(created);
    } else {
      return listeners.onInvalid();
    }
  }
}
