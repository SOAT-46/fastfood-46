import {Category} from '../../../../../../src/modules/categories/domain/models/category';
import {CategoriesRepository} from '../../../../../../src/modules/categories/domain/repositories/categories_repository';

export class CategoriesRepositoryStub implements CategoriesRepository {

  private showCategory: boolean = false;

  public withCategory() {
    this.showCategory = true;
    return this;
  }
  public async GetById(id: number): Promise<Category | undefined> {
    return new Promise(resolve => setImmediate(() => this.showCategory ? new Category(1, ''): undefined));
  }
}
