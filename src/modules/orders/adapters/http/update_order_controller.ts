import { FastifyRequest, FastifyReply } from 'fastify';
import { Params, UpdateOrderRequest } from "./routes/parameters/types";
import { UpdateOrderUseCase, Listeners } from "modules/orders/application/usecases/update_order_use_case";
import { Order } from 'modules/orders/domain/entities';
import { OrderMapper } from './mappers/order_mapper';

export class UpdateOrderController {
  public constructor(private readonly updateOrderUseCase: UpdateOrderUseCase) { }

  public async execute(
    request: FastifyRequest<{Params: Params; Body: UpdateOrderRequest}>,
    response: FastifyReply): Promise<void> {
    const listeners: Listeners = {
      onSuccess: (order) => this.onSuccess(order, response),
      onNotFound: () => this.onNotFound(response),
      onError: () => this.onError(response)
    }
    return this.updateOrderUseCase.Execute(OrderMapper.toDomain(request), listeners);
  }


  private onSuccess(order: Order, response: FastifyReply) {
    response.code(200).send(order);
  }

  private onNotFound(response: FastifyReply) {
    response.notFound(`The order does not exist`);
  }

  private onError(response: FastifyReply) {
    response.internalServerError("An error occurred while updating the order");
  }
}
