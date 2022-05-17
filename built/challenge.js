/* global init, display, gameData, CheckAchievementCompletions */
// eslint-disable-next-line no-unused-vars
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
        display.addToDisplay('Challenge ' + this.name + ' begun', 'challenge');
    }
    quit() {
        this.active = false;
        display.addToDisplay('Challenge exited', 'challenge');
        init(1);
    }
    waveRequiredforCompletion() {
        const waveper = this.wavePerComplete - gameData.boulderUpgrades[0].bought;
        return (this.completed * waveper) + this.startingWaveToComplete;
    }
    checkForCompletion() {
        if (gameData.world.currentWave > this.waveRequiredforCompletion()) {
            this.completed += 1;
            display.addToDisplay(this.name + ' #' + this.completed + ' completed', 'challenge');
            CheckAchievementCompletions();
            // this.quit()
        }
    }
}
//# sourceMappingURL=challenge.js.map