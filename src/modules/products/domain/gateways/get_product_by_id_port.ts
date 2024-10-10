import { Product } from "../models";

export interface GetProductByIdPort {
  Execute(id: number): Promise<Product | undefined>
}
