import {Product} from '../models/product';

export interface UpdateProductPort {
  Execute(product: Product): Promise<Product>
}
