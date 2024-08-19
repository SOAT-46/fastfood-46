import {GetProductByIdPort} from 'modules/products/domain/gateways/get_product_by_id_port';
import {DeleteProductByIdPort} from '../../domain/gateways';

export interface Listeners {
  onSuccess: () => void;
  onNotFound: () => void;
}

export class DeleteProductUseCase {
  public constructor(
    private readonly getProductByIdGateway: GetProductByIdPort,
    private readonly deleteProductByIdGateway: DeleteProductByIdPort) {}

  public async execute(id: number, listeners: Listeners): Promise<void> {
    const exists = await this.getProductByIdGateway.Execute(id);
    if (!exists) {
      return listeners.onNotFound();
    }
    await this.deleteProductByIdGateway.Execute(id);
    return listeners.onSuccess();
  }
}
