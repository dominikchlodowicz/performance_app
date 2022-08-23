import { Stopwatch } from './stopwatch.js';
import { pomodoroMethods } from './pomodoro/pomodoroMethods.js';

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

var cookie = document.cookie;

const stopwatch = new Stopwatch.Builder()
    .setTime(hours, minutes, seconds)
    .setTimeDisplay(displayHours, displayMinutes, displaySeconds)
    .setDataPassElement(timerValue)
    .setIntervalElement()
    .setPomodoro(cookie)
    .build();



buttonStart.addEventListener('click', () => {
    pomodoroMethods.pomodoro(pomodoroMethods.startReversedStopwatch, stopwatch,  stopwatch.pomodoroIntervals,
         stopwatch.workDuration, stopwatch.breakDuration);
});

buttonStop.addEventListener('click', () => {
    stopwatch.stop();
});

buttonReset.addEventListener('click', () => {
    stopwatch.reset();
});
