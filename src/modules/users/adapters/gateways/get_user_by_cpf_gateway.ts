import { User } from "modules/users/domain/models/user";
import { GetUserByCpfPort } from "modules/users/domain/gateways";
import { UsersRepository } from "modules/users/adapters/repositories/contracts/users_repository";

export class GetUserByCpfGateway implements GetUserByCpfPort {
  public constructor(private readonly usersRepository: UsersRepository) { }

  public async Execute(cpf: string): Promise<User | undefined> {
    const entity = await this.usersRepository.GetUsersByCPF(cpf);
    return entity?.toDomain();
  }
}
