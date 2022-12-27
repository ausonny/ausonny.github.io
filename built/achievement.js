let achievementbonusarray;
achievementbonusarray = [];
let lastachievementcount = 0;
// eslint-disable-next-line no-unused-vars
class Achievements {
    constructor(index, name, desc, completionValues, secondaryValue, parentdiv = document.getElementById('AchievementSection'), amtier = false) {
        this.index = index;
        this.name = name;
        this.desc = desc;
        this.completed = 0;
        this.secondaryValue = secondaryValue;
        this.completionValues = completionValues;
        this.lastCalculated = new JBDecimal(0);
        this.amTier = amtier;
        this.UIDisplay = document.createElement('div');
        this.UIDisplay.innerHTML = this.desc;
        this.UIDisplay.classList.add('col-2', 'm-1', 'p-1', 'text-light', 'text-center', 'align-items-center', 'text-small', 'upgradebutton');
        if (this.completed) {
            this.UIDisplay.classList.add('bg-success');
            this.UIDisplay.classList.remove('bg-danger');
        }
        else {
            this.UIDisplay.classList.add('bg-danger');
            this.UIDisplay.classList.remove('bg-success');
        }
        this.UIDisplay.id = `Achievement${this.index}`;
        parentdiv.appendChild(this.UIDisplay);
    }
    draw() {
        this.UIDisplay.innerHTML = `${this.desc}`;
        if (this.completed === this.completionValues.length) {
            this.UIDisplay.classList.add('bg-success');
            this.UIDisplay.classList.remove('bg-danger');
            this.UIDisplay.classList.remove('bg-primary');
            if (!this.amTier) {
                const completionLevels = `<br /><br />${this.completed} / ${this.completionValues.length}`;
                this.UIDisplay.innerHTML += completionLevels;
            }
        }
        else if (this.completed === 0) {
            this.UIDisplay.classList.add('bg-danger');
            this.UIDisplay.classList.remove('bg-success');
            this.UIDisplay.classList.remove('bg-primary');
            if (!this.amTier) {
                const neededLevels = `<br />${this.lastCalculated} / ${this.completionValues[this.completed].toString()}`;
                const completionLevels = `<br />${this.completed} / ${this.completionValues.length}`;
                this.UIDisplay.innerHTML += neededLevels + completionLevels;
            }
        }
        else {
            this.UIDisplay.classList.remove('bg-danger');
            this.UIDisplay.classList.remove('bg-success');
            this.UIDisplay.classList.add('bg-primary');
            if (!this.amTier) {
                const neededLevels = `<br />${this.lastCalculated} / ${this.completionValues[this.completed].toString()}`;
                const completionLevels = `<br />${this.completed} / ${this.completionValues.length}`;
                this.UIDisplay.innerHTML += neededLevels + completionLevels;
            }
        }
    }
    writeToBoard(feat = false) {
        if (feat) {
            display.addToDisplay(`Feat completed: ${this.desc}`, DisplayCategory.Achievement);
        }
        else {
            display.addToDisplay(`Achievement completed: ${this.desc} ${this.completionValues[this.completed]}`, DisplayCategory.Achievement);
        }
    }
    checkforCompletion() {
        if (this.name === 'Resource') {
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                let total = new JBDecimal(0);
                gameData.buildings.forEach((b) => {
                    if (b.type === 'LumberJack') {
                        total = total.add(b.woodProductionPerSec());
                    }
                    else if (b.type === 'StoneMason') {
                        total = total.add(b.stoneProductionPerSec());
                    }
                });
                this.lastCalculated = new JBDecimal(total);
                if (e.lessThanOrEqualTo(total)) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
        if (this.name === 'Survivor') {
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                this.lastCalculated = new JBDecimal(gameData.world.currentWave);
                if (this.lastCalculated.greaterThan(e) && gameData.world.deathLevel === 0) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
        if (this.name === 'Population') {
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                this.lastCalculated = new JBDecimal(gameData.resources.people.amount);
                if (this.lastCalculated.greaterThan(e)) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
        if (this.name === 'Wave') {
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                this.lastCalculated = new JBDecimal(gameData.world.currentWave);
                if (this.lastCalculated.greaterThan(e) && gameData.world.currentTier === 1) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
        if (this.name.slice(0, 8) === 'Building') {
            let towers = 0;
            for (let index = 0; index < gameData.buildings.length; index++) {
                const element = gameData.buildings[index];
                if (element.type !== '') {
                    towers += element.bought;
                }
            }
            this.lastCalculated = new JBDecimal(towers);
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                if (this.lastCalculated.greaterThanOrEqualTo(e)) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
        if (this.name === 'Attack') {
            let totalAttack = new JBDecimal(0);
            for (let index = 0; index < gameData.buildings.length; index++) {
                const element = gameData.buildings[index];
                totalAttack = totalAttack.add(element.arrowAttackValue().multiply(element.bought));
                totalAttack = totalAttack.add(element.catapultAttackValue().multiply(element.bought));
                totalAttack = totalAttack.add(element.poisonAttackValue().multiply(element.bought));
            }
            this.lastCalculated = new JBDecimal(totalAttack);
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                if (this.lastCalculated.greaterThanOrEqualTo(e)) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
        if (this.name === '1Prestige') {
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                this.lastCalculated = new JBDecimal(gameData.stats.prestige1);
                if (e.lessThanOrEqualTo(this.lastCalculated)) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
        if (this.name === '2Prestige') {
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                this.lastCalculated = new JBDecimal(gameData.stats.prestige2);
                if (e.lessThanOrEqualTo(this.lastCalculated)) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
        if (this.name === '3Prestige') {
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                this.lastCalculated = new JBDecimal(gameData.stats.prestige3);
                if (e.lessThanOrEqualTo(this.lastCalculated)) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
        if (this.name === 'PowderPer') {
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                this.lastCalculated = new JBDecimal(getCurrentPowderRate());
                if (this.lastCalculated.greaterThanOrEqualTo(e)) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
        if (this.name === 'CompleteTier') {
            if (this.completed < 1) {
                if (gameData.world.currentWave > 90 + gameData.world.currentTier * 10) {
                    if (gameData.world.currentTier >= this.secondaryValue) {
                        this.completed = 1;
                        this.writeToBoard(true);
                        return;
                    }
                }
            }
        }
        if (this.name === 'TierChallenge') {
            if (this.completed < 1) {
                if (gameData.world.currentWave > 90 + gameData.world.currentTier * 10) {
                    if (gameData.world.currentTier >= this.secondaryValue) {
                        let complete = false;
                        gameData.challenges.forEach((ch) => {
                            if (ch.active) {
                                complete = true;
                            }
                        });
                        if (complete) {
                            this.writeToBoard(true);
                            this.completed = 1;
                        }
                    }
                }
            }
        }
        // if (this.name.slice(0, 14) === 'TierDerivative') {
        //   if (this.completed < 1) {
        //     if (gameData.world.currentWave > 90 + gameData.world.currentTier * 10) {
        //       if (gameData.world.currentTier >= this.secondaryValue) {
        //         if (gameData.upgrades[8].bought === 0) {
        //           this.completed = 1;
        //           this.writeToBoard(true);
        //           return;
        //         }
        //       }
        //     }
        //   }
        // }
        const challengesCompleted = getChallengesCompleted();
        if (this.name === 'TierNoChallenge') {
            if (this.completed < 1) {
                if (gameData.world.currentWave > 90 + gameData.world.currentTier * 10) {
                    if (gameData.world.currentTier >= this.secondaryValue) {
                        if (challengesCompleted === 0) {
                            this.completed = 1;
                            this.writeToBoard(true);
                            return;
                        }
                    }
                }
            }
        }
        if (this.name === 'TierNoResearch') {
            if (this.completed < 1) {
                if (gameData.world.currentWave > 90 + gameData.world.currentTier * 10) {
                    if (gameData.world.currentTier >= this.secondaryValue) {
                        let good = true;
                        gameData.researches.forEach((element) => {
                            if (element.bought > 0) {
                                good = false;
                            }
                        });
                        if (good) {
                            this.completed = 1;
                            this.writeToBoard(true);
                            return;
                        }
                    }
                }
            }
        }
        if (this.name === 'Challenge') {
            for (let index = this.completed; index < this.completionValues.length; index++) {
                const e = this.completionValues[index];
                this.lastCalculated = new JBDecimal(challengesCompleted);
                if (e.lessThanOrEqualTo(this.lastCalculated)) {
                    this.writeToBoard();
                    this.completed += 1;
                }
            }
        }
    }
}
class Feat extends Achievements {
    constructor(index, name, desc, tier, parentDiv) {
        super(index, name, desc, [new JBDecimal(0)], tier, parentDiv, true);
        this.tier = tier;
        this.UIDisplay.id = `Tier${this.tier}Feat${this.index}`;
    }
}
class TierFeats {
    constructor() {
        this.feats = [];
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createFeatsForTier(tier) {
    const TierRow1 = document.createElement('div');
    TierRow1.classList.add('row', 'p-0', 'm-0');
    document.getElementById('TierSection').appendChild(TierRow1);
    const tierInfoCol = document.createElement('div');
    tierInfoCol.classList.add('col-6', 'p-0', 'm-0', 'text-light', 'text-end');
    const tierInfo = document.createElement('span');
    tierInfo.id = `Tier${tier.toString()}`;
    tierInfo.innerHTML = `Tier ${tier.toString()}: `;
    tierInfoCol.appendChild(tierInfo);
    TierRow1.appendChild(tierInfoCol);
    const tierBonusCol = document.createElement('div');
    tierBonusCol.classList.add('col-6', 'p-0', 'm-0', 'text-light', 'text-start');
    const tierBonusInfo = document.createElement('span');
    tierBonusInfo.id = `Tier${tier.toString()}Bonus`;
    tierBonusCol.appendChild(tierBonusInfo);
    TierRow1.appendChild(tierBonusCol);
    const TierRow2 = document.createElement('div');
    TierRow2.classList.add('row', 'p-0', 'm-0');
    document.getElementById('TierSection').appendChild(TierRow2);
    // const tier2Col = document.createElement('div');
    // tier2Col.classList.add('col-12', 'p-0', 'm-0', 'text-light', 'text-center');
    // TierRow2.appendChild(tier2Col);
    const feats = new TierFeats();
    feats.feats.push(new Feat(1, 'CompleteTier', `Complete Tier ${tier.toString()}`, tier, TierRow2));
    feats.feats.push(new Feat(2, 'TierChallenge', `Complete Tier ${+tier.toString()} with a challenge active`, tier, TierRow2));
    feats.feats.push(new Feat(3, 'TierNoChallenge', `Complete Tier ${tier.toString()} with no challenges completed`, tier, TierRow2));
    feats.feats.push(new Feat(4, 'TierNoResearch', `Complete Tier ${tier.toString()} with no research completed`, tier, TierRow2));
    return feats;
}
function createAchievementBonusArray(size, initial = false) {
    if (!initial) {
        display.addToDisplay('Consider upping the initial achievementbonusarray', DisplayCategory.Story);
    }
    achievementbonusarray = [];
    let total = 0;
    for (let index = 0; index <= size * 1.1; index++) {
        total += index;
        achievementbonusarray.push(total);
    }
}
// eslint-disable-next-line no-unused-vars
function getAchievementsOnlyBonus() {
    if (achievementbonusarray.length <= lastachievementcount) {
        createAchievementBonusArray(lastachievementcount);
    }
    return (achievementbonusarray[lastachievementcount] + 100) / 100;
}
function getTierBonus(tier) {
    let tiercompleted = 1; // no completions gives a multiplier of 1, 1 gives 2, 2 gives 3, etc.
    gameData.tierfeats[tier].feats.forEach((f) => {
        if (f.completed) {
            tiercompleted += 1;
        }
    });
    return tiercompleted;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CheckAchievementCompletions() {
    let count = 0;
    gameData.Achievements.forEach((ch) => {
        ch.checkforCompletion();
        count += ch.completed;
    });
    gameData.tierfeats.forEach((tf) => {
        tf.feats.forEach((f) => {
            f.checkforCompletion();
        });
    });
    lastachievementcount = count;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAchievementBonus() {
    let bonus = getAchievementsOnlyBonus();
    gameData.tierfeats.forEach((tf, index) => {
        bonus *= getTierBonus(index);
    });
    return bonus;
}
//# sourceMappingURL=achievement.js.map