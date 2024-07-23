import {FastifyInstance} from 'fastify';
import {AwilixContainer} from 'awilix';
import {CreateProductController} from '../create_product_controller';

const productRoutes = async (fastify: FastifyInstance) => {
  const container: AwilixContainer = fastify.diContainer;

  const productController = container.resolve<CreateProductController>('createProductController');

  fastify.post('/', productController.execute.bind(productController));
}

export {productRoutes}
