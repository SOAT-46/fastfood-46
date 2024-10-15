import { WebhookMpNotificationPort } from "modules/payments/domain/gateways/webhook_mpnotification_port";
import { PrismaPaymentsRepository } from "../repositories";
import {Notification, Payment} from "../../domain/models";

export class WebhookMpNotificationGateway implements WebhookMpNotificationPort {
  public constructor(private readonly paymentsRepository: PrismaPaymentsRepository) { }

  public async Execute(notification: Notification): Promise<Payment | undefined> {
    return Promise.resolve(undefined);
  }
}
