import { Product } from "modules/products/domain/models/product";

export interface GetProductPort {
  Execute(product: Product): Promise<Product | undefined>
}
