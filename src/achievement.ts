/* global JBDecimal, addToDisplay, gameData, getCurrentPebbleRate */

// eslint-disable-next-line no-unused-vars
class Achievement {
  index: number;

  name: string;

  desc: string;

  completed: boolean;

  aIndex: number;

  aValue: JBDecimal;
  constructor (
    index: number,
    name: string,
    desc: string,
    aIndex: number,
    aValue: number
  ) {
    this.index = index;
    this.name = name;
    this.desc = desc;
    this.completed = false;
    this.aIndex = aIndex;
    this.aValue = new JBDecimal(aValue);
  }

  writeToBoard () {
    addToDisplay('Achievement completed: ' + this.desc, 'achievement');
  }

  checkforCompletion () {
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
