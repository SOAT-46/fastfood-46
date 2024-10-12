import { PrismaClient } from '@prisma/client';

import { Product } from '../../domain/models';
import { ProductsRepository } from './contracts/products_repository';
import { PaginatedResponse, Meta } from '../../../shared';
import { PrismaProduct } from './models/prisma_product';

export class PrismaProductsRepository implements ProductsRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async GetById(id: number): Promise<PrismaProduct | undefined> {
    return this.findProduct({ id });
  }

  public async GetByName(name: string): Promise<PrismaProduct | undefined> {
    return this.findProduct({ name });
  }

  public async GetProductsByCategoryId(id: number, page: number, limit: number): Promise<PaginatedResponse<PrismaProduct>> {
    const skip = (page - 1) * limit;

    const totalCount = await this.prisma.products.count({
      where: { categoryId: id }
    });
    const totalPages = Math.ceil(totalCount / limit);

    const products = await this.prisma.products.findMany({
      where: { categoryId: id },
      skip: skip,
      take: limit
    });

    const data = products.map(product => PrismaProduct.fromDatabase(product));
    const meta = new Meta(totalCount, totalPages, page, limit);
    return new PaginatedResponse<PrismaProduct>(data, meta);
  }

  public async Save(data: Product): Promise<PrismaProduct> {
    const resp = await this.prisma.products.create({ data });
    return PrismaProduct.fromDatabase(resp);
  }

  public async Update(product: Product): Promise<PrismaProduct> {
    const resp = await this.prisma.products.update({
      where: {
        id: product.id
      },
      data: {
        description: product.description || undefined,
        name: product.name || undefined,
        price: product.price || undefined,
      }
    });
    return PrismaProduct.fromDatabase(resp);
  }

  public async DeleteById(id: number): Promise<void> {
    await this.prisma.products.delete({ where: { id } });
  }

  private async findProduct(where: object): Promise<PrismaProduct | undefined> {
    const resp = await this.prisma.products.findFirst({ where });
    return resp ? PrismaProduct.fromDatabase(resp) : undefined;
  }
}
