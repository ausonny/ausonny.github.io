/* global gameData, JBDecimal, Enemy, Vector */

class DisplayItem {
  index: number;

  timeadded: Date;

  txt: string;

  type: string;

  constructor (index: number, txt: string, type: string) {
    this.index = index;
    this.timeadded = new Date();
    this.txt = txt;
    this.type = type;
  }
}
// eslint-disable-next-line no-unused-vars
class Display {
  textToDisplay: DisplayItem[];
  textToDisplaygamesave: DisplayItem[];
  textToDisplayachievement: DisplayItem[];
  textToDisplayloot: DisplayItem[];
  textToDisplaychallenge: DisplayItem[];
  textToDisplaystory: DisplayItem[];
  displayindex: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  drone: Enemy;

  constructor () {
    this.textToDisplay = [];
    this.textToDisplaygamesave = [];
    this.textToDisplayachievement = [];
    this.textToDisplayloot = [];
    this.textToDisplaychallenge = [];
    this.textToDisplaystory = [];
    this.displayindex = 0;
    this.canvas = document.getElementById('gameBoard') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
  }

  prestige1DisplayReset () {
    this.textToDisplaygamesave = [];
    this.textToDisplayloot = [];
    this.textToDisplaystory = [];
  }

  prestige2DisplayReset () {
    this.textToDisplaychallenge = [];
  }

  addColor (theColor: string, theText: string) {
    return '<span style="color:' + theColor + '">' + theText + '</span><br />';
  }

  addToDisplay (newline: string, category: string) {
    this.displayindex++;

    const newItem = new DisplayItem(this.displayindex, newline, category);
    if (category === 'gameSave') {
      newItem.txt = this.addColor('white', this.getPrettyTime(new Date()) + ': ' + newline);
      this.textToDisplaygamesave.unshift(newItem);
      this.textToDisplaygamesave.splice(1);
    } else if (category === 'achievement') {
      newItem.txt = this.addColor('blue', this.getPrettyTime(new Date()) + ': ' + newline);
      this.textToDisplayachievement.unshift(newItem);
    } else if (category === 'loot') {
      newItem.txt = this.addColor('green', this.getPrettyTime(new Date()) + ': ' + newline);
      this.textToDisplayloot.unshift(newItem);
      this.textToDisplayloot.splice(100);
    } else if (category === 'challenge') {
      newItem.txt = this.addColor('red', this.getPrettyTime(new Date()) + ': ' + newline);
      this.textToDisplaychallenge.unshift(newItem);
      this.textToDisplaychallenge.splice(25);
    } else if (category === 'story') {
      newItem.txt = this.addColor('yellow', this.getPrettyTime(new Date()) + ': ' + newline);
      this.textToDisplaystory.unshift(newItem);
    }
    this.textToDisplay = this.textToDisplayachievement.concat(this.textToDisplaychallenge).concat(this.textToDisplaygamesave).concat(this.textToDisplayloot).concat(this.textToDisplaystory);
    this.textToDisplay.sort((a, b) => (a.index < b.index ? 1 : -1));
    let activechallenges = false;
    let txt = 'Challenges Active:<br />';
    // eslint-disable-next-line no-undef
    gameData.challenges.forEach((ch) => {
      if (ch.active) {
        activechallenges = true;
        txt += ch.name + ': wave needed: ' + ch.waveRequiredforCompletion() + '<br />';
      }
    });

    if (activechallenges) {
      this.textToDisplay.unshift(new DisplayItem(0, this.addColor('red', txt), 'achievement'));
    }
  }

  // eslint-disable-next-line no-unused-vars
  getDisplayText () {
    let val = '';

    // eslint-disable-next-line no-return-assign
    this.textToDisplay.forEach(textToDisplay => val += '\n' + textToDisplay.txt);

    return val;
  }

  getPrettyTime (d: Date) {
    const hr = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();
    let hrdisplay = '';
    let mindisplay = '';
    let secdisplay = '';
    if (min < 10) {
      mindisplay = '0' + min.toString();
    } else {
      mindisplay = min.toString();
    }
    if (sec < 10) {
      secdisplay = '0' + sec.toString();
    } else {
      secdisplay = sec.toString();
    }
    if (hr < 10) {
      hrdisplay = '0' + hr.toString();
    } else {
      hrdisplay = hr.toString();
    }
    return hrdisplay + ':' + mindisplay + ':' + secdisplay;
  }

  // eslint-disable-next-line no-unused-vars
  logMyErrors (e: any) {
    this.addToDisplay(e.message, 'challenge');
  }

  // eslint-disable-next-line no-unused-vars
  getPrettyTimeFromMilliSeconds (millisecondsToEvaluate: number) {
    let work = millisecondsToEvaluate;
    const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
    const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
    const MILLISECONDS_PER_MINUTE = 60 * 1000;
    const MILLISECONDS_PER_SECOND = 1000;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let ddays = '';
    let dhours = '';
    let dminutes = '';
    let dseconds = '';

    while (work > MILLISECONDS_PER_DAY) {
      days++;
      work -= MILLISECONDS_PER_DAY;
    }
    while (work > MILLISECONDS_PER_HOUR) {
      hours++;
      work -= MILLISECONDS_PER_HOUR;
    }
    while (work > MILLISECONDS_PER_MINUTE) {
      minutes++;
      work -= MILLISECONDS_PER_MINUTE;
    }
    while (work > MILLISECONDS_PER_SECOND) {
      seconds++;
      work -= MILLISECONDS_PER_SECOND;
    }
    ddays = ('0' + days.toString()).slice(-2);
    dhours = ('0' + hours.toString()).slice(-2);
    dminutes = ('0' + minutes.toString()).slice(-2);
    dseconds = ('0' + seconds.toString()).slice(-2);

    if (days > 0) {
      return ddays + ':' + dhours + ':' + dminutes + ':' + dseconds;
    } else if (hours > 0) {
      return dhours + ':' + dminutes + ':' + dseconds;
    } else if (minutes > 0) {
      return dminutes + ':' + dseconds;
    } else {
      return ':' + dseconds;
    }
  }

  // // eslint-disable-next-line no-unused-vars
  // changeNotation () {
  //   gameData.options.standardNotation++;
  //   if (gameData.options.standardNotation >= 6) {
  //     gameData.options.standardNotation = 0;
  //   }
  //   // eslint-disable-next-line no-undef
  //   document.getElementById('btnPrestige1').classList.add('hidden');
  //   $('#btnNotation').text(notationDisplayOptions[gameData.options.standardNotation]);
  // }

  // eslint-disable-next-line no-unused-vars
  PrettyRatePerTime (amt: JBDecimal, ticks: number) {
    // this originally changed the time element based on size, but I found it distracting in poreactice so it is back to /hr only
    const base = amt.divide(ticks).multiply(1000 * 60 * 60);
    return base.ToString() + ' /hr';
  }

  DrawSolidDiamond (CurrentHitPoints: JBDecimal, position: Vector, color: string) {
    const squareSize = CurrentHitPoints.divide(this.drone.MaxHitPoints()).multiply(12).ToNumber();

    this.ctx.fillStyle = color;
    const top = (position.x + 10) * (this.canvas.scrollWidth / 20) - (squareSize / 1.4);
    const bottom = (position.x + 10) * (this.canvas.scrollWidth / 20) + (squareSize / 1.4);
    const left = (position.y + 10) * (this.canvas.scrollWidth / 20) - (squareSize / 1.4);
    const right = (position.y + 10) * (this.canvas.scrollWidth / 20) + (squareSize / 1.4);
    this.ctx.beginPath();
    this.ctx.moveTo(top, (position.y + 10) * (this.canvas.scrollWidth / 20));
    this.ctx.lineTo((position.x + 10) * (this.canvas.scrollWidth / 20), right);
    this.ctx.lineTo(bottom, (position.y + 10) * (this.canvas.scrollWidth / 20));
    this.ctx.lineTo((position.x + 10) * (this.canvas.scrollWidth / 20), left);
    this.ctx.fill();
  }

  DrawTwoColorDiamond (CurrentHitPoints: JBDecimal, position: Vector, leftcolor: string, rightcolor: string) {
    const squareSize = CurrentHitPoints.divide(this.drone.MaxHitPoints()).multiply(12).ToNumber();

    const top = (position.x + 10) * (this.canvas.scrollWidth / 20) - (squareSize / 1.4);
    const left = (position.y + 10) * (this.canvas.scrollWidth / 20) - (squareSize / 1.4);
    const right = (position.y + 10) * (this.canvas.scrollWidth / 20) + (squareSize / 1.4);

    this.DrawSolidDiamond(CurrentHitPoints, position, rightcolor);

    this.ctx.fillStyle = leftcolor;
    this.ctx.beginPath();
    this.ctx.moveTo((position.x + 10) * (this.canvas.scrollWidth / 20), left);
    this.ctx.lineTo(top, (position.y + 10) * (this.canvas.scrollWidth / 20));
    this.ctx.lineTo((position.x + 10) * (this.canvas.scrollWidth / 20), right);
    this.ctx.fill();40
  }

  DrawSolidSquare (CurrentHitPoints: JBDecimal, position: Vector, color: string) {
    const squareSize = CurrentHitPoints.divide(this.drone.MaxHitPoints()).multiply(12).ToNumber();
    this.ctx.fillStyle = color;
    this.ctx.fillRect((position.x + 10) * (this.canvas.scrollWidth / 20) - squareSize / 2, (position.y + 10) * (this.canvas.scrollWidth / 20) - squareSize / 2, squareSize, squareSize);
  }

  DrawTwoColorSquare (CurrentHitPoints: JBDecimal, position: Vector, leftcolor: string, rightcolor: string) {
    const squareSize = CurrentHitPoints.divide(this.drone.MaxHitPoints()).multiply(12).ToNumber();
    this.ctx.fillStyle = leftcolor;
    this.ctx.fillRect((position.x + 10) * (this.canvas.scrollWidth / 20) - squareSize / 2, (position.y + 10) * (this.canvas.scrollWidth / 20) - squareSize / 2, squareSize / 2, squareSize);
    this.ctx.fillStyle = rightcolor;
    this.ctx.fillRect((position.x + 10) * (this.canvas.scrollWidth / 20), (position.y + 10) * (this.canvas.scrollWidth / 20) - squareSize / 2, squareSize / 2, squareSize);
  }

  DrawTower () {
    const squareSize = gameData.tower.CurrentHitPoints().divide(gameData.tower.MaxHitPoints()).multiply(40).ToNumber();
    const color = 'lime';
    this.ctx.fillStyle = color;
    this.ctx.fillRect((10) * (this.canvas.scrollWidth / 20) - squareSize / 2, (10) * (this.canvas.scrollWidth / 20) - squareSize / 2, squareSize, squareSize);
    const top = (10) * (this.canvas.scrollWidth / 20) - (squareSize / 1.4);
    const bottom = (10) * (this.canvas.scrollWidth / 20) + (squareSize / 1.4);
    const left = (10) * (this.canvas.scrollWidth / 20) - (squareSize / 1.4);
    const right = (10) * (this.canvas.scrollWidth / 20) + (squareSize / 1.4);
    this.ctx.beginPath();
    this.ctx.moveTo(top, (10) * (this.canvas.scrollWidth / 20));
    this.ctx.lineTo((10) * (this.canvas.scrollWidth / 20), right);
    this.ctx.lineTo(bottom, (10) * (this.canvas.scrollWidth / 20));
    this.ctx.lineTo((10) * (this.canvas.scrollWidth / 20), left);
    this.ctx.fill();
  }
}
