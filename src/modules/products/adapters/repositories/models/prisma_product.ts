import { Product } from '../../../domain/models';

export class PrismaProduct {
  public constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public categoryId: number
  ) { }

  public static fromDatabase(db: any): PrismaProduct {
    return new PrismaProduct(
      db.id,
      db.name,
      db.description,
      db.price,
      db.categoryId
    );
  }

  public toDomain(): Product {
    return new Product(
      this.name,
      this.description,
      this.price,
      this.categoryId,
      this.id);
  }
}
