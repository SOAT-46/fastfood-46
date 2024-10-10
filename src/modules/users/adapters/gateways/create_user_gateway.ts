import { CreateUserPort } from "modules/users/domain/gateways";
import { User } from "modules/users/domain/models/user";
import { UsersRepository } from "modules/users/adapters/repositories/contracts/users_repository";

export class CreateUserGateway implements CreateUserPort {
  public constructor(private readonly usersRepository: UsersRepository) { }

  public async Execute(user: User): Promise<User> {
    const entity = await this.usersRepository.Save(user);
    return entity.toDomain();
  }
}
