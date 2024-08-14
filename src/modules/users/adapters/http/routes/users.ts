import {FastifyInstance} from 'fastify';
import {AwilixContainer} from  'awilix';

import {Params} from './parameters/type'

import {createUserSchema} from './schemas/create_user_shema'
import {getUserByCPFSchema} from './schemas/get_user_by_cpf_schema'

import {CreateUserController} from '../create_user_controller'
import {GetUsersByCPFController} from '../get_user_by_cpf_controller'


const UserRoutes = async (fastify: FastifyInstance) => {
    const container: AwilixContainer = fastify.diContainer;
  
    const create = container.resolve<CreateUserController>('createUserController');
    const getUserbyCPF = container.resolve<GetUsersByCPFController>('getUserByCPFController');
  
    fastify.post('', {schema: createUserSchema}, create.execute.bind(create));
    fastify.get<{Params: Params}>('/:cpf', {schema: getUserByCPFSchema},getUserbyCPF.execute.bind(getUserbyCPF));
  }
  
  export {UserRoutes}