import {Order} from '../models/order';

export interface GetOrderByIdPort {
  Execute(id: number): Promise<Order | undefined>;
}
