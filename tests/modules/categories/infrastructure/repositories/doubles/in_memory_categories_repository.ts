import {Category} from '../../../../../../src/modules/categories/domain/models/category';
import {CategoriesRepository} from '../../../../../../src/modules/categories/domain/repositories/categories_repository';

export class InMemoryCategoriesRepository implements CategoriesRepository {

  private categories: Category[] = [];

  public withCategories(categories: Category[]) {
    this.categories.push(...categories);
    return this;
  }

  public async GetById(id: number): Promise<Category | undefined> {
    const found = this.categories.filter(category => category.id === id);
    return found.length > 0 ? found[0] : undefined;
  }
}
