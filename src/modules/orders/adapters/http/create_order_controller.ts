import {FastifyReply, FastifyRequest} from 'fastify';

import {Order} from '../../domain/entities/order';
import {CreateOrderUseCase, Listeners} from '../../application/usecases/create_order_use_case';
import {CreateOrderInput} from "../../domain/entities/create_order_input";

export class CreateOrderController {
  public constructor(private readonly createOrderUseCase: CreateOrderUseCase) { }

  public async execute(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const listeners: Listeners = {
      onSuccess: (order) => this.onSuccess(order, response),
      onInvalid: () => this.onInvalid(response),
    };

    return this.createOrderUseCase.execute(CreateOrderInput.toInput(request.body), listeners);
  }

  private onSuccess(order: Order, response: FastifyReply) {
    response.code(201).send(order);
  }

  private onInvalid(response: FastifyReply) {
    response.badRequest("The order is invalid");
  }
}
