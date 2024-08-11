import {FastifyInstance} from 'fastify';
import {AwilixContainer} from  'awilix';

import {createProductSchema} from './schemas/create_user_shema'

import {CreateUserController} from '../create_user_controller'

const UserRoutes = async (fastify: FastifyInstance) => {
    const container: AwilixContainer = fastify.diContainer;
  
    const create = container.resolve<CreateUserController>('createUserController');
  
    fastify.post('', {schema: createProductSchema}, create.execute.bind(create));
  }
  
  export {UserRoutes}