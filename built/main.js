/* eslint-disable max-statements-per-line */
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
const TACTICAL_LAB_AETHER_BASE_COST = 10000;
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
const PRESTIGE_COST_MULTIPLIER = 4.25;
const PRESTIGE_BASE_MULTIPLIER = 4;
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
const RAILGUN_UPGRADE_BASE_IMPROVEMENT = 4;
const RAILGUN_UPGRADE_AETHER_BASE_COST = 150;
const LASER_UPGRADE_METAL_BASE_COST = 50;
const LASER_UPGRADE_POLYMER_BASE_COST = 50;
const LASER_UPGRADE_RP_BASE_COST = 75;
const LASER_UPGRADE_BASE_IMPROVEMENT = 6;
const LASER_UPGRADE_AETHER_BASE_COST = 225;
const MISSILE_UPGRADE_METAL_BASE_COST = 75;
const MISSILE_UPGRADE_POLYMER_BASE_COST = 75;
const MISSILE_UPGRADE_RP_BASE_COST = 110;
const MISSILE_UPGRADE_BASE_IMPROVEMENT = 9;
const MISSILE_UPGRADE_AETHER_BASE_COST = 350;
const ARMOR_UPGRADE_METAL_BASE_COST = 100;
const ARMOR_UPGRADE_POLYMER_BASE_COST = 0;
const ARMOR_UPGRADE_RP_BASE_COST = 50;
const ARMOR_UPGRADE_BASE_IMPROVEMENT = 20;
const ARMOR_UPGRADE_AETHER_BASE_COST = 150;
const SHIELD_UPGRADE_METAL_BASE_COST = 0;
const SHIELD_UPGRADE_POLYMER_BASE_COST = 75;
const SHIELD_UPGRADE_RP_BASE_COST = 75;
const SHIELD_UPGRADE_BASE_IMPROVEMENT = 10;
const SHIELD_UPGRADE_AETHER_BASE_COST = 225;
const FLAK_UPGRADE_METAL_BASE_COST = 75;
const FLAK_UPGRADE_POLYMER_BASE_COST = 75;
const FLAK_UPGRADE_RP_BASE_COST = 110;
const FLAK_UPGRADE_BASE_IMPROVEMENT = 40;
const FLAK_UPGRADE_AETHER_BASE_COST = 350;
var notationDisplayOptions = ['Scientific Notation', 'Standard Formatting', 'Engineering Notation', 'Alphabetic Notation', 'Hybrid Notation', 'Logarithmic Notation'];
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
// var Achievementcompleted = '';
// var Achievementuncompleted = '';
class PossibleEnemies {
    constructor(name, attackMod, hitPointMod, shmod) {
        this.name = name;
        this.attackMod = attackMod;
        this.hitPointMod = hitPointMod;
        this.shmod = shmod;
    }
}
class challenge {
    constructor(description, galaxyUnlocked, galaxyCompleted) {
        this.unlocked = false;
        this.completed = false;
        this.description = description;
        this.galaxyCompleted = galaxyCompleted;
        this.galaxyUnlocked = galaxyUnlocked;
    }
    checkForCompletion(galaxy, btn) {
        if (galaxy > this.galaxyCompleted) {
            this.completed = true;
            gameData.world.currentChallenge = '';
            btn.classList.add('hidden');
        }
    }
    checkForUnlock(galaxy) {
        if (galaxy > this.galaxyUnlocked) {
            if (!gameData.story.consistencyunlocked && !this.unlocked) {
                addToDisplay('I have discovered a new address for the Gateway.  It will allow a new challenge to be attempted.  And there should be a nice reward.  Probably even a new ability!', 'story');
                gameData.story.consistencyunlocked = true;
            }
            this.unlocked = true;
        }
    }
}
class challenges {
    constructor() {
        this.consistency = new challenge('Your drones damage maximum will be lowered to the drones minimum damage for the duration of this challenge.  Completing Galaxy 25 will complete the challenge and unlock the Consistency ability which will improve your drones minimum damage and damage will return to normal.', 25, 25);
        this.power = new challenge('Power production will be halved for the duration of this challenge. Completing Galaxy 30 will complete the challenge and unlock the Power ability.  And power production will return to normal', 30, 30);
        this.criticality = new challenge('The enemy has gained the ability to unleash massive amounts of critical damage from time to time.  Completing Galaxy 40 will complete the challenge and unlock the criticality ability.  Learning this ability will be incredibly helpful.', 40, 40);
    }
}
class perks {
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
<<<<<<< HEAD
class CountInfo {
    constructor(count) {
        this.count = count;
    }
}
=======
>>>>>>> ae16b8823738cd3657cdf8e94a4d80c3212489b0
class EquipmentTechnology {
    constructor(upgrade, prestigeunlocked, prestigebought) {
        this.upgrade = upgrade;
        this.prestigeUnlocked = prestigeunlocked;
        this.prestigeBought = prestigebought;
    }
}
<<<<<<< HEAD
class ResourceTechnology {
    constructor(unlocked, bought) {
        this.unlocked = unlocked;
        this.bought = bought;
    }
}
=======
>>>>>>> ae16b8823738cd3657cdf8e94a4d80c3212489b0
class saveGameData {
    constructor(name) {
        this.name = name;
        this.version = '0.7.4';
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
            aetherPlants: new CountInfo(0),
            factories: new CountInfo(0),
            generators: new CountInfo(0),
            labs: new CountInfo(0),
            mines: new CountInfo(1),
            panels: new CountInfo(1),
            plants: new CountInfo(0),
            refineries: new CountInfo(0),
            shipyard: new CountInfo(0),
            tacticalLabs: new CountInfo(0),
            fusionPlants: new CountInfo(0)
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
<<<<<<< HEAD
            metalProficiency: new ResourceTechnology(0, 0),
            polymerProficiency: new ResourceTechnology(0, 0),
            aetherProficiency: new ResourceTechnology(0, 0),
            researchProficiency: new ResourceTechnology(0, 0),
=======
            metalProficiencyBought: 0,
            metalProficiencyUnlocked: 0,
            polymerProficiencyBought: 0,
            polymerProficiencyUnlocked: 0,
>>>>>>> ae16b8823738cd3657cdf8e94a4d80c3212489b0
            railgun: new EquipmentTechnology(1, 1, 1),
            laser: new EquipmentTechnology(0, 0, 0),
            missile: new EquipmentTechnology(0, 0, 0),
            armor: new EquipmentTechnology(1, 1, 1),
            shield: new EquipmentTechnology(0, 0, 0),
            flak: new EquipmentTechnology(0, 0, 0),
<<<<<<< HEAD
=======
            researchProficiency: 0,
            researchProficiencyBought: 0,
>>>>>>> ae16b8823738cd3657cdf8e94a4d80c3212489b0
            shipyardTechUnlock: 1,
            panelUpgrade: new CountInfo(0),
            generatorUpgrade: new CountInfo(0),
            plantupgrade: new CountInfo(0),
            aetherplantupgrade: new CountInfo(0),
            fusionplantupgrade: new CountInfo(0)
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
    constructor(id, name, bonus, check) {
        this.id = id;
        this.name = name;
        this.bonus = bonus;
        this.check = check;
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
class ShipAttribute {
    constructor(name) {
        this.name = name;
    }
}
class Ship {
    constructor(name = '') {
        this.name = name;
        this.size = 1;
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
    createEnemy(missionWork, zone) {
        var newEnemymods = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)]; // this will eventually need to be redone when we add advanced enemies
        this.name = newEnemymods.name;
        var loot = checkForCreateLoot(missionWork, zone);
        this.lootType = loot.lootType;
        this.lootAmount = loot.lootAmount;
        this.hitPoints = missionWork.difficulty * newEnemymods.hitPointMod * this.size * 60 * Math.pow(2.1, missionWork.level - 1) * Math.pow(1.007, zone - 1);
        this.hitPointsMax = this.hitPoints;
        var baseEnemyAttack = missionWork.difficulty * newEnemymods.attackMod * 20 * Math.pow(2.1, missionWork.level - 1) * Math.pow(1.007, zone - 1);
        this.minDamage = this.size * baseEnemyAttack / 1.25;
        this.maxDamage = this.size * baseEnemyAttack * 1.25;
        if (zone === missionWork.zones - 1) { // This is a Boss
            this.name += ' Station';
            this.hitPointsMax *= 0.60;
            this.hitPoints = this.hitPointsMax;
            this.shieldMax = this.hitPoints * newEnemymods.shmod;
            this.shield = this.shieldMax;
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
        return this;
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
<<<<<<< HEAD
            this.size = 1 * Math.pow(1.25, gameData.buildings.shipyard.count - 1);
=======
            this.size = 1 * Math.pow(1.25, gameData.buildings.shipyard - 1);
>>>>>>> ae16b8823738cd3657cdf8e94a4d80c3212489b0
            this.hitPointsMax = gameEquipment.armor.getValue() + gameEquipment.flak.getValue();
            this.hitPoints = this.hitPointsMax;
            this.shieldMax = gameEquipment.shield.getValue();
            this.shieldMax *= gamePerks.thickskin.getBonus();
            this.shield = gameData.playership.shieldMax;
            var baseRailgunAttack = gameEquipment.railgun.getValue();
            var baseLaserAttack = gameEquipment.laser.getValue();
            var baseMissileAttack = gameEquipment.missile.getValue();
<<<<<<< HEAD
            var baseAttack = (baseRailgunAttack + baseLaserAttack + baseMissileAttack);
=======
            var baseAttack = this.size * (baseRailgunAttack + baseLaserAttack + baseMissileAttack) * achievementMultiplier * gamePerks.damager.getBonus();
>>>>>>> ae16b8823738cd3657cdf8e94a4d80c3212489b0
            this.minDamage = baseAttack * (0.75 + (gameData.perks.consistency / 100));
            if (gameData.world.currentChallenge === 'Consistency') {
                this.maxDamage = this.minDamage;
            }
            else {
                this.maxDamage = baseAttack * 1.25;
            }
            this.criticalChance = 0 + (gameData.perks.criticality * 5);
            this.criticalMultiplier = 1 + (gameData.perks.criticality * 0.5);
            checkForCompletedAchievements();
            gtag('event', 'Send Ship', {
                event_category: 'event',
                event_label: 'label',
                value: 'value'
            });
        }
    }
    attack(defender) {
        if (this.hitPoints <= 0) {
            return;
        }
        var damageToEnemy = Math.max(chooseRandom(this.minDamage, this.maxDamage), 0);
        if (chooseRandom(0, 100) < this.criticalChance) {
            damageToEnemy *= this.criticalMultiplier;
            addToDisplay(this.name + ' scores a critical hit ' + prettify(this.criticalChance), 'combat');
        }
        var originalDamage = damageToEnemy;
        damageToEnemy -= defender.shield;
        damageToEnemy = Math.max(0, damageToEnemy); // THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED
        defender.shield -= originalDamage;
        defender.shield = Math.max(0, defender.shield); // THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED
        defender.hitPoints -= damageToEnemy;
        defender.hitPoints = Math.max(0, defender.hitPoints); // THIS SHOULD MAYBE CHANGE WHEN OVERKILL IS INTRODUCED
    }
}
var gamePerks = {
    looter: {
        chronotonforBuy: function () { return 1 * Math.pow(1.3, gameData.perks.looter); },
        chronotonSpent: function () { return sumOfExponents(gameData.perks.looter, 1, 1.3); },
        canAfford: function () { return chronotonAvailable() > this.chronotonforBuy(); },
        updateBuyButtonText: function () { $('#btnLooter').text('Looter(' + (gameData.perks.looter) + ')\n'); },
        updateBuyButtonTooltip: function () { $('#btnLooter').attr('title', 'Each level bought will add 10% to looting additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
        getBonus: function () { return (1 + gameData.perks.looter * 0.1); },
        determineShowBuyButton: function () {
            return true;
        },
        determineShowAffordUpgrade: function () {
            if (this.canAfford()) {
                $('#btnLooter').removeClass('btn-danger').addClass('btn-primary');
            }
            else {
                $('#btnLooter').removeClass('btn-primary').addClass('btn-danger');
            }
        },
        add: function () {
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
        getBonus: function () { return (1 + gameData.perks.producer * 0.1); },
        determineShowBuyButton: function () {
            return true;
        },
        determineShowAffordUpgrade: function () {
            if (this.canAfford()) {
                $('#btnProducer').removeClass('btn-danger').addClass('btn-primary');
            }
            else {
                $('#btnProducer').removeClass('btn-primary').addClass('btn-danger');
            }
        },
        add: function () {
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
        updateBuyButtonTooltip: function () { $('#btnDamager').attr('title', 'Each level bought will add 10% to damage additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
        getBonus: function () { return 1 + (gameData.perks.damager * 0.1); },
        determineShowBuyButton: function () {
            return true;
        },
        determineShowAffordUpgrade: function () {
            if (this.canAfford()) {
                $('#btnDamager').removeClass('btn-danger').addClass('btn-primary');
            }
            else {
                $('#btnDamager').removeClass('btn-primary').addClass('btn-danger');
            }
        },
        add: function () {
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
        updateBuyButtonTooltip: function () { $('#btnThickSkin').attr('title', 'Each level bought will add 10% to defenses additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
        getBonus: function () { return (1 + gameData.perks.thickskin * 0.1); },
        determineShowBuyButton: function () {
            return true;
        },
        determineShowAffordUpgrade: function () {
            if (this.canAfford()) {
                $('#btnThickSkin').removeClass('btn-danger').addClass('btn-primary');
            }
            else {
                $('#btnThickSkin').removeClass('btn-primary').addClass('btn-danger');
            }
        },
        add: function () {
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
        updateBuyButtonTooltip: function () { $('#btnSpeed').attr('title', 'Each level bought will shorten the wait time between attacks by 50ms\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
        determineShowBuyButton: function () {
            return true;
        },
        determineShowAffordUpgrade: function () {
            if (this.canAfford() && gameData.perks.speed < 10) {
                $('#btnSpeed').removeClass('btn-danger').addClass('btn-primary');
            }
            else {
                $('#btnSpeed').removeClass('btn-primary').addClass('btn-danger');
            }
        },
        add: function () {
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
        chronotonforBuy: function () { return 1 * Math.pow(1.3, gameData.perks.consistency); },
        chronotonSpent: function () { return sumOfExponents(gameData.perks.consistency, 1, 1.3); },
        canAfford: function () { return chronotonAvailable() > this.chronotonforBuy(); },
        updateBuyButtonText: function () { $('#btnConsistency').text('Consistency(' + (gameData.perks.consistency) + ')'); },
        updateBuyButtonTooltip: function () { $('#btnConsistency').attr('title', 'Each level bought will add increase the minimum damage by 1% additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
        determineShowBuyButton: function () {
            if (gameData.challenges.consistency.completed) {
                $('#btnConsistency').removeClass('hidden');
            }
            else {
                $('#btnConsistency').addClass('hidden');
            }
        },
        determineShowAffordUpgrade: function () {
            if (this.canAfford() && gameData.perks.consistency < 25) {
                $('#btnConsistency').removeClass('btn-danger').addClass('btn-primary');
            }
            else {
                $('#btnConsistency').removeClass('btn-primary').addClass('btn-danger');
            }
        },
        add: function () {
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
        chronotonforBuy: function () { return 25 * Math.pow(1.3, gameData.perks.power); },
        chronotonSpent: function () { return sumOfExponents(gameData.perks.power, 25, 1.3); },
        canAfford: function () { return chronotonAvailable() > this.chronotonforBuy(); },
        updateBuyButtonText: function () { $('#btnPower').text('Power(' + (gameData.perks.power) + ')'); },
        updateBuyButtonTooltip: function () { $('#btnPower').attr('title', 'Each level bought will add increase power creation by 10% additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
        getBonus: function () { return (1 + gameData.perks.power * 0.1); },
        determineShowBuyButton: function () {
            if (gameData.challenges.power.completed) {
                $('#btnPower').removeClass('hidden');
            }
            else {
                $('#btnPower').addClass('hidden');
            }
        },
        determineShowAffordUpgrade: function () {
            if (this.canAfford() && gameData.perks.power < 25) {
                $('#btnPower').removeClass('btn-danger').addClass('btn-primary');
            }
            else {
                $('#btnPower').removeClass('btn-primary').addClass('btn-danger');
            }
        },
        add: function () {
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
        chronotonforBuy: function () { return 100 * Math.pow(1.3, gameData.perks.criticality); },
        chronotonSpent: function () { return sumOfExponents(gameData.perks.criticality, 100, 1.3); },
        canAfford: function () { return chronotonAvailable() > this.chronotonforBuy(); },
        updateBuyButtonText: function () { $('#btnCriticality').text('criticality(' + (gameData.perks.criticality) + ')'); },
        updateBuyButtonTooltip: function () { $('#btnCriticality').attr('title', 'Each level increases the chance for a critical kit by 5% additively and the damage from a critical hit by 50% additively\n\nChronoton Cost:' + prettify(this.chronotonforBuy())); },
        determineShowBuyButton: function () {
            if (gameData.challenges.criticality.completed) {
                $('#btnCriticality').removeClass('hidden');
            }
            else {
                $('#btnCriticality').addClass('hidden');
            }
        },
        determineShowAffordUpgrade: function () {
            if (this.canAfford() && gameData.perks.criticality < 10) {
                $('#btnCriticality').removeClass('btn-danger').addClass('btn-primary');
            }
            else {
                $('#btnCriticality').removeClass('btn-primary').addClass('btn-danger');
            }
        },
        add: function () {
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
class BuildingBase {
    constructor(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, buildinginfo, buyButton, buyButtonClass, powerGrowth, powerUsage) {
        this.name = name;
        this.metalBaseCost = metalBaseCost;
        this.metalGrowthFactor = metalGrowthFactor;
        this.polymerBaseCost = polymerBaseCost;
        this.polymerGrowthFactor = polymerGrowthFactor;
        this.aetherBaseCost = aetherBaseCost;
        this.aetherGrowthFactor = aetherGrowthFactor;
        this.buildinginfo = buildinginfo;
        this.buyButton = buyButton;
        this.buyButtonClass = buyButtonClass;
        this.powerGrowth = powerGrowth;
        this.powerUsage = powerUsage;
    }
    metalCost() { return (this.metalBaseCost * Math.pow(this.metalGrowthFactor, this.buildinginfo.count)); }
    polymerCost() { return (this.polymerBaseCost * Math.pow(this.metalGrowthFactor, this.buildinginfo.count)); }
    aetherCost() { return (this.aetherBaseCost * Math.pow(this.aetherGrowthFactor, this.buildinginfo.count)); }
    canAffordBuy() { return (gameData.resources.metal >= this.metalCost() && gameData.resources.polymer >= this.polymerCost() && gameData.resources.aether >= this.aetherCost() && CheckPower(this.powerCost())); }
    updateBuyButtonText() { this.buyButton.innerHTML = this.name + ': ' + prettify(this.buildinginfo.count); }
    tooltipCost() {
        var rtn = '';
        if (this.metalCost() > 0) {
            rtn += '\nMetal Cost:' + prettify(this.metalCost());
        }
        if (this.polymerCost() > 0) {
            rtn += '\nPolymer Cost:' + prettify(this.polymerCost());
        }
        if (this.aetherCost() > 0) {
            rtn += '\nAether Cost:' + prettify(this.aetherCost());
        }
        if (this.powerCost() > 0) {
            rtn += '\nPower Cost:' + prettify(this.powerCost());
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
    }
    powerSpent() { return sumOfExponents(this.buildinginfo.count, this.powerUsage, this.powerGrowth); }
    powerCost() { return (this.powerUsage * Math.pow(this.powerGrowth, this.buildinginfo.count)); }
    buy() {
        if (this.canAffordBuy()) {
            gameData.resources.metal -= this.metalCost();
            gameData.resources.polymer -= this.polymerCost();
            gameData.resources.aether -= this.aetherCost();
            this.buildinginfo.count++;
            this.updateBuyButtonText();
            checkForCompletedAchievements();
        }
    }
    showBuyButton() { this.buyButton.classList.remove('hidden'); }
}
class PowerBuilding extends BuildingBase {
    constructor(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, buildinginfo, basePowerPer, technology, buyButton, buyButtonClass) {
        super(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, buildinginfo, buyButton, buyButtonClass, 0, 0);
        this.basePowerPer = basePowerPer;
        this.technology = technology;
    }
    powerPer() { return (this.basePowerPer * Math.pow(2, this.technology.count) * gamePerks.power.getBonus()); }
    totalPowerCreated() { return (this.buildinginfo.count * this.powerPer()); }
    tooltipCost() { return 'Creates ' + prettify(this.powerPer()) + ' power' + super.tooltipCost(); }
    updateBuyButtonTooltip() { this.buyButton.attributes.getNamedItem('title').value = this.tooltipCost(); }
    buy() {
        super.buy();
        this.updateBuyButtonTooltip();
    }
}
class ResourceBuilding extends BuildingBase {
    constructor(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, buildinginfo, baseProductionPer, technology, buyButton, buyButtonClass, powerUsage, powerGrowth, proficiencyBaseRate) {
        super(name, metalBaseCost, metalGrowthFactor, polymerBaseCost, polymerGrowthFactor, aetherBaseCost, aetherGrowthFactor, buildinginfo, buyButton, buyButtonClass, powerGrowth, powerUsage);
        this.baseProductionPer = baseProductionPer;
        this.technology = technology;
        this.proficiencyBaseRate = proficiencyBaseRate;
    }
    tooltipCost() { return 'Creates ' + prettify(this.productionPerSecond() / this.buildinginfo.count) + ' per second' + super.tooltipCost(); }
    updateBuyButtonTooltip() { this.buyButton.attributes.getNamedItem('title').value = this.tooltipCost(); }
    productionPerSecond() {
        var increase = this.baseProductionPer * this.buildinginfo.count * Math.pow(this.proficiencyBaseRate, this.technology.bought);
        increase *= Math.pow(2, gameData.technologies.goldMine);
        increase *= gamePerks.producer.getBonus();
        return increase;
    }
    buy() {
        super.buy();
        this.updateBuyButtonTooltip();
    }
}
var gameBuildings = {
    panel: new PowerBuilding('Solar Panel', PANEL_BASE_COST, PANEL_GROWTH_FACTOR, 0, 0, 0, 0, new CountInfo(0), POWER_PER_PANEL, new CountInfo(0), document.getElementById('btnBuyPanel'), 'btn-light'),
    generator: new PowerBuilding('Generator', GENERATOR_METAL_BASE_COST, GENERATOR_GROWTH_FACTOR, GENERATOR_POLYMER_BASE_COST, GENERATOR_GROWTH_FACTOR, 0, 0, new CountInfo(0), POWER_PER_GENERATOR, new CountInfo(0), document.getElementById('btnBuyGenerator'), 'btn-light'),
    plant: new PowerBuilding('Plant', PLANT_METAL_BASE_COST, PLANT_METAL_GROWTH_FACTOR, PLANT_POLYMER_BASE_COST, PLANT_POLYMER_GROWTH_FACTOR, 0, 0, new CountInfo(0), POWER_PER_PLANT, new CountInfo(0), document.getElementById('btnBuyPlant'), 'btn-light'),
    aetherPlant: new PowerBuilding('Aether Plant', AETHER_PLANT_METAL_BASE_COST, AETHER_PLANT_GROWTH_FACTOR, AETHER_PLANT_POLYMER_BASE_COST, AETHER_PLANT_GROWTH_FACTOR, AETHER_PLANT_AETHER_BASE_COST, AETHER_PLANT_GROWTH_FACTOR, new CountInfo(0), POWER_PER_AETHER_PLANT, new CountInfo(0), document.getElementById('btnBuyAetherPlant'), 'btn-light'),
    fusionPlant: new PowerBuilding('Fusion Plant', FUSION_PLANT_METAL_BASE_COST, FUSION_PLANT_GROWTH_FACTOR, FUSION_PLANT_POLYMER_BASE_COST, FUSION_PLANT_GROWTH_FACTOR, FUSION_PLANT_AETHER_BASE_COST, FUSION_PLANT_GROWTH_FACTOR, new CountInfo(0), POWER_PER_FUSION_PLANT, new CountInfo(0), document.getElementById('btnBuyFusionPlant'), 'btn-light'),
    mine: new ResourceBuilding('Mine', MINE_BASE_COST, MINE_GROWTH_FACTOR, 0, 0, 0, 0, new CountInfo(0), 1, new ResourceTechnology(0, 0), document.getElementById('btnBuyMine'), 'btn-warning', MINE_POWER_USAGE, MINE_POWER_GROWTH_USAGE, METAL_PROFICIENCY_BASE_RATE),
    lab: new ResourceBuilding('Lab', LAB_METAL_BASE_COST, LAB_METAL_GROWTH_FACTOR, LAB_POLYMER_BASE_COST, LAB_POLYMER_GROWTH_FACTOR, 0, 0, new CountInfo(0), 0.25, new ResourceTechnology(0, 0), document.getElementById('btnBuyLab'), 'btn-info', LAB_POWER_USAGE, LAB_POWER_GROWTH_USAGE, RESEARCH_PROFICIENCY_BASE_RATE),
    factory: new ResourceBuilding('Factory', FACTORY_BASE_COST, FACTORY_GROWTH_FACTOR, 0, 0, 0, 0, new CountInfo(0), 1, new ResourceTechnology(0, 0), document.getElementById('btnBuyFactory'), 'btn-dark', FACTORY_POWER_USAGE, FACTORY_POWER_GROWTH_USAGE, POLYMER_PROFICIENCY_BASE_RATE),
    refinery: new ResourceBuilding('Refinery', REFINERY_METAL_BASE_COST, REFINERY_GROWTH_FACTOR, REFINERY_POLYMER_BASE_COST, REFINERY_GROWTH_FACTOR, 0, 0, new CountInfo(0), 0.5, new ResourceTechnology(0, 0), document.getElementById('btnBuyRefinery'), 'btn-secondary', REFINERY_POWER_USAGE, REFINERY_POWER_GROWTH_USAGE, AETHER_PROFICIENCY_BASE_RATE),
    tacticalLab: {
        metalCost: function () { return (TACTICAL_LAB_METAL_BASE_COST * Math.pow(TACTICAL_LAB_GROWTH_FACTOR, gameData.buildings.tacticalLabs.count)); },
        polymerCost: function () { return (TACTICAL_LAB_POLYMER_BASE_COST * Math.pow(TACTICAL_LAB_GROWTH_FACTOR, gameData.buildings.tacticalLabs.count)); },
        aetherCost: function () { return (TACTICAL_LAB_AETHER_BASE_COST * Math.pow(TACTICAL_LAB_GROWTH_FACTOR, gameData.buildings.tacticalLabs.count)); },
        powerCost: function () { return (TACTICAL_LAB_POWER_USAGE * Math.pow(TACTICAL_LAB_POWER_GROWTH_USAGE, gameData.buildings.tacticalLabs.count)); },
        powerSpent: function () { return sumOfExponents(gameData.buildings.tacticalLabs.count, TACTICAL_LAB_POWER_USAGE, TACTICAL_LAB_POWER_GROWTH_USAGE); },
        tooltipCost: function () { return ('Buying will set Shields to ' + prettify(this.getBonus(true) * 100) + '% efficiency\nMetal Cost:' + prettify(this.metalCost()) + '\nPolymer Cost:' + prettify(this.polymerCost()) + '\nAether Cost:' + prettify(this.aetherCost()) + '\nPower Cost: ' + prettify(this.powerCost())); },
        canAffordBuy: function () { return (gameData.resources.metal >= this.metalCost() && gameData.resources.polymer >= this.polymerCost() && gameData.resources.aether >= this.aetherCost() && CheckPower(this.powerCost())); },
        getBonus: function (future = false) {
            var count = gameData.buildings.tacticalLabs.count + 0;
            if (future) {
                count++;
            }
            if (gameData.tacticalChoices.tacticalLabsSetting === 0) {
                return 1;
            }
            else if (gameData.tacticalChoices.tacticalLabsSetting === 1) {
                return (1 + (count * 0.1));
            }
            return (Math.pow(1.05, count));
        },
        updateBuyButtonText: function () { $('#btnBuyTacticalLab').text('Tactical Labs: ' + (gameData.buildings.tacticalLabs.count)); },
        updateBuyButtonTooltip: function () { $('#btnBuyTacticalLab').attr('title', this.tooltipCost()); },
        showBuyButton: function () { $('#btnBuyTacticalLab').removeClass('hidden'); },
        determineShowAffordBuy: function () {
            if (this.canAffordBuy()) {
                $('#btnBuyTacticalLab').removeClass('btn-danger').addClass('btn-success');
            }
            else {
                $('#btnBuyTacticalLab').removeClass('btn-success').addClass('btn-danger');
            }
        },
        buy: function () {
            if (this.canAffordBuy()) {
                gameData.resources.metal -= this.metalCost();
                gameData.resources.polymer -= this.polymerCost();
                gameData.resources.aether -= this.aetherCost();
                gameData.buildings.tacticalLabs.count++;
                this.updateBuyButtonText();
                this.updateBuyButtonTooltip();
                checkForCompletedAchievements();
                gtag('event', 'buy tactical lab', {
                    event_category: 'click',
                    event_label: 'label',
                    value: 'value'
                });
            }
        }
    },
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
            if (this.canAffordBuy()) {
                gameData.resources.metal -= this.metalCost();
                gameData.resources.polymer -= this.polymerCost();
                gameData.resources.researchPoints -= this.rpCost();
                gameData.buildings.shipyard.count++;
                this.updateBuyButtonText();
                this.updateBuyButtonTooltip();
                gtag('event', 'buy shipyard', {
                    event_category: 'click',
                    event_label: 'label',
                    value: 'value'
                });
                $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
            }
        }
    }
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
        else {
            this.buttonclass = 'btn-info';
        }
    }
    metalForShip() { return (this.upgradeMetalBaseCost * Math.pow(PRESTIGE_COST_MULTIPLIER, this.technology.prestigeBought)); }
    polymerForShip() { return (this.upgradePolymerBaseCost * Math.pow(PRESTIGE_COST_MULTIPLIER, this.technology.prestigeBought)); }
    RPForShip() { return (this.upgradeRPBaseCost * Math.pow(PRESTIGE_COST_MULTIPLIER, this.technology.prestigeBought)); }
    metalForUpgrade(amt = 1) {
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.upgradeMetalBaseCost * (this.technology.upgrade + index + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, this.technology.prestigeBought - 1);
        }
        return cost;
    }
    polymerForUpgrade(amt = 1) {
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.upgradePolymerBaseCost * (this.technology.upgrade + index + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, this.technology.prestigeBought - 1);
        }
        return cost;
    }
    rpForUpgrade(amt = 1) {
        //  return 0 * amt * this.upgradeRPBaseCost;
        var cost = 0;
        for (let index = 0; index < amt; index++) {
            cost += this.upgradeRPBaseCost * (this.technology.upgrade + index + 1) * Math.pow(PRESTIGE_COST_MULTIPLIER, this.technology.prestigeBought - 1);
        }
        return cost;
    }
    metalForPrestige() { return (this.upgradeMetalBaseCost * Math.pow(PRESTIGE_COST_MULTIPLIER, this.technology.prestigeBought - 1)); }
    polymerForPrestige() { return (this.upgradePolymerBaseCost * Math.pow(PRESTIGE_COST_MULTIPLIER, this.technology.prestigeBought - 1)); }
    rpForPrestige() { return (this.upgradeRPBaseCost * Math.pow(PRESTIGE_COST_MULTIPLIER, this.technology.prestigeBought - 1)); }
    aetherForPrestige() { return (this.upgradeAetherBaseCost * Math.pow(PRESTIGE_COST_MULTIPLIER, this.technology.prestigeBought - 1)); }
    tooltipForUpgrade(amt = 1) { return ('Adds ' + prettify(this.getValuePerUpgrade() * amt) + ' damage per level\nMetal Cost:' + prettify(this.metalForUpgrade(amt)) + '\nPolymer Cost:' + prettify(this.polymerForUpgrade(amt)) + '\nRP Cost:' + prettify(this.rpForUpgrade(amt))); }
    tooltipForPrestige() { return ('This will improve our ' + this.name + ', but reset the upgrade level to 1, which may lower the overall ability if you have upgraded it several times\nMetal Cost:' + prettify(this.metalForPrestige()) + '\nPolymer Cost:' + prettify(this.polymerForPrestige()) + '\nRP Cost:' + prettify(this.rpForPrestige()) + '\nAether Cost:' + prettify(this.aetherForPrestige())); }
    updateUpgradeText() { this.upgradeButton.innerHTML = (this.name + ' ' + convertToRoman(this.technology.prestigeBought) + ' (' + (this.technology.upgrade) + ')'); }
    updateUpgradeTooltip() {
        this.upgradeButton.attributes.getNamedItem('title').value = this.tooltipForUpgrade();
        this.upgrade10Button.attributes.getNamedItem('title').value = this.tooltipForUpgrade(10);
    }
    updatePrestigeText() { this.prestigeButton.innerHTML = 'I'; } //   'Infuse Railgun ' + (gameData.technologies.railgunPrestigeLevelBought + 1)); },
    updatePrestigeTooltip() { this.prestigeButton.attributes.getNamedItem('title').value = this.tooltipForPrestige(); }
    canAffordUpgrade(amt = 1) { return (gameData.resources.metal >= this.metalForUpgrade(amt)) && (gameData.resources.polymer >= this.polymerForUpgrade(amt)) && (gameData.resources.researchPoints >= this.rpForUpgrade(amt)); }
    canAffordPrestige() { return (gameData.resources.metal >= this.metalForPrestige()) && (gameData.resources.polymer >= this.polymerForPrestige()) && (gameData.resources.researchPoints >= this.rpForPrestige()) && (gameData.resources.aether >= this.aetherForPrestige()); }
    getValuePerUpgrade() {
        var value = this.valuePerLevel * Math.pow(PRESTIGE_BASE_MULTIPLIER, this.technology.prestigeBought - 1) * gameData.playership.size;
        if (this.weapon) {
            value *= achievementMultiplier;
            value *= gamePerks.damager.getBonus();
        }
        else {
            value *= gamePerks.thickskin.getBonus();
        }
        if (this.name === 'Shield') {
            value *= gameBuildings.tacticalLab.getBonus();
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
        for (let index = 0; index < amt; index++) {
            if (this.canAffordUpgrade()) {
                gameData.resources.metal -= this.metalForUpgrade();
                gameData.resources.polymer -= this.polymerForUpgrade();
                gameData.resources.researchPoints -= this.rpForUpgrade();
                this.technology.upgrade++;
            }
            this.updateUpgradeText();
            this.updateUpgradeTooltip();
<<<<<<< HEAD
        }
    }
    buyPrestige() {
        if (this.canAffordPrestige()) {
            gameData.resources.metal -= this.metalForPrestige();
            gameData.resources.polymer -= this.polymerForPrestige();
            gameData.resources.researchPoints -= this.rpForPrestige();
            gameData.resources.aether -= this.aetherForPrestige();
            this.technology.prestigeBought++;
            this.technology.upgrade = 1;
            this.updatePrestigeTooltip();
            this.updateUpgradeText();
            this.updateUpgradeTooltip();
            this.updatePrestigeText();
            $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
        }
    }
=======
        }
    }
    buyPrestige() {
        if (this.canAffordPrestige()) {
            gameData.resources.metal -= this.metalForPrestige();
            gameData.resources.polymer -= this.polymerForPrestige();
            gameData.resources.researchPoints -= this.rpForPrestige();
            gameData.resources.aether -= this.aetherForPrestige();
            this.technology.prestigeBought++;
            this.technology.upgrade = 1;
            this.updatePrestigeTooltip();
            this.updateUpgradeText();
            this.updateUpgradeTooltip();
            this.updatePrestigeText();
            sortBuildings($('#buildingvisible'));
            $('#btnFight').attr('title', 'Metal Cost:' + prettify(shipMetalRequired()) + '\nPolymer Cost:' + prettify(shipPolymerRequired()));
        }
    }
>>>>>>> ae16b8823738cd3657cdf8e94a4d80c3212489b0
}
var gameEquipment = {
    railgun: new EquipmentBase('Railgun', true, RAILGUN_UPGRADE_BASE_IMPROVEMENT, RAILGUN_UPGRADE_METAL_BASE_COST, RAILGUN_UPGRADE_POLYMER_BASE_COST, RAILGUN_UPGRADE_RP_BASE_COST, RAILGUN_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(0, 0, 0), document.getElementById('btnRailgunUpgrade'), document.getElementById('btnRailgunUpgrade10'), document.getElementById('btnRailgunPrestige')),
    laser: new EquipmentBase('Laser', true, LASER_UPGRADE_BASE_IMPROVEMENT, LASER_UPGRADE_METAL_BASE_COST, LASER_UPGRADE_POLYMER_BASE_COST, LASER_UPGRADE_RP_BASE_COST, LASER_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(0, 0, 0), document.getElementById('btnLaserUpgrade'), document.getElementById('btnLaserUpgrade10'), document.getElementById('btnLaserPrestige')),
    missile: new EquipmentBase('Missile', true, MISSILE_UPGRADE_BASE_IMPROVEMENT, MISSILE_UPGRADE_METAL_BASE_COST, MISSILE_UPGRADE_POLYMER_BASE_COST, MISSILE_UPGRADE_RP_BASE_COST, MISSILE_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(0, 0, 0), document.getElementById('btnMissileUpgrade'), document.getElementById('btnMissileUpgrade10'), document.getElementById('btnMissilePrestige')),
    armor: new EquipmentBase('Armor', false, ARMOR_UPGRADE_BASE_IMPROVEMENT, ARMOR_UPGRADE_METAL_BASE_COST, ARMOR_UPGRADE_POLYMER_BASE_COST, ARMOR_UPGRADE_RP_BASE_COST, ARMOR_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(0, 0, 0), document.getElementById('btnArmorUpgrade'), document.getElementById('btnArmorUpgrade10'), document.getElementById('btnArmorPrestige')),
    shield: new EquipmentBase('Shield', false, SHIELD_UPGRADE_BASE_IMPROVEMENT, SHIELD_UPGRADE_METAL_BASE_COST, SHIELD_UPGRADE_POLYMER_BASE_COST, SHIELD_UPGRADE_RP_BASE_COST, SHIELD_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(0, 0, 0), document.getElementById('btnShieldUpgrade'), document.getElementById('btnShieldUpgrade10'), document.getElementById('btnShieldPrestige')),
    flak: new EquipmentBase('Flak', false, FLAK_UPGRADE_BASE_IMPROVEMENT, FLAK_UPGRADE_METAL_BASE_COST, FLAK_UPGRADE_POLYMER_BASE_COST, FLAK_UPGRADE_RP_BASE_COST, FLAK_UPGRADE_AETHER_BASE_COST, new EquipmentTechnology(0, 0, 0), document.getElementById('btnFlakUpgrade'), document.getElementById('btnFlakUpgrade10'), document.getElementById('btnFlakPrestige'))
};
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
        addToDisplay('I have discovered plans that will allow me to infuse lasers with aether', 'mission');
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
        addToDisplay('Shields.  Now with 8 times the shieldiness!', 'mission');
    }
    else if (mission.name === 'Flak Plans') {
        gameData.technologies.flak.prestigeUnlocked++;
        gameEquipment.flak.updateUpgradeText();
        gameEquipment.flak.updatePrestigeText();
        gameEquipment.flak.updateUpgradeTooltip();
        gameEquipment.flak.updatePrestigeTooltip();
        addToDisplay('Flak is even more flaky! Flakky? I dunno', 'mission');
    }
    else if (mission.name === 'A Gold Mine') {
        gameData.technologies.goldMine++;
        addToDisplay('With the new algorithms gained at the Gold Mine I can double all forms of production!', 'story');
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
    return rtn;
}
function gatewayClick(challengeChosen = '') {
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
function resetGame() {
    localStorage.clear();
    location.reload(true);
}
function exportsave() {
    debugText = JSON.stringify(gameData);
}
function init(passedperks, passedchallenges, gatewayReset = false, activeChallenge = '', chronoton = 0, passedAchievements = []) {
    debugText += '\nv0.7.4 - Fix to criticality challenge and numerous balance changes';
    debugText += '\nv0.7.3 - New challenge, new power techs, new power building, new gui, most things have been rebalanced';
    debugText += '\nv0.7.2 - Another new attempt at a GUI!!! and some balance issues mainly related to research';
    debugText += '\nv0.7.1 - Another new attempt at a GUI and nerfed Shields.  Changed Tactical Labs to effect shields instead of armor and flak';
    debugText += '\nv0.7.0 - Another new attempt at a GUI and fixed the power challenge to not immediately be completed.';
    debugText += '\nv0.6.9 - New GUI and some balance changes.';
    debugText += '\nv0.6.8 - added another new challenge called power that cuts power generation in half.  It is unlocked at galaxy 25 and is completed by reaching galaxy 25.  It unlocks the power ability that increases power generation by 10% additively.  Also moved the consistency challenge to level 35.';
    debugText += '\nv0.6.7 - Conversion to typescript is complete.\nThe first challenge is in the game.  It is called consistency and lowers the max damage to the min damage.  It is unlocked at galaxy 25 and is completed by reaching level 25.  It is activated on the gateway screen.  It unlocks the consistency ability which increases min damage.  When maxed out min damage will be 100% of the base damage while max damage stays at 125%.';
    debugText += '\nKnown issues and other ramblings:';
    debugText += '\n1. If the tab loses focus or is closed, when you return you will notice the game runs faster than expected until time catches up.  Enjoy this for now, eventually there will be an ability that will allow/limit this time.';
    debugText += '\n2. There are currently no tooltips for touchscreen users.';
    debugText += '\n3. There is currently no confirmation dialog on clicking the reset button under settings.  Be careful.';
    debugText += '\n4. The flavor text is basically in rough draft form complete with a few placeholders.';
    debugText += '\n5. Balance is an ongoing process and any thoughts are appreciated.';
    debugText += '\n6. Autosave is hardcoded for every five minutes.  This needs to be adjustable in settings.  And Playfab integration is coming.  One day.';
    debugText += '\n7. Current achievements are limited.';
    debugText += '\n8. I\'d like a visual representation of how far the player has advanced in the current mission/galaxy.';
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
        gameData.challenges.consistency.completed = passedchallenges.consistency.completed;
        gameData.challenges.consistency.unlocked = passedchallenges.consistency.unlocked;
        gameData.challenges.power.completed = passedchallenges.power.completed;
        gameData.challenges.power.unlocked = passedchallenges.power.unlocked;
        gameData.challenges.criticality.completed = passedchallenges.criticality.completed;
        gameData.challenges.criticality.unlocked = passedchallenges.criticality.unlocked;
        gameData.world.currentChallenge = activeChallenge;
    }
    else {
        var savegame = JSON.parse(localStorage.getItem('save'));
        if (savegame !== null) {
            if (typeof savegame.buildings.shipyard !== 'undefined')
                gameData.buildings.shipyard = savegame.buildings.shipyard;
            if (typeof savegame.buildings.factories !== 'undefined')
                gameData.buildings.factories = savegame.buildings.factories;
            if (typeof savegame.buildings.refineries !== 'undefined')
                gameData.buildings.refineries = savegame.buildings.refineries;
            if (typeof savegame.buildings.panels !== 'undefined')
                gameData.buildings.panels = savegame.buildings.panels;
            if (typeof savegame.buildings.generators !== 'undefined')
                gameData.buildings.generators = savegame.buildings.generators;
            if (typeof savegame.buildings.plants !== 'undefined')
                gameData.buildings.plants = savegame.buildings.plants;
            if (typeof savegame.buildings.aetherPlants !== 'undefined')
                gameData.buildings.aetherPlants = savegame.buildings.aetherPlants;
            if (typeof savegame.buildings.fusionPlants !== 'undefined')
                gameData.buildings.fusionPlants = savegame.buildings.fusionPlants;
            if (typeof savegame.buildings.labs !== 'undefined')
                gameData.buildings.labs = savegame.buildings.labs;
            if (typeof savegame.buildings.tacticalLabs !== 'undefined')
                gameData.buildings.tacticalLabs = savegame.buildings.tacticalLabs;
            if (typeof savegame.buildings.mines !== 'undefined')
                gameData.buildings.mines = savegame.buildings.mines;
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
            if (typeof savegame.enemyship.maxDamage !== 'undefined')
                gameData.enemyship.maxDamage = savegame.enemyship.maxDamage;
            if (typeof savegame.enemyship.minDamage !== 'undefined')
                gameData.enemyship.minDamage = savegame.enemyship.minDamage;
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
            if (typeof savegame.playership.maxDamage !== 'undefined')
                gameData.playership.maxDamage = savegame.playership.maxDamage;
            if (typeof savegame.playership.minDamage !== 'undefined')
                gameData.playership.minDamage = savegame.playership.minDamage;
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
            if (typeof savegame.technologies.metalProficiency !== 'undefined')
                gameData.technologies.metalProficiency = savegame.technologies.metalProficiency;
            if (typeof savegame.technologies.polymerProficiency !== 'undefined')
                gameData.technologies.polymerProficiency = savegame.technologies.polymerProficiency;
            if (typeof savegame.technologies.aetherProficiency !== 'undefined')
                gameData.technologies.aetherProficiency = savegame.technologies.aetherProficiency;
            if (typeof savegame.technologies.researchProficiency !== 'undefined')
                gameData.technologies.researchProficiency = savegame.technologies.researchProficiency;
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
            if (typeof savegame.technologies.flak !== 'undefined')
                gameData.technologies.flak = savegame.technologies.flak;
            if (typeof savegame.technologies.goldMine !== 'undefined')
                gameData.technologies.goldMine = savegame.technologies.goldMine;
            if (typeof savegame.technologies.panelUpgrade !== 'undefined')
                gameData.technologies.panelUpgrade = savegame.technologies.panelUpgrade;
            if (typeof savegame.technologies.generatorUpgrade !== 'undefined')
                gameData.technologies.generatorUpgrade = savegame.technologies.generatorUpgrade;
            if (typeof savegame.technologies.plantupgrade !== 'undefined')
                gameData.technologies.plantupgrade = savegame.technologies.plantupgrade;
            if (typeof savegame.technologies.aetherplantupgrade !== 'undefined')
                gameData.technologies.aetherplantupgrade = savegame.technologies.aetherplantupgrade;
            if (typeof savegame.technologies.fusionplantupgrade !== 'undefined')
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
            if (typeof savegame.achievementids !== 'undefined')
                gameData.achievementids = savegame.achievementids;
            if (typeof savegame.perks.damager !== 'undefined')
                gameData.perks.damager = savegame.perks.damager;
            if (typeof savegame.perks.looter !== 'undefined')
                gameData.perks.looter = savegame.perks.looter;
            if (typeof savegame.perks.thickskin !== 'undefined')
                gameData.perks.thickskin = savegame.perks.thickskin;
            if (typeof savegame.perks.speed !== 'undefined')
                gameData.perks.speed = savegame.perks.speed;
            if (typeof savegame.perks.producer !== 'undefined')
                gameData.perks.producer = savegame.perks.producer;
            if (typeof savegame.perks.consistency !== 'undefined')
                gameData.perks.consistency = savegame.perks.consistency;
            if (typeof savegame.perks.power !== 'undefined')
                gameData.perks.power = savegame.perks.power;
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
            if (typeof savegame.challenges.consistency.unlocked !== 'undefined')
                gameData.challenges.consistency.unlocked = savegame.challenges.consistency.unlocked;
            if (typeof savegame.challenges.power.unlocked !== 'undefined')
                gameData.challenges.power.unlocked = savegame.challenges.power.unlocked;
            if (typeof savegame.challenges.criticality.unlocked !== 'undefined')
                gameData.challenges.criticality.unlocked = savegame.challenges.criticality.unlocked;
            if (typeof savegame.challenges.consistency.completed !== 'undefined')
                gameData.challenges.consistency.completed = savegame.challenges.consistency.completed;
            if (typeof savegame.challenges.power.completed !== 'undefined')
                gameData.challenges.power.completed = savegame.challenges.power.completed;
            if (typeof savegame.challenges.criticality.completed !== 'undefined')
                gameData.challenges.criticality.completed = savegame.challenges.criticality.completed;
            if (typeof savegame.tacticalChoices !== 'undefined')
                gameData.tacticalChoices.tacticalLabsSetting = savegame.tacticalChoices.tacticalLabsSetting;
            for (let index = 0; index < gameData.missions.length; index++) {
                const element = gameData.missions[index];
                for (let enemyindex = 0; enemyindex < element.enemies.length; enemyindex++) {
                    var enemy = element.enemies[enemyindex];
                    element.enemies[enemyindex] = Object.assign(new Ship(), enemy);
                }
            }
        }
    }
    gameEquipment.railgun.technology = gameData.technologies.railgun;
    gameEquipment.laser.technology = gameData.technologies.laser;
    gameEquipment.missile.technology = gameData.technologies.missile;
    gameEquipment.armor.technology = gameData.technologies.armor;
    gameEquipment.shield.technology = gameData.technologies.shield;
    gameEquipment.flak.technology = gameData.technologies.flak;
<<<<<<< HEAD
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
    gameBuildings.mine.buildinginfo = gameData.buildings.mines;
    gameBuildings.lab.buildinginfo = gameData.buildings.labs;
    gameBuildings.factory.buildinginfo = gameData.buildings.factories;
    gameBuildings.refinery.buildinginfo = gameData.buildings.refineries;
    gameBuildings.mine.technology = gameData.technologies.metalProficiency;
    gameBuildings.lab.technology = gameData.technologies.researchProficiency;
    gameBuildings.factory.technology = gameData.technologies.polymerProficiency;
    gameBuildings.refinery.technology = gameData.technologies.aetherProficiency;
=======
>>>>>>> ae16b8823738cd3657cdf8e94a4d80c3212489b0
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
    achievementlist.push(new Achievement(27, '1 Tactical Lab', 1, function () { return gameData.buildings.tacticalLabs.count >= 1; }));
    achievementlist.push(new Achievement(28, '5 Tactical Labs', 2, function () { return gameData.buildings.tacticalLabs.count >= 5; }));
    achievementlist.push(new Achievement(29, '10 Tactical Labs', 5, function () { return gameData.buildings.tacticalLabs.count >= 10; }));
    achievementlist.push(new Achievement(30, '25 Tactical Labs', 10, function () { return gameData.buildings.tacticalLabs.count >= 25; }));
    achievementlist.push(new Achievement(31, '50 Tactical Labs', 25, function () { return gameData.buildings.tacticalLabs.count >= 50; }));
    achievementlist.push(new Achievement(32, '100 Tactical Labs', 50, function () { return gameData.buildings.tacticalLabs.count >= 100; }));
    achievementlist.push(new Achievement(33, '1000 Tactical Labs', 100, function () { return gameData.buildings.tacticalLabs.count >= 1000; }));
    achievementlist.push(new Achievement(34, '5 Panels', 1, function () { return gameData.buildings.panels.count >= 5; }));
    achievementlist.push(new Achievement(35, '10 Panels', 2, function () { return gameData.buildings.panels.count >= 10; }));
    achievementlist.push(new Achievement(36, '25 Panels', 3, function () { return gameData.buildings.panels.count >= 25; }));
    achievementlist.push(new Achievement(37, '50 Panels', 4, function () { return gameData.buildings.panels.count >= 50; }));
    achievementlist.push(new Achievement(38, '100 Panels', 5, function () { return gameData.buildings.panels.count >= 100; }));
    achievementlist.push(new Achievement(39, '1000 Panels', 20, function () { return gameData.buildings.panels.count >= 100; }));
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
    achievementlist.push(new Achievement(61, '10 Damage Reached!', 1, function () { return gameData.playership.minDamage >= 10; }));
    achievementlist.push(new Achievement(62, '100 Damage Reached!', 1, function () { return gameData.playership.minDamage >= 100; }));
    achievementlist.push(new Achievement(63, '1000 Damage Reached!', 5, function () { return gameData.playership.minDamage >= 1000; }));
    achievementlist.push(new Achievement(64, '1000000 Damage Reached!', 20, function () { return gameData.playership.minDamage >= 1000000; }));
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
    $('#btnConfirmGateway').attr('title', 'Standard Run');
    $('#btnConfirmConsistency').attr('title', gameData.challenges.consistency.description);
    $('#btnConfirmPower').attr('title', gameData.challenges.power.description);
    $('#btnConfirmCriticality').attr('title', gameData.challenges.criticality.description);
    getAchievementBonus();
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
function getAchievementBonus() {
    var rtn = 100;
    // Achievementcompleted = '';
    // Achievementuncompleted = '';
    for (let index = 0; index < achievementlist.length; index++) {
        const element = achievementlist[index];
        if (gameData.achievementids.includes(element.id)) {
            rtn += element.bonus;
            // Achievementcompleted += element.name + '; ';
        }
        else {
            // Achievementuncompleted += element.name + '; ';
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
            getAchievementBonus();
        }
    }
}
function changeLocation(mission) {
    gameData.world.paused = true;
    gameData.world.currentMission = mission;
    gameData.enemyship = gameData.missions[gameData.world.currentMission].enemies[gameData.missions[gameData.world.currentMission].zone];
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
    }
    else if (gameData.world.currentChallenge === 'Power') {
        sceninfo = gameData.challenges.power.description;
    }
    else if (gameData.world.currentChallenge === 'Criticality') {
        sceninfo = gameData.challenges.criticality.description;
    }
    document.getElementById('scenarioinfo').innerHTML = sceninfo;
    // document.getElementById('achievementbonus').innerHTML = prettify(achievementMultiplier);
    // document.getElementById('achievementcompleted').innerHTML = Achievementcompleted;
    // document.getElementById('achievementuncompleted').innerHTML = Achievementuncompleted;
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
    if (gameData.missions[0].level >= 15) {
        gameBuildings.refinery.showBuyButton();
        if (!gameData.story.refineryunlocked) {
            addToDisplay('Placeholder', 'story');
            gameData.story.refineryunlocked = true;
        }
    }
    if (gameData.missions[0].level >= 5) {
        $('#buildingsContainer').removeClass('hidden');
        $('#btnFastTacticalLab').removeClass('hidden');
        $('#btnSlowTacticalLab').removeClass('hidden');
    }
    if (gameData.tacticalChoices.tacticalLabsSetting > 0) {
        $('#btnFastTacticalLab').addClass('hidden');
        $('#btnSlowTacticalLab').addClass('hidden');
        $('#btnBuyTacticalLab').removeClass('hidden');
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
    $('#btnFight').removeClass('btn-success').addClass('btn-danger');
    if (canAffordFight()) {
        $('#btnFight').removeClass('btn-danger').addClass('btn-success');
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
    gamePerks.criticality.determineShowAffordUpgrade();
    gamePerks.criticality.determineShowBuyButton();
    if (debugText.length > 0) {
        $('#debugContainer').removeClass('hidden');
    }
    else {
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
function resetAbilities() {
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
function shipMetalRequired() {
    var total = gameEquipment.railgun.metalForShip() + gameEquipment.laser.metalForShip() + gameEquipment.missile.metalForShip() + gameEquipment.armor.metalForShip() + gameEquipment.shield.metalForShip() + gameEquipment.flak.metalForShip();
    return gameData.buildings.shipyard.count * total / 50;
}
function shipPolymerRequired() {
    var total = gameEquipment.railgun.polymerForShip() + gameEquipment.laser.polymerForShip() + gameEquipment.missile.polymerForShip() + gameEquipment.armor.polymerForShip() + gameEquipment.shield.polymerForShip() + gameEquipment.flak.polymerForShip();
    return gameData.buildings.shipyard.count * total / 50;
}
function canAffordFight() {
    return (gameData.resources.metal > shipMetalRequired() && gameData.resources.polymer > shipPolymerRequired());
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
    var powerAvailable = p1 + p2 + p3 + p4 + p5;
    if (gameData.world.currentChallenge === 'Power') {
        powerAvailable /= 2;
    }
    var facilities = gameBuildings.tacticalLab.powerSpent() + gameBuildings.mine.powerSpent() + gameBuildings.shipyard.powerSpent() + gameBuildings.factory.powerSpent() + gameBuildings.lab.powerSpent() + gameBuildings.refinery.powerSpent();
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
function chooseSlowOrFastTactical(choice) {
    gameData.tacticalChoices.tacticalLabsSetting = choice;
    $('#btnFastTacticalLab').addClass('hidden');
    $('#btnSlowTacticalLab').addClass('hidden');
    $('#btnBuyTacticalLab').removeClass('hidden');
    gameBuildings.tacticalLab.updateBuyButtonText();
    gameBuildings.tacticalLab.updateBuyButtonTooltip();
}
function buyMetalProficiency() {
    var nextMetalCost = Math.floor(METAL_PROFIECIENCY_METAL_COST * Math.pow(METAL_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought));
    var nextPolymerCost = Math.floor(METAL_PROFIECIENCY_POLYMER_COST * Math.pow(METAL_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought));
    var nextRPCost = Math.floor(METAL_PROFIECIENCY_RP_COST * Math.pow(METAL_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.metalProficiency.bought));
    if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.technologies.metalProficiency.bought < gameData.technologies.metalProficiency.unlocked && gameData.resources.researchPoints >= nextRPCost) {
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
    var nextMetalCost = Math.floor(POLYMER_PROFIECIENCY_METAL_COST * Math.pow(POLYMER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought));
    var nextPolymerCost = Math.floor(POLYMER_PROFIECIENCY_POLYMER_COST * Math.pow(POLYMER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought));
    var nextRPCost = Math.floor(POLYMER_PROFIECIENCY_RP_COST * Math.pow(POLYMER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.polymerProficiency.bought));
    if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.technologies.polymerProficiency.bought < gameData.technologies.polymerProficiency.unlocked && gameData.resources.researchPoints >= nextRPCost) {
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
    var nextMetalCost = Math.floor(RESEARCH_PROFIECIENCY_METAL_COST * Math.pow(RESEARCH_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought));
    var nextPolymerCost = Math.floor(RESEARCH_PROFIECIENCY_POLYMER_COST * Math.pow(RESEARCH_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought));
    var nextRPCost = Math.floor(RESEARCH_PROFIECIENCY_RP_COST * Math.pow(RESEARCH_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.researchProficiency.bought));
    if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.technologies.researchProficiency.bought < gameData.technologies.researchProficiency.unlocked && gameData.resources.researchPoints >= nextRPCost) {
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
    var nextMetalCost = AETHER_PROFIECIENCY_METAL_COST * Math.pow(AETHER_PROFIECIENCY_METAL_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought);
    var nextPolymerCost = AETHER_PROFIECIENCY_POLYMER_COST * Math.pow(AETHER_PROFIECIENCY_POLYMER_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought);
    var nextRPCost = AETHER_PROFIECIENCY_RP_COST * Math.pow(AETHER_PROFIECIENCY_RP_GROWTH_FACTOR, gameData.technologies.aetherProficiency.bought);
    if (gameData.resources.metal >= nextMetalCost && gameData.resources.polymer >= nextPolymerCost && gameData.technologies.aetherProficiency.bought < gameData.technologies.aetherProficiency.unlocked && gameData.resources.researchPoints >= nextRPCost) {
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
class DisplayItem {
    constructor(txt) {
        this.timeadded = new Date();
        this.txt = txt;
    }
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
    bonusspan.innerHTML = 'Damage bonus from achivements: ' + prettify(achievementMultiplier);
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
        }
        else if (gameData.missions[missionIndex].name.includes('Mine')) {
            element.classList.add('btn-warning');
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
        lootAmount: Math.pow(((mission.level - 1) * 100) + zone, 1.2) * mission.lootMultiplier * gamePerks.looter.getBonus()
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
    var lvlsCleared = (gameData.missions[0].level) * 100 + gameData.missions[0].zone; // This is actually off by 100 but it simplifies the rest of the code
    if (gameData.missions[0].zone === 99) {
        gameData.technologies.shipyardTechUnlock = gameData.missions[0].level + 1;
        addToDisplay('An upgrade to the shipyard would allow for bigger drones', 'mission');
    }
    if (gameData.missions[0].level > 3) {
        var prestigelvl = (Math.floor((gameData.missions[0].level - 1) / 3));
        if (prestigelvl >= (GetMissionNameCount('Railgun Plans') + gameData.technologies.railgun.prestigeUnlocked)) {
            gameData.missions.push(new Mission('Railgun Plans', true, 1.5, 1, gameData.missions[0].level, 100, false));
            gameData.missions.push(new Mission('Armor Plans', true, 1.5, 1, gameData.missions[0].level, 100, false));
            updateMissionButtons();
        }
        prestigelvl = (Math.floor((gameData.missions[0].level - 2) / 3));
        if (prestigelvl >= (GetMissionNameCount('Laser Plans') + gameData.technologies.laser.prestigeUnlocked)) {
            gameData.missions.push(new Mission('Laser Plans', true, 1.5, 1, gameData.missions[0].level, 100, false));
            gameData.missions.push(new Mission('Shield Plans', true, 1.5, 1, gameData.missions[0].level, 100, false));
            updateMissionButtons();
        }
        prestigelvl = (Math.floor((gameData.missions[0].level - 3) / 3));
        if (prestigelvl >= (GetMissionNameCount('Missile Plans') + gameData.technologies.missile.prestigeUnlocked)) {
            gameData.missions.push(new Mission('Missile Plans', true, 1.5, 1, gameData.missions[0].level, 100, false));
            gameData.missions.push(new Mission('Flak Plans', true, 1.5, 1, gameData.missions[0].level, 100, false));
            updateMissionButtons();
        }
    }
    if ((lvlsCleared - 27) % 1000 === 0) {
        gameData.missions.push(new Mission('A Gold Mine', true, 2, 3, gameData.missions[0].level, 100, false));
        updateMissionButtons();
        addToDisplay('I have found the locaton of an ancient Gold Mine.  It may be worth checking out.', 'story');
    }
    if (lvlsCleared === 2050) {
        gameData.missions.push(new Mission('Panel Improvement', true, 2, 1, gameData.missions[0].level, 100, false));
        updateMissionButtons();
        addToDisplay('I have found the location of plans that will improve the efficiency of our panels.', 'story');
    }
    if (lvlsCleared === 3050) {
        gameData.missions.push(new Mission('Generator Improvement', true, 2, 1, gameData.missions[0].level, 100, false));
        updateMissionButtons();
        addToDisplay('I have found the location of plans that will improve the efficiency of our generators.', 'story');
    }
    if (lvlsCleared === 4050) {
        gameData.missions.push(new Mission('Plant Improvement', true, 2, 1, gameData.missions[0].level, 100, false));
        updateMissionButtons();
        addToDisplay('I have found the location of plans that will improve the efficiency of our panels.', 'story');
    }
    if (lvlsCleared === 5050) {
        gameData.missions.push(new Mission('Aether Plant Improvement', true, 2, 1, gameData.missions[0].level, 100, false));
        updateMissionButtons();
        addToDisplay('I have found the location of plans that will improve the efficiency of our panels.', 'story');
    }
    if (lvlsCleared === 2099) {
        gameData.missions.push(new Mission('The Gateway', true, 2, 1, 20, 100, false));
        updateMissionButtons();
        addToDisplay('This site is putting off unusual power readings.  I don\'t know what it is, perhaps exploration is in order.', 'story');
    }
    if (lvlsCleared === 207) {
        gameData.technologies.laser.prestigeUnlocked = 1;
        gameData.technologies.laser.prestigeBought = 1;
        gameData.technologies.laser.upgrade = 1;
        gameEquipment.laser.updateUpgradeText();
        gameEquipment.laser.updateUpgradeTooltip();
        addToDisplay('As more capabilities come online I am finding new ways to take enemies offline.  I have rediscovered lasers.', 'story');
    }
    if (lvlsCleared === 274) {
        gameData.technologies.shield.prestigeUnlocked = 1;
        gameData.technologies.shield.prestigeBought = 1;
        gameData.technologies.shield.upgrade = 1;
        gameEquipment.shield.updateUpgradeText();
        gameEquipment.shield.updateUpgradeTooltip();
        addToDisplay('I have found the plans to allow us to add shields to drones.  This should increase their survivability.', 'story');
    }
    if (lvlsCleared === 327) {
        gameData.technologies.missile.prestigeUnlocked = 1;
        gameData.technologies.missile.prestigeBought = 1;
        gameData.technologies.missile.upgrade = 1;
        gameEquipment.missile.updateUpgradeText();
        gameEquipment.missile.updateUpgradeTooltip();
        addToDisplay('Missiles.  Maybe this will force them to talk.', 'story');
    }
    if (lvlsCleared === 371) {
        gameData.technologies.flak.prestigeUnlocked = 1;
        gameData.technologies.flak.prestigeBought = 1;
        gameData.technologies.flak.upgrade = 1;
        gameEquipment.flak.updateUpgradeText();
        gameEquipment.flak.updateUpgradeTooltip();
        addToDisplay('Rudimentary plans for a new defense system have been found. Flak is online.', 'story');
    }
    if ((lvlsCleared - 100) % 400 === 0 && lvlsCleared > 200) {
        gameData.missions.push(new Mission('Aether Mine ' + prettify(Math.floor((lvlsCleared - 100) / 400)), true, 2, 3, gameData.missions[0].level, 100, false));
        updateMissionButtons();
        addToDisplay('There\'s an aether mine. We should stock up.', 'story');
    }
    if ((gameData.technologies.metalProficiency.unlocked < Math.floor((lvlsCleared - 9) / 100))) {
        gameData.technologies.metalProficiency.unlocked = gameData.missions[0].level;
        addToDisplay('I\'m gonna need a bigger pickaxe.', 'story');
    }
    if ((gameData.technologies.polymerProficiency.unlocked < Math.floor((lvlsCleared - 19) / 100))) {
        gameData.technologies.polymerProficiency.unlocked = gameData.missions[0].level;
        addToDisplay('Plastics are my life.', 'story');
    }
    if (gameData.technologies.researchProficiency.unlocked < Math.floor((lvlsCleared - 29) / 100)) {
        gameData.technologies.researchProficiency.unlocked = Math.floor((lvlsCleared - 29) / 100);
        addToDisplay('Smarter I can become', 'story');
    }
    if (gameData.technologies.aetherProficiency.unlocked < Math.floor((lvlsCleared - 1539) / 100)) {
        gameData.technologies.aetherProficiency.unlocked = Math.floor((lvlsCleared - 1539) / 100);
        addToDisplay('Aether can be improved', 'story');
    }
    if ((gameData.missions[0].level >= 1) && (gameData.missions[0].zone >= 5) && gameData.technologies.autofightUnlock < 1) {
        gameData.technologies.autofightUnlock = 1;
        addToDisplay('Automating drone deployment will free up resources.', 'mission');
    }
    if (gameData.missions[0].level > 20 && gameData.missions[0].zone === 99) {
        giveChronotonFragments((gameData.missions[0].level - 11) * Math.pow(1.01, (gameData.missions[0].level - 25)));
    }
    gameData.challenges.consistency.checkForUnlock(gameData.missions[0].level);
    gameData.challenges.power.checkForUnlock(gameData.missions[0].level);
    gameData.challenges.criticality.checkForUnlock(gameData.missions[0].level);
    if (gameData.world.currentChallenge === 'Consistency') {
        gameData.challenges.consistency.checkForCompletion(gameData.missions[0].level, document.getElementById('btnConfirmConsistency'));
    }
    else if (gameData.world.currentChallenge === 'Power') {
        gameData.challenges.power.checkForCompletion(gameData.missions[0].level, document.getElementById('btnConfirmPower'));
    }
    else if (gameData.world.currentChallenge === 'Criticality') {
        gameData.challenges.criticality.checkForCompletion(gameData.missions[0].level, document.getElementById('btnConfirmCriticality'));
    }
}
function convertToRoman(num) {
    var rtn = '';
    var currentValue = num;
    while (currentValue >= 5000) {
        rtn += 'F';
        currentValue -= 5000;
    }
    while (currentValue >= 4000) {
        rtn += 'MF';
        currentValue -= 4000;
    }
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
window.setInterval(function () {
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
        xhr.onreadystatechange = function () {
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
                    gameData.enemyship.attack(gameData.playership);
                    gameData.playership.attack(gameData.enemyship);
                }
                else {
                    gameData.playership.attack(gameData.enemyship);
                    gameData.enemyship.attack(gameData.playership);
                }
                if (gameData.playership.hitPoints <= 0) { // We dead
                    addToDisplay('The drone is no longer on the sensors', 'combat');
                }
            }
            else {
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
//# sourceMappingURL=main.js.map