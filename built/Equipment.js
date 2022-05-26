/* global Purchasable, Upgrade, Challenge, Resource, JBDecimal, gameData, getAchievementBonus */
// eslint-disable-next-line no-unused-vars
class Equipment extends Purchasable {
    constructor(name, index, cost, costMultiplier, resource, upgraderesource, buyButton, dustUpgradeButton, dustUpgradeBaseCost, dustUpgradeCostMultiplier, basicUpgrade, basicChallenge, inflationFloor) {
        let upgradeable = true;
        if (basicUpgrade.name === 'd') {
            upgradeable = false;
        }
        super(cost, costMultiplier, resource, dustUpgradeBaseCost, dustUpgradeCostMultiplier, upgraderesource, inflationFloor, 0, buyButton, upgradeable, dustUpgradeButton);
        this.name = name;
        this.index = index;
        this.basicUpgrade = basicUpgrade;
        this.basiChallenge = basicChallenge;
    }
    productionPerUnit() {
        let ret = new JBDecimal(this.basicUpgrade.owned);
        ret = ret.add(this.upgradeLevel);
        if (this.basiChallenge.completed > 0) {
            ret = ret.add(this.basiChallenge.completed);
        }
        if (gameData.rockUpgrades[4].bought > 0 && this.index === 0) {
            ret = ret.multiply(new JBDecimal(2).pow(gameData.rockUpgrades[4].bought));
        }
        else if (gameData.rockUpgrades[8].bought > 0 && this.index === 1) {
            ret = ret.multiply(new JBDecimal(2).pow(gameData.rockUpgrades[8].bought));
        }
        ret = ret.add(1);
        ret = ret.multiply(getAchievementBonus());
        if (gameData.upgrades[17].owned.greaterThan(0)) {
            const perlevel = gameData.upgrades[17].owned.ToNumber() / 100;
            const qtymult = new JBDecimal(perlevel).multiply(this.bought).add(1);
            ret = ret.multiply(qtymult);
        }
        ret = ret.multiply(0.1);
        return ret;
    }
    production() {
        return this.productionPerUnit().multiply(this.owned.add(this.basiChallenge.completed + this.basicUpgrade.bought));
    }
}
//# sourceMappingURL=Equipment.js.map