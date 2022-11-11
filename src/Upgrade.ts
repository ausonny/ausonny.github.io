// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Upgrade extends Purchasable {
  name: string;

  description: string;

  constructor() {
    super();
    this.name = '';
  }

  updateDisplay() {
    super.updateDisplay();
    this.buyButton.innerHTML = `${this.description}<br/>${this.buyButton.innerHTML}<br/>`;
    if (this.limit > 0) {
      this.buyButton.innerHTML += `${this.bought.toString()}/${(this.limit + this.addedlimit).toString()}`;
    } else {
      this.buyButton.innerHTML += `${this.bought.toString()}`;
    }
  }
}
