import {PrismaClient} from '@prisma/client';

import {toDomain} from './mappers/product_mapper';
import {Product} from '../../domain/models/product';
import {ProductsRepository} from '../../domain/repositories/products_repository';

export class PrismaProductsRepository implements ProductsRepository {
  public constructor(private readonly prisma: PrismaClient) {}

  public async GetById(id: number): Promise<Product | undefined> {
    const resp = await this.prisma.products.findFirst({where: {id}});
    return resp ? toDomain(resp) : undefined;
  }

  public async GetByName(name: string): Promise<Product | undefined> {
    const resp = await this.prisma.products.findFirst({where: {name}});
    return resp ? toDomain(resp) : undefined;
  }

  public async Save(data: Product): Promise<Product> {
    const resp = await this.prisma.products.create({data});
    return toDomain(resp);
  }

  public async Update(product: Product): Promise<Product> {
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
    return toDomain(resp);
  }

  public async DeleteById(id: number): Promise<void> {
    await this.prisma.products.delete({where: {id}});
  }
}
