import { OrderProduct } from "./order_product";

export class CreateOrderInput {
  public constructor(
    public products: OrderProduct[],
    public userId?: number
  ) { }
  public static toInput(request: any): CreateOrderInput {
    const { userId, products } = request as {
      userId: number;
      products: OrderProduct[]
    };
    const orderProducts = products.map(product => {
      return new OrderProduct(product.quantity, undefined, product.productId)
    });
    return new CreateOrderInput(orderProducts, userId);
  }

  public isValid(): boolean {
    return this.products.every(orderProduct => orderProduct.isValid());
  }
}
