import {Product} from '../../../../../../src/modules/products/domain/models/product';
import {PaginatedResponse} from '../../../../../../src/modules/shared/paginated_response';
import {ProductsRepository} from '../../../../../../src/modules/products/domain/repositories/products_repository';

export class ProductsRepositoryStub implements ProductsRepository {

  private showProduct: boolean = false;

  public withProduct() {
    this.showProduct = true;
    return this;
  }

  public async GetById(id: number): Promise<Product | undefined> {
    throw new Error('Method not implemented.');
  }

  public async GetByName(name: string): Promise<Product | undefined> {
    return new Promise(resolve => this.showProduct ? new Product('', '', 100, 1, 1) : undefined);
  }

  public async GetProductsByCategoryId(id: number, page: number, limit: number): Promise<PaginatedResponse<Product>> {
    throw new Error('Method not implemented.');
  }

  public async Save(product: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  public async Update(product: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  public async DeleteById(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
