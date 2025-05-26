export class PriceModel {
  price: number;

  constructor(price: number) {
  this.price = price;
  }

  getPrice(): number {
    return this.price;
  }
}
