import {User} from '../../../domain/models/user';
import {PrismaUsers} from '../types';

export const toDomain = ({ name, cpf, email}: PrismaUsers): User => {
  return new User(name, email, cpf );
};
