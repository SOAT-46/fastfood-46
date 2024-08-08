import {FastifyRequest} from 'fastify';
import {Product} from '../../../domain/models/product';

const toDomain = (request: FastifyRequest): Product => {
  const { name, description, price, categoryId } = request.body as {
    name: string; description: string; price: number; categoryId: number };
  return new Product(name, description, price, categoryId);
}

export {toDomain}
