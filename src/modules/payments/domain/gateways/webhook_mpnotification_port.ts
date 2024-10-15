import { Payment, Notification } from '../models';

export interface WebhookMpNotificationPort {

  Execute(notification: Notification) : Promise<Payment | undefined>
}
