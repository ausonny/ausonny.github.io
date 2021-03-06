/* globals $ */
/* globals gtag */
/* globals localStorage */
/* globals moment */
// import {Decimal} from 'decimal.js';
const AUTOFIGHT_METAL_COST = 1000;
const AUTOFIGHT_POLYMER_COST = 500;
const AUTOFIGHT_RP_COST = 100;

const PANEL_BASE_COST = 75;
const PANEL_GROWTH_FACTOR = 1.3;

const GENERATOR_METAL_BASE_COST = 200;
const GENERATOR_METAL_GROWTH_FACTOR = 1.3;
const GENERATOR_POLYMER_BASE_COST = 50;
const GENERATOR_POLYMER_GROWTH_FACTOR = 1.3;

const PLANT_METAL_BASE_COST = 500;
const PLANT_METAL_GROWTH_FACTOR = 1.3;
const PLANT_POLYMER_BASE_COST = 125;
const PLANT_POLYMER_GROWTH_FACTOR = 1.3;

const AETHER_PLANT_METAL_BASE_COST = 2000;
const AETHER_PLANT_METAL_GROWTH_FACTOR = 1.3;
const AETHER_PLANT_POLYMER_BASE_COST = 500;
const AETHER_PLANT_POLYMER_GROWTH_FACTOR = 1.3;
const AETHER_PLANT_AETHER_BASE_COST = 100;
const AETHER_PLANT_AETHER_GROWTH_FACTOR = 1.3;

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

const SHIPYARD_METAL_BASE_COST = 1000;
const SHIPYARD_METAL_GROWTH_FACTOR = 1.3;
const SHIPYARD_POLYMER_BASE_COST = 500;
const SHIPYARD_POLYMER_GROWTH_FACTOR = 1.3;
const SHIPYARD_POWER_USAGE = 10;
const SHIPYARD_POWER_GROWTH_USAGE = 1.3;
const SHIPYARD_RP_BASE_COST = 100;
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
const RESEARCH_PROFICIENCY_BASE_RATE = 1.25;

const RAILGUN_UPGRADE_METAL_BASE_COST = 100;
const RAILGUN_UPGRADE_POLYMER_BASE_COST = 0;
const RAILGUN_UPGRADE_RP_BASE_COST = 30;
const RAILGUN_UPGRADE_BASE_IMPROVEMENT = 4;
const RAILGUN_UPGRADE_AETHER_BASE_COST = 90;

const LASER_UPGRADE_METAL_BASE_COST = 50;
const LASER_UPGRADE_POLYMER_BASE_COST = 50;
const LASER_UPGRADE_RP_BASE_COST = 40;
const LASER_UPGRADE_BASE_IMPROVEMENT = 8;
const LASER_UPGRADE_AETHER_BASE_COST = 120;

const MISSILE_UPGRADE_METAL_BASE_COST = 50;
const MISSILE_UPGRADE_POLYMER_BASE_COST = 100;
const MISSILE_UPGRADE_RP_BASE_COST = 50;
const MISSILE_UPGRADE_BASE_IMPROVEMENT = 16;
const MISSILE_UPGRADE_AETHER_BASE_COST = 150;

const ARMOR_UPGRADE_METAL_BASE_COST = 100;
const ARMOR_UPGRADE_POLYMER_BASE_COST = 0;
const ARMOR_UPGRADE_RP_BASE_COST = 30;
const ARMOR_UPGRADE_BASE_IMPROVEMENT = 20;
const ARMOR_UPGRADE_AETHER_BASE_COST = 90;

const SHIELD_UPGRADE_METAL_BASE_COST = 0;
const SHIELD_UPGRADE_POLYMER_BASE_COST = 100;
const SHIELD_UPGRADE_RP_BASE_COST = 40;
const SHIELD_UPGRADE_BASE_IMPROVEMENT = 40;
const SHIELD_UPGRADE_AETHER_BASE_COST = 120;

const FLAK_UPGRADE_METAL_BASE_COST = 100;
const FLAK_UPGRADE_POLYMER_BASE_COST = 50;
const FLAK_UPGRADE_RP_BASE_COST = 50;
const FLAK_UPGRADE_BASE_IMPROVEMENT = 60;
const FLAK_UPGRADE_AETHER_BASE_COST = 150;

var notationDisplayOptions = ['Scientific Notation', 'Standard Formatting', 'Engineering Notation', 'Alphabetic Notation', 'Hybrid Notation', 'Logarithmic Notation'];
var possibleEnemies = [];
var lastSaveGameTime = new Date();
var textToDisplay = [];
var textGameSaved = [];
var textLoot = [];
var textCombat = [];
var textStory = [];
var textMissions = [];
var debugText = '';
var initted = false;
Date.prototype.toJSON = function () {
  return moment(this).format();
};

class Ship {
  constructor(name) {
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
  }

  createEnemy(size, galaxy, zone, lootType, lootAmount, attackMod, hpMod, shmod, difficulty) {
    this.lootType = lootType;
    this.lootAmount = lootAmount;
    this.size = size;
    this.hitPoints = difficulty * hpMod * size * 30 * Math.pow(2.2, galaxy - 1) * Math.pow(1.007, zone - 1);
    this.hitPointsMax = this.hitPoints;
    var baseEnemyAttack = difficulty * attackMod * 15 * Math.pow(2.2, galaxy - 1) * Math.pow(1.007, zone - 1);
    this.minDamage = size * baseEnemyAttack * 2 / 3;
    this.maxDamage = size * baseEnemyAttack * 1.5;
    this.shieldMax = this.hitPoints * shmod;
    this.shield = this.shieldMax;
  }

  createPlayerShip() {
    if (this.hitPoints > 0) {
      return;
    }
    if (canAffordFight()) {
      var shipMetalCost = shipMetalRequired(gameData.buildings.shipyard);
      var shipPolymerCost = shipPolymerRequired(gameData.buildings.shipyard);
      gameData.resources.metal -= shipMetalCost;
      gameData.resources.polymer -= shipPolymerCost;
      this.size = 1 * Math.pow(1.25, gameData.buildings.shipyard - 1);
      this.hitPointsMax = gameData.playership.size * ((gameData.technologies.armorUpgrade * ARMOR_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)));
      this.hitPointsMax += gameData.playership.size * ((gameData.technologies.flakUpgrade * FLAK_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought - 1)));
      this.hitPointsMax *= (1 + gameData.perks.thickskin * 0.1);
      this.hitPoints = this.hitPointsMax;
      this.shieldMax = gameData.playership.size * ((gameData.technologies.shieldUpgrade * SHIELD_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought - 1)));
      this.shieldMax *= (1 + gameData.perks.damager * 0.1);
      this.shield = gameData.playership.shieldMax;
      var baseRailgunAttack = (gameData.technologies.railgunUpgrade * RAILGUN_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1));
      var baseLaserAttack = (gameData.technologies.laserUpgrade * LASER_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1));
      var baseMissileAttack = (gameData.technologies.missileUpgrade * MISSILE_UPGRADE_BASE_IMPROVEMENT * Math.pow(PRESTIGE_BASE_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1));
      var baseAttack = this.size * (baseRailgunAttack + baseLaserAttack + baseMissileAttack) * getAchievementBonus() * (1 + gameData.perks.damager * 0.1);
      this.minDamage = baseAttack * 0.75;
      this.maxDamage = baseAttack * 1.25;
      if (this.minDamage > 100) {
        addAchievement('100 Damage Reached!', 1);
      }
      if (this.minDamage > 1000) {
        addAchievement('1000 Damage Reached!', 1);
      }
      if (this.minDamage > 1000000) {
        addAchievement('1000000 Damage Reached!', 1);
      }
      if (this.size >= 2) {
        addAchievement('Ship Size 2!', 1);
      }
      if (this.size >= 10) {
        addAchievement('Ship Size 10!', 1);
      }
      if (this.size >= 100) {
        addAchievement('Ship Size 100!', 5);
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

function giveMissionReward(mission) {
  if (mission.name === 'Railgun Plans') {
    gameData.technologies.railgunPrestigeLevelUnlocked++;
    addToDisplay('I have discovered plans that will allow me to infuse railguns with aether!', 'mission');
  } else if (mission.name === 'Laser Plans') {
    gameData.technologies.laserPrestigeLevelUnlocked++;
    addToDisplay('I have discovered plans that will allow me to infuse lasers with aether', 'mission');
  } else if (mission.name === 'Missile Plans') {
    gameData.technologies.missilePrestigeLevelUnlocked++;
    addToDisplay('Missiles can be even more missiley!', 'mission');
  } else if (mission.name === 'Armor Plans') {
    gameData.technologies.armorPrestigeLevelUnlocked++;
    addToDisplay('Aether will really help out our Armor!', 'mission');
  } else if (mission.name === 'Shield Plans') {
    gameData.technologies.shieldPrestigeLevelUnlocked++;
    addToDisplay('Shields.  Now with 8 times the shieldiness!', 'mission');
  } else if (mission.name === 'Flak Plans') {
    gameData.technologies.flakPrestigeLevelUnlocked++;
    addToDisplay('Flak is even more flaky! Flakky? I dunno', 'mission');
  } else if (mission.name === 'A Gold Mine') {
    gameData.technologies.goldMine++;
    addToDisplay('With the new algorithms gained at the Gold Mine I can double all forms of production!', 'story');
  } else if (mission.name === 'The Gateway') {
    gameData.story.gatewayUnlocked = true;
    addToDisplay('This location contains a large, prestigious, circular structure.  I can easily travel there and step through it, but what will I find?  I have also discovered some chronoton fragments.  I don\'t see a use for them but they may come in handy later', 'story');
    giveChronotonFragments(40);
  } else if (mission.missiontype === 'Aether') {
    var lt = Math.pow(100, 1 + (mission.level / 10));
    gameData.resources.aether += lt;
    addToDisplay('We have found ' + prettify(lt) + ' aether');
  }
  sortBuildings($('#buildingvisible'));
}

function giveChronotonFragments(amt) {
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
  return rtn;
}

function resetData() {
  var savedchronoton = 0;
  var savedAchievements = [];
  var looter = 0;
  var damager = 0;
  var producer = 0;
  var thickskin = 0;
  var speed = 0;

  if (typeof gameData.resources !== 'undefined') {
    savedchronoton = gameData.resources.chronoton;
  }
  if (typeof gameData.achievements !== 'undefined') {
    savedAchievements = gameData.achievements;
  }
  if (typeof gameData.perks !== 'undefined') {
    ({
      looter,
      producer,
      damager,
      thickskin,
      speed
    } = gameData.perks);
  }

  gameData = {
    story: {
      shipyardUnlocked: false,
      gatewayUnlocked: false,
      initial: false,
      factoryunlocked: false,
      labunlocked: false,
      firstfight: false,
      generatorunlocked: false,
      plantunlocked: false,
      aetherplantunlocked: false,
      refineryunlocked: false
    },
    perks: {
      looter: looter,
      producer: producer,
      damager: damager,
      thickskin: thickskin,
      speed: speed
    },
    achievements: savedAchievements,
    missions: [],
    options: {
      standardNotation: 1,
      logNotBase: 1
    },
    resources: {
      metal: 0,
      polymer: 0,
      power: 10,
      researchPoints: 0,
      aether: 0,
      chronoton: savedchronoton,
      chronotonfragments: 0
    },
    buildings: {
      mines: 1,
      panels: 1,
      generators: 0,
      plants: 0,
      aetherPlants: 0,
      factories: 0,
      shipyard: 0,
      labs: 0,
      refineries: 0
    },
    playership: new Ship('Players Ship'),
    enemyship: new Ship('Enemy'),
    world: {
      currentMission: 0,
      lastGalaxy: 0, // this is a failsafe
      paused: true,
      timeElapsed: 0
    },
    technologies: {
      autofightBought: 0,
      autofightOn: 0,
      autofightUnlock: 0,
      metalProficiencyUnlocked: 0,
      metalProficiencyBought: 0,
      polymerProficiencyUnlocked: 0,
      polymerProficiencyBought: 0,
      researchProficiency: 0,
      researchProficiencyBought: 0,
      shipyardTechUnlock: 1,
      railgunPrestigeLevelUnlocked: 1,
      railgunPrestigeLevelBought: 1,
      railgunUpgrade: 1,
      laserPrestigeLevelUnlocked: 0,
      laserPrestigeLevelBought: 0,
      laserUpgrade: 0,
      missilePrestigeLevelUnlocked: 0,
      missilePrestigeLevelBought: 0,
      missileUpgrade: 0,
      armorPrestigeLevelUnlocked: 1,
      armorPrestigeLevelBought: 1,
      armorUpgrade: 1,
      shieldPrestigeLevelUnlocked: 0,
      shieldPrestigeLevelBought: 0,
      shieldUpgrade: 0,
      flakPrestigeLevelUnlocked: 0,
      flakPrestigeLevelBought: 0,
      flakUpgrade: 0,
      goldMine: 0
    },
    lastResourceProcessTime: new Date(),
    lastRailgunCombatProcessTime: new Date(),
    lastLaserCombatProcessTime: new Date(),
    nextProcessTime: new Date(),
    lastSentShipTime: new Date()
  };

  possibleEnemies = [];
  textToDisplay = [];
  textGameSaved = [];
  textLoot = [];
  textCombat = [];
  textStory = [];
  textMissions = [];

  $('#building').tab('show');
  $('#polymercontainer').addClass('hidden');
  $('#btnBuyFactory').addClass('hidden');
  $('#labscontainer').addClass('hidden');
  $('#btnBuyLab').addClass('hidden');
  $('#btnBuyGenerator').addClass('hidden');
  $('#btnBuyPlant').addClass('hidden');
  $('#btnBuyRefinery').addClass('hidden');
  $('#btnBuyAetherPlant').addClass('hidden');
  $('#fightcontrols').addClass('hidden');
  $('#fightdisplay').addClass('hidden');
  $('#missionvisible').addClass('hidden');
  $('#upgradevisible').addClass('hidden');
  $('#techvisible').addClass('hidden');
  $('#chronotonfragmentscontainer').addClass('hidden');
  $('#chronotoncontainer').addClass('hidden');
  $('#aethercontainer').addClass('hidden');
  $('#upgrade-tab').addClass('hidden');
  $('#missions-tab').addClass('hidden');
  $('#btnFight').addClass('hidden');
  $('#btnAutoFight').addClass('hidden');
  $('#btnAutoFightOn').addClass('hidden');
  $('#btnGateway').addClass('hidden');
  $('#btnSuicide').addClass('hidden');

  $('#btnAutoFight').attr('title', 'Metal Cost:' + AUTOFIGHT_METAL_COST + '\nPolymer Cost:' + AUTOFIGHT_POLYMER_COST + '\nResarch Point Cost:' + AUTOFIGHT_RP_COST);
  $('#btnMetalTech').attr('title', 'Metal Cost:' + prettify((METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))) +
    '\nResearch Cost:' + prettify((METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))));
  $('#btnPolymerTech').attr('title', 'Polymer Cost:' + prettify(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)) +
    '\nResearch Cost:' + prettify(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)));
  $('#btnResearchTech').attr('title', 'Metal Cost:' + prettify(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) +
    '\nPolymer Cost:' + prettify(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) +
    '\nResearch Cost:' + prettify(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)));
  $('#btnBuyShipyard').attr('title', gameBuildings.shipyard.tooltipForBuy());
  $('#btnBuyMine').attr('title', gameBuildings.mine.tooltipForBuy());
  $('#btnBuyLab').attr('title', gameBuildings.lab.tooltipForBuy());
  $('#btnBuyPanel').attr('title', gameBuildings.panel.tooltipForBuy());
  $('#btnBuyGenerator').attr('title', gameBuildings.generator.tooltipForBuy());
  $('#btnBuyPlant').attr('title', gameBuildings.plant.tooltipForBuy());
  $('#btnBuyAetherPlant').attr('title', gameBuildings.aetherPlant.tooltipForBuy());
  $('#btnBuyFactory').attr('title', gameBuildings.factory.tooltipForBuy());
  $('#btnBuyRefinery').attr('title', gameBuildings.refinery.tooltipForBuy());
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
  $('#btnBuyMine').text('Mine(' + (gameData.buildings.mines) + ')');
  $('#btnBuyLab').text('Lab(' + (gameData.buildings.labs) + ')');
  $('#btnBuyFactory').text('Factory(' + (gameData.buildings.factories) + ')');
  $('#btnBuyRefinery').text('Refinery(' + (gameData.buildings.refineries) + ')');
  $('#btnBuyGenerator').text('Generator(' + (gameData.buildings.generators) + ')');
  $('#btnBuyPlant').text('Plant(' + (gameData.buildings.plants) + ')');
  $('#btnBuyAetherPlant').text('Aether Plant(' + (gameData.buildings.aetherPlants) + ')');
  $('#btnBuyPanel').text('Panel(' + (gameData.buildings.panels) + ')');
  $('#btnNotation').text(notationDisplayOptions[gameData.options.standardNotation]);

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

  var Raider = {
    name: 'Raider',
    attackMod: 1,
    hitPointMod: 1,
    shmod: 1
  };
  possibleEnemies.push(Raider);

  var Tank = {
    name: 'Tank',
    attackMod: 0.5,
    hitPointMod: 2,
    shmod: 1
  };
  possibleEnemies.push(Tank);

  var Wizard = {
    name: 'Wizard',
    attackMod: 2,
    hitPointMod: 0.5,
    shmod: 1
  };
  possibleEnemies.push(Wizard);

  var Paladin = {
    name: 'Paladin',
    attackMod: 0.7,
    hitPointMod: 1.5,
    shmod: 1
  };
  possibleEnemies.push(Paladin);

  var Ranger = {
    name: 'Ranger',
    attackMod: 1.5,
    hitPointMod: 0.7,
    shmod: 1
  };
  possibleEnemies.push(Ranger);

  if (gameData.missions.length === 0) {
    createMission('Galaxy 1', 'Galaxy', 1, true, 1, 1, 1, 100, true);
    gameData.enemyship = gameData.missions[gameData.world.currentMission].enemies[gameData.missions[gameData.world.currentMission].zone];
    gameData.playership.createPlayerShip();
  }
  updateMissionButtons();
  sortBuildings($('#buildingvisible'));
  gameData.world.paused = false;
}

function gatewayClick() { // eslint-disable-line no-unused-vars
  gameData.world.paused = true;
  gameData.resources.chronoton += gameData.resources.chronotonfragments;
  gameData.resources.chronotonfragments = 0;
  resetData();
  $('#GatewayModal').modal('hide');
  gtag('event', 'gateway', {
    event_category: 'event',
    event_label: 'label',
    value: 'value'
  });
  gameData.world.paused = false;
}

function attack(attacker, defender) {
  if (attacker.hitPoints <= 0) {
    return;
  }
  var damageToEnemy = Math.max(chooseRandom(attacker.minDamage, attacker.maxDamage), 0);
  var originalDamage = damageToEnemy;

  damageToEnemy -= defender.shield;
  damageToEnemy = Math.max(0, damageToEnemy); // THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED

  defender.shield -= originalDamage;
  defender.shield = Math.max(0, defender.shield); // THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED

  defender.hitPoints -= damageToEnemy;
  defender.hitPoints = Math.max(0, defender.hitPoints); // THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED
}

var gameData = {};

function sumOfExponents(lvlsBought, baseCost, growthfactor) {
  var total = 0;
  for (var x = 0; x < lvlsBought; x++) {
    total += baseCost * Math.pow(growthfactor, x);
  }
  return total;
}

var gamePerks = {
  looter: {
    chronotonforBuy: function () { return 1 * Math.pow(1.3, gameData.perks.looter); },
    chronotonSpent: function () { return sumOfExponents(gameData.perks.looter, 1, 1.3); },
    canAfford: function () { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function () { $('#btnLooter').text('Looter(' + (gameData.perks.looter) + ')\n'); },
    updateBuyButtonTooltip: function () { $('#btnLooter').attr('title', 'Each level bought will add 10% to looting additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
    add: function () { // eslint-disable-line no-unused-vars
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
    chronotonforBuy: function () { return 1 * Math.pow(1.3, gameData.perks.producer); },
    chronotonSpent: function () { return sumOfExponents(gameData.perks.producer, 1, 1.3); },
    canAfford: function () { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function () { $('#btnProducer').text('Producer(' + (gameData.perks.producer) + ')\n'); },
    updateBuyButtonTooltip: function () { $('#btnProducer').attr('title', 'Each level bought will add 10% to Production additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
    add: function () { // eslint-disable-line no-unused-vars
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
    chronotonforBuy: function () { return 1 * Math.pow(1.3, gameData.perks.damager); },
    chronotonSpent: function () { return sumOfExponents(gameData.perks.damager, 1, 1.3); },
    canAfford: function () { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function () { $('#btnDamager').text('Damager(' + (gameData.perks.damager) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnDamager').attr('title', 'Each level bought will add 10% to damage additively\n\nChronoton Cost:' + prettify(gamePerks.damager.chronotonforBuy())); },
    add: function () { // eslint-disable-line no-unused-vars
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
    chronotonforBuy: function () { return 1 * Math.pow(1.3, gameData.perks.thickskin); },
    chronotonSpent: function () { return sumOfExponents(gameData.perks.thickskin, 1, 1.3); },
    canAfford: function () { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function () { $('#btnThickSkin').text('ThickSkin(' + (gameData.perks.thickskin) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnThickSkin').attr('title', 'Each level bought will add 10% to defenses additively\n\nChronoton Cost:' + prettify(gamePerks.thickskin.chronotonforBuy())); },
    add: function () { // eslint-disable-line no-unused-vars
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
    chronotonforBuy: function () { return 4 * Math.pow(1.3, gameData.perks.speed); },
    chronotonSpent: function () { return sumOfExponents(gameData.perks.speed, 4, 1.3); },
    canAfford: function () { return chronotonAvailable() > this.chronotonforBuy(); },
    updateBuyButtonText: function () { $('#btnSpeed').text('Speed(' + (gameData.perks.speed) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnSpeed').attr('title', 'Each level bought will shorten the wait time between attacks by 50ms\n\nChronoton Cost:' + prettify(gamePerks.speed.chronotonforBuy())); },
    add: function () { // eslint-disable-line no-unused-vars
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
  }
};

var gameBuildings = {
  panel: {
    metalForBuy: function () { return (PANEL_BASE_COST * Math.pow(PANEL_GROWTH_FACTOR, gameData.buildings.panels)); },
    tooltipForBuy: function () { return ('Creates ' + prettify(this.powerPer()) + ' power\nMetal Cost:' + prettify(this.metalForBuy())); },
    canAffordBuy: function () { return (gameData.resources.metal >= this.metalForBuy()); },
    totalPowerCreated: function () { return (gameData.buildings.panels * this.powerPer()); },
    powerPer: function () { return (POWER_PER_PANEL); },
    updateBuyButtonText: function () { $('#btnBuyPanel').text('Panel(' + (gameData.buildings.panels) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnBuyPanel').attr('title', this.tooltipForBuy()); },
    determineShowAffordBuy: function () {
      if (this.canAffordBuy()) {
        $('#btnBuyPanel').removeClass('btn-danger').addClass('btn-success');
      } else {
        $('#btnBuyPanel').removeClass('btn-success').addClass('btn-danger');
      }
    },
    buy: function () {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.buildings.panels++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy panel', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  generator: {
    metalForBuy: function () { return (GENERATOR_METAL_BASE_COST * Math.pow(GENERATOR_METAL_GROWTH_FACTOR, gameData.buildings.generators)); },
    polymerForBuy: function () { return (GENERATOR_POLYMER_BASE_COST * Math.pow(GENERATOR_POLYMER_GROWTH_FACTOR, gameData.buildings.generators)); },
    tooltipForBuy: function () { return ('Creates ' + prettify(this.powerPer()) + ' power\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy())); },
    canAffordBuy: function () { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy()); },
    totalPowerCreated: function () { return (gameData.buildings.generators * this.powerPer()); },
    powerPer: function () { return (POWER_PER_GENERATOR); },
    updateBuyButtonText: function () { $('#btnBuyGenerator').text('Generator(' + (gameData.buildings.generators) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnBuyGenerator').attr('title', this.tooltipForBuy()); },
    hideBuyButton: function () { $('#btnBuyGenerator').addClass('hidden'); },
    showBuyButton: function () { $('#btnBuyGenerator').removeClass('hidden'); },
    determineShowAffordBuy: function () {
      if (this.canAffordBuy()) {
        $('#btnBuyGenerator').removeClass('btn-danger').addClass('btn-success');
      } else {
        $('#btnBuyGenerator').removeClass('btn-success').addClass('btn-danger');
      }
    },
    buy: function () {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.buildings.generators++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy generator', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  plant: {
    metalForBuy: function () { return (PLANT_METAL_BASE_COST * Math.pow(PLANT_METAL_GROWTH_FACTOR, gameData.buildings.plants)); },
    polymerForBuy: function () { return (PLANT_POLYMER_BASE_COST * Math.pow(PLANT_POLYMER_GROWTH_FACTOR, gameData.buildings.plants)); },
    tooltipForBuy: function () { return ('Creates ' + prettify(this.powerPer()) + ' power\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy())); },
    canAffordBuy: function () { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy()); },
    totalPowerCreated: function () { return (gameData.buildings.plants * this.powerPer()); },
    powerPer: function () { return (POWER_PER_PLANT); },
    updateBuyButtonText: function () { $('#btnBuyPlant').text('Plant(' + (gameData.buildings.plants) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnBuyPlant').attr('title', this.tooltipForBuy()); },
    hideBuyButton: function () { $('#btnBuyPlant').addClass('hidden'); },
    showBuyButton: function () { $('#btnBuyPlant').removeClass('hidden'); },
    determineShowAffordBuy: function () {
      if (this.canAffordBuy()) {
        $('#btnBuyPlant').removeClass('btn-danger').addClass('btn-success');
      } else {
        $('#btnBuyPlant').removeClass('btn-success').addClass('btn-danger');
      }
    },
    buy: function () {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.buildings.plants++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy plant', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  aetherPlant: {
    metalForBuy: function () { return (AETHER_PLANT_METAL_BASE_COST * Math.pow(AETHER_PLANT_METAL_GROWTH_FACTOR, gameData.buildings.aetherPlants)); },
    polymerForBuy: function () { return (AETHER_PLANT_POLYMER_BASE_COST * Math.pow(AETHER_PLANT_POLYMER_GROWTH_FACTOR, gameData.buildings.aetherPlants)); },
    aetherForBuy: function () { return (AETHER_PLANT_AETHER_BASE_COST * Math.pow(AETHER_PLANT_AETHER_GROWTH_FACTOR, gameData.buildings.aetherPlants)); },
    tooltipForBuy: function () { return ('Creates ' + prettify(this.powerPer()) + ' power\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy()) + '\nAether Cost:' + prettify(this.aetherForBuy())); },
    canAffordBuy: function () { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy() && gameData.resources.aether >= this.aetherForBuy()); },
    totalPowerCreated: function () { return (gameData.buildings.aetherPlants * this.powerPer()); },
    powerPer: function () { return (POWER_PER_AETHER_PLANT); },
    updateBuyButtonText: function () { $('#btnBuyAetherPlant').text('Aether Plant(' + (gameData.buildings.aetherPlants) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnBuyAetherPlant').attr('title', this.tooltipForBuy()); },
    hideBuyButton: function () { $('#btnBuyAetherPlant').addClass('hidden'); },
    showBuyButton: function () { $('#btnBuyAetherPlant').removeClass('hidden'); },
    determineShowAffordBuy: function () {
      if (this.canAffordBuy()) {
        $('#btnBuyAetherPlant').removeClass('btn-danger').addClass('btn-success');
      } else {
        $('#btnBuyAetherPlant').removeClass('btn-success').addClass('btn-danger');
      }
    },
    buy: function () {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.resources.aether -= this.aetherForBuy();
        gameData.buildings.aetherPlants++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        gtag('event', 'buy aether plant', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },

  mine: {
    metalForBuy: function () { return (MINE_BASE_COST * Math.pow(MINE_GROWTH_FACTOR, gameData.buildings.mines)); },
    powerForBuy: function () { return (MINE_POWER_USAGE * Math.pow(MINE_POWER_GROWTH_USAGE, gameData.buildings.mines)); },
    powerSpent: function () { return sumOfExponents(gameData.buildings.mines, MINE_POWER_USAGE, MINE_POWER_GROWTH_USAGE); },
    tooltipForBuy: function () { return ('Creates ' + prettify(this.productionPerSecond() / gameData.buildings.mines) + ' metal per second\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function () { return (gameData.resources.metal >= this.metalForBuy() && CheckPower(this.powerForBuy())); },
    productionPerSecond: function () {
      var increase = gameData.buildings.mines * Math.pow(METAL_PROFICIENCY_BASE_RATE, gameData.technologies.metalProficiencyBought);
      increase *= Math.pow(2, gameData.technologies.goldMine);
      increase *= (1 + gameData.perks.producer * 0.1);
      return increase;
    },
    updateBuyButtonText: function () { $('#btnBuyMine').text('Mine(' + (gameData.buildings.mines) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnBuyMine').attr('title', this.tooltipForBuy()); },
    determineShowAffordBuy: function () {
      if (this.canAffordBuy()) {
        $('#btnBuyMine').removeClass('btn-danger').addClass('btn-success');
      } else {
        $('#btnBuyMine').removeClass('btn-success').addClass('btn-danger');
      }
    },
    buy: function () {
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
        if (gameData.buildings.mines >= 10) {
          addAchievement('10 Mines!', 1);
        }
        if (gameData.buildings.mines >= 100) {
          addAchievement('100 Mines!', 1);
        }
      }
    }
  },
  lab: {
    metalForBuy: function () { return (LAB_METAL_BASE_COST * Math.pow(LAB_METAL_GROWTH_FACTOR, gameData.buildings.labs)); },
    polymerForBuy: function () { return (LAB_POLYMER_BASE_COST * Math.pow(LAB_POLYMER_GROWTH_FACTOR, gameData.buildings.labs)); },
    powerForBuy: function () { return (LAB_POWER_USAGE * Math.pow(LAB_POWER_GROWTH_USAGE, gameData.buildings.labs)); },
    powerSpent: function () { return sumOfExponents(gameData.buildings.labs, LAB_POWER_USAGE, LAB_POWER_GROWTH_USAGE); },
    tooltipForBuy: function () { return ('Creates ' + prettify(this.productionPerSecond() / gameData.buildings.labs) + ' research per second\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function () { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy() && CheckPower(this.powerForBuy())); },
    productionPerSecond: function () {
      var increase = gameData.buildings.labs * Math.pow(RESEARCH_PROFICIENCY_BASE_RATE, gameData.technologies.researchProficiencyBought);
      increase *= Math.pow(2, gameData.technologies.goldMine);
      increase *= (1 + gameData.perks.producer * 0.1);
      return increase / 1;
    },
    updateBuyButtonText: function () { $('#btnBuyLab').text('Lab(' + (gameData.buildings.labs) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnBuyLab').attr('title', this.tooltipForBuy()); },
    hideBuyButton: function () { $('#btnBuyLab').addClass('hidden'); },
    showBuyButton: function () { $('#btnBuyLab').removeClass('hidden'); },
    determineShowAffordBuy: function () {
      if (this.canAffordBuy()) {
        $('#btnBuyLab').removeClass('btn-danger').addClass('btn-success');
      } else {
        $('#btnBuyLab').removeClass('btn-success').addClass('btn-danger');
      }
    },
    buy: function () {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.buildings.labs++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.labs >= 1) {
          addAchievement('1 Lab!', 1);
        }
        if (gameData.buildings.labs >= 10) {
          addAchievement('10 Labs!', 1);
        }
        if (gameData.buildings.labs >= 25) {
          addAchievement('25 Labs!', 1);
        }
        gtag('event', 'buy lab', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  factory: {
    metalForBuy: function () { return (FACTORY_BASE_COST * Math.pow(FACTORY_GROWTH_FACTOR, gameData.buildings.factories)); },
    powerForBuy: function () { return (FACTORY_POWER_USAGE * Math.pow(FACTORY_POWER_GROWTH_USAGE, gameData.buildings.factories)); },
    powerSpent: function () { return sumOfExponents(gameData.buildings.factories, FACTORY_POWER_USAGE, FACTORY_POWER_GROWTH_USAGE); },
    tooltipForBuy: function () { return ('Creates ' + prettify(this.productionPerSecond() / gameData.buildings.factories) + ' polymer per second\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function () { return (gameData.resources.metal >= this.metalForBuy() && CheckPower(this.powerForBuy())); },
    productionPerSecond: function () {
      var increase = gameData.buildings.factories * Math.pow(POLYMER_PROFICIENCY_BASE_RATE, gameData.technologies.polymerProficiencyBought);
      increase *= Math.pow(2, gameData.technologies.goldMine);
      increase *= (1 + gameData.perks.producer * 0.1);
      return increase;
    },
    updateBuyButtonText: function () { $('#btnBuyFactory').text('Factory(' + (gameData.buildings.factories) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnBuyFactory').attr('title', this.tooltipForBuy()); },
    hideBuyButton: function () { $('#btnBuyFactory').addClass('hidden'); },
    showBuyButton: function () { $('#btnBuyFactory').removeClass('hidden'); },
    determineShowAffordBuy: function () {
      if (this.canAffordBuy()) {
        $('#btnBuyFactory').removeClass('btn-danger').addClass('btn-success');
      } else {
        $('#btnBuyFactory').removeClass('btn-success').addClass('btn-danger');
      }
    },
    buy: function () {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.buildings.factories++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.factories >= 1) {
          addAchievement('1 Factory!', 1);
        }
        if (gameData.buildings.factories >= 10) {
          addAchievement('10 Factories!', 1);
        }
        if (gameData.buildings.factories >= 100) {
          addAchievement('100 Factories!', 1);
          gtag('event', 'buy factory', {
            event_category: 'click',
            event_label: 'label',
            value: 'value'
          });
        }
      }
    }
  },
  refinery: {
    metalForBuy: function () { return (REFINERY_METAL_BASE_COST * Math.pow(REFINERY_GROWTH_FACTOR, gameData.buildings.refineries)); },
    polymerForBuy: function () { return (REFINERY_POLYMER_BASE_COST * Math.pow(REFINERY_GROWTH_FACTOR, gameData.buildings.refineries)); },
    powerForBuy: function () { return (REFINERY_POWER_USAGE * Math.pow(REFINERY_POWER_GROWTH_USAGE, gameData.buildings.refineries)); },
    powerSpent: function () { return sumOfExponents(gameData.buildings.refineries, REFINERY_POWER_USAGE, REFINERY_POWER_GROWTH_USAGE); },
    tooltipForBuy: function () { return ('Creates ' + prettify(this.productionPerSecond() / gameData.buildings.refineries) + ' aether per second\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function () { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy() && CheckPower(this.powerForBuy())); },
    productionPerSecond: function () {
      var increase = gameData.buildings.refineries;
      increase *= Math.pow(2, gameData.technologies.goldMine);
      increase *= (1 + gameData.perks.producer * 0.1);
      return increase;
    },
    updateBuyButtonText: function () { $('#btnBuyRefinery').text('Refinery(' + (gameData.buildings.refineries) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnBuyRefinery').attr('title', this.tooltipForBuy()); },
    hideBuyButton: function () { $('#btnBuyRefinery').addClass('hidden'); },
    showBuyButton: function () { $('#btnBuyRefinery').removeClass('hidden'); },
    determineShowAffordBuy: function () {
      if (this.canAffordBuy()) {
        $('#btnBuyRefinery').removeClass('btn-danger').addClass('btn-success');
      } else {
        $('#btnBuyRefinery').removeClass('btn-success').addClass('btn-danger');
      }
    },
    buy: function () {
      if (this.canAffordBuy()) {
        gameData.resources.metal -= this.metalForBuy();
        gameData.resources.polymer -= this.polymerForBuy();
        gameData.buildings.refineries++;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
        if (gameData.buildings.refineries >= 1) {
          addAchievement('1 Refinery!', 1);
        }
        if (gameData.buildings.refineries >= 10) {
          addAchievement('10 Refineries!', 1);
        }
        if (gameData.buildings.refineries >= 100) {
          addAchievement('100 Refineries!', 1);
        }
        gtag('event', 'buy refinery', {
          event_category: 'click',
          event_label: 'label',
          value: 'value'
        });
      }
    }
  },
  shipyard: {
    metalForBuy: function () { return (SHIPYARD_METAL_BASE_COST * Math.pow(SHIPYARD_METAL_GROWTH_FACTOR, gameData.buildings.shipyard)); },
    polymerForBuy: function () { return (SHIPYARD_POLYMER_BASE_COST * Math.pow(SHIPYARD_POLYMER_GROWTH_FACTOR, gameData.buildings.shipyard)); },
    rpForBuy: function () { return (SHIPYARD_RP_BASE_COST * Math.pow(SHIPYARD_RP_GROWTH_FACTOR, gameData.buildings.shipyard)); },
    powerForBuy: function () { return (SHIPYARD_POWER_USAGE * Math.pow(SHIPYARD_POWER_GROWTH_USAGE, gameData.buildings.shipyard)); },
    powerSpent: function () { return sumOfExponents(gameData.buildings.shipyard, SHIPYARD_POWER_USAGE, SHIPYARD_POWER_GROWTH_USAGE); },
    tooltipForBuy: function () { return ('Increases ship size by 25%\nMetal Cost:' + prettify(this.metalForBuy()) + '\nPolymer Cost:' + prettify(this.polymerForBuy()) + '\nResearch Points Cost:' + prettify(this.rpForBuy()) + '\nPower Cost: ' + prettify(this.powerForBuy())); },
    canAffordBuy: function () { return (gameData.resources.metal >= this.metalForBuy() && gameData.resources.polymer >= this.polymerForBuy() && gameData.resources.researchPoints >= this.rpForBuy() && CheckPower(this.powerForBuy())); },
    updateBuyButtonText: function () { $('#btnBuyShipyard').text('Shipyard(' + (gameData.buildings.shipyard) + ')'); },
    updateBuyButtonTooltip: function () { $('#btnBuyShipyard').attr('title', this.tooltipForBuy()); },
    hideBuyButton: function () { $('#btnBuyShipyard').addClass('hidden'); },
    showBuyButton: function () { $('#btnBuyShipyard').removeClass('hidden'); },
    determineShowAffordBuy: function () {
      if (this.canAffordBuy()) {
        $('#btnBuyShipyard').removeClass('btn-danger').addClass('btn-success');
      } else {
        $('#btnBuyShipyard').removeClass('btn-success').addClass('btn-danger');
      }
    },
    buy: function () {
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
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired(gameData.buildings.shipyard)) + '\nPolymer Cost:' + prettify(shipPolymerRequired(gameData.buildings.shipyard)));
        sortBuildings($('#buildingvisible'));
      }
    }
  }
};

var gameEquipment = {
  railgun: {
    metalForShip: function () { return (RAILGUN_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought)); },
    polymerForShip: function () { return (RAILGUN_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought)); },
    rpForShip: function () { return (0 * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought)); },
    metalForUpgrade: function () { return (RAILGUN_UPGRADE_METAL_BASE_COST * (gameData.technologies.railgunUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1)); },
    polymerForUpgrade: function () { return (RAILGUN_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.railgunUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1)); },
    rpForUpgrade: function () { return 0 * (RAILGUN_UPGRADE_RP_BASE_COST * (gameData.technologies.railgunUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1)); },
    metalForPrestige: function () { return (RAILGUN_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought + 1)); },
    polymerForPrestige: function () { return (RAILGUN_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought + 1)); },
    aetherForPrestige: function () { return (RAILGUN_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1)); },
    rpForPrestige: function () { return (RAILGUN_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought + 1)); },
    tooltipForUpgrade: function () { return ('Metal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function () { return ('This will improve our Railguns, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function () { $('#btnRailgunUpgrade').text('Railgun ' + convertToRoman(gameData.technologies.railgunPrestigeLevelBought) + ' (' + (gameData.technologies.railgunUpgrade) + ')'); },
    updateUpgradeTooltip: function () { $('#btnRailgunUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function () { $('#btnRailgunPrestige').text('Infuse Railgun ' + (gameData.technologies.railgunPrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function () { $('#btnRailgunPrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function () { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function () { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    determineShowUpgradeButton: function () {
      if (gameData.technologies.railgunPrestigeLevelBought > 0) {
        $('#btnRailgunUpgrade').removeClass('hidden');
      } else {
        $('#btnRailgunUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function () {
      if (gameData.technologies.railgunPrestigeLevelUnlocked > gameData.technologies.railgunPrestigeLevelBought) {
        $('#btnRailgunPrestige').removeClass('hidden');
      } else {
        $('#btnRailgunPrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function () {
      if (this.canAffordUpgrade()) {
        $('#btnRailgunUpgrade').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnRailgunUpgrade').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function () {
      if (this.canAffordPrestige()) {
        $('#btnRailgunPrestige').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnRailgunPrestige').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    buyUpgrade: function () {
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
    buyPrestige: function () {
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
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired(gameData.buildings.shipyard)) + '\nPolymer Cost:' + prettify(shipPolymerRequired(gameData.buildings.shipyard)));
      }
    }
  },
  laser: {
    metalForShip: function () { return (LASER_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought)); },
    polymerForShip: function () { return (LASER_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought)); },
    metalForUpgrade: function () { return (LASER_UPGRADE_METAL_BASE_COST * (gameData.technologies.laserUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1)); },
    polymerForUpgrade: function () { return (LASER_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.laserUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1)); },
    rpForUpgrade: function () { return 0 * (LASER_UPGRADE_RP_BASE_COST * (gameData.technologies.laserUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1)); },
    metalForPrestige: function () { return (LASER_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought + 1)); },
    polymerForPrestige: function () { return (LASER_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought + 1)); },
    aetherForPrestige: function () { return (LASER_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1)); },
    rpForPrestige: function () { return (LASER_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought + 1)); },
    tooltipForUpgrade: function () { return ('Metal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function () { return ('This will improve our Lasers, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function () { $('#btnLaserUpgrade').text('Laser ' + convertToRoman(gameData.technologies.laserPrestigeLevelBought) + ' (' + (gameData.technologies.laserUpgrade) + ')'); },
    updateUpgradeTooltip: function () { $('#btnLaserUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function () { $('#btnLaserPrestige').text('Infuse Laser ' + (gameData.technologies.laserPrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function () { $('#btnLaserPrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function () { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function () { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    determineShowUpgradeButton: function () {
      if (gameData.technologies.laserPrestigeLevelBought > 0) {
        $('#btnLaserUpgrade').removeClass('hidden');
      } else {
        $('#btnLaserUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function () {
      if (gameData.technologies.laserPrestigeLevelUnlocked > gameData.technologies.laserPrestigeLevelBought) {
        $('#btnLaserPrestige').removeClass('hidden');
      } else {
        $('#btnLaserPrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function () {
      if (this.canAffordUpgrade()) {
        $('#btnLaserUpgrade').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnLaserUpgrade').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function () {
      if (this.canAffordPrestige()) {
        $('#btnLaserPrestige').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnLaserPrestige').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    buyUpgrade: function () {
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
    buyPrestige: function () {
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
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired(gameData.buildings.shipyard)) + '\nPolymer Cost:' + prettify(shipPolymerRequired(gameData.buildings.shipyard)));
      }
    }
  },
  missile: {
    metalForShip: function () { return (MISSILE_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought)); },
    polymerForShip: function () { return (MISSILE_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought)); },
    metalForUpgrade: function () { return (MISSILE_UPGRADE_METAL_BASE_COST * (gameData.technologies.missileUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1)); },
    polymerForUpgrade: function () { return (MISSILE_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.missileUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1)); },
    rpForUpgrade: function () { return 0 * (MISSILE_UPGRADE_RP_BASE_COST * (gameData.technologies.missileUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1)); },
    metalForPrestige: function () { return (MISSILE_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought + 1)); },
    polymerForPrestige: function () { return (MISSILE_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought + 1)); },
    aetherForPrestige: function () { return (MISSILE_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1)); },
    rpForPrestige: function () { return (MISSILE_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought + 1)); },
    tooltipForUpgrade: function () { return ('Metal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function () { return ('This will improve our Missiles, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function () { $('#btnMissileUpgrade').text('Missile ' + convertToRoman(gameData.technologies.missilePrestigeLevelBought) + ' (' + (gameData.technologies.missileUpgrade) + ')'); },
    updateUpgradeTooltip: function () { $('#btnMissileUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function () { $('#btnMissilePrestige').text('Infuse Missile ' + (gameData.technologies.missilePrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function () { $('#btnMissilePrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function () { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function () { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    determineShowUpgradeButton: function () {
      if (gameData.technologies.missilePrestigeLevelBought > 0) {
        $('#btnMissileUpgrade').removeClass('hidden');
      } else {
        $('#btnMissileUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function () {
      if (gameData.technologies.missilePrestigeLevelUnlocked > gameData.technologies.missilePrestigeLevelBought) {
        $('#btnMissilePrestige').removeClass('hidden');
      } else {
        $('#btnMissilePrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function () {
      if (this.canAffordUpgrade()) {
        $('#btnMissileUpgrade').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnMissileUpgrade').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function () {
      if (this.canAffordPrestige()) {
        $('#btnMissilePrestige').removeClass('btn-danger').addClass('btn-warning');
      } else {
        $('#btnMissilePrestige').removeClass('btn-warning').addClass('btn-danger');
      }
    },
    buyUpgrade: function () {
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
    buyPrestige: function () {
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
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired(gameData.buildings.shipyard)) + '\nPolymer Cost:' + prettify(shipPolymerRequired(gameData.buildings.shipyard)));
      }
    }
  },
  armor: {
    metalForShip: function () { return (ARMOR_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought)); },
    polymerForShip: function () { return (ARMOR_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought)); },
    metalForUpgrade: function () { return (ARMOR_UPGRADE_METAL_BASE_COST * (gameData.technologies.armorUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)); },
    polymerForUpgrade: function () { return (ARMOR_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.armorUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)); },
    rpForUpgrade: function () { return 0 * (ARMOR_UPGRADE_RP_BASE_COST * (gameData.technologies.armorUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)); },
    metalForPrestige: function () { return (ARMOR_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought + 1)); },
    polymerForPrestige: function () { return (ARMOR_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought + 1)); },
    aetherForPrestige: function () { return (ARMOR_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)); },
    rpForPrestige: function () { return (ARMOR_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought + 1)); },
    tooltipForUpgrade: function () { return ('Metal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function () { return ('This will improve our Armor, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function () { $('#btnArmorUpgrade').text('Armor ' + convertToRoman(gameData.technologies.armorPrestigeLevelBought) + ' (' + (gameData.technologies.armorUpgrade) + ')'); },
    updateUpgradeTooltip: function () { $('#btnArmorUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function () { $('#btnArmorPrestige').text('Infuse Armor ' + (gameData.technologies.armorPrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function () { $('#btnArmorPrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function () { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function () { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    determineShowUpgradeButton: function () {
      if (gameData.technologies.armorPrestigeLevelBought > 0) {
        $('#btnArmorUpgrade').removeClass('hidden');
      } else {
        $('#btnArmorUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function () {
      if (gameData.technologies.armorPrestigeLevelUnlocked > gameData.technologies.armorPrestigeLevelBought) {
        $('#btnArmorPrestige').removeClass('hidden');
      } else {
        $('#btnArmorPrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function () {
      if (this.canAffordUpgrade()) {
        $('#btnArmorUpgrade').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnArmorUpgrade').removeClass('btn-info').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function () {
      if (this.canAffordPrestige()) {
        $('#btnArmorPrestige').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnArmorPrestige').removeClass('btn-info').addClass('btn-danger');
      }
    },
    buyUpgrade: function () {
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
    buyPrestige: function () {
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
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired(gameData.buildings.shipyard)) + '\nPolymer Cost:' + prettify(shipPolymerRequired(gameData.buildings.shipyard)));
      }
    }
  },
  shield: {
    metalForShip: function () { return (SHIELD_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought)); },
    polymerForShip: function () { return (SHIELD_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought)); },
    metalForUpgrade: function () { return (SHIELD_UPGRADE_METAL_BASE_COST * (gameData.technologies.shieldUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought - 1)); },
    polymerForUpgrade: function () { return (SHIELD_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.shieldUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought - 1)); },
    rpForUpgrade: function () { return 0 * (SHIELD_UPGRADE_RP_BASE_COST * (gameData.technologies.shieldUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought - 1)); },
    metalForPrestige: function () { return (SHIELD_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought + 1)); },
    polymerForPrestige: function () { return (SHIELD_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought + 1)); },
    aetherForPrestige: function () { return (SHIELD_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought - 1)); },
    rpForPrestige: function () { return (SHIELD_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.shieldPrestigeLevelBought + 1)); },
    tooltipForUpgrade: function () { return ('Metal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function () { return ('This will improve our Shields, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function () { $('#btnShieldUpgrade').text('Shield ' + convertToRoman(gameData.technologies.shieldPrestigeLevelBought) + ' (' + (gameData.technologies.shieldUpgrade) + ')'); },
    updateUpgradeTooltip: function () { $('#btnShieldUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function () { $('#btnShieldPrestige').text('Infuse Shield ' + (gameData.technologies.shieldPrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function () { $('#btnShieldPrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function () { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function () { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    determineShowUpgradeButton: function () {
      if (gameData.technologies.shieldPrestigeLevelBought > 0) {
        $('#btnShieldUpgrade').removeClass('hidden');
      } else {
        $('#btnShieldUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function () {
      if (gameData.technologies.shieldPrestigeLevelUnlocked > gameData.technologies.shieldPrestigeLevelBought) {
        $('#btnShieldPrestige').removeClass('hidden');
      } else {
        $('#btnShieldPrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function () {
      if (this.canAffordUpgrade()) {
        $('#btnShieldUpgrade').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnShieldUpgrade').removeClass('btn-info').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function () {
      if (this.canAffordPrestige()) {
        $('#btnShieldPrestige').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnShieldPrestige').removeClass('btn-info').addClass('btn-danger');
      }
    },
    buyUpgrade: function () {
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
    buyPrestige: function () {
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
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired(gameData.buildings.shipyard)) + '\nPolymer Cost:' + prettify(shipPolymerRequired(gameData.buildings.shipyard)));
      }
    }
  },
  flak: {
    metalForShip: function () { return (FLAK_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought)); },
    polymerForShip: function () { return (FLAK_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought)); },
    metalForUpgrade: function () { return (FLAK_UPGRADE_METAL_BASE_COST * (gameData.technologies.flakUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought - 1)); },
    polymerForUpgrade: function () { return (FLAK_UPGRADE_POLYMER_BASE_COST * (gameData.technologies.flakUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought - 1)); },
    rpForUpgrade: function () { return 0 * (FLAK_UPGRADE_RP_BASE_COST * (gameData.technologies.flakUpgrade + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought - 1)); },
    metalForPrestige: function () { return (FLAK_UPGRADE_METAL_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought + 1)); },
    polymerForPrestige: function () { return (FLAK_UPGRADE_POLYMER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought + 1)); },
    aetherForPrestige: function () { return (FLAK_UPGRADE_AETHER_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought - 1)); },
    rpForPrestige: function () { return (FLAK_UPGRADE_RP_BASE_COST * Math.pow(PRESTIGE_COST_MULTIPLIER, gameData.technologies.flakPrestigeLevelBought + 1)); },
    tooltipForUpgrade: function () { return ('Metal Cost:' + prettify(this.metalForUpgrade()) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade()) + '\nRP Cost:' + prettify(this.rpForUpgrade())); },
    tooltipForPrestige: function () { return ('This will improve our Flak, but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); },
    updateUpgradeText: function () { $('#btnFlakUpgrade').text('Flak ' + convertToRoman(gameData.technologies.flakPrestigeLevelBought) + ' (' + (gameData.technologies.flakUpgrade) + ')'); },
    updateUpgradeTooltip: function () { $('#btnFlakUpgrade').attr('title', this.tooltipForUpgrade()); },
    updatePrestigeText: function () { $('#btnFlakPrestige').text('Infuse Flak ' + (gameData.technologies.flakPrestigeLevelBought + 1)); },
    updatePrestigeTooltip: function () { $('#btnFlakPrestige').attr('title', this.tooltipForPrestige()); },
    canAffordUpgrade: function () { return (gameData.resources.metal >= this.metalForUpgrade()) && (gameData.resources.polymer >= this.polymerForUpgrade()) && (gameData.resources.researchPoints >= this.rpForUpgrade()); },
    canAffordPrestige: function () { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); },
    determineShowUpgradeButton: function () {
      if (gameData.technologies.flakPrestigeLevelBought > 0) {
        $('#btnFlakUpgrade').removeClass('hidden');
      } else {
        $('#btnFlakUpgrade').addClass('hidden');
      }
    },
    determineShowPrestigeButton: function () {
      if (gameData.technologies.flakPrestigeLevelUnlocked > gameData.technologies.flakPrestigeLevelBought) {
        $('#btnFlakPrestige').removeClass('hidden');
      } else {
        $('#btnFlakPrestige').addClass('hidden');
      }
    },
    determineShowAffordUpgrade: function () {
      if (this.canAffordUpgrade()) {
        $('#btnFlakUpgrade').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnFlakUpgrade').removeClass('btn-info').addClass('btn-danger');
      }
    },
    determineShowAffordPrestige: function () {
      if (this.canAffordPrestige()) {
        $('#btnFlakPrestige').removeClass('btn-danger').addClass('btn-info');
      } else {
        $('#btnFlakPrestige').removeClass('btn-info').addClass('btn-danger');
      }
    },
    buyUpgrade: function () {
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
    buyPrestige: function () {
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
        $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired(gameData.buildings.shipyard)) + '\nPolymer Cost:' + prettify(shipPolymerRequired(gameData.buildings.shipyard)));
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

function prettifySub(number) {
  number = parseFloat(number);
  var floor = Math.floor(number);
  if (number === floor) { // number is an integer, just show it as-is
    return number;
  }
  //  var precision = 3 - floor.toString().length; // use the right number of digits

  return number.toFixed(3 - floor.toString().length);
}

function prettify(number) {
  var numberTmp = number;
  var exponent = 0;
  var suffices = [];
  var suffix = '';
  if (!isFinite(number)) return '<span class=\'icomoon icon-infinity\'></span>';
  if (number >= 1000 && number < 10000) return Math.floor(number);
  if (number == 0) return prettifySub(0);
  if (number < 0) return '-' + prettify(-number);
  if (number < 0.005) return (+number).toExponential(2);

  var base = Math.floor(Math.log(number) / Math.log(1000));
  if (base <= 0) return prettifySub(number);

  if (gameData.options.standardNotation == 5) {
    // Thanks ZXV
    var logBase = gameData.global.logNotBase;
    exponent = Math.log(number) / Math.log(logBase);
    return prettifySub(exponent) + 'L' + logBase;
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
      exponent = parseFloat(numberTmp).toExponential(2);
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

function init() {
  debugText += 'Known issues and other ramblings:\n1. If the tab loses focus or is closed, when you return you will notice the game runs faster than expected until time catches up.  Enjoy this for now, eventually there will be an ability that will allow/limit this time\n';
  debugText += '1. There are currently no tooltips for touchscreen users.\n';
  debugText += '2. TODO I need an achievement screen that shows all achievements completed and still to do, along with the current bonus gained from achievements\n';
  debugText += '3. There is currently no confirmation dialog on clicking the reset button under settings.  Be careful.\n';
  debugText += '4. Tooltips for most research projects don\'t show benefits gained.\n';
  debugText += '5. The flavor text is basically in rough draft form.  There are issues with person and tense.  Plus.  You know.  It needs other help.\n';
  debugText += '6. Balance is an ongoing chore and any thoughts are appreciated.\n';
  debugText += '7. Autosave is hardcoded for every five minutes.  This needs to be adjustable in settings.  And Playfab integration is coming.  One day.\n';
  debugText += '9. Current achievements are limited.\n';
  debugText += '11. I\'d like a visual representation of how far the player has advanced in the current mission/galaxy.\n';
  resetData();
  var savegame = JSON.parse(localStorage.getItem('save'));
  initted = true;

  if (savegame == null) return;

  if (typeof savegame.buildings.shipyard !== 'undefined') gameData.buildings.shipyard = savegame.buildings.shipyard;
  if (typeof savegame.buildings.factories !== 'undefined') gameData.buildings.factories = savegame.buildings.factories;
  if (typeof savegame.buildings.refineries !== 'undefined') gameData.buildings.refineries = savegame.buildings.refineries;
  if (typeof savegame.buildings.panels !== 'undefined') gameData.buildings.panels = savegame.buildings.panels;
  if (typeof savegame.buildings.generators !== 'undefined') gameData.buildings.generators = savegame.buildings.generators;
  if (typeof savegame.buildings.plants !== 'undefined') gameData.buildings.plants = savegame.buildings.plants;
  if (typeof savegame.buildings.aetherPlants !== 'undefined') gameData.buildings.aetherPlants = savegame.buildings.aetherPlants;
  if (typeof savegame.buildings.labs !== 'undefined') gameData.buildings.labs = savegame.buildings.labs;
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
  if (typeof savegame.missions !== 'undefined') gameData.missions = savegame.missions;
  if (typeof savegame.world.currentMission !== 'undefined') gameData.world.currentMission = savegame.world.currentMission;
  if (typeof savegame.world.lastGalaxy !== 'undefined') gameData.world.lastGalaxy = savegame.world.lastGalaxy;
  if (typeof savegame.world.timeElapsed !== 'undefined') gameData.world.timeElapsed = savegame.world.timeElapsed;
  if (typeof savegame.options.standardNotation !== 'undefined') gameData.options.standardNotation = savegame.options.standardNotation;
  if (typeof savegame.options.logNotBase !== 'undefined') gameData.options.logNotBase = savegame.options.logNotBase;
  if (typeof savegame.achievements !== 'undefined') gameData.achievements = savegame.achievements;
  if (typeof savegame.perks.damager !== 'undefined') gameData.perks.damager = savegame.perks.damager;
  if (typeof savegame.perks.looter !== 'undefined') gameData.perks.looter = savegame.perks.looter;
  if (typeof savegame.perks.thickskin !== 'undefined') gameData.perks.thickskin = savegame.perks.thickskin;
  if (typeof savegame.perks.speed !== 'undefined') gameData.perks.speed = savegame.perks.speed;
  if (typeof savegame.perks.producer !== 'undefined') gameData.perks.producer = savegame.perks.producer;
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

  $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired(gameData.buildings.shipyard)) + '\nPolymer Cost:' + prettify(shipPolymerRequired(gameData.buildings.shipyard)));
  $('#btnAutoFight').attr('title', 'Metal Cost:' + AUTOFIGHT_METAL_COST + '\nPolymer Cost:' + AUTOFIGHT_POLYMER_COST + '\nResarch Point Cost:' + AUTOFIGHT_RP_COST);
  $('#btnMetalTech').attr('title', 'Metal Cost:' + prettify((METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))) +
    '\nResearch Cost:' + prettify((METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))));
  $('#btnPolymerTech').attr('title', 'Polymer Cost:' + prettify(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)) +
    '\nResearch Cost:' + prettify(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)));
  $('#btnResearchTech').attr('title', 'Metal Cost:' + prettify(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) +
    '\nPolymer Cost:' + prettify(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) +
    '\nResearch Cost:' + prettify(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)));
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
  $('#btnNotation').text(notationDisplayOptions[gameData.options.standardNotation]);
  updateMissionButtons();
  sortBuildings($('#buildingvisible'));
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
}

function getAchievementBonus() {
  var rtn = 100;
  for (var i = 0; i < gameData.achievements.length; i++) {
    rtn += gameData.achievements[i].bonus;
  }
  return rtn / 100;
}

function changeLocation(mission) {
  gameData.world.paused = true;
  gameData.world.currentMission = mission;
  gameData.enemyship = gameData.missions[gameData.world.currentMission].enemies[gameData.missions[gameData.world.currentMission].zone];
  gameData.playership.hitPoints = 0;
  gameData.world.paused = false;
}

function updateGUI() {
  updatePower();

  document.getElementById('timeElapsed').innerHTML = showTimeElapsed();
  document.getElementById('textToDisplay').innerHTML = getDisplayText();
  document.getElementById('textToDisplay2').innerHTML = debugText;
  document.getElementById('metal').innerHTML = prettify(gameData.resources.metal);
  document.getElementById('researchPoints').innerHTML = prettify(gameData.resources.researchPoints);
  document.getElementById('polymer').innerHTML = prettify(gameData.resources.polymer);
  document.getElementById('aether').innerHTML = prettify(gameData.resources.aether);
  document.getElementById('chronoton').innerHTML = prettify(chronotonAvailable());
  document.getElementById('chronotonspent').innerHTML = prettify(gameData.resources.chronoton - chronotonAvailable());
  document.getElementById('chronoton2').innerHTML = prettify(chronotonAvailable());
  document.getElementById('chronotonfragments').innerHTML = prettify(gameData.resources.chronotonfragments);
  document.getElementById('metalpersec').innerHTML = prettify(gameBuildings.mine.productionPerSecond());
  document.getElementById('polymerpersec').innerHTML = prettify(gameBuildings.factory.productionPerSecond());
  document.getElementById('aetherpersec').innerHTML = prettify(gameBuildings.refinery.productionPerSecond());
  document.getElementById('researchpersec').innerHTML = prettify(gameBuildings.lab.productionPerSecond());
  document.getElementById('power').innerHTML = prettify(gameData.resources.power);
  document.getElementById('enemyName').innerHTML = gameData.enemyship.name;
  document.getElementById('enemyShipSize').innerHTML = gameData.enemyship.size;
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
    }
    $('#PlayerHullShieldBar').css('width', prettify(width) + '%');
    $('#PlayerShieldText').text('Shield:' + prettify(gameData.playership.shield) + '/' + prettify(gameData.playership.shieldMax));
    width = 0;
    if (gameData.enemyship.shieldMax > 0) {
      width = 100 * gameData.enemyship.shield / gameData.enemyship.shieldMax;
    }
    $('#EnemyHullShieldBar').css('width', prettify(width) + '%');
    $('#EnemyShieldText').text('Shield:' + prettify(gameData.enemyship.shield) + '/' + prettify(gameData.enemyship.shieldMax));
    document.getElementById('enemyMinDamage').innerHTML = prettify(gameData.enemyship.minDamage);
    document.getElementById('enemyMaxDamage').innerHTML = prettify(gameData.enemyship.maxDamage);
    document.getElementById('shipSize').innerHTML = prettify(gameData.playership.size);
    document.getElementById('shipMinDamage').innerHTML = prettify(gameData.playership.minDamage);
    document.getElementById('shipMaxDamage').innerHTML = prettify(gameData.playership.maxDamage);
    document.getElementById('MissionName').innerHTML = gameData.missions[gameData.world.currentMission].name;
    document.getElementById('zone').innerHTML = gameData.missions[gameData.world.currentMission].zone + 1;
    document.getElementById('zonemax').innerHTML = gameData.missions[gameData.world.currentMission].enemies.length;
  }

  if (!gameData.story.initial) {
    addToDisplay('I slowly become aware of my surroundings.  There is little left untouched by destruction and weapon fire.  I can sense no one else.  All the communications frequencies are devoid of any signal.  One of the mines is still online and a single solar panel field is operational.  I need answers.  And to find them I\'ll need materials.  I should bring more mines online.', 'story');
    gameData.story.initial = true;
    sortBuildings($('#buildingvisible', false));
  }

  if (gameData.buildings.mines >= 5) {
    $('#polymercontainer').removeClass('hidden');
    gameBuildings.factory.showBuyButton();
    if (!gameData.story.factoryunlocked) {
      addToDisplay('I should be able to start bringing factories online.  The polymers will get us closer to creating drones.  I need answers. Why did they attack? Am I really alone?', 'story');
      gameData.story.factoryunlocked = true;
      sortBuildings($('#buildingvisible', false));
    }
  }

  if (gameData.buildings.factories >= 5) {
    $('#labscontainer').removeClass('hidden');
    gameBuildings.lab.showBuyButton();
    if (!gameData.story.labunlocked) {
      addToDisplay('Labs are available.  They should help to rediscover some technologies.  How did they manage to pull off an attack of that scale secretly?', 'story');
      gameData.story.labunlocked = true;
      sortBuildings($('#buildingvisible', false));
    }
  }

  if (gameData.missions[0].galaxy >= 3) {
    gameBuildings.generator.showBuyButton();
    if (!gameData.story.generatorunlocked) {
      addToDisplay('Placeholder', 'story');
      gameData.story.generatorunlocked = true;
      sortBuildings($('#buildingvisible', false));
    }
  }
  if (gameData.missions[0].galaxy >= 6) {
    gameBuildings.plant.showBuyButton();
    if (!gameData.story.plantunlocked) {
      addToDisplay('Placeholder', 'story');
      gameData.story.plantunlocked = true;
      sortBuildings($('#buildingvisible', false));
    }
  }
  if (gameData.missions[0].galaxy >= 10) {
    gameBuildings.aetherPlant.showBuyButton();
    if (!gameData.story.aetherplantunlocked) {
      addToDisplay('Placeholder', 'story');
      gameData.story.aetherplantunlocked = true;
      sortBuildings($('#buildingvisible', false));
    }
  }
  if (gameData.missions[0].galaxy >= 15) {
    gameBuildings.refinery.showBuyButton();
    if (!gameData.story.refineryunlocked) {
      addToDisplay('Placeholder', 'story');
      gameData.story.refineryunlocked = true;
      sortBuildings($('#buildingvisible', false));
    }
  }
  if (gameData.missions[0].galaxy > 1) {
    $('#btnResetAbilities').addClass('hidden');
  } else {
    $('#btnResetAbilities').removeClass('hidden');
  }

  if (gameData.story.gatewayUnlocked) {
    $('#btnGateway').removeClass('hidden');
  }

  if (gameData.buildings.labs >= 2) {
    $('#techvisible').removeClass('hidden');
    if (!gameData.story.shipyardUnlocked) {
      addToDisplay('Drones!  A shipyard will allow me to send out drones and begin the quest for information.  I can sense a path of ships, almost like a breadcrumb trail.  They aren\'t responding to our attempts at communication.', 'story');
      gameData.story.shipyardUnlocked = true;
      sortBuildings($('#buildingvisible', false));
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
    $('#chronotonfragmentscontainer').removeClass('hidden');
    $('#chronotoncombinedcontainer').removeClass('hidden');
  }
  if (gameData.resources.chronoton > 0) {
    $('#chronotoncontainer').removeClass('hidden');
    $('#chronotoncombinedcontainer').removeClass('hidden');
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

  $('#btnBuyShipyard').removeClass('btn-success').addClass('btn-danger');
  $('#btnBuyShipyard').addClass('hidden');
  if (gameData.buildings.shipyard < gameData.technologies.shipyardTechUnlock) {
    $('#btnBuyShipyard').removeClass('hidden');
    $('#btnBuyShipyard').text('Shipyard(' + (gameData.buildings.shipyard + 1) + ')');
    if (gameBuildings.shipyard.canAffordBuy()) {
      $('#btnBuyShipyard').removeClass('btn-danger').addClass('btn-success');
    }
  }

  gameBuildings.mine.determineShowAffordBuy();
  gameBuildings.panel.determineShowAffordBuy();
  gameBuildings.generator.determineShowAffordBuy();
  gameBuildings.plant.determineShowAffordBuy();
  gameBuildings.aetherPlant.determineShowAffordBuy();
  gameBuildings.factory.determineShowAffordBuy();
  gameBuildings.refinery.determineShowAffordBuy();
  gameBuildings.lab.determineShowAffordBuy();
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

  if (debugText.length > 0) {
    $('#debugContainer').removeClass('hidden');
  } else {
    $('#debugContainer').addClass('hidden');
  }
}

function resetAbilities() { // eslint-disable-line no-unused-vars
  gameData.perks.damager = 0;
  gameData.perks.looter = 0;
  gameData.perks.producer = 0;
  gameData.perks.thickskin = 0;
  gameData.perks.speed = 0;
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

  li.detach().sort(function (a, b) {
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

function hasClass(element, className) {
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

function canAffordResearchProfieciency() {
  var facilityMetalCost = Math.floor(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought));
  if (gameData.resources.metal < facilityMetalCost) {
    return false;
  }
  var facilityPolymerCost = Math.floor(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought));
  if (gameData.resources.polymer < facilityPolymerCost) {
    return false;
  }
  var facilityRPCost = Math.floor(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought));
  if (gameData.resources.researchPoints < facilityRPCost) {
    return false;
  }
  return true;
}

function canAffordPolymerProfieciency() {
  var facilityPolymerCost = 0;
  facilityPolymerCost += Math.floor(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought));
  if (gameData.resources.polymer < facilityPolymerCost) {
    return false;
  }
  var facilityRPCost = Math.floor(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought));
  if (gameData.resources.researchPoints < facilityRPCost) {
    return false;
  }
  return true;
}

function metalClick(time) {
  gameData.resources.metal += time / 1000 * gameBuildings.mine.productionPerSecond();
}

function polymerClick(time) {
  gameData.resources.polymer += time / 1000 * gameBuildings.factory.productionPerSecond();
}

function researchClick(time) {
  gameData.resources.researchPoints += time / 1000 * gameBuildings.lab.productionPerSecond();
}

function aetherClick(time) {
  gameData.resources.aether += time / 1000 * gameBuildings.refinery.productionPerSecond();
}

function updatePower() {
  var powerAvailable = (gameData.buildings.panels * POWER_PER_PANEL + gameData.buildings.generators * POWER_PER_GENERATOR + gameData.buildings.plants * POWER_PER_PLANT + gameData.buildings.aetherPlants * POWER_PER_AETHER_PLANT);
  var facilities = gameBuildings.mine.powerSpent() + gameBuildings.shipyard.powerSpent() + gameBuildings.factory.powerSpent() + gameBuildings.lab.powerSpent() + gameBuildings.refinery.powerSpent();
  gameData.resources.power = powerAvailable - facilities;
}

function CheckPower(powerRequirement) {
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
  gameData.story.firstfight = true;
}

function chooseRandom(min, max) {
  return (Math.random() * (max - min) + min);
}

function getPrettyTime(d) {
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = '0' + min;
  }
  var sec = d.getSeconds();
  if (sec < 10) {
    sec = '0' + sec;
  }
  return (hr + ':' + min + ':' + sec);
}

function addColor(theColor, theText) {
  return '<span style="color:' + theColor + '">' + theText + '</span><br />';
}

function addToDisplay(newline, category) {
  var newItem = {
    timeadded: new Date(),
    txt: ''
  };

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
    textStory = textStory.slice(0, 50);
  }
  textToDisplay = textCombat.concat(textGameSaved).concat(textLoot).concat(textMissions).concat(textStory);
  textToDisplay.sort((a, b) => b.timeadded - a.timeadded);
}

function getDisplayText() {
  var val = '';
  for (var i = 0; i < textToDisplay.length; i++) {
    val += '\n' + textToDisplay[i].txt;
  }
  return val;
}

function createMission(name, missiontype, missionversion, unique, difficulty, lootMultiplier, level, zones, IsGalaxy) {
  var newMission = {
    name: name,
    missiontype: missiontype,
    missionversion: missionversion,
    unique: unique,
    difficulty: difficulty,
    lootMultiplier: lootMultiplier,
    level: level,
    zones: zones,
    zone: 0,
    galaxy: level,
    IsGalaxy: IsGalaxy
  };
  newMission.enemies = createMissionMap(newMission);

  if (IsGalaxy) {
    gameData.missions.unshift(newMission);
  } else {
    gameData.missions.push(newMission);
  }
}

function updateMissionButtons() {
  var foo = document.getElementById('missionvisible');
  while (foo.firstChild) {
    foo.removeChild(foo.firstChild);
  }
  var content = document.createTextNode('Choose a destination here.  Choosing the current galaxy will continue the chase.  Choosing another option will run a mission, normally with a reward, like a new weapon prestige, or a cache of materials.  Upon completion the next mission in order will be chosen.  When there are no more missions after the completed one the current galaxy will be chosen.');
  foo.appendChild(content);
  var linebreak = document.createElement('br');
  foo.appendChild(linebreak);
  for (let missionIndex = 0; missionIndex < gameData.missions.length; missionIndex++) {
    var element = document.createElement('button');
    // Assign different attributes to the element.
    foo.appendChild(element);
    element.id = missionIndex;
    element.type = 'button';
    element.value = missionIndex;
    element.innerHTML = gameData.missions[missionIndex].name;
    element.classList.add('btn');
    element.classList.add('btn-sm');
    if (missionIndex === 0) {
      element.classList.add('btn-warning');
    } else {
      element.classList.add('btn-info');
    }
    element.addEventListener('click', function () {
      changeLocation(missionIndex);
    });
  }
}

const ELITE_ENEMY_ATTRIBUTES = ['Quick', 'Hardy', 'Elite'];

function createMissionMap(mission) {
  var enemies = [];
  var index = 0;
  while (index < mission.zones) {
    var newEnemymods = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)]; // this will efventually need to be redone when we add advanced enemies
    var newEnemy = new Ship(newEnemymods.name);
    var loot = checkForCreateLoot(mission, index);
    newEnemy.createEnemy(1, mission.level, index, loot.lootType, loot.lootAmount, newEnemymods.attackMod, newEnemymods.hitPointMod, newEnemymods.shmod, mission.difficulty);
    newEnemy.attributes = [];
    if (index === mission.zones - 1) {
      newEnemy.attributes.push(ELITE_ENEMY_ATTRIBUTES[Math.floor(Math.random() * ELITE_ENEMY_ATTRIBUTES.length)]);
      while (newEnemy.lootType === '') {
        loot = checkForCreateLoot(mission, index);
        newEnemy.lootType = loot.lootType;
        newEnemy.lootAmount = loot.lootAmount;
      }
      newEnemy.lootAmount *= 2;
    }
    if (newEnemy.attributes.includes('Hardy')) {
      newEnemy.hitPointsMax *= 2;
    }
    if (newEnemy.attributes.includes('Elite')) {
      newEnemy.shieldMax *= 2;
    }
    for (var i = 0; i < newEnemy.attributes.length; i++) {
      newEnemy.name = newEnemy.attributes[i] + ' ' + newEnemy.name;
    }
    enemies.push(newEnemy);
    index++;
  }
  return enemies;
}

function checkForCreateLoot(mission, zone) {
  var rtn = {
    lootType: '',
    lootAmount: ((((mission.level - 1) * 100) + zone) * mission.lootMultiplier) * Math.pow(1.001, (((mission.level - 1) * 100) + zone) * mission.lootMultiplier) * (1 + gameData.perks.looter * 0.1)
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

function GetMissionNameCount(nameToCheck) {
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
    if (gameData.missions[0].galaxy === 1) {
      addAchievement('First Galaxy Completed!', 1);
    }
    if (gameData.missions[0].galaxy === 5) {
      addAchievement('Fifth Galaxy Completed!', 1);
    }
    if (gameData.missions[0].galaxy === 10) {
      addAchievement('Ten Galaxy Completed!', 1);
    }
    if (gameData.missions[0].galaxy === 20) {
      addAchievement('Twentieth Galaxy Completed!', 1);
    }
  }
  if (gameData.missions[0].galaxy > 3) {
    var prestigelvl = (Math.floor((gameData.missions[0].galaxy - 1) / 3));
    if (prestigelvl >= (GetMissionNameCount('Railgun Plans') + gameData.technologies.railgunPrestigeLevelUnlocked)) {
      createMission('Railgun Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false);
      createMission('Armor Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false);
      updateMissionButtons();
      sortBuildings($('#buildingvisible'));
    }
    prestigelvl = (Math.floor((gameData.missions[0].galaxy - 2) / 3));
    if (prestigelvl >= (GetMissionNameCount('Laser Plans') + gameData.technologies.laserPrestigeLevelUnlocked)) {
      createMission('Laser Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false);
      createMission('Shield Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false);
      updateMissionButtons();
    }
    prestigelvl = (Math.floor((gameData.missions[0].galaxy - 3) / 3));
    if (prestigelvl >= (GetMissionNameCount('Missile Plans') + gameData.technologies.missilePrestigeLevelUnlocked)) {
      createMission('Missile Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false);
      createMission('Flak Plans', 'Prestige', gameData.missions[0].galaxy, true, 1.5, 1, gameData.missions[0].galaxy, 100, false);
      updateMissionButtons();
    }
  }
  if ((lvlsCleared - 27) % 1000 === 0) {
    createMission('A Gold Mine', 'GoldMine', 1, true, 2, 3, gameData.missions[0].galaxy, 100, false);
    updateMissionButtons();
    addToDisplay('I have found the locaton of an ancient Gold Mine.  It may be worth checking out.', 'story');
  }
  if (lvlsCleared === 1699) {
    createMission('The Gateway', 'Gateway', 1, true, 2, 1, 15, 100, false);
    updateMissionButtons();
    addToDisplay('This site is putting off unusual power readings.  I don\'t know what it is, perhaps exploration is in order.', 'story');
  }
  if (lvlsCleared === 207) {
    gameData.technologies.laserPrestigeLevelUnlocked = 1;
    gameData.technologies.laserPrestigeLevelBought = 1;
    gameData.technologies.laserUpgrade = 1;
    $('#btnLaserUpgrade').text('Laser(' + (gameData.technologies.laserUpgrade) + ')');
    $('#btnLaserUpgrade').attr('title', gameEquipment.laser.tooltipForUpgrade());
    addToDisplay('As more capabilities come online I am finding new ways to take enemies offline.  I have rediscovered lasers.', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if (lvlsCleared === 274) {
    gameData.technologies.shieldPrestigeLevelUnlocked = 1;
    gameData.technologies.shieldPrestigeLevelBought = 1;
    gameData.technologies.shieldUpgrade = 1;
    $('#btnShieldUpgrade').text('Shield(' + (gameData.technologies.shieldUpgrade) + ')');
    $('#btnShieldUpgrade').attr('title', gameEquipment.shield.tooltipForUpgrade());
    addToDisplay('I have found the plans to allow us to add shields to drones.  This should increase their survivability.', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if (lvlsCleared === 327) {
    gameData.technologies.missilePrestigeLevelUnlocked = 1;
    gameData.technologies.missilePrestigeLevelBought = 1;
    gameData.technologies.missileUpgrade = 1;
    $('#btnMissileUpgrade').text('Upgrade Missile(' + (gameData.technologies.missileUpgrade) + ')');
    $('#btnMissileUpgrade').attr('title', gameEquipment.missile.tooltipForUpgrade());
    addToDisplay('Missiles.  Maybe this will force them to talk.', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if (lvlsCleared === 371) {
    gameData.technologies.flakPrestigeLevelUnlocked = 1;
    gameData.technologies.flakPrestigeLevelBought = 1;
    gameData.technologies.flakUpgrade = 1;
    $('#btnFlakUpgrade').text('Flak(' + (gameData.technologies.flakUpgrade) + ')');
    $('#btnFlakUpgrade').attr('title', gameEquipment.flak.tooltipForUpgrade());
    addToDisplay('Rudimentary plans for a new defense system have been found. Flak is online.', 'story');
    sortBuildings($('#buildingvisible'));
  }
  if ((lvlsCleared - 100) % 400 === 0 && lvlsCleared > 200) {
    createMission('Aether Mine ' + prettify(Math.floor((lvlsCleared - 100) / 400)), 'Aether', 1, true, 2, 3, gameData.missions[0].galaxy, 100, false);
    updateMissionButtons();
    addToDisplay('There\'s an aether mine. We should stock up.', 'story');
  }
  if ((gameData.technologies.metalProficiencyUnlocked < Math.floor((lvlsCleared - 10) / 100))) {
    gameData.technologies.metalProficiencyUnlocked = gameData.missions[0].galaxy;
    addToDisplay('I\'m gonna need a bigger pickaxe.', 'mission');
    sortBuildings($('#buildingvisible'));
  }
  if ((gameData.technologies.polymerProficiencyUnlocked < Math.floor((lvlsCleared - 20) / 100))) {
    gameData.technologies.polymerProficiencyUnlocked = gameData.missions[0].galaxy;
    addToDisplay('Plastics are my life.', 'mission');
    sortBuildings($('#buildingvisible'));
  }
  if (gameData.technologies.researchProficiency < Math.floor((lvlsCleared - 30) / 100)) {
    gameData.technologies.researchProficiency = Math.floor((lvlsCleared - 30) / 100);
    addToDisplay('Smarter I can become', 'mission');
    sortBuildings($('#buildingvisible'));
  }
  if ((gameData.missions[0].galaxy >= 1) && (gameData.missions[0].zone >= 5) && (gameData.technologies.autofightUnlock < 1)) {
    gameData.technologies.autofightUnlock = 1;
    addToDisplay('Your boffins have figured out how to send a ship when it is ready', 'mission');
    sortBuildings($('#buildingvisible'));
  }
  if (gameData.missions[0].galaxy > 15 && gameData.missions[0].zone === 99) {
    giveChronotonFragments((gameData.missions[0].galaxy - 6) * Math.pow(1.01, (gameData.missions[0].galaxy - 16)));
  }
}

Date.dateDiff = function (datepart, fromdate, todate) {
  datepart = datepart.toLowerCase();
  var diff = todate - fromdate;
  var divideBy = {
    w: 604800000,
    d: 86400000,
    h: 3600000,
    n: 60000,
    s: 1000,
    ms: 1
  };

  return Math.floor(diff / divideBy[datepart]);
};

function OnPageLoadFunction() {
  init();
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload !== 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      if (oldonload) {
        oldonload();
      }
      func();
    };
  }
}
addLoadEvent(OnPageLoadFunction);

function checkForGalaxy(s) {
  if (gameData.missions[0].missiontype != 'Galaxy') {
    addToDisplay('PROBLEM PROBLEM PROBLEM' + s, 'story');
    return false;
  }
  return true;
}

var romanMatrix = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I']
];

function convertToRoman(num) { // eslint-disable-line
  if (num === 0) {
    return '';
  }
  for (var i = 0; i < romanMatrix.length; i++) {
    if (num >= romanMatrix[i][0]) {
      return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
    }
  }
}

function removeMission(missionIndex) {
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
  days = ('0' + days).slice(-2);
  hours = ('0' + hours).slice(-2);
  minutes = ('0' + minutes).slice(-2);
  seconds = ('0' + seconds).slice(-2);

  return days + ':' + hours + ':' + minutes + ':' + seconds;
}

function addAchievement(name, bonus) {
  if (!gameData.achievements.some((e) => e.name === name)) {
    const newAchievement = {
      name: name,
      bonus: bonus
    };
    gameData.achievements.push(newAchievement);
    addToDisplay('New Achievement - ' + newAchievement.name, 'story');
  }

}

window.setInterval(function () {
  if (!initted) {
    return; // still waiting on pageload
  }
  var currentTime = new Date();
  var timeToCheckForSave = new Date();
  timeToCheckForSave.setMilliseconds(timeToCheckForSave.getMilliseconds() - 1000 * 60 * 5);

  if (timeToCheckForSave > lastSaveGameTime) {
    saveGame();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById('result').innerHTML = xhr.responseText;
      }
    };
    xhr.open('GET', 'version.txt');
    xhr.send();
  }

  const RESOURCE_PRODUCTION_FRAME_RATE = 200;
  const MILLISECONDS_PER_ATTACK_BASE = 1000;

  if (currentTime > gameData.nextProcessTime) {
    if (gameData.nextProcessTime > gameData.lastResourceProcessTime) {
      metalClick(RESOURCE_PRODUCTION_FRAME_RATE);
      polymerClick(RESOURCE_PRODUCTION_FRAME_RATE);
      researchClick(RESOURCE_PRODUCTION_FRAME_RATE);
      aetherClick(RESOURCE_PRODUCTION_FRAME_RATE);
      gameData.lastResourceProcessTime.setMilliseconds(gameData.lastResourceProcessTime.getMilliseconds() + RESOURCE_PRODUCTION_FRAME_RATE);
      gameData.world.timeElapsed += RESOURCE_PRODUCTION_FRAME_RATE;
    }

    if (gameData.nextProcessTime > gameData.lastRailgunCombatProcessTime && !gameData.world.paused) {
      gameData.lastRailgunCombatProcessTime.setMilliseconds(gameData.lastRailgunCombatProcessTime.getMilliseconds() + MILLISECONDS_PER_ATTACK_BASE - (gameData.perks.speed * 50));
      // we check for hitpoints in the attack function, but checking here allows either an attack or respawn per tick
      if (gameData.playership.hitPoints > 0) {
        if (gameData.enemyship.attributes.includes('Quick')) {
          attack(gameData.enemyship, gameData.playership);
          attack(gameData.playership, gameData.enemyship);
        } else {
          attack(gameData.playership, gameData.enemyship);
          attack(gameData.enemyship, gameData.playership);
        }
        if (gameData.playership.hitPoints <= 0) {
          addToDisplay('The drone is no longer on the sensors', 'combat');
        }
      } else {
        gameData.enemyship.shield = gameData.enemyship.shieldMax;
        if (gameData.technologies.autofightOn === 1) {
          sendShip();
        }
      }
    }

    if (gameData.enemyship.hitPoints === 0) { // new enemy
      gameData.playership.shield = gameData.playership.shieldMax;
      giveReward(); // reward stored in enemy
      checkForUnlocks();
      gameData.missions[gameData.world.currentMission].zone++;
      if (gameData.missions[gameData.world.currentMission].zone > gameData.missions[gameData.world.currentMission].enemies.length - 1) {
        gtag('event', 'completed region', {
          event_category: 'event',
          event_label: 'label',
          value: gameData.missions[gameData.world.currentMission].name
        });
        var newGalaxy = gameData.missions[0].galaxy + 1;
        gameData.world.lastGalaxy = gameData.missions[0].galaxy;
        giveMissionReward((gameData.missions[gameData.world.currentMission]));
        if (gameData.world.currentMission === 0) {
          removeMission(0);
          createMission('Galaxy ' + newGalaxy, 'Galaxy', 1, true, 1, 1, newGalaxy, 100, true);
          checkForGalaxy(2);
        } else if (gameData.missions[gameData.world.currentMission].unique) {
          removeMission(gameData.world.currentMission);
          checkForGalaxy(1);
        } else {
          gameData.missions[gameData.world.currentMission].enemies = createMissionMap(gameData.missions[gameData.world.currentMission]);
          gameData.missions[gameData.world.currentMission].zone = 0;
        }
        if (!checkForGalaxy(3)) {
          createMission('Galaxy ' + newGalaxy, 'Galaxy', 1, true, 1, 1, newGalaxy, 100, true);
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
  var msRunTime = Date.dateDiff('ms', currentTime, endTime);
  if (msRunTime > 50) {
    addToDisplay(msRunTime, 'story');
    gtag('event', 'Interval exceeded', {
      event_category: 'error',
      event_label: 'interval',
      value: msRunTime
    });
  }
}, 25);