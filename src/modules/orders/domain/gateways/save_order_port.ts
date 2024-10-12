import { Order } from "../entities/order";
import {CreateOrderInput} from "../entities/create_order_input";

export interface SaveOrderPort {
  Execute(input: CreateOrderInput): Promise<Order | undefined>
}
