// eslint-disable-next-line no-unused-vars
/* global JBDecimal, Enemy, Automation, Purchasable, Resource, SaveGameData, saveGame, Bullet, Vector, Display, getAchievementBonus, getAchievementsOnlyBonus, getTier1FeatBonus, getTier2FeatBonus, CheckAchievementCompletions, achievementbonusarray */

// eslint-disable-next-line no-unused-vars
const notationDisplayOptions = ['Scientific Notation', 'Standard Formatting', 'Engineering Notation', 'Alphabetic Notation', 'Hybrid Notation', 'Logarithmic Notation'];

let initted = false;
// eslint-disable-next-line no-undef
let gameData: SaveGameData;
const display = new Display();
let internalInflationArray: number[];

// eslint-disable-next-line prefer-const
internalInflationArray = [];

// const isFixedString = (s: string) => !isNaN(+s) && isFinite(+s) && !/e/i.test(s);

function getCurrentPebbleRate () {
  return pebblesFromPrestige().multiply(3600000).divide(gameData.stats.prestige1ticks);
}

function getCurrentRockRate () {
  return rocksFromPrestige().multiply(3600000).divide(gameData.stats.prestige2ticks);
}

function getCurrentBoulderRate () {
  return bouldersFromPrestige().multiply(3600000).divide(gameData.stats.prestige3ticks);
}

// eslint-disable-next-line no-unused-vars
function AchievementClick () {
}

function processStuff (ticks: number) {
  gameData.stats.prestige1ticks += ticks;
  gameData.stats.prestige2ticks += ticks;
  gameData.stats.prestige3ticks += ticks;
  gameData.world.currentTickLength = ticks;
  gameData.world.ticksToNextSpawn -= ticks;

  gameData.producer.costMultiplier = 10 - gameData.rockUpgrades[7].bought;

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

  gameData.tower.act();

  for (let index = 0; index < 12; index++) { // this resets only the first 12 pebbleupgrade limits, hence the unusual for loop
    const element = gameData.upgrades[index];
    element.addedlimit = 0;
  }

  if (gameData.rockUpgrades[5].bought > 0) {
    for (let index = 0; index < 12; index++) {
      const element = gameData.upgrades[index];
      element.addedlimit += 10;
    }
  }
  if (gameData.boulderUpgrades[3].bought > 0) {
    for (let index = 0; index < 12; index++) {
      const element = gameData.upgrades[index];
      element.addedlimit += 10;
    }
  }

  for (let index = gameData.enemies.length - 1; index >= 0; index--) {
    const e = gameData.enemies[index];
    e.act();
    if (e.CurrentHitPoints().lessThanOrEqualTo(0)) {
      if (gameData.world.currentWave >= gameData.world.highestWaveCompleted) {
        let dustGained = new JBDecimal(0);
        const lootupgrade = new JBDecimal(0.1).multiply(gameData.upgrades[6].bought).multiply(gameData.rockUpgrades[6].getBonus()).add(1);
        if (e.type !== '') {
          dustGained = new JBDecimal(1.05).pow(gameData.world.currentWave);
          dustGained = dustGained.multiply(lootupgrade);
          dustGained = dustGained.multiply(new JBDecimal(2).pow(gameData.world.currentTier - 1));
          if (e.type === 'Boss') {
            dustGained = dustGained.multiply(5);
          }
          if (dustGained.greaterThan(0)) {
            gameData.resources.dust.add(dustGained);
            display.addToDisplay(dustGained.ToString() + ' dust gained', 'loot');
          }
        }
      } else {
        let metalGained = new JBDecimal(0);
        const lootupgrade = new JBDecimal(0.1).multiply(gameData.upgrades[6].bought).add(1);
        if (e.type !== '') {
          metalGained = new JBDecimal(gameData.derivatives[0].production(10000));
          metalGained = metalGained.multiply(lootupgrade);
          metalGained = metalGained.multiply(new JBDecimal(2).pow(gameData.world.currentTier - 1));
          if (e.type === 'Boss') {
            metalGained = metalGained.multiply(5);
          }
          if (metalGained.greaterThan(0)) {
            gameData.resources.metal.add(metalGained);
            display.addToDisplay(metalGained.ToString() + ' metal gained', 'loot');
          }
        }
      }
      gameData.enemies.splice(index, 1);
    }
  }

  if (gameData.world.ticksToNextSpawn <= 0) {
    if (gameData.world.enemiesToSpawn > 0) {
      const enemyindex = gameData.world.currentWave + 10 - gameData.world.enemiesToSpawn; // keeps visual index from counting down.
      const newEnemy = new Enemy(gameData.world.currentWave, enemyindex);
      if (Math.random() * gameData.world.enemiesToSpawn < getSpecialsCount()) {
        const choicesArr = getSpecialsArray();

        const i = Math.floor(Math.random() * choicesArr.length);

        if (choicesArr[i] === 'F') {
          gameData.world.fastEnemiesToSpawn -= 1;
          newEnemy.movementPerSec *= 3;
          newEnemy.type = 'Fast';
        } else if (choicesArr[i] === 'T') {
          gameData.world.tankEnemiesToSpawn -= 1;
          newEnemy.baseMaxHitPoints = newEnemy.baseMaxHitPoints.multiply(3);
          newEnemy.type = 'Tank';
        } else if (choicesArr[i] === 'R') {
          gameData.world.rangedEnemiesToSpawn -= 1;
          newEnemy.type = 'Ranged';
          newEnemy.baseRange = 10;
        } else if (choicesArr[i] === 'C') {
          gameData.world.cannonEnemiesToSpawn -= 1;
          newEnemy.type = 'Cannon';
          newEnemy.baseAttack = newEnemy.baseAttack.multiply(3);
        } else if (choicesArr[i] === 'b') {
          gameData.world.bradleyEnemiesToSpawn -= 1;
          newEnemy.type = 'Bradley';
          newEnemy.movementPerSec = newEnemy.movementPerSec *= 3;
          newEnemy.baseMaxHitPoints = newEnemy.baseMaxHitPoints.multiply(3);
        } else if (choicesArr[i] === 't') {
          gameData.world.triremeEnemiesToSpawn -= 1;
          newEnemy.type = 'Trireme';
          newEnemy.baseRange = 10;
          newEnemy.baseMaxHitPoints = newEnemy.baseMaxHitPoints.multiply(3);
        } else if (choicesArr[i] === 'c') {
          gameData.world.cavalierEnemiesToSpwan -= 1;
          newEnemy.type = 'Cavalier';
          newEnemy.baseMaxHitPoints = newEnemy.baseMaxHitPoints.multiply(3);
          newEnemy.baseAttack = newEnemy.baseAttack.multiply(3);
        } else if (choicesArr[i] === 'S') {
          gameData.world.scorpionEnemiesToSpawn -= 1;
          newEnemy.type = 'Scorpion';
          newEnemy.movementPerSec = newEnemy.movementPerSec *= 3;
          newEnemy.baseAttack = newEnemy.baseAttack.multiply(3);
        } else if (choicesArr[i] === 'P') {
          gameData.world.paladinEnemiesToSpawn -= 1;
          newEnemy.type = 'Paladin';
          newEnemy.baseRange = 10;
          newEnemy.baseAttack = newEnemy.baseAttack.multiply(3);
        } else if (choicesArr[i] === 'O') {
          gameData.world.oliphantEnemiesToSpawn -= 1;
          newEnemy.type = 'Oliphant';
          newEnemy.baseRange = 10;
          newEnemy.movementPerSec = newEnemy.movementPerSec *= 3;
          newEnemy.baseMaxHitPoints = newEnemy.baseMaxHitPoints.multiply(5);
        } else if (choicesArr[i] === 'z') {
          gameData.world.blitzEnemiesToSpawn -= 1;
          newEnemy.type = 'Blitz';
          newEnemy.baseAttack = newEnemy.baseAttack.multiply(3);
          newEnemy.movementPerSec = newEnemy.movementPerSec *= 3;
          newEnemy.baseMaxHitPoints = newEnemy.baseMaxHitPoints.multiply(5);
        } else if (choicesArr[i] === 'f') {
          gameData.world.falconEnemiesToSpawn -= 1;
          newEnemy.type = 'Falcon';
          newEnemy.baseRange = 10;
          newEnemy.baseAttack = newEnemy.baseAttack.multiply(3);
          newEnemy.baseMaxHitPoints = newEnemy.baseMaxHitPoints.multiply(5);
        } else if (choicesArr[i] === 'a') {
          gameData.world.archerEnemiesToSpawn -= 1;
          newEnemy.type = 'Archer';
          newEnemy.baseRange = 10;
          newEnemy.movementPerSec = newEnemy.movementPerSec *= 3;
        } else if (choicesArr[i] === 'ti') {
          gameData.world.titanEnemiesToSpawn -= 1;
          newEnemy.type = 'Titan';
          newEnemy.baseRange = 10;
          newEnemy.baseAttack = newEnemy.baseAttack.multiply(3);
          newEnemy.movementPerSec = newEnemy.movementPerSec *= 3;
        } else if (choicesArr[i] === 'B') {
          gameData.world.bossEnemiesToSpawn -= 1;
          newEnemy.type = 'Boss';
          newEnemy.baseRange = 10;
          newEnemy.movementPerSec = newEnemy.movementPerSec *= 0.5; // slower makes him more deadly, giving him more time to shoot efore entering range
          newEnemy.baseAttack = newEnemy.baseAttack.multiply(5);
          newEnemy.baseMaxHitPoints = newEnemy.baseMaxHitPoints.multiply(5);
        }
      }
      gameData.enemies.push(newEnemy);
      gameData.world.ticksToNextSpawn += 1000 - gameData.world.currentWave * 5;
      gameData.world.enemiesToSpawn -= 1;
    }
  }

  const autoprestige1 = <HTMLInputElement>document.getElementById('autoprestige1');

  if (gameData.tower.CurrentHitPoints().lessThanOrEqualTo(0)) {
    gameData.tower.damagetaken = new JBDecimal(0);
    gameData.challenges.forEach((ch) => { ch.active = false; });
    if (autoprestige1.checked && pebblesFromPrestige().greaterThan(0)) {
      init(1);
      display.addToDisplay('Dust. But I still need more.', 'story');
    } else {
      gameData.world.currentWave -= 11;
      if (gameData.world.currentWave < 0) {
        gameData.world.currentWave = 0;
      }
      gameData.world.deathlevel++;
      resetSpawns(true);
      display.addToDisplay('You have been overcome.  The pressure lessens.', 'story');
    }
  }

  if (gameData.world.enemiesToSpawn === 0 && gameData.enemies.length < 1) {
    if (gameData.world.currentWave >= gameData.stats.highestEverWave) {
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

  if (gameData.stats.highestEverWave >= 20) {
    if (autoprestige1.checked) {
      gameData.automation[0].item = 1;
    } else {
      gameData.automation[0].item = 0;
    }
    const highestwavemultiplier = 5 - (gameData.rockUpgrades[2].bought + gameData.boulderUpgrades[2].bought);
    gameData.automation.forEach((element, index) => {
      if (index > 0) { // index 0 is the auto prestige check box.
        const itemName = 'automation' + (index).toString() + 'item';
        const valueName = 'automation' + (index).toString() + 'value';
        const autoitem = <HTMLSelectElement>document.getElementById(itemName);
        const autovalue = <HTMLSelectElement>document.getElementById(valueName);
        element.item = parseFloat(autoitem.options[autoitem.selectedIndex].value);
        element.value = parseFloat(autovalue.options[autovalue.selectedIndex].value);
        if (gameData.stats.highestEverWave >= index * highestwavemultiplier) {
          if (element.item === 1 && gameData.challenges[3].completed > 0) {
            runAutomationRule(element, gameData.producer, gameData.resources.metal, true);
          } else if (element.item === 2) {
            runAutomationRule(element, gameData.derivatives[0], gameData.resources.metal, true);
          } else if (element.item === 3) {
            runAutomationRule(element, gameData.derivatives[1], gameData.resources.metal, true);
          } else if (element.item === 4) {
            runAutomationRule(element, gameData.derivatives[2], gameData.resources.metal, true);
          } else if (element.item === 5 && gameData.upgrades[12].bought > 0) {
            runAutomationRule(element, gameData.derivatives[3], gameData.resources.metal, true);
          } else if (element.item === 6 && gameData.upgrades[12].bought > 1) {
            runAutomationRule(element, gameData.derivatives[4], gameData.resources.metal, true);
          } else if (element.item === 7 && gameData.upgrades[12].bought > 2) {
            runAutomationRule(element, gameData.derivatives[5], gameData.resources.metal, true);
          } else if (element.item === 8 && gameData.upgrades[12].bought > 3) {
            runAutomationRule(element, gameData.derivatives[6], gameData.resources.metal, true);
          } else if (element.item === 9 && gameData.upgrades[12].bought > 4) {
            runAutomationRule(element, gameData.derivatives[7], gameData.resources.metal, true);
          } else if (element.item === 10 && gameData.challenges[3].completed > 0) {
            runAutomationRule(element, gameData.producer, gameData.resources.dust, false);
          } else if (element.item === 11) {
            runAutomationRule(element, gameData.derivatives[0], gameData.resources.dust, false);
          } else if (element.item === 12) {
            runAutomationRule(element, gameData.derivatives[1], gameData.resources.dust, false);
          } else if (element.item === 13) {
            runAutomationRule(element, gameData.derivatives[2], gameData.resources.dust, false);
          } else if (element.item === 14 && gameData.upgrades[12].bought > 0) {
            runAutomationRule(element, gameData.derivatives[3], gameData.resources.dust, false);
          } else if (element.item === 15 && gameData.upgrades[12].bought > 1) {
            runAutomationRule(element, gameData.derivatives[4], gameData.resources.dust, false);
          } else if (element.item === 16 && gameData.upgrades[12].bought > 2) {
            runAutomationRule(element, gameData.derivatives[5], gameData.resources.dust, false);
          } else if (element.item === 17 && gameData.upgrades[12].bought > 3) {
            runAutomationRule(element, gameData.derivatives[6], gameData.resources.dust, false);
          } else if (element.item === 18 && gameData.upgrades[12].bought > 4) {
            runAutomationRule(element, gameData.derivatives[7], gameData.resources.dust, false);
          } else if (element.item === 19) {
            runAutomationRule(element, gameData.equipment[0], gameData.resources.metal, true);
          } else if (element.item === 20) {
            runAutomationRule(element, gameData.equipment[1], gameData.resources.metal, true);
          } else if (element.item === 21) {
            runAutomationRule(element, gameData.equipment[0], gameData.resources.dust, false);
          } else if (element.item === 22) {
            runAutomationRule(element, gameData.equipment[1], gameData.resources.dust, false);
          }
        }
      }
    });
  }
}

function runAutomationRule (rule: Automation, actioner: Purchasable, resource: Resource, notupgrade: boolean = true) {
  let cost = new JBDecimal(0);
  if (notupgrade) {
    cost = new JBDecimal(actioner.buyCost());
  } else {
    cost = new JBDecimal(actioner.buyUpgradeCost());
  }

  if (rule.value === 0) {
    cost = cost.multiply(1000);
  } else if (rule.value === 1) {
    cost = cost.multiply(100);
  } else if (rule.value === 2) {
    cost = cost.multiply(10);
  } else if (rule.value === 3) {
    cost = cost.multiply(4);
  } else if (rule.value === 4) {
    cost = cost.multiply(2);
  }

  if (resource.amount.greaterThanOrEqualTo(cost)) {
    if (notupgrade) {
      actioner.buy();
    } else {
      actioner.buyUpgrade();
    }
  }
}

function getParticleBonus () {
  let particlebonus = new JBDecimal(gameData.resources.particles.amount.exponent + (gameData.resources.particles.amount.mantissa / 10)).pow(2);
  if (particlebonus.lessThan(1)) {
    particlebonus = new JBDecimal(1);
  }
  return particlebonus;
}

function getTimeParticleBonus () {
  let particlebonus = new JBDecimal(gameData.resources.timeparticles.amount.exponent + (gameData.resources.timeparticles.amount.mantissa / 10)).pow(2);
  if (particlebonus.lessThan(1)) {
    particlebonus = new JBDecimal(1);
  }
  return particlebonus;
}

function updateGUI () {
  if (!gameData.storyElements[0].printed) {
    display.addToDisplay(gameData.storyElements[0].text, 'story');
    gameData.storyElements[0].printed = true;
  }

  if (!gameData.storyElements[1].printed) {
    if (gameData.derivatives[0].bought > 0) {
      display.addToDisplay(gameData.storyElements[1].text, 'story');
      gameData.storyElements[1].printed = true;
    }
  }

  if (!gameData.storyElements[2].printed) {
    if (gameData.derivatives[3].bought > 0) {
      display.addToDisplay(gameData.storyElements[2].text, 'story');
      gameData.storyElements[2].printed = true;
    }
  }

  if (!gameData.storyElements[3].printed) {
    if (gameData.resources.dust.amount.greaterThan(0)) {
      display.addToDisplay(gameData.storyElements[3].text, 'story');
      gameData.storyElements[3].printed = true;
    }
  }

  document.getElementById('dust').innerHTML = gameData.resources.dust.amount.ToString();
  document.getElementById('metal').innerHTML = gameData.resources.metal.amount.ToString();
  document.getElementById('pebbles').innerHTML = gameData.resources.pebbles.amount.ToString();
  document.getElementById('rocks').innerHTML = gameData.resources.rocks.amount.ToString();
  document.getElementById('boulders').innerHTML = gameData.resources.boulders.amount.ToString();
  document.getElementById('particlesamount').innerHTML = gameData.resources.particles.amount.ToString();
  document.getElementById('particlesb').innerHTML = getParticleBonus().ToString();
  document.getElementById('timeparticles').innerHTML = gameData.resources.timeparticles.amount.ToString();
  document.getElementById('timeparticlesbonus').innerHTML = getTimeParticleBonus().ToString();

  if (gameData.challenges[3].active || gameData.challenges[3].completed < 1) {
    document.getElementById('productionderivative').classList.add('hidden');
  } else {
    document.getElementById('productionderivative').classList.remove('hidden');
  }

  if (gameData.derivatives[0].owned.greaterThan(0)) {
    document.getElementById('supervisorderivative').classList.remove('hidden');
  } else {
    document.getElementById('supervisorderivative').classList.add('hidden');
  }

  if (gameData.derivatives[1].owned.greaterThan(0)) {
    document.getElementById('foremanderivative').classList.remove('hidden');
  } else {
    document.getElementById('foremanderivative').classList.add('hidden');
  }

  document.getElementById('managerderivative').classList.add('hidden');
  document.getElementById('btnBuyUpgrade7').classList.add('hidden');
  if (gameData.upgrades[12].owned.greaterThan(0)) {
    document.getElementById('btnBuyUpgrade7').classList.remove('hidden');
    if (gameData.derivatives[2].owned.greaterThan(0)) {
      document.getElementById('managerderivative').classList.remove('hidden');
    }
  }

  document.getElementById('middlemanagementderivative').classList.add('hidden');
  document.getElementById('btnBuyUpgrade8').classList.add('hidden');
  if (gameData.upgrades[12].owned.greaterThan(1)) {
    document.getElementById('btnBuyUpgrade8').classList.remove('hidden');
    if (gameData.derivatives[3].owned.greaterThan(0)) {
      document.getElementById('middlemanagementderivative').classList.remove('hidden');
    }
  }

  document.getElementById('uppermanagementderivative').classList.add('hidden');
  document.getElementById('btnBuyUpgrade9').classList.add('hidden');
  if (gameData.upgrades[12].owned.greaterThan(2)) {
    document.getElementById('btnBuyUpgrade9').classList.remove('hidden');
    if (gameData.derivatives[4].owned.greaterThan(0)) {
      document.getElementById('uppermanagementderivative').classList.remove('hidden');
    }
  }

  document.getElementById('vicepresidentderivative').classList.add('hidden');
  document.getElementById('btnBuyUpgrade10').classList.add('hidden');
  if (gameData.upgrades[12].owned.greaterThan(3)) {
    document.getElementById('btnBuyUpgrade10').classList.remove('hidden');
    if (gameData.derivatives[5].owned.greaterThan(0)) {
      document.getElementById('vicepresidentderivative').classList.remove('hidden');
    }
  }

  document.getElementById('presidentderivative').classList.add('hidden');
  document.getElementById('btnBuyUpgrade11').classList.add('hidden');
  if (gameData.upgrades[12].owned.greaterThan(4)) {
    document.getElementById('btnBuyUpgrade11').classList.remove('hidden');
    if (gameData.derivatives[6].owned.greaterThan(0)) {
      document.getElementById('presidentderivative').classList.remove('hidden');
    }
  }

  document.getElementById('particles').classList.add('hidden');
  document.getElementById('accelerationderivative').classList.add('hidden');
  document.getElementById('jerkderivative').classList.add('hidden');
  document.getElementById('snapderivative').classList.add('hidden');
  document.getElementById('cracklederivative').classList.add('hidden');
  document.getElementById('popderivative').classList.add('hidden');

  if (gameData.stats.prestige2 > 0) {
    document.getElementById('particles').classList.remove('hidden');
    if (gameData.speedDerivatives[0].owned.greaterThan(0)) {
      document.getElementById('accelerationderivative').classList.remove('hidden');
    }
    if (gameData.speedDerivatives[1].owned.greaterThan(0)) {
      document.getElementById('jerkderivative').classList.remove('hidden');
    }
    if (gameData.speedDerivatives[2].owned.greaterThan(0)) {
      document.getElementById('snapderivative').classList.remove('hidden');
    }
    if (gameData.speedDerivatives[3].owned.greaterThan(0)) {
      document.getElementById('cracklederivative').classList.remove('hidden');
    }
    if (gameData.speedDerivatives[4].owned.greaterThan(0)) {
      document.getElementById('popderivative').classList.remove('hidden');
    }
  }

  document.getElementById('time').classList.add('hidden');
  document.getElementById('time2derivative').classList.add('hidden');
  document.getElementById('time3derivative').classList.add('hidden');
  document.getElementById('time4derivative').classList.add('hidden');
  document.getElementById('time5derivative').classList.add('hidden');
  document.getElementById('time6derivative').classList.add('hidden');

  if (gameData.stats.prestige3 > 0) {
    document.getElementById('time').classList.remove('hidden');
    if (gameData.timeDerivatives[0].owned.greaterThan(0)) {
      document.getElementById('time2derivative').classList.remove('hidden');
    }
    if (gameData.timeDerivatives[1].owned.greaterThan(0)) {
      document.getElementById('time3derivative').classList.remove('hidden');
    }
    if (gameData.timeDerivatives[2].owned.greaterThan(0)) {
      document.getElementById('time4derivative').classList.remove('hidden');
    }
    if (gameData.timeDerivatives[3].owned.greaterThan(0)) {
      document.getElementById('time5derivative').classList.remove('hidden');
    }
    if (gameData.timeDerivatives[4].owned.greaterThan(0)) {
      document.getElementById('time6derivative').classList.remove('hidden');
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

  document.getElementById('totalachievementbonus').innerHTML = new JBDecimal(getAchievementBonus()).ToString();
  document.getElementById('achievementbonus').innerHTML = new JBDecimal(getAchievementsOnlyBonus()).ToString();
  document.getElementById('tier1bonus').innerHTML = new JBDecimal(getTier1FeatBonus()).ToString();
  document.getElementById('tier2bonus').innerHTML = new JBDecimal(getTier2FeatBonus()).ToString();

  document.getElementById('attackbought').innerHTML = gameData.equipment[0].bought.toString();
  document.getElementById('attackproducing').innerHTML = gameData.equipment[0].productionPerUnit().multiply(gameData.tower.baseAttack).ToString();
  document.getElementById('hullbought').innerHTML = gameData.equipment[1].bought.toString();
  document.getElementById('hullproducing').innerHTML = gameData.equipment[1].productionPerUnit().multiply(gameData.tower.baseMaxHitPoints).ToString();

  document.getElementById('textToDisplay').innerHTML = display.getDisplayText();

  gameData.derivatives.forEach((d) => { d.updateDisplay(); });

  gameData.speedDerivatives.forEach((d) => { d.updateDisplay(); });

  gameData.timeDerivatives.forEach((d) => { d.updateDisplay(); });

  gameData.producer.updateDisplay();

  gameData.equipment.forEach((e) => { e.updateDisplay(); });

  gameData.upgrades.forEach((u) => { u.updateDisplay(); });

  gameData.rockUpgrades.forEach((u) => { u.updateDisplay(); });

  gameData.boulderUpgrades.forEach((u) => { u.updateDisplay(); });

  let towerstats = '<b> Attack:' + gameData.tower.Attack().ToString() + '</b><br />';
  towerstats += 'Shoots: ' + new JBDecimal(gameData.tower.ShotsPerSecond()).ToString() + '/s<br />';
  towerstats += 'Range: ' + new JBDecimal(gameData.tower.Range()).ToString() + '<br />';
  if (gameData.challenges[6].completed > 0) {
    towerstats += 'Crit Chance: ' + new JBDecimal(gameData.tower.critChance(true)).ToString() + '<br />';
    towerstats += 'Crit Multiplier: ' + new JBDecimal(gameData.tower.critMultiplier(true)).ToString() + '<br />';
  }
  towerstats += '<br />';
  towerstats += '<b>Health: ' + gameData.tower.CurrentHitPoints().ToString() + '/' + gameData.tower.MaxHitPoints().ToString() + '</b><br />';
  if (gameData.challenges[2].completed > 0) {
    towerstats += 'Heal: ' + new JBDecimal(gameData.tower.Heal()).ToString() + '%<br />';
  }
  if (gameData.challenges[1].completed > 0) {
    towerstats += 'Shield: ' + new JBDecimal(gameData.tower.Defense()).ToString() + '%<br />';
  }
  if (gameData.challenges[7].completed > 0) {
    towerstats += 'Slow: ' + new JBDecimal(gameData.tower.Slow()).ToString() + '%<br />';
  }

  document.getElementById('towerStatsText').innerHTML = towerstats;

  document.getElementById('tierinfo').classList.add('hidden');
  const btndown = document.getElementById('btntierdown') as HTMLButtonElement;
  btndown.disabled = false;
  const btnup = document.getElementById('btntierup') as HTMLButtonElement;
  btnup.disabled = false;
  if (gameData.world.tierUnlocked > 1) {
    document.getElementById('currenttier').innerHTML = gameData.world.currentTier.toFixed(0);
    document.getElementById('tierinfo').classList.remove('hidden');
    if (gameData.world.currentTier === 1) {
      btndown.disabled = true;
    }
    if (gameData.world.currentTier === gameData.world.tierUnlocked) {
      btnup.disabled = true;
    }
  }

  document.getElementById('particles-tab').classList.add('hidden');
  document.getElementById('rockupgrades-tab').classList.add('hidden');
  if (gameData.stats.prestige2 > 0) {
    document.getElementById('particles-tab').classList.remove('hidden');
    document.getElementById('rockupgrades-tab').classList.remove('hidden');
  }

  document.getElementById('time-tab').classList.add('hidden');
  document.getElementById('boulderupgrades-tab').classList.add('hidden');
  if (gameData.stats.prestige3 > 0) {
    document.getElementById('time-tab').classList.remove('hidden');
    document.getElementById('boulderupgrades-tab').classList.remove('hidden');
  }

  if (pebblesFromPrestige().greaterThan(0)) {
    document.getElementById('btnPrestige1').classList.remove('hidden');
    document.getElementById('btnPrestige1').innerHTML = 'Prestige for ' + pebblesFromPrestige().ToString() + ' pebbles<br>Current: ' + getCurrentPebbleRate().ToString() + ' /hr<br>Best:' + gameData.stats.bestPrestige1Rate.ToString() + '/hr';
  } else {
    document.getElementById('btnPrestige1').classList.add('hidden');
  }

  if (rocksFromPrestige().greaterThan(0)) {
    document.getElementById('btnPrestige2').classList.remove('hidden');
    document.getElementById('btnPrestige2').innerHTML = 'Ascend for ' + rocksFromPrestige().ToString() + ' rocks<br>Current: ' + getCurrentRockRate().ToString() + ' /hr<br>Best:' + gameData.stats.bestPrestige2Rate.ToString() + '/hr';
  } else {
    document.getElementById('btnPrestige2').classList.add('hidden');
  }

  if (bouldersFromPrestige().greaterThan(0)) {
    document.getElementById('btnPrestige3').classList.remove('hidden');
    document.getElementById('btnPrestige3').innerHTML =
      'Transform for ' + bouldersFromPrestige().ToString() + ' boulders<br>Current: ' + getCurrentBoulderRate().ToString() + ' /hr<br>Best:' + gameData.stats.bestPrestige3Rate.ToString() + '/hr';
  } else {
    document.getElementById('btnPrestige3').classList.add('hidden');
  }

  gameData.Achievements.forEach((a, index) => {
    const elementName = 'btnAchievement' + (index + 1).toString();
    if (a.completed) {
      document.getElementById(elementName).classList.remove('btn-danger');
      document.getElementById(elementName).classList.add('btn-success');
    } else {
      document.getElementById(elementName).classList.add('btn-danger');
      document.getElementById(elementName).classList.remove('btn-success');
    }
  });

  gameData.tier1Feats.forEach((a, index) => {
    const elementName = 'btn1Tier' + (index + 1).toString();
    if (a.completed) {
      document.getElementById(elementName).classList.remove('btn-danger');
      document.getElementById(elementName).classList.add('btn-success');
    } else {
      document.getElementById(elementName).classList.add('btn-danger');
      document.getElementById(elementName).classList.remove('btn-success');
    }
  });

  gameData.tier2Feats.forEach((a, index) => {
    const elementName = 'btn2Tier' + (index + 1).toString();
    if (a.completed) {
      document.getElementById(elementName).classList.remove('btn-danger');
      document.getElementById(elementName).classList.add('btn-success');
    } else {
      document.getElementById(elementName).classList.add('btn-danger');
      document.getElementById(elementName).classList.remove('btn-success');
    }
  });

  if (gameData.stats.prestige2 < 1 && gameData.stats.prestige3 < 1) {
    document.getElementById('shieldchallenge').classList.add('hidden');
    document.getElementById('rangechallenge').classList.add('hidden');
  } else {
    document.getElementById('shieldchallenge').classList.remove('hidden');
    document.getElementById('rangechallenge').classList.remove('hidden');
  }

  if (gameData.stats.prestige3 < 1) {
    document.getElementById('critchallenge').classList.add('hidden');
    document.getElementById('slowchallenge').classList.add('hidden');
  } else {
    document.getElementById('critchallenge').classList.remove('hidden');
    document.getElementById('slowchallenge').classList.remove('hidden');
  }

  document.getElementById('tier1div').classList.add('hidden');
  if (gameData.world.tierUnlocked > 0) {
    document.getElementById('tier1div').classList.remove('hidden');
  }

  document.getElementById('tier2div').classList.add('hidden');
  if (gameData.world.tierUnlocked > 1) {
    document.getElementById('tier2div').classList.remove('hidden');
  }

  const canvas = display.canvas;
  const ctx = display.ctx;
  if (canvas.getContext) {
    const originalHeight = canvas.height;
    const originalWidth = canvas.width;

    const dimensions = getObjectFitSize(true, canvas.clientWidth, canvas.clientHeight, canvas.width, canvas.height);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;

    const ratio = Math.min(canvas.clientWidth / originalWidth, canvas.clientHeight / originalHeight);
    ctx.scale(ratio * dpr * canvas.height / canvas.scrollHeight, ratio * dpr * canvas.width / canvas.scrollWidth); // adjust this!

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.height, canvas.height);

    ctx.globalAlpha = gameData.tower.CurrentHitPoints().divide(gameData.tower.MaxHitPoints()).ToNumber();
    if (ctx.globalAlpha < 0.1) {
      ctx.globalAlpha = 0.1;
    }
    ctx.fillStyle = 'lime';
    // ctx.fillRect((10) * (canvas.scrollWidth / 20) - 10, (10) * (canvas.scrollWidth / 20) - 10, 20, 20);

    // const towerhitpoint = gameData.tower.CurrentHitPoints().divide(gameData.tower.MaxHitPoints()).multiply(5).multiply(display.drone.CurrentHitPoints());
    display.DrawTower();

    ctx.globalAlpha = 1.0;
    gameData.tower.bullets.forEach((b) => { b.update(); });

    gameData.enemies.forEach((e) => {
      e.update();
      e.bullets.forEach((b) => { b.update(); });
    });

    ctx.globalAlpha = 1;

    ctx.font = 'bold 15px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Drone Attack: ' + display.drone.Attack().ToString(), 10, 460);
    ctx.fillText('Drone Hp: ' + display.drone.MaxHitPoints().ToString(), 10, 480);

    ctx.font = '10px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(gameData.world.currentTickLength + 'ms', 10, 510);
    if (gameData.world.ticksLeftOver > 50) {
      ctx.fillText(display.getPrettyTimeFromMilliSeconds(gameData.world.ticksLeftOver) + ' banked', 10, 500);
    }
    ctx.font = '15px Arial';
    ctx.fillText('Wave: ' + gameData.world.currentWave, 230, 15);
    ctx.fillText('Unspawned: ' + gameData.world.enemiesToSpawn.toString() + '(' + getSpecialsCount().toString() + ')', 10, 15);

    if (gameData.world.ticksToNextSpawn > 1000) {
      ctx.fillStyle = 'red';
      ctx.fillText('Time to next enemy: ' + display.getPrettyTimeFromMilliSeconds(gameData.world.ticksToNextSpawn), 10, 30);
    }

    //   ctx.font = '12px Arial';

    //   DrawSolidSquare(ctx, drone, drone.CurrentHitPoints(), canvas.scrollWidth, new Vector(-9.4, -7.5), 'white');
    //   ctx.fillText('Drone', 32, 68);

    //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 5) {
    //     DrawSolidSquare(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 12, -9.4, -6.6, 'yellow');
    //     ctx.fillStyle = 'white';
    //     ctx.fillText('Fast', 32, 91);
    //   }

    //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 10) {
    //     DrawSolidSquare(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 20, -9.45, -5.7, 'white');
    //     ctx.fillStyle = 'white';
    //     ctx.fillText('Tough', 32, 115);
    //   }

  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 15) {
  //     DrawSolidDiamond(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 12, -9.4, -4.8, 'white');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Ranged', 32, 138);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 20) {
  //     DrawSolidSquare(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 12, -9.4, -3.9, 'blue');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Strong', 32, 161);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 25) {
  //     DrawSolidDiamond(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 12, -9.4, -3.0, 'yellow');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Fast/Ranged', 32, 184);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 30) {
  //     DrawSolidSquare(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 20, -9.45, -2.1, 'yellow');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Fast/Tough', 32, 208);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 35) {
  //     DrawSolidDiamond(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 20, -9.45, -1.2, 'white');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Ranged/Tough', 32, 231);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 40) {
  //     DrawSolidSquare(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 20, -9.45, -0.3, 'blue');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Strong/Tough', 32, 255);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 45) {
  //     DrawTwoColorSquare(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 12, -9.4, 0.6, 'yellow', 'blue');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Fast/Strong', 32, 278);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 50) {
  //     DrawSolidDiamond(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 12, -9.4, 1.5, 'blue');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Ranged/Strong', 32, 303);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 55) {
  //     DrawSolidDiamond(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 20, -9.45, 2.4, 'yellow');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Fast/Ranged/Tough', 32, 326);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 60) {
  //     DrawTwoColorSquare(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 20, -9.45, 3.3, 'yellow', 'blue');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Fast/Strong/Tough', 32, 350);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 65) {
  //     DrawSolidDiamond(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 20, -9.45, 4.2, 'blue');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Ranged/Strong/Tough', 32, 375);
  //   }
  //   if ((gameData.world.currentWave - gameData.world.currentTier + 1) >= 70) {
  //     DrawTwoColorDiamond(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 12, -9.40, 5.1, 'yellow', 'blue');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Fast/Strong/Ranged', 32, 399);
  //   }
  //   if (gameData.world.currentWave % 10 === 0) {
  //     DrawSolidSquare(ctx, e.CurrentHitPoints(), e.MaxHitPoints(), canvas.scrollWidth, 30, -9.5, 6.0, 'red');
  //     ctx.fillStyle = 'white';
  //     ctx.fillText('Boss', 32, 423);
  //   }
  }

  document.getElementById('auto1').classList.add('hidden');
  document.getElementById('auto2').classList.add('hidden');
  document.getElementById('auto3').classList.add('hidden');
  document.getElementById('auto4').classList.add('hidden');
  document.getElementById('auto5').classList.add('hidden');
  document.getElementById('auto6').classList.add('hidden');
  document.getElementById('auto7').classList.add('hidden');
  document.getElementById('auto8').classList.add('hidden');
  document.getElementById('auto9').classList.add('hidden');
  document.getElementById('auto10').classList.add('hidden');
  document.getElementById('auto11').classList.add('hidden');
  document.getElementById('auto12').classList.add('hidden');
  document.getElementById('auto13').classList.add('hidden');
  document.getElementById('auto14').classList.add('hidden');
  document.getElementById('auto15').classList.add('hidden');
  document.getElementById('auto16').classList.add('hidden');
  document.getElementById('auto17').classList.add('hidden');
  document.getElementById('auto18').classList.add('hidden');
  document.getElementById('auto19').classList.add('hidden');
  document.getElementById('auto20').classList.add('hidden');
  document.getElementById('auto21').classList.add('hidden');
  document.getElementById('auto22').classList.add('hidden');

  const highestwavemultiplier = 5 - gameData.rockUpgrades[2].bought - gameData.boulderUpgrades[2].bought;

  if (gameData.stats.highestEverWave >= 4 * highestwavemultiplier) {
    document.getElementById('auto1').classList.remove('hidden');
    document.getElementById('auto2').classList.remove('hidden');
    document.getElementById('auto3').classList.remove('hidden');
    document.getElementById('auto4').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 5 * highestwavemultiplier) {
    document.getElementById('auto5').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 6 * highestwavemultiplier) {
    document.getElementById('auto6').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 7 * highestwavemultiplier) {
    document.getElementById('auto7').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 8 * highestwavemultiplier) {
    document.getElementById('auto8').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 9 * highestwavemultiplier) {
    document.getElementById('auto9').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 10 * highestwavemultiplier) {
    document.getElementById('auto10').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 11 * highestwavemultiplier) {
    document.getElementById('auto11').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 12 * highestwavemultiplier) {
    document.getElementById('auto12').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 13 * highestwavemultiplier) {
    document.getElementById('auto13').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 14 * highestwavemultiplier) {
    document.getElementById('auto14').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 15 * highestwavemultiplier) {
    document.getElementById('auto15').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 16 * highestwavemultiplier) {
    document.getElementById('auto16').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 17 * highestwavemultiplier) {
    document.getElementById('auto17').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 18 * highestwavemultiplier) {
    document.getElementById('auto18').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 19 * highestwavemultiplier) {
    document.getElementById('auto19').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 20 * highestwavemultiplier) {
    document.getElementById('auto20').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 21 * highestwavemultiplier) {
    document.getElementById('auto21').classList.remove('hidden');
  }
  if (gameData.stats.highestEverWave >= 22 * highestwavemultiplier) {
    document.getElementById('auto22').classList.remove('hidden');
  }

  document.getElementById('btnChallengeQuit').classList.add('hidden');

  gameData.challenges.forEach((ch, index) => {
    if (ch.active) {
      document.getElementById('btnChallengeQuit').classList.remove('hidden');
    }
    let spanName = 'challenge' + index.toString() + 'Description';
    document.getElementById(spanName).innerHTML = ch.description;
    spanName = 'challenge' + index.toString() + 'Bonus';
    document.getElementById(spanName).innerHTML = ch.bonusDescription;
    spanName = 'challenge' + index.toString() + 'Completed';
    document.getElementById(spanName).innerHTML = ch.completed.toString();
    spanName = 'challenge' + index.toString() + 'DustNeeded';
    document.getElementById(spanName).innerHTML = ch.waveRequiredforCompletion().toString();
    const startName = 'btnChallenge' + index.toString() + 'Start';
    if (ch.active) {
      document.getElementById(startName).classList.add('hidden');
    } else {
      document.getElementById(startName).classList.remove('hidden');
    }
  });

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
    const newline =
      index.toString() +
      ' reached tier ' +
      tier.toString() +
      ' wave ' +
      waves.toString() +
      ' took ' +
      display.getPrettyTimeFromMilliSeconds(ticks) +
      ' and gave ' +
      amt.ToString() +
      ' for an average of: ' + rate;

    prestige1history += newline + '</br />';
  });
  document.getElementById('prestige1history').innerHTML = prestige1history;

  let prestige2history = '<br />';
  gameData.stats.last10Prestige2amounts.forEach((amt, index) => {
    const ticks = gameData.stats.last10Prestige2times[index];
    const rate = display.PrettyRatePerTime(amt, ticks);
    const newline = index.toString() + ' took ' + display.getPrettyTimeFromMilliSeconds(ticks) + ' and gave ' + amt.ToString() + ' for an average of ' + rate;
    prestige2history += newline + '</br />';
  });
  document.getElementById('prestige2history').innerHTML = prestige2history;

  let prestige3history = '<br />';
  gameData.stats.last10Prestige3amounts.forEach((amt, index) => {
    const ticks = gameData.stats.last10Prestige3times[index];
    const rate = display.PrettyRatePerTime(amt, ticks);
    const newline = index.toString() + ' took ' + display.getPrettyTimeFromMilliSeconds(ticks) + ' and gave ' + amt.ToString() + ' for an average of ' + rate;
    prestige3history += newline + '</br />';
  });
  document.getElementById('prestige3history').innerHTML = prestige3history;
}

function changeTier (value: string) {
  CheckAchievementCompletions();
  if (value === 'Down') {
    gameData.world.currentTier--;
    if (gameData.world.currentTier < 1) {
      gameData.world.currentTier = 1;
    }
  }
  if (value === 'Up') {
    gameData.world.currentTier++;
    if (gameData.world.currentTier > gameData.world.tierUnlocked) {
      gameData.world.tierUnlocked = gameData.world.currentTier;
    }
  }
  init(2);
}

// adapted from: https://www.npmjs.com/package/intrinsic-scale
function getObjectFitSize (contains: boolean /* true = contain, false = cover */, containerWidth: number, containerHeight: number, width: number, height: number) {
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
    y: (containerHeight - targetHeight) / 2
  };
}

function quitChallenges () {
  gameData.challenges.forEach((ch) => {
    if (ch.active) {
      ch.quit();
    }
  });
}

function pebblesFromPrestige () {
  return gameData.resources.dust.amount.divide(10 - gameData.rockUpgrades[1].bought).floor();
}

function rocksFromPrestige () {
  return gameData.resources.pebbles.amount.add(pebblesFromPrestige()).divide(1000 - (gameData.boulderUpgrades[1].bought * 10)).floor(); ;
}

function bouldersFromPrestige () {
  return gameData.resources.rocks.amount.add(rocksFromPrestige()).divide(1000 - (gameData.boulderUpgrades[1].bought * 10)).floor();
}

// eslint-disable-next-line no-unused-vars
function prestige1 () {
  quitChallenges();
  init(1);
}

// eslint-disable-next-line no-unused-vars
function prestige2 () {
  quitChallenges();
  init(2);
}

// eslint-disable-next-line no-unused-vars
function prestige3 () {
  quitChallenges();
  init(3);
}

// eslint-disable-next-line no-unused-vars
function resetGame () {
  localStorage.clear();
  location.reload();
}

function getSpecialsCount () {
  return (
    gameData.world.bossEnemiesToSpawn +
    gameData.world.cannonEnemiesToSpawn +
    gameData.world.fastEnemiesToSpawn +
    gameData.world.rangedEnemiesToSpawn +
    gameData.world.tankEnemiesToSpawn +
    gameData.world.bradleyEnemiesToSpawn +
    gameData.world.triremeEnemiesToSpawn +
    gameData.world.cavalierEnemiesToSpwan +
    gameData.world.scorpionEnemiesToSpawn +
    gameData.world.paladinEnemiesToSpawn +
    gameData.world.oliphantEnemiesToSpawn +
    gameData.world.falconEnemiesToSpawn +
    gameData.world.blitzEnemiesToSpawn +
    gameData.world.archerEnemiesToSpawn +
    gameData.world.titanEnemiesToSpawn
  );
}

function getSpecialsArray () {
  const choicesArr = [];
  for (let index = 0; index < gameData.world.fastEnemiesToSpawn; index++) {
    choicesArr.push('F');
  }
  for (let index = 0; index < gameData.world.tankEnemiesToSpawn; index++) {
    choicesArr.push('T');
  }
  for (let index = 0; index < gameData.world.rangedEnemiesToSpawn; index++) {
    choicesArr.push('R');
  }
  for (let index = 0; index < gameData.world.bossEnemiesToSpawn; index++) {
    choicesArr.push('B');
  }
  for (let index = 0; index < gameData.world.cannonEnemiesToSpawn; index++) {
    choicesArr.push('C');
  }
  for (let index = 0; index < gameData.world.bradleyEnemiesToSpawn; index++) {
    choicesArr.push('b');
  }
  for (let index = 0; index < gameData.world.triremeEnemiesToSpawn; index++) {
    choicesArr.push('t');
  }
  for (let index = 0; index < gameData.world.cavalierEnemiesToSpwan; index++) {
    choicesArr.push('c');
  }
  for (let index = 0; index < gameData.world.scorpionEnemiesToSpawn; index++) {
    choicesArr.push('S');
  }
  for (let index = 0; index < gameData.world.oliphantEnemiesToSpawn; index++) {
    choicesArr.push('O');
  }
  for (let index = 0; index < gameData.world.paladinEnemiesToSpawn; index++) {
    choicesArr.push('P');
  }
  for (let index = 0; index < gameData.world.blitzEnemiesToSpawn; index++) {
    choicesArr.push('z');
  }
  for (let index = 0; index < gameData.world.falconEnemiesToSpawn; index++) {
    choicesArr.push('f');
  }
  for (let index = 0; index < gameData.world.archerEnemiesToSpawn; index++) {
    choicesArr.push('a');
  }
  for (let index = 0; index < gameData.world.titanEnemiesToSpawn; index++) {
    choicesArr.push('ti');
  }
  return choicesArr;
}

function getNumberOfEnemies (wave: number) {
  let div = wave - (gameData.world.currentTier - 1);
  if (div < 1) {
    div = 1;
  }

  return Math.floor(gameData.world.currentWave / div);
}

function resetSpawns (killexistingenemies: boolean = true) {
  gameData.world.currentWave++;
  CheckAchievementCompletions(); // check before resetting to new tier

  if (gameData.world.currentWave > 100) {
    quitChallenges();
    if (gameData.world.currentTier === gameData.world.tierUnlocked) {
      changeTier('Up');
    } else {
      init(1);
    }
  }

  display.drone = new Enemy(gameData.world.currentWave, 0);

  gameData.world.enemiesToSpawn = 9 + gameData.world.currentWave - gameData.rockUpgrades[12].bought;

  gameData.world.fastEnemiesToSpawn = getNumberOfEnemies(5);
  gameData.world.tankEnemiesToSpawn = getNumberOfEnemies(10);
  gameData.world.rangedEnemiesToSpawn = getNumberOfEnemies(15);
  gameData.world.cannonEnemiesToSpawn = getNumberOfEnemies(20);
  gameData.world.archerEnemiesToSpawn = getNumberOfEnemies(25);
  gameData.world.bradleyEnemiesToSpawn = getNumberOfEnemies(30);
  gameData.world.triremeEnemiesToSpawn = getNumberOfEnemies(35);
  gameData.world.cavalierEnemiesToSpwan = getNumberOfEnemies(40);
  gameData.world.scorpionEnemiesToSpawn = getNumberOfEnemies(45);
  gameData.world.paladinEnemiesToSpawn = getNumberOfEnemies(50);
  gameData.world.oliphantEnemiesToSpawn = getNumberOfEnemies(55);
  gameData.world.blitzEnemiesToSpawn = getNumberOfEnemies(60);
  gameData.world.falconEnemiesToSpawn = getNumberOfEnemies(65);
  gameData.world.titanEnemiesToSpawn = getNumberOfEnemies(70);

  if (gameData.world.currentWave % 10 === 0) {
    gameData.world.bossEnemiesToSpawn = 1;
  } else {
    gameData.world.bossEnemiesToSpawn = 0;
  }
  if (killexistingenemies) {
    gameData.enemies = [];
    gameData.tower.damagetaken = new JBDecimal(0);
    gameData.tower.bullets = [];
    gameData.world.ticksToNextSpawn = 100000 * gameData.world.deathlevel;
  } else {
    display.addToDisplay('Wave ' + (gameData.world.currentWave - 1) + ' completed!', 'story');
    gameData.world.ticksToNextSpawn = 1000;
  }

  if (gameData.world.enemiesToSpawn < getSpecialsCount()) {
    gameData.world.enemiesToSpawn = getSpecialsCount();
  }
}

function init (prestigelevel: number = 0) {
  if (prestigelevel >= 1) {
    display.prestige1DisplayReset();
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
    resetSpawns(true);

    gameData.derivatives.forEach((d, index) => {
      d.bought = 0;
      if (gameData.rockUpgrades[11].bought) {
        if (index - 3 < gameData.upgrades[12].bought) {
          // which derivatives recieve intial inventory is controlled by which are unlocked
          d.owned = new JBDecimal(gameData.stats.prestige2);
        }
      } else {
        d.owned = new JBDecimal(0);
      }
      d.upgradeLevel = 0;
    });

    gameData.speedDerivatives.forEach((d) => { d.bought = 0; });

    gameData.producer.bought = 0;
    gameData.producer.owned = new JBDecimal(0);
    gameData.producer.upgradeLevel = 0;

    gameData.equipment.forEach((e) => {
      e.bought = 0;
      e.owned = new JBDecimal(0);
      e.upgradeLevel = 0;
    });
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

    gameData.challenges.forEach((c) => { c.completed = 0; });

    gameData.upgrades.forEach((u) => {
      u.bought = 0;
      u.owned = new JBDecimal(0);
    });

    gameData.derivatives.forEach((d, index) => {
      d.bought = 0;
      if (gameData.rockUpgrades[11].bought) {
        if (index - 3 < gameData.upgrades[12].bought) {
          // which derivatives recieve intial inventory is controlled by which are unlocked
          d.owned = new JBDecimal(gameData.stats.prestige2);
        }
      } else {
        d.owned = new JBDecimal(0);
      }
      d.upgradeLevel = 0;
    });
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
    gameData.world.currentTier = 1;
  }

  if (prestigelevel === 0) {
    gameData = new SaveGameData('new');
    let total = 0;
    for (let index = 1; index <= 10000; index++) {
      total += Math.ceil(Math.sqrt(index));
      internalInflationArray.push(total);
    }
    total = 0;
    for (let index = 0; index <= 100; index++) {
      total += index;
      achievementbonusarray.push(total);
    }

    const savegame = JSON.parse(localStorage.getItem('save'));
    if (savegame !== null) {
      gameData.name = savegame.name;

      if (typeof savegame.storyElements !== 'undefined') {
        for (let index = 0; index < savegame.storyElements.length; index++) {
          const element = savegame.storyElements[index];
          gameData.storyElements[index].printed = element.printed;
        }
      }

      if (typeof savegame.stats.prestige2 !== 'undefined') {
        gameData.stats.bestPrestige2Rate.mantissa = savegame.stats.bestPrestige2Rate.mantissa;
        gameData.stats.bestPrestige2Rate.exponent = savegame.stats.bestPrestige2Rate.exponent;
        for (let index = 0; index < savegame.stats.last10Prestige2amounts.length; index++) {
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
        for (let index = 0; index < savegame.stats.last10Prestige3amounts.length; index++) {
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
        for (let index = 0; index < savegame.stats.last10Prestige1amounts.length; index++) {
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
      gameData.world.rangedEnemiesToSpawn = savegame.world.rangedEnemiesToSpawn;
      gameData.world.tankEnemiesToSpawn = savegame.world.tankEnemiesToSpawn;
      gameData.world.bradleyEnemiesToSpawn = savegame.world.bradleyEnemiesToSpawn;
      gameData.world.cannonEnemiesToSpawn = savegame.world.cannonEnemiesToSpawn;
      gameData.world.cavalierEnemiesToSpwan = savegame.world.cavalierEnemiesToSpwan;
      gameData.world.scorpionEnemiesToSpawn = savegame.world.scorpionEnemiesToSpawn;
      gameData.world.tierUnlocked = savegame.world.tierUnlocked;
      gameData.world.currentTier = savegame.world.currentTier;
      gameData.world.paladinEnemiesToSpawn = savegame.world.paladinEnemiesToSpawn;
      gameData.world.oliphantEnemiesToSpawn = savegame.world.oliphantEnemiesToSpawn;
      gameData.world.blitzEnemiesToSpawn = savegame.world.blitzEnemiesToSpawn;
      gameData.world.falconEnemiesToSpawn = savegame.world.falconEnemiesToSpawn;
      if (typeof savegame.world.archerEnemiesToSpawn !== 'undefined') {
        gameData.world.archerEnemiesToSpawn = savegame.world.archerEnemiesToSpawn;
      }
      if (typeof savegame.world.titanEnemiesToSpawn !== 'undefined') {
        gameData.world.titanEnemiesToSpawn = savegame.world.titanEnemiesToSpawn;
      }
      gameData.world.triremeEnemiesToSpawn = savegame.world.triremeEnemiesToSpawn;
      gameData.world.timeElapsed = savegame.world.timeElapsed;
      gameData.world.ticksToNextSpawn = savegame.world.ticksToNextSpawn;

      for (let index = 0; index < savegame.enemies.length; index++) {
        const element = savegame.enemies[index];
        const newEnemy = new Enemy(element.wave, element.enemycount);
        newEnemy.pos.x = element.pos.x;
        newEnemy.pos.y = element.pos.y;
        newEnemy.baseAttack.mantissa = element.baseAttack.mantissa;
        newEnemy.baseAttack.exponent = element.baseAttack.exponent;
        newEnemy.baseDefense.mantissa = element.baseDefense.mantissa;
        newEnemy.baseDefense.exponent = element.baseDefense.exponent;
        newEnemy.baseHeal.mantissa = element.baseHeal.mantissa;
        newEnemy.baseHeal.exponent = element.baseHeal.exponent;
        newEnemy.baseMaxHitPoints.mantissa = element.baseMaxHitPoints.mantissa;
        newEnemy.baseMaxHitPoints.exponent = element.baseMaxHitPoints.exponent;
        newEnemy.baseRange = element.baseRange;
        newEnemy.baseShotsPerSec = element.baseShotsPerSec;
        newEnemy.damagetaken.mantissa = element.damagetaken.mantissa;
        newEnemy.damagetaken.exponent = element.damagetaken.exponent;
        newEnemy.movementPerSec = element.movementPerSec;
        newEnemy.player = false;
        newEnemy.target.x = 0;
        newEnemy.target.y = 0;
        newEnemy.ticksToNextBullet = element.ticksToNextBullet;
        newEnemy.type = element.type;

        element.bullets.forEach(b => newEnemy.bullets.push(new Bullet(b.pos.x, b.pos.y, 0, 0, b.damage, b.crit)));

        gameData.enemies.push(newEnemy);
      }

      gameData.tower.damagetaken.exponent = savegame.tower.damagetaken.exponent;
      gameData.tower.damagetaken.mantissa = savegame.tower.damagetaken.mantissa;
      gameData.tower.ticksToNextBullet = 0;

      gameData.resources.dust.amount.mantissa = savegame.resources.dust.amount.mantissa;
      gameData.resources.dust.amount.exponent = savegame.resources.dust.amount.exponent;
      gameData.resources.metal.amount.mantissa = savegame.resources.metal.amount.mantissa;
      gameData.resources.metal.amount.exponent = savegame.resources.metal.amount.exponent;
      gameData.resources.pebbles.amount.mantissa = savegame.resources.pebbles.amount.mantissa;
      gameData.resources.pebbles.amount.exponent = savegame.resources.pebbles.amount.exponent;
      gameData.resources.rocks.amount.mantissa = savegame.resources.rocks.amount.mantissa;
      gameData.resources.rocks.amount.exponent = savegame.resources.rocks.amount.exponent;
      if (typeof savegame.resources.boulders !== 'undefined') {
        gameData.resources.boulders.amount.mantissa = savegame.resources.boulders.amount.mantissa;
        gameData.resources.boulders.amount.exponent = savegame.resources.boulders.amount.exponent;
      }

      if (typeof savegame.resources.particles !== 'undefined') {
        gameData.resources.particles.amount.mantissa = savegame.resources.particles.amount.mantissa;
        gameData.resources.particles.amount.exponent = savegame.resources.particles.amount.exponent;
      }
      if (typeof savegame.resources.timeparticles !== 'undefined') {
        gameData.resources.timeparticles.amount.mantissa = savegame.resources.timeparticles.amount.mantissa;
        gameData.resources.timeparticles.amount.exponent = savegame.resources.timeparticles.amount.exponent;
      }

      for (let index = 0; index < savegame.upgrades.length; index++) {
        const element = savegame.upgrades[index];
        gameData.upgrades[index].bought = element.bought;
        gameData.upgrades[index].owned.exponent = element.owned.exponent;
        gameData.upgrades[index].owned.mantissa = element.owned.mantissa;
      }

      if (typeof savegame.rockUpgrades !== 'undefined') {
        for (let index = 0; index < savegame.rockUpgrades.length; index++) {
          const element = savegame.rockUpgrades[index];
          gameData.rockUpgrades[index].bought = element.bought;
          gameData.rockUpgrades[index].owned.exponent = element.owned.exponent;
          gameData.rockUpgrades[index].owned.mantissa = element.owned.mantissa;
        }
      }

      if (typeof savegame.boulderUpgrades !== 'undefined') {
        for (let index = 0; index < savegame.boulderUpgrades.length; index++) {
          const element = savegame.boulderUpgrades[index];
          gameData.boulderUpgrades[index].bought = element.bought;
          gameData.boulderUpgrades[index].owned.exponent = element.owned.exponent;
          gameData.boulderUpgrades[index].owned.mantissa = element.owned.mantissa;
        }
      }

      for (let index = 0; index < savegame.derivatives.length; index++) {
        const element = gameData.derivatives[index];
        element.bought = savegame.derivatives[index].bought;
        element.owned.mantissa = savegame.derivatives[index].owned.mantissa;
        element.owned.exponent = savegame.derivatives[index].owned.exponent;
        element.upgradeLevel = savegame.derivatives[index].upgradeLevel;
      }

      for (let index = 0; index < savegame.speedDerivatives.length; index++) {
        const element = gameData.speedDerivatives[index];
        element.bought = savegame.speedDerivatives[index].bought;
        element.owned.mantissa = savegame.speedDerivatives[index].owned.mantissa;
        element.owned.exponent = savegame.speedDerivatives[index].owned.exponent;
        element.upgradeLevel = savegame.speedDerivatives[index].upgradeLevel;
      }

      if (typeof savegame.timeDerivatives !== 'undefined') {
        for (let index = 0; index < savegame.timeDerivatives.length; index++) {
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

      for (let index = 0; index < gameData.equipment.length; index++) {
        const element = gameData.equipment[index];
        element.bought = savegame.equipment[index].bought;
        element.owned.mantissa = savegame.equipment[index].owned.mantissa;
        element.owned.exponent = savegame.equipment[index].owned.exponent;
        element.upgradeLevel = savegame.equipment[index].upgradeLevel;
      }
      for (let index = 0; index < savegame.challenges.length; index++) {
        const element = gameData.challenges[index];
        element.active = savegame.challenges[index].active;
        element.completed = savegame.challenges[index].completed;
      }
      for (let index = 0; index < savegame.Achievements.length; index++) {
        const element = savegame.Achievements[index];
        gameData.Achievements[index].completed = element.completed;
      }

      for (let index = 0; index < savegame.tier1Feats.length; index++) {
        const element = savegame.tier1Feats[index];
        gameData.tier1Feats[index].completed = element.completed;
      }

      if (typeof savegame.tier2Feats !== 'undefined') {
        for (let index = 0; index < savegame.tier2Feats.length; index++) {
          const element = savegame.tier2Feats[index];
          gameData.tier2Feats[index].completed = element.completed;
        }
      }

      if (typeof savegame.automation !== 'undefined') {
        for (let index = 0; index < savegame.automation.length; index++) {
          const element = savegame.automation[index];
          if (index === 0) {
            const autoprestige1 = <HTMLInputElement>document.getElementById('autoprestige1');
            if (element.item === 0) {
              autoprestige1.checked = false;
            } else {
              autoprestige1.checked = true;
            }
          } else {
            const itemName = 'automation' + (index).toString() + 'item';
            const valueName = 'automation' + (index).toString() + 'value';
            const autoitem = <HTMLSelectElement>document.getElementById(itemName);
            const autovalue = <HTMLSelectElement>document.getElementById(valueName);
            autoitem.selectedIndex = element.item;
            autovalue.selectedIndex = element.value;
          }
        }
      }
    }
  }
  display.drone = new Enemy(gameData.world.currentWave, 0);

  CheckAchievementCompletions();
  initted = true;
}

// eslint-disable-next-line no-unused-vars
function saveGameClick () {
  gameData.world.nextSaveGameTime = new Date();
}

// eslint-disable-next-line no-unused-vars
function resetStoryElements () {
  // eslint-disable-next-line no-return-assign
  gameData.storyElements.forEach((e) => e.printed = false);
}

// eslint-disable-next-line no-unused-vars
function cheat1 () {
  if (gameData.resources.dust.amount.greaterThan(100)) {
    gameData.resources.dust.amount = gameData.resources.dust.amount.multiply(2);
  } else {
    gameData.resources.dust.amount = new JBDecimal(100);
  }
}

// eslint-disable-next-line no-unused-vars
function cheat2 () {
  gameData.world.ticksLeftOver += 1000 * 60 * 60 * 24;
}

window.setInterval(function () {
  try {
    if (!initted) {
      if (document.readyState === 'complete') {
        init(); // this seeds the init function, which will overwrite default data with the save if there is one
      }
      return; // still waiting on pageload
    }
    if (gameData.world.paused) {
      return;
    }

    const currentTime = new Date();

    let ticksForCurrentTick = currentTime.getTime() - gameData.world.lastProcessTick.getTime() + gameData.world.ticksLeftOver;
    if (ticksForCurrentTick > 50) {
      gameData.world.ticksLeftOver = ticksForCurrentTick - 50;
      ticksForCurrentTick = 50;
    } else {
      gameData.world.ticksLeftOver = 0;
    }
    gameData.world.lastProcessTick = Object.assign(currentTime);

    if (currentTime > gameData.world.nextSaveGameTime) {
      saveGame(currentTime);
    }

    processStuff(ticksForCurrentTick);

    updateGUI();
  } catch (error) {
    display.logMyErrors(error);
  }
}, 0);
