export class OrderProduct {
  constructor(
    public quantity: number,
    public orderId?: number,
    public productId?: number
  ) { }

  public isValid(): boolean {
    return (this.hasValidOrder() || this.hasValidProduct()) && this.hasValidQuantity();
  }

  private hasValidOrder(): boolean {
    return this.orderId !== null;
  }

  private hasValidProduct(): boolean {
    return this.productId !== null;
  }

  private hasValidQuantity(): boolean {
    return this.quantity !== null && this.quantity > 0;
  }
}
