import {Payment} from "../../../domain/models";

export interface PaymentsRepository {

  Update(payment: Payment): Promise<void>
}
