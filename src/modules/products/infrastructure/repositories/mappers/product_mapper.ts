import {Product} from "../../../domain/models/product";

export const toDomain = ({id, name, description, price}: {
  id: number;
  name: string;
  description: string;
  price: number;
}): Product => {
  return new Product(name, description, price, id);
};
