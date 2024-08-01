import {FastifyRequest, FastifyReply} from 'fastify';

import {ProductParams} from './routes/parameters/update_product';
import {DeleteProductUseCase, Listeners} from '../../application/usecases/delete_product_use_case';

export class DeleteProductController {
  public constructor(private readonly deleteProductUseCase: DeleteProductUseCase) {}

  public async execute(request: FastifyRequest<{Params: ProductParams}>, response: FastifyReply): Promise<void> {
    const listeners: Listeners = {
      onNotFound: () => this.onNotFound(response),
      onSuccess: () => this.onSuccess(response),
    }
    const id = Number(request.params.id);
    return this.deleteProductUseCase.execute(id, listeners);
  }

  private onSuccess(response: FastifyReply) {
    response.code(200);
  }

  private onNotFound(response: FastifyReply) {
    response.code(400);
  }
}
