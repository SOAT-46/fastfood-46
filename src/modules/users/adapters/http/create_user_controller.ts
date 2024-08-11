import {FastifyRequest, FastifyReply} from 'fastify';

import {User} from '../../domain/models/user';
import {CreateUserUseCase, Listeners} from '../../application/usecases/create_user_use_case';

const toDomain = (request: FastifyRequest): User => {
  const { name, email, cpf } = request.body as {
    name: string; email: string; cpf: string; };
  return new User(name, email, cpf);
}

export class CreateUserController {
  public constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  public async execute(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const listeners: Listeners = {
      onSuccess: (user) => this.onSuccess(user, response),
      onExists: (user) => this.onExists(user, response),
      onInvalid: () => this.onInvalid(response),
    };
    return this.createUserUseCase.execute(toDomain(request), listeners);
  }

  private onSuccess(user: User, response: FastifyReply) {
    response.code(201).send(user);
  }

  private onExists(user: User, response: FastifyReply) {
    response.code(200).send(user);
  }

  private onInvalid(response: FastifyReply) {
    response.code(400).send("The user is invalid");
  }
}
