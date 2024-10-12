import { Product } from "../models/product";

export interface CreateProductPort {
  Execute(product: Product): Promise<Product>
}
