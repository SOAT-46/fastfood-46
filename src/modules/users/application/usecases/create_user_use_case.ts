import {User} from '../../domain/models/user';
import {UsersRepository} from '../../domain/repositories/users_repository';

export interface Listeners {
  onSuccess: (user: User) => void;
  onExists: (user: User) => void;
  onInvalid: () => void;
}

export class CreateUserUseCase {
  public constructor(
    private readonly usersRepository: UsersRepository) {}

  public async execute(user: User, listeners: Listeners): Promise<void> {

    if(!user.isValid()){
      return listeners.onInvalid()
    }
    
    const existentUser = await this.usersRepository.GetByEmailAndName(user.email,user.name)
    if(existentUser){
      return listeners.onExists(existentUser)
    }

    const created = await this.usersRepository.Save(user);
    return listeners.onSuccess(created);
    
  }
}
