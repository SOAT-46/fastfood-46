import {AwilixContainer, asClass} from 'awilix';

import {
  CreateUserUseCase,
  GetUsersByCPFUseCase
} from '../application/usecases';
import {
  CreateUserController,
  GetUsersByCPFController
} from '../adapters/http';
import {
  CreateUserGateway,
  GetUserByCpfGateway,
  GetUserGateway
} from '../adapters/gateways';
import {PrismaUsersRepository} from '../adapters/repositories/prisma_users_repository';

export const usersDIContainer = (container: AwilixContainer<any>) => {
  container.register({
    usersRepository: asClass(PrismaUsersRepository).singleton(),

    createUserGateway: asClass(CreateUserGateway).singleton(),
    getUserGateway: asClass(GetUserGateway).singleton(),
    getUserByCpfGateway: asClass(GetUserByCpfGateway).singleton(),

    createUserUseCase: asClass(CreateUserUseCase).singleton(),
    getUsersByCPFUseCase: asClass(GetUsersByCPFUseCase).singleton(),

    createUserController: asClass(CreateUserController).singleton(),
    getUserByCPFController: asClass(GetUsersByCPFController).singleton(),
  });
}
