export class Service {
  constructor() { }

  public async GenerateQrCode(paymentId: number, paymentValue: number, orderId: number): Promise<string> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${process.env.ACCESS_TOKEN}`);

    const raw = JSON.stringify({
      "external_reference": `PAYMENT_${paymentId}`,
      "title": "Pedido Fastfood-46",
      "description": "Pagamento de pedido da lanchonete fastfood-46",
      "notification_url": `${process.env.APP_DOMAIN}/v1/payments`,
      "total_amount": paymentValue,
      "items": [
        {
          "title": `Pedido: #${orderId}`,
          "unit_price": paymentValue,
          "quantity": 1,
          "unit_measure": "unit",
          "total_amount": paymentValue
        }
      ]
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw
    };

    const mpResp = await fetch(`${process.env.API_BASE_URL}/instore/orders/qr/seller/collectors/${process.env.MP_USER_ID}/pos/${process.env.MP_EXTERNAL_POS_ID}/qrs`, requestOptions);
    const json = await mpResp.json();
    const paymentQrCode = json.qr_data;

    return await paymentQrCode;
  }
}
