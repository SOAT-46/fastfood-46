import {CreateUserPort} from 'modules/users/domain/gateways';
import {User} from 'modules/users/domain/models/user';
import {UsersRepository} from 'modules/users/domain/repositories/users_repository';

export class CreateUserGateway implements CreateUserPort {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async Execute(user: User): Promise<User> {
    return this.usersRepository.Save(user);
  }
}
