import { AwilixContainer, asClass } from 'awilix';

import { PrismaPaymentsRepository } from '../adapters/repositories';
import {
  WebhookMpNotificationGateway,
  UpdatePaymentGateway
} from '../adapters/gateways';
import { UpdatePaymentUseCase } from '../application/usecases/update_payment_use_case';

import { WebhookMpNotificationController } from '../adapters/http/webhook_mpnotification_controller';

export const paymentsDIContainer = (container: AwilixContainer<any>) => {
  container.register({
    paymentsRepository: asClass(PrismaPaymentsRepository).singleton(),

    updatePaymentGateway: asClass(UpdatePaymentGateway).singleton(),
    getPaymentByIdGateway: asClass(WebhookMpNotificationGateway).singleton(),

    updateOrderUseCase: asClass(UpdatePaymentUseCase).singleton(),

    WebhookMpNotificationController: asClass(WebhookMpNotificationController).singleton(),
  });
}
