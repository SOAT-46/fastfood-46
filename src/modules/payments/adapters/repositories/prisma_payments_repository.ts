import { PrismaClient } from '@prisma/client';
import { PaymentsRepository } from './contracts/payments_repository';
import { Payment } from "../../domain/models";
import { mapToPrismaPaymentStatus } from './models/prisma_payment_status';

export class PrismaPaymentsRepository implements PaymentsRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async Update(entry: Payment): Promise<void> {
    const prismaPaymentStatus = mapToPrismaPaymentStatus(entry.status);
    await this.prisma.payments.update({
      where: {
        id: entry.id,
      },
      data: {
        status: prismaPaymentStatus,
        updatedAt: new Date(),
        order: {
          update: {
            status: entry.orderStatus,
          }
        }
      },
    });
    return;
  }
}
