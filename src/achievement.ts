let achievementbonusarray: number[];
achievementbonusarray = [];

let lastachievementcount = 0;
// eslint-disable-next-line no-unused-vars
class Achievement {
  index: number;

  name: string;

  desc: string;

  completed: boolean;

  aIndex: number;

  aValue: JBDecimal;

  UIDisplay: HTMLElement;

  constructor(index: number, name: string, desc: string, aIndex: number, aValue: number, parentdiv: HTMLElement = document.getElementById('AchievementSection')) {
    this.index = index;
    this.name = name;
    this.desc = desc;
    this.completed = false;
    this.aIndex = aIndex;
    this.aValue = new JBDecimal(aValue);

    this.UIDisplay = document.createElement('div');

    this.UIDisplay.innerHTML = this.desc;
    this.UIDisplay.classList.add('col-1', 'm-1', 'p-1', 'text-light', 'text-center', 'align-items-center', 'text-small', 'achievementbutton');

    if (this.completed) {
      this.UIDisplay.classList.add('bg-success');
      this.UIDisplay.classList.remove('bg-danger');
    } else {
      this.UIDisplay.classList.add('bg-danger');
      this.UIDisplay.classList.remove('bg-success');
    }

    this.UIDisplay.id = `Achievement${this.index}`;

    parentdiv.appendChild(this.UIDisplay);

    // if (tier > 1) {
    //   document.getElementById('TierSection').appendChild(this.UIDisplay);
    // } else {
    //   document.getElementById('AchievementSection').appendChild(this.UIDisplay);
    // }
  }

  draw() {
    if (this.completed) {
      this.UIDisplay.classList.add('bg-success');
      this.UIDisplay.classList.remove('bg-danger');
    } else {
      this.UIDisplay.classList.add('bg-danger');
      this.UIDisplay.classList.remove('bg-success');
    }
  }

  writeToBoard() {
    display.addToDisplay(`Achievement completed: ${this.desc}`, DisplayCategory.Achievement);
  }

  checkforCompletion() {
    if (this.completed) {
      return;
    }

    if (this.name.slice(0, 5) === 'Miner') {
      if (this.aValue.lessThanOrEqualTo(gameData.derivatives[this.aIndex].bought)) {
        this.completed = true;
        this.writeToBoard();
        return;
      }
    }

    if (this.name.slice(0, 4) === 'Wave') {
      if (gameData.world.currentWave > this.aValue.ToNumber()) {
        this.completed = true;
        this.writeToBoard();
        return;
      }
    }

    if (this.name.slice(0, 5) === 'Tower') {
      let towers = 0;
      for (let index = 0; index < gameData.towers.length; index++) {
        const element = gameData.towers[index];
        if (element.type !== '') {
          towers += element.bought;
        }
      }
      if (towers >= this.aValue.ToNumber()) {
        this.completed = true;
        this.writeToBoard();
        return;
      }
    }

    if (this.name.slice(0, 6) === 'Attack') {
      let totalAttack = new JBDecimal(0);
      for (let index = 0; index < gameData.towers.length; index++) {
        const element = gameData.towers[index];
        if (element.type === 'Gun' || element.type === 'Cannon' || element.type === 'Missile') {
          totalAttack = totalAttack.add(element.AttackValue());
        }
      }
      if (totalAttack.greaterThanOrEqualTo(this.aValue)) {
        this.completed = true;
        this.writeToBoard();
        return;
      }
    }

    if (this.name.slice(0, 9) === '1Prestige') {
      if (gameData.stats.prestige1 >= this.aValue.ToNumber()) {
        this.completed = true;
        this.writeToBoard();
        return;
      }
    }

    if (this.name.slice(0, 9) === '2Prestige') {
      if (gameData.stats.prestige2 >= this.aValue.ToNumber()) {
        this.completed = true;
        this.writeToBoard();
        return;
      }
    }

    if (this.name.slice(0, 9) === '3Prestige') {
      if (gameData.stats.prestige3 >= this.aValue.ToNumber()) {
        this.completed = true;
        this.writeToBoard();
        return;
      }
    }

    if (this.name.slice(0, 10) === 'PebblesPer') {
      if (getCurrentPebbleRate().greaterThanOrEqualTo(this.aValue)) {
        this.completed = true;
        this.writeToBoard();
        return;
      }
    }

    if (this.name.slice(0, 12) === 'CompleteTier') {
      if (gameData.world.currentWave > 90 + gameData.world.currentTier * 10) {
        if (gameData.world.currentTier >= this.aValue.ToNumber()) {
          this.completed = true;
          this.writeToBoard();
          return;
        }
      }
    }

    if (this.name.slice(0, 13) === 'TierChallenge') {
      if (gameData.world.currentWave > 90 + gameData.world.currentTier * 10) {
        if (gameData.world.currentTier >= this.aValue.ToNumber()) {
          let complete = false;
          gameData.challenges.forEach((ch) => {
            if (ch.active) {
              complete = true;
            }
          });
          if (complete) {
            this.writeToBoard();
            this.completed = true;
          }
        }
      }
    }

    if (this.name.slice(0, 14) === 'TierDerivative') {
      if (gameData.world.currentWave > 90 + gameData.world.currentTier * 10) {
        if (gameData.world.currentTier >= this.aValue.ToNumber()) {
          if (gameData.upgrades[8].bought === 0) {
            this.completed = true;
            this.writeToBoard();
            return;
          }
        }
      }
    }
    const challengesCompleted = getChallengesCompleted();

    if (this.name.slice(0, 15) === 'TierNoChallenge') {
      if (gameData.world.currentWave > 90 + gameData.world.currentTier * 10) {
        if (gameData.world.currentTier >= this.aValue.ToNumber()) {
          if (challengesCompleted === 0) {
            this.completed = true;
            this.writeToBoard();
            return;
          }
        }
      }
    }

    if (this.name.slice(0, 9) === 'Challenge') {
      if (this.aValue.lessThanOrEqualTo(challengesCompleted)) {
        this.completed = true;
        this.writeToBoard();
      }
    }
  }
}

class Feat extends Achievement {
  tier: number;

  constructor(index: number, name: string, desc: string, aIndex: number, aValue: number, tier: number, parentDiv: HTMLElement) {
    super(index, name, desc, aIndex, aValue, parentDiv);

    this.tier = tier;

    this.UIDisplay.id = `Tier${this.tier}Feat${this.index}`;
  }
}

class TierFeats {
  feats: Feat[];

  constructor() {
    this.feats = [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createFeatsForTier(tier: number) {
  const TierRow = document.createElement('div');
  TierRow.classList.add('row', 'p-0', 'm-0');
  document.getElementById('TierSection').appendChild(TierRow);

  const tierInfoCol = document.createElement('div');
  tierInfoCol.classList.add('col-1', 'p-0', 'm-0', 'text-light', 'text-start');
  const tierInfo = document.createElement('span');
  tierInfo.id = `Tier${tier.toString()}`;
  tierInfo.innerHTML = `Tier ${tier.toString()}`;
  tierInfoCol.appendChild(tierInfo);
  TierRow.appendChild(tierInfoCol);

  const tierBonusCol = document.createElement('div');
  tierBonusCol.classList.add('col-1', 'p-0', 'm-0', 'text-light', 'text-start');
  const tierBonusInfo = document.createElement('span');
  tierBonusInfo.id = `Tier${tier.toString()}Bonus`;
  tierBonusCol.appendChild(tierBonusInfo);
  TierRow.appendChild(tierBonusCol);

  const feats = new TierFeats();
  feats.feats.push(new Feat(1, `CompleteTier${tier.toString()}`, `Complete Tier ${tier.toString()}`, 1, tier, tier, TierRow));
  feats.feats.push(new Feat(2, `TierChallenge${tier.toString()}`, `Complete Tier ${+tier.toString()} with a challenge active`, 1, tier, tier, TierRow));
  feats.feats.push(new Feat(3, `TierDerivative${tier.toString()}`, `Complete Tier ${tier.toString()} with no unlocked metal producers`, 1, tier, tier, TierRow));
  feats.feats.push(new Feat(4, `TierNoChallenge${tier.toString()}`, `Complete Tier ${tier.toString()} with no challenges completed`, 1, tier, tier, TierRow));
  return feats;
}

// eslint-disable-next-line no-unused-vars
function getAchievementsOnlyBonus() {
  if (achievementbonusarray.length <= lastachievementcount) {
    // eslint-disable-next-line no-undef
    display.addToDisplay('Consider upping the initial achievementbonusarray', DisplayCategory.Story);
    achievementbonusarray = [];
    let total = 0;
    for (let index = 0; index <= lastachievementcount * 1.1; index++) {
      total += index;
      achievementbonusarray.push(total);
    }
  }
  return (achievementbonusarray[lastachievementcount] + 100) / 100;
}

function getTierBonus(tier: number) {
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
    if (ch.completed) {
      count += 1;
    }
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
