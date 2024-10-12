import {User} from '../../domain/models/user';
import {CreateUserPort, GetUserPort} from '../../domain/gateways';

export interface Listeners {
  onSuccess: (user: User) => void;
  onExists: (user: User) => void;
  onInvalid: () => void;
}

export class CreateUserUseCase {
  public constructor(
    private readonly createUserGateway: CreateUserPort,
    private readonly getUserGateway: GetUserPort,
  ) { }

  public async execute(user: User, listeners: Listeners): Promise<void> {

    if (!user.isValid()) {
      return listeners.onInvalid();
    }

    const existentUser = await this.getUserGateway.Execute(user);
    if (existentUser) {
      return listeners.onExists(existentUser);
    }

    const created = await this.createUserGateway.Execute(user);
    return listeners.onSuccess(created);
  }
}
