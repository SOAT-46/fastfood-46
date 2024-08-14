import { FastifyInstance } from 'fastify';
import { AwilixContainer } from 'awilix';

import {
  getOrdersSchema,
  getOrderByIdSchema,
  createOrderSchema
} from './schemas';
import {
  Params
} from './parameters/types';
import { GetOrderByIdController } from '../get_order_by_id_controller';
import { GetOrdersController } from '../get_orders_controller';
import { CreateOrderController } from '../create_order_controller';

const orderRoutes = async (fastify: FastifyInstance) => {
  const container: AwilixContainer = fastify.diContainer;

  const getOrderById = container.resolve<GetOrderByIdController>('getOrderByIdController');
  const getOrders = container.resolve<GetOrdersController>('getOrdersController');
  const createOrder = container.resolve<CreateOrderController>('createOrderController');

  fastify.get('', { schema: getOrdersSchema }, getOrders.execute.bind(getOrders));
  fastify.get<{ Params: Params }>('/:id', { schema: getOrderByIdSchema }, getOrderById.execute.bind(getOrderById));
  fastify.post('', {schema: createOrderSchema}, createOrder.execute.bind(createOrder));
}

export { orderRoutes }
