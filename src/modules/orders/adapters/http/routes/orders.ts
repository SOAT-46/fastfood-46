import { FastifyInstance } from 'fastify';
import { AwilixContainer } from 'awilix';

import {
  getOrdersSchema,
  getOrderByIdSchema
} from './schemas';
import {
  Params
} from './parameters/types';
import { GetOrderByIdController } from '../get_order_by_id_controller';
import { GetOrdersController } from '../get_orders_controller';

const orderRoutes = async (fastify: FastifyInstance) => {
  const container: AwilixContainer = fastify.diContainer;

  const getOrderById = container.resolve<GetOrderByIdController>('getOrderByIdController');
  const getOrders = container.resolve<GetOrdersController>('getOrdersController');

  fastify.get('', { schema: getOrdersSchema }, getOrders.execute.bind(getOrders));
  fastify.get<{ Params: Params }>('/:id', { schema: getOrderByIdSchema }, getOrderById.execute.bind(getOrderById));
  // fastify.post('', {schema: createProductSchema}, create.execute.bind(create));
}

export { orderRoutes }
