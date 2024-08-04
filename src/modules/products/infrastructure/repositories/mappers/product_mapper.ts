import {Product} from '../../../domain/models/product';
import {PrismaProduct} from '../types';

export const toDomain = ({id, name, description, price, categoryId}: PrismaProduct): Product => {
  return new Product(name, description, price, categoryId, id);
};
