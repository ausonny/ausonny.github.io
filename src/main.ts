/* eslint-disable no-loop-func */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notationDisplayOptions = ['Scientific Notation', 'Standard Formatting', 'Engineering Notation', 'Alphabetic Notation', 'Hybrid Notation', 'Logarithmic Notation'];

let dirtyEquipment = true;

let dirtyUpgrades = true;

let upgradeRefreshTickCount = 0;

// let AutoBuyPebblesTickCount = 0;

let UIElementActive = '';

let activeBuilding = null;

let gameSpeed = 1;

let initted = false;

let gameData: SaveGameData;
const display = new Display();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let internalInflationArray: number[];

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
function changeSpeed(value: number) {
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

function powderFromPrestige(amt: JBDecimal = new JBDecimal(0)) {
  if (amt.equals(new JBDecimal(0))) {
    return gameData.resources.essence.amount.divide(100 - gameData.pebbleUpgrades[0].bought - gameData.powderUpgrades[4].bought).floor(); // - gameData.boulderUpgrades[12].bought */).floor();
  }
  return amt.divide(100 - gameData.pebbleUpgrades[0].bought /*  - gameData.upgrades[22].bought - gameData.boulderUpgrades[12].bought */).floor();
}

function pebbleFromPrestige() {
  return gameData.resources.powder.amount
    .add(powderFromPrestige())
    .divide(1000) /*  - gameData.boulderUpgrades[1].bought - gameData.rockUpgrades[20].bought */
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

// function AutoBuyPowder() {
//   AutoBuyPebblesTickCount += gameData.world.currentTickLength;
//   if (AutoBuyPebblesTickCount > 1000) {
//     const essenceToUse = gameData.resources.essence.amount.divide(100);
//     const powdergained = powderFromPrestige(essenceToUse);
//     if (powdergained.greaterThanOrEqualTo(1)) {
//       gameData.resources.essence.subtract(essenceToUse);
//       gameData.resources.powder.add(powderFromPrestige(essenceToUse));
//     }
//     AutoBuyPebblesTickCount -= 1000;
//   }
// }

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
    if (typeof currentBluePrint.blueprints[index] !== 'undefined') {
      b.type = currentBluePrint.blueprints[index].towerType;
      b.setInfoByType();
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function blueprintSave() {
  const newTBP = new TierBluePrint();
  gameData.buildings.forEach((b) => {
    const newbp = new Blueprint();
    newbp.towerType = b.type;
    newTBP.blueprints.push(newbp);
  });
  while (gameData.tierBlueprints.length < gameData.world.currentTier + 1) {
    gameData.tierBlueprints.push(new TierBluePrint());
  }
  gameData.tierBlueprints[gameData.world.currentTier] = newTBP;
  display.addToDisplay('Blueprint Saved', DisplayCategory.Loot);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DeleteEquipment(index: number) {
  gameData.equipment[index].DestructAbilities();
  gameData.equipment.splice(index, 1);
  dirtyEquipment = true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MoveEquipment(index: number) {
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
    } else {
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
      gameData.stats.last10Prestige1waves.unshift(gameData.world.currentWave - 1);
      gameData.stats.last10Prestige1waves.splice(10);
      gameData.stats.last10Prestige1tier.unshift(gameData.world.currentTier);
      gameData.stats.last10Prestige1tier.splice(10);
      gameData.stats.prestige1 += 1;
    }

    gameData.world.deathLevel = 0;

    gameData.stats.prestige1ticks = 0;
    gameData.stats.bestPrestige1Rate = new JBDecimal(0.00000000001);
    gameData.resources.powder.add(powderFromPrestige());
    gameData.resources.wood.amount = new JBDecimal(100);
    if (gameData.pebbleUpgrades[7].bought > 0) {
      gameData.resources.wood.amount = new JBDecimal(10000);
    }
    gameData.resources.people.amount = new JBDecimal(10);
    if (gameData.pebbleUpgrades[12].bought > 0) {
      gameData.resources.people.amount = new JBDecimal(100);
    }
    gameData.resources.essence.amount = new JBDecimal(0);
    gameData.resources.arrow.amount = new JBDecimal(0);
    gameData.resources.stone.amount = new JBDecimal(0);
    gameData.resources.redResearch.amount = new JBDecimal(0);
    gameData.world.currentWave = 0;
    gameData.world.highestWaveCompleted = 0;
    gameData.world.equipmentEarned = false;

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
  }

  if (prestigelevel === 0) {
    gameData = new SaveGameData('new');
    createAchievementBonusArray(200, true);
    createInternalInflationArray(10000, true);
    createBuildingSites();

    loadSaveGame();
  }

  display.drone = new Enemy(true);
  if (gameData.stats.prestige1 > 0 || gameData.stats.prestige2 > 0 || gameData.stats.prestige3 > 0) {
    display.addToDisplay('Here we go again', DisplayCategory.Story);
  } else {
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

function processStuff(ticks: number) {
  // if (gameData.boulderUpgrades[5].bought > 0) {
  //   AutoBuyPebbles();
  // }

  while (gameData.tierfeats.length < gameData.world.tierUnlocked) {
    gameData.tierfeats.push(createFeatsForTier(gameData.tierfeats.length + 1));
  }

  gameData.challenges.forEach((c) => {
    c.available = false;
  });

  gameData.challenges[0].available = true;
  gameData.challenges[1].available = true;
  gameData.challenges[2].available = true;

  const achievementbonus = getAchievementBonus();

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

  gameData.powderUpgrades[0].limit = 15 + gameData.pebbleUpgrades[6].bought * 10;
  gameData.powderUpgrades[1].limit = 15 + gameData.pebbleUpgrades[6].bought * 10;
  gameData.powderUpgrades[2].limit = 15 + gameData.pebbleUpgrades[6].bought * 10;
  gameData.powderUpgrades[3].limit = 15 + gameData.pebbleUpgrades[6].bought * 10;
  gameData.powderUpgrades[12].limit = 15 + gameData.pebbleUpgrades[6].bought * 10;
  gameData.powderUpgrades[13].limit = 15 + gameData.pebbleUpgrades[6].bought * 10;
  gameData.powderUpgrades[16].limit = 15 + gameData.pebbleUpgrades[6].bought * 10;

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

  if (getAchievementBonus() > 20) {
    gameData.buildings.forEach((b) => {
      b.autoBuy();
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
    } else if (e.pos.y >= Math.ceil(getTierSize())) {
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
      } else {
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
  netStone = new JBDecimal(0);
  netWood = new JBDecimal(0);
  netArrows = new JBDecimal(0);
  netRedResearch = new JBDecimal(0);
  gameData.buildings.forEach((b) => {
    b.act();
    totalHousing = totalHousing.add(b.housingAvailable());
    netStone = netStone.add(b.netStonePerSec);
    netWood = netWood.add(b.netWoodPerSec);
    netArrows = netArrows.add(b.netArrowPerSec);
    netRedResearch = netRedResearch.add(b.netRedResearchPerSec);
  });

  const housingAvailable = totalHousing.subtract(gameData.resources.people.amount);
  if (housingAvailable.greaterThan(0)) {
    const peoplegrowth = housingAvailable
      .add(peopleAvailable().add(gameData.resources.people.amount))
      .multiply(1.1 ** gameData.powderUpgrades[10].bought)
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
    let ticksToAdd = 1000 * 0.98 ** (gameData.world.currentWave - 1);
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

function getObjectFitSize(contains: boolean /* true = contain, false = cover */, containerWidth: number, containerHeight: number, width: number, height: number) {
  const doRatio = width / height;
  const cRatio = containerWidth / containerHeight;
  let targetWidth = 0;
  let targetHeight = 0;
  const test = contains ? doRatio > cRatio : doRatio < cRatio;

  if (test) {
    targetWidth = containerWidth;
    targetHeight = targetWidth / doRatio;
  } else {
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
  const achBonus = getAchievementBonus();

  if (gameData.challenges[3].active || gameData.challenges[3].completed < 1) {
    document.getElementById('btnBuyResearch6').classList.add('d-none');
  } else {
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
    document.getElementById('researchRedResearch').innerHTML = `${gameData.resources.redResearch.amount.toString()} (${netRedResearch.toString()})`;
    gameData.researches.forEach((r) => {
      r.updateDisplay();
    });
  }

  if (document.getElementById('challengeModal').classList.contains('show')) {
    if (gameData.world.autoChallenge) {
      document.getElementById('btnChallengeAuto').classList.remove('bg-danger');
      document.getElementById('btnChallengeAuto').classList.add('bg-success');
      document.getElementById('btnChallengeAuto').innerHTML = 'Turn Auto Challenge Off';
    } else {
      document.getElementById('btnChallengeAuto').classList.add('bg-danger');
      document.getElementById('btnChallengeAuto').classList.remove('bg-success');
      document.getElementById('btnChallengeAuto').innerHTML = 'Turn Auto Challenge On';
    }

    if (achBonus > 28) {
      document.getElementById('btnChallengeAuto').classList.remove('d-none');
    } else {
      document.getElementById('btnChallengeAuto').classList.add('d-none');
      gameData.world.autoChallenge = false;
    }

    if (gameData.challenges[3].available) {
      document.getElementById('poisonchallenge').classList.remove('d-none');
    } else {
      document.getElementById('poisonchallenge').classList.add('d-none');
    }

    if (gameData.challenges[4].available) {
      document.getElementById('slowchallenge').classList.remove('d-none');
    } else {
      document.getElementById('slowchallenge').classList.add('d-none');
    }

    if (gameData.challenges[5].available) {
      document.getElementById('critchallenge').classList.remove('d-none');
    } else {
      document.getElementById('critchallenge').classList.add('d-none');
    }

    if (gameData.challenges[6].available) {
      document.getElementById('sbchallenge').classList.remove('d-none');
    } else {
      document.getElementById('sbchallenge').classList.add('d-none');
    }

    gameData.challenges.forEach((ch, index) => {
      ch.updateDisplay(index);
    });
  }

  if (document.getElementById('achievementModal').classList.contains('show')) {
    document.getElementById('totalachievementbonus').innerHTML = new JBDecimal(getAchievementBonus()).ToString();
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
  } else {
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
  } else {
    txt = '';
    document.getElementById('btnqQuitChallenges').classList.add('d-none');
  }

  document.getElementById('textToDisplay').innerHTML = `${txt}<br />${display.getDisplayText()}`;

  const { canvas } = display;
  const { ctx } = display;

  if (!canvas.getContext) {
    return;
  }

  CANVAS_SIZE = Math.min(canvas.clientWidth, canvas.clientHeight);
  document.getElementById('textToDisplay').style.height = `${CANVAS_SIZE.toString()}px`;
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

  gameData.buildings.forEach((t) => {
    t.drawRange();
  });
  gameData.buildings.forEach((t) => {
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

  display.drawText(`Drone Health: ${display.drone.maxHitPoints().ToString()}`, new Vector(getTierSize(), 1), 'white', `${display.getFontSizeString(15)}px Arial`, 'right', 'top');
  const mulligans = maxMulligansCalc() - gameData.world.mulligansused;
  if (mulligans > 0) {
    display.drawText(`${mulligans.toString()} mulligans`, new Vector(1, 3), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  }

  display.drawText(`${gameData.world.currentTickLength}ms`, new Vector(1, 2), 'white', `${display.getFontSizeString(12)}px Arial`, 'left', 'top');
  ctx.font = '15px Arial';
  display.drawText(`Wave: ${gameData.world.currentWave} / ${getWavesNeededForTier()}`, new Vector(getTierSize() / 2, 2), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'top');
  display.drawText(`Unspawned: ${gameData.world.enemiesToSpawn.toString()}(${getSpecialsCount().toString()})`, new Vector(1, 1), 'white', `${display.getFontSizeString(15)}px Arial`, 'left', 'top');

  // display.DrawSolidRectangle(new Vector((getTierSize() / 2) - 10, 0), new Vector((getTierSize() / 2) - 9, 3), 'red', false);

  // <button class="tierbutton text-center btn-danger" type="button" id="btntierdown" onclick="changeTier('Down')">-</button>
  // Tier: <span id="currenttier">0</span>
  // <button class="tierbutton text-center btn-success" type="button" id="btntierup" onclick="changeTier('Up')">+</button>

  if (gameData.world.ticksToNextSpawn > 1000) {
    ctx.fillStyle = 'red';
    display.drawText(`Time to next enemy: ${display.getPrettyTimeFromMilliSeconds(gameData.world.ticksToNextSpawn)}`, new Vector(1, 6), 'red', `${display.getFontSizeString(15)}px bold Arial`, 'left', 'middle');
  }

  display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.9, 0), new Vector(CANVAS_SIZE, CANVAS_SIZE), 'silver');
  display.DrawSolidRectangleNoScale(new Vector(0, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE, CANVAS_SIZE), 'silver');
  display.DrawSolidRectangleNoScale(new Vector(0, 0), new Vector(CANVAS_SIZE, CANVAS_SIZE * 0.1), 'silver');
  display.DrawSolidRectangleNoScale(new Vector(0, 0), new Vector(CANVAS_SIZE * 0.1, CANVAS_SIZE), 'black');
  display.DrawSolidRectangleNoScale(new Vector(0, 0), new Vector(CANVAS_SIZE * 0.1, CANVAS_SIZE * 0.1), 'silver');
  display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.9, 0), new Vector(CANVAS_SIZE, CANVAS_SIZE * 0.1), 'silver');
  display.DrawSolidRectangleNoScale(new Vector(0, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.1, CANVAS_SIZE), 'silver');
  display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.9, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE, CANVAS_SIZE), 'silver');

  if (gameData.world.tierUnlocked > 1) {
    display.drawTextNoScale(`Tier: ${gameData.world.currentTier}`, new Vector(CANVAS_SIZE / 2, CANVAS_SIZE * 0.105), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'top');

    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.7, CANVAS_SIZE * 0.0), new Vector(CANVAS_SIZE * 0.9, (CANVAS_SIZE * 1) / 30), 'blue', true);
    display.drawTextNoScale(`Save Blueprint`, new Vector(CANVAS_SIZE * 0.8, CANVAS_SIZE * 0.0166666), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'middle');
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.7, (CANVAS_SIZE * 1) / 30), new Vector(CANVAS_SIZE * 0.9, (CANVAS_SIZE * 2) / 30), 'blue', true);
    display.drawTextNoScale(`Load Blueprint`, new Vector(CANVAS_SIZE * 0.8, CANVAS_SIZE * 0.05), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'middle');
    if (gameData.tierblueprintsauto) {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.7, (CANVAS_SIZE * 2) / 30), new Vector(CANVAS_SIZE * 0.9, CANVAS_SIZE * 0.1), 'green', true);
      display.drawTextNoScale(`Turn Auto Blueprint Load Off`, new Vector(CANVAS_SIZE * 0.8, CANVAS_SIZE * 0.08333333), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'middle');
    } else {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.7, (CANVAS_SIZE * 2) / 30), new Vector(CANVAS_SIZE * 0.9, CANVAS_SIZE * 0.1), 'red', true);
      display.drawTextNoScale(`Turn Auto Blueprint Load On`, new Vector(CANVAS_SIZE * 0.8, CANVAS_SIZE * 0.08333333), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'middle');
    }
  }

  if (gameData.world.tierUnlocked - gameData.world.currentTier > 0) {
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.53, CANVAS_SIZE * 0.1), new Vector(CANVAS_SIZE * 0.55, CANVAS_SIZE * 0.12), 'green', true);
    display.drawTextNoScale(`+`, new Vector(CANVAS_SIZE * 0.54, CANVAS_SIZE * 0.11), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'middle');
  }

  if (gameData.world.currentTier - gameData.world.tierUnlocked > 0) {
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.45, CANVAS_SIZE * 0.1), new Vector(CANVAS_SIZE * 0.47, CANVAS_SIZE * 0.12), 'red', true);
    display.drawTextNoScale(`-`, new Vector(CANVAS_SIZE * 0.46, CANVAS_SIZE * 0.11), 'white', `${display.getFontSizeString(15)}px Arial`, 'center', 'middle');
  }

  display.drawTextNoScale(`People:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.11), 'white', `${display.getFontSizeString(13)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`${gameData.resources.people.amount.toString()} / ${totalHousing.toString()}`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.125), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`Available Workers:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.15), 'white', `${display.getFontSizeString(13)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`${peopleAvailable().toString()}`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.165), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`Wood:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.19), 'white', `${display.getFontSizeString(13)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`${gameData.resources.wood.amount.toString()} (${netWood.toString()})`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.205), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`Stone:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.23), 'white', `${display.getFontSizeString(13)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`${gameData.resources.stone.amount.toString()} (${netStone.toString()})`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.245), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`Arrows:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.27), 'white', `${display.getFontSizeString(13)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`${gameData.resources.arrow.amount.toString()} (${netArrows.toString()})`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.285), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`Red Research:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.31), 'white', `${display.getFontSizeString(13)}px bold Arial`, 'left', 'top');
  display.drawTextNoScale(`${gameData.resources.redResearch.amount.toString()} (${netRedResearch.toString()})`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.325), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  if (gameData.resources.essence.amount.greaterThan(0)) {
    display.drawTextNoScale(`Essence:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.35), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
    display.drawTextNoScale(`${gameData.resources.essence.amount.toString()}`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.365), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  }
  if (gameData.resources.powder.amount.greaterThan(0)) {
    display.drawTextNoScale(`Powder:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.39), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
    display.drawTextNoScale(`${gameData.resources.powder.amount.toString()}`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.405), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  }
  if (gameData.resources.pebble.amount.greaterThan(0)) {
    display.drawTextNoScale(`Pebble:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.43), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
    display.drawTextNoScale(`${gameData.resources.pebble.amount.toString()}`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.445), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  }
  if (gameData.resources.rock.amount.greaterThan(0)) {
    display.drawTextNoScale(`Rock:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.47), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
    display.drawTextNoScale(`${gameData.resources.rock.amount.toString()}`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.485), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  }
  if (gameData.resources.shards.amount.greaterThan(0)) {
    display.drawTextNoScale(`Shards:`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.51), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
    display.drawTextNoScale(`${gameData.resources.shards.amount.toString()}`, new Vector(CANVAS_SIZE * 0, CANVAS_SIZE * 0.525), 'white', `${display.getFontSizeString(12)}px bold Arial`, 'left', 'top');
  }

  display.drawTextNoScale(`Speed:`, new Vector(CANVAS_SIZE * 0.05, CANVAS_SIZE * 0.025), 'black', `${display.getFontSizeString(15)}px bold Arial`, 'center', 'middle');

  if (gameSpeed === 1) {
    display.DrawSolidRectangleNoScale(new Vector(0, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.025, CANVAS_SIZE * 0.1), 'green');
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.025, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.05, CANVAS_SIZE * 0.1), 'red');
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.05, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.075, CANVAS_SIZE * 0.1), 'red');
  }

  if (gameSpeed === 2) {
    display.DrawSolidRectangleNoScale(new Vector(0, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.025, CANVAS_SIZE * 0.1), 'red');
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.025, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.05, CANVAS_SIZE * 0.1), 'green');
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.05, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.075, CANVAS_SIZE * 0.1), 'red');
  }

  if (gameSpeed === 5) {
    display.DrawSolidRectangleNoScale(new Vector(0, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.025, CANVAS_SIZE * 0.1), 'red');
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.025, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.05, CANVAS_SIZE * 0.1), 'red');
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.05, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.075, CANVAS_SIZE * 0.1), 'green');
  }

  if (gameData.world.paused) {
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.075, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.1, CANVAS_SIZE * 0.1), 'green');
  } else {
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.075, CANVAS_SIZE * 0.05), new Vector(CANVAS_SIZE * 0.1, CANVAS_SIZE * 0.1), 'red');
  }

  display.drawTextNoScale(`1`, new Vector(CANVAS_SIZE * 0.0125, CANVAS_SIZE * 0.075), 'white', `${display.getFontSizeString(15)}px bold Arial`, 'center', 'middle');
  display.drawTextNoScale(`2`, new Vector(CANVAS_SIZE * 0.0375, CANVAS_SIZE * 0.075), 'white', `${display.getFontSizeString(15)}px bold Arial`, 'center', 'middle');
  display.drawTextNoScale(`5`, new Vector(CANVAS_SIZE * 0.0625, CANVAS_SIZE * 0.075), 'white', `${display.getFontSizeString(15)}px bold Arial`, 'center', 'middle');
  display.drawTextNoScale(`P`, new Vector(CANVAS_SIZE * 0.0875, CANVAS_SIZE * 0.075), 'white', `${display.getFontSizeString(15)}px bold Arial`, 'center', 'middle');

  if (powderFromPrestige().greaterThanOrEqualTo(1)) {
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.1, CANVAS_SIZE * 0), new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE * 0.1), 'green');
    display.displayTextArrayFromString(
      `Prestige for ${powderFromPrestige().ToString()} powder<br />Current: ${getCurrentPowderRate().ToString()} /hr<br />Best: ${gameData.stats.bestPrestige1Rate.ToString()}/hr`,
      new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE * 0.05),
      'white',
      'center',
      'middle'
    );
  }

  if (pebbleFromPrestige().greaterThanOrEqualTo(1)) {
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE * 0), new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE * 0.1), 'green');
    display.displayTextArrayFromString(
      `Ascend for ${pebbleFromPrestige().ToString()} pebbles<br />Current: ${getCurrentPebblesRate().ToString()} /hr<br />Best: ${gameData.stats.bestPrestige2Rate.ToString()}/hr`,
      new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE * 0.05),
      'white',
      'center',
      'middle'
    );
  }

  if (rockFromPrestige().greaterThanOrEqualTo(1)) {
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE * 0), new Vector(CANVAS_SIZE * 0.7, CANVAS_SIZE * 0.1), 'green');
    display.displayTextArrayFromString(
      `Transform for ${rockFromPrestige().ToString()} rocks<br />Current: ${getCurrentRocksRate().ToString()} /hr<br />Best: ${gameData.stats.bestPrestige3Rate.ToString()}/hr`,
      new Vector(CANVAS_SIZE * 0.6, CANVAS_SIZE * 0.05),
      'white',
      'center',
      'middle'
    );
  }

  // below we draw the right and bottom menus sections
  if (activeBuilding == null) {
    return;
  }

  if (activeBuilding.type !== '') {
    activeBuilding.drawMenuButtons();
    return;
  }

  if (UIElementActive.slice(0, 1) === 'H') {
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.1, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE), 'blue');
    display.displayTextArrayFromString(`Go Back`, new Vector(CANVAS_SIZE * 0.15, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');
    if (gameData.resources.wood.amount.greaterThanOrEqualTo(SHACK_COST)) {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE), 'green');
    } else {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE), 'red');
    }
    display.displayTextArrayFromString(`Buy Shack<br />Wood: ${SHACK_COST}`, new Vector(CANVAS_SIZE * 0.25, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');

    if (gameData.resources.wood.amount.greaterThanOrEqualTo(HOUSE_WOOD_COST) && gameData.resources.stone.amount.greaterThanOrEqualTo(HOUSE_STONE_COST)) {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE), 'green');
    } else {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE), 'red');
    }
    display.displayTextArrayFromString(`Buy House<br />Wood: ${HOUSE_WOOD_COST}<br />Stone: ${HOUSE_STONE_COST}`, new Vector(CANVAS_SIZE * 0.35, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');

    if (gameData.resources.wood.amount.greaterThanOrEqualTo(MANSION_WOOD_COST) && gameData.resources.stone.amount.greaterThanOrEqualTo(MANSION_STONE_COST)) {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE), 'green');
    } else {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE), 'red');
    }
    display.displayTextArrayFromString(`Buy Mansion<br />Wood: ${MANSION_WOOD_COST}<br />Stone: ${MANSION_STONE_COST}`, new Vector(CANVAS_SIZE * 0.45, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');
    return;
  }

  if (UIElementActive.slice(0, 1) === 'R') {
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.1, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE), 'blue');
    display.displayTextArrayFromString(`Go Back`, new Vector(CANVAS_SIZE * 0.15, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');
    if (gameData.resources.wood.amount.greaterThanOrEqualTo(LUMBERJACK_COST) && peopleAvailable().greaterThanOrEqualTo(1)) {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE), 'green');
    } else {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE), 'red');
    }
    display.displayTextArrayFromString(`Buy Lumberjack<br />People: 1<br />Wood: ${LUMBERJACK_COST}`, new Vector(CANVAS_SIZE * 0.25, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');

    if (gameData.resources.wood.amount.greaterThanOrEqualTo(STONEMASON_COST) && peopleAvailable().greaterThanOrEqualTo(3)) {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE), 'green');
    } else {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE), 'red');
    }
    display.displayTextArrayFromString(`Buy Stone Mason<br />People: 3<br />Wood: ${STONEMASON_COST}`, new Vector(CANVAS_SIZE * 0.35, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');

    if (gameData.resources.wood.amount.greaterThanOrEqualTo(FLETCHER_COST) && peopleAvailable().greaterThanOrEqualTo(1)) {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE), 'green');
    } else {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE), 'red');
    }
    display.displayTextArrayFromString(`Buy Fletcher<br />People: 1<br />Wood: ${FLETCHER_COST}`, new Vector(CANVAS_SIZE * 0.45, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');

    if (gameData.resources.wood.amount.greaterThanOrEqualTo(RED_RESEARCH_LAB_WOOD_COST) && gameData.resources.stone.amount.greaterThanOrEqualTo(RED_RESEARCH_LAB_STONE_COST) && peopleAvailable().greaterThanOrEqualTo(10)) {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.6, CANVAS_SIZE), 'green');
    } else {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.6, CANVAS_SIZE), 'red');
    }
    display.displayTextArrayFromString(
      `Buy Red<br />Research Lab<br />People: 10<br />Wood: ${RED_RESEARCH_LAB_WOOD_COST}<br />Stone: ${RED_RESEARCH_LAB_STONE_COST}`,
      new Vector(CANVAS_SIZE * 0.55, CANVAS_SIZE * 0.95),
      'white',
      'center',
      'middle'
    );
    return;
  }

  if (UIElementActive.slice(0, 1) === 'D') {
    display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.1, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE), 'blue');
    display.displayTextArrayFromString(`Go Back`, new Vector(CANVAS_SIZE * 0.15, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');
    if (gameData.resources.wood.amount.greaterThanOrEqualTo(ARROW_TOWER_COST) && peopleAvailable().greaterThanOrEqualTo(1)) {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE), 'green');
    } else {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE), 'red');
    }
    display.displayTextArrayFromString(`Buy Arrow Tower<br />People: 1<br />Wood: ${ARROW_TOWER_COST}`, new Vector(CANVAS_SIZE * 0.25, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');

    if (gameData.resources.wood.amount.greaterThanOrEqualTo(CATAPULT_WOOD_COST) && gameData.resources.stone.amount.greaterThanOrEqualTo(CATAPULT_STONE_COST) && peopleAvailable().greaterThanOrEqualTo(5)) {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE), 'green');
    } else {
      display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE), 'red');
    }
    display.displayTextArrayFromString(`Buy Catapult Tower<br />People: 5<br />Wood: ${CATAPULT_WOOD_COST}<br />Stone: ${CATAPULT_STONE_COST}`, new Vector(CANVAS_SIZE * 0.35, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');

    if (!gameData.challenges[3].active && gameData.challenges[3].completed > 0) {
      if (gameData.resources.essence.amount.greaterThanOrEqualTo(POISON_TOWER_COST) && peopleAvailable().greaterThanOrEqualTo(1)) {
        display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE), 'green');
      } else {
        display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE), 'red');
      }
      display.displayTextArrayFromString(`Buy Poison Tower<br />People: 1<br />Essence: ${POISON_TOWER_COST}`, new Vector(CANVAS_SIZE * 0.45, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');
    }

    if (!gameData.challenges[4].active && gameData.challenges[4].completed > 0) {
      if (gameData.resources.essence.amount.greaterThanOrEqualTo(SLOW_TOWER_COST) && peopleAvailable().greaterThanOrEqualTo(1)) {
        display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.6, CANVAS_SIZE), 'green');
      } else {
        display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.5, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.6, CANVAS_SIZE), 'red');
      }
      display.displayTextArrayFromString(`Buy Slow Tower<br />People: 1<br />Essence: ${SLOW_TOWER_COST}`, new Vector(CANVAS_SIZE * 0.55, CANVAS_SIZE * 0.95), 'white', 'center', 'middle');
    }
    return;
  }

  display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.1, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE), 'blue');
  display.drawTextNoScale('Housing', new Vector(CANVAS_SIZE * 0.15, CANVAS_SIZE * 0.95), 'white', `${display.getFontSizeString(12)}px Arial`, 'center', 'middle');

  display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.2, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE), 'blue');
  display.drawTextNoScale('Resources', new Vector(CANVAS_SIZE * 0.25, CANVAS_SIZE * 0.95), 'white', `${display.getFontSizeString(12)}px Arial`, 'center', 'middle');

  display.DrawSolidRectangleNoScale(new Vector(CANVAS_SIZE * 0.3, CANVAS_SIZE * 0.9), new Vector(CANVAS_SIZE * 0.4, CANVAS_SIZE), 'blue');
  display.drawTextNoScale('Defenses', new Vector(CANVAS_SIZE * 0.35, CANVAS_SIZE * 0.95), 'white', `${display.getFontSizeString(12)}px Arial`, 'center', 'middle');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changeTier(value: string) {
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
  } else {
    gameData.resources.essence.amount = new JBDecimal(100);
  }
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const scaledx = display.TierScalingReverse(x - CANVAS_SIZE * 0.1);
  const scaledy = display.TierScalingReverse(y - CANVAS_SIZE * 0.1);
  // display.addToDisplay(`x: ${x} y: ${y} sx: ${scaledx} sy: ${scaledy} cw: ${canvas.clientWidth} ch: ${canvas.clientHeight}`, DisplayCategory.Tutorial);

  const clickVector = new Vector(scaledx, scaledy);

  if (x > CANVAS_SIZE * 0.1 && x < CANVAS_SIZE * 0.3 && y > CANVAS_SIZE * 0 && y < CANVAS_SIZE * 0.1) {
    if (powderFromPrestige().greaterThanOrEqualTo(1)) {
      prestige1();
    }
    return;
  }

  if (x > CANVAS_SIZE * 0.3 && x < CANVAS_SIZE * 0.5 && y > CANVAS_SIZE * 0 && y < CANVAS_SIZE * 0.1) {
    if (pebbleFromPrestige().greaterThanOrEqualTo(1)) {
      prestige2();
    }
    return;
  }

  if (x > CANVAS_SIZE * 0.5 && x < CANVAS_SIZE * 0.7 && y > CANVAS_SIZE * 0 && y < CANVAS_SIZE * 0.1) {
    if (rockFromPrestige().greaterThanOrEqualTo(1)) {
      prestige3();
    }
    return;
  }

  if (x > CANVAS_SIZE * 0.7 && x < CANVAS_SIZE * 0.9 && y > CANVAS_SIZE * 0 && y < (CANVAS_SIZE * 1) / 30) {
    blueprintSave();
    return;
  }
  if (x > CANVAS_SIZE * 0.5 && x < CANVAS_SIZE * 0.7 && y > (CANVAS_SIZE * 1) / 30 && y < (CANVAS_SIZE * 2) / 30) {
    blueprintLoad();
    return;
  }
  if (x > CANVAS_SIZE * 0.5 && x < CANVAS_SIZE * 0.7 && y > (CANVAS_SIZE * 2) / 30 && y < CANVAS_SIZE * 0.1) {
    gameData.tierblueprintsauto = !gameData.tierblueprintsauto;
    return;
  }

  if (x > 0 && x < CANVAS_SIZE * 0.025 && y > CANVAS_SIZE * 0.05 && y < CANVAS_SIZE * 0.1) {
    changeSpeed(1);
    return;
  }
  if (x > CANVAS_SIZE * 0.025 && x < CANVAS_SIZE * 0.05 && y > CANVAS_SIZE * 0.05 && y < CANVAS_SIZE * 0.1) {
    changeSpeed(2);
    return;
  }
  if (x > CANVAS_SIZE * 0.05 && x < CANVAS_SIZE * 0.075 && y > CANVAS_SIZE * 0.05 && y < CANVAS_SIZE * 0.1) {
    changeSpeed(5);
    return;
  }
  if (x > CANVAS_SIZE * 0.075 && x < CANVAS_SIZE * 0.1 && y > CANVAS_SIZE * 0.05 && y < CANVAS_SIZE * 0.1) {
    gameData.world.paused = !gameData.world.paused;
    return;
  }

  if (x < CANVAS_SIZE * 0.9 && x > CANVAS_SIZE * 0.1 && y < CANVAS_SIZE * 0.9 && y > CANVAS_SIZE * 0.1) {
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
    const deleteBtnVector = new Vector(activeBuilding.pos.x, activeBuilding.pos.y + 4);
    if (clickVector.getLengthFromAnotherVector(deleteBtnVector) < 1) {
      activeBuilding.delete();
      return;
    }
    // is it buy button
    const buyBtnVector = new Vector(activeBuilding.pos.x, activeBuilding.pos.y - 4);
    if (clickVector.getLengthFromAnotherVector(buyBtnVector) < 1 && activeBuilding.type !== '') {
      if (activeBuilding.affordBuy()) {
        activeBuilding.buy();
      } else {
        // display.addToDisplay(activeBuilding.getResourcesNeededString(), DisplayCategory.Tutorial);
      }
      return;
    }
    // is it buy button
    const autoBtnVector = new Vector(activeBuilding.pos.x + 4, activeBuilding.pos.y);
    if (clickVector.getLengthFromAnotherVector(autoBtnVector) < 1) {
      activeBuilding.autoSwitch();
      return;
    }
  }

  if (activeBuilding.type === '') {
    activeBuilding.bought = 0;
    if (UIElementActive === '') {
      if (y > CANVAS_SIZE * 0.9) {
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

    if (y > CANVAS_SIZE * 0.9) {
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
          return;
        }
        return;
      }
    }
  }

  if (y > CANVAS_SIZE * 0.9) {
    // menu
    // its the building menu
    if (x < CANVAS_SIZE * 0.2) {
      // its the buy button
      activeBuilding.buy();
      return;
    }
    if (x < CANVAS_SIZE * 0.4) {
      // its the auto switch button
      if (getAchievementBonus() > 20) {
        activeBuilding.autoSwitch();
      }
      return;
    }
    if (x < CANVAS_SIZE * 0.5) {
      // its the fastest button
      activeBuilding.tactics.changeTactic(0);
      return;
    }
    if (x < CANVAS_SIZE * 0.6) {
      // its the fastest button
      activeBuilding.tactics.changeTactic(1);
      return;
    }
    if (x < CANVAS_SIZE * 0.7) {
      // its the fastest button
      activeBuilding.tactics.changeTactic(2);
      return;
    }
    if (x < CANVAS_SIZE * 0.8) {
      // its the fastest button
      if (gameData.pebbleUpgrades[11].bought > 0) {
        activeBuilding.tactics.changeTactic(3);
      }
      return;
    }
    if (x < CANVAS_SIZE * 0.9) {
      // its the delete button
      activeBuilding.delete();
      // return;
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

    gameData.world.lastProcessTick = Object.assign(currentTime);
    gameData.world.currentTickLength = ticksForCurrentTick;

    if (currentTime > gameData.world.nextSaveGameTime) {
      saveGame(currentTime);
    }

    if (!gameData.world.paused) {
      processStuff(ticksForCurrentTick);
    }

    updateGUI();
  } catch (error) {
    display.logMyErrors(error);
  }
}, 0);
