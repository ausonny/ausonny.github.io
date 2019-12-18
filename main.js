
var gameData = {
  options: {
    standardNotation: 2
  },
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
    shipyard: 0,
    labs: 0
  },
  playership: {
    size: 0,
    hitPoints: 0,
    MinDamage: 0,
    MaxDamage: 0,
    defense: 0
  },
  enemyship: {
    size: 0,
    hitPoints: 0,
    MinDamage: 0,
    MaxDamage: 0,
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
    missilePrestigeLevelUnlocked: 0,
    missilePrestigeLevelBought: 0,
    missileUpgrade: 0,
    armorPrestigeLevelUnlocked: 1,
    armorPrestigeLevelBought: 1,
    armorUpgrade: 1
  },
  lastResourceProcessTime: new Date(),
  lastRailgunCombatProcessTime: new Date(),
  lastLaserCombatProcessTime: new Date(),
  nextProcessTime: new Date(),
  lastSentShipTime: new Date()
};

var lastSaveGameTime = new Date();
var needtoload = true;
var textToDisplay = [];

function saveGame(){
  localStorage.setItem("save",JSON.stringify(gameData));
  gtag('event', "save game", {
    'event_category': "click",
    'event_label': "label",
    'value': "value"
  });
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
  if (typeof savegame.enemyship.MaxDamage !== "undefined") gameData.enemyship.MaxDamage = savegame.enemyship.MaxDamage;
  if (typeof savegame.enemyship.MinDamage !== "undefined") gameData.enemyship.MinDamage = savegame.enemyship.MinDamage;
  if (typeof savegame.lastRailgunCombatProcessTime !== "undefined") gameData.lastRailgunCombatProcessTime = new Date (savegame.lastRailgunCombatProcessTime);
  if (typeof savegame.lastLaserCombatProcessTime !== "undefined") gameData.lastLaserCombatProcessTime = new Date (savegame.lastLaserCombatProcessTime);
  if (typeof savegame.lastResourceProcessTime !== "undefined") gameData.lastResourceProcessTime = new Date(savegame.lastResourceProcessTime);  
  if (typeof savegame.nextProcessTime !== "undefined") gameData.nextProcessTime = new Date (savegame.nextProcessTime);
  if (typeof savegame.playership.defense !== "undefined") gameData.playership.defense = savegame.playership.defense;
  if (typeof savegame.playership.hitPoints !== "undefined") gameData.playership.hitPoints = savegame.playership.hitPoints;
  if (typeof savegame.playership.MaxDamage !== "undefined") gameData.playership.MaxDamage = savegame.playership.MaxDamage;
  if (typeof savegame.playership.MinDamage !== "undefined") gameData.playership.MinDamage = savegame.playership.MinDamage;
  if (typeof savegame.playership.size !== "undefined") gameData.playership.size = savegame.playership.size;
  if (typeof savegame.resources.metal !== "undefined") gameData.resources.metal = savegame.resources.metal;
  if (typeof savegame.resources.polymers !== "undefined") gameData.resources.polymers = savegame.resources.polymers;
  if (typeof savegame.resources.power !== "undefined") gameData.resources.power = savegame.resources.power;
  if (typeof savegame.resources.researchPoints !== "undefined") gameData.resources.researchPoints = savegame.resources.researchPoints;
  if (typeof savegame.buildings.shipyard !== "undefined") gameData.buildings.shipyard = savegame.buildings.shipyard;
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
  if (typeof savegame.technologies.missilePrestigeLevelUnlocked !== "undefined") gameData.technologies.missilePrestigeLevelUnlocked = savegame.technologies.missilePrestigeLevelUnlocked;
  if (typeof savegame.technologies.missilePrestigeLevelBought !== "undefined") gameData.technologies.missilePrestigeLevelBought = savegame.technologies.missilePrestigeLevelBought;
  if (typeof savegame.technologies.missileUpgrade !== "undefined") gameData.technologies.missileUpgrade = savegame.technologies.missileUpgrade;
  if (typeof savegame.technologies.armorPrestigeLevelUnlocked !== "undefined") gameData.technologies.armorPrestigeLevelUnlocked = savegame.technologies.armorPrestigeLevelUnlocked;
  if (typeof savegame.technologies.armorPrestigeLevelBought !== "undefined") gameData.technologies.armorPrestigeLevelBought = savegame.technologies.armorPrestigeLevelBought;
  if (typeof savegame.technologies.armorUpgrade !== "undefined") gameData.technologies.armorUpgrade = savegame.technologies.armorUpgrade;
  if (typeof savegame.world.region !== "undefined") gameData.world.region = savegame.world.region;
  if (typeof savegame.world.zone !== "undefined") gameData.world.zone = savegame.world.zone;
 };

function prettifySub(number){
  number = parseFloat(number);
  var floor = Math.floor(number);
  if (number === floor) // number is an integer, just show it as-is
    return number;
  var precision = 3 - floor.toString().length; // use the right number of digits

  return number.toFixed(3 - floor.toString().length);
}

function prettify(number) {
  var numberTmp = number;
  if (!isFinite(number)) return "<span class='icomoon icon-infinity'></span>";
  if (number >= 1000 && number < 10000) return Math.floor(number);
  if (number == 0) return prettifySub(0);
  if (number < 0) return "-" + prettify(-number);
  if (number < 0.005) return (+number).toExponential(2);

  var base = Math.floor(Math.log(number)/Math.log(1000));
  if (base <= 0) return prettifySub(number);

/*  if(gameData.options.standardNotation == 5) {
    //Thanks ZXV
    var logBase = game.global.logNotBase;
    var exponent = Math.log(number) / Math.log(logBase);
    return prettifySub(exponent) + "L" + logBase;
  }

*/
  number /= Math.pow(1000, base);
  if (number >= 999.5) {
    // 999.5 rounds to 1000 and we don’t want to show “1000K” or such
    number /= 1000;
    ++base;
  }
  if (gameData.options.standardNotation == 3){
    var suffices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    if (base <= suffices.length) suffix = suffices[base -1];
    else {
      var suf2 = (base % suffices.length) - 1;
      if (suf2 < 0) suf2 = suffices.length - 1;
      suffix = suffices[Math.ceil(base / suffices.length) - 2] + suffices[suf2];
    }
  }
  else {
    var suffices = [
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
    var suffix;
    if (gameData.options.standardNotation == 2 || (gameData.options.standardNotation == 1 && base > suffices.length) || (gameData.options.standardNotation == 4 && base > 31))
      suffix = "e" + ((base) * 3);
    else if (gameData.options.standardNotation && base <= suffices.length)
      suffix = suffices[base-1];
    else
    {
      var exponent = parseFloat(numberTmp).toExponential(2);
      exponent = exponent.replace('+', '');
      return exponent;
    }
  }
  return prettifySub(number) + suffix;
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
  document.getElementById('shipyard').innerHTML = prettify(gameData.buildings.shipyard);
  document.getElementById('shipSize').innerHTML = prettify(gameData.playership.size);
  document.getElementById('shipHitPoints').innerHTML = prettify(gameData.playership.hitPoints);
  document.getElementById('shipMinDamage').innerHTML = prettify(gameData.playership.MinDamage);
  document.getElementById('shipMaxDamage').innerHTML = prettify(gameData.playership.MaxDamage);
  document.getElementById('shipDefense').innerHTML = prettify(gameData.playership.defense);
  document.getElementById('enemyHitPoints').innerHTML = prettify(gameData.enemyship.hitPoints);
  document.getElementById('enemyMinDamage').innerHTML = prettify(gameData.enemyship.MinDamage);
  document.getElementById('enemyMaxDamage').innerHTML = prettify(gameData.enemyship.MaxDamage);
  document.getElementById('enemyDefense').innerHTML = prettify(gameData.enemyship.defense);
  document.getElementById('region').innerHTML = gameData.world.region;
  document.getElementById('zone').innerHTML = gameData.world.zone;
  document.getElementById('textToDisplay').innerHTML = getDisplay();
 
  $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired(gameData.buildings.shipyard)) + '\nPolymer Cost:' + prettify(shipPolymerRequired(gameData.buildings.shipyard)));
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

  $("#btnAutoFight").removeClass("button").addClass("buttonInvalid");
  $("#btnAutoFight").removeClass("visible").addClass("invisible");
  if ((gameData.technologies.autofightBought == 0 && gameData.technologies.autofightUnlock > 0)){
    $("#btnAutoFight").removeClass("invisible").addClass("visible");
  };
  if (canAffordAutoFight()){
    $("#btnAutoFight").removeClass("buttonInvalid").addClass("button");
  };

  $("#btnMetalTech").removeClass("button").addClass("buttonInvalid");
  $("#btnMetalTech").removeClass("visible").addClass("invisible");
  if (gameData.technologies.metalProficiencyUnlocked > gameData.technologies.metalProficiencyBought){
    $("#btnMetalTech").removeClass("invisible").addClass("visible");
    $("#btnMetalTech").text("Upgrade Metal " + (gameData.technologies.metalProficiencyBought + 1));
    if (canAffordMetalProfieciency()){
      $("#btnMetalTech").removeClass("buttonInvalid").addClass("button");
    };
  };

  $("#btnPolymerTech").removeClass("button").addClass("buttonInvalid");
  $("#btnPolymerTech").removeClass("visible").addClass("invisible");
  if (gameData.technologies.polymerProficiencyUnlocked > gameData.technologies.polymerProficiencyBought){
    $("#btnPolymerTech").removeClass("invisible").addClass("visible");
    $("#btnPolymerTech").text("Upgrade Polymer " + (gameData.technologies.polymerProficiencyBought + 1));
    if (canAffordPolymerProfieciency()){
      $("#btnPolymerTech").removeClass("buttonInvalid").addClass("button");
    };
  };

  $("#btnPowerTech").removeClass("button").addClass("buttonInvalid");
  $("#btnPowerTech").removeClass("visible").addClass("invisible");
  if (gameData.technologies.powerProficiencyUnlocked > gameData.technologies.powerProficiencyBought){
    $("#btnPowerTech").removeClass("invisible").addClass("visible");
    $("#btnPowerTech").text("Upgrade Power " + (gameData.technologies.powerProficiencyBought + 1));
    if (canAffordPowerProfieciency()){
      $("#btnPowerTech").removeClass("buttonInvalid").addClass("button");
    };
  };

  $("#btnResearchTech").removeClass("button").addClass("buttonInvalid");
  $("#btnResearchTech").removeClass("visible").addClass("invisible");
  if (gameData.technologies.researchProficiency > gameData.technologies.researchProficiencyBought){
    $("#btnResearchTech").removeClass("invisible").addClass("visible");
    $("#btnResearchTech").text("Upgrade Research " + (gameData.technologies.researchProficiencyBought + 1));
    if (canAffordResearchProfieciency()){
      $("#btnResearchTech").removeClass("buttonInvalid").addClass("button");
    };
  };

  $("#btnBuyShipyard").removeClass("button").addClass("buttonInvalid");
  $("#btnBuyShipyard").removeClass("visible").addClass("invisible");
  if (gameData.buildings.shipyard < gameData.technologies.shipyardTechUnlock){
    $("#btnBuyShipyard").removeClass("invisible").addClass("visible");
    $("#btnBuyShipyard").text("Upgrade Shipyard " + (gameData.buildings.shipyard + 1));
    if (canAffordShipyard()){
      $("#btnBuyShipyard").removeClass("buttonInvalid").addClass("button");
    };
  };

  $("#btnBuyMine").removeClass("button").addClass("buttonInvalid");
  $("#btnBuyMine").removeClass("invisible").addClass("visible");
  if (canAffordMine()){
    $("#btnBuyMine").removeClass("buttonInvalid").addClass("button");
  };

  $("#btnBuyGenerator").removeClass("button").addClass("buttonInvalid");
  $("#btnBuyGenerator").removeClass("invisible").addClass("visible");
  if (canAffordGenerator()){
    $("#btnBuyGenerator").removeClass("buttonInvalid").addClass("button");
  };

  $("#btnBuyFactory").removeClass("button").addClass("buttonInvalid");
  $("#btnBuyFactory").removeClass("invisible").addClass("visible");
  if (canAffordFactory()){
    $("#btnBuyFactory").removeClass("buttonInvalid").addClass("button");
  };
 
  $("#btnBuyLab").removeClass("button").addClass("buttonInvalid");
  $("#btnBuyLab").removeClass("invisible").addClass("visible");
  if (canAffordLab()){
    $("#btnBuyLab").removeClass("buttonInvalid").addClass("button");
  };

  $("#btnRailgunUpgrade").removeClass("button").addClass("buttonInvalid");
  $("#btnRailgunUpgrade").text("Upgrade Railgun " + (gameData.technologies.railgunUpgrade + 1));
  if (canAffordRailgunUpgrade()){
    $("#btnRailgunUpgrade").removeClass("buttonInvalid").addClass("button");
  };
  
  $("#btnLaserUpgrade").removeClass("button").addClass("buttonInvalid");
  $("#btnLaserUpgrade").text("Upgrade Laser " + (gameData.technologies.laserUpgrade + 1));
  $("#btnLaserUpgrade").removeClass("visible").addClass("invisible");
  if (gameData.technologies.laserPrestigeLevelUnlocked > 0){
    $("#btnLaserUpgrade").removeClass("invisible").addClass("visible");
  };
  if (canAffordLaserUpgrade()){
    $("#btnLaserUpgrade").removeClass("buttonInvalid").addClass("button");
  };

  $("#btnMissileUpgrade").removeClass("button").addClass("buttonInvalid");
  $("#btnMissileUpgrade").text("Upgrade Missile " + (gameData.technologies.missileUpgrade + 1));
  $("#btnMissileUpgrade").removeClass("visible").addClass("invisible");
  if (gameData.technologies.missilePrestigeLevelUnlocked > 0){
    $("#btnMissileUpgrade").removeClass("invisible").addClass("visible");
  };
  if (canAffordMissileUpgrade()){
    $("#btnMissileUpgrade").removeClass("buttonInvalid").addClass("button");
  };

  $("#btnArmorUpgrade").removeClass("button").addClass("buttonInvalid");
  $("#btnArmorUpgrade").text("Upgrade Armor " + (gameData.technologies.armorUpgrade + 1));
  if (canAffordArmorUpgrade()){
    $("#btnArmorUpgrade").removeClass("buttonInvalid").addClass("button");
  };

  $("#btnRailgunPrestige").removeClass("button").addClass("buttonInvalid");
  $("#btnRailgunPrestige").removeClass("visible").addClass("invisible");
  if (gameData.technologies.railgunPrestigeLevelUnlocked > gameData.technologies.railgunPrestigeLevelBought){
    $("#btnRailgunPrestige").removeClass("invisible").addClass("visible");
    $("#btnRailgunPrestige").text("Prestige Railgun " + (gameData.technologies.railgunPrestigeLevelBought + 1));
    if (canAffordRailgunPrestige()){
      $("#btnRailgunPrestige").removeClass("buttonInvalid").addClass("button");
    };
  };

  $("#btnLaserPrestige").removeClass("button").addClass("buttonInvalid");
  $("#btnLaserPrestige").removeClass("visible").addClass("invisible");
  if (gameData.technologies.laserPrestigeLevelUnlocked > gameData.technologies.laserPrestigeLevelBought){
    $("#btnLaserPrestige").removeClass("invisible").addClass("visible");
    $("#btnLaserPrestige").text("Prestige Laser " + (gameData.technologies.laserPrestigeLevelBought + 1));
    if (canAffordLaserPrestige()){
      $("#btnLaserPrestige").removeClass("buttonInvalid").addClass("button");
    };
  };

  $("#btnMissilePrestige").removeClass("button").addClass("buttonInvalid");
  $("#btnMissilePrestige").removeClass("visible").addClass("invisible");
  if (gameData.technologies.missilePrestigeLevelUnlocked > gameData.technologies.missilePrestigeLevelBought){
    $("#btnMissilePrestige").removeClass("invisible").addClass("visible");
    $("#btnMissilePrestige").text("Prestige Missile " + (gameData.technologies.missilePrestigeLevelBought + 1));
    if (canAffordMissilePrestige()){
      $("#btnMissilePrestige").removeClass("buttonInvalid").addClass("button");
    };
  };

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

function buildTooltipForUpgrade(MBC, MGF, PBC, PGF, RBC, RGF, UL, PL){
  var rtnString = 'Metal Cost:' + prettify(MBC * UL * Math.pow(MGF, PL - 1));
  rtnString += '\nPolymer Cost:' + prettify(PBC * UL * Math.pow(PGF, PL - 1));
  rtnString += '\nResearch Point Cost:' + prettify(RBC * UL * Math.pow(RGF, PL - 1));
  return rtnString;
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
  var facilityMetalCost = Math.floor(SHIPYARD_METAL_BASE_COST * Math.pow(SHIPYARD_METAL_GROWTH_FACTOR, gameData.buildings.shipyard));
  if(gameData.resources.metal < facilityMetalCost){
    return false;
  };
  var facilityRPCost = Math.floor(SHIPYARD_RP_BASE_COST * Math.pow(SHIPYARD_RP_GROWTH_FACTOR, gameData.buildings.shipyard));
  if(gameData.resources.researchPoints < facilityRPCost){
    return false;
  };
  if(CheckPower(SHIPYARD_POWER_USAGE) == false){
    return false;
  };
  if (gameData.technologies.shipyardTechUnlock <= gameData.buildings.shipyard){
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
  var shipMetalCost = shipMetalRequired(gameData.buildings.shipyard)
  var shipPolymerCost = shipPolymerRequired(gameData.buildings.shipyard)
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
  var nextMetalCost = (RAILGUN_UPGRADE_METAL_BASE_COST * gameData.technologies.railgunUpgrade * Math.pow(RAILGUN_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought -1));
  var nextPolymerCost = (RAILGUN_UPGRADE_POLYMER_BASE_COST * gameData.technologies.railgunUpgrade * Math.pow(RAILGUN_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought -1));
  var nextRPCost = (RAILGUN_UPGRADE_RP_BASE_COST * gameData.technologies.railgunUpgrade * Math.pow(RAILGUN_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought -1));
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
  var nextMetalCost = (LASER_UPGRADE_METAL_BASE_COST * gameData.technologies.laserUpgrade * Math.pow(LASER_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought -1));
  var nextPolymerCost = (LASER_UPGRADE_POLYMER_BASE_COST * gameData.technologies.laserUpgrade * Math.pow(LASER_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought -1));
  var nextRPCost = (LASER_UPGRADE_RP_BASE_COST * gameData.technologies.laserUpgrade * Math.pow(LASER_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought -1));
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

function canAffordMissileUpgrade(){
  var nextMetalCost = (MISSILE_UPGRADE_METAL_BASE_COST * gameData.technologies.missileUpgrade * Math.pow(MISSILE_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought -1));
  var nextPolymerCost = (MISSILE_UPGRADE_POLYMER_BASE_COST * gameData.technologies.missileUpgrade * Math.pow(MISSILE_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought -1));
  var nextRPCost = (MISSILE_UPGRADE_RP_BASE_COST * gameData.technologies.missileUpgrade * Math.pow(MISSILE_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought -1));
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

function canAffordMissilePrestige(){
  var nextMetalCost = Math.floor(MISSILE_PRESTIGE_METAL_BASE_COST * Math.pow(MISSILE_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1));
  var nextPolymerCost = Math.floor(MISSILE_PRESTIGE_POLYMER_BASE_COST * Math.pow(MISSILE_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1));
  var nextRPCost = Math.floor(MISSILE_PRESTIGE_RP_BASE_COST * Math.pow(MISSILE_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1));
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
  var nextMetalCost = (ARMOR_UPGRADE_METAL_BASE_COST * gameData.technologies.armorUpgrade * Math.pow(ARMOR_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought -1));
  var nextPolymerCost = (ARMOR_UPGRADE_POLYMER_BASE_COST * gameData.technologies.armorUpgrade * Math.pow(ARMOR_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought -1));
  var nextRPCost = (ARMOR_UPGRADE_RP_BASE_COST * gameData.technologies.armorUpgrade * Math.pow(ARMOR_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought -1));
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
  var facilities = (gameData.buildings.mines * MINE_POWER_USAGE) + (gameData.buildings.shipyard * SHIPYARD_POWER_USAGE) + (gameData.buildings.factories * FACTORY_POWER_USAGE) + (gameData.buildings.labs * LAB_POWER_USAGE);
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
  $('#btnBuyMine').attr('title', 'Metal Cost:' + prettify(MINE_BASE_COST * Math.pow(MINE_GROWTH_FACTOR, gameData.buildings.mines)) + '\nPower Cost:' + MINE_POWER_USAGE);
    gtag('event', "buy mine", {
      'event_category': "click",
      'event_label': "label",
      'value': "value"
    });
}; 

function buyFactory(){
  var nextCost = Math.floor(FACTORY_BASE_COST * Math.pow(FACTORY_GROWTH_FACTOR, gameData.buildings.factories));
  if((gameData.resources.metal >= nextCost) && CheckPower(FACTORY_POWER_USAGE)){
    gameData.buildings.factories += 1;
    gameData.resources.metal -= nextCost;
    $('#btnBuyFactory').attr('title', 'Metal Cost:' + prettify(FACTORY_BASE_COST * Math.pow(FACTORY_GROWTH_FACTOR, gameData.buildings.factories)) + '\nPower Cost:' + FACTORY_POWER_USAGE);
  };
}; 

function buyAutoFight(){
  if((gameData.resources.metal >= AUTOFIGHT_METAL_COST) && (gameData.resources.researchPoints >= AUTOFIGHT_RP_COST) && (gameData.resources.polymers >= AUTOFIGHT_POLYMERS_COST)){
    gameData.technologies.autofightBought = 1;
    gameData.resources.metal -= AUTOFIGHT_METAL_COST;
    gameData.resources.polymers -= AUTOFIGHT_POLYMERS_COST;
    gameData.resources.researchPoints -= AUTOFIGHT_RP_COST;
    gtag('event', "buy autofight", {
      'event_category': "click",
      'event_label': "label",
      'value': "value"
    });
  };
}; 

function buyLab(){
  var nextMetalCost = Math.floor(LAB_METAL_BASE_COST * Math.pow(LAB_METAL_GROWTH_FACTOR, gameData.buildings.labs));
  var nextPolymerCost = Math.floor(LAB_POLYMER_BASE_COST * Math.pow(LAB_POLYMER_GROWTH_FACTOR, gameData.buildings.labs));
  if((gameData.resources.metal >= nextMetalCost) && (gameData.resources.polymers >= nextPolymerCost) && CheckPower(LAB_POWER_USAGE)){
    gameData.buildings.labs += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    $('#btnBuyLab').attr('title', 'Metal Cost:' + prettify(LAB_METAL_BASE_COST * Math.pow(LAB_METAL_GROWTH_FACTOR, gameData.buildings.labs)) + 
      '\nPolymer Cost:' + prettify(LAB_POLYMER_BASE_COST * Math.pow(LAB_POLYMER_GROWTH_FACTOR, gameData.buildings.labs)) + 
      '\nPower Cost:' + LAB_POWER_USAGE);
  };
}; 

function buyGenerator(){
  var nextCost = Math.floor(GENERATOR_BASE_COST * Math.pow(GENERATOR_GROWTH_FACTOR, gameData.buildings.generators));
  if(gameData.resources.metal >= nextCost){
    gameData.buildings.generators += 1;
    gameData.resources.metal -= nextCost;
    $('#btnBuyGenerator').attr('title', 'Metal Cost:' + prettify(GENERATOR_BASE_COST * Math.pow(GENERATOR_GROWTH_FACTOR, gameData.buildings.generators)));
  };
}; 

function buyShipyard(){
  var nextMetalCost = Math.floor(SHIPYARD_METAL_BASE_COST * Math.pow(SHIPYARD_METAL_GROWTH_FACTOR, gameData.buildings.shipyard));  
  var nextRPCost = Math.floor(SHIPYARD_RP_BASE_COST * Math.pow(SHIPYARD_RP_GROWTH_FACTOR, gameData.buildings.shipyard));  
  if((gameData.resources.metal >= nextMetalCost) && CheckPower(SHIPYARD_POWER_USAGE) && gameData.buildings.shipyard < gameData.technologies.shipyardTechUnlock && gameData.resources.researchPoints >= nextRPCost){
    gameData.buildings.shipyard += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.researchPoints -= nextRPCost;
    gtag('event', "buy shipyard", {
      'event_category': "click",
      'event_label': "label",
      'value': "value"
    });
    $('#btnBuyShipyard').attr('title', 'Metal Cost:' + prettify(SHIPYARD_METAL_BASE_COST * Math.pow(SHIPYARD_METAL_GROWTH_FACTOR, gameData.buildings.shipyard)) + 
      '\nPower Cost:' + SHIPYARD_POWER_USAGE + 
      '\nResarch Cost:' + prettify(SHIPYARD_RP_BASE_COST * Math.pow(SHIPYARD_RP_GROWTH_FACTOR, gameData.buildings.shipyard)));
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
    $('#btnMetalTech').attr('title', 'Metal Cost:' + prettify((METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))) +
      '\nResearch Cost:' + prettify((METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))));
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
    $('#btnPolymerTech').attr('title', 'Polymer Cost:' + prettify(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)) + 
      '\nResearch Cost:' + prettify(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)));
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
    $('#btnPowerTech').attr('title', 'Metal Cost:' + prettify(POWER_PROFIECIENCY_METAL_COST * Math.pow(POWER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought)) + 
      '\nPolymer Cost:' + prettify(POWER_PROFIECIENCY_POLYMER_COST * Math.pow(POWER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought)) + 
      '\nResearch Cost:' + prettify(POWER_PROFIECIENCY_RP_COST * Math.pow(POWER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought)));
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
    $('#btnResearchTech').attr('title', 'Metal Cost:' + prettify(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) +
      '\nPolymer Cost:' + prettify(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) + 
      '\nResearch Cost:' + prettify(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)));
  };
};

function buyRailgunUpgrade(){
  var nextMetalCost = (RAILGUN_UPGRADE_METAL_BASE_COST * gameData.technologies.railgunUpgrade * Math.pow(RAILGUN_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought -1));
  var nextPolymerCost = (RAILGUN_UPGRADE_POLYMER_BASE_COST * gameData.technologies.railgunUpgrade * Math.pow(RAILGUN_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought -1));
  var nextRPCost = (RAILGUN_UPGRADE_RP_BASE_COST * gameData.technologies.railgunUpgrade * Math.pow(RAILGUN_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought -1));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost){
    gameData.technologies.railgunUpgrade += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
    $('#btnRailgunUpgrade').attr('title', buildTooltipForUpgrade(RAILGUN_UPGRADE_METAL_BASE_COST, RAILGUN_PRESTIGE_METAL_GROWTH_FACTOR, RAILGUN_UPGRADE_POLYMER_BASE_COST, RAILGUN_PRESTIGE_POLYMER_GROWTH_FACTOR, RAILGUN_UPGRADE_RP_BASE_COST, RAILGUN_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.railgunUpgrade, gameData.technologies.railgunPrestigeLevelBought));
  };
};

function buyLaserUpgrade(){
  var nextMetalCost = (LASER_UPGRADE_METAL_BASE_COST * gameData.technologies.laserUpgrade * Math.pow(LASER_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought -1));
  var nextPolymerCost = (LASER_UPGRADE_POLYMER_BASE_COST * gameData.technologies.laserUpgrade * Math.pow(LASER_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought -1));
  var nextRPCost = (LASER_UPGRADE_RP_BASE_COST * gameData.technologies.laserUpgrade * Math.pow(LASER_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought -1));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost){
    gameData.technologies.laserUpgrade += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
    $('#btnLaserUpgrade').attr('title', buildTooltipForUpgrade(LASER_UPGRADE_METAL_BASE_COST, LASER_PRESTIGE_METAL_GROWTH_FACTOR, LASER_UPGRADE_POLYMER_BASE_COST, LASER_PRESTIGE_POLYMER_GROWTH_FACTOR, LASER_UPGRADE_RP_BASE_COST, LASER_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.laserUpgrade, gameData.technologies.laserPrestigeLevelBought));
  };
};

function buyMissileUpgrade(){
  var nextMetalCost = (MISSILE_UPGRADE_METAL_BASE_COST * gameData.technologies.missileUpgrade * Math.pow(MISSILE_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought -1));
  var nextPolymerCost = (MISSILE_UPGRADE_POLYMER_BASE_COST * gameData.technologies.missileUpgrade * Math.pow(MISSILE_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought -1));
  var nextRPCost = (MISSILE_UPGRADE_RP_BASE_COST * gameData.technologies.missileUpgrade * Math.pow(MISSILE_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought -1));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost){
    gameData.technologies.missileUpgrade += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
    $('#btnMissileUpgrade').attr('title', buildTooltipForUpgrade(MISSILE_UPGRADE_METAL_BASE_COST, MISSILE_PRESTIGE_METAL_GROWTH_FACTOR, MISSILE_UPGRADE_POLYMER_BASE_COST, MISSILE_PRESTIGE_POLYMER_GROWTH_FACTOR, MISSILE_UPGRADE_RP_BASE_COST, MISSILE_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.missileUpgrade, gameData.technologies.missilePrestigeLevelBought));
  };
};

function buyArmorUpgrade(){
  var nextMetalCost = (ARMOR_UPGRADE_METAL_BASE_COST * gameData.technologies.armorUpgrade * Math.pow(ARMOR_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought -1));
  var nextPolymerCost = (ARMOR_UPGRADE_POLYMER_BASE_COST * gameData.technologies.armorUpgrade * Math.pow(ARMOR_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought -1));
  var nextRPCost = (ARMOR_UPGRADE_RP_BASE_COST * gameData.technologies.armorUpgrade * Math.pow(ARMOR_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought -1));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost){
    gameData.technologies.armorUpgrade += 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
    $('#btnArmorUpgrade').attr('title', buildTooltipForUpgrade(ARMOR_UPGRADE_METAL_BASE_COST, ARMOR_PRESTIGE_METAL_GROWTH_FACTOR, ARMOR_UPGRADE_POLYMER_BASE_COST, ARMOR_PRESTIGE_POLYMER_GROWTH_FACTOR, ARMOR_UPGRADE_RP_BASE_COST, ARMOR_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.armorUpgrade, gameData.technologies.armorPrestigeLevelBought));
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
    $('#btnRailgunPrestige').attr('title', 'Metal Cost:' + prettify(RAILGUN_PRESTIGE_METAL_BASE_COST * Math.pow(RAILGUN_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1)) +
      '\nPolymer Cost:' + prettify(RAILGUN_PRESTIGE_POLYMER_BASE_COST * Math.pow(RAILGUN_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1)) + 
      '\nResearch Cost:' + prettify(RAILGUN_PRESTIGE_RP_BASE_COST * Math.pow(RAILGUN_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1)));
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
    $('#btnLaserPrestige').attr('title', 'Metal Cost:' + prettify(LASER_PRESTIGE_METAL_BASE_COST * Math.pow(LASER_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1)) + 
      '\nPolymer Cost:' + prettify(LASER_PRESTIGE_POLYMER_BASE_COST * Math.pow(LASER_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1)) + 
      '\nResearch Cost:' + prettify(LASER_PRESTIGE_RP_BASE_COST * Math.pow(LASER_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1)));
  };
};

function buyMissilePrestige(){
  var nextMetalCost = Math.floor(MISSILE_PRESTIGE_METAL_BASE_COST * Math.pow(MISSILE_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1));
  var nextPolymerCost = Math.floor(MISSILE_PRESTIGE_POLYMER_BASE_COST * Math.pow(MISSILE_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1));
  var nextRPCost = Math.floor(MISSILE_PRESTIGE_RP_BASE_COST * Math.pow(MISSILE_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1));
  if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymers >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost && gameData.technologies.missilePrestigeLevelBought < gameData.technologies.missilePrestigeLevelUnlocked){
    gameData.technologies.missilePrestigeLevelBought += 1;
    gameData.technologies.missileUpgrade = 1;
    gameData.resources.metal -= nextMetalCost;
    gameData.resources.polymers -= nextPolymerCost;
    gameData.resources.researchPoints -= nextRPCost;
    $('#btnMissilePrestige').attr('title', 'Metal Cost:' + prettify(MISSILE_PRESTIGE_METAL_BASE_COST * Math.pow(MISSILE_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1)) + 
      '\nPolymer Cost:' + prettify(MISSILE_PRESTIGE_POLYMER_BASE_COST * Math.pow(MISSILE_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1)) + 
      '\nResearch Cost:' + prettify(MISSILE_PRESTIGE_RP_BASE_COST * Math.pow(MISSILE_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1)));
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
    $('#btnArmorPrestige').attr('title', 'Metal Cost:' + prettify(ARMOR_PRESTIGE_METAL_BASE_COST * Math.pow(ARMOR_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1)) + 
      '\nPolymer Cost:' + prettify(ARMOR_PRESTIGE_POLYMER_BASE_COST * Math.pow(ARMOR_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1)) + 
      '\nResearch Cost:' + prettify(ARMOR_PRESTIGE_RP_BASE_COST * Math.pow(ARMOR_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1)));
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
  return size * (100 + Math.pow(5, gameData.technologies.railgunPrestigeLevelBought) + Math.pow(4, gameData.technologies.laserPrestigeLevelBought) + Math.pow(3, gameData.technologies.missilePrestigeLevelBought))
};

function shipPolymerRequired(size){
  return size * (50 + Math.pow(3, gameData.technologies.armorPrestigeLevelBought) + Math.pow(2, gameData.technologies.laserPrestigeLevelBought) + Math.pow(3, gameData.technologies.missilePrestigeLevelBought))
};

function sendShip(){
  if (gameData.playership.hitPoints > 0){
    return;
  };
  if (canAffordFight()){
    var shipMetalCost = shipMetalRequired(gameData.buildings.shipyard)
    var shipPolymerCost = shipPolymerRequired(gameData.buildings.shipyard)
    gameData.resources.metal -= shipMetalCost;
    gameData.resources.polymers -= shipPolymerCost;
    gameData.playership.size = gameData.buildings.shipyard;
    gameData.playership.defense = 0;
    gameData.playership.hitPoints = gameData.playership.size * (40 + (gameData.technologies.armorUpgrade * ARMOR_UPGRADE_BASE_IMPROVEMENT * Math.pow(ARMOR_PRESTIGE_BASE_MULTIPLIER, gameData.technologies.armorPrestigeLevelBought - 1)));
    var baseRailgunAttack = (gameData.technologies.railgunUpgrade * RAILGUN_UPGRADE_BASE_IMPROVEMENT * Math.pow(RAILGUN_PRESTIGE_BASE_MULTIPLIER, gameData.technologies.railgunPrestigeLevelBought - 1));
    var baseLaserAttack = (gameData.technologies.laserUpgrade * LASER_UPGRADE_BASE_IMPROVEMENT * Math.pow(LASER_PRESTIGE_BASE_MULTIPLIER, gameData.technologies.laserPrestigeLevelBought - 1));
    var baseMissileAttack = (gameData.technologies.missileUpgrade * MISSILE_UPGRADE_BASE_IMPROVEMENT * Math.pow(MISSILE_PRESTIGE_BASE_MULTIPLIER, gameData.technologies.missilePrestigeLevelBought - 1));
    gameData.playership.MinDamage = gameData.playership.size  * 0.75 * (baseRailgunAttack + baseLaserAttack + baseMissileAttack);
    gameData.playership.MaxDamage = gameData.playership.size  * 1.25 * (baseRailgunAttack + baseLaserAttack + baseMissileAttack);
  };
};

function chooseDamage(min, max){
  return (Math.random() * (max - min) + min);
};

function Attack(attacker, defender){
  var damageToEnemy = Math.max(chooseDamage(attacker.MinDamage, attacker.MaxDamage) - defender.defense, 0);
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
  if ((gameData.technologies.armorPrestigeLevelUnlocked < (Math.floor(gameData.world.region / 3)) + 1) && (gameData.world.zone >= 50)){
    gameData.technologies.armorPrestigeLevelUnlocked = (Math.floor(gameData.world.region / 3) + 1);
    addToDisplay('We can be even more impervious to pain');
  };
  if ((gameData.technologies.railgunPrestigeLevelUnlocked < (Math.floor(gameData.world.region / 3)) + 1) && (gameData.world.zone >= 60)){
    gameData.technologies.railgunPrestigeLevelUnlocked = (Math.floor(gameData.world.region / 3) + 1);
    addToDisplay('Railguns can be even more railgunny');
  };
  if ((gameData.technologies.laserPrestigeLevelUnlocked < (Math.floor(gameData.world.region / 3) + 1)) && (gameData.world.zone >= 70)){
    gameData.technologies.laserPrestigeLevelUnlocked = ((Math.floor(gameData.world.region / 3) + 1) + 1);
    addToDisplay('Lasers can be even more lasery');
  };
  if ((gameData.technologies.missilePrestigeLevelUnlocked < (Math.floor(gameData.world.region / 3) + 2)) && (gameData.world.zone >= 80)){
    gameData.technologies.missilePrestigeLevelUnlocked = ((Math.floor(gameData.world.region / 3) + 2) + 1);
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
  if ((gameData.world.region >= 3) && (gameData.world.zone >= 25) && (gameData.technologies.missileUpgrade < 1)){
    gameData.technologies.missileUpgrade = 1;
    gameData.technologies.missilePrestigeLevelUnlocked = 1;
    gameData.technologies.missilePrestigeLevelBought = 1;
    addToDisplay('OOOOOOOOOH!  Very missiley!');
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

function OnPageLoadFunction(){
  if (needtoload){
    load();
  };
  $('#btnAutoFight').attr('title', 'Metal Cost:' + AUTOFIGHT_METAL_COST + '\nPolymer Cost:' + AUTOFIGHT_POLYMERS_COST + '\nResarch Point Cost:' + AUTOFIGHT_RP_COST);
  $('#btnMetalTech').attr('title', 'Metal Cost:' + prettify((METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))) +
    '\nResearch Cost:' + prettify((METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiencyBought))));
  $('#btnPolymerTech').attr('title', 'Polymer Cost:' + prettify(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)) + 
    '\nResearch Cost:' + prettify(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiencyBought)));
  $('#btnPowerTech').attr('title', 'Metal Cost:' + prettify(POWER_PROFIECIENCY_METAL_COST * Math.pow(POWER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought)) + 
    '\nPolymer Cost:' + prettify(POWER_PROFIECIENCY_POLYMER_COST * Math.pow(POWER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought)) + 
    '\nResearch Cost:' + prettify(POWER_PROFIECIENCY_RP_COST * Math.pow(POWER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.powerProficiencyBought)));
  $('#btnResearchTech').attr('title', 'Metal Cost:' + prettify(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) +
    '\nPolymer Cost:' + prettify(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)) + 
    '\nResearch Cost:' + prettify(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiencyBought)));
  $('#btnBuyShipyard').attr('title', 'Metal Cost:' + prettify(SHIPYARD_METAL_BASE_COST * Math.pow(SHIPYARD_METAL_GROWTH_FACTOR, gameData.buildings.shipyard)) + 
    '\nPower Cost:' + SHIPYARD_POWER_USAGE + 
    '\nResarch Cost:' + prettify(SHIPYARD_RP_BASE_COST * Math.pow(SHIPYARD_RP_GROWTH_FACTOR, gameData.buildings.shipyard)));
  $('#btnBuyMine').attr('title', 'Metal Cost:' + prettify(MINE_BASE_COST * Math.pow(MINE_GROWTH_FACTOR, gameData.buildings.mines)) + '\nPower Cost:' + MINE_POWER_USAGE);
  $('#btnBuyLab').attr('title', 'Metal Cost:' + prettify(LAB_METAL_BASE_COST * Math.pow(LAB_METAL_GROWTH_FACTOR, gameData.buildings.labs)) + 
    '\nPolymer Cost:' + prettify(LAB_POLYMER_BASE_COST * Math.pow(LAB_POLYMER_GROWTH_FACTOR, gameData.buildings.labs)) + 
    '\nPower Cost:' + LAB_POWER_USAGE);
  $('#btnBuyGenerator').attr('title', 'Metal Cost:' + prettify(GENERATOR_BASE_COST * Math.pow(GENERATOR_GROWTH_FACTOR, gameData.buildings.generators)));
  $('#btnBuyFactory').attr('title', 'Metal Cost:' + prettify(FACTORY_BASE_COST * Math.pow(FACTORY_GROWTH_FACTOR, gameData.buildings.factories)) + '\nPower Cost:' + FACTORY_POWER_USAGE);
  $('#btnRailgunUpgrade').attr('title', buildTooltipForUpgrade(RAILGUN_UPGRADE_METAL_BASE_COST, RAILGUN_PRESTIGE_METAL_GROWTH_FACTOR, RAILGUN_UPGRADE_POLYMER_BASE_COST, RAILGUN_PRESTIGE_POLYMER_GROWTH_FACTOR, RAILGUN_UPGRADE_RP_BASE_COST, RAILGUN_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.railgunUpgrade, gameData.technologies.railgunPrestigeLevelBought));
  $('#btnLaserUpgrade').attr('title', buildTooltipForUpgrade(LASER_UPGRADE_METAL_BASE_COST, LASER_PRESTIGE_METAL_GROWTH_FACTOR, LASER_UPGRADE_POLYMER_BASE_COST, LASER_PRESTIGE_POLYMER_GROWTH_FACTOR, LASER_UPGRADE_RP_BASE_COST, LASER_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.laserUpgrade, gameData.technologies.laserPrestigeLevelBought));
  $('#btnMissileUpgrade').attr('title', buildTooltipForUpgrade(MISSILE_UPGRADE_METAL_BASE_COST, MISSILE_PRESTIGE_METAL_GROWTH_FACTOR, MISSILE_UPGRADE_POLYMER_BASE_COST, MISSILE_PRESTIGE_POLYMER_GROWTH_FACTOR, MISSILE_UPGRADE_RP_BASE_COST, MISSILE_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.missileUpgrade, gameData.technologies.missilePrestigeLevelBought));
  $('#btnArmorUpgrade').attr('title', buildTooltipForUpgrade(ARMOR_UPGRADE_METAL_BASE_COST, ARMOR_PRESTIGE_METAL_GROWTH_FACTOR, ARMOR_UPGRADE_POLYMER_BASE_COST, ARMOR_PRESTIGE_POLYMER_GROWTH_FACTOR, ARMOR_UPGRADE_RP_BASE_COST, ARMOR_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.armorUpgrade, gameData.technologies.armorPrestigeLevelBought));
  $('#btnRailgunPrestige').attr('title', 'Metal Cost:' + prettify(RAILGUN_PRESTIGE_METAL_BASE_COST * Math.pow(RAILGUN_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1)) +
    '\nPolymer Cost:' + prettify(RAILGUN_PRESTIGE_POLYMER_BASE_COST * Math.pow(RAILGUN_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1)) + 
    '\nResearch Cost:' + prettify(RAILGUN_PRESTIGE_RP_BASE_COST * Math.pow(RAILGUN_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.railgunPrestigeLevelBought - 1)));
  $('#btnLaserPrestige').attr('title', 'Metal Cost:' + prettify(LASER_PRESTIGE_METAL_BASE_COST * Math.pow(LASER_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1)) + 
    '\nPolymer Cost:' + prettify(LASER_PRESTIGE_POLYMER_BASE_COST * Math.pow(LASER_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1)) + 
    '\nResearch Cost:' + prettify(LASER_PRESTIGE_RP_BASE_COST * Math.pow(LASER_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.laserPrestigeLevelBought - 1)));
  $('#btnMissilePrestige').attr('title', 'Metal Cost:' + prettify(MISSILE_PRESTIGE_METAL_BASE_COST * Math.pow(MISSILE_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1)) +
    '\nPolymer Cost:' + prettify(MISSILE_PRESTIGE_POLYMER_BASE_COST * Math.pow(MISSILE_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1)) + 
    '\nResearch Cost:' + prettify(MISSILE_PRESTIGE_RP_BASE_COST * Math.pow(MISSILE_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.missilePrestigeLevelBought - 1)));
  $('#btnArmorPrestige').attr('title', 'Metal Cost:' + prettify(ARMOR_PRESTIGE_METAL_BASE_COST * Math.pow(ARMOR_PRESTIGE_METAL_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1)) + 
    '\nPolymer Cost:' + prettify(ARMOR_PRESTIGE_POLYMER_BASE_COST * Math.pow(ARMOR_PRESTIGE_POLYMER_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1)) + 
    '\nResearch Cost:' + prettify(ARMOR_PRESTIGE_RP_BASE_COST * Math.pow(ARMOR_PRESTIGE_RP_GROWTH_FACTOR, gameData.technologies.armorPrestigeLevelBought - 1)));
};

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
addLoadEvent(OnPageLoadFunction);

window.setInterval(function(){
  var currentTime = new Date();
  var timeToCheckForSave = new Date();
  timeToCheckForSave.setMilliseconds(timeToCheckForSave.getMilliseconds() - 300000)

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
        Attack(gameData.playership, gameData.enemyship);
        if (gameData.enemyship.hitPoints > 0){
          Attack(gameData.enemyship, gameData.playership);
        };
      }else{
        if (gameData.technologies.autofightOn == 1){
          sendShip();
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

      gameData.enemyship.hitPoints = 20 * Math.pow(2.2, gameData.world.region-1) * Math.pow(1.01, gameData.world.zone-1)
      var baseEnemyAttack = 10 * Math.pow(2.21, gameData.world.region-1) * Math.pow(1.01, gameData.world.zone-1)
      gameData.enemyship.defense = 0;
      gameData.enemyship.MinDamage = baseEnemyAttack * 0.75
      gameData.enemyship.MaxDamage = baseEnemyAttack * 1.25
    };
    gameData.nextProcessTime.setMilliseconds(gameData.nextProcessTime.getMilliseconds() + 50);
  };
  updateGUI();
  var endTime = new Date();
  var msRunTime = Date.dateDiff('ms', currentTime, endTime)
  if(msRunTime > 50){
    addToDisplay(msRunTime);
  };
}, 10);
