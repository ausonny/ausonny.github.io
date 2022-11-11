function createInternalInflationArray(size: number, initial = false) {
  if (!initial) {
    display.addToDisplay('Consider upping the initial internalinflationarray', DisplayCategory.Story);
  }
  // eslint-disable-next-line no-global-assign
  internalInflationArray = [];
  let total = 0;
  for (let index = 0; index <= size * 1.1; index++) {
    total += Math.floor(Math.sqrt(index));
    internalInflationArray.push(total);
  }
}

function internalInflationCost(increase: number) {
  if (internalInflationArray.length <= increase) {
    createInternalInflationArray(increase);
  }
  return internalInflationArray[increase];
}

function workersUsed() {
  let total = new JBDecimal(0);
  gameData.buildings.forEach((b) => {
    total = total.add(b.peopleUsed());
  });
  return total;
}

function peopleAvailable() {
  return gameData.resources.people.amount.subtract(workersUsed());
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Purchasable {
  woodCostPer: JBDecimal;

  woodCostMultiplierPer: number;

  peopleCostPer: number;

  stoneCostPer: JBDecimal;

  stoneCostMultiplierPer: number;

  essenceCostPer: JBDecimal;

  essenceCostMultiplierPer: number;

  powderCostPer: JBDecimal;

  powderCostMultiplierPer: number;

  pebbleCostPer: JBDecimal;

  pebbleCostMultiplierPer: number;

  particleCostPer: JBDecimal;

  particleCostMultiplierPer: number;

  rockCostPer: JBDecimal;

  rockCostMultiplierPer: number;

  timeparticleCostPer: JBDecimal;

  timeparticleCostMultiplierPer: number;

  shardCostPer: JBDecimal;

  shardCostMultiplierPer: number;

  inflationFloor: number;

  bought: number;

  limit: number;

  addedlimit: number;

  addedLimitElgible: boolean;

  buyButton: HTMLElement;

  autoOn: boolean;

  active: boolean;

  redResearchPer: JBDecimal;

  redResearchMultiplier: number;

  constructor() {
    this.woodCostPer = new JBDecimal(0);
    this.woodCostMultiplierPer = 1;
    this.peopleCostPer = 0;
    this.stoneCostPer = new JBDecimal(0);
    this.stoneCostMultiplierPer = 1;
    this.essenceCostPer = new JBDecimal(0);
    this.essenceCostMultiplierPer = 1;
    this.powderCostPer = new JBDecimal(0);
    this.powderCostMultiplierPer = 1;
    this.pebbleCostPer = new JBDecimal(0);
    this.pebbleCostMultiplierPer = 1;
    this.particleCostPer = new JBDecimal(0);
    this.particleCostMultiplierPer = 1;
    this.rockCostPer = new JBDecimal(0);
    this.rockCostMultiplierPer = 1;
    this.timeparticleCostPer = new JBDecimal(0);
    this.timeparticleCostMultiplierPer = 1;
    this.redResearchPer = new JBDecimal(0);
    this.redResearchMultiplier = 1;
    this.shardCostPer = new JBDecimal(0);
    this.shardCostMultiplierPer = 1;
    this.inflationFloor = 0;
    this.bought = 0;
    this.limit = 0;
    this.addedlimit = 0;
    this.addedLimitElgible = false;
    this.autoOn = false;
    this.active = true;
  }

  peopleUsed() {
    return this.bought * this.peopleCostPer;
  }

  autoSwitch() {
    this.autoOn = !this.autoOn;
  }

  checkResourceAvaliablity(minResourceAvailable = 1, amt = new JBDecimal(1)) {
    if (peopleAvailable().lessThan(this.buyPeopleNeeded())) {
      return false;
    }

    if (gameData.resources.wood.amount.lessThan(this.buyWoodCost(amt).multiply(minResourceAvailable))) {
      return false;
    }
    if (gameData.resources.stone.amount.lessThan(this.buyStoneCost(amt).multiply(minResourceAvailable))) {
      return false;
    }
    if (gameData.resources.essence.amount.lessThan(this.buyEssenceCost(amt).multiply(minResourceAvailable))) {
      return false;
    }
    if (gameData.resources.powder.amount.lessThan(this.buyPowderCost(amt).multiply(minResourceAvailable))) {
      return false;
    }
    if (gameData.resources.pebble.amount.lessThan(this.buyPebbleCost(amt).multiply(minResourceAvailable))) {
      return false;
    }
    if (gameData.resources.rock.amount.lessThan(this.buyRockCost(amt).multiply(minResourceAvailable))) {
      return false;
    }
    if (gameData.resources.shards.amount.lessThan(this.buyShardsCost(amt).multiply(minResourceAvailable))) {
      return false;
    }
    if (gameData.resources.redResearch.amount.lessThan(this.buyRedResearchCost(amt).multiply(minResourceAvailable))) {
      return false;
    }

    return true;
  }

  autoBuy() {
    if (!this.autoOn) {
      return;
    }
    if (!this.active) {
      return;
    }

    if (peopleAvailable().lessThan(this.buyPeopleNeeded())) {
      return;
    }

    if (!this.checkResourceAvaliablity(10)) {
      return;
    }
    this.buy();
  }

  currentInflationFloor() {
    if (gameData.challenges[0].active) {
      return 1;
    }

    let ret = this.inflationFloor;

    if (gameData.challenges[0].completed > 0) {
      const bonus = 1.05 + gameData.pebbleUpgrades[5].bought * 0.01;
      ret *= bonus ** gameData.challenges[0].completed;
    }
    return ret;
  }

  genericBuyCost(costPer: JBDecimal, costMultiplierPer: number, amt: JBDecimal = new JBDecimal(1)) {
    if (costPer.equals(0)) {
      return new JBDecimal(0);
    }
    if (costMultiplierPer === 0) {
      return new JBDecimal(this.bought + 1);
    }
    let count = 0;
    let qtyToUse = 0;
    while (amt.greaterThan(count)) {
      count += 1;
      let itemQty = this.bought + count;
      if (this.inflationFloor > 0) {
        if (itemQty > this.currentInflationFloor()) {
          const increase = Math.ceil(itemQty - this.currentInflationFloor());
          itemQty += internalInflationCost(increase);
        }
      }
      qtyToUse += itemQty;
    }
    // count = this.bought;
    return new JBDecimal(costPer.multiply(new JBDecimal(costMultiplierPer).pow(qtyToUse - 1)));
  }

  buyPeopleNeeded() {
    return this.peopleCostPer;
  }

  buyWoodCost(amt: JBDecimal = new JBDecimal(1)) {
    return this.genericBuyCost(this.woodCostPer, this.woodCostMultiplierPer, amt);
  }

  buyStoneCost(amt: JBDecimal = new JBDecimal(1)) {
    return this.genericBuyCost(this.stoneCostPer, this.stoneCostMultiplierPer, amt);
  }

  buyEssenceCost(amt: JBDecimal = new JBDecimal(1)) {
    return this.genericBuyCost(this.essenceCostPer, this.essenceCostMultiplierPer, amt);
  }

  buyPowderCost(amt: JBDecimal = new JBDecimal(1)) {
    return this.genericBuyCost(this.powderCostPer, this.powderCostMultiplierPer, amt);
  }

  buyPebbleCost(amt: JBDecimal = new JBDecimal(1)) {
    return this.genericBuyCost(this.pebbleCostPer, this.pebbleCostMultiplierPer, amt);
  }

  buyParticleCost(amt: JBDecimal = new JBDecimal(1)) {
    return this.genericBuyCost(this.particleCostPer, this.particleCostMultiplierPer, amt);
  }

  buyRockCost(amt: JBDecimal = new JBDecimal(1)) {
    return this.genericBuyCost(this.rockCostPer, this.rockCostMultiplierPer, amt);
  }

  buyTimeParticleCost(amt: JBDecimal = new JBDecimal(1)) {
    return this.genericBuyCost(this.timeparticleCostPer, this.timeparticleCostMultiplierPer, amt);
  }

  buyShardsCost(amt: JBDecimal = new JBDecimal(1)) {
    return this.genericBuyCost(this.shardCostPer, this.shardCostMultiplierPer, amt);
  }

  buyRedResearchCost(amt: JBDecimal = new JBDecimal(1)) {
    return this.genericBuyCost(this.redResearchPer, this.redResearchMultiplier, amt);
  }

  affordBuy(amt: JBDecimal = new JBDecimal(1)) {
    if (this.limit > 0 && this.bought >= this.limit + this.addedlimit) {
      return false;
    }

    if (!this.checkResourceAvaliablity(1, amt)) {
      return false;
    }
    return true;
  }

  buy(amt: JBDecimal = new JBDecimal(1)) {
    let count = 0;
    while (this.affordBuy() && amt.greaterThan(count)) {
      if (this.limit > 0 && this.bought > this.limit + this.addedlimit) {
        return;
      }

      gameData.resources.wood.subtract(this.buyWoodCost());
      gameData.resources.stone.subtract(this.buyStoneCost());
      gameData.resources.essence.subtract(this.buyEssenceCost());
      gameData.resources.powder.subtract(this.buyPowderCost());
      gameData.resources.pebble.subtract(this.buyPebbleCost());
      gameData.resources.rock.subtract(this.buyRockCost());
      gameData.resources.shards.subtract(this.buyShardsCost());
      gameData.resources.redResearch.subtract(this.buyRedResearchCost());

      this.bought += 1;
      count += 1;

      CheckAchievementCompletions();
      dirtyUpgrades = true;
    }
  }

  getResourcesNeededString() {
    let ret = '';
    if (this.buyPeopleNeeded() > 0) {
      ret += `People: ${this.buyPeopleNeeded().toString()}<br />`;
    }
    if (this.buyWoodCost().greaterThan(0)) {
      ret += `Wood: ${this.buyWoodCost().ToString()}<br />`;
    }
    if (this.buyStoneCost().greaterThan(0)) {
      ret += `Stone: ${this.buyStoneCost().ToString()}<br />`;
    }
    if (this.buyEssenceCost().greaterThan(0)) {
      ret += `Essence: ${this.buyEssenceCost().ToString()}<br />`;
    }
    if (this.buyPowderCost().greaterThan(0)) {
      ret += `Powder: ${this.buyPowderCost().ToString()}<br />`;
    }
    if (this.buyPebbleCost().greaterThan(0)) {
      ret += `Pebble: ${this.buyPebbleCost().ToString()}<br />`;
    }
    if (this.buyRockCost().greaterThan(0)) {
      ret += `Rock: ${this.buyRockCost().ToString()}<br />`;
    }
    if (this.buyParticleCost().greaterThan(0)) {
      ret += `Particle: ${this.buyParticleCost().ToString()}<br />`;
    }
    if (this.buyTimeParticleCost().greaterThan(0)) {
      ret += `Time Particle: ${this.buyTimeParticleCost().ToString()}<br />`;
    }
    if (this.buyShardsCost().greaterThan(0)) {
      ret += `Shards: ${this.buyShardsCost().ToString()}<br />`;
    }
    if (this.buyRedResearchCost().greaterThan(0)) {
      ret += `Red Research: ${this.buyRedResearchCost().ToString()}<br />`;
    }
    return ret.slice(0, ret.length - 6);
  }

  updateDisplay() {
    const amt = new JBDecimal(1);
    if (this.limit > 0 && this.bought >= this.limit + this.addedlimit) {
      this.buyButton.innerHTML = '';
      this.buyButton.classList.add('btn-primary');
      this.buyButton.classList.remove('btn-danger');
      this.buyButton.classList.remove('btn-success');
      return;
    }

    this.buyButton.innerHTML = this.getResourcesNeededString();

    // this.buyButton.style.height = `${btnheight.toString()}px`;

    if (this.affordBuy(amt)) {
      this.buyButton.classList.add('btn-success');
      this.buyButton.classList.remove('btn-danger');
      this.buyButton.classList.remove('btn-primary');
    } else {
      this.buyButton.classList.add('btn-danger');
      this.buyButton.classList.remove('btn-primary');
      this.buyButton.classList.remove('btn-success');
    }
  }
}
