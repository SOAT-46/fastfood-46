import { Prisma, PrismaClient } from '@prisma/client';

import { OrderProduct, Order } from 'modules/orders/domain/entities';
import { OrdersRepository } from 'modules/orders/adapters/repositories/contracts/orders_repository';
import { PaginatedResponse, Meta } from '../../../shared';
import { PrismaOrder } from './models';

export class PrismaOrdersRepository implements OrdersRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async GetOrders(page: number, limit: number): Promise<PaginatedResponse<PrismaOrder>> {
    const skip = (page - 1) * limit;

    const totalCount = await this.prisma.orders.count();
    const totalPages = Math.ceil(totalCount / limit);

    const orders = await this.prisma.orders.findMany({
      skip: skip,
      take: limit,
      include: { payment: true, user: true },
    });

    const data = orders.map(order => PrismaOrder.fromDatabase(order));
    const meta = new Meta(totalCount, totalPages, page, limit);
    return new PaginatedResponse<PrismaOrder>(data, meta);
  }

  public async GetById(id: number): Promise<PrismaOrder | undefined> {
    const resp = await this.prisma.orders.findFirst({ where: { id }, include: { payment: true, user: true } });
    return resp ? PrismaOrder.fromDatabase(resp) : undefined;
  }

  public async Save(orderProducts: OrderProduct[], userId?: number): Promise<PrismaOrder> {
    userId && await this.prisma.users.findFirstOrThrow({ where: { id: userId } });

    const totalCount = await this.prisma.orders.count();
    const nextOrder = totalCount + 1;

    const productsToAssociate = orderProducts.map(product => ({
      product: { connect: { id: product.productId as number } },
      quantity: product.quantity,
    }));

    const value = await this.getTotalValue(orderProducts);
    const order: Prisma.ordersCreateArgs = {
      data: {
        number: nextOrder,
        status: 'PENDING',
        userId: userId && userId,
        products: { create: productsToAssociate },
        payment: {
          create: {
            status: 'PENDING',
            value: value,
          }
        }
      },
      include: { payment: true, user: true },
    };

    const resp = await this.prisma.orders.create(order);
    return PrismaOrder.fromDatabase(resp);
  }

  public async Update(order: Order): Promise<PrismaOrder> {
    const resp = await this.prisma.orders.update({
      where: {
        id: order.id
      },
      data: {
        status: order.status,
        updatedAt: new Date(),
      },
      include: { payment: true, user: true },
    });
    return PrismaOrder.fromDatabase(resp);
  }

  private async getTotalValue(orderProducts: OrderProduct[]): Promise<number> {
    const productIds = orderProducts.map(product => product.productId) as number[];
    const totalValue = await this.prisma.products.aggregate({
      where: {
        id: {
          in: productIds,
        },
      },
      _sum: {
        price: true,
      },
    });
    return totalValue._sum?.price ?? 0;
  }
}
