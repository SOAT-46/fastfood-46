import {Product} from '../../domain/models/product';
import {UpdateProductPort, GetProductByIdPort} from 'modules/products/domain/gateways';

export interface Listeners {
  onSuccess: (product: Product) => void;
  onNotFound: (id: number | undefined) => void;
}

export class UpdateProductUseCase {
  public constructor(
    private readonly getProductByIdGateway: GetProductByIdPort,
    private readonly updateProductGateway: UpdateProductPort) { }

  public async execute(product: Product, listeners: Listeners): Promise<void> {
    const exists = await this.getProductByIdGateway.Execute(product.id!);
    if (!exists) {
      return listeners.onNotFound(product.id);
    }

    const updatedProduct = await this.updateProductGateway.Execute(product);
    return listeners.onSuccess(updatedProduct);
  }
}
