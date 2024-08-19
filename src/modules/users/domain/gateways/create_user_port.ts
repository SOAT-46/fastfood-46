import {User} from '../models/user';

export interface CreateUserPort {
  Execute(user: User): Promise<User>
}
