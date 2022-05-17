/* global init, addToDisplay, gameData, CheckAchievementCompletions */
// eslint-disable-next-line no-unused-vars
class Challenge {
  name: string;

  description: string;

  bonusDescription: string;

  completed: number;

  active: boolean;

  wavePerComplete: number;

  startingWaveToComplete: number;

  constructor (name: string, description: string, bonusDescription: string, startingWaveToComplete: number, wavePerComplete: number) {
    this.name = name;
    this.description = description;
    this.bonusDescription = bonusDescription;
    this.completed = 0;
    this.active = false;
    this.wavePerComplete = wavePerComplete;
    this.startingWaveToComplete = startingWaveToComplete;
  }

  setActive () {
    this.active = true;
    init(1);
    addToDisplay('Challenge ' + this.name + ' begun', 'challenge');
  }

  quit () {
    this.active = false;
    addToDisplay('Challenge exited', 'challenge');
    init(1);
  }

  waveRequiredforCompletion () {
    const waveper = this.wavePerComplete - gameData.boulderUpgrades[0].bought;
    return (this.completed * waveper) + this.startingWaveToComplete;
  }

  checkForCompletion () {
    if (gameData.world.currentWave > this.waveRequiredforCompletion()) {
      this.completed += 1;
      addToDisplay(this.name + ' #' + this.completed + ' completed', 'challenge');
      CheckAchievementCompletions();
      // this.quit()
    }
  }
}
