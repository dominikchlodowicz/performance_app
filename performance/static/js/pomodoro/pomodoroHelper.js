import { Stopwatch } from '../timer/stopwatch.js';
import { Pomodoro } from './pomodoro.js';

let hours = 0;
let minutes = 0;
let seconds = 0;
let displayHours = document.getElementById("hours");
let displayMinutes = document.getElementById("minutes");
let displaySeconds = document.getElementById("seconds");
let buttonStart = document.getElementById("start");
let buttonStop = document.getElementById("stop");
let buttonReset = document.getElementById("reset");
let workTimeValue = document.getElementById("workTimeValue");
let workOrBreakElement = document.getElementById("work-or-break");

let cookie = document.cookie;

const stopwatch = new Stopwatch.Builder()
    .setTime(hours, minutes, seconds)
    .setTimeDisplay(displayHours, displayMinutes, displaySeconds)
    .setNoDataPassElementStopwatch()
    .setIntervalElement()
    .setPomodoro(cookie)
    .build();

const pomodoro = new Pomodoro(stopwatch, workTimeValue, buttonReset, workOrBreakElement)

pomodoro.setPomodoroValues();

const startHandler = function(){
    let click = 0;
    return function (){
        if(click === 0) {
            pomodoro.pomodoroCycle();
        } else {
            pomodoro.continueReversedStopwatch();
        }
        click++;
    }
}();

buttonStart.addEventListener('click', startHandler);

buttonStop.addEventListener('click', () => {
    pomodoro.stopReversedStopwatch();
});

buttonReset.addEventListener('click', () => {
    stopwatch.resetStopwatch();
});
