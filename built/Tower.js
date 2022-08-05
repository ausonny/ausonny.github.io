/* eslint-disable max-classes-per-file */
function getSpecialsArray() {
    const choicesArr = [];
    for (let index = 0; index < gameData.world.fastEnemiesToSpawn; index++) {
        choicesArr.push('F');
    }
    for (let index = 0; index < gameData.world.tankEnemiesToSpawn; index++) {
        choicesArr.push('T');
    }
    for (let index = 0; index < gameData.world.medicEnemiesToSpawn; index++) {
        choicesArr.push('M');
    }
    for (let index = 0; index < gameData.world.bradleyEnemiesToSpawn; index++) {
        choicesArr.push('b');
    }
    for (let index = 0; index < gameData.world.paladinEnemiesToSpawn; index++) {
        choicesArr.push('P');
    }
    for (let index = 0; index < gameData.world.knightEnemiesToSpawn; index++) {
        choicesArr.push('K');
    }
    for (let index = 0; index < gameData.world.bossEnemiesToSpawn; index++) {
        choicesArr.push('B');
    }
    for (let index = 0; index < gameData.world.flyerEnemiesToSpawn; index++) {
        choicesArr.push('f');
    }
    for (let index = 0; index < gameData.world.dumboEnemiesToSpawn; index++) {
        choicesArr.push('D');
    }
    for (let index = 0; index < gameData.world.hummingbirdEnemiesToSpawn; index++) {
        choicesArr.push('H');
    }
    for (let index = 0; index < gameData.world.clericEnemiesToSpawn; index++) {
        choicesArr.push('C');
    }
    return choicesArr;
}
class Vector {
    constructor(currentx, currenty) {
        this.x = currentx;
        this.y = currenty;
    }
    getLengthFromAnotherVector(target) {
        const xdif = this.x - target.x;
        const ydif = this.y - target.y;
        return Math.sqrt(xdif * xdif + ydif * ydif); // calculating length of vector;
    }
    getNormalized(target) {
        const ret = new Vector(this.x, this.y);
        ret.x = this.x / this.getLengthFromAnotherVector(target);
        ret.y = this.y / this.getLengthFromAnotherVector(target);
        return ret;
    }
    subtract(value) {
        const ret = new Vector(this.x, this.y);
        ret.x -= value.x;
        ret.y -= value.y;
        return ret;
    }
    divide(value) {
        const ret = new Vector(this.x, this.y);
        ret.x /= value.x;
        ret.y /= value.y;
        return ret;
    }
}
class movingObject {
    constructor(pos, movementPerSec, isbullet, targetlist) {
        this.pos = Object.assign(pos);
        this.movementPerSec = movementPerSec;
        this.isBullet = isbullet;
        this.targetList = targetlist;
        this.targetListIndex = 0;
        this.slowed = 0;
    }
    timeToTarget() {
        return this.pos.getLengthFromAnotherVector(this.targetList[this.targetListIndex]) / this.movementPerSec;
    }
    move() {
        let tickmovement = (this.movementPerSec * gameData.world.currentTickLength) / 1000;
        if (this.slowed > 0) {
            tickmovement = new JBDecimal(tickmovement).divide(1 + this.slowed).ToNumber();
            this.slowed = 0;
        }
        while (tickmovement > 0) {
            if (this.targetListIndex > this.targetList.length) {
                this.targetListIndex = this.targetList.length;
            }
            const length = this.pos.getLengthFromAnotherVector(this.targetList[this.targetListIndex]);
            const dif = this.pos.subtract(this.targetList[this.targetListIndex]);
            if (tickmovement >= length) {
                this.pos = this.targetList[this.targetListIndex];
                tickmovement -= length;
                if (this.targetList.length > this.targetListIndex + 1) {
                    this.targetListIndex += 1;
                }
                else {
                    tickmovement = 0;
                }
            }
            else {
                const move = new Vector(0, 0);
                move.x = (dif.x / length) * tickmovement;
                move.y = (dif.y / length) * tickmovement;
                this.pos = this.pos.subtract(move);
                tickmovement = 0;
            }
        }
    }
}
class Bullet extends movingObject {
    constructor(pos, target, damage, defenseDamage, crit) {
        const tList = [];
        tList.push(target);
        super(pos, 100, true, tList);
        this.damage = new JBDecimal(0);
        this.damage.mantissa = damage.mantissa;
        this.damage.exponent = damage.exponent;
        this.defenseDamage = defenseDamage;
        this.crit = crit;
    }
    draw() {
        let color = 'white';
        if (this.crit) {
            color = 'red';
        }
        display.DrawEnemyCircle(display.drone.CurrentHitPoints().divide(10), this.pos, color);
    }
}
function skillDeterioration() {
    return Math.pow((0.999 - (gameData.world.currentTier - 1) / 1000), gameData.world.currentWave);
}
function critChance() {
    if (gameData.challenges[6].active || gameData.challenges[6].completed < 1) {
        return 0;
    }
    const bonusPerCompletion = 10 + gameData.boulderUpgrades[6].bought * 5;
    let ret = bonusPerCompletion * gameData.challenges[6].completed;
    if (gameData.equipment.length > 0) {
        gameData.equipment[0].abilities.forEach((a) => {
            if (a.name === 'Critical Chance') {
                ret += a.levels;
            }
        });
    }
    ret *= skillDeterioration();
    return ret;
}
function critMultiplier() {
    if (gameData.challenges[6].active || gameData.challenges[6].completed < 1) {
        return 1;
    }
    let ret = 5;
    ret += gameData.boulderUpgrades[7].bought;
    if (gameData.equipment.length > 0) {
        gameData.equipment[0].abilities.forEach((a) => {
            if (a.name === 'Crit Multiplier') {
                ret += a.levels / 10;
            }
        });
    }
    return ret;
}
function numberOfTowerType(type) {
    let ret = 0;
    gameData.towers.forEach((t) => {
        if (t.type === type) {
            ret += 1;
        }
    });
    return ret;
}
function maxTowersByType(type) {
    const ret = 1;
    switch (type) {
        case 'Gun':
        case 'Missile':
        case 'Cannon':
            return 1;
        case 'Slow':
            if (gameData.challenges[5].active || gameData.challenges[5].completed < 1) {
                return 0;
            }
            break;
        case 'Poison':
            if (gameData.challenges[4].active || gameData.challenges[4].completed < 1) {
                return 0;
            }
            break;
        default:
            break;
    }
    return ret;
}
function availableTowersByType(type) {
    return maxTowersByType(type) - numberOfTowerType(type);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function totalAvailableTowers() {
    const ret = availableTowersByType('Gun') + availableTowersByType('Missile') + availableTowersByType('Cannon') + availableTowersByType('Slow') + availableTowersByType('Poison');
    return ret;
}
class Tactic {
    constructor() {
        this.fastest = true;
        this.healer = false;
        this.highestHealth = false;
        this.lowestHealth = false;
    }
    ChangeTactic(index) {
        switch (index) {
            case 0: {
                this.fastest = true;
                this.healer = false;
                this.highestHealth = false;
                this.lowestHealth = false;
                break;
            }
            case 1: {
                this.fastest = false;
                this.healer = false;
                this.highestHealth = true;
                this.lowestHealth = false;
                break;
            }
            case 2: {
                this.fastest = false;
                this.healer = false;
                this.highestHealth = false;
                this.lowestHealth = true;
                break;
            }
            case 3:
            default: {
                this.fastest = false;
                this.healer = true;
                this.highestHealth = false;
                this.lowestHealth = false;
                break;
            }
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Tower {
    constructor(pos, index) {
        this.pos = pos;
        this.index = index;
        this.type = '';
        this.baseAttack = 1;
        this.ticksToNextBullet = 0;
        this.baseRange = 15;
        this.baseTicksPerShot = 1000;
        this.active = false;
        this.baseCost = 10;
        this.costMultiplier = 2;
        this.upgradeCost = 1;
        this.upgradeCostMultiplier = 2;
        this.levelsInflationFloor = 20;
        this.bought = 0;
        this.upgradeLevel = 0;
        this.autoOn = false;
        this.CreateDisplay();
        this.tactics = new Tactic();
    }
    autoBuy() {
        if (!this.autoOn) {
            return;
        }
        if (!this.active) {
            return;
        }
        if (this.type === '') {
            return;
        }
        const moneyavailable = 100;
        if (gameData.resources.metal.amount.lessThan(this.buyCost().multiply(moneyavailable))) {
            return;
        }
        this.buy();
    }
    Attack() {
        this.ticksToNextBullet -= gameData.world.currentTickLength;
        if (this.ticksToNextBullet <= 0) {
            const enemiesInRange = [];
            const attackValue = this.AttackValue();
            if (gameData.enemies.length > 0) {
                gameData.enemies.forEach((e) => {
                    const len = e.pos.getLengthFromAnotherVector(this.pos);
                    if (len <= this.Range() && e.expectedHitsRemaining(attackValue) > 0) {
                        enemiesInRange.push(e);
                    }
                });
            }
            if (enemiesInRange.length > 0) {
                if (this.tactics.fastest) {
                    enemiesInRange.sort((a, b) => (a.timeFromExit() > b.timeFromExit() ? 1 : -1));
                }
                else if (this.tactics.healer) {
                    enemiesInRange.sort((a, b) => (a.timeFromExit() > b.timeFromExit() ? 1 : -1));
                    let healersfound = 0;
                    enemiesInRange.forEach((e, index) => {
                        if (e.type === 'Cleric' || e.type === 'Medic') {
                            healersfound += 1;
                            enemiesInRange.unshift(enemiesInRange.splice(index, 1)[0]);
                        }
                    });
                    if (healersfound > 0) {
                        enemiesInRange.unshift(enemiesInRange.splice(healersfound - 1, 1)[0]);
                    }
                }
                else if (this.tactics.highestHealth) {
                    enemiesInRange.sort((a, b) => (a.expectedHitsRemaining(attackValue) < b.expectedHitsRemaining(attackValue) ? 1 : -1));
                }
                else if (this.tactics.lowestHealth) {
                    enemiesInRange.sort((a, b) => (a.expectedHitsRemaining(attackValue) > b.expectedHitsRemaining(attackValue) ? 1 : -1));
                }
                enemiesInRange[0].beTargetedByWeapon(attackValue, this.pos, 0);
                this.ticksToNextBullet += this.ticksPerShot();
            }
            else {
                this.ticksToNextBullet = 0;
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    act() {
        switch (this.type) {
            case 'Gun':
            case 'Missile':
            case 'Cannon':
                this.Attack();
                break;
            case 'Poison':
                // eslint-disable-next-line no-case-declarations
                const poisonDamage = this.PoisonAttack();
                gameData.enemies.forEach((e) => {
                    const len = e.pos.getLengthFromAnotherVector(this.pos);
                    if (len <= this.Range()) {
                        e.poisonPerSec = e.poisonPerSec.add(poisonDamage);
                    }
                });
                break;
            case 'Slow':
                if (gameData.enemies.length > 0) {
                    gameData.enemies.forEach((e) => {
                        const len = e.pos.getLengthFromAnotherVector(this.pos);
                        if (len <= this.Range()) {
                            if (e.slowed < this.SlowEffect())
                                e.slowed = this.SlowEffect();
                        }
                    });
                }
                break;
            default:
                break;
        }
    }
    updateTacticButtons() {
        this.button3Element.classList.remove('d-none', 'hiddenSpaceTaken', 'bg-danger', 'bg-success');
        this.button4Element.classList.remove('d-none', 'hiddenSpaceTaken', 'bg-danger', 'bg-success');
        this.button5Element.classList.remove('d-none', 'hiddenSpaceTaken', 'bg-danger', 'bg-success');
        this.button6Element.classList.remove('d-none', 'hiddenSpaceTaken', 'bg-danger', 'bg-success');
        this.button3Element.innerHTML = 'F';
        this.button4Element.innerHTML = 'M';
        this.button5Element.innerHTML = 'L';
        this.button6Element.innerHTML = 'H';
        this.button6Element.classList.add('hiddenSpaceTaken');
        if (gameData.rockUpgrades[11].bought > 0) {
            this.button6Element.classList.remove('hiddenSpaceTaken');
        }
        else if (this.tactics.healer) {
            this.tactics.healer = false;
            this.tactics.fastest = true;
        }
        if (this.tactics.fastest) {
            this.button3Element.classList.add('autobutton', 'bg-success');
            this.button4Element.classList.add('autobutton', 'bg-danger');
            this.button5Element.classList.add('autobutton', 'bg-danger');
            this.button6Element.classList.add('autobutton', 'bg-danger');
        }
        if (this.tactics.highestHealth) {
            this.button3Element.classList.add('autobutton', 'bg-danger');
            this.button4Element.classList.add('autobutton', 'bg-success');
            this.button5Element.classList.add('autobutton', 'bg-danger');
            this.button6Element.classList.add('autobutton', 'bg-danger');
        }
        if (this.tactics.lowestHealth) {
            this.button3Element.classList.add('autobutton', 'bg-danger');
            this.button4Element.classList.add('autobutton', 'bg-danger');
            this.button5Element.classList.add('autobutton', 'bg-success');
            this.button6Element.classList.add('autobutton', 'bg-danger');
        }
        if (this.tactics.healer) {
            this.button3Element.classList.add('autobutton', 'bg-danger');
            this.button4Element.classList.add('autobutton', 'bg-danger');
            this.button5Element.classList.add('autobutton', 'bg-danger');
            this.button6Element.classList.add('autobutton', 'bg-success');
        }
    }
    draw() {
        if (lastachievementcount > 25) {
            this.button1AutoElement.classList.remove('d-none');
        }
        else {
            this.button1AutoElement.classList.add('d-none');
        }
        this.deleteElement.classList.remove('d-none');
        document.getElementById(`Tower${this.index.toString()}Info`).innerHTML = `${this.type} ${this.index.toString()}`;
        switch (this.type) {
            case 'Gun':
            case 'Missile':
            case 'Cannon': {
                let color = 'red';
                if (this.type === 'Missile') {
                    color = 'orange';
                }
                else if (this.type === 'Cannon') {
                    color = 'yellow';
                }
                if (this.autoOn) {
                    this.button1AutoElement.classList.remove('bg-danger');
                    this.button1AutoElement.classList.add('bg-success');
                }
                else {
                    this.button1AutoElement.classList.add('bg-danger');
                    this.button1AutoElement.classList.remove('bg-success');
                }
                display.DrawSolidSquare(display.drone.CurrentHitPoints().multiply(10), this.pos, 'grey');
                display.DrawEnemyCircle(display.drone.CurrentHitPoints().multiply(5), this.pos, color);
                if (this.showRangeElement.checked) {
                    display.DrawCircle(this.pos, 0.02, this.Range(), color);
                }
                let towerstats = ` Shots: ${new JBDecimal(this.ShotsPerSecond()).ToString()} /s<br />`;
                towerstats += `Range: ${new JBDecimal(this.Range()).ToString()}<br />`;
                if (gameData.challenges[6].completed > 0 && !gameData.challenges[6].active) {
                    towerstats += `Crit Chance: ${new JBDecimal(critChance()).ToString()}%`;
                    towerstats += ` Crit Multiplier: ${new JBDecimal(critMultiplier()).ToString()}<br />`;
                }
                // if (gameData.challenges[7].completed > 0 && !gameData.challenges[7].active) {
                //   towerstats += `Shield Break: ${new JBDecimal(gameData.towers[0].DefenseDamage()).multiply(100).ToString()}%<br />`;
                // }
                // eslint-disable-next-line prefer-template, prettier/prettier
                document.getElementById('Tower' + this.index.toString() + 'Info').innerHTML = this.type + ' ' + this.index.toString() + ' Attack: ' + this.AttackValue().toString() + towerstats;
                this.towerRow.classList.add(color);
                if (color === 'yellow') {
                    this.towerRow.classList.remove('text-light');
                    this.towerRow.classList.add('text-dark');
                }
                if (this.affordBuy()) {
                    this.button1Element.classList.add('btn-success');
                    this.button1Element.classList.remove('btn-danger');
                }
                else {
                    this.button1Element.classList.remove('btn-success');
                    this.button1Element.classList.add('btn-danger');
                }
                this.button1Element.innerHTML = `Metal: ${this.buyCost().ToString()}`;
                this.button2Element.classList.remove('d-none');
                if (this.affordUpgrade()) {
                    this.button2Element.classList.add('btn-success');
                    this.button2Element.classList.remove('btn-danger');
                }
                else {
                    this.button2Element.classList.remove('btn-success');
                    this.button2Element.classList.add('btn-danger');
                }
                this.button2Element.innerHTML = `Dust: ${this.buyUpgradeCost().ToString()}`;
                this.updateTacticButtons();
                break;
            }
            case 'Slow': {
                if (this.autoOn) {
                    this.button1AutoElement.classList.remove('bg-danger');
                    this.button1AutoElement.classList.add('bg-success');
                }
                else {
                    this.button1AutoElement.classList.add('bg-danger');
                    this.button1AutoElement.classList.remove('bg-success');
                }
                display.DrawSolidSquare(display.drone.CurrentHitPoints().multiply(10), this.pos, 'grey');
                display.DrawSolidSquare(display.drone.CurrentHitPoints().multiply(6.9), this.pos, 'blue');
                display.DrawSolidDiamond(display.drone.CurrentHitPoints().multiply(6.9), this.pos, 'blue');
                if (this.showRangeElement.checked) {
                    display.DrawCircle(this.pos, 0.02, this.Range(), 'blue');
                }
                document.getElementById(`Tower${this.index.toString()}Info`).innerHTML += `<br />Slow: ${(1 / (1 + this.SlowEffect())).toFixed(3)}`;
                this.towerRow.classList.add('bg-primary');
                if (gameData.challenges[5].active || gameData.challenges[5].completed < 1) {
                    this.button1Element.classList.add('d-none');
                    this.button1AutoElement.classList.add('d-none');
                    this.button2Element.classList.add('d-none');
                }
                else {
                    this.button1Element.classList.remove('d-none');
                    this.button1AutoElement.classList.remove('d-none');
                    this.button2Element.classList.remove('d-none');
                }
                if (this.affordBuy()) {
                    this.button1Element.classList.add('btn-success');
                    this.button1Element.classList.remove('btn-danger');
                }
                else {
                    this.button1Element.classList.remove('btn-success');
                    this.button1Element.classList.add('btn-danger');
                }
                this.button1Element.innerHTML = `Metal: ${this.buyCost().ToString()}`;
                if (this.affordUpgrade()) {
                    this.button2Element.classList.add('btn-success');
                    this.button2Element.classList.remove('btn-danger');
                }
                else {
                    this.button2Element.classList.remove('btn-success');
                    this.button2Element.classList.add('btn-danger');
                }
                this.button2Element.innerHTML = `Dust: ${this.buyUpgradeCost().ToString()}`;
                this.button3Element.classList.add('hiddenSpaceTaken', 'autobutton');
                this.button4Element.classList.add('hiddenSpaceTaken', 'autobutton');
                this.button5Element.classList.add('hiddenSpaceTaken', 'autobutton');
                this.button6Element.classList.add('hiddenSpaceTaken', 'autobutton');
                break;
            }
            case 'Poison': {
                if (this.autoOn) {
                    this.button1AutoElement.classList.remove('bg-danger');
                    this.button1AutoElement.classList.add('bg-success');
                }
                else {
                    this.button1AutoElement.classList.add('bg-danger');
                    this.button1AutoElement.classList.remove('bg-success');
                }
                display.DrawSolidSquare(display.drone.CurrentHitPoints().multiply(10), this.pos, 'grey');
                display.DrawSolidDiamond(display.drone.CurrentHitPoints().multiply(6.9), this.pos, 'green');
                if (this.showRangeElement.checked) {
                    display.DrawCircle(this.pos, 0.02, this.Range(), 'green');
                }
                document.getElementById(`Tower${this.index.toString()}Info`).innerHTML += `<br />Poison: ${this.PoisonAttack().ToString()}`;
                this.towerRow.classList.add('bg-success');
                if (gameData.challenges[4].active || gameData.challenges[4].completed < 1) {
                    this.button1Element.classList.add('d-none');
                    this.button1AutoElement.classList.add('d-none');
                    this.button2Element.classList.add('d-none');
                }
                else {
                    this.button1Element.classList.remove('d-none');
                    this.button1AutoElement.classList.remove('d-none');
                    this.button2Element.classList.remove('d-none');
                }
                if (this.affordBuy()) {
                    this.button1Element.classList.add('btn-success');
                    this.button1Element.classList.remove('btn-danger');
                }
                else {
                    this.button1Element.classList.remove('btn-success');
                    this.button1Element.classList.add('btn-danger');
                }
                this.button1Element.innerHTML = `Metal: ${this.buyCost().ToString()}`;
                if (this.affordUpgrade()) {
                    this.button2Element.classList.add('btn-success');
                    this.button2Element.classList.remove('btn-danger');
                }
                else {
                    this.button2Element.classList.remove('btn-success');
                    this.button2Element.classList.add('btn-danger');
                }
                this.button2Element.innerHTML = `Dust: ${this.buyUpgradeCost().ToString()}`;
                this.button3Element.classList.add('hiddenSpaceTaken', 'autobutton');
                this.button4Element.classList.add('hiddenSpaceTaken', 'autobutton');
                this.button5Element.classList.add('hiddenSpaceTaken', 'autobutton');
                this.button6Element.classList.add('hiddenSpaceTaken', 'autobutton');
                break;
            }
            case '':
            default: {
                this.button1AutoElement.classList.add('d-none');
                display.DrawSolidSquare(display.drone.CurrentHitPoints().multiply(10), this.pos, 'grey');
                if (availableTowersByType('Gun') > 0) {
                    this.button1Element.classList.remove('d-none', 'hiddenSpaceTaken');
                    this.baseCost = 10;
                    if (this.affordBuy()) {
                        this.button1Element.classList.add('btn-success');
                        this.button1Element.classList.remove('btn-danger');
                    }
                    else {
                        this.button1Element.classList.remove('btn-success');
                        this.button1Element.classList.add('btn-danger');
                    }
                    this.button1Element.innerHTML = `Buy Gun (Metal: ${this.baseCost.toString()})`;
                }
                else {
                    this.button1Element.classList.add('hiddenSpaceTaken');
                }
                if (availableTowersByType('Missile') > 0) {
                    this.button2Element.classList.remove('d-none', 'hiddenSpaceTaken');
                    this.baseCost = 10;
                    if (this.affordBuy()) {
                        this.button2Element.classList.add('btn-success');
                        this.button2Element.classList.remove('btn-danger');
                    }
                    else {
                        this.button2Element.classList.remove('btn-success');
                        this.button2Element.classList.add('btn-danger');
                    }
                    this.button2Element.innerHTML = `Buy Missile (Metal: ${this.baseCost.toString()})`;
                }
                else {
                    this.button2Element.classList.add('hiddenSpaceTaken');
                }
                if (availableTowersByType('Cannon') > 0) {
                    this.button3Element.classList.remove('d-none', 'hiddenSpaceTaken');
                    this.baseCost = 10;
                    if (this.affordBuy()) {
                        this.button3Element.classList.add('btn-success');
                        this.button3Element.classList.remove('btn-danger');
                    }
                    else {
                        this.button3Element.classList.remove('btn-success');
                        this.button3Element.classList.add('btn-danger');
                    }
                    this.button3Element.innerHTML = `Buy Cannon (Metal: ${this.baseCost.toString()})`;
                }
                else {
                    this.button3Element.classList.add('hiddenSpaceTaken');
                }
                if (availableTowersByType('Slow') < 1 || gameData.challenges[5].active || gameData.challenges[5].completed < 1) {
                    this.button5Element.classList.add('hiddenSpaceTaken');
                }
                else {
                    this.button5Element.classList.remove('d-none', 'hiddenSpaceTaken');
                    this.baseCost = 1000000;
                    if (this.affordBuy()) {
                        this.button5Element.classList.add('btn-success');
                        this.button5Element.classList.remove('btn-danger');
                    }
                    else {
                        this.button5Element.classList.remove('btn-success');
                        this.button5Element.classList.add('btn-danger');
                    }
                    this.button5Element.innerHTML = `Buy Slow (Metal: ${new JBDecimal(this.baseCost).toString()})`;
                }
                if (availableTowersByType('Poison') < 1 || gameData.challenges[4].active || gameData.challenges[4].completed < 1) {
                    this.button4Element.classList.add('hiddenSpaceTaken');
                }
                else {
                    this.button4Element.classList.remove('d-none', 'hiddenSpaceTaken');
                    this.baseCost = 100;
                    if (this.affordBuy()) {
                        this.button4Element.classList.add('btn-success');
                        this.button4Element.classList.remove('btn-danger');
                    }
                    else {
                        this.button4Element.classList.remove('btn-success');
                        this.button4Element.classList.add('btn-danger');
                    }
                    this.button4Element.innerHTML = `Buy Poison (Metal: ${this.baseCost.toString()})`;
                }
                this.deleteElement.classList.add('d-none');
                this.button6Element.classList.add('d-none');
                break;
            }
        }
        if (this.type === 'Cannon' || this.type === 'Missile') {
            display.drawText(this.index.toString(), this.pos, 'black', '12px Arial', 'center', 'middle');
        }
        else {
            display.drawText(this.index.toString(), this.pos, 'white', '12px Arial', 'center', 'middle');
        }
    }
    button1() {
        dirtyTowers = true;
        if (this.type === '') {
            this.baseCost = 10;
            if (this.affordBuy() && availableTowersByType('Gun') > 0) {
                this.type = 'Gun';
                this.setInfoByType();
                this.buy();
            }
            return;
        }
        this.buy();
    }
    button2() {
        dirtyTowers = true;
        if (this.type === '') {
            this.baseCost = 10;
            if (this.affordBuy() && availableTowersByType('Missile') > 0) {
                this.type = 'Missile';
                this.setInfoByType();
                this.buy();
            }
            return;
        }
        this.buyUpgrade();
    }
    button3() {
        dirtyTowers = true;
        if (this.type === '') {
            this.baseCost = 10;
            if (this.affordBuy() && availableTowersByType('Cannon') > 0) {
                this.type = 'Cannon';
                this.setInfoByType();
                this.buy();
            }
        }
        else {
            this.tactics.ChangeTactic(0);
        }
    }
    button4() {
        dirtyTowers = true;
        if (this.type === '') {
            this.baseCost = 100;
            if (this.affordBuy() && availableTowersByType('Poison') > 0) {
                this.type = 'Poison';
                this.setInfoByType();
                this.buy();
            }
        }
        else {
            this.tactics.ChangeTactic(1);
        }
    }
    button5() {
        dirtyTowers = true;
        if (this.type === '') {
            this.baseCost = 1000000;
            if (this.affordBuy() && availableTowersByType('Slow') > 0) {
                this.type = 'Slow';
                this.setInfoByType();
                this.buy();
            }
        }
        else {
            this.tactics.ChangeTactic(2);
        }
    }
    button6() {
        dirtyTowers = true;
        this.tactics.ChangeTactic(3);
    }
    setInfoByType() {
        switch (this.type) {
            case 'Gun':
                this.baseAttack = 1;
                this.baseRange = 15;
                this.baseTicksPerShot = 1000;
                // eslint-disable-next-line prefer-destructuring
                this.bonusPerLevelBoughtUpgrade = gameData.upgrades[6];
                // eslint-disable-next-line prefer-destructuring
                this.boulderDamageUpgrade = gameData.boulderUpgrades[4];
                this.costMultiplier = 1.5;
                this.equipmentPhrase = 'Gun Attack';
                // eslint-disable-next-line prefer-destructuring
                this.pebbleDamageUpgrade = gameData.upgrades[0];
                // eslint-disable-next-line prefer-destructuring
                this.rockDamageUpgrade = gameData.rockUpgrades[1];
                this.ticksToNextBullet = 1000;
                this.upgradeCost = 1;
                this.upgradeCostMultiplier = 2;
                break;
            case 'Missile':
                this.baseAttack = 1;
                this.baseRange = 30;
                this.baseTicksPerShot = 2000;
                // eslint-disable-next-line prefer-destructuring
                this.bonusPerLevelBoughtUpgrade = gameData.upgrades[18];
                // eslint-disable-next-line prefer-destructuring
                this.boulderDamageUpgrade = gameData.boulderUpgrades[10];
                this.costMultiplier = 1.5;
                this.equipmentPhrase = 'Missile Attack';
                // eslint-disable-next-line prefer-destructuring
                this.pebbleDamageUpgrade = gameData.upgrades[20];
                // eslint-disable-next-line prefer-destructuring
                this.rockDamageUpgrade = gameData.rockUpgrades[15];
                this.ticksToNextBullet = 2000;
                this.upgradeCost = 1;
                this.upgradeCostMultiplier = 2;
                break;
            case 'Cannon':
                this.baseAttack = 2;
                this.baseRange = 15;
                this.baseTicksPerShot = 2000;
                // eslint-disable-next-line prefer-destructuring
                this.bonusPerLevelBoughtUpgrade = gameData.upgrades[19];
                // eslint-disable-next-line prefer-destructuring
                this.boulderDamageUpgrade = gameData.boulderUpgrades[11];
                this.costMultiplier = 1.5;
                this.equipmentPhrase = 'Cannon Attack';
                // eslint-disable-next-line prefer-destructuring
                this.pebbleDamageUpgrade = gameData.upgrades[21];
                // eslint-disable-next-line prefer-destructuring
                this.rockDamageUpgrade = gameData.rockUpgrades[16];
                this.ticksToNextBullet = 2000;
                this.upgradeCost = 1;
                this.upgradeCostMultiplier = 2;
                break;
            case 'Slow':
                this.baseAttack = 0;
                this.baseRange = 15;
                this.baseTicksPerShot = 0;
                // eslint-disable-next-line prefer-destructuring
                this.bonusPerLevelBoughtUpgrade = gameData.dummyUpgrade;
                // eslint-disable-next-line prefer-destructuring
                this.boulderDamageUpgrade = gameData.dummyUpgrade;
                this.costMultiplier = 1.5;
                this.equipmentPhrase = '';
                // eslint-disable-next-line prefer-destructuring
                this.pebbleDamageUpgrade = gameData.dummyUpgrade;
                // eslint-disable-next-line prefer-destructuring
                this.rockDamageUpgrade = gameData.dummyUpgrade;
                this.ticksToNextBullet = 0;
                this.upgradeCost = 1;
                this.upgradeCostMultiplier = 10;
                break;
            case 'Poison':
                this.baseAttack = 0;
                this.baseRange = 15;
                this.baseTicksPerShot = 0;
                // eslint-disable-next-line prefer-destructuring
                this.bonusPerLevelBoughtUpgrade = gameData.dummyUpgrade;
                // eslint-disable-next-line prefer-destructuring
                this.boulderDamageUpgrade = gameData.dummyUpgrade;
                this.costMultiplier = 1.5;
                this.equipmentPhrase = 'Poison Effect';
                // eslint-disable-next-line prefer-destructuring
                this.pebbleDamageUpgrade = gameData.dummyUpgrade;
                // eslint-disable-next-line prefer-destructuring
                this.rockDamageUpgrade = gameData.dummyUpgrade;
                this.ticksToNextBullet = 0;
                this.upgradeCost = 1;
                this.upgradeCostMultiplier = 2;
                break;
            default:
                break;
        }
    }
    delete() {
        this.bought = 0;
        this.upgradeLevel = 0;
        this.type = '';
        this.towerRow.classList.remove('bg-primary');
        this.towerRow.classList.remove('bg-danger');
        this.towerRow.classList.remove('bg-success');
        dirtyTowers = true;
    }
    AttackValue() {
        let AttackPerLevel = this.baseAttack * Math.pow(1.1, (this.upgradeLevel + this.pebbleDamageUpgrade.bought));
        AttackPerLevel *= Math.pow(2, (this.rockDamageUpgrade.bought + this.boulderDamageUpgrade.bought));
        if (this.bonusPerLevelBoughtUpgrade.bought > 0) {
            const bonusPer = 1 + this.bonusPerLevelBoughtUpgrade.bought / 100;
            AttackPerLevel *= Math.pow(bonusPer, this.bought);
        }
        if (gameData.equipment.length > 0) {
            gameData.equipment[0].abilities.forEach((a) => {
                if (a.name === this.equipmentPhrase) {
                    AttackPerLevel *= a.levels / 10;
                }
            });
        }
        AttackPerLevel *= getAchievementBonus();
        return new JBDecimal(this.bought).multiply(AttackPerLevel);
    }
    PoisonAttack() {
        if (gameData.challenges[4].active || gameData.challenges[4].completed < 1) {
            return new JBDecimal(0);
        }
        let AttackPerLevel = gameData.challenges[4].completed * 0.05;
        AttackPerLevel *= Math.pow(1.1, this.upgradeLevel);
        AttackPerLevel *= Math.pow(2, (gameData.rockUpgrades[13].bought + gameData.boulderUpgrades[9].bought));
        if (gameData.rockUpgrades[14].bought > 0) {
            const bonusPer = 1 + gameData.rockUpgrades[14].bought / 100;
            AttackPerLevel *= Math.pow(bonusPer, this.bought);
        }
        if (gameData.equipment.length > 0) {
            gameData.equipment[0].abilities.forEach((a) => {
                if (a.name === 'Poison Effect') {
                    AttackPerLevel *= 1 + a.levels / 10;
                }
            });
        }
        let ret = new JBDecimal(this.bought).multiply(AttackPerLevel).add(1);
        ret = ret.multiply(getAchievementBonus());
        return ret;
    }
    SlowEffect() {
        if (gameData.challenges[5].active || gameData.challenges[5].completed < 1) {
            return 0;
        }
        let ret = 100 * gameData.challenges[5].completed;
        ret += this.bought * (1 + this.upgradeLevel);
        ret *= skillDeterioration();
        return ret / 1000;
    }
    // eslint-disable-next-line class-methods-use-this
    DefenseDamage() {
        if (gameData.challenges[7].active || gameData.challenges[7].completed < 1) {
            return 0;
        }
        const bonusper = 1 + gameData.rockUpgrades[12].bought / 10 + gameData.boulderUpgrades[8].bought / 10;
        let ret = bonusper * gameData.challenges[7].completed;
        if (gameData.equipment.length > 0) {
            gameData.equipment[0].abilities.forEach((a) => {
                if (a.name === 'Shield Break') {
                    ret *= 1 + a.levels / 10;
                }
            });
        }
        ret *= skillDeterioration();
        return ret / 100;
    }
    Range() {
        if (gameData.challenges[3].active || gameData.challenges[3].completed < 1) {
            return this.baseRange;
        }
        let ret = this.baseRange;
        ret += (this.baseRange * gameData.challenges[3].completed) / 5;
        ret *= skillDeterioration();
        if (ret < this.baseRange) {
            ret = this.baseRange;
        }
        else if (ret > 100) {
            ret = 100;
        }
        return ret;
    }
    ShotsPerSecond() {
        if (gameData.challenges[2].active || gameData.challenges[2].completed < 1) {
            return 1000 / this.baseTicksPerShot;
        }
        let bonusperupgrade = 1;
        if (gameData.rockUpgrades[10].bought > 0) {
            bonusperupgrade += gameData.rockUpgrades[10].bought / 10;
        }
        let ret = 1 + gameData.challenges[2].completed * bonusperupgrade;
        ret *= skillDeterioration();
        if (ret > 10) {
            ret = 10;
        }
        return ret * (1000 / this.baseTicksPerShot);
    }
    ticksPerShot() {
        return 1000 / this.ShotsPerSecond();
    }
    buy() {
        if (!this.affordBuy()) {
            return;
        }
        gameData.resources.metal.subtract(this.buyCost());
        this.bought += 1;
        CheckAchievementCompletions();
    }
    buyUpgrade() {
        if (this.type === '') {
            return;
        }
        if (!this.affordUpgrade()) {
            return;
        }
        gameData.resources.dust.subtract(this.buyUpgradeCost());
        this.upgradeLevel += 1;
    }
    currentInflationFloor() {
        if (gameData.challenges[0].active) {
            return 1;
        }
        let ret = this.levelsInflationFloor;
        if (gameData.challenges[0].completed > 0) {
            const bonus = 1.05 + gameData.rockUpgrades[3].bought * 0.01;
            ret *= Math.pow(bonus, gameData.challenges[0].completed);
        }
        return ret;
    }
    buyUpgradeCost() {
        let ret = new JBDecimal(this.upgradeCostMultiplier);
        ret = ret.pow(this.upgradeLevel);
        ret = ret.multiply(this.upgradeCost);
        return ret;
    }
    buyCost() {
        let itemQty = this.bought;
        if (itemQty >= this.currentInflationFloor()) {
            const increase = Math.ceil(itemQty - this.currentInflationFloor());
            itemQty += internalInflationCost(increase);
        }
        const ret = new JBDecimal(this.costMultiplier).pow(itemQty).multiply(this.baseCost);
        return ret;
    }
    affordBuy() {
        if (this.buyCost().greaterThan(gameData.resources.metal.amount)) {
            return false;
        }
        return true;
    }
    affordUpgrade() {
        if (this.buyUpgradeCost().greaterThan(gameData.resources.dust.amount)) {
            return false;
        }
        return true;
    }
    autoSwitch() {
        this.autoOn = !this.autoOn;
    }
    CreateDisplay() {
        const newTowerRow = document.createElement('div');
        newTowerRow.classList.add('row', 'p-0', 'm-0', 'text-light', 'bg-opacity-25', 'text-xsmall');
        newTowerRow.id = `Tower${this.index.toString()}`;
        const NameCol = document.createElement('div');
        NameCol.classList.add('col-md-2', 'p-0', 'm-0', 'text-center');
        const TowerInfoSpan = document.createElement('span');
        TowerInfoSpan.id = `Tower${this.index.toString()}Info`;
        NameCol.appendChild(TowerInfoSpan);
        newTowerRow.appendChild(NameCol);
        this.towerRow = newTowerRow;
        const buttonCol = document.createElement('div');
        buttonCol.classList.add('col-md-10', 'p-0', 'm-0');
        const button1 = document.createElement('button');
        button1.id = `btnTower${this.index.toString()}Slot1`;
        button1.innerHTML = 'Button 1';
        button1.classList.add('button', 'text-center', 'align-middle');
        const i = this.index;
        // eslint-disable-next-line func-names
        button1.addEventListener('click', function () {
            gameData.towers[i].button1();
        });
        buttonCol.appendChild(button1);
        const button1auto = document.createElement('button');
        button1auto.id = `btnTower${this.index.toString()}Slot1A`;
        button1auto.innerHTML = 'A';
        button1auto.classList.add('button', 'text-center', 'autobutton', 'align-middle');
        // eslint-disable-next-line func-names
        button1auto.addEventListener('click', function () {
            gameData.towers[i].autoSwitch();
        });
        buttonCol.appendChild(button1auto);
        this.button1Element = button1;
        this.button1AutoElement = button1auto;
        newTowerRow.appendChild(buttonCol);
        const button2 = document.createElement('button');
        button2.id = `btnTower${this.index.toString()}Slot2`;
        button2.innerHTML = 'Button 2';
        button2.classList.add('button', 'text-center', 'align-middle');
        // eslint-disable-next-line func-names
        button2.addEventListener('click', function () {
            gameData.towers[i].button2();
        });
        buttonCol.appendChild(button2);
        this.button2Element = button2;
        const button3 = document.createElement('button');
        button3.id = `btnTower${this.index.toString()}Slot3`;
        button3.innerHTML = 'Button 3';
        button3.classList.add('button', 'text-center', 'align-middle');
        // eslint-disable-next-line func-names
        button3.addEventListener('click', function () {
            gameData.towers[i].button3();
        });
        buttonCol.appendChild(button3);
        this.button3Element = button3;
        const button4 = document.createElement('button');
        button4.id = `btnTower${this.index.toString()}Slot4`;
        button4.innerHTML = 'Button 3';
        button4.classList.add('button', 'text-center', 'align-middle');
        // eslint-disable-next-line func-names
        button4.addEventListener('click', function () {
            gameData.towers[i].button4();
        });
        buttonCol.appendChild(button4);
        this.button4Element = button4;
        const button5 = document.createElement('button');
        button5.id = `btnTower${this.index.toString()}Slot5`;
        button5.innerHTML = 'Button 3';
        button5.classList.add('button', 'text-center', 'align-middle');
        // eslint-disable-next-line func-names
        button5.addEventListener('click', function () {
            gameData.towers[i].button5();
        });
        buttonCol.appendChild(button5);
        this.button5Element = button5;
        const button6 = document.createElement('button');
        button6.id = `btnTower${this.index.toString()}Slot6`;
        button6.innerHTML = 'Button 3';
        button6.classList.add('button', 'text-center', 'align-middle');
        // eslint-disable-next-line func-names
        button6.addEventListener('click', function () {
            gameData.towers[i].button6();
        });
        buttonCol.appendChild(button6);
        this.button6Element = button6;
        // <input type="checkbox" id="showGunArea" name="chkGunArea" value="GunArea" checked="true">
        // <label for="showGunArea"> Show Gun Tower Ranges</label><br>
        const showArea = document.createElement('input');
        showArea.setAttribute('type', 'checkbox'); // SPECIFY THE TYPE OF ELEMENT.
        showArea.setAttribute('id', `show${this.index.toString()}`);
        showArea.innerHTML = 'Show Range';
        showArea.checked = true;
        buttonCol.appendChild(showArea);
        this.showRangeElement = showArea;
        const lbl = document.createElement('label'); // CREATE LABEL.
        lbl.setAttribute('for', `show${this.index.toString()}`);
        lbl.innerHTML = 'Show Range';
        this.lbl = lbl;
        buttonCol.appendChild(lbl);
        const deleteButton = document.createElement('button');
        deleteButton.id = `btnTower${this.index.toString()}delete`;
        deleteButton.innerHTML = 'X';
        deleteButton.classList.add('button', 'text-center', 'autobutton', 'bg-danger', 'align-middle');
        // eslint-disable-next-line func-names
        deleteButton.addEventListener('click', function () {
            gameData.towers[i].delete();
        });
        buttonCol.appendChild(deleteButton);
        this.deleteElement = deleteButton;
        if (this.type === '') {
            document.getElementById('TowerUnBoughtInfo').appendChild(newTowerRow);
            document.getElementById('TowerUnboughtHeader').classList.remove('d-none');
        }
        else {
            document.getElementById('TowerBoughtInfo').appendChild(newTowerRow);
            document.getElementById('TowerBoughtHeader').classList.remove('d-none');
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Enemy extends movingObject {
    constructor(displayDrone) {
        super(new Vector(0, 5), 0, false, []);
        this.bullets = [];
        this.type = '';
        const tieradjustment = gameData.world.currentTier - 1;
        this.baseMaxHitPoints = new JBDecimal(1.2 + tieradjustment / 100).pow(gameData.world.currentWave - 1);
        this.baseMaxHitPoints.exponent += tieradjustment;
        this.damagetaken = new JBDecimal(0);
        this.defense = new JBDecimal(0);
        this.poisonPerSec = new JBDecimal(0);
        if (displayDrone) {
            return;
        }
        this.createTargetList();
        this.movementPerSec = 10;
        if (Math.random() * gameData.world.enemiesToSpawn < getSpecialsCount()) {
            const choicesArr = getSpecialsArray();
            const i = Math.floor(Math.random() * choicesArr.length);
            if (choicesArr[i] === 'F') {
                gameData.world.fastEnemiesToSpawn -= 1;
                this.movementPerSec *= 3;
                this.type = 'Fast';
            }
            else if (choicesArr[i] === 'T') {
                gameData.world.tankEnemiesToSpawn -= 1;
                this.baseMaxHitPoints = this.baseMaxHitPoints.multiply(3);
                this.type = 'Tank';
            }
            else if (choicesArr[i] === 'M') {
                gameData.world.medicEnemiesToSpawn -= 1;
                this.defense = new JBDecimal(this.baseMaxHitPoints.multiply(gameData.world.currentWave / 100));
                this.type = 'Medic';
            }
            else if (choicesArr[i] === 'b') {
                gameData.world.bradleyEnemiesToSpawn -= 1;
                this.movementPerSec *= 3;
                this.type = 'Bradley';
            }
            else if (choicesArr[i] === 'P') {
                gameData.world.paladinEnemiesToSpawn -= 1;
                this.baseMaxHitPoints = this.baseMaxHitPoints.multiply(3);
                this.defense = new JBDecimal(this.baseMaxHitPoints.multiply(gameData.world.currentWave / 100));
                this.type = 'Paladin';
            }
            else if (choicesArr[i] === 'K') {
                gameData.world.knightEnemiesToSpawn -= 1;
                this.defense = new JBDecimal(this.baseMaxHitPoints.multiply(gameData.world.currentWave / 100));
                this.type = 'Knight';
            }
            else if (choicesArr[i] === 'C') {
                gameData.world.clericEnemiesToSpawn -= 1;
                this.type = 'Cleric';
            }
            else if (choicesArr[i] === 'D') {
                gameData.world.dumboEnemiesToSpawn -= 1;
                this.baseMaxHitPoints = this.baseMaxHitPoints.multiply(3);
                this.targetList = [];
                this.targetList.push(new Vector(gameData.world.currentTier * 10 + 35, gameData.world.currentTier * 10 + 35));
                this.targetList.push(new Vector(gameData.world.currentTier * 10 + 35, gameData.world.currentTier * 10 + 50));
                this.type = 'Dumbo';
            }
            else if (choicesArr[i] === 'H') {
                gameData.world.hummingbirdEnemiesToSpawn -= 1;
                this.targetList = [];
                this.targetList.push(new Vector(gameData.world.currentTier * 10 + 35, gameData.world.currentTier * 10 + 35));
                this.targetList.push(new Vector(gameData.world.currentTier * 10 + 35, gameData.world.currentTier * 10 + 50));
                this.movementPerSec *= 3;
                this.type = 'Hummingbird';
            }
            else if (choicesArr[i] === 'f') {
                gameData.world.flyerEnemiesToSpawn -= 1;
                this.targetList = [];
                this.targetList.push(new Vector(gameData.world.currentTier * 10 + 35, gameData.world.currentTier * 10 + 35));
                this.targetList.push(new Vector(gameData.world.currentTier * 10 + 35, gameData.world.currentTier * 10 + 50));
                this.type = 'Flyer';
            }
            else if (choicesArr[i] === 'B') {
                gameData.world.bossEnemiesToSpawn -= 1;
                this.type = 'Boss';
                this.movementPerSec *= 0.5;
                this.baseMaxHitPoints = this.baseMaxHitPoints.multiply(5);
            }
        }
    }
    MaxHitPoints() {
        const ret = new JBDecimal(this.baseMaxHitPoints);
        return ret;
    }
    CurrentHitPoints() {
        return new JBDecimal(this.MaxHitPoints()).subtract(this.damagetaken);
    }
    createTargetList() {
        const currentTierSize = 40 + Math.ceil(gameData.world.currentTier / 5) * 10;
        let currentx = 10;
        let currenty = 5;
        while (currenty <= currentTierSize) {
            currentx = currentTierSize - 5;
            const newWaypoint1 = new Vector(currentx, currenty);
            this.targetList.push(newWaypoint1);
            currenty += 20;
            const newWaypoint2 = new Vector(currentx, currenty);
            this.targetList.push(newWaypoint2);
            currentx = 5;
            const newWaypoint3 = new Vector(currentx, currenty);
            this.targetList.push(newWaypoint3);
            currenty += 20;
            const newWaypoint4 = new Vector(currentx, currenty);
            this.targetList.push(newWaypoint4);
        }
    }
    timeFromExit() {
        let ret = this.pos.getLengthFromAnotherVector(this.targetList[this.targetListIndex]);
        for (let index = this.targetListIndex; index < this.targetList.length - 1; index++) {
            ret += this.targetList[index].getLengthFromAnotherVector(this.targetList[index + 1]);
        }
        return ret / this.movementPerSec;
    }
    act() {
        this.move();
        this.takePoisonDamage();
        this.checkForHit();
        if (this.CurrentHitPoints().greaterThan(0)) {
            if (this.type === 'Cleric' || this.type === 'Medic') {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const me = this;
                gameData.enemies.forEach((e) => {
                    const healRange = gameData.world.currentWave / 5;
                    if (e.pos.getLengthFromAnotherVector(me.pos) < healRange) {
                        e.damagetaken = e.damagetaken.subtract(me.CurrentHitPoints().divide(2000).multiply(gameData.world.currentTickLength));
                        if (e.damagetaken.lessThan(0)) {
                            e.damagetaken = new JBDecimal(0);
                        }
                    }
                });
            }
            return false;
        }
        let dustGained = new JBDecimal(0);
        let metalGained = new JBDecimal(gameData.derivatives[0].production(1000));
        if (metalGained.lessThan(gameData.world.currentTickLength)) {
            metalGained = new JBDecimal(gameData.world.currentWave);
        }
        if (this.type === 'Boss') {
            if (gameData.world.currentWave > gameData.world.highestWaveCompleted) {
                dustGained = new JBDecimal(10 * Math.pow(1.05, gameData.world.currentWave));
                dustGained = dustGained.multiply(Math.pow(2, (gameData.world.currentTier - 1)));
                metalGained = new JBDecimal(0);
            }
        }
        const UpgradeBonus = 0.1 * Math.pow(2, gameData.rockUpgrades[2].bought);
        const lootBonus = Math.pow((1 + UpgradeBonus), gameData.upgrades[1].bought);
        if (dustGained.greaterThan(0)) {
            dustGained = dustGained.multiply(lootBonus);
            gameData.resources.dust.add(dustGained);
            display.floaters.push(new FloatingText(`${dustGained.toString()} dust gained`, 'yellow', this.pos));
            // display.addToDisplay(`${dustGained.ToString()} dust gained`, DisplayCategory.Loot);
        }
        if (metalGained.greaterThan(0)) {
            metalGained = metalGained.multiply(lootBonus);
            gameData.resources.metal.add(metalGained);
            display.floaters.push(new FloatingText(`${metalGained.toString()} metal gained`, 'white', this.pos));
            // display.addToDisplay(`${metalGained.ToString()} metal gained`, DisplayCategory.Loot);
        }
        return true;
    }
    draw() {
        switch (this.type) {
            case '':
            case 'Tank': {
                display.DrawSolidSquare(this.CurrentHitPoints(), this.pos, 'white');
                break;
            }
            case 'Paladin':
            case 'Knight': {
                display.DrawEnemyCircle(this.defense, this.pos, 'blue');
                display.DrawSolidSquare(this.CurrentHitPoints(), this.pos, 'white');
                break;
            }
            case 'Medic': {
                display.DrawEnemyCircle(this.defense, this.pos, 'blue');
                display.DrawSolidSquare(this.CurrentHitPoints(), this.pos, 'green');
                break;
            }
            case 'Dumbo':
            case 'Flyer': {
                display.DrawSolidDiamond(this.CurrentHitPoints(), this.pos, 'white');
                break;
            }
            case 'Hummingbird': {
                display.DrawSolidDiamond(this.CurrentHitPoints(), this.pos, 'yellow');
                break;
            }
            case 'Bradley':
            case 'Fast': {
                display.DrawSolidSquare(this.CurrentHitPoints(), this.pos, 'yellow');
                break;
            }
            case 'Cleric': {
                display.DrawSolidSquare(this.CurrentHitPoints(), this.pos, 'green');
                break;
            }
            case 'Boss': {
                display.DrawEnemyCircle(this.defense, this.pos, 'blue');
                display.DrawSolidSquare(this.CurrentHitPoints(), this.pos, 'red');
                break;
            }
            case this.type:
            default: {
                display.addToDisplay('Missing enemy draw', DisplayCategory.Challenge);
            }
        }
    }
    takePoisonDamage() {
        this.damagetaken = this.damagetaken.add(this.poisonPerSec.multiply(gameData.world.currentTickLength / 1000));
    }
    recieveHit(bullet) {
        let damageToTake = new JBDecimal(bullet.damage);
        if (this.defense.greaterThan(0)) {
            this.defense = this.defense.subtract(damageToTake.multiply(bullet.defenseDamage));
            if (this.defense.lessThan(0)) {
                this.defense = new JBDecimal(0);
            }
            damageToTake = damageToTake.subtract(this.defense);
            if (damageToTake.lessThan(0)) {
                return; // no damage will be taken, time to bounce
            }
        }
        this.damagetaken = this.damagetaken.add(damageToTake);
    }
    beTargetedByWeapon(damagePassed, attackerPos, DefenseDamage) {
        let damage = new JBDecimal(damagePassed);
        let critchance = critChance();
        let crit = false;
        const multiplier = critMultiplier();
        while (critchance > 100) {
            damage = damage.multiply(multiplier);
            critchance -= 100;
            crit = true;
        }
        const rndvalue = Math.random() * 100;
        if (rndvalue < critchance) {
            damage = damage.multiply(multiplier);
            crit = true;
        }
        this.bullets.push(new Bullet(attackerPos, this.pos, damage, DefenseDamage, crit));
    }
    checkForHit() {
        for (let index = this.bullets.length - 1; index >= 0; index--) {
            const b = this.bullets[index];
            b.targetList[0] = new Vector(this.pos.x, this.pos.y);
            b.move();
            if (b.pos.getLengthFromAnotherVector(this.pos) <= 0) {
                this.recieveHit(b);
                this.bullets.splice(index, 1);
            }
        }
    }
    expectedHitsRemaining(damage) {
        if (this.bullets.length === 0) {
            return this.CurrentHitPoints().divide(damage).ToNumber();
        }
        let damageper = new JBDecimal(damage).subtract(this.defense);
        if (damageper.lessThan(0)) {
            damageper = damage.divide(100);
        }
        let leftoverHitpoints = this.CurrentHitPoints();
        this.bullets.forEach(() => {
            leftoverHitpoints = leftoverHitpoints.subtract(damageper);
        });
        return leftoverHitpoints.divide(damage).ToNumber();
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NumberOfTowerLevelsBought() {
    let ret = 0;
    gameData.towers.forEach((t) => {
        ret += t.bought;
    });
    return ret;
}
//# sourceMappingURL=Tower.js.map