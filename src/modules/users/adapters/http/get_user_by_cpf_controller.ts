import {FastifyRequest, FastifyReply} from 'fastify';
import {Params} from './routes/parameters/type';
import {GetUsersByCPFUseCase, Listeners} from '../../application/usecases/get_user_by_cpf_use_case';
import {User} from '../../domain/models/user';

export class GetUsersByCPFController {
  public constructor(private readonly getUsersByCPFUseCase: GetUsersByCPFUseCase) {}

  public async execute(request: FastifyRequest<{Params: Params}>, response: FastifyReply): Promise<void> {
    const cpf = String(request.params.cpf);
    const listeners: Listeners = {
      onSuccess: (page) => this.onSuccess(page, response),
      onEmpty: () => this.onEmpty(response)
    }
    return this.getUsersByCPFUseCase.Execute(cpf, listeners)
  }

  private onSuccess(page: User, response: FastifyReply) {
    response.code(200).send(page);
  }

  private onEmpty(response: FastifyReply) {
    response.code(204)
  }
}
