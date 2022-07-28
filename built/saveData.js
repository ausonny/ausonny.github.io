class Story {
    constructor(text) {
        this.text = text;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ChooseTutorial() {
    if (NumberOfTowerLevelsBought() < 3) {
        display.addToDisplay(gameData.storyElements[0].text, DisplayCategory.Tutorial);
        return;
    }
    if (gameData.derivatives[1].owned.lessThan(1)) {
        display.addToDisplay(gameData.storyElements[1].text, DisplayCategory.Tutorial);
        return;
    }
    if (NumberOfTowerLevelsBought() < 16) {
        display.addToDisplay(gameData.storyElements[2].text, DisplayCategory.Tutorial);
        return;
    }
    if (gameData.resources.dust.amount.lessThan(5)) {
        display.addToDisplay(gameData.storyElements[3].text, DisplayCategory.Tutorial);
        return;
    }
    if (gameData.resources.pebbles.amount.lessThan(10)) {
        display.addToDisplay(gameData.storyElements[4].text, DisplayCategory.Tutorial);
    }
    if (gameData.world.highestWaveCompleted >= 20 && getChallengesCompleted() === 0) {
        display.addToDisplay(gameData.storyElements[5].text, DisplayCategory.Tutorial);
    }
    display.addToDisplay(gameData.storyElements[6].text, DisplayCategory.Tutorial);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SaveGameData {
    // automation: Automation[];
    constructor(name) {
        this.name = name;
        this.version = 0.2;
        this.dummyChallenge = new Challenge('d', 'd,', 'd', 0, 0);
        this.dummyUpgrade = new Upgrade('d', 'd', 0, 1, new Resource('d'), document.getElementById('btnBuyUpgrade0'), 0);
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
            metal: new Resource('Metal'),
            dust: new Resource('Dust'),
            pebbles: new Resource('Pebbles'),
            rocks: new Resource('Rocks'),
            particles: new Resource('Particles'),
            boulders: new Resource('Boulders'),
            timeparticles: new Resource('TimeParticles'),
            shards: new Resource('Shards'),
        };
        this.tactics = {
            highestHealth: false,
            lowestHealth: false,
            healer: false,
            fastest: true,
        };
        this.towers = [];
        // for (let index = 0; index < 32; index++) {
        //   const newTower = new Tower(new Vector(0,0), index)
        //   this.towers.push(newTower);
        // }
        this.resources.metal.amount = new JBDecimal(10);
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
            fastEnemiesToSpawn: 0,
            tankEnemiesToSpawn: 0,
            bradleyEnemiesToSpawn: 0,
            paladinEnemiesToSpawn: 0,
            knightEnemiesToSpawn: 0,
            flyerEnemiesToSpawn: 0,
            dumboEnemiesToSpawn: 0,
            hummingbirdEnemiesToSpawn: 0,
            clericEnemiesToSpawn: 0,
            bossEnemiesToSpawn: 0,
            deathlevel: 0,
            mulligansused: 0,
            autoChallenge: false,
            nextAutoChallenge: 0,
        };
        this.world.nextSaveGameTime.setMilliseconds(this.world.nextSaveGameTime.getMilliseconds() + 1000 * 60 * 5);
        this.upgrades = [];
        this.upgrades.push(new Upgrade('Upgrade0', 'Adds .1 to Attack additive<br />', 1, 1.4, this.resources.pebbles, document.getElementById('btnBuyUpgrade0'), 15));
        this.upgrades.push(new Upgrade('Upgrade1', 'Loot + 10% multiplicative<br />', 1, 1.5, this.resources.pebbles, document.getElementById('btnBuyUpgrade1'), 15));
        this.upgrades.push(new Upgrade('Upgrade2', 'Bonus to metal producers from current run time', 1, 1, this.resources.pebbles, document.getElementById('btnBuyUpgrade2'), 1));
        this.upgrades.push(new Upgrade('Upgrade3', 'Bonus to metal producers from unspent pebbles', 5, 1, this.resources.pebbles, document.getElementById('btnBuyUpgrade3'), 1));
        this.upgrades.push(new Upgrade('Upgrade4', 'Bonus to metal producers from number of prestiges', 1, 1, this.resources.pebbles, document.getElementById('btnBuyUpgrade4'), 1));
        this.upgrades.push(new Upgrade('Upgrade5', 'Double bonus from Production Challenges<br />', 100, 1, this.resources.pebbles, document.getElementById('btnBuyUpgrade5'), 1));
        this.upgrades.push(new Upgrade('Upgrade6', 'Each Gun level bought increases its strength by 1%', 10, 10, this.resources.pebbles, document.getElementById('btnBuyUpgrade6'), 1));
        this.upgrades.push(new Upgrade('Upgrade7', 'Each metal producer bought increases its production by 1% multiplicative', 1, 1.5, this.resources.pebbles, document.getElementById('btnBuyUpgrade7'), 10));
        this.upgrades.push(new Upgrade('Upgrade8', 'Unlock new Metal Producer<br />', 1, 10, this.resources.pebbles, document.getElementById('btnBuyUpgrade8'), 5));
        this.upgrades.push(new Upgrade('Upgrade9', 'Miners x2 productivity<br />', 1, 1.5, this.resources.pebbles, document.getElementById('btnBuyUpgrade9'), 15));
        this.upgrades.push(new Upgrade('Upgrade10', 'Supervisors x2 productivity<br />', 2, 1.5, this.resources.pebbles, document.getElementById('btnBuyUpgrade10'), 15));
        this.upgrades.push(new Upgrade('Upgrade11', 'Foremen x2 productivity<br />', 4, 1.5, this.resources.pebbles, document.getElementById('btnBuyUpgrade11'), 15));
        this.upgrades.push(new Upgrade('Upgrade12', 'Managers x2 productivity<br />', 8, 1.5, this.resources.pebbles, document.getElementById('btnBuyUpgrade12'), 15));
        this.upgrades.push(new Upgrade('Upgrade13', 'Middle Managers x2 productivity<br />', 16, 1.5, this.resources.pebbles, document.getElementById('btnBuyUpgrade13'), 15));
        this.upgrades.push(new Upgrade('Upgrade14', 'Upper Managers x2 productivity<br />', 32, 1.5, this.resources.pebbles, document.getElementById('btnBuyUpgrade14'), 15));
        this.upgrades.push(new Upgrade('Upgrade15', 'Vice Presidents x2 productivity<br />', 64, 1.5, this.resources.pebbles, document.getElementById('btnBuyUpgrade15'), 15));
        this.upgrades.push(new Upgrade('Upgrade16', 'Presidents x2 productivity<br />', 128, 1.5, this.resources.pebbles, document.getElementById('btnBuyUpgrade16'), 15));
        this.upgrades.push(new Upgrade('Upgrade17', 'Add 1 Mulligan<br />', 1, 10, this.resources.pebbles, document.getElementById('btnBuyUpgrade17'), 100));
        this.rockUpgrades = [];
        this.rockUpgrades.push(new Upgrade('Upgrade0', 'Reduce cost of pebbles by one Dust<br />', 1, 0, this.resources.rocks, document.getElementById('btnBuyRockUpgrade0'), 80));
        this.rockUpgrades.push(new Upgrade('Upgrade1', 'Double bonus from Gun Attack upgrade<br />', 1, 10, this.resources.rocks, document.getElementById('btnBuyRockUpgrade1'), 10));
        this.rockUpgrades.push(new Upgrade('Upgrade2', 'Double bonus from Loot pebble upgrade<br />', 10, 1, this.resources.rocks, document.getElementById('btnBuyRockUpgrade2'), 1));
        this.rockUpgrades.push(new Upgrade('Upgrade3', 'Increase Effectiveness of Inflation Challenges<br />', 1, 5, this.resources.rocks, document.getElementById('btnBuyRockUpgrade3'), 10));
        this.rockUpgrades.push(new Upgrade('Upgrade4', 'Double bonus from Production Challenges<br />', 1, 1, this.resources.rocks, document.getElementById('btnBuyRockUpgrade4'), 1));
        this.rockUpgrades.push(new Upgrade('Upgrade5', 'Reduce Cost Multiplier of Producer by 1<br />', 5, 10, this.resources.rocks, document.getElementById('btnBuyRockUpgrade5'), 8));
        this.rockUpgrades.push(new Upgrade('Upgrade6', 'Increase upgrade limits of certain pebble upgrades', 10, 1, this.resources.rocks, document.getElementById('btnBuyRockUpgrade6'), 1));
        this.rockUpgrades.push(new Upgrade('Upgrade7', 'Each run begins with 1000 metal<br />', 1, 1, this.resources.rocks, document.getElementById('btnBuyRockUpgrade7'), 1));
        this.rockUpgrades.push(new Upgrade('Upgrade8', 'Each wave contains one fewer drone<br />', 1, 0, this.resources.rocks, document.getElementById('btnBuyRockUpgrade8'), 100));
        this.rockUpgrades.push(new Upgrade('Upgrade9', 'Particles gain bonus from run time<br />', 1, 0, this.resources.rocks, document.getElementById('btnBuyRockUpgrade9'), 1));
        this.rockUpgrades.push(new Upgrade('Upgrade10', 'Increase shooting speed bonus from challenge completions', 10, 6, this.resources.rocks, document.getElementById('btnBuyRockUpgrade10'), 10));
        this.rockUpgrades.push(new Upgrade('Upgrade11', 'Unlock Prioritize healer tactic<br />', 10000, 1, this.resources.rocks, document.getElementById('btnBuyRockUpgrade11'), 1));
        this.rockUpgrades.push(new Upgrade('Upgrade12', 'Increase Energy Weapon attack<br />', 1000, 10, this.resources.rocks, document.getElementById('btnBuyRockUpgrade12'), 10));
        this.rockUpgrades.push(new Upgrade('Upgrade13', 'Increase Poison effectiveness<br />', 25, 5, this.resources.rocks, document.getElementById('btnBuyRockUpgrade13'), 10));
        this.boulderUpgrades = [];
        this.boulderUpgrades.push(new Upgrade('Upgrade0', 'Lower Challenge Limit by 1<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade0'), 1));
        this.boulderUpgrades.push(new Upgrade('Upgrade1', 'Reduce cost of rocks by one pebble<br />', 1, 2, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade1'), 800));
        this.boulderUpgrades.push(new Upgrade('Upgrade2', 'Increase upgrade limits on certain pebble upgrades', 10, 1, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade2'), 1));
        this.boulderUpgrades.push(new Upgrade('Upgrade3', 'Double Production of all metal producers<br />', 1, 1, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade3'), 1));
        this.boulderUpgrades.push(new Upgrade('Upgrade4', 'Double bonus from Gun Attack upgrade<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade4'), 10));
        this.boulderUpgrades.push(new Upgrade('Upgrade5', 'Gain Pebbles from 1% of dust every second<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade5'), 1));
        this.boulderUpgrades.push(new Upgrade('Upgrade6', 'Increase effectiveness of Crits Challenge<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade6'), 10));
        this.boulderUpgrades.push(new Upgrade('Upgrade7', 'Add 1 to Crit Multiplier<br />', 10, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade7'), 10));
        this.boulderUpgrades.push(new Upgrade('Upgrade8', 'Increase Shield Break from Gun Attack<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade8'), 10));
        this.boulderUpgrades.push(new Upgrade('Upgrade9', 'Increase Poison Effectiveness<br />', 1, 10, this.resources.boulders, document.getElementById('btnBuyBoulderUpgrade9'), 10));
        this.producer = new Producer('Production Multiplier', 0, 1000, 10, this.resources.metal, this.resources.dust, document.getElementById('btnBuyProduction'), document.getElementById('btnBuyProductionDustUpgrade'), this.dummyUpgrade, 20);
        this.derivatives = [];
        this.derivatives.push(new Derivative('Miner', 0, 10, 1.5, this.resources.metal, this.resources.dust, document.getElementById('btnBuyMiner'), document.getElementById('btnBuyMinerDustUpgrade'), this.upgrades[9], 20, 1, true));
        this.derivatives.push(new Derivative('Supervisor', 1, 100, 1.6, this.resources.metal, this.resources.dust, document.getElementById('btnBuySupervisor'), document.getElementById('btnBuySupervisorDustUpgrade'), this.upgrades[10], 20, 0.1, true));
        this.derivatives.push(new Derivative('Foreman', 2, 1000, 1.7, this.resources.metal, this.resources.dust, document.getElementById('btnBuyForeman'), document.getElementById('btnBuyForemanDustUpgrade'), this.upgrades[11], 20, 0.01, true));
        this.derivatives.push(new Derivative('Manager', 3, 10000, 1.8, this.resources.metal, this.resources.dust, document.getElementById('btnBuyManager'), document.getElementById('btnBuyManagerDustUpgrade'), this.upgrades[12], 20, 0.001, true));
        this.derivatives.push(new Derivative('Middle Management', 4, 100000, 1.9, this.resources.metal, this.resources.dust, document.getElementById('btnBuyMiddleManagement'), document.getElementById('btnBuyMiddleManagerDustUpgrade'), this.upgrades[13], 20, 0.0001, true));
        this.derivatives.push(new Derivative('Upper Management', 5, 1000000, 2.0, this.resources.metal, this.resources.dust, document.getElementById('btnBuyUpperManagement'), document.getElementById('btnBuyUpperManagementDustUpgrade'), this.upgrades[14], 20, 0.00001, true));
        this.derivatives.push(new Derivative('Vice President', 6, 1e7, 2.1, this.resources.metal, this.resources.dust, document.getElementById('btnBuyVicePresident'), document.getElementById('btnBuyVicePresidentDustUpgrade'), this.upgrades[15], 20, 0.000001, true));
        this.derivatives.push(new Derivative('President', 7, 1e8, 2.2, this.resources.metal, this.resources.dust, document.getElementById('btnBuyPresident'), document.getElementById('btnBuyPresidentDustUpgrade'), this.upgrades[16], 20, 0.0000001, true));
        this.speedDerivatives = [];
        this.speedDerivatives.push(new Derivative2('Speed', 0, 1, 2, this.resources.rocks, new Resource('dummy'), document.getElementById('btnBuySpeed'), document.getElementById('btnBuySpeed'), this.dummyUpgrade, 0, 1, false));
        this.speedDerivatives.push(new Derivative2('Acceleration', 0, 10, 2, this.resources.rocks, new Resource('dummy'), document.getElementById('btnBuyAcceleration'), document.getElementById('btnBuyAcceleration'), this.dummyUpgrade, 0, 1, false));
        this.speedDerivatives.push(new Derivative2('Jerk', 0, 100, 2, this.resources.rocks, new Resource('dummy'), document.getElementById('btnBuyJerk'), document.getElementById('btnBuyJerk'), this.dummyUpgrade, 0, 1, false));
        this.speedDerivatives.push(new Derivative2('Snap', 0, 1e4, 2, this.resources.rocks, new Resource('dummy'), document.getElementById('btnBuySnap'), document.getElementById('btnBuySnap'), this.dummyUpgrade, 0, 1, false));
        this.speedDerivatives.push(new Derivative2('Crackle', 0, 1e7, 2, this.resources.rocks, new Resource('dummy'), document.getElementById('btnBuyCrackle'), document.getElementById('btnBuyMiner'), this.dummyUpgrade, 0, 1, false));
        this.speedDerivatives.push(new Derivative2('Pop', 0, 1e11, 2, this.resources.rocks, new Resource('dummy'), document.getElementById('btnBuyPop'), document.getElementById('btnBuyMiner'), this.dummyUpgrade, 0, 1, false));
        this.timeDerivatives = [];
        this.timeDerivatives.push(new Derivative2('Time1', 0, 1, 2, this.resources.boulders, new Resource('dummy'), document.getElementById('btnBuyTime1'), document.getElementById('btnBuyTime1'), this.dummyUpgrade, 0, 1, false));
        this.timeDerivatives.push(new Derivative2('Time2', 0, 10, 2, this.resources.boulders, new Resource('dummy'), document.getElementById('btnBuyTime2'), document.getElementById('btnBuyTime2'), this.dummyUpgrade, 0, 1, false));
        this.timeDerivatives.push(new Derivative2('Time3', 0, 100, 2, this.resources.boulders, new Resource('dummy'), document.getElementById('btnBuyTime3'), document.getElementById('btnBuyTime3'), this.dummyUpgrade, 0, 1, false));
        this.timeDerivatives.push(new Derivative2('Time4', 0, 1e4, 2, this.resources.boulders, new Resource('dummy'), document.getElementById('btnBuyTime4'), document.getElementById('btnBuyTime4'), this.dummyUpgrade, 0, 1, false));
        this.timeDerivatives.push(new Derivative2('Time5', 0, 1e7, 2, this.resources.boulders, new Resource('dummy'), document.getElementById('btnBuyTime5'), document.getElementById('btnBuyTime5'), this.dummyUpgrade, 0, 1, false));
        this.timeDerivatives.push(new Derivative2('Time6', 0, 1e11, 2, this.resources.boulders, new Resource('dummy'), document.getElementById('btnBuyTime6'), document.getElementById('btnBuyTime6'), this.dummyUpgrade, 0, 1, false));
        this.challenges = [];
        this.challenges.push(new Challenge('Inflation', 'Inflation starts at 1', 'Inflation starts 5 percent later per completion', 5, 5));
        this.challenges.push(new Challenge('Production', 'Production Bonus is disabled', 'Add .01 to production bonus', 20, 10));
        this.challenges.push(new Challenge('Shooting Speed', 'Shooting Speed is set to 1/s', 'Increase shooting speed', 20, 10));
        this.challenges.push(new Challenge('Range', 'Tower Range is set to 15', 'Increase Tower Range', 20, 10));
        this.challenges.push(new Challenge('Poison', 'No Poison Tower', 'Unlock and improve Poison Tower', 15, 10));
        this.challenges.push(new Challenge('Slow', 'Slow tower disabled', 'Slow Tower unlocked and improved', 30, 15));
        this.challenges.push(new Challenge('Crits', 'Critical Attacks are disabled', 'Unlock and improve critical hits', 35, 15));
        this.challenges.push(new Challenge('Shield Break', 'No Shield Break', 'Unlock and improve shield break', 40, 20));
        this.tierBlueprints = [];
        this.tierBlueprints.push();
        this.tierblueprintsauto = false;
        // this.challenges.push(new Challenge('Slow', 'Slow disabled', 'Enemies within range slow', 30, 15));
        this.equipment = [];
        this.Achievements = [];
        this.Achievements.push(new Achievement(1, 'Tower1', 'Buy first Tower', 0, 1));
        this.Achievements.push(new Achievement(2, 'Tower2', 'Buy second Tower', 0, 2));
        this.Achievements.push(new Achievement(3, 'Tower4', 'Buy fourth Tower', 0, 4));
        this.Achievements.push(new Achievement(4, 'Tower8', 'Buy eighth Tower', 0, 8));
        this.Achievements.push(new Achievement(5, 'Tower16', 'Buy sixteenth Tower', 0, 16));
        this.Achievements.push(new Achievement(6, 'Tower32', 'Buy thirty-second Tower', 0, 32));
        this.Achievements.push(new Achievement(7, 'Tower64', 'Buy sixty-fourth Tower', 0, 64));
        this.Achievements.push(new Achievement(8, 'Tower100', 'Buy hindredth Tower', 0, 100));
        this.Achievements.push(new Achievement(9, 'Tower200', 'Buy two hundredth Tower', 0, 200));
        this.Achievements.push(new Achievement(10, 'Tower400', 'Buy four hundredth Tower', 0, 400));
        this.Achievements.push(new Achievement(11, 'Challenge1', 'Complete first Challenge', 1, 1));
        this.Achievements.push(new Achievement(12, 'Challenge2', 'Complete two Challenges', 1, 2));
        this.Achievements.push(new Achievement(13, 'Challenge4', 'Complete four Challenges', 1, 4));
        this.Achievements.push(new Achievement(14, 'Challenge8', 'Complete eight Challenges', 1, 8));
        this.Achievements.push(new Achievement(15, 'Challenge16', 'Complete sixteen Challenges', 1, 16));
        this.Achievements.push(new Achievement(16, 'Wave1', 'Complete Wave 1', 1, 1));
        this.Achievements.push(new Achievement(17, 'Wave10', 'Complete Wave 10', 1, 10));
        this.Achievements.push(new Achievement(18, 'Wave20', 'Complete Wave 20', 1, 20));
        this.Achievements.push(new Achievement(19, 'Wave30', 'Complete Wave 30', 1, 30));
        this.Achievements.push(new Achievement(20, 'Wave40', 'Complete Wave 40', 1, 40));
        this.Achievements.push(new Achievement(21, 'Challenge25', 'Complete twenty five Challenges', 1, 25));
        this.Achievements.push(new Achievement(22, 'Challenge50', 'Complete fifty Challenges', 1, 50));
        this.Achievements.push(new Achievement(23, 'Challenge100', 'Complete one hundred Challenges', 1, 100));
        this.Achievements.push(new Achievement(24, 'Challenge200', 'Complete two hundred Challenges', 1, 200));
        this.Achievements.push(new Achievement(25, 'Challenge500', 'Complete five hundred Challenges', 1, 500));
        this.Achievements.push(new Achievement(26, 'Wave50', 'Complete Wave 50', 1, 50));
        this.Achievements.push(new Achievement(27, 'Wave60', 'Complete Wave 60', 1, 60));
        this.Achievements.push(new Achievement(28, 'Wave70', 'Complete Wave 70', 1, 70));
        this.Achievements.push(new Achievement(29, 'Wave80', 'Complete Wave 80', 1, 80));
        this.Achievements.push(new Achievement(30, 'Wave90', 'Complete Wave 90', 1, 90));
        this.Achievements.push(new Achievement(31, 'Attack10', 'Have attack of 10', 1, 10));
        this.Achievements.push(new Achievement(32, 'Attack50', 'Have attack of 50', 1, 50));
        this.Achievements.push(new Achievement(33, 'Attack100', 'Have attack of 100', 1, 100));
        this.Achievements.push(new Achievement(34, 'Attack500', 'Have attack of 500', 1, 500));
        this.Achievements.push(new Achievement(35, 'Attack1000', 'Have attack of 1000', 1, 1000));
        this.Achievements.push(new Achievement(36, 'Attack5000', 'Have attack of 5000', 1, 5000));
        this.Achievements.push(new Achievement(37, 'Attack10000', 'Have attack of 10000', 1, 10000));
        this.Achievements.push(new Achievement(38, 'Attack50000', 'Have attack of 50000', 1, 50000));
        this.Achievements.push(new Achievement(39, 'Attack100000', 'Have attack of 100000', 1, 100000));
        this.Achievements.push(new Achievement(40, 'Attack500000', 'Have attack of 500000', 1, 500000));
        this.Achievements.push(new Achievement(41, '1Prestige10', 'Prestige 1 time', 1, 1));
        this.Achievements.push(new Achievement(42, '1Prestige50', 'Prestige 10 times', 1, 10));
        this.Achievements.push(new Achievement(43, '1Prestige100', 'Prestige 50 times', 1, 50));
        this.Achievements.push(new Achievement(44, '1Prestige500', 'Prestige 100 times', 1, 100));
        this.Achievements.push(new Achievement(45, '1Prestige1000', 'Prestige 500 times', 1, 500));
        this.Achievements.push(new Achievement(46, '2Prestige10', 'Ascend 1 time', 1, 1));
        this.Achievements.push(new Achievement(47, '2Prestige50', 'Ascend 10 times', 1, 10));
        this.Achievements.push(new Achievement(48, '2Prestige100', 'Ascend 50 times', 1, 50));
        this.Achievements.push(new Achievement(49, '2Prestige500', 'Ascend 100 times', 1, 100));
        this.Achievements.push(new Achievement(50, '2Prestige1000', 'Ascend 500 times', 1, 500));
        this.Achievements.push(new Achievement(51, 'PebblesPer10', 'Pebble Gain 10 per hour', 1, 10));
        this.Achievements.push(new Achievement(52, 'PebblesPer100', 'Pebble Gain 100 per hour', 1, 100));
        this.Achievements.push(new Achievement(53, 'PebblesPer1000', 'Pebble Gain 1000 per hour', 1, 1000));
        this.Achievements.push(new Achievement(54, 'PebblesPer10000', 'Pebble Gain 1e4 per hour', 1, 1e4));
        this.Achievements.push(new Achievement(55, 'PebblesPer100000', 'Pebble Gain 1e5 per hour', 1, 1e5));
        this.Achievements.push(new Achievement(56, '3Prestige10', 'Transform 1 time', 1, 1));
        this.Achievements.push(new Achievement(57, '3Prestige50', 'Transform 10 times', 1, 10));
        this.Achievements.push(new Achievement(58, '3Prestige100', 'Transform 50 times', 1, 50));
        this.Achievements.push(new Achievement(59, '3Prestige500', 'Transform 100 times', 1, 100));
        this.Achievements.push(new Achievement(60, '3Prestige1000', 'Transform 500 times', 1, 500));
        this.Achievements.push(new Achievement(61, 'Miner11', 'Buy one Miner', 0, 1));
        this.Achievements.push(new Achievement(62, 'Miner110', 'Buy ten Miners', 0, 10));
        this.Achievements.push(new Achievement(63, 'Miner125', 'Buy twenty five Miners', 0, 25));
        this.Achievements.push(new Achievement(64, 'Miner150', 'Buy fifty Miners', 0, 50));
        this.Achievements.push(new Achievement(65, 'Miner1100', 'Buy one hundred Miners', 0, 100));
        this.Achievements.push(new Achievement(66, 'Miner1500', 'Buy five hundred Miners', 0, 500));
        this.Achievements.push(new Achievement(67, 'Miner11000', 'Buy one thousand Miners', 0, 1000));
        this.Achievements.push(new Achievement(68, 'Miner15000', 'Buy five thousand Miners', 0, 5000));
        this.Achievements.push(new Achievement(69, 'Miner110000', 'Buy ten thousand Miners', 0, 10000));
        this.Achievements.push(new Achievement(70, 'Miner1100000', 'Buy one hundred thousand Miners', 0, 100000));
        this.Achievements.push(new Achievement(71, 'Miner21', 'Buy one Supervisors', 1, 1));
        this.Achievements.push(new Achievement(72, 'Miner210', 'Buy ten Supervisors', 1, 10));
        this.Achievements.push(new Achievement(73, 'Miner225', 'Buy twenty five Supervisors', 1, 25));
        this.Achievements.push(new Achievement(74, 'Miner250', 'Buy fifty Supervisors', 1, 50));
        this.Achievements.push(new Achievement(75, 'Miner2100', 'Buy one hundred Supervisors', 1, 100));
        this.Achievements.push(new Achievement(76, 'Miner2500', 'Buy five hundred Supervisors', 1, 500));
        this.Achievements.push(new Achievement(77, 'Miner21000', 'Buy one thousand Supervisors', 1, 1000));
        this.Achievements.push(new Achievement(78, 'Miner25000', 'Buy five thousand Supervisors', 1, 5000));
        this.Achievements.push(new Achievement(79, 'Miner210000', 'Buy ten thousand Supervisors', 1, 10000));
        this.Achievements.push(new Achievement(80, 'Miner2100000', 'Buy one hundred thousand Supervisors', 1, 100000));
        this.Achievements.push(new Achievement(81, 'Miner31', 'Buy one Foreman', 2, 1));
        this.Achievements.push(new Achievement(82, 'Miner310', 'Buy ten Foremen', 2, 10));
        this.Achievements.push(new Achievement(83, 'Miner325', 'Buy twenty five Foremen', 2, 25));
        this.Achievements.push(new Achievement(84, 'Miner350', 'Buy fifty Foremen', 2, 50));
        this.Achievements.push(new Achievement(85, 'Miner3100', 'Buy one hundred Foremen', 2, 100));
        this.Achievements.push(new Achievement(86, 'Miner3500', 'Buy five hundred Foremen', 2, 500));
        this.Achievements.push(new Achievement(87, 'Miner31000', 'Buy one thousand Foremen', 2, 1000));
        this.Achievements.push(new Achievement(88, 'Miner35000', 'Buy five thousand Foremen', 2, 5000));
        this.Achievements.push(new Achievement(89, 'Miner310000', 'Buy ten thousand Foremen', 2, 10000));
        this.Achievements.push(new Achievement(90, 'Miner3100000', 'Buy one hundred thousand Foremen', 2, 100000));
        this.Achievements.push(new Achievement(91, 'Miner41', 'Buy one Manager', 3, 1));
        this.Achievements.push(new Achievement(92, 'Miner410', 'Buy ten Managers', 3, 10));
        this.Achievements.push(new Achievement(93, 'Miner425', 'Buy twenty five Managers', 3, 25));
        this.Achievements.push(new Achievement(94, 'Miner450', 'Buy fifty Managers', 3, 50));
        this.Achievements.push(new Achievement(95, 'Miner4100', 'Buy one hundred Managers', 3, 100));
        this.Achievements.push(new Achievement(96, 'Miner4500', 'Buy five hundred Managers', 3, 500));
        this.Achievements.push(new Achievement(97, 'Miner41000', 'Buy one thousand Managers', 3, 1000));
        this.Achievements.push(new Achievement(98, 'Miner45000', 'Buy five thousand Managers', 3, 5000));
        this.Achievements.push(new Achievement(99, 'Miner410000', 'Buy ten thousand Managers', 3, 10000));
        this.Achievements.push(new Achievement(100, 'Miner4100000', 'Buy one hundred thousand Managers', 3, 100000));
        this.Achievements.push(new Achievement(101, 'Miner51', 'Buy one Middle Manager', 4, 1));
        this.Achievements.push(new Achievement(102, 'Miner510', 'Buy ten Middle Managers', 4, 10));
        this.Achievements.push(new Achievement(103, 'Miner525', 'Buy twenty five Middle Managers', 4, 25));
        this.Achievements.push(new Achievement(104, 'Miner550', 'Buy fifty Middle Managers', 4, 50));
        this.Achievements.push(new Achievement(105, 'Miner5100', 'Buy one hundred Middle Managers', 4, 100));
        this.Achievements.push(new Achievement(106, 'Miner5500', 'Buy five hundred Middle Managers', 4, 500));
        this.Achievements.push(new Achievement(107, 'Miner51000', 'Buy one thousand Middle Managers', 4, 1000));
        this.Achievements.push(new Achievement(108, 'Miner55000', 'Buy five thousand Middle Managers', 4, 5000));
        this.Achievements.push(new Achievement(109, 'Miner510000', 'Buy ten thousand Middle Managers', 4, 10000));
        this.Achievements.push(new Achievement(110, 'Miner5100000', 'Buy one hundred thousand Supervisors', 5, 100000));
        this.Achievements.push(new Achievement(111, 'Miner61', 'Buy one Upper Manager', 5, 1));
        this.Achievements.push(new Achievement(112, 'Miner610', 'Buy ten Upper Managers', 5, 10));
        this.Achievements.push(new Achievement(113, 'Miner625', 'Buy twenty five Upper Managers', 5, 25));
        this.Achievements.push(new Achievement(114, 'Miner650', 'Buy fifty Upper Managers', 5, 50));
        this.Achievements.push(new Achievement(115, 'Miner6100', 'Buy one hundred Upper Managers', 5, 100));
        this.Achievements.push(new Achievement(116, 'Miner6500', 'Buy five hundred Upper Managers', 5, 500));
        this.Achievements.push(new Achievement(117, 'Miner61000', 'Buy one thousand Upper Managers', 5, 1000));
        this.Achievements.push(new Achievement(118, 'Miner65000', 'Buy five thousand Upper Managers', 5, 5000));
        this.Achievements.push(new Achievement(119, 'Miner610000', 'Buy ten thousand Upper Managers', 5, 10000));
        this.Achievements.push(new Achievement(120, 'Miner6100000', 'Buy one hundred thousand Upper Managers', 5, 100000));
        this.Achievements.push(new Achievement(121, 'Miner71', 'Buy one Vice President', 6, 1));
        this.Achievements.push(new Achievement(122, 'Miner710', 'Buy ten Vice Presidents', 6, 10));
        this.Achievements.push(new Achievement(123, 'Miner725', 'Buy twenty five Vice Presidents', 6, 25));
        this.Achievements.push(new Achievement(124, 'Miner750', 'Buy fifty Vice Presidents', 6, 50));
        this.Achievements.push(new Achievement(125, 'Miner7100', 'Buy one hundred Vice Presidents', 6, 100));
        this.Achievements.push(new Achievement(126, 'Miner7500', 'Buy five hundred Vice Presidents', 6, 500));
        this.Achievements.push(new Achievement(127, 'Miner71000', 'Buy one thousand Vice Presidents', 6, 1000));
        this.Achievements.push(new Achievement(128, 'Miner75000', 'Buy five thousand  Vice Presidents', 6, 5000));
        this.Achievements.push(new Achievement(129, 'Miner710000', 'Buy ten thousand Vice Presidents', 6, 10000));
        this.Achievements.push(new Achievement(130, 'Miner7100000', 'Buy one hundred thousand Vice Presidents', 6, 100000));
        this.Achievements.push(new Achievement(131, 'Miner81', 'Buy one President', 7, 1));
        this.Achievements.push(new Achievement(132, 'Miner810', 'Buy ten Presidents', 7, 10));
        this.Achievements.push(new Achievement(133, 'Miner825', 'Buy twenty five Presidents', 7, 25));
        this.Achievements.push(new Achievement(134, 'Miner850', 'Buy fifty Presidents', 7, 50));
        this.Achievements.push(new Achievement(135, 'Miner8100', 'Buy one hundred Presidents', 7, 100));
        this.Achievements.push(new Achievement(136, 'Miner8500', 'Buy five hundred Presidents', 7, 500));
        this.Achievements.push(new Achievement(137, 'Miner81000', 'Buy one thousand Presidents', 7, 1000));
        this.Achievements.push(new Achievement(138, 'Miner85000', 'Buy five thousand Presidents', 7, 5000));
        this.Achievements.push(new Achievement(139, 'Miner810000', 'Buy ten thousand Presidents', 7, 10000));
        this.Achievements.push(new Achievement(140, 'Miner8100000', 'Buy one hundred thousand Presidents', 7, 100000));
        this.tierfeats = [];
        this.storyElements = [];
        this.storyElements.push(new Story("Welcome to Continuous! Continuous is a tower defense game with incremental and idle elements. See the white boxes moving through the maze?  We don't like them.  If one of them reaches the end the wave will start again. First lets build a few Gun Towers.  Pick any of the 8 slots listed below and click the Buy Gun button. Buy at least 3."));
        this.storyElements.push(new Story('Now we should improve our economy.  Click on the Resources tab.  Currently each miner creates 1 metal per second. A supervisor will create 0.1 miners per second.  Buy a couple more miners to speed up production and then save up enough metal and buy a supervisor.'));
        this.storyElements.push(new Story("Now let's buy the rest of the available Gun Towers.  You should also have enough money to begin spending metal to upgrade the towers.  Let's uprgade them all at least once."));
        this.storyElements.push(new Story('You have collected your first dust. Special enemies begin appearing at wave 5 and drop dust when killed. You can upgrade your metal producers and towers with dust. You will also want to collect 100 dust in order to be able to prestige.  Prestiging restarts the game, but with a new resource, pebbles, which you can spend on new upgrades. The question you have to answer is how much dust to spend to speed up dust collection.  You can eventually reach 100 dust without spending any, but it may be faster to spend at least a little. A button will appear near the top when you are able to prestige.'));
        this.storyElements.push(new Story("If you haven't yet spent your pebble(s) go to the upgrades tab and choose an upgrade. 1000 pebbles will get you a rock. 10000 rocks will get you a boulder.  The object is to advance as far as you can, gaining more and more power."));
        this.storyElements.push(new Story('ou have unlocked Challenges.  A challenge is a game run tha has a penalty, and if more enemies makes it through the maze than you have mulligans then while the run ontinues the challenge progression ends.  Challenges give you new towers or tower abilities or production abilities.'));
        this.storyElements.push(new Story('As you progress you will unlock new towers and tower abilities.  You will unlock new production resources. Completing challenges will increase your power. Completing achievements will increase your power.  Finishing tiers will gain you new equipment and new abilities and more power.  Good luck!'));
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
//# sourceMappingURL=saveData.js.map