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
    updateDisplay(index) {
        let spanName = 'challenge' + index.toString() + 'Description';
        document.getElementById(spanName).innerHTML = this.description;
        spanName = 'challenge' + index.toString() + 'Bonus';
        document.getElementById(spanName).innerHTML = this.bonusDescription;
        spanName = 'challenge' + index.toString() + 'Completed';
        document.getElementById(spanName).innerHTML = this.completed.toString();
        spanName = 'challenge' + index.toString() + 'DustNeeded';
        document.getElementById(spanName).innerHTML = this.waveRequiredforCompletion().toString();
        const startName = 'btnChallenge' + index.toString() + 'Start';
        if (this.active) {
            document.getElementById(startName).classList.add('hidden');
        }
        else {
            document.getElementById(startName).classList.remove('hidden');
        }
    }
}
//# sourceMappingURL=challenge.js.map