import {FastifyRequest, FastifyReply} from 'fastify';
import {Params} from './routes/parameters/types';
import {Order} from '../../domain/models/order';
import {GetOrderByIdUseCase, Listeners} from 'modules/orders/application/usecases/get_order_by_id_use_case';

export class GetOrderByIdController {
  public constructor(private readonly getOrderByIdUseCase: GetOrderByIdUseCase) { }

  public async execute(request: FastifyRequest<{ Params: Params }>, response: FastifyReply): Promise<void> {
    const id = Number(request.params.id);
    const listeners: Listeners = {
      onSuccess: (page) => this.onSuccess(page, response),
      onEmpty: () => this.onEmpty(response)
    }
    return this.getOrderByIdUseCase.Execute(id, listeners)
  }

  private onSuccess(order: Order, response: FastifyReply) {
    response.code(200).send(order);
  }

  private onEmpty(response: FastifyReply) {
    response.code(204)
  }
}
