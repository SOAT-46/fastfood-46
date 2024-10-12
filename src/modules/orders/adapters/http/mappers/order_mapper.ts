import { FastifyRequest } from 'fastify';
import { Params, UpdateOrderRequest } from "../routes/parameters/types";
import { Order } from '../../../domain/entities/order';
import { OrderStatus } from '../../../domain/entities/enums';

export class OrderMapper {
  private static convertToEnum = (status: string): OrderStatus => {
    const enumValue = Object.values(OrderStatus).find(os => os.toString() == status);
    return <OrderStatus>enumValue;
  }

  public static toDomain(request: FastifyRequest<{Params: Params; Body: UpdateOrderRequest}>): Order {
    const id = request.params.id;
    const { status } = request.body;
    return new Order(id, 0, this.convertToEnum(status), new Date(), new Date(), '');
  }
}
