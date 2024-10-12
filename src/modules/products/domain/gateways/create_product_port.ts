import { Product } from "../models";

export interface CreateProductPort {
  Execute(product: Product): Promise<Product>
}
