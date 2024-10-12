import { Product } from '../../domain/models';
import { CreateProductPort, GetProductPort } from '../../domain/gateways';
import { GetCategoryByIdPort } from "../../../categories/domain/gateways/get_category_by_id_port";

export interface Listeners {
  onSuccess: (product: Product) => void;
  onExists: (product: Product) => void;
  onInvalid: () => void;
}

export class CreateProductUseCase {
  public constructor(
    private readonly createProductGateway: CreateProductPort,
    private readonly getProductGateway: GetProductPort,
    private readonly getCategoryByIdGateway: GetCategoryByIdPort) { }

  public async execute(product: Product, listeners: Listeners): Promise<void> {
    if (!product.isValid()) {
      return listeners.onInvalid();
    }

    const existentProduct = await this.getProductGateway.Execute(product);
    if (existentProduct) {
      return listeners.onExists(existentProduct);
    }

    const category = await this.getCategoryByIdGateway.Execute(product.categoryId);
    if (!category) {
      return listeners.onInvalid();
    }

    const created = await this.createProductGateway.Execute(product);
    return listeners.onSuccess(created);
  }
}
