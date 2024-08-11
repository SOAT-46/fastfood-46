import { PrismaClient } from '@prisma/client';

import { toDomain } from './mappers/order_mapper';
import { Order } from '../../domain/models/order';
import { OrdersRepository } from 'modules/orders/domain/repositories/orders_repository';
import { PaginatedResponse, Meta } from '../../../shared/paginated_response';
import { PrismaOrder } from './types';

export class PrismaOrderRepository implements OrdersRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  // public async GetOrders(page: number, limit: number): Promise<PaginatedResponse<Order>> {
  //   // const skip = (page - 1) * limit;

  //   // const totalCount = await this.prisma.products.count({
  //   //   where: { categoryId: id }
  //   // });
  //   // const totalPages = Math.ceil(totalCount / limit);

  //   // const products: PrismaOrder[] = await this.prisma.products.findMany({
  //   //   where: { categoryId: id },
  //   //   skip: skip,
  //   //   take: limit
  //   // });

  //   // const data = products.map(product => toDomain(product));
  //   // const meta = new Meta(totalCount, totalPages, page, limit);
  //   // return new PaginatedResponse<Order>(data, meta);
  //   return new PaginatedResponse<Order>([], new Meta(1,1,1,1));
  // }

  public async GetById(id: number): Promise<Order | undefined> {
    const resp = await this.prisma.orders.findFirst({ where: { id } });
    return resp ? toDomain(resp) : undefined;
  }

  // public async Save(data: Order): Promise<Order> {
  //   const resp = await this.prisma.orders.create({ data });
  //   return toDomain(resp);
  // }
}
