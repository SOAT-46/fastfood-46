export interface UpdatePaymentPort {
  Execute(notification: any): Promise<void>;
}
