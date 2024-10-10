import { PrismaClient } from '@prisma/client';

import { CategoriesRepository } from './contracts/categories_repository';
import { PrismaCategory } from './models';

export class PrismaCategoriesRepository implements CategoriesRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async GetById(id: number): Promise<PrismaCategory | undefined> {
    const category = await this.prisma.categories.findUnique({ where: { id } });
    return category ? PrismaCategory.fromDatabase(category) : undefined;
  }
}
