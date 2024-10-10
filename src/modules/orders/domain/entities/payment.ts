import { PaymentStatus } from './enums';

export class Payment {
  public constructor(
    public readonly id: number,
    public readonly status: PaymentStatus) {}
}
