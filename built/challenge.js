// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Challenge {
    constructor(name, description, bonusDescription, startingWaveToComplete, wavePerComplete) {
        this.name = name;
        this.description = description;
        this.bonusDescription = bonusDescription;
        this.completed = 0;
        this.active = false;
        this.wavePerComplete = wavePerComplete;
        this.startingWaveToComplete = startingWaveToComplete;
        this.available = false;
    }
    setActive() {
        this.active = true;
        init(1);
        display.addToDisplay(`Challenge ${this.name} begun`, DisplayCategory.Challenge);
        dirtyTowers = true;
    }
    quit() {
        this.active = false;
        display.addToDisplay('Challenge exited', DisplayCategory.Challenge);
        dirtyTowers = true;
    }
    fail() {
        this.active = false;
        display.addToDisplay('Challenge failed!', DisplayCategory.Challenge);
        dirtyTowers = true;
    }
    waveRequiredforCompletion() {
        const waveper = this.wavePerComplete - gameData.boulderUpgrades[0].bought;
        return this.completed * waveper + this.startingWaveToComplete;
    }
    checkForCompletion() {
        if (gameData.world.currentWave > this.waveRequiredforCompletion()) {
            this.completed += 1;
            display.addToDisplay(`${this.name} #${this.completed} completed`, DisplayCategory.Challenge);
            CheckAchievementCompletions();
        }
    }
    updateDisplay(index) {
        let spanName = `challenge${index.toString()}Description`;
        document.getElementById(spanName).innerHTML = this.description;
        spanName = `challenge${index.toString()}Bonus`;
        document.getElementById(spanName).innerHTML = this.bonusDescription;
        spanName = `challenge${index.toString()}Completed`;
        document.getElementById(spanName).innerHTML = this.completed.toString();
        spanName = `challenge${index.toString()}DustNeeded`;
        document.getElementById(spanName).innerHTML = this.waveRequiredforCompletion().toString();
        const startName = `btnChallenge${index.toString()}Start`;
        if (this.active) {
            document.getElementById(startName).classList.add('hiddenSpaceTaken');
        }
        else {
            document.getElementById(startName).classList.remove('hiddenSpaceTaken');
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getChallengesCompleted() {
    let challengesCompleted = 0;
    gameData.challenges.forEach((ch) => {
        challengesCompleted += ch.completed;
    });
    return challengesCompleted;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ActiveChallenges() {
    let ret = 0;
    gameData.challenges.forEach((c) => {
        if (c.active) {
            ret += 1;
        }
    });
    return ret;
}
//# sourceMappingURL=challenge.js.map