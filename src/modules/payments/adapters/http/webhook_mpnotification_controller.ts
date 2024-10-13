import { FastifyRequest, FastifyReply } from 'fastify';
// import { Params, UpdateOrderRequest } from "./routes/parameters/types";
// import { UpdateOrderUseCase, Listeners } from "modules/orders/application/usecases/update_order_use_case";

export class WebhookMpNotificationController {
  public constructor(
    // private readonly updateOrderUseCase: UpdateOrderUseCase
  ) { }

  public async execute(
    // request: FastifyRequest<{Params: Params; Body: UpdateOrderRequest}>,
    request: FastifyRequest<{Params: any; Body: any}>,
    response: FastifyReply): Promise<void> {
    // const listeners: Listeners = {
    //   onSuccess: () => this.onSuccess(response),
    //   onNotFound: () => this.onNotFound(response),
    //   onError: () => this.onError(response)
    // }
    // return this.updateOrderUseCase.Execute(OrderMapper.toDomain(request), null);
    console.log(request);
  }


  private onSuccess(response: FastifyReply) {
    response.code(200).send();
  }

  private onNotFound(response: FastifyReply) {
    response.notFound(`The order does not exist`);
  }

  private onError(response: FastifyReply) {
    response.internalServerError("An error occurred while updating the order");
  }
}
