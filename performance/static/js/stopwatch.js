import { getCookie } from "./getCookie.js";

class Stopwatch{

    hours = null
    minutes = null
    seconds = null
    timerValueElement = null
    displayHoursElement = null
    displayMinutesElement = null
    displaySecondsElement = null
    pomodoroIntervals = null
    workDuration = null
    breakDuration = null
    waitFlag = null

    static Builder = class {

        hours = null
        minutes = null
        seconds = null
        timerValueElement = null
        displayHoursElement = null
        displayMinutesElement = null
        displaySecondsElement = null
        pomodoroIntervals = null
        workDuration = null
        breakDuration = null
        waitFlag = null

        setTime(hours, minutes, seconds){
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;
            return this
        }

        setTimeDisplay(displayHoursElement, displayMinutesElement, displaySecondsElement){
            this.displayHoursElement = displayHoursElement;
            this.displayMinutesElement = displayMinutesElement;
            this.displaySecondsElement = displaySecondsElement;
            return this
        }

        setDataPassElement(timerValueElement){
            this.timerValueElement = timerValueElement;
            return this
        }

        setIntervalElement(){
            this.interval;
            return this
        }

        setNoPomodoro(){
            this.pomodoroIntervals = 0;
            this.workDuration = 0;
            this.breakDuration = 0;
            return this
        }

        setPomodoro(cookie){
            var cookies = getCookie(cookie);
            this.pomodoroIntervals = cookies["intervals"];
            this.workDuration = cookies["workDuration"];
            this.breakDuration = cookies["breakDuration"];
            this.waitFlag = false;
            return this
        }

        build(){
            const stopwatch = new Stopwatch(
                this.hours,
                this.minutes,
                this.seconds,
                this.displayHoursElement,
                this.displayMinutesElement,
                this.displaySecondsElement,
                this.timerValueElement,
                this.interval,
                this.pomodoroIntervals,
                this.workDuration,
                this.breakDuration,
                this.waitFlag)
            return stopwatch  
        }
    }

    constructor(hours, minutes, seconds, displayHoursElement, displayMinutesElement
        ,displaySecondsElement, timerValueElement, interval, pomodoroIntervals, workDuration
        ,breakDuration, waitFlag){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.displayHoursElement = displayHoursElement;
        this.displayMinutesElement = displayMinutesElement;
        this.displaySecondsElement = displaySecondsElement;
        this.timerValueElement = timerValueElement;
        this.interval = interval;
        this.pomodoroIntervals = pomodoroIntervals;
        this.workDuration = workDuration;
        this.breakDuration = breakDuration;
        this.waitFlag = waitFlag;
    }

    stopwatch(){
        this.timerValueElement.removeAttribute("value");
        this.seconds++;
        if(this.minutes == 59 && this.seconds == 59){
            this.minutes = 0;
            this.seconds = 0;
            this.displayMinutesElement.innerHTML = "0" + this.minutes;
            this.displaySecondsElement.innerHTML = "0" + this.seconds;
            
            this.hours++;
            if(this.hours <= 9){
                this.displayHoursElement.innerHTML = "0" + this.hours;
            } else {
                this.displayHoursElement.innerHTML = this.hours;
            }
        }
    
        if(this.seconds == 59){
            this.seconds = 0;
            this.displaySecondsElement.innerHTML = "0" + this.seconds;
    
            this.minutes++;
            if(this.minutes <= 9){
                this.displayMinutesElement.innerHTML = "0" + this.minutes;
            } else {
                this.displayMinutesElement.innerHTML = this.minutes;
            }
        }
    
        if(this.seconds <= 9){
            this.displaySecondsElement.innerHTML = "0" + this.seconds;
        } else {
            this.displaySecondsElement.innerHTML = this.seconds;
        }
        this.timerValueElement.setAttribute("value", `${this.hours}:${this.minutes}:${this.seconds}`);
    }

    startStopwatch(){
        this.interval = setInterval(this.stopwatch.bind(this), 1000);
    }

    stopStopwatch(){
        clearInterval(this.interval);
    }

    resetStopwatch(){
        clearInterval(this.interval);
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.displaySecondsElement.innerHTML = "0" + seconds;
        this.displayMinutesElement.innerHTML = "0" + minutes;
        this.displayHoursElement = "0" + hours;
    }
}

export {Stopwatch};