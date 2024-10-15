import { UpdatePaymentPort } from '../../domain/gateways/update_payment_port';
import { WebhookMpNotificationPort } from '../../domain/gateways/webhook_mpnotification_port';
import { Notification } from '../../domain/models';

export interface Listeners {
  onSuccess: () => void;
  onNotFound: () => void;
  onError: () => void;
}

export class UpdatePaymentUseCase {
  public constructor(
    private readonly getPaymentByIdGateway: WebhookMpNotificationPort,
    private readonly updatePaymentGateway: UpdatePaymentPort,
  ) {}

  public async Execute(notification: Notification, listeners: Listeners): Promise<void> {
    const payment = await this.getPaymentByIdGateway.Execute(notification);
    if (!payment) {
      return listeners.onNotFound();
    }
    await this.updatePaymentGateway.Execute(payment);
    return listeners.onSuccess();
  }
}
