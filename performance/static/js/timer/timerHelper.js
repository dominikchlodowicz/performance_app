import {Stopwatch} from './stopwatch.js';

let hours = 0;
let minutes = 0;
let seconds = 0;
let displayHours = document.getElementById("hours");
let displayMinutes = document.getElementById("minutes");
let displaySeconds = document.getElementById("seconds");
let buttonStart = document.getElementById("start");
let buttonStop = document.getElementById("stop");
let buttonReset = document.getElementById("reset");
let timerValue = document.getElementById("timerValue");

const stopwatch = new Stopwatch.Builder()
    .setTime(hours, minutes, seconds)
    .setTimeDisplay(displayHours, displayMinutes, displaySeconds)
    .setDataPassElementStopwatch(timerValue)
    .setIntervalElement()
    .setNoPomodoro()
    .build();

buttonStart.addEventListener('click', () => {
    stopwatch.startStopwatch();
});

buttonStop.addEventListener('click', () => {
    stopwatch.stopStopwatch();
});

buttonReset.addEventListener('click', () => {
    stopwatch.resetStopwatch();
});
