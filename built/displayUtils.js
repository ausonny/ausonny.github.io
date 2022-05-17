/* global gameData, JBDecimal */
function addColor(theColor, theText) {
    return '<span style="color:' + theColor + '">' + theText + '</span><br />';
}
function addToDisplay(newline, category) {
    displayindex++;
    const newItem = new DisplayItem(displayindex, newline, category);
    if (category === 'gameSave') {
        newItem.txt = addColor('white', getPrettyTime(new Date()) + ': ' + newline);
        textToDisplaygamesave.unshift(newItem);
        textToDisplaygamesave.splice(1);
    }
    else if (category === 'achievement') {
        newItem.txt = addColor('blue', getPrettyTime(new Date()) + ': ' + newline);
        textToDisplayachievement.unshift(newItem);
    }
    else if (category === 'loot') {
        newItem.txt = addColor('green', getPrettyTime(new Date()) + ': ' + newline);
        textToDisplayloot.unshift(newItem);
        textToDisplayloot.splice(100);
    }
    else if (category === 'challenge') {
        newItem.txt = addColor('red', getPrettyTime(new Date()) + ': ' + newline);
        textToDisplaychallenge.unshift(newItem);
        textToDisplaychallenge.splice(25);
    }
    else if (category === 'story') {
        newItem.txt = addColor('yellow', getPrettyTime(new Date()) + ': ' + newline);
        textToDisplaystory.unshift(newItem);
    }
    textToDisplay = textToDisplayachievement.concat(textToDisplaychallenge).concat(textToDisplaygamesave).concat(textToDisplayloot).concat(textToDisplaystory);
    textToDisplay.sort((a, b) => (a.index < b.index ? 1 : -1));
    let activechallenges = false;
    let txt = 'Challenges Active:<br />';
    // eslint-disable-next-line no-undef
    gameData.challenges.forEach((ch) => {
        if (ch.active) {
            activechallenges = true;
            txt += ch.name + ' Wave needed: ' + ch.waveRequiredforCompletion() + '<br />';
        }
    });
    if (activechallenges) {
        textToDisplay.unshift(new DisplayItem(0, addColor('red', txt), 'achievement'));
    }
}
// eslint-disable-next-line no-unused-vars
function getDisplayText() {
    let val = '';
    // eslint-disable-next-line no-return-assign
    textToDisplay.forEach(textToDisplay => val += '\n' + textToDisplay.txt);
    return val;
}
class DisplayItem {
    constructor(index, txt, type) {
        this.index = index;
        this.timeadded = new Date();
        this.txt = txt;
        this.type = type;
    }
}
let textToDisplay;
let textToDisplaygamesave;
let textToDisplayachievement;
let textToDisplayloot;
let textToDisplaychallenge;
let textToDisplaystory;
let displayindex;
function getPrettyTime(d) {
    const hr = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();
    let hrdisplay = '';
    let mindisplay = '';
    let secdisplay = '';
    if (min < 10) {
        mindisplay = '0' + min.toString();
    }
    else {
        mindisplay = min.toString();
    }
    if (sec < 10) {
        secdisplay = '0' + sec.toString();
    }
    else {
        secdisplay = sec.toString();
    }
    if (hr < 10) {
        hrdisplay = '0' + hr.toString();
    }
    else {
        hrdisplay = hr.toString();
    }
    return hrdisplay + ':' + mindisplay + ':' + secdisplay;
}
// eslint-disable-next-line no-unused-vars
function logMyErrors(e) {
    addToDisplay(e.message, 'challenge');
}
// eslint-disable-next-line no-unused-vars
function getPrettyTimeFromMilliSeconds(millisecondsToEvaluate) {
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
    }
    else if (hours > 0) {
        return dhours + ':' + dminutes + ':' + dseconds;
    }
    else if (minutes > 0) {
        return dminutes + ':' + dseconds;
    }
    else {
        return ':' + dseconds;
    }
}
// eslint-disable-next-line no-unused-vars
function changeNotation() {
    gameData.options.standardNotation++;
    if (gameData.options.standardNotation >= 6) {
        gameData.options.standardNotation = 0;
    }
    // eslint-disable-next-line no-undef
    $('#btnNotation').text(notationDisplayOptions[gameData.options.standardNotation]);
}
// eslint-disable-next-line no-unused-vars
function PrettyRatePerTime(amt, ticks) {
    // this originally changed the time element based on size, but I found it distracting in poreactice so it is back to /hr only
    const base = amt.divide(ticks).multiply(1000 * 60 * 60);
    return base.ToString() + ' /hr';
}
//# sourceMappingURL=displayUtils.js.map