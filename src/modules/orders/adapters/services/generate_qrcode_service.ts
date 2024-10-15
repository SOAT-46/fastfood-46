import { GenerateQRCodeServiceInterface } from 'modules/orders/application/services/generate_qrcode_service';
import { HttpClient } from 'modules/shared/http_client';

export class GenerateQRCodeService implements GenerateQRCodeServiceInterface {
  constructor(private readonly httpClient: HttpClient) { }

  public async Execute(paymentId: number, paymentValue: number, orderId: number): Promise<string> {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.httpClient.accessToken}`
    });

    const payload = JSON.stringify({
      external_reference: `PAYMENT_${paymentId}`,
      title: "Pedido Fastfood-46",
      description: "Pagamento de pedido da lanchonete fastfood-46",
      notification_url: this.httpClient.notificationUrl,
      total_amount: paymentValue,
      items: [{
        title: `Pedido: #${orderId}`,
        unit_price: paymentValue,
        quantity: 1,
        unit_measure: "unit",
        total_amount: paymentValue
      }]
    });

    const requestOptions = {
      method: "POST",
      headers,
      body: payload
    };

    const response = await fetch(this.httpClient.webhookUrl, requestOptions);
    const data = await response.json();

    return data.qr_data;
  }
}
