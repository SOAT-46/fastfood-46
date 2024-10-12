import {GetCategoryByIdPort} from 'modules/categories/domain/gateways/get_category_by_id_port';
import {Category} from 'modules/categories/domain/models/category';
import {CategoriesRepository} from 'modules/categories/domain/repositories/categories_repository';

export class GetCategoryByIdGateway implements GetCategoryByIdPort {
  public constructor(private readonly categoriesRepository: CategoriesRepository) { }

  public async Execute(id: number): Promise<Category | undefined> {
    return await this.categoriesRepository.GetById(id);
  }
}
