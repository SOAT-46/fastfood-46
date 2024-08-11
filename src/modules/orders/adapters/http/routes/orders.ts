import { FastifyInstance } from 'fastify';
import { AwilixContainer } from 'awilix';

import {
  getOrderByIdSchema
} from './schemas';
import {
  Params,
  UpdateProductBody
} from './parameters/types';
import { GetOrderByIdController } from '../get_order_by_id_controller';

const orderRoutes = async (fastify: FastifyInstance) => {
  const container: AwilixContainer = fastify.diContainer;

  const getOrderById = container.resolve<GetOrderByIdController>('getProductsController');

  fastify.get<{ Params: Params }>('/order/:id', { schema: getOrderByIdSchema }, getOrderById.execute.bind(getOrderById));
  // fastify.post('', {schema: createProductSchema}, create.execute.bind(create));
  // fastify.patch<{Params: Params; Body: UpdateProductBody}>('/:id', {schema: updateProductSchema}, update.execute.bind(update));
  // fastify.delete<{Params: Params}>('/:id', {schema: deleteProductSchema}, deleteProduct.execute.bind(deleteProduct));
}

export { orderRoutes }
