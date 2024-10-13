import { FastifyInstance } from 'fastify';
import { AwilixContainer } from 'awilix';

// import {
//   getOrdersSchema,
//   getOrderByIdSchema,
//   createOrderSchema,
//   UpdateOrderSchema
// } from './schemas';
// import {
//   Params,
//   UpdateOrderRequest
// } from './parameters/types';
import { WebhookMpNotificationController } from '../webhook_mpnotification_controller';

const paymentsRoutes = async (fastify: FastifyInstance) => {
  const container: AwilixContainer = fastify.diContainer;

  const webhookNotification = container.resolve<WebhookMpNotificationController>('WebhookMpNotificationController');

  fastify.post('', {schema: undefined}, webhookNotification.execute.bind(webhookNotification));
}

export { paymentsRoutes }
