import {Product} from '../../../domain/models/product';

export const toDomain = ({id, name, description, price, categoryId}: {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
}): Product => {
  return new Product(name, description, price, categoryId, id);
};
