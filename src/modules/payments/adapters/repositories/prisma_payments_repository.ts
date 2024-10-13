import { PrismaClient } from '@prisma/client';
import { PaymentsRepository } from './contracts/payments_repository';


export class PrismaPaymentsRepository implements PaymentsRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async Update(id: number): Promise<void> {
    // const category = await this.prisma.payments.findUnique({ where: { id } });
  }
}
