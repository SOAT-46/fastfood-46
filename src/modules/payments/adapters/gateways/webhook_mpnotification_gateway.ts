import { WebhookMpNotificationPort } from "modules/payments/domain/gateways/webhook_mpnotification_port";
import { PrismaPaymentsRepository } from "../repositories";

export class WebhookMpNotificationGateway implements WebhookMpNotificationPort {
  public constructor(private readonly paymentsRepository: PrismaPaymentsRepository) { }

  public async Execute(id: number): Promise<void> {
    const category = await this.paymentsRepository.Update(id);
  }
}
