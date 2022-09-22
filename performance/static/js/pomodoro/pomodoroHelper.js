import { Stopwatch } from '../timer/stopwatch.js';
import { Pomodoro } from './pomodoro.js';

var hours = 0;
var minutes = 0;
var seconds = 0;
var displayHours = document.getElementById("hours");
var displayMinutes = document.getElementById("minutes");
var displaySeconds = document.getElementById("seconds");
var buttonStart = document.getElementById("start");
var buttonStop = document.getElementById("stop");
var buttonReset = document.getElementById("reset");
var workTimeValue = document.getElementById("workTimeValue");
var workOrBreakElement = document.getElementById("work-or-break");

var cookie = document.cookie;

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
