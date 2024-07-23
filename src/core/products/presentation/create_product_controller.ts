import {Product} from '../entities/product';
import {CreateProductUseCase, Listeners} from '../usecases/create_product_use_case';

import {FastifyRequest, FastifyReply} from 'fastify';

const toDomain = (request: FastifyRequest): Product => {
  const { name, description, price } = request.body as {
    name: string; description: string; price: number };
  return new Product(name, description, price);
}

export class CreateProductController {
  public constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  public async execute(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const listeners: Listeners = {
      onSuccess: (product) => this.onSuccess(product, response),
      onExists: (product) => this.onExists(product, response),
      onInvalid: (product) => this.onInvalid(product, response),
    };
    return this.createProductUseCase.execute(toDomain(request), listeners);
  }

  private onSuccess(product: Product, response: FastifyReply) {
    response.code(201).send(product);
  }

  private onExists(product: Product, response: FastifyReply) {
    response.code(200).send(product);
  }

  private onInvalid(product: Product, response: FastifyReply) {
    response.code(400).send(product);
  }
}
