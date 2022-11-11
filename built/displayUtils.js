// eslint-disable-next-line no-shadow
var DisplayCategory;
(function (DisplayCategory) {
    DisplayCategory[DisplayCategory["GameSave"] = 0] = "GameSave";
    DisplayCategory[DisplayCategory["Achievement"] = 1] = "Achievement";
    DisplayCategory[DisplayCategory["Loot"] = 2] = "Loot";
    DisplayCategory[DisplayCategory["Challenge"] = 3] = "Challenge";
    DisplayCategory[DisplayCategory["Story"] = 4] = "Story";
    DisplayCategory[DisplayCategory["Tutorial"] = 5] = "Tutorial";
})(DisplayCategory || (DisplayCategory = {}));
class DisplayItem {
    constructor(index, txt, category) {
        this.index = index;
        this.timeadded = new Date();
        this.txt = txt;
        this.category = category;
    }
}
class FloatingText {
    constructor(text, color, pos) {
        this.text = text;
        this.color = color;
        this.framesleft = 1000;
        this.pos = new Vector(pos.x, pos.y);
    }
    draw() {
        display.drawText(this.text, this.pos, this.color, `${display.getFontSizeString(10)} bold Arial`, 'center', 'bottom');
        this.framesleft -= 1;
        this.pos.x += 0.01;
        this.pos.y -= 0.01;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Display {
    constructor() {
        this.textToDisplay = [];
        this.textToDisplayGameSave = [];
        this.textToDisplayAchievement = [];
        this.textToDisplayLoot = [];
        this.textToDisplayChallenge = [];
        this.textToDisplayStory = [];
        this.texttoDisplayTutorial = [];
        this.floaters = [];
        this.displayindex = 0;
        this.canvas = document.getElementById('gameBoard');
        this.ctx = this.canvas.getContext('2d');
    }
    // eslint-disable-next-line class-methods-use-this
    getFontSizeString(valueAt1000) {
        return Math.floor((CANVAS_SIZE / 1000) * valueAt1000).toString();
    }
    showFloaters() {
        for (let index = this.floaters.length - 1; index >= 0; index--) {
            const element = this.floaters[index];
            element.framesleft -= 1;
            let drawBool = true;
            if (element.framesleft < 0) {
                this.floaters.splice(index, 1);
                drawBool = false;
            }
            else if (element.pos.y < 4) {
                this.floaters.splice(index, 1);
                drawBool = false;
            }
            if (drawBool) {
                element.draw();
            }
        }
    }
    prestige1DisplayReset() {
        this.textToDisplayGameSave = [];
        this.textToDisplayLoot = [];
        this.textToDisplayStory = [];
    }
    prestige2DisplayReset() {
        this.textToDisplayChallenge = [];
    }
    // eslint-disable-next-line class-methods-use-this
    addColor(theColor, theText) {
        return `<span style="color:${theColor}">${theText}</span><br />`;
    }
    addToDisplay(newline, category) {
        this.displayindex += 1;
        const newItem = new DisplayItem(this.displayindex, newline, category);
        if (category === DisplayCategory.GameSave) {
            newItem.txt = this.addColor('blue', `${this.getPrettyTime(new Date())}: ${newline}`);
            this.textToDisplayGameSave.unshift(newItem);
            this.textToDisplayGameSave.splice(1);
        }
        else if (category === DisplayCategory.Achievement) {
            newItem.txt = this.addColor('green', `${this.getPrettyTime(new Date())}: ${newline}`);
            this.textToDisplayAchievement.unshift(newItem);
        }
        else if (category === DisplayCategory.Loot) {
            newItem.txt = this.addColor('white', `${this.getPrettyTime(new Date())}: ${newline}`);
            this.textToDisplayLoot.unshift(newItem);
            this.textToDisplayLoot.splice(50);
        }
        else if (category === DisplayCategory.Challenge) {
            newItem.txt = this.addColor('red', `${this.getPrettyTime(new Date())}: ${newline}`);
            this.textToDisplayChallenge.unshift(newItem);
            this.textToDisplayChallenge.splice(25);
        }
        else if (category === DisplayCategory.Story) {
            newItem.txt = this.addColor('yellow', `${this.getPrettyTime(new Date())}: ${newline}`);
            this.textToDisplayStory.unshift(newItem);
            this.textToDisplayStory.splice(100);
        }
        else if (category === DisplayCategory.Tutorial) {
            newItem.txt = this.addColor('pink', newline);
            this.texttoDisplayTutorial.unshift(newItem);
            this.texttoDisplayTutorial.splice(1);
        }
        this.textToDisplay = this.textToDisplayAchievement.concat(this.textToDisplayChallenge).concat(this.textToDisplayGameSave).concat(this.textToDisplayLoot).concat(this.textToDisplayStory);
        this.textToDisplay.sort((a, b) => (a.index < b.index ? 1 : -1));
        if (this.texttoDisplayTutorial.length > 0) {
            this.textToDisplay.unshift(this.texttoDisplayTutorial[0]);
        }
    }
    // eslint-disable-next-line no-unused-vars
    getDisplayText() {
        let val = '';
        // eslint-disable-next-line no-return-assign
        this.textToDisplay.forEach((textToDisplay) => (val += `\n${textToDisplay.txt}`));
        return val;
    }
    // eslint-disable-next-line class-methods-use-this
    getPrettyTime(d) {
        const hr = d.getHours();
        const min = d.getMinutes();
        const sec = d.getSeconds();
        let hrdisplay = '';
        let mindisplay = '';
        let secdisplay = '';
        if (min < 10) {
            mindisplay = `0${min.toString()}`;
        }
        else {
            mindisplay = min.toString();
        }
        if (sec < 10) {
            secdisplay = `0${sec.toString()}`;
        }
        else {
            secdisplay = sec.toString();
        }
        if (hr < 10) {
            hrdisplay = `0${hr.toString()}`;
        }
        else {
            hrdisplay = hr.toString();
        }
        return `${hrdisplay}:${mindisplay}:${secdisplay}`;
    }
    // eslint-disable-next-line no-unused-vars
    logMyErrors(e) {
        this.addToDisplay(e.message, DisplayCategory.Challenge);
    }
    // eslint-disable-next-line no-unused-vars, class-methods-use-this
    getPrettyTimeFromMilliSeconds(millisecondsToEvaluate) {
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
            days += 1;
            work -= MILLISECONDS_PER_DAY;
        }
        while (work > MILLISECONDS_PER_HOUR) {
            hours += 1;
            work -= MILLISECONDS_PER_HOUR;
        }
        while (work > MILLISECONDS_PER_MINUTE) {
            minutes += 1;
            work -= MILLISECONDS_PER_MINUTE;
        }
        while (work > MILLISECONDS_PER_SECOND) {
            seconds += 1;
            work -= MILLISECONDS_PER_SECOND;
        }
        ddays = `0${days.toString()}`.slice(-2);
        dhours = `0${hours.toString()}`.slice(-2);
        dminutes = `0${minutes.toString()}`.slice(-2);
        dseconds = `0${seconds.toString()}`.slice(-2);
        if (days > 0) {
            return `${ddays}:${dhours}:${dminutes}:${dseconds}`;
        }
        if (hours > 0) {
            return `${dhours}:${dminutes}:${dseconds}`;
        }
        if (minutes > 0) {
            return `${dminutes}:${dseconds}`;
        }
        return `:${dseconds}`;
    }
    // // eslint-disable-next-line no-unused-vars
    // changeNotation () {
    //   gameData.options.standardNotation++;
    //   if (gameData.options.standardNotation >= 6) {
    //     gameData.options.standardNotation = 0;
    //   }
    //   document.getElementById('btnPrestige1').classList.add('hidden');
    //   $('#btnNotation').text(notationDisplayOptions[gameData.options.standardNotation]);
    // }
    // eslint-disable-next-line no-unused-vars, class-methods-use-this
    PrettyRatePerTime(amt, ticks) {
        // this originally changed the time duration based on time, but I found it distracting in practice so it is back to /hr only
        const base = amt.divide(ticks).multiply(1000 * 60 * 60);
        return `${base.ToString()} /hr`;
    }
    // eslint-disable-next-line class-methods-use-this
    TierScaling(value) {
        const tiersize = getTierSize();
        return (value / tiersize) * CANVAS_SIZE * 0.8; // is canvas.width right?
    }
    // eslint-disable-next-line class-methods-use-this
    TierScalingReverse(value) {
        const tiersize = getTierSize();
        return (value * tiersize) / (CANVAS_SIZE * 0.8); // is canvas.width right?
    }
    // eslint-disable-next-line class-methods-use-this
    displayTextArrayFromString(textstring, centerPos, color, align, baseline, fontSize = 12) {
        const lines = textstring.split('<br />');
        let offset = 0.5 - lines.length / 2;
        if (baseline === 'top') {
            offset = 0;
        }
        lines.forEach((element) => {
            display.drawTextNoScale(element, new Vector(centerPos.x, centerPos.y + offset / 0.065), color, `${display.getFontSizeString(fontSize)}px Arial`, align, baseline);
            offset += 1;
        });
    }
    drawRectangleBorder(xPos, yPos, width, height, thickness = 1) {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(xPos - thickness, yPos - thickness, width + thickness * 2, height + thickness * 2);
    }
    DrawSolidSmallDiamond(CurrentHitPoints, position, color) {
        let squareSize = CurrentHitPoints.divide(this.drone.maxHitPoints()).ToNumber();
        squareSize = this.TierScaling(squareSize);
        if (squareSize < 4) {
            squareSize = 4;
        }
        this.ctx.fillStyle = color;
        const scaledx = this.TierScaling(position.x) + CANVAS_SIZE * 0.1;
        const scaledy = this.TierScaling(position.y) + CANVAS_SIZE * 0.1;
        const top = scaledy - squareSize / 2;
        const bottom = scaledy + squareSize / 2;
        const left = scaledx - squareSize / 2;
        const right = scaledx + squareSize / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(scaledx, top);
        this.ctx.lineTo(right, scaledy);
        this.ctx.lineTo(scaledx, bottom);
        this.ctx.lineTo(left, scaledy);
        this.ctx.fill();
    }
    DrawTwoColorDiamond(CurrentHitPoints, position, leftcolor, rightcolor) {
        let squareSize = CurrentHitPoints.divide(this.drone.maxHitPoints()).ToNumber();
        squareSize = this.TierScaling(squareSize);
        if (squareSize < 4) {
            squareSize = 4;
        }
        this.ctx.fillStyle = leftcolor;
        const scaledx = this.TierScaling(position.x) + CANVAS_SIZE * 0.1;
        const scaledy = this.TierScaling(position.y) + CANVAS_SIZE * 0.1;
        const top = scaledy - squareSize / 1.4;
        const bottom = scaledy + squareSize / 1.4;
        const left = scaledx - squareSize / 1.4;
        const right = scaledx + squareSize / 1.4;
        this.ctx.beginPath();
        this.ctx.moveTo(scaledx, top);
        this.ctx.lineTo(scaledx, bottom);
        this.ctx.lineTo(left, scaledy);
        this.ctx.fill();
        this.ctx.fillStyle = rightcolor;
        this.ctx.beginPath();
        this.ctx.moveTo(scaledx, top);
        this.ctx.lineTo(right, scaledy);
        this.ctx.lineTo(scaledx, bottom);
        this.ctx.fill();
    }
    drawTextNoScale(text, position, color, font, align, baseline) {
        const scaledx = position.x;
        const scaledy = position.y;
        this.ctx.font = font;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseline;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, scaledx, scaledy);
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
    }
    drawText(text, position, color, font, align, baseline) {
        const scaledx = this.TierScaling(position.x) + CANVAS_SIZE * 0.1;
        const scaledy = this.TierScaling(position.y) + CANVAS_SIZE * 0.1;
        this.ctx.font = font;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseline;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, scaledx, scaledy);
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
    }
    DrawCircle(pos, alpha, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        this.ctx.arc(this.TierScaling(pos.x) + CANVAS_SIZE * 0.1, this.TierScaling(pos.y) + CANVAS_SIZE * 0.1, this.TierScaling(radius), 0, 2 * Math.PI);
        // this.ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
    }
    DrawEnemyCircle(CurrentHitPoints, pos, colors) {
        let radius = CurrentHitPoints.divide(this.drone.maxHitPoints()).ToNumber();
        radius = this.TierScaling(radius);
        if (radius < 2) {
            radius = 2;
        }
        const scaledx = this.TierScaling(pos.x) + CANVAS_SIZE * 0.1;
        const scaledy = this.TierScaling(pos.y) + CANVAS_SIZE * 0.1;
        this.ctx.moveTo(scaledx, scaledy);
        for (let index = 0; index < colors.length; index++) {
            const startAngle = (index * 2 * Math.PI) / colors.length;
            const endAngle = startAngle + (2 * Math.PI) / colors.length;
            this.ctx.beginPath();
            this.ctx.moveTo(scaledx, scaledy);
            this.ctx.arc(scaledx, scaledy, radius, startAngle, endAngle);
            this.ctx.closePath();
            // filling the slices with the corresponding mood's color
            this.ctx.fillStyle = colors[index];
            this.ctx.fill();
        }
    }
    DrawSolidRectangleNoScale(topLeftPosition, bottomRightPosition, color, border = true) {
        const scaledtopleftx = topLeftPosition.x;
        const scaledtoplefty = topLeftPosition.y;
        const scaledbottomrightx = bottomRightPosition.x;
        const scaledbottomrighty = bottomRightPosition.y;
        if (border) {
            this.drawRectangleBorder(scaledtopleftx, scaledtoplefty, scaledbottomrightx - scaledtopleftx, scaledbottomrighty - scaledtoplefty);
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(scaledtopleftx, scaledtoplefty, scaledbottomrightx - scaledtopleftx, scaledbottomrighty - scaledtoplefty);
    }
    DrawSolidRectangle(topLeftPosition, bottomRightPosition, color, border = true) {
        const scaledtopleftx = this.TierScaling(topLeftPosition.x) + CANVAS_SIZE * 0.1;
        const scaledtoplefty = this.TierScaling(topLeftPosition.y) + CANVAS_SIZE * 0.1;
        const scaledbottomrightx = this.TierScaling(bottomRightPosition.x) + CANVAS_SIZE * 0.1;
        const scaledbottomrighty = this.TierScaling(bottomRightPosition.y) + CANVAS_SIZE * 0.1;
        if (border) {
            this.drawRectangleBorder(scaledtopleftx, scaledtoplefty, scaledbottomrightx - scaledtopleftx, scaledbottomrighty - scaledtoplefty);
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(scaledtopleftx, scaledtoplefty, scaledbottomrightx - scaledtopleftx, scaledbottomrighty - scaledtoplefty);
    }
    DrawSolidSquare(CurrentHitPoints, position, color) {
        let squareSize = CurrentHitPoints.divide(this.drone.maxHitPoints()).ToNumber();
        squareSize = this.TierScaling(squareSize);
        if (squareSize < 4) {
            squareSize = 4;
        }
        this.ctx.fillStyle = color;
        const scaledx = this.TierScaling(position.x) + CANVAS_SIZE * 0.1;
        const scaledy = this.TierScaling(position.y) + CANVAS_SIZE * 0.1;
        this.ctx.fillRect(scaledx - squareSize / 2, scaledy - squareSize / 2, squareSize, squareSize);
    }
    DrawTwoColorSquare(CurrentHitPoints, position, leftcolor, rightcolor) {
        let squareSize = CurrentHitPoints.divide(this.drone.maxHitPoints()).ToNumber();
        squareSize = this.TierScaling(squareSize);
        if (squareSize < 4) {
            squareSize = 4;
        }
        this.ctx.fillStyle = leftcolor;
        this.ctx.fillRect(this.TierScaling(position.x) - squareSize / 2 + CANVAS_SIZE * 0.1, this.TierScaling(position.y) - squareSize / 2 + CANVAS_SIZE * 0.1, squareSize / 2, squareSize);
        this.ctx.fillStyle = rightcolor;
        this.ctx.fillRect(this.TierScaling(position.x) + CANVAS_SIZE * 0.1, this.TierScaling(position.y) - squareSize / 2 + CANVAS_SIZE * 0.1, squareSize / 2, squareSize);
    }
}
//# sourceMappingURL=displayUtils.js.map