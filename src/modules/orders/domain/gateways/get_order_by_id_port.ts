import { Order } from "../entities/order";

export interface GetOrderByIdPort {
  Execute(id: number): Promise<Order | undefined>;
}
