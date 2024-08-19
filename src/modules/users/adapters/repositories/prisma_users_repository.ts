import {PrismaClient} from '@prisma/client';

import {toDomain} from './mappers/user_mapper';
import {User} from '../../domain/models/user';
import {UsersRepository} from '../../domain/repositories/users_repository';

export class PrismaUsersRepository implements UsersRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async GetByEmailAndName(email: string, name: string): Promise<User | undefined> {
    const resp = await this.prisma.users.findFirst({where: {email, name}})
    return resp ? toDomain(resp) : undefined;
  }

  public async GetUsersByCPF(cpf: string): Promise<User | undefined> {
    const resp = await this.prisma.users.findFirst({where: {cpf}})
    return resp ? toDomain(resp) : undefined;
  }

  public async Save(data: User): Promise<User> {
    const resp = await this.prisma.users.create({data});
    return toDomain(resp);
  }
}
