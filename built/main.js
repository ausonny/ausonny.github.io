/* eslint-disable max-statements-per-line */
/* globals $, gtag, localStorage, location */
const RESOURCE_PRODUCTION_FRAME_RATE = 200; // this is how often we update the gui.
const AUTOFIGHT_METAL_COST = 1000;
const AUTOFIGHT_POLYMER_COST = 500;
const AUTOFIGHT_RP_COST = 100;
const POWER_PER_PANEL = 10;
const POWER_PER_GENERATOR = 15;
const POWER_PER_PLANT = 25;
const POWER_PER_AETHER_PLANT = 50;
const POWER_PER_FUSION_PLANT = 100;
const POWER_PER_CHRONOTON_PLANT = 250;
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
const FUSION_PLANT_METAL_BASE_COST = 1000000;
const FUSION_PLANT_GROWTH_FACTOR = 1.3;
const FUSION_PLANT_POLYMER_BASE_COST = 500000;
const FUSION_PLANT_AETHER_BASE_COST = 1000;
const CHRONOTON_PLANT_CHRONOTON_BASE_COST = 1;
const CHRONOTON_PLANT_GROWTH_FACTOR = 1.3;
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
const SHIELD_LAB_METAL_BASE_COST = 10000000;
const SHIELD_LAB_POLYMER_BASE_COST = 5000000;
const SHIELD_LAB_AETHER_BASE_COST = 50000;
const SHIELD_LAB_GROWTH_FACTOR = 1.3;
const SHIELD_LAB_POWER_USAGE = 5;
const SHIELD_LAB_POWER_GROWTH_USAGE = 1.01;
const ARMOR_LAB_METAL_BASE_COST = 2000000;
const ARMOR_LAB_POLYMER_BASE_COST = 1000000;
const ARMOR_LAB_AETHER_BASE_COST = 10000;
const ARMOR_LAB_GROWTH_FACTOR = 1.3;
const ARMOR_LAB_POWER_USAGE = 5;
const ARMOR_LAB_POWER_GROWTH_USAGE = 1.01;
const POWER_CONVERTER_METAL_BASE_COST = 1000000;
const POWER_CONVERTER_POLYMER_BASE_COST = 500000;
const POWER_CONVERTER_AETHER_BASE_COST = 5000;
const POWER_CONVERTER_GROWTH_FACTOR = 1.4;
const POWER_CONVERTER_POWER_USAGE = 5;
const POWER_CONVERTER_POWER_GROWTH_USAGE = 1.02;
const LAB_METAL_BASE_COST = 100;
const LAB_METAL_GROWTH_FACTOR = 1.3;
const LAB_POLYMER_BASE_COST = 100;
const LAB_POLYMER_GROWTH_FACTOR = 1.3;
const LAB_POWER_USAGE = 3;
const LAB_POWER_GROWTH_USAGE = 1.02;
const SHIPYARD_METAL_BASE_COST = 1000;
const SHIPYARD_METAL_GROWTH_FACTOR = 1.3;
const SHIPYARD_POLYMER_BASE_COST = 500;
const SHIPYARD_POLYMER_GROWTH_FACTOR = 1.3;
const SHIPYARD_POWER_USAGE = 10;
const SHIPYARD_POWER_GROWTH_USAGE = 1.3;
const SHIPYARD_RP_BASE_COST = 250;
const SHIPYARD_RP_GROWTH_FACTOR = 1.3;
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
const RAILGUN_UPGRADE_RP_BASE_COST = 50;
const RAILGUN_UPGRADE_BASE_IMPROVEMENT = 7;
const RAILGUN_UPGRADE_AETHER_BASE_COST = 500;
const LASER_UPGRADE_METAL_BASE_COST = 20;
const LASER_UPGRADE_POLYMER_BASE_COST = 40;
const LASER_UPGRADE_RP_BASE_COST = 50;
const LASER_UPGRADE_BASE_IMPROVEMENT = 0.5;
const LASER_UPGRADE_AETHER_BASE_COST = 500;
const MISSILE_UPGRADE_METAL_BASE_COST = 100 / 3;
const MISSILE_UPGRADE_POLYMER_BASE_COST = 100 / 3;
const MISSILE_UPGRADE_RP_BASE_COST = 50;
const MISSILE_UPGRADE_BASE_IMPROVEMENT = 20;
const MISSILE_UPGRADE_AETHER_BASE_COST = 500;
const ARMOR_UPGRADE_METAL_BASE_COST = 100;
const ARMOR_UPGRADE_POLYMER_BASE_COST = 0;
const ARMOR_UPGRADE_RP_BASE_COST = 50;
const ARMOR_UPGRADE_BASE_IMPROVEMENT = 50;
const ARMOR_UPGRADE_AETHER_BASE_COST = 500;
const SHIELD_UPGRADE_METAL_BASE_COST = 0;
const SHIELD_UPGRADE_POLYMER_BASE_COST = 100;
const SHIELD_UPGRADE_RP_BASE_COST = 50;
const SHIELD_UPGRADE_BASE_IMPROVEMENT = 50;
const SHIELD_UPGRADE_AETHER_BASE_COST = 500;
// const FLAK_UPGRADE_METAL_BASE_COST = 75;
// const FLAK_UPGRADE_POLYMER_BASE_COST = 75;
// const FLAK_UPGRADE_RP_BASE_COST = 110;
// const FLAK_UPGRADE_BASE_IMPROVEMENT = 40;
// const FLAK_UPGRADE_AETHER_BASE_COST = 350;
// const GALAXIES_PER_RULE = 20;
var notationDisplayOptions = ['Scientific Notation', 'Standard Formatting', 'Engineering Notation', 'Alphabetic Notation', 'Hybrid Notation', 'Logarithmic Notation'];
var LabSpeedOptions = ['Both', 'Fast Only', 'Slow Only'];
var possibleEnemies;
var lastSaveGameTime = new Date();
var textToDisplay;
var textGameSaved;
var textLoot;
var textCombat;
var textStory;
var textMissions;
var debugText = '';
var initted = false;
var gameData;
var achievementlist;
var achievementMultiplier = 0;
var locationToChangeTo = -1;
class Stats {
    constructor() {
        this.gatewaysUsed = 0;
        this.galaxiesCleared = 0;
        this.missionsCleared = 0;
        this.maxGalaxy = 0;
    }
}
class PossibleEnemy {
    constructor(name, attackMod, hitPointMod, shmod) {
        this.name = name;
        this.attackMod = attackMod;
        this.hitPointMod = hitPointMod;
        this.shmod = shmod;
    }
}
class CountInfo {
    constructor(count) {
        this.count = count;
    }
}
class EquipmentTechnology {
    constructor(upgrade, prestigeunlocked, prestigebought) {
        this.upgrade = upgrade;
        this.prestigeUnlocked = prestigeunlocked;
        this.prestigeBought = prestigebought;
    }
}
class ResourceTechnology {
    constructor(unlocked, bought) {
        this.unlocked = unlocked;
        this.bought = bought;
    }
}
class perk {
    constructor(name, count) {
        this.name = name;
        this.count = count;
    }
}
class automationRule {
    constructor(id) {
        this.id = id;
        this.active = false;
    }
}
class Achievement {
    constructor(id, name, bonus, check) {
        this.id = id;
        this.name = name;
        this.bonus = bonus;
        this.check = check;
    }
}
class ShipAttribute {
    constructor(name) {
        this.name = name;
    }
}
class DisplayItem {
    constructor(txt) {
        this.timeadded = new Date();
        this.txt = txt;
    }
}
class challenge {
    constructor(name, description, galaxyUnlocked, galaxyCompleted, btnConfirm) {
        this.name = name;
        this.unlocked = false;
        this.completed = false;
        this.description = description;
        this.galaxyCompleted = galaxyCompleted;
        this.galaxyUnlocked = galaxyUnlocked;
        this.btnConfirm = btnConfirm;
    }
    checkForCompletion() {
        try {
            if (gameData.missions[0].level > this.galaxyCompleted) {
                this.completed = true;
                gameData.world.currentChallenge = '';
                this.btnConfirm.classList.add('hidden');
                gameBuildings.panel.updateBuyButtonTooltip();
                gameBuildings.generator.updateBuyButtonTooltip();
                gameBuildings.plant.updateBuyButtonTooltip();
                gameBuildings.fusionPlant.updateBuyButtonTooltip();
                gameBuildings.chronotonPlant.updateBuyButtonTooltip();
            }
        }
        catch (error) {
            logMyErrors(error);
        }
    }
    checkForUnlock(galaxy) {
        try {
            if (galaxy > this.galaxyUnlocked) {
                if (!this.unlocked) {
                    addToDisplay('I have discovered a new address for the Gateway.  It will allow a new challenge to be attempted.  And there should be a nice reward.  Probably even a new ability!', 'story');
                }
                this.unlocked = true;
            }
        }
        catch (error) {
            logMyErrors(error);
        }
    }
    hideOrShowButton() {
        try {
            if (this.unlocked && !this.completed) {
                this.btnConfirm.classList.remove('hidden');
            }
            else {
                this.btnConfirm.classList.add('hidden');
            }
        }
        catch (error) {
            logMyErrors(error);
        }
    }
    updateToolTip() {
        try {
            this.btnConfirm.attributes.getNamedItem('title').value = this.description;
        }
        catch (error) {
            logMyErrors(error);
        }
    }
}
class saveGameData {
    constructor(name) {
        this.name = name;
        this.version = '0.7.8';
        this.stats = new Stats();
        var consistency = new challenge('Consistency', 'Your drones damage maximum will be lowered to the drones minimum damage for the duration of this challenge.  Completing Galaxy 20 will complete the challenge and unlock the Consistency ability which will improve your drones minimum damage and damage will return to normal.', 20, 20, document.getElementById('btnConfirmConsistency'));
        var power = new challenge('Power', 'Power production will be halved for the duration of this challenge. Completing Galaxy 25 will complete the challenge, unlock the Power ability, and return power production to normal.', 25, 25, document.getElementById('btnConfirmPower'));
        var criticality = new challenge('Criticality', 'The enemy has gained the ability to unleash massive amounts of critical damage from time to time.  Completing Galaxy 30 will complete the challenge and unlock the criticality ability.  Learning this ability will be incredibly helpful.', 30, 30, document.getElementById('btnConfirmCriticality'));
        var condenser = new challenge('Condenser', 'You are about to enter another dimension.  A dimension not only of sight and sound but of big maps.  Each map is 150 zones in size.   Completing Galaxy 35 will complete the challenge and unlock the condenser ability.  Each level bought will decrease Mission(not Galaxy) sizes by one.', 35, 35, document.getElementById('btnConfirmCondenser'));
        var streamline = new challenge('Streamline', 'You are about to enter another dimension.  A dimension not only of sight and sound but of expensive equipment.  Each piece of equipment or infusion is twice as expensive.   Completing Galaxy 40 will complete the challenge and unlock the streamline ability.  Streamline will reduce equipment and infusion costs.', 40, 40, document.getElementById('btnConfirmStreamline'));
        var automap = new challenge('AutoMap', 'You are about to enter another dimension.  A dimension not only of sight and sound but of no missions.  No missions will be available.   Completing Galaxy 25 will complete the challenge and unlock the automation skill AutoMap.  Automap autocompletes maps more than x levels lower than the current galaxy.', 45, 25, document.getElementById('btnConfirmAutoMap'));
        this.challenges = [];
        this.challenges.push(consistency);
        this.challenges.push(power);
        this.challenges.push(criticality);
        this.challenges.push(condenser);
        this.challenges.push(streamline);
        this.challenges.push(automap);
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
            fusionplantunlocked: false,
            chronotonplantunlocked: false
        };
        this.perks = [];
        this.perks.push(new perk('Looter', 0));
        this.perks.push(new perk('Producer', 0));
        this.perks.push(new perk('Damager', 0));
        this.perks.push(new perk('ThickSkin', 0));
        this.perks.push(new perk('Speed', 0));
        this.perks.push(new perk('Consistency', 0));
        this.perks.push(new perk('Power', 0));
        this.perks.push(new perk('Criticality', 0));
        this.perks.push(new perk('Condenser', 0));
        this.perks.push(new perk('StreamLine', 0));
        this.perks.push(new perk('AutoMap', 0));
        this.options = {
            logNotBase: 1,
            standardNotation: 1,
            armorLabOption: 0,
            shieldLabOption: 0
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
            aetherPlants: new CountInfo(0),
            factories: new CountInfo(0),
            generators: new CountInfo(0),
            labs: new CountInfo(0),
            mines: new CountInfo(1),
            panels: new CountInfo(1),
            plants: new CountInfo(0),
            refineries: new CountInfo(0),
            shipyard: new CountInfo(0),
            shieldLabs: new CountInfo(0),
            armorLabs: new CountInfo(0),
            fusionPlants: new CountInfo(0),
            chronotonPlants: new CountInfo(0),
            powerConverters: new CountInfo(0)
        };
        this.missions = [];
        this.enemyship = new Ship('dummy');
        this.playership = new Ship('Drone I');
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
            autofightBought: 0,
            autofightOn: 0,
            autofightUnlock: 0,
            goldMine: 0,
            metalProficiency: new ResourceTechnology(0, 0),
            polymerProficiency: new ResourceTechnology(0, 0),
            aetherProficiency: new ResourceTechnology(0, 0),
            researchProficiency: new ResourceTechnology(0, 0),
            railgun: new EquipmentTechnology(1, 1, 1),
            laser: new EquipmentTechnology(1, 1, 1),
            missile: new EquipmentTechnology(1, 1, 1),
            armor: new EquipmentTechnology(1, 1, 1),
            shield: new EquipmentTechnology(1, 1, 1),
            shipyardTechUnlock: 1,
            panelUpgrade: new CountInfo(0),
            generatorUpgrade: new CountInfo(0),
            plantupgrade: new CountInfo(0),
            aetherplantupgrade: new CountInfo(0),
            fusionplantupgrade: new CountInfo(0),
            chronotonplantupgrade: new CountInfo(0)
        };
        this.lastResourceProcessTime = new Date();
        this.lastRailgunCombatProcessTime = new Date();
        this.lastLaserCombatProcessTime = new Date();
        this.lastMissileCombatProcessTime = new Date();
        this.nextProcessTime = new Date();
        this.lastSentShipTime = new Date();
        this.tacticalChoices = {
            shieldLabsSetting: new CountInfo(0),
            armorLabsSetting: new CountInfo(0),
            powerConvertersSetting: new CountInfo(0)
        };
    }
}
class Mission {
    constructor(name, unique, difficulty, lootMultiplier, level, zones, IsGalaxy) {
        this.name = name;
        this.zone = 0;
        this.IsGalaxy = IsGalaxy;
        this.difficulty = difficulty;
        this.level = level;
        this.lootMultiplier = lootMultiplier;
        this.unique = unique;
        this.zones = zones;
        if (gameData.world.currentChallenge === 'Condenser') {
            this.zones = 150;
        }
        if (findChallenge('Condenser').completed && !this.IsGalaxy) {
            this.zones = 100 - findPerk('Condenser').count;
        }
        this.enemies = [];
        this.createMissionMap();
    }
    createMissionMap() {
        this.enemies = [];
        for (let index = 0; index < this.zones; index++) {
            this.enemies.push(new Ship().createEnemy(this, index));
        }
    }
}
function findChallenge(name) {
    for (let index = 0; index < gameData.challenges.length; index++) {
        const element = gameData.challenges[index];
        if (element.name === name) {
            return element;
        }
    }
    return null;
}
function findPerk(name) {
    for (let index = 0; index < gameData.perks.length; index++) {
        const element = gameData.perks[index];
        if (element.name === name) {
            return element;
        }
    }
    return null;
}
class Ship {
    constructor(name = '') {
        this.name = name;
        this.size = 1;
        this.hitPoints = 0;
        this.hitPointsMax = 0;
        this.minRailgunDamage = 0;
        this.maxRailgunDamage = 0;
        this.minLaserDamage = 0;
        this.maxLaserDamage = 0;
        this.minMissileDamage = 0;
        this.maxMissileDamage = 0;
        this.shield = 0;
        this.shieldMax = 0;
        this.lootType = '';
        this.lootAmount = 0;
        this.attributes = [];
        this.criticalChance = 0;
        this.criticalMultiplier = 1.0;
    }
    createEnemy(missionWork, zone) {
        var newEnemymods = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)]; // this will eventually need to be redone when we add advanced enemies
        this.name = newEnemymods.name;
        this.hitPoints = missionWork.difficulty * newEnemymods.hitPointMod * this.size * 60 * Math.pow(2.1, missionWork.level - 1) * Math.pow(1.007, zone - 1);
        this.hitPointsMax = this.hitPoints;
        var baseEnemyAttack = missionWork.difficulty * newEnemymods.attackMod * 30 * Math.pow(2.1, missionWork.level - 1) * Math.pow(1.007, zone - 1);
        this.minRailgunDamage = this.size * baseEnemyAttack / 1.25;
        this.maxRailgunDamage = this.size * baseEnemyAttack * 1.25;
        var loot = checkForCreateLoot(missionWork, zone);
        this.lootType = loot.lootType;
        this.lootAmount = loot.lootAmount;
        if (zone === missionWork.zones - 1) { // This is a Boss
            this.name += ' Station';
            this.hitPointsMax *= 0.60;
            this.shieldMax = this.hitPoints * newEnemymods.shmod;
            this.attributes.push(new ShipAttribute(ELITE_ENEMY_ATTRIBUTES[Math.floor(Math.random() * ELITE_ENEMY_ATTRIBUTES.length)]));
            while (this.lootType === '') {
                loot = checkForCreateLoot(missionWork, zone);
                this.lootType = loot.lootType;
                this.lootAmount = loot.lootAmount;
            }
            this.lootAmount *= 2;
        }
        if (gameData.world.currentChallenge === 'Criticality') {
            this.criticalMultiplier = 3.5;
            this.criticalChance = 25;
        }
        // Adjust for attributes.  Quick is handled in the attack function.
        if (this.attributes.filter((att) => (att.name === 'Hardy')).length > 0) {
            this.hitPointsMax *= 2;
        }
        if (this.attributes.filter((att) => (att.name === 'Elite')).length > 0) {
            this.shieldMax *= 2;
        }
        for (var i = 0; i < this.attributes.length; i++) {
            this.name = this.attributes[i].name + ' ' + this.name;
        }
        this.hitPoints = this.hitPointsMax;
        this.shield = this.shieldMax;
        return this;
    }
    createPlayerShip() {
        if (this.hitPoints > 0) {
            return;
        }
        gameData.world.dronesCreated++;
        this.name = 'Drone ' + prettify(gameData.world.dronesCreated);
        this.size = 1 * Math.pow(1.25, gameData.buildings.shipyard.count - 1);
        this.hitPointsMax = gameEquipment.armor.getValue();
        this.hitPoints = this.hitPointsMax;
        this.shieldMax = gameEquipment.shield.getValue();
        this.shield = gameData.playership.shieldMax;
        var baseAttack = gameEquipment.railgun.getValue();
        this.minRailgunDamage = baseAttack * (0.75 + (findPerk('Consistency').count / 100));
        if (gameData.world.currentChallenge === 'Consistency') {
            this.maxRailgunDamage = this.minRailgunDamage;
        }
        else {
            this.maxRailgunDamage = baseAttack * 1.25;
        }
        baseAttack = gameEquipment.laser.getValue();
        this.minLaserDamage = baseAttack * (0.75 + (findPerk('Consistency').count / 100));
        if (gameData.world.currentChallenge === 'Consistency') {
            this.maxLaserDamage = this.minLaserDamage;
        }
        else {
            this.maxLaserDamage = baseAttack * 1.25;
        }
        baseAttack = gameEquipment.missile.getValue();
        this.minMissileDamage = baseAttack * (0.75 + (findPerk('Consistency').count / 100));
        if (gameData.world.currentChallenge === 'Consistency') {
            this.maxMissileDamage = this.minMissileDamage;
        }
        else {
            this.maxMissileDamage = baseAttack * 1.25;
        }
        this.criticalChance = 0 + (findPerk('Criticality').count * 5);
        this.criticalMultiplier = 1 + (findPerk('Criticality').count * 0.5);
        checkForCompletedAchievements();
        gtag('event', 'Send Ship', {
            event_category: 'event',
            event_label: 'label',
            value: 'value'
        });
    }
    railgunAttack(defender) {
        if (this.hitPoints <= 0) {
            return;
        }
        var damageToEnemy = Math.max(chooseRandom(this.minRailgunDamage, this.maxRailgunDamage), 0);
        if (chooseRandom(0, 100) < this.criticalChance) {
            damageToEnemy *= this.criticalMultiplier;
            addToDisplay(this.name + ' scores a critical hit for ' + prettify(damageToEnemy) + ' damage', 'combat');
        }
        if (defender.shield > 0) {
            if (damageToEnemy > defender.shield) {
                damageToEnemy -= defender.shield;
                defender.shield -= 0;
            }
            else {
                defender.shield -= damageToEnemy;
                damageToEnemy = 0;
            }
        }
        if (damageToEnemy > 0) {
            defender.hitPoints -= damageToEnemy;
        }
    }
    laserAttack(defender) {
        if (this.hitPoints <= 0) {
            return;
        }
        var damageToEnemy = Math.max(chooseRandom(this.minLaserDamage, this.maxLaserDamage), 0);
        if (chooseRandom(0, 100) < this.criticalChance) {
            damageToEnemy *= this.criticalMultiplier;
            addToDisplay(this.name + ' scores a critical hit for ' + prettify(damageToEnemy) + ' damage', 'combat');
        }
        if (defender.shield > 0) {
            if (damageToEnemy > defender.shield) {
                damageToEnemy -= defender.shield;
                defender.shield -= 0;
            }
            else {
                defender.shield -= damageToEnemy;
                damageToEnemy = 0;
            }
        }
        if (damageToEnemy > 0) {
            defender.hitPoints -= damageToEnemy;
        }
    }
    missileAttack(defender) {
        if (this.hitPoints <= 0) {
            return;
        }
        var damageToEnemy = Math.max(chooseRandom(this.minMissileDamage, this.maxMissileDamage), 0);
        if (chooseRandom(0, 100) < this.criticalChance) {
            damageToEnemy *= this.criticalMultiplier;
            addToDisplay(this.name + ' scores a critical hit for ' + prettify(damageToEnemy) + ' damage', 'combat');
        }
        if (defender.shield > 0) {
            if (damageToEnemy > defender.shield) {
                damageToEnemy -= defender.shield;
                defender.shield -= 0;
            }
            else {
                defender.shield -= damageToEnemy;
                damageToEnemy = 0;
            }
        }
        if (damageToEnemy > 0) {
            defender.hitPoints -= damageToEnemy;
        }
    }
}
class PerkBase {
    constructor(name, perkData, initialCost, costGrowthRate, btnBuy, btnRemove, description, maxBought = -1) {
        this.name = name;
        this.perkData = perkData;
        this.costGrowthRate = costGrowthRate;
        this.initialCost = initialCost;
        this.btnBuy = btnBuy;
        this.btnRemove = btnRemove;
        this.maxBought = maxBought;
        this.description = description;
    }
    chronotonforBuy(amt = 1) {
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.initialCost * Math.pow(this.costGrowthRate, this.perkData.count + index);
        }
        return cost;
    }
    chronotonSpent() { return sumOfExponents(this.perkData.count, this.initialCost, this.costGrowthRate); }
    canAfford(amt = 1) { return chronotonAvailable() > this.chronotonforBuy(amt) && (this.perkData.count + amt - 1 < this.maxBought || this.maxBought === -1); }
    updateBuyButtonText() { this.btnBuy.innerHTML = (this.name + '(' + (this.perkData.count) + ')'); }
    toolTip() {
        var maxinfo = '';
        if (this.maxBought >= 1) {
            maxinfo = '\nMaximum allowed: ' + this.maxBought;
        }
        return (this.description + '\n\nChronoton Cost:' + prettify(this.chronotonforBuy()) + maxinfo);
    }
    updateBuyButtonTooltip() { this.btnBuy.attributes.getNamedItem('title').value = this.toolTip(); }
    getBonus() { return (1 + this.perkData.count * 0.1); }
    determineShowBuyButton() {
        var show = false;
        if (this.name === 'Consistency') {
            if (findChallenge('Consistency').completed) {
                show = true;
            }
        }
        else if (this.name === 'Power') {
            if (findChallenge('Power').completed) {
                show = true;
            }
        }
        else if (this.name === 'Criticality') {
            if (findChallenge('Criticality').completed) {
                show = true;
            }
        }
        else if (this.name === 'Condenser') {
            if (findChallenge('Condenser').completed) {
                show = true;
            }
        }
        else if (this.name === 'Streamline') {
            if (findChallenge('Streamline').completed) {
                show = true;
            }
        }
        else if (this.name === 'AutoMap') {
            if (findChallenge('AutoMap').completed) {
                show = true;
            }
        }
        else {
            show = true;
        }
        if (show) {
            this.btnBuy.classList.remove('hidden');
            if (this.perkData.count > 0 && gameData.missions[0].level === 1) {
                this.btnRemove.classList.remove('hidden');
            }
            else {
                this.btnRemove.classList.add('hidden');
            }
        }
        else {
            this.btnBuy.classList.add('hidden');
            this.btnRemove.classList.add('hidden');
        }
    }
    determineShowAffordUpgrade() {
        if (this.canAfford()) {
            this.btnBuy.classList.remove('btn-danger');
            this.btnBuy.classList.add('btn-primary');
        }
        else {
            this.btnBuy.classList.add('btn-danger');
            this.btnBuy.classList.remove('btn-primary');
        }
    }
    add(amt = 1) {
        if (this.canAfford(amt)) {
            for (let index = 0; index < amt; index++) {
                this.perkData.count++;
            }
            this.updateBuyButtonText();
            this.updateBuyButtonTooltip();
        }
    }
    remove() {
        this.perkData.count = 0;
        this.updateBuyButtonText();
        this.updateBuyButtonTooltip();
    }
}
var gamePerks = {
    looter: new PerkBase('Looter', new perk('name', 0), 1, 1.3, document.getElementById('btnLooter'), document.getElementById('btnLooterRemove'), 'Each level adds 10% additively to the resources gained from fighting as well as chronoton gained from finishing a galaxy'),
    producer: new PerkBase('Producer', new perk('name', 0), 1, 1.3, document.getElementById('btnProducer'), document.getElementById('btnProducerRemove'), 'Each level adds 10% additively to the resources gained from production'),
    damager: new PerkBase('Damager', new perk('name', 0), 1, 1.3, document.getElementById('btnDamager'), document.getElementById('btnDamagerRemove'), 'Each level adds 10% additively to the damage of our drones'),
    thickskin: new PerkBase('ThickSkin', new perk('name', 0), 1, 1.3, document.getElementById('btnThickSkin'), document.getElementById('btnThickSkinRemove'), 'Each level adds 10% additively to the hitpoints and shields of our drones'),
    speed: new PerkBase('Speed', new perk('name', 0), 5, 1.3, document.getElementById('btnSpeed'), document.getElementById('btnSpeedRemove'), 'Each level reduces the delay between attacks by 50ms', 10),
    consistency: new PerkBase('Consistency', new perk('name', 0), 1, 1.3, document.getElementById('btnConsistency'), document.getElementById('btnConsistencyRemove'), 'Each attack does between 75% and 125% of the base damage.  Each level of consistency bought increases the lower figure by 1%, i.e. 5 levels will make the range 80% to 125%', 25),
    power: new PerkBase('Power', new perk('name', 0), 25, 1.3, document.getElementById('btnPower'), document.getElementById('btnPowerRemove'), 'Each level adds 10% additevely to the power created by our facilities'),
    criticality: new PerkBase('Criticality', new perk('name', 0), 100, 1.3, document.getElementById('btnCriticality'), document.getElementById('btnCriticalityRemove'), 'Each level adds 5% to the chance for a critical hit and 50% to the damage done by a critical hit', 10),
    condenser: new PerkBase('Condenser', new perk('name', 0), 100, 1.3, document.getElementById('btnCondenser'), document.getElementById('btnCondenserRemove'), 'Each level reduces the size of mission maps (not galaxy maps) by 1', 75),
    streamline: new PerkBase('Streamline', new perk('name', 0), 15, 1.3, document.getElementById('btnStreamline'), document.getElementById('btnStreamlineRemove'), 'Each level is a 5% multiplicative decrease to all equipment and prestige costs'),
    automap: new PerkBase('AutoMap', new perk('name', 0), 1000, 1.3, document.getElementById('btnAutoMap'), document.getElementById('btnAutoMapRemove'), 'Level 1 automatically gives the plans from any mission more than 10 levels below the current galaxy.  Each level bought decreases the gap by 1', 10)
};
class EquipmentBase {
    constructor(name, weapon, valueperlevel, upgradeMetalBaseCost, upgradePolymerBaseCost, upgradeRPBaseCost, upgradeAetherBaseCost, tech, upgradeButton, upgrade10Button, prestigeButton) {
        this.name = name;
        this.weapon = weapon;
        this.valuePerLevel = valueperlevel;
        this.upgradeMetalBaseCost = upgradeMetalBaseCost;
        this.upgradePolymerBaseCost = upgradePolymerBaseCost;
        this.upgradeRPBaseCost = upgradeRPBaseCost;
        this.upgradeAetherBaseCost = upgradeAetherBaseCost;
        this.technology = tech;
        this.upgradeButton = upgradeButton;
        this.upgrade10Button = upgrade10Button;
        this.prestigeButton = prestigeButton;
        if (weapon) {
            this.buttonclass = 'btn-warning';
        }
        else if (this.name == 'Shield') {
            this.buttonclass = 'btn-primary';
        }
        else {
            this.buttonclass = 'btn-info';
        }
    }
    metalForUpgrade(amt = 1) {
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.upgradeMetalBaseCost * Math.pow(1.10, this.technology.upgrade + index);
        }
        return cost;
    }
    polymerForUpgrade(amt = 1) {
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.upgradePolymerBaseCost * Math.pow(1.10, this.technology.upgrade + index);
        }
        return cost;
    }
    rpForUpgrade(amt = 1) {
        //  return 0 * amt * this.upgradeRPBaseCost;
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.upgradeRPBaseCost * Math.pow(1.10, this.technology.upgrade + index);
        }
        return cost;
    }
    metalForPrestige() { return (this.upgradeMetalBaseCost * Math.pow(11, this.technology.prestigeBought - 1)); }
    polymerForPrestige() { return (this.upgradePolymerBaseCost * Math.pow(11, this.technology.prestigeBought - 1)); }
    rpForPrestige() { return (this.upgradeRPBaseCost * Math.pow(11, this.technology.prestigeBought - 1)); }
    aetherForPrestige() { return (this.upgradeAetherBaseCost * Math.pow(11, this.technology.prestigeBought - 1)); }
    tooltipForUpgrade(amt = 1) {
        var str = '';
        if (this.weapon) {
            str = ' damage';
        }
        else if (this.name === 'Shield') {
            str = ' shield';
        }
        else {
            str = ' hit points';
        }
        return ('Adds ' + prettify(this.getValuePerUpgrade() * amt) + str + '\nMetal Cost:' + prettify(this.metalForUpgrade(amt)) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade(amt)) + '\nRP Cost:' + prettify(this.rpForUpgrade(amt)));
    }
    tooltipForPrestige() { return ('INFUSION\nThis will improve our ' + this.name + ', but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); }
    updateUpgradeText() { this.upgradeButton.innerHTML = (this.name + ' (' + (this.technology.upgrade) + ')'); }
    updateUpgradeTooltip() {
        this.upgradeButton.attributes.getNamedItem('title').value = this.tooltipForUpgrade();
        this.upgrade10Button.attributes.getNamedItem('title').value = this.tooltipForUpgrade(10);
    }
    updatePrestigeText() { this.prestigeButton.innerHTML = 'U'; } //   'Infuse Railgun ' + (gameData.technologies.railgunPrestigeLevelBought + 1)); },
    updatePrestigeTooltip() { this.prestigeButton.attributes.getNamedItem('title').value = this.tooltipForPrestige(); }
    canAffordUpgrade(amt = 1) { return (gameData.resources.metal >= this.metalForUpgrade(amt)) && (gameData.resources.polymer >= this.polymerForUpgrade(amt)) && (gameData.resources.researchPoints >= this.rpForUpgrade(amt)); }
    canAffordPrestige() { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); }
    getValuePerUpgrade() {
        var value = this.valuePerLevel * Math.pow(10, this.technology.prestigeBought - 1) * gameData.playership.size;
        if (this.weapon) {
            value *= achievementMultiplier;
            value *= gamePerks.damager.getBonus();
        }
        else {
            value *= gamePerks.thickskin.getBonus();
        }
        if (this.name === 'Shield') {
            value *= gameBuildings.shieldLab.getBonus();
        }
        else if (this.name === 'Armor') {
            value *= gameBuildings.armorLab.getBonus();
        }
        return value;
    }
    getValue() { return (this.technology.upgrade * this.getValuePerUpgrade()); }
    determineShowUpgradeButton() {
        if (this.technology.prestigeBought > 0) {
            this.upgradeButton.classList.remove('hidden');
            this.upgrade10Button.classList.remove('hidden');
        }
        else {
            this.upgradeButton.classList.add('hidden');
            this.upgrade10Button.classList.add('hidden');
        }
    }
    determineShowPrestigeButton() {
        if (this.technology.prestigeUnlocked > this.technology.prestigeBought) {
            this.prestigeButton.classList.remove('hidden');
        }
        else {
            this.prestigeButton.classList.add('hidden');
        }
    }
    determineShowAffordUpgrade() {
        if (this.canAffordUpgrade()) {
            this.upgradeButton.classList.remove('btn-danger');
            this.upgradeButton.classList.add(this.buttonclass);
        }
        else {
            this.upgradeButton.classList.add('btn-danger');
            this.upgradeButton.classList.remove(this.buttonclass);
        }
        if (this.canAffordUpgrade(10)) {
            this.upgrade10Button.classList.remove('btn-danger');
            this.upgrade10Button.classList.add(this.buttonclass);
        }
        else {
            this.upgrade10Button.classList.add('btn-danger');
            this.upgrade10Button.classList.remove(this.buttonclass);
        }
    }
    determineShowAffordPrestige() {
        if (this.canAffordPrestige()) {
            this.prestigeButton.classList.remove('btn-danger');
            this.prestigeButton.classList.add(this.buttonclass);
        }
        else {
            this.prestigeButton.classList.add('btn-danger');
            this.prestigeButton.classList.remove(this.buttonclass);
        }
    }
    buyUpgrade(amt = 1) {
        if (this.canAffordUpgrade(amt)) {
            for (let index = 0; index < amt; index++) {
                gameData.resources.metal -= this.metalForUpgrade();
                gameData.resources.polymer -= this.polymerForUpgrade();
                gameData.resources.researchPoints -= this.rpForUpgrade();
                this.technology.upgrade++;
            }
            this.updateUpgradeText();
            this.updateUpgradeTooltip();
        }
    }
    buyPrestige() {
        if (this.canAffordPrestige()) {
            gameData.resources.metal -= this.metalForPrestige();
            gameData.resources.polymer -= this.polymerForPrestige();
            gameData.resources.researchPoints -= this.rpForPrestige();
            gameData.resources.aether -= this.aetherForPrestige();
            this.technology.prestigeBought++;
            this.updatePrestigeTooltip();
            this.updateUpgradeText();
            this.updateUpgradeTooltip();
            this.updatePrestigeText();
            $('#btnFight').attr('title', 'Send Ship');
        }
    }
}
var gameEquipment = {
    railgun: new EquipmentBase('Railgun', true, RAILGUN_UPGRADE_BASE_IMPROVEMENT, RAILGUN_UPGRADE_METAL_BASE_COST, RAILGUN_UPGRADE_POLYMER_BASE_COST, RAILGUN_UPGRADE_RP_BASE_COST, RAILGUN_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(1, 1, 1), document.getElementById('btnRailgunUpgrade'), document.getElementById('btnRailgunUpgrade10'), document.getElementById('btnRailgunPrestige')),
    laser: new EquipmentBase('Laser', true, LASER_UPGRADE_BASE_IMPROVEMENT, LASER_UPGRADE_METAL_BASE_COST, LASER_UPGRADE_POLYMER_BASE_COST, LASER_UPGRADE_RP_BASE_COST, LASER_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(1, 1, 1), document.getElementById('btnLaserUpgrade'), document.getElementById('btnLaserUpgrade10'), document.getElementById('btnLaserPrestige')),
    missile: new EquipmentBase('Missile', true, MISSILE_UPGRADE_BASE_IMPROVEMENT, MISSILE_UPGRADE_METAL_BASE_COST, MISSILE_UPGRADE_POLYMER_BASE_COST, MISSILE_UPGRADE_RP_BASE_COST, MISSILE_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(1, 1, 1), document.getElementById('btnMissileUpgrade'), document.getElementById('btnMissileUpgrade10'), document.getElementById('btnMissilePrestige')),
    armor: new EquipmentBase('Armor', false, ARMOR_UPGRADE_BASE_IMPROVEMENT, ARMOR_UPGRADE_METAL_BASE_COST, ARMOR_UPGRADE_POLYMER_BASE_COST, ARMOR_UPGRADE_RP_BASE_COST, ARMOR_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(1, 1, 1), document.getElementById('btnArmorUpgrade'), document.getElementById('btnArmorUpgrade10'), document.getElementById('btnArmorPrestige')),
    shield: new EquipmentBase('Shield', false, SHIELD_UPGRADE_BASE_IMPROVEMENT, SHIELD_UPGRADE_METAL_BASE_COST, SHIELD_UPGRADE_POLYMER_BASE_COST, SHIELD_UPGRADE_RP_BASE_COST, SHIELD_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(1, 1, 1), document.getElementById('btnShieldUpgrade'), document.getElementById('btnShieldUpgrade10'), document.getElementById('btnShieldPrestige'))
};
class BuildingBase {
    constructor(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, chronotonBaseCost, chronotonGrowthFactor, buildinginfo, buyButton, buy10Button, buyButtonClass, powerGrowth, powerUsage) {
        this.name = name;
        this.metalBaseCost = metalBaseCost;
        this.metalGrowthFactor = metalGrowthFactor;
        this.polymerBaseCost = polymerBaseCost;
        this.polymerGrowthFactor = polymerGrowthFactor;
        this.aetherBaseCost = aetherBaseCost;
        this.aetherGrowthFactor = aetherGrowthFactor;
        this.chronotonBaseCost = chronotonBaseCost;
        this.chronotonGrowthFactor = chronotonGrowthFactor;
        this.buildinginfo = buildinginfo;
        this.buyButton = buyButton;
        this.buy10Button = buy10Button;
        this.buyButtonClass = buyButtonClass;
        this.powerGrowth = powerGrowth;
        this.powerUsage = powerUsage;
        this.unlocked = false;
    }
    metalCost(amt = 1) {
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.metalBaseCost * Math.pow(this.metalGrowthFactor, this.buildinginfo.count + index);
        }
        return cost;
    }
    polymerCost(amt = 1) {
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.polymerBaseCost * Math.pow(this.polymerGrowthFactor, this.buildinginfo.count + index);
        }
        return cost;
    }
    aetherCost(amt = 1) {
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.aetherBaseCost * Math.pow(this.aetherGrowthFactor, this.buildinginfo.count + index);
        }
        return cost;
    }
    chronotonCost(amt = 1) {
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.chronotonBaseCost * Math.pow(this.chronotonGrowthFactor, this.buildinginfo.count + index);
        }
        return cost;
    }
    powerCost(amt = 1) {
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.powerUsage * Math.pow(this.powerGrowth, this.buildinginfo.count + index);
        }
        return cost;
    }
    canAffordBuy(amt = 1) { return (gameData.resources.metal >= this.metalCost(amt) && gameData.resources.polymer >= this.polymerCost(amt) && gameData.resources.aether >= this.aetherCost(amt) && gameData.resources.chronotonfragments >= this.chronotonCost(amt) && CheckPower(this.powerCost(amt))); }
    updateBuyButtonText() { this.buyButton.innerHTML = this.name + ': ' + prettify(this.buildinginfo.count); }
    tooltipCost(amt = 1) {
        var rtn = '\nCosts:';
        if (this.metalCost(amt) > 0) {
            rtn += '\nMetal:' + prettify(this.metalCost(amt));
        }
        if (this.polymerCost(amt) > 0) {
            rtn += '\nPolymer:' + prettify(this.polymerCost(amt));
        }
        if (this.aetherCost(amt) > 0) {
            rtn += '\nAether:' + prettify(this.aetherCost(amt));
        }
        if (this.chronotonCost(amt) > 0) {
            rtn += '\nChronoton Fragment:' + prettify(this.chronotonCost(amt));
        }
        if (this.powerCost(amt) > 0) {
            rtn += '\nPower:' + prettify(this.powerCost(amt));
        }
        return rtn;
    }
    determineShowAffordBuy() {
        if (this.canAffordBuy()) {
            this.buyButton.classList.remove('btn-danger');
            this.buyButton.classList.add(this.buyButtonClass);
        }
        else {
            this.buyButton.classList.add('btn-danger');
            this.buyButton.classList.remove(this.buyButtonClass);
        }
        if (this.canAffordBuy(10)) {
            this.buy10Button.classList.remove('btn-danger');
            this.buy10Button.classList.add(this.buyButtonClass);
        }
        else {
            this.buy10Button.classList.add('btn-danger');
            this.buy10Button.classList.remove(this.buyButtonClass);
        }
    }
    powerSpent() { return sumOfExponents(this.buildinginfo.count, this.powerUsage, this.powerGrowth); }
    buy(amt = 1) {
        if (this.canAffordBuy(amt) && this.unlocked) {
            for (let index = 0; index < amt; index++) {
                gameData.resources.metal -= this.metalCost();
                gameData.resources.polymer -= this.polymerCost();
                gameData.resources.aether -= this.aetherCost();
                gameData.resources.chronotonfragments -= this.chronotonCost();
                this.buildinginfo.count++;
            }
            this.updateBuyButtonText();
            checkForCompletedAchievements();
        }
    }
    showBuyButton() {
        this.buyButton.classList.remove('hidden');
        this.buy10Button.classList.remove('hidden');
        this.unlocked = true;
    }
}
class PowerBuilding extends BuildingBase {
    constructor(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, chronotonBaseCost, chronotonGrowthFactor, buildinginfo, basePowerPer, technology, buyButton, buy10Button, buyButtonClass) {
        super(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, chronotonBaseCost, chronotonGrowthFactor, buildinginfo, buyButton, buy10Button, buyButtonClass, 0, 0);
        this.basePowerPer = basePowerPer;
        this.technology = technology;
    }
    powerPer(amt = 1) {
        var rtn = (this.basePowerPer * Math.pow(2, this.technology.count) * gamePerks.power.getBonus()) * amt;
        if (gameData.world.currentChallenge === 'Power') {
            rtn /= 2;
        }
        return rtn;
    }
    totalPowerCreated() { return (this.buildinginfo.count * this.powerPer()); }
    tooltipCost(amt = 1) { return 'Creates ' + prettify(this.powerPer(amt)) + ' power' + super.tooltipCost(amt); }
    updateBuyButtonTooltip() {
        this.buyButton.attributes.getNamedItem('title').value = this.tooltipCost();
        this.buy10Button.attributes.getNamedItem('title').value = this.tooltipCost(10);
    }
    buy(amt = 1) {
        super.buy(amt);
        this.updateBuyButtonTooltip();
    }
}
class ResourceBuilding extends BuildingBase {
    constructor(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, buildinginfo, baseProductionPer, technology, buyButton, buy10Button, buyButtonClass, powerUsage, powerGrowth, proficiencyBaseRate) {
        super(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, 0, 0, buildinginfo, buyButton, buy10Button, buyButtonClass, powerGrowth, powerUsage);
        this.baseProductionPer = baseProductionPer;
        this.technology = technology;
        this.proficiencyBaseRate = proficiencyBaseRate;
    }
    tooltipCost(amt = 1) { return 'Creates ' + prettify(this.productionPerSecond() * amt / this.buildinginfo.count) + ' per second' + super.tooltipCost(amt); }
    updateBuyButtonTooltip() {
        this.buyButton.attributes.getNamedItem('title').value = this.tooltipCost();
        this.buy10Button.attributes.getNamedItem('title').value = this.tooltipCost(10);
    }
    productionPerSecond() {
        var increase = this.baseProductionPer * this.buildinginfo.count * Math.pow(this.proficiencyBaseRate, this.technology.bought);
        increase *= Math.pow(2, gameData.technologies.goldMine);
        increase *= gamePerks.producer.getBonus();
        if (gameData.tacticalChoices.powerConvertersSetting.count === 1) {
            increase *= gameBuildings.powerConverter.getBonus();
        }
        return increase;
    }
    buy(amt = 1) {
        super.buy(amt);
        this.technology.unlocked = Math.floor(this.buildinginfo.count / 10);
        this.updateBuyButtonTooltip();
    }
}
class PowerConverterBuilding extends BuildingBase {
    constructor(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, buildinginfo, buyButton, buy10Button, buyButtonClass, powerUsage, powerGrowth, tacticalChoice) {
        super(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, 0, 0, buildinginfo, buyButton, buy10Button, buyButtonClass, powerGrowth, powerUsage);
        this.tacticalChoices = tacticalChoice;
    }
    tooltipCost(amt = 1) { return ('Buying will set value to ' + prettify(this.getBonus(amt) * 100) + '% efficiency') + super.tooltipCost(amt); }
    updateBuyButtonTooltip() {
        this.buyButton.attributes.getNamedItem('title').value = this.tooltipCost();
        this.buy10Button.attributes.getNamedItem('title').value = this.tooltipCost(10);
    }
    getBonus(amt = 0) {
        var count = this.buildinginfo.count + amt;
        if (count == 0)
            return 1;
        return (1 + (count * gameData.resources.power * 0.0001));
    }
    buy(amt = 1) {
        if (this.tacticalChoices.count > 0) {
            super.buy(amt);
            this.updateBuyButtonTooltip();
            gameEquipment.armor.updateUpgradeTooltip();
            gameEquipment.shield.updateUpgradeTooltip();
        }
    }
}
class TacticBuilding extends BuildingBase {
    constructor(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, buildinginfo, buyButton, buy10Button, buyButtonClass, powerUsage, powerGrowth, tacticalChoice) {
        super(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, 0, 0, buildinginfo, buyButton, buy10Button, buyButtonClass, powerGrowth, powerUsage);
        this.tacticalChoices = tacticalChoice;
    }
    tooltipCost(amt = 1) { return ('Buying will set value to ' + prettify(this.getBonus(amt) * 100) + '% efficiency') + super.tooltipCost(amt); }
    updateBuyButtonTooltip() {
        this.buyButton.attributes.getNamedItem('title').value = this.tooltipCost();
        this.buy10Button.attributes.getNamedItem('title').value = this.tooltipCost(10);
    }
    getBonus(amt = 0) {
        var count = this.buildinginfo.count + amt;
        if (this.tacticalChoices.count === 0) {
            return 1;
        }
        else if (this.tacticalChoices.count === 1) {
            return (1 + (count * 0.1));
        }
        return (Math.pow(1.04, count));
    }
    buy(amt = 1) {
        if (this.tacticalChoices.count > 0) {
            super.buy(amt);
            this.updateBuyButtonTooltip();
            gameEquipment.armor.updateUpgradeTooltip();
            gameEquipment.shield.updateUpgradeTooltip();
        }
    }
}
var gameBuildings = {
    panel: new PowerBuilding('Solar Panel', PANEL_BASE_COST, PANEL_GROWTH_FACTOR, 0, 0, 0, 0, 0, 0, new CountInfo(0), POWER_PER_PANEL, new CountInfo(0), document.getElementById('btnBuyPanel'), document.getElementById('btnBuy10Panel'), 'btn-light'),
    generator: new PowerBuilding('Generator', GENERATOR_METAL_BASE_COST, GENERATOR_GROWTH_FACTOR, GENERATOR_POLYMER_BASE_COST, GENERATOR_GROWTH_FACTOR, 0, 0, 0, 0, new CountInfo(0), POWER_PER_GENERATOR, new CountInfo(0), document.getElementById('btnBuyGenerator'), document.getElementById('btnBuy10Generator'), 'btn-light'),
    plant: new PowerBuilding('Plant', PLANT_METAL_BASE_COST, PLANT_METAL_GROWTH_FACTOR, PLANT_POLYMER_BASE_COST, PLANT_POLYMER_GROWTH_FACTOR, 0, 0, 0, 0, new CountInfo(0), POWER_PER_PLANT, new CountInfo(0), document.getElementById('btnBuyPlant'), document.getElementById('btnBuy10Plant'), 'btn-light'),
    aetherPlant: new PowerBuilding('Aether Plant', AETHER_PLANT_METAL_BASE_COST, AETHER_PLANT_GROWTH_FACTOR, AETHER_PLANT_POLYMER_BASE_COST, AETHER_PLANT_GROWTH_FACTOR, AETHER_PLANT_AETHER_BASE_COST, AETHER_PLANT_GROWTH_FACTOR, 0, 0, new CountInfo(0), POWER_PER_AETHER_PLANT, new CountInfo(0), document.getElementById('btnBuyAetherPlant'), document.getElementById('btnBuy10AetherPlant'), 'btn-light'),
    fusionPlant: new PowerBuilding('Fusion Plant', FUSION_PLANT_METAL_BASE_COST, FUSION_PLANT_GROWTH_FACTOR, FUSION_PLANT_POLYMER_BASE_COST, FUSION_PLANT_GROWTH_FACTOR, FUSION_PLANT_AETHER_BASE_COST, FUSION_PLANT_GROWTH_FACTOR, 0, 0, new CountInfo(0), POWER_PER_FUSION_PLANT, new CountInfo(0), document.getElementById('btnBuyFusionPlant'), document.getElementById('btnBuy10FusionPlant'), 'btn-light'),
    chronotonPlant: new PowerBuilding('Chron. Plant', 0, 0, 0, 0, 0, 0, CHRONOTON_PLANT_CHRONOTON_BASE_COST, CHRONOTON_PLANT_GROWTH_FACTOR, new CountInfo(0), POWER_PER_CHRONOTON_PLANT, new CountInfo(0), document.getElementById('btnBuyChronotonPlant'), document.getElementById('btnBuy10ChronotonPlant'), 'btn-light'),
    mine: new ResourceBuilding('Mine', MINE_BASE_COST, MINE_GROWTH_FACTOR, 0, 0, 0, 0, new CountInfo(0), 1, new ResourceTechnology(0, 0), document.getElementById('btnBuyMine'), document.getElementById('btnBuy10Mine'), 'btn-metal', MINE_POWER_USAGE, MINE_POWER_GROWTH_USAGE, METAL_PROFICIENCY_BASE_RATE),
    lab: new ResourceBuilding('Lab', LAB_METAL_BASE_COST, LAB_METAL_GROWTH_FACTOR, LAB_POLYMER_BASE_COST, LAB_POLYMER_GROWTH_FACTOR, 0, 0, new CountInfo(0), 1.0, new ResourceTechnology(0, 0), document.getElementById('btnBuyLab'), document.getElementById('btnBuy10Lab'), 'btn-research', LAB_POWER_USAGE, LAB_POWER_GROWTH_USAGE, RESEARCH_PROFICIENCY_BASE_RATE),
    factory: new ResourceBuilding('Factory', FACTORY_BASE_COST, FACTORY_GROWTH_FACTOR, 0, 0, 0, 0, new CountInfo(0), 1, new ResourceTechnology(0, 0), document.getElementById('btnBuyFactory'), document.getElementById('btnBuy10Factory'), 'btn-polymer', FACTORY_POWER_USAGE, FACTORY_POWER_GROWTH_USAGE, POLYMER_PROFICIENCY_BASE_RATE),
    refinery: new ResourceBuilding('Refinery', REFINERY_METAL_BASE_COST, REFINERY_GROWTH_FACTOR, REFINERY_POLYMER_BASE_COST, REFINERY_GROWTH_FACTOR, 0, 0, new CountInfo(0), 1.0, new ResourceTechnology(0, 0), document.getElementById('btnBuyRefinery'), document.getElementById('btnBuy10Refinery'), 'btn-aether', REFINERY_POWER_USAGE, REFINERY_POWER_GROWTH_USAGE, AETHER_PROFICIENCY_BASE_RATE),
    shieldLab: new TacticBuilding('Shield Lab', SHIELD_LAB_METAL_BASE_COST, SHIELD_LAB_GROWTH_FACTOR, SHIELD_LAB_POLYMER_BASE_COST, SHIELD_LAB_GROWTH_FACTOR, SHIELD_LAB_AETHER_BASE_COST, SHIELD_LAB_GROWTH_FACTOR, new CountInfo(0), document.getElementById('btnBuyShieldLab'), document.getElementById('btnBuy10ShieldLab'), 'btn-success', SHIELD_LAB_POWER_USAGE, SHIELD_LAB_POWER_GROWTH_USAGE, new CountInfo(0)),
    armorLab: new TacticBuilding('Armor Lab', ARMOR_LAB_METAL_BASE_COST, ARMOR_LAB_GROWTH_FACTOR, ARMOR_LAB_POLYMER_BASE_COST, ARMOR_LAB_GROWTH_FACTOR, ARMOR_LAB_AETHER_BASE_COST, ARMOR_LAB_GROWTH_FACTOR, new CountInfo(0), document.getElementById('btnBuyArmorLab'), document.getElementById('btnBuy10ArmorLab'), 'btn-success', ARMOR_LAB_POWER_USAGE, ARMOR_LAB_POWER_GROWTH_USAGE, new CountInfo(0)),
    powerConverter: new PowerConverterBuilding('Converter', POWER_CONVERTER_METAL_BASE_COST, POWER_CONVERTER_GROWTH_FACTOR, POWER_CONVERTER_POLYMER_BASE_COST, POWER_CONVERTER_GROWTH_FACTOR, POWER_CONVERTER_AETHER_BASE_COST, POWER_CONVERTER_GROWTH_FACTOR, new CountInfo(0), document.getElementById('btnBuyPowerConverter'), document.getElementById('btnBuy10PowerConverter'), 'btn-success', POWER_CONVERTER_POWER_USAGE, POWER_CONVERTER_POWER_GROWTH_USAGE, new CountInfo(0)),
    shipyard: {
        metalCost: function () { return (SHIPYARD_METAL_BASE_COST * Math.pow(SHIPYARD_METAL_GROWTH_FACTOR, gameData.buildings.shipyard.count)); },
        polymerCost: function () { return (SHIPYARD_POLYMER_BASE_COST * Math.pow(SHIPYARD_POLYMER_GROWTH_FACTOR, gameData.buildings.shipyard.count)); },
        rpCost: function () { return (SHIPYARD_RP_BASE_COST * Math.pow(SHIPYARD_RP_GROWTH_FACTOR, gameData.buildings.shipyard.count)); },
        powerCost: function () { return (SHIPYARD_POWER_USAGE * Math.pow(SHIPYARD_POWER_GROWTH_USAGE, gameData.buildings.shipyard.count)); },
        powerSpent: function () { return sumOfExponents(gameData.buildings.shipyard.count, SHIPYARD_POWER_USAGE, SHIPYARD_POWER_GROWTH_USAGE); },
        tooltipCost: function () { return ('Increases ship size by 25%\nMetal Cost:' + prettify(this.metalCost()) + '\nPolymer Cost:' + prettify(this.polymerCost()) + '\nResearch Points Cost:' + prettify(this.rpCost()) + '\nPower Cost: ' + prettify(this.powerCost())); },
        canAffordBuy: function () { return (gameData.resources.metal >= this.metalCost() && gameData.resources.polymer >= this.polymerCost() && gameData.resources.researchPoints >= this.rpCost() && CheckPower(this.powerCost())); },
        updateBuyButtonText: function () { $('#btnBuyShipyard').text('Shipyard(' + (gameData.buildings.shipyard.count) + ')'); },
        updateBuyButtonTooltip: function () { $('#btnBuyShipyard').attr('title', this.tooltipCost()); },
        showBuyButton: function () { $('#btnBuyShipyard').removeClass('hidden'); },
        determineShowAffordBuy: function () {
            if (gameData.technologies.shipyardTechUnlock > gameData.buildings.shipyard.count) {
                $('#btnBuyShipyard').removeClass('hidden');
            }
            else {
                $('#btnBuyShipyard').addClass('hidden');
            }
            if (this.canAffordBuy()) {
                $('#btnBuyShipyard').removeClass('btn-danger').addClass('btn-secondary');
            }
            else {
                $('#btnBuyShipyard').removeClass('btn-secondary').addClass('btn-danger');
            }
        },
        buy: function () {
            if (this.canAffordBuy() && gameData.technologies.shipyardTechUnlock > gameData.buildings.shipyard.count) {
                gameData.resources.metal -= this.metalCost();
                gameData.resources.polymer -= this.polymerCost();
                gameData.resources.researchPoints -= this.rpCost();
                gameData.buildings.shipyard.count++;
                this.updateBuyButtonText();
                this.updateBuyButtonTooltip();
                gameEquipment.armor.updateUpgradeText();
                gameEquipment.shield.updateUpgradeText();
                gameEquipment.railgun.updateUpgradeText();
                gameEquipment.laser.updateUpgradeText();
                gameEquipment.missile.updateUpgradeText();
                gameEquipment.railgun.updateUpgradeTooltip();
                gameEquipment.laser.updateUpgradeTooltip();
                gameEquipment.missile.updateUpgradeTooltip();
                gameEquipment.armor.updateUpgradeTooltip();
                gameEquipment.shield.updateUpgradeTooltip();
                gtag('event', 'buy shipyard', {
                    event_category: 'click',
                    event_label: 'label',
                    value: 'value'
                });
            }
        }
    }
};
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
    rtn -= gamePerks.consistency.chronotonSpent();
    rtn -= gamePerks.power.chronotonSpent();
    rtn -= gamePerks.criticality.chronotonSpent();
    rtn -= gamePerks.condenser.chronotonSpent();
    rtn -= gamePerks.streamline.chronotonSpent();
    rtn -= gamePerks.automap.chronotonSpent();
    return rtn;
}
// @ts-ignore
function gatewayClick(challengeChosen = '') {
    gameData.stats.gatewaysUsed++;
    gameData.world.paused = true;
    gameData.resources.chronoton += gameData.resources.chronotonfragments;
    gameData.resources.chronotonfragments = 0;
    init(true, challengeChosen, gameData);
    $('#GatewayModal').modal('hide');
    gtag('event', 'gateway', {
        event_category: 'event',
        event_label: 'label',
        value: 'value'
    });
    gameData.world.paused = false;
}
function sumOfExponents(lvlsBought, baseCost, growthfactor) {
    var total = 0;
    for (var x = 0; x < lvlsBought; x++) {
        total += baseCost * Math.pow(growthfactor, x);
    }
    return total;
}
function saveGame() {
    localStorage.setItem('save', JSON.stringify(gameData));
    addToDisplay('Game Saved', 'gameSave');
    lastSaveGameTime = new Date();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('result').innerHTML = xhr.responseText;
        }
    };
    xhr.open('GET', 'version.txt');
    xhr.send();
    gtag('event', 'save game', {
        event_category: 'click',
        event_label: 'label',
        value: 'value'
    });
}
// completely stolen from trimps with very slight modifications
function prettifySub(num) {
    var floor = Math.floor(num);
    if (num === floor) { // number is an integer, just show it as-is
        return num;
    }
    return num.toFixed(3 - floor.toString().length);
}
// completely stolen from trimps with very slight modifications
function prettify(number) {
    var numberTmp = number;
    var exponent = '';
    var suffices = [];
    var suffix = '';
    if (!isFinite(number))
        return 'i';
    if (number >= 1000 && number < 10000)
        return Math.floor(number).toString();
    if (number == 0)
        return prettifySub(0).toString();
    if (number < 0)
        return '-' + prettify(-number);
    if (number < 0.005)
        return (+number).toExponential(2);
    var base = Math.floor(Math.log(number) / Math.log(1000));
    if (base <= 0)
        return prettifySub(number).toString();
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
        if (base <= suffices.length)
            suffix = suffices[base - 1];
        else {
            var suf2 = (base % suffices.length) - 1;
            if (suf2 < 0)
                suf2 = suffices.length - 1;
            suffix = suffices[Math.ceil(base / suffices.length) - 2] + suffices[suf2];
        }
    }
    else {
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
        }
        else if (gameData.options.standardNotation && base <= suffices.length) {
            suffix = suffices[base - 1];
        }
        else {
            exponent = numberTmp.toExponential(2);
            exponent = exponent.replace('+', '');
            return exponent;
        }
    }
    return prettifySub(number) + suffix;
}
function changeNotation() {
    gameData.options.standardNotation++;
    if (gameData.options.standardNotation >= 6) {
        gameData.options.standardNotation = 0;
    }
    $('#btnNotation').text(notationDisplayOptions[gameData.options.standardNotation]);
}
function changeArmorLabAvailability() {
    gameData.options.armorLabOption++;
    if (gameData.options.armorLabOption > 2) {
        gameData.options.armorLabOption = 0;
    }
    $('#btnArmorFastorSlow').text('Armor ' + LabSpeedOptions[gameData.options.armorLabOption]);
}
function changeShieldLabAvailability() {
    gameData.options.shieldLabOption++;
    if (gameData.options.shieldLabOption > 2) {
        gameData.options.shieldLabOption = 0;
    }
    $('#btnShieldFastorSlow').text('Shield ' + LabSpeedOptions[gameData.options.shieldLabOption]);
}
function resetGame() {
    localStorage.clear();
    location.reload(true);
}
function init(gatewayReset, activeChallenge, oldsave = null) {
    // debugText = 'v0.7.8 - automation';
    // debugText += '\nv0.7.7 - New power building, new challenge, other changes';
    // debugText += '\nv0.7.6 - Fix attack values bug, leading to what I think might be the 1.0 balance.  Rewrite of equipment and building code to use base classes.';
    // debugText += '\nv0.7.4 - Fix to criticality challenge and numerous balance changes';
    // debugText += '\nv0.7.3 - New challenge, new power techs, new power building, new gui, most things have been rebalanced';
    // debugText += '\nv0.7.2 - Another new attempt at a GUI!!! and some balance issues mainly related to research';
    // debugText += '\nv0.7.1 - Another new attempt at a GUI and nerfed Shields.  Changed Tactical Labs to effect shields instead of armor and flak';
    // debugText += '\nv0.7.0 - Another new attempt at a GUI and fixed the power challenge to not immediately be completed.';
    // debugText += '\nv0.6.9 - New GUI and some balance changes.';
    // debugText += '\nv0.6.8 - added another new challenge called power that cuts power generation in half.  It is unlocked at galaxy 25 and is completed by reaching galaxy 25.  It unlocks the power ability that increases power generation by 10% additively.  Also moved the consistency challenge to level 35.';
    // debugText += '\nv0.6.7 - Conversion to typescript is complete.\nThe first challenge is in the game.  It is called consistency and lowers the max damage to the min damage.  It is unlocked at galaxy 25 and is completed by reaching level 25.  It is activated on the gateway screen.  It unlocks the consistency ability which increases min damage.  When maxed out min damage will be 100% of the base damage while max damage stays at 125%.';
    // debugText += '\nKnown issues and other ramblings:';
    // debugText += '\n1. If the tab loses focus or is closed, when you return you will notice the game runs faster than expected until time catches up.  Enjoy this for now, eventually there will be an ability that will allow/limit this time.';
    // debugText += '\n2. There are currently no tooltips for touchscreen users.';
    // debugText += '\n3. The flavor text is basically in rough draft form complete with a few placeholders.';
    // debugText += '\n4. Balance is an ongoing process and any thoughts are appreciated.';
    // debugText += '\n5. Autosave is hardcoded for every five minutes.  This needs to be adjustable in settings.  And Playfab integration is coming.  One day.';
    // debugText += '\n6. Current achievements are limited.';
    // debugText += '\n7. I\'d like a visual representation of how far the player has advanced in the current mission/galaxy.';
    possibleEnemies = [];
    possibleEnemies.push(new PossibleEnemy('Raider', 1, 1, 1));
    possibleEnemies.push(new PossibleEnemy('Tank', 0.5, 2, 1));
    possibleEnemies.push(new PossibleEnemy('Wizard', 2, 0.5, 1));
    possibleEnemies.push(new PossibleEnemy('Paladin', 1.5, 0.7, 1));
    possibleEnemies.push(new PossibleEnemy('Ranger', 0.7, 1.5, 1));
    possibleEnemies.push(new PossibleEnemy('Raider', 1, 1, 1));
    textToDisplay = [];
    textGameSaved = [];
    textLoot = [];
    textCombat = [];
    textStory = [];
    textMissions = [];
    gameData = new saveGameData('new');
    if (gatewayReset) {
        gameData.resources.chronoton = oldsave.resources.chronoton;
        gameData.perks = oldsave.perks;
        gameData.achievementids = oldsave.achievementids;
        gameData.challenges = oldsave.challenges;
        gameData.world.currentChallenge = activeChallenge;
        gameData.stats = oldsave.stats;
        gameData.rules = oldsave.rules;
        gameData.options = oldsave.options;
    }
    else {
        var savegame = JSON.parse(localStorage.getItem('save'));
        if (savegame !== null) {
            if (typeof savegame.buildings.shipyard.count !== 'undefined')
                gameData.buildings.shipyard.count = savegame.buildings.shipyard.count;
            if (typeof savegame.buildings.factories.count !== 'undefined')
                gameData.buildings.factories.count = savegame.buildings.factories.count;
            if (typeof savegame.buildings.refineries.count !== 'undefined')
                gameData.buildings.refineries.count = savegame.buildings.refineries.count;
            if (typeof savegame.buildings.panels.count !== 'undefined')
                gameData.buildings.panels.count = savegame.buildings.panels.count;
            if (typeof savegame.buildings.generators.count !== 'undefined')
                gameData.buildings.generators.count = savegame.buildings.generators.count;
            if (typeof savegame.buildings.plants.count !== 'undefined')
                gameData.buildings.plants.count = savegame.buildings.plants.count;
            if (typeof savegame.buildings.aetherPlants.count !== 'undefined')
                gameData.buildings.aetherPlants.count = savegame.buildings.aetherPlants.count;
            if (typeof savegame.buildings.fusionPlants.count !== 'undefined')
                gameData.buildings.fusionPlants.count = savegame.buildings.fusionPlants.count;
            if (typeof savegame.buildings.chronotonPlants !== 'undefined')
                gameData.buildings.chronotonPlants.count = savegame.buildings.chronotonPlants.count;
            if (typeof savegame.buildings.labs.count !== 'undefined')
                gameData.buildings.labs.count = savegame.buildings.labs.count;
            if (typeof savegame.buildings.shieldLabs !== 'undefined' && typeof savegame.buildings.shieldLabs.count !== 'undefined')
                gameData.buildings.shieldLabs.count = savegame.buildings.shieldLabs.count;
            if (typeof savegame.buildings.armorLabs !== 'undefined' && typeof savegame.buildings.armorLabs.count !== 'undefined')
                gameData.buildings.armorLabs.count = savegame.buildings.armorLabs.count;
            if (typeof savegame.buildings.powerConverters !== 'undefined' && typeof savegame.buildings.powerConverters.count !== 'undefined')
                gameData.buildings.powerConverters.count = savegame.buildings.powerConverters.count;
            if (typeof savegame.buildings.mines.count !== 'undefined')
                gameData.buildings.mines.count = savegame.buildings.mines.count;
            if (typeof savegame.enemyship.shield !== 'undefined')
                gameData.enemyship.shield = savegame.enemyship.shield;
            if (typeof savegame.enemyship.name !== 'undefined')
                gameData.enemyship.name = savegame.enemyship.name;
            if (typeof savegame.enemyship.shieldMax !== 'undefined')
                gameData.enemyship.shieldMax = savegame.enemyship.shieldMax;
            if (typeof savegame.enemyship.hitPoints !== 'undefined')
                gameData.enemyship.hitPoints = savegame.enemyship.hitPoints;
            if (typeof savegame.enemyship.hitPointsMax !== 'undefined')
                gameData.enemyship.hitPointsMax = savegame.enemyship.hitPointsMax;
            if (typeof savegame.enemyship.maxRailgunDamage !== 'undefined')
                gameData.enemyship.maxRailgunDamage = savegame.enemyship.maxRailgunDamage;
            if (typeof savegame.enemyship.maxLaserDamage !== 'undefined')
                gameData.enemyship.maxLaserDamage = savegame.enemyship.maxLaserDamage;
            if (typeof savegame.enemyship.maxMissileDamage !== 'undefined')
                gameData.enemyship.maxMissileDamage = savegame.enemyship.maxMissileDamage;
            if (typeof savegame.enemyship.minRailgunDamage !== 'undefined')
                gameData.enemyship.minRailgunDamage = savegame.enemyship.minRailgunDamage;
            if (typeof savegame.enemyship.minLaserDamage !== 'undefined')
                gameData.enemyship.minLaserDamage = savegame.enemyship.minLaserDamage;
            if (typeof savegame.enemyship.minMissileDamage !== 'undefined')
                gameData.enemyship.minMissileDamage = savegame.enemyship.minMissileDamage;
            if (typeof savegame.enemyship.attributes !== 'undefined')
                gameData.enemyship.attributes = savegame.enemyship.attributes;
            if (typeof savegame.enemyship.size !== 'undefined')
                gameData.enemyship.size = savegame.enemyship.size;
            if (typeof savegame.lastRailgunCombatProcessTime !== 'undefined')
                gameData.lastRailgunCombatProcessTime = new Date(savegame.lastRailgunCombatProcessTime);
            if (typeof savegame.lastLaserCombatProcessTime !== 'undefined')
                gameData.lastLaserCombatProcessTime = new Date(savegame.lastLaserCombatProcessTime);
            if (typeof savegame.lastResourceProcessTime !== 'undefined')
                gameData.lastResourceProcessTime = new Date(savegame.lastResourceProcessTime);
            if (typeof savegame.nextProcessTime !== 'undefined')
                gameData.nextProcessTime = new Date(savegame.nextProcessTime);
            if (typeof savegame.lastSentShipTime !== 'undefined')
                gameData.lastSentShipTime = new Date(savegame.lastSentShipTime);
            if (typeof savegame.playership.shield !== 'undefined')
                gameData.playership.shield = savegame.playership.shield;
            if (typeof savegame.playership.shieldMax !== 'undefined')
                gameData.playership.shieldMax = savegame.playership.shieldMax;
            if (typeof savegame.playership.hitPoints !== 'undefined')
                gameData.playership.hitPoints = savegame.playership.hitPoints;
            if (typeof savegame.playership.hitPointsMax !== 'undefined')
                gameData.playership.hitPointsMax = savegame.playership.hitPointsMax;
            if (typeof savegame.playership.maxRailgunDamage !== 'undefined')
                gameData.playership.maxRailgunDamage = savegame.playership.maxRailgunDamage;
            if (typeof savegame.playership.maxLaserDamage !== 'undefined')
                gameData.playership.maxLaserDamage = savegame.playership.maxLaserDamage;
            if (typeof savegame.playership.maxMissileDamage !== 'undefined')
                gameData.playership.maxMissileDamage = savegame.playership.maxMissileDamage;
            if (typeof savegame.playership.minRailgunDamage !== 'undefined')
                gameData.playership.minRailgunDamage = savegame.playership.minRailgunDamage;
            if (typeof savegame.playership.minLaserDamage !== 'undefined')
                gameData.playership.minLaserDamage = savegame.playership.minLaserDamage;
            if (typeof savegame.playership.minMissileDamage !== 'undefined')
                gameData.playership.minMissileDamage = savegame.playership.minMissileDamage;
            if (typeof savegame.playership.size !== 'undefined')
                gameData.playership.size = savegame.playership.size;
            if (typeof savegame.playership.name !== 'undefined')
                gameData.playership.name = savegame.playership.name;
            if (typeof savegame.playership.criticalChance !== 'undefined')
                gameData.playership.criticalChance = savegame.playership.criticalChance;
            if (typeof savegame.playership.criticalMultiplier !== 'undefined')
                gameData.playership.criticalMultiplier = savegame.playership.criticalMultiplier;
            if (typeof savegame.resources.metal !== 'undefined')
                gameData.resources.metal = savegame.resources.metal;
            if (typeof savegame.resources.polymer !== 'undefined')
                gameData.resources.polymer = savegame.resources.polymer;
            if (typeof savegame.resources.power !== 'undefined')
                gameData.resources.power = savegame.resources.power;
            if (typeof savegame.resources.researchPoints !== 'undefined')
                gameData.resources.researchPoints = savegame.resources.researchPoints;
            if (typeof savegame.resources.aether !== 'undefined')
                gameData.resources.aether = savegame.resources.aether;
            if (typeof savegame.resources.chronoton !== 'undefined')
                gameData.resources.chronoton = savegame.resources.chronoton;
            if (typeof savegame.resources.chronotonfragments !== 'undefined')
                gameData.resources.chronotonfragments = savegame.resources.chronotonfragments;
            if (typeof savegame.technologies.autofightBought !== 'undefined')
                gameData.technologies.autofightBought = savegame.technologies.autofightBought;
            if (typeof savegame.technologies.autofightOn !== 'undefined')
                gameData.technologies.autofightOn = savegame.technologies.autofightOn;
            if (typeof savegame.technologies.autofightUnlock !== 'undefined')
                gameData.technologies.autofightUnlock = savegame.technologies.autofightUnlock;
            if (typeof savegame.technologies.metalProficiency.bought !== 'undefined')
                gameData.technologies.metalProficiency.bought = savegame.technologies.metalProficiency.bought;
            if (typeof savegame.technologies.polymerProficiency.bought !== 'undefined')
                gameData.technologies.polymerProficiency.bought = savegame.technologies.polymerProficiency.bought;
            if (typeof savegame.technologies.aetherProficiency.bought !== 'undefined')
                gameData.technologies.aetherProficiency.bought = savegame.technologies.aetherProficiency.bought;
            if (typeof savegame.technologies.researchProficiency.bought !== 'undefined')
                gameData.technologies.researchProficiency.bought = savegame.technologies.researchProficiency.bought;
            if (typeof savegame.technologies.metalProficiency.unlocked !== 'undefined')
                gameData.technologies.metalProficiency.unlocked = savegame.technologies.metalProficiency.unlocked;
            if (typeof savegame.technologies.polymerProficiency.unlocked !== 'undefined')
                gameData.technologies.polymerProficiency.unlocked = savegame.technologies.polymerProficiency.unlocked;
            if (typeof savegame.technologies.aetherProficiency.unlocked !== 'undefined')
                gameData.technologies.aetherProficiency.unlocked = savegame.technologies.aetherProficiency.unlocked;
            if (typeof savegame.technologies.researchProficiency.unlocked !== 'undefined')
                gameData.technologies.researchProficiency.unlocked = savegame.technologies.researchProficiency.unlocked;
            if (typeof savegame.technologies.shipyardTechUnlock !== 'undefined')
                gameData.technologies.shipyardTechUnlock = savegame.technologies.shipyardTechUnlock;
            if (typeof savegame.technologies.railgun !== 'undefined')
                gameData.technologies.railgun = savegame.technologies.railgun;
            if (typeof savegame.technologies.laser !== 'undefined')
                gameData.technologies.laser = savegame.technologies.laser;
            if (typeof savegame.technologies.missile !== 'undefined')
                gameData.technologies.missile = savegame.technologies.missile;
            if (typeof savegame.technologies.armor !== 'undefined')
                gameData.technologies.armor = savegame.technologies.armor;
            if (typeof savegame.technologies.shield !== 'undefined')
                gameData.technologies.shield = savegame.technologies.shield;
            if (typeof savegame.technologies.goldMine !== 'undefined')
                gameData.technologies.goldMine = savegame.technologies.goldMine;
            if (typeof savegame.technologies.panelUpgrade.count !== 'undefined')
                gameData.technologies.panelUpgrade = savegame.technologies.panelUpgrade;
            if (typeof savegame.technologies.generatorUpgrade.count !== 'undefined')
                gameData.technologies.generatorUpgrade = savegame.technologies.generatorUpgrade;
            if (typeof savegame.technologies.plantupgrade.count !== 'undefined')
                gameData.technologies.plantupgrade = savegame.technologies.plantupgrade;
            if (typeof savegame.technologies.aetherplantupgrade.count !== 'undefined')
                gameData.technologies.aetherplantupgrade = savegame.technologies.aetherplantupgrade;
            if (typeof savegame.technologies.fusionplantupgrade.count !== 'undefined')
                gameData.technologies.fusionplantupgrade = savegame.technologies.fusionplantupgrade;
            if (typeof savegame.missions !== 'undefined')
                gameData.missions = savegame.missions;
            if (typeof savegame.world.currentMission !== 'undefined')
                gameData.world.currentMission = savegame.world.currentMission;
            if (typeof savegame.world.lastGalaxy !== 'undefined')
                gameData.world.lastGalaxy = savegame.world.lastGalaxy;
            if (typeof savegame.world.timeElapsed !== 'undefined')
                gameData.world.timeElapsed = savegame.world.timeElapsed;
            if (typeof savegame.world.dronesCreated !== 'undefined')
                gameData.world.dronesCreated = savegame.world.dronesCreated;
            if (typeof savegame.world.currentChallenge !== 'undefined')
                gameData.world.currentChallenge = savegame.world.currentChallenge;
            if (typeof savegame.options.standardNotation !== 'undefined')
                gameData.options.standardNotation = savegame.options.standardNotation;
            if (typeof savegame.options.logNotBase !== 'undefined')
                gameData.options.logNotBase = savegame.options.logNotBase;
            if (typeof savegame.options.armorLabOption !== 'undefined')
                gameData.options.armorLabOption = savegame.options.armorLabOption;
            if (typeof savegame.options.shieldLabOption !== 'undefined')
                gameData.options.shieldLabOption = savegame.options.shieldLabOption;
            if (typeof savegame.achievementids !== 'undefined')
                gameData.achievementids = savegame.achievementids;
            if (typeof savegame.story.shipyardUnlocked !== 'undefined')
                gameData.story.shipyardUnlocked = savegame.story.shipyardUnlocked;
            if (typeof savegame.story.gatewayUnlocked !== 'undefined')
                gameData.story.gatewayUnlocked = savegame.story.gatewayUnlocked;
            if (typeof savegame.story.factoryunlocked !== 'undefined')
                gameData.story.factoryunlocked = savegame.story.factoryunlocked;
            if (typeof savegame.story.labunlocked !== 'undefined')
                gameData.story.labunlocked = savegame.story.labunlocked;
            if (typeof savegame.story.generatorunlocked !== 'undefined')
                gameData.story.generatorunlocked = savegame.story.generatorunlocked;
            if (typeof savegame.story.plantunlocked !== 'undefined')
                gameData.story.plantunlocked = savegame.story.plantunlocked;
            if (typeof savegame.story.aetherplantunlocked !== 'undefined')
                gameData.story.aetherplantunlocked = savegame.story.aetherplantunlocked;
            if (typeof savegame.story.refineryunlocked !== 'undefined')
                gameData.story.refineryunlocked = savegame.story.refineryunlocked;
            if (typeof savegame.story.initial !== 'undefined')
                gameData.story.initial = savegame.story.initial;
            if (typeof savegame.story.firstfight !== 'undefined')
                gameData.story.firstfight = savegame.story.firstfight;
            if (typeof savegame.story.consistencyunlocked !== 'undefined')
                gameData.story.consistencyunlocked = savegame.story.consistencyunlocked;
            if (typeof savegame.story.powerunlocked !== 'undefined')
                gameData.story.powerunlocked = savegame.story.powerunlocked;
            if (typeof savegame.story.criticalityunlocked !== 'undefined')
                gameData.story.criticalityunlocked = savegame.story.criticalityunlocked;
            for (let index = 0; index < gameData.challenges.length; index++) {
                const element = gameData.challenges[index];
                if (typeof savegame.challenges[index] !== 'undefined') {
                    element.unlocked = savegame.challenges[index].unlocked;
                    element.completed = savegame.challenges[index].completed;
                }
            }
            for (let index = 0; index < gameData.perks.length; index++) {
                const element = gameData.perks[index];
                if (typeof savegame.perks[index] !== 'undefined') {
                    element.count = savegame.perks[index].count;
                }
            }
            if (typeof savegame.tacticalChoices.shieldLabsSetting !== 'undefined')
                gameData.tacticalChoices.shieldLabsSetting = savegame.tacticalChoices.shieldLabsSetting;
            if (typeof savegame.tacticalChoices.armorLabsSetting !== 'undefined')
                gameData.tacticalChoices.armorLabsSetting = savegame.tacticalChoices.armorLabsSetting;
            if (typeof savegame.tacticalChoices.powerConvertersSetting !== 'undefined')
                gameData.tacticalChoices.powerConvertersSetting = savegame.tacticalChoices.powerConvertersSetting;
            if (typeof savegame.stats !== 'undefined') {
                if (typeof savegame.stats.gatewaysUsed !== 'undefined') {
                    gameData.stats.gatewaysUsed = savegame.stats.gatewaysUsed;
                }
                if (typeof savegame.stats.galaxiesCleared !== 'undefined') {
                    gameData.stats.galaxiesCleared = savegame.stats.galaxiesCleared;
                }
                if (typeof savegame.stats.missionsCleared !== 'undefined') {
                    gameData.stats.missionsCleared = savegame.stats.missionsCleared;
                }
                if (typeof savegame.stats.maxGalaxy !== 'undefined') {
                    gameData.stats.maxGalaxy = savegame.stats.maxGalaxy;
                }
            }
            if (typeof savegame.rules !== 'undefined') {
                gameData.rules = savegame.rules;
            }
            else {
                gameData.rules = [];
            }
            for (let index = 0; index < gameData.missions.length; index++) {
                const element = gameData.missions[index];
                for (let enemyindex = 0; enemyindex < element.enemies.length; enemyindex++) {
                    var enemy = element.enemies[enemyindex];
                    element.enemies[enemyindex] = Object.assign(new Ship(), enemy);
                }
            }
        }
    }
    gameBuildings.panel.unlocked = true;
    gameBuildings.mine.unlocked = true;
    gameBuildings.factory.unlocked = false;
    gameBuildings.refinery.unlocked = false;
    gameBuildings.lab.unlocked = false;
    gameBuildings.generator.unlocked = false;
    gameBuildings.plant.unlocked = false;
    gameBuildings.aetherPlant.unlocked = false;
    gameBuildings.fusionPlant.unlocked = false;
    gameBuildings.chronotonPlant.unlocked = false;
    gameBuildings.armorLab.unlocked = false;
    gameBuildings.shieldLab.unlocked = false;
    gameBuildings.powerConverter.unlocked = false;
    gameEquipment.railgun.technology = gameData.technologies.railgun;
    gameEquipment.laser.technology = gameData.technologies.laser;
    gameEquipment.missile.technology = gameData.technologies.missile;
    gameEquipment.armor.technology = gameData.technologies.armor;
    gameEquipment.shield.technology = gameData.technologies.shield;
    gameBuildings.panel.buildinginfo = gameData.buildings.panels;
    gameBuildings.panel.technology = gameData.technologies.panelUpgrade;
    gameBuildings.generator.buildinginfo = gameData.buildings.generators;
    gameBuildings.generator.technology = gameData.technologies.generatorUpgrade;
    gameBuildings.plant.buildinginfo = gameData.buildings.plants;
    gameBuildings.plant.technology = gameData.technologies.plantupgrade;
    gameBuildings.aetherPlant.buildinginfo = gameData.buildings.aetherPlants;
    gameBuildings.aetherPlant.technology = gameData.technologies.aetherplantupgrade;
    gameBuildings.fusionPlant.buildinginfo = gameData.buildings.fusionPlants;
    gameBuildings.fusionPlant.technology = gameData.technologies.fusionplantupgrade;
    gameBuildings.chronotonPlant.buildinginfo = gameData.buildings.chronotonPlants;
    gameBuildings.chronotonPlant.technology = gameData.technologies.chronotonplantupgrade;
    gameBuildings.mine.buildinginfo = gameData.buildings.mines;
    gameBuildings.lab.buildinginfo = gameData.buildings.labs;
    gameBuildings.factory.buildinginfo = gameData.buildings.factories;
    gameBuildings.refinery.buildinginfo = gameData.buildings.refineries;
    gameBuildings.mine.technology = gameData.technologies.metalProficiency;
    gameBuildings.lab.technology = gameData.technologies.researchProficiency;
    gameBuildings.factory.technology = gameData.technologies.polymerProficiency;
    gameBuildings.refinery.technology = gameData.technologies.aetherProficiency;
    gameBuildings.shieldLab.buildinginfo = gameData.buildings.shieldLabs;
    gameBuildings.shieldLab.tacticalChoices = gameData.tacticalChoices.shieldLabsSetting;
    gameBuildings.armorLab.buildinginfo = gameData.buildings.armorLabs;
    gameBuildings.armorLab.tacticalChoices = gameData.tacticalChoices.armorLabsSetting;
    gameBuildings.powerConverter.buildinginfo = gameData.buildings.powerConverters;
    gameBuildings.powerConverter.tacticalChoices = gameData.tacticalChoices.powerConvertersSetting;
    gamePerks.looter.perkData = findPerk('Looter');
    gamePerks.producer.perkData = findPerk('Producer');
    gamePerks.damager.perkData = findPerk('Damager');
    gamePerks.thickskin.perkData = findPerk('ThickSkin');
    gamePerks.speed.perkData = findPerk('Speed');
    gamePerks.consistency.perkData = findPerk('Consistency');
    gamePerks.power.perkData = findPerk('Power');
    gamePerks.criticality.perkData = findPerk('Criticality');
    gamePerks.condenser.perkData = findPerk('Condenser');
    gamePerks.streamline.perkData = findPerk('StreamLine');
    gamePerks.automap.perkData = findPerk('AutoMap');
    $('#nav-research').tab('show');
    $('#polymercontainer').addClass('hidden');
    $('#btnBuyFactory').addClass('hidden');
    $('#labscontainer').addClass('hidden');
    $('#btnBuyLab').addClass('hidden');
    $('#btnBuyShieldLab').addClass('hidden');
    $('#btnBuyArmorLab').addClass('hidden');
    $('#btnBuyPowerConverter').addClass('hidden');
    $('#btnBuyGenerator').addClass('hidden');
    $('#btnBuyPlant').addClass('hidden');
    $('#btnBuyRefinery').addClass('hidden');
    $('#btnBuyAetherPlant').addClass('hidden');
    $('#btnBuyFusionPlant').addClass('hidden');
    $('#btnBuyChronotonPlant').addClass('hidden');
    $('#btnBuy10Factory').addClass('hidden');
    $('#btnBuy10Lab').addClass('hidden');
    $('#btnBuy10ShieldLab').addClass('hidden');
    $('#btnBuy10ArmorLab').addClass('hidden');
    $('#btnBuy10PowerConverter').addClass('hidden');
    $('#btnBuy10Generator').addClass('hidden');
    $('#btnBuy10Plant').addClass('hidden');
    $('#btnBuy10Refinery').addClass('hidden');
    $('#btnBuy10AetherPlant').addClass('hidden');
    $('#btnBuy10FusionPlant').addClass('hidden');
    $('#btnBuy10ChronotonPlant').addClass('hidden');
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
    $('#btnRules').addClass('hidden');
    $('#upgrade-tab').addClass('hidden');
    $('#btnFight').addClass('hidden');
    $('#btnAutoFight').addClass('hidden');
    $('#btnAutoFightOn').addClass('hidden');
    $('#btnGateway').addClass('hidden');
    $('#btnSuicide').addClass('hidden');
    for (let index = 0; index < gameData.challenges.length; index++) {
        const element = gameData.challenges[index];
        element.hideOrShowButton();
    }
    $('#btnAutoFight').attr('title', 'Metal Cost:' + AUTOFIGHT_METAL_COST + '\nPolymer Cost:' + AUTOFIGHT_POLYMER_COST + '\nResarch Point Cost:' + AUTOFIGHT_RP_COST);
    $('#btnMetalTech').attr('title', 'Increases Metal production by 50%\nMetal Cost:' + prettify((METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought))) +
        '\nResearch Cost:' + prettify((METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought))));
    $('#btnPolymerTech').attr('title', 'Increases Polymer production by 50%\nPolymer Cost:' + prettify(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought)) +
        '\nResearch Cost:' + prettify(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought)));
    $('#btnResearchTech').attr('title', 'Increases Research production by 50%\nMetal Cost:' + prettify(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought)) +
        '\nPolymer Cost:' + prettify(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought)) +
        '\nResearch Cost:' + prettify(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought)));
    $('#btnAetherTech').attr('title', 'Increases Aether production by 50%\nMetal Cost:' + prettify(AETHER_PROFIECIENCY_METAL_COST * Math.pow(AETHER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought)) +
        '\nPolymer Cost:' + prettify(AETHER_PROFIECIENCY_POLYMER_COST * Math.pow(AETHER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought)) +
        '\nResearch Cost:' + prettify(AETHER_PROFIECIENCY_RP_COST * Math.pow(AETHER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought)));
    gameEquipment.railgun.updateUpgradeText();
    gameEquipment.railgun.updateUpgradeTooltip();
    gameEquipment.laser.updateUpgradeText();
    gameEquipment.laser.updateUpgradeTooltip();
    gameEquipment.missile.updateUpgradeText();
    gameEquipment.missile.updateUpgradeTooltip();
    gameEquipment.armor.updateUpgradeText();
    gameEquipment.armor.updateUpgradeTooltip();
    gameEquipment.shield.updateUpgradeText();
    gameEquipment.shield.updateUpgradeTooltip();
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
    gamePerks.condenser.updateBuyButtonText();
    gamePerks.condenser.updateBuyButtonTooltip();
    gamePerks.streamline.updateBuyButtonText();
    gamePerks.streamline.updateBuyButtonTooltip();
    gamePerks.automap.updateBuyButtonText();
    gamePerks.automap.updateBuyButtonTooltip();
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
    gameBuildings.chronotonPlant.updateBuyButtonText();
    gameBuildings.chronotonPlant.updateBuyButtonTooltip();
    gameBuildings.shieldLab.updateBuyButtonText();
    gameBuildings.shieldLab.updateBuyButtonTooltip();
    gameBuildings.armorLab.updateBuyButtonText();
    gameBuildings.armorLab.updateBuyButtonTooltip();
    gameBuildings.powerConverter.updateBuyButtonText();
    gameBuildings.powerConverter.updateBuyButtonTooltip();
    var ruleContainer = document.getElementById('rulescontainer');
    while (ruleContainer.firstChild) {
        ruleContainer.removeChild(ruleContainer.lastChild);
    }
    for (let index = 0; index < Math.floor(gameData.stats.maxGalaxy / 20); index++) {
        var formRow = document.createElement('div');
        ruleContainer.appendChild(formRow);
        formRow.classList.add('form-row');
        formRow.classList.add('align-items-center');
        var col1 = document.createElement('div');
        col1.classList.add('col-3');
        formRow.appendChild(col1);
        var formCheck = document.createElement('div');
        formCheck.classList.add('form-check');
        col1.appendChild(formCheck);
        var ruleactive = document.createElement('input');
        ruleactive.classList.add('form-check-input');
        ruleactive.type = 'checkbox';
        ruleactive.id = 'rule' + index + 'active';
        formCheck.appendChild(ruleactive);
        var ruleactivelabel = document.createElement('label');
        ruleactivelabel.classList.add('form-check-label');
        ruleactivelabel.innerHTML = 'Active';
        ruleactivelabel.htmlFor = ruleactive.id;
        formCheck.appendChild(ruleactivelabel);
        var col2 = document.createElement('div');
        col2.classList.add('col-3');
        formRow.appendChild(col2);
        var select = document.createElement('select');
        select.classList.add('cusrom-select');
        select.classList.add('mr-sm-2');
        select.id = 'rule' + index + 'what';
        col2.appendChild(select);
        var option0 = document.createElement('option');
        option0.selected = true;
        option0.innerHTML = 'Choose...';
        select.appendChild(option0);
        var option1 = document.createElement('option');
        option1.value = '1';
        option1.innerHTML = 'All';
        select.appendChild(option1);
        var option2 = document.createElement('option');
        option2.value = '2';
        option2.innerHTML = 'Buildings';
        select.appendChild(option2);
        var option3 = document.createElement('option');
        option3.value = '3';
        option3.innerHTML = 'Research';
        select.appendChild(option3);
        var option4 = document.createElement('option');
        option4.value = '4';
        option4.innerHTML = 'Equipment';
        select.appendChild(option4);
        var option5 = document.createElement('option');
        option5.value = '10';
        option5.innerHTML = 'Power';
        select.appendChild(option5);
        var option6 = document.createElement('option');
        option6.value = '11';
        option6.innerHTML = 'Resource Creation';
        select.appendChild(option6);
        var option7 = document.createElement('option');
        option7.value = '12';
        option7.innerHTML = 'Equipment Labs';
        select.appendChild(option7);
        var option8 = document.createElement('option');
        option8.value = '13';
        option8.innerHTML = 'Research No Shipyards';
        select.appendChild(option8);
        var col3 = document.createElement('div');
        col3.classList.add('col-6');
        col3.classList.add('form-inline');
        formRow.appendChild(col3);
        var costinput = document.createElement('input');
        costinput.type = 'number';
        costinput.classList.add('form-control');
        costinput.id = 'rule' + index + 'cost';
        costinput.placeholder = '10';
        var rulecostlabel = document.createElement('label');
        rulecostlabel.classList.add('m-2');
        rulecostlabel.htmlFor = costinput.id;
        rulecostlabel.innerHTML = 'Cost';
        col3.appendChild(rulecostlabel);
        col3.appendChild(costinput);
        if (typeof gameData.rules[index] !== 'undefined') {
            select.value = gameData.rules[index].action;
            costinput.value = gameData.rules[index].cost.toString(10);
            ruleactive.checked = gameData.rules[index].active;
        }
    }
    achievementlist = [];
    // eslint-disable-next-line max-statements-per-line
    achievementlist.push(new Achievement(0, '5 mines', 1, function () { return gameData.buildings.mines.count >= 5; }));
    achievementlist.push(new Achievement(1, '10 Mines', 2, function () { return gameData.buildings.mines.count >= 10; }));
    achievementlist.push(new Achievement(2, '25 Mines', 3, function () { return gameData.buildings.mines.count >= 25; }));
    achievementlist.push(new Achievement(3, '50 Mines', 4, function () { return gameData.buildings.mines.count >= 50; }));
    achievementlist.push(new Achievement(4, '100 Mines', 5, function () { return gameData.buildings.mines.count >= 100; }));
    achievementlist.push(new Achievement(5, '1000 Mines', 20, function () { return gameData.buildings.mines.count >= 1000; }));
    achievementlist.push(new Achievement(6, '1 Factory', 1, function () { return gameData.buildings.factories.count >= 1; }));
    achievementlist.push(new Achievement(7, '5 Factories', 1, function () { return gameData.buildings.factories.count >= 5; }));
    achievementlist.push(new Achievement(8, '10 Factories', 2, function () { return gameData.buildings.factories.count >= 10; }));
    achievementlist.push(new Achievement(9, '25 Factories', 3, function () { return gameData.buildings.factories.count >= 25; }));
    achievementlist.push(new Achievement(10, '50 Factories', 4, function () { return gameData.buildings.factories.count >= 50; }));
    achievementlist.push(new Achievement(11, '100 Factories', 5, function () { return gameData.buildings.factories.count >= 100; }));
    achievementlist.push(new Achievement(12, '1000 Factories', 20, function () { return gameData.buildings.factories.count >= 1000; }));
    achievementlist.push(new Achievement(13, '1 Refinery', 1, function () { return gameData.buildings.refineries.count >= 1; }));
    achievementlist.push(new Achievement(14, '5 Refineries', 1, function () { return gameData.buildings.refineries.count >= 5; }));
    achievementlist.push(new Achievement(15, '10 Refineries', 2, function () { return gameData.buildings.refineries.count >= 10; }));
    achievementlist.push(new Achievement(16, '25 Refineries', 3, function () { return gameData.buildings.refineries.count >= 25; }));
    achievementlist.push(new Achievement(17, '50 Refineries', 4, function () { return gameData.buildings.refineries.count >= 50; }));
    achievementlist.push(new Achievement(18, '100 Refineries', 5, function () { return gameData.buildings.refineries.count >= 100; }));
    achievementlist.push(new Achievement(19, '1000 Refineries', 20, function () { return gameData.buildings.refineries.count >= 1000; }));
    achievementlist.push(new Achievement(20, '1 Lab', 1, function () { return gameData.buildings.labs.count >= 1; }));
    achievementlist.push(new Achievement(21, '5 Labs', 1, function () { return gameData.buildings.labs.count >= 5; }));
    achievementlist.push(new Achievement(22, '10 Labs', 2, function () { return gameData.buildings.labs.count >= 10; }));
    achievementlist.push(new Achievement(23, '25 Labs', 3, function () { return gameData.buildings.labs.count >= 25; }));
    achievementlist.push(new Achievement(24, '50 Labs', 4, function () { return gameData.buildings.labs.count >= 50; }));
    achievementlist.push(new Achievement(25, '100 Labs', 5, function () { return gameData.buildings.labs.count >= 100; }));
    achievementlist.push(new Achievement(26, '1000 Labs', 20, function () { return gameData.buildings.labs.count >= 1000; }));
    achievementlist.push(new Achievement(27, '1 Shield Lab', 1, function () { return gameData.buildings.shieldLabs.count >= 1; }));
    achievementlist.push(new Achievement(28, '5 Shield Labs', 2, function () { return gameData.buildings.shieldLabs.count >= 5; }));
    achievementlist.push(new Achievement(29, '10 Shield Labs', 5, function () { return gameData.buildings.shieldLabs.count >= 10; }));
    achievementlist.push(new Achievement(30, '25 Shield Labs', 10, function () { return gameData.buildings.shieldLabs.count >= 25; }));
    achievementlist.push(new Achievement(31, '50 Shield Labs', 25, function () { return gameData.buildings.shieldLabs.count >= 50; }));
    achievementlist.push(new Achievement(32, '100 Shield Labs', 50, function () { return gameData.buildings.shieldLabs.count >= 100; }));
    achievementlist.push(new Achievement(33, '1000 Shield Labs', 100, function () { return gameData.buildings.shieldLabs.count >= 1000; }));
    achievementlist.push(new Achievement(34, '5 Panels', 1, function () { return gameData.buildings.panels.count >= 5; }));
    achievementlist.push(new Achievement(35, '10 Panels', 2, function () { return gameData.buildings.panels.count >= 10; }));
    achievementlist.push(new Achievement(36, '25 Panels', 3, function () { return gameData.buildings.panels.count >= 25; }));
    achievementlist.push(new Achievement(37, '50 Panels', 4, function () { return gameData.buildings.panels.count >= 50; }));
    achievementlist.push(new Achievement(38, '100 Panels', 5, function () { return gameData.buildings.panels.count >= 100; }));
    achievementlist.push(new Achievement(39, '1000 Panels', 20, function () { return gameData.buildings.panels.count >= 1000; }));
    achievementlist.push(new Achievement(40, '1 Plant', 1, function () { return gameData.buildings.plants.count >= 1; }));
    achievementlist.push(new Achievement(41, '5 Plants', 1, function () { return gameData.buildings.plants.count >= 5; }));
    achievementlist.push(new Achievement(42, '10 Plants', 2, function () { return gameData.buildings.plants.count >= 10; }));
    achievementlist.push(new Achievement(43, '25 Plants', 3, function () { return gameData.buildings.plants.count >= 25; }));
    achievementlist.push(new Achievement(44, '50 Plants', 4, function () { return gameData.buildings.plants.count >= 50; }));
    achievementlist.push(new Achievement(45, '100 Plants', 5, function () { return gameData.buildings.plants.count >= 100; }));
    achievementlist.push(new Achievement(46, '1000 Plants', 20, function () { return gameData.buildings.plants.count >= 1000; }));
    achievementlist.push(new Achievement(47, '1 Generator', 1, function () { return gameData.buildings.generators.count >= 1; }));
    achievementlist.push(new Achievement(48, '5 Generators', 1, function () { return gameData.buildings.generators.count >= 5; }));
    achievementlist.push(new Achievement(49, '10 Generators', 2, function () { return gameData.buildings.generators.count >= 10; }));
    achievementlist.push(new Achievement(50, '25 Generators', 3, function () { return gameData.buildings.generators.count >= 25; }));
    achievementlist.push(new Achievement(51, '50 Generators', 4, function () { return gameData.buildings.generators.count >= 50; }));
    achievementlist.push(new Achievement(52, '100 Generators', 5, function () { return gameData.buildings.generators.count >= 100; }));
    achievementlist.push(new Achievement(53, '1000 Generators', 20, function () { return gameData.buildings.generators.count >= 1000; }));
    achievementlist.push(new Achievement(54, '1 Aether Plant', 1, function () { return gameData.buildings.aetherPlants.count >= 1; }));
    achievementlist.push(new Achievement(55, '5 Aether Plants', 1, function () { return gameData.buildings.aetherPlants.count >= 5; }));
    achievementlist.push(new Achievement(56, '10 Aether Plants', 2, function () { return gameData.buildings.aetherPlants.count >= 10; }));
    achievementlist.push(new Achievement(57, '25 Aether Plants', 3, function () { return gameData.buildings.aetherPlants.count >= 25; }));
    achievementlist.push(new Achievement(58, '50 Aether Plants', 4, function () { return gameData.buildings.aetherPlants.count >= 50; }));
    achievementlist.push(new Achievement(59, '100 Aether Plants', 5, function () { return gameData.buildings.aetherPlants.count >= 100; }));
    achievementlist.push(new Achievement(60, '1000 Aether Plants', 20, function () { return gameData.buildings.aetherPlants.count >= 1000; }));
    achievementlist.push(new Achievement(61, '10 Damage Reached!', 1, function () { return gameData.playership.minLaserDamage + gameData.playership.minRailgunDamage + gameData.playership.minMissileDamage >= 10; }));
    achievementlist.push(new Achievement(62, '100 Damage Reached!', 1, function () { return gameData.playership.minLaserDamage + gameData.playership.minRailgunDamage + gameData.playership.minMissileDamage >= 100; }));
    achievementlist.push(new Achievement(63, '1000 Damage Reached!', 5, function () { return gameData.playership.minLaserDamage + gameData.playership.minRailgunDamage + gameData.playership.minMissileDamage >= 1000; }));
    achievementlist.push(new Achievement(64, '1000000 Damage Reached!', 20, function () { return gameData.playership.minLaserDamage + gameData.playership.minRailgunDamage + gameData.playership.minMissileDamage >= 1000000; }));
    achievementlist.push(new Achievement(65, 'Ship Size 2!', 1, function () { return gameData.playership.size >= 2; }));
    achievementlist.push(new Achievement(66, 'Ship Size 10!', 5, function () { return gameData.playership.size >= 10; }));
    achievementlist.push(new Achievement(67, 'Ship Size 100!', 20, function () { return gameData.playership.size >= 100; }));
    achievementlist.push(new Achievement(68, 'First Galaxy Completed!', 1, function () { return gameData.missions[0].level > 1; }));
    achievementlist.push(new Achievement(69, 'Second Galaxy Completed!', 2, function () { return gameData.missions[0].level > 2; }));
    achievementlist.push(new Achievement(70, 'Fifth Galaxy Completed!', 5, function () { return gameData.missions[0].level > 5; }));
    achievementlist.push(new Achievement(71, 'Tenth Galaxy Completed!', 10, function () { return gameData.missions[0].level > 10; }));
    achievementlist.push(new Achievement(72, 'Twentieth Galaxy Completed!', 20, function () { return gameData.missions[0].level > 20; }));
    achievementlist.push(new Achievement(73, 'Fortieth Galaxy Completed!', 40, function () { return gameData.missions[0].level > 40; }));
    achievementlist.push(new Achievement(74, '1 Fusion Plant', 1, function () { return gameData.buildings.fusionPlants.count >= 1; }));
    achievementlist.push(new Achievement(75, '5 Fusion Plants', 1, function () { return gameData.buildings.fusionPlants.count >= 5; }));
    achievementlist.push(new Achievement(76, '10 Fusion Plants', 2, function () { return gameData.buildings.fusionPlants.count >= 10; }));
    achievementlist.push(new Achievement(77, '25 Fusion Plants', 3, function () { return gameData.buildings.fusionPlants.count >= 25; }));
    achievementlist.push(new Achievement(78, '50 Fusion Plants', 4, function () { return gameData.buildings.fusionPlants.count >= 50; }));
    achievementlist.push(new Achievement(79, '100 Fusion Plants', 5, function () { return gameData.buildings.fusionPlants.count >= 100; }));
    achievementlist.push(new Achievement(80, '1000 Fusion Plants', 20, function () { return gameData.buildings.fusionPlants.count >= 1000; }));
    achievementlist.push(new Achievement(81, '1 Armor Lab', 1, function () { return gameData.buildings.armorLabs.count >= 1; }));
    achievementlist.push(new Achievement(82, '5 Armor Labs', 2, function () { return gameData.buildings.armorLabs.count >= 5; }));
    achievementlist.push(new Achievement(83, '10 Armor Labs', 5, function () { return gameData.buildings.armorLabs.count >= 10; }));
    achievementlist.push(new Achievement(84, '25 Armor Labs', 10, function () { return gameData.buildings.armorLabs.count >= 25; }));
    achievementlist.push(new Achievement(85, '50 Armor Labs', 25, function () { return gameData.buildings.armorLabs.count >= 50; }));
    achievementlist.push(new Achievement(86, '100 Armor Labs', 50, function () { return gameData.buildings.armorLabs.count >= 100; }));
    achievementlist.push(new Achievement(87, '1000 Armor Labs', 100, function () { return gameData.buildings.armorLabs.count >= 1000; }));
    achievementlist.push(new Achievement(95, '1 Chronoton Plant', 1, function () { return gameData.buildings.chronotonPlants.count >= 1; }));
    achievementlist.push(new Achievement(96, '5 Chronoton Plants', 1, function () { return gameData.buildings.chronotonPlants.count >= 5; }));
    achievementlist.push(new Achievement(97, '10 Chronoton Plants', 2, function () { return gameData.buildings.chronotonPlants.count >= 10; }));
    achievementlist.push(new Achievement(98, '25 Chronoton Plants', 3, function () { return gameData.buildings.chronotonPlants.count >= 25; }));
    achievementlist.push(new Achievement(99, '50 Chronoton Plants', 4, function () { return gameData.buildings.chronotonPlants.count >= 50; }));
    achievementlist.push(new Achievement(100, '100 Chronoton Plants', 5, function () { return gameData.buildings.chronotonPlants.count >= 100; }));
    achievementlist.push(new Achievement(101, '1000 Chronoton Plants', 20, function () { return gameData.buildings.chronotonPlants.count >= 1000; }));
    achievementlist.push(new Achievement(102, '1 Gateway Completed', 10, function () { return gameData.stats.gatewaysUsed >= 1; }));
    achievementlist.push(new Achievement(103, '5 Gateways Completed', 20, function () { return gameData.stats.gatewaysUsed >= 5; }));
    achievementlist.push(new Achievement(104, '10 Gateways Completed', 30, function () { return gameData.stats.gatewaysUsed >= 10; }));
    achievementlist.push(new Achievement(105, '25 Gateways Completed', 50, function () { return gameData.stats.gatewaysUsed >= 25; }));
    achievementlist.push(new Achievement(106, '100 Gateways Completed', 100, function () { return gameData.stats.gatewaysUsed >= 100; }));
    achievementlist.push(new Achievement(107, '1000 Gateways Completed', 250, function () { return gameData.stats.gatewaysUsed >= 1000; }));
    achievementlist.push(new Achievement(108, '10000 Gateways Completed', 1000, function () { return gameData.stats.gatewaysUsed >= 10000; }));
    achievementlist.push(new Achievement(109, '50 Galaxies Completed', 10, function () { return gameData.stats.galaxiesCleared >= 50; }));
    achievementlist.push(new Achievement(110, '100 Galaxies Completed', 20, function () { return gameData.stats.galaxiesCleared >= 100; }));
    achievementlist.push(new Achievement(111, '200 Galaxies Completed', 40, function () { return gameData.stats.galaxiesCleared >= 200; }));
    achievementlist.push(new Achievement(112, '400 Galaxies Completed', 80, function () { return gameData.stats.galaxiesCleared >= 400; }));
    achievementlist.push(new Achievement(113, '800 Galaxies Completed', 160, function () { return gameData.stats.galaxiesCleared >= 800; }));
    achievementlist.push(new Achievement(114, '1600 Galaxies Completed', 320, function () { return gameData.stats.galaxiesCleared >= 1600; }));
    achievementlist.push(new Achievement(115, '3200 Galaxies Completed', 640, function () { return gameData.stats.galaxiesCleared >= 3200; }));
    achievementlist.push(new Achievement(116, '50 Missions Completed', 10, function () { return gameData.stats.missionsCleared >= 50; }));
    achievementlist.push(new Achievement(117, '100 Missions Completed', 20, function () { return gameData.stats.missionsCleared >= 100; }));
    achievementlist.push(new Achievement(118, '200 Missions Completed', 40, function () { return gameData.stats.missionsCleared >= 200; }));
    achievementlist.push(new Achievement(119, '400 Missions Completed', 80, function () { return gameData.stats.missionsCleared >= 400; }));
    achievementlist.push(new Achievement(120, '800 Missions Completed', 160, function () { return gameData.stats.missionsCleared >= 800; }));
    achievementlist.push(new Achievement(121, '1600 Missions Completed', 320, function () { return gameData.stats.missionsCleared >= 1600; }));
    achievementlist.push(new Achievement(122, '3200 Missions Completed', 640, function () { return gameData.stats.missionsCleared >= 3200; }));
    achievementlist.push(new Achievement(123, '100 Chronoton Collected', 10, function () { return gameData.resources.chronoton >= 100; }));
    achievementlist.push(new Achievement(124, '1000 Chronoton Collected', 20, function () { return gameData.resources.chronoton >= 1000; }));
    achievementlist.push(new Achievement(125, '10000 Chronoton Collected', 40, function () { return gameData.resources.chronoton >= 10000; }));
    achievementlist.push(new Achievement(126, '100000 Chronoton Collected', 80, function () { return gameData.resources.chronoton >= 100000; }));
    achievementlist.push(new Achievement(127, '1000000 Chronoton Collected', 160, function () { return gameData.resources.chronoton >= 1000000; }));
    achievementlist.push(new Achievement(128, '10000000 Chronoton Collected', 320, function () { return gameData.resources.chronoton >= 100000000; }));
    achievementlist.push(new Achievement(129, '100000000 Chronoton Collected', 640, function () { return gameData.resources.chronoton >= 100000000; }));
    achievementlist.push(new Achievement(130, '1 Power Converter', 1, function () { return gameData.buildings.powerConverters.count >= 1; }));
    achievementlist.push(new Achievement(131, '5 Power Converters', 2, function () { return gameData.buildings.powerConverters.count >= 5; }));
    achievementlist.push(new Achievement(132, '10 Power Converters', 5, function () { return gameData.buildings.powerConverters.count >= 10; }));
    achievementlist.push(new Achievement(133, '25 Power Converters', 10, function () { return gameData.buildings.powerConverters.count >= 25; }));
    achievementlist.push(new Achievement(134, '50 Power Converters', 25, function () { return gameData.buildings.powerConverters.count >= 50; }));
    achievementlist.push(new Achievement(135, '100 Power Converters', 50, function () { return gameData.buildings.powerConverters.count >= 100; }));
    achievementlist.push(new Achievement(136, '1000 Power Converters', 100, function () { return gameData.buildings.powerConverters.count >= 1000; }));
    $('#btnConfirmGateway').attr('title', 'Standard Run');
    for (let index = 0; index < gameData.challenges.length; index++) {
        const element = gameData.challenges[index];
        element.updateToolTip();
    }
    updateAchievementBonus();
    updateAchievementScreen();
    if (gameData.missions.length < 1) {
        var newMission = new Mission('Galaxy 1', true, 1, 1, 1, 100, true);
        gameData.missions.unshift(newMission);
    }
    gameData.enemyship = gameData.missions[0].enemies[gameData.missions[0].zone];
    initted = true;
    updateMissionButtons();
    gameData.world.paused = false;
}
function saveRules() {
    gameData.rules = [];
    for (let index = 0; index < Math.floor(gameData.stats.maxGalaxy / 20); index++) {
        var newRule = new automationRule(index);
        var what = 'rule' + index + 'what';
        var cost = 'rule' + index + 'cost';
        var active = 'rule' + index + 'active';
        if (typeof document.getElementById(what) !== 'undefined') {
            newRule.action = document.getElementById(what).value;
            newRule.cost = Number(document.getElementById(cost).value);
            newRule.active = Boolean(document.getElementById(active).checked);
        }
        gameData.rules.push(newRule);
    }
}
function runRules() {
    var doresearch = false;
    var doequipment = false;
    var dopower = false;
    var doresource = false;
    var doequipmentlabs = false;
    var doshipyard = false;
    var equipmentcost = 1000;
    var powercost = 1000;
    var resourcecost = 1000;
    var equimentlabscost = 1000;
    if (typeof gameData.rules === 'undefined') {
        return;
    }
    for (let index = 0; index < gameData.rules.length; index++) {
        const element = gameData.rules[index];
        if (element.active) {
            if (element.action === '1' || element.action === '2') {
                powercost = Math.min(powercost, element.cost);
                resourcecost = Math.min(resourcecost, element.cost);
                equimentlabscost = Math.min(equimentlabscost, element.cost);
                dopower = true;
                doresource = true;
                doequipmentlabs = true;
            }
            if (element.action === '1' || element.action === '3') {
                doresearch = true;
                doshipyard = true;
            }
            if (element.action === '13') {
                doresearch = true;
            }
            if (element.action === '1' || element.action === '4') {
                equipmentcost = Math.min(equipmentcost, element.cost);
                doequipment = true;
            }
            if (element.action === '10') {
                powercost = element.cost;
                dopower = true;
            }
            if (element.action === '11') {
                resourcecost = element.cost;
                doresource = true;
            }
            if (element.action === '12') {
                equimentlabscost = element.cost;
                doequipmentlabs = true;
            }
        }
    }
    if (dopower) {
        if (gameBuildings.panel.canAffordBuy(powercost)) {
            gameBuildings.panel.buy(1);
        }
        if (gameBuildings.generator.canAffordBuy(powercost)) {
            gameBuildings.generator.buy(1);
        }
        if (gameBuildings.plant.canAffordBuy(powercost)) {
            gameBuildings.plant.buy(1);
        }
        if (gameBuildings.aetherPlant.canAffordBuy(powercost)) {
            gameBuildings.aetherPlant.buy(1);
        }
        if (gameBuildings.fusionPlant.canAffordBuy(powercost)) {
            gameBuildings.fusionPlant.buy(1);
        }
    }
    if (doresource) {
        if (gameBuildings.mine.canAffordBuy(resourcecost)) {
            gameBuildings.mine.buy(1);
        }
        if (gameBuildings.factory.canAffordBuy(resourcecost)) {
            gameBuildings.factory.buy(1);
        }
        if (gameBuildings.lab.canAffordBuy(resourcecost)) {
            gameBuildings.lab.buy(1);
        }
        if (gameBuildings.refinery.canAffordBuy(resourcecost)) {
            gameBuildings.refinery.buy(1);
        }
    }
    if (doequipmentlabs) {
        if (gameBuildings.armorLab.canAffordBuy(equimentlabscost)) {
            gameBuildings.armorLab.buy(1);
        }
        if (gameBuildings.shieldLab.canAffordBuy(equimentlabscost)) {
            gameBuildings.shieldLab.buy(1);
        }
        if (gameBuildings.powerConverter.canAffordBuy(equimentlabscost)) {
            gameBuildings.powerConverter.buy(1);
        }
    }
    if (doshipyard) {
        gameBuildings.shipyard.buy();
    }
    if (doresearch) {
        buyResearchProficiency();
        buyMetalProficiency();
        buyPolymerProficiency();
        buyAetherProficiency();
        if ((gameData.technologies.autofightBought === 0 && gameData.technologies.autofightUnlock > 0)) {
            buyAutoFight();
        }
    }
    if (doequipment) {
        if (gameEquipment.railgun.technology.prestigeUnlocked > gameEquipment.railgun.technology.prestigeBought) {
            gameEquipment.railgun.buyPrestige();
        }
        if (gameEquipment.armor.technology.prestigeUnlocked > gameEquipment.armor.technology.prestigeBought) {
            gameEquipment.armor.buyPrestige();
        }
        if (gameEquipment.laser.technology.prestigeUnlocked > gameEquipment.laser.technology.prestigeBought) {
            gameEquipment.laser.buyPrestige();
        }
        if (gameEquipment.shield.technology.prestigeUnlocked > gameEquipment.shield.technology.prestigeBought) {
            gameEquipment.shield.buyPrestige();
        }
        if (gameEquipment.missile.technology.prestigeUnlocked > gameEquipment.missile.technology.prestigeBought) {
            gameEquipment.missile.buyPrestige();
        }
    }
    if (doequipment) {
        if (gameEquipment.railgun.canAffordUpgrade(equipmentcost) && gameEquipment.railgun.technology.prestigeBought > 0) {
            gameEquipment.railgun.buyUpgrade(1);
        }
        if (gameEquipment.armor.canAffordUpgrade(equipmentcost) && gameEquipment.armor.technology.prestigeBought > 0) {
            gameEquipment.armor.buyUpgrade(1);
        }
        if (gameEquipment.laser.canAffordUpgrade(equipmentcost) && gameEquipment.laser.technology.prestigeBought > 0) {
            gameEquipment.laser.buyUpgrade(1);
        }
        if (gameEquipment.shield.canAffordUpgrade(equipmentcost) && gameEquipment.shield.technology.prestigeBought > 0) {
            gameEquipment.shield.buyUpgrade(1);
        }
        if (gameEquipment.missile.canAffordUpgrade(equipmentcost) && gameEquipment.missile.technology.prestigeBought > 0) {
            gameEquipment.missile.buyUpgrade(1);
        }
    }
}
function updateAchievementBonus() {
    var rtn = 100;
    for (let index = 0; index < achievementlist.length; index++) {
        const element = achievementlist[index];
        if (gameData.achievementids.includes(element.id)) {
            rtn += element.bonus;
        }
    }
    achievementMultiplier = rtn / 100;
}
function checkForCompletedAchievements() {
    for (let index = 0; index < achievementlist.length; index++) {
        const element = achievementlist[index];
        if (element.check() && !gameData.achievementids.includes(element.id)) {
            gameData.achievementids.push(element.id);
            addToDisplay('Achievement completed - ' + element.name, 'story');
            updateAchievementScreen();
            updateAchievementBonus();
        }
    }
}
function giveReward() {
    if (gameData.enemyship.lootType === 'Metal') {
        gameData.resources.metal += gameData.enemyship.lootAmount;
        addToDisplay('We were able to salvage ' + prettify(gameData.enemyship.lootAmount) + ' metal', 'loot');
    }
    else if (gameData.enemyship.lootType === 'Polymer') {
        gameData.resources.polymer += gameData.enemyship.lootAmount;
        addToDisplay('We were able to salvage ' + prettify(gameData.enemyship.lootAmount) + ' polymer', 'loot');
    }
    else if (gameData.enemyship.lootType === 'Aether') {
        gameData.resources.aether += gameData.enemyship.lootAmount;
        addToDisplay('We were able to salvage ' + prettify(gameData.enemyship.lootAmount) + ' aether', 'loot');
    }
    else if (gameData.enemyship.lootType === 'ResearchPoints') {
        gameData.resources.researchPoints += gameData.enemyship.lootAmount;
        addToDisplay('We were able to salvage ' + prettify(gameData.enemyship.lootAmount) + ' research points', 'loot');
    }
}
function giveMissionReward(mission) {
    if (mission.name === 'Railgun Plans') {
        gameData.technologies.railgun.prestigeUnlocked++;
        gameEquipment.railgun.updateUpgradeText();
        gameEquipment.railgun.updatePrestigeText();
        gameEquipment.railgun.updateUpgradeTooltip();
        gameEquipment.railgun.updatePrestigeTooltip();
        addToDisplay('I have discovered plans that will allow me to infuse railguns with aether!', 'mission');
    }
    else if (mission.name === 'Laser Plans') {
        gameData.technologies.laser.prestigeUnlocked++;
        gameEquipment.laser.updateUpgradeText();
        gameEquipment.laser.updatePrestigeText();
        gameEquipment.laser.updateUpgradeTooltip();
        gameEquipment.laser.updatePrestigeTooltip();
        addToDisplay('I have discovered plans that will allow me to infuse lasers with aether!', 'mission');
    }
    else if (mission.name === 'Missile Plans') {
        gameData.technologies.missile.prestigeUnlocked++;
        gameEquipment.missile.updateUpgradeText();
        gameEquipment.missile.updatePrestigeText();
        gameEquipment.missile.updateUpgradeTooltip();
        gameEquipment.missile.updatePrestigeTooltip();
        addToDisplay('Missiles can be even more missiley!', 'mission');
    }
    else if (mission.name === 'Armor Plans') {
        gameData.technologies.armor.prestigeUnlocked++;
        gameEquipment.armor.updateUpgradeText();
        gameEquipment.armor.updatePrestigeText();
        gameEquipment.armor.updateUpgradeTooltip();
        gameEquipment.armor.updatePrestigeTooltip();
        addToDisplay('Aether will really help out our Armor!', 'mission');
    }
    else if (mission.name === 'Shield Plans') {
        gameData.technologies.shield.prestigeUnlocked++;
        gameEquipment.shield.updateUpgradeText();
        gameEquipment.shield.updatePrestigeText();
        gameEquipment.shield.updateUpgradeTooltip();
        gameEquipment.shield.updatePrestigeTooltip();
        addToDisplay('Shields.  Now with even more shieldiness!', 'mission');
    }
    else if (mission.name === 'A Gold Mine') {
        gameData.technologies.goldMine++;
        addToDisplay('With the new algorithms gained at the Gold Mine I have doubled all forms of production!', 'story');
    }
    else if (mission.name === 'Panel Improvement') {
        gameData.technologies.panelUpgrade.count++;
        addToDisplay('I have more power now.  Panels are twice as effective.', 'story');
        gameBuildings.panel.updateBuyButtonTooltip();
    }
    else if (mission.name === 'Generator Improvement') {
        gameData.technologies.generatorUpgrade.count++;
        addToDisplay('I have more power now.  Generators are twice as effective.', 'story');
        gameBuildings.generator.updateBuyButtonTooltip();
    }
    else if (mission.name === 'Plant Improvement') {
        gameData.technologies.plantupgrade.count++;
        addToDisplay('I have more power now.  Plants are twice as effective.', 'story');
        gameBuildings.plant.updateBuyButtonTooltip();
    }
    else if (mission.name === 'Aether Plant Improvement') {
        gameData.technologies.aetherplantupgrade.count++;
        addToDisplay('I have more power now.  Aether Plants are twice as effective.', 'story');
        gameBuildings.aetherPlant.updateBuyButtonTooltip();
    }
    else if (mission.name === 'Chronoton Plant Improvement') {
        gameData.technologies.chronotonplantupgrade.count++;
        addToDisplay('I have more power now.  Chronoton Plants are twice as effective.', 'story');
        gameBuildings.aetherPlant.updateBuyButtonTooltip();
    }
    else if (mission.name === 'Choose Fast Armor Labs') {
        gameData.tacticalChoices.armorLabsSetting.count = 1;
        addToDisplay('Our Armor Labs will gain influence linearly', 'story');
        gameBuildings.armorLab.updateBuyButtonTooltip();
        gameBuildings.armorLab.updateBuyButtonText();
    }
    else if (mission.name === 'Choose Slow Armor Labs') {
        gameData.tacticalChoices.armorLabsSetting.count = 2;
        addToDisplay('Our Armor Labs will gain influence exponentially', 'story');
        gameBuildings.armorLab.updateBuyButtonTooltip();
        gameBuildings.armorLab.updateBuyButtonText();
    }
    else if (mission.name === 'Choose Fast Shield Labs') {
        gameData.tacticalChoices.shieldLabsSetting.count = 1;
        addToDisplay('Our Shield Labs will gain influence linearly', 'story');
        gameBuildings.shieldLab.updateBuyButtonTooltip();
        gameBuildings.shieldLab.updateBuyButtonText();
    }
    else if (mission.name === 'Choose Slow Shield Labs') {
        gameData.tacticalChoices.shieldLabsSetting.count = 2;
        addToDisplay('Our Shield Labs will gain influence exponentially', 'story');
        gameBuildings.shieldLab.updateBuyButtonTooltip();
        gameBuildings.shieldLab.updateBuyButtonText();
    }
    else if (mission.name === 'Choose Resource Power Conversion') {
        gameData.tacticalChoices.powerConvertersSetting.count = 1;
        addToDisplay('Our Power Converters will create resources', 'story');
        gameBuildings.powerConverter.updateBuyButtonTooltip();
        gameBuildings.powerConverter.updateBuyButtonText();
    }
    else if (mission.name === 'The Gateway') {
        gameData.story.gatewayUnlocked = true;
        addToDisplay('This location contains a large, prestigious, circular structure.  I can easily travel there and step through it, but what will I find?  I have also discovered some chronoton fragments.  I don\'t see a use for them but they may come in handy later', 'story');
        giveChronotonFragments(40);
    }
    else if (mission.name.startsWith('Aether')) {
        var lt = Math.pow(100, 1 + (mission.level / 10)) * gamePerks.looter.getBonus();
        gameData.resources.aether += lt;
        addToDisplay('We have found ' + prettify(lt) + ' aether', 'loot');
    }
}
function removeGroupofMissions(valtocheck) {
    gameData.missions = gameData.missions.filter(function (obj) {
        return !obj.name.includes(valtocheck);
    });
}
function changeLocation(mission) {
    locationToChangeTo = mission;
}
function updateGUI() {
    if (!initted || gameData.world.paused) {
        return; // still waiting on pageload
    }
    updatePower();
    var sceninfo = 'You are continung the chase.';
    var cha = findChallenge(gameData.world.currentChallenge);
    if (cha !== null) {
        sceninfo = cha.description;
    }
    document.getElementById('scenarioinfo').innerHTML = sceninfo;
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
    document.getElementById('power').innerHTML = 'Power: ' + prettify(gameData.resources.power);
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
        }
        else {
            $('#PlayerShields').addClass('hidden');
        }
        width = 0;
        if (gameData.enemyship.shieldMax > 0) {
            width = 100 * gameData.enemyship.shield / gameData.enemyship.shieldMax;
            $('#EnemyShields').removeClass('hidden');
            $('#EnemyHullShieldBar').css('width', prettify(width) + '%');
            $('#EnemyShieldText').text('Shield:' + prettify(gameData.enemyship.shield) + '/' + prettify(gameData.enemyship.shieldMax));
        }
        else {
            $('#EnemyShields').addClass('hidden');
        }
        document.getElementById('enemyDamage').innerHTML = 'Railgun: ' + prettify(gameData.enemyship.minRailgunDamage) + '-' + prettify(gameData.enemyship.maxRailgunDamage) + ' Laser: ' + prettify(gameData.enemyship.minLaserDamage) + '-' + prettify(gameData.enemyship.maxLaserDamage) + ' Missile: ' + prettify(gameData.enemyship.minMissileDamage) + '-' + prettify(gameData.enemyship.maxMissileDamage);
        document.getElementById('shipSize').innerHTML = prettify(gameData.playership.size);
        document.getElementById('shipName').innerHTML = gameData.playership.name;
        document.getElementById('shipDamage').innerHTML = 'Railgun: ' + prettify(gameData.playership.minRailgunDamage) + '-' + prettify(gameData.playership.maxRailgunDamage) + ' Laser: ' + prettify(gameData.playership.minLaserDamage) + '-' + prettify(gameData.playership.maxLaserDamage) + ' Missile: ' + prettify(gameData.playership.minMissileDamage) + '-' + prettify(gameData.playership.maxMissileDamage);
        document.getElementById('zonemax').innerHTML = prettify(gameData.missions[gameData.world.currentMission].enemies.length);
    }
    document.getElementById('MissionName').innerHTML = gameData.missions[gameData.world.currentMission].name;
    document.getElementById('zone').innerHTML = prettify(gameData.missions[gameData.world.currentMission].zone + 1);
    if (!gameData.story.initial) {
        addToDisplay('I slowly become aware of my surroundings.  There is little left untouched by destruction and weapon fire.  I can sense no one else.  All the communications frequencies are devoid of any signal.  One of the mines is still online and a single solar panel field is operational.  I need answers.  And to find them I\'ll need materials.  I should bring more mines online.', 'story');
        gameData.story.initial = true;
    }
    if (gameData.buildings.mines.count >= 5) {
        $('#polymercontainer').removeClass('hidden');
        gameBuildings.factory.showBuyButton();
        if (!gameData.story.factoryunlocked) {
            addToDisplay('I should be able to start bringing factories online.  The polymers will get us closer to creating drones.  I need answers. Why did they attack? Am I really alone?', 'story');
            gameData.story.factoryunlocked = true;
        }
    }
    if (gameData.buildings.factories.count >= 5) {
        $('#researchcontainer').removeClass('hidden');
        $('#projectcontainer').removeClass('hidden');
        gameBuildings.lab.showBuyButton();
        if (!gameData.story.labunlocked) {
            addToDisplay('Labs are available.  They should help to rediscover some technologies.  How did they manage to pull off an attack of that scale secretly?', 'story');
            gameData.story.labunlocked = true;
        }
    }
    if (gameData.missions[0].level >= 3) {
        gameBuildings.generator.showBuyButton();
        if (!gameData.story.generatorunlocked) {
            addToDisplay('Placeholder', 'story');
            gameData.story.generatorunlocked = true;
        }
    }
    if (gameData.missions[0].level >= 6) {
        gameBuildings.plant.showBuyButton();
        if (!gameData.story.plantunlocked) {
            addToDisplay('Placeholder', 'story');
            gameData.story.plantunlocked = true;
        }
    }
    if (gameData.missions[0].level >= 10) {
        gameBuildings.aetherPlant.showBuyButton();
        if (!gameData.story.aetherplantunlocked) {
            addToDisplay('Placeholder', 'story');
            gameData.story.aetherplantunlocked = true;
        }
    }
    if (gameData.missions[0].level >= 25) {
        gameBuildings.fusionPlant.showBuyButton();
        if (!gameData.story.fusionplantunlocked) {
            addToDisplay('Placeholder', 'story');
            gameData.story.fusionplantunlocked = true;
        }
    }
    if (gameData.missions[0].level >= 30) {
        gameBuildings.chronotonPlant.showBuyButton();
        if (!gameData.story.chronotonplantunlocked) {
            addToDisplay('Placeholder', 'story');
            gameData.story.chronotonplantunlocked = true;
        }
    }
    if (gameData.missions[0].level >= 15) {
        gameBuildings.refinery.showBuyButton();
        if (!gameData.story.refineryunlocked) {
            addToDisplay('Placeholder', 'story');
            gameData.story.refineryunlocked = true;
        }
    }
    if (gameData.tacticalChoices.armorLabsSetting.count > 0) {
        $('#btnBuyArmorLab').removeClass('hidden');
        $('#btnBuy10ArmorLab').removeClass('hidden');
        gameBuildings.armorLab.unlocked = true;
    }
    if (gameData.tacticalChoices.shieldLabsSetting.count > 0) {
        $('#btnBuyShieldLab').removeClass('hidden');
        $('#btnBuy10ShieldLab').removeClass('hidden');
        gameBuildings.shieldLab.unlocked = true;
    }
    if (gameData.tacticalChoices.powerConvertersSetting.count > 0) {
        $('#btnBuyPowerConverter').removeClass('hidden');
        $('#btnBuy10PowerConverter').removeClass('hidden');
        gameBuildings.powerConverter.unlocked = true;
    }
    if (gameData.missions[0].level > 1) {
        $('#btnResetAbilities').addClass('hidden');
    }
    else {
        $('#btnResetAbilities').removeClass('hidden');
    }
    if (gameData.story.gatewayUnlocked || gameData.resources.chronotonfragments > 100) {
        $('#btnGateway').removeClass('hidden');
    }
    if (gameData.buildings.labs.count >= 2) {
        $('#equipmentContainer').removeClass('hidden');
        if (!gameData.story.shipyardUnlocked) {
            addToDisplay('Drones!  A shipyard will allow me to send out drones and begin the quest for information.  I can sense a path of ships, almost like a breadcrumb trail.  They aren\'t responding to our attempts at communication.', 'story');
            gameData.story.shipyardUnlocked = true;
        }
    }
    if (gameData.resources.metal >= 500) {
        $('#upgradevisible').removeClass('hidden');
    }
    if (gameData.resources.chronotonfragments > 0) {
        $('#chronotoncontainer').removeClass('hidden');
    }
    if (gameData.resources.chronoton > 0) {
        $('#chronotoncontainer').removeClass('hidden');
        $('#btnAbilities').removeClass('hidden');
        $('#fightcontrols').removeClass('hidden');
    }
    else {
        $('#chronotoncontainer').addClass('hidden');
        $('#btnAbilities').addClass('hidden');
    }
    if (gameData.resources.aether > 0) {
        $('#aethercontainer').removeClass('hidden');
    }
    if (gameData.resources.metal >= 1000) {
        $('#upgrade-tab').removeClass('hidden');
    }
    if (gameData.missions[0].level >= 4) {
        $('#missions-tab').removeClass('hidden');
        $('#missionvisible').removeClass('hidden');
    }
    if (gameData.buildings.shipyard.count >= 1) {
        $('#fightcontrols').removeClass('hidden');
        $('#fightdisplay').removeClass('hidden');
        $('#btnFight').removeClass('hidden');
        $('#btnSuicide').removeClass('hidden');
        // $('#fightcontainer').removeClass('hidden');
    }
    if ((gameData.technologies.autofightBought === 1)) {
        $('#btnAutoFightOn').removeClass('hidden');
        if (gameData.technologies.autofightOn === 1) {
            $('#btnAutoFightOn').text('Turn AutoDeploy Off');
        }
        else {
            $('#btnAutoFightOn').text('Turn AutoDeploy On');
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
    if (gameData.technologies.metalProficiency.unlocked > gameData.technologies.metalProficiency.bought) {
        $('#btnMetalTech').removeClass('hidden');
        $('#btnMetalTech').text('Upgrade Metal ' + (gameData.technologies.metalProficiency.bought + 1));
        if (canAffordMetalProfieciency()) {
            $('#btnMetalTech').removeClass('btn-danger').addClass('btn-success');
        }
    }
    $('#btnPolymerTech').removeClass('btn-success').addClass('btn-danger');
    $('#btnPolymerTech').addClass('hidden');
    if (gameData.technologies.polymerProficiency.unlocked > gameData.technologies.polymerProficiency.bought) {
        $('#btnPolymerTech').removeClass('hidden');
        $('#btnPolymerTech').text('Upgrade Polymer ' + (gameData.technologies.polymerProficiency.bought + 1));
        if (canAffordPolymerProfieciency()) {
            $('#btnPolymerTech').removeClass('btn-danger').addClass('btn-success');
        }
    }
    $('#btnResearchTech').removeClass('btn-success').addClass('btn-danger');
    $('#btnResearchTech').addClass('hidden');
    if (gameData.technologies.researchProficiency.unlocked > gameData.technologies.researchProficiency.bought) {
        $('#btnResearchTech').removeClass('hidden');
        $('#btnResearchTech').text('Upgrade Research ' + (gameData.technologies.researchProficiency.bought + 1));
        if (canAffordResearchProfieciency()) {
            $('#btnResearchTech').removeClass('btn-danger').addClass('btn-success');
        }
    }
    $('#btnAetherTech').removeClass('btn-success').addClass('btn-danger');
    $('#btnAetherTech').addClass('hidden');
    if (gameData.technologies.aetherProficiency.unlocked > gameData.technologies.aetherProficiency.bought) {
        $('#btnAetherTech').removeClass('hidden');
        $('#btnAetherTech').text('Upgrade Aether ' + (gameData.technologies.aetherProficiency.bought + 1));
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
    gameBuildings.chronotonPlant.determineShowAffordBuy();
    gameBuildings.factory.determineShowAffordBuy();
    gameBuildings.refinery.determineShowAffordBuy();
    gameBuildings.lab.determineShowAffordBuy();
    gameBuildings.shieldLab.determineShowAffordBuy();
    gameBuildings.armorLab.determineShowAffordBuy();
    gameBuildings.powerConverter.determineShowAffordBuy();
    gameBuildings.powerConverter.updateBuyButtonText();
    gameBuildings.powerConverter.updateBuyButtonTooltip();
    gameEquipment.railgun.determineShowUpgradeButton();
    gameEquipment.railgun.determineShowAffordUpgrade();
    gameEquipment.railgun.determineShowPrestigeButton();
    gameEquipment.railgun.determineShowAffordPrestige();
    gameEquipment.laser.determineShowUpgradeButton();
    gameEquipment.laser.determineShowAffordUpgrade();
    gameEquipment.laser.determineShowPrestigeButton();
    gameEquipment.laser.determineShowAffordPrestige();
    gameEquipment.missile.determineShowUpgradeButton();
    gameEquipment.missile.determineShowAffordUpgrade();
    gameEquipment.missile.determineShowPrestigeButton();
    gameEquipment.missile.determineShowAffordPrestige();
    gameEquipment.armor.determineShowUpgradeButton();
    gameEquipment.armor.determineShowAffordUpgrade();
    gameEquipment.armor.determineShowPrestigeButton();
    gameEquipment.armor.determineShowAffordPrestige();
    gameEquipment.shield.determineShowUpgradeButton();
    gameEquipment.shield.determineShowAffordUpgrade();
    gameEquipment.shield.determineShowPrestigeButton();
    gameEquipment.shield.determineShowAffordPrestige();
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
    gamePerks.criticality.determineShowAffordUpgrade();
    gamePerks.criticality.determineShowBuyButton();
    gamePerks.condenser.determineShowAffordUpgrade();
    gamePerks.condenser.determineShowBuyButton();
    gamePerks.streamline.determineShowAffordUpgrade();
    gamePerks.streamline.determineShowBuyButton();
    gamePerks.automap.determineShowAffordUpgrade();
    gamePerks.automap.determineShowBuyButton();
    if (debugText.length > 0) {
        $('#debugContainer').removeClass('hidden');
    }
    else {
        $('#debugContainer').addClass('hidden');
    }
    for (let index = 0; index < gameData.challenges.length; index++) {
        const element = gameData.challenges[index];
        element.hideOrShowButton();
    }
    if (gameData.stats.maxGalaxy >= 20) {
        $('#btnRules').removeClass('hidden');
    }
}
function resetAbilities() {
    for (let index = 0; index < gameData.perks.length; index++) {
        const element = gameData.perks[index];
        element.count = 0;
    }
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
    gamePerks.condenser.updateBuyButtonText();
    gamePerks.condenser.updateBuyButtonTooltip();
    gamePerks.streamline.updateBuyButtonText();
    gamePerks.streamline.updateBuyButtonTooltip();
    gamePerks.automap.updateBuyButtonText();
    gamePerks.automap.updateBuyButtonTooltip();
    gtag('event', 'resetAbilities()', {
        event_category: 'click',
        event_label: 'label',
        value: 'value'
    });
}
// function sortBuildings(parent, updategui = true) {
//   if (updategui) {
//     updateGUI();
//   }
//   var ul = parent;
//   var li = ul.children('*');
//   li.detach().sort(function(a, b) {
//     if (a.classList.contains('hidden') && !b.classList.contains('hidden')) {
//       return 1;
//     }
//     if (b.classList.contains('hidden') && !a.classList.contains('hidden')) {
//       return -1;
//     }
//     if (a.dataset.sort > b.dataset.sort) {
//       return 1;
//     }
//     return -1;
//   });
//   ul.append(li);
// }
function canAffordAutoFight() {
    return (gameData.resources.metal >= AUTOFIGHT_METAL_COST && gameData.resources.polymer >= AUTOFIGHT_POLYMER_COST && gameData.resources.researchPoints >= AUTOFIGHT_RP_COST);
}
function canAffordMetalProfieciency() {
    return (gameData.resources.metal > Math.floor(METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought)) &&
        gameData.resources.researchPoints > Math.floor(METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought)));
}
function canAffordAetherProfieciency() {
    return (gameData.resources.metal > Math.floor(AETHER_PROFIECIENCY_METAL_COST * Math.pow(AETHER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought)) &&
        gameData.resources.polymer > Math.floor(AETHER_PROFIECIENCY_POLYMER_COST * Math.pow(AETHER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought)) &&
        gameData.resources.researchPoints > Math.floor(AETHER_PROFIECIENCY_RP_COST * Math.pow(AETHER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought)));
}
function canAffordResearchProfieciency() {
    return (gameData.resources.metal > Math.floor(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought)) &&
        gameData.resources.polymer > Math.floor(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought)) &&
        gameData.resources.researchPoints > Math.floor(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought)));
}
function canAffordPolymerProfieciency() {
    return (gameData.resources.polymer > Math.floor(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought)) &&
        gameData.resources.researchPoints > Math.floor(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought)));
}
function giveMetalProduction(time) {
    gameData.resources.metal += time / 1000 * gameBuildings.mine.productionPerSecond();
}
function givePolymerProduction(time) {
    gameData.resources.polymer += time / 1000 * gameBuildings.factory.productionPerSecond();
}
function giveResearchProduction(time) {
    gameData.resources.researchPoints += time / 1000 * gameBuildings.lab.productionPerSecond();
}
function giveAetherProduction(time) {
    gameData.resources.aether += time / 1000 * gameBuildings.refinery.productionPerSecond();
}
function updatePower() {
    var p1 = gameBuildings.generator.totalPowerCreated();
    var p2 = gameBuildings.plant.totalPowerCreated();
    var p3 = gameBuildings.panel.totalPowerCreated();
    var p4 = gameBuildings.aetherPlant.totalPowerCreated();
    var p5 = gameBuildings.fusionPlant.totalPowerCreated();
    var p6 = gameBuildings.chronotonPlant.totalPowerCreated();
    var powerAvailable = p1 + p2 + p3 + p4 + p5 + p6;
    var facilities = gameBuildings.powerConverter.powerSpent() + gameBuildings.shieldLab.powerSpent() + gameBuildings.armorLab.powerSpent() + gameBuildings.mine.powerSpent() + gameBuildings.shipyard.powerSpent() + gameBuildings.factory.powerSpent() + gameBuildings.lab.powerSpent() + gameBuildings.refinery.powerSpent();
    gameData.resources.power = powerAvailable - facilities;
}
function CheckPower(powerRequirement) {
    updatePower();
    return (gameData.resources.power >= powerRequirement);
}
function buyAutoFight() {
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
}
function chooseSlowOrFastShieldLab(choice) {
    gameData.tacticalChoices.shieldLabsSetting.count = choice;
    $('#btnBuyShieldLab').removeClass('hidden');
    gameBuildings.shieldLab.updateBuyButtonText();
    gameBuildings.shieldLab.updateBuyButtonTooltip();
}
function chooseSlowOrFastArmorLab(choice) {
    gameData.tacticalChoices.armorLabsSetting.count = choice;
    $('#btnBuyArmorLab').removeClass('hidden');
    gameBuildings.armorLab.updateBuyButtonText();
    gameBuildings.armorLab.updateBuyButtonTooltip();
}
function choosePowerConverter(choice) {
    gameData.tacticalChoices.powerConvertersSetting.count = choice;
    $('#btnBuyPowerConverter').removeClass('hidden');
    gameBuildings.powerConverter.updateBuyButtonText();
    gameBuildings.powerConverter.updateBuyButtonTooltip();
}
function buyMetalProficiency() {
    if (gameData.technologies.metalProficiency.bought >= gameData.technologies.metalProficiency.unlocked) {
        return;
    }
    var nextMetalCost = Math.floor(METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought));
    var nextPolymerCost = Math.floor(METAL_PROFIECIENCY_POLYMER_COST * Math.pow(METAL_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought));
    var nextRPCost = Math.floor(METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought));
    if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost) {
        gameData.technologies.metalProficiency.bought++;
        gameData.resources.metal -= nextMetalCost;
        gameData.resources.polymer -= nextPolymerCost;
        gameData.resources.researchPoints -= nextRPCost;
        $('#btnMetalTech').attr('title', 'This research will increase our metal production by 50% multiplicative\nMetal Cost:' + prettify((METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought))) +
            '\nResearch Cost:' + prettify((METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought))));
        $('#btnBuyMine').attr('title', gameBuildings.mine.tooltipCost());
    }
}
function buyPolymerProficiency() {
    if (gameData.technologies.polymerProficiency.bought >= gameData.technologies.polymerProficiency.unlocked) {
        return;
    }
    var nextMetalCost = Math.floor(POLYMER_PROFIECIENCY_METAL_COST * Math.pow(POLYMER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought));
    var nextPolymerCost = Math.floor(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought));
    var nextRPCost = Math.floor(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought));
    if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost) {
        gameData.technologies.polymerProficiency.bought++;
        gameData.resources.metal -= nextMetalCost;
        gameData.resources.polymer -= nextPolymerCost;
        gameData.resources.researchPoints -= nextRPCost;
        $('#btnPolymerTech').attr('title', 'This research will increase our polymer production by 50% multiplicative\nPolymer Cost:' + prettify(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought)) +
            '\nResearch Cost:' + prettify(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought)));
        $('#btnBuyFactory').attr('title', gameBuildings.factory.tooltipCost());
    }
}
function buyResearchProficiency() {
    if (gameData.technologies.researchProficiency.bought >= gameData.technologies.researchProficiency.unlocked) {
        return;
    }
    var nextMetalCost = Math.floor(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought));
    var nextPolymerCost = Math.floor(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought));
    var nextRPCost = Math.floor(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought));
    if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost) {
        gameData.technologies.researchProficiency.bought++;
        gameData.resources.metal -= nextMetalCost;
        gameData.resources.polymer -= nextPolymerCost;
        gameData.resources.researchPoints -= nextRPCost;
        $('#btnResearchTech').attr('title', 'This research will increase our research production by 50% multiplicative\nMetal Cost:' + prettify(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought)) +
            '\nPolymer Cost:' + prettify(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought)) +
            '\nResearch Cost:' + prettify(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought)));
        $('#btnBuyLab').attr('title', gameBuildings.lab.tooltipCost());
    }
}
function buyAetherProficiency() {
    if (gameData.technologies.aetherProficiency.bought >= gameData.technologies.aetherProficiency.unlocked) {
        return;
    }
    var nextMetalCost = AETHER_PROFIECIENCY_METAL_COST * Math.pow(AETHER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought);
    var nextPolymerCost = AETHER_PROFIECIENCY_POLYMER_COST * Math.pow(AETHER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought);
    var nextRPCost = AETHER_PROFIECIENCY_RP_COST * Math.pow(AETHER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought);
    if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.resources.researchPoints >= nextRPCost) {
        gameData.technologies.aetherProficiency.bought++;
        gameData.resources.metal -= nextMetalCost;
        gameData.resources.polymer -= nextPolymerCost;
        gameData.resources.researchPoints -= nextRPCost;
        $('#btnAetherTech').attr('title', 'This research will increase our aether production by 50% multiplicative\nMetal Cost:' + prettify((AETHER_PROFIECIENCY_METAL_COST * Math.pow(AETHER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought))) +
            '\nPolymer Cost:' + prettify((AETHER_PROFIECIENCY_POLYMER_COST * Math.pow(AETHER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought))) +
            '\nResearch Cost:' + prettify((AETHER_PROFIECIENCY_RP_COST * Math.pow(AETHER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought))));
        $('#btnBuyRefinery').attr('title', gameBuildings.refinery.tooltipCost());
    }
}
function switchAutoFight() {
    if (gameData.technologies.autofightOn === 1) {
        gameData.technologies.autofightOn = 0;
    }
    else {
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
function chooseRandom(min, max) {
    return (Math.random() * (max - min) + min);
}
function getPrettyTime(d) {
    var hr = d.getHours();
    var min = d.getMinutes();
    var hrdisplay = '';
    var mindisplay = '';
    var secdisplay = '';
    var sec = d.getSeconds();
    if (min < 10) {
        mindisplay = '0' + min.toString();
    }
    else {
        mindisplay = min.toString();
    }
    if (sec < 10) {
        secdisplay = '0' + sec.toString();
    }
    else {
        secdisplay = sec.toString();
    }
    if (hr < 10) {
        hrdisplay = '0' + hr.toString();
    }
    else {
        hrdisplay = hr.toString();
    }
    return (hrdisplay + ':' + mindisplay + ':' + secdisplay);
}
function addColor(theColor, theText) {
    return '<span style="color:' + theColor + '">' + theText + '</span><br />';
}
function addToDisplay(newline, category = 'whoops') {
    var newItem = new DisplayItem(newline);
    if (category === 'gameSave') {
        newItem.txt = addColor('blue', getPrettyTime(new Date()) + ': ' + newline);
        textGameSaved[0] = newItem;
    }
    else if (category === 'loot') {
        newItem.txt = addColor('white', getPrettyTime(new Date()) + ': ' + newline);
        textLoot.unshift(newItem);
        textLoot = textLoot.slice(0, 50);
    }
    else if (category === 'combat') {
        newItem.txt = addColor('red', getPrettyTime(new Date()) + ': ' + newline);
        textCombat.unshift(newItem);
        textCombat = textCombat.slice(0, 50);
    }
    else if (category === 'mission') {
        newItem.txt = addColor('green', getPrettyTime(new Date()) + ': ' + newline);
        textMissions.unshift(newItem);
        textMissions = textMissions.slice(0, 50);
    }
    else if (category === 'story') {
        newItem.txt = addColor('yellow', getPrettyTime(new Date()) + ': ' + newline);
        textStory.unshift(newItem);
        textStory = textStory.slice(0, 5000);
    }
    else if (category === 'orange') {
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
function updateAchievementScreen() {
    var foo = document.getElementById('achievementsdiv');
    while (foo.firstChild) {
        foo.removeChild(foo.firstChild);
    }
    var bonusspan = document.createElement('span');
    bonusspan.innerHTML = 'Damage multiplier from achivements: ' + prettify(achievementMultiplier);
    foo.append(bonusspan);
    var table = document.createElement('table');
    foo.append(table);
    table.classList.add('text-xsmall');
    var r = document.createElement('tr');
    table.appendChild(r);
    for (let index = 0; index < achievementlist.length; index++) {
        var element = achievementlist[index];
        if (index % 8 === 0 && index > 0) {
            r = document.createElement('tr');
            table.appendChild(r);
        }
        var achievementElement = document.createElement('td');
        achievementElement.style.width = '150px';
        achievementElement.innerHTML = element.name + ': ' + element.bonus;
        achievementElement.classList.add('border');
        achievementElement.classList.add('border-secondary');
        r.appendChild(achievementElement);
        if (gameData.achievementids.includes(element.id)) {
            achievementElement.classList.add('bg-success');
        }
        else {
            achievementElement.classList.add('bg-danger');
        }
    }
}
function updateMissionButtons() {
    var foo = document.getElementById('missionvisible');
    while (foo.firstChild) {
        foo.removeChild(foo.firstChild);
    }
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
            element.classList.add('btn-dark');
            element.classList.add('border');
            element.classList.add('border-secondary');
            element.classList.add('rounded');
        }
        else if (gameData.missions[missionIndex].name.includes('Mine')) {
            element.classList.add('btn-aether');
        }
        else if (gameData.missions[missionIndex].name.includes('Lab')) {
            element.classList.add('btn-success');
        }
        else if (gameData.missions[missionIndex].name.includes('Improvement')) {
            element.classList.add('btn-light');
        }
        else {
            element.classList.add('btn-info');
        }
        element.addEventListener('click', function () {
            changeLocation(missionIndex);
        });
    }
}
const ELITE_ENEMY_ATTRIBUTES = ['Quick', 'Hardy', 'Elite'];
function checkForCreateLoot(mission, zone) {
    var rtn = {
        lootType: '',
        lootAmount: 25 * Math.pow(1.5, mission.level + (zone / 100)) * gamePerks.looter.getBonus()
    };
    var l = Math.floor(Math.random() * 100);
    if (mission.IsGalaxy) {
        if (l <= 10) {
            rtn.lootType = 'Metal';
        }
        else if (l <= 20) {
            rtn.lootType = 'Polymer';
        }
        else if (l <= 30) {
            rtn.lootType = 'ResearchPoints';
            rtn.lootAmount /= 8;
            // } else if (l <= 31) {
            //   rtn.lootType = 'Aether';
            //   rtn.lootAmount /= 250;
        }
    }
    else {
        if (l <= 10) {
            rtn.lootType = 'Metal';
        }
        else if (l <= 20) {
            rtn.lootType = 'Polymer';
        }
        else if (l <= 30) {
            rtn.lootType = 'ResearchPoints';
            rtn.lootAmount /= 8;
        }
        else if (l <= 35) {
            rtn.lootType = 'Aether';
            rtn.lootAmount /= 250;
        }
    }
    return rtn;
}
function CreateMission(name, unique, difficulty, lootMultiplier, level, IsGalaxy) {
    if (gameData.world.currentChallenge !== 'AutoMap' || IsGalaxy) {
        gameData.missions.push(new Mission(name, unique, difficulty, lootMultiplier, level, 100, IsGalaxy));
    }
}
// function GetMissionNameCount(nameToCheck: string) {
//   var count = 0;
//   for (var i = 1; i < gameData.missions.length; i++) {
//     if (gameData.missions[i].name === nameToCheck) {
//       count++;
//     }
//   }
//   return count;
// }
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
    // var lvlsCleared = (gameData.missions[0].level) * 100 + gameData.missions[0].zone; // This is actually off by 100 but it simplifies the rest of the code
    if (gameData.technologies.shipyardTechUnlock < gameData.missions[0].level) {
        gameData.technologies.shipyardTechUnlock = gameData.missions[0].level;
        addToDisplay('An upgrade to the shipyard would allow for bigger drones', 'mission');
    }
    if (gameData.missions[0].level > 5) {
        var prestigelvl = (Math.floor((gameData.missions[0].level - 1) / 5));
        if (prestigelvl >= (GetMissionNameCount('Railgun Plans') + gameData.technologies.railgun.prestigeUnlocked)) {
            CreateMission('Railgun Plans', true, 1.5, 1, gameData.missions[0].level, false);
            updateMissionButtons();
        }
        prestigelvl = (Math.floor((gameData.missions[0].level - 2) / 5));
        if (prestigelvl >= (GetMissionNameCount('Laser Plans') + gameData.technologies.laser.prestigeUnlocked)) {
            CreateMission('Laser Plans', true, 1.5, 1, gameData.missions[0].level, false);
            updateMissionButtons();
        }
        prestigelvl = (Math.floor((gameData.missions[0].level - 3) / 5));
        if (prestigelvl >= (GetMissionNameCount('Missile Plans') + gameData.technologies.missile.prestigeUnlocked)) {
            CreateMission('Missile Plans', true, 1.5, 1, gameData.missions[0].level, false);
            updateMissionButtons();
        }
        prestigelvl = (Math.floor((gameData.missions[0].level - 4) / 5));
        if (prestigelvl >= (GetMissionNameCount('Armor Plans') + gameData.technologies.armor.prestigeUnlocked)) {
            CreateMission('Armor Plans', true, 1.5, 1, gameData.missions[0].level, false);
            updateMissionButtons();
        }
        prestigelvl = (Math.floor((gameData.missions[0].level - 5) / 5));
        if (prestigelvl >= (GetMissionNameCount('Shield Plans') + gameData.technologies.shield.prestigeUnlocked)) {
            CreateMission('Shield Plans', true, 1.5, 1, gameData.missions[0].level, false);
            updateMissionButtons();
        }
    }
    if (gameData.missions[0].level === 20 && gameData.missions[0].zone === 50) {
        CreateMission('Panel Improvement', true, 2, 1, gameData.missions[0].level, false);
        updateMissionButtons();
        addToDisplay('I have found the location of plans that will improve the efficiency of our panels.', 'story');
    }
    if (gameData.missions[0].level === 30 && gameData.missions[0].zone === 50) {
        CreateMission('Generator Improvement', true, 2, 1, gameData.missions[0].level, false);
        updateMissionButtons();
        addToDisplay('I have found the location of plans that will improve the efficiency of our generators.', 'story');
    }
    if (gameData.missions[0].level === 40 && gameData.missions[0].zone === 50) {
        CreateMission('Plant Improvement', true, 2, 1, gameData.missions[0].level, false);
        updateMissionButtons();
        addToDisplay('I have found the location of plans that will improve the efficiency of our plants.', 'story');
    }
    if (gameData.missions[0].level === 50 && gameData.missions[0].zone === 50) {
        CreateMission('Aether Plant Improvement', true, 2, 1, gameData.missions[0].level, false);
        updateMissionButtons();
        addToDisplay('I have found the location of plans that will improve the efficiency of our aether plants.', 'story');
    }
    if (gameData.missions[0].level === 60 && gameData.missions[0].zone === 50) {
        CreateMission('Fusion Plant Improvement', true, 2, 1, gameData.missions[0].level, false);
        updateMissionButtons();
        addToDisplay('I have found the location of plans that will improve the efficiency of our Fusion Plants.', 'story');
    }
    if (gameData.missions[0].level === 70 && gameData.missions[0].zone === 50) {
        CreateMission('Chronoton Plant Improvement', true, 2, 1, gameData.missions[0].level, false);
        updateMissionButtons();
        addToDisplay('I have found the location of plans that will improve the efficiency of our Chronoton Plants.', 'story');
    }
    if (gameData.missions[0].level === 21 && gameData.missions[0].zone === 0) {
        CreateMission('The Gateway', true, 2, 1, 20, false);
        updateMissionButtons();
        addToDisplay('This site is putting off unusual power readings.  I don\'t know what it is, perhaps exploration is in order.', 'story');
    }
    if ((gameData.missions[0].level - 1) % 4 === 0 && gameData.missions[0].zone === 50 && gameData.missions[0].level > 4 && gameData.missions[0].level <= 21) {
        CreateMission('Aether Mine ' + prettify((gameData.missions[0].level - 1) / 4), true, 2, 3, gameData.missions[0].level, false);
        updateMissionButtons();
        addToDisplay('There\'s an aether mine. We should stock up.', 'story');
    }
    if ((gameData.missions[0].level >= 1) && (gameData.missions[0].zone >= 5) && gameData.technologies.autofightUnlock < 1) {
        gameData.technologies.autofightUnlock = 1;
        addToDisplay('Automating drone deployment will free up my time.', 'mission');
    }
    if (gameData.missions[0].level > 20 && gameData.missions[0].zone === 99) {
        giveChronotonFragments((gameData.missions[0].level - 11) * Math.pow(1.01, (gameData.missions[0].level - 25)) * gamePerks.looter.getBonus());
    }
    if (gameData.missions[0].level === 5 && gameData.missions[0].zone === 60) {
        if (gameData.options.armorLabOption === 0 || gameData.options.armorLabOption === 1) {
            CreateMission('Choose Fast Armor Labs', true, 1, 1, gameData.missions[0].level, false);
        }
        if (gameData.options.armorLabOption === 0 || gameData.options.armorLabOption === 2) {
            CreateMission('Choose Slow Armor Labs', true, 1, 1, gameData.missions[0].level, false);
        }
        updateMissionButtons();
        addToDisplay('I must choose which form of Armor lab to take. Both missions will disappear upon completion of either.', 'story');
    }
    if (gameData.missions[0].level === 10 && gameData.missions[0].zone === 60) {
        if (gameData.options.shieldLabOption === 0 || gameData.options.shieldLabOption === 1) {
            CreateMission('Choose Fast Shield Labs', true, 1, 1, gameData.missions[0].level, false);
        }
        if (gameData.options.shieldLabOption === 0 || gameData.options.shieldLabOption === 2) {
            CreateMission('Choose Slow Shield Labs', true, 1, 1, gameData.missions[0].level, false);
        }
        updateMissionButtons();
        addToDisplay('I must choose which form of Shield lab to take. Both missions will disappear upon completion of either.', 'story');
    }
    if (gameData.missions[0].level === 10 && gameData.missions[0].zone === 60) {
        CreateMission('Choose Resource Power Conversion', true, 1, 1, gameData.missions[0].level, false);
        updateMissionButtons();
        addToDisplay('I must choose which form of Power Conversion to take. All missions will disappear upon completion of any. (Currently only one choice)', 'story');
    }
    for (let index = 0; index < gameData.challenges.length; index++) {
        const element = gameData.challenges[index];
        element.checkForUnlock(gameData.missions[0].level);
        var cha = findChallenge(gameData.world.currentChallenge);
        if (cha !== null) {
            cha.checkForCompletion();
        }
    }
    if (findPerk('AutoMap').count > 0) {
        for (let index = gameData.missions.length - 1; index >= 0; index--) {
            const element = gameData.missions[index];
            if (gameData.missions[0].level - element.level > 10 - findPerk('AutoMap').count) {
                if (element.name.includes('Plans')) {
                    giveMissionReward(element);
                    gameData.missions.splice(index, 1);
                    updateMissionButtons();
                }
            }
        }
    }
}
// function convertToRoman(num: number) {
//   var rtn = '';
//   var currentValue = num;
//   while (currentValue >= 1000) {
//     rtn += 'M';
//     currentValue -= 1000;
//   }
//   while (currentValue >= 900) {
//     rtn += 'CM';
//     currentValue -= 900;
//   }
//   while (currentValue >= 500) {
//     rtn += 'D';
//     currentValue -= 500;
//   }
//   while (currentValue >= 400) {
//     rtn += 'CD';
//     currentValue -= 400;
//   }
//   while (currentValue >= 100) {
//     rtn += 'C';
//     currentValue -= 100;
//   }
//   while (currentValue >= 90) {
//     rtn += 'XC';
//     currentValue -= 90;
//   }
//   while (currentValue >= 50) {
//     rtn += 'L';
//     currentValue -= 50;
//   }
//   while (currentValue >= 40) {
//     rtn += 'XL';
//     currentValue -= 40;
//   }
//   while (currentValue >= 10) {
//     rtn += 'X';
//     currentValue -= 10;
//   }
//   while (currentValue >= 9) {
//     rtn += 'IX';
//     currentValue -= 9;
//   }
//   while (currentValue >= 5) {
//     rtn += 'V';
//     currentValue -= 5;
//   }
//   while (currentValue >= 4) {
//     rtn += 'IV';
//     currentValue -= 4;
//   }
//   while (currentValue >= 1) {
//     rtn += 'I';
//     currentValue -= 1;
//   }
//   return rtn;
// }
function removeMission(missionIndex) {
    gameData.missions.splice(missionIndex, 1);
    updateMissionButtons();
}
function suicideShip() {
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
function CHEAT() {
    gameData.resources.chronoton += 100;
}
function CHEAT2() {
    gameData.world.paused = true;
    gameData.nextProcessTime.setMilliseconds(gameData.nextProcessTime.getMilliseconds() - (1000 * 60 * 60));
    gameData.lastResourceProcessTime.setMilliseconds(gameData.lastResourceProcessTime.getMilliseconds() - (1000 * 60 * 60));
    gameData.lastRailgunCombatProcessTime.setMilliseconds(gameData.lastRailgunCombatProcessTime.getMilliseconds() - (1000 * 60 * 60));
    gameData.lastMissileCombatProcessTime.setMilliseconds(gameData.lastMissileCombatProcessTime.getMilliseconds() - (1000 * 60 * 60));
    gameData.lastLaserCombatProcessTime.setMilliseconds(gameData.lastLaserCombatProcessTime.getMilliseconds() - (1000 * 60 * 60));
    gameData.world.paused = false;
}
function processResources() {
    giveMetalProduction(RESOURCE_PRODUCTION_FRAME_RATE);
    givePolymerProduction(RESOURCE_PRODUCTION_FRAME_RATE);
    giveResearchProduction(RESOURCE_PRODUCTION_FRAME_RATE);
    giveAetherProduction(RESOURCE_PRODUCTION_FRAME_RATE);
    runRules();
    gameData.lastResourceProcessTime.setMilliseconds(gameData.lastResourceProcessTime.getMilliseconds() + RESOURCE_PRODUCTION_FRAME_RATE);
    gameData.world.timeElapsed += RESOURCE_PRODUCTION_FRAME_RATE;
}
function DudeDead() {
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
        if (gameData.world.currentMission === 0) {
            gameData.stats.galaxiesCleared++;
            gameData.stats.maxGalaxy = Math.max(gameData.stats.maxGalaxy, gameData.missions[0].level);
        }
        else {
            gameData.stats.missionsCleared++;
        }
        var newGalaxyNum = gameData.missions[0].level + 1;
        gameData.world.lastGalaxy = gameData.missions[0].level;
        giveMissionReward(gameData.missions[gameData.world.currentMission]);
        if (gameData.world.currentMission === 0) {
            removeMission(0);
            gameData.missions.unshift(new Mission('Galaxy ' + newGalaxyNum, true, 1, 1, newGalaxyNum, 100, true));
            updateMissionButtons();
        }
        else if (gameData.missions[gameData.world.currentMission].unique) {
            removeMission(gameData.world.currentMission);
        }
        else {
            gameData.missions[gameData.world.currentMission].createMissionMap();
            gameData.missions[gameData.world.currentMission].zone = 0;
        }
        if (gameData.tacticalChoices.armorLabsSetting.count > 0) {
            removeGroupofMissions('Armor Lab');
            updateMissionButtons();
        }
        if (gameData.tacticalChoices.shieldLabsSetting.count > 0) {
            removeGroupofMissions('Shield Lab');
            updateMissionButtons();
        }
        if (gameData.tacticalChoices.powerConvertersSetting.count > 0) {
            removeGroupofMissions('Power Conversion');
            updateMissionButtons();
        }
        if (gameData.world.currentMission >= gameData.missions.length) {
            gameData.world.currentMission = 0; // go back to world
            gameData.enemyship.shield = gameData.enemyship.shieldMax;
            gameData.playership.shield = gameData.playership.shieldMax;
        }
    }
    gameData.enemyship = gameData.missions[gameData.world.currentMission].enemies[gameData.missions[gameData.world.currentMission].zone];
}
function RailgunAttacks() {
    if (gameData.playership.hitPoints > 0) { // we check for hitpoints in the attack function, but checking here allows either an attack or respawn per tick as opposed to both
        if (gameData.enemyship.attributes.filter((att) => (att.name === 'Quick')).length > 0) { // enemy is quick and gets to attack first
            gameData.enemyship.railgunAttack(gameData.playership);
            gameData.playership.railgunAttack(gameData.enemyship);
        }
        else {
            gameData.playership.railgunAttack(gameData.enemyship);
            gameData.enemyship.railgunAttack(gameData.playership);
        }
        if (gameData.playership.hitPoints <= 0) { // We dead
            addToDisplay('The drone is no longer on the sensors', 'combat');
        }
    }
    gameData.lastRailgunCombatProcessTime.setMilliseconds(gameData.lastRailgunCombatProcessTime.getMilliseconds() + 1000 - (findPerk('Speed').count * 50));
}
function LaserAttacks() {
    if (gameData.playership.hitPoints > 0) { // we check for hitpoints in the attack function, but checking here allows either an attack or respawn per tick as opposed to both
        if (gameData.enemyship.attributes.filter((att) => (att.name === 'Quick')).length > 0) { // enemy is quick and gets to attack first
            gameData.enemyship.laserAttack(gameData.playership);
            gameData.playership.laserAttack(gameData.enemyship);
        }
        else {
            gameData.playership.laserAttack(gameData.enemyship);
            gameData.enemyship.laserAttack(gameData.playership);
        }
        if (gameData.playership.hitPoints <= 0) { // We dead
            addToDisplay('The drone is no longer on the sensors', 'combat');
        }
    }
    gameData.lastLaserCombatProcessTime.setMilliseconds(gameData.lastLaserCombatProcessTime.getMilliseconds() + 100 - (findPerk('Speed').count * 5));
}
function MissileAttacks() {
    try {
        if (gameData.playership.hitPoints > 0) { // we check for hitpoints in the attack function, but checking here allows either an attack or respawn per tick as opposed to both
            if (gameData.enemyship.attributes.filter((att) => (att.name === 'Quick')).length > 0) { // enemy is quick and gets to attack first
                gameData.enemyship.missileAttack(gameData.playership);
                gameData.playership.missileAttack(gameData.enemyship);
            }
            else {
                gameData.playership.missileAttack(gameData.enemyship);
                gameData.enemyship.missileAttack(gameData.playership);
            }
            if (gameData.playership.hitPoints <= 0) { // We dead
                addToDisplay('The drone is no longer on the sensors', 'combat');
            }
        }
        gameData.lastMissileCombatProcessTime.setMilliseconds(gameData.lastMissileCombatProcessTime.getMilliseconds() + 2000 - (findPerk('Speed').count * 100));
    }
    catch (error) {
        logMyErrors(error);
    }
}
function logMyErrors(e) {
    addToDisplay(e.message);
}
window.setInterval(function () {
    try {
        if (!initted) {
            if (document.readyState === 'complete') {
                init(false, ''); // this seeds the init function, which will overwrite this data with the save if there is one
            }
            return; // still waiting on pageload
        }
        if (gameData.world.paused) {
            return;
        }
        var currentTime = new Date(); // used to check tick processing time and what processing to do
        var timeToCheckForSave = new Date();
        timeToCheckForSave.setMilliseconds(timeToCheckForSave.getMilliseconds() - 1000 * 60 * 5);
        if (timeToCheckForSave > lastSaveGameTime) { // displays latest uploaded version
            saveGame();
        }
        if (currentTime > gameData.nextProcessTime) { // this is how we handle the 'bank' of time.  Once the ability is implemented we will need to make sure nextProcessTime is closer to real time than the bank maximum
            if (gameData.nextProcessTime > gameData.lastResourceProcessTime) { // It's time to process production
                processResources();
            }
            if (locationToChangeTo > -1) {
                gameData.world.currentMission = locationToChangeTo;
                gameData.enemyship = gameData.missions[gameData.world.currentMission].enemies[gameData.missions[gameData.world.currentMission].zone];
                gameData.enemyship.shield = gameData.enemyship.shieldMax;
                gameData.playership.shield = gameData.playership.shieldMax;
                locationToChangeTo = -1;
            }
            if (gameData.nextProcessTime > gameData.lastMissileCombatProcessTime && !gameData.world.paused) { // Combat Time!
                MissileAttacks();
            }
            if (gameData.nextProcessTime > gameData.lastRailgunCombatProcessTime && !gameData.world.paused) { // Combat Time!
                RailgunAttacks();
            }
            if (gameData.nextProcessTime > gameData.lastLaserCombatProcessTime && !gameData.world.paused) { // Combat Time!
                LaserAttacks();
            }
            if (gameData.enemyship.hitPoints <= 0) { // new enemy
                DudeDead();
            }
            if (gameData.playership.hitPoints <= 0) {
                gameData.enemyship.shield = gameData.enemyship.shieldMax;
                if (gameData.technologies.autofightOn === 1) {
                    sendShip();
                }
            }
            gameData.nextProcessTime.setMilliseconds(gameData.nextProcessTime.getMilliseconds() + 50);
            updateGUI();
        }
        var endTime = new Date();
        var msRunTime = endTime.getTime() - currentTime.getTime();
        if (msRunTime > 50) {
            addToDisplay(msRunTime.toString(), 'story');
            gtag('event', 'Interval exceeded', {
                event_category: 'error',
                event_label: 'interval',
                value: msRunTime
            });
        }
    }
    catch (error) {
        logMyErrors(error);
    }
}, 10);
//# sourceMappingURL=main.js.map