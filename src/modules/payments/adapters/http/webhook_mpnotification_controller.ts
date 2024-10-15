import { FastifyRequest, FastifyReply } from 'fastify';
import {
  UpdatePaymentUseCase,
  Listeners } from '../../application/usecases/update_payment_use_case';
import { mapToDomain } from './mappers/mp_notification_mapper'

export class WebhookMpNotificationController {
  public constructor(
    private readonly updateOrderUseCase: UpdatePaymentUseCase
  ) { }

  public async execute(
    request: FastifyRequest<{Params: any; Body: any}>,
    response: FastifyReply): Promise<void> {
    const listeners: Listeners = {
      onSuccess: () => this.onSuccess(response),
      onNotFound: () => this.onNotFound(response),
      onError: () => this.onError(response)
    }
    return this.updateOrderUseCase.Execute(mapToDomain(request.body), listeners);
  }


  private onSuccess(response: FastifyReply) {
    response.code(200).send();
  }

  private onNotFound(response: FastifyReply) {
    response.notFound(`The payment does not exist`);
  }

  private onError(response: FastifyReply) {
    response.internalServerError("An error occurred while updating the payment");
  }
}
