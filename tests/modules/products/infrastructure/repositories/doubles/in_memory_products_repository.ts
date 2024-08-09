import {Product} from '../../../../../../src/modules/products/domain/models/product';
import {Meta, PaginatedResponse} from '../../../../../../src/modules/shared/paginated_response';
import {ProductsRepository} from '../../../../../../src/modules/products/domain/repositories/products_repository';

export class InMemoryProductsRepository implements ProductsRepository {

  private products: Product[] = [];

  public withProducts(products: Product[]) {
    this.products.push(...products);
    return this;
  }

  public async GetById(id: number): Promise<Product | undefined> {
    const found = this.products.filter(product => product.id === id);
    return found.length > 0 ? found[0] : undefined;
  }

  public async GetByName(name: string): Promise<Product | undefined> {
    const found = this.products.filter(product => product.name === name);
    return found.length > 0 ? found[0] : undefined;
  }

  public async GetProductsByCategoryId(id: number, page: number, limit: number): Promise<PaginatedResponse<Product>> {
    const data = this.products.filter(product => product.categoryId === id);
    const meta = new Meta(1, 1, page, limit);
    return new PaginatedResponse<Product>(data, meta);
  }

  public async Save(product: Product): Promise<Product> {
    return product;
  }

  public async Update(product: Product): Promise<Product> {
    return product;
  }

  public async DeleteById(id: number): Promise<void> {
    // do nothing
  }
}
