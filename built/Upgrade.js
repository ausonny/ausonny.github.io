/* global JBDecimal, Purchasable, Resource, gameData */
// eslint-disable-next-line no-unused-vars
class Upgrade extends Purchasable {
    // 1 prestige1's
    // 2 power of 10
    // 3 square root of pebbles available
    // 4 number of upgrades bought
    // 5 sqare root of time in prestige dividied by ten minutes
    // 6 10% per multiplicative
    // 7 1% per additive
    constructor(name, description, baseCost, costMultiplier, resource, buyButton, limit, bonustype) {
        super(baseCost, costMultiplier, resource, 0, 1, new Resource('dummy'), 0, limit, buyButton, false, buyButton);
        this.name = name;
        this.description = description;
        this.bonusType = bonustype;
    }
    getBonus() {
        const ret = new JBDecimal(1);
        if (this.bonusType === 1) {
            if (this.bought === 0) {
                return ret;
            }
            else {
                return new JBDecimal(Math.sqrt(gameData.stats.prestige1));
            }
        }
        else if (this.bonusType === 2) {
            if (this.bought >= 1) {
                return new JBDecimal(10).pow(this.bought);
            }
        }
        else if (this.bonusType === 3) {
            if (this.bought >= 1 && gameData.resources.pebbles.amount.exponent > 0) {
                return new JBDecimal(Math.sqrt(gameData.resources.pebbles.amount.exponent + 1));
            }
        }
        else if (this.bonusType === 4) {
            return new JBDecimal(this.bought);
        }
        else if (this.bonusType === 5) {
            if (this.bought >= 1) {
                return new JBDecimal(Math.sqrt(1 + (gameData.stats.prestige1ticks / 600000)));
            }
        }
        else if (this.bonusType === 6) {
            if (this.bought >= 1) {
                return new JBDecimal(1.1).pow(this.bought);
            }
        }
        else if (this.bonusType === 7) {
            return new JBDecimal(this.bought / 100);
        }
        return ret;
    }
    updateDisplay() {
        super.updateDisplay();
        this.buyButton.innerHTML += this.description;
        this.buyButton.innerHTML += '<br />' + this.bought.toString() + '/' + (this.limit + this.addedlimit).toString();
    }
}
//# sourceMappingURL=Upgrade.js.map