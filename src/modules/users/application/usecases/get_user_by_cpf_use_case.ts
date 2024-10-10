import { User } from "../../domain/models/user";
import { GetUserByCpfPort } from "../../domain/gateways";

export interface Listeners {
  onSuccess: (user: User) => void;
  onEmpty: () => void;
}

export class GetUsersByCPFUseCase {
  public constructor(private readonly getUserByCpfGateway: GetUserByCpfPort) { }

  public async Execute(cpf: string, listeners: Listeners): Promise<void> {
    const response = await this.getUserByCpfGateway.Execute(cpf);

    if (response === undefined) {
      return listeners.onEmpty();
    }
    return listeners.onSuccess(response);
  }
}
