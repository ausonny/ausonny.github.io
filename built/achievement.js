/* global JBDecimal, display, gameData, getCurrentPebbleRate */
let achievementbonusarray;
achievementbonusarray = [];
let lastachievementcount = 0;
// eslint-disable-next-line no-unused-vars
class Achievement {
    constructor(index, name, desc, aIndex, aValue) {
        this.index = index;
        this.name = name;
        this.desc = desc;
        this.completed = false;
        this.aIndex = aIndex;
        this.aValue = new JBDecimal(aValue);
    }
    writeToBoard() {
        display.addToDisplay('Achievement completed: ' + this.desc, 'achievement');
    }
    checkforCompletion() {
        if (this.completed) {
            return;
        }
        if (this.name.slice(0, 5) === 'Miner' || this.name.slice(0, 10) === 'Supervisor' || this.name.slice(0, 7) === 'Foreman' || this.name.slice(0, 7) === 'Manager' || this.name.slice(0, 17) === 'Middle Management' || this.name.slice(0, 16) === 'Upper Management' || this.name.slice(0, 14) === 'Vice President' || this.name.slice(0, 9) === 'President') {
            if (this.aValue.lessThanOrEqualTo(gameData.derivatives[this.aIndex].bought)) {
                this.completed = true;
                this.writeToBoard();
            }
        }
        if (this.name.slice(0, 4) === 'Wave') {
            if (gameData.world.currentWave > this.aValue.ToNumber()) {
                this.completed = true;
                this.writeToBoard();
            }
        }
        if (this.name.slice(0, 6) === 'Attack') {
            if (gameData.tower.Attack().greaterThanOrEqualTo(this.aValue)) {
                this.completed = true;
                this.writeToBoard();
            }
        }
        if (this.name.slice(0, 9) === '1Prestige') {
            if (gameData.stats.prestige1 >= (this.aValue).ToNumber()) {
                this.completed = true;
                this.writeToBoard();
            }
        }
        if (this.name.slice(0, 9) === '2Prestige') {
            if (gameData.stats.prestige2 >= (this.aValue).ToNumber()) {
                this.completed = true;
                this.writeToBoard();
            }
        }
        if (this.name.slice(0, 9) === '3Prestige') {
            if (gameData.stats.prestige3 >= (this.aValue).ToNumber()) {
                this.completed = true;
                this.writeToBoard();
            }
        }
        if (this.name.slice(0, 10) === 'PebblesPer') {
            if (getCurrentPebbleRate().greaterThanOrEqualTo(this.aValue)) {
                this.completed = true;
                this.writeToBoard();
            }
        }
        if (this.name.slice(0, 12) === 'CompleteTier') {
            if (gameData.world.tierUnlocked > (this.aValue).ToNumber()) {
                this.completed = true;
                this.writeToBoard();
            }
        }
        if (this.name.slice(0, 14) === 'TierNoManagers') {
            if (gameData.world.currentWave > 100) {
                if (gameData.world.currentTier >= this.aValue.ToNumber()) {
                    if (gameData.derivatives[3].owned.equals(0)) {
                        this.completed = true;
                        this.writeToBoard();
                    }
                }
            }
        }
        if (this.name.slice(0, 13) === 'TierChallenge') {
            if (gameData.world.currentWave > 100) {
                if (gameData.world.currentTier >= this.aValue.ToNumber()) {
                    gameData.challenges.forEach((ch) => {
                        if (ch.active) {
                            this.completed = true;
                            this.writeToBoard();
                        }
                    });
                }
            }
        }
        let challegesCompleted = 0;
        gameData.challenges.forEach((ch) => {
            challegesCompleted = challegesCompleted += ch.completed;
        });
        if (this.name.slice(0, 9) === 'Challenge') {
            if (this.aValue.lessThanOrEqualTo(challegesCompleted)) {
                this.completed = true;
                this.writeToBoard();
            }
        }
    }
}
// eslint-disable-next-line no-unused-vars
function getAchievementsOnlyBonus() {
    if (achievementbonusarray.length <= lastachievementcount) {
        display.addToDisplay('Consider upping the initial achievementbonusarray', 'story');
        achievementbonusarray = [];
        let total = 0;
        for (let index = 0; index <= (lastachievementcount * 1.1); index++) {
            total += index;
            achievementbonusarray.push(total);
        }
    }
    return (achievementbonusarray[lastachievementcount] + 100) / 100;
}
// eslint-disable-next-line no-unused-vars
function getTier1FeatBonus() {
    let tier1completed = 1; // no completions gives a multiplier of 1, 1 gives 2, 2 gives 3, etc.
    gameData.tier1Feats.forEach((f) => {
        if (f.completed) {
            tier1completed++;
        }
    });
    return tier1completed;
}
// eslint-disable-next-line no-unused-vars
function getTier2FeatBonus() {
    let tiercompleted = 1; // no completions gives a multiplier of 1, 1 gives 2, 2 gives 3, etc.
    gameData.tier2Feats.forEach((f) => {
        if (f.completed) {
            tiercompleted++;
        }
    });
    return tiercompleted;
}
// eslint-disable-next-line no-unused-vars
function CheckAchievementCompletions() {
    lastachievementcount = 0;
    gameData.Achievements.forEach((ch) => {
        ch.checkforCompletion();
        if (ch.completed) {
            lastachievementcount++;
        }
    });
    gameData.tier1Feats.forEach((ch) => { ch.checkforCompletion(); });
    gameData.tier2Feats.forEach((ch) => { ch.checkforCompletion(); });
}
// eslint-disable-next-line no-unused-vars
function getAchievementBonus() {
    return (getAchievementsOnlyBonus() * getTier1FeatBonus() * getTier2FeatBonus());
}
//# sourceMappingURL=achievement.js.map