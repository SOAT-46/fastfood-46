import {Product} from "../entities/product";
import {PrismaClient} from "@prisma/client";

export interface Listeners {
  onSuccess: (product: Product) => void;
  onInvalid: (product: Product) => void;
  onExists: (product: Product) => void;
}

export class CreateProductUseCase {
  public constructor(private readonly prisma: PrismaClient) {}

  public async execute(product: Product, listeners: Listeners): Promise<void> {
    if(!product.isValid()) {
      return listeners.onInvalid(product);
    }

    const exists = await this.prisma.products.findFirst({where: {name: product.name}});
    if (exists) {
      return listeners.onExists(product);
    }

    await this.prisma.products.create({data: product});
    return listeners.onSuccess(product);
  }
}
