import { Category } from "../models/category";

export interface GetCategoryByIdPort {
  Execute(id: number) : Promise<Category | undefined>
}
