import {User} from "../../domain/models/user";
import {UsersRepository} from "../../domain/repositories/users_repository";

export interface Listeners {
  onSuccess: (user: User) => void;
  onEmpty: () => void;
}

export class GetUsersByCPFUseCase {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async Execute(cpf: string, listeners: Listeners): Promise<void> {
    const response = await this.usersRepository.GetUsersByCPF(
      cpf);

    if (response === undefined) {
      return listeners.onEmpty();
    }

    return listeners.onSuccess(response);
  }
}