/* eslint-disable no-loop-func */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notationDisplayOptions = ['Scientific Notation', 'Standard Formatting', 'Engineering Notation', 'Alphabetic Notation', 'Hybrid Notation', 'Logarithmic Notation'];
let dirtyEquipment = true;
let dirtyUpgrades = true;
// eslint-disable-next-line prefer-const
let dirtyRange = true;
let upgradeRefreshTickCount = 0;
let AutoBuyPowderTickCount = 0;
let UIElementActive = '';
let activeBuilding = null;
let gameSpeed = 1;
let initted = false;
let achievementbonus = 0;
let testtick = 0;
let testframe = 0;
let gameData;
const display = new Display();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let internalInflationArray;
let totalHousing = new JBDecimal(10);
// if (gameData.pebbleUpgrades[12].bought > 0) {   // unnecessary at this point
//   totalHousing = new JBDecimal(100);
// }
let netWood = new JBDecimal(0);
let netStone = new JBDecimal(0);
let netArrows = new JBDecimal(0);
let netRedResearch = new JBDecimal(0);
let CANVAS_SIZE = 1100;
// const isFixedString = (s: string) => !isNaN(+s) && isFinite(+s) && !/e/i.test(s);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changeSpeed(value) {
    gameSpeed = value;
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
function powderFromPrestige(amt = new JBDecimal(0)) {
    if (amt.equals(0)) {
        return gameData.resources.essence.amount.divide(100 - gameData.pebbleUpgrades[0].bought - gameData.powderUpgrades[4].bought - gameData.rockUpgrades[1].bought).floor(); // - gameData.boulderUpgrades[12].bought */).floor();
    }
    return amt.divide(100 - gameData.pebbleUpgrades[0].bought /*  - gameData.upgrades[22].bought - gameData.boulderUpgrades[12].bought */).floor();
}
function pebbleFromPrestige() {
    return gameData.resources.powder.amount
        .add(powderFromPrestige())
        .divide(1000 - gameData.rockUpgrades[2].bought) /*  - gameData.boulderUpgrades[1].bought - gameData.rockUpgrades[20].bought */
        .floor();
}
function rockFromPrestige() {
    return gameData.resources.pebble.amount.add(pebbleFromPrestige()).divide(10000).floor();
}
function getCurrentPowderRate() {
    return powderFromPrestige().multiply(3600000).divide(gameData.stats.prestige1ticks);
}
function getCurrentPebblesRate() {
    return pebbleFromPrestige().multiply(3600000).divide(gameData.stats.prestige2ticks);
}
function getCurrentRocksRate() {
    return rockFromPrestige().multiply(3600000).divide(gameData.stats.prestige3ticks);
}
function AutoBuyPowder() {
    AutoBuyPowderTickCount += gameData.world.currentTickLength;
    if (AutoBuyPowderTickCount > 1000) {
        const essenceToUse = gameData.resources.essence.amount.divide(100);
        const powdergained = powderFromPrestige(essenceToUse);
        if (powdergained.greaterThanOrEqualTo(1)) {
            gameData.resources.essence.subtract(essenceToUse);
            gameData.resources.powder.add(powderFromPrestige(essenceToUse));
        }
        AutoBuyPowderTickCount -= 1000;
    }
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
    gameData.buildings.forEach((b, index) => {
        b.delete(false);
        let go = true;
        if (typeof currentBluePrint.blueprints[index] !== 'undefined') {
            if (currentBluePrint.blueprints[index].towerType === 'PoisonTower' && (gameData.challenges[3].active || gameData.challenges[3].completed === 0)) {
                go = false;
            }
            if (currentBluePrint.blueprints[index].towerType === 'SlowTower' && (gameData.challenges[4].active || gameData.challenges[4].completed === 0)) {
                go = false;
            }
            if (go) {
                b.type = currentBluePrint.blueprints[index].towerType;
                b.setInfoByType();
                b.autoOn = currentBluePrint.blueprints[index].autoOn;
                b.tactics.changeTactic(currentBluePrint.blueprints[index].tactic);
            }
        }
    });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function blueprintSave() {
    const newTBP = new TierBluePrint();
    gameData.buildings.forEach((b) => {
        const newbp = new Blueprint();
        newbp.towerType = b.type;
        newbp.autoOn = b.autoOn;
        newbp.tactic = b.tactics.getIndex();
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
    let maxMulligans = 0 + gameData.powderUpgrades[11].bought;
    if (gameData.equipment.length > 0) {
        gameData.equipment[0].abilities.forEach((a) => {
            if (a.name === 'Mulligans') {
                maxMulligans += a.levels;
            }
        });
    }
    return maxMulligans;
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
function getTierSize() {
    return 50 + Math.ceil(gameData.world.currentTier / 5) * 10;
}
function createBuildingSites() {
    let leftToRight = true;
    let currenty = 15;
    let currentx = 5;
    const tierSize = getTierSize();
    let index = 0;
    gameData.buildings = [];
    while (currenty <= tierSize) {
        if (leftToRight) {
            currentx = 5;
            while (currentx <= tierSize - 10) {
                const currentBuilding = new Building(new Vector(currentx, currenty), index);
                gameData.buildings.push(currentBuilding);
                currentBuilding.active = true;
                index += 1;
                currentx += 10;
            }
        }
        else {
            currentx = tierSize - 5;
            while (currentx > 10) {
                const currentBuilding = new Building(new Vector(currentx, currenty), index);
                gameData.buildings.push(currentBuilding);
                currentBuilding.active = true;
                index += 1;
                currentx -= 10;
            }
        }
        currenty += 20;
        leftToRight = !leftToRight;
    }
}
function init(prestigelevel = 0) {
    // dirtyRange = true;
    if (prestigelevel >= 1) {
        display.prestige1DisplayReset();
        gameData.buildings.forEach((t) => {
            t.delete(false);
        });
        if (powderFromPrestige().greaterThanOrEqualTo(1)) {
            gameData.stats.last10Prestige1amounts.unshift(powderFromPrestige());
            gameData.stats.last10Prestige1amounts.splice(10);
            gameData.stats.last10Prestige1times.unshift(gameData.stats.prestige1ticks);
            gameData.stats.last10Prestige1times.splice(10);
            gameData.stats.last10Prestige1waves.unshift(gameData.world.currentWave);
            gameData.stats.last10Prestige1waves.splice(10);
            gameData.stats.last10Prestige1tier.unshift(gameData.world.currentTier);
            gameData.stats.last10Prestige1tier.splice(10);
            gameData.stats.prestige1 += 1;
        }
        gameData.world.deathLevel = 0;
        gameData.stats.prestige1ticks = 0;
        gameData.stats.bestPrestige1Rate = new JBDecimal(0.00000000001);
        gameData.resources.powder.add(powderFromPrestige());
        gameData.resources.essence.amount = new JBDecimal(0);
        gameData.resources.arrow.amount = new JBDecimal(0);
        gameData.resources.stone.amount = new JBDecimal(0);
        gameData.resources.redResearch.amount = new JBDecimal(0);
        gameData.world.currentWave = 0;
        gameData.world.highestWaveCompleted = 0;
        gameData.world.equipmentEarned = false;
        gameData.resources.wood.amount = new JBDecimal(100);
        if (gameData.pebbleUpgrades[7].bought > 0) {
            gameData.resources.wood.amount = new JBDecimal(10000);
        }
        gameData.resources.people.amount = new JBDecimal(10);
        if (gameData.pebbleUpgrades[12].bought > 0) {
            gameData.resources.people.amount = new JBDecimal(100);
        }
        gameData.researches.forEach((r) => {
            r.bought = 0;
        });
        // eslint-disable-next-line no-use-before-define
        resetSpawns(true);
    }
    if (prestigelevel >= 2) {
        if (pebbleFromPrestige().greaterThanOrEqualTo(1)) {
            gameData.stats.last10Prestige2amounts.unshift(pebbleFromPrestige());
            gameData.stats.last10Prestige2amounts.splice(10);
            gameData.stats.last10Prestige2times.unshift(gameData.stats.prestige2ticks);
            gameData.stats.last10Prestige2times.splice(10);
            gameData.stats.prestige2 += 1;
        }
        // eslint-disable-next-line no-global-assign
        display.prestige2DisplayReset();
        gameData.stats.bestPrestige2Rate = new JBDecimal(0.0000000001);
        gameData.stats.prestige2ticks = 0;
        gameData.stats.prestige1 = 0;
        gameData.resources.pebble.add(pebbleFromPrestige());
        gameData.resources.powder.amount = new JBDecimal(0);
        gameData.challenges.forEach((c) => {
            c.completed = 0;
        });
        gameData.world.autoChallenge = false;
        gameData.world.nextAutoChallenge = 0;
        gameData.powderUpgrades.forEach((u) => {
            u.bought = 0;
        });
        gameData.resources.wood.amount = new JBDecimal(100);
        if (gameData.pebbleUpgrades[7].bought > 0) {
            gameData.resources.wood.amount = new JBDecimal(10000);
        }
        gameData.resources.people.amount = new JBDecimal(10);
        if (gameData.pebbleUpgrades[12].bought > 0) {
            gameData.resources.people.amount = new JBDecimal(100);
        }
    }
    if (prestigelevel >= 3) {
        if (rockFromPrestige().greaterThan(1)) {
            gameData.stats.last10Prestige3amounts.unshift(rockFromPrestige());
            gameData.stats.last10Prestige3amounts.splice(10);
            gameData.stats.last10Prestige3times.unshift(gameData.stats.prestige3ticks);
            gameData.stats.last10Prestige3times.splice(10);
            gameData.stats.prestige3 += 1;
        }
        gameData.stats.bestPrestige3Rate = new JBDecimal(0.0000000001);
        gameData.stats.prestige3ticks = 0;
        gameData.stats.prestige2 = 0;
        gameData.resources.rock.add(rockFromPrestige());
        gameData.resources.pebble.amount = new JBDecimal(0);
        gameData.pebbleUpgrades.forEach((u) => {
            u.bought = 0;
        });
        gameData.resources.wood.amount = new JBDecimal(100);
        if (gameData.pebbleUpgrades[7].bought > 0) {
            gameData.resources.wood.amount = new JBDecimal(10000);
        }
        gameData.resources.people.amount = new JBDecimal(10);
        if (gameData.pebbleUpgrades[12].bought > 0) {
            gameData.resources.people.amount = new JBDecimal(100);
        }
    }
    if (prestigelevel === 0) {
        gameData = new SaveGameData('new');
        createAchievementBonusArray(200, true);
        createInternalInflationArray(10000, true);
        createBuildingSites();
        loadSaveGame();
    }
    display.drone1 = new Enemy(true);
    display.drone02 = new Enemy(true);
    display.drone02.baseMaxHitPoints = display.drone1.baseMaxHitPoints.divide(5);
    display.drone5 = new Enemy(true);
    display.drone5.baseMaxHitPoints = display.drone1.baseMaxHitPoints.multiply(5);
    display.drone10 = new Enemy(true);
    display.drone10.baseMaxHitPoints = display.drone1.baseMaxHitPoints.multiply(10);
    if (gameData.stats.prestige1 > 0 || gameData.stats.prestige2 > 0 || gameData.stats.prestige3 > 0) {
        display.addToDisplay('Here we go again', DisplayCategory.Story);
    }
    else {
        display.addToDisplay('Our story begins', DisplayCategory.Story);
    }
    if (gameData.tierblueprintsauto && prestigelevel > 0) {
        while (gameData.tierBlueprints.length < gameData.world.currentTier + 1) {
            gameData.tierBlueprints.push(new TierBluePrint());
        }
        blueprintLoad();
    }
    CheckAchievementCompletions();
    initted = true;
}
function processStuff(ticks) {
    if (gameData.rockUpgrades[5].bought > 0) {
        AutoBuyPowder();
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
    gameData.challenges[7].available = true;
    achievementbonus = getAchievementBonus();
    if (achievementbonus > 5) {
        gameData.challenges[3].available = true;
    }
    if (achievementbonus > 10) {
        gameData.challenges[4].available = true;
    }
    if (achievementbonus > 15) {
        gameData.challenges[5].available = true;
    }
    if (achievementbonus > 25) {
        gameData.challenges[6].available = true;
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
    const currentPowderRate = getCurrentPowderRate();
    if (currentPowderRate.greaterThan(gameData.stats.bestPrestige1Rate)) {
        gameData.stats.bestPrestige1Rate = new JBDecimal(currentPowderRate);
    }
    const currentRockRate = getCurrentRocksRate();
    if (currentRockRate.greaterThan(gameData.stats.bestPrestige3Rate)) {
        gameData.stats.bestPrestige3Rate = new JBDecimal(currentRockRate);
    }
    const currentPebblesRate = getCurrentPebblesRate();
    if (currentPebblesRate.greaterThan(gameData.stats.bestPrestige2Rate)) {
        gameData.stats.bestPrestige2Rate = new JBDecimal(currentPebblesRate);
    }
    gameData.powderUpgrades.forEach((u) => {
        u.addedlimit = 0;
    });
    const addedlimit = (gameData.pebbleUpgrades[6].bought + gameData.rockUpgrades[12].bought) * 10;
    gameData.powderUpgrades[0].limit = 15 + addedlimit;
    gameData.powderUpgrades[1].limit = 15 + addedlimit;
    gameData.powderUpgrades[2].limit = 15 + addedlimit;
    gameData.powderUpgrades[6].limit = 15 + addedlimit;
    gameData.powderUpgrades[12].limit = 15 + addedlimit;
    gameData.powderUpgrades[13].limit = 15 + addedlimit;
    gameData.powderUpgrades[16].limit = 15 + addedlimit;
    gameData.researches[1].limit = Math.max(Math.floor(gameData.world.highestWaveCompleted / 5), 1);
    // gameData.researches[2].limit = Math.max(Math.floor(gameData.world.highestWaveCompleted), 1);
    gameData.researches[3].limit = Math.max(Math.floor(gameData.world.highestWaveCompleted / 5), 1);
    gameData.researches[4].limit = Math.max(Math.floor(gameData.world.highestWaveCompleted), 1);
    gameData.researches[5].limit = Math.max(Math.floor(gameData.world.highestWaveCompleted), 1);
    gameData.researches[6].limit = Math.max(Math.floor(gameData.world.highestWaveCompleted / 5), 1);
    gameData.researches[7].limit = Math.max(Math.floor(gameData.world.highestWaveCompleted), 1);
    gameData.researches[8].limit = Math.max(Math.floor(gameData.world.highestWaveCompleted / 5), 1);
    gameData.researches.forEach((u) => {
        u.addedlimit = 0;
    });
    if (achievementbonus > 20) {
        gameData.buildings.forEach((b) => {
            b.autoBuy();
        });
    }
    if (achievementbonus > 25) {
        gameData.researches.forEach((r) => {
            r.autoOn = true;
            r.autoBuy();
        });
    }
    // if (gameData.pebbleUpgrades[6].bought > 0) {
    //   gameData.powderUpgrades.forEach((u) => {
    //     if (u.addedLimitElgible) {
    //       u.addedlimit += 10;
    //     }
    //   });
    // }
    // if (gameData.rockUpgrades[2].bought > 0) {
    //   gameData.powderUpgrades.forEach((u) => {
    //     if (u.addedLimitElgible) {
    //       u.addedlimit += 10;
    //     }
    //   });
    // }
    for (let index = gameData.enemies.length - 1; index >= 0; index--) {
        const e = gameData.enemies[index];
        if (e.act()) {
            // returns true if enemy died
            gameData.enemies[index].bullets = [];
            gameData.enemies.splice(index, 1);
        }
        else if (e.pos.y >= Math.ceil(getTierSize())) {
            // returns true if enemy has made it off board
            gameData.world.mulligansused += 1;
            const maxMulligans = maxMulligansCalc();
            if (gameData.world.mulligansused > maxMulligans) {
                gameData.challenges.forEach((ch) => {
                    if (ch.active) {
                        ch.fail();
                    }
                });
                gameData.world.deathLevel += 1;
                gameData.world.mulligansused = 0;
                gameData.world.currentWave -= gameData.world.deathLevel;
                if (gameData.world.currentWave < 1) {
                    gameData.world.currentWave = 1;
                }
                display.addToDisplay('You have been overcome.  The pressure lessens.', DisplayCategory.Story);
                resetSpawns(true);
                break;
            }
            else {
                e.pos = new Vector(0, 5);
                e.bullets = [];
                e.targetListIndex = 0;
            }
        }
    }
    totalHousing = new JBDecimal(10);
    if (gameData.pebbleUpgrades[12].bought > 0) {
        totalHousing = new JBDecimal(100);
    }
    netStone = new JBDecimal(gameData.resources.stone.amount);
    netWood = new JBDecimal(gameData.resources.wood.amount);
    netArrows = new JBDecimal(gameData.resources.arrow.amount);
    netRedResearch = new JBDecimal(gameData.resources.redResearch.amount);
    gameData.buildings.forEach((b) => {
        b.act();
        totalHousing = totalHousing.add(b.housingAvailable());
        // netStone = netStone.add(b.netStonePerSec);
        // netWood = netWood.add(b.netWoodPerSec);
        // netArrows = netArrows.add(b.netArrowPerSec);
        // netRedResearch = netRedResearch.add(b.netRedResearchPerSec);
    });
    netStone = gameData.resources.stone.amount.subtract(netStone);
    netWood = gameData.resources.wood.amount.subtract(netWood);
    netArrows = gameData.resources.arrow.amount.subtract(netArrows);
    netRedResearch = gameData.resources.redResearch.amount.subtract(netRedResearch);
    const housingAvailable = totalHousing.subtract(gameData.resources.people.amount);
    if (housingAvailable.greaterThan(0)) {
        const peoplegrowth = housingAvailable
            .add(peopleAvailable().add(gameData.resources.people.amount))
            .multiply(Math.pow(1.05, gameData.powderUpgrades[10].bought))
            .multiply(gameData.world.currentTickLength / 2000000);
        gameData.resources.people.add(peoplegrowth);
    }
    if (gameData.resources.people.amount.greaterThan(totalHousing)) {
        gameData.resources.people.amount = new JBDecimal(totalHousing);
    }
    // if (gameData.resources.wood.amount.greaterThan(totalWoodStorage)) {
    //   gameData.resources.wood.amount = new JBDecimal(totalWoodStorage);
    // }
    // if (gameData.resources.stone.amount.greaterThan(totalStoneStorage)) {
    //   gameData.resources.stone.amount = new JBDecimal(totalStoneStorage);
    // }
    while (gameData.world.ticksToNextSpawn <= 0 && gameData.world.enemiesToSpawn > 0) {
        const newEnemy = new Enemy(false);
        gameData.enemies.push(newEnemy);
        let ticksToAdd = 1000 * Math.pow(0.98, (gameData.world.currentWave - 1));
        // if (gameData.rockUpgrades[22].bought > 0) {
        //   const ticksToAddSecondary = 1000 / ((gameData.stats.highestEverWave + 1) / gameData.world.currentWave);
        //   if (ticksToAddSecondary < ticksToAdd) {
        //     ticksToAdd = ticksToAddSecondary;
        //   }
        // }
        if (ticksToAdd < 1) {
            ticksToAdd = 1;
        }
        gameData.world.ticksToNextSpawn += ticksToAdd;
        gameData.world.enemiesToSpawn -= 1;
    }
    if (gameData.world.enemiesToSpawn === 0 && gameData.enemies.length === 0) {
        if (gameData.world.currentWave > gameData.stats.highestEverWave) {
            gameData.stats.highestEverWave = gameData.world.currentWave;
        }
        if (gameData.world.currentWave > gameData.world.highestWaveCompleted) {
            gameData.world.highestWaveCompleted = gameData.world.currentWave;
            if (gameData.world.highestWaveCompleted >= getWavesNeededForTier() && !gameData.world.equipmentEarned) {
                // earned new equipment
                const newEquipment = new Equipment(`Tier ${gameData.world.currentTier.toString()}`);
                newEquipment.NewEquipment(gameData.world.currentTier);
                gameData.equipment.push(newEquipment);
                gameData.world.equipmentEarned = true;
                display.addToDisplay('New Gem found', DisplayCategory.Story);
                // init(1);
            }
        }
        resetSpawns(false);
    }
    gameData.challenges.forEach((ch) => {
        if (ch.active) {
            ch.checkForCompletion();
        }
    });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function building1Click() {
    if (activeBuilding == null) {
        return;
    }
    if (activeBuilding.type !== '') {
        activeBuilding.buy();
        return;
    }
    activeBuilding.bought = 0;
    if (UIElementActive !== '') {
        UIElementActive = '';
        return;
    }
    UIElementActive = 'H';
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function building2Click() {
    if (activeBuilding == null) {
        return;
    }
    if (activeBuilding.type !== '') {
        activeBuilding.autoSwitch();
        return;
    }
    activeBuilding.bought = 0;
    if (UIElementActive !== '') {
        if (UIElementActive === 'H') {
            activeBuilding.buyShack();
        }
        if (UIElementActive === 'R') {
            activeBuilding.buyLumberJack();
        }
        if (UIElementActive === 'D') {
            activeBuilding.buyArrowTower();
        }
        UIElementActive = '';
        return;
    }
    UIElementActive = 'R';
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function building3Click() {
    if (activeBuilding == null) {
        return;
    }
    if (activeBuilding.type !== '') {
        activeBuilding.tactics.changeTactic(0);
        return;
    }
    activeBuilding.bought = 0;
    if (UIElementActive !== '') {
        if (UIElementActive === 'H') {
            activeBuilding.buyHouse();
        }
        if (UIElementActive === 'R') {
            activeBuilding.buyStoneMason();
        }
        if (UIElementActive === 'D') {
            activeBuilding.buyCatapult();
        }
        UIElementActive = '';
        return;
    }
    UIElementActive = 'D';
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function building4Click() {
    if (activeBuilding == null) {
        return;
    }
    if (activeBuilding.type !== '') {
        activeBuilding.tactics.changeTactic(1);
        return;
    }
    activeBuilding.bought = 0;
    if (UIElementActive !== '') {
        if (UIElementActive === 'H') {
            activeBuilding.buyMansion();
        }
        if (UIElementActive === 'R') {
            activeBuilding.buyFletcher();
        }
        if (UIElementActive === 'D') {
            activeBuilding.buyPoisonTower();
        }
        UIElementActive = '';
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function building5Click() {
    if (activeBuilding == null) {
        return;
    }
    if (activeBuilding.type !== '') {
        activeBuilding.tactics.changeTactic(2);
        return;
    }
    activeBuilding.bought = 0;
    if (UIElementActive !== '') {
        if (UIElementActive === 'R') {
            activeBuilding.buyRedResearchLab();
        }
        if (UIElementActive === 'D') {
            activeBuilding.buySlowTower();
        }
        UIElementActive = '';
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function building6Click() {
    if (activeBuilding == null) {
        return;
    }
    activeBuilding.tactics.changeTactic(3);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function building7Click() {
    if (activeBuilding == null) {
        return;
    }
    activeBuilding.delete();
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
    if (gameData.challenges[3].active || gameData.challenges[3].completed < 1) {
        document.getElementById('btnBuyResearch6').classList.add('d-none');
    }
    else {
        document.getElementById('btnBuyResearch6').classList.remove('d-none');
    }
    if (upgradeRefreshTickCount > 1000) {
        dirtyUpgrades = true;
    }
    if (document.getElementById('upgradeModal').classList.contains('show') && dirtyUpgrades) {
        document.getElementById('upgradePowder').innerHTML = gameData.resources.powder.amount.toString();
        document.getElementById('pebbleupgrades').classList.add('d-none');
        if (gameData.stats.prestige2 > 0 || pebbleFromPrestige().greaterThan(0)) {
            document.getElementById('pebbleupgrades').classList.remove('d-none');
            document.getElementById('upgradePebbles').innerHTML = gameData.resources.pebble.amount.toString();
        }
        document.getElementById('rockupgrades').classList.add('d-none');
        if (gameData.stats.prestige3 > 0 || rockFromPrestige().greaterThan(0)) {
            document.getElementById('rockupgrades').classList.remove('d-none');
            document.getElementById('upgradeRocks').innerHTML = gameData.resources.rock.amount.toString();
        }
        gameData.powderUpgrades.forEach((u) => {
            u.updateDisplay();
        });
        gameData.pebbleUpgrades.forEach((u) => {
            u.updateDisplay();
        });
        gameData.rockUpgrades.forEach((u) => {
            u.updateDisplay();
        });
        dirtyUpgrades = false;
        upgradeRefreshTickCount = 0;
    }
    if (document.getElementById('researchModal').classList.contains('show')) {
        document.getElementById('researchRedResearch').innerHTML = `${gameData.resources.redResearch.amount.toString()} (${netRedResearch.multiply(1000 / gameData.world.currentTickLength).toString()})`;
        gameData.researches.forEach((r) => {
            r.updateDisplay();
        });
    }
    if (document.getElementById('challengeModal').classList.contains('show')) {
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
        if (gameData.world.tierUnlocked > 1) {
            document.getElementById('btnChallengeAuto').classList.remove('d-none');
        }
        else {
            document.getElementById('btnChallengeAuto').classList.add('d-none');
            gameData.world.autoChallenge = false;
        }
        if (gameData.challenges[3].available) {
            document.getElementById('poisonchallenge').classList.remove('d-none');
        }
        else {
            document.getElementById('poisonchallenge').classList.add('d-none');
        }
        if (gameData.challenges[4].available) {
            document.getElementById('slowchallenge').classList.remove('d-none');
        }
        else {
            document.getElementById('slowchallenge').classList.add('d-none');
        }
        if (gameData.challenges[5].available) {
            document.getElementById('critchallenge').classList.remove('d-none');
        }
        else {
            document.getElementById('critchallenge').classList.add('d-none');
        }
        if (gameData.challenges[6].available) {
            document.getElementById('sbchallenge').classList.remove('d-none');
        }
        else {
            document.getElementById('sbchallenge').classList.add('d-none');
        }
        gameData.challenges.forEach((ch, index) => {
            ch.updateDisplay(index);
        });
    }
    if (document.getElementById('achievementModal').classList.contains('show')) {
        document.getElementById('totalachievementbonus').innerHTML = new JBDecimal(achievementbonus).ToString();
        const achBonusText = `${new JBDecimal(getAchievementsOnlyBonus()).ToString()}x`;
        gameData.tierfeats.forEach((tf, index) => {
            if (getTierBonus(index) > 1) {
                document.getElementById(`Tier${(index + 1).toString()}Bonus`).innerHTML = `${new JBDecimal(getTierBonus(index)).toString()}x`;
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
    if (gameData.world.tierUnlocked > 1) {
        document.getElementById('equipmentbtn').classList.remove('d-none');
    }
    else {
        document.getElementById('equipmentbtn').classList.add('d-none');
    }
    document.getElementById('challengesbtn').classList.remove('d-none');
    if (gameData.stats.highestEverWave < 20) {
        document.getElementById('challengesbtn').classList.add('d-none');
    }
    if (document.getElementById('equipmentModal').classList.contains('show')) {
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
                dirtyEquipment = false;
            }
        }
    }
    if (document.getElementById('statisticModal').classList.contains('show')) {
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
            prestige1history += `${newline}<br />`;
        });
        document.getElementById('prestige1history').innerHTML = prestige1history;
        let prestige2history = '<br />';
        gameData.stats.last10Prestige2amounts.forEach((amt, index) => {
            const ticks = gameData.stats.last10Prestige2times[index];
            const rate = display.PrettyRatePerTime(amt, ticks);
            const newline = `${index.toString()} took ${display.getPrettyTimeFromMilliSeconds(ticks)} and gave ${amt.ToString()} for an average of ${rate}`;
            prestige2history += `${newline}<br />`;
        });
        document.getElementById('prestige2history').innerHTML = prestige2history;
        let prestige3history = '<br />';
        gameData.stats.last10Prestige3amounts.forEach((amt, index) => {
            const ticks = gameData.stats.last10Prestige3times[index];
            const rate = display.PrettyRatePerTime(amt, ticks);
            const newline = `${index.toString()} took ${display.getPrettyTimeFromMilliSeconds(ticks)} and gave ${amt.ToString()} for an average of ${rate}`;
            prestige3history += `${newline}<br />`;
        });
        document.getElementById('prestige3history').innerHTML = prestige3history;
    }
    let activechallenges = false;
    let txt = 'Challenges Active:';
    gameData.challenges.forEach((ch) => {
        if (ch.active) {
            activechallenges = true;
            txt += `<br />${ch.name}: wave needed: ${ch.waveRequiredforCompletion()}`;
        }
    });
    if (activechallenges) {
        document.getElementById('btnqQuitChallenges').classList.remove('d-none');
    }
    else {
        txt = '';
        document.getElementById('btnqQuitChallenges').classList.add('d-none');
    }
    document.getElementById('textToDisplay').innerHTML = `${txt}<br />${display.getDisplayText()}`;
    document.getElementById('savebutton').style.fontSize = `${display.getFontSizeString(20)}px`;
    document.getElementById('researchbutton').style.fontSize = `${display.getFontSizeString(20)}px`;
    document.getElementById('upgradesbutton').style.fontSize = `${display.getFontSizeString(20)}px`;
    document.getElementById('challengesbtn').style.fontSize = `${display.getFontSizeString(20)}px`;
    document.getElementById('equipmentbtn').style.fontSize = `${display.getFontSizeString(20)}px`;
    document.getElementById('achbutton').style.fontSize = `${display.getFontSizeString(20)}px`;
    document.getElementById('statsbutton').style.fontSize = `${display.getFontSizeString(20)}px`;
    document.getElementById('optionsbutton').style.fontSize = `${display.getFontSizeString(20)}px`;
    document.getElementById('glossarybutton').style.fontSize = `${display.getFontSizeString(20)}px`;
    document.getElementById('btnqQuitChallenges').style.fontSize = `${display.getFontSizeString(15)}px`;
    document.getElementById('btnqQuitChallenges').style.height = `${display.getFontSizeString(30)}px`;
    document.getElementById('textToDisplay').style.height = `${(CANVAS_SIZE - Number(document.getElementById('btnqQuitChallenges').offsetHeight)).toString()}px`;
    document.getElementById('textToDisplay').style.fontSize = `${display.getFontSizeString(20)}px`;
    document.getElementById('resourcerow').style.fontSize = `${display.getFontSizeString(16)}px`;
    document.getElementById('peopletext').innerHTML = `People: ${gameData.resources.people.amount.toString()} / ${totalHousing.toString()}`;
    document.getElementById('workertext').innerHTML = `Available Workers: ${peopleAvailable().toString()}`;
    document.getElementById('woodtext').innerHTML = `Wood: ${gameData.resources.wood.amount.toString()} (${netWood.multiply(1000 / gameData.world.currentTickLength).toString()})`;
    document.getElementById('stonetext').innerHTML = `Stone: ${gameData.resources.stone.amount.toString()} (${netStone.multiply(1000 / gameData.world.currentTickLength).toString()})`;
    document.getElementById('arrowstext').innerHTML = `Arrows: ${gameData.resources.arrow.amount.toString()} (${netArrows.multiply(1000 / gameData.world.currentTickLength).toString()})`;
    document.getElementById('redresearchtext').innerHTML = `Red Research: ${gameData.resources.redResearch.amount.toString()} (${netRedResearch.multiply(1000 / gameData.world.currentTickLength).toString()})`;
    document.getElementById('essencetext').innerHTML = `Essence: ${gameData.resources.essence.amount.toString()}`;
    document.getElementById('powedertext').innerHTML = `Powder: ${gameData.resources.powder.amount.toString()}`;
    document.getElementById('pebbletext').innerHTML = `Pebbles: ${gameData.resources.pebble.amount.toString()}`;
    document.getElementById('rocktext').innerHTML = `Rocks: ${gameData.resources.rock.amount.toString()}`;
    document.getElementById('shardtext').innerHTML = `Shards: ${gameData.resources.shards.amount.toString()}`;
    document.getElementById('btnDisplayRange').classList.add('red');
    document.getElementById('btnDisplayRange').classList.remove('green');
    if (dirtyRange) {
        document.getElementById('btnDisplayRange').classList.remove('red');
        document.getElementById('btnDisplayRange').classList.add('green');
    }
    document.getElementById('btnDisplayRange').style.height = `${display.getFontSizeString(40)}px`;
    document.getElementById('btnDisplayRange').style.width = `${display.getFontSizeString(40)}px`;
    document.getElementById('btnDisplayRange').style.fontSize = `${display.getFontSizeString(12)}px`;
    document.getElementById('btnSpeed1').classList.add('red');
    document.getElementById('btnSpeed2').classList.add('red');
    document.getElementById('btnSpeed5').classList.add('red');
    document.getElementById('btnSpeed1').classList.remove('green');
    document.getElementById('btnSpeed2').classList.remove('green');
    document.getElementById('btnSpeed5').classList.remove('green');
    if (gameSpeed === 1) {
        document.getElementById('btnSpeed1').classList.add('green');
        document.getElementById('btnSpeed1').classList.remove('red');
    }
    if (gameSpeed === 2) {
        document.getElementById('btnSpeed2').classList.add('green');
        document.getElementById('btnSpeed2').classList.remove('red');
    }
    if (gameSpeed === 5) {
        document.getElementById('btnSpeed5').classList.add('green');
        document.getElementById('btnSpeed5').classList.remove('red');
    }
    if (gameData.world.paused === false) {
        document.getElementById('btnSpeed0').classList.add('green');
        document.getElementById('btnSpeed0').classList.remove('red');
    }
    else {
        document.getElementById('btnSpeed0').classList.remove('green');
        document.getElementById('btnSpeed0').classList.add('red');
    }
    document.getElementById('btnPrestige1').classList.add('hidden');
    if (powderFromPrestige().greaterThanOrEqualTo(1)) {
        document.getElementById('btnPrestige1').classList.remove('hidden');
        document.getElementById('btnPrestige1').innerHTML = `Prestige for ${powderFromPrestige().ToString()} powder<br />Current: ${getCurrentPowderRate().ToString()} /hr<br />Best: ${gameData.stats.bestPrestige1Rate.ToString()}/hr`;
        document.getElementById('btnPrestige1').style.height = `${display.getFontSizeString(75)}px`;
        document.getElementById('btnPrestige1').style.width = `${display.getFontSizeString(180)}px`;
        document.getElementById('btnPrestige1').style.fontSize = `${display.getFontSizeString(12)}px`;
    }
    document.getElementById('btnPrestige2').classList.add('hidden');
    if (powderFromPrestige().greaterThanOrEqualTo(1)) {
        document.getElementById('btnPrestige2').classList.remove('hidden');
        document.getElementById('btnPrestige2').innerHTML = `Ascend for ${pebbleFromPrestige().ToString()} pebbles<br />Current: ${getCurrentPebblesRate().ToString()} /hr<br />Best: ${gameData.stats.bestPrestige2Rate.ToString()}/hr`;
        document.getElementById('btnPrestige2').style.height = `${display.getFontSizeString(75)}px`;
        document.getElementById('btnPrestige2').style.width = `${display.getFontSizeString(180)}px`;
        document.getElementById('btnPrestige2').style.fontSize = `${display.getFontSizeString(12)}px`;
    }
    document.getElementById('btnPrestige3').classList.add('hidden');
    if (powderFromPrestige().greaterThanOrEqualTo(1)) {
        document.getElementById('btnPrestige3').classList.remove('hidden');
        document.getElementById('btnPrestige3').innerHTML = `Transform for ${rockFromPrestige().ToString()} rocks<br />Current: ${getCurrentRocksRate().ToString()} /hr<br />Best: ${gameData.stats.bestPrestige3Rate.ToString()}/hr`;
        document.getElementById('btnPrestige3').style.height = `${display.getFontSizeString(75)}px`;
        document.getElementById('btnPrestige3').style.width = `${display.getFontSizeString(180)}px`;
        document.getElementById('btnPrestige3').style.fontSize = `${display.getFontSizeString(12)}px`;
    }
    document.getElementById('btnSaveBluePrint').classList.add('hidden');
    document.getElementById('btnLoadBluePrint').classList.add('hidden');
    document.getElementById('btnSwitchBluePrint').classList.add('hidden');
    if (gameData.world.tierUnlocked > 1) {
        document.getElementById('btnSaveBluePrint').classList.remove('hidden');
        document.getElementById('btnLoadBluePrint').classList.remove('hidden');
        document.getElementById('btnSwitchBluePrint').classList.remove('hidden');
        document.getElementById('btnSwitchBluePrint').classList.remove('green');
        document.getElementById('btnSwitchBluePrint').classList.add('red');
        document.getElementById('btnSwitchBluePrint').innerHTML = `Turn Auto BluePrint On`;
        document.getElementById('btnSaveBluePrint').style.height = `${display.getFontSizeString(25)}px`;
        document.getElementById('btnSaveBluePrint').style.width = `${display.getFontSizeString(225)}px`;
        document.getElementById('btnSaveBluePrint').style.fontSize = `${display.getFontSizeString(13)}px`;
        document.getElementById('btnLoadBluePrint').style.height = `${display.getFontSizeString(25)}px`;
        document.getElementById('btnLoadBluePrint').style.width = `${display.getFontSizeString(225)}px`;
        document.getElementById('btnLoadBluePrint').style.fontSize = `${display.getFontSizeString(13)}px`;
        document.getElementById('btnSwitchBluePrint').style.height = `${display.getFontSizeString(25)}px`;
        document.getElementById('btnSwitchBluePrint').style.width = `${display.getFontSizeString(225)}px`;
        document.getElementById('btnSwitchBluePrint').style.fontSize = `${display.getFontSizeString(13)}px`;
        if (gameData.tierblueprintsauto) {
            document.getElementById('btnSwitchBluePrint').classList.add('green');
            document.getElementById('btnSwitchBluePrint').classList.remove('red');
            document.getElementById('btnSwitchBluePrint').innerHTML = `Turn Auto BluePrint Off`;
        }
    }
    document.getElementById('btnBuilding1').className = 'buildingbutton';
    document.getElementById('btnBuilding2').className = 'buildingbutton';
    document.getElementById('btnBuilding3').className = 'buildingbutton';
    document.getElementById('btnBuilding4').className = 'buildingbutton';
    document.getElementById('btnBuilding5').className = 'buildingbutton';
    document.getElementById('btnBuilding6').className = 'buildingbutton';
    document.getElementById('btnBuilding7').className = 'buildingbutton';
    document.getElementById('btnBuilding1').classList.add('d-none');
    document.getElementById('btnBuilding2').classList.add('d-none');
    document.getElementById('btnBuilding3').classList.add('d-none');
    document.getElementById('btnBuilding4').classList.add('d-none');
    document.getElementById('btnBuilding5').classList.add('d-none');
    document.getElementById('btnBuilding6').classList.add('d-none');
    document.getElementById('btnBuilding7').classList.add('d-none');
    if (activeBuilding !== null) {
        document.getElementById('btnBuilding1').style.height = `${display.getFontSizeString(100)}px`;
        document.getElementById('btnBuilding1').style.width = `${display.getFontSizeString(120)}px`;
        document.getElementById('btnBuilding1').style.fontSize = `${display.getFontSizeString(12)}px`;
        document.getElementById('btnBuilding2').style.height = `${display.getFontSizeString(100)}px`;
        document.getElementById('btnBuilding2').style.width = `${display.getFontSizeString(120)}px`;
        document.getElementById('btnBuilding2').style.fontSize = `${display.getFontSizeString(12)}px`;
        document.getElementById('btnBuilding3').style.height = `${display.getFontSizeString(100)}px`;
        document.getElementById('btnBuilding3').style.width = `${display.getFontSizeString(120)}px`;
        document.getElementById('btnBuilding3').style.fontSize = `${display.getFontSizeString(12)}px`;
        document.getElementById('btnBuilding4').style.height = `${display.getFontSizeString(100)}px`;
        document.getElementById('btnBuilding4').style.width = `${display.getFontSizeString(120)}px`;
        document.getElementById('btnBuilding4').style.fontSize = `${display.getFontSizeString(12)}px`;
        document.getElementById('btnBuilding5').style.height = `${display.getFontSizeString(100)}px`;
        document.getElementById('btnBuilding5').style.width = `${display.getFontSizeString(120)}px`;
        document.getElementById('btnBuilding5').style.fontSize = `${display.getFontSizeString(12)}px`;
        document.getElementById('btnBuilding6').style.height = `${display.getFontSizeString(100)}px`;
        document.getElementById('btnBuilding6').style.width = `${display.getFontSizeString(120)}px`;
        document.getElementById('btnBuilding6').style.fontSize = `${display.getFontSizeString(12)}px`;
        document.getElementById('btnBuilding7').style.height = `${display.getFontSizeString(100)}px`;
        document.getElementById('btnBuilding7').style.width = `${display.getFontSizeString(120)}px`;
        document.getElementById('btnBuilding7').style.fontSize = `${display.getFontSizeString(12)}px`;
        if (activeBuilding.type === '') {
            if (UIElementActive === '') {
                document.getElementById('btnBuilding1').classList.remove('d-none');
                document.getElementById('btnBuilding2').classList.remove('d-none');
                document.getElementById('btnBuilding3').classList.remove('d-none');
                document.getElementById('btnBuilding1').classList.add('white');
                document.getElementById('btnBuilding2').classList.add('burleywood');
                document.getElementById('btnBuilding3').classList.add('red');
                document.getElementById('btnBuilding1').innerHTML = 'Housing';
                document.getElementById('btnBuilding2').innerHTML = 'Resource';
                document.getElementById('btnBuilding3').innerHTML = 'Defenses';
            }
            if (UIElementActive === 'H') {
                document.getElementById('btnBuilding1').classList.remove('d-none');
                document.getElementById('btnBuilding2').classList.remove('d-none');
                document.getElementById('btnBuilding3').classList.remove('d-none');
                document.getElementById('btnBuilding4').classList.remove('d-none');
                document.getElementById('btnBuilding1').classList.add('blue');
                document.getElementById('btnBuilding1').innerHTML = 'Go Back';
                const newShack = new Building(new Vector(0, 0), 0);
                newShack.type = 'Shack';
                newShack.setInfoByType();
                if (newShack.affordBuy()) {
                    document.getElementById('btnBuilding2').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding2').classList.add('red');
                }
                document.getElementById('btnBuilding2').innerHTML = `Shack<br />${newShack.getResourcesNeededString()}`;
                const newHouse = new Building(new Vector(0, 0), 0);
                newHouse.type = 'House';
                newHouse.setInfoByType();
                if (newHouse.affordBuy()) {
                    document.getElementById('btnBuilding3').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding3').classList.add('red');
                }
                document.getElementById('btnBuilding3').innerHTML = `House<br />${newHouse.getResourcesNeededString()}`;
                const newMansion = new Building(new Vector(0, 0), 0);
                newMansion.type = 'Mansion';
                newMansion.setInfoByType();
                if (newMansion.affordBuy()) {
                    document.getElementById('btnBuilding4').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding4').classList.add('red');
                }
                document.getElementById('btnBuilding4').innerHTML = `Mansion<br />${newMansion.getResourcesNeededString()}`;
            }
            if (UIElementActive === 'R') {
                document.getElementById('btnBuilding1').classList.remove('d-none');
                document.getElementById('btnBuilding2').classList.remove('d-none');
                document.getElementById('btnBuilding3').classList.remove('d-none');
                document.getElementById('btnBuilding4').classList.remove('d-none');
                document.getElementById('btnBuilding5').classList.remove('d-none');
                document.getElementById('btnBuilding1').classList.add('blue');
                document.getElementById('btnBuilding1').innerHTML = 'Go Back';
                const newLumberJack = new Building(new Vector(0, 0), 0);
                newLumberJack.type = 'LumberJack';
                newLumberJack.setInfoByType();
                if (newLumberJack.affordBuy()) {
                    document.getElementById('btnBuilding2').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding2').classList.add('red');
                }
                document.getElementById('btnBuilding2').innerHTML = `Lumber Jack<br />${newLumberJack.getResourcesNeededString()}`;
                const newStonemason = new Building(new Vector(0, 0), 0);
                newStonemason.type = 'StoneMason';
                newStonemason.setInfoByType();
                if (newStonemason.affordBuy()) {
                    document.getElementById('btnBuilding3').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding3').classList.add('red');
                }
                document.getElementById('btnBuilding3').innerHTML = `Stone Mason<br />${newStonemason.getResourcesNeededString()}`;
                const newfletcher = new Building(new Vector(0, 0), 0);
                newfletcher.type = 'Fletcher';
                newfletcher.setInfoByType();
                if (newfletcher.affordBuy()) {
                    document.getElementById('btnBuilding4').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding4').classList.add('red');
                }
                document.getElementById('btnBuilding4').innerHTML = `Fletcher<br />${newfletcher.getResourcesNeededString()}`;
                const newredResearch = new Building(new Vector(0, 0), 0);
                newredResearch.type = 'RedResearchLab';
                newredResearch.setInfoByType();
                if (newredResearch.affordBuy()) {
                    document.getElementById('btnBuilding5').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding5').classList.add('red');
                }
                document.getElementById('btnBuilding5').innerHTML = `Red Research Lab<br />${newredResearch.getResourcesNeededString()}`;
            }
            if (UIElementActive === 'D') {
                document.getElementById('btnBuilding1').classList.remove('d-none');
                document.getElementById('btnBuilding2').classList.remove('d-none');
                document.getElementById('btnBuilding3').classList.remove('d-none');
                document.getElementById('btnBuilding1').classList.add('blue');
                document.getElementById('btnBuilding1').innerHTML = 'Go Back';
                const newArrowTower = new Building(new Vector(0, 0), 0);
                newArrowTower.type = 'ArrowTower';
                newArrowTower.setInfoByType();
                if (newArrowTower.affordBuy()) {
                    document.getElementById('btnBuilding2').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding2').classList.add('red');
                }
                document.getElementById('btnBuilding2').innerHTML = `Arrow Tower<br />${newArrowTower.getResourcesNeededString()}`;
                const newCatapult = new Building(new Vector(0, 0), 0);
                newCatapult.type = 'Catapult';
                newCatapult.setInfoByType();
                if (newCatapult.affordBuy()) {
                    document.getElementById('btnBuilding3').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding3').classList.add('red');
                }
                document.getElementById('btnBuilding3').innerHTML = `Catapult<br />${newCatapult.getResourcesNeededString()}`;
                if (gameData.challenges[3].active || gameData.challenges[3].completed === 0) {
                    //
                }
                else {
                    document.getElementById('btnBuilding4').classList.remove('d-none');
                    const newPoison = new Building(new Vector(0, 0), 0);
                    newPoison.type = 'PoisonTower';
                    newPoison.setInfoByType();
                    if (newPoison.affordBuy()) {
                        document.getElementById('btnBuilding4').classList.add('green');
                    }
                    else {
                        document.getElementById('btnBuilding4').classList.add('red');
                    }
                    document.getElementById('btnBuilding4').innerHTML = `Poison Tower<br />${newPoison.getResourcesNeededString()}`;
                }
                if (gameData.challenges[4].active || gameData.challenges[4].completed === 0) {
                    //
                }
                else {
                    document.getElementById('btnBuilding5').classList.remove('d-none');
                    const newSlow = new Building(new Vector(0, 0), 0);
                    newSlow.type = 'SlowTower';
                    newSlow.setInfoByType();
                    if (newSlow.affordBuy()) {
                        document.getElementById('btnBuilding5').classList.add('green');
                    }
                    else {
                        document.getElementById('btnBuilding5').classList.add('red');
                    }
                    document.getElementById('btnBuilding5').innerHTML = `Slow Tower<br />${newSlow.getResourcesNeededString()}`;
                }
            }
        }
        else {
            document.getElementById('btnBuilding1').classList.remove('d-none');
            if (activeBuilding.affordBuy()) {
                document.getElementById('btnBuilding1').classList.add('green');
            }
            else {
                document.getElementById('btnBuilding1').classList.add('red');
            }
            document.getElementById('btnBuilding1').innerHTML = `Upgrade ${activeBuilding.type}<br />${activeBuilding.getResourcesNeededString()}`;
            if (achievementbonus > 20) {
                document.getElementById('btnBuilding2').classList.remove('d-none');
                if (activeBuilding.autoOn) {
                    document.getElementById('btnBuilding2').classList.add('green');
                    document.getElementById('btnBuilding2').innerHTML = 'Switch Auto Buy Off';
                }
                else {
                    document.getElementById('btnBuilding2').classList.add('red');
                    document.getElementById('btnBuilding2').innerHTML = 'Switch Auto Buy On';
                }
            }
            if (activeBuilding.arrowAttackValue().greaterThan(0) || activeBuilding.catapultAttackValue().greaterThan(0)) {
                document.getElementById('btnBuilding3').classList.remove('d-none');
                if (activeBuilding.tactics.fastest) {
                    document.getElementById('btnBuilding3').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding3').classList.add('red');
                }
                document.getElementById('btnBuilding3').innerHTML = 'Target Fastest';
                document.getElementById('btnBuilding4').classList.remove('d-none');
                if (activeBuilding.tactics.highestHealth) {
                    document.getElementById('btnBuilding4').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding4').classList.add('red');
                }
                document.getElementById('btnBuilding4').innerHTML = 'Target Strongest';
                document.getElementById('btnBuilding5').classList.remove('d-none');
                if (activeBuilding.tactics.lowestHealth) {
                    document.getElementById('btnBuilding5').classList.add('green');
                }
                else {
                    document.getElementById('btnBuilding5').classList.add('red');
                }
                document.getElementById('btnBuilding5').innerHTML = 'Target Weakest';
                if (gameData.pebbleUpgrades[11].bought > 0) {
                    document.getElementById('btnBuilding6').classList.remove('d-none');
                    if (activeBuilding.tactics.healer) {
                        document.getElementById('btnBuilding6').classList.add('green');
                    }
                    else {
                        document.getElementById('btnBuilding6').classList.add('red');
                    }
                    document.getElementById('btnBuilding6').innerHTML = 'Target Healers';
                }
            }
            document.getElementById('btnBuilding7').classList.remove('d-none');
            document.getElementById('btnBuilding7').classList.add('red');
            document.getElementById('btnBuilding7').innerHTML = 'Destroy';
        }
    }
    const { canvasmain } = display;
    const { ctxmain } = display;
    const { canvasbackground } = display;
    const { ctxbackground } = display;
    if (!canvasmain.getContext) {
        return;
    }
    CANVAS_SIZE = Math.min(canvasmain.clientWidth, canvasmain.clientHeight);
    const originalHeight = canvasmain.height;
    const originalWidth = canvasmain.width;
    const dimensions = getObjectFitSize(true, canvasmain.clientWidth, canvasmain.clientHeight, canvasmain.width, canvasmain.height);
    const dpr = window.devicePixelRatio || 1;
    canvasmain.width = dimensions.width * dpr;
    canvasmain.height = dimensions.height * dpr;
    canvasbackground.width = canvasmain.width;
    canvasbackground.height = canvasmain.height;
    const ratio = Math.min(canvasmain.clientWidth / originalWidth, canvasmain.clientHeight / originalHeight);
    ctxmain.scale((ratio * dpr * canvasmain.width) / canvasmain.scrollWidth, (ratio * dpr * canvasmain.height) / canvasmain.scrollHeight); // adjust this!
    ctxbackground.scale((ratio * dpr * canvasmain.width) / canvasmain.scrollWidth, (ratio * dpr * canvasmain.height) / canvasmain.scrollHeight); // adjust this!
    // dirtyRange = true;
    ctxmain.fillStyle = 'black';
    ctxmain.fillRect(0, 0, canvasmain.width, canvasmain.height);
    if (dirtyRange) {
        gameData.buildings.forEach((b) => {
            b.drawRange(ctxmain);
        });
    }
    // ctxmain.drawImage(canvasbackground, 0, 0);
    gameData.buildings.forEach((b) => {
        b.draw();
    });
    ctxmain.globalAlpha = 1.0;
    gameData.enemies.forEach((e) => {
        e.draw();
        e.bullets.forEach((b) => {
            b.draw();
        });
    });
    display.showFloaters();
    display.drawText(`Drone Health: ${display.drone1.maxHitPoints().ToString()}`, new Vector(getTierSize(), CANVAS_SIZE * 0.001), 'white', `${display.getFontSizeString(15)}px Arial`, 'right', 'top');
    const mulligans = maxMulligansCalc() - gameData.world.mulligansused;
    if (mulligans > 0) {
        display.drawText(`${mulligans.toString()} mulligans`, new Vector(1, 3), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
    }
    display.drawText(`${gameData.world.currentTickLength}ms`, new Vector(1, 2), 'white', `${display.getFontSizeString(12)}px Arial`, 'left', 'top');
    display.drawText(`Wave: ${gameData.world.currentWave} / ${getWavesNeededForTier()}`, new Vector(getTierSize() / 2, CANVAS_SIZE * 0.003), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'top');
    display.drawText(`Unspawned: ${gameData.world.enemiesToSpawn.toString()}(${getSpecialsCount().toString()})`, new Vector(1, CANVAS_SIZE * 0.001), 'white', `${display.getFontSizeString(15)}px Arial`, 'left', 'top');
    if (gameData.world.ticksToNextSpawn > 1000) {
        // ctx.fillStyle = 'red';
        display.drawText(`Time to next enemy: ${display.getPrettyTimeFromMilliSeconds(gameData.world.ticksToNextSpawn)}`, new Vector(1, 6), 'red', `${display.getFontSizeString(15)}px bold Arial`, 'left', 'middle');
    }
    if (gameData.world.tierUnlocked > 1) {
        display.drawTextNoScale(`Tier: ${gameData.world.currentTier}`, new Vector(CANVAS_SIZE / 2, CANVAS_SIZE * 0.01), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'top');
    }
    if (gameData.world.tierUnlocked - gameData.world.currentTier > 0) {
        display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.53, CANVAS_SIZE * 0.005), new Vector(CANVAS_SIZE * 0.55, CANVAS_SIZE * 0.025), 'green', true);
        display.drawTextNoScale(`+`, new Vector(CANVAS_SIZE * 0.54, CANVAS_SIZE * 0.01), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'top');
    }
    if (gameData.world.currentTier > 1) {
        display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.45, CANVAS_SIZE * 0.005), new Vector(CANVAS_SIZE * 0.47, CANVAS_SIZE * 0.025), 'red', true);
        display.drawTextNoScale(`-`, new Vector(CANVAS_SIZE * 0.46, CANVAS_SIZE * 0.01), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'top');
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
        while (gameData.equipment.length > 5) {
            DeleteEquipment(gameData.equipment.length - 1);
        }
        createBuildingSites();
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
    if (gameData.resources.essence.amount.greaterThan(100)) {
        gameData.resources.essence.amount = gameData.resources.essence.amount.multiply(2);
    }
    else {
        gameData.resources.essence.amount = new JBDecimal(100);
    }
}
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const scaledx = display.TierScalingReverse(x);
    const scaledy = display.TierScalingReverse(y);
    // display.addToDisplay(`x: ${x} y: ${y} sx: ${scaledx} sy: ${scaledy} cw: ${canvas.clientWidth} ch: ${canvas.clientHeight}`, DisplayCategory.Tutorial);
    const clickVector = new Vector(scaledx, scaledy);
    if (gameData.world.tierUnlocked > gameData.world.currentTier) {
        if (x > CANVAS_SIZE * 0.53 && x < CANVAS_SIZE * 0.55 && y > 0 && y < CANVAS_SIZE * 0.12) {
            changeTier('Up');
        }
    }
    if (gameData.world.currentTier > 1) {
        if (x > CANVAS_SIZE * 0.45 && x < CANVAS_SIZE * 0.47 && y > 0 && y < CANVAS_SIZE * 0.12) {
            changeTier('Down');
        }
    }
    if (x < CANVAS_SIZE && x > 0 && y < CANVAS_SIZE && y > 0) {
        activeBuilding = null;
        gameData.buildings.forEach((b) => {
            if (b.pos.getLengthFromAnotherVector(clickVector) < 5) {
                activeBuilding = b;
                UIElementActive = '';
            }
        });
        if (activeBuilding == null) {
            return;
        }
        // is it delete button
        const deleteBtnVector = new Vector(activeBuilding.pos.x + 2.2, activeBuilding.pos.y - 3.4);
        if (clickVector.getLengthFromAnotherVector(deleteBtnVector) < 1) {
            activeBuilding.delete();
            return;
        }
        // is it buy button
        const buyBtnVector = new Vector(activeBuilding.pos.x, activeBuilding.pos.y - 4);
        if (clickVector.getLengthFromAnotherVector(buyBtnVector) < 1 && activeBuilding.type !== '') {
            if (activeBuilding.affordBuy()) {
                activeBuilding.buy();
            }
            else {
                // display.addToDisplay(activeBuilding.getResourcesNeededString(), DisplayCategory.Tutorial);
            }
            return;
        }
        // is it buy button
        const autoBtnVector = new Vector(activeBuilding.pos.x - 2.2, activeBuilding.pos.y - 3.4);
        if (clickVector.getLengthFromAnotherVector(autoBtnVector) < 1) {
            activeBuilding.autoSwitch();
            return;
        }
    }
    if (activeBuilding.type === '') {
        activeBuilding.bought = 0;
        if (UIElementActive === '') {
            if (y > CANVAS_SIZE) {
                // menu
                if (x < CANVAS_SIZE * 0.2) {
                    UIElementActive = 'H';
                    return;
                }
                if (x < CANVAS_SIZE * 0.3) {
                    UIElementActive = 'R';
                    return;
                }
                if (x < CANVAS_SIZE * 0.4) {
                    UIElementActive = 'D';
                    return;
                }
                return;
            }
        }
        if (y > CANVAS_SIZE) {
            if (UIElementActive.slice(0, 1) === 'H') {
                if (x < CANVAS_SIZE * 0.2) {
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.3) {
                    activeBuilding.buyShack();
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.4) {
                    activeBuilding.buyHouse();
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.5) {
                    activeBuilding.buyMansion();
                    UIElementActive = '';
                    return;
                }
                return;
            }
            if (UIElementActive.slice(0, 1) === 'R') {
                if (x < CANVAS_SIZE * 0.2) {
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.3) {
                    activeBuilding.buyLumberJack();
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.4) {
                    activeBuilding.buyStoneMason();
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.5) {
                    activeBuilding.buyFletcher();
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.6) {
                    activeBuilding.buyRedResearchLab();
                    UIElementActive = '';
                    return;
                }
                return;
            }
            if (UIElementActive.slice(0, 1) === 'D') {
                if (x < CANVAS_SIZE * 0.2) {
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.3) {
                    activeBuilding.buyArrowTower();
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.4) {
                    activeBuilding.buyCatapult();
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.5) {
                    activeBuilding.buyPoisonTower();
                    UIElementActive = '';
                    return;
                }
                if (x < CANVAS_SIZE * 0.6) {
                    activeBuilding.buySlowTower();
                    UIElementActive = '';
                }
            }
        }
    }
}
const canvas = document.querySelector('canvas');
canvas.addEventListener('mousedown', function (e) {
    getCursorPosition(canvas, e);
});
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
        upgradeRefreshTickCount += ticksForCurrentTick;
        ticksForCurrentTick *= gameSpeed;
        if (ticksForCurrentTick > 50) {
            ticksForCurrentTick = 50;
        }
        testtick += ticksForCurrentTick;
        testframe += 1;
        display.addToDisplay(`avg ticks per frame:${new JBDecimal(testtick / testframe).toString()}`, DisplayCategory.Tutorial);
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