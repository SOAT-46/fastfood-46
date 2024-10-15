export interface GenerateQRCodeServiceInterface {
  Execute(paymentId: number, paymentValue: number, orderId: number): Promise<string>;
}
