import { SaveOrderPort } from "modules/orders/domain/gateways/save_order_port";
import { Order } from "modules/orders/domain/entities/order";
import { OrdersRepository } from "modules/orders/adapters/repositories/contracts/orders_repository";
import { CreateOrderInput } from "../../domain/entities/create_order_input";
import { GenerateQRCodeServiceInterface } from '../../application/services/generate_qrcode_service';

export class SaveOrderGateway implements SaveOrderPort {
  public constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly generateQrCodeService: GenerateQRCodeServiceInterface
  ) { }

  public async Execute(input: CreateOrderInput): Promise<Order | undefined> {
    try {
      const created = await this.ordersRepository.Save(input.products, input.userId);
      const qrCode = await this.generateQrCodeService.Execute(
        created.id, created.payment.id, created.payment.value);

      return created.toDomain(qrCode);
    } catch (exception) {
      return undefined;
    }
  }
}
