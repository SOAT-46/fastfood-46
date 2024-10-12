import { User } from '../models/user';

export interface GetUserPort {
  Execute(user: User): Promise<User | undefined>;
}
