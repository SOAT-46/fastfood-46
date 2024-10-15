import { PrismaPaymentStatus } from './prisma_payment_status';

export class PrismaPayment {
  public constructor(
    public id: number,
    public value: number,
    public status: PrismaPaymentStatus,
    public receivedAt: Date,
    public updatedAt: Date
  ) {}

  public static fromDatabase(db: any): PrismaPayment {
    return PrismaPayment.fromDatabase(db);
  }
}

export class PrismaPaymentBuilder {
  public static fromDatabase(db: any): PrismaPayment {
    return new PrismaPayment(
      db.id,
      db.value,
      db.status,
      db.receivedAt,
      db.updatedAt,
    );
  }
}
