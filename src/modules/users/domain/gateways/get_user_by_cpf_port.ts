import { User } from '../models/user';

export interface GetUserByCpfPort {
  Execute(cpf: string): Promise<User | undefined>;
}
