import { PrismaClient } from '@prisma/client';

import { User } from '../../domain/models/user';
import { UsersRepository } from './contracts/users_repository';
import { PrismaUser } from './models';

export class PrismaUsersRepository implements UsersRepository {
  public constructor(private readonly prisma: PrismaClient) { }

  public async GetByEmailAndName(email: string, name: string): Promise<PrismaUser | undefined> {
    return this.getUser({ email, name });
  }

  public async GetUsersByCPF(cpf: string): Promise<PrismaUser | undefined> {
    return this.getUser({ cpf });
  }

  public async Save(data: User): Promise<PrismaUser> {
    const resp = await this.prisma.users.create({ data });
    return PrismaUser.fromDomain(resp);
  }

  private async getUser(where: object): Promise<PrismaUser | undefined> {
    const resp = await this.prisma.users.findFirst({ where })
    return resp ? PrismaUser.fromDomain(resp) : undefined;
  }
}
