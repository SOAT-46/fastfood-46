import {User} from '../../../domain/models/user';
import {PrismaUser} from '../models/prisma_user';

export const toDomain = ({ name, cpf, email}: PrismaUser): User => {
  return new User(name, email, cpf );
};
