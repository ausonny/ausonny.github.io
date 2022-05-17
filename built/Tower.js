/* global gameData, JBDecimal, display */
class Vector {
    constructor(currentx, currenty) {
        this.x = currentx;
        this.y = currenty;
    }
    getLength(targetx, targety) {
        const xdif = this.x - targetx;
        const ydif = this.y - targety;
        return Math.sqrt(xdif * xdif + ydif * ydif); // calculating length of vector;
    }
    getNormalizedX(targetx, targety) {
        return this.x / this.getLength(targetx, targety);
    }
    getNormalizedY(targetx, targety) {
        return this.y / this.getLength(targetx, targety);
    }
}
class movingObject {
    constructor(pos, target, movementPerSec, isbullet = false) {
        this.pos = Object.assign(pos);
        this.updateTarget(target);
        this.movementPerSec = movementPerSec;
        this.isBullet = isbullet;
    }
    updateTarget(target) {
        this.target = Object.assign(target);
    }
    getDistanceToTarget() {
        return this.pos.getLength(this.target.x, this.target.y);
    }
    timeToTarget() {
        return this.getDistanceToTarget() / this.movementPerSec;
    }
    move() {
        const length = this.getDistanceToTarget();
        const xdif = this.pos.x - this.target.x;
        const ydif = this.pos.y - this.target.y;
        if (this.isBullet) {
            const tickmovement = (this.movementPerSec * gameData.world.currentTickLength) / 1000;
            if (length <= tickmovement) {
                this.pos.x = this.target.x;
                this.pos.y = this.target.y;
            }
            else {
                const movex = (xdif / length) * tickmovement;
                const movey = (ydif / length) * tickmovement;
                this.pos.x -= movex;
                this.pos.y -= movey;
            }
        }
        else {
            let tickmovement = (this.movementPerSec * gameData.world.currentTickLength) / 1000;
            const slowpenalty = (tickmovement * gameData.tower.Slow()) / 100;
            if (length < gameData.tower.Range()) {
                tickmovement -= slowpenalty;
            }
            if (length < 2) {
                this.pos.x = this.pos.getNormalizedX(this.target.x, this.target.y) * 1.99;
                this.pos.y = this.pos.getNormalizedY(this.target.x, this.target.y) * 1.99;
                // sit still
            }
            else {
                const movex = (xdif / length) * tickmovement;
                const movey = (ydif / length) * tickmovement;
                this.pos.x -= movex;
                this.pos.y -= movey;
            }
        }
    }
}
class Bullet extends movingObject {
    constructor(posx, posy, targetx, targety, damage, crit) {
        super(new Vector(posx, posy), new Vector(targetx, targety), 10, true);
        this.damage = new JBDecimal(0);
        this.damage.mantissa = damage.mantissa;
        this.damage.exponent = damage.exponent;
        this.crit = crit;
    }
    draw() {
        let color = 'white';
        if (this.crit) {
            color = 'red';
        }
        display.DrawSolidSquare(display.drone.CurrentHitPoints().divide(3), this.pos, color);
    }
    update() {
        this.draw();
    }
}
class fightingObject extends movingObject {
    constructor(wave, enemycount, player = false) {
        super(new Vector(0, 0), new Vector(0, 0), 0, false);
        this.bullets = [];
        this.ticksToNextBullet = 0;
        if (player) {
            this.createTower();
        }
        else {
            this.createEnemy(wave, enemycount);
        }
    }
    createTower() {
        this.baseMaxHitPoints = new JBDecimal(50);
        this.baseAttack = new JBDecimal(1);
        this.baseDefense = new JBDecimal(0);
        this.baseRange = 3;
        this.baseHeal = new JBDecimal(0);
        this.baseShotsPerSec = 1;
        this.damagetaken = new JBDecimal(0);
        this.player = true;
        this.pos.x = 0;
        this.pos.y = 0;
        this.target.x = 0;
        this.target.y = 0;
    }
    createEnemy(wave, enemycount) {
        const posx = Math.random() * 10;
        const posy = Math.sqrt(100 - Math.pow(posx, 2));
        const tieradjustment = gameData.world.currentTier - 1;
        this.baseAttack = new JBDecimal(1.15 + tieradjustment / 100).pow(wave - 1);
        this.baseAttack.exponent += tieradjustment;
        this.movementPerSec = 1;
        this.baseMaxHitPoints = new JBDecimal(1.2 + tieradjustment / 100).pow(wave - 1);
        this.baseMaxHitPoints.exponent += tieradjustment;
        this.damagetaken = new JBDecimal(0);
        this.baseDefense = new JBDecimal(0);
        this.baseRange = 2;
        this.baseHeal = new JBDecimal(0);
        this.baseShotsPerSec = 1;
        this.wave = wave;
        this.enemycount = enemycount;
        this.pos = new Vector(posx, posy);
        if (enemycount % 4 === 0) {
            this.pos.y *= -1;
        }
        else if (enemycount % 4 === 1) {
            this.pos.x *= -1;
        }
        else if (enemycount % 4 === 2) {
            this.pos.x *= -1;
            this.pos.y *= -1;
        }
        this.type = '';
    }
    MaxHitPoints() {
        let ret = new JBDecimal(this.baseMaxHitPoints);
        if (this.player) {
            const equipmentbonus = new JBDecimal(gameData.equipment[1].production().multiply(this.baseMaxHitPoints));
            ret = ret.add(equipmentbonus);
        }
        return ret;
    }
    CurrentHitPoints() {
        return new JBDecimal(this.MaxHitPoints()).subtract(this.damagetaken);
    }
    Attack() {
        let ret = new JBDecimal(this.baseAttack);
        if (this.player) {
            ret = ret.add(gameData.equipment[0].production());
        }
        return ret;
    }
    Defense() {
        if (gameData.challenges[1].active || gameData.challenges[1].completed < 1) {
            return 0;
        }
        let ret = 0;
        if (this.player) {
            ret = 10 * gameData.challenges[1].completed;
            ret *= Math.pow(0.99 - (gameData.world.currentTier - 1) / 100, gameData.world.currentWave);
        }
        if (ret < 0) {
            ret = 0;
        }
        else if (ret > 100) {
            ret = 100;
        }
        return ret;
    }
    Range() {
        if (!this.player) {
            return this.baseRange;
        }
        if (gameData.challenges[4].active || gameData.challenges[4].completed < 1) {
            return 3;
        }
        let ret = 3;
        if (this.player) {
            ret = 2 * gameData.challenges[4].completed;
            ret *= Math.pow(0.99 - (gameData.world.currentTier - 1) / 100, gameData.world.currentWave);
            ret += 3;
        }
        if (ret < 3) {
            ret = 3;
        }
        else if (ret > 10) {
            ret = 10;
        }
        return ret;
    }
    Heal() {
        if (gameData.challenges[2].active || gameData.challenges[2].completed < 1) {
            return 0;
        }
        let ret = 0;
        if (this.player) {
            ret = 1.0 * gameData.challenges[2].completed + (gameData.rockUpgrades[8].bought);
            ret *= Math.pow(0.99 - (gameData.world.currentTier - 1) / 100, gameData.world.currentWave);
        }
        if (ret < 0) {
            ret = 0;
        }
        else if (ret > 100) {
            ret = 100;
        }
        return ret;
    }
    Slow() {
        if (gameData.challenges[7].active || gameData.challenges[7].completed < 1) {
            return 0;
        }
        let ret = 0;
        if (this.player) {
            ret = 10 * gameData.challenges[7].completed;
            ret *= Math.pow(0.99 - (gameData.world.currentTier - 1) / 100, gameData.world.currentWave);
        }
        if (ret < 0) {
            ret = 0;
        }
        else if (ret > 50) {
            ret = 50;
        }
        return ret;
    }
    ShotsPerSecond() {
        if (!this.player) {
            return this.baseShotsPerSec;
        }
        if (gameData.challenges[5].active || gameData.challenges[5].completed < 1) {
            return 1;
        }
        let ret = 1 + (gameData.challenges[5].completed + (gameData.rockUpgrades[10].bought));
        ret *= Math.pow(0.99 - (gameData.world.currentTier - 1) / 100, gameData.world.currentWave);
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
    critChance(playerShooting) {
        if (playerShooting) {
            if (gameData.challenges[6].active || gameData.challenges[6].completed < 1) {
                return 0;
            }
            let ret = 10 * gameData.challenges[6].completed;
            ret *= Math.pow(0.99 - (gameData.world.currentTier - 1) / 100, gameData.world.currentWave);
            return ret;
        }
        else {
            return 0;
        }
    }
    critMultiplier(playerShooting) {
        if (playerShooting) {
            if (gameData.challenges[6].active || gameData.challenges[6].completed < 1) {
                return 1;
            }
            let ret = 2 * (gameData.challenges[6].completed + 1);
            ret *= Math.pow(0.99 - ((gameData.world.currentTier - 1) / 100), gameData.world.currentWave);
            if (ret < 1) {
                ret = 1;
            }
            return ret;
        }
        else {
            return 1;
        }
    }
    recieveHit(attack) {
        const defensevalue = 100 - this.Defense();
        const attackValue = attack.multiply(defensevalue).divide(100);
        if (attackValue.greaterThan(0)) {
            this.damagetaken = this.damagetaken.add(attackValue);
        }
    }
    beTargeted(attacker) {
        let damage = attacker.Attack();
        let critchance = this.critChance(attacker.player);
        let crit = false;
        const multiplier = this.critMultiplier(attacker.player);
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
        this.bullets.push(new Bullet(attacker.pos.x, attacker.pos.y, this.pos.x, this.pos.y, damage, crit));
    }
    checkForHit() {
        for (let index = this.bullets.length - 1; index >= 0; index--) {
            const b = this.bullets[index];
            b.updateTarget(new Vector(this.pos.x, this.pos.y));
            b.move();
            if (b.getDistanceToTarget() <= 0) {
                this.recieveHit(b.damage);
                this.bullets.splice(index, 1);
            }
        }
    }
    expectedHitPointsRemaining(damage) {
        if (this.bullets.length === 0) {
            return this.CurrentHitPoints().divide(damage).ToNumber();
        }
        let leftoverHitpoints = this.CurrentHitPoints();
        this.bullets.forEach((b) => {
            leftoverHitpoints = leftoverHitpoints.subtract(b.damage);
        });
        return leftoverHitpoints.divide(damage).ToNumber();
    }
}
// eslint-disable-next-line no-unused-vars
class Tower extends fightingObject {
    constructor() {
        super(0, 0, true);
    }
    act() {
        this.checkForHit();
        if (this.CurrentHitPoints().lessThanOrEqualTo(0)) {
            return;
        }
        this.damagetaken = this.damagetaken.subtract(this.MaxHitPoints().multiply(((this.Heal() / 100) * gameData.world.currentTickLength) / 1000));
        if (this.damagetaken.lessThan(0)) {
            this.damagetaken = new JBDecimal(0);
        }
        this.ticksToNextBullet -= gameData.world.currentTickLength;
        const enemiesInRange = [];
        if (this.ticksToNextBullet <= 0) {
            if (gameData.enemies.length > 0) {
                gameData.enemies.forEach((e) => {
                    const len = e.pos.getLength(0, 0);
                    if (len <= this.Range() && e.expectedHitPointsRemaining(this.Attack()) > 0) {
                        enemiesInRange.push(e);
                    }
                });
            }
            if (enemiesInRange.length > 0) {
                // enemiesInRange.sort((a,b)=> (a.getDistanceToTarget() - b.getDistanceToTarget() || a.Attack().greaterThan(b.Attack()) || a.expectedHitPointsRemaining(this.Attack()).ceil - b.expectedHitPointsRemaining(this.Attack()).ceil));
                // enemiesInRange.sort((a, b) => (a.expectedHitPointsRemaining(this.Attack()) > b.expectedHitPointsRemaining(this.Attack())) ? 1 : -1)
                // enemiesInRange.sort((a, b) => (a.timeToTarget() > b.timeToTarget()) ? 1 : -1)
                enemiesInRange[0].beTargeted(this);
                this.ticksToNextBullet += this.ticksPerShot();
            }
            else {
                this.ticksToNextBullet = 0;
            }
        }
    }
}
// eslint-disable-next-line no-unused-vars
class Enemy extends fightingObject {
    constructor(wave, enemycount) {
        super(wave, enemycount);
        this.Enemy = true;
    }
    act() {
        this.checkForHit();
        if (this.CurrentHitPoints().lessThanOrEqualTo(0)) {
            return;
        }
        this.damagetaken = this.damagetaken.subtract(this.Heal());
        if (this.damagetaken.lessThan(0)) {
            this.damagetaken = new JBDecimal(0);
        }
        this.ticksToNextBullet -= gameData.world.currentTickLength;
        if (this.ticksToNextBullet <= 0) {
            if (this.Range() >= this.pos.getLength(0, 0)) {
                gameData.tower.beTargeted(this);
                this.ticksToNextBullet += this.ticksPerShot();
            }
            else {
                this.ticksToNextBullet = 0;
            }
        }
        this.move();
    }
    draw() {
        switch (this.type) {
            case (''):
            case ('Tank'): {
                display.DrawSolidSquare(this.CurrentHitPoints(), this.pos, 'white');
                break;
            }
            case ('Bradley'):
            case ('Fast'): {
                display.DrawSolidSquare(this.CurrentHitPoints(), this.pos, 'yellow');
                break;
            }
            case ('Trireme'):
            case ('Ranged'): {
                display.DrawSolidDiamond(this.CurrentHitPoints(), this.pos, 'white');
                break;
            }
            case ('Cavalier'):
            case ('Cannon'): {
                display.DrawSolidSquare(this.CurrentHitPoints(), this.pos, 'blue');
                break;
            }
            case ('Blitz'):
            case ('Scorpion'): {
                display.DrawTwoColorSquare(this.CurrentHitPoints(), this.pos, 'yellow', 'blue');
                break;
            }
            case ('Falcon'):
            case ('Paladin'): {
                display.DrawSolidDiamond(this.CurrentHitPoints(), this.pos, 'blue');
                break;
            }
            case ('Archer'):
            case ('Oliphant'): {
                display.DrawSolidDiamond(this.CurrentHitPoints(), this.pos, 'yellow');
                break;
            }
            case ('Titan'): {
                display.DrawTwoColorDiamond(this.CurrentHitPoints(), this.pos, 'yellow', 'blue');
                break;
            }
            case ('Boss'): {
                display.DrawSolidDiamond(this.CurrentHitPoints(), this.pos, 'red');
                break;
            }
            case (this.type): {
                display.addToDisplay('Missing enemy draw', 'challenge');
            }
        }
    }
    update() {
        this.draw();
    }
}
//# sourceMappingURL=Tower.js.map