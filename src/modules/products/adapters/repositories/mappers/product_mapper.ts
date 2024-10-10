import {Product} from '../../../domain/models/product';
import {PrismaProduct} from '../models/prisma_product';

export const toDomain = ({id, name, description, price, categoryId}: PrismaProduct): Product => {
  return new Product(name, description, price, categoryId, id);
};
