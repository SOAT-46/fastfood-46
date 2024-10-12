import { Product } from '../../../domain/models/product';
import { PaginatedResponse } from "../../../../shared";
import { PrismaProduct } from "../models/prisma_product";

export interface ProductsRepository {

  GetById(id: number): Promise<PrismaProduct | undefined>;
  GetByName(name: string): Promise<PrismaProduct | undefined>;
  GetProductsByCategoryId(id: number, page: number, limit: number): Promise<PaginatedResponse<PrismaProduct>>;
  Save(product: Product): Promise<PrismaProduct>;
  Update(product: Product): Promise<PrismaProduct>;
  DeleteById(id: number): Promise<void>;
}
