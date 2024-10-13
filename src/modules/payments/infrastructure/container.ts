import { AwilixContainer, asClass } from 'awilix';

import { PrismaPaymentsRepository } from '../adapters/repositories';
import { WebhookMpNotificationGateway } from '../adapters/gateways';
import { WebhookMpNotificationController } from '../adapters/http/webhook_mpnotification_controller';

export const paymentsDIContainer = (container: AwilixContainer<any>) => {
  container.register({
    paymentsRepository: asClass(PrismaPaymentsRepository).singleton(),

    WebhookMpNotificationGateway: asClass(WebhookMpNotificationGateway).singleton(),

    WebhookMpNotificationController: asClass(WebhookMpNotificationController).singleton(),
  });
}
