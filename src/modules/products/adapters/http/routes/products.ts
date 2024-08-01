import {FastifyInstance} from 'fastify';
import {AwilixContainer} from 'awilix';
import {CreateProductController} from '../create_product_controller';
import {updateProductSchema, createProductSchema, deleteProductSchema} from './schemas';
import {ProductParams, UpdateProductBody} from './parameters/update_product';
import { DeleteProductController } from '../delete_product_controller';
import { UpdateProductController } from '../update_product_controller';

const productRoutes = async (fastify: FastifyInstance) => {
  const container: AwilixContainer = fastify.diContainer;

  const create = container.resolve<CreateProductController>('createProductController');
  const update = container.resolve<UpdateProductController>('updateProductController');
  const deleteProduct = container.resolve<DeleteProductController>('deleteProductController');

  fastify.post('', {schema: createProductSchema}, create.execute.bind(create));
  fastify.patch<{Params: ProductParams; Body: UpdateProductBody}>('/:id', {schema: updateProductSchema}, update.execute.bind(update));
  fastify.delete<{Params: ProductParams}>('/:id', {schema: deleteProductSchema}, deleteProduct.execute.bind(deleteProduct));
}

export {productRoutes}
