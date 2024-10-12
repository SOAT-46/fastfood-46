import { Product } from "../models";

export interface GetProductPort {
  Execute(product: Product): Promise<Product | undefined>
}
