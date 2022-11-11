class Story {
    constructor(text) {
        this.text = text;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ChooseTutorial() {
    // if (numberOfTowerLevelsBought() < 3) {
    //   display.addToDisplay(gameData.storyElements[0].text, DisplayCategory.Tutorial);
    //   return;
    // }
    // if (gameData.derivatives[0].owned.lessThan(3)) {
    //   display.addToDisplay(gameData.storyElements[1].text, DisplayCategory.Tutorial);
    //   return;
    // }
    // if (numberOfTowerLevelsBought() < 16) {
    //   display.addToDisplay(gameData.storyElements[2].text, DisplayCategory.Tutorial);
    //   return;
    // }
    // if (gameData.resources.dust.amount.lessThan(5)) {
    //   display.addToDisplay(gameData.storyElements[3].text, DisplayCategory.Tutorial);
    //   return;
    // }
    // if (gameData.resources.pebbles.amount.lessThan(10)) {
    //   display.addToDisplay(gameData.storyElements[4].text, DisplayCategory.Tutorial);
    // }
    // if (gameData.world.highestWaveCompleted >= 20 && getChallengesCompleted() === 0) {
    //   display.addToDisplay(gameData.storyElements[5].text, DisplayCategory.Tutorial);
    // }
    // display.addToDisplay(gameData.storyElements[6].text, DisplayCategory.Tutorial);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SaveGameData {
    // automation: Automation[];
    constructor(name) {
        this.name = name;
        this.version = 4;
        // this.dummyChallenge = new Challenge('d', 'd,', 'd', 0, 0);
        // this.dummyUpgrade = new Upgrade('d', 'd', 0, 1, new Resource('d'), document.getElementById('btnBuyUpgrade0'), 0, false);
        this.stats = {
            prestige1: 0,
            prestige2: 0,
            prestige3: 0,
            prestige1ticks: 0,
            prestige2ticks: 0,
            prestige3ticks: 0,
            bestPrestige1Rate: new JBDecimal(0),
            bestPrestige2Rate: new JBDecimal(0),
            bestPrestige3Rate: new JBDecimal(0),
            highestEverWave: 0,
            last10Prestige1amounts: [],
            last10Prestige1times: [],
            last10Prestige1tier: [],
            last10Prestige1waves: [],
            last10Prestige2amounts: [],
            last10Prestige2times: [],
            last10Prestige3amounts: [],
            last10Prestige3times: [],
        };
        this.enemies = [];
        this.options = {
            logNotBase: 1,
            standardNotation: 1,
        };
        this.resources = {
            wood: new Resource('Wood'),
            stone: new Resource('Stone'),
            people: new Resource('People'),
            essence: new Resource('Essence'),
            powder: new Resource('Powder'),
            pebble: new Resource('Pebbles'),
            rock: new Resource('Rocks'),
            shards: new Resource('Shards'),
            food: new Resource('Food'),
            arrow: new Resource('Arrow'),
            redResearch: new Resource('RedResearch'),
        };
        this.buildings = [];
        this.world = {
            timeElapsed: 0,
            paused: false,
            currentTickLength: 0,
            lastProcessTick: new Date(),
            nextSaveGameTime: new Date(),
            currentWave: 0,
            currentTier: 1,
            tierUnlocked: 1,
            highestWaveCompleted: 0,
            enemiesToSpawn: 0,
            ticksToNextSpawn: 1000,
            ticksToNextWave: 0,
            spawnsRemaining: [],
            mulligansused: 0,
            autoChallenge: false,
            nextAutoChallenge: 0,
            deathLevel: 0,
            equipmentEarned: false,
        };
        for (let index = 0; index <= 32; index++) {
            this.world.spawnsRemaining.push(0);
        }
        this.world.nextSaveGameTime.setMilliseconds(this.world.nextSaveGameTime.getMilliseconds() + 1000 * 60 * 5);
        this.powderUpgrades = [];
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[0].active = true;
        this.powderUpgrades[0].addedLimitElgible = true;
        this.powderUpgrades[0].buyButton = document.getElementById('btnBuyUpgrade0');
        this.powderUpgrades[0].description = 'Arrow Tower + 10% multiplicative<br />';
        this.powderUpgrades[0].limit = 15;
        this.powderUpgrades[0].name = 'Upgrade0';
        this.powderUpgrades[0].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[0].powderCostMultiplierPer = 1.5;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[1].active = true;
        this.powderUpgrades[1].addedLimitElgible = true;
        this.powderUpgrades[1].buyButton = document.getElementById('btnBuyUpgrade1');
        this.powderUpgrades[1].description = 'Essence + 10% multiplicative<br />';
        this.powderUpgrades[1].limit = 15;
        this.powderUpgrades[1].name = 'Upgrade1';
        this.powderUpgrades[1].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[1].powderCostMultiplierPer = 1.5;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[2].active = true;
        this.powderUpgrades[2].addedLimitElgible = true;
        this.powderUpgrades[2].buyButton = document.getElementById('btnBuyUpgrade2');
        this.powderUpgrades[2].description = 'Wood + 10% multiplicative<br />';
        this.powderUpgrades[2].limit = 15;
        this.powderUpgrades[2].name = 'Upgrade2';
        this.powderUpgrades[2].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[2].powderCostMultiplierPer = 1.5;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[3].active = true;
        this.powderUpgrades[3].addedLimitElgible = true;
        this.powderUpgrades[3].buyButton = document.getElementById('btnBuyUpgrade3');
        this.powderUpgrades[3].description = 'placeholder<br />';
        this.powderUpgrades[3].limit = 15;
        this.powderUpgrades[3].name = 'Upgrade3';
        this.powderUpgrades[3].powderCostPer = new JBDecimal(1000000);
        this.powderUpgrades[3].powderCostMultiplierPer = 1.4;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[4].active = true;
        this.powderUpgrades[4].addedLimitElgible = false;
        this.powderUpgrades[4].buyButton = document.getElementById('btnBuyUpgrade4');
        this.powderUpgrades[4].description = 'Powder cost one less essence<br />';
        this.powderUpgrades[4].limit = 10;
        this.powderUpgrades[4].name = 'Upgrade4';
        this.powderUpgrades[4].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[4].powderCostMultiplierPer = 0;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[5].active = true;
        this.powderUpgrades[5].addedLimitElgible = false;
        this.powderUpgrades[5].buyButton = document.getElementById('btnBuyUpgrade5');
        this.powderUpgrades[5].description = 'Housing +100% additive<br />';
        this.powderUpgrades[5].limit = 10;
        this.powderUpgrades[5].name = 'Upgrade5';
        this.powderUpgrades[5].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[5].powderCostMultiplierPer = 2;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[6].active = true;
        this.powderUpgrades[6].addedLimitElgible = false;
        this.powderUpgrades[6].buyButton = document.getElementById('btnBuyUpgrade6');
        this.powderUpgrades[6].description = 'Fletcher +10% multipliative<br />';
        this.powderUpgrades[6].limit = 10;
        this.powderUpgrades[6].name = 'Upgrade6';
        this.powderUpgrades[6].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[6].powderCostMultiplierPer = 2;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[7].active = true;
        this.powderUpgrades[7].addedLimitElgible = false;
        this.powderUpgrades[7].buyButton = document.getElementById('btnBuyUpgrade7');
        this.powderUpgrades[7].description = 'Bonus to producers from current run time<br />';
        this.powderUpgrades[7].limit = 1;
        this.powderUpgrades[7].name = 'Upgrade7';
        this.powderUpgrades[7].powderCostPer = new JBDecimal(10);
        this.powderUpgrades[7].powderCostMultiplierPer = 2;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[8].active = true;
        this.powderUpgrades[8].addedLimitElgible = false;
        this.powderUpgrades[8].buyButton = document.getElementById('btnBuyUpgrade8');
        this.powderUpgrades[8].description = 'Each Arrow Tower level bought increases strength by 1% multiplicative';
        this.powderUpgrades[8].limit = 1;
        this.powderUpgrades[8].name = 'Upgrade8';
        this.powderUpgrades[8].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[8].powderCostMultiplierPer = 2;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[9].active = true;
        this.powderUpgrades[9].addedLimitElgible = false;
        this.powderUpgrades[9].buyButton = document.getElementById('btnBuyUpgrade9');
        this.powderUpgrades[9].description = 'Bonus to producers from prestige count<br />';
        this.powderUpgrades[9].limit = 1;
        this.powderUpgrades[9].name = 'Upgrade9';
        this.powderUpgrades[9].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[9].powderCostMultiplierPer = 2;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[10].active = true;
        this.powderUpgrades[10].addedLimitElgible = true;
        this.powderUpgrades[10].buyButton = document.getElementById('btnBuyUpgrade10');
        this.powderUpgrades[10].description = 'Population growth +10% multiplicative<br />';
        this.powderUpgrades[10].limit = 15;
        this.powderUpgrades[10].name = 'Upgrade10';
        this.powderUpgrades[10].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[10].powderCostMultiplierPer = 2.5;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[11].active = true;
        this.powderUpgrades[11].addedLimitElgible = false;
        this.powderUpgrades[11].buyButton = document.getElementById('btnBuyUpgrade11');
        this.powderUpgrades[11].description = 'Mulligans + 1<br />';
        this.powderUpgrades[11].limit = 10;
        this.powderUpgrades[11].name = 'Upgrade11';
        this.powderUpgrades[11].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[11].powderCostMultiplierPer = 10;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[12].active = true;
        this.powderUpgrades[12].addedLimitElgible = true;
        this.powderUpgrades[12].buyButton = document.getElementById('btnBuyUpgrade12');
        this.powderUpgrades[12].description = 'Stone + 10% multiplicative<br />';
        this.powderUpgrades[12].limit = 15;
        this.powderUpgrades[12].name = 'Upgrade12';
        this.powderUpgrades[12].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[12].powderCostMultiplierPer = 1.5;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[13].active = true;
        this.powderUpgrades[13].addedLimitElgible = true;
        this.powderUpgrades[13].buyButton = document.getElementById('btnBuyUpgrade13');
        this.powderUpgrades[13].description = 'Red Research + 10% multiplicative<br />';
        this.powderUpgrades[13].limit = 15;
        this.powderUpgrades[13].name = 'Upgrade13';
        this.powderUpgrades[13].powderCostPer = new JBDecimal(10);
        this.powderUpgrades[13].powderCostMultiplierPer = 1.5;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[14].active = true;
        this.powderUpgrades[14].addedLimitElgible = true;
        this.powderUpgrades[14].buyButton = document.getElementById('btnBuyUpgrade14');
        this.powderUpgrades[14].description = 'Each Lumberjack level bought increases production by 1%';
        this.powderUpgrades[14].limit = 10;
        this.powderUpgrades[14].name = 'Upgrade14';
        this.powderUpgrades[14].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[14].powderCostMultiplierPer = 1.5;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[15].active = true;
        this.powderUpgrades[15].addedLimitElgible = true;
        this.powderUpgrades[15].buyButton = document.getElementById('btnBuyUpgrade15');
        this.powderUpgrades[15].description = 'Each Stone Mason level bought increases production by 1%';
        this.powderUpgrades[15].limit = 10;
        this.powderUpgrades[15].name = 'Upgrade15';
        this.powderUpgrades[15].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[15].powderCostMultiplierPer = 1.5;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[16].active = true;
        this.powderUpgrades[16].addedLimitElgible = true;
        this.powderUpgrades[16].buyButton = document.getElementById('btnBuyUpgrade16');
        this.powderUpgrades[16].description = 'Catapults + 10% multiplicative<br />';
        this.powderUpgrades[16].limit = 15;
        this.powderUpgrades[16].name = 'Upgrade16';
        this.powderUpgrades[16].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[16].powderCostMultiplierPer = 1.5;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[17].active = true;
        this.powderUpgrades[17].addedLimitElgible = true;
        this.powderUpgrades[17].buyButton = document.getElementById('btnBuyUpgrade17');
        this.powderUpgrades[17].description = 'Each Catapult level bought increases attack by 1%';
        this.powderUpgrades[17].limit = 1;
        this.powderUpgrades[17].name = 'Upgrade17';
        this.powderUpgrades[17].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[17].powderCostMultiplierPer = 1.5;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[18].active = true;
        this.powderUpgrades[18].addedLimitElgible = true;
        this.powderUpgrades[18].buyButton = document.getElementById('btnBuyUpgrade18');
        this.powderUpgrades[18].description = 'Each Red Research Lab level bought increases production by 1%';
        this.powderUpgrades[18].limit = 10;
        this.powderUpgrades[18].name = 'Upgrade18';
        this.powderUpgrades[18].powderCostPer = new JBDecimal(1);
        this.powderUpgrades[18].powderCostMultiplierPer = 1.6;
        this.powderUpgrades.push(new Upgrade());
        this.powderUpgrades[19].active = true;
        this.powderUpgrades[19].addedLimitElgible = false;
        this.powderUpgrades[19].buyButton = document.getElementById('btnBuyUpgrade19');
        this.powderUpgrades[19].description = 'Each Fletcher bought increases production by 1% multiplicative';
        this.powderUpgrades[19].limit = 10;
        this.powderUpgrades[19].name = 'Upgrade19';
        this.powderUpgrades[19].powderCostPer = new JBDecimal(10);
        this.powderUpgrades[19].powderCostMultiplierPer = 1.5;
        this.pebbleUpgrades = [];
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[0].active = true;
        this.pebbleUpgrades[0].addedLimitElgible = true;
        this.pebbleUpgrades[0].buyButton = document.getElementById('btnBuyPebbleUpgrade0');
        this.pebbleUpgrades[0].description = 'Reduce cost of powder by one essence<br />';
        this.pebbleUpgrades[0].limit = 10;
        this.pebbleUpgrades[0].name = 'Upgrade0';
        this.pebbleUpgrades[0].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[0].pebbleCostMultiplierPer = 0;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[1].active = true;
        this.pebbleUpgrades[1].addedLimitElgible = true;
        this.pebbleUpgrades[1].buyButton = document.getElementById('btnBuyPebbleUpgrade1');
        this.pebbleUpgrades[1].description = 'Double Arrow Attack<br />';
        this.pebbleUpgrades[1].limit = 10;
        this.pebbleUpgrades[1].name = 'Upgrade1';
        this.pebbleUpgrades[1].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[1].pebbleCostMultiplierPer = 8;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[2].active = true;
        this.pebbleUpgrades[2].addedLimitElgible = true;
        this.pebbleUpgrades[2].buyButton = document.getElementById('btnBuyPebbleUpgrade2');
        this.pebbleUpgrades[2].description = 'Double Catapult Attack<br />';
        this.pebbleUpgrades[2].limit = 10;
        this.pebbleUpgrades[2].name = 'Upgrade2';
        this.pebbleUpgrades[2].pebbleCostPer = new JBDecimal(2);
        this.pebbleUpgrades[2].pebbleCostMultiplierPer = 9;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[3].active = true;
        this.pebbleUpgrades[3].addedLimitElgible = true;
        this.pebbleUpgrades[3].buyButton = document.getElementById('btnBuyPebbleUpgrade3');
        this.pebbleUpgrades[3].description = 'Double Poison Attack<br />';
        this.pebbleUpgrades[3].limit = 10;
        this.pebbleUpgrades[3].name = 'Upgrade3';
        this.pebbleUpgrades[3].pebbleCostPer = new JBDecimal(3);
        this.pebbleUpgrades[3].pebbleCostMultiplierPer = 10;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[4].active = true;
        this.pebbleUpgrades[4].addedLimitElgible = true;
        this.pebbleUpgrades[4].buyButton = document.getElementById('btnBuyPebbleUpgrade4');
        this.pebbleUpgrades[4].description = 'Double Essence gain<br />';
        this.pebbleUpgrades[4].limit = 1;
        this.pebbleUpgrades[4].name = 'Upgrade4';
        this.pebbleUpgrades[4].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[4].pebbleCostMultiplierPer = 2;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[5].active = true;
        this.pebbleUpgrades[5].addedLimitElgible = true;
        this.pebbleUpgrades[5].buyButton = document.getElementById('btnBuyPebbleUpgrade5');
        this.pebbleUpgrades[5].description = 'Increase effectiveness of Inflation Challenge completions';
        this.pebbleUpgrades[5].limit = 10;
        this.pebbleUpgrades[5].name = 'Upgrade5';
        this.pebbleUpgrades[5].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[5].pebbleCostMultiplierPer = 8;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[6].active = true;
        this.pebbleUpgrades[6].addedLimitElgible = true;
        this.pebbleUpgrades[6].buyButton = document.getElementById('btnBuyPebbleUpgrade6');
        this.pebbleUpgrades[6].description = 'Increase upgrade limits of certain powder upgrades';
        this.pebbleUpgrades[6].limit = 1;
        this.pebbleUpgrades[6].name = 'Upgrade6';
        this.pebbleUpgrades[6].pebbleCostPer = new JBDecimal(10);
        this.pebbleUpgrades[6].pebbleCostMultiplierPer = 1;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[7].active = true;
        this.pebbleUpgrades[7].addedLimitElgible = true;
        this.pebbleUpgrades[7].buyButton = document.getElementById('btnBuyPebbleUpgrade7');
        this.pebbleUpgrades[7].description = 'Each run begins with 10000 wood<br />';
        this.pebbleUpgrades[7].limit = 1;
        this.pebbleUpgrades[7].name = 'Upgrade7';
        this.pebbleUpgrades[7].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[7].pebbleCostMultiplierPer = 1;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[8].active = true;
        this.pebbleUpgrades[8].addedLimitElgible = true;
        this.pebbleUpgrades[8].buyButton = document.getElementById('btnBuyPebbleUpgrade8');
        this.pebbleUpgrades[8].description = 'Each poison bought increases its production by 1% multiplicative';
        this.pebbleUpgrades[8].limit = 1;
        this.pebbleUpgrades[8].name = 'Upgrade8';
        this.pebbleUpgrades[8].pebbleCostPer = new JBDecimal(10);
        this.pebbleUpgrades[8].pebbleCostMultiplierPer = 1;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[9].active = true;
        this.pebbleUpgrades[9].addedLimitElgible = true;
        this.pebbleUpgrades[9].buyButton = document.getElementById('btnBuyPebbleUpgrade9');
        this.pebbleUpgrades[9].description = 'Increase shooting speed bonus from challenge completions';
        this.pebbleUpgrades[9].limit = 1;
        this.pebbleUpgrades[9].name = 'Upgrade9';
        this.pebbleUpgrades[9].pebbleCostPer = new JBDecimal(10);
        this.pebbleUpgrades[9].pebbleCostMultiplierPer = 1;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[10].active = true;
        this.pebbleUpgrades[10].addedLimitElgible = true;
        this.pebbleUpgrades[10].buyButton = document.getElementById('btnBuyPebbleUpgrade10');
        this.pebbleUpgrades[10].description = 'Each wave contains one fewer drone<br />';
        this.pebbleUpgrades[10].limit = 100;
        this.pebbleUpgrades[10].name = 'Upgrade10';
        this.pebbleUpgrades[10].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[10].pebbleCostMultiplierPer = 0;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[11].active = true;
        this.pebbleUpgrades[11].addedLimitElgible = true;
        this.pebbleUpgrades[11].buyButton = document.getElementById('btnBuyPebbleUpgrade11');
        this.pebbleUpgrades[11].description = 'Unlock Prioritize healer tactic<br />';
        this.pebbleUpgrades[11].limit = 1;
        this.pebbleUpgrades[11].name = 'Upgrade11';
        this.pebbleUpgrades[11].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[11].pebbleCostMultiplierPer = 2;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[12].active = true;
        this.pebbleUpgrades[12].addedLimitElgible = true;
        this.pebbleUpgrades[12].buyButton = document.getElementById('btnBuyPebbleUpgrade12');
        this.pebbleUpgrades[12].description = 'Begin with 100 people<br />';
        this.pebbleUpgrades[12].limit = 1;
        this.pebbleUpgrades[12].name = 'Upgrade12';
        this.pebbleUpgrades[12].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[12].pebbleCostMultiplierPer = 2;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[13].active = true;
        this.pebbleUpgrades[13].addedLimitElgible = true;
        this.pebbleUpgrades[13].buyButton = document.getElementById('btnBuyPebbleUpgrade13');
        this.pebbleUpgrades[13].description = 'Recieve a bonus to raw materials from the unemployed';
        this.pebbleUpgrades[13].limit = 1;
        this.pebbleUpgrades[13].name = 'Upgrade13';
        this.pebbleUpgrades[13].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[13].pebbleCostMultiplierPer = 2;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[14].active = true;
        this.pebbleUpgrades[14].addedLimitElgible = false;
        this.pebbleUpgrades[14].buyButton = document.getElementById('btnBuyPebbleUpgrade14');
        this.pebbleUpgrades[14].description = 'Each Arrow Tower level bought increases strength by 1% multiplicative';
        this.pebbleUpgrades[14].limit = 1;
        this.pebbleUpgrades[14].name = 'Upgrade14';
        this.pebbleUpgrades[14].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[14].pebbleCostMultiplierPer = 2;
        this.pebbleUpgrades.push(new Upgrade());
        this.pebbleUpgrades[15].active = true;
        this.pebbleUpgrades[15].addedLimitElgible = false;
        this.pebbleUpgrades[15].buyButton = document.getElementById('btnBuyPebbleUpgrade15');
        this.pebbleUpgrades[15].description = 'Each Catapult level bought increases strength by 1% multiplicative';
        this.pebbleUpgrades[15].limit = 1;
        this.pebbleUpgrades[15].name = 'Upgrade15';
        this.pebbleUpgrades[15].pebbleCostPer = new JBDecimal(1);
        this.pebbleUpgrades[15].pebbleCostMultiplierPer = 2;
        // this.rockUpgrades.push(new Upgrade('Upgrade12', 'Increase Shield Break * 2<br />', 1000, 10, this.resources.rocks, document.getElementById('btnBuyRockUpgrade12'), 10, false));
        // this.rockUpgrades.push(new Upgrade('Upgrade20', 'Reduce cost of rocks by one pebble<br />', 1, 0, this.resources.rocks, document.getElementById('btnBuyRockUpgrade20'), 100, false));
        this.rockUpgrades = [];
        this.rockUpgrades.push(new Upgrade());
        this.rockUpgrades[0].active = true;
        this.rockUpgrades[0].addedLimitElgible = true;
        this.rockUpgrades[0].buyButton = document.getElementById('btnBuyRockUpgrade0');
        this.rockUpgrades[0].description = 'Lower Challenge requirements<br />';
        this.rockUpgrades[0].limit = 1;
        this.rockUpgrades[0].name = 'Upgrade0';
        this.rockUpgrades[0].rockCostPer = new JBDecimal(1);
        this.rockUpgrades[0].rockCostMultiplierPer = 10;
        // this.boulderUpgrades.push(new Upgrade('Upgrade0', 'Lower Challenge requirements<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade0'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade1', 'Reduce cost of rocks by one pebble<br />', 1, 0, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade1'), 100, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade2', 'Increase upgrade limits on certain pebble upgrades', 10, 1, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade2'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade3', 'Double Production of all metal producers<br />', 1, 1, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade3'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade4', 'Double bonus from Gun Attack upgrade<br />', 1, 8, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade4'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade5', 'Gain Pebbles from 1% of dust every second<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade5'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade6', 'Increase effectiveness of Crits Challenge<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade6'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade7', 'Add 1 to Crit Multiplier<br />', 10, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade7'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade8', 'Increase Shield Break * 2<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade8'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade9', 'Increase Poison Effectiveness<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade9'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade10', 'Double bonus from Missile Attack upgrade<br />', 2, 9, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade10'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade11', 'Double bonus from Cannon Attack upgrade<br />', 3, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade11'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade12', 'Reduce cost of pebbles by one dust<br />', 1, 0, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade12'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade13', 'Double bonus from Heavy Gun Attack upgrade', 4, 11, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade13'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade14', 'Double bonus from Railgun Attack upgrade<br />', 6, 13, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade14'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade15', 'Double bonus from Torpedo Attack upgrade<br />', 5, 12, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade15'), 10, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade16', 'Increase maximum Gun towers by 1<br />', 1000, 2, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade16'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade17', 'Increase maximum Missile towers by 1<br />', 2000, 2.1, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade17'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade18', 'Increase maximum Cannon towers by 1<br />', 3000, 2.2, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade18'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade19', 'Increase maximum Heavy Gun towers by 1<br />', 4000, 2.3, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade19'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade20', 'Increase maximum Torpedo towers by 1<br />', 5000, 2.4, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade20'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade21', 'Increase maximum Railgun towers by 1<br />', 6000, 2.5, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade21'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade22', 'Speed up early waves<br />', 10000, 1, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade22'), 1, false));
        // this.boulderUpgrades.push(new Upgrade('Upgrade23', 'Improve Skill Deterioration<br />', 100, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade23'), 10, false));
        this.researches = [];
        this.researches.push(new Upgrade());
        this.researches[0].active = true;
        this.researches[0].addedLimitElgible = false;
        this.researches[0].buyButton = document.getElementById('btnBuyResearch0');
        this.researches[0].description = 'Upgrade Arrows to stone head.<br>(-1 stone per Arrow)(+1 base damage)';
        this.researches[0].limit = 1;
        this.researches[0].name = 'Research0';
        this.researches[0].redResearchPer = new JBDecimal(100);
        this.researches[0].redResearchMultiplier = 1;
        this.researches.push(new Upgrade());
        this.researches[1].active = true;
        this.researches[1].addedLimitElgible = false;
        this.researches[1].buyButton = document.getElementById('btnBuyResearch1');
        this.researches[1].description = 'Arrows +10% damage multiplicative<br />';
        this.researches[1].limit = 0;
        this.researches[1].name = 'Research1';
        this.researches[1].redResearchPer = new JBDecimal(15);
        this.researches[1].redResearchMultiplier = 1.75;
        this.researches.push(new Upgrade());
        this.researches[2].active = true;
        this.researches[2].addedLimitElgible = false;
        this.researches[2].buyButton = document.getElementById('btnBuyResearch2');
        this.researches[2].description = 'Triple Catapult Damage<br />';
        this.researches[2].limit = 1;
        this.researches[2].name = 'Research2';
        this.researches[2].redResearchPer = new JBDecimal(10000);
        this.researches[2].redResearchMultiplier = 1.4;
        this.researches.push(new Upgrade());
        this.researches[3].active = true;
        this.researches[3].addedLimitElgible = true;
        this.researches[3].buyButton = document.getElementById('btnBuyResearch3');
        this.researches[3].description = 'Housing +100% additive<br />';
        this.researches[3].limit = 15;
        this.researches[3].name = 'Research3';
        this.researches[3].redResearchPer = new JBDecimal(10);
        this.researches[3].redResearchMultiplier = 2.5;
        this.researches.push(new Upgrade());
        this.researches[4].active = true;
        this.researches[4].addedLimitElgible = false;
        this.researches[4].buyButton = document.getElementById('btnBuyResearch4');
        this.researches[4].description = 'Wood production +10% multiplicative<br />';
        this.researches[4].limit = 0;
        this.researches[4].name = 'Research4';
        this.researches[4].redResearchPer = new JBDecimal(10);
        this.researches[4].redResearchMultiplier = 1.3;
        this.researches.push(new Upgrade());
        this.researches[5].active = true;
        this.researches[5].addedLimitElgible = false;
        this.researches[5].buyButton = document.getElementById('btnBuyResearch5');
        this.researches[5].description = 'Stone production +10% multiplicative<br />';
        this.researches[5].limit = 0;
        this.researches[5].name = 'Research5';
        this.researches[5].redResearchPer = new JBDecimal(10);
        this.researches[5].redResearchMultiplier = 1.3;
        this.researches.push(new Upgrade());
        this.researches[6].active = true;
        this.researches[6].addedLimitElgible = false;
        this.researches[6].buyButton = document.getElementById('btnBuyResearch6');
        this.researches[6].description = 'Poison +10% multiplicative<br />';
        this.researches[6].limit = 0;
        this.researches[6].name = 'Research6';
        this.researches[6].redResearchPer = new JBDecimal(25);
        this.researches[6].redResearchMultiplier = 1.75;
        this.researches.push(new Upgrade());
        this.researches[7].active = true;
        this.researches[7].addedLimitElgible = false;
        this.researches[7].buyButton = document.getElementById('btnBuyResearch7');
        this.researches[7].description = 'Fletcher +10% multiplicative<br />';
        this.researches[7].limit = 0;
        this.researches[7].name = 'Research7';
        this.researches[7].redResearchPer = new JBDecimal(30);
        this.researches[7].redResearchMultiplier = 1.3;
        this.researches.push(new Upgrade());
        this.researches[8].active = true;
        this.researches[8].addedLimitElgible = false;
        this.researches[8].buyButton = document.getElementById('btnBuyResearch8');
        this.researches[8].description = 'Catapult +10% damage multiplicative<br />';
        this.researches[8].limit = 0;
        this.researches[8].name = 'Research8';
        this.researches[8].redResearchPer = new JBDecimal(20);
        this.researches[8].redResearchMultiplier = 1.75;
        this.challenges = [];
        this.challenges.push(new Challenge('Inflation', 'Inflation starts at 1', 'Inflation starts 5 percent later per completion', 5, 5));
        this.challenges.push(new Challenge('Shooting Speed', 'Shooting Speed is set to minimum', 'Increase shooting speed', 20, 10));
        this.challenges.push(new Challenge('Range', 'Tower Range is set to minimum', 'Increase Tower Range', 20, 10));
        this.challenges.push(new Challenge('Poison', 'No Poison Tower', 'Unlock and improve Poison Tower', 25, 10));
        this.challenges.push(new Challenge('Slow', 'Slow tower disabled', 'Slow Tower unlocked and improved', 30, 15));
        this.challenges.push(new Challenge('Crits', 'Critical Attacks are disabled', 'Unlock and improve critical hits for projectile towers', 35, 15));
        this.challenges.push(new Challenge('Shield Break', 'No Shield Break', 'Unlock and improve shield break', 40, 15));
        this.challenges.push(new Challenge('Efficiency', 'Efficiency set to normal', 'Improve ratio of raw materials to produced materials', 20, 15));
        this.tierBlueprints = [];
        this.tierBlueprints.push();
        this.tierblueprintsauto = true;
        // this.challenges.push(new Challenge('Slow', 'Slow disabled', 'Enemies within range slow', 30, 15));
        this.equipment = [];
        this.Achievements = [];
        this.Achievements.push(new Achievements(1, 'Building', 'Buy building levels', [new JBDecimal(1), new JBDecimal(5), new JBDecimal(10), new JBDecimal(50), new JBDecimal(100), new JBDecimal(500), new JBDecimal(1000), new JBDecimal(5000), new JBDecimal(10000), new JBDecimal(50000)], 0));
        this.Achievements.push(new Achievements(2, 'Challenge', 'Complete challenges', [new JBDecimal(1), new JBDecimal(2), new JBDecimal(4), new JBDecimal(8), new JBDecimal(16), new JBDecimal(25), new JBDecimal(50), new JBDecimal(100), new JBDecimal(200), new JBDecimal(400)], 0));
        this.Achievements.push(new Achievements(3, 'Wave', 'Beat waves', [new JBDecimal(1), new JBDecimal(10), new JBDecimal(20), new JBDecimal(30), new JBDecimal(40), new JBDecimal(50), new JBDecimal(60), new JBDecimal(70), new JBDecimal(80), new JBDecimal(90)], 0));
        this.Achievements.push(new Achievements(4, 'Attack', 'Total Projectile attack', [
            new JBDecimal(1),
            new JBDecimal(10),
            new JBDecimal(50),
            new JBDecimal(100),
            new JBDecimal(500),
            new JBDecimal(1000),
            new JBDecimal(5000),
            new JBDecimal(1e4),
            new JBDecimal(5e4),
            new JBDecimal(1e5),
            new JBDecimal(5e5),
            new JBDecimal(1e6),
            new JBDecimal(5e6),
            new JBDecimal(1e7),
            new JBDecimal(5e7),
            new JBDecimal(1e8),
        ], 0));
        this.Achievements.push(new Achievements(6, '1Prestige', 'Prestige count', [new JBDecimal(1), new JBDecimal(5), new JBDecimal(10), new JBDecimal(20), new JBDecimal(50), new JBDecimal(100)], 0));
        this.Achievements.push(new Achievements(7, '2Prestige', 'Ascend count', [new JBDecimal(1), new JBDecimal(5), new JBDecimal(10), new JBDecimal(20), new JBDecimal(50), new JBDecimal(100)], 0));
        this.Achievements.push(new Achievements(8, '3Prestige', 'Transform count', [new JBDecimal(1), new JBDecimal(5), new JBDecimal(10), new JBDecimal(20), new JBDecimal(50), new JBDecimal(100)], 0));
        this.Achievements.push(new Achievements(9, 'PowderPer', 'Powder gain per hour', [new JBDecimal(10), new JBDecimal(100), new JBDecimal(1000), new JBDecimal(1e4), new JBDecimal(1e5), new JBDecimal(1e6)], 0));
        this.Achievements.push(new Achievements(10, 'Resource', 'Resource production', [
            new JBDecimal(1),
            new JBDecimal(10),
            new JBDecimal(25),
            new JBDecimal(50),
            new JBDecimal(100),
            new JBDecimal(500),
            new JBDecimal(1000),
            new JBDecimal(5000),
            new JBDecimal(1e4),
            new JBDecimal(5e4),
            new JBDecimal(1e5),
            new JBDecimal(5e5),
            new JBDecimal(1e6),
            new JBDecimal(5e6),
            new JBDecimal(1e7),
            new JBDecimal(5e7),
            new JBDecimal(1e8),
        ], 0));
        this.Achievements.push(new Achievements(11, 'Survivor', 'Wave reached without failing', [new JBDecimal(5), new JBDecimal(10), new JBDecimal(20), new JBDecimal(30), new JBDecimal(40), new JBDecimal(50), new JBDecimal(60), new JBDecimal(70), new JBDecimal(80), new JBDecimal(90), new JBDecimal(100)], 0));
        this.Achievements.push(new Achievements(11, 'Population', 'Reach population level', [new JBDecimal(25), new JBDecimal(50), new JBDecimal(100), new JBDecimal(200), new JBDecimal(500), new JBDecimal(1000), new JBDecimal(2000), new JBDecimal(5000), new JBDecimal(10000), new JBDecimal(20000), new JBDecimal(50000)], 0));
        this.tierfeats = [];
        this.storyElements = [];
        this.storyElements.push(new Story("Welcome to Continuous! Continuous is a tower defense game with incremental and idle elements. See the white boxes moving through the maze?  We don't like them.  If one of them reaches the end the wave will start again. Initially you can build three towers.  A Gun Tower, a Missile Tower and a Cannon Tower.  Build any of them on any of the available slots. You should build all three when you can afford them."));
        this.storyElements.push(new Story('Now we should improve our economy.  Click on the Resources tab.  Currently each miner creates 1 metal per second. Later you will unlock supervisors who will create Miners for free. A supervisor will create 0.1 miners per second. But for now they are unavailable.  Build at least 3 Miners to increase production.'));
        this.storyElements.push(new Story("Now let's improve the three towers. Let's uprgade them all at least once. You can use Metal to increase the level of the tower. Later you can use Dust to give a 10% boost to Tower Power."));
        this.storyElements.push(new Story('You have collected your first dust. Special enemies begin appearing at wave 5. Bosses begin appearing at level 10 and every level after.  Bosses drop dust. You can upgrade your metal producers and towers with dust. You will also want to collect 100 dust in order to be able to prestige.  Prestiging restarts the game, but with a new resource, pebbles, which you can spend on new upgrades. The question you have to answer is how much dust to spend to speed up dust collection.  You can eventually reach 100 dust without spending any, but it may be faster to spend at least a little. A button will appear near the top when you are able to prestige.'));
        this.storyElements.push(new Story("If you haven't yet spent your pebble(s) go to the upgrades tab and choose an upgrade. 1000 pebbles will get you a rock. 10000 rocks will get you a boulder.  The object is to advance as far as you can, gaining more and more power."));
        this.storyElements.push(new Story('You have unlocked Challenges.  A challenge is a game run that has a penalty, and if more enemies makes it through the maze than you have mulligans then the challenge ends although the run ontinues.  Challenges give you new towers or tower abilities or production abilities.'));
        this.storyElements.push(new Story('As you progress you will unlock new towers and tower abilities.  You will unlock new production resources. Completing challenges will increase your power. Completing achievements will increase your power.  Finishing tiers will gain you new equipment and new abilities and more power.  Good luck!'));
        this.resources.wood.amount = new JBDecimal(100);
        this.resources.people.amount = new JBDecimal(10);
        if (this.pebbleUpgrades[12].bought > 0) {
            this.resources.people.amount = new JBDecimal(100);
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function saveGame(currentTime) {
    // let safeSave = true;
    // gameData.enemies.forEach(element => {
    //   if (element.bullets.length > 0) {
    //     safeSave = false;
    //   }
    // });
    // if (safeSave) {
    localStorage.setItem('save', JSON.stringify(gameData));
    display.addToDisplay('Game Saved', DisplayCategory.GameSave);
    gameData.world.nextSaveGameTime.setMilliseconds(currentTime.getMilliseconds() + 1000 * 60 * 5);
    const xhr = new XMLHttpRequest();
    // eslint-disable-next-line func-names
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('result').innerHTML = xhr.responseText;
        }
    };
    xhr.open('GET', 'version.txt');
    xhr.send();
    // }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function loadSaveGame() {
    const savegame = JSON.parse(localStorage.getItem('save'));
    if (savegame !== null) {
        gameData.name = savegame.name;
        if (savegame.version >= 4) {
            for (let index = 0; index < savegame.storyElements.length; index += 1) {
                const element = savegame.storyElements[index];
                gameData.storyElements[index].printed = element.printed;
            }
            gameData.stats.bestPrestige2Rate.mantissa = savegame.stats.bestPrestige2Rate.mantissa;
            gameData.stats.bestPrestige2Rate.exponent = savegame.stats.bestPrestige2Rate.exponent;
            for (let index = 0; index < savegame.stats.last10Prestige2amounts.length; index += 1) {
                const element = savegame.stats.last10Prestige2amounts[index];
                const item = new JBDecimal(1);
                item.mantissa = element.mantissa;
                item.exponent = element.exponent;
                gameData.stats.last10Prestige2amounts.push(item);
            }
            gameData.stats.last10Prestige2times = savegame.stats.last10Prestige2times;
            gameData.stats.prestige2ticks = savegame.stats.prestige2ticks;
            gameData.stats.prestige2 = savegame.stats.prestige2;
            gameData.stats.bestPrestige3Rate.mantissa = savegame.stats.bestPrestige3Rate.mantissa;
            gameData.stats.bestPrestige3Rate.exponent = savegame.stats.bestPrestige3Rate.exponent;
            for (let index = 0; index < savegame.stats.last10Prestige3amounts.length; index += 1) {
                const element = savegame.stats.last10Prestige3amounts[index];
                const item = new JBDecimal(1);
                item.mantissa = element.mantissa;
                item.exponent = element.exponent;
                gameData.stats.last10Prestige3amounts.push(item);
            }
            gameData.stats.last10Prestige3times = savegame.stats.last10Prestige3times;
            gameData.stats.prestige3 = savegame.stats.prestige3;
            gameData.stats.prestige3ticks = savegame.stats.prestige3ticks;
            gameData.stats.prestige1 = savegame.stats.prestige1;
            gameData.stats.prestige1ticks = savegame.stats.prestige1ticks;
            gameData.stats.bestPrestige1Rate.mantissa = savegame.stats.bestPrestige1Rate.mantissa;
            gameData.stats.bestPrestige1Rate.exponent = savegame.stats.bestPrestige1Rate.exponent;
            gameData.stats.highestEverWave = savegame.stats.highestEverWave;
            for (let index = 0; index < savegame.stats.last10Prestige1amounts.length; index += 1) {
                const element = savegame.stats.last10Prestige1amounts[index];
                const item = new JBDecimal(1);
                item.mantissa = element.mantissa;
                item.exponent = element.exponent;
                gameData.stats.last10Prestige1amounts.push(item);
            }
            gameData.stats.last10Prestige1times = savegame.stats.last10Prestige1times;
            gameData.stats.last10Prestige1tier = savegame.stats.last10Prestige1tier;
            gameData.stats.last10Prestige1waves = savegame.stats.last10Prestige1waves;
            gameData.options.standardNotation = savegame.options.standardNotation;
            gameData.options.logNotBase = savegame.options.logNotBase;
            gameData.world.timeElapsed = savegame.world.timeElapsed;
            gameData.world.paused = savegame.world.paused;
            gameData.world.currentWave = savegame.world.currentWave;
            gameData.world.enemiesToSpawn = savegame.world.enemiesToSpawn;
            gameData.world.highestWaveCompleted = savegame.world.highestWaveCompleted;
            gameData.world.tierUnlocked = savegame.world.tierUnlocked;
            gameData.world.currentTier = savegame.world.currentTier;
            gameData.world.timeElapsed = savegame.world.timeElapsed;
            gameData.world.ticksToNextSpawn = savegame.world.ticksToNextSpawn;
            gameData.world.deathLevel = savegame.world.deathLevel;
            gameData.world.autoChallenge = savegame.world.autoChallenge;
            gameData.world.nextAutoChallenge = savegame.world.nextAutoChallenge;
            gameData.world.equipmentEarned = savegame.world.equipmentEarned;
            if (typeof savegame.world.spawnsRemaining !== 'undefined') {
                for (let index = 0; index <= 32; index++) {
                    if (typeof savegame.world.spawnsRemaining[index] !== 'undefined') {
                        gameData.world.spawnsRemaining[index] = savegame.world.spawnsRemaining[index];
                    }
                }
            }
            while (gameData.tierBlueprints.length < gameData.world.tierUnlocked + 1) {
                const newGuy = new TierBluePrint();
                gameData.tierBlueprints.push(newGuy);
            }
            if (typeof savegame.tierBlueprints !== 'undefined') {
                savegame.tierBlueprints.forEach((tbp, tbpIndex) => {
                    gameData.tierBlueprints[tbpIndex] = tbp;
                });
            }
            for (let index = 0; index < savegame.enemies.length; index += 1) {
                const element = savegame.enemies[index];
                const newEnemy = new Enemy(false);
                newEnemy.pos.x = element.pos.x;
                newEnemy.pos.y = element.pos.y;
                if (typeof element.healer !== 'undefined') {
                    newEnemy.healer = element.healer;
                }
                if (typeof element.thief !== 'undefined') {
                    newEnemy.thief = element.thief;
                }
                if (typeof element.fast !== 'undefined') {
                    newEnemy.fast = element.fast;
                }
                if (typeof element.strong !== 'undefined') {
                    newEnemy.strong = element.strong;
                }
                if (typeof element.shielded !== 'undefined') {
                    newEnemy.shielded = element.shielded;
                }
                newEnemy.baseMaxHitPoints.mantissa = element.baseMaxHitPoints.mantissa;
                newEnemy.baseMaxHitPoints.exponent = element.baseMaxHitPoints.exponent;
                newEnemy.damagetaken.mantissa = element.damagetaken.mantissa;
                newEnemy.damagetaken.exponent = element.damagetaken.exponent;
                newEnemy.movementPerSec = element.movementPerSec;
                newEnemy.isBullet = false;
                newEnemy.slowed = element.slowed;
                newEnemy.targetList = [];
                // eslint-disable-next-line no-loop-func
                element.targetList.forEach((t) => {
                    newEnemy.targetList.push(new Vector(t.x, t.y));
                });
                // element.targetList.forEach(t => newEnemy.targetList.push(new movingObject(t.pos.x, t.pos.y, t.movementPerSec, [])))
                newEnemy.targetListIndex = element.targetListIndex;
                newEnemy.type = element.type;
                // eslint-disable-next-line no-loop-func
                element.theftBucket.forEach((tb) => {
                    const newTB = new Resource(tb.name);
                    newTB.amount.mantissa = tb.amount.mantissa;
                    newTB.amount.exponent = tb.amount.exponent;
                    newEnemy.theftBucket.push(newTB);
                });
                // eslint-disable-next-line no-loop-func
                // element.bullets.forEach((b: { pos: { x: number; y: number }; damage: JBDecimal; crit: boolean }) => {
                //   const newb = new Bullet(new Vector(b.pos.x, b.pos.y), element, b.damage);
                //   newb.crit = b.crit;
                //   newEnemy.bullets.push(newb);
                // });
                gameData.enemies.push(newEnemy);
            }
            createBuildingSites();
            // gameData.towers = [];
            for (let index = 0; index < gameData.buildings.length; index += 1) {
                const element = savegame.buildings[index];
                const newTower = gameData.buildings[index];
                newTower.type = element.type;
                newTower.setInfoByType();
                newTower.bought = element.bought;
                newTower.tactics.fastest = element.tactics.fastest;
                newTower.tactics.highestHealth = element.tactics.highestHealth;
                newTower.tactics.lowestHealth = element.tactics.lowestHealth;
                newTower.tactics.healer = element.tactics.healer;
                newTower.autoOn = element.autoOn;
            }
            gameData.tierblueprintsauto = savegame.tierblueprintsauto;
            gameData.resources.essence.amount.mantissa = savegame.resources.essence.amount.mantissa;
            gameData.resources.essence.amount.exponent = savegame.resources.essence.amount.exponent;
            gameData.resources.wood.amount.mantissa = savegame.resources.wood.amount.mantissa;
            gameData.resources.wood.amount.exponent = savegame.resources.wood.amount.exponent;
            gameData.resources.people.amount.mantissa = savegame.resources.people.amount.mantissa;
            gameData.resources.people.amount.exponent = savegame.resources.people.amount.exponent;
            gameData.resources.rock.amount.mantissa = savegame.resources.rock.amount.mantissa;
            gameData.resources.rock.amount.exponent = savegame.resources.rock.amount.exponent;
            gameData.resources.food.amount.mantissa = savegame.resources.food.amount.mantissa;
            gameData.resources.food.amount.exponent = savegame.resources.food.amount.exponent;
            gameData.resources.pebble.amount.mantissa = savegame.resources.pebble.amount.mantissa;
            gameData.resources.pebble.amount.exponent = savegame.resources.pebble.amount.exponent;
            gameData.resources.powder.amount.mantissa = savegame.resources.powder.amount.mantissa;
            gameData.resources.powder.amount.exponent = savegame.resources.powder.amount.exponent;
            gameData.resources.stone.amount.mantissa = savegame.resources.stone.amount.mantissa;
            gameData.resources.stone.amount.exponent = savegame.resources.stone.amount.exponent;
            gameData.resources.shards.amount.mantissa = savegame.resources.shards.amount.mantissa;
            gameData.resources.shards.amount.exponent = savegame.resources.shards.amount.exponent;
            if (typeof savegame.resources.arrow !== 'undefined') {
                gameData.resources.arrow.amount.mantissa = savegame.resources.arrow.amount.mantissa;
                gameData.resources.arrow.amount.exponent = savegame.resources.arrow.amount.exponent;
            }
            if (typeof savegame.resources.redResearch !== 'undefined') {
                gameData.resources.redResearch.amount.mantissa = savegame.resources.redResearch.amount.mantissa;
                gameData.resources.redResearch.amount.exponent = savegame.resources.redResearch.amount.exponent;
            }
            for (let index = 0; index < savegame.researches.length; index += 1) {
                const element = savegame.researches[index];
                gameData.researches[index].bought = element.bought;
            }
            for (let index = 0; index < savegame.powderUpgrades.length; index += 1) {
                const element = savegame.powderUpgrades[index];
                gameData.powderUpgrades[index].bought = element.bought;
            }
            for (let index = 0; index < savegame.rockUpgrades.length; index += 1) {
                const element = savegame.rockUpgrades[index];
                gameData.rockUpgrades[index].bought = element.bought;
            }
            for (let index = 0; index < savegame.pebbleUpgrades.length; index += 1) {
                const element = savegame.pebbleUpgrades[index];
                gameData.pebbleUpgrades[index].bought = element.bought;
            }
            savegame.equipment.forEach((e) => {
                const newEquipment = new Equipment(e.name);
                e.abilities.forEach((a) => {
                    const newAbility = new EquipmentAbility(a.name);
                    newAbility.levels = a.levels;
                    newEquipment.abilities.push(newAbility);
                });
                gameData.equipment.push(newEquipment);
            });
            for (let index = 0; index < savegame.challenges.length; index += 1) {
                const element = gameData.challenges[index];
                element.active = savegame.challenges[index].active;
                element.completed = savegame.challenges[index].completed;
            }
            for (let index = 0; index < savegame.Achievements.length; index += 1) {
                const element = savegame.Achievements[index];
                gameData.Achievements[index].completed = element.completed;
            }
            while (gameData.tierfeats.length < gameData.world.tierUnlocked) {
                gameData.tierfeats.push(createFeatsForTier(gameData.tierfeats.length + 1));
            }
            savegame.tierfeats.forEach((tf, tierindex) => {
                tf.feats.forEach((f, featindex) => {
                    gameData.tierfeats[tierindex].feats[featindex].completed = savegame.tierfeats[tierindex].feats[featindex].completed;
                });
            });
        }
    }
}
//# sourceMappingURL=saveData.js.map