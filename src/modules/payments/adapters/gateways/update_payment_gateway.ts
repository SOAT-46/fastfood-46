import {UpdatePaymentPort} from "../../domain/gateways/update_payment_port";
import {Payment} from "../../domain/models";
import {PaymentsRepository} from "../repositories/contracts/payments_repository";

export class UpdatePaymentGateway implements UpdatePaymentPort {
  public constructor(private readonly paymentsRepository: PaymentsRepository) { }

  public async Execute(payment: Payment): Promise<void> {
    await this.paymentsRepository.Update(payment);
    return;
  }

}
