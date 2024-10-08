import {FastifyRequest, FastifyReply} from 'fastify';

import {Product} from '../../domain/models/product';
import {CreateProductUseCase, Listeners} from '../../application/usecases/create_product_use_case';

const toDomain = (request: FastifyRequest): Product => {
  const { name, description, price, categoryId } = request.body as {
    name: string; description: string; price: number; categoryId: number };
  return new Product(name, description, price, categoryId);
}

export class CreateProductController {
  public constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  public async execute(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const listeners: Listeners = {
      onSuccess: (product) => this.onSuccess(product, response),
      onExists: (product) => this.onExists(product, response),
      onInvalid: () => this.onInvalid(response),
    };
    return this.createProductUseCase.execute(toDomain(request), listeners);
  }

  private onSuccess(product: Product, response: FastifyReply) {
    response.code(201).send(product);
  }

  private onExists(product: Product, response: FastifyReply) {
    response.code(200).send(product);
  }

  private onInvalid(response: FastifyReply) {
    response.badRequest("The product is invalid");
  }
}
