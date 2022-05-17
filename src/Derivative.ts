/* global Upgrade, Purchasable, Resource, JBDecimal, gameData, getTimeParticleBonus, getParticleBonus  */
// eslint-disable-next-line no-unused-vars
class Derivative extends Purchasable {
  name: string;

  index: number;

  buyButton: HTMLElement;

  // lastProduction: JBDecimal;

  basicUpgrade: Upgrade;

  productionMultiplier: number;

  constructor (
    name: string,
    index: number,
    cost: number,
    costMultiplier: number,
    resource: Resource,
    upgradeResource: Resource,
    buyButton: HTMLElement,
    upgradeButton: HTMLElement,
    basicUpgrade: Upgrade,
    inflationFloor: number,
    productionMultiplier: number,
    upgradeable: boolean
  ) {
    super(cost, costMultiplier, resource, 1, 2, upgradeResource, inflationFloor, 0, buyButton, upgradeable, upgradeButton);
    this.name = name;
    this.index = index;
    // this.lastProduction = new JBDecimal(0);
    this.basicUpgrade = basicUpgrade;
    this.productionMultiplier = productionMultiplier;
  }

  production (ticks:number = gameData.world.currentTickLength) {
    let val = this.owned.floor().add(this.basicUpgrade.owned).add(this.upgradeLevel);
    if (val.equals(0)) {
      return new JBDecimal(0);
    }
    val = val.multiply(this.basicUpgrade.getBonus());
    val = val.multiply(new JBDecimal(10).pow(this.upgradeLevel));
    const modifiedticks = getTimeParticleBonus().multiply(ticks);
    val = val.multiply(modifiedticks.divide(1000));

    val = val.multiply(gameData.producer.production());
    val = val.multiply(gameData.upgrades[13].getBonus());
    val = val.multiply(gameData.upgrades[14].getBonus());
    val = val.multiply(gameData.upgrades[15].getBonus());
    val = val.multiply(this.productionMultiplier);

    val = val.multiply(getParticleBonus());

    if (gameData.upgrades[5].owned.greaterThan(0)) {
      const perlevel = gameData.upgrades[5].getBonus();
      const qtymult = new JBDecimal(perlevel).multiply(this.bought).add(1);
      val = val.multiply(qtymult);
    }
    return val;
  }

  productionPerSecDisplay () {
    const val = new JBDecimal(this.production(1000));
    return val;
  }
}

// eslint-disable-next-line no-unused-vars
class Producer extends Purchasable {
  name: string;

  index: number;

  buyButton: HTMLElement;

  lastProduction: JBDecimal;

  basicUpgrade: Upgrade;

  productionMultiplier: number;

  constructor (
    name: string,
    index: number,
    cost: number,
    costMultiplier: number,
    resource: Resource,
    upgradeResource: Resource,
    buyButton: HTMLElement,
    upgradeButton: HTMLElement,
    basicUpgrade: Upgrade,
    inflationFloor: number
  ) {
    super(cost, costMultiplier, resource, 1, 2, upgradeResource, inflationFloor, 0, buyButton, true, upgradeButton);
    this.name = name;
    this.index = index;
    this.lastProduction = new JBDecimal(0);
    this.basicUpgrade = basicUpgrade;
  }

  production () {
    let val = this.owned.floor().add(this.basicUpgrade.owned).add(this.upgradeLevel);
    val = val.multiply(2);
    if (gameData.challenges[3].active) {
      return new JBDecimal(1);
    }
    let base = 0.01;
    if (gameData.upgrades[16].bought > 0) {
      base *= 2;
    }
    if (gameData.rockUpgrades[3].bought > 0) {
      base *= 2;
    }

    const challengebonus = 1.1 + (base * ((gameData.challenges[3].completed / 4) + this.upgradeLevel));
    const ret = new JBDecimal(challengebonus).pow(val.ToNumber());
    return ret;
  }

  productionPerSecDisplay () {
    return new JBDecimal(this.production());
  }

  percentageIncrease () {
    if (this.lastProduction.mantissa === 0) {
      return new JBDecimal(0);
    }
    let val = new JBDecimal(this.owned.subtract(this.lastProduction));
    val = val.divide(this.lastProduction).multiply(gameData.world.currentTickLength);
    return val;
  }

  percentageIncreaseDisplay () {
    return new JBDecimal(this.percentageIncrease()); ;
  }
}

// eslint-disable-next-line no-unused-vars
class Derivative2 extends Purchasable {
  name: string;

  index: number;

  buyButton: HTMLElement;

  // lastProduction: JBDecimal;

  basicUpgrade: Upgrade;

  productionMultiplier: number;

  constructor (
    name: string,
    index: number,
    cost: number,
    costMultiplier: number,
    resource: Resource,
    upgradeResource: Resource,
    buyButton: HTMLElement,
    upgradeButton: HTMLElement,
    basicUpgrade: Upgrade,
    inflationFloor: number,
    productionMultiplier: number,
    upgradeable: boolean
  ) {
    super(cost, costMultiplier, resource, 1, 2, upgradeResource, inflationFloor, 0, buyButton, upgradeable, upgradeButton);
    this.name = name;
    this.index = index;
    // this.lastProduction = new JBDecimal(0);
    this.basicUpgrade = basicUpgrade;
    this.productionMultiplier = productionMultiplier;
  }

  production (ticks:number = gameData.world.currentTickLength) {
    let val = this.owned.floor().add(this.basicUpgrade.owned).add(this.upgradeLevel);

    if (val.equals(0)) {
      return new JBDecimal(0);
    }

    val = val.multiply(ticks / 1000);
    val = val.multiply(gameData.rockUpgrades[13].getBonus());
    val = val.multiply(this.productionMultiplier);

    return val;
  }

  productionPerSecDisplay () {
    return new JBDecimal(this.production(1000));
  }
}
