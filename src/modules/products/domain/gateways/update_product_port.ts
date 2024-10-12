import { Product } from "../models";

export interface UpdateProductPort {
  Execute(product: Product): Promise<Product>
}
