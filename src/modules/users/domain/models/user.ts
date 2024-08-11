export class User {
    constructor(
      public name: string,
      public email: string,
      public cpf?: string|null,
    ) {}
  
    public isValid(): boolean {
      return this.hasValidName() && this.validarEmail();
    }
  
    private hasValidName(): boolean {
      return this.name.trim() !== '';
    }
  
    private validarEmail(): boolean {
      const re = /\S+@\S+\.\S+/;
      return re.test(this.email);
    }
  }
  