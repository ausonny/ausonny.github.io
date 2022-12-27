class Blueprint {
  towerType: string;

  autoOn: boolean;

  tactic: number;

  constructor() {
    this.towerType = '';
    this.autoOn = false;
    this.tactic = 0;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TierBluePrint {
  blueprints: Blueprint[];

  constructor() {
    this.blueprints = [];
  }
}
