import { OrderStatus } from "./enums";
import { Payment } from "./payment";

export class Order {
  constructor(
    public id: number,
    public number: number,
    public status: OrderStatus,
    public receivedAt: Date,
    public updatedAt: Date,
    public payment: string,
    public qrCode?: string,
    public userId?: number | null
  ) { }

  public isValid(): boolean {
    return this.hasValidNumber() && this.hasValidStatus();
  }

  private hasValidNumber(): boolean {
    return this.number > 0;
  }

  private hasValidStatus(): boolean {
    return Object.values(OrderStatus).includes(this.status);
  }
}
