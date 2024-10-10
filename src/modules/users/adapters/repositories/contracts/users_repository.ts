import { User } from '../../../domain/models/user';
import { PrismaUser } from '../models';

export interface UsersRepository {

  GetByEmailAndName(email: string, name: string): Promise<PrismaUser | undefined>;
  GetUsersByCPF(cpf: string): Promise<PrismaUser | undefined>;
  Save(user: User): Promise<PrismaUser>;
}
