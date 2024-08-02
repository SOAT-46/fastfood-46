import {FastifyRequest, FastifyReply} from 'fastify';

import {Params} from './routes/parameters/types';
import {DeleteProductUseCase, Listeners} from '../../application/usecases/delete_product_use_case';

export class DeleteProductController {
  public constructor(private readonly deleteProductUseCase: DeleteProductUseCase) {}

  public async execute(request: FastifyRequest<{Params: Params}>, response: FastifyReply): Promise<void> {
    const listeners: Listeners = {
      onNotFound: () => this.onNotFound(response),
      onSuccess: () => this.onSuccess(response),
    }
    const id = Number(request.params.id);
    return this.deleteProductUseCase.execute(id, listeners);
  }

  private onSuccess(response: FastifyReply) {
    response.code(204);
  }

  private onNotFound(response: FastifyReply) {
    response.notFound("The product does not exist");
  }
}
