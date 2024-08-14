import {User} from '../models/user';
import {PaginatedResponse} from "../../../shared/paginated_response";

export interface UsersRepository {

  GetByEmailAndName(email: string, name: string): Promise<User | undefined>;
  
  GetUsersByCPF(cpf: string): Promise<User | undefined>;
  
  Save(user: User): Promise<User>;
}
