import {Product} from '../models/product';
import {PaginatedResponse} from '../../../shared/paginated_response';

export interface ProductsRepository {

  GetById(id: number): Promise<Product | undefined>;
  GetByName(name: string): Promise<Product | undefined>;
  GetProductsByCategoryId(id: number, page: number, limit: number): Promise<PaginatedResponse<Product>>;
  Save(product: Product): Promise<Product>;
  Update(product: Product): Promise<Product>;
  DeleteById(id: number): Promise<void>;
}
