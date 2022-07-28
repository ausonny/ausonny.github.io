function getSpecialsArray() {
    const choicesArr = [];
    for (let index = 0; index < gameData.world.fastEnemiesToSpawn; index++) {
        choicesArr.push('F');
    }
    for (let index = 0; index < gameData.world.tankEnemiesToSpawn; index++) {
        choicesArr.push('T');
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
// eslint-disable-next-line no-unused-vars
class Tower {
    constructor(pos, index) {
        this.pos = pos;
        this.index = index;
        this.type = '';
        this.baseGunAttack = 1;
        this.ticksToNextBullet = 0;
        this.baseRange = 15;
        this.baseTicksPerShot = 1000;
        this.active = false;
        this.baseGunCost = 10;
        this.gunCostMultiplier = 2;
        this.gunUpgradeCost = 1;
        this.gunUpgradeCostMultiplier = 2;
        this.basePoisonCost = 100;
        this.poisonCostMultiplier = 2;
        this.poisonUpgradeCost = 1;
        this.poisonUpgradeCostMultiplier = 2;
        this.baseSlowCost = 10000000;
        this.slowCostMultiplier = 10;
        this.slowUpgradeCost = 1;
        this.slowUpgradeCostMultiplier = 10;
        this.inflationFloor = 20;
        this.bought = 0;
        this.limit = 0;
        this.upgradeLevel = 0;
        this.autoOn = true;
        this.CreateDisplay();
    }
    autoBuy() {
        if (!this.autoOn) {
            return;
        }
        if (!this.active) {
            return;
        }
        const moneyavailable = 100;
        if (this.type === 'Gun') {
            if (gameData.resources.metal.amount.lessThan(this.buyGunCost().multiply(moneyavailable))) {
                return;
            }
            this.buyGun();
        }
        if (this.type === 'Slow') {
            if (gameData.resources.metal.amount.lessThan(this.buySlowCost().multiply(moneyavailable))) {
                return;
            }
            this.buySlow();
        }
        if (this.type === 'Poison') {
            if (gameData.resources.metal.amount.lessThan(this.buyPoisonCost().multiply(moneyavailable))) {
                return;
            }
            this.buyPoison();
        }
    }
    act() {
        if (this.type === 'Gun') {
            this.ticksToNextBullet -= gameData.world.currentTickLength;
            const enemiesInRange = [];
            if (this.ticksToNextBullet <= 0) {
                if (gameData.enemies.length > 0) {
                    gameData.enemies.forEach((e) => {
                        const len = e.pos.getLengthFromAnotherVector(this.pos);
                        if (len <= this.Range() && e.expectedHitsRemaining(this.GunAttack()) > 0) {
                            enemiesInRange.push(e);
                        }
                    });
                }
                if (enemiesInRange.length > 0) {
                    if (gameData.tactics.fastest) {
                        enemiesInRange.sort((a, b) => (a.timeFromExit() > b.timeFromExit() ? 1 : -1));
                    }
                    else if (gameData.tactics.healer) {
                        enemiesInRange.sort((a, b) => (a.timeFromExit() > b.timeFromExit() ? 1 : -1));
                        enemiesInRange.forEach((e, index) => {
                            if (e.type === 'Cleric') {
                                enemiesInRange.unshift(enemiesInRange.splice(index, 1)[0]);
                            }
                        });
                    }
                    else if (gameData.tactics.highestHealth) {
                        enemiesInRange.sort((a, b) => a.expectedHitsRemaining(this.GunAttack()) < b.expectedHitsRemaining(this.GunAttack()) ? 1 : -1);
                    }
                    else if (gameData.tactics.lowestHealth) {
                        enemiesInRange.sort((a, b) => a.expectedHitsRemaining(this.GunAttack()) > b.expectedHitsRemaining(this.GunAttack()) ? 1 : -1);
                    }
                    // enemiesInRange.sort((a,b)=> (a.getDistanceToTarget() - b.getDistanceToTarget() || a.Attack().greaterThan(b.Attack()) || a.expectedHitPointsRemaining(this.Attack()).ceil - b.expectedHitPointsRemaining(this.Attack()).ceil));
                    // enemiesInRange.sort((a, b) => (a.expectedHitPointsRemaining(this.Attack()) > b.expectedHitPointsRemaining(this.Attack())) ? 1 : -1)
                    enemiesInRange[0].beTargetedbyGun(this);
                    this.ticksToNextBullet += this.ticksPerShot();
                }
                else {
                    this.ticksToNextBullet = 0;
                }
            }
        }
        if (this.type === 'Poison') {
            const poisonDamage = this.PoisonAttack();
            gameData.enemies.forEach((e) => {
                const len = e.pos.getLengthFromAnotherVector(this.pos);
                if (len <= this.Range()) {
                    e.poisonPerSec = e.poisonPerSec.add(poisonDamage);
                }
            });
        }
        if (this.type === 'Slow') {
            if (gameData.enemies.length > 0) {
                gameData.enemies.forEach((e) => {
                    const len = e.pos.getLengthFromAnotherVector(this.pos);
                    if (len <= this.Range()) {
                        if (e.slowed < this.SlowEffect())
                            e.slowed = this.SlowEffect();
                    }
                });
            }
        }
    }
    draw() {
        if (lastachievementcount > 25) {
            this.button1AutoElement.classList.remove('hidden');
        }
        else {
            this.button1AutoElement.classList.add('hidden');
        }
        document.getElementById(`Tower${this.index.toString()}Info`).innerHTML = `${this.type} ${this.index.toString()}`;
        switch (this.type) {
            case 'Gun': {
                if (this.autoOn) {
                    this.button1AutoElement.classList.remove('bg-danger');
                    this.button1AutoElement.classList.add('bg-success');
                }
                else {
                    this.button1AutoElement.classList.add('bg-danger');
                    this.button1AutoElement.classList.remove('bg-success');
                }
                display.DrawEnemyCircle(display.drone.CurrentHitPoints().multiply(5), this.pos, 'red');
                const chk = document.getElementById('showGunArea');
                if (chk.checked) {
                    display.DrawCircle(this.pos, 0.02, this.Range(), 'red');
                }
                document.getElementById(`Tower${this.index.toString()}Info`).innerHTML += ` Attack: ${this.GunAttack().ToString()}`;
                this.towerRow.classList.add('bg-danger');
                if (this.affordBuyGun()) {
                    this.button1Element.classList.add('btn-success');
                    this.button1Element.classList.remove('btn-danger');
                }
                else {
                    this.button1Element.classList.remove('btn-success');
                    this.button1Element.classList.add('btn-danger');
                }
                this.button1Element.innerHTML = `Metal: ${this.buyGunCost().ToString()}`;
                this.button2Element.classList.remove('hidden');
                if (this.affordGunUpgrade()) {
                    this.button2Element.classList.add('btn-success');
                    this.button2Element.classList.remove('btn-danger');
                }
                else {
                    this.button2Element.classList.remove('btn-success');
                    this.button2Element.classList.add('btn-danger');
                }
                this.button2Element.innerHTML = `Dust: ${this.buyUpgradeGunCost().ToString()}`;
                this.button3Element.classList.add('hidden');
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
                display.DrawSolidSquare(display.drone.CurrentHitPoints().multiply(6.9), this.pos, 'blue');
                display.DrawSolidDiamond(display.drone.CurrentHitPoints().multiply(6.9), this.pos, 'blue');
                const chk = document.getElementById('showSlowArea');
                if (chk.checked) {
                    display.DrawCircle(this.pos, 0.02, this.Range(), 'blue');
                }
                document.getElementById(`Tower${this.index.toString()}Info`).innerHTML += ` Slow: ${(1 /
                    (1 + this.SlowEffect())).toFixed(3)}`;
                this.towerRow.classList.add('bg-primary');
                if (gameData.challenges[5].active || gameData.challenges[5].completed < 1) {
                    this.button1Element.classList.add('hidden');
                    this.button1AutoElement.classList.add('hidden');
                    this.button2Element.classList.add('hidden');
                }
                else {
                    this.button1Element.classList.remove('hidden');
                    this.button1AutoElement.classList.remove('hidden');
                    this.button2Element.classList.remove('hidden');
                }
                if (this.affordBuySlow()) {
                    this.button1Element.classList.add('btn-success');
                    this.button1Element.classList.remove('btn-danger');
                }
                else {
                    this.button1Element.classList.remove('btn-success');
                    this.button1Element.classList.add('btn-danger');
                }
                this.button1Element.innerHTML = `Metal: ${this.buySlowCost().ToString()}`;
                if (this.affordSlowUpgrade()) {
                    this.button2Element.classList.add('btn-success');
                    this.button2Element.classList.remove('btn-danger');
                }
                else {
                    this.button2Element.classList.remove('btn-success');
                    this.button2Element.classList.add('btn-danger');
                }
                this.button2Element.innerHTML = `Dust: ${this.buyUpgradeSlowCost().ToString()}`;
                this.button3Element.classList.add('hidden');
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
                display.DrawSolidDiamond(display.drone.CurrentHitPoints().multiply(6.9), this.pos, 'green');
                const chk = document.getElementById('showPoisonArea');
                if (chk.checked) {
                    display.DrawCircle(this.pos, 0.02, this.Range(), 'green');
                }
                document.getElementById(`Tower${this.index.toString()}Info`).innerHTML += ` Poison: ${this.PoisonAttack().ToString()}`;
                this.towerRow.classList.add('bg-success');
                if (gameData.challenges[4].active || gameData.challenges[4].completed < 1) {
                    this.button1Element.classList.add('hidden');
                    this.button1AutoElement.classList.add('hidden');
                    this.button2Element.classList.add('hidden');
                }
                else {
                    this.button1Element.classList.remove('hidden');
                    this.button1AutoElement.classList.remove('hidden');
                    this.button2Element.classList.remove('hidden');
                }
                if (this.affordBuyPoison()) {
                    this.button1Element.classList.add('btn-success');
                    this.button1Element.classList.remove('btn-danger');
                }
                else {
                    this.button1Element.classList.remove('btn-success');
                    this.button1Element.classList.add('btn-danger');
                }
                this.button1Element.innerHTML = `Metal: ${this.buyPoisonCost().ToString()}`;
                if (this.affordPoisonUpgrade()) {
                    this.button2Element.classList.add('btn-success');
                    this.button2Element.classList.remove('btn-danger');
                }
                else {
                    this.button2Element.classList.remove('btn-success');
                    this.button2Element.classList.add('btn-danger');
                }
                this.button2Element.innerHTML = `Dust: ${this.buyUpgradePoisonCost().ToString()}`;
                this.button3Element.classList.add('hidden');
                break;
            }
            case '':
            default: {
                this.button1AutoElement.classList.add('hidden');
                display.DrawSolidSquare(display.drone.CurrentHitPoints().multiply(10), this.pos, 'grey');
                if (this.affordBuyGun()) {
                    this.button1Element.classList.add('btn-success');
                    this.button1Element.classList.remove('btn-danger');
                }
                else {
                    this.button1Element.classList.remove('btn-success');
                    this.button1Element.classList.add('btn-danger');
                }
                this.button1Element.innerHTML = `Buy Gun (Metal: ${this.baseGunCost.toString()})`;
                if (gameData.challenges[5].active || gameData.challenges[5].completed < 1) {
                    this.button2Element.classList.add('hidden');
                }
                else {
                    this.button2Element.classList.remove('hidden');
                    if (this.affordBuySlow()) {
                        this.button2Element.classList.add('btn-success');
                        this.button2Element.classList.remove('btn-danger');
                    }
                    else {
                        this.button2Element.classList.remove('btn-success');
                        this.button2Element.classList.add('btn-danger');
                    }
                    this.button2Element.innerHTML = `Buy Slow (Metal: ${new JBDecimal(this.baseSlowCost).toString()})`;
                }
                if (gameData.challenges[4].active || gameData.challenges[4].completed < 1) {
                    this.button3Element.classList.add('hidden');
                }
                else {
                    this.button3Element.classList.remove('hidden');
                    if (this.affordBuyPoison()) {
                        this.button3Element.classList.add('btn-success');
                        this.button3Element.classList.remove('btn-danger');
                    }
                    else {
                        this.button3Element.classList.remove('btn-success');
                        this.button3Element.classList.add('btn-danger');
                    }
                    this.button3Element.innerHTML = `Buy Poison (Metal: ${this.basePoisonCost.toString()})`;
                }
                break;
            }
        }
        display.drawText(this.index.toString(), this.pos, 'white', '12px Arial', 'center', 'middle');
    }
    button1() {
        // eslint-disable-next-line no-undef
        dirtyTowers = true;
        switch (this.type) {
            case '':
            case 'Gun': {
                this.buyGun();
                break;
            }
            case 'Slow': {
                this.buySlow();
                break;
            }
            case 'Poison': {
                this.buyPoison();
                break;
            }
            default: {
                break;
            }
        }
    }
    button2() {
        // eslint-disable-next-line no-undef
        dirtyTowers = true;
        switch (this.type) {
            case '': {
                this.buySlow();
                break;
            }
            case 'Gun': {
                this.buyGunUpgrade();
                break;
            }
            case 'Slow': {
                this.buySlowUpgrade();
                break;
            }
            case 'Poison': {
                this.buyPoisonUpgrade();
                break;
            }
            default: {
                break;
            }
        }
    }
    button3() {
        // eslint-disable-next-line no-undef
        dirtyTowers = true;
        switch (this.type) {
            case '': {
                this.buyPoison();
                break;
            }
            case 'Gun': {
                break;
            }
            case 'Slow': {
                break;
            }
            case 'Poison': {
                break;
            }
            default: {
                break;
            }
        }
    }
    delete() {
        this.bought = 0;
        this.upgradeLevel = 0;
        this.type = '';
        this.towerRow.classList.remove('bg-primary');
        this.towerRow.classList.remove('bg-danger');
        this.towerRow.classList.remove('bg-success');
        // eslint-disable-next-line no-undef
        dirtyTowers = true;
    }
    GunAttack() {
        let AttackPerLevel = 0.1 + (gameData.upgrades[0].bought + this.upgradeLevel) * 0.05;
        AttackPerLevel *= Math.pow(2, (gameData.rockUpgrades[1].bought + gameData.boulderUpgrades[4].bought));
        if (gameData.upgrades[6].bought > 0) {
            const bonusPer = 1 + gameData.upgrades[6].bought / 100;
            AttackPerLevel *= Math.pow(bonusPer, this.bought);
        }
        if (gameData.equipment.length > 0) {
            gameData.equipment[0].abilities.forEach((a) => {
                if (a.name === 'Gun Attack') {
                    AttackPerLevel *= 1 + (a.levels * 10) / 100;
                }
            });
        }
        let ret = new JBDecimal(this.bought).multiply(AttackPerLevel).add(this.baseGunAttack);
        ret = ret.multiply(getAchievementBonus());
        return ret;
    }
    PoisonAttack() {
        let AttackPerLevel = 0.01 + (this.upgradeLevel + gameData.challenges[4].completed) * 0.005;
        AttackPerLevel *= Math.pow(2, (gameData.rockUpgrades[13].bought + gameData.boulderUpgrades[9].bought));
        if (gameData.equipment.length > 0) {
            gameData.equipment[0].abilities.forEach((a) => {
                if (a.name === 'Poison Effect') {
                    AttackPerLevel *= 1 + (a.levels * 10) / 100;
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
        ret *= this.skillDeterioration();
        return ret / 1000;
    }
    DefenseDamage() {
        if (gameData.challenges[7].active || gameData.challenges[7].completed < 1) {
            return 0;
        }
        const bonusper = 1 + gameData.rockUpgrades[12].bought / 10 + gameData.boulderUpgrades[8].bought / 10;
        let ret = bonusper * gameData.challenges[7].completed;
        ret *= this.skillDeterioration();
        return ret / 100;
    }
    critChance() {
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
        ret *= this.skillDeterioration();
        return ret;
    }
    // eslint-disable-next-line class-methods-use-this
    critMultiplier() {
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
    Range() {
        if (gameData.challenges[3].active || gameData.challenges[3].completed < 1) {
            return this.baseRange;
        }
        let ret = this.baseRange;
        ret = 5 * gameData.challenges[3].completed;
        ret *= this.skillDeterioration();
        ret += this.baseRange;
        if (ret < this.baseRange) {
            ret = this.baseRange;
        }
        else if (ret > 100) {
            ret = 100;
        }
        return ret;
    }
    // eslint-disable-next-line class-methods-use-this
    skillDeterioration() {
        return Math.pow((0.999 - (gameData.world.currentTier - 1) / 1000), gameData.world.currentWave);
    }
    ShotsPerSecond() {
        if (gameData.challenges[2].active || gameData.challenges[2].completed < 1) {
            return 1;
        }
        let bonusperupgrade = 1;
        if (gameData.rockUpgrades[10].bought > 0) {
            bonusperupgrade += gameData.rockUpgrades[10].bought / 10;
        }
        let ret = 1 + gameData.challenges[2].completed * bonusperupgrade;
        ret *= this.skillDeterioration();
        if (ret < 1) {
            ret = 1;
        }
        else if (ret > 10) {
            ret = 10;
        }
        return ret;
    }
    ticksPerShot() {
        return 1000 / this.ShotsPerSecond();
    }
    buyGun() {
        if (!gameData.resources.metal.amount.greaterThanOrEqualTo(this.buyGunCost())) {
            return;
        }
        gameData.resources.metal.subtract(this.buyGunCost());
        this.bought += 1;
        this.type = 'Gun';
        CheckAchievementCompletions();
    }
    buyGunUpgrade() {
        if (this.type === '') {
            return;
        }
        if (!gameData.resources.dust.amount.greaterThanOrEqualTo(this.buyUpgradeGunCost())) {
            return;
        }
        gameData.resources.dust.subtract(this.buyUpgradeGunCost());
        this.upgradeLevel += 1;
    }
    buyPoison() {
        if (!gameData.resources.metal.amount.greaterThanOrEqualTo(this.buyPoisonCost())) {
            return;
        }
        if (gameData.challenges[4].active || gameData.challenges[4].completed < 1) {
            return;
        }
        gameData.resources.metal.subtract(this.buyPoisonCost());
        this.bought += 1;
        this.type = 'Poison';
        CheckAchievementCompletions();
    }
    buyPoisonUpgrade() {
        if (this.type === '') {
            return;
        }
        if (gameData.challenges[4].active || gameData.challenges[4].completed < 1) {
            return;
        }
        if (!gameData.resources.dust.amount.greaterThanOrEqualTo(this.buyUpgradePoisonCost())) {
            return;
        }
        gameData.resources.dust.subtract(this.buyUpgradePoisonCost());
        this.upgradeLevel += 1;
    }
    currentInflationFloor() {
        if (gameData.challenges[0].active) {
            return 1;
        }
        let ret = this.inflationFloor;
        if (gameData.challenges[0].completed > 0) {
            const bonus = 1.05 + gameData.rockUpgrades[3].bought * 0.01;
            ret *= Math.pow(bonus, gameData.challenges[0].completed);
        }
        return ret;
    }
    buyUpgradeGunCost() {
        let ret = new JBDecimal(this.gunUpgradeCostMultiplier);
        ret = ret.pow(this.upgradeLevel);
        ret = ret.multiply(this.gunUpgradeCost);
        return ret;
    }
    buyUpgradePoisonCost() {
        let ret = new JBDecimal(this.poisonUpgradeCostMultiplier);
        ret = ret.pow(this.upgradeLevel);
        ret = ret.multiply(this.poisonUpgradeCost);
        return ret;
    }
    // internalInflationCost(increase: number) {
    //   if (internalInflationArray.length <= increase) {
    //     display.addToDisplay(
    //       'Consider upping the initial internalinflationarray',
    //       DisplayCategory.Story
    //     );
    //     // eslint-disable-next-line no-global-assign
    //     internalInflationArray = [];
    //     let total = 0;
    //     for (let index = 1; index <= increase * 1.1; index++) {
    //       total += Math.ceil(Math.sqrt(index));
    //       internalInflationArray.push(total);
    //     }
    //   }
    //   return internalInflationArray[increase];
    // }
    buySlowCost() {
        let itemQty = this.bought;
        if (itemQty > this.currentInflationFloor()) {
            const increase = Math.ceil(itemQty - this.currentInflationFloor());
            itemQty += internalInflationCost(increase);
        }
        const ret = new JBDecimal(this.slowCostMultiplier).pow(itemQty).multiply(this.baseSlowCost);
        return ret;
    }
    affordBuySlow() {
        if (this.buySlowCost().greaterThan(gameData.resources.metal.amount)) {
            return false;
        }
        return true;
    }
    affordSlowUpgrade() {
        if (this.buyUpgradeSlowCost().greaterThan(gameData.resources.dust.amount)) {
            return false;
        }
        return true;
    }
    buySlow() {
        if (!gameData.resources.metal.amount.greaterThanOrEqualTo(this.buySlowCost())) {
            return;
        }
        if (gameData.challenges[5].active || gameData.challenges[5].completed === 0) {
            return;
        }
        gameData.resources.metal.subtract(this.buySlowCost());
        this.bought += 1;
        this.type = 'Slow';
        CheckAchievementCompletions();
    }
    buySlowUpgrade() {
        if (this.type !== 'Slow') {
            return;
        }
        if (!gameData.resources.dust.amount.greaterThanOrEqualTo(this.buyUpgradeSlowCost())) {
            return;
        }
        gameData.resources.dust.subtract(this.buyUpgradeGunCost());
        this.upgradeLevel += 1;
    }
    buyUpgradeSlowCost() {
        let ret = new JBDecimal(this.slowUpgradeCostMultiplier);
        ret = ret.pow(this.upgradeLevel);
        ret = ret.multiply(this.slowUpgradeCost);
        return ret;
    }
    buyGunCost() {
        let itemQty = this.bought;
        if (itemQty >= this.currentInflationFloor()) {
            const increase = Math.ceil(itemQty - this.currentInflationFloor());
            itemQty += internalInflationCost(increase);
        }
        const ret = new JBDecimal(this.gunCostMultiplier).pow(itemQty).multiply(this.baseGunCost);
        return ret;
    }
    affordBuyGun() {
        if (this.buyGunCost().greaterThan(gameData.resources.metal.amount)) {
            return false;
        }
        return true;
    }
    affordGunUpgrade() {
        if (this.buyUpgradeGunCost().greaterThan(gameData.resources.dust.amount)) {
            return false;
        }
        return true;
    }
    buyPoisonCost() {
        let itemQty = this.bought;
        if (itemQty >= this.currentInflationFloor()) {
            const increase = Math.ceil(itemQty - this.currentInflationFloor());
            itemQty += internalInflationCost(increase);
        }
        const ret = new JBDecimal(this.poisonCostMultiplier).pow(itemQty).multiply(this.basePoisonCost);
        return ret;
    }
    affordBuyPoison() {
        if (this.buyPoisonCost().greaterThan(gameData.resources.metal.amount)) {
            return false;
        }
        return true;
    }
    affordPoisonUpgrade() {
        if (this.buyUpgradePoisonCost().greaterThan(gameData.resources.dust.amount)) {
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
        const button1Col = document.createElement('div');
        button1Col.classList.add('col-md-2', 'p-0', 'm-0');
        const button1 = document.createElement('button');
        button1.id = `btnTower${this.index.toString()}Slot1`;
        button1.innerHTML = 'Button 1';
        button1.classList.add('button', 'text-center');
        const i = this.index;
        // eslint-disable-next-line func-names
        button1.addEventListener('click', function () {
            gameData.towers[i].button1();
        });
        button1Col.appendChild(button1);
        const button1auto = document.createElement('button');
        button1auto.id = `btnTower${this.index.toString()}Slot1A`;
        button1auto.innerHTML = 'A';
        button1auto.classList.add('button', 'text-center', 'autobutton');
        // eslint-disable-next-line func-names
        button1auto.addEventListener('click', function () {
            gameData.towers[i].autoSwitch();
        });
        button1Col.appendChild(button1auto);
        this.button1Element = button1;
        this.button1AutoElement = button1auto;
        newTowerRow.appendChild(button1Col);
        const button2Col = document.createElement('div');
        button2Col.classList.add('col-md-2', 'p-0', 'm-0');
        const button2 = document.createElement('button');
        button2.id = `btnTower${this.index.toString()}Slot2`;
        button2.innerHTML = 'Button 2';
        button2.classList.add('button', 'text-center');
        // eslint-disable-next-line func-names
        button2.addEventListener('click', function () {
            gameData.towers[i].button2();
        });
        button2Col.appendChild(button2);
        this.button2Element = button2;
        newTowerRow.appendChild(button2Col);
        const button3Col = document.createElement('div');
        button3Col.classList.add('col-md-2', 'p-0', 'm-0');
        const button3 = document.createElement('button');
        button3.id = `btnTower${this.index.toString()}Slot3`;
        button3.innerHTML = 'Button 3';
        button3.classList.add('button', 'text-center');
        // eslint-disable-next-line func-names
        button3.addEventListener('click', function () {
            gameData.towers[i].button3();
        });
        button3Col.appendChild(button3);
        this.button3Element = button3;
        newTowerRow.appendChild(button3Col);
        const deleteCol = document.createElement('div');
        deleteCol.classList.add('col-md-1', 'p-0', 'm-0');
        const deleteButton = document.createElement('button');
        deleteButton.id = `btnTower${this.index.toString()}delete`;
        deleteButton.innerHTML = 'X';
        deleteButton.classList.add('button', 'text-center', 'autobutton', 'bg-danger');
        // eslint-disable-next-line func-names
        deleteButton.addEventListener('click', function () {
            gameData.towers[i].delete();
        });
        deleteCol.appendChild(deleteButton);
        this.deleteElement = deleteButton;
        newTowerRow.appendChild(deleteCol);
        if (this.type === '') {
            document.getElementById('TowerUnBoughtInfo').appendChild(newTowerRow);
            document.getElementById('TowerUnboughtHeader').classList.remove('hidden');
        }
        else {
            document.getElementById('TowerBoughtInfo').appendChild(newTowerRow);
            document.getElementById('TowerBoughtHeader').classList.remove('hidden');
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
            else if (choicesArr[i] === 'b') {
                gameData.world.bradleyEnemiesToSpawn -= 1;
                this.baseMaxHitPoints = this.baseMaxHitPoints.multiply(3);
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
                this.movementPerSec *= 3;
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
        const currentTierSize = 40 + gameData.world.currentTier * 10;
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
            if (this.type === 'Cleric') {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const me = this;
                gameData.enemies.forEach((e) => {
                    if (e.type !== 'Cleric') {
                        const healRange = gameData.world.currentWave / 5;
                        if (e.pos.getLengthFromAnotherVector(me.pos) < healRange) {
                            e.damagetaken = e.damagetaken.subtract(me.CurrentHitPoints().divide(2000).multiply(gameData.world.currentTickLength));
                            if (e.damagetaken.lessThan(0)) {
                                e.damagetaken = new JBDecimal(0);
                            }
                        }
                    }
                });
            }
            return false;
        }
        let dustGained = new JBDecimal(0);
        let metalGained = new JBDecimal(gameData.derivatives[0].production(1000));
        if (metalGained.lessThan(1)) {
            metalGained = new JBDecimal(1);
        }
        if (this.type !== '') {
            if (gameData.world.currentWave > gameData.world.highestWaveCompleted) {
                dustGained = new JBDecimal(1.05).pow(gameData.world.currentWave);
                dustGained = dustGained.multiply(new JBDecimal(2).pow(gameData.world.currentTier - 1));
            }
        }
        if (this.type === 'Boss') {
            dustGained = dustGained.multiply(5);
            metalGained = metalGained.multiply(5);
        }
        const UpgradeBonus = 0.1 * Math.pow(2, gameData.rockUpgrades[2].bought);
        const lootBonus = Math.pow((1 + UpgradeBonus), gameData.upgrades[1].bought);
        if (dustGained.greaterThan(0)) {
            dustGained = dustGained.multiply(lootBonus);
            gameData.resources.dust.add(dustGained);
            display.addToDisplay(`${dustGained.ToString()} dust gained`, DisplayCategory.Loot);
        }
        if (metalGained.greaterThan(0)) {
            metalGained = metalGained.multiply(lootBonus);
            gameData.resources.metal.add(metalGained);
            display.addToDisplay(`${metalGained.ToString()} metal gained`, DisplayCategory.Loot);
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
    beTargetedbyGun(attacker) {
        let damage = attacker.GunAttack();
        let critchance = attacker.critChance();
        let crit = false;
        const multiplier = attacker.critMultiplier();
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
        this.bullets.push(new Bullet(attacker.pos, this.pos, damage, attacker.DefenseDamage(), crit));
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