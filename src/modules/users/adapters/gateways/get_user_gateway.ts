import { User } from "modules/users/domain/models/user";
import { GetUserPort } from "modules/users/domain/gateways";
import { UsersRepository } from "modules/users/adapters/repositories/contracts/users_repository";

export class GetUserGateway implements GetUserPort {
  public constructor(private readonly usersRepository: UsersRepository) { }

  public async Execute(user: User): Promise<User | undefined> {
    const entity = await this.usersRepository.GetByEmailAndName(user.email, user.name);
    return entity?.toDomain();
  }
}
