const AUTOFIGHT_METAL_COST = 1000
const AUTOFIGHT_POLYMERS_COST = 500
const AUTOFIGHT_RP_COST = 100
const FACTORY_BASE_COST = 20
const FACTORY_GROWTH_FACTOR = 1.3
const FACTORY_POWER_USAGE = 2
const GENERATOR_BASE_COST = 100
const GENERATOR_GROWTH_FACTOR = 1.3
const LAB_METAL_BASE_COST = 100
const LAB_METAL_GROWTH_FACTOR = 1.4
const LAB_POLYMER_BASE_COST = 100
const LAB_POLYMER_GROWTH_FACTOR = 1.5
const LAB_POWER_USAGE = 5
const MINE_BASE_COST = 10
const MINE_GROWTH_FACTOR = 1.1
const MINE_POWER_USAGE = 1
const POWER_PER_GENERATOR = 10
const SHIPYARD_METAL_BASE_COST = 1000
const SHIPYARD_METAL_GROWTH_FACTOR = 1.3
const SHIPYARD_POWER_USAGE = 10
const SHIPYARD_RP_BASE_COST = 100
const SHIPYARD_RP_GROWTH_FACTOR = 1.2
const METAL_PROFICIENCY_BASE_RATE = 1.25
const POLYMER_PROFICIENCY_BASE_RATE = 1.25
const POWER_PROFICIENCY_BASE_RATE = 1.05
const RESEARCH_PROFICIENCY_BASE_RATE = 1.25

const METAL_PROFIECIENCY_METAL_COST = 1000
const METAL_PROFIECIENCY_METAL_GROWTH_FACTOR = 1.3
const METAL_PROFIECIENCY_POLYMER_COST = 0.0
const METAL_PROFIECIENCY_POLYMER_GROWTH_FACTOR = 1.3
const METAL_PROFIECIENCY_RP_COST = 100
const METAL_PROFIECIENCY_RP_GROWTH_FACTOR = 1.3

const POLYMER_PROFIECIENCY_METAL_COST = 0
const POLYMER_PROFIECIENCY_METAL_GROWTH_FACTOR = 1.3
const POLYMER_PROFIECIENCY_POLYMER_COST = 500
const POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR = 1.3
const POLYMER_PROFIECIENCY_RP_COST = 100
const POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR = 1.3

const POWER_PROFIECIENCY_METAL_COST = 1000
const POWER_PROFIECIENCY_METAL_GROWTH_FACTOR = 1.3
const POWER_PROFIECIENCY_POLYMER_COST = 500
const POWER_PROFIECIENCY_POLYMER_GROWTH_FACTOR = 1.3
const POWER_PROFIECIENCY_RP_COST = 100
const POWER_PROFIECIENCY_RP_GROWTH_FACTOR = 1.3

const RESEARCH_PROFIECIENCY_METAL_COST = 1000
const RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR = 1.3
const RESEARCH_PROFIECIENCY_POLYMER_COST = 500
const RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR = 1.3
const RESEARCH_PROFIECIENCY_RP_COST = 100
const RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR = 1.3

const RAILGUN_UPGRADE_METAL_BASE_COST = 1000
const RAILGUN_UPGRADE_POLYMER_BASE_COST = 0
const RAILGUN_UPGRADE_RP_BASE_COST = 500
const RAILGUN_UPGRADE_METAL_GROWTH_FACTOR = 1.5
const RAILGUN_UPGRADE_POLYMER_GROWTH_FACTOR = 0
const RAILGUN_UPGRADE_RP_GROWTH_FACTOR = 1.5
const RAILGUN_UPGRADE_BASE_IMPROVEMENT = 5
const RAILGUN_PRESTIGE_METAL_BASE_COST = 100000
const RAILGUN_PRESTIGE_POLYMER_BASE_COST = 0
const RAILGUN_PRESTIGE_RP_BASE_COST = 5000
const RAILGUN_PRESTIGE_METAL_GROWTH_FACTOR = 10
const RAILGUN_PRESTIGE_POLYMER_GROWTH_FACTOR = 0
const RAILGUN_PRESTIGE_RP_GROWTH_FACTOR = 10
const RAILGUN_PRESTIGE_BASE_MULTIPLIER = 8

const LASER_UPGRADE_METAL_BASE_COST = 900
const LASER_UPGRADE_POLYMER_BASE_COST = 500
const LASER_UPGRADE_RP_BASE_COST = 500
const LASER_UPGRADE_METAL_GROWTH_FACTOR = 1.5
const LASER_UPGRADE_POLYMER_GROWTH_FACTOR = 1.5
const LASER_UPGRADE_RP_GROWTH_FACTOR = 1.5
const LASER_UPGRADE_BASE_IMPROVEMENT = 0.4
const LASER_PRESTIGE_METAL_BASE_COST = 90000
const LASER_PRESTIGE_POLYMER_BASE_COST = 50000
const LASER_PRESTIGE_RP_BASE_COST = 5000
const LASER_PRESTIGE_METAL_GROWTH_FACTOR = 10
const LASER_PRESTIGE_POLYMER_GROWTH_FACTOR = 10
const LASER_PRESTIGE_RP_GROWTH_FACTOR = 10
const LASER_PRESTIGE_BASE_MULTIPLIER = 8

const ARMOR_UPGRADE_METAL_BASE_COST = 0
const ARMOR_UPGRADE_POLYMER_BASE_COST = 500
const ARMOR_UPGRADE_RP_BASE_COST = 500
const ARMOR_UPGRADE_METAL_GROWTH_FACTOR = 1.5
const ARMOR_UPGRADE_POLYMER_GROWTH_FACTOR = 1.5
const ARMOR_UPGRADE_RP_GROWTH_FACTOR = 1.5
const ARMOR_UPGRADE_BASE_IMPROVEMENT = 10
const ARMOR_PRESTIGE_METAL_BASE_COST = 0
const ARMOR_PRESTIGE_POLYMER_BASE_COST = 50000
const ARMOR_PRESTIGE_RP_BASE_COST = 5000
const ARMOR_PRESTIGE_METAL_GROWTH_FACTOR = 0
const ARMOR_PRESTIGE_POLYMER_GROWTH_FACTOR = 10
const ARMOR_PRESTIGE_RP_GROWTH_FACTOR = 10
const ARMOR_PRESTIGE_BASE_MULTIPLIER = 8

var gameData = {
  resources: {
    metal: 0,
    polymers: 0,
    power: 10,
    researchPoints: 0
  },
  buildings: {
    mines: 1,
    generators: 1,
    factories: 0,
    labs: 0
  },
  playership: {
    size: 0,
    hitPoints: 0,
    railgunMinDamage: 0,
    railgunMaxDamage: 0,
    laserMinDamage: 0,
    laserMaxDamage: 0,
    defense: 0
  },
  enemyship: {
    size: 0,
    hitPoints: 0,
    railgunMinDamage: 0,
    railgunMaxDamage: 0,
    laserMinDamage: 0,
    laserMaxDamage: 0,
    defense: 0
  },
  world: {
    region: 1,
    zone: 0
  },
  technologies: {
    autofightBought: 0,
    autofightOn: 0,
    autofightUnlock: 0,
    metalProficiencyUnlocked: 0,
    metalProficiencyBought: 0,
    polymerProficiencyUnlocked: 0,
    polymerProficiencyBought: 0,
    powerProficiencyUnlocked: 0,
    powerProficiencyBought: 0,
    researchProficiency: 0,
    researchProficiencyBought: 0,
    shipyardTechUnlock: 1,
    railgunPrestigeLevelUnlocked: 1,
    railgunPrestigeLevelBought: 1,
    railgunUpgrade: 1,
    laserPrestigeLevelUnlocked: 0,
    laserPrestigeLevelBought: 0,
    laserUpgrade: 0,
    armorPrestigeLevelUnlocked: 1,
    armorPrestigeLevelBought: 1,
    armorUpgrade: 1
  },
  shipyard: 0,
  lastResourceProcessTime: new Date(),
  lastRailgunCombatProcessTime: new Date(),
  lastLaserCombatProcessTime: new Date(),
  nextProcessTime: new Date(),
  lastSentShipTime: new Date()
}

var lastSaveGameTime = new Date();
var needtoload = true;
var textToDisplay = [];

function saveGame(){
  localStorage.setItem("save",JSON.stringify(gameData));
  ga('send', 'event', 'My Game', 'Save', 'label', 'value', 'objext');
};

function load(){
  needtoload = false;
  var savegame = JSON.parse(localStorage.getItem("save"));

  if (savegame == null) return;

  if (typeof savegame.buildings.factories !== "undefined") gameData.buildings.factories = savegame.buildings.factories;
  if (typeof savegame.buildings.generators !== "undefined") gameData.buildings.generators = savegame.buildings.generators;
  if (typeof savegame.buildings.labs !== "undefined") gameData.buildings.labs = savegame.buildings.labs;
  if (typeof savegame.buildings.mines !== "undefined") gameData.buildings.mines = savegame.buildings.mines;
  if (typeof savegame.enemyship.defense !== "undefined") gameData.enemyship.defense = savegame.enemyship.defense;
  if (typeof savegame.enemyship.hitPoints !== "undefined") gameData.enemyship.hitPoints = savegame.enemyship.hitPoints;
  if (typeof savegame.enemyship.railgunMaxDamage !== "undefined") gameData.enemyship.railgunMaxDamage = savegame.enemyship.railgunMaxDamage;
  if (typeof savegame.enemyship.railgunMinDamage !== "undefined") gameData.enemyship.railgunMinDamage = savegame.enemyship.railgunMinDamage;
  if (typeof savegame.lastRailgunCombatProcessTime !== "undefined") gameData.lastRailgunCombatProcessTime = new Date (savegame.lastRailgunCombatProcessTime);
  if (typeof savegame.lastLaserCombatProcessTime !== "undefined") gameData.lastLaserCombatProcessTime = new Date (savegame.lastLaserCombatProcessTime);
  if (typeof savegame.lastResourceProcessTime !== "undefined") gameData.lastResourceProcessTime = new Date(savegame.lastResourceProcessTime);  
  if (typeof savegame.nextProcessTime !== "undefined") gameData.nextProcessTime = new Date (savegame.nextProcessTime);
  if (typeof savegame.playership.defense !== "undefined") gameData.playership.defense = savegame.playership.defense;
  if (typeof savegame.playership.hitPoints !== "undefined") gameData.playership.hitPoints = savegame.playership.hitPoints;
  if (typeof savegame.playership.railgunMaxDamage !== "undefined") gameData.playership.railgunMaxDamage = savegame.playership.railgunMaxDamage;
  if (typeof savegame.playership.railgunMinDamage !== "undefined") gameData.playership.railgunMinDamage = savegame.playership.railgunMinDamage;
  if (typeof savegame.playership.size !== "undefined") gameData.playership.size = savegame.playership.size;
  if (typeof savegame.resources.metal !== "undefined") gameData.resources.metal = savegame.resources.metal;
  if (typeof savegame.resources.polymers !== "undefined") gameData.resources.polymers = savegame.resources.polymers;
  if (typeof savegame.resources.power !== "undefined") gameData.resources.power = savegame.resources.power;
  if (typeof savegame.resources.researchPoints !== "undefined") gameData.resources.researchPoints = savegame.resources.researchPoints;
  if (typeof savegame.shipyard !== "undefined") gameData.shipyard = savegame.shipyard;
  if (typeof savegame.technologies.autofightBought !== "undefined") gameData.technologies.autofightBought = savegame.technologies.autofightBought;
  if (typeof savegame.technologies.autofightOn !== "undefined") gameData.technologies.autofightOn = savegame.technologies.autofightOn;
  if (typeof savegame.technologies.autofightUnlock !== "undefined") gameData.technologies.autofightUnlock = savegame.technologies.autofightUnlock;
  if (typeof savegame.technologies.metalProficiencyUnlocked !== "undefined") gameData.technologies.metalProficiencyUnlocked = savegame.technologies.metalProficiencyUnlocked;
  if (typeof savegame.technologies.metalProficiencyBought !== "undefined") gameData.technologies.metalProficiencyBought = savegame.technologies.metalProficiencyBought;
  if (typeof savegame.technologies.polymerProficiencyUnlocked !== "undefined") gameData.technologies.polymerProficiencyUnlocked = savegame.technologies.polymerProficiencyUnlocked;
  if (typeof savegame.technologies.polymerProficiencyBought !== "undefined") gameData.technologies.polymerProficiencyBought = savegame.technologies.polymerProficiencyBought;
  if (typeof savegame.technologies.powerProficiencyUnlocked !== "undefined") gameData.technologies.powerProficiencyUnlocked = savegame.technologies.powerProficiencyUnlocked;
  if (typeof savegame.technologies.powerProficiencyBought !== "undefined") gameData.technologies.powerProficiencyBought = savegame.technologies.powerProficiencyBought;
  if (typeof savegame.technologies.researchProficiency !== "undefined") gameData.technologies.researchProficiency = savegame.technologies.researchProficiency;
  if (typeof savegame.technologies.researchProficiencyBought !== "undefined") gameData.technologies.researchProficiencyBought = savegame.technologies.researchProficiencyBought;
  if (typeof savegame.technologies.shipyardTechUnlock !== "undefined") gameData.technologies.shipyardTechUnlock = savegame.technologies.shipyardTechUnlock;
  if (typeof savegame.technologies.railgunPrestigeLevelUnlocked !== "undefined") gameData.technologies.railgunPrestigeLevelUnlocked = savegame.technologies.railgunPrestigeLevelUnlocked;
  if (typeof savegame.technologies.railgunPrestigeLevelBought !== "undefined") gameData.technologies.railgunPrestigeLevelBought = savegame.technologies.railgunPrestigeLevelBought;
  if (typeof savegame.technologies.railgunUpgrade !== "undefined") gameData.technologies.railgunUpgrade = savegame.technologies.railgunUpgrade;
  if (typeof savegame.technologies.laserPrestigeLevelUnlocked !== "undefined") gameData.technologies.laserPrestigeLevelUnlocked = savegame.technologies.laserPrestigeLevelUnlocked;
  if (typeof savegame.technologies.laserPrestigeLevelBought !== "undefined") gameData.technologies.laserPrestigeLevelBought = savegame.technologies.laserPrestigeLevelBought;
  if (typeof savegame.technologies.laserUpgrade !== "undefined") gameData.technologies.laserUpgrade = savegame.technologies.laserUpgrade;
  if (typeof savegame.technologies.armorPrestigeLevelUnlocked !== "undefined") gameData.technologies.armorPrestigeLevelUnlocked = savegame.technologies.armorPrestigeLevelUnlocked;
  if (typeof savegame.technologies.armorPrestigeLevelBought !== "undefined") gameData.technologies.armorPrestigeLevelBought = savegame.technologies.armorPrestigeLevelBought;
  if (typeof savegame.technologies.armorUpgrade !== "undefined") gameData.technologies.armorUpgrade = savegame.technologies.armorUpgrade;
  if (typeof savegame.world.region !== "undefined") gameData.world.region = savegame.world.region;
  if (typeof savegame.world.zone !== "undefined") gameData.world.zone = savegame.world.zone;
 };

function prettify(input){
  var output = Math.round(input * 1)/1;
  return output;
}

function updateGUI(){
  UpdatePower();

  document.getElementById('mines').innerHTML = prettify(gameData.buildings.mines);
  document.getElementById('metal').innerHTML = prettify(gameData.resources.metal);
  document.getElementById('labs').innerHTML = prettify(gameData.buildings.labs);
  document.getElementById('researchPoints').innerHTML = prettify(gameData.resources.researchPoints);
  document.getElementById('polymers').innerHTML = prettify(gameData.resources.polymers);
  document.getElementById('power').innerHTML = prettify(gameData.resources.power);
  document.getElementById('generators').innerHTML = prettify(gameData.buildings.generators);
  document.getElementById('factories').innerHTML = prettify(gameData.buildings.factories);
  document.getElementById('shipyard').innerHTML = prettify(gameData.shipyard);
  document.getElementById('shipSize').innerHTML = prettify(gameData.playership.size);
  document.getElementById('shipHitPoints').innerHTML = prettify(gameData.playership.hitPoints);
  document.getElementById('shipRailgunMinDamage').innerHTML = prettify(gameData.playership.railgunMinDamage);
  document.getElementById('shipRailgunMaxDamage').innerHTML = prettify(gameData.playership.railgunMaxDamage);
  document.getElementById('shipLaserMinDamage').innerHTML = prettify(gameData.playership.laserMinDamage);
  document.getElementById('shipLaserMaxDamage').innerHTML = prettify(gameData.playership.laserMaxDamage);
  document.getElementById('shipDefense').innerHTML = prettify(gameData.playership.defense);
  document.getElementById('enemyHitPoints').innerHTML = prettify(gameData.enemyship.hitPoints);
  document.getElementById('enemyRailgunMinDamage').innerHTML = prettify(gameData.enemyship.railgunMinDamage);
  document.getElementById('enemyRailgunMaxDamage').innerHTML = prettify(gameData.enemyship.railgunMaxDamage);
  document.getElementById('enemyLaserMinDamage').innerHTML = prettify(gameData.enemyship.laserMinDamage);
  document.getElementById('enemyLaserMaxDamage').innerHTML = prettify(gameData.enemyship.laserMaxDamage);
  document.getElementById('enemyDefense').innerHTML = prettify(gameData.enemyship.defense);
  document.getElementById('region').innerHTML = gameData.world.region;
  document.getElementById('zone').innerHTML = gameData.world.zone;
  document.getElementById('textToDisplay').innerHTML = getDisplay();
 
  $('#btnFight').attr('title', 'Metal Cost:' + shipMetalRequired(gameData.shipyard) + '\nPolymer Cost:' + shipPolymerRequired(gameData.shipyard));
  $("#btnFight").removeClass("button").addClass("buttonInvalid");
  $("#btnFight").removeClass("invisible").addClass("visible");
  if (canAffordFight()){
    $("#btnFight").removeClass("buttonInvalid").addClass("button");
  };

  $("#btnAutoFightOn").removeClass("visible").addClass("invisible");
  if ((gameData.technologies.autofightBought == 1)){
    $("#btnAutoFightOn").removeClass("invisible").addClass("visible");
    if(gameData.technologies.autofightOn == 1){
      $("#btnAutoFightOn").text("Turn AutoFight Off");
    } else {
      $("#btnAutoFightOn").text("Turn AutoFight On");
    }
  };

  $('#btnAutoFight').attr('title', 'Metal Cost:' + AUTOFIGHT_METAL_COST + '\nPolymer Cost:' + AUTOFIGHT_POLYMERS_COST + '\nResarch Point Cost:' + AUTOFIGHT_RP_COST);
  $("#btnAutoFight").removeClass("button").addClass("buttonInvalid");
  $("#btnAutoFight").removeClass("visible").addClass("invisible");
  if ((gameData.technologies.autofightBought == 0)){
    $("#btnAutoFight").removeClass("invisible").addClass("visible");
  };
  if (canAffordAutoFight()){
    $("#btnAutoFight").removeClass("buttonInvalid").addClass("button");
  };

  $('#btnMetalTech').attr('title', 'Metal Cost:' + Math.floor(METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought)) + '\nResearch Cost:' + Math.floor(METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought)));
  $("#btnMetalTech").removeClass("button").addClass("buttonInvalid");
  $("#btnMetalTech").removeClass("visible").addClass("invisible");
  if (gameData.technologies.metalProficiencyUnlocked > gameData.technologies.metalProficiencyBought){
    $("#btnMetalTech").removeClass("invisible").addClass("visible");
    $("#btnMetalTech").text("Upgrade Metal " + (gameData.technologies.metalProficiencyBought + 1));
    if (canAffordMetalProfieciency()){
      $("#btnMetalTech").removeClass("buttonInvalid").addClass("button");
    };
  };

  $('#btnPolymerTech').attr('title', 'Polymer Cost:' + Math.floor(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)) + '\nResearch Cost:' + Math.floor(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)));
  $("#btnPolymerTech").removeClass("button").addClass("buttonInvalid");
  $("#btnPolymerTech").removeClass("visible").addClass("invisible");
  if (gameData.technologies.polymerProficiencyUnlocked > gameData.technologies.polymerProficiencyBought){
    $("#btnPolymerTech").removeClass("invisible").addClass("visible");
    $("#btnPolymerTech").text("Upgrade Polymer " + (gameData.technologies.polymerProficiencyBought + 1));
    if (canAffordPolymerProfieciency()){
      $("#btnPolymerTech").removeClass("buttonInvalid").addClass("button");
    };
  };

  $('#btnPowerTech').attr('title', 'Metal Cost:' + Math.floor(POWER_PROFIECIENCY_METAL_COST * Math.pow(POWER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought)) + '\nPolymer Cost:' + Math.floor(POWER_PROFIECIENCY_POLYMER_COST * Math.pow(POWER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought)) + '\nResearch Cost:' + Math.floor(POWER_PROFIECIENCY_RP_COST * Math.pow(POWER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought)));
  $("#btnPowerTech").removeClass("button").addClass("buttonInvalid");
  $("#btnPowerTech").removeClass("visible").addClass("invisible");
  if (gameData.technologies.powerProficiencyUnlocked > gameData.technologies.powerProficiencyBought){
    $("#btnPowerTech").removeClass("invisible").addClass("visible");
    $("#btnPowerTech").text("Upgrade Power " + (gameData.technologies.powerProficiencyBought + 1));
    if (canAffordPowerProfieciency()){
      $("#btnPowerTech").removeClass("buttonInvalid").addClass("button");
    };
  };

  $('#btnResearchTech').attr('title', 'Metal Cost:' + Math.floor(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) + '\nPolymer Cost:' + Math.floor(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) + '\nResearch Cost:' + Math.floor(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)));
  $("#btnResearchTech").removeClass("button").addClass("buttonInvalid");
  $("#btnResearchTech").removeClass("visible").addClass("invisible");
  if (gameData.technologies.researchProficiency > gameData.technologies.researchProficiencyBought){
    $("#btnResearchTech").removeClass("invisible").addClass("visible");
    $("#btnResearchTech").text("Upgrade Research " + (gameData.technologies.researchProficiencyBought + 1));
    if (canAffordResearchProfieciency()){
      $("#btnResearchTech").removeClass("buttonInvalid").addClass("button");
    };
  };

  $('#btnBuyShipyard').attr('title', 'Metal Cost:' + Math.floor(SHIPYARD_METAL_BASE_COST * Math.pow(SHIPYARD_METAL_GROWTH_FACTOR, gameData.shipyard)) + '\nPower Cost:' + SHIPYARD_POWER_USAGE + '\nResarch Cost:' + Math.floor(SHIPYARD_RP_BASE_COST * Math.pow(SHIPYARD_RP_GROWTH_FACTOR, gameData.shipyard)));
  $("#btnBuyShipyard").removeClass("button").addClass("buttonInvalid");
  $("#btnBuyShipyard").removeClass("visible").addClass("invisible");
  if (gameData.shipyard < gameData.technologies.shipyardTechUnlock){
    $("#btnBuyShipyard").removeClass("invisible").addClass("visible");
    $("#btnBuyShipyard").text("Upgrade Shipyard " + (gameData.technologies.shipyardTechUnlock));
    if (canAffordShipyard()){
      $("#btnBuyShipyard").removeClass("buttonInvalid").addClass("button");
    };
  };

  $('#btnBuyMine').attr('title', 'Metal Cost:' + Math.floor(MINE_BASE_COST * Math.pow(MINE_GROWTH_FACTOR, gameData.buildings.mines)) + '\nPower Cost:' + MINE_POWER_USAGE);
  $("#btnBuyMine").removeClass("button").addClass("buttonInvalid");
  $("#btnBuyMine").removeClass("invisible").addClass("visible");
  if (canAffordMine()){
    $("#btnBuyMine").removeClass("buttonInvalid").addClass("button");
  };

  $('#btnBuyGenerator').attr('title', 'Metal Cost:' + Math.floor(GENERATOR_BASE_COST * Math.pow(GENERATOR_GROWTH_FACTOR, gameData.buildings.generators)));
  $("#btnBuyGenerator").removeClass("button").addClass("buttonInvalid");
  $("#btnBuyGenerator").removeClass("invisible").addClass("visible");
  if (canAffordGenerator()){
    $("#btnBuyGenerator").removeClass("buttonInvalid").addClass("button");
  };

  $('#btnBuyFactory').attr('title', 'Metal Cost:' + Math.floor(FACTORY_BASE_COST * Math.pow(FACTORY_GROWTH_FACTOR, gameData.buildings.factories)) + '\nPower Cost:' + FACTORY_POWER_USAGE);
  $("#btnBuyFactory").removeClass("button").addClass("buttonInvalid");
  $("#btnBuyFactory").removeClass("invisible").addClass("visible");
  if (canAffordFactory()){
    $("#btnBuyFactory").removeClass("buttonInvalid").addClass("button");
  };
 
  $('#btnBuyLab').attr('title', 'Metal Cost:' + Math.floor(LAB_METAL_BASE_COST * Math.pow(LAB_METAL_GROWTH_FACTOR, gameData.buildings.labs)) + 
    '\nPolymer Cost:' + Math.floor(LAB_POLYMER_BASE_COST * Math.pow(LAB_POLYMER_GROWTH_FACTOR, gameData.buildings.labs)) + 
    '\nPower Cost:' + LAB_POWER_USAGE);
  $("#btnBuyLab").removeClass("button").addClass("buttonInvalid");
  $("#btnBuyLab").removeClass("invisible").addClass("visible");
  if (canAffordLab()){
    $("#btnBuyLab").removeClass("buttonInvalid").addClass("button");
  };

  $('#btnRailgunUpgrade').attr('title', 'Metal Cost:' + Math.floor(RAILGUN_UPGRADE_METAL_BASE_COST * Math.pow(RAILGUN_UPGRADE_METAL_GROWTH_FACTOR, gameData.technologies.railgunUpgrade + (gameData.technologies.railgunPrestigeLevelBought -1) * 11)) + '\nPolymer Cost:' + Math.floor(RAILGUN_UPGRADE_POLYMER_BASE_COST * Math.pow(RAILGUN_UPGRADE_POLYMER_GROWTH_FACTOR, gameData.technologies.railgunUpgrade + (gameData.technologies.railgunPrestigeLevelBought -1) * 11)) + '\nResearch Cost:' + Math.floor(RAILGUN_UPGRADE_RP_BASE_COST * Math.pow(RAILGUN_UPGRADE_RP_GROWTH_FACTOR, gameData.technologies.railgunUpgrade + (gameData.technologies.railgunPrestigeLevelBought -1) * 11)));
  $("#btnRailgunUpgrade").removeClass("button").addClass("buttonInvalid");
  $("#btnRailgunUpgrade").text("Upgrade Railgun " + (gameData.technologies.railgunUpgrade + 1));
  if (canAffordRailgunUpgrade()){
    $("#btnRailgunUpgrade").removeClass("buttonInvalid").addClass("button");
  };
  
  $('#btnLaserUpgrade').attr('title', 'Metal Cost:' + Math.floor(LASER_UPGRADE_METAL_BASE_COST * Math.pow(LASER_UPGRADE_METAL_GROWTH_FACTOR, gameData.technologies.laserUpgrade + (gameData.technologies.laserPrestigeLevelBought -1) * 11)) + '\nPolymer Cost:' + Math.floor(LASER_UPGRADE_POLYMER_BASE_COST * Math.pow(LASER_UPGRADE_POLYMER_GROWTH_FACTOR, gameData.technologies.laserUpgrade + (gameData.technologies.laserPrestigeLevelBought -1) * 11)) + '\nResearch Cost:' + Math.floor(LASER_UPGRADE_RP_BASE_COST * Math.pow(LASER_UPGRADE_RP_GROWTH_FACTOR, gameData.technologies.laserUpgrade + (gameData.technologies.laserPrestigeLevelBought -1) * 11)));
  $("#btnLaserUpgrade").removeClass("button").addClass("buttonInvalid");
  $("#btnLaserUpgrade").text("Upgrade Laser " + (gameData.technologies.laserUpgrade + 1));
  $("#btnLaserUpgrade").removeClass("visible").addClass("invisible");
  if (gameData.technologies.laserPrestigeLevelUnlocked > 0){
    $("#btnLaserUpgrade").removeClass("invisible").addClass("visible");
  };
  if (canAffordLaserUpgrade()){
    $("#btnLaserUpgrade").removeClass("buttonInvalid").addClass("button");
  };

  $('#btnArmorUpgrade').attr('title', 'Metal Cost:' + Math.floor(ARMOR_UPGRADE_METAL_BASE_COST * Math.pow(ARMOR_UPGRADE_METAL_GROWTH_FACTOR, gameData.technologies.armorUpgrade + (gameData.technologies.armorPrestigeLevelBought -1) * 11)) + '\nPolymer Cost:' + Math.floor(ARMOR_UPGRADE_POLYMER_BASE_COST * Math.pow(ARMOR_UPGRADE_POLYMER_GROWTH_FACTOR, gameData.technologies.armorUpgrade + (gameData.technologies.armorPrestigeLevelBought -1) * 11)) + '\nResearch Cost:' + Math.floor(ARMOR_UPGRADE_RP_BASE_COST * Math.pow(ARMOR_UPGRADE_RP_GROWTH_FACTOR, gameData.technologies.armorUpgrade + (gameData.technologies.armorPrestigeLevelBought -1) * 11)));
  $("#btnArmorUpgrade").removeClass("button").addClass("buttonInvalid");
  $("#btnArmorUpgrade").text("Upgrade Armor " + (gameData.technologies.armorUpgrade + 1));
  if (canAffordArmorUpgrade()){
    $("#btnArmorUpgrade").removeClass("buttonInvalid").addClass("button");
  };

  $('#btnRailgunPrestige').attr('title', 'Metal Cost:' + Math.floor(RAILGUN_PRESTIGE_METAL_BASE_COST * Math.pow(RAILGUN_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1)) + '\nPolymer Cost:' + Math.floor(RAILGUN_PRESTIGE_POLYMER_BASE_COST * Math.pow(RAILGUN_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1)) + '\nResearch Cost:' + Math.floor(RAILGUN_PRESTIGE_RP_BASE_COST * Math.pow(RAILGUN_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1)));
  $("#btnRailgunPrestige").removeClass("button").addClass("buttonInvalid");
  $("#btnRailgunPrestige").removeClass("visible").addClass("invisible");
  if (gameData.technologies.railgunPrestigeLevelUnlocked > gameData.technologies.railgunPrestigeLevelBought){
    $("#btnRailgunPrestige").removeClass("invisible").addClass("visible");
    $("#btnRailgunPrestige").text("Prestige Railgun " + (gameData.technologies.railgunPrestigeLevelBought + 1));
    if (canAffordRailgunPrestige()){
      $("#btnRailgunPrestige").removeClass("buttonInvalid").addClass("button");
    };
  };

  $('#btnLaserPrestige').attr('title', 'Metal Cost:' + Math.floor(LASER_PRESTIGE_METAL_BASE_COST * Math.pow(LASER_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1)) + '\nPolymer Cost:' + Math.floor(LASER_PRESTIGE_POLYMER_BASE_COST * Math.pow(LASER_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1)) + '\nResearch Cost:' + Math.floor(LASER_PRESTIGE_RP_BASE_COST * Math.pow(LASER_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1)));
  $("#btnLaserPrestige").removeClass("button").addClass("buttonInvalid");
  $("#btnLaserPrestige").removeClass("visible").addClass("invisible");
  if (gameData.technologies.laserPrestigeLevelUnlocked > gameData.technologies.laserPrestigeLevelBought){
    $("#btnLaserPrestige").removeClass("invisible").addClass("visible");
    $("#btnLaserPrestige").text("Prestige Laser " + (gameData.technologies.laserPrestigeLevelBought + 1));
    if (canAffordLaserPrestige()){
      $("#btnLaserPrestige").removeClass("buttonInvalid").addClass("button");
    };
  };

  $('#btnArmorPrestige').attr('title', 'Metal Cost:' + Math.floor(ARMOR_PRESTIGE_METAL_BASE_COST * Math.pow(ARMOR_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1)) + '\nPolymer Cost:' + Math.floor(ARMOR_PRESTIGE_POLYMER_BASE_COST * Math.pow(ARMOR_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1)) + '\nResearch Cost:' + Math.floor(ARMOR_PRESTIGE_RP_BASE_COST * Math.pow(ARMOR_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1)));
  $("#btnArmorPrestige").removeClass("button").addClass("buttonInvalid");
  $("#btnArmorPrestige").removeClass("visible").addClass("invisible");
  if (gameData.technologies.armorPrestigeLevelUnlocked > gameData.technologies.armorPrestigeLevelBought){
    $("#btnArmorPrestige").removeClass("invisible").addClass("visible");
    $("#btnArmorPrestige").text("Prestige Armor " + (gameData.technologies.armorPrestigeLevelBought + 1));
    if (canAffordArmorPrestige()){
      $("#btnArmorPrestige").removeClass("buttonInvalid").addClass("button");
    };
  };
};

function canAffordMine(){
  var facilityMetalCost = Math.floor(MINE_BASE_COST * Math.pow(MINE_GROWTH_FACTOR, gameData.buildings.mines));
  if(gameData.resources.metal < facilityMetalCost){
    return false;
  };
  if(CheckPower(MINE_POWER_USAGE) == false){
    return false;
  };
  return true;
};

function canAffordGenerator(){
  var facilityMetalCost = Math.floor(GENERATOR_BASE_COST * Math.pow(GENERATOR_GROWTH_FACTOR, gameData.buildings.generators));
  if(gameData.resources.metal < facilityMetalCost){
    return false;
  };
  return true;
};

function canAffordFactory(){
  var facilityMetalCost = Math.floor(FACTORY_BASE_COST * Math.pow(FACTORY_GROWTH_FACTOR, gameData.buildings.factories));
  if(gameData.resources.metal < facilityMetalCost){
    return false;
  };
  if(CheckPower(FACTORY_POWER_USAGE) == false){
    return false;
  };
  return true;
};

function canAffordShipyard(){
  var facilityMetalCost = Math.floor(SHIPYARD_METAL_BASE_COST * Math.pow(SHIPYARD_METAL_GROWTH_FACTOR, gameData.shipyard));
  if(gameData.resources.metal < facilityMetalCost){
    return false;
  };
  var facilityRPCost = Math.floor(SHIPYARD_RP_BASE_COST * Math.pow(SHIPYARD_RP_GROWTH_FACTOR, gameData.shipyard));
  if(gameData.resources.researchPoints < facilityRPCost){
    return false;
  };
  if(CheckPower(SHIPYARD_POWER_USAGE) == false){
    return false;
  };
  if (gameData.technologies.shipyardTechUnlock <= gameData.shipyard){
    return false;
  };
  return true;
};

function canAffordLab(){
  var facilityMetalCost = Math.floor(LAB_METAL_BASE_COST * Math.pow(LAB_METAL_GROWTH_FACTOR, gameData.buildings.labs));
  if(gameData.resources.metal < facilityMetalCost){
    return false;
  };
  var facilityPolymerCost = Math.floor(LAB_POLYMER_BASE_COST * Math.pow(LAB_POLYMER_GROWTH_FACTOR, gameData.buildings.labs));
  if(gameData.resources.polymers < facilityPolymerCost){
    return false;
  };
  if(CheckPower(LAB_POWER_USAGE) == false){
    return false;
  };
  return true;
};

function canAffordAutoFight(){
  if(gameData.resources.metal < AUTOFIGHT_METAL_COST){
    return false;
  };
  if(gameData.resources.polymers < AUTOFIGHT_POLYMERS_COST){
    return false;
  };
  if(gameData.resources.researchPoints < AUTOFIGHT_RP_COST){
    return false;
  };
  return true;
};

function canAffordFight(){
  var shipMetalCost = shipMetalRequired(gameData.shipyard)
  var shipPolymerCost = shipPolymerRequired(gameData.shipyard)
  if(gameData.resources.metal < shipMetalCost){
    return false;
  };
  if(gameData.resources.polymers < shipPolymerCost){
    return false;
  };
  return true;
};

function canAffordMetalProfieciency(){
  var facilityMetalCost = 0;
  facilityMetalCost += Math.floor(METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))
  if(gameData.resources.metal < facilityMetalCost){
    return false;
  };
  var facilityRPCost = Math.floor(METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought));
  if(gameData.resources.researchPoints < facilityRPCost){
    return false;
  };
  return true;
};

function canAffordPowerProfieciency(){
  var facilityMetalCost = Math.floor(POWER_PROFIECIENCY_METAL_COST * Math.pow(POWER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought))
  if(gameData.resources.metal < facilityMetalCost){
    return false;
  };
  var facilityPolymerCost = Math.floor(POWER_PROFIECIENCY_POLYMER_COST * Math.pow(POWER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought))
  if(gameData.resources.polymers < facilityPolymerCost){ 
    return false;
  };
  var facilityRPCost = Math.floor(POWER_PROFIECIENCY_RP_COST * Math.pow(POWER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought));
  if(gameData.resources.researchPoints < facilityRPCost){
    return false;
  };
  return true;
};

function canAffordResearchProfieciency(){
  var facilityMetalCost = Math.floor(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought))
  if(gameData.resources.metal < facilityMetalCost){
    return false;
  };
  var facilityPolymerCost = Math.floor(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought))
  if(gameData.resources.polymers < facilityPolymerCost){ 
    return false;
  };
  var facilityRPCost = Math.floor(POWER_PROFIECIENCY_RP_COST * Math.pow(POWER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought));
  if(gameData.resources.researchPoints < facilityRPCost){
    return false;
  };
  return true;
};

function canAffordPolymerProfieciency(){
  var facilityPolymerCost = 0;
  facilityPolymerCost += Math.floor(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought))
  if(gameData.resources.polymers < facilityPolymerCost){ 
    return false;
  };
  var facilityRPCost = Math.floor(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought));
  if(gameData.resources.researchPoints < facilityRPCost){
    return false;
  };
  return true;
};

function canAffordRailgunUpgrade(){
  var nextMetalCost = Math.floor(RAILGUN_UPGRADE_METAL_BASE_COST * Math.pow(RAILGUN_UPGRADE_METAL_GROWTH_FACTOR, gameData.technologies.railgunUpgrade + (gameData.technologies.railgunPrestigeLevelBought -1) * 11));
  var nextPolymerCost = Math.floor(RAILGUN_UPGRADE_POLYMER_BASE_COST * Math.pow(RAILGUN_UPGRADE_POLYMER_GROWTH_FACTOR, gameData.technologies.railgunUpgrade + (gameData.technologies.railgunPrestigeLevelBought -1) * 11));
  var nextRPCost = Math.floor(RAILGUN_UPGRADE_RP_BASE_COST * Math.pow(RAILGUN_UPGRADE_RP_GROWTH_FACTOR, gameData.technologies.railgunUpgrade + (gameData.technologies.railgunPrestigeLevelBought -1) * 11));
  if(gameData.resources.metal < nextMetalCost){
    return false;
  };
  if(gameData.resources.polymers < nextPolymerCost){ 
    return false;
  };
  if(gameData.resources.researchPoints < nextRPCost){
    return false;
  };
  return true;
};

function canAffordLaserUpgrade(){
  var nextMetalCost = Math.floor(LASER_UPGRADE_METAL_BASE_COST * Math.pow(LASER_UPGRADE_METAL_GROWTH_FACTOR, gameData.technologies.laserUpgrade + (gameData.technologies.laserPrestigeLevelBought -1) * 11));
  var nextPolymerCost = Math.floor(LASER_UPGRADE_POLYMER_BASE_COST * Math.pow(LASER_UPGRADE_POLYMER_GROWTH_FACTOR, gameData.technologies.laserUpgrade + (gameData.technologies.laserPrestigeLevelBought -1) * 11));
  var nextRPCost = Math.floor(LASER_UPGRADE_RP_BASE_COST * Math.pow(LASER_UPGRADE_RP_GROWTH_FACTOR, gameData.technologies.laserUpgrade + (gameData.technologies.laserPrestigeLevelBought -1) * 11));
  if(gameData.resources.metal < nextMetalCost){
    return false;
  };
  if(gameData.resources.polymers < nextPolymerCost){ 
    return false;
  };
  if(gameData.resources.researchPoints < nextRPCost){
    return false;
  };
  return true;
};

function canAffordRailgunPrestige(){
  var nextMetalCost = Math.floor(RAILGUN_PRESTIGE_METAL_BASE_COST * Math.pow(RAILGUN_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1));
  var nextPolymerCost = Math.floor(RAILGUN_PRESTIGE_POLYMER_BASE_COST * Math.pow(RAILGUN_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1));
  var nextRPCost = Math.floor(RAILGUN_PRESTIGE_RP_BASE_COST * Math.pow(RAILGUN_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1));
  if(gameData.resources.metal < nextMetalCost){
    return false;
  };
  if(gameData.resources.polymers < nextPolymerCost){ 
    return false;
  };
  if(gameData.resources.researchPoints < nextRPCost){
    return false;
  };
  return true;
};

function canAffordLaserPrestige(){
  var nextMetalCost = Math.floor(LASER_PRESTIGE_METAL_BASE_COST * Math.pow(LASER_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1));
  var nextPolymerCost = Math.floor(LASER_PRESTIGE_POLYMER_BASE_COST * Math.pow(LASER_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1));
  var nextRPCost = Math.floor(LASER_PRESTIGE_RP_BASE_COST * Math.pow(LASER_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1));
  if(gameData.resources.metal < nextMetalCost){
    return false;
  };
  if(gameData.resources.polymers < nextPolymerCost){ 
    return false;
  };
  if(gameData.resources.researchPoints < nextRPCost){
    return false;
  };
  return true;
};


function canAffordArmorUpgrade(){
  var nextMetalCost = Math.floor(ARMOR_UPGRADE_METAL_BASE_COST * Math.pow(ARMOR_UPGRADE_METAL_GROWTH_FACTOR, gameData.technologies.armorUpgrade + (gameData.technologies.armorPrestigeLevelBought -1) * 11));
  var nextPolymerCost = Math.floor(ARMOR_UPGRADE_POLYMER_BASE_COST * Math.pow(ARMOR_UPGRADE_POLYMER_GROWTH_FACTOR, gameData.technologies.armorUpgrade + (gameData.technologies.armorPrestigeLevelBought -1) * 11));
  var nextRPCost = Math.floor(ARMOR_UPGRADE_RP_BASE_COST * Math.pow(ARMOR_UPGRADE_RP_GROWTH_FACTOR, gameData.technologies.armorUpgrade + (gameData.technologies.armorPrestigeLevelBought -1) * 11));
  if(gameData.resources.metal < nextMetalCost){
    return false;
  };
  if(gameData.resources.polymers < nextPolymerCost){ 
    return false;
  };
  if(gameData.resources.researchPoints < nextRPCost){
    return false;
  };
  return true;
};

function canAffordArmorPrestige(){
  var nextMetalCost = Math.floor(ARMOR_PRESTIGE_METAL_BASE_COST * Math.pow(ARMOR_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1));
  var nextPolymerCost = Math.floor(ARMOR_PRESTIGE_POLYMER_BASE_COST * Math.pow(ARMOR_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1));
  var nextRPCost = Math.floor(ARMOR_PRESTIGE_RP_BASE_COST * Math.pow(ARMOR_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1));
  if(gameData.resources.metal < nextMetalCost){
    return false;
  };
  if(gameData.resources.polymers < nextPolymerCost){ 
    return false;
  };
  if(gameData.resources.researchPoints < nextRPCost){
    return false;
  };
  return true;
};

function metalClick(number){
  gameData.resources.metal += number * Math.pow(METAL_PROFICIENCY_BASE_RATE, gameData.technologies.metalProficiencyBought);
};

function polymerClick(number){
  gameData.resources.polymers += number * Math.pow(POLYMER_PROFICIENCY_BASE_RATE, gameData.technologies.polymerProficiencyBought);
};

function researchClick(number){
  gameData.resources.researchPoints += number * Math.pow(RESEARCH_PROFICIENCY_BASE_RATE, gameData.technologies.researchProficiencyBought);
};

function UpdatePower(){
  var powerAvailable = (gameData.buildings.generators * POWER_PER_GENERATOR) * Math.pow(POWER_PROFICIENCY_BASE_RATE, gameData.technologies.powerProficiencyBought);
  var facilities = (gameData.buildings.mines * MINE_POWER_USAGE) + (gameData.shipyard * SHIPYARD_POWER_USAGE) + (gameData.buildings.factories * FACTORY_POWER_USAGE) + (gameData.buildings.labs * LAB_POWER_USAGE);
    gameData.resources.power =  powerAvailable - facilities;
};

function CheckPower(powerRequirement){
  UpdatePower();
  if (gameData.resources.power >= powerRequirement){
    return true;
  } else {
    return false;
  };
};

function buyMine(){
  var nextCost = Math.floor(MINE_BASE_COST * Math.pow(MINE_GROWTH_FACTOR, gameData.buildings.mines));
  if((gameData.resources.metal >= nextCost) && CheckPower(MINE_POWER_USAGE)){
    gameData.buildings.mines += 1;
	  gameData.resources.metal -= nextCost;
  };
  ga('send', 'event', 'My Game', 'buyMine');
}; 

function buyFactory(){
  var nextCost = Math.floor(FACTORY_BASE_COST * Math.pow(FACTORY_GROWTH_FACTOR, gameData.buildings.factories));
  if((gameData.resources.metal >= nextCost) && CheckPower(FACTORY_POWER_USAGE)){
    gameData.buildings.factories += 1;
    gameData.resources.metal -= nextCost;
  };
}; 

function buyAutoFight(){
  if((gameData.resources.metal >= AUTOFIGHT_METAL_COST) && (gameData.resources.researchPoints >= AUTOFIGHT_RP_COST) && (gameData.resources.polymers >= AUTOFIGHT_POLYMERS_COST)){
    gameData.technologies.autofightBought = 1;
    gameData.resources.metal -= AUTOFIGHT_METAL_COST;
    gameData.resources.polymers -= AUTOFIGHT_POLYMERS_COST;
    gameData.resources.researchPoints -= AUTOFIGHT_RP_COST;
  ga('send', 'event', 'My Game', 'buyAutoFight');
  };
}; 

function buyLab(){
  var nextMetalCost = Math.floor(LAB_METAL_BASE_COST * Math.pow(LAB_METAL_GROWTH_FACTOR, gameData.buildings.labs));
  var nextPolymerCost = Math.floor(LAB_POLYMER_BASE_COST * Math.pow(LAB_POLYMER_GROWTH_FACTOR, gameData.buildings.labs));
  if((gameData.resources.metal >= nextMetalCost) && (gameData.resources.polymers >= nextPolymerCost) && CheckPower(LAB_POWER_USAGE)){
    gameData.buildings.labs += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
  };
}; 

function buyGenerator(){
  var nextCost = Math.floor(GENERATOR_BASE_COST * Math.pow(GENERATOR_GROWTH_FACTOR, gameData.buildings.generators));
  if(gameData.resources.metal >= nextCost){
    gameData.buildings.generators += 1;
    gameData.resources.metal -= nextCost;
  };
}; 

function buyShipyard(){
  var nextMetalCost = Math.floor(SHIPYARD_METAL_BASE_COST * Math.pow(SHIPYARD_METAL_GROWTH_FACTOR, gameData.shipyard));  
  var nextRPCost = Math.floor(SHIPYARD_RP_BASE_COST * Math.pow(SHIPYARD_RP_GROWTH_FACTOR, gameData.shipyard));  
  if((gameData.resources.metal >= nextMetalCost) && CheckPower(SHIPYARD_POWER_USAGE) && gameData.shipyard < gameData.technologies.shipyardTechUnlock && gameData.resources.researchPoints >= nextRPCost){
    gameData.shipyard += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.researchPoints -= nextRPCost;
  ga('send', 'event', 'My Game', 'buyShipyard');
  };
};

function buyMetalProficiency(){
  var nextMetalCost = Math.floor(METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought));  
  var nextPolymerCost = Math.floor(METAL_PROFIECIENCY_POLYMER_COST * Math.pow(METAL_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought));  
  var nextRPCost = Math.floor(METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought));  
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.technologies.metalProficiencyBought < gameData.technologies.metalProficiencyUnlocked && gameData.resources.researchPoints >= nextRPCost){
    gameData.technologies.metalProficiencyBought += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
  };
};

function buyPolymerProficiency(){
  var nextMetalCost = Math.floor(POLYMER_PROFIECIENCY_METAL_COST * Math.pow(POLYMER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought));  
  var nextPolymerCost = Math.floor(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought));  
  var nextRPCost = Math.floor(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought));  
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.technologies.polymerProficiencyBought < gameData.technologies.polymerProficiencyUnlocked && gameData.resources.researchPoints >= nextRPCost){
    gameData.technologies.polymerProficiencyBought += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
  };
};

function buyPowerProficiency(){
  var nextMetalCost = Math.floor(POWER_PROFIECIENCY_METAL_COST * Math.pow(POWER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought));
  var nextPolymerCost = Math.floor(POWER_PROFIECIENCY_POLYMER_COST * Math.pow(POWER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought));  
  var nextRPCost = Math.floor(POWER_PROFIECIENCY_RP_COST * Math.pow(POWER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought));  
  if ((gameData.resources.metal >= nextMetalCost) && (gameData.resources.polymers >= nextPolymerCost) && (gameData.technologies.powerProficiencyBought < gameData.technologies.powerProficiencyUnlocked) && (gameData.resources.researchPoints >= nextRPCost)){
    gameData.technologies.powerProficiencyBought += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
  };
};

function buyResearchProficiency(){
  var nextMetalCost = Math.floor(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought));  
  var nextPolymerCost = Math.floor(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought));  
  var nextRPCost = Math.floor(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought));  
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.technologies.researchProficiencyBought < gameData.technologies.researchProficiency && gameData.resources.researchPoints >= nextRPCost){
    gameData.technologies.researchProficiencyBought += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
  };
};

function buyRailgunUpgrade(){
  var nextMetalCost = Math.floor(RAILGUN_UPGRADE_METAL_BASE_COST * Math.pow(RAILGUN_UPGRADE_METAL_GROWTH_FACTOR, gameData.technologies.railgunUpgrade + (gameData.technologies.railgunPrestigeLevelBought -1) * 11));
  var nextPolymerCost = Math.floor(RAILGUN_UPGRADE_POLYMER_BASE_COST * Math.pow(RAILGUN_UPGRADE_POLYMER_GROWTH_FACTOR, gameData.technologies.railgunUpgrade + (gameData.technologies.railgunPrestigeLevelBought -1) * 11));
  var nextRPCost = Math.floor(RAILGUN_UPGRADE_RP_BASE_COST * Math.pow(RAILGUN_UPGRADE_RP_GROWTH_FACTOR, gameData.technologies.railgunUpgrade + (gameData.technologies.railgunPrestigeLevelBought -1) * 11));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost){
    gameData.technologies.railgunUpgrade += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
  };
};

function buyLaserUpgrade(){
  var nextMetalCost = Math.floor(LASER_UPGRADE_METAL_BASE_COST * Math.pow(LASER_UPGRADE_METAL_GROWTH_FACTOR, gameData.technologies.laserUpgrade + (gameData.technologies.laserPrestigeLevelBought -1) * 11));
  var nextPolymerCost = Math.floor(LASER_UPGRADE_POLYMER_BASE_COST * Math.pow(LASER_UPGRADE_POLYMER_GROWTH_FACTOR, gameData.technologies.laserUpgrade + (gameData.technologies.laserPrestigeLevelBought -1) * 11));
  var nextRPCost = Math.floor(LASER_UPGRADE_RP_BASE_COST * Math.pow(LASER_UPGRADE_RP_GROWTH_FACTOR, gameData.technologies.laserUpgrade + (gameData.technologies.laserPrestigeLevelBought -1) * 11));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost){
    gameData.technologies.laserUpgrade += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
  };
};

function buyRailgunPrestige(){
  var nextMetalCost = Math.floor(RAILGUN_PRESTIGE_METAL_BASE_COST * Math.pow(RAILGUN_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1));
  var nextPolymerCost = Math.floor(RAILGUN_PRESTIGE_POLYMER_BASE_COST * Math.pow(RAILGUN_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1));
  var nextRPCost = Math.floor(RAILGUN_PRESTIGE_RP_BASE_COST * Math.pow(RAILGUN_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost && gameData.technologies.railgunPrestigeLevelBought < gameData.technologies.railgunPrestigeLevelUnlocked){
    gameData.technologies.railgunPrestigeLevelBought += 1;
    gameData.technologies.railgunUpgrade = 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
  };
};

function buyLaserPrestige(){
  var nextMetalCost = Math.floor(LASER_PRESTIGE_METAL_BASE_COST * Math.pow(LASER_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1));
  var nextPolymerCost = Math.floor(LASER_PRESTIGE_POLYMER_BASE_COST * Math.pow(LASER_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1));
  var nextRPCost = Math.floor(LASER_PRESTIGE_RP_BASE_COST * Math.pow(LASER_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost && gameData.technologies.laserPrestigeLevelBought < gameData.technologies.laserPrestigeLevelUnlocked){
    gameData.technologies.laserPrestigeLevelBought += 1;
    gameData.technologies.laserUpgrade = 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
  };
};


function buyArmorUpgrade(){
  var nextMetalCost = Math.floor(ARMOR_UPGRADE_METAL_BASE_COST * Math.pow(ARMOR_UPGRADE_METAL_GROWTH_FACTOR, gameData.technologies.armorUpgrade + (gameData.technologies.armorPrestigeLevelBought -1) * 11));
  var nextPolymerCost = Math.floor(ARMOR_UPGRADE_POLYMER_BASE_COST * Math.pow(ARMOR_UPGRADE_POLYMER_GROWTH_FACTOR, gameData.technologies.armorUpgrade + (gameData.technologies.armorPrestigeLevelBought -1) * 11));
  var nextRPCost = Math.floor(ARMOR_UPGRADE_RP_BASE_COST * Math.pow(ARMOR_UPGRADE_RP_GROWTH_FACTOR, gameData.technologies.armorUpgrade + (gameData.technologies.armorPrestigeLevelBought -1) * 11));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost){
    gameData.technologies.armorUpgrade += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
  };
};

function buyArmorPrestige(){
  var nextMetalCost = Math.floor(ARMOR_PRESTIGE_METAL_BASE_COST * Math.pow(ARMOR_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1));
  var nextPolymerCost = Math.floor(ARMOR_PRESTIGE_POLYMER_BASE_COST * Math.pow(ARMOR_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1));
  var nextRPCost = Math.floor(ARMOR_PRESTIGE_RP_BASE_COST * Math.pow(ARMOR_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost && gameData.technologies.armorPrestigeLevelBought < gameData.technologies.armorPrestigeLevelUnlocked){
    gameData.technologies.armorPrestigeLevelBought += 1;
    gameData.technologies.armorUpgrade = 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
  };
};

function switchAutoFight(){
  if(gameData.technologies.autofightOn == 0){
    gameData.technologies.autofightOn = 1;
  } else {
    gameData.technologies.autofightOn = 0;
  };
};

function shipMetalRequired(size){
  return size * (100 + Math.pow(10, gameData.technologies.railgunPrestigeLevelBought) + Math.pow(9, gameData.technologies.laserPrestigeLevelBought))
};

function shipPolymerRequired(size){
  return size * (50 + Math.pow(5, gameData.technologies.armorPrestigeLevelBought) + Math.pow(2, gameData.technologies.laserPrestigeLevelBought))
};

function sendShip(){
  if (gameData.playership.hitPoints > 0){
    return;
  };
  if (canAffordFight()){
    var shipMetalCost = shipMetalRequired(gameData.shipyard)
    var shipPolymerCost = shipPolymerRequired(gameData.shipyard)
    gameData.resources.metal -= shipMetalCost;
    gameData.resources.polymers -= shipPolymerCost;
    gameData.playership.size = gameData.shipyard;
    gameData.playership.defense = 0;
    gameData.playership.hitPoints = gameData.playership.size * (40 + (gameData.technologies.armorUpgrade * ARMOR_UPGRADE_BASE_IMPROVEMENT * Math.pow(ARMOR_PRESTIGE_BASE_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)));
    var baseRailgunAttack = (gameData.technologies.railgunUpgrade * RAILGUN_UPGRADE_BASE_IMPROVEMENT * Math.pow(RAILGUN_PRESTIGE_BASE_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1));
    gameData.playership.railgunMinDamage = gameData.playership.size  * 0.75 * baseRailgunAttack;
    gameData.playership.railgunMaxDamage = gameData.playership.size  * 1.25 * baseRailgunAttack;
    var baseLaserAttack = (gameData.technologies.laserUpgrade * LASER_UPGRADE_BASE_IMPROVEMENT * Math.pow(LASER_PRESTIGE_BASE_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1));
    gameData.playership.laserMinDamage = gameData.playership.size  * 0.75 * baseLaserAttack;
    gameData.playership.laserMaxDamage = gameData.playership.size  * 1.25 * baseLaserAttack;
  };
};

function chooseDamage(min, max){
  return (Math.random() * (max - min) + min);
};

function railgunAttack(attacker, defender){
  var damageToEnemy = Math.max(chooseDamage(attacker.railgunMinDamage, attacker.railgunMaxDamage) - defender.defense, 0);
  defender.hitPoints -= damageToEnemy;

  defender.hitPoints = Math.max(0, defender.hitPoints); //THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED
};

function laserAttack(attacker, defender){
  var damageToEnemy = Math.max(chooseDamage(attacker.laserMinDamage, attacker.laserMaxDamage) - defender.defense, 0);
  defender.hitPoints -= damageToEnemy;

  defender.hitPoints = Math.max(0, defender.hitPoints); //THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED
};


function addToDisplay(newline){
  var d = new Date();
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  };
  var ampm = "am";
  if( hr > 12 ) {
    hr -= 12;
    ampm = "pm";
  };
  var sec = d.getSeconds();
  if (sec < 10) {
    sec = "0" + sec;
  };

  textToDisplay.unshift(hr + ":" + min + ":" + sec + " " + ampm + ': ' + newline);
  textToDisplay = textToDisplay.slice(0,50);
};

function getDisplay(){
  var output = '';
  for (newLine of textToDisplay){
    output += newLine + '\n'
  };
  output = output.slice(0, output.length-1)
  return output;
};

function checkForNewTechs(){
  if (gameData.technologies.shipyardTechUnlock < gameData.world.region){
    gameData.technologies.shipyardTechUnlock = gameData.world.region;
    addToDisplay('Bigger ships!  We know how to make bigger ships!');
  };
  if ((gameData.technologies.metalProficiencyUnlocked < gameData.world.region) && (gameData.world.zone >= 10)){
    gameData.technologies.metalProficiencyUnlocked = gameData.world.region;
    addToDisplay('I just need a bigger pickaxe!');
  };
  if ((gameData.technologies.polymerProficiencyUnlocked < gameData.world.region) && (gameData.world.zone >= 20)){
    gameData.technologies.polymerProficiencyUnlocked = gameData.world.region;
    addToDisplay('Plastics are my life.');
  };
  if ((gameData.technologies.powerProficiencyUnlocked < gameData.world.region) && (gameData.world.zone >= 30)){
    gameData.technologies.powerProficiencyUnlocked = gameData.world.region;
    addToDisplay('MOAR power!');
  };
  if ((gameData.technologies.researchProficiency < Math.floor(gameData.world.region / 2)) && (gameData.world.zone >= 40)){
    gameData.technologies.researchProficiency = Math.floor(gameData.world.region / 2);
    addToDisplay('Smarter I can become');
  };
  if ((gameData.technologies.armorPrestigeLevelUnlocked < (Math.floor(gameData.world.region / 10)) + 1) && (gameData.world.zone >= 50)){
    gameData.technologies.armorPrestigeLevelUnlocked = (Math.floor(gameData.world.region / 10) + 1);
    addToDisplay('We can be even more impervious to pain');
  };
  if ((gameData.technologies.railgunPrestigeLevelUnlocked < (Math.floor(gameData.world.region / 10)) + 1) && (gameData.world.zone >= 60)){
    gameData.technologies.railgunPrestigeLevelUnlocked = (Math.floor(gameData.world.region / 10) + 1);
    addToDisplay('Railguns can be even more railgunny');
  };
  if ((gameData.technologies.laserPrestigeLevelUnlocked < (Math.floor(gameData.world.region / 10)) + 1) && (gameData.world.zone >= 70)){
    gameData.technologies.laserPrestigeLevelUnlocked = (Math.floor(gameData.world.region / 10) + 1);
    addToDisplay('Lasers can be even more lasery');
  };
  if ((gameData.world.region >= 1) && (gameData.world.zone >= 5) && (gameData.technologies.autofightUnlock < 1)){
    gameData.technologies.autofightUnlock = 1;
    addToDisplay('Your boffin robots have figured out how to send a ship when it is ready');
  };
  if ((gameData.world.region >= 2) && (gameData.world.zone >= 15) && (gameData.technologies.laserUpgrade < 1)){
    gameData.technologies.laserUpgrade = 1;
    gameData.technologies.laserPrestigeLevelUnlocked = 1;
    gameData.technologies.laserPrestigeLevelBought = 1;
    addToDisplay('OOOOOOOOOH!  A laser!');
  };
};

Date.dateDiff = function(datepart, fromdate, todate) {  
  datepart = datepart.toLowerCase();  
  var diff = todate - fromdate; 
  var divideBy = { w:604800000, 
                   d:86400000, 
                   h:3600000, 
                   n:60000, 
                   s:1000,
                   ms:1 };  
  
  return Math.floor( diff/divideBy[datepart]);
}

window.setInterval(function(){
  var currentTime = new Date();
  var timeToCheckForSave = new Date();
  timeToCheckForSave.setMilliseconds(timeToCheckForSave.getMilliseconds() - 300000)

  if (needtoload){
    load();
  };

  if (timeToCheckForSave > lastSaveGameTime){
    lastSaveGameTime = new Date();
    saveGame();
    addToDisplay("Game Saved")
  };

  if (currentTime > gameData.nextProcessTime){
    if (gameData.nextProcessTime > gameData.lastResourceProcessTime){
      gameData.lastResourceProcessTime.setMilliseconds(gameData.lastResourceProcessTime.getMilliseconds() + 1000);
      metalClick(gameData.buildings.mines);
      polymerClick(gameData.buildings.factories);
      researchClick(gameData.buildings.labs);
    };

    if (gameData.nextProcessTime > gameData.lastRailgunCombatProcessTime){
     gameData.lastRailgunCombatProcessTime.setMilliseconds(gameData.lastRailgunCombatProcessTime.getMilliseconds() + 1000);
      if (gameData.playership.hitPoints > 0){
        railgunAttack(gameData.playership, gameData.enemyship);
        if (gameData.enemyship.hitPoints > 0){
          railgunAttack(gameData.enemyship, gameData.playership);
        };
      }else{
        if (gameData.technologies.autofightOn == 1){
          sendShip();
        };
      };
    };
    if (gameData.nextProcessTime > gameData.lastLaserCombatProcessTime){
     gameData.lastLaserCombatProcessTime.setMilliseconds(gameData.lastLaserCombatProcessTime.getMilliseconds() + 100);
      if (gameData.playership.hitPoints > 0){
        laserAttack(gameData.playership, gameData.enemyship);
        if (gameData.enemyship.hitPoints > 0){
          laserAttack(gameData.enemyship, gameData.playership);
        };
      };
    };
    if (gameData.enemyship.hitPoints == 0){ //new enemy
      gameData.world.zone += 1;
      if (gameData.world.zone > 100){
        gameData.world.zone = 1
        gameData.world.region += 1
      };
      checkForNewTechs();

      gameData.enemyship.hitPoints = 20 * Math.pow(1.7, gameData.world.region-1) * Math.pow(1.01, gameData.world.zone-1)
      var baseEnemyAttack = 10 * Math.pow(1.6, gameData.world.region-1) * Math.pow(1.009, gameData.world.zone-1)
      gameData.enemyship.defense = 0;
      gameData.enemyship.railgunMinDamage = baseEnemyAttack * 0.75
      gameData.enemyship.railgunMaxDamage = baseEnemyAttack * 1.25
    };
    gameData.nextProcessTime.setMilliseconds(gameData.nextProcessTime.getMilliseconds() + 50);
  };
  updateGUI();
  var endTime = new Date();
  var msRunTime = Date.dateDiff('ms', currentTime, endTime)
  if(msRunTime > 10){
    addToDisplay(msRunTime);
  };
}, 10);
