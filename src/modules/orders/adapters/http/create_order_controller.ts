import {OrderProduct} from './../../domain/models/order_product';
import {FastifyRequest, FastifyReply} from 'fastify';

import {Order} from '../../domain/models/order';
import {CreateOrderUseCase, Listeners} from '../../application/usecases/create_order_use_case';

const toDomain = (products: OrderProduct[]): OrderProduct[] => {
  const orderProducts = products.map(product => {
    return new OrderProduct(product.quantity, undefined, product.productId)
  });
  return orderProducts;
}
export class CreateOrderController {
  public constructor(private readonly createOrderUseCase: CreateOrderUseCase) { }

  public async execute(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const listeners: Listeners = {
      onSuccess: (order) => this.onSuccess(order, response),
      onInvalid: () => this.onInvalid(response),
    };

    const {userId, products} = request.body as {
      userId: number;
      products: OrderProduct[]
    };

    return this.createOrderUseCase.execute(toDomain(products), listeners, userId);
  }

  private onSuccess(order: Order, response: FastifyReply) {
    response.code(201).send(order);
  }

  private onInvalid(response: FastifyReply) {
    response.badRequest('The order is invalid');
  }
}
