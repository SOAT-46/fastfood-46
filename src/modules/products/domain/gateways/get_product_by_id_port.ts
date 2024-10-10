import { Product } from "../models/product";

export interface GetProductByIdPort {
  Execute(id: number): Promise<Product | undefined>
}
