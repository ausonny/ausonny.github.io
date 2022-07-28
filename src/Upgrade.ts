// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Upgrade extends Purchasable {
  name: string;

  description: string;

  constructor(
    name: string,
    description: string,
    baseCost: number,
    costMultiplier: number,
    resource: Resource,
    buyButton: HTMLElement,
    limit: number
  ) {
    super(baseCost, costMultiplier, resource, 0, 1, new Resource('dummy'), 0, limit, buyButton, false, buyButton);
    this.name = name;
    this.description = description;
  }

  updateDisplay() {
    super.updateDisplay();
    this.buyButton.innerHTML += this.description;
    this.buyButton.innerHTML += `<br />${this.bought.toString()}/${(this.limit + this.addedlimit).toString()}`;
  }
}
