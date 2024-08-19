import {User} from '../../../domain/models/user';
import {PrismaUsers} from '../types';

export const toDomain = (user: PrismaUsers): User => {
  return new User(user.name, user.email, user.cpf);
};
