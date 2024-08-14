import { orderStatus } from "../enums/order_status";

export class Order {
  constructor(
    public id: number,
    public number: number,
    public status: 'PENDING' | 'RECEIVED' | 'PREPARATION' | 'READY' | 'DELIVERED' | 'CANCELLED',
    public receivedAt: Date,
    public updatedAt: Date,
    public paymentId?: number | null,
    public userId?: number | null
  ) {}

  public isValid(): boolean {
    return this.hasValidNumber() && this.hasValidStatus();
  }

  private hasValidNumber(): boolean {
    return this.number !== null;
  }

  private hasValidStatus(): boolean {
    return Object.values(orderStatus).includes(this.status);
  }
}
