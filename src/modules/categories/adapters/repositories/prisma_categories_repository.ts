import { PrismaClient } from '@prisma/client';

import { Category } from '../../domain/models/category';
import { CategoriesRepository } from '../../domain/repositories/categories_repository';

export class PrismaCategoriesRepository implements CategoriesRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async GetById(id: number): Promise<Category | undefined> {
    const resp = await this.prisma.categories.findUnique({ where: { id } });
    return resp ? new Category(id, resp.name) : undefined;
  }
}
