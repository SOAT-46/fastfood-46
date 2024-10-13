import { UpdatePaymentPort } from './../../domain/gateways/update_payment_port';
import { WebhookMpNotificationPort } from './../../domain/gateways/webhook_mpnotification_port';

export interface Listeners {
  onSuccess: () => void;
  onNotFound: () => void;
  onError: () => void;
}

export class UpdateOrderUseCase {
  public constructor(
    private readonly getPaymentByIdGateway: WebhookMpNotificationPort,
    private readonly updateOrderGateway: UpdatePaymentPort,
  ) {}

  public async Execute(notification: any, listeners: Listeners): Promise<void> {
    // const found = await this.getPaymentByIdGateway.Execute(order.id);
    // if (!found) {
    //   return listeners.onNotFound();
    // }
    // const updated = await this.updateOrderGateway.Execute(order);
    // if (updated) {
    //   return listeners.onSuccess(updated);
    // }
    // return listeners.onError();
  }
}
