import { User } from "modules/users/domain/models/user";
import { GetUserPort } from "modules/users/domain/gateways";
import { UsersRepository } from "modules/users/domain/repositories/users_repository";

export class GetUserGateway implements GetUserPort {
  public constructor(private readonly usersRepository: UsersRepository) { }

  public async Execute(user: User): Promise<User | undefined> {
    return this.usersRepository.GetByEmailAndName(user.email, user.name);
  }
}
