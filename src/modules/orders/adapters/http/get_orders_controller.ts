import { FastifyRequest, FastifyReply } from 'fastify';
import { Params } from "./routes/parameters/types";
import { Order } from '../../domain/models/order';
import { GetOrdersUseCase, Listeners } from '../../application/usecases/get_orders_use_case';
import { PaginatedResponse } from 'modules/shared/paginated_response';

export class GetOrdersController {
  public constructor(private readonly getOrdersUseCase: GetOrdersUseCase) { }

  public async execute(request: FastifyRequest<{ Params: Params }>, response: FastifyReply): Promise<void> {
    const {page = 1, limit = 10} = request.query as { page?: number, limit?: number };
    const listeners: Listeners = {
      onSuccess: (page) => this.onSuccess(page, response),
      onEmpty: () => this.onEmpty(response),
      onBadRequest: () => this.onBadRequest(response),
    }
    return this.getOrdersUseCase.Execute(page, limit, listeners)
  }

  private onSuccess(page: PaginatedResponse<Order>, response: FastifyReply) {
    response.code(200).send(page);
  }

  private onEmpty(response: FastifyReply) {
    response.code(204)
  }

  private onBadRequest(response: FastifyReply) {
    response.badRequest("Page or Limit invalid");
  }
}
