import { Order } from "../entities/order";

export interface UpdateOrderPort {
  Execute(order: Order): Promise<Order | undefined>;
}
