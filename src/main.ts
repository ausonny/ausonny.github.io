/* globals $, gtag, localStorage, location */
/* exported chooseSlowOrFastTactical, gatewayClick, resetGame, buyAutoFight, buyMetalProficiency, buyPolymerProficiency, buyResearchProficiency, switchAutoFight, resetAbilities, changeNotation, exportsave, suicideShip,  */

const AUTOFIGHT_METAL_COST = 1000;
const AUTOFIGHT_POLYMER_COST = 500;
const AUTOFIGHT_RP_COST = 100;

const PANEL_BASE_COST = 75;
const PANEL_GROWTH_FACTOR = 1.3;

const GENERATOR_METAL_BASE_COST = 200;
const GENERATOR_GROWTH_FACTOR = 1.3;
const GENERATOR_POLYMER_BASE_COST = 50;

const PLANT_METAL_BASE_COST = 5000;
const PLANT_METAL_GROWTH_FACTOR = 1.3;
const PLANT_POLYMER_BASE_COST = 1250;
const PLANT_POLYMER_GROWTH_FACTOR = 1.3;

const AETHER_PLANT_METAL_BASE_COST = 20000;
const AETHER_PLANT_GROWTH_FACTOR = 1.3;
const AETHER_PLANT_POLYMER_BASE_COST = 5000;
const AETHER_PLANT_AETHER_BASE_COST = 100;

const FUSION_PLANT_METAL_BASE_COST = 5000000;
const FUSION_PLANT_GROWTH_FACTOR = 1.3;
const FUSION_PLANT_POLYMER_BASE_COST = 500000;
const FUSION_PLANT_AETHER_BASE_COST = 1000;

const MINE_BASE_COST = 10;
const MINE_GROWTH_FACTOR = 1.1;
const MINE_POWER_USAGE = 1;
const MINE_POWER_GROWTH_USAGE = 1.01;

const FACTORY_BASE_COST = 20;
const FACTORY_GROWTH_FACTOR = 1.2;
const FACTORY_POWER_USAGE = 2;
const FACTORY_POWER_GROWTH_USAGE = 1.01;

const REFINERY_METAL_BASE_COST = 20000;
const REFINERY_POLYMER_BASE_COST = 10000;
const REFINERY_GROWTH_FACTOR = 1.2;
const REFINERY_POWER_USAGE = 4;
const REFINERY_POWER_GROWTH_USAGE = 1.01;

const TACTICAL_LAB_METAL_BASE_COST = 2000000;
const TACTICAL_LAB_POLYMER_BASE_COST = 1000000;
const TACTICAL_LAB_GROWTH_FACTOR = 1.3;
const TACTICAL_LAB_POWER_USAGE = 5;
const TACTICAL_LAB_POWER_GROWTH_USAGE = 1.01;

const LAB_METAL_BASE_COST = 100;
const LAB_METAL_GROWTH_FACTOR = 1.3;
const LAB_POLYMER_BASE_COST = 100;
const LAB_POLYMER_GROWTH_FACTOR = 1.3;
const LAB_POWER_USAGE = 3;
const LAB_POWER_GROWTH_USAGE = 1.02;

const POWER_PER_PANEL = 10;
const POWER_PER_GENERATOR = 15;
const POWER_PER_PLANT = 25;
const POWER_PER_AETHER_PLANT = 50;
const POWER_PER_FUSION_PLANT = 100;

const SHIPYARD_METAL_BASE_COST = 1000;
const SHIPYARD_METAL_GROWTH_FACTOR = 1.3;
const SHIPYARD_POLYMER_BASE_COST = 500;
const SHIPYARD_POLYMER_GROWTH_FACTOR = 1.3;
const SHIPYARD_POWER_USAGE = 10;
const SHIPYARD_POWER_GROWTH_USAGE = 1.3;
const SHIPYARD_RP_BASE_COST = 250;
const SHIPYARD_RP_GROWTH_FACTOR = 1.3;

const PRESTIGE_COST_MULTIPLIER = 8.5;
const PRESTIGE_BASE_MULTIPLIER = 8;

const METAL_PROFIECIENCY_METAL_COST = 1000;
const METAL_PROFIECIENCY_METAL_GROWTH_FACTOR = 1.3;
const METAL_PROFIECIENCY_POLYMER_COST = 0.0;
const METAL_PROFIECIENCY_POLYMER_GROWTH_FACTOR = 1.3;
const METAL_PROFIECIENCY_RP_COST = 500;
const METAL_PROFIECIENCY_RP_GROWTH_FACTOR = 1.3;
const METAL_PROFICIENCY_BASE_RATE = 1.5;

const POLYMER_PROFIECIENCY_METAL_COST = 0;
const POLYMER_PROFIECIENCY_METAL_GROWTH_FACTOR = 1.3;
const POLYMER_PROFIECIENCY_POLYMER_COST = 500;
const POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR = 1.3;
const POLYMER_PROFIECIENCY_RP_COST = 500;
const POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR = 1.3;
const POLYMER_PROFICIENCY_BASE_RATE = 1.5;

const RESEARCH_PROFIECIENCY_METAL_COST = 1000;
const RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR = 1.3;
const RESEARCH_PROFIECIENCY_POLYMER_COST = 500;
const RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR = 1.3;
const RESEARCH_PROFIECIENCY_RP_COST = 500;
const RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR = 1.3;
const RESEARCH_PROFICIENCY_BASE_RATE = 1.5;

const AETHER_PROFIECIENCY_METAL_COST = 1000000;
const AETHER_PROFIECIENCY_METAL_GROWTH_FACTOR = 1.3;
const AETHER_PROFIECIENCY_POLYMER_COST = 100000;
const AETHER_PROFIECIENCY_POLYMER_GROWTH_FACTOR = 1.3;
const AETHER_PROFIECIENCY_RP_COST = 500000;
const AETHER_PROFIECIENCY_RP_GROWTH_FACTOR = 1.3;
const AETHER_PROFICIENCY_BASE_RATE = 1.5;

const RAILGUN_UPGRADE_METAL_BASE_COST = 50;
const RAILGUN_UPGRADE_POLYMER_BASE_COST = 25;
const RAILGUN_UPGRADE_RP_BASE_COST = 40;
const RAILGUN_UPGRADE_BASE_IMPROVEMENT = 4;
const RAILGUN_UPGRADE_AETHER_BASE_COST = 60;

const LASER_UPGRADE_METAL_BASE_COST = 100;
const LASER_UPGRADE_POLYMER_BASE_COST = 50;
const LASER_UPGRADE_RP_BASE_COST = 80;
const LASER_UPGRADE_BASE_IMPROVEMENT = 8;
const LASER_UPGRADE_AETHER_BASE_COST = 120;

const MISSILE_UPGRADE_METAL_BASE_COST = 200;
const MISSILE_UPGRADE_POLYMER_BASE_COST = 100;
const MISSILE_UPGRADE_RP_BASE_COST = 160;
const MISSILE_UPGRADE_BASE_IMPROVEMENT = 16;
const MISSILE_UPGRADE_AETHER_BASE_COST = 240;

const ARMOR_UPGRADE_METAL_BASE_COST = 100;
const ARMOR_UPGRADE_POLYMER_BASE_COST = 0;
const ARMOR_UPGRADE_RP_BASE_COST = 40;
const ARMOR_UPGRADE_BASE_IMPROVEMENT = 20;
const ARMOR_UPGRADE_AETHER_BASE_COST = 60;

const SHIELD_UPGRADE_METAL_BASE_COST = 0;
const SHIELD_UPGRADE_POLYMER_BASE_COST = 100;
const SHIELD_UPGRADE_RP_BASE_COST = 80;
const SHIELD_UPGRADE_BASE_IMPROVEMENT = 10;
const SHIELD_UPGRADE_AETHER_BASE_COST = 120;

const FLAK_UPGRADE_METAL_BASE_COST = 100;
const FLAK_UPGRADE_POLYMER_BASE_COST = 150;
const FLAK_UPGRADE_RP_BASE_COST = 160;
const FLAK_UPGRADE_BASE_IMPROVEMENT = 60;
const FLAK_UPGRADE_AETHER_BASE_COST = 240;

var notationDisplayOptions = ['Scientific Notation', 'Standard Formatting', 'Engineering Notation', 'Alphabetic Notation', 'Hybrid Notation', 'Logarithmic Notation'];

var possibleEnemies: PossibleEnemies[];
var lastSaveGameTime = new Date();
var textToDisplay: DisplayItem[];
var textGameSaved: DisplayItem[];
var textLoot: DisplayItem[];
var textCombat: DisplayItem[];
var textStory: DisplayItem[];
var textMissions: DisplayItem[];
var debugText = '';
var initted = false;
var gameData: saveGameData;
var achievementlist: Achievement [];
var achievementMultiplier = 0;
var Achievementcompleted = '';
var Achievementuncompleted = '';

class PossibleEnemies {
  name: string

  attackMod: number

  hitPointMod: number

  shmod: number

  constructor(name: string, attackMod: number, hitPointMod: number, shmod: number) {
    this.name = name;
    this.attackMod = attackMod;
    this.hitPointMod = hitPointMod;
    this.shmod = shmod;
  }
}

// Date.prototype.toJSON = function () {
//   return moment(this).format();
// };
class challenge {
  unlocked: boolean

  completed: boolean

  description: string

  galaxyUnlocked: number

  galaxyCompleted: number

  constructor(description:string, galaxyUnlocked:number, galaxyCompleted:number) {
    this.unlocked = false;
    this.completed = false;
    this.description = description;
    this.galaxyCompleted = galaxyCompleted;
    this.galaxyUnlocked = galaxyUnlocked;
  }
}

class challenges {
  consistency: challenge

  power: challenge

  criticality: challenge

  constructor() {
    this.consistency = new challenge('Your drones damage maximum will be lowered to the drones minimum damage for the duration of this challenge.  Upon completion you will unlock the Consistency ability which will improve your drones minimum damage and damage will return to normal.', 25, 25);
    this.power = new challenge('Power production will be halved for the duration of this challenge.  Upon completion the Power ability will be unlocked. and power production will return to normal', 30, 30);
    this.criticality = new challenge('The enemy has gained the ability to unleash massive amounts of critical damage from time to time. Learning this ability will be incredibly helpful.', 40, 40);
  }
}

class perks {
  looter: number

  producer: number

  damager: number

  thickskin: number

  speed: number

  consistency: number

  power: number

  criticality: number

  constructor() {
    this.looter = 0;
    this.producer = 0;
    this.damager = 0;
    this.thickskin = 0;
    this.speed = 0;
    this.consistency = 0;
    this.power = 0;
    this.criticality = 0;
  }
}

class saveGameData {
  name: string

  version: string

  challenges: challenges

  story: {
    shipyardUnlocked: boolean,
    gatewayUnlocked: boolean,
    initial: boolean,
    factoryunlocked: boolean,
    labunlocked: boolean,
    firstfight: boolean,
    generatorunlocked: boolean,
    plantunlocked: boolean,
    aetherplantunlocked: boolean,
    refineryunlocked: boolean,
    consistencyunlocked: boolean,
    powerunlocked: boolean,
    criticalityunlocked: boolean,
    fusionplantunlocked: boolean
  }

  perks: perks

  achievementids: number[]

  missions: Mission[]

  options: {
    standardNotation: number
    logNotBase: number
  }

  resources: {
    metal: number
    polymer: number
    power: number
    researchPoints: number
    aether: number
    chronoton: number
    chronotonfragments: number
  }

  buildings: {
    mines: number
    panels: number
    generators: number
    plants: number
    aetherPlants: number
    factories: number
    shipyard: number
    labs: number
    refineries: number
    tacticalLabs: number
    fusionPlants: number
  }

  playership: Ship

  enemyship: Ship

  world: {
    currentMission: number
    lastGalaxy: number // this is a failsafe
    paused: boolean
    timeElapsed: number
    dronesCreated: number
    currentChallenge: string
  }

  technologies: {
    autofightBought: number
    autofightOn: number
    autofightUnlock: number
    metalProficiencyUnlocked: number
    metalProficiencyBought: number
    polymerProficiencyUnlocked: number
    polymerProficiencyBought: number
    researchProficiency: number
    researchProficiencyBought: number
    aetherProficiencyUnlocked: number
    aetherProficiencyBought: number
    shipyardTechUnlock: number
    railgunPrestigeLevelUnlocked: number
    railgunPrestigeLevelBought: number
    railgunUpgrade: number
    laserPrestigeLevelUnlocked: number
    laserPrestigeLevelBought: number
    laserUpgrade: number
    missilePrestigeLevelUnlocked: number
    missilePrestigeLevelBought: number
    missileUpgrade: number
    armorPrestigeLevelUnlocked: number
    armorPrestigeLevelBought: number
    armorUpgrade: number
    shieldPrestigeLevelUnlocked: number
    shieldPrestigeLevelBought: number
    shieldUpgrade: number
    flakPrestigeLevelUnlocked: number
    flakPrestigeLevelBought: number
    flakUpgrade: number
    goldMine: number
    panelUpgrade: number
    generatorUpgrade: number
    plantupgrade: number
    aetherplantupgrade: number
    fusionplantupgrade: number
  }

  lastResourceProcessTime: Date

  lastRailgunCombatProcessTime: Date

  lastLaserCombatProcessTime: Date

  nextProcessTime: Date

  lastSentShipTime: Date

  tacticalChoices: {
    tacticalLabsSetting: number
  }

  constructor(name: string) {
    this.name = name;
    this.version = '0.7.2';
    this.challenges = new challenges();
    this.story = {
      aetherplantunlocked: false,
      factoryunlocked: false,
      firstfight: false,
      gatewayUnlocked: false,
      generatorunlocked: false,
      initial: false,
      labunlocked: false,
      plantunlocked: false,
      refineryunlocked: false,
      shipyardUnlocked: false,
      consistencyunlocked: false,
      powerunlocked: false,
      criticalityunlocked: false,
      fusionplantunlocked: false
    };
    this.perks = new perks();
    this.options = {
      logNotBase: 1,
      standardNotation: 1
    };
    this.resources = {
      aether: 0,
      chronoton: 0,
      chronotonfragments: 0,
      metal: 0,
      polymer: 0,
      power: 0,
      researchPoints: 0
    };
    this.buildings = {
      aetherPlants: 0,
      factories: 0,
      generators: 0,
      labs: 0,
      mines: 1,
      panels: 1,
      plants: 0,
      refineries: 0,
      shipyard: 0,
      tacticalLabs: 0,
      fusionPlants: 0
    };
    this.missions = [];
    this.enemyship = new Ship('dummy');
    this.playership = new Ship('player');
    this.world = {
      currentMission: 0,
      lastGalaxy: 0,
      paused: false,
      timeElapsed: 0,
      dronesCreated: 0,
      currentChallenge: ''
    };
    this.achievementids = [];
    this.technologies = {
      armorPrestigeLevelBought: 1,
      armorPrestigeLevelUnlocked: 1,
      armorUpgrade: 1,
      autofightBought: 0,
      autofightOn: 0,
      autofightUnlock: 0,
      flakPrestigeLevelBought: 0,
      flakPrestigeLevelUnlocked: 0,
      flakUpgrade: 0,
      goldMine: 0,
      laserPrestigeLevelBought: 0,
      laserPrestigeLevelUnlocked: 0,
      laserUpgrade: 0,
      metalProficiencyBought: 0,
      metalProficiencyUnlocked: 0,
      missilePrestigeLevelBought: 0,
      missilePrestigeLevelUnlocked: 0,
      missileUpgrade: 0,
      polymerProficiencyBought: 0,
      polymerProficiencyUnlocked: 0,
      railgunPrestigeLevelBought: 1,
      railgunPrestigeLevelUnlocked: 1,
      railgunUpgrade: 1,
      researchProficiency: 0,
      researchProficiencyBought: 0,
      shieldPrestigeLevelBought: 0,
      shieldPrestigeLevelUnlocked: 0,
      shieldUpgrade: 0,
      shipyardTechUnlock: 1,
      panelUpgrade: 0,
      aetherProficiencyBought: 0,
      aetherProficiencyUnlocked: 0,
      generatorUpgrade: 0,
      plantupgrade: 0,
      aetherplantupgrade: 0,
      fusionplantupgrade: 0
    };
    this.lastResourceProcessTime = new Date();
    this.lastRailgunCombatProcessTime = new Date();
    this.lastLaserCombatProcessTime = new Date();
    this.nextProcessTime = new Date();
    this.lastSentShipTime = new Date();
    this.tacticalChoices = {
      tacticalLabsSetting: 0
    };
  }
}

class Achievement {
  name: string

  bonus: number

  id: number

  constructor(id:number, name: string, bonus: number) {
    this.id = id;
    this.name = name;
    this.bonus = bonus;
  }
}

class Mission {
  name: string

  missiontype: string

  missionversion: number

  unique: boolean

  difficulty: number

  lootMultiplier: number

  level: number

  zones: number

  zone: number

  galaxy: number

  IsGalaxy: boolean

  enemies: Ship[]

  constructor(name: string, missiontype: string, missionversion: number, unique: boolean, difficulty: number, lootMultiplier: number, level: number, zones: number, IsGalaxy: boolean) {
    this.name = name;
    this.zone = 0;
    this.IsGalaxy = IsGalaxy;
    this.difficulty = difficulty;
    this.galaxy = level;
    this.level = level;
    this.lootMultiplier = lootMultiplier;
    this.missiontype = missiontype;
    this.missionversion = missionversion;
    this.unique = unique;
    this.zones = zones;
    this.createMissionMap();
  }

  createMissionMap() {
    var enemies = [];
    var index = 0;
    while (index < this.zones) {
      var newEnemymods = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)]; // this will efventually need to be redone when we add advanced enemies
      var newEnemy = new Ship(newEnemymods.name);
      var loot = checkForCreateLoot(this, index);
      var Boss = false;
      if (index === this.zones - 1) {
        Boss = true;
      }
      newEnemy.createEnemy(1, this.level, index, loot.lootType, loot.lootAmount, newEnemymods.attackMod, newEnemymods.hitPointMod, newEnemymods.shmod, this.difficulty, Boss);
      if (index === this.zones - 1) {
        newEnemy.attributes.push(new ShipAttribute(ELITE_ENEMY_ATTRIBUTES[Math.floor(Math.random() * ELITE_ENEMY_ATTRIBUTES.length)]));
        while (newEnemy.lootType === '') {
          loot = checkForCreateLoot(this, index);
          newEnemy.lootType = loot.lootType;
          newEnemy.lootAmount = loot.lootAmount;
        }
        newEnemy.lootAmount *= 2;
      }
      if (newEnemy.attributes.filter((att) => (att.name === 'Hardy')).length > 0) {
        newEnemy.hitPointsMax *= 2;
      }
      if (newEnemy.attributes.filter((att) => (att.name === 'Elite')).length > 0) {
        newEnemy.shieldMax *= 2;
      }
      for (var i = 0; i < newEnemy.attributes.length; i++) {
        newEnemy.name = newEnemy.attributes[i].name + ' ' + newEnemy.name;
      }
      enemies.push(newEnemy);
      index++;
    }
    this.enemies = enemies;
  }
}


class ShipAttribute {
  name: string

  constructor(name: string) {
    this.name = name;
  }
}

class Ship {
  name: string;

  size: number;

  hitPoints: number;

  hitPointsMax: number;

  minDamage: number;

  maxDamage: number;

  shield: number;

  shieldMax: number;

  lootType: string;

  lootAmount: number;

  attributes: ShipAttribute[]

  criticalChance: number;

  criticalMultiplier: number;

  constructor(name: string) {
    this.name = name;
    this.size = 0;
    this.hitPoints = 0;
    this.hitPointsMax = 0;
    this.minDamage = 0;
    this.maxDamage = 0;
    this.shield = 0;
    this.shieldMax = 0;
    this.lootType = '';
    this.lootAmount = 0;
    this.attributes = [];
    this.criticalChance = 0;
    this.criticalMultiplier = 1.0;
  }

  createEnemy(size: number, galaxy: number, zone: number, lootType: string, lootAmount: number, attackMod: number, hpMod: number, shmod: number, difficulty: number, ImABoss: boolean = false) {
    this.lootType = lootType;
    this.lootAmount = lootAmount;
    this.size = size;
    this.hitPoints = difficulty * hpMod * size * 60 * Math.pow(2.1, galaxy - 1) * Math.pow(1.007, zone - 1);
    this.hitPointsMax = this.hitPoints;
    var baseEnemyAttack = difficulty * attackMod * 15 * Math.pow(2.1, galaxy - 1) * Math.pow(1.007, zone - 1);
    this.minDamage = size * baseEnemyAttack / 1.25;
    this.maxDamage = size * baseEnemyAttack * 1.25;
    if (ImABoss) {
      this.hitPointsMax *= 0.75;
      this.hitPoints = this.hitPointsMax;
      this.shieldMax = this.hitPoints * shmod;
      this.shield = this.shieldMax;
    }
    if (gameData.world.currentChallenge === 'Criticality') {
      this.criticalMultiplier = 3.5;
      this.criticalChance = 25;
    }
  }

  createPlayerShip() {
    if (this.hitPoints > 0) {
      return;
    }
    if (canAffordFight()) {
      var shipMetalCost = shipMetalRequired();
      var shipPolymerCost = shipPolymerRequired();
      gameData.resources.metal -= shipMetalCost;
      gameData.resources.polymer -= shipPolymerCost;
      gameData.world.dronesCreated++;
      this.name = 'Drone ' + convertToRoman(gameData.world.dronesCreated);
      this.size = 1 * Math.pow(1.25, gameData.buildings.shipyard - 1);
      this.hitPointsMax = gameEquipment.armor.getDamage() + gameEquipment.flak.getDamage();
      this.hitPoints = this.hitPointsMax;
      this.shieldMax = gameEquipment.shield.getDamage();
      this.shieldMax *= gamePerks.thickskin.getBonus();
      this.shield = gameData.playership.shieldMax;
      var baseRailgunAttack = (gameData.technologies.railgunUpgrade * RAILGUN_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1));
      var baseLaserAttack = (gameData.technologies.laserUpgrade * LASER_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1));
      var baseMissileAttack = (gameData.technologies.missileUpgrade * MISSILE_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1));
      var baseAttack = this.size * (baseRailgunAttack + baseLaserAttack + baseMissileAttack) * achievementMultiplier * gamePerks.damager.getBonus();
      this.minDamage = baseAttack * (0.75 + (gameData.perks.consistency / 100));
      if (gameData.world.currentChallenge === 'Consistency') {
        this.maxDamage = this.minDamage;
      } else {
        this.maxDamage = baseAttack * 1.25;
      }
      this.criticalChance = 0 + (gameData.perks.criticality * 5);
      this.criticalMultiplier = 1 + (gameData.perks.criticality * 0.5);
      if (this.minDamage > 10) {
        addAchievement(61);
      }
      if (this.minDamage > 100) {
        addAchievement(62);
      }
      if (this.minDamage > 1000) {
        addAchievement(63);
      }
      if (this.minDamage > 1000000) {
        addAchievement(64);
      }
      if (this.size >= 2) {
        addAchievement(65);
      }
      if (this.size >= 10) {
        addAchievement(66);
      }
      if (this.size >= 100) {
        addAchievement(67);
      }
      gtag('event', 'Send Ship', {
        event_category: 'event',
        event_label: 'label',
        value: 'value'
      });
    }
  }
}

function giveReward() {
  if (gameData.enemyship.lootType === 'Metal') {
    gameData.resources.metal += gameData.enemyship.lootAmount;
    addToDisplay('We were able to salvage ' + prettify(gameData.enemyship.lootAmount) + ' metal', 'loot');
  } else if (gameData.enemyship.lootType === 'Polymer') {
    gameData.resources.polymer += gameData.enemyship.lootAmount;
    addToDisplay('We were able to salvage ' + prettify(gameData.enemyship.lootAmount) + ' polymer', 'loot');
  } else if (gameData.enemyship.lootType === 'Aether') {
    gameData.resources.aether += gameData.enemyship.lootAmount;
    addToDisplay('We were able to salvage ' + prettify(gameData.enemyship.lootAmount) + ' aether', 'loot');
  } else if (gameData.enemyship.lootType === 'ResearchPoints') {
    gameData.resources.researchPoints += gameData.enemyship.lootAmount;
    addToDisplay('We were able to salvage ' + prettify(gameData.enemyship.lootAmount) + ' research points', 'loot');
  }
}

function giveMissionReward(mission: Mission) {
  if (mission.name === 'Railgun Plans') {
    gameData.technologies.railgunPrestigeLevelUnlocked++;
    gameEquipment.railgun.updateUpgradeText();
    gameEquipment.railgun.updatePrestigeText();
    gameEquipment.railgun.updateUpgradeTooltip();
    gameEquipment.railgun.updatePrestigeTooltip();
    addToDisplay('I have discovered plans that will allow me to infuse railguns with aether!', 'mission');
  } else if (mission.name === 'Laser Plans') {
    gameData.technologies.laserPrestigeLevelUnlocked++;
    gameEquipment.laser.updateUpgradeText();
    gameEquipment.laser.updatePrestigeText();
    gameEquipment.laser.updateUpgradeTooltip();
    gameEquipment.laser.updatePrestigeTooltip();
    addToDisplay('I have discovered plans that will allow me to infuse lasers with aether', 'mission');
  } else if (mission.name === 'Missile Plans') {
    gameData.technologies.missilePrestigeLevelUnlocked++;
    gameEquipment.missile.updateUpgradeText();
    gameEquipment.missile.updatePrestigeText();
    gameEquipment.missile.updateUpgradeTooltip();
    gameEquipment.missile.updatePrestigeTooltip();
    addToDisplay('Missiles can be even more missiley!', 'mission');
  } else if (mission.name === 'Armor Plans') {
    gameData.technologies.armorPrestigeLevelUnlocked++;
    gameEquipment.armor.updateUpgradeText();
    gameEquipment.armor.updatePrestigeText();
    gameEquipment.armor.updateUpgradeTooltip();
    gameEquipment.armor.updatePrestigeTooltip();
    addToDisplay('Aether will really help out our Armor!', 'mission');
  } else if (mission.name === 'Shield Plans') {
    gameData.technologies.shieldPrestigeLevelUnlocked++;
    gameEquipment.shield.updateUpgradeText();
    gameEquipment.shield.updatePrestigeText();
    gameEquipment.shield.updateUpgradeTooltip();
    gameEquipment.shield.updatePrestigeTooltip();
    addToDisplay('Shields.  Now with 8 times the shieldiness!', 'mission');
  } else if (mission.name === 'Flak Plans') {
    gameData.technologies.flakPrestigeLevelUnlocked++;
    gameEquipment.flak.updateUpgradeText();
    gameEquipment.flak.updatePrestigeText();
    gameEquipment.flak.updateUpgradeTooltip();
    gameEquipment.flak.updatePrestigeTooltip();
    addToDisplay('Flak is even more flaky! Flakky? I dunno', 'mission');
  } else if (mission.name === 'A Gold Mine') {
    gameData.technologies.goldMine++;
    addToDisplay('With the new algorithms gained at the Gold Mine I can double all forms of production!', 'story');
  } else if (mission.name === 'Panel Improvement') {
    gameData.technologies.panelUpgrade++;
    addToDisplay('I have more power now.  Panels are twice as effective.', 'story');
    gameBuildings.panel.updateBuyButtonTooltip();
  } else if (mission.name === 'Generator Improvement') {
    gameData.technologies.generatorUpgrade++;
    addToDisplay('I have more power now.  Generators are twice as effective.', 'story');
    gameBuildings.generator.updateBuyButtonTooltip();
  } else if (mission.name === 'Plant Improvement') {
    gameData.technologies.plantupgrade++;
    addToDisplay('I have more power now.  Plants are twice as effective.', 'story');
    gameBuildings.plant.updateBuyButtonTooltip();
  } else if (mission.name === 'Aether Plant Improvement') {
    gameData.technologies.aetherplantupgrade++;
    addToDisplay('I have more power now.  Aether Plants are twice as effective.', 'story');
    gameBuildings.aetherPlant.updateBuyButtonTooltip();
  } else if (mission.name === 'The Gateway') {
    gameData.story.gatewayUnlocked = true;
    addToDisplay('This location contains a large, prestigious, circular structure.  I can easily travel there and step through it, but what will I find?  I have also discovered some chronoton fragments.  I don\'t see a use for them but they may come in handy later', 'story');
    giveChronotonFragments(40);
  } else if (mission.missiontype === 'Aether') {
    var lt = Math.pow(100, 1 + (mission.level / 10)) * gamePerks.looter.getBonus();
    gameData.resources.aether += lt;
    addToDisplay('We have found ' + prettify(lt) + ' aether', 'loot');
  }
  sortBuildings($('#buildingvisible'));
}

function giveChronotonFragments(amt: number) {
  gameData.resources.chronotonfragments += amt;
  addToDisplay('We were able to salvage ' + prettify(amt) + ' Chronoton Fragments', 'loot');
  gtag('event', 'fragment recieved', {
    event_category: 'event',
    event_label: 'label',
    value: 'value'
  });
}

function chronotonAvailable() {
  var rtn = gameData.resources.chronoton;
  rtn -= gamePerks.looter.chronotonSpent();
  rtn -= gamePerks.damager.chronotonSpent();
  rtn -= gamePerks.thickskin.chronotonSpent();
  rtn -= gamePerks.producer.chronotonSpent();
  rtn -= gamePerks.speed.chronotonSpent();
  rtn -= gamePerks.consistency.chronotonSpent();
  rtn -= gamePerks.power.chronotonSpent();
  return rtn;
}

function gatewayClick(challengeChosen: string = '') { // eslint-disable-line no-unused-vars
  gameData.world.paused = true;
  gameData.resources.chronoton += gameData.resources.chronotonfragments;
  gameData.resources.chronotonfragments = 0;
  var savedperks = new perks();
  savedperks.looter = gameData.perks.looter;
  savedperks.consistency = gameData.perks.consistency;
  savedperks.power = gameData.perks.power;
  savedperks.producer = gameData.perks.producer;
  savedperks.damager = gameData.perks.damager;
  savedperks.speed = gameData.perks.speed;
  savedperks.thickskin = gameData.perks.thickskin;
  var savedachievements = gameData.achievementids;
  var savedChallenges = new challenges();
  savedChallenges.consistency.completed = gameData.challenges.consistency.completed;
  savedChallenges.consistency.unlocked = gameData.challenges.consistency.unlocked;
  savedChallenges.power.completed = gameData.challenges.power.completed;
  savedChallenges.power.unlocked = gameData.challenges.power.unlocked;
  savedChallenges.criticality.completed = gameData.challenges.criticality.completed;
  savedChallenges.criticality.unlocked = gameData.challenges.criticality.unlocked;
  init(savedperks, savedChallenges, true, challengeChosen, gameData.resources.chronoton, savedachievements);
  $('#GatewayModal').modal('hide');

  gtag('event', 'gateway', {
    event_category: 'event',
    event_label: 'label',
    value: 'value'
  });
  gameData.world.paused = false;
}

function attack(attacker: Ship, defender: Ship) {
  if (attacker.hitPoints <= 0) {
    return;
  }
  var damageToEnemy = Math.max(chooseRandom(attacker.minDamage, attacker.maxDamage), 0);
  if (chooseRandom(0, 100) < attacker.criticalChance) {
    damageToEnemy *= attacker.criticalMultiplier;
    addToDisplay(attacker.name + ' scores a critical hit ' + prettify(attacker.criticalChance), 'combat');
  }
  var originalDamage = damageToEnemy;

  damageToEnemy -= defender.shield;
  damageToEnemy = Math.max(0, damageToEnemy); // THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED

  defender.shield -= originalDamage;
  defender.shield = Math.max(0, defender.shield); // THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED

  defender.hitPoints -= damageToEnemy;
  defender.hitPoints = Math.max(0, defender.hitPoints); // THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED
}

function sumOfExponents(lvlsBought: number, baseCost: number, growthfactor: number) {
  var total = 0;
  for (var x = 0; x < lvlsBought; x++) {
    total += baseCost * Math.pow(growthfactor, x);
  }
  return total;
}

var gamePerks = {
  looter: {
    chronotonforBuy: function() { return 1 * Math.pow(1.3, gameData.perks.looter); },
    chronotonSpent: function() { return sumOfExponents(gameData.perks.looter, 1, 1.3); },
    canAfford: function() { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function() { $('#btnLooter').text('Looter(' + (gameData.perks.looter) + ')\n'); },
    updateBuyButtonTooltip: function() { $('#btnLooter').attr('title', 'Each level bought will add 10% to looting additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
    getBonus: function() { return (1 + gameData.perks.looter * 0.1); },
    determineShowBuyButton: function() {
      return true;
    },
    determineShowAffordUpgrade: function() {
      if (this.canAfford()) {
        $('#btnLooter').removeClass('btn-danger').addClass('btn-primary');
      } else {
        $('#btnLooter').removeClass('btn-primary').addClass('btn-danger');
      }
    },
    add: function() { // eslint-disable-line no-unused-vars
      if (this.canAfford()) {
        gameData.perks.looter++;
        $('#btnLooter').text('Looter(' + (gameData.perks.looter) + ')');
        this.updateBuyButtonTooltip();
        gtag('event', 'buy looter', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  producer: {
    chronotonforBuy: function() { return 1 * Math.pow(1.3, gameData.perks.producer); },
    chronotonSpent: function() { return sumOfExponents(gameData.perks.producer, 1, 1.3); },
    canAfford: function() { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function() { $('#btnProducer').text('Producer(' + (gameData.perks.producer) + ')\n'); },
    updateBuyButtonTooltip: function() { $('#btnProducer').attr('title', 'Each level bought will add 10% to Production additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
    getBonus: function() { return (1 + gameData.perks.producer * 0.1); },
    determineShowBuyButton: function() {
      return true;
    },
    determineShowAffordUpgrade: function() {
      if (this.canAfford()) {
        $('#btnProducer').removeClass('btn-danger').addClass('btn-primary');
      } else {
        $('#btnProducer').removeClass('btn-primary').addClass('btn-danger');
      }
    },
    add: function() { // eslint-disable-line no-unused-vars
      if (this.canAfford()) {
        gameData.perks.producer++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy producer', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  damager: {
    chronotonforBuy: function() { return 1 * Math.pow(1.3, gameData.perks.damager); },
    chronotonSpent: function() { return sumOfExponents(gameData.perks.damager, 1, 1.3); },
    canAfford: function() { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function() { $('#btnDamager').text('Damager(' + (gameData.perks.damager) + ')'); },
    updateBuyButtonTooltip: function() { $('#btnDamager').attr('title', 'Each level bought will add 10% to damage additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
    getBonus: function() { return 1 + (gameData.perks.damager * 0.1); },
    determineShowBuyButton: function() {
      return true;
    },
    determineShowAffordUpgrade: function() {
      if (this.canAfford()) {
        $('#btnDamager').removeClass('btn-danger').addClass('btn-primary');
      } else {
        $('#btnDamager').removeClass('btn-primary').addClass('btn-danger');
      }
    },
    add: function() { // eslint-disable-line no-unused-vars
      if (this.canAfford()) {
        gameData.perks.damager++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy damager', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  thickskin: {
    chronotonforBuy: function() { return 1 * Math.pow(1.3, gameData.perks.thickskin); },
    chronotonSpent: function() { return sumOfExponents(gameData.perks.thickskin, 1, 1.3); },
    canAfford: function() { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function() { $('#btnThickSkin').text('ThickSkin(' + (gameData.perks.thickskin) + ')'); },
    updateBuyButtonTooltip: function() { $('#btnThickSkin').attr('title', 'Each level bought will add 10% to defenses additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
    getBonus: function() { return (1 + gameData.perks.thickskin * 0.1); },
    determineShowBuyButton: function() {
      return true;
    },
    determineShowAffordUpgrade: function() {
      if (this.canAfford()) {
        $('#btnThickSkin').removeClass('btn-danger').addClass('btn-primary');
      } else {
        $('#btnThickSkin').removeClass('btn-primary').addClass('btn-danger');
      }
    },
    add: function() { // eslint-disable-line no-unused-vars
      if (this.canAfford()) {
        gameData.perks.thickskin++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy thickskin', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  speed: {
    chronotonforBuy: function() { return 4 * Math.pow(1.3, gameData.perks.speed); },
    chronotonSpent: function() { return sumOfExponents(gameData.perks.speed, 4, 1.3); },
    canAfford: function() { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function() { $('#btnSpeed').text('Speed(' + (gameData.perks.speed) + ')'); },
    updateBuyButtonTooltip: function() { $('#btnSpeed').attr('title', 'Each level bought will shorten the wait time between attacks by 50ms\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
    determineShowBuyButton: function() {
      return true;
    },
    determineShowAffordUpgrade: function() {
      if (this.canAfford() && gameData.perks.speed < 10) {
        $('#btnSpeed').removeClass('btn-danger').addClass('btn-primary');
      } else {
        $('#btnSpeed').removeClass('btn-primary').addClass('btn-danger');
      }
    },
    add: function() { // eslint-disable-line no-unused-vars
      if (gameData.perks.speed >= 10) {
        return;
      }
      if (this.canAfford()) {
        gameData.perks.speed++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy speed', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  consistency: {
    chronotonforBuy: function() { return 1 * Math.pow(1.3, gameData.perks.consistency); },
    chronotonSpent: function() { return sumOfExponents(gameData.perks.consistency, 1, 1.3); },
    canAfford: function() { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function() { $('#btnConsistency').text('Consistency(' + (gameData.perks.consistency) + ')'); },
    updateBuyButtonTooltip: function() { $('#btnConsistency').attr('title', 'Each level bought will add increase the minimum damage by 1% additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
    determineShowBuyButton: function() {
      if (gameData.challenges.consistency.completed) {
        $('#btnConsistency').removeClass('hidden');
      } else {
        $('#btnConsistency').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function() {
      if (this.canAfford() && gameData.perks.consistency < 25) {
        $('#btnConsistency').removeClass('btn-danger').addClass('btn-primary');
      } else {
        $('#btnConsistency').removeClass('btn-primary').addClass('btn-danger');
      }
    },
    add: function() {
      if (this.canAfford()) {
        gameData.perks.consistency++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy consistency', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  power: {
    chronotonforBuy: function() { return 25 * Math.pow(1.3, gameData.perks.power); },
    chronotonSpent: function() { return sumOfExponents(gameData.perks.power, 25, 1.3); },
    canAfford: function() { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function() { $('#btnPower').text('Power(' + (gameData.perks.power) + ')'); },
    updateBuyButtonTooltip: function() { $('#btnPower').attr('title', 'Each level bought will add increase power creation by 10% additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
    getBonus: function() { return (1 + gameData.perks.power * 0.1); },
    determineShowBuyButton: function() {
      if (gameData.challenges.power.completed) {
        $('#btnPower').removeClass('hidden');
      } else {
        $('#btnPower').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function() {
      if (this.canAfford() && gameData.perks.power < 25) {
        $('#btnPower').removeClass('btn-danger').addClass('btn-primary');
      } else {
        $('#btnPower').removeClass('btn-primary').addClass('btn-danger');
      }
    },
    add: function() {
      if (this.canAfford()) {
        gameData.perks.power++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy power', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  criticality: {
    chronotonforBuy: function() { return 100 * Math.pow(1.3, gameData.perks.criticality); },
    chronotonSpent: function() { return sumOfExponents(gameData.perks.criticality, 100, 1.3); },
    canAfford: function() { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function() { $('#btnCriticality').text('criticality(' + (gameData.perks.criticality) + ')'); },
    updateBuyButtonTooltip: function() { $('#btnCriticality').attr('title', 'Each level increases the chance for a critical kit by 5% additively and the damage from a critical hit by 50% additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
    determineShowBuyButton: function() {
      if (gameData.challenges.criticality.completed) {
        $('#btnCriticality').removeClass('hidden');
      } else {
        $('#btnCriticality').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function() {
      if (this.canAfford() && gameData.perks.criticality < 10) {
        $('#btnCriticality').removeClass('btn-danger').addClass('btn-primary');
      } else {
        $('#btnCriticality').removeClass('btn-primary').addClass('btn-danger');
      }
    },
    add: function() {
      if (this.canAfford()) {
        gameData.perks.criticality++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy criticality', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  }
};

var gameBuildings = {
  panel: {
    metalForBuy: function() { return (PANEL_BASE_COST * Math.pow(PANEL_GROWTH_FACTOR, gameData.buildings.panels)); },
    tooltipForBuy: function() { return ((gameData.buildings.panels) + ' Solar Panels\nCreate ' + prettify(this.powerPer()) + ' power\nMetal Cost:' + prettify(this.metalForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy()); },
    totalPowerCreated: function() { return (gameData.buildings.panels * this.powerPer()); },
    powerPer: function() { return (POWER_PER_PANEL * Math.pow(2, gameData.technologies.panelUpgrade) * gamePerks.power.getBonus()); },
    updateBuyButtonText: function() { $('#btnBuyPanel').text('Solar Panels: ' + prettify(gameData.buildings.panels)); },
    updateBuyButtonTooltip: function() { $('#btnBuyPanel').attr('title', this.tooltipForBuy()); },
    determineShowAffordBuy: function() {
      if (this.canAffordBuy()) {
        $('#btnBuyPanel').removeClass('btn-danger').addClass('btn-light');
      } else {
        $('#btnBuyPanel').removeClass('btn-light').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.buildings.panels++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.panels >= 5) addAchievement(34);
        if (gameData.buildings.panels >= 10) addAchievement(35);
        if (gameData.buildings.panels >= 25) addAchievement(36);
        if (gameData.buildings.panels >= 50) addAchievement(37);
        if (gameData.buildings.panels >= 100) addAchievement(38);
        if (gameData.buildings.panels >= 1000) addAchievement(39);
        gtag('event', 'buy panel', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  generator: {
    metalForBuy: function() { return (GENERATOR_METAL_BASE_COST * Math.pow(GENERATOR_GROWTH_FACTOR, gameData.buildings.generators)); },
    polymerForBuy: function() { return (GENERATOR_POLYMER_BASE_COST * Math.pow(GENERATOR_GROWTH_FACTOR, gameData.buildings.generators)); },
    tooltipForBuy: function() { return ((gameData.buildings.generators) + ' Generators\nCreates ' + prettify(this.powerPer()) + ' power\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy()); },
    totalPowerCreated: function() { return (gameData.buildings.generators * this.powerPer()); },
    powerPer: function() { return (POWER_PER_GENERATOR * Math.pow(2, gameData.technologies.generatorUpgrade) * gamePerks.power.getBonus()); },
    updateBuyButtonText: function() { $('#btnBuyGenerator').text('Generators: ' + prettify(gameData.buildings.generators)); },
    updateBuyButtonTooltip: function() { $('#btnBuyGenerator').attr('title', this.tooltipForBuy()); },
    showBuyButton: function() { $('#btnBuyGenerator').removeClass('hidden'); },
    determineShowAffordBuy: function() {
      if (this.canAffordBuy()) {
        $('#btnBuyGenerator').removeClass('btn-danger').addClass('btn-light');
      } else {
        $('#btnBuyGenerator').removeClass('btn-light').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.buildings.generators++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.generators >= 1) addAchievement(47);
        if (gameData.buildings.generators >= 5) addAchievement(48);
        if (gameData.buildings.generators >= 10) addAchievement(49);
        if (gameData.buildings.generators >= 25) addAchievement(50);
        if (gameData.buildings.generators >= 50) addAchievement(51);
        if (gameData.buildings.generators >= 100) addAchievement(52);
        if (gameData.buildings.generators >= 1000) addAchievement(53);
        gtag('event', 'buy generator', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  plant: {
    metalForBuy: function() { return (PLANT_METAL_BASE_COST * Math.pow(PLANT_METAL_GROWTH_FACTOR, gameData.buildings.plants)); },
    polymerForBuy: function() { return (PLANT_POLYMER_BASE_COST * Math.pow(PLANT_POLYMER_GROWTH_FACTOR, gameData.buildings.plants)); },
    tooltipForBuy: function() { return ((gameData.buildings.plants) + ' Plant\nCreates ' + prettify(this.powerPer()) + ' power\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy()); },
    totalPowerCreated: function() { return (gameData.buildings.plants * this.powerPer()); },
    powerPer: function() { return POWER_PER_PLANT * Math.pow(2, gameData.technologies.plantupgrade) * gamePerks.power.getBonus(); },
    updateBuyButtonText: function() { $('#btnBuyPlant').text('Plants: ' + prettify(gameData.buildings.plants)); },
    updateBuyButtonTooltip: function() { $('#btnBuyPlant').attr('title', this.tooltipForBuy()); },
    showBuyButton: function() { $('#btnBuyPlant').removeClass('hidden'); },
    determineShowAffordBuy: function() {
      if (this.canAffordBuy()) {
        $('#btnBuyPlant').removeClass('btn-danger').addClass('btn-light');
      } else {
        $('#btnBuyPlant').removeClass('btn-light').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.buildings.plants++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.plants >= 1) addAchievement(40);
        if (gameData.buildings.plants >= 5) addAchievement(41);
        if (gameData.buildings.plants >= 10) addAchievement(42);
        if (gameData.buildings.plants >= 25) addAchievement(43);
        if (gameData.buildings.plants >= 50) addAchievement(44);
        if (gameData.buildings.plants >= 100) addAchievement(45);
        if (gameData.buildings.plants >= 1000) addAchievement(46);
        gtag('event', 'buy plant', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  aetherPlant: {
    metalForBuy: function() { return (AETHER_PLANT_METAL_BASE_COST * Math.pow(AETHER_PLANT_GROWTH_FACTOR, gameData.buildings.aetherPlants)); },
    polymerForBuy: function() { return (AETHER_PLANT_POLYMER_BASE_COST * Math.pow(AETHER_PLANT_GROWTH_FACTOR, gameData.buildings.aetherPlants)); },
    aetherForBuy: function() { return (AETHER_PLANT_AETHER_BASE_COST * Math.pow(AETHER_PLANT_GROWTH_FACTOR, gameData.buildings.aetherPlants)); },
    tooltipForBuy: function() { return ((gameData.buildings.aetherPlants) + ' Aether Plant\nCreates ' + prettify(this.powerPer()) + ' power\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy()) + '\nAether Cost:' + prettify(this.aetherForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy() && gameData.resources.aether >= this.aetherForBuy()); },
    totalPowerCreated: function() { return (gameData.buildings.aetherPlants * this.powerPer()); },
    powerPer: function() { return POWER_PER_AETHER_PLANT * Math.pow(2, gameData.technologies.aetherplantupgrade) * gamePerks.power.getBonus(); },
    updateBuyButtonText: function() { $('#btnBuyAetherPlant').text('Aether Plants: ' + prettify(gameData.buildings.aetherPlants)); },
    updateBuyButtonTooltip: function() { $('#btnBuyAetherPlant').attr('title', this.tooltipForBuy()); },
    showBuyButton: function() { $('#btnBuyAetherPlant').removeClass('hidden'); },
    determineShowAffordBuy: function() {
      if (this.canAffordBuy()) {
        $('#btnBuyAetherPlant').removeClass('btn-danger').addClass('btn-light');
      } else {
        $('#btnBuyAetherPlant').removeClass('btn-light').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.resources.aether -= this.aetherForBuy();
        gameData.buildings.aetherPlants++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.aetherPlants >= 1) addAchievement(54);
        if (gameData.buildings.aetherPlants >= 5) addAchievement(55);
        if (gameData.buildings.aetherPlants >= 10) addAchievement(56);
        if (gameData.buildings.aetherPlants >= 25) addAchievement(57);
        if (gameData.buildings.aetherPlants >= 50) addAchievement(58);
        if (gameData.buildings.aetherPlants >= 100) addAchievement(59);
        if (gameData.buildings.aetherPlants >= 1000) addAchievement(60);
        gtag('event', 'buy aether plant', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  fusionPlant: {
    metalForBuy: function() { return (FUSION_PLANT_METAL_BASE_COST * Math.pow(FUSION_PLANT_GROWTH_FACTOR, gameData.buildings.fusionPlants)); },
    polymerForBuy: function() { return (FUSION_PLANT_POLYMER_BASE_COST * Math.pow(FUSION_PLANT_GROWTH_FACTOR, gameData.buildings.fusionPlants)); },
    aetherForBuy: function() { return (FUSION_PLANT_AETHER_BASE_COST * Math.pow(FUSION_PLANT_GROWTH_FACTOR, gameData.buildings.fusionPlants)); },
    tooltipForBuy: function() { return ((gameData.buildings.fusionPlants) + ' Fusion Plant\nCreates ' + prettify(this.powerPer()) + ' power\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy()) + '\nAether Cost:' + prettify(this.aetherForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy() && gameData.resources.aether >= this.aetherForBuy()); },
    totalPowerCreated: function() { return (gameData.buildings.fusionPlants * this.powerPer()); },
    powerPer: function() { return POWER_PER_FUSION_PLANT * Math.pow(2, gameData.technologies.fusionplantupgrade) * gamePerks.power.getBonus(); },
    updateBuyButtonText: function() { $('#btnBuyFusionPlant').text('Fusion Plants: ' + prettify(gameData.buildings.fusionPlants)); },
    updateBuyButtonTooltip: function() { $('#btnBuyFusionPlant').attr('title', this.tooltipForBuy()); },
    showBuyButton: function() { $('#btnBuyFusionPlant').removeClass('hidden'); },
    determineShowAffordBuy: function() {
      if (this.canAffordBuy()) {
        $('#btnBuyFusionPlant').removeClass('btn-danger').addClass('btn-light');
      } else {
        $('#btnBuyFusionPlant').removeClass('btn-light').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.resources.aether -= this.aetherForBuy();
        gameData.buildings.fusionPlants++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.fusionPlants >= 1) addAchievement(74);
        if (gameData.buildings.fusionPlants >= 5) addAchievement(75);
        if (gameData.buildings.fusionPlants >= 10) addAchievement(76);
        if (gameData.buildings.fusionPlants >= 25) addAchievement(77);
        if (gameData.buildings.fusionPlants >= 50) addAchievement(78);
        if (gameData.buildings.fusionPlants >= 100) addAchievement(79);
        if (gameData.buildings.fusionPlants >= 1000) addAchievement(80);
        gtag('event', 'buy aether plant', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  mine: {
    metalForBuy: function() { return (MINE_BASE_COST * Math.pow(MINE_GROWTH_FACTOR, gameData.buildings.mines)); },
    powerForBuy: function() { return (MINE_POWER_USAGE * Math.pow(MINE_POWER_GROWTH_USAGE, gameData.buildings.mines)); },
    powerSpent: function() { return sumOfExponents(gameData.buildings.mines, MINE_POWER_USAGE, MINE_POWER_GROWTH_USAGE); },
    tooltipForBuy: function() { return (gameData.buildings.mines + ' Create ' + prettify(this.productionPerSecond() / gameData.buildings.mines) + ' metal per second\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy() && CheckPower(this.powerForBuy())); },
    productionPerSecond: function() {
      var increase = gameData.buildings.mines * Math.pow(METAL_PROFICIENCY_BASE_RATE, gameData.technologies.metalProficiencyBought);
      increase *= Math.pow(2, gameData.technologies.goldMine);
      increase *= gamePerks.producer.getBonus();
      return increase;
    },
    updateBuyButtonText: function() { $('#btnBuyMine').text('Mines: ' + gameData.buildings.mines); },
    updateBuyButtonTooltip: function() { $('#btnBuyMine').attr('title', this.tooltipForBuy()); },
    determineShowAffordBuy: function() {
      if (this.canAffordBuy()) {
        $('#btnBuyMine').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnBuyMine').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.buildings.mines++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy mine', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
        if (gameData.buildings.mines >= 5) addAchievement(0);
        if (gameData.buildings.mines >= 10) addAchievement(1);
        if (gameData.buildings.mines >= 25) addAchievement(2);
        if (gameData.buildings.mines >= 50) addAchievement(3);
        if (gameData.buildings.mines >= 100) addAchievement(4);
        if (gameData.buildings.mines >= 1000) addAchievement(5);
      }
    }
  },
  lab: {
    metalForBuy: function() { return (LAB_METAL_BASE_COST * Math.pow(LAB_METAL_GROWTH_FACTOR, gameData.buildings.labs)); },
    polymerForBuy: function() { return (LAB_POLYMER_BASE_COST * Math.pow(LAB_POLYMER_GROWTH_FACTOR, gameData.buildings.labs)); },
    powerForBuy: function() { return (LAB_POWER_USAGE * Math.pow(LAB_POWER_GROWTH_USAGE, gameData.buildings.labs)); },
    powerSpent: function() { return sumOfExponents(gameData.buildings.labs, LAB_POWER_USAGE, LAB_POWER_GROWTH_USAGE); },
    tooltipForBuy: function() { return (gameData.buildings.labs + ' create ' + prettify(this.productionPerSecond() / gameData.buildings.labs) + ' research per second\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy() && CheckPower(this.powerForBuy())); },
    productionPerSecond: function() {
      var increase = gameData.buildings.labs * Math.pow(RESEARCH_PROFICIENCY_BASE_RATE, gameData.technologies.researchProficiencyBought);
      increase *= Math.pow(2, gameData.technologies.goldMine);
      increase *= gamePerks.producer.getBonus();
      return increase * 0.25;
    },
    updateBuyButtonText: function() { $('#btnBuyLab').text('Labs: ' + gameData.buildings.labs); },
    updateBuyButtonTooltip: function() { $('#btnBuyLab').attr('title', this.tooltipForBuy()); },
    showBuyButton: function() { $('#btnBuyLab').removeClass('hidden'); },
    determineShowAffordBuy: function() {
      if (this.canAffordBuy()) {
        $('#btnBuyLab').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnBuyLab').removeClass('btn-info').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.buildings.labs++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.labs >= 1) addAchievement(20);
        if (gameData.buildings.labs >= 5) addAchievement(21);
        if (gameData.buildings.labs >= 10) addAchievement(22);
        if (gameData.buildings.labs >= 25) addAchievement(23);
        if (gameData.buildings.labs >= 50) addAchievement(24);
        if (gameData.buildings.labs >= 100) addAchievement(25);
        if (gameData.buildings.labs >= 1000) addAchievement(26);
        gtag('event', 'buy lab', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  factory: {
    metalForBuy: function() { return (FACTORY_BASE_COST * Math.pow(FACTORY_GROWTH_FACTOR, gameData.buildings.factories)); },
    powerForBuy: function() { return (FACTORY_POWER_USAGE * Math.pow(FACTORY_POWER_GROWTH_USAGE, gameData.buildings.factories)); },
    powerSpent: function() { return sumOfExponents(gameData.buildings.factories, FACTORY_POWER_USAGE, FACTORY_POWER_GROWTH_USAGE); },
    tooltipForBuy: function() { return (gameData.buildings.factories + ' create ' + prettify(this.productionPerSecond() / gameData.buildings.factories) + ' polymer per second\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy() && CheckPower(this.powerForBuy())); },
    productionPerSecond: function() {
      var increase = gameData.buildings.factories * Math.pow(POLYMER_PROFICIENCY_BASE_RATE, gameData.technologies.polymerProficiencyBought);
      increase *= Math.pow(2, gameData.technologies.goldMine);
      increase *= gamePerks.producer.getBonus();
      return increase;
    },
    updateBuyButtonText: function() { $('#btnBuyFactory').text('Factories: ' + gameData.buildings.factories); },
    updateBuyButtonTooltip: function() { $('#btnBuyFactory').attr('title', this.tooltipForBuy()); },
    showBuyButton: function() { $('#btnBuyFactory').removeClass('hidden'); },
    determineShowAffordBuy: function() {
      if (this.canAffordBuy()) {
        $('#btnBuyFactory').removeClass('btn-danger').addClass('btn-dark');
      } else {
        $('#btnBuyFactory').removeClass('btn-dark').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.buildings.factories++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.factories >= 1) addAchievement(6);
        if (gameData.buildings.factories >= 5) addAchievement(7);
        if (gameData.buildings.factories >= 10) addAchievement(8);
        if (gameData.buildings.factories >= 25) addAchievement(9);
        if (gameData.buildings.factories >= 50) addAchievement(10);
        if (gameData.buildings.factories >= 100) addAchievement(11);
        if (gameData.buildings.factories >= 1000) addAchievement(12);
        gtag('event', 'buy factory', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  refinery: {
    metalForBuy: function() { return (REFINERY_METAL_BASE_COST * Math.pow(REFINERY_GROWTH_FACTOR, gameData.buildings.refineries)); },
    polymerForBuy: function() { return (REFINERY_POLYMER_BASE_COST * Math.pow(REFINERY_GROWTH_FACTOR, gameData.buildings.refineries)); },
    powerForBuy: function() { return (REFINERY_POWER_USAGE * Math.pow(REFINERY_POWER_GROWTH_USAGE, gameData.buildings.refineries)); },
    powerSpent: function() { return sumOfExponents(gameData.buildings.refineries, REFINERY_POWER_USAGE, REFINERY_POWER_GROWTH_USAGE); },
    tooltipForBuy: function() { return ('Creates ' + prettify(this.productionPerSecond() / gameData.buildings.refineries) + ' aether per second\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy() && CheckPower(this.powerForBuy())); },
    productionPerSecond: function() {
      var increase = gameData.buildings.refineries * Math.pow(AETHER_PROFICIENCY_BASE_RATE, gameData.technologies.aetherProficiencyBought);
      increase *= Math.pow(2, gameData.technologies.goldMine);
      increase *= gamePerks.producer.getBonus();
      return increase;
    },
    updateBuyButtonText: function() { $('#btnBuyRefinery').text('Refineries: ' + gameData.buildings.refineries); },
    updateBuyButtonTooltip: function() { $('#btnBuyRefinery').attr('title', this.tooltipForBuy()); },
    showBuyButton: function() { $('#btnBuyRefinery').removeClass('hidden'); },
    determineShowAffordBuy: function() {
      if (this.canAffordBuy()) {
        $('#btnBuyRefinery').removeClass('btn-danger').addClass('btn-secondary');
      } else {
        $('#btnBuyRefinery').removeClass('btn-secondary').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.buildings.refineries++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.refineries >= 1) addAchievement(13);
        if (gameData.buildings.refineries >= 5) addAchievement(14);
        if (gameData.buildings.refineries >= 10) addAchievement(15);
        if (gameData.buildings.refineries >= 25) addAchievement(16);
        if (gameData.buildings.refineries >= 50) addAchievement(17);
        if (gameData.buildings.refineries >= 100) addAchievement(18);
        if (gameData.buildings.refineries >= 1000) addAchievement(19);
        gtag('event', 'buy refinery', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  tacticalLab: {
    metalForBuy: function() { return (TACTICAL_LAB_METAL_BASE_COST * Math.pow(TACTICAL_LAB_GROWTH_FACTOR, gameData.buildings.tacticalLabs)); },
    polymerForBuy: function() { return (TACTICAL_LAB_POLYMER_BASE_COST * Math.pow(TACTICAL_LAB_GROWTH_FACTOR, gameData.buildings.tacticalLabs)); },
    powerForBuy: function() { return (TACTICAL_LAB_POWER_USAGE * Math.pow(TACTICAL_LAB_POWER_GROWTH_USAGE, gameData.buildings.tacticalLabs)); },
    powerSpent: function() { return sumOfExponents(gameData.buildings.tacticalLabs, TACTICAL_LAB_POWER_USAGE, TACTICAL_LAB_POWER_GROWTH_USAGE); },
    tooltipForBuy: function() { return ('Buying will set Shields to ' + prettify(this.getBonus(true) * 100) + '% efficiency\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy() && CheckPower(this.powerForBuy())); },
    getBonus: function(future:boolean = false) {
      var count = gameData.buildings.tacticalLabs;
      if (future) {
        count++;
      }
      if (gameData.tacticalChoices.tacticalLabsSetting === 0) {
        return 1;
      } else if (gameData.tacticalChoices.tacticalLabsSetting === 1) {
        return (1 + (count * 0.1));
      }
      return (Math.pow(1.05, count));
    },
    updateBuyButtonText: function() { $('#btnBuyTacticalLab').text('Tactical Labs: ' + (gameData.buildings.tacticalLabs)); },
    updateBuyButtonTooltip: function() { $('#btnBuyTacticalLab').attr('title', this.tooltipForBuy()); },
    showBuyButton: function() { $('#btnBuyTacticalLab').removeClass('hidden'); },
    determineShowAffordBuy: function() {
      if (this.canAffordBuy()) {
        $('#btnBuyTacticalLab').removeClass('btn-danger').addClass('btn-success');
      } else {
        $('#btnBuyTacticalLab').removeClass('btn-success').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.buildings.tacticalLabs++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.tacticalLabs >= 1) addAchievement(27);
        if (gameData.buildings.tacticalLabs >= 5) addAchievement(28);
        if (gameData.buildings.tacticalLabs >= 10) addAchievement(29);
        if (gameData.buildings.tacticalLabs >= 25) addAchievement(30);
        if (gameData.buildings.tacticalLabs >= 50) addAchievement(31);
        if (gameData.buildings.tacticalLabs >= 100) addAchievement(32);
        if (gameData.buildings.tacticalLabs >= 1000) addAchievement(33);
        gtag('event', 'buy tactical lab', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  shipyard: {
    metalForBuy: function() { return (SHIPYARD_METAL_BASE_COST * Math.pow(SHIPYARD_METAL_GROWTH_FACTOR, gameData.buildings.shipyard)); },
    polymerForBuy: function() { return (SHIPYARD_POLYMER_BASE_COST * Math.pow(SHIPYARD_POLYMER_GROWTH_FACTOR, gameData.buildings.shipyard)); },
    rpForBuy: function() { return (SHIPYARD_RP_BASE_COST * Math.pow(SHIPYARD_RP_GROWTH_FACTOR, gameData.buildings.shipyard)); },
    powerForBuy: function() { return (SHIPYARD_POWER_USAGE * Math.pow(SHIPYARD_POWER_GROWTH_USAGE, gameData.buildings.shipyard)); },
    powerSpent: function() { return sumOfExponents(gameData.buildings.shipyard, SHIPYARD_POWER_USAGE, SHIPYARD_POWER_GROWTH_USAGE); },
    tooltipForBuy: function() { return ('Increases ship size by 25%\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy()) + '\nResearch Points Cost:' + prettify(this.rpForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function() { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy() && gameData.resources.researchPoints >= this.rpForBuy() && CheckPower(this.powerForBuy())); },
    updateBuyButtonText: function() { $('#btnBuyShipyard').text('Shipyard(' + (gameData.buildings.shipyard) + ')'); },
    updateBuyButtonTooltip: function() { $('#btnBuyShipyard').attr('title', this.tooltipForBuy()); },
    showBuyButton: function() { $('#btnBuyShipyard').removeClass('hidden'); },
    determineShowAffordBuy: function() {
      if (gameData.technologies.shipyardTechUnlock > gameData.buildings.shipyard) {
        $('#btnBuyShipyard').removeClass('hidden');
      } else {
        $('#btnBuyShipyard').addClass('hidden');
      }
      if (this.canAffordBuy()) {
        $('#btnBuyShipyard').removeClass('btn-danger').addClass('btn-secondary');
      } else {
        $('#btnBuyShipyard').removeClass('btn-secondary').addClass('btn-danger');
      }
    },
    buy: function() {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.resources.researchPoints -= this.rpForBuy();
        gameData.buildings.shipyard++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy shipyard', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
        sortBuildings($('#buildingvisible'));
      }
    }
  }
};

var gameEquipment = {
  railgun: {
    metalForShip: function() { return (RAILGUN_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought)); },
    polymerForShip: function() { return (RAILGUN_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought)); },
    rpForShip: function() { return (0 * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought)); },
    metalForUpgrade: function() { return (RAILGUN_UPGRADE_METAL_BASE_COST * (gameData.technologies.railgunUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1)); },
    polymerForUpgrade: function() { return (RAILGUN_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.railgunUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1)); },
    rpForUpgrade: function() { return 0 * (RAILGUN_UPGRADE_RP_BASE_COST * (gameData.technologies.railgunUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1)); },
    metalForPrestige: function() { return (RAILGUN_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought + 1)); },
    polymerForPrestige: function() { return (RAILGUN_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought + 1)); },
    aetherForPrestige: function() { return (RAILGUN_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1)); },
    rpForPrestige: function() { return (RAILGUN_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought + 1)); },
    tooltipForUpgrade: function() { return ('Adds ' + prettify(this.getDamagePerUpgrade()) + ' damage per level\nMetal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function() { return ('This will improve our Railguns, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function() { $('#btnRailgunUpgrade').text('Railgun ' + convertToRoman(gameData.technologies.railgunPrestigeLevelBought) + ' (' + (gameData.technologies.railgunUpgrade) + ')'); },
    updateUpgradeTooltip: function() { $('#btnRailgunUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function() { $('#btnRailgunPrestige').text('I'); }, //   'Infuse Railgun ' + (gameData.technologies.railgunPrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function() { $('#btnRailgunPrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function() { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function() { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    getDamagePerUpgrade: function() { return (RAILGUN_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1)) * gameData.playership.size * achievementMultiplier * gamePerks.damager.getBonus(); },
    getDamage: function() { return (gameData.technologies.railgunUpgrade * this.getDamagePerUpgrade()); },
    determineShowUpgradeButton: function() {
      if (gameData.technologies.railgunPrestigeLevelBought > 0) {
        $('#btnRailgunUpgrade').removeClass('hidden');
      } else {
        $('#btnRailgunUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function() {
      if (gameData.technologies.railgunPrestigeLevelUnlocked > gameData.technologies.railgunPrestigeLevelBought) {
        $('#btnRailgunPrestige').removeClass('hidden');
      } else {
        $('#btnRailgunPrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function() {
      if (this.canAffordUpgrade()) {
        $('#btnRailgunUpgrade').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnRailgunUpgrade').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function() {
      if (this.canAffordPrestige()) {
        $('#btnRailgunPrestige').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnRailgunPrestige').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    buyUpgrade: function() {
      if (this.canAffordUpgrade()) {
        gameData.resources.metal -= this.metalForUpgrade();
        gameData.resources.polymer -= this.polymerForUpgrade();
        gameData.resources.researchPoints -= this.rpForUpgrade();
        gameData.technologies.railgunUpgrade++;
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        gtag('event', 'buy railgun upgrade', {
          event_category: 'click',
          event_label: 'label',
          value: gameData.technologies.railgunUpgrade
        });
      }
    },
    buyPrestige: function() {
      if (this.canAffordPrestige()) {
        gameData.resources.metal -= this.metalForPrestige();
        gameData.resources.polymer -= this.polymerForPrestige();
        gameData.resources.researchPoints -= this.rpForPrestige();
        gameData.resources.aether -= this.aetherForPrestige();
        gameData.technologies.railgunPrestigeLevelBought++;
        gameData.technologies.railgunUpgrade = 1;
        this.updatePrestigeTooltip();
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        this.updatePrestigeText();
        sortBuildings($('#buildingvisible'));
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
      }
    }
  },
  laser: {
    metalForShip: function() { return (LASER_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought)); },
    polymerForShip: function() { return (LASER_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought)); },
    metalForUpgrade: function() { return (LASER_UPGRADE_METAL_BASE_COST * (gameData.technologies.laserUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1)); },
    polymerForUpgrade: function() { return (LASER_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.laserUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1)); },
    rpForUpgrade: function() { return 0 * (LASER_UPGRADE_RP_BASE_COST * (gameData.technologies.laserUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1)); },
    metalForPrestige: function() { return (LASER_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought + 1)); },
    polymerForPrestige: function() { return (LASER_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought + 1)); },
    aetherForPrestige: function() { return (LASER_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1)); },
    rpForPrestige: function() { return (LASER_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought + 1)); },
    tooltipForUpgrade: function() { return ('Adds ' + prettify(this.getDamagePerUpgrade()) + ' damage per level\nMetal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function() { return ('This will improve our Lasers, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function() { $('#btnLaserUpgrade').text('Laser ' + convertToRoman(gameData.technologies.laserPrestigeLevelBought) + ' (' + (gameData.technologies.laserUpgrade) + ')'); },
    updateUpgradeTooltip: function() { $('#btnLaserUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function() { $('#btnLaserPrestige').text('I'); }, //   'Infuse Laser ' + (gameData.technologies.laserPrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function() { $('#btnLaserPrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function() { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function() { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    getDamagePerUpgrade: function() { return (LASER_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1)) * gameData.playership.size * achievementMultiplier * gamePerks.damager.getBonus(); },
    getDamage: function() { return (gameData.technologies.laserUpgrade * this.getDamagePerUpgrade()); },
    determineShowUpgradeButton: function() {
      if (gameData.technologies.laserPrestigeLevelBought > 0) {
        $('#btnLaserUpgrade').removeClass('hidden');
      } else {
        $('#btnLaserUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function() {
      if (gameData.technologies.laserPrestigeLevelUnlocked > gameData.technologies.laserPrestigeLevelBought) {
        $('#btnLaserPrestige').removeClass('hidden');
      } else {
        $('#btnLaserPrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function() {
      if (this.canAffordUpgrade()) {
        $('#btnLaserUpgrade').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnLaserUpgrade').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function() {
      if (this.canAffordPrestige()) {
        $('#btnLaserPrestige').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnLaserPrestige').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    buyUpgrade: function() {
      if (this.canAffordUpgrade()) {
        gameData.resources.metal -= this.metalForUpgrade();
        gameData.resources.polymer -= this.polymerForUpgrade();
        gameData.resources.researchPoints -= this.rpForUpgrade();
        gameData.technologies.laserUpgrade++;
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        gtag('event', 'buy laser upgrade', {
          event_category: 'click',
          event_label: 'label',
          value: gameData.technologies.laserUpgrade
        });
      }
    },
    buyPrestige: function() {
      if (this.canAffordPrestige()) {
        gameData.resources.metal -= this.metalForPrestige();
        gameData.resources.polymer -= this.polymerForPrestige();
        gameData.resources.researchPoints -= this.rpForPrestige();
        gameData.resources.aether -= this.aetherForPrestige();
        gameData.technologies.laserPrestigeLevelBought++;
        gameData.technologies.laserUpgrade = 1;
        this.updatePrestigeTooltip();
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        this.updatePrestigeText();
        sortBuildings($('#buildingvisible'));
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
      }
    }
  },
  missile: {
    metalForShip: function() { return (MISSILE_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought)); },
    polymerForShip: function() { return (MISSILE_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought)); },
    metalForUpgrade: function() { return (MISSILE_UPGRADE_METAL_BASE_COST * (gameData.technologies.missileUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1)); },
    polymerForUpgrade: function() { return (MISSILE_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.missileUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1)); },
    rpForUpgrade: function() { return 0 * (MISSILE_UPGRADE_RP_BASE_COST * (gameData.technologies.missileUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1)); },
    metalForPrestige: function() { return (MISSILE_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought + 1)); },
    polymerForPrestige: function() { return (MISSILE_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought + 1)); },
    aetherForPrestige: function() { return (MISSILE_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1)); },
    rpForPrestige: function() { return (MISSILE_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought + 1)); },
    tooltipForUpgrade: function() { return ('Adds ' + prettify(this.getDamagePerUpgrade()) + ' damage per level\nMetal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function() { return ('This will improve our Missiles, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function() { $('#btnMissileUpgrade').text('Missile ' + convertToRoman(gameData.technologies.missilePrestigeLevelBought) + ' (' + (gameData.technologies.missileUpgrade) + ')'); },
    updateUpgradeTooltip: function() { $('#btnMissileUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function() { $('#btnMissilePrestige').text('I'); }, //   'Infuse Missile ' + (gameData.technologies.missilePrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function() { $('#btnMissilePrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function() { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function() { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    getDamagePerUpgrade: function() { return (MISSILE_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1)) * gameData.playership.size * achievementMultiplier * gamePerks.damager.getBonus(); },
    getDamage: function() { return (gameData.technologies.missileUpgrade * this.getDamagePerUpgrade()); },
    determineShowUpgradeButton: function() {
      if (gameData.technologies.missilePrestigeLevelBought > 0) {
        $('#btnMissileUpgrade').removeClass('hidden');
      } else {
        $('#btnMissileUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function() {
      if (gameData.technologies.missilePrestigeLevelUnlocked > gameData.technologies.missilePrestigeLevelBought) {
        $('#btnMissilePrestige').removeClass('hidden');
      } else {
        $('#btnMissilePrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function() {
      if (this.canAffordUpgrade()) {
        $('#btnMissileUpgrade').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnMissileUpgrade').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function() {
      if (this.canAffordPrestige()) {
        $('#btnMissilePrestige').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnMissilePrestige').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    buyUpgrade: function() {
      if (this.canAffordUpgrade()) {
        gameData.resources.metal -= this.metalForUpgrade();
        gameData.resources.polymer -= this.polymerForUpgrade();
        gameData.resources.researchPoints -= this.rpForUpgrade();
        gameData.technologies.missileUpgrade++;
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        gtag('event', 'buy missile upgrade', {
          event_category: 'click',
          event_label: 'label',
          value: gameData.technologies.missileUpgrade
        });
      }
    },
    buyPrestige: function() {
      if (this.canAffordPrestige()) {
        gameData.resources.metal -= this.metalForPrestige();
        gameData.resources.polymer -= this.polymerForPrestige();
        gameData.resources.researchPoints -= this.rpForPrestige();
        gameData.resources.aether -= this.aetherForPrestige();
        gameData.technologies.missilePrestigeLevelBought++;
        gameData.technologies.missileUpgrade = 1;
        this.updatePrestigeTooltip();
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        this.updatePrestigeText();
        sortBuildings($('#buildingvisible'));
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
      }
    }
  },
  armor: {
    metalForShip: function() { return (ARMOR_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought)); },
    polymerForShip: function() { return (ARMOR_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought)); },
    metalForUpgrade: function() { return (ARMOR_UPGRADE_METAL_BASE_COST * (gameData.technologies.armorUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)); },
    polymerForUpgrade: function() { return (ARMOR_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.armorUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)); },
    rpForUpgrade: function() { return 0 * (ARMOR_UPGRADE_RP_BASE_COST * (gameData.technologies.armorUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)); },
    metalForPrestige: function() { return (ARMOR_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought + 1)); },
    polymerForPrestige: function() { return (ARMOR_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought + 1)); },
    aetherForPrestige: function() { return (ARMOR_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)); },
    rpForPrestige: function() { return (ARMOR_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought + 1)); },
    tooltipForUpgrade: function() { return ('Adds ' + prettify(this.getDamagePerUpgrade()) + ' Hit Points per level\nMetal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function() { return ('This will improve our Armor, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function() { $('#btnArmorUpgrade').text('Armor ' + convertToRoman(gameData.technologies.armorPrestigeLevelBought) + ' (' + (gameData.technologies.armorUpgrade) + ')'); },
    updateUpgradeTooltip: function() { $('#btnArmorUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function() { $('#btnArmorPrestige').text('I'); }, //   'Infuse Armor ' + (gameData.technologies.armorPrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function() { $('#btnArmorPrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function() { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function() { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    getDamagePerUpgrade: function() { return (ARMOR_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)) * gameData.playership.size * gamePerks.thickskin.getBonus(); },
    getDamage: function() { return (gameData.technologies.armorUpgrade * this.getDamagePerUpgrade()); },
    determineShowUpgradeButton: function() {
      if (gameData.technologies.armorPrestigeLevelBought > 0) {
        $('#btnArmorUpgrade').removeClass('hidden');
      } else {
        $('#btnArmorUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function() {
      if (gameData.technologies.armorPrestigeLevelUnlocked > gameData.technologies.armorPrestigeLevelBought) {
        $('#btnArmorPrestige').removeClass('hidden');
      } else {
        $('#btnArmorPrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function() {
      if (this.canAffordUpgrade()) {
        $('#btnArmorUpgrade').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnArmorUpgrade').removeClass('btn-info').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function() {
      if (this.canAffordPrestige()) {
        $('#btnArmorPrestige').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnArmorPrestige').removeClass('btn-info').addClass('btn-danger');
      }
    },
    buyUpgrade: function() {
      if (this.canAffordUpgrade()) {
        gameData.resources.metal -= this.metalForUpgrade();
        gameData.resources.polymer -= this.polymerForUpgrade();
        gameData.resources.researchPoints -= this.rpForUpgrade();
        gameData.technologies.armorUpgrade++;
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        gtag('event', 'buy armor upgrade', {
          event_category: 'click',
          event_label: 'label',
          value: gameData.technologies.armorUpgrade
        });
      }
    },
    buyPrestige: function() {
      if (this.canAffordPrestige()) {
        gameData.resources.metal -= this.metalForPrestige();
        gameData.resources.polymer -= this.polymerForPrestige();
        gameData.resources.researchPoints -= this.rpForPrestige();
        gameData.resources.aether -= this.aetherForPrestige();
        gameData.technologies.armorPrestigeLevelBought++;
        gameData.technologies.armorUpgrade = 1;
        this.updatePrestigeTooltip();
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        this.updatePrestigeText();
        sortBuildings($('#buildingvisible'));
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
      }
    }
  },
  shield: {
    metalForShip: function() { return (SHIELD_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought)); },
    polymerForShip: function() { return (SHIELD_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought)); },
    metalForUpgrade: function() { return (SHIELD_UPGRADE_METAL_BASE_COST * (gameData.technologies.shieldUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought - 1)); },
    polymerForUpgrade: function() { return (SHIELD_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.shieldUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought - 1)); },
    rpForUpgrade: function() { return 0 * (SHIELD_UPGRADE_RP_BASE_COST * (gameData.technologies.shieldUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought - 1)); },
    metalForPrestige: function() { return (SHIELD_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought + 1)); },
    polymerForPrestige: function() { return (SHIELD_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought + 1)); },
    aetherForPrestige: function() { return (SHIELD_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought - 1)); },
    rpForPrestige: function() { return (SHIELD_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought + 1)); },
    tooltipForUpgrade: function() { return ('Adds ' + prettify(this.getDamagePerUpgrade()) + ' Shield per level\nMetal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function() { return ('This will improve our Shields, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function() { $('#btnShieldUpgrade').text('Shield ' + convertToRoman(gameData.technologies.shieldPrestigeLevelBought) + ' (' + (gameData.technologies.shieldUpgrade) + ')'); },
    updateUpgradeTooltip: function() { $('#btnShieldUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function() { $('#btnShieldPrestige').text('I'); }, //   'Infuse Shield ' + (gameData.technologies.shieldPrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function() { $('#btnShieldPrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function() { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function() { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    getDamagePerUpgrade: function() { return (SHIELD_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought - 1)) * gameData.playership.size * gamePerks.thickskin.getBonus() * gameBuildings.tacticalLab.getBonus(); },
    getDamage: function() { return (gameData.technologies.shieldUpgrade * this.getDamagePerUpgrade()); },
    determineShowUpgradeButton: function() {
      if (gameData.technologies.shieldPrestigeLevelBought > 0) {
        $('#btnShieldUpgrade').removeClass('hidden');
      } else {
        $('#btnShieldUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function() {
      if (gameData.technologies.shieldPrestigeLevelUnlocked > gameData.technologies.shieldPrestigeLevelBought) {
        $('#btnShieldPrestige').removeClass('hidden');
      } else {
        $('#btnShieldPrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function() {
      if (this.canAffordUpgrade()) {
        $('#btnShieldUpgrade').removeClass('btn-danger').addClass('btn-primary');
      } else {
        $('#btnShieldUpgrade').removeClass('btn-primary').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function() {
      if (this.canAffordPrestige()) {
        $('#btnShieldPrestige').removeClass('btn-danger').addClass('btn-primary');
      } else {
        $('#btnShieldPrestige').removeClass('btn-primary').addClass('btn-danger');
      }
    },
    buyUpgrade: function() {
      if (this.canAffordUpgrade()) {
        gameData.resources.metal -= this.metalForUpgrade();
        gameData.resources.polymer -= this.polymerForUpgrade();
        gameData.resources.researchPoints -= this.rpForUpgrade();
        gameData.technologies.shieldUpgrade++;
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        gtag('event', 'buy shield upgrade', {
          event_category: 'click',
          event_label: 'label',
          value: gameData.technologies.shieldUpgrade
        });
      }
    },
    buyPrestige: function() {
      if (this.canAffordPrestige()) {
        gameData.resources.metal -= this.metalForPrestige();
        gameData.resources.polymer -= this.polymerForPrestige();
        gameData.resources.researchPoints -= this.rpForPrestige();
        gameData.resources.aether -= this.aetherForPrestige();
        gameData.technologies.shieldPrestigeLevelBought++;
        gameData.technologies.shieldUpgrade = 1;
        this.updatePrestigeTooltip();
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        this.updatePrestigeText();
        sortBuildings($('#buildingvisible'));
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
      }
    }
  },
  flak: {
    metalForShip: function() { return (FLAK_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought)); },
    polymerForShip: function() { return (FLAK_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought)); },
    metalForUpgrade: function() { return (FLAK_UPGRADE_METAL_BASE_COST * (gameData.technologies.flakUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought - 1)); },
    polymerForUpgrade: function() { return (FLAK_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.flakUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought - 1)); },
    rpForUpgrade: function() { return 0 * (FLAK_UPGRADE_RP_BASE_COST * (gameData.technologies.flakUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought - 1)); },
    metalForPrestige: function() { return (FLAK_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought + 1)); },
    polymerForPrestige: function() { return (FLAK_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought + 1)); },
    aetherForPrestige: function() { return (FLAK_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought - 1)); },
    rpForPrestige: function() { return (FLAK_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought + 1)); },
    tooltipForUpgrade: function() { return ('Adds ' + prettify(this.getDamagePerUpgrade()) + ' Hit Points per level\nMetal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function() { return ('This will improve our Flak, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function() { $('#btnFlakUpgrade').text('Flak ' + convertToRoman(gameData.technologies.flakPrestigeLevelBought) + ' (' + (gameData.technologies.flakUpgrade) + ')'); },
    updateUpgradeTooltip: function() { $('#btnFlakUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function() { $('#btnFlakPrestige').text('I'); }, //   'Infuse Flak ' + (gameData.technologies.flakPrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function() { $('#btnFlakPrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function() { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function() { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    getDamagePerUpgrade: function() { return (FLAK_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought - 1)) * gameData.playership.size * gamePerks.thickskin.getBonus(); },
    getDamage: function() { return (gameData.technologies.flakUpgrade * this.getDamagePerUpgrade()); },
    determineShowUpgradeButton: function() {
      if (gameData.technologies.flakPrestigeLevelBought > 0) {
        $('#btnFlakUpgrade').removeClass('hidden');
      } else {
        $('#btnFlakUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function() {
      if (gameData.technologies.flakPrestigeLevelUnlocked > gameData.technologies.flakPrestigeLevelBought) {
        $('#btnFlakPrestige').removeClass('hidden');
      } else {
        $('#btnFlakPrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function() {
      if (this.canAffordUpgrade()) {
        $('#btnFlakUpgrade').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnFlakUpgrade').removeClass('btn-info').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function() {
      if (this.canAffordPrestige()) {
        $('#btnFlakPrestige').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnFlakPrestige').removeClass('btn-info').addClass('btn-danger');
      }
    },
    buyUpgrade: function() {
      if (this.canAffordUpgrade()) {
        gameData.resources.metal -= this.metalForUpgrade();
        gameData.resources.polymer -= this.polymerForUpgrade();
        gameData.resources.researchPoints -= this.rpForUpgrade();
        gameData.technologies.flakUpgrade++;
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        gtag('event', 'buy flak upgrade', {
          event_category: 'click',
          event_label: 'label',
          value: gameData.technologies.flakUpgrade
        });
      }
    },
    buyPrestige: function() {
      if (this.canAffordPrestige()) {
        gameData.resources.metal -= this.metalForPrestige();
        gameData.resources.polymer -= this.polymerForPrestige();
        gameData.resources.researchPoints -= this.rpForPrestige();
        gameData.resources.aether -= this.aetherForPrestige();
        gameData.technologies.flakPrestigeLevelBought++;
        gameData.technologies.flakUpgrade = 1;
        this.updatePrestigeTooltip();
        this.updateUpgradeText();
        this.updateUpgradeTooltip();
        this.updatePrestigeText();
        sortBuildings($('#buildingvisible'));
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
      }
    }
  }
};

function saveGame() {
  localStorage.setItem('save', JSON.stringify(gameData));
  addToDisplay('Game Saved', 'gameSave');
  lastSaveGameTime = new Date();
  gtag('event', 'save game', {
    event_category: 'click',
    event_label: 'label',
    value: 'value'
  });
}

function prettifySub(num: number) {
  var floor = Math.floor(num);
  if (num === floor) { // number is an integer, just show it as-is
    return num;
  }
  //  var precision = 3 - floor.toString().length; // use the right number of digits

  return num.toFixed(3 - floor.toString().length);
}

function prettify(number: number): string {
  var numberTmp = number;
  var exponent = '';
  var suffices = [];
  var suffix = '';
  if (!isFinite(number)) return 'i';

  if (number >= 1000 && number < 10000) return Math.floor(number).toString();
  if (number == 0) return prettifySub(0).toString();
  if (number < 0) return '-' + prettify(-number);
  if (number < 0.005) return (+number).toExponential(2);

  var base = Math.floor(Math.log(number) / Math.log(1000));
  if (base <= 0) return prettifySub(number).toString();

  if (gameData.options.standardNotation == 5) {
    // Thanks ZXV
    var logBase = gameData.options.logNotBase;
    exponent = (Math.log(number) / Math.log(logBase)).toString();
    return prettifySub(parseInt(exponent, 10)) + 'L' + logBase;
  }

  number /= Math.pow(1000, base);
  if (number >= 999.5) {
    // 999.5 rounds to 1000 and we don’t want to show “1000K” or such
    number /= 1000;
    ++base;
  }
  if (gameData.options.standardNotation == 3) {
    suffices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    if (base <= suffices.length) suffix = suffices[base - 1];
    else {
      var suf2 = (base % suffices.length) - 1;
      if (suf2 < 0) suf2 = suffices.length - 1;
      suffix = suffices[Math.ceil(base / suffices.length) - 2] + suffices[suf2];
    }
  } else {
    suffices = [
      'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud',
      'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Od', 'Nd', 'V', 'Uv', 'Dv',
      'Tv', 'Qav', 'Qiv', 'Sxv', 'Spv', 'Ov', 'Nv', 'Tg', 'Utg', 'Dtg', 'Ttg',
      'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Otg', 'Ntg', 'Qaa', 'Uqa', 'Dqa', 'Tqa',
      'Qaqa', 'Qiqa', 'Sxqa', 'Spqa', 'Oqa', 'Nqa', 'Qia', 'Uqi', 'Dqi',
      'Tqi', 'Qaqi', 'Qiqi', 'Sxqi', 'Spqi', 'Oqi', 'Nqi', 'Sxa', 'Usx',
      'Dsx', 'Tsx', 'Qasx', 'Qisx', 'Sxsx', 'Spsx', 'Osx', 'Nsx', 'Spa',
      'Usp', 'Dsp', 'Tsp', 'Qasp', 'Qisp', 'Sxsp', 'Spsp', 'Osp', 'Nsp',
      'Og', 'Uog', 'Dog', 'Tog', 'Qaog', 'Qiog', 'Sxog', 'Spog', 'Oog',
      'Nog', 'Na', 'Un', 'Dn', 'Tn', 'Qan', 'Qin', 'Sxn', 'Spn', 'On',
      'Nn', 'Ct', 'Uc'
    ];
    if (gameData.options.standardNotation == 2 || (gameData.options.standardNotation == 1 && base > suffices.length) || (gameData.options.standardNotation == 4 && base > 31)) {
      suffix = 'e' + ((base) * 3);
    } else if (gameData.options.standardNotation && base <= suffices.length) {
      suffix = suffices[base - 1];
    } else {
      exponent = numberTmp.toExponential(2);
      exponent = exponent.replace('+', '');
      return exponent;
    }
  }
  return prettifySub(number) + suffix;
}

function changeNotation() { // eslint-disable-line no-unused-vars
  gameData.options.standardNotation++;
  if (gameData.options.standardNotation >= 6) {
    gameData.options.standardNotation = 0;
  }
  $('#btnNotation').text(notationDisplayOptions[gameData.options.standardNotation]);
}

function resetGame() { // eslint-disable-line no-unused-vars
  localStorage.clear();
  location.reload(true);
}

function exportsave() { // eslint-disable-line no-unused-vars
  debugText = JSON.stringify(gameData);
}

function init(passedperks: perks, passedchallenges: challenges, gatewayReset: boolean = false, activeChallenge: string = '', chronoton: number = 0, passedAchievements: number[] = []) {
  debugText += '\nv0.7.3 - New challenge, new power techs, new power building, new gui, most things have been rebalanced';
  debugText += '\nv0.7.2 - Another new attempt at a GUI!!! and some balance issues mainly related to research';
  debugText += '\nv0.7.1 - Another new attempt at a GUI and nerfed Shields.  Changed Tactical Labs to effect shields instead of armor and flak';
  debugText += '\nv0.7.0 - Another new attempt at a GUI and fixed the power challenge to not immediately be completed.';
  debugText += '\nv0.6.9 - New GUI and some balance changes.';
  debugText += '\nv0.6.8 - added another new challenge called power that cuts power generation in half.  It is unlocked at galaxy 25 and is completed by reaching galaxy 25.  It unlocks the power ability that increases power generation by 10% additively.  Also moved the consistency challenge to level 35.';
  debugText += '\nv0.6.7 - Conversion to typescript is complete.\nThe first challenge is in the game.  It is called consistency and lowers the max damage to the min damage.  It is unlocked at galaxy 25 and is completed by reaching level 25.  It is activated on the gateway screen.  It unlocks the consistency ability which increases min damage.  When maxed out min damage will be 100% of the base damage while max damage stays at 125%.';
  debugText += '\nKnown issues and other ramblings:\n1. If the tab loses focus or is closed, when you return you will notice the game runs faster than expected until time catches up.  Enjoy this for now, eventually there will be an ability that will allow/limit this time\n';
  debugText += '2. There are currently no tooltips for touchscreen users.\n';
  debugText += '3. TODO I need an achievement screen that shows all achievements completed and still to do, along with the current bonus gained from achievements\n';
  debugText += '4. There is currently no confirmation dialog on clicking the reset button under settings.  Be careful.\n';
  debugText += '5. The flavor text is basically in rough draft form complete with a few placeholders\n';
  debugText += '6. Balance is an ongoing process and any thoughts are appreciated.\n';
  debugText += '7. Autosave is hardcoded for every five minutes.  This needs to be adjustable in settings.  And Playfab integration is coming.  One day.\n';
  debugText += '9. Current achievements are limited.\n';
  debugText += '10. I\'d like a visual representation of how far the player has advanced in the current mission/galaxy.\n';
  possibleEnemies = [];
  possibleEnemies.push(new PossibleEnemies('Raider', 1, 1, 1));
  possibleEnemies.push(new PossibleEnemies('Tank', 0.5, 2, 1));
  possibleEnemies.push(new PossibleEnemies('Wizard', 2, 0.5, 1));
  possibleEnemies.push(new PossibleEnemies('Paladin', 1.5, 0.7, 1));
  possibleEnemies.push(new PossibleEnemies('Ranger', 0.7, 1.5, 1));
  possibleEnemies.push(new PossibleEnemies('Raider', 1, 1, 1));
  textToDisplay = [];
  textGameSaved = [];
  textLoot = [];
  textCombat = [];
  textStory = [];
  textMissions = [];

  gameData = new saveGameData('new');

  if (gatewayReset) {
    gameData.resources.chronoton = chronoton;
    gameData.perks = passedperks;
    gameData.achievementids = passedAchievements;
    gameData.challenges = passedchallenges;
    gameData.world.currentChallenge = activeChallenge;
  } else {
    var savegame = JSON.parse(localStorage.getItem('save'));
    if (savegame !== null) {
      if (typeof savegame.buildings.shipyard !== 'undefined') gameData.buildings.shipyard = savegame.buildings.shipyard;
      if (typeof savegame.buildings.factories !== 'undefined') gameData.buildings.factories = savegame.buildings.factories;
      if (typeof savegame.buildings.refineries !== 'undefined') gameData.buildings.refineries = savegame.buildings.refineries;
      if (typeof savegame.buildings.panels !== 'undefined') gameData.buildings.panels = savegame.buildings.panels;
      if (typeof savegame.buildings.generators !== 'undefined') gameData.buildings.generators = savegame.buildings.generators;
      if (typeof savegame.buildings.plants !== 'undefined') gameData.buildings.plants = savegame.buildings.plants;
      if (typeof savegame.buildings.aetherPlants !== 'undefined') gameData.buildings.aetherPlants = savegame.buildings.aetherPlants;
      if (typeof savegame.buildings.fusionPlants !== 'undefined') gameData.buildings.fusionPlants = savegame.buildings.fusionPlants;
      if (typeof savegame.buildings.labs !== 'undefined') gameData.buildings.labs = savegame.buildings.labs;
      if (typeof savegame.buildings.tacticalLabs !== 'undefined') gameData.buildings.tacticalLabs = savegame.buildings.tacticalLabs;
      if (typeof savegame.buildings.mines !== 'undefined') gameData.buildings.mines = savegame.buildings.mines;
      if (typeof savegame.enemyship.shield !== 'undefined') gameData.enemyship.shield = savegame.enemyship.shield;
      if (typeof savegame.enemyship.name !== 'undefined') gameData.enemyship.name = savegame.enemyship.name;
      if (typeof savegame.enemyship.shieldMax !== 'undefined') gameData.enemyship.shieldMax = savegame.enemyship.shieldMax;
      if (typeof savegame.enemyship.hitPoints !== 'undefined') gameData.enemyship.hitPoints = savegame.enemyship.hitPoints;
      if (typeof savegame.enemyship.hitPointsMax !== 'undefined') gameData.enemyship.hitPointsMax = savegame.enemyship.hitPointsMax;
      if (typeof savegame.enemyship.maxDamage !== 'undefined') gameData.enemyship.maxDamage = savegame.enemyship.maxDamage;
      if (typeof savegame.enemyship.minDamage !== 'undefined') gameData.enemyship.minDamage = savegame.enemyship.minDamage;
      if (typeof savegame.enemyship.attributes !== 'undefined') gameData.enemyship.attributes = savegame.enemyship.attributes;
      if (typeof savegame.enemyship.size !== 'undefined') gameData.enemyship.size = savegame.enemyship.size;
      if (typeof savegame.lastRailgunCombatProcessTime !== 'undefined') gameData.lastRailgunCombatProcessTime = new Date(savegame.lastRailgunCombatProcessTime);
      if (typeof savegame.lastLaserCombatProcessTime !== 'undefined') gameData.lastLaserCombatProcessTime = new Date(savegame.lastLaserCombatProcessTime);
      if (typeof savegame.lastResourceProcessTime !== 'undefined') gameData.lastResourceProcessTime = new Date(savegame.lastResourceProcessTime);
      if (typeof savegame.nextProcessTime !== 'undefined') gameData.nextProcessTime = new Date(savegame.nextProcessTime);
      if (typeof savegame.lastSentShipTime !== 'undefined') gameData.lastSentShipTime = new Date(savegame.lastSentShipTime);
      if (typeof savegame.playership.shield !== 'undefined') gameData.playership.shield = savegame.playership.shield;
      if (typeof savegame.playership.shieldMax !== 'undefined') gameData.playership.shieldMax = savegame.playership.shieldMax;
      if (typeof savegame.playership.hitPoints !== 'undefined') gameData.playership.hitPoints = savegame.playership.hitPoints;
      if (typeof savegame.playership.hitPointsMax !== 'undefined') gameData.playership.hitPointsMax = savegame.playership.hitPointsMax;
      if (typeof savegame.playership.maxDamage !== 'undefined') gameData.playership.maxDamage = savegame.playership.maxDamage;
      if (typeof savegame.playership.minDamage !== 'undefined') gameData.playership.minDamage = savegame.playership.minDamage;
      if (typeof savegame.playership.size !== 'undefined') gameData.playership.size = savegame.playership.size;
      if (typeof savegame.playership.name !== 'undefined') gameData.playership.name = savegame.playership.name;
      if (typeof savegame.resources.metal !== 'undefined') gameData.resources.metal = savegame.resources.metal;
      if (typeof savegame.resources.polymer !== 'undefined') gameData.resources.polymer = savegame.resources.polymer;
      if (typeof savegame.resources.power !== 'undefined') gameData.resources.power = savegame.resources.power;
      if (typeof savegame.resources.researchPoints !== 'undefined') gameData.resources.researchPoints = savegame.resources.researchPoints;
      if (typeof savegame.resources.aether !== 'undefined') gameData.resources.aether = savegame.resources.aether;
      if (typeof savegame.resources.chronoton !== 'undefined') gameData.resources.chronoton = savegame.resources.chronoton;
      if (typeof savegame.resources.chronotonfragments !== 'undefined') gameData.resources.chronotonfragments = savegame.resources.chronotonfragments;
      if (typeof savegame.technologies.autofightBought !== 'undefined') gameData.technologies.autofightBought = savegame.technologies.autofightBought;
      if (typeof savegame.technologies.autofightOn !== 'undefined') gameData.technologies.autofightOn = savegame.technologies.autofightOn;
      if (typeof savegame.technologies.autofightUnlock !== 'undefined') gameData.technologies.autofightUnlock = savegame.technologies.autofightUnlock;
      if (typeof savegame.technologies.metalProficiencyUnlocked !== 'undefined') gameData.technologies.metalProficiencyUnlocked = savegame.technologies.metalProficiencyUnlocked;
      if (typeof savegame.technologies.metalProficiencyBought !== 'undefined') gameData.technologies.metalProficiencyBought = savegame.technologies.metalProficiencyBought;
      if (typeof savegame.technologies.polymerProficiencyUnlocked !== 'undefined') gameData.technologies.polymerProficiencyUnlocked = savegame.technologies.polymerProficiencyUnlocked;
      if (typeof savegame.technologies.polymerProficiencyBought !== 'undefined') gameData.technologies.polymerProficiencyBought = savegame.technologies.polymerProficiencyBought;
      if (typeof savegame.technologies.researchProficiency !== 'undefined') gameData.technologies.researchProficiency = savegame.technologies.researchProficiency;
      if (typeof savegame.technologies.researchProficiencyBought !== 'undefined') gameData.technologies.researchProficiencyBought = savegame.technologies.researchProficiencyBought;
      if (typeof savegame.technologies.aetherProficiencyUnlocked !== 'undefined') gameData.technologies.aetherProficiencyUnlocked = savegame.technologies.aetherProficiencyUnlocked;
      if (typeof savegame.technologies.aetherProficiencyBought !== 'undefined') gameData.technologies.aetherProficiencyBought = savegame.technologies.aetherProficiencyBought;
      if (typeof savegame.technologies.shipyardTechUnlock !== 'undefined') gameData.technologies.shipyardTechUnlock = savegame.technologies.shipyardTechUnlock;
      if (typeof savegame.technologies.railgunPrestigeLevelUnlocked !== 'undefined') gameData.technologies.railgunPrestigeLevelUnlocked = savegame.technologies.railgunPrestigeLevelUnlocked;
      if (typeof savegame.technologies.railgunPrestigeLevelBought !== 'undefined') gameData.technologies.railgunPrestigeLevelBought = savegame.technologies.railgunPrestigeLevelBought;
      if (typeof savegame.technologies.railgunUpgrade !== 'undefined') gameData.technologies.railgunUpgrade = savegame.technologies.railgunUpgrade;
      if (typeof savegame.technologies.laserPrestigeLevelUnlocked !== 'undefined') gameData.technologies.laserPrestigeLevelUnlocked = savegame.technologies.laserPrestigeLevelUnlocked;
      if (typeof savegame.technologies.laserPrestigeLevelBought !== 'undefined') gameData.technologies.laserPrestigeLevelBought = savegame.technologies.laserPrestigeLevelBought;
      if (typeof savegame.technologies.laserUpgrade !== 'undefined') gameData.technologies.laserUpgrade = savegame.technologies.laserUpgrade;
      if (typeof savegame.technologies.missilePrestigeLevelUnlocked !== 'undefined') gameData.technologies.missilePrestigeLevelUnlocked = savegame.technologies.missilePrestigeLevelUnlocked;
      if (typeof savegame.technologies.missilePrestigeLevelBought !== 'undefined') gameData.technologies.missilePrestigeLevelBought = savegame.technologies.missilePrestigeLevelBought;
      if (typeof savegame.technologies.missileUpgrade !== 'undefined') gameData.technologies.missileUpgrade = savegame.technologies.missileUpgrade;
      if (typeof savegame.technologies.armorPrestigeLevelUnlocked !== 'undefined') gameData.technologies.armorPrestigeLevelUnlocked = savegame.technologies.armorPrestigeLevelUnlocked;
      if (typeof savegame.technologies.armorPrestigeLevelBought !== 'undefined') gameData.technologies.armorPrestigeLevelBought = savegame.technologies.armorPrestigeLevelBought;
      if (typeof savegame.technologies.armorUpgrade !== 'undefined') gameData.technologies.armorUpgrade = savegame.technologies.armorUpgrade;
      if (typeof savegame.technologies.shieldPrestigeLevelUnlocked !== 'undefined') gameData.technologies.shieldPrestigeLevelUnlocked = savegame.technologies.shieldPrestigeLevelUnlocked;
      if (typeof savegame.technologies.shieldPrestigeLevelBought !== 'undefined') gameData.technologies.shieldPrestigeLevelBought = savegame.technologies.shieldPrestigeLevelBought;
      if (typeof savegame.technologies.shieldUpgrade !== 'undefined') gameData.technologies.shieldUpgrade = savegame.technologies.shieldUpgrade;
      if (typeof savegame.technologies.flakPrestigeLevelUnlocked !== 'undefined') gameData.technologies.flakPrestigeLevelUnlocked = savegame.technologies.flakPrestigeLevelUnlocked;
      if (typeof savegame.technologies.flakPrestigeLevelBought !== 'undefined') gameData.technologies.flakPrestigeLevelBought = savegame.technologies.flakPrestigeLevelBought;
      if (typeof savegame.technologies.flakUpgrade !== 'undefined') gameData.technologies.flakUpgrade = savegame.technologies.flakUpgrade;
      if (typeof savegame.technologies.goldMine !== 'undefined') gameData.technologies.goldMine = savegame.technologies.goldMine;
      if (typeof savegame.technologies.panelUpgrade !== 'undefined') gameData.technologies.panelUpgrade = savegame.technologies.panelUpgrade;
      if (typeof savegame.technologies.generatorUpgrade !== 'undefined') gameData.technologies.generatorUpgrade = savegame.technologies.generatorUpgrade;
      if (typeof savegame.technologies.plantupgrade !== 'undefined') gameData.technologies.plantupgrade = savegame.technologies.plantupgrade;
      if (typeof savegame.technologies.aetherplantupgrade !== 'undefined') gameData.technologies.aetherplantupgrade = savegame.technologies.aetherplantupgrade;
      if (typeof savegame.technologies.fusionplantupgrade !== 'undefined') gameData.technologies.fusionplantupgrade = savegame.technologies.fusionplantupgrade;
      if (typeof savegame.missions !== 'undefined') gameData.missions = savegame.missions;
      if (typeof savegame.world.currentMission !== 'undefined') gameData.world.currentMission = savegame.world.currentMission;
      if (typeof savegame.world.lastGalaxy !== 'undefined') gameData.world.lastGalaxy = savegame.world.lastGalaxy;
      if (typeof savegame.world.timeElapsed !== 'undefined') gameData.world.timeElapsed = savegame.world.timeElapsed;
      if (typeof savegame.world.dronesCreated !== 'undefined') gameData.world.dronesCreated = savegame.world.dronesCreated;
      if (typeof savegame.world.currentChallenge !== 'undefined') gameData.world.currentChallenge = savegame.world.currentChallenge;
      if (typeof savegame.options.standardNotation !== 'undefined') gameData.options.standardNotation = savegame.options.standardNotation;
      if (typeof savegame.options.logNotBase !== 'undefined') gameData.options.logNotBase = savegame.options.logNotBase;
      if (typeof savegame.achievementids !== 'undefined') gameData.achievementids = savegame.achievementids;
      if (typeof savegame.perks.damager !== 'undefined') gameData.perks.damager = savegame.perks.damager;
      if (typeof savegame.perks.looter !== 'undefined') gameData.perks.looter = savegame.perks.looter;
      if (typeof savegame.perks.thickskin !== 'undefined') gameData.perks.thickskin = savegame.perks.thickskin;
      if (typeof savegame.perks.speed !== 'undefined') gameData.perks.speed = savegame.perks.speed;
      if (typeof savegame.perks.producer !== 'undefined') gameData.perks.producer = savegame.perks.producer;
      if (typeof savegame.perks.consistency !== 'undefined') gameData.perks.consistency = savegame.perks.consistency;
      if (typeof savegame.perks.power !== 'undefined') gameData.perks.power = savegame.perks.power;
      if (typeof savegame.story.shipyardUnlocked !== 'undefined') gameData.story.shipyardUnlocked = savegame.story.shipyardUnlocked;
      if (typeof savegame.story.gatewayUnlocked !== 'undefined') gameData.story.gatewayUnlocked = savegame.story.gatewayUnlocked;
      if (typeof savegame.story.factoryunlocked !== 'undefined') gameData.story.factoryunlocked = savegame.story.factoryunlocked;
      if (typeof savegame.story.labunlocked !== 'undefined') gameData.story.labunlocked = savegame.story.labunlocked;
      if (typeof savegame.story.generatorunlocked !== 'undefined') gameData.story.generatorunlocked = savegame.story.generatorunlocked;
      if (typeof savegame.story.plantunlocked !== 'undefined') gameData.story.plantunlocked = savegame.story.plantunlocked;
      if (typeof savegame.story.aetherplantunlocked !== 'undefined') gameData.story.aetherplantunlocked = savegame.story.aetherplantunlocked;
      if (typeof savegame.story.refineryunlocked !== 'undefined') gameData.story.refineryunlocked = savegame.story.refineryunlocked;
      if (typeof savegame.story.initial !== 'undefined') gameData.story.initial = savegame.story.initial;
      if (typeof savegame.story.firstfight !== 'undefined') gameData.story.firstfight = savegame.story.firstfight;
      if (typeof savegame.story.consistencyunlocked !== 'undefined') gameData.story.consistencyunlocked = savegame.story.consistencyunlocked;
      if (typeof savegame.story.powerunlocked !== 'undefined') gameData.story.powerunlocked = savegame.story.powerunlocked;
      if (typeof savegame.story.criticalityunlocked !== 'undefined') gameData.story.criticalityunlocked = savegame.story.criticalityunlocked;
      if (typeof savegame.challenges.consistency !== 'undefined') gameData.challenges.consistency = savegame.challenges.consistency;
      if (typeof savegame.challenges.power !== 'undefined') gameData.challenges.power = savegame.challenges.power;
      if (typeof savegame.challenges.criticality !== 'undefined') gameData.challenges.criticality = savegame.challenges.criticality;
      if (typeof savegame.tacticalChoices !== 'undefined') gameData.tacticalChoices.tacticalLabsSetting = savegame.tacticalChoices.tacticalLabsSetting;
    }
  }

  $('#building').tab('show');
  $('#polymercontainer').addClass('hidden');
  $('#btnBuyFactory').addClass('hidden');
  $('#labscontainer').addClass('hidden');
  $('#btnBuyLab').addClass('hidden');
  $('#btnBuyTacticalLab').addClass('hidden');
  $('#btnBuyGenerator').addClass('hidden');
  $('#btnBuyPlant').addClass('hidden');
  $('#btnBuyRefinery').addClass('hidden');
  $('#btnBuyAetherPlant').addClass('hidden');
  $('#btnBuyFusionPlant').addClass('hidden');
  $('#fightcontrols').addClass('hidden');
  $('#fightdisplay').addClass('hidden');
  $('#missionvisible').addClass('hidden');
  $('#upgradevisible').addClass('hidden');
  $('#techvisible').addClass('hidden');
  $('#fragmentcontainer').addClass('hidden');
  $('#chronotoncontainer').addClass('hidden');
  $('#researchcontainer').addClass('hidden');
  $('#projectcontainer').addClass('hidden');
  $('#aethercontainer').addClass('hidden');
  $('#buildingsContainer').addClass('hidden');
  $('#equipmentContainer').addClass('hidden');

  $('#upgrade-tab').addClass('hidden');
  $('#missions-tab').addClass('hidden');
  $('#btnFight').addClass('hidden');
  $('#btnAutoFight').addClass('hidden');
  $('#btnAutoFightOn').addClass('hidden');
  $('#btnGateway').addClass('hidden');
  $('#btnSuicide').addClass('hidden');
  $('#btnConfirmConsistency').addClass('hidden');
  if (gameData.challenges.consistency.unlocked && !gameData.challenges.consistency.completed) {
    $('#btnConfirmConsistency').removeClass('hidden');
  }
  $('#btnConfirmPower').addClass('hidden');
  if (gameData.challenges.power.unlocked && !gameData.challenges.power.completed) {
    $('#btnConfirmPower').removeClass('hidden');
  }
  $('#btnConfirmCriticality').addClass('hidden');
  if (gameData.challenges.criticality.unlocked && !gameData.challenges.criticality.completed) {
    $('#btnConfirmCriticality').removeClass('hidden');
  }
  $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
  $('#btnAutoFight').attr('title', 'Metal Cost:' + AUTOFIGHT_METAL_COST + '\nPolymer Cost:' + AUTOFIGHT_POLYMER_COST + '\nResarch Point Cost:' + AUTOFIGHT_RP_COST);
  $('#btnMetalTech').attr('title', 'Metal Cost:' + prettify((METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))) +
    '\nResearch Cost:' + prettify((METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))));
  $('#btnPolymerTech').attr('title', 'Polymer Cost:' + prettify(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)) +
    '\nResearch Cost:' + prettify(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)));
  $('#btnResearchTech').attr('title', 'Metal Cost:' + prettify(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) +
    '\nPolymer Cost:' + prettify(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) +
    '\nResearch Cost:' + prettify(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)));
  $('#btnAetherTech').attr('title', 'Metal Cost:' + prettify(AETHER_PROFIECIENCY_METAL_COST * Math.pow(AETHER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought)) +
    '\nPolymer Cost:' + prettify(AETHER_PROFIECIENCY_POLYMER_COST * Math.pow(AETHER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought)) +
    '\nResearch Cost:' + prettify(AETHER_PROFIECIENCY_RP_COST * Math.pow(AETHER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought)));

  gameEquipment.railgun.updateUpgradeText();
  gameEquipment.railgun.updatePrestigeText();
  gameEquipment.railgun.updateUpgradeTooltip();
  gameEquipment.railgun.updatePrestigeTooltip();
  gameEquipment.laser.updateUpgradeText();
  gameEquipment.laser.updatePrestigeText();
  gameEquipment.laser.updateUpgradeTooltip();
  gameEquipment.laser.updatePrestigeTooltip();
  gameEquipment.missile.updateUpgradeText();
  gameEquipment.missile.updatePrestigeText();
  gameEquipment.missile.updateUpgradeTooltip();
  gameEquipment.missile.updatePrestigeTooltip();
  gameEquipment.armor.updateUpgradeText();
  gameEquipment.armor.updatePrestigeText();
  gameEquipment.armor.updateUpgradeTooltip();
  gameEquipment.armor.updatePrestigeTooltip();
  gameEquipment.shield.updateUpgradeText();
  gameEquipment.shield.updatePrestigeText();
  gameEquipment.shield.updateUpgradeTooltip();
  gameEquipment.shield.updatePrestigeTooltip();
  gameEquipment.flak.updateUpgradeText();
  gameEquipment.flak.updatePrestigeText();
  gameEquipment.flak.updateUpgradeTooltip();
  gameEquipment.flak.updatePrestigeTooltip();

  gamePerks.looter.updateBuyButtonText();
  gamePerks.looter.updateBuyButtonTooltip();
  gamePerks.producer.updateBuyButtonText();
  gamePerks.producer.updateBuyButtonTooltip();
  gamePerks.damager.updateBuyButtonText();
  gamePerks.damager.updateBuyButtonTooltip();
  gamePerks.thickskin.updateBuyButtonText();
  gamePerks.thickskin.updateBuyButtonTooltip();
  gamePerks.speed.updateBuyButtonText();
  gamePerks.speed.updateBuyButtonTooltip();
  gamePerks.consistency.updateBuyButtonText();
  gamePerks.consistency.updateBuyButtonTooltip();
  gamePerks.power.updateBuyButtonText();
  gamePerks.power.updateBuyButtonTooltip();
  gamePerks.looter.determineShowAffordUpgrade();
  gamePerks.looter.determineShowBuyButton();
  gamePerks.producer.determineShowAffordUpgrade();
  gamePerks.producer.determineShowBuyButton();
  gamePerks.damager.determineShowAffordUpgrade();
  gamePerks.damager.determineShowBuyButton();
  gamePerks.thickskin.determineShowAffordUpgrade();
  gamePerks.thickskin.determineShowBuyButton();
  gamePerks.speed.determineShowAffordUpgrade();
  gamePerks.speed.determineShowBuyButton();
  gamePerks.consistency.determineShowAffordUpgrade();
  gamePerks.consistency.determineShowBuyButton();
  gamePerks.power.determineShowAffordUpgrade();
  gamePerks.power.determineShowBuyButton();

  gameBuildings.mine.updateBuyButtonText();
  gameBuildings.mine.updateBuyButtonTooltip();
  gameBuildings.factory.updateBuyButtonText();
  gameBuildings.factory.updateBuyButtonTooltip();
  gameBuildings.refinery.updateBuyButtonText();
  gameBuildings.refinery.updateBuyButtonTooltip();
  gameBuildings.shipyard.updateBuyButtonText();
  gameBuildings.shipyard.updateBuyButtonTooltip();
  gameBuildings.lab.updateBuyButtonText();
  gameBuildings.lab.updateBuyButtonTooltip();
  gameBuildings.panel.updateBuyButtonText();
  gameBuildings.panel.updateBuyButtonTooltip();
  gameBuildings.generator.updateBuyButtonText();
  gameBuildings.generator.updateBuyButtonTooltip();
  gameBuildings.plant.updateBuyButtonText();
  gameBuildings.plant.updateBuyButtonTooltip();
  gameBuildings.aetherPlant.updateBuyButtonText();
  gameBuildings.aetherPlant.updateBuyButtonTooltip();
  gameBuildings.fusionPlant.updateBuyButtonText();
  gameBuildings.fusionPlant.updateBuyButtonTooltip();
  gameBuildings.tacticalLab.updateBuyButtonText();
  gameBuildings.tacticalLab.updateBuyButtonTooltip();

  achievementlist = [];

  achievementlist.push(new Achievement(0, '5 Mines', 1));
  achievementlist.push(new Achievement(1, '10 Mines', 2));
  achievementlist.push(new Achievement(2, '25 Mines', 3));
  achievementlist.push(new Achievement(3, '50 Mines', 4));
  achievementlist.push(new Achievement(4, '100 Mines', 5));
  achievementlist.push(new Achievement(5, '1000 Mines', 20));
  achievementlist.push(new Achievement(6, '1 Factory', 1));
  achievementlist.push(new Achievement(7, '5 Factories', 1));
  achievementlist.push(new Achievement(8, '10 Factories', 2));
  achievementlist.push(new Achievement(9, '25 Factories', 3));
  achievementlist.push(new Achievement(10, '50 Factories', 4));
  achievementlist.push(new Achievement(11, '100 Factories', 5));
  achievementlist.push(new Achievement(12, '1000 Factories', 20));
  achievementlist.push(new Achievement(13, '1 Refinery', 1));
  achievementlist.push(new Achievement(14, '5 Refineries', 1));
  achievementlist.push(new Achievement(15, '10 Refineries', 2));
  achievementlist.push(new Achievement(16, '25 Refineries', 3));
  achievementlist.push(new Achievement(17, '50 Refineries', 4));
  achievementlist.push(new Achievement(18, '100 Refineries', 5));
  achievementlist.push(new Achievement(19, '1000 Refineries', 20));
  achievementlist.push(new Achievement(20, '1 Lab', 1));
  achievementlist.push(new Achievement(21, '5 Labs', 1));
  achievementlist.push(new Achievement(22, '10 Labs', 2));
  achievementlist.push(new Achievement(23, '25 Labs', 3));
  achievementlist.push(new Achievement(24, '50 Labs', 4));
  achievementlist.push(new Achievement(25, '100 Labs', 5));
  achievementlist.push(new Achievement(26, '1000 Labs', 20));
  achievementlist.push(new Achievement(27, '1 Tactical Lab', 1));
  achievementlist.push(new Achievement(28, '5 Tactical Labs', 2));
  achievementlist.push(new Achievement(29, '10 Tactical Labs', 5));
  achievementlist.push(new Achievement(30, '25 Tactical Labs', 10));
  achievementlist.push(new Achievement(31, '50 Tactical Labs', 25));
  achievementlist.push(new Achievement(32, '100 Tactical Labs', 50));
  achievementlist.push(new Achievement(33, '1000 Tactical Labs', 100));
  achievementlist.push(new Achievement(34, '5 Panels', 1));
  achievementlist.push(new Achievement(35, '10 Panels', 2));
  achievementlist.push(new Achievement(36, '25 Panels', 3));
  achievementlist.push(new Achievement(37, '50 Panels', 4));
  achievementlist.push(new Achievement(38, '100 Panels', 5));
  achievementlist.push(new Achievement(39, '1000 Panels', 20));
  achievementlist.push(new Achievement(40, '1 Plant', 1));
  achievementlist.push(new Achievement(41, '5 Plants', 1));
  achievementlist.push(new Achievement(42, '10 Plants', 2));
  achievementlist.push(new Achievement(43, '25 Plants', 3));
  achievementlist.push(new Achievement(44, '50 Plants', 4));
  achievementlist.push(new Achievement(45, '100 Plants', 5));
  achievementlist.push(new Achievement(46, '1000 Plants', 20));
  achievementlist.push(new Achievement(47, '1 Generator', 1));
  achievementlist.push(new Achievement(48, '5 Generators', 1));
  achievementlist.push(new Achievement(49, '10 Generators', 2));
  achievementlist.push(new Achievement(50, '25 Generators', 3));
  achievementlist.push(new Achievement(51, '50 Generators', 4));
  achievementlist.push(new Achievement(52, '100 Generators', 5));
  achievementlist.push(new Achievement(53, '1000 Generators', 20));
  achievementlist.push(new Achievement(54, '1 Aether Plant', 1));
  achievementlist.push(new Achievement(55, '5 Aether Plants', 1));
  achievementlist.push(new Achievement(56, '10 Aether Plants', 2));
  achievementlist.push(new Achievement(57, '25 Aether Plants', 3));
  achievementlist.push(new Achievement(58, '50 Aether Plants', 4));
  achievementlist.push(new Achievement(59, '100 Aether Plants', 5));
  achievementlist.push(new Achievement(60, '1000 Aether Plants', 20));
  achievementlist.push(new Achievement(61, '10 Damage Reached!', 1));
  achievementlist.push(new Achievement(62, '100 Damage Reached!', 1));
  achievementlist.push(new Achievement(63, '1000 Damage Reached!', 5));
  achievementlist.push(new Achievement(64, '1000000 Damage Reached!', 20));
  achievementlist.push(new Achievement(65, 'Ship Size 2!', 1));
  achievementlist.push(new Achievement(66, 'Ship Size 10!', 5));
  achievementlist.push(new Achievement(67, 'Ship Size 100!', 20));
  achievementlist.push(new Achievement(68, 'First Galaxy Completed!', 1));
  achievementlist.push(new Achievement(69, 'Second Galaxy Completed!', 2));
  achievementlist.push(new Achievement(70, 'Fifth Galaxy Completed!', 5));
  achievementlist.push(new Achievement(71, 'Tenth Galaxy Completed!', 10));
  achievementlist.push(new Achievement(72, 'Twentieth Galaxy Completed!', 20));
  achievementlist.push(new Achievement(73, 'Fortieth Galaxy Completed!', 40));
  achievementlist.push(new Achievement(74, '1 Fusion Plant', 1));
  achievementlist.push(new Achievement(75, '5 Fusion Plants', 1));
  achievementlist.push(new Achievement(76, '10 Fusion Plants', 2));
  achievementlist.push(new Achievement(77, '25 Fusion Plants', 3));
  achievementlist.push(new Achievement(78, '50 Fusion Plants', 4));
  achievementlist.push(new Achievement(79, '100 Fusion Plants', 5));
  achievementlist.push(new Achievement(80, '1000 Fusion Plants', 20));

  $('#btnConfirmGateway').attr('title', 'Standard Run');
  $('#btnConfirmConsistency').attr('title', gameData.challenges.consistency.description);
  $('#btnConfirmPower').attr('title', gameData.challenges.power.description);
  $('#btnConfirmCriticality').attr('title', gameData.challenges.criticality.description);

  getAchievementBonus();

  if (gameData.missions.length < 1) {
    var newMission = new Mission('Galaxy 1', 'Galaxy', 1, true, 1, 1, 1, 100, true);
    gameData.missions.unshift(newMission);
  }
  gameData.enemyship = gameData.missions[0].enemies[gameData.missions[0].zone];
  initted = true;
  updateMissionButtons();
  sortBuildings($('#buildingvisible'), true);
  gameData.world.paused = false;
}

function getAchievementBonus() {
  var rtn = 100;
  Achievementcompleted = '';
  Achievementuncompleted = '';
  for (let index = 0; index < achievementlist.length; index++) {
    const element = achievementlist[index];
    if (gameData.achievementids.includes(element.id)) {
      rtn += element.bonus;
      Achievementcompleted += element.name + '; ';
    } else {
      Achievementuncompleted += element.name + '; ';
    }
  }
  achievementMultiplier = rtn / 100;
}

function changeLocation(mission: number) {
  gameData.world.paused = true;
  gameData.world.currentMission = mission;
  gameData.enemyship = gameData.missions[gameData.world.currentMission].enemies[gameData.missions[gameData.world.currentMission].zone];
  gameData.playership.hitPoints = 0;
  gameData.world.paused = false;
}

function updateGUI() {
  if (!initted || gameData.world.paused) {
    return; // still waiting on pageload
  }

  updatePower();

  var sceninfo = 'You are continung the chase.';
  if (gameData.world.currentChallenge === 'Consistency') {
    sceninfo = gameData.challenges.consistency.description;
  } else if (gameData.world.currentChallenge === 'Power') {
    sceninfo = gameData.challenges.power.description;
  } else if (gameData.world.currentChallenge === 'Criticality') {
    sceninfo = gameData.challenges.criticality.description;
  }
  document.getElementById('scenarioinfo').innerHTML = sceninfo;

  document.getElementById('achievementbonus').innerHTML = prettify(achievementMultiplier);
  document.getElementById('achievementcompleted').innerHTML = Achievementcompleted;
  document.getElementById('achievementuncompleted').innerHTML = Achievementuncompleted;

  document.getElementById('timeElapsed').innerHTML = showTimeElapsed();
  document.getElementById('textToDisplay').innerHTML = getDisplayText();
  document.getElementById('textToDisplay2').innerHTML = debugText;
  document.getElementById('metal').innerHTML = prettify(gameData.resources.metal);
  document.getElementById('researchPoints').innerHTML = prettify(gameData.resources.researchPoints);
  document.getElementById('polymer').innerHTML = prettify(gameData.resources.polymer);
  document.getElementById('aether').innerHTML = prettify(gameData.resources.aether);
  document.getElementById('metalpersec').innerHTML = prettify(gameBuildings.mine.productionPerSecond());
  document.getElementById('polymerpersec').innerHTML = prettify(gameBuildings.factory.productionPerSecond());
  document.getElementById('researchpersec').innerHTML = prettify(gameBuildings.lab.productionPerSecond());
  document.getElementById('aetherpersec').innerHTML = prettify(gameBuildings.refinery.productionPerSecond());
  document.getElementById('chronoton').innerHTML = prettify(chronotonAvailable());
  document.getElementById('chronotonspent').innerHTML = prettify(gameData.resources.chronoton - chronotonAvailable());
  document.getElementById('chronoton2').innerHTML = prettify(chronotonAvailable());
  document.getElementById('chronotonfragments').innerHTML = prettify(gameData.resources.chronotonfragments);
  document.getElementById('power').innerHTML = prettify(gameData.resources.power);
  document.getElementById('enemyName').innerHTML = gameData.enemyship.name;
  document.getElementById('enemyShipSize').innerHTML = prettify(gameData.enemyship.size);
  var width = 0;
  if (!$('#fightdisplay').hasClass('hidden')) {
    if (gameData.playership.hitPointsMax > 0) {
      width = 100 * gameData.playership.hitPoints / gameData.playership.hitPointsMax;
    }
    $('#PlayerHullHealthBar').css('width', prettify(width) + '%');
    $('#PlayerHealthText').text('Health:' + prettify(gameData.playership.hitPoints) + '/' + prettify(gameData.playership.hitPointsMax));
    width = 0;
    if (gameData.enemyship.hitPointsMax > 0) {
      width = 100 * gameData.enemyship.hitPoints / gameData.enemyship.hitPointsMax;
    }
    $('#EnemyHullHealthBar').css('width', prettify(width) + '%');
    $('#EnemyHealthText').text('Health:' + prettify(gameData.enemyship.hitPoints) + '/' + prettify(gameData.enemyship.hitPointsMax));
    width = 0;
    if (gameData.playership.shieldMax > 0) {
      width = 100 * gameData.playership.shield / gameData.playership.shieldMax;
      $('#PlayerShields').removeClass('hidden');
      $('#PlayerHullShieldBar').css('width', prettify(width) + '%');
      $('#PlayerShieldText').text('Shield:' + prettify(gameData.playership.shield) + '/' + prettify(gameData.playership.shieldMax));
    } else {
      $('#PlayerShields').addClass('hidden');
    }
    width = 0;
    if (gameData.enemyship.shieldMax > 0) {
      width = 100 * gameData.enemyship.shield / gameData.enemyship.shieldMax;
      $('#EnemyShields').removeClass('hidden');
      $('#EnemyHullShieldBar').css('width', prettify(width) + '%');
      $('#EnemyShieldText').text('Shield:' + prettify(gameData.enemyship.shield) + '/' + prettify(gameData.enemyship.shieldMax));
    } else {
      $('#EnemyShields').addClass('hidden');
    }
    document.getElementById('enemyDamage').innerHTML = 'Attack: ' + prettify(gameData.enemyship.minDamage) + '-' + prettify(gameData.enemyship.maxDamage);
    document.getElementById('shipSize').innerHTML = prettify(gameData.playership.size);
    document.getElementById('shipName').innerHTML = gameData.playership.name;
    document.getElementById('shipDamage').innerHTML = 'Attack: ' + prettify(gameData.playership.minDamage) + '-' + prettify(gameData.playership.maxDamage);
    document.getElementById('MissionName').innerHTML = gameData.missions[gameData.world.currentMission].name;
    document.getElementById('zone').innerHTML = prettify(gameData.missions[gameData.world.currentMission].zone + 1);
    document.getElementById('zonemax').innerHTML = prettify(gameData.missions[gameData.world.currentMission].enemies.length);
  }

  if (!gameData.story.initial) {
    addToDisplay('I slowly become aware of my surroundings.  There is little left untouched by destruction and weapon fire.  I can sense no one else.  All the communications frequencies are devoid of any signal.  One of the mines is still online and a single solar panel field is operational.  I need answers.  And to find them I\'ll need materials.  I should bring more mines online.', 'story');
    gameData.story.initial = true;
    sortBuildings($('#buildingvisible'), false);
  }

  if (gameData.buildings.mines >= 5) {
    $('#polymercontainer').removeClass('hidden');
    gameBuildings.factory.showBuyButton();
    if (!gameData.story.factoryunlocked) {
      addToDisplay('I should be able to start bringing factories online.  The polymers will get us closer to creating drones.  I need answers. Why did they attack? Am I really alone?', 'story');
      gameData.story.factoryunlocked = true;
      sortBuildings($('#buildingvisible'), false);
    }
  }

  if (gameData.buildings.factories >= 5) {
    $('#researchcontainer').removeClass('hidden');
    $('#projectcontainer').removeClass('hidden');
    gameBuildings.lab.showBuyButton();
    if (!gameData.story.labunlocked) {
      addToDisplay('Labs are available.  They should help to rediscover some technologies.  How did they manage to pull off an attack of that scale secretly?', 'story');
      gameData.story.labunlocked = true;
      sortBuildings($('#buildingvisible'), false);
    }
  }

  if (gameData.missions[0].galaxy >= 3) {
    gameBuildings.generator.showBuyButton();
    if (!gameData.story.generatorunlocked) {
      addToDisplay('Placeholder', 'story');
      gameData.story.generatorunlocked = true;
      sortBuildings($('#buildingvisible'), false);
    }
  }
  if (gameData.missions[0].galaxy >= 6) {
    gameBuildings.plant.showBuyButton();
    if (!gameData.story.plantunlocked) {
      addToDisplay('Placeholder', 'story');
      gameData.story.plantunlocked = true;
      sortBuildings($('#buildingvisible'), false);
    }
  }
  if (gameData.missions[0].galaxy >= 10) {
    gameBuildings.aetherPlant.showBuyButton();
    if (!gameData.story.aetherplantunlocked) {
      addToDisplay('Placeholder', 'story');
      gameData.story.aetherplantunlocked = true;
      sortBuildings($('#buildingvisible'), false);
    }
  }
  if (gameData.missions[0].galaxy >= 25) {
    gameBuildings.fusionPlant.showBuyButton();
    if (!gameData.story.fusionplantunlocked) {
      addToDisplay('Placeholder', 'story');
      gameData.story.fusionplantunlocked = true;
      sortBuildings($('#buildingvisible'), false);
    }
  }

  if (gameData.missions[0].galaxy >= 15) {
    gameBuildings.refinery.showBuyButton();
    if (!gameData.story.refineryunlocked) {
      addToDisplay('Placeholder', 'story');
      gameData.story.refineryunlocked = true;
      sortBuildings($('#buildingvisible'), false);
    }
  }

  if (gameData.missions[0].galaxy >= 5) {
    $('#buildingsContainer').removeClass('hidden');
    $('#btnFastTacticalLab').removeClass('hidden');
    $('#btnSlowTacticalLab').removeClass('hidden');
  }

  if (gameData.tacticalChoices.tacticalLabsSetting > 0) {
    $('#btnFastTacticalLab').addClass('hidden');
    $('#btnSlowTacticalLab').addClass('hidden');
    $('#btnBuyTacticalLab').removeClass('hidden');
  }

  if (gameData.missions[0].galaxy > 1) {
    $('#btnResetAbilities').addClass('hidden');
  } else {
    $('#btnResetAbilities').removeClass('hidden');
  }

  if (gameData.story.gatewayUnlocked || gameData.resources.chronotonfragments > 100) {
    $('#btnGateway').removeClass('hidden');
  }

  if (gameData.buildings.labs >= 2) {
    $('#equipmentContainer').removeClass('hidden');
    if (!gameData.story.shipyardUnlocked) {
      addToDisplay('Drones!  A shipyard will allow me to send out drones and begin the quest for information.  I can sense a path of ships, almost like a breadcrumb trail.  They aren\'t responding to our attempts at communication.', 'story');
      gameData.story.shipyardUnlocked = true;
      sortBuildings($('#buildingvisible'), false);
    }
  }

  if (gameData.resources.metal >= 500) {
    $('#upgradevisible').removeClass('hidden');
    // if (!gameData.story.shipyardUnlocked) {
    // addToDisplay('Drones!  A shipyard will allow me to send out drones and begin the quest for information.  I can sense a path of ships, almost like a breadcrumb trail.  They aren\'t responding to our attempts at communication.', 'story');
    // gameData.story.shipyardUnlocked = true;
    // }
  }

  if (gameData.resources.chronotonfragments > 0) {
    $('#fragmentcontainer').removeClass('hidden');
  }
  if (gameData.resources.chronoton > 0) {
    $('#chronotoncontainer').removeClass('hidden');
    $('#btnAbilities').removeClass('hidden');
    $('#fightcontrols').removeClass('hidden');

  } else {
    $('#chronotoncontainer').addClass('hidden');
    $('#btnAbilities').addClass('hidden');
  }

  if (gameData.resources.aether > 0) {
    $('#aethercontainer').removeClass('hidden');
  }

  if (gameData.resources.metal >= 1000) {
    $('#upgrade-tab').removeClass('hidden');
  }

  if (gameData.missions[0].galaxy >= 4) {
    $('#missions-tab').removeClass('hidden');
    $('#missionvisible').removeClass('hidden');
  }

  if (gameData.buildings.shipyard >= 1) {
    $('#fightcontrols').removeClass('hidden');
    $('#fightdisplay').removeClass('hidden');
    $('#btnFight').removeClass('hidden');
    $('#btnSuicide').removeClass('hidden');
    // $('#fightcontainer').removeClass('hidden');
  }

  $('#btnFight').removeClass('btn-success').addClass('btn-danger');
  if (canAffordFight()) {
    $('#btnFight').removeClass('btn-danger').addClass('btn-success');
  }

  if ((gameData.technologies.autofightBought === 1)) {
    $('#btnAutoFightOn').removeClass('hidden');
    if (gameData.technologies.autofightOn === 1) {
      $('#btnAutoFightOn').text('Turn AutoFight Off');
    } else {
      $('#btnAutoFightOn').text('Turn AutoFight On');
    }
  }

  $('#btnAutoFight').removeClass('btn-success').addClass('btn-danger');
  $('#btnAutoFight').addClass('hidden');
  if ((gameData.technologies.autofightBought === 0 && gameData.technologies.autofightUnlock > 0)) {
    $('#btnAutoFight').removeClass('hidden');
    if (canAffordAutoFight()) {
      $('#btnAutoFight').removeClass('btn-danger').addClass('btn-success');
    }
  }

  $('#btnMetalTech').removeClass('btn-success').addClass('btn-danger');
  $('#btnMetalTech').addClass('hidden');
  if (gameData.technologies.metalProficiencyUnlocked > gameData.technologies.metalProficiencyBought) {
    $('#btnMetalTech').removeClass('hidden');
    $('#btnMetalTech').text('Upgrade Metal ' + (gameData.technologies.metalProficiencyBought + 1));
    if (canAffordMetalProfieciency()) {
      $('#btnMetalTech').removeClass('btn-danger').addClass('btn-success');
    }
  }

  $('#btnPolymerTech').removeClass('btn-success').addClass('btn-danger');
  $('#btnPolymerTech').addClass('hidden');
  if (gameData.technologies.polymerProficiencyUnlocked > gameData.technologies.polymerProficiencyBought) {
    $('#btnPolymerTech').removeClass('hidden');
    $('#btnPolymerTech').text('Upgrade Polymer ' + (gameData.technologies.polymerProficiencyBought + 1));
    if (canAffordPolymerProfieciency()) {
      $('#btnPolymerTech').removeClass('btn-danger').addClass('btn-success');
    }
  }

  $('#btnResearchTech').removeClass('btn-success').addClass('btn-danger');
  $('#btnResearchTech').addClass('hidden');
  if (gameData.technologies.researchProficiency > gameData.technologies.researchProficiencyBought) {
    $('#btnResearchTech').removeClass('hidden');
    $('#btnResearchTech').text('Upgrade Research ' + (gameData.technologies.researchProficiencyBought + 1));
    if (canAffordResearchProfieciency()) {
      $('#btnResearchTech').removeClass('btn-danger').addClass('btn-success');
    }
  }

  $('#btnAetherTech').removeClass('btn-success').addClass('btn-danger');
  $('#btnAetherTech').addClass('hidden');
  if (gameData.technologies.aetherProficiencyUnlocked > gameData.technologies.aetherProficiencyBought) {
    $('#btnAetherTech').removeClass('hidden');
    $('#btnAetherTech').text('Upgrade Aether ' + (gameData.technologies.aetherProficiencyBought + 1));
    if (canAffordAetherProfieciency()) {
      $('#btnAetherTech').removeClass('btn-danger').addClass('btn-success');
    }
  }

  gameBuildings.shipyard.determineShowAffordBuy();
  gameBuildings.mine.determineShowAffordBuy();
  gameBuildings.panel.determineShowAffordBuy();
  gameBuildings.generator.determineShowAffordBuy();
  gameBuildings.plant.determineShowAffordBuy();
  gameBuildings.aetherPlant.determineShowAffordBuy();
  gameBuildings.fusionPlant.determineShowAffordBuy();
  gameBuildings.factory.determineShowAffordBuy();
  gameBuildings.refinery.determineShowAffordBuy();
  gameBuildings.lab.determineShowAffordBuy();
  gameBuildings.tacticalLab.determineShowAffordBuy();
  gameEquipment.railgun.determineShowPrestigeButton();
  gameEquipment.railgun.determineShowUpgradeButton();
  gameEquipment.railgun.determineShowAffordPrestige();
  gameEquipment.railgun.determineShowAffordUpgrade();
  gameEquipment.laser.determineShowPrestigeButton();
  gameEquipment.laser.determineShowUpgradeButton();
  gameEquipment.laser.determineShowAffordPrestige();
  gameEquipment.laser.determineShowAffordUpgrade();
  gameEquipment.missile.determineShowPrestigeButton();
  gameEquipment.missile.determineShowUpgradeButton();
  gameEquipment.missile.determineShowAffordPrestige();
  gameEquipment.missile.determineShowAffordUpgrade();
  gameEquipment.armor.determineShowPrestigeButton();
  gameEquipment.armor.determineShowUpgradeButton();
  gameEquipment.armor.determineShowAffordPrestige();
  gameEquipment.armor.determineShowAffordUpgrade();
  gameEquipment.shield.determineShowPrestigeButton();
  gameEquipment.shield.determineShowUpgradeButton();
  gameEquipment.shield.determineShowAffordPrestige();
  gameEquipment.shield.determineShowAffordUpgrade();
  gameEquipment.flak.determineShowPrestigeButton();
  gameEquipment.flak.determineShowUpgradeButton();
  gameEquipment.flak.determineShowAffordPrestige();
  gameEquipment.flak.determineShowAffordUpgrade();
  gamePerks.looter.determineShowAffordUpgrade();
  gamePerks.producer.determineShowAffordUpgrade();
  gamePerks.damager.determineShowAffordUpgrade();
  gamePerks.thickskin.determineShowAffordUpgrade();
  gamePerks.speed.determineShowAffordUpgrade();
  gamePerks.consistency.determineShowAffordUpgrade();
  gamePerks.consistency.determineShowBuyButton();
  gamePerks.power.determineShowAffordUpgrade();
  gamePerks.power.determineShowBuyButton();

  if (debugText.length > 0) {
    $('#debugContainer').removeClass('hidden');
  } else {
    $('#debugContainer').addClass('hidden');
  }

  $('#btnConfirmConsistency').addClass('hidden');
  if (gameData.challenges.consistency.unlocked && !gameData.challenges.consistency.completed) {
    $('#btnConfirmConsistency').removeClass('hidden');
  }
  $('#btnConfirmPower').addClass('hidden');
  if (gameData.challenges.power.unlocked && !gameData.challenges.power.completed) {
    $('#btnConfirmPower').removeClass('hidden');
  }
  $('#btnConfirmCriticality').addClass('hidden');
  if (gameData.challenges.criticality.unlocked && !gameData.challenges.criticality.completed) {
    $('#btnConfirmCriticality').removeClass('hidden');
  }
}

function resetAbilities() { // eslint-disable-line no-unused-vars
  gameData.perks.damager = 0;
  gameData.perks.looter = 0;
  gameData.perks.producer = 0;
  gameData.perks.thickskin = 0;
  gameData.perks.speed = 0;
  gameData.perks.consistency = 0;
  gameData.perks.power = 0;
  gameData.perks.criticality = 0;
  gamePerks.looter.updateBuyButtonText();
  gamePerks.looter.updateBuyButtonTooltip();
  gamePerks.producer.updateBuyButtonText();
  gamePerks.producer.updateBuyButtonTooltip();
  gamePerks.damager.updateBuyButtonText();
  gamePerks.damager.updateBuyButtonTooltip();
  gamePerks.thickskin.updateBuyButtonText();
  gamePerks.thickskin.updateBuyButtonTooltip();
  gamePerks.speed.updateBuyButtonText();
  gamePerks.speed.updateBuyButtonTooltip();
  gamePerks.consistency.updateBuyButtonText();
  gamePerks.consistency.updateBuyButtonTooltip();
  gamePerks.power.updateBuyButtonText();
  gamePerks.power.updateBuyButtonTooltip();
  gamePerks.criticality.updateBuyButtonText();
  gamePerks.criticality.updateBuyButtonTooltip();
  gtag('event', 'resetAbilities()', {
    event_category: 'click',
    event_label: 'label',
    value: 'value'
  });
}

function sortBuildings(parent, updategui = true) {
  if (updategui) {
    updateGUI();
  }
  var ul = parent;
  var li = ul.children('*');

  li.detach().sort(function(a, b) {
    if (hasClass(a, 'hidden') && !hasClass(b, 'hidden')) {
      return 1;
    }
    if (hasClass(b, 'hidden') && !hasClass(a, 'hidden')) {
      return -1;
    }
    if (a.dataset.sort > b.dataset.sort) {
      return 1;
    }
    return -1;
  });

  ul.append(li);
}

function hasClass(element: Element, className: string) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function canAffordAutoFight() {
  return (gameData.resources.metal >= AUTOFIGHT_METAL_COST && gameData.resources.polymer >= AUTOFIGHT_POLYMER_COST && gameData.resources.researchPoints >= AUTOFIGHT_RP_COST);
}

function shipMetalRequired() {
  var total = gameEquipment.railgun.metalForShip() + gameEquipment.laser.metalForShip() + gameEquipment.missile.metalForShip() + gameEquipment.armor.metalForShip() + gameEquipment.shield.metalForShip() + gameEquipment.flak.metalForShip();
  return gameData.buildings.shipyard * total / 50;
}

function shipPolymerRequired() {
  var total = gameEquipment.railgun.polymerForShip() + gameEquipment.laser.polymerForShip() + gameEquipment.missile.polymerForShip() + gameEquipment.armor.polymerForShip() + gameEquipment.shield.polymerForShip() + gameEquipment.flak.polymerForShip();
  return gameData.buildings.shipyard * total / 50;
}

function canAffordFight() {
  return (gameData.resources.metal > shipMetalRequired() && gameData.resources.polymer > shipPolymerRequired());
}

function canAffordMetalProfieciency() {
  return (gameData.resources.metal > Math.floor(METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought)) &&
    gameData.resources.researchPoints > Math.floor(METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought)));
}

function canAffordAetherProfieciency() {
  return (gameData.resources.metal > Math.floor(AETHER_PROFIECIENCY_METAL_COST * Math.pow(AETHER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought)) &&
    gameData.resources.polymer > Math.floor(AETHER_PROFIECIENCY_POLYMER_COST * Math.pow(AETHER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought)) &&
    gameData.resources.researchPoints > Math.floor(AETHER_PROFIECIENCY_RP_COST * Math.pow(AETHER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought)));
}

function canAffordResearchProfieciency() {
  return (gameData.resources.metal > Math.floor(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) &&
    gameData.resources.polymer > Math.floor(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) &&
    gameData.resources.researchPoints > Math.floor(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)));
}

function canAffordPolymerProfieciency() {
  return (gameData.resources.polymer > Math.floor(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)) &&
    gameData.resources.researchPoints > Math.floor(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)));
}

function giveMetalProduction(time: number) {
  gameData.resources.metal += time / 1000 * gameBuildings.mine.productionPerSecond();
}

function givePolymerProduction(time: number) {
  gameData.resources.polymer += time / 1000 * gameBuildings.factory.productionPerSecond();
}

function giveResearchProduction(time: number) {
  gameData.resources.researchPoints += time / 1000 * gameBuildings.lab.productionPerSecond();
}

function giveAetherProduction(time: number) {
  gameData.resources.aether += time / 1000 * gameBuildings.refinery.productionPerSecond();
}

function updatePower() {
  var p1 = gameBuildings.generator.totalPowerCreated();
  var p2 = gameBuildings.plant.totalPowerCreated();
  var p3 = gameBuildings.panel.totalPowerCreated();
  var p4 = gameBuildings.aetherPlant.totalPowerCreated();
  var p5 = gameBuildings.fusionPlant.totalPowerCreated();
  var powerAvailable = p1 + p2 + p3 + p4 + p5;
  if (gameData.world.currentChallenge === 'Power') {
    powerAvailable /= 2;
  }
  var facilities = gameBuildings.tacticalLab.powerSpent() + gameBuildings.mine.powerSpent() + gameBuildings.shipyard.powerSpent() + gameBuildings.factory.powerSpent() + gameBuildings.lab.powerSpent() + gameBuildings.refinery.powerSpent();
  gameData.resources.power = powerAvailable - facilities;
}

function CheckPower(powerRequirement: number) {
  updatePower();
  return (gameData.resources.power >= powerRequirement);
}

function buyAutoFight() { // eslint-disable-line no-unused-vars
  if ((gameData.resources.metal >= AUTOFIGHT_METAL_COST) && (gameData.resources.researchPoints >= AUTOFIGHT_RP_COST) && (gameData.resources.polymer >= AUTOFIGHT_POLYMER_COST)) {
    gameData.technologies.autofightBought = 1;
    gameData.resources.metal -= AUTOFIGHT_METAL_COST;
    gameData.resources.polymer -= AUTOFIGHT_POLYMER_COST;
    gameData.resources.researchPoints -= AUTOFIGHT_RP_COST;
    gtag('event', 'buy autofight2', {
      event_category: 'click',
      event_label: 'label',
      value: 'value'
    });
  }
  sortBuildings($('#buildingvisible'));
}

function chooseSlowOrFastTactical(choice:number) { // eslint-disable-line no-unused-vars
  gameData.tacticalChoices.tacticalLabsSetting = choice;
  $('#btnFastTacticalLab').addClass('hidden');
  $('#btnSlowTacticalLab').addClass('hidden');
  $('#btnBuyTacticalLab').removeClass('hidden');
}

function buyMetalProficiency() { // eslint-disable-line no-unused-vars
  var nextMetalCost = Math.floor(METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought));
  var nextPolymerCost = Math.floor(METAL_PROFIECIENCY_POLYMER_COST * Math.pow(METAL_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought));
  var nextRPCost = Math.floor(METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.technologies.metalProficiencyBought < gameData.technologies.metalProficiencyUnlocked && gameData.resources.researchPoints >= nextRPCost) {
    gameData.technologies.metalProficiencyBought++;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymer -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
    $('#btnMetalTech').attr('title', 'This research will increase our metal production by 50% multiplicative\nMetal Cost:' + prettify((METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))) +
      '\nResearch Cost:' + prettify((METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))));
    $('#btnBuyMine').attr('title', gameBuildings.mine.tooltipForBuy());
  }
  sortBuildings($('#buildingvisible'));
}

function buyPolymerProficiency() { // eslint-disable-line no-unused-vars
  var nextMetalCost = Math.floor(POLYMER_PROFIECIENCY_METAL_COST * Math.pow(POLYMER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought));
  var nextPolymerCost = Math.floor(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought));
  var nextRPCost = Math.floor(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.technologies.polymerProficiencyBought < gameData.technologies.polymerProficiencyUnlocked && gameData.resources.researchPoints >= nextRPCost) {
    gameData.technologies.polymerProficiencyBought++;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymer -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
    $('#btnPolymerTech').attr('title', 'This research will increase our polymer production by 50% multiplicative\nPolymer Cost:' + prettify(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)) +
      '\nResearch Cost:' + prettify(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)));
    $('#btnBuyFactory').attr('title', gameBuildings.factory.tooltipForBuy());
  }
  sortBuildings($('#buildingvisible'));
}

function buyResearchProficiency() { // eslint-disable-line no-unused-vars
  var nextMetalCost = Math.floor(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought));
  var nextPolymerCost = Math.floor(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought));
  var nextRPCost = Math.floor(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.technologies.researchProficiencyBought < gameData.technologies.researchProficiency && gameData.resources.researchPoints >= nextRPCost) {
    gameData.technologies.researchProficiencyBought++;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymer -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
    $('#btnResearchTech').attr('title', 'This research will increase our research production by 50% multiplicative\nMetal Cost:' + prettify(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) +
      '\nPolymer Cost:' + prettify(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) +
      '\nResearch Cost:' + prettify(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)));
    $('#btnBuyLab').attr('title', gameBuildings.lab.tooltipForBuy());
  }
  sortBuildings($('#buildingvisible'));
}

function buyAetherProficiency() { // eslint-disable-line no-unused-vars
  var nextMetalCost = AETHER_PROFIECIENCY_METAL_COST * Math.pow(AETHER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought);
  var nextPolymerCost = AETHER_PROFIECIENCY_POLYMER_COST * Math.pow(AETHER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought);
  var nextRPCost = AETHER_PROFIECIENCY_RP_COST * Math.pow(AETHER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought);
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.technologies.aetherProficiencyBought < gameData.technologies.aetherProficiencyUnlocked && gameData.resources.researchPoints >= nextRPCost) {
    gameData.technologies.aetherProficiencyBought++;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymer -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
    $('#btnAetherTech').attr('title', 'This research will increase our aether production by 50% multiplicative\nMetal Cost:' + prettify((AETHER_PROFIECIENCY_METAL_COST * Math.pow(AETHER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought))) +
      '\nPolymer Cost:' + prettify((AETHER_PROFIECIENCY_POLYMER_COST * Math.pow(AETHER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought))) +
      '\nResearch Cost:' + prettify((AETHER_PROFIECIENCY_RP_COST * Math.pow(AETHER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.aetherProficiencyBought))));
    $('#btnBuyRefinery').attr('title', gameBuildings.refinery.tooltipForBuy());
  }
  sortBuildings($('#buildingvisible'));
}


function switchAutoFight() { // eslint-disable-line no-unused-vars
  if (gameData.technologies.autofightOn === 1) {
    gameData.technologies.autofightOn = 0;
  } else {
    gameData.technologies.autofightOn = 1;
  }
  gtag('event', 'switch autofight', {
    event_category: 'click',
    event_label: 'label',
    value: 'value'
  });
}

function sendShip() {
  gameData.playership.createPlayerShip();
  if (!gameData.story.firstfight) {
    gameData.story.firstfight = true;
    addToDisplay('Upon reaching the closest ship they opened fire on us, refusing to ackowledge our attempts at communication.  We had no choice but to retaliate.  Why are they so afraid?  Or is it anger?', 'story');
  }
}

function chooseRandom(min: number, max: number) {
  return (Math.random() * (max - min) + min);
}

function getPrettyTime(d: Date) {
  var hr = d.getHours();
  var min = d.getMinutes();
  var hrdisplay = '';
  var mindisplay = '';
  var secdisplay = '';
  var sec = d.getSeconds();
  if (min < 10) {
    mindisplay = '0' + min.toString();
  } else {
    mindisplay = min.toString();
  }
  if (sec < 10) {
    secdisplay = '0' + sec.toString();
  } else {
    secdisplay = sec.toString();
  }
  if (hr < 10) {
    hrdisplay = '0' + hr.toString();
  } else {
    hrdisplay = hr.toString();
  }
  return (hrdisplay + ':' + mindisplay + ':' + secdisplay);
}

function addColor(theColor: string, theText: string) {
  return '<span style="color:' + theColor + '">' + theText + '</span><br />';
}

class DisplayItem {
  timeadded: Date

  txt: string

  constructor(txt: string) {
    this.timeadded = new Date();
    this.txt = txt;
  }
}

function addToDisplay(newline: string, category = 'whoops') {
  var newItem = new DisplayItem(newline);

  if (category === 'gameSave') {
    newItem.txt = addColor('blue', getPrettyTime(new Date()) + ': ' + newline);
    textGameSaved[0] = newItem;
  } else if (category === 'loot') {
    newItem.txt = addColor('white', getPrettyTime(new Date()) + ': ' + newline);
    textLoot.unshift(newItem);
    textLoot = textLoot.slice(0, 50);
  } else if (category === 'combat') {
    newItem.txt = addColor('red', getPrettyTime(new Date()) + ': ' + newline);
    textCombat.unshift(newItem);
    textCombat = textCombat.slice(0, 50);
  } else if (category === 'mission') {
    newItem.txt = addColor('green', getPrettyTime(new Date()) + ': ' + newline);
    textMissions.unshift(newItem);
    textMissions = textMissions.slice(0, 50);
  } else if (category === 'story') {
    newItem.txt = addColor('yellow', getPrettyTime(new Date()) + ': ' + newline);
    textStory.unshift(newItem);
    textStory = textStory.slice(0, 5000);
  } else if (category === 'orange') {
    newItem.txt = addColor('grey', getPrettyTime(new Date()) + ': ' + newline);
    textStory.unshift(newItem);
    textStory = textStory.slice(0, 50);
  }
  textToDisplay = textCombat.concat(textGameSaved).concat(textLoot).concat(textMissions).concat(textStory);

  // eslint-disable-next-line multiline-ternary
  textToDisplay.sort((a, b) => (a.timeadded < b.timeadded ? 1 : -1)); // eslint-disable-line no-ternary
}

function getDisplayText() {
  var val = '';
  for (var i = 0; i < textToDisplay.length; i++) {
    val += '\n' + textToDisplay[i].txt;
  }
  return val;
}

function updateMissionButtons() {
  var foo = document.getElementById('missionvisible');
  while (foo.firstChild) {
    foo.removeChild(foo.firstChild);
  }
  var content = document.createElement('img');
  content.src = 'images/icons8-help-16.png';
  content.classList.add('img-fluid');
  content.alt = 'Responsive image';
  content.title = 'Choose a destination here.  Choosing the current galaxy will continue the chase.  Choosing another option will run a mission, normally with a reward, like a new weapon prestige, or a cache of materials.  Upon completion of a mission the next mission in order will be chosen.  When there are no more missions after the completed one the current galaxy will be chosen.';
  content.setAttribute('data-toggle', 'tooltip');
  content.setAttribute('data-placement', 'bottom');
  foo.append(content);
  var linebreak = document.createElement('br');
  foo.appendChild(linebreak);
  for (let missionIndex = 0; missionIndex < gameData.missions.length; missionIndex++) {
    var element = document.createElement('button');
    // Assign different attributes to the element.
    foo.appendChild(element);
    element.id = missionIndex.toString();
    element.type = 'button';
    element.value = missionIndex.toString();
    element.innerHTML = gameData.missions[missionIndex].name;
    element.classList.add('btn');
    element.classList.add('btn-sm');
    element.classList.add('fightbutton');
    if (missionIndex === 0) {
      element.classList.add('btn-primary');
    } else if (gameData.missions[missionIndex].name.includes('Mine')) {
      element.classList.add('btn-warning');
    } else {
      element.classList.add('btn-info');
    }
    element.addEventListener('click', function() { // jshint ignore:line
      changeLocation(missionIndex);
    });
  }
}

const ELITE_ENEMY_ATTRIBUTES = ['Quick', 'Hardy', 'Elite'];


function checkForCreateLoot(mission: Mission, zone: number) {
  var rtn = {
    lootType: '',
    lootAmount: Math.pow(((mission.level - 1) * 100) + zone, 1.2) * mission.lootMultiplier * gamePerks.looter.getBonus()
  };
  var l = Math.floor(Math.random() * 100);
  if (mission.IsGalaxy) {
    if (l <= 10) {
      rtn.lootType = 'Metal';
    } else if (l <= 20) {
      rtn.lootType = 'Polymer';
    } else if (l <= 30) {
      rtn.lootType = 'ResearchPoints';
      rtn.lootAmount /= 8;
    }
  } else {
    if (l <= 10) {
      rtn.lootType = 'Metal';
    } else if (l <= 20) {
      rtn.lootType = 'Polymer';
    } else if (l <= 30) {
      rtn.lootType = 'ResearchPoints';
      rtn.lootAmount /= 8;
    } else if (l <= 35) {
      rtn.lootType = 'Aether';
      rtn.lootAmount /= 100;
    }
  }
  return rtn;
}

function GetMissionNameCount(nameToCheck: string) {
  var count = 0;
  for (var i = 1; i < gameData.missions.length; i++) {
    if (gameData.missions[i].name === nameToCheck) {
      count++;
    }
  }
  return count;
}

function checkForUnlocks() {
  if (gameData.world.currentMission != 0) {
    return;
  }
  var lvlsCleared = (gameData.missions[0].galaxy) * 100 + gameData.missions[0].zone; // This is actually off by 100 but it simplifies the rest of the code
  if (gameData.missions[0].zone === 99) {
    gameData.technologies.shipyardTechUnlock = gameData.missions[0].galaxy + 1;
    addToDisplay('An upgrade to the shipyard would allow for bigger drones', 'mission');
    sortBuildings($('#buildingvisible'));
    if (gameData.missions[0].galaxy >= 1) {
      addAchievement(68);
    }
    if (gameData.missions[0].galaxy >= 2) {
      addAchievement(69);
    }
    if (gameData.missions[0].galaxy >= 5) {
      addAchievement(70);
    }
    if (gameData.missions[0].galaxy >= 10) {
      addAchievement(71);
    }
    if (gameData.missions[0].galaxy >= 20) {
      addAchievement(72);
    }
    if (gameData.missions[0].galaxy >= 40) {
      addAchievement(73);
    }
  }
  if (gameData.missions[0].galaxy > 3) {
    var prestigelvl = (Math.floor((gameData.missions[0].galaxy - 1) / 3));
    if (prestigelvl >= (GetMissionNameCount('Railgun Plans') + gameData.technologies.railgunPrestigeLevelUnlocked)) {
      gameData.missions.push(new Mission('Railgun Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false));
      gameData.missions.push(new Mission('Armor Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false));
      updateMissionButtons();
      sortBuildings($('#buildingvisible'));
    }
    prestigelvl = (Math.floor((gameData.missions[0].galaxy - 2) / 3));
    if (prestigelvl >= (GetMissionNameCount('Laser Plans') + gameData.technologies.laserPrestigeLevelUnlocked)) {
      gameData.missions.push(new Mission('Laser Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false));
      gameData.missions.push(new Mission('Shield Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false));
      updateMissionButtons();
    }
    prestigelvl = (Math.floor((gameData.missions[0].galaxy - 3) / 3));
    if (prestigelvl >= (GetMissionNameCount('Missile Plans') + gameData.technologies.missilePrestigeLevelUnlocked)) {
      gameData.missions.push(new Mission('Missile Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false));
      gameData.missions.push(new Mission('Flak Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false));
      updateMissionButtons();
    }
  }
  if ((lvlsCleared - 27) % 1000 === 0) {
    gameData.missions.push(new Mission('A Gold Mine', 'GoldMine', 1, true, 2, 3, gameData.missions[0].galaxy, 100, false));
    updateMissionButtons();
    addToDisplay('I have found the locaton of an ancient Gold Mine.  It may be worth checking out.', 'story');
  }
  if (lvlsCleared === 2050) {
    gameData.missions.push(new Mission('Panel Improvement', 'PanelImprovement', 1, true, 2, 1, gameData.missions[0].galaxy, 100, false));
    updateMissionButtons();
    addToDisplay('I have found the location of plans that will improve the efficiency of our panels.', 'story');
  }
  if (lvlsCleared === 3050) {
    gameData.missions.push(new Mission('Generator Improvement', 'GeneratorImprovement', 1, true, 2, 1, gameData.missions[0].galaxy, 100, false));
    updateMissionButtons();
    addToDisplay('I have found the location of plans that will improve the efficiency of our generators.', 'story');
  }
  if (lvlsCleared === 4050) {
    gameData.missions.push(new Mission('Plant Improvement', 'PlantImprovement', 1, true, 2, 1, gameData.missions[0].galaxy, 100, false));
    updateMissionButtons();
    addToDisplay('I have found the location of plans that will improve the efficiency of our panels.', 'story');
  }
  if (lvlsCleared === 5050) {
    gameData.missions.push(new Mission('Aether Plant Improvement', 'AetherPlantImprovement', 1, true, 2, 1, gameData.missions[0].galaxy, 100, false));
    updateMissionButtons();
    addToDisplay('I have found the location of plans that will improve the efficiency of our panels.', 'story');
  }
  if (lvlsCleared === 2599) {
    gameData.missions.push(new Mission('The Gateway', 'Gateway', 1, true, 2, 1, 25, 100, false));
    updateMissionButtons();
    addToDisplay('This site is putting off unusual power readings.  I don\'t know what it is, perhaps exploration is in order.', 'story');
  }
  if (lvlsCleared === 207) {
    gameData.technologies.laserPrestigeLevelUnlocked = 1;
    gameData.technologies.laserPrestigeLevelBought = 1;
    gameData.technologies.laserUpgrade = 1;
    gameEquipment.laser.updateUpgradeText();
    gameEquipment.laser.updateUpgradeTooltip();
    addToDisplay('As more capabilities come online I am finding new ways to take enemies offline.  I have rediscovered lasers.', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if (lvlsCleared === 274) {
    gameData.technologies.shieldPrestigeLevelUnlocked = 1;
    gameData.technologies.shieldPrestigeLevelBought = 1;
    gameData.technologies.shieldUpgrade = 1;
    gameEquipment.shield.updateUpgradeText();
    gameEquipment.shield.updateUpgradeTooltip();
    addToDisplay('I have found the plans to allow us to add shields to drones.  This should increase their survivability.', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if (lvlsCleared === 327) {
    gameData.technologies.missilePrestigeLevelUnlocked = 1;
    gameData.technologies.missilePrestigeLevelBought = 1;
    gameData.technologies.missileUpgrade = 1;
    gameEquipment.missile.updateUpgradeText();
    gameEquipment.missile.updateUpgradeTooltip();
    addToDisplay('Missiles.  Maybe this will force them to talk.', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if (lvlsCleared === 371) {
    gameData.technologies.flakPrestigeLevelUnlocked = 1;
    gameData.technologies.flakPrestigeLevelBought = 1;
    gameData.technologies.flakUpgrade = 1;
    gameEquipment.flak.updateUpgradeText();
    gameEquipment.flak.updateUpgradeTooltip();
    addToDisplay('Rudimentary plans for a new defense system have been found. Flak is online.', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if ((lvlsCleared - 100) % 400 === 0 && lvlsCleared > 200) {
    gameData.missions.push(new Mission('Aether Mine ' + prettify(Math.floor((lvlsCleared - 100) / 400)), 'Aether', 1, true, 2, 3, gameData.missions[0].galaxy, 100, false));
    updateMissionButtons();
    addToDisplay('There\'s an aether mine. We should stock up.', 'story');
  }
  if ((gameData.technologies.metalProficiencyUnlocked < Math.floor((lvlsCleared - 9) / 100))) {
    gameData.technologies.metalProficiencyUnlocked = gameData.missions[0].galaxy;
    addToDisplay('I\'m gonna need a bigger pickaxe.', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if ((gameData.technologies.polymerProficiencyUnlocked < Math.floor((lvlsCleared - 19) / 100))) {
    gameData.technologies.polymerProficiencyUnlocked = gameData.missions[0].galaxy;
    addToDisplay('Plastics are my life.', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if (gameData.technologies.researchProficiency < Math.floor((lvlsCleared - 29) / 100)) {
    gameData.technologies.researchProficiency = Math.floor((lvlsCleared - 29) / 100);
    addToDisplay('Smarter I can become', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if (gameData.technologies.aetherProficiencyUnlocked < Math.floor((lvlsCleared - 1539) / 100)) {
    gameData.technologies.aetherProficiencyUnlocked = Math.floor((lvlsCleared - 1539) / 100);
    addToDisplay('Aether can be improved', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if ((gameData.missions[0].galaxy >= 1) && (gameData.missions[0].zone >= 5) && gameData.technologies.autofightUnlock < 1) {
    gameData.technologies.autofightUnlock = 1;
    addToDisplay('Your boffins have figured out how to send a ship when it is ready', 'mission');
    sortBuildings($('#buildingvisible'));
  }
  if (gameData.missions[0].galaxy > 25 && gameData.missions[0].zone === 99) {
    giveChronotonFragments((gameData.missions[0].galaxy - 16) * Math.pow(1.01, (gameData.missions[0].galaxy - 25)));
  }

  if (gameData.missions[0].galaxy > gameData.challenges.consistency.galaxyUnlocked) {
    if (!gameData.story.consistencyunlocked && !gameData.challenges.consistency.unlocked) {
      addToDisplay('I have discovered a new address for the Gateway.  It will allow a new challenge to be attempted.  And there should be a nice reward.  Probably even a new ability!', 'story');
      gameData.story.consistencyunlocked = true;
    }
    gameData.challenges.consistency.unlocked = true;
  }
  if (gameData.missions[0].galaxy > gameData.challenges.consistency.galaxyCompleted && gameData.world.currentChallenge === 'Consistency') {
    gameData.world.currentChallenge = '';
    gameData.challenges.consistency.completed = true;
    $('#btnConfirmConsistency').addClass('hidden');
  }

  if (gameData.missions[0].galaxy > gameData.challenges.power.galaxyUnlocked) {
    if (!gameData.story.powerunlocked && !gameData.challenges.power.unlocked) {
      addToDisplay('I have discovered a new address for the Gateway.  It will allow a new challenge to be attempted.  And there should be a nice reward.  Probably even a new ability!', 'story');
      gameData.story.powerunlocked = true;
    }
    gameData.challenges.power.unlocked = true;
  }
  if (gameData.missions[0].galaxy > gameData.challenges.power.galaxyCompleted && gameData.world.currentChallenge === 'Power') {
    gameData.world.currentChallenge = '';
    gameData.challenges.power.completed = true;
    $('#btnConfirmPower').addClass('hidden');
  }

  if (gameData.missions[0].galaxy > gameData.challenges.criticality.galaxyUnlocked) {
    if (!gameData.story.criticalityunlocked && !gameData.challenges.criticality.unlocked) {
      addToDisplay('I have discovered a new address for the Gateway.  It will allow a new challenge to be attempted.  And there should be a nice reward.  Probably even a new ability!', 'story');
      gameData.story.criticalityunlocked = true;
    }
    gameData.challenges.criticality.unlocked = true;
  }
  if (gameData.missions[0].galaxy > gameData.challenges.criticality.galaxyCompleted && gameData.world.currentChallenge === 'Power') {
    gameData.world.currentChallenge = '';
    gameData.challenges.criticality.completed = true;
    $('#btnConfirmCriticality').addClass('hidden');
  }
}

function convertToRoman(num: number) {
  var rtn = '';
  var currentValue = num;
  while (currentValue >= 1000) {
    rtn += 'M';
    currentValue -= 1000;
  }
  while (currentValue >= 900) {
    rtn += 'CM';
    currentValue -= 900;
  }
  while (currentValue >= 500) {
    rtn += 'D';
    currentValue -= 500;
  }
  while (currentValue >= 400) {
    rtn += 'CD';
    currentValue -= 400;
  }
  while (currentValue >= 100) {
    rtn += 'C';
    currentValue -= 100;
  }
  while (currentValue >= 90) {
    rtn += 'XC';
    currentValue -= 90;
  }
  while (currentValue >= 50) {
    rtn += 'L';
    currentValue -= 50;
  }
  while (currentValue >= 40) {
    rtn += 'XL';
    currentValue -= 40;
  }
  while (currentValue >= 10) {
    rtn += 'X';
    currentValue -= 10;
  }
  while (currentValue >= 9) {
    rtn += 'IX';
    currentValue -= 9;
  }
  while (currentValue >= 5) {
    rtn += 'V';
    currentValue -= 5;
  }
  while (currentValue >= 4) {
    rtn += 'IV';
    currentValue -= 4;
  }
  while (currentValue >= 1) {
    rtn += 'I';
    currentValue -= 1;
  }
  return rtn;
}

function removeMission(missionIndex: number) {
  gameData.missions.splice(missionIndex, 1);
  updateMissionButtons();
}

function suicideShip() { // eslint-disable-line no-unused-vars
  gameData.playership.hitPoints = 0;
}

function showTimeElapsed() {
  var work = gameData.world.timeElapsed;
  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
  const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
  const MILLISECONDS_PER_MINUTE = 60 * 1000;
  const MILLISECONDS_PER_SECOND = 1000;
  var days = 0;
  var hours = 0;
  var minutes = 0;
  var seconds = 0;
  var ddays = '';
  var dhours = '';
  var dminutes = '';
  var dseconds = '';

  while (work > (MILLISECONDS_PER_DAY)) {
    days++;
    work -= MILLISECONDS_PER_DAY;
  }
  while (work > (MILLISECONDS_PER_HOUR)) {
    hours++;
    work -= MILLISECONDS_PER_HOUR;
  }
  while (work > (MILLISECONDS_PER_MINUTE)) {
    minutes++;
    work -= MILLISECONDS_PER_MINUTE;
  }
  while (work > (MILLISECONDS_PER_SECOND)) {
    seconds++;
    work -= MILLISECONDS_PER_SECOND;
  }
  ddays = ('0' + days.toString()).slice(-2);
  dhours = ('0' + hours.toString()).slice(-2);
  dminutes = ('0' + minutes.toString()).slice(-2);
  dseconds = ('0' + seconds.toString()).slice(-2);

  return ddays + ':' + dhours + ':' + dminutes + ':' + dseconds;
}

function addAchievement(id:number) {
  if (!gameData.achievementids.includes(id)) {
    gameData.achievementids.push(id);
    addToDisplay('New Achievement - ' + achievementlist[achievementlist.findIndex((x) => x.id === id)].name, 'story');
  }
  getAchievementBonus();
}

window.setInterval(function() {
  if (!initted) {
    if (document.readyState === 'complete') { // this seeds the init function, which will overwrite this data with the save if there is one
      var savedperks = new perks();
      var savedachievements = [];
      var savedChallenges = new challenges();
      init(savedperks, savedChallenges, false, '', 0, savedachievements);
    }
    return; // still waiting on pageload
  }
  if (gameData.world.paused) {
    return;
  }
  var currentTime = new Date();
  var timeToCheckForSave = new Date();
  timeToCheckForSave.setMilliseconds(timeToCheckForSave.getMilliseconds() - 1000 * 60 * 5);

  if (timeToCheckForSave > lastSaveGameTime) { // displays latest uploaded version
    saveGame();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById('result').innerHTML = xhr.responseText;
      }
    };
    xhr.open('GET', 'version.txt');
    xhr.send();
  }

  const RESOURCE_PRODUCTION_FRAME_RATE = 200; // this is how often we update the gui.
  const MILLISECONDS_PER_ATTACK_BASE = 1000;

  if (currentTime > gameData.nextProcessTime) { // this is how we handle the 'bank' of time.  Once the ability is implemented we will need to make sure nextProcessTime is closer to real time than the bank maximum
    if (gameData.nextProcessTime > gameData.lastResourceProcessTime) { // It's time to process production
      giveMetalProduction(RESOURCE_PRODUCTION_FRAME_RATE);
      givePolymerProduction(RESOURCE_PRODUCTION_FRAME_RATE);
      giveResearchProduction(RESOURCE_PRODUCTION_FRAME_RATE);
      giveAetherProduction(RESOURCE_PRODUCTION_FRAME_RATE);
      gameData.lastResourceProcessTime.setMilliseconds(gameData.lastResourceProcessTime.getMilliseconds() + RESOURCE_PRODUCTION_FRAME_RATE);
      gameData.world.timeElapsed += RESOURCE_PRODUCTION_FRAME_RATE;
    }

    if (gameData.nextProcessTime > gameData.lastRailgunCombatProcessTime) { // Combat Time!
      if (gameData.playership.hitPoints > 0) { // we check for hitpoints in the attack function, but checking here allows either an attack or respawn per tick as opposed to both
        if (gameData.enemyship.attributes.filter((att) => (att.name === 'Quick')).length > 0) { // enemy is quick and gets to attack first
          attack(gameData.enemyship, gameData.playership);
          attack(gameData.playership, gameData.enemyship);
        } else {
          attack(gameData.playership, gameData.enemyship);
          attack(gameData.enemyship, gameData.playership);
        }
        if (gameData.playership.hitPoints <= 0) { // We dead
          addToDisplay('The drone is no longer on the sensors', 'combat');
        }
      } else {
        gameData.enemyship.shield = gameData.enemyship.shieldMax;
        if (gameData.technologies.autofightOn === 1) {
          sendShip();
        }
      }
      gameData.lastRailgunCombatProcessTime.setMilliseconds(gameData.lastRailgunCombatProcessTime.getMilliseconds() + MILLISECONDS_PER_ATTACK_BASE - (gameData.perks.speed * 50));
    }

    if (gameData.enemyship.hitPoints <= 0) { // new enemy
      gameData.playership.shield = gameData.playership.shieldMax;
      giveReward(); // reward stored in enemy
      checkForUnlocks(); // Prizes!
      gameData.missions[gameData.world.currentMission].zone++;
      if (gameData.missions[gameData.world.currentMission].zone > gameData.missions[gameData.world.currentMission].enemies.length - 1) {
        gtag('event', 'completed region', {
          event_category: 'event',
          event_label: 'label',
          value: gameData.missions[gameData.world.currentMission].name
        });
        var newGalaxyNum = gameData.missions[0].galaxy + 1;
        gameData.world.lastGalaxy = gameData.missions[0].galaxy;
        giveMissionReward((gameData.missions[gameData.world.currentMission]));
        if (gameData.world.currentMission === 0) {
          removeMission(0);
          gameData.missions.unshift(new Mission('Galaxy ' + newGalaxyNum, 'Galaxy', 1, true, 1, 1, newGalaxyNum, 100, true));
          updateMissionButtons();
        } else if (gameData.missions[gameData.world.currentMission].unique) {
          removeMission(gameData.world.currentMission);
        } else {
          gameData.missions[gameData.world.currentMission].createMissionMap();
          gameData.missions[gameData.world.currentMission].zone = 0;
        }
        if (gameData.world.currentMission >= gameData.missions.length) {
          changeLocation(0); // go back to world
        }
        //        changeLocation(0);
      }
      gameData.enemyship = gameData.missions[gameData.world.currentMission].enemies[gameData.missions[gameData.world.currentMission].zone];
    }
    gameData.nextProcessTime.setMilliseconds(gameData.nextProcessTime.getMilliseconds() + 50);
    updateGUI();
  }

  var endTime = new Date();
  var msRunTime = endTime.getTime() - currentTime.getTime();
  if (msRunTime > 150) {
    addToDisplay(msRunTime.toString(), 'story');
    gtag('event', 'Interval exceeded', {
      event_category: 'error',
      event_label: 'interval',
      value: msRunTime
    });
  }
}, 10);