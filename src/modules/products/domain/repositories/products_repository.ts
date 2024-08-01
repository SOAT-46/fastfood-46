import {Product} from '../models/product';

export interface ProductsRepository {

  GetById(id: number): Promise<Product | undefined>;
  GetByName(name: string): Promise<Product | undefined>;

  Save(product: Product): Promise<Product>;
  Update(product: Product): Promise<Product>;
  DeleteById(id: number): Promise<void>;
}
