import { User } from '../../../domain/models/user';

export class PrismaUser {
  public constructor(
    public id: number,
    public name: string,
    public cpf: string,
    public email: string) { }

  public static fromDomain(db: any): PrismaUser {
    return new PrismaUser(db.id, db.name, db.cpf, db.email);
  }

  public toDomain(): User {
    return new User(this.name, this.email, this.cpf);
  }
}
