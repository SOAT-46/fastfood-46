export class Product {
  constructor(public name: string, public description: string, public price: number) {}

  public isValid(): boolean {
    return this.hasValidName() && this.hasValidPrice();
  }

  private hasValidName(): boolean {
    return this.name.trim() !== '';
  }

  private hasValidPrice(): boolean {
    return this.price > 0;
  }
}
