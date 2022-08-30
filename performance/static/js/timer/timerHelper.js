import {Stopwatch} from './stopwatch.js';

var hours = 0;
var minutes = 0;
var seconds = 0;
var displayHours = document.getElementById("hours");
var displayMinutes = document.getElementById("minutes");
var displaySeconds = document.getElementById("seconds");
var buttonStart = document.getElementById("start");
var buttonStop = document.getElementById("stop");
var buttonReset = document.getElementById("reset");
var timerValue = document.getElementById("timerValue");

const stopwatch = new Stopwatch.Builder()
    .setTime(hours, minutes, seconds)
    .setTimeDisplay(displayHours, displayMinutes, displaySeconds)
    .setDataPassElement(timerValue)
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
