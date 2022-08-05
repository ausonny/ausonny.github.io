/* eslint-disable no-loop-func */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notationDisplayOptions = ['Scientific Notation', 'Standard Formatting', 'Engineering Notation', 'Alphabetic Notation', 'Hybrid Notation', 'Logarithmic Notation'];
let dirtyEquipment = true;
let dirtyTowers = true;
let dirtyUpgrades = true;
let gameSpeed = 1;
let initted = false;
let gameData;
const display = new Display();
let internalInflationArray;
// eslint-disable-next-line prefer-const
internalInflationArray = [];
// const isFixedString = (s: string) => !isNaN(+s) && isFinite(+s) && !/e/i.test(s);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changeSpeed1() {
    gameSpeed = 1;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changeSpeed2() {
    gameSpeed = 2;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changeSpeed5() {
    gameSpeed = 5;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changeSpeedMax() {
    gameSpeed = 10;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function switchPause() {
    gameData.world.paused = !gameData.world.paused;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function challengeAuto() {
    gameData.world.autoChallenge = !gameData.world.autoChallenge;
    gameData.world.nextAutoChallenge = 0;
}
function pebblesFromPrestige(amt = new JBDecimal(0)) {
    if (amt.equals(new JBDecimal(0))) {
        return gameData.resources.dust.amount.divide(100 - gameData.rockUpgrades[0].bought).floor();
    }
    return amt.divide(100 - gameData.rockUpgrades[0].bought);
}
function rocksFromPrestige() {
    return gameData.resources.pebbles.amount
        .add(pebblesFromPrestige())
        .divide(1000 - gameData.boulderUpgrades[1].bought * 10)
        .floor();
}
function bouldersFromPrestige() {
    return gameData.resources.rocks.amount.add(rocksFromPrestige()).divide(10000).floor();
}
function getCurrentPebbleRate() {
    return pebblesFromPrestige().multiply(3600000).divide(gameData.stats.prestige1ticks);
}
function getCurrentRockRate() {
    return rocksFromPrestige().multiply(3600000).divide(gameData.stats.prestige2ticks);
}
function getCurrentBoulderRate() {
    return bouldersFromPrestige().multiply(3600000).divide(gameData.stats.prestige3ticks);
}
function AutoBuyPebbles() {
    const dustToUse = gameData.resources.dust.amount.multiply(gameData.world.currentTickLength / 100000);
    gameData.resources.dust.subtract(dustToUse);
    gameData.resources.pebbles.add(pebblesFromPrestige(dustToUse));
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function blueprintAuto() {
    gameData.tierblueprintsauto = !gameData.tierblueprintsauto;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function blueprintLoad() {
    while (gameData.tierBlueprints.length < gameData.world.currentTier + 1) {
        gameData.tierBlueprints.push(new TierBluePrint());
    }
    const currentBluePrint = gameData.tierBlueprints[gameData.world.currentTier];
    gameData.towers.forEach((t, index) => {
        if (typeof currentBluePrint[index] === 'undefined') {
            t.type = '';
        }
        else {
            t.type = currentBluePrint[index].towerType;
            t.setInfoByType();
        }
        t.bought = 0;
        t.upgradeLevel = 0;
    });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function blueprintSave() {
    const newTBP = new TierBluePrint();
    gameData.towers.forEach((t) => {
        const newbp = new Blueprint();
        newbp.towerType = t.type;
        newTBP.blueprints.push(newbp);
    });
    while (gameData.tierBlueprints.length < gameData.world.currentTier + 1) {
        gameData.tierBlueprints.push(new TierBluePrint());
    }
    gameData.tierBlueprints[gameData.world.currentTier] = newTBP;
    display.addToDisplay('Blueprint Saved', DisplayCategory.Loot);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DeleteEquipment(index) {
    gameData.equipment[index].DestructAbilities();
    gameData.equipment.splice(index, 1);
    dirtyEquipment = true;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MoveEquipment(index) {
    gameData.equipment.unshift(gameData.equipment.splice(index, 1)[0]);
    dirtyEquipment = true;
}
function maxMulligansCalc() {
    let maxMulligans = gameData.upgrades[17].bought;
    if (gameData.equipment.length > 0) {
        gameData.equipment[0].abilities.forEach((a) => {
            if (a.name === 'Mulligans') {
                maxMulligans += a.levels;
            }
        });
    }
    return maxMulligans;
}
function getNumberOfEnemies(wave) {
    let div = wave - (gameData.world.currentTier - 1);
    if (div < 1) {
        div = 1;
    }
    return Math.floor(gameData.world.currentWave / div);
}
function getWavesNeededForTier() {
    return 90 + gameData.world.currentTier * 10;
}
function quitChallenges() {
    gameData.challenges.forEach((ch) => {
        if (ch.active) {
            ch.quit();
        }
    });
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function createTowerSites() {
    let leftToRight = true;
    let currenty = 15;
    let currentx = 5;
    const tierSize = 40 + (Math.floor(gameData.world.currentTier / 5) + 1) * 10;
    let index = 0;
    gameData.towers = [];
    removeAllChildNodes(document.getElementById('TowerUnBoughtInfo'));
    removeAllChildNodes(document.getElementById('TowerBoughtInfo'));
    while (currenty <= tierSize) {
        if (leftToRight) {
            currentx = 5;
            while (currentx <= tierSize - 10) {
                const currentTower = new Tower(new Vector(currentx, currenty), index);
                gameData.towers.push(currentTower);
                currentTower.active = true;
                index += 1;
                currentx += 10;
            }
        }
        else {
            currentx = tierSize - 5;
            while (currentx > 10) {
                const currentTower = new Tower(new Vector(currentx, currenty), index);
                gameData.towers.push(currentTower);
                currentTower.active = true;
                index += 1;
                currentx -= 10;
            }
        }
        currenty += 20;
        leftToRight = !leftToRight;
    }
}
function getSpecialsCount() {
    return (gameData.world.bossEnemiesToSpawn +
        gameData.world.fastEnemiesToSpawn +
        gameData.world.tankEnemiesToSpawn +
        gameData.world.medicEnemiesToSpawn +
        gameData.world.bradleyEnemiesToSpawn +
        gameData.world.paladinEnemiesToSpawn +
        gameData.world.knightEnemiesToSpawn +
        gameData.world.flyerEnemiesToSpawn +
        gameData.world.dumboEnemiesToSpawn +
        gameData.world.clericEnemiesToSpawn +
        gameData.world.hummingbirdEnemiesToSpawn);
}
function init(prestigelevel = 0) {
    if (prestigelevel >= 1) {
        display.prestige1DisplayReset();
        gameData.towers.forEach((t) => {
            t.delete();
        });
        if (pebblesFromPrestige().greaterThan(0)) {
            gameData.stats.last10Prestige1amounts.unshift(pebblesFromPrestige());
            gameData.stats.last10Prestige1amounts.splice(10);
            gameData.stats.last10Prestige1times.unshift(gameData.stats.prestige1ticks);
            gameData.stats.last10Prestige1times.splice(10);
            gameData.stats.last10Prestige1waves.unshift(gameData.world.currentWave - 1);
            gameData.stats.last10Prestige1waves.splice(10);
            gameData.stats.last10Prestige1tier.unshift(gameData.world.currentTier);
            gameData.stats.last10Prestige1tier.splice(10);
        }
        gameData.stats.prestige1ticks = 0;
        gameData.stats.prestige1 += 1;
        gameData.stats.bestPrestige1Rate = new JBDecimal(0.00000000001);
        gameData.resources.pebbles.add(pebblesFromPrestige());
        gameData.resources.metal.amount = new JBDecimal(10);
        gameData.resources.dust.amount = new JBDecimal(0);
        gameData.resources.particles.amount = new JBDecimal(0);
        gameData.world.deathlevel = 0;
        gameData.world.currentWave = 0;
        gameData.world.highestWaveCompleted = 0;
        // eslint-disable-next-line no-use-before-define
        resetSpawns(true);
        gameData.derivatives.forEach((d) => {
            d.bought = 0;
            d.owned = new JBDecimal(0);
            d.upgradeLevel = 0;
        });
        if (gameData.rockUpgrades[7].bought > 0) {
            gameData.resources.metal.add(new JBDecimal(1000));
        }
        gameData.speedDerivatives.forEach((d) => {
            d.owned = new JBDecimal(d.bought);
        });
        gameData.producer.bought = 0;
        gameData.producer.owned = new JBDecimal(0);
        gameData.producer.upgradeLevel = 0;
        if (gameData.tierblueprintsauto) {
            while (gameData.tierBlueprints.length < gameData.world.currentTier + 1) {
                gameData.tierBlueprints.push(new TierBluePrint());
            }
            const currentBluePrint = gameData.tierBlueprints[gameData.world.currentTier];
            gameData.towers.forEach((t, index) => {
                if (typeof currentBluePrint.blueprints[index] === 'undefined') {
                    t.type = '';
                }
                else if (availableTowersByType(currentBluePrint.blueprints[index].towerType) > 0) {
                    t.type = currentBluePrint.blueprints[index].towerType;
                    t.setInfoByType();
                }
            });
        }
    }
    if (prestigelevel >= 2) {
        if (rocksFromPrestige().greaterThan(0)) {
            gameData.stats.last10Prestige2amounts.unshift(rocksFromPrestige());
            gameData.stats.last10Prestige2amounts.splice(10);
            gameData.stats.last10Prestige2times.unshift(gameData.stats.prestige2ticks);
            gameData.stats.last10Prestige2times.splice(10);
        }
        // eslint-disable-next-line no-global-assign
        display.prestige2DisplayReset();
        gameData.stats.bestPrestige2Rate = new JBDecimal(0.0000000001);
        gameData.stats.prestige2 += 1;
        gameData.stats.prestige2ticks = 0;
        gameData.stats.prestige1 = 0;
        gameData.resources.rocks.add(rocksFromPrestige());
        gameData.resources.pebbles.amount = new JBDecimal(0);
        gameData.challenges.forEach((c) => {
            c.completed = 0;
        });
        gameData.world.autoChallenge = false;
        gameData.world.nextAutoChallenge = 0;
        gameData.upgrades.forEach((u) => {
            u.bought = 0;
            u.owned = new JBDecimal(0);
        });
        // gameData.derivatives.forEach((d) => {
        //   d.bought = 0;
        //   d.owned = new JBDecimal(0);
        //   d.upgradeLevel = 0;
        //   });
    }
    if (prestigelevel >= 3) {
        if (bouldersFromPrestige().greaterThan(0)) {
            gameData.stats.last10Prestige3amounts.unshift(bouldersFromPrestige());
            gameData.stats.last10Prestige3amounts.splice(10);
            gameData.stats.last10Prestige3times.unshift(gameData.stats.prestige3ticks);
            gameData.stats.last10Prestige3times.splice(10);
        }
        gameData.stats.bestPrestige3Rate = new JBDecimal(0.0000000001);
        gameData.stats.prestige3 += 1;
        gameData.stats.prestige3ticks = 0;
        gameData.stats.prestige2 = 0;
        gameData.resources.boulders.add(bouldersFromPrestige());
        gameData.resources.rocks.amount = new JBDecimal(0);
        gameData.resources.timeparticles.amount = new JBDecimal(0);
        gameData.rockUpgrades.forEach((u) => {
            u.bought = 0;
            u.owned = new JBDecimal(0);
        });
        gameData.derivatives.forEach((d) => {
            d.bought = 0;
            d.owned = new JBDecimal(0);
            d.upgradeLevel = 0;
        });
        gameData.speedDerivatives.forEach((d) => {
            d.bought = 0;
            d.owned = new JBDecimal(0);
            d.upgradeLevel = 0;
        });
    }
    if (prestigelevel === 0) {
        gameData = new SaveGameData('new');
        let total = 0;
        for (let index = 1; index <= 10000; index += 1) {
            total += Math.floor(Math.sqrt(index));
            internalInflationArray.push(total);
        }
        total = 0;
        for (let index = 0; index <= 150; index += 1) {
            total += index;
            achievementbonusarray.push(total);
        }
        // gameData.resources.metal.subtract(new JBDecimal(10));
        // gameData.derivatives[0].bought += 1;
        // gameData.derivatives[0].owned = gameData.derivatives[0].owned.add(1);
        createTowerSites();
        const savegame = JSON.parse(localStorage.getItem('save'));
        if (savegame !== null) {
            gameData.name = savegame.name;
            if (savegame.version >= 1) {
                if (typeof savegame.storyElements !== 'undefined') {
                    for (let index = 0; index < savegame.storyElements.length; index += 1) {
                        const element = savegame.storyElements[index];
                        gameData.storyElements[index].printed = element.printed;
                    }
                }
                if (typeof savegame.stats.prestige2 !== 'undefined') {
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
                }
                if (typeof savegame.stats.prestige3 !== 'undefined') {
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
                }
                gameData.stats.prestige1 = savegame.stats.prestige1;
                gameData.stats.prestige1ticks = savegame.stats.prestige1ticks;
                gameData.stats.bestPrestige1Rate.mantissa = savegame.stats.bestPrestige1Rate.mantissa;
                gameData.stats.bestPrestige1Rate.exponent = savegame.stats.bestPrestige1Rate.exponent;
                gameData.stats.highestEverWave = savegame.stats.highestEverWave;
                if (typeof savegame.stats.last10Prestige1tier !== 'undefined') {
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
                }
                gameData.options.standardNotation = savegame.options.standardNotation;
                gameData.options.logNotBase = savegame.options.logNotBase;
                gameData.world.timeElapsed = savegame.world.timeElapsed;
                gameData.world.deathlevel = savegame.world.deathlevel;
                gameData.world.paused = savegame.world.paused;
                gameData.world.currentWave = savegame.world.currentWave;
                gameData.world.enemiesToSpawn = savegame.world.enemiesToSpawn;
                gameData.world.fastEnemiesToSpawn = savegame.world.fastEnemiesToSpawn;
                gameData.world.highestWaveCompleted = savegame.world.highestWaveCompleted;
                if (typeof savegame.world.knightEnemiesToSpawn !== 'undefined') {
                    gameData.world.knightEnemiesToSpawn = savegame.world.knightEnemiesToSpawn;
                }
                gameData.world.tankEnemiesToSpawn = savegame.world.tankEnemiesToSpawn;
                if (typeof savegame.world.medicEnemiesToSpawn !== 'undefined') {
                    gameData.world.medicEnemiesToSpawn = savegame.world.medicEnemiesToSpawn;
                }
                if (typeof savegame.world.clericEnemiesToSpawn !== 'undefined') {
                    gameData.world.clericEnemiesToSpawn = savegame.world.clericEnemiesToSpawn;
                }
                if (typeof savegame.world.bradleyEnemiesToSpawn !== 'undefined') {
                    gameData.world.bradleyEnemiesToSpawn = savegame.world.bradleyEnemiesToSpawn;
                }
                if (typeof savegame.world.paladinEnemiesToSpawn !== 'undefined') {
                    gameData.world.paladinEnemiesToSpawn = savegame.world.paladinEnemiesToSpawn;
                }
                gameData.world.hummingbirdEnemiesToSpawn = savegame.world.hummingbirdEnemiesToSpawn;
                gameData.world.dumboEnemiesToSpawn = savegame.world.dumboEnemiesToSpawn;
                gameData.world.flyerEnemiesToSpawn = savegame.world.flyerEnemiesToSpawn;
                gameData.world.tierUnlocked = savegame.world.tierUnlocked;
                gameData.world.currentTier = savegame.world.currentTier;
                gameData.world.timeElapsed = savegame.world.timeElapsed;
                gameData.world.ticksToNextSpawn = savegame.world.ticksToNextSpawn;
                if (typeof savegame.world.autoChallenge !== 'undefined') {
                    gameData.world.autoChallenge = savegame.world.autoChallenge;
                    gameData.world.nextAutoChallenge = savegame.world.nextAutoChallenge;
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
                    newEnemy.baseMaxHitPoints.mantissa = element.baseMaxHitPoints.mantissa;
                    newEnemy.baseMaxHitPoints.exponent = element.baseMaxHitPoints.exponent;
                    newEnemy.damagetaken.mantissa = element.damagetaken.mantissa;
                    newEnemy.damagetaken.exponent = element.damagetaken.exponent;
                    newEnemy.movementPerSec = element.movementPerSec;
                    newEnemy.isBullet = false;
                    newEnemy.slowed = element.slowed;
                    newEnemy.targetList = [];
                    element.targetList.forEach((t) => {
                        newEnemy.targetList.push(new Vector(t.x, t.y));
                    });
                    // element.targetList.forEach(t => newEnemy.targetList.push(new movingObject(t.pos.x, t.pos.y, t.movementPerSec, [])))
                    newEnemy.targetListIndex = element.targetListIndex;
                    newEnemy.type = element.type;
                    element.bullets.forEach((b) => newEnemy.bullets.push(new Bullet(new Vector(b.pos.x, b.pos.y), element, b.damage, b.defenseDamage, b.crit)));
                    gameData.enemies.push(newEnemy);
                }
                createTowerSites();
                // gameData.towers = [];
                for (let index = 0; index < gameData.towers.length; index += 1) {
                    const element = savegame.towers[index];
                    const newTower = gameData.towers[index];
                    newTower.type = element.type;
                    newTower.setInfoByType();
                    newTower.bought = element.bought;
                    newTower.upgradeLevel = element.upgradeLevel;
                    newTower.ticksToNextBullet = element.ticksToNextBullet;
                    newTower.autoOn = element.autoOn;
                    if (typeof element.tactics !== 'undefined') {
                        newTower.tactics.fastest = element.tactics.fastest;
                        newTower.tactics.highestHealth = element.tactics.highestHealth;
                        newTower.tactics.lowestHealth = element.tactics.lowestHealth;
                        newTower.tactics.healer = element.tactics.healer;
                    }
                }
                if (typeof savegame.tierblueprintsauto !== 'undefined') {
                    gameData.tierblueprintsauto = savegame.tierblueprintsauto;
                }
                gameData.resources.dust.amount.mantissa = savegame.resources.dust.amount.mantissa;
                gameData.resources.dust.amount.exponent = savegame.resources.dust.amount.exponent;
                gameData.resources.metal.amount.mantissa = savegame.resources.metal.amount.mantissa;
                gameData.resources.metal.amount.exponent = savegame.resources.metal.amount.exponent;
                gameData.resources.pebbles.amount.mantissa = savegame.resources.pebbles.amount.mantissa;
                gameData.resources.pebbles.amount.exponent = savegame.resources.pebbles.amount.exponent;
                gameData.resources.rocks.amount.mantissa = savegame.resources.rocks.amount.mantissa;
                gameData.resources.rocks.amount.exponent = savegame.resources.rocks.amount.exponent;
                gameData.resources.boulders.amount.mantissa = savegame.resources.boulders.amount.mantissa;
                gameData.resources.boulders.amount.exponent = savegame.resources.boulders.amount.exponent;
                gameData.resources.particles.amount.mantissa = savegame.resources.particles.amount.mantissa;
                gameData.resources.particles.amount.exponent = savegame.resources.particles.amount.exponent;
                gameData.resources.timeparticles.amount.mantissa = savegame.resources.timeparticles.amount.mantissa;
                gameData.resources.timeparticles.amount.exponent = savegame.resources.timeparticles.amount.exponent;
                if (typeof savegame.resources.shards !== 'undefined') {
                    gameData.resources.shards.amount.mantissa = savegame.resources.shards.amount.mantissa;
                    gameData.resources.shards.amount.exponent = savegame.resources.shards.amount.exponent;
                }
                for (let index = 0; index < savegame.upgrades.length; index += 1) {
                    const element = savegame.upgrades[index];
                    gameData.upgrades[index].bought = element.bought;
                    gameData.upgrades[index].owned.exponent = element.owned.exponent;
                    gameData.upgrades[index].owned.mantissa = element.owned.mantissa;
                }
                if (typeof savegame.rockUpgrades !== 'undefined') {
                    for (let index = 0; index < savegame.rockUpgrades.length; index += 1) {
                        const element = savegame.rockUpgrades[index];
                        gameData.rockUpgrades[index].bought = element.bought;
                        gameData.rockUpgrades[index].owned.exponent = element.owned.exponent;
                        gameData.rockUpgrades[index].owned.mantissa = element.owned.mantissa;
                    }
                }
                if (typeof savegame.boulderUpgrades !== 'undefined') {
                    for (let index = 0; index < savegame.boulderUpgrades.length; index += 1) {
                        const element = savegame.boulderUpgrades[index];
                        gameData.boulderUpgrades[index].bought = element.bought;
                        gameData.boulderUpgrades[index].owned.exponent = element.owned.exponent;
                        gameData.boulderUpgrades[index].owned.mantissa = element.owned.mantissa;
                    }
                }
                for (let index = 0; index < savegame.derivatives.length; index += 1) {
                    const element = gameData.derivatives[index];
                    element.bought = savegame.derivatives[index].bought;
                    element.owned.mantissa = savegame.derivatives[index].owned.mantissa;
                    element.owned.exponent = savegame.derivatives[index].owned.exponent;
                    element.upgradeLevel = savegame.derivatives[index].upgradeLevel;
                    element.autoOn = savegame.derivatives[index].autoOn;
                }
                for (let index = 0; index < savegame.speedDerivatives.length; index += 1) {
                    const element = gameData.speedDerivatives[index];
                    element.bought = savegame.speedDerivatives[index].bought;
                    element.owned.mantissa = savegame.speedDerivatives[index].owned.mantissa;
                    element.owned.exponent = savegame.speedDerivatives[index].owned.exponent;
                    element.upgradeLevel = savegame.speedDerivatives[index].upgradeLevel;
                }
                if (typeof savegame.timeDerivatives !== 'undefined') {
                    for (let index = 0; index < savegame.timeDerivatives.length; index += 1) {
                        const element = gameData.timeDerivatives[index];
                        element.bought = savegame.timeDerivatives[index].bought;
                        element.owned.mantissa = savegame.timeDerivatives[index].owned.mantissa;
                        element.owned.exponent = savegame.timeDerivatives[index].owned.exponent;
                        element.upgradeLevel = savegame.timeDerivatives[index].upgradeLevel;
                    }
                }
                gameData.producer.bought = savegame.producer.bought;
                gameData.producer.owned.mantissa = savegame.producer.owned.mantissa;
                gameData.producer.owned.exponent = savegame.producer.owned.exponent;
                gameData.producer.upgradeLevel = savegame.producer.upgradeLevel;
                gameData.producer.autoOn = savegame.producer.autoOn;
                if (typeof savegame.equipment !== 'undefined') {
                    savegame.equipment.forEach((e) => {
                        const newEquipment = new Equipment(e.name);
                        e.abilities.forEach((a) => {
                            const newAbility = new EquipmentAbility(a.name);
                            newAbility.levels = a.levels;
                            newEquipment.abilities.push(newAbility);
                        });
                        gameData.equipment.push(newEquipment);
                    });
                }
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
                if (typeof savegame.tierfeats !== 'undefined') {
                    savegame.tierfeats.forEach((tf, tierindex) => {
                        tf.feats.forEach((f, featindex) => {
                            gameData.tierfeats[tierindex].feats[featindex].completed = savegame.tierfeats[tierindex].feats[featindex].completed;
                        });
                    });
                }
            }
        }
    }
    display.drone = new Enemy(true);
    if (gameData.stats.prestige1 > 0 || gameData.stats.prestige2 > 0 || gameData.stats.prestige3 > 0) {
        display.addToDisplay('Here we go again', DisplayCategory.Story);
    }
    else {
        display.addToDisplay('Our story begins', DisplayCategory.Story);
    }
    CheckAchievementCompletions();
    initted = true;
}
function resetSpawns(killexistingenemies = true) {
    gameData.world.currentWave += 1;
    gameData.challenges.forEach((ch) => {
        if (ch.active) {
            ch.checkForCompletion();
        }
    });
    CheckAchievementCompletions(); // check before resetting to new tier
    if (gameData.world.currentWave > getWavesNeededForTier()) {
        // earned new equipment
        const newEquipment = new Equipment(`Tier ${gameData.world.currentTier.toString()}`);
        newEquipment.NewEquipment(gameData.world.currentTier);
        gameData.equipment.push(newEquipment);
        gameData.world.nextSaveGameTime = new Date();
        quitChallenges();
        if (gameData.world.currentTier === gameData.world.tierUnlocked) {
            gameData.world.tierUnlocked += 1;
            while (gameData.tierBlueprints.length < gameData.world.currentTier + 1) {
                gameData.tierBlueprints.push(new TierBluePrint());
            }
        }
        init(1);
    }
    display.drone = new Enemy(true);
    gameData.world.enemiesToSpawn = 9 + gameData.world.currentWave - gameData.rockUpgrades[8].bought;
    gameData.world.tankEnemiesToSpawn = getNumberOfEnemies(5);
    gameData.world.fastEnemiesToSpawn = getNumberOfEnemies(10);
    gameData.world.flyerEnemiesToSpawn = getNumberOfEnemies(15);
    gameData.world.clericEnemiesToSpawn = getNumberOfEnemies(20);
    gameData.world.bradleyEnemiesToSpawn = getNumberOfEnemies(25);
    gameData.world.dumboEnemiesToSpawn = getNumberOfEnemies(30);
    gameData.world.hummingbirdEnemiesToSpawn = getNumberOfEnemies(35);
    gameData.world.knightEnemiesToSpawn = getNumberOfEnemies(40);
    if (gameData.world.currentTier > 1) {
        gameData.world.paladinEnemiesToSpawn = getNumberOfEnemies(45);
    }
    if (gameData.world.currentTier > 2) {
        gameData.world.medicEnemiesToSpawn = getNumberOfEnemies(50);
    }
    if (gameData.world.currentWave >= 10) {
        gameData.world.bossEnemiesToSpawn = 1;
    }
    else {
        gameData.world.bossEnemiesToSpawn = 0;
    }
    if (killexistingenemies) {
        gameData.enemies.forEach((e) => {
            e.bullets = [];
        });
        gameData.enemies = [];
        gameData.world.ticksToNextSpawn = 1000;
    }
    else {
        display.addToDisplay(`Wave ${gameData.world.currentWave - 1} completed!`, DisplayCategory.Story);
        gameData.world.ticksToNextSpawn = 1000;
    }
    if (gameData.world.enemiesToSpawn < getSpecialsCount()) {
        gameData.world.enemiesToSpawn = getSpecialsCount();
    }
}
function processStuff(ticks) {
    if (gameData.boulderUpgrades[5].bought > 0) {
        AutoBuyPebbles();
    }
    while (gameData.tierfeats.length < gameData.world.tierUnlocked) {
        gameData.tierfeats.push(createFeatsForTier(gameData.tierfeats.length + 1));
    }
    gameData.challenges.forEach((c) => {
        c.available = false;
    });
    gameData.challenges[0].available = true;
    gameData.challenges[1].available = true;
    gameData.challenges[2].available = true;
    gameData.challenges[3].available = true;
    const achievementbonus = getAchievementBonus();
    if (achievementbonus > 5) {
        gameData.challenges[4].available = true;
    }
    if (achievementbonus > 10) {
        gameData.challenges[5].available = true;
    }
    if (achievementbonus > 15) {
        gameData.challenges[6].available = true;
    }
    if (achievementbonus > 100) {
        gameData.challenges[7].available = true;
    }
    if (gameData.world.autoChallenge) {
        let challengeActive = false;
        gameData.challenges.forEach((c) => {
            if (c.active) {
                challengeActive = true;
            }
        });
        if (!challengeActive) {
            if (gameData.challenges[gameData.world.nextAutoChallenge].available) {
                gameData.challenges[gameData.world.nextAutoChallenge].setActive();
            }
            gameData.world.nextAutoChallenge += 1;
            if (gameData.world.nextAutoChallenge >= gameData.challenges.length) {
                gameData.world.nextAutoChallenge = 0;
            }
        }
        gameData.challenges.forEach((c) => {
            if (c.completed === 0 && !c.active && c.available) {
                c.setActive();
            }
        });
    }
    gameData.stats.prestige1ticks += ticks;
    gameData.stats.prestige2ticks += ticks;
    gameData.stats.prestige3ticks += ticks;
    gameData.world.ticksToNextSpawn -= ticks;
    gameData.producer.costMultiplier = 10 - gameData.rockUpgrades[5].bought;
    const currentPebbleRate = getCurrentPebbleRate();
    if (currentPebbleRate.greaterThan(gameData.stats.bestPrestige1Rate)) {
        gameData.stats.bestPrestige1Rate = new JBDecimal(currentPebbleRate);
    }
    const currentRockRate = getCurrentRockRate();
    if (currentRockRate.greaterThan(gameData.stats.bestPrestige2Rate)) {
        gameData.stats.bestPrestige2Rate = new JBDecimal(currentRockRate);
    }
    const currentBoulderRate = getCurrentBoulderRate();
    if (currentBoulderRate.greaterThan(gameData.stats.bestPrestige3Rate)) {
        gameData.stats.bestPrestige3Rate = new JBDecimal(currentBoulderRate);
    }
    gameData.resources.metal.add(gameData.derivatives[0].production());
    // gameData.resources.metal.add(gameData.derivatives[1].production());
    // gameData.resources.metal.add(gameData.derivatives[2].production());
    // gameData.resources.metal.add(gameData.derivatives[3].production());
    // gameData.resources.metal.add(gameData.derivatives[4].production());
    // gameData.resources.metal.add(gameData.derivatives[5].production());
    // gameData.resources.metal.add(gameData.derivatives[6].production());
    // gameData.resources.metal.add(gameData.derivatives[7].production());
    gameData.derivatives[0].owned = gameData.derivatives[0].owned.add(gameData.derivatives[1].production());
    gameData.derivatives[1].owned = gameData.derivatives[1].owned.add(gameData.derivatives[2].production());
    gameData.derivatives[2].owned = gameData.derivatives[2].owned.add(gameData.derivatives[3].production());
    gameData.derivatives[3].owned = gameData.derivatives[3].owned.add(gameData.derivatives[4].production());
    gameData.derivatives[4].owned = gameData.derivatives[4].owned.add(gameData.derivatives[5].production());
    gameData.derivatives[5].owned = gameData.derivatives[5].owned.add(gameData.derivatives[6].production());
    gameData.derivatives[6].owned = gameData.derivatives[6].owned.add(gameData.derivatives[7].production());
    gameData.resources.particles.add(gameData.speedDerivatives[0].production());
    gameData.speedDerivatives[0].owned = gameData.speedDerivatives[0].owned.add(gameData.speedDerivatives[1].production());
    gameData.speedDerivatives[1].owned = gameData.speedDerivatives[1].owned.add(gameData.speedDerivatives[2].production());
    gameData.speedDerivatives[2].owned = gameData.speedDerivatives[2].owned.add(gameData.speedDerivatives[3].production());
    gameData.speedDerivatives[3].owned = gameData.speedDerivatives[3].owned.add(gameData.speedDerivatives[4].production());
    gameData.speedDerivatives[4].owned = gameData.speedDerivatives[4].owned.add(gameData.speedDerivatives[5].production());
    gameData.resources.timeparticles.add(gameData.timeDerivatives[0].production());
    gameData.timeDerivatives[0].owned = gameData.timeDerivatives[0].owned.add(gameData.timeDerivatives[1].production());
    gameData.timeDerivatives[1].owned = gameData.timeDerivatives[1].owned.add(gameData.timeDerivatives[2].production());
    gameData.timeDerivatives[2].owned = gameData.timeDerivatives[2].owned.add(gameData.timeDerivatives[3].production());
    gameData.timeDerivatives[3].owned = gameData.timeDerivatives[3].owned.add(gameData.timeDerivatives[4].production());
    gameData.timeDerivatives[4].owned = gameData.timeDerivatives[4].owned.add(gameData.timeDerivatives[5].production());
    gameData.upgrades.forEach((u) => {
        u.addedlimit = 0;
    });
    gameData.derivatives.forEach((u) => {
        if (u.index <= 0) {
            u.active = true;
        }
        else if (u.index <= gameData.upgrades[8].bought) {
            u.active = true;
        }
        else {
            u.active = false;
        }
    });
    if (gameData.challenges[1].active || gameData.challenges[1].completed < 1) {
        gameData.producer.active = false;
    }
    else {
        gameData.producer.active = true;
    }
    if (lastachievementcount > 20) {
        gameData.producer.autoBuy();
        gameData.derivatives.forEach((u) => {
            u.autoBuy();
        });
    }
    if (lastachievementcount > 25) {
        gameData.towers.forEach((t) => {
            t.autoBuy();
        });
    }
    if (gameData.rockUpgrades[6].bought > 0) {
        gameData.upgrades.forEach((u, index) => {
            if (index <= 1) {
                u.addedlimit += 10;
            }
            if (index > 8) {
                if (index !== 17 && index !== 18 && index !== 19) {
                    u.addedlimit += 10;
                }
            }
        });
    }
    if (gameData.boulderUpgrades[2].bought > 0) {
        gameData.upgrades.forEach((u, index) => {
            if (index <= 1) {
                u.addedlimit += 10;
            }
            if (index > 8) {
                u.addedlimit += 10;
            }
        });
    }
    for (let index = gameData.enemies.length - 1; index >= 0; index--) {
        const e = gameData.enemies[index];
        if (e.act()) {
            // returns true if enemy died
            gameData.enemies[index].bullets = [];
            gameData.enemies.splice(index, 1);
        }
        else if (e.pos.y >= gameData.world.currentTier * 10 + 40) {
            // returns true if enemy has made it off board
            gameData.world.mulligansused += 1;
            const maxMulligans = maxMulligansCalc();
            if (gameData.world.mulligansused > maxMulligans) {
                gameData.challenges.forEach((ch) => {
                    if (ch.active) {
                        ch.fail();
                    }
                });
                gameData.world.deathlevel += 1;
                gameData.world.mulligansused = 0;
                gameData.world.currentWave -= gameData.world.deathlevel;
                if (gameData.world.currentWave < 1) {
                    gameData.world.currentWave = 1;
                }
                resetSpawns(true);
                display.addToDisplay('You have been overcome.  The pressure lessens.', DisplayCategory.Story);
                break;
            }
            else {
                e.pos = new Vector(0, 5);
                e.targetListIndex = 0;
            }
        }
    }
    gameData.towers.forEach((t) => {
        t.act();
    });
    if (gameData.world.ticksToNextSpawn <= 0 && gameData.world.enemiesToSpawn > 0) {
        const newEnemy = new Enemy(false);
        gameData.enemies.push(newEnemy);
        gameData.world.ticksToNextSpawn += 1000 - gameData.world.currentWave * 5;
        gameData.world.enemiesToSpawn -= 1;
    }
    if (gameData.world.enemiesToSpawn === 0 && gameData.enemies.length === 0) {
        if (gameData.world.currentWave > gameData.stats.highestEverWave) {
            gameData.stats.highestEverWave = gameData.world.currentWave;
        }
        if (gameData.world.currentWave > gameData.world.highestWaveCompleted) {
            gameData.world.highestWaveCompleted = gameData.world.currentWave;
        }
        resetSpawns(false);
    }
    gameData.challenges.forEach((ch) => {
        if (ch.active) {
            ch.checkForCompletion();
        }
    });
}
function getParticleBonus() {
    let particlebonus = new JBDecimal(gameData.resources.particles.amount);
    if (particlebonus.lessThan(1)) {
        particlebonus = new JBDecimal(1);
    }
    return particlebonus;
}
function getTimeParticleBonus() {
    let particlebonus = new JBDecimal(gameData.resources.timeparticles.amount);
    if (particlebonus.lessThan(1)) {
        particlebonus = new JBDecimal(1);
    }
    return particlebonus;
}
function getObjectFitSize(contains /* true = contain, false = cover */, containerWidth, containerHeight, width, height) {
    const doRatio = width / height;
    const cRatio = containerWidth / containerHeight;
    let targetWidth = 0;
    let targetHeight = 0;
    const test = contains ? doRatio > cRatio : doRatio < cRatio;
    if (test) {
        targetWidth = containerWidth;
        targetHeight = targetWidth / doRatio;
    }
    else {
        targetHeight = containerHeight;
        targetWidth = targetHeight * doRatio;
    }
    return {
        width: targetWidth,
        height: targetHeight,
        x: (containerWidth - targetWidth) / 2,
        y: (containerHeight - targetHeight) / 2,
    };
}
function updateGUI() {
    ChooseTutorial();
    if (document.getElementById('towertab').classList.contains('active')) {
        document.getElementById('TowerBluePrint').classList.add('d-none');
        if (gameData.world.tierUnlocked > 1) {
            document.getElementById('TowerBluePrint').classList.remove('d-none');
            if (gameData.tierblueprintsauto) {
                document.getElementById('blueprintLoadAuto').innerHTML = 'Turn Off';
                document.getElementById('blueprintLoadAuto').classList.add('bg-success');
                document.getElementById('blueprintLoadAuto').classList.remove('bg-danger');
            }
            else {
                document.getElementById('blueprintLoadAuto').innerHTML = 'Turn On';
                document.getElementById('blueprintLoadAuto').classList.remove('bg-success');
                document.getElementById('blueprintLoadAuto').classList.add('bg-danger');
            }
        }
        if (dirtyTowers) {
            const unboughts = document.getElementById('TowerUnBoughtInfo');
            removeAllChildNodes(unboughts);
            removeAllChildNodes(document.getElementById('TowerBoughtInfo'));
            gameData.towers.forEach((t) => {
                t.CreateDisplay();
            });
            if (totalAvailableTowers() < 1) {
                unboughts.classList.add('d-none');
                document.getElementById('TowerUnboughtHeader').classList.add('d-none');
            }
            else {
                unboughts.classList.remove('d-none');
                document.getElementById('TowerUnboughtHeader').classList.remove('d-none');
            }
            dirtyTowers = false;
        }
    }
    if (document.getElementById('resourcestab').classList.contains('active')) {
        document.getElementById('particlesamount').innerHTML = gameData.resources.particles.amount.ToString();
        document.getElementById('particlesb').innerHTML = getParticleBonus().ToString();
        document.getElementById('timeparticles').innerHTML = gameData.resources.timeparticles.amount.ToString();
        document.getElementById('timeparticlesbonus').innerHTML = getTimeParticleBonus().ToString();
        document.getElementById('particles').classList.add('d-none');
        document.getElementById('accelerationderivative').classList.add('d-none');
        document.getElementById('jerkderivative').classList.add('d-none');
        document.getElementById('snapderivative').classList.add('d-none');
        document.getElementById('cracklederivative').classList.add('d-none');
        document.getElementById('popderivative').classList.add('d-none');
        if (gameData.stats.prestige2 > 0) {
            document.getElementById('particles').classList.remove('d-none');
            if (gameData.speedDerivatives[0].owned.greaterThan(0)) {
                document.getElementById('accelerationderivative').classList.remove('d-none');
            }
            if (gameData.speedDerivatives[1].owned.greaterThan(0)) {
                document.getElementById('jerkderivative').classList.remove('d-none');
            }
            if (gameData.speedDerivatives[2].owned.greaterThan(0)) {
                document.getElementById('snapderivative').classList.remove('d-none');
            }
            if (gameData.speedDerivatives[3].owned.greaterThan(0)) {
                document.getElementById('cracklederivative').classList.remove('d-none');
            }
            if (gameData.speedDerivatives[4].owned.greaterThan(0)) {
                document.getElementById('popderivative').classList.remove('d-none');
            }
        }
        if (lastachievementcount > 25) {
            document.getElementById('btnAutoBuyProduction').classList.remove('d-none');
            document.getElementById('btnAutoBuyMiner').classList.remove('d-none');
            document.getElementById('btnAutoBuySupervisor').classList.remove('d-none');
            document.getElementById('btnAutoBuyForeman').classList.remove('d-none');
            document.getElementById('btnAutoBuyManager').classList.remove('d-none');
            document.getElementById('btnAutoBuyMiddleManagement').classList.remove('d-none');
            document.getElementById('btnAutoBuyUpperManagement').classList.remove('d-none');
            document.getElementById('btnAutoBuyVicePresident').classList.remove('d-none');
            document.getElementById('btnAutoBuyPresident').classList.remove('d-none');
            document.getElementById('btnAutoBuyProduction').classList.add('bg-danger');
            document.getElementById('btnAutoBuyProduction').classList.remove('bg-success');
            if (gameData.producer.autoOn) {
                document.getElementById('btnAutoBuyProduction').classList.remove('bg-danger');
                document.getElementById('btnAutoBuyProduction').classList.add('bg-success');
            }
            document.getElementById('btnAutoBuyMiner').classList.add('bg-danger');
            document.getElementById('btnAutoBuyMiner').classList.remove('bg-success');
            if (gameData.derivatives[0].autoOn) {
                document.getElementById('btnAutoBuyMiner').classList.remove('bg-danger');
                document.getElementById('btnAutoBuyMiner').classList.add('bg-success');
            }
            document.getElementById('btnAutoBuySupervisor').classList.add('bg-danger');
            document.getElementById('btnAutoBuySupervisor').classList.remove('bg-success');
            if (gameData.derivatives[1].autoOn) {
                document.getElementById('btnAutoBuySupervisor').classList.remove('bg-danger');
                document.getElementById('btnAutoBuySupervisor').classList.add('bg-success');
            }
            document.getElementById('btnAutoBuyForeman').classList.add('bg-danger');
            document.getElementById('btnAutoBuyForeman').classList.remove('bg-success');
            if (gameData.derivatives[2].autoOn) {
                document.getElementById('btnAutoBuyForeman').classList.remove('bg-danger');
                document.getElementById('btnAutoBuyForeman').classList.add('bg-success');
            }
            document.getElementById('btnAutoBuyManager').classList.add('bg-danger');
            document.getElementById('btnAutoBuyManager').classList.remove('bg-success');
            if (gameData.derivatives[3].autoOn) {
                document.getElementById('btnAutoBuyManager').classList.remove('bg-danger');
                document.getElementById('btnAutoBuyManager').classList.add('bg-success');
            }
            document.getElementById('btnAutoBuyMiddleManagement').classList.add('bg-danger');
            document.getElementById('btnAutoBuyMiddleManagement').classList.remove('bg-success');
            if (gameData.derivatives[4].autoOn) {
                document.getElementById('btnAutoBuyMiddleManagement').classList.remove('bg-danger');
                document.getElementById('btnAutoBuyMiddleManagement').classList.add('bg-success');
            }
            document.getElementById('btnAutoBuyUpperManagement').classList.add('bg-danger');
            document.getElementById('btnAutoBuyUpperManagement').classList.remove('bg-success');
            if (gameData.derivatives[5].autoOn) {
                document.getElementById('btnAutoBuyUpperManagement').classList.remove('bg-danger');
                document.getElementById('btnAutoBuyUpperManagement').classList.add('bg-success');
            }
            document.getElementById('btnAutoBuyVicePresident').classList.add('bg-danger');
            document.getElementById('btnAutoBuyVicePresident').classList.remove('bg-success');
            if (gameData.derivatives[6].autoOn) {
                document.getElementById('btnAutoBuyVicePresident').classList.remove('bg-danger');
                document.getElementById('btnAutoBuyVicePresident').classList.add('bg-success');
            }
            document.getElementById('btnAutoBuyPresident').classList.add('bg-danger');
            document.getElementById('btnAutoBuyPresident').classList.remove('bg-success');
            if (gameData.derivatives[7].autoOn) {
                document.getElementById('btnAutoBuyPresident').classList.remove('bg-danger');
                document.getElementById('btnAutoBuyPresident').classList.add('bg-success');
            }
        }
        else {
            document.getElementById('btnAutoBuyProduction').classList.add('d-none');
            document.getElementById('btnAutoBuyMiner').classList.add('d-none');
            document.getElementById('btnAutoBuySupervisor').classList.add('d-none');
            document.getElementById('btnAutoBuyForeman').classList.add('d-none');
            document.getElementById('btnAutoBuyManager').classList.add('d-none');
            document.getElementById('btnAutoBuyMiddleManagement').classList.add('d-none');
            document.getElementById('btnAutoBuyUpperManagement').classList.add('d-none');
            document.getElementById('btnAutoBuyVicePresident').classList.add('d-none');
            document.getElementById('btnAutoBuyPresident').classList.add('d-none');
        }
        document.getElementById('time').classList.add('d-none');
        document.getElementById('time2derivative').classList.add('d-none');
        document.getElementById('time3derivative').classList.add('d-none');
        document.getElementById('time4derivative').classList.add('d-none');
        document.getElementById('time5derivative').classList.add('d-none');
        document.getElementById('time6derivative').classList.add('d-none');
        if (gameData.stats.prestige3 > 0) {
            document.getElementById('time').classList.remove('d-none');
            if (gameData.timeDerivatives[0].owned.greaterThan(0)) {
                document.getElementById('time2derivative').classList.remove('d-none');
            }
            if (gameData.timeDerivatives[1].owned.greaterThan(0)) {
                document.getElementById('time3derivative').classList.remove('d-none');
            }
            if (gameData.timeDerivatives[2].owned.greaterThan(0)) {
                document.getElementById('time4derivative').classList.remove('d-none');
            }
            if (gameData.timeDerivatives[3].owned.greaterThan(0)) {
                document.getElementById('time5derivative').classList.remove('d-none');
            }
            if (gameData.timeDerivatives[4].owned.greaterThan(0)) {
                document.getElementById('time6derivative').classList.remove('d-none');
            }
        }
        document.getElementById('producitonproduction').innerHTML = gameData.producer.productionPerSecDisplay().ToString();
        document.getElementById('productionbought').innerHTML = gameData.producer.bought.toString();
        document.getElementById('productionowned').innerHTML = gameData.producer.owned.ToString();
        document.getElementById('minerbought').innerHTML = gameData.derivatives[0].bought.toString();
        document.getElementById('minerowned').innerHTML = gameData.derivatives[0].owned.ToString();
        document.getElementById('minerproduction').innerHTML = gameData.derivatives[0].productionPerSecDisplay().ToString();
        document.getElementById('supervisorbought').innerHTML = gameData.derivatives[1].bought.toString();
        document.getElementById('supervisorowned').innerHTML = gameData.derivatives[1].owned.ToString();
        document.getElementById('supervisorproduction').innerHTML = gameData.derivatives[1].productionPerSecDisplay().ToString();
        document.getElementById('foremanbought').innerHTML = gameData.derivatives[2].bought.toString();
        document.getElementById('foremanowned').innerHTML = gameData.derivatives[2].owned.ToString();
        document.getElementById('foremanproduction').innerHTML = gameData.derivatives[2].productionPerSecDisplay().ToString();
        document.getElementById('managerbought').innerHTML = gameData.derivatives[3].bought.toString();
        document.getElementById('managerowned').innerHTML = gameData.derivatives[3].owned.ToString();
        document.getElementById('managerproduction').innerHTML = gameData.derivatives[3].productionPerSecDisplay().ToString();
        document.getElementById('middlemanagementbought').innerHTML = gameData.derivatives[4].bought.toString();
        document.getElementById('middlemanagementowned').innerHTML = gameData.derivatives[4].owned.ToString();
        document.getElementById('middlemanagementproduction').innerHTML = gameData.derivatives[4].productionPerSecDisplay().ToString();
        document.getElementById('uppermanagementbought').innerHTML = gameData.derivatives[5].bought.toString();
        document.getElementById('uppermanagementowned').innerHTML = gameData.derivatives[5].owned.ToString();
        document.getElementById('uppermanagementproduction').innerHTML = gameData.derivatives[5].productionPerSecDisplay().ToString();
        document.getElementById('vicepresidentbought').innerHTML = gameData.derivatives[6].bought.toString();
        document.getElementById('vicepresidentowned').innerHTML = gameData.derivatives[6].owned.ToString();
        document.getElementById('vicepresidentproduction').innerHTML = gameData.derivatives[6].productionPerSecDisplay().ToString();
        document.getElementById('presidentbought').innerHTML = gameData.derivatives[7].bought.toString();
        document.getElementById('presidentowned').innerHTML = gameData.derivatives[7].owned.ToString();
        document.getElementById('presidentproduction').innerHTML = gameData.derivatives[7].productionPerSecDisplay().ToString();
        document.getElementById('speedbought').innerHTML = gameData.speedDerivatives[0].bought.toString();
        document.getElementById('speedowned').innerHTML = gameData.speedDerivatives[0].owned.ToString();
        document.getElementById('speedproduction').innerHTML = gameData.speedDerivatives[0].productionPerSecDisplay().ToString();
        document.getElementById('accelerationbought').innerHTML = gameData.speedDerivatives[1].bought.toString();
        document.getElementById('accelerationowned').innerHTML = gameData.speedDerivatives[1].owned.ToString();
        document.getElementById('accelerationproduction').innerHTML = gameData.speedDerivatives[1].productionPerSecDisplay().ToString();
        document.getElementById('jerkbought').innerHTML = gameData.speedDerivatives[2].bought.toString();
        document.getElementById('jerkowned').innerHTML = gameData.speedDerivatives[2].owned.ToString();
        document.getElementById('jerkproduction').innerHTML = gameData.speedDerivatives[2].productionPerSecDisplay().ToString();
        document.getElementById('snapbought').innerHTML = gameData.speedDerivatives[3].bought.toString();
        document.getElementById('snapowned').innerHTML = gameData.speedDerivatives[3].owned.ToString();
        document.getElementById('snapproduction').innerHTML = gameData.speedDerivatives[3].productionPerSecDisplay().ToString();
        document.getElementById('cracklebought').innerHTML = gameData.speedDerivatives[4].bought.toString();
        document.getElementById('crackleowned').innerHTML = gameData.speedDerivatives[4].owned.ToString();
        document.getElementById('crackleproduction').innerHTML = gameData.speedDerivatives[4].productionPerSecDisplay().ToString();
        document.getElementById('popbought').innerHTML = gameData.speedDerivatives[5].bought.toString();
        document.getElementById('popowned').innerHTML = gameData.speedDerivatives[5].owned.ToString();
        document.getElementById('popproduction').innerHTML = gameData.speedDerivatives[5].productionPerSecDisplay().ToString();
        document.getElementById('time1bought').innerHTML = gameData.timeDerivatives[0].bought.toString();
        document.getElementById('time1owned').innerHTML = gameData.timeDerivatives[0].owned.ToString();
        document.getElementById('time1production').innerHTML = gameData.timeDerivatives[0].productionPerSecDisplay().ToString();
        document.getElementById('time2bought').innerHTML = gameData.timeDerivatives[1].bought.toString();
        document.getElementById('time2owned').innerHTML = gameData.timeDerivatives[1].owned.ToString();
        document.getElementById('time2production').innerHTML = gameData.timeDerivatives[1].productionPerSecDisplay().ToString();
        document.getElementById('time3bought').innerHTML = gameData.timeDerivatives[2].bought.toString();
        document.getElementById('time3owned').innerHTML = gameData.timeDerivatives[2].owned.ToString();
        document.getElementById('time3production').innerHTML = gameData.timeDerivatives[2].productionPerSecDisplay().ToString();
        document.getElementById('time4bought').innerHTML = gameData.timeDerivatives[3].bought.toString();
        document.getElementById('time4owned').innerHTML = gameData.timeDerivatives[3].owned.ToString();
        document.getElementById('time4production').innerHTML = gameData.timeDerivatives[3].productionPerSecDisplay().ToString();
        document.getElementById('time5bought').innerHTML = gameData.timeDerivatives[4].bought.toString();
        document.getElementById('time5owned').innerHTML = gameData.timeDerivatives[4].owned.ToString();
        document.getElementById('time5production').innerHTML = gameData.timeDerivatives[4].productionPerSecDisplay().ToString();
        document.getElementById('time6bought').innerHTML = gameData.timeDerivatives[5].bought.toString();
        document.getElementById('time6owned').innerHTML = gameData.timeDerivatives[5].owned.ToString();
        document.getElementById('time6production').innerHTML = gameData.timeDerivatives[5].productionPerSecDisplay().ToString();
        gameData.derivatives.forEach((d) => {
            d.updateDisplay();
        });
        gameData.speedDerivatives.forEach((d) => {
            d.updateDisplay();
        });
        gameData.timeDerivatives.forEach((d) => {
            d.updateDisplay();
        });
        gameData.producer.updateDisplay();
    }
    if (document.getElementById('upgradestab').classList.contains('active') && dirtyUpgrades) {
        gameData.upgrades.forEach((u) => {
            u.updateDisplay();
        });
        gameData.rockUpgrades.forEach((u) => {
            u.updateDisplay();
        });
        gameData.boulderUpgrades.forEach((u) => {
            u.updateDisplay();
        });
        dirtyUpgrades = false;
    }
    if (document.getElementById('challengestab').classList.contains('active')) {
        if (gameData.world.autoChallenge) {
            document.getElementById('btnChallengeAuto').classList.remove('bg-danger');
            document.getElementById('btnChallengeAuto').classList.add('bg-success');
            document.getElementById('btnChallengeAuto').innerHTML = 'Turn Auto Challenge Off';
        }
        else {
            document.getElementById('btnChallengeAuto').classList.add('bg-danger');
            document.getElementById('btnChallengeAuto').classList.remove('bg-success');
            document.getElementById('btnChallengeAuto').innerHTML = 'Turn Auto Challenge On';
        }
        if (getAchievementBonus() > 28) {
            document.getElementById('btnChallengeAuto').classList.remove('d-none');
        }
        else {
            document.getElementById('btnChallengeAuto').classList.add('d-none');
            gameData.world.autoChallenge = false;
        }
        if (gameData.challenges[4].available) {
            document.getElementById('poisonchallenge').classList.remove('d-none');
        }
        else {
            document.getElementById('poisonchallenge').classList.add('d-none');
        }
        if (gameData.challenges[5].available) {
            document.getElementById('slowchallenge').classList.remove('d-none');
        }
        else {
            document.getElementById('slowchallenge').classList.add('d-none');
        }
        if (gameData.challenges[6].available) {
            document.getElementById('critchallenge').classList.remove('d-none');
        }
        else {
            document.getElementById('critchallenge').classList.add('d-none');
        }
        if (gameData.challenges[7].available) {
            document.getElementById('sbchallenge').classList.remove('d-none');
        }
        else {
            document.getElementById('sbchallenge').classList.add('d-none');
        }
        gameData.challenges.forEach((ch, index) => {
            ch.updateDisplay(index);
        });
    }
    if (document.getElementById('achievementtab').classList.contains('active')) {
        document.getElementById('totalachievementbonus').innerHTML = new JBDecimal(getAchievementBonus()).ToString();
        const achBonusText = `${new JBDecimal(getAchievementsOnlyBonus()).ToString()}x`;
        gameData.tierfeats.forEach((tf, index) => {
            if (getTierBonus(index) > 1) {
                document.getElementById(`Tier${(index + 1).toString()}Bonus`).innerHTML = `${getTierBonus(index).toString()}x`;
            }
        });
        document.getElementById('achievementbonus').innerHTML = achBonusText;
        gameData.Achievements.forEach((a) => {
            a.draw();
        });
        gameData.tierfeats.forEach((tf) => {
            tf.feats.forEach((f) => {
                f.draw();
            });
        });
    }
    if (document.getElementById('equipmenttab').classList.contains('active')) {
        const equipmentdisplay = `Shards: ${gameData.resources.shards.amount.toString()}`;
        document.getElementById('shardinfo').innerHTML = equipmentdisplay;
        if (gameData.equipment.length > 0) {
            if (dirtyEquipment) {
                const EquipInfoDiv = document.getElementById('EquipmentInfo');
                removeAllChildNodes(EquipInfoDiv);
                const newLabelRow = document.createElement('div');
                newLabelRow.classList.add('row', 'p-0', 'm-0', 'bg-dark');
                const NameCol = document.createElement('div');
                NameCol.classList.add('col-md-2', 'p-0', 'm-0', 'text-medium', 'text-center');
                NameCol.innerHTML = 'Name';
                newLabelRow.appendChild(NameCol);
                const PromoteCol = document.createElement('div');
                PromoteCol.classList.add('col-md-1', 'p-0', 'm-0', 'text-medium', 'text-center');
                PromoteCol.innerHTML = 'Move';
                newLabelRow.appendChild(PromoteCol);
                const DeleteCol = document.createElement('div');
                DeleteCol.classList.add('col-md-2', 'p-0', 'm-0', 'text-medium', 'text-end');
                DeleteCol.innerHTML = 'Delete';
                const AbilitiesCol = document.createElement('div');
                AbilitiesCol.classList.add('col-md-6', 'p-0', 'm-0', 'text-medium', 'text-center');
                const newAbilityRow = document.createElement('div');
                newAbilityRow.classList.add('row', 'p-0', 'm-0');
                const AbilityNameCol = document.createElement('div');
                AbilityNameCol.classList.add('col-md-3', 'p-0', 'm-0', 'text-small', 'text-center');
                AbilityNameCol.innerHTML = 'Ability';
                newAbilityRow.appendChild(AbilityNameCol);
                const UpgradeCol = document.createElement('div');
                UpgradeCol.classList.add('col-md-6', 'p-0', 'm-0', 'text-center');
                UpgradeCol.innerHTML = 'Upgrade Cost';
                newAbilityRow.appendChild(UpgradeCol);
                const LevelCol = document.createElement('div');
                LevelCol.classList.add('col-md-3', 'p-0', 'm-0', 'text-center');
                LevelCol.innerHTML = 'Level';
                newAbilityRow.appendChild(LevelCol);
                AbilitiesCol.appendChild(newAbilityRow);
                newLabelRow.appendChild(AbilitiesCol);
                EquipInfoDiv.appendChild(newLabelRow);
                const activeLabelRow = document.createElement('div');
                activeLabelRow.classList.add('row', 'p-0', 'm-0');
                const ActiveLabel = document.createElement('div');
                ActiveLabel.classList.add('col-md-12', 'p-0', 'm-0', 'text-medium', 'text-center', 'bg-secondary');
                ActiveLabel.innerHTML = 'Active';
                activeLabelRow.appendChild(ActiveLabel);
                EquipInfoDiv.appendChild(activeLabelRow);
                newLabelRow.appendChild(DeleteCol);
                EquipInfoDiv.appendChild(gameData.equipment[0].CreateDisplay(0));
                if (gameData.equipment.length > 1) {
                    const SavedLabelRow = document.createElement('div');
                    SavedLabelRow.classList.add('row', 'p-0', 'm-0');
                    const SavedLabel = document.createElement('div');
                    SavedLabel.classList.add('col-md-12', 'p-0', 'm-0', 'text-medium', 'text-center', 'bg-secondary');
                    SavedLabel.innerHTML = 'Saved';
                    SavedLabelRow.appendChild(SavedLabel);
                    EquipInfoDiv.appendChild(SavedLabelRow);
                    let savedindexmax = 5;
                    if (gameData.equipment.length < savedindexmax) {
                        savedindexmax = gameData.equipment.length;
                    }
                    for (let index = 1; index < savedindexmax; index += 1) {
                        EquipInfoDiv.appendChild(gameData.equipment[index].CreateDisplay(index));
                    }
                    if (gameData.equipment.length > savedindexmax) {
                        const ExtraLabelRow = document.createElement('div');
                        ExtraLabelRow.classList.add('row', 'p-0', 'm-0');
                        const ExtraLabel = document.createElement('div');
                        ExtraLabel.classList.add('col-md-12', 'p-0', 'm-0', 'text-medium', 'text-center', 'bg-secondary');
                        ExtraLabel.innerHTML = 'Pool';
                        ExtraLabelRow.appendChild(ExtraLabel);
                        EquipInfoDiv.appendChild(ExtraLabelRow);
                        for (let index = savedindexmax; index < gameData.equipment.length; index += 1) {
                            EquipInfoDiv.appendChild(gameData.equipment[index].CreateDisplay(index));
                        }
                    }
                }
                const glossaryRow = document.createElement('div');
                glossaryRow.classList.add('row', 'p-0', 'm-0');
                const glossarytext = document.createElement('div');
                glossarytext.classList.add('col-md-12', 'p-0', 'm-0', 'text-small', 'text-left', 'bg-dark');
                glossarytext.innerHTML =
                    'Click the A button to activate.  click the S button to move into a save slot.(in the future there will be a limit on number of saved gems)<br />The X button will destroy the gem and gain you shards to use to improve other gems.<br /> Metal Production - multiplier of x to all levels of metal production<br />Gun Attack - multiplier of 1 + (x/10) to Gun Towers<br />Mulligans - gain x muligans<br />Crit Multiplier - gain a bonus of x / 10 added to Crit Multiplier<br />Crit Chance - gain x to Crit Chance<br />Poison Effect - multiplier of 1 + (x/10) to Poison Towers';
                glossaryRow.appendChild(glossarytext);
                EquipInfoDiv.appendChild(glossaryRow);
                dirtyEquipment = false;
            }
        }
    }
    if (document.getElementById('statisticstab').classList.contains('active')) {
        document.getElementById('prestige1count').innerHTML = gameData.stats.prestige1.toString();
        document.getElementById('prestige1time').innerHTML = display.getPrettyTimeFromMilliSeconds(gameData.stats.prestige1ticks);
        document.getElementById('prestige2count').innerHTML = gameData.stats.prestige2.toString();
        document.getElementById('prestige2time').innerHTML = display.getPrettyTimeFromMilliSeconds(gameData.stats.prestige2ticks);
        document.getElementById('prestige3count').innerHTML = gameData.stats.prestige3.toString();
        document.getElementById('prestige3time').innerHTML = display.getPrettyTimeFromMilliSeconds(gameData.stats.prestige3ticks);
        document.getElementById('highestwavereached').innerHTML = gameData.stats.highestEverWave.toString();
        let prestige1history = '<br />';
        gameData.stats.last10Prestige1amounts.forEach((amt, index) => {
            const ticks = gameData.stats.last10Prestige1times[index];
            const tier = gameData.stats.last10Prestige1tier[index];
            const waves = gameData.stats.last10Prestige1waves[index];
            const rate = display.PrettyRatePerTime(amt, ticks);
            const newline = `${index.toString()} reached tier ${tier.toString()} wave ${waves.toString()} took ${display.getPrettyTimeFromMilliSeconds(ticks)} and gave ${amt.ToString()} for an average of: ${rate}`;
            prestige1history += `${newline}</br />`;
        });
        document.getElementById('prestige1history').innerHTML = prestige1history;
        let prestige2history = '<br />';
        gameData.stats.last10Prestige2amounts.forEach((amt, index) => {
            const ticks = gameData.stats.last10Prestige2times[index];
            const rate = display.PrettyRatePerTime(amt, ticks);
            const newline = `${index.toString()} took ${display.getPrettyTimeFromMilliSeconds(ticks)} and gave ${amt.ToString()} for an average of ${rate}`;
            prestige2history += `${newline}</br />`;
        });
        document.getElementById('prestige2history').innerHTML = prestige2history;
        let prestige3history = '<br />';
        gameData.stats.last10Prestige3amounts.forEach((amt, index) => {
            const ticks = gameData.stats.last10Prestige3times[index];
            const rate = display.PrettyRatePerTime(amt, ticks);
            const newline = `${index.toString()} took ${display.getPrettyTimeFromMilliSeconds(ticks)} and gave ${amt.ToString()} for an average of ${rate}`;
            prestige3history += `${newline}</br />`;
        });
        document.getElementById('prestige3history').innerHTML = prestige3history;
    }
    document.getElementById('productionderivative').classList.remove('d-none');
    if (!gameData.producer.active) {
        document.getElementById('productionderivative').classList.add('d-none');
    }
    document.getElementById('supervisorderivative').classList.add('d-none');
    document.getElementById('btnBuyUpgrade10').classList.add('d-none');
    if (gameData.derivatives[1].active) {
        document.getElementById('btnBuyUpgrade10').classList.remove('d-none');
        if (gameData.derivatives[0].owned.greaterThan(0)) {
            document.getElementById('supervisorderivative').classList.remove('d-none');
        }
    }
    document.getElementById('foremanderivative').classList.add('d-none');
    document.getElementById('btnBuyUpgrade11').classList.add('d-none');
    if (gameData.derivatives[2].active) {
        document.getElementById('btnBuyUpgrade11').classList.remove('d-none');
        if (gameData.derivatives[1].owned.greaterThan(0)) {
            document.getElementById('foremanderivative').classList.remove('d-none');
        }
    }
    document.getElementById('managerderivative').classList.add('d-none');
    document.getElementById('btnBuyUpgrade12').classList.add('d-none');
    if (gameData.derivatives[3].active) {
        document.getElementById('btnBuyUpgrade12').classList.remove('d-none');
        if (gameData.derivatives[2].owned.greaterThan(0)) {
            document.getElementById('managerderivative').classList.remove('d-none');
        }
    }
    document.getElementById('middlemanagementderivative').classList.add('d-none');
    document.getElementById('btnBuyUpgrade13').classList.add('d-none');
    if (gameData.derivatives[4].active) {
        document.getElementById('btnBuyUpgrade13').classList.remove('d-none');
        if (gameData.derivatives[3].owned.greaterThan(0)) {
            document.getElementById('middlemanagementderivative').classList.remove('d-none');
        }
    }
    document.getElementById('uppermanagementderivative').classList.add('d-none');
    document.getElementById('btnBuyUpgrade14').classList.add('d-none');
    if (gameData.derivatives[5].active) {
        document.getElementById('btnBuyUpgrade14').classList.remove('d-none');
        if (gameData.derivatives[4].owned.greaterThan(0)) {
            document.getElementById('uppermanagementderivative').classList.remove('d-none');
        }
    }
    document.getElementById('vicepresidentderivative').classList.add('d-none');
    document.getElementById('btnBuyUpgrade15').classList.add('d-none');
    if (gameData.derivatives[6].active) {
        document.getElementById('btnBuyUpgrade15').classList.remove('d-none');
        if (gameData.derivatives[5].owned.greaterThan(0)) {
            document.getElementById('vicepresidentderivative').classList.remove('d-none');
        }
    }
    document.getElementById('presidentderivative').classList.add('d-none');
    document.getElementById('btnBuyUpgrade16').classList.add('d-none');
    if (gameData.derivatives[7].active) {
        document.getElementById('btnBuyUpgrade16').classList.remove('d-none');
        if (gameData.derivatives[6].owned.greaterThan(0)) {
            document.getElementById('presidentderivative').classList.remove('d-none');
        }
    }
    document.getElementById('textToDisplay').innerHTML = display.getDisplayText();
    let resourceStats = `Metal: ${gameData.resources.metal.amount.ToString()}<br />`;
    if (gameData.stats.highestEverWave >= 5) {
        resourceStats += `Dust: ${gameData.resources.dust.amount.ToString()}<br />`;
    }
    if (gameData.resources.pebbles.amount.greaterThan(0)) {
        resourceStats += `Pebbles: ${gameData.resources.pebbles.amount.ToString()}<br />`;
        document.getElementById('upgradePebbles').innerHTML = gameData.resources.pebbles.amount.ToString();
    }
    if (gameData.stats.prestige2 >= 1) {
        resourceStats += `Rocks: ${gameData.resources.rocks.amount.ToString()}<br />`;
        document.getElementById('upgradeRocks').innerHTML = gameData.resources.rocks.amount.ToString();
    }
    if (gameData.stats.prestige3 >= 1) {
        resourceStats += `Boulders: ${gameData.resources.boulders.amount.ToString()}<br />`;
        document.getElementById('upgradeBoulders').innerHTML = gameData.resources.boulders.amount.ToString();
    }
    document.getElementById('resourcesText').innerHTML = resourceStats;
    document.getElementById('tierinfo').classList.add('d-none');
    const btndown = document.getElementById('btntierdown');
    btndown.disabled = false;
    const btnup = document.getElementById('btntierup');
    btnup.disabled = false;
    document.getElementById('equipmentTabNav').classList.add('d-none');
    if (gameData.world.tierUnlocked > 1) {
        document.getElementById('equipmentTabNav').classList.remove('d-none');
        document.getElementById('currenttier').innerHTML = gameData.world.currentTier.toFixed(0);
        document.getElementById('tierinfo').classList.remove('d-none');
        if (gameData.world.currentTier === 1) {
            btndown.disabled = true;
        }
        if (gameData.world.currentTier === gameData.world.tierUnlocked) {
            btnup.disabled = true;
        }
    }
    document.getElementById('particles-tab').classList.add('d-none');
    document.getElementById('rockupgrades-tab').classList.add('d-none');
    if (gameData.stats.prestige2 > 0 || rocksFromPrestige().greaterThan(0)) {
        document.getElementById('particles-tab').classList.remove('d-none');
        document.getElementById('rockupgrades-tab').classList.remove('d-none');
    }
    document.getElementById('time-tab').classList.add('d-none');
    document.getElementById('boulderupgrades-tab').classList.add('d-none');
    if (gameData.stats.prestige3 > 0 || bouldersFromPrestige().greaterThan(0)) {
        document.getElementById('time-tab').classList.remove('d-none');
        document.getElementById('boulderupgrades-tab').classList.remove('d-none');
    }
    if (pebblesFromPrestige().greaterThan(0)) {
        document.getElementById('btnPrestige1').classList.remove('hiddenSpaceTaken');
        document.getElementById('btnPrestige1').innerHTML = `Prestige for ${pebblesFromPrestige().ToString()} pebbles<br>Current: ${getCurrentPebbleRate().ToString()} /hr<br>Best:${gameData.stats.bestPrestige1Rate.ToString()}/hr`;
    }
    else {
        document.getElementById('btnPrestige1').classList.add('hiddenSpaceTaken');
    }
    if (rocksFromPrestige().greaterThan(0)) {
        document.getElementById('btnPrestige2').classList.remove('hiddenSpaceTaken');
        document.getElementById('btnPrestige2').innerHTML = `Ascend for ${rocksFromPrestige().ToString()} rocks<br>Current: ${getCurrentRockRate().ToString()} /hr<br>Best:${gameData.stats.bestPrestige2Rate.ToString()}/hr`;
    }
    else {
        document.getElementById('btnPrestige2').classList.add('hiddenSpaceTaken');
    }
    if (bouldersFromPrestige().greaterThan(0)) {
        document.getElementById('btnPrestige3').classList.remove('hiddenSpaceTaken');
        document.getElementById('btnPrestige3').innerHTML = `Transform for ${bouldersFromPrestige().ToString()} boulders<br>Current: ${getCurrentBoulderRate().ToString()} /hr<br>Best:${gameData.stats.bestPrestige3Rate.ToString()}/hr`;
    }
    else {
        document.getElementById('btnPrestige3').classList.add('hiddenSpaceTaken');
    }
    document.getElementById('challengesTabNav').classList.remove('d-none');
    if (gameData.stats.highestEverWave <= 20) {
        document.getElementById('challengesTabNav').classList.add('d-none');
    }
    const { canvas } = display;
    const { ctx } = display;
    if (canvas.getContext) {
        const originalHeight = canvas.height;
        const originalWidth = canvas.width;
        const dimensions = getObjectFitSize(true, canvas.clientWidth, canvas.clientHeight, canvas.width, canvas.height);
        const dpr = window.devicePixelRatio || 1;
        canvas.width = dimensions.width * dpr;
        canvas.height = dimensions.height * dpr;
        const ratio = Math.min(canvas.clientWidth / originalWidth, canvas.clientHeight / originalHeight);
        ctx.scale((ratio * dpr * canvas.width) / canvas.scrollWidth, (ratio * dpr * canvas.height) / canvas.scrollHeight); // adjust this!
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // add possible build sites
        gameData.towers.forEach((t) => {
            t.draw();
        });
        ctx.globalAlpha = 1.0;
        gameData.enemies.forEach((e) => {
            e.draw();
            e.bullets.forEach((b) => {
                b.draw();
            });
        });
        display.showFloaters();
        display.drawText(`Drone Health: ${display.drone.MaxHitPoints().ToString()}`, new Vector(39 + 10 * Math.ceil(gameData.world.currentTier / 5), 1), 'white', '15px Arial', 'right', 'top');
        const mulligans = maxMulligansCalc() - gameData.world.mulligansused;
        if (mulligans > 0) {
            display.drawText(`${mulligans.toString()} mulligans`, new Vector(1, 4), 'white', 'bold 10px Arial', 'left', 'middle');
        }
        display.drawText(`${gameData.world.currentTickLength}ms`, new Vector(1, 39 + 10 * Math.ceil(gameData.world.currentTier / 5)), 'white', 'bold 10px Arial', 'left', 'bottom');
        ctx.font = '15px Arial';
        display.drawText(`Wave: ${gameData.world.currentWave} / ${getWavesNeededForTier()}`, new Vector((40 + 10 * Math.ceil(gameData.world.currentTier / 5)) / 2, 1), 'white', '15px Arial', 'center', 'top');
        display.drawText(`Unspawned: ${gameData.world.enemiesToSpawn.toString()}(${getSpecialsCount().toString()})`, new Vector(1, 1), 'white', '15px Arial', 'left', 'top');
        if (gameData.world.ticksToNextSpawn > 1000) {
            ctx.fillStyle = 'red';
            ctx.fillText(`Time to next enemy: ${display.getPrettyTimeFromMilliSeconds(gameData.world.ticksToNextSpawn)}`, 10, 30);
        }
    }
    document.getElementById('btn1Speed').classList.remove('btn-success');
    document.getElementById('btn1Speed').classList.add('btn-danger');
    document.getElementById('btn2Speed').classList.remove('btn-success');
    document.getElementById('btn2Speed').classList.add('btn-danger');
    document.getElementById('btn5Speed').classList.remove('btn-success');
    document.getElementById('btn5Speed').classList.add('btn-danger');
    document.getElementById('btnMSpeed').classList.remove('btn-success');
    document.getElementById('btnMSpeed').classList.add('btn-danger');
    switch (gameSpeed) {
        case 1:
            document.getElementById('btn1Speed').classList.add('btn-success');
            document.getElementById('btn1Speed').classList.remove('btn-danger');
            break;
        case 2:
            document.getElementById('btn2Speed').classList.add('btn-success');
            document.getElementById('btn2Speed').classList.remove('btn-danger');
            break;
        case 5:
            document.getElementById('btn5Speed').classList.add('btn-success');
            document.getElementById('btn5Speed').classList.remove('btn-danger');
            break;
        case 10:
        default:
            document.getElementById('btnMSpeed').classList.add('btn-success');
            document.getElementById('btnMSpeed').classList.remove('btn-danger');
            break;
    }
    if (gameData.world.paused) {
        document.getElementById('btnPause').classList.add('btn-danger');
        document.getElementById('btnPause').classList.remove('btn-success');
    }
    else {
        document.getElementById('btnPause').classList.remove('btn-danger');
        document.getElementById('btnPause').classList.add('btn-success');
    }
    const activeChallenges = ActiveChallenges();
    if (activeChallenges > 0) {
        document.getElementById('btnChallengeQuit').classList.remove('d-none');
    }
    else {
        document.getElementById('btnChallengeQuit').classList.add('d-none');
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changeTier(value) {
    let change = true;
    if (gameData.equipment.length > 5) {
        // eslint-disable-next-line no-alert, no-restricted-globals
        change = confirm('Are you sure?  You will lose any gems not in an active or save slot.  Click cancel to if you wish to adjust the gems');
    }
    if (change) {
        CheckAchievementCompletions();
        if (value === 'Down') {
            gameData.world.currentTier -= 1;
            if (gameData.world.currentTier < 1) {
                gameData.world.currentTier = 1;
            }
        }
        if (value === 'Up') {
            gameData.world.currentTier += 1;
            if (gameData.world.currentTier > gameData.world.tierUnlocked) {
                gameData.world.tierUnlocked = gameData.world.currentTier;
            }
        }
        createTowerSites();
        init(2);
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prestige1() {
    quitChallenges();
    init(1);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prestige2() {
    quitChallenges();
    init(2);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prestige3() {
    quitChallenges();
    init(3);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function resetGame() {
    localStorage.clear();
    // eslint-disable-next-line no-restricted-globals
    location.reload();
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function saveGameClick() {
    gameData.world.nextSaveGameTime = new Date();
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function resetStoryElements() {
    // eslint-disable-next-line no-return-assign
    gameData.storyElements.forEach((e) => (e.printed = false));
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function cheat1() {
    if (gameData.resources.dust.amount.greaterThan(1)) {
        gameData.resources.dust.amount = gameData.resources.dust.amount.multiply(2);
    }
    else {
        gameData.resources.dust.amount = new JBDecimal(100);
    }
}
window.setInterval(function () {
    try {
        if (!initted) {
            if (document.readyState === 'complete') {
                init(); // this seeds the init function, which will overwrite default data with the save if there is one
            }
            return; // still waiting on pageload
        }
        const currentTime = new Date();
        let ticksForCurrentTick = currentTime.getTime() - gameData.world.lastProcessTick.getTime();
        ticksForCurrentTick *= gameSpeed;
        if (ticksForCurrentTick > 50) {
            ticksForCurrentTick = 50;
        }
        gameData.world.lastProcessTick = Object.assign(currentTime);
        gameData.world.currentTickLength = ticksForCurrentTick;
        if (currentTime > gameData.world.nextSaveGameTime) {
            saveGame(currentTime);
        }
        if (!gameData.world.paused) {
            processStuff(ticksForCurrentTick);
        }
        updateGUI();
    }
    catch (error) {
        display.logMyErrors(error);
    }
}, 0);
//# sourceMappingURL=main.js.map