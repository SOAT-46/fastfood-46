export class User {
  constructor(
    public name: string,
    public email: string,
    public cpf: string,
  ) { }

  public isValid(): boolean {
    return this.hasValidName() && this.hasValidEmail() && this.hasValidCPF();
  }

  private hasValidName(): boolean {
    return this.name.trim() !== '';
  }

  private hasValidEmail(): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(this.email);
  }

  private hasValidCPF(): boolean {
    const replaceCpf = String(this.cpf).replace(/[^\d]/g, '')
    return replaceCpf.length === 11
  }
}
