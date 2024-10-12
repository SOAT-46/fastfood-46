import { PrismaCategory } from "../models";

export interface CategoriesRepository {

  GetById(id: number): Promise<PrismaCategory | undefined>
}
