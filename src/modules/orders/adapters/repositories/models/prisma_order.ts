import { Order } from "../../../domain/entities/order";
import { OrderStatus } from "../../../domain/entities/enums";
import { PrismaOrderStatus } from './order_status';
import { PrismaPayment, PrismaPaymentBuilder } from './prisma_payment';

export class PrismaOrder {
  public constructor(
    public id: number,
    public number: number,
    public status: PrismaOrderStatus,
    public receivedAt: Date,
    public updatedAt: Date,
    public payment: PrismaPayment,
    public userId?: number | null
  ) {}

  public static fromDatabase(db: any): PrismaOrder {
    return PrismaOrderBuilder.fromDatabase(db);
  }

  public toDomain(qrCode: string = ''): Order {
    return new Order(
      this.id,
      this.number,
      convertToEnum(this.status),
      this.receivedAt,
      this.updatedAt,
      this.payment?.status!,
      qrCode,
      this.userId
    )
  }
}

const convertToEnum = (status: string): OrderStatus => {
  const enumValue = Object.values(OrderStatus).find(os => os.toString() == status);
  return <OrderStatus>enumValue || OrderStatus.RECEIVED;
}

class PrismaOrderBuilder {
  public static fromDatabase(db: any): PrismaOrder {
    const payment = PrismaPaymentBuilder.fromDatabase(db.payment);
    return new PrismaOrder(
      db.id,
      db.number,
      db.status,
      db.receivedAt,
      db.updatedAt,
      payment,
      db.userId
    );
  }
}
