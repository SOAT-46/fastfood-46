import { Order } from "../../domain/models/order";
import { PaginatedResponse } from "../../../shared/paginated_response";
import { GetOrdersPort } from "modules/orders/domain/gateways/get_orders_port";

export interface Listeners {
  onSuccess: (order: PaginatedResponse<Order>) => void;
  onEmpty: () => void;
}

export class GetOrdersUseCase {
  public constructor(private readonly getOrdersPort: GetOrdersPort) { }

  public async Execute(page: number, limit: number, listeners: Listeners): Promise<void> {
    const response = await this.getOrdersPort.Execute(page, limit);

    if (response.IsEmpty()) {
      return listeners.onEmpty();
    }
    return listeners.onSuccess(response);
  }
}
