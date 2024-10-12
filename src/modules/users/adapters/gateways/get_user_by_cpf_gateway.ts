import {User} from 'modules/users/domain/models/user';
import {GetUserByCpfPort} from 'modules/users/domain/gateways';
import {UsersRepository} from 'modules/users/domain/repositories/users_repository';

export class GetUserByCpfGateway implements GetUserByCpfPort {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async Execute(cpf: string): Promise<User | undefined> {
    return this.usersRepository.GetUsersByCPF(cpf);
  }
}
