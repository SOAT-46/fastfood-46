import {FastifyInstance} from 'fastify';
import {AwilixContainer} from 'awilix';

import {
  updateProductSchema,
  createProductSchema,
  deleteProductSchema,
  getProductByCategorySchema} from './schemas';
import {
  Params,
  UpdateProductBody} from './parameters/types';
import {CreateProductController} from '../create_product_controller';
import {DeleteProductController} from '../delete_product_controller';
import {UpdateProductController} from '../update_product_controller';
import {GetProductsByCategoryController} from '../get_products_by_category_controller';

const productRoutes = async (fastify: FastifyInstance) => {
  const container: AwilixContainer = fastify.diContainer;

  const create = container.resolve<CreateProductController>('createProductController');
  const update = container.resolve<UpdateProductController>('updateProductController');
  const deleteProduct = container.resolve<DeleteProductController>('deleteProductController');
  const getProducts = container.resolve<GetProductsByCategoryController>('getProductsController');

  fastify.get<{Params: Params}>('/category/:id', {schema: getProductByCategorySchema},getProducts.execute.bind(getProducts));
  fastify.post('', {schema: createProductSchema}, create.execute.bind(create));
  fastify.patch<{Params: Params; Body: UpdateProductBody}>('/:id', {schema: updateProductSchema}, update.execute.bind(update));
  fastify.delete<{Params: Params}>('/:id', {schema: deleteProductSchema}, deleteProduct.execute.bind(deleteProduct));
}

export {productRoutes}
