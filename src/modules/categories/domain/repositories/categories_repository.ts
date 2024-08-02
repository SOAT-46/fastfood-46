import {Category} from "../models/category";

export interface CategoriesRepository {

  GetById(id: number): Promise<Category | undefined>
}
