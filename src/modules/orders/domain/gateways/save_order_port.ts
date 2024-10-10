import { Order } from "../models/order";
import { OrderProduct } from "../models/order_product";

export interface SaveOrderPort {
  Execute(products: OrderProduct[], userId?: number): Promise<Order | undefined>
}
