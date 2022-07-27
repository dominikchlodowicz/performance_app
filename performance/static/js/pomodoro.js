import { 
        hours,
        minutes,
        seconds,
        displayHours,
        displayMinutes,
        displaySeconds,
        buttonStart,
        buttonStop,
        buttonReset,
        timerValue,
        Interval
    } from './another-file.js';

timerValue.value = '0:0:0';

const config_values = ['intervals', 'durationInterval', 'durationIntervalTime', 'durationBreak' ,'durationBreakTime'];

var intervals = document.getElementById(config_values[0]);
var durationInterval = document.getElementById(config_values[1]);
var durationIntervalTime = document.getElementById(config_values[2]);
var durationBreak = document.getElementById(config_values[3]);
var durationBreakTime = document.getElementById(config_values[4]);


function valdiation(time, timeValue){
        
}


function startPomodoro(numberOfIntervals, durationOfInterval, durationOfIntervalTime,
     durationOfBreak, durationBreakTime){

        
}