import {ProductsRepository} from "../../domain/repositories/products_repository";

export interface Listeners {
  onSuccess: () => void;
  onNotFound: () => void;
}

export class DeleteProductUseCase {
  public constructor(private readonly productsRepository: ProductsRepository) {}

  public async execute(id: number, listeners: Listeners): Promise<void> {
    const exists = await this.productsRepository.GetById(id);
    if (!exists) {
      return listeners.onNotFound();
    }
    await this.productsRepository.DeleteById(id);
    return listeners.onSuccess();
  }
}
