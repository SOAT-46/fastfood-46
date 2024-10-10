import {Category} from "../../../domain/models/category";

export class PrismaCategory {
  public constructor(
    public readonly id: number,
    public readonly name: string) { }

  public static fromDatabase(db: any): PrismaCategory {
    return new PrismaCategory(db.id, db.name);
  }

  public toDomain() : Category {
    return new Category(this.id, this.name);
  }
}
