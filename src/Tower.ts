/* eslint-disable max-classes-per-file */
const LUMBERJACK_COST = 10;
const LUMBERJACK_MULTIPLIER = 1.2;

const ARROW_TOWER_COST = 100;
const ARROW_TOWER_MULTIPLIER = 1.2;

const SHACK_COST = 12;
const SHACK_MULTIPLIER = 1.2;

const HOUSE_WOOD_COST = 20;
const HOUSE_WOOD_MULTIPLIER = 1.2;
const HOUSE_STONE_COST = 10;
const HOUSE_STONE_MULTIPLIER = 1.2;

const CATAPULT_WOOD_COST = 250;
const CATAPULT_WOOD_MULTIPLIER = 1.2;
const CATAPULT_STONE_COST = 500;
const CATAPULT_STONE_MULTIPLIER = 1.2;

const MANSION_WOOD_COST = 100;
const MANSION_WOOD_MULTIPLIER = 1.2;
const MANSION_STONE_COST = 200;
const MANSION_STONE_MULTIPLIER = 1.2;

const FLETCHER_COST = 150;
const FLETCHER_MULTIPLIER = 1.3;

// const STORAGE_COST = 10;
// const STORAGE_MULTIPLIER = 1.05;

const STONEMASON_COST = 200;
const STONEMASON_MULTIPLIER = 1.2;

const RED_RESEARCH_LAB_WOOD_COST = 1000;
const RED_RESEARCH_LAB_WOOD_MULTIPLIER = 1.4;
const RED_RESEARCH_LAB_STONE_COST = 1000;
const RED_RESEARCH_LAB_STONE_MULTIPLIER = 1.4;

const POISON_TOWER_COST = 1;
const POISON_TOWER_MULTIPLIER = 2;

const SLOW_TOWER_COST = 1;
const SLOW_TOWER_MULTIPLIER = 20;

function getSpecialsArray() {
  const choicesArr = [];
  for (let type = 0; type <= 32; type++) {
    for (let index = 0; index < gameData.world.spawnsRemaining[type]; index++) {
      choicesArr.push(type);
    }
  }
  return choicesArr;
}
class Vector {
  x: number;

  y: number;

  constructor(currentx: number, currenty: number) {
    this.x = currentx;
    this.y = currenty;
  }

  getLengthFromAnotherVector(target: Vector) {
    const xdif = this.x - target.x;
    const ydif = this.y - target.y;
    return Math.sqrt(xdif * xdif + ydif * ydif); // calculating length of vector;
  }

  getNormalized(target: Vector) {
    const ret = new Vector(this.x, this.y);
    ret.x = this.x / this.getLengthFromAnotherVector(target);
    ret.y = this.y / this.getLengthFromAnotherVector(target);
    return ret;
  }

  subtract(value: Vector) {
    const ret = new Vector(this.x, this.y);
    ret.x -= value.x;
    ret.y -= value.y;
    return ret;
  }

  divide(value: Vector) {
    const ret = new Vector(this.x, this.y);
    ret.x /= value.x;
    ret.y /= value.y;
    return ret;
  }
}

class movingObject {
  pos: Vector;

  targetList: Vector[];

  targetListIndex: number;

  movementPerSec: number;

  isBullet: boolean;

  slowed: number;

  constructor(pos: Vector, movementPerSec: number, isbullet: boolean, targetlist: Vector[]) {
    this.pos = Object.assign(pos);
    this.movementPerSec = movementPerSec;
    this.isBullet = isbullet;
    this.targetList = targetlist;
    this.targetListIndex = 0;
    this.slowed = 1;
  }

  timeToTarget() {
    return this.pos.getLengthFromAnotherVector(this.targetList[this.targetListIndex]) / this.movementPerSec;
  }

  move() {
    let tickmovement = (this.movementPerSec * gameData.world.currentTickLength) / 1000;

    if (this.slowed < 1) {
      tickmovement *= this.slowed;
      this.slowed = 1;
    }

    while (tickmovement > 0) {
      if (this.targetListIndex > this.targetList.length) {
        this.targetListIndex = this.targetList.length;
      }
      const length = this.pos.getLengthFromAnotherVector(this.targetList[this.targetListIndex]);
      const dif = this.pos.subtract(this.targetList[this.targetListIndex]);
      if (tickmovement >= length) {
        this.pos = this.targetList[this.targetListIndex];
        tickmovement -= length;
        if (this.targetList.length > this.targetListIndex + 1) {
          this.targetListIndex += 1;
        } else {
          tickmovement = 0;
        }
      } else {
        const move = new Vector(0, 0);
        move.x = (dif.x / length) * tickmovement;
        move.y = (dif.y / length) * tickmovement;
        this.pos = this.pos.subtract(move);
        tickmovement = 0;
      }
    }
  }
}

function skillDeterioration() {
  const divider = 1000;
  return (0.999 - (gameData.world.currentTier - 1) / divider) ** gameData.world.currentWave;
}

function critChance() {
  if (gameData.challenges[5].active || gameData.challenges[5].completed < 1) {
    return 0;
  }

  const bonusPerCompletion = 10 + gameData.rockUpgrades[7].bought * 5;
  let ret = bonusPerCompletion * gameData.challenges[5].completed;

  if (gameData.equipment.length > 0) {
    gameData.equipment[0].abilities.forEach((a) => {
      if (a.name === 'Critical Chance') {
        ret += a.levels;
      }
    });
  }

  ret *= skillDeterioration();
  return ret;
}

function critMultiplier() {
  if (gameData.challenges[5].active || gameData.challenges[5].completed < 1) {
    return 1;
  }
  let ret = 5 + gameData.rockUpgrades[6].bought;

  if (gameData.equipment.length > 0) {
    gameData.equipment[0].abilities.forEach((a) => {
      if (a.name === 'Crit Multiplier') {
        ret += Math.sqrt(a.levels) / 10;
      }
    });
  }

  return ret;
}

class Bullet extends movingObject {
  damage: JBDecimal;

  crit: boolean;

  constructor(pos: Vector, target: Vector, attackValue: JBDecimal) {
    const tList = [];
    tList.push(target);
    super(pos, 100, true, tList);
    this.damage = new JBDecimal(attackValue);
  }

  setDamage() {
    let critchance = critChance();

    const multiplier = critMultiplier();

    // critchance %= 100;

    while (critchance >= 100) {
      this.crit = true;
      critchance -= 100;
    }

    const rndvalue = Math.random() * 100;
    if (rndvalue < critchance) {
      this.damage = this.damage.multiply(multiplier);
      this.crit = true;
    }
  }

  draw() {
    let color = 'white';
    if (this.crit) {
      color = 'red';
    }
    display.DrawEnemyCircle(this.pos, [color], false, display.drone02.currentHitPoints());
  }
}

class Tactic {
  fastest: boolean;

  healer: boolean;

  highestHealth: boolean;

  lowestHealth: boolean;

  constructor() {
    this.fastest = true;
    this.healer = false;
    this.highestHealth = false;
    this.lowestHealth = false;
  }

  getIndex() {
    if (this.fastest) {
      return 0;
    }
    if (this.highestHealth) {
      return 1;
    }
    if (this.lowestHealth) {
      return 2;
    }
    if (this.healer) {
      return 3;
    }
    return 0;
  }

  changeTactic(index: number) {
    switch (index) {
      case 0: {
        this.fastest = true;
        this.healer = false;
        this.highestHealth = false;
        this.lowestHealth = false;
        break;
      }
      case 1: {
        this.fastest = false;
        this.healer = false;
        this.highestHealth = true;
        this.lowestHealth = false;
        break;
      }
      case 2: {
        this.fastest = false;
        this.healer = false;
        this.highestHealth = false;
        this.lowestHealth = true;
        break;
      }
      case 3:
      default: {
        this.fastest = false;
        this.healer = true;
        this.highestHealth = false;
        this.lowestHealth = false;
        break;
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Building extends Purchasable {
  index: number;

  type: string;

  baseArrowAttack: number;

  baseCatapultAttack: number;

  basePoisonAttack: number;

  ticksToNextBullet: number;

  baseRange: number;

  baseShotsPerSec: number;

  baseProductionPerSec: number;

  pos: Vector;

  active: boolean;

  equipmentPhrase: string;

  tactics: Tactic;

  baseHousing: JBDecimal;

  baseSlow: number;

  constructor(pos: Vector, index: number) {
    super();
    this.pos = pos;
    this.index = index;
    this.type = '';
    this.baseArrowAttack = 0;
    this.ticksToNextBullet = 0;
    this.baseRange = 0;
    this.baseShotsPerSec = 0;
    this.baseProductionPerSec = 0;
    this.active = false;
    this.equipmentPhrase = '';
    this.tactics = new Tactic();
    this.baseHousing = new JBDecimal(0);
    this.baseSlow = 0;
    this.tactics.changeTactic(0);
  }

  // eslint-disable-next-line no-use-before-define
  chooseEnemyToShoot() {
    const enemiesInRange = [];
    gameData.enemies.forEach((e) => {
      const len = e.pos.getLengthFromAnotherVector(this.pos);
      if (len <= this.range()) {
        enemiesInRange.push(e);
      }
    });

    if (enemiesInRange.length <= 0) {
      this.ticksToNextBullet = 1;
      return null;
    }

    enemiesInRange.sort((a, b) => (a.timeFromExit() > b.timeFromExit() ? 1 : -1));
    let indexToUse = 0; // we return the fastest to exit by default
    if (this.tactics.healer) {
      for (let index = 0; index <= enemiesInRange.length - 1; index++) {
        const e = enemiesInRange[index];
        if (e.healer) {
          return e;
        }
      }
    }
    if (this.tactics.highestHealth) {
      let currenthigh = new JBDecimal(enemiesInRange[0].expectedHitPointsRemaining());
      for (let index = 0; index < enemiesInRange.length; index++) {
        const e = enemiesInRange[index];
        if (e.expectedHitPointsRemaining().greaterThan(currenthigh)) {
          indexToUse = index;
          currenthigh = e.expectedHitPointsRemaining();
        }
      }
    }
    if (this.tactics.lowestHealth) {
      let currentlow = new JBDecimal(enemiesInRange[0].expectedHitPointsRemaining());
      for (let index = 0; index < enemiesInRange.length; index++) {
        const e = enemiesInRange[index];
        if (e.expectedHitPointsRemaining().lessThan(currentlow)) {
          indexToUse = index;
          currentlow = e.expectedHitPointsRemaining();
        }
      }
    }
    return enemiesInRange[indexToUse];
  }

  attack(attackValue: JBDecimal) {
    this.ticksToNextBullet += this.ticksPerShot();
    if (gameData.enemies.length <= 0) {
      this.ticksToNextBullet = 1;
      return;
    }

    const chosenEnemy = this.chooseEnemyToShoot();

    if (chosenEnemy == null) {
      return;
    }

    if (this.baseArrowAttack > 0) {
      if (gameData.resources.arrow.amount.lessThan(1)) {
        return;
      }
      gameData.resources.arrow.subtract(new JBDecimal(1));
    } else if (this.baseCatapultAttack > 0) {
      if (gameData.resources.stone.amount.lessThan(1)) {
        return;
      }
      gameData.resources.stone.subtract(new JBDecimal(1));
    }

    const shieldBreak = this.shieldBreakValue();

    if (shieldBreak > 0 && chosenEnemy.defense.greaterThan(0)) {
      chosenEnemy.defense = chosenEnemy.defense.subtract(attackValue.multiply(shieldBreak));
      if (chosenEnemy.defense.lessThan(0)) {
        chosenEnemy.defense = new JBDecimal(0);
      }
    }
    chosenEnemy.beTargetedByWeapon(attackValue, this.pos);
  }

  poisonEnemies() {
    const poisonValue = this.poisonAttackValue();
    if (gameData.enemies.length > 0) {
      gameData.enemies.forEach((e) => {
        const len = e.pos.getLengthFromAnotherVector(this.pos);
        if (len <= this.range()) {
          e.poisonPerSec = e.poisonPerSec.add(poisonValue.multiply(gameData.world.currentTickLength / 1000));
        }
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  shieldBreakValue() {
    if (gameData.challenges[6].active || gameData.challenges[6].completed === 0) {
      return 0;
    }
    let ret = gameData.challenges[6].completed / 10;
    ret *= skillDeterioration();
    return ret;
  }

  slowToValue() {
    if (gameData.challenges[4].active || gameData.challenges[4].completed === 0 || this.bought === 0) {
      return 1;
    }

    let slowValue = this.baseSlow * this.bought * gameData.challenges[4].completed;

    slowValue *= skillDeterioration() + 0.2;
    if (slowValue < 0.2) {
      slowValue = 0.2;
    }

    if (slowValue > 0.9) {
      slowValue = 0.9;
    }

    return 1 - slowValue;
  }

  slowEnemies() {
    const slowToValue = this.slowToValue();
    gameData.enemies.forEach((e) => {
      const len = e.pos.getLengthFromAnotherVector(this.pos);
      if (len <= this.range()) {
        if (e.slowed > slowToValue) {
          e.slowed = slowToValue;
        }
      }
    });
  }

  poisonAttackValue() {
    if (gameData.challenges[3].active || gameData.challenges[3].completed === 0) {
      return new JBDecimal(0);
    }
    let temp = this.basePoisonAttack * this.bought * gameData.challenges[3].completed * achievementbonus;
    temp *= 1.2 ** gameData.researches[6].bought * 4 ** (gameData.pebbleUpgrades[3].bought + gameData.rockUpgrades[8].bought);
    let ret = new JBDecimal(temp);
    ret = ret.multiply((1 + (gameData.pebbleUpgrades[8].bought + gameData.powderUpgrades[3].bought + gameData.rockUpgrades[11].bought) / 100) ** this.bought);

    // ret = ret.multiply(1.2 ** gameData.researches[6].bought);
    // ret = ret.multiply();
    return ret;
  }

  // eslint-disable-next-line class-methods-use-this
  getEfficiencyRating() {
    let efficiencyRating = 1;
    if (gameData.challenges[7].active || gameData.challenges[7].completed === 0) {
      return efficiencyRating;
    }

    efficiencyRating /= 1.1 ** gameData.challenges[7].completed;

    return efficiencyRating;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  act() {
    if (this.type === '') {
      return;
    }

    if (this.type === 'LumberJack') {
      // if (gameData.resources.wood.amount.greaterThanOrEqualTo(totalWoodStorage)) {
      //   return;
      // }
      const production = this.woodProductionPerSec();
      const productionThisTick = production.multiply(gameData.world.currentTickLength / 1000);
      gameData.resources.wood.add(productionThisTick);
      return;
    }

    if (this.type === 'RedResearchLab') {
      const productionCapability = this.redResearchProductionPerSec().multiply(gameData.world.currentTickLength / 1000);

      const rawMaterials = productionCapability.multiply(1000 * this.getEfficiencyRating());

      // const resourcesPerSec = rawMaterials.multiply(-1000 / gameData.world.currentTickLength);

      if (gameData.resources.arrow.amount.lessThan(rawMaterials.divide(10))) {
        return;
      }

      if (gameData.resources.stone.amount.lessThan(rawMaterials)) {
        return;
      }

      gameData.resources.redResearch.add(productionCapability);
      gameData.resources.arrow.subtract(rawMaterials.divide(10));
      gameData.resources.stone.subtract(rawMaterials);
      return;
    }

    if (this.type === 'StoneMason') {
      const production = this.stoneProductionPerSec();
      const productionThisTick = production.multiply(gameData.world.currentTickLength / 1000);
      gameData.resources.stone.add(productionThisTick);
      return;
    }

    if (this.type === 'Fletcher') {
      const productionCapability = this.arrowProductionPerSec().multiply(gameData.world.currentTickLength / 1000);

      const rawMaterials = productionCapability.multiply(this.getEfficiencyRating());

      // const resourcesPerSec = rawMaterials.multiply(-100 / gameData.world.currentTickLength); // .1 wood per arrow *1000/10 combined to 100

      if (gameData.resources.wood.amount.lessThan(rawMaterials)) {
        return;
      }

      if (gameData.researches[0].bought > 0) {
        if (gameData.resources.stone.amount.lessThan(rawMaterials)) {
          return;
        }
      }

      gameData.resources.arrow.add(productionCapability);
      gameData.resources.wood.subtract(rawMaterials);
      if (gameData.researches[0].bought > 0) {
        gameData.resources.stone.subtract(rawMaterials);
      }
      return;
    }

    if (gameData.enemies.length <= 0) {
      return;
    }

    if (this.baseArrowAttack > 0) {
      this.ticksToNextBullet -= gameData.world.currentTickLength;
      while (this.ticksToNextBullet < 0) {
        this.attack(this.arrowAttackValue());
      }
    }

    if (this.baseCatapultAttack > 0) {
      this.ticksToNextBullet -= gameData.world.currentTickLength;
      while (this.ticksToNextBullet < 0) {
        this.attack(this.catapultAttackValue());
      }
    }

    if (this.basePoisonAttack > 0) {
      this.poisonEnemies();
    }

    if (this.baseSlow > 0) {
      this.slowEnemies();
    }
  }

  DisplayBuildingText(initialtext: string, textColor: string, fonstsize = 12) {
    // eslint-disable-next-line no-case-declarations
    const lines = `${initialtext}`.split('<br />');
    // eslint-disable-next-line no-case-declarations
    let offset = 0.5 - lines.length / 2;
    lines.forEach((element) => {
      display.drawText(element, new Vector(this.pos.x, this.pos.y + (offset * fonstsize) / 12), textColor, `${display.getFontSizeString(fonstsize)}px Arial`, 'center', 'top');
      offset += 1;
    });
  }

  drawRange(ctx: CanvasRenderingContext2D) {
    switch (this.type) {
      case 'ArrowTower':
        display.DrawCircle(this.pos, 0.1, this.range(), 'tomato', ctx);
        break;
      case 'Catapult':
        display.DrawCircle(this.pos, 0.1, this.range(), 'salmon', ctx);
        break;
      case 'PoisonTower':
        display.DrawCircle(this.pos, 0.1, this.range(), 'green', ctx);
        break;
      case 'SlowTower':
        display.DrawCircle(this.pos, 0.1, this.range(), 'blue', ctx);
        break;
      default:
        break;
    }
  }

  draw() {
    switch (this.type) {
      case 'LumberJack':
        display.DrawSolidSmallDiamond(this.pos, 'burlywood');
        this.DisplayBuildingText(`Lumberjack<br />Level: ${this.bought}<br />+${this.woodProductionPerSec().toString()} wood /s`, 'black');
        break;
      case 'StoneMason':
        display.DrawSolidSmallDiamond(this.pos, 'gainsboro');
        this.DisplayBuildingText(`Stone Mason<br />Level: ${this.bought}<br />+${this.stoneProductionPerSec().toString()} stone /s`, 'black');
        break;
      case 'Fletcher':
        display.DrawSolidSmallDiamond(this.pos, 'brown');
        this.DisplayBuildingText(`Fletcher<br />Level: ${this.bought}<br />+${this.arrowProductionPerSec().toString()} arrows /s`, 'white');
        break;
      case 'RedResearchLab':
        display.DrawSolidSmallDiamond(this.pos, 'red');
        this.DisplayBuildingText(`Red Research Lab<br />Level: ${this.bought}<br />+${this.redResearchProductionPerSec().toString()} research /s`, 'white');
        break;
      case 'Shack':
        display.DrawSolidSquare(this.pos, 'white');
        this.DisplayBuildingText(`Shack<br />Level: ${this.bought}<br />Housing: ${this.housingAvailable().toString()}`, 'black');
        break;
      case 'House':
        display.DrawSolidSquare(this.pos, 'snow');
        this.DisplayBuildingText(`House<br /> Level: ${this.bought}<br />Housing: ${this.housingAvailable().toString()}`, 'black');
        break;
      case 'Mansion':
        display.DrawSolidSquare(this.pos, 'ivory');
        this.DisplayBuildingText(`Mansion<br />Level: ${this.bought}<br />Housing: ${this.housingAvailable().toString()}`, 'black');
        break;
      case 'ArrowTower':
        display.DrawEnemyCircle(this.pos, ['tomato'], false, display.drone5.currentHitPoints());
        // eslint-disable-next-line no-case-declarations
        let buildtext = `Arrow Tower<br />Level: ${this.bought}<br />D: ${this.arrowAttackValue().toString()}<br />S: ${new JBDecimal(this.shotsPerSecond()).toString()} /s`;
        if (!gameData.challenges[5].active || gameData.challenges[5].completed > 0) {
          buildtext += `<br />C: ${new JBDecimal(critChance()).toString()}% (${new JBDecimal(critMultiplier()).toString()}x)`;
        }
        this.DisplayBuildingText(buildtext, 'white');
        break;
      case 'Catapult':
        display.DrawEnemyCircle(this.pos, ['salmon'], false, display.drone5.currentHitPoints());
        // eslint-disable-next-line no-case-declarations
        let buildtextC = `Catapult Tower<br />Level: ${this.bought}<br />D: ${this.catapultAttackValue().toString()}<br />S: ${new JBDecimal(this.shotsPerSecond()).toString()} /s`;
        if (!gameData.challenges[5].active || gameData.challenges[5].completed > 0) {
          buildtextC += `<br />C: ${new JBDecimal(critChance()).toString()}% (${new JBDecimal(critMultiplier()).toString()}x)`;
        }
        this.DisplayBuildingText(buildtextC, 'white');
        break;
      case 'PoisonTower':
        display.DrawEnemyCircle(this.pos, ['green'], false, display.drone5.currentHitPoints());
        this.DisplayBuildingText(`Poison Tower<br />Level: ${this.bought}<br />Damage: ${this.poisonAttackValue().toString()}`, 'white');
        break;
      case 'SlowTower':
        display.DrawEnemyCircle(this.pos, ['blue'], false, display.drone5.currentHitPoints());
        this.DisplayBuildingText(`Slow Tower<br />Level: ${this.bought}<br />Slow: ${new JBDecimal(this.slowToValue()).toString()}`, 'white');
        break;
      case '':
        display.DrawSolidSquare(this.pos, 'grey');
        display.drawText(this.index.toString(), this.pos, 'white', '12px Arial', 'center', 'middle');
        if (activeBuilding != null) {
          if (activeBuilding.index === this.index) {
            display.DrawSolidSquare(this.pos, 'silver');
            display.drawText(this.index.toString(), this.pos, 'black', '12px Arial', 'center', 'middle');
          }
        }
        break;
      default:
        break;
    }

    if (this.type !== '') {
      // draw delete button
      display.DrawEnemyCircle(new Vector(this.pos.x + 2.2, this.pos.y - 3.4), ['red'], true, display.drone1.currentHitPoints());
      display.drawText('X', new Vector(this.pos.x + 2.2, this.pos.y - 3.4), 'white', `${display.getFontSizeString(12)}px Arial`, 'center', 'middle');
      // draw buy button
      if (this.affordBuy()) {
        display.DrawEnemyCircle(new Vector(this.pos.x, this.pos.y - 4), ['green'], true, display.drone1.currentHitPoints());
      } else {
        display.DrawEnemyCircle(new Vector(this.pos.x, this.pos.y - 4), ['red'], true, display.drone1.currentHitPoints());
      }
      display.drawText('+', new Vector(this.pos.x, this.pos.y - 4), 'white', `${display.getFontSizeString(12)}px Arial bold`, 'center', 'middle');
      // draw auto button
      if (achievementbonus > 20) {
        if (this.autoOn) {
          display.DrawEnemyCircle(new Vector(this.pos.x - 2.2, this.pos.y - 3.4), ['green'], true, display.drone1.currentHitPoints());
          display.drawText('A', new Vector(this.pos.x - 2.2, this.pos.y - 3.4), 'black', `${display.getFontSizeString(12)}px Arial bold`, 'center', 'middle');
        } else {
          display.DrawEnemyCircle(new Vector(this.pos.x - 2.2, this.pos.y - 3.4), ['red'], true, display.drone1.currentHitPoints());
          display.drawText('A', new Vector(this.pos.x - 2.2, this.pos.y - 3.4), 'white', `${display.getFontSizeString(12)}px Arial`, 'center', 'middle');
        }
      }
    }
  }

  setInfoByType() {
    this.active = true;
    this.autoOn = false;
    this.peopleCostPer = 0;
    this.woodCostPer = 0;
    this.woodCostMultiplierPer = 0;
    this.baseProductionPerSec = 0;
    this.baseHousing = new JBDecimal(0);
    this.stoneCostPer = 0;
    this.stoneCostMultiplierPer = 0;
    this.essenceCostPer = 0;
    this.essenceCostMultiplierPer = 0;
    this.baseArrowAttack = 0;
    this.basePoisonAttack = 0;
    this.baseSlow = 0;
    this.baseCatapultAttack = 0;

    switch (this.type) {
      case 'LumberJack':
        this.equipmentPhrase = 'LumberJack';
        this.inflationFloor = 100;
        this.peopleCostPer = 1;
        this.woodCostPer = LUMBERJACK_COST;
        this.woodCostMultiplierPer = LUMBERJACK_MULTIPLIER;
        this.baseProductionPerSec = 1;
        break;
      case 'RedResearchLab':
        this.equipmentPhrase = 'RedResearch';
        this.inflationFloor = 20;
        this.peopleCostPer = 10;
        this.woodCostPer = RED_RESEARCH_LAB_WOOD_COST;
        this.woodCostMultiplierPer = RED_RESEARCH_LAB_WOOD_MULTIPLIER;
        this.baseProductionPerSec = 0.1;
        this.stoneCostPer = RED_RESEARCH_LAB_STONE_COST;
        this.stoneCostMultiplierPer = RED_RESEARCH_LAB_STONE_MULTIPLIER;
        break;
      case 'StoneMason':
        this.equipmentPhrase = 'StoneMason';
        this.inflationFloor = 50;
        this.peopleCostPer = 3;
        this.woodCostPer = STONEMASON_COST;
        this.woodCostMultiplierPer = STONEMASON_MULTIPLIER;
        this.baseProductionPerSec = 1;
        break;
      case 'Shack':
        this.equipmentPhrase = 'Housing';
        this.inflationFloor = 25;
        this.woodCostPer = SHACK_COST;
        this.woodCostMultiplierPer = SHACK_MULTIPLIER;
        this.baseHousing = new JBDecimal(5);
        break;
      case 'House':
        this.equipmentPhrase = 'Housing';
        this.inflationFloor = 25;
        this.woodCostPer = HOUSE_WOOD_COST;
        this.woodCostMultiplierPer = HOUSE_WOOD_MULTIPLIER;
        this.stoneCostPer = HOUSE_STONE_COST;
        this.stoneCostMultiplierPer = HOUSE_STONE_MULTIPLIER;
        this.baseHousing = new JBDecimal(10);
        break;
      case 'Mansion':
        this.equipmentPhrase = 'Housing';
        this.inflationFloor = 25;
        this.woodCostPer = MANSION_WOOD_COST;
        this.woodCostMultiplierPer = MANSION_WOOD_MULTIPLIER;
        this.stoneCostPer = MANSION_STONE_COST;
        this.stoneCostMultiplierPer = MANSION_STONE_MULTIPLIER;
        this.baseHousing = new JBDecimal(25);
        break;
      case 'Fletcher':
        this.equipmentPhrase = 'Fletcher';
        this.inflationFloor = 25;
        this.peopleCostPer = 1;
        this.woodCostPer = FLETCHER_COST;
        this.woodCostMultiplierPer = FLETCHER_MULTIPLIER;
        this.baseProductionPerSec = 1;
        break;
      case 'ArrowTower':
        this.equipmentPhrase = 'ArrowTower';
        this.inflationFloor = 10;
        this.peopleCostPer = 1;
        this.baseRange = 15;
        this.baseShotsPerSec = 1;
        this.woodCostPer = ARROW_TOWER_COST;
        this.woodCostMultiplierPer = ARROW_TOWER_MULTIPLIER;
        this.baseArrowAttack = 1;
        break;
      case 'Catapult':
        this.equipmentPhrase = 'CatapultTower';
        this.inflationFloor = 10;
        this.peopleCostPer = 5;
        this.baseRange = 25;
        this.baseShotsPerSec = 0.25;
        this.woodCostPer = CATAPULT_WOOD_COST;
        this.woodCostMultiplierPer = CATAPULT_WOOD_MULTIPLIER;
        this.baseCatapultAttack = 10;
        this.stoneCostPer = CATAPULT_STONE_COST;
        this.stoneCostMultiplierPer = CATAPULT_STONE_MULTIPLIER;
        break;
      case 'PoisonTower':
        this.equipmentPhrase = 'PoisonTower';
        this.inflationFloor = 10;
        this.peopleCostPer = 1;
        this.baseRange = 15;
        this.essenceCostPer = POISON_TOWER_COST;
        this.essenceCostMultiplierPer = POISON_TOWER_MULTIPLIER;
        this.basePoisonAttack = 1;
        break;
      case 'SlowTower':
        this.equipmentPhrase = 'SlowTower';
        this.inflationFloor = 10;
        this.peopleCostPer = 1;
        this.baseRange = 15;
        this.essenceCostPer = SLOW_TOWER_COST;
        this.essenceCostMultiplierPer = SLOW_TOWER_MULTIPLIER;
        this.baseSlow = 0.02;
        break;
      default:
        break;
    }
  }

  housingAvailable() {
    const ret = new JBDecimal(this.baseHousing).multiply(this.bought * (gameData.researches[3].bought + gameData.powderUpgrades[5].bought + 1));
    return ret;
  }

  // eslint-disable-next-line class-methods-use-this
  powderUpgrade7Bonus() {
    let ret = 1;
    if (gameData.powderUpgrades[7].bought > 0) {
      ret = Math.sqrt(1 + gameData.stats.prestige1ticks / 600000);
    }
    return ret;
  }

  // eslint-disable-next-line class-methods-use-this
  powderUpgrade9Bonus() {
    let ret = 1;
    if (gameData.powderUpgrades[9].bought > 0) {
      ret = Math.sqrt(1 + gameData.stats.prestige1);
    }
    return ret;
  }

  redResearchProductionPerSec() {
    let ret = new JBDecimal(this.bought * this.baseProductionPerSec * 1.1 ** gameData.powderUpgrades[13].bought);
    ret = ret.multiply((1 + gameData.powderUpgrades[18].bought / 100) ** this.bought);
    if (gameData.equipment.length > 0) {
      gameData.equipment[0].abilities.forEach((a) => {
        if (a.name === this.equipmentPhrase) {
          ret = ret.multiply(1 + a.levels / 10);
        }
      });
    }

    return ret;
  }

  woodProductionPerSec() {
    let boughtToUse = this.bought;
    if (gameData.pebbleUpgrades[13].bought > 0) {
      boughtToUse += peopleAvailable().divide(1000).ToNumber();
    }
    let ret = new JBDecimal(boughtToUse * this.baseProductionPerSec);
    ret = ret.multiply(1.1 ** (gameData.powderUpgrades[2].bought + gameData.researches[4].bought) * this.powderUpgrade7Bonus() * this.powderUpgrade9Bonus() * (1 + gameData.powderUpgrades[14].bought / 100) ** boughtToUse);
    ret = ret.multiply(2 ** gameData.rockUpgrades[13].bought);
    if (gameData.equipment.length > 0) {
      gameData.equipment[0].abilities.forEach((a) => {
        if (a.name === this.equipmentPhrase) {
          ret = ret.multiply(1 + a.levels / 10);
        }
      });
    }
    return ret;
  }

  stoneProductionPerSec() {
    let boughtToUse = this.bought;
    if (gameData.pebbleUpgrades[13].bought > 0) {
      boughtToUse += peopleAvailable().divide(1000).ToNumber();
    }
    let ret = new JBDecimal(boughtToUse * this.baseProductionPerSec);
    ret = ret.multiply(1.1 ** (gameData.powderUpgrades[12].bought + gameData.researches[5].bought) * this.powderUpgrade7Bonus() * this.powderUpgrade9Bonus() * (1 + gameData.powderUpgrades[15].bought / 100) ** boughtToUse);
    ret = ret.multiply(2 ** gameData.rockUpgrades[14].bought);
    if (gameData.equipment.length > 0) {
      gameData.equipment[0].abilities.forEach((a) => {
        if (a.name === this.equipmentPhrase) {
          ret = ret.multiply(1 + a.levels / 10);
        }
      });
    }
    return ret;
  }

  arrowProductionPerSec() {
    const ret = new JBDecimal(this.bought * this.baseProductionPerSec);
    let multipliers = 1.1 ** (gameData.powderUpgrades[6].bought + gameData.researches[7].bought) * (1 + gameData.powderUpgrades[19].bought / 100) ** this.bought;
    if (gameData.equipment.length > 0) {
      gameData.equipment[0].abilities.forEach((a) => {
        if (a.name === this.equipmentPhrase) {
          multipliers *= 1 + a.levels / 10;
        }
      });
    }
    return ret.multiply(multipliers);
  }

  delete(allowChecks = true) {
    const housingFree = totalHousing.subtract(workersUsed().add(this.housingAvailable()));

    if (housingFree.lessThanOrEqualTo(0) && allowChecks && this.housingAvailable().greaterThan(0)) {
      display.addToDisplay("Can't destroy this building until more people are unemployed", DisplayCategory.Tutorial);
      return;
    }
    this.type = '';
    this.bought = 0;
    this.setInfoByType();
    this.tactics.changeTactic(0);
  }

  arrowAttackValue() {
    const temp1 = this.bought * achievementbonus * this.baseArrowAttack;
    const temp2 =
      1.1 ** gameData.researches[1].bought *
      1.1 ** gameData.powderUpgrades[0].bought *
      2 ** (gameData.pebbleUpgrades[1].bought + gameData.researches[0].bought + gameData.rockUpgrades[3].bought) *
      (1 + (gameData.powderUpgrades[8].bought + gameData.pebbleUpgrades[14].bought + gameData.rockUpgrades[9].bought) / 100) ** this.bought;
    let AttackPerLevel = new JBDecimal(temp1).multiply(temp2);
    // AttackPerLevel = AttackPerLevel.multiply();
    // AttackPerLevel = AttackPerLevel.multiply();

    if (gameData.equipment.length > 0) {
      gameData.equipment[0].abilities.forEach((a) => {
        if (a.name === this.equipmentPhrase) {
          AttackPerLevel = AttackPerLevel.multiply(1 + a.levels / 10);
        }
      });
    }

    let critchance = critChance();

    const multiplier = critMultiplier();

    while (critchance >= 100) {
      AttackPerLevel = AttackPerLevel.multiply(multiplier);
      critchance -= 100;
    }

    return AttackPerLevel;
  }

  catapultAttackValue() {
    let AttackPerLevel = new JBDecimal(this.bought * achievementbonus * this.baseCatapultAttack * 1.1 ** gameData.researches[8].bought);
    AttackPerLevel = AttackPerLevel.multiply(1.1 ** gameData.powderUpgrades[16].bought);
    AttackPerLevel = AttackPerLevel.multiply(
      2 ** (gameData.pebbleUpgrades[2].bought + gameData.rockUpgrades[4].bought) * (1 + (gameData.powderUpgrades[17].bought + gameData.pebbleUpgrades[15].bought + gameData.rockUpgrades[10].bought) / 100) ** this.bought
    );

    if (gameData.researches[2].bought) {
      AttackPerLevel = AttackPerLevel.multiply(3);
    }

    if (gameData.equipment.length > 0) {
      gameData.equipment[0].abilities.forEach((a) => {
        if (a.name === this.equipmentPhrase) {
          AttackPerLevel = AttackPerLevel.multiply(1 + a.levels / 10);
        }
      });
    }

    let critchance = critChance();

    const multiplier = critMultiplier();

    while (critchance >= 100) {
      AttackPerLevel = AttackPerLevel.multiply(multiplier);
      critchance -= 100;
    }

    return AttackPerLevel;
  }

  range() {
    if (gameData.challenges[2].active || gameData.challenges[2].completed < 1) {
      return this.baseRange;
    }

    let ret = (this.baseRange * gameData.challenges[2].completed) / 5;
    ret *= skillDeterioration();
    ret += this.baseRange;

    if (ret < this.baseRange) {
      ret = this.baseRange;
    } else if (ret > 100) {
      ret = 100;
    }
    return ret;
  }

  shotsPerSecond() {
    if (gameData.challenges[1].active || gameData.challenges[1].completed < 1) {
      return this.baseShotsPerSec;
    }

    let bonusperupgrade = this.baseShotsPerSec / 4;

    bonusperupgrade += bonusperupgrade * gameData.pebbleUpgrades[9].bought;

    let totalChange = gameData.challenges[1].completed * bonusperupgrade;

    totalChange *= skillDeterioration();

    const ret = this.baseShotsPerSec + totalChange;

    return ret;
  }

  ticksPerShot() {
    return 1000 / this.shotsPerSecond();
  }

  buyLumberJack() {
    if (this.type === '') {
      this.peopleCostPer = 1;
      this.woodCostPer = LUMBERJACK_COST;
      this.woodCostMultiplierPer = LUMBERJACK_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'LumberJack';
        this.setInfoByType();
        this.buy();
      }
    }
  }

  buyStoneMason() {
    if (this.type === '') {
      this.peopleCostPer = 3;
      this.woodCostPer = STONEMASON_COST;
      this.woodCostMultiplierPer = STONEMASON_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'StoneMason';
        this.setInfoByType();
        this.buy();
      }
    }
  }

  buyShack() {
    if (this.type === '') {
      this.peopleCostPer = 0;
      this.woodCostPer = SHACK_COST;
      this.woodCostMultiplierPer = SHACK_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'Shack';
        this.setInfoByType();
        this.buy();
      }
    }
  }

  buyHouse() {
    if (this.type === '') {
      this.peopleCostPer = 0;
      this.woodCostPer = HOUSE_WOOD_COST;
      this.woodCostMultiplierPer = HOUSE_WOOD_MULTIPLIER;
      this.stoneCostPer = HOUSE_STONE_COST;
      this.stoneCostMultiplierPer = HOUSE_STONE_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'House';
        this.setInfoByType();
        this.buy();
      }
    }
  }

  buyMansion() {
    if (this.type === '') {
      this.peopleCostPer = 0;
      this.woodCostPer = MANSION_WOOD_COST;
      this.woodCostMultiplierPer = MANSION_WOOD_MULTIPLIER;
      this.stoneCostPer = MANSION_STONE_COST;
      this.stoneCostMultiplierPer = MANSION_STONE_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'Mansion';
        this.setInfoByType();
        this.buy();
      }
    }
  }

  buyRedResearchLab() {
    if (this.type === '') {
      this.peopleCostPer = 10;
      this.woodCostPer = RED_RESEARCH_LAB_WOOD_COST;
      this.woodCostMultiplierPer = RED_RESEARCH_LAB_WOOD_MULTIPLIER;
      this.stoneCostPer = RED_RESEARCH_LAB_STONE_COST;
      this.stoneCostMultiplierPer = RED_RESEARCH_LAB_STONE_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'RedResearchLab';
        this.setInfoByType();
        this.buy();
      }
    }
  }

  buyFletcher() {
    if (this.type === '') {
      this.peopleCostPer = 1;
      this.woodCostPer = FLETCHER_COST;
      this.woodCostMultiplierPer = FLETCHER_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'Fletcher';
        this.setInfoByType();
        this.buy();
      }
    }
  }

  buyArrowTower() {
    if (this.type === '') {
      this.woodCostPer = ARROW_TOWER_COST;
      this.peopleCostPer = 1;
      this.woodCostMultiplierPer = ARROW_TOWER_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'ArrowTower';
        this.setInfoByType();
        this.buy();
      }
    }
  }

  buyCatapult() {
    if (this.type === '') {
      this.peopleCostPer = 5;
      this.woodCostPer = CATAPULT_WOOD_COST;
      this.woodCostMultiplierPer = CATAPULT_WOOD_MULTIPLIER;
      this.stoneCostPer = CATAPULT_STONE_COST;
      this.stoneCostMultiplierPer = CATAPULT_STONE_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'Catapult';
        this.setInfoByType();
        this.buy();
      }
    }
  }

  buyPoisonTower() {
    if (this.type === '') {
      this.essenceCostPer = POISON_TOWER_COST;
      this.peopleCostPer = 1;
      this.essenceCostMultiplierPer = POISON_TOWER_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'PoisonTower';
        this.setInfoByType();
        this.buy();
      }
    }
  }

  buySlowTower() {
    if (this.type === '') {
      this.essenceCostPer = SLOW_TOWER_COST;
      this.peopleCostPer = 1;
      this.essenceCostMultiplierPer = SLOW_TOWER_MULTIPLIER;
      if (this.affordBuy()) {
        this.type = 'SlowTower';
        this.setInfoByType();
        this.buy();
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Enemy extends movingObject {
  type: number;

  baseMaxHitPoints: JBDecimal;

  damagetaken: JBDecimal;

  poisonPerSec: JBDecimal;

  defense: JBDecimal;

  healer: boolean;

  shielded: boolean;

  fast: boolean;

  thief: boolean;

  strong: boolean;

  bullets: Bullet[];

  ticksToNextTheft: number;

  destroyedlevel: number;

  constructor(displayDrone: boolean) {
    super(new Vector(0, 5), 0, false, []);
    this.bullets = [];

    this.type = 0;

    this.ticksToNextTheft = 0;

    const tieradjustment = gameData.world.currentTier - 1;

    this.shielded = false;
    this.healer = false;
    this.fast = false;
    this.strong = false;
    this.thief = false;
    this.destroyedlevel = 0;

    this.baseMaxHitPoints = new JBDecimal(1.2 + tieradjustment / 100).pow(gameData.world.currentWave - 1);
    this.baseMaxHitPoints.exponent += tieradjustment;
    this.damagetaken = new JBDecimal(0);
    this.poisonPerSec = new JBDecimal(0);
    this.defense = new JBDecimal(0);
    if (displayDrone) {
      return;
    }
    this.createTargetList();
    this.movementPerSec = 10;
    // eslint-disable-next-line no-use-before-define
    if (Math.random() * gameData.world.enemiesToSpawn < getSpecialsCount()) {
      const choicesArr = getSpecialsArray();

      let type = choicesArr[Math.floor(Math.random() * choicesArr.length)];
      gameData.world.spawnsRemaining[type] -= 1;
      this.type = type;
      if (type >= 16) {
        this.shielded = true;
        this.defense = new JBDecimal(this.baseMaxHitPoints.multiply(gameData.world.currentWave / 200));
        type -= 16;
      }

      if (type >= 8) {
        this.healer = true;
        type -= 8;
      }

      if (type >= 4) {
        this.fast = true;
        this.movementPerSec *= 2;
        type -= 4;
      }

      if (type >= 2) {
        this.strong = true;
        this.baseMaxHitPoints = this.baseMaxHitPoints.multiply(2);
        type -= 2;
      }

      if (type >= 1) {
        this.thief = true;
        type -= 1;
      }
    }
  }

  // setFlyerTargetList() {
  //   this.targetList = [];
  //   this.targetList.push(new Vector(getTierSize() - 5, getTierSize() - 5));
  //   this.targetList.push(new Vector(getTierSize() - 5, getTierSize() + 5));
  // }

  maxHitPoints() {
    const ret = new JBDecimal(this.baseMaxHitPoints);
    return ret;
  }

  currentHitPoints() {
    return this.maxHitPoints().subtract(this.damagetaken);
  }

  createTargetList() {
    const currentTierSize = getTierSize();
    let currentx = 10;
    let currenty = 5;

    while (currenty <= currentTierSize) {
      currentx = currentTierSize - 5;
      const newWaypoint1 = new Vector(currentx, currenty);
      this.targetList.push(newWaypoint1);
      currenty += 20;
      const newWaypoint2 = new Vector(currentx, currenty);
      this.targetList.push(newWaypoint2);
      currentx = 5;
      const newWaypoint3 = new Vector(currentx, currenty);
      this.targetList.push(newWaypoint3);
      currenty += 20;
      const newWaypoint4 = new Vector(currentx, currenty);
      this.targetList.push(newWaypoint4);
    }
  }

  timeFromExit() {
    let ret = this.pos.getLengthFromAnotherVector(this.targetList[this.targetListIndex]);

    for (let index = this.targetListIndex; index < this.targetList.length - 1; index++) {
      ret += this.targetList[index].getLengthFromAnotherVector(this.targetList[index + 1]);
    }

    return ret / this.movementPerSec;
  }

  act() {
    this.move();
    this.takePoisonDamage();
    this.checkForHit();

    this.ticksToNextTheft -= gameData.world.currentTickLength;

    if (this.currentHitPoints().greaterThan(0)) {
      if (this.destroyedlevel < gameData.world.currentWave / 50) {
        gameData.buildings.forEach((b) => {
          if (this.pos.getLengthFromAnotherVector(b.pos) < 11 && b.baseProductionPerSec > 0 && b.bought > 0) {
            // eslint-disable-next-line no-param-reassign
            b.bought -= 1;
            this.destroyedlevel += 1;
            display.floaters.push(new FloatingText(`${b.type} level destroyed`, 'red', new Vector(this.pos.x - 1, this.pos.y + 1)));
          }
        });
      }

      if (this.healer) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const me = this;
        gameData.enemies.forEach((e) => {
          const healRange = gameData.world.currentWave / 5;
          if (e.pos.getLengthFromAnotherVector(me.pos) < healRange) {
            e.damagetaken = e.damagetaken.subtract(me.currentHitPoints().multiply(gameData.world.currentTickLength / 10000));
            if (e.damagetaken.lessThan(0)) {
              e.damagetaken = new JBDecimal(0);
            }
          }
        });
      }
      return false;
    }

    // below fires when enemy is dead
    let essenceGained = new JBDecimal(0);

    if (this.type === 0) {
      return true;
    }

    if (gameData.world.currentWave > gameData.world.highestWaveCompleted) {
      let wavetouse = gameData.world.currentWave;
      if (wavetouse > getWavesNeededForTier()) {
        wavetouse = getWavesNeededForTier();
      }
      essenceGained = new JBDecimal(1.05 ** wavetouse);
      essenceGained = essenceGained.multiply(2 ** (gameData.world.currentTier - 1));
    }

    if (this.fast) {
      essenceGained = essenceGained.multiply(1.1);
    }
    if (this.strong) {
      essenceGained = essenceGained.multiply(1.1);
    }
    if (this.healer) {
      essenceGained = essenceGained.multiply(1.1);
    }
    if (this.shielded) {
      essenceGained = essenceGained.multiply(1.1);
    }
    if (this.thief) {
      essenceGained = essenceGained.multiply(1.1);
    }

    const UpgradeBonus = 0.1 * 2 ** gameData.pebbleUpgrades[4].bought;
    const lootBonus = (1 + UpgradeBonus) ** gameData.powderUpgrades[1].bought;
    if (essenceGained.greaterThan(0)) {
      essenceGained = essenceGained.multiply(lootBonus);
      gameData.resources.essence.add(essenceGained);
      display.floaters.push(new FloatingText(`${essenceGained.toString()} essence gained`, 'yellow', new Vector(this.pos.x - 1, this.pos.y + 1)));
      // display.addToDisplay(`${dustGained.ToString()} dust gained`, DisplayCategory.Loot);
    }

    // if (metalGained.greaterThan(0)) {
    //   metalGained = metalGained.multiply(lootBonus);
    //   gameData.resources.metal.add(metalGained);
    //   display.floaters.push(new FloatingText(`${metalGained.toString()} metal gained`, 'white', this.pos));
    //   // display.addToDisplay(`${metalGained.ToString()} metal gained`, DisplayCategory.Loot);
    // }

    return true;
  }

  draw() {
    const colors = [];
    if (this.movementPerSec > 10) {
      colors.push('yellow');
    }
    if (this.healer) {
      colors.push('green');
    }
    if (this.thief) {
      colors.push('red');
    }

    if (colors.length === 0) {
      colors.push('white');
    }
    if (this.defense.greaterThan(0)) {
      if (this.defense.greaterThan(this.currentHitPoints())) {
        display.DrawSolidSquare(this.pos, 'blue', this.defense);
        display.DrawEnemyCircle(this.pos, colors, true, this.currentHitPoints());
      } else {
        display.DrawEnemyCircle(this.pos, colors, true, this.currentHitPoints());
        display.DrawSolidSquare(this.pos, 'blue', this.defense);
      }
    } else {
      display.DrawEnemyCircle(this.pos, colors, true, this.currentHitPoints());
    }
  }

  takePoisonDamage() {
    this.damagetaken = this.damagetaken.add(this.poisonPerSec.multiply(gameData.world.currentTickLength / 1000));
  }

  recieveHit(bullet: Bullet) {
    let damageToTake = new JBDecimal(bullet.damage);
    if (this.defense.greaterThan(0)) {
      damageToTake = damageToTake.subtract(this.defense);
      if (damageToTake.lessThan(0)) {
        return; // no damage will be taken, time to bounce
      }
    }
    this.damagetaken = this.damagetaken.add(damageToTake);
  }

  beTargetedByWeapon(damagePassed: JBDecimal, attackerPos: Vector) {
    const newBullet = new Bullet(attackerPos, this.pos, damagePassed);
    newBullet.setDamage();
    this.bullets.push(newBullet);
  }

  checkForHit() {
    for (let index = this.bullets.length - 1; index >= 0; index--) {
      const b = this.bullets[index];
      b.targetList[0] = new Vector(this.pos.x, this.pos.y);
      b.move();
      if (b.pos.getLengthFromAnotherVector(this.pos) <= 0) {
        this.recieveHit(b);
        this.bullets.splice(index, 1);
      }
    }
  }

  expectedHitPointsRemaining() {
    if (this.bullets.length === 0) {
      return this.currentHitPoints();
    }

    let leftoverHitpoints = this.currentHitPoints();

    this.bullets.forEach((b) => {
      leftoverHitpoints = leftoverHitpoints.subtract(b.damage.subtract(this.defense));
    });

    return leftoverHitpoints;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function numberOfTowerLevelsBought() {
  let ret = 0;
  gameData.buildings.forEach((t) => {
    ret += t.bought;
  });

  return ret;
}

function getSpecialsCount() {
  let total = 0;

  gameData.world.spawnsRemaining.forEach((s) => {
    total += s;
  });
  return total;
}

function getNumberOfEnemies(wave: number) {
  let div = wave - (gameData.world.currentTier - 1);
  if (div < 1) {
    div = 1;
  }

  return Math.floor(gameData.world.currentWave / div);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function resetSpawns(killexistingenemies = true) {
  gameData.world.currentWave += 1;
  if (gameData.world.currentWave === 1) {
    gameData.world.ticksToNextSpawn = 1000 * 60 * (10 - gameData.pebbleUpgrades[16].bought);
  } else {
    gameData.world.ticksToNextSpawn = 1000;
  }

  if (killexistingenemies) {
    gameData.enemies = [];
  } else {
    display.addToDisplay(`Wave ${gameData.world.currentWave - 1} completed!`, DisplayCategory.Story);
  }
  gameData.challenges.forEach((ch) => {
    if (ch.active) {
      ch.checkForCompletion();
    }
  });

  CheckAchievementCompletions(); // check before resetting to new tier

  if (gameData.world.currentWave > getWavesNeededForTier()) {
    // gameData.world.nextSaveGameTime = new Date();

    // quitChallenges();
    if (gameData.world.currentTier === gameData.world.tierUnlocked) {
      gameData.world.tierUnlocked += 1;
      while (gameData.tierBlueprints.length < gameData.world.currentTier + 1) {
        gameData.tierBlueprints.push(new TierBluePrint());
      }
    }
    // init(1);
  }

  display.drone1 = new Enemy(true);
  display.drone5 = new Enemy(true);
  display.drone5.baseMaxHitPoints = display.drone1.baseMaxHitPoints.multiply(5);
  display.drone10 = new Enemy(true);
  display.drone10.baseMaxHitPoints = display.drone1.baseMaxHitPoints.multiply(10);

  gameData.world.enemiesToSpawn = 9 + gameData.world.currentWave - gameData.pebbleUpgrades[10].bought;
  gameData.world.spawnsRemaining[1] = getNumberOfEnemies(5);
  gameData.world.spawnsRemaining[2] = getNumberOfEnemies(10);
  gameData.world.spawnsRemaining[3] = getNumberOfEnemies(20);
  gameData.world.spawnsRemaining[4] = getNumberOfEnemies(15);
  gameData.world.spawnsRemaining[5] = getNumberOfEnemies(30);
  gameData.world.spawnsRemaining[6] = getNumberOfEnemies(50);
  gameData.world.spawnsRemaining[7] = getNumberOfEnemies(60);
  gameData.world.spawnsRemaining[8] = getNumberOfEnemies(25);
  gameData.world.spawnsRemaining[9] = getNumberOfEnemies(35);
  gameData.world.spawnsRemaining[10] = getNumberOfEnemies(55);
  gameData.world.spawnsRemaining[11] = getNumberOfEnemies(70);
  gameData.world.spawnsRemaining[12] = getNumberOfEnemies(65);
  gameData.world.spawnsRemaining[13] = getNumberOfEnemies(80);
  gameData.world.spawnsRemaining[14] = getNumberOfEnemies(110);
  gameData.world.spawnsRemaining[15] = getNumberOfEnemies(115);
  gameData.world.spawnsRemaining[16] = getNumberOfEnemies(40);
  gameData.world.spawnsRemaining[17] = getNumberOfEnemies(45);
  gameData.world.spawnsRemaining[18] = getNumberOfEnemies(75);
  gameData.world.spawnsRemaining[19] = getNumberOfEnemies(90);
  gameData.world.spawnsRemaining[20] = getNumberOfEnemies(85);
  gameData.world.spawnsRemaining[21] = getNumberOfEnemies(100);
  gameData.world.spawnsRemaining[22] = getNumberOfEnemies(120);
  gameData.world.spawnsRemaining[23] = getNumberOfEnemies(135);
  gameData.world.spawnsRemaining[24] = getNumberOfEnemies(95);
  gameData.world.spawnsRemaining[25] = getNumberOfEnemies(105);
  gameData.world.spawnsRemaining[26] = getNumberOfEnemies(125);
  gameData.world.spawnsRemaining[27] = getNumberOfEnemies(140);
  gameData.world.spawnsRemaining[28] = getNumberOfEnemies(130);
  gameData.world.spawnsRemaining[29] = getNumberOfEnemies(145);
  gameData.world.spawnsRemaining[30] = getNumberOfEnemies(150);
  gameData.world.spawnsRemaining[31] = getNumberOfEnemies(155);
  gameData.world.spawnsRemaining[32] = getNumberOfEnemies(100000000000);

  if (gameData.world.enemiesToSpawn < getSpecialsCount() + 1) {
    gameData.world.enemiesToSpawn = getSpecialsCount() + 1;
  }
}
