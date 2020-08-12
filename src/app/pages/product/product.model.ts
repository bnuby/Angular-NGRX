export class Product {
  constructor(
    public name: string,
    public type: string,
    public price: number,
    public id?: string,
  ) {}

  static clean(): Product {
    return new this('', '', 0);
  }
}
