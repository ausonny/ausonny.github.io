// eslint-disable-next-line @typescript-eslint/no-unused-vars
// class Building extends Purchasable {
//   name: string;
//   buyButton: HTMLElement;
//   productionPerSec: number;
//   // lastProduction: JBDecimal;
//   constructor() {
//     super();
//     this.name = '';
//     this.productionPerSec = 0;
//   }
//   productionPerLevel() {
//     const ret = new JBDecimal(this.productionPerSec);
//     // let multiplier = 2 ** (this.basicUpgrade.bought + gameData.boulderUpgrades[3].bought);
//     // multiplier *= 1.1 ** this.upgradeLevel;
//     // if (gameData.upgrades[2].bought > 0) {
//     //   multiplier *= Math.sqrt(1 + gameData.stats.prestige1ticks / 600000);
//     // }
//     // if (gameData.upgrades[3].bought > 0) {
//     //   if (gameData.resources.pebbles.amount.exponent >= 0) {
//     //     multiplier *= Math.sqrt(gameData.resources.pebbles.amount.exponent + 1);
//     //   }
//     // }
//     // if (gameData.equipment.length > 0) {
//     //   gameData.equipment[0].abilities.forEach((a) => {
//     //     if (a.name === 'Metal Production') {
//     //       multiplier *= a.levels;
//     //     }
//     //   });
//     // }
//     // if (gameData.upgrades[4].bought > 0) {
//     //   if (gameData.stats.prestige1 > 0) {
//     //     multiplier *= gameData.stats.prestige1;
//     //   }
//     // }
//     // if (gameData.upgrades[7].bought > 0) {
//     //   const bonusPer = 1 + gameData.upgrades[7].bought / 100;
//     //   multiplier *= bonusPer ** this.bought;
//     // }
//     // let ret = new JBDecimal(multiplier * this.productionMultiplier);
//     // ret = ret.multiply(getTimeParticleBonus());
//     // ret = ret.multiply(gameData.producer.production());
//     // ret = ret.multiply(getParticleBonus());
//     return ret;
//   }
//   production(ticks: number = gameData.world.currentTickLength) {
//     if (this.owned.equals(0)) {
//       return new JBDecimal(0);
//     }
//     return this.productionPerLevel()
//       .multiply(ticks / 1000)
//       .multiply(this.owned.floor());
//   }
//   productionPerSecDisplay() {
//     const val = new JBDecimal(this.production(1000));
//     return val;
//   }
//   draw() {
//     ,h
//   }
// }
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// class Producer extends Purchasable {
//   name: string;
//   index: number;
//   buyButton: HTMLElement;
//   lastProduction: JBDecimal;
//   basicUpgrade: Upgrade;
//   productionMultiplier: number;
//   constructor(name: string, index: number, cost: number, costMultiplier: number, resource: Resource, upgradeResource: Resource, buyButton: HTMLElement, upgradeButton: HTMLElement, basicUpgrade: Upgrade, inflationFloor: number) {
//     super(cost, costMultiplier, resource, 1, 2, upgradeResource, inflationFloor, 0, buyButton, true, upgradeButton, false);
//     this.name = name;
//     this.index = index;
//     this.lastProduction = new JBDecimal(0);
//     this.basicUpgrade = basicUpgrade;
//   }
//   production() {
//     if (gameData.challenges[1].active) {
//       return new JBDecimal(1);
//     }
//     const val = this.bought + this.basicUpgrade.bought + this.upgradeLevel;
//     if (val === 0) {
//       return new JBDecimal(1);
//     }
//     let base = 0.01;
//     if (gameData.upgrades[5].bought > 0) {
//       base *= 2;
//     }
//     if (gameData.rockUpgrades[4].bought > 0) {
//       base *= 2;
//     }
//     const challengebonus = 1.1 + base * (gameData.challenges[1].completed + this.upgradeLevel);
//     return new JBDecimal(challengebonus).pow(val);
//     // return ret;
//   }
//   productionPerSecDisplay() {
//     return new JBDecimal(this.production());
//   }
//   percentageIncrease() {
//     if (this.lastProduction.mantissa === 0) {
//       return new JBDecimal(0);
//     }
//     let val = new JBDecimal(this.owned.subtract(this.lastProduction));
//     val = val.divide(this.lastProduction).multiply(gameData.world.currentTickLength);
//     return val;
//   }
//   percentageIncreaseDisplay() {
//     return new JBDecimal(this.percentageIncrease());
//   }
// }
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// class Derivative2 extends Purchasable {
//   name: string;
//   index: number;
//   buyButton: HTMLElement;
//   basicUpgrade: Upgrade;
//   productionMultiplier: number;
//   constructor(
//     name: string,
//     index: number,
//     cost: number,
//     costMultiplier: number,
//     resource: Resource,
//     upgradeResource: Resource,
//     buyButton: HTMLElement,
//     upgradeButton: HTMLElement,
//     basicUpgrade: Upgrade,
//     inflationFloor: number,
//     productionMultiplier: number,
//     upgradeable: boolean
//   ) {
//     super(cost, costMultiplier, resource, 1, 2, upgradeResource, inflationFloor, 0, buyButton, upgradeable, upgradeButton, false);
//     this.name = name;
//     this.index = index;
//     // this.lastProduction = new JBDecimal(0);
//     this.basicUpgrade = basicUpgrade;
//     this.productionMultiplier = productionMultiplier;
//   }
//   // eslint-disable-next-line class-methods-use-this
//   productionPerLevel() {
//     return new JBDecimal(1);
//   }
//   production(ticks: number = gameData.world.currentTickLength) {
//     let val = this.owned.floor().add(this.basicUpgrade.owned).add(this.upgradeLevel);
//     if (val.equals(0)) {
//       return new JBDecimal(0);
//     }
//     val = val.multiply(ticks / 1000);
//     if (gameData.rockUpgrades[9].bought > 0) {
//       val = val.multiply(Math.sqrt(1 + gameData.stats.prestige1ticks / 600000));
//     }
//     val = val.multiply(this.productionMultiplier);
//     return val;
//   }
//   productionPerSecDisplay() {
//     return new JBDecimal(this.production(1000));
//   }
// }
//# sourceMappingURL=Derivative.js.map