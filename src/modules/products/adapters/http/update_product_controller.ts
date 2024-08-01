import {FastifyReply, FastifyRequest} from 'fastify';

import {Product} from '../../domain/models/product';
import {ProductParams, UpdateProductBody} from './routes/parameters/update_product';
import {UpdateProductUseCase, Listeners} from '../../application/usecases/update_product_use_case';

const toDomain = (request: FastifyRequest<{Params: ProductParams; Body: UpdateProductBody}>): Product => {
  const id = request.params.id;
  const { name, description, price } = request.body as {
    name: string; description: string; price: number };
  return new Product(name, description, price, id);
}

export class UpdateProductController {
  public constructor(private readonly updateProductUseCase: UpdateProductUseCase) {}

  public async execute(request: FastifyRequest<{Params: ProductParams; Body: UpdateProductBody}>, response: FastifyReply): Promise<void> {
    const listeners: Listeners = {
      onSuccess: (product) => this.onSuccess(product, response),
      onNotFound: (id) => this.onError(id, response)
    }
    return this.updateProductUseCase.execute(toDomain(request), listeners);
  }

  private onSuccess(product: Product, response: FastifyReply) {
    response.code(200).send(product);
  }

  private onError(id: number | undefined, response: FastifyReply) {
    response.code(400).send(id);
  }
}
