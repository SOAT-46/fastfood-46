import {FastifyRequest} from 'fastify';
import {Params, UpdateProductBody} from '../routes/parameters/types';
import {Product} from '../../../domain/models/product';

const toDomain = (request: FastifyRequest<{Params: Params; Body: UpdateProductBody}>): Product => {
  const id = request.params.id;
  const { name, description, categoryId, price } = request.body as {
    name: string; description: string; price: number, categoryId: number };
  return new Product(name, description, price, categoryId, id);
}

export {toDomain}
