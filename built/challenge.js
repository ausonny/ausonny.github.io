class Challenge {
    constructor(name, description, bonusDescription, startingWaveToComplete, wavePerComplete) {
        this.name = name;
        this.description = description;
        this.bonusDescription = bonusDescription;
        this.completed = 0;
        this.active = false;
        this.wavePerComplete = wavePerComplete;
        this.startingWaveToComplete = startingWaveToComplete;
    }
    setActive() {
        this.active = true;
        init(1);
        addToDisplay('Challenge ' + this.name + ' begun', 'challenge');
    }
    quit() {
        this.active = false;
        addToDisplay('Challenge exited', 'challenge');
        init(1);
    }
    waveRequiredforCompletion() {
        var waveper = this.wavePerComplete - gameData.boulderUpgrades[0].bought;
        var ret = (this.completed * waveper) + this.startingWaveToComplete;
        return ret;
    }
    checkForCompletion() {
        if (gameData.world.currentWave > this.waveRequiredforCompletion()) {
            this.completed += 1;
            addToDisplay(this.name + ' #' + this.completed + ' completed', 'challenge');
            CheckAchievementCompletions();
            //this.quit()
        }
    }
}
//# sourceMappingURL=challenge.js.map