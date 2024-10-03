import { OrderProduct } from './../../domain/models/order_product';
import { Prisma, PrismaClient } from '@prisma/client';

import { toDomain } from './mappers/order_mapper';
import { Order } from '../../domain/models/order';
import { OrdersRepository } from 'modules/orders/domain/repositories/orders_repository';
import { PaginatedResponse, Meta } from '../../../shared/paginated_response';

export class PrismaOrdersRepository implements OrdersRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async GetOrders(page: number, limit: number): Promise<PaginatedResponse<Order>> {
    const skip = (page - 1) * limit;

    const [totalCount, orders] = await this.prisma.$transaction([
      this.prisma.orders.count({ where: { status: { in: ['DELIVERED', 'PREPARATION', 'READY'] } } }),
      this.prisma.orders.findMany({
        skip,
        take: limit,
        where: { status: { in: ['DELIVERED', 'PREPARATION', 'READY'] } },
        orderBy: [
          { status: 'desc' }, // Ready first, then Preparation, then Received
          { receivedAt: 'asc' } // Older orders first
        ],
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const data = orders.map(order => toDomain(order));
    const meta = new Meta(totalCount, totalPages, page, limit);
    return new PaginatedResponse<Order>(data, meta);
  }

  public async GetById(id: number): Promise<Order | undefined> {
    const resp = await this.prisma.orders.findFirst({ where: { id } });
    return resp ? toDomain(resp) : undefined;
  }

  public async Save(orderProducts: OrderProduct[], userId?: number): Promise<Order> {
    userId && await this.prisma.users.findFirstOrThrow({ where: { id: userId } })

    const totalCount = await this.prisma.orders.count();
    const nextOrder = totalCount + 1;

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

    const productsToAssociate = orderProducts.map(product => {
      return {
        product: {
          connect: { id: product.productId as number }
        },
        quantity: product.quantity
      }
    });

    const order: Prisma.ordersCreateArgs = {
      data: {
        number: nextOrder,
        status: 'PENDING',
        userId: userId && userId,
        products: {
          create: productsToAssociate
        },
        payment: {
          create: {
            status: 'COMPLETED',
            value: totalValue._sum.price as number
          }
        }
      },
      include: {
        payment: true
      }
    };

    const resp = await this.prisma.orders.create(order);
    return toDomain(resp);
  }
}
