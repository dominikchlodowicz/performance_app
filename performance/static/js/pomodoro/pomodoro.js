import { wait, turnTimeIntoMs } from '../tools.js'

class Pomodoro{

    constructor(stopwatchInstance){
        this.stopwatch = stopwatchInstance;
    }

    async reversedStopwatch(){
        if(this.stopwatch.waitFlag === false) {
            this.stopwatch.timerValueElement.removeAttribute("value");
        
            if(this.stopwatch.minutes == 0 && this.stopwatch.seconds == 0){
                this.stopwatch.hours--;
                this.stopwatch.minutes = 59;
                this.stopwatch.seconds = 60;
                
                if(this.stopwatch.hours <= 9){
                    this.stopwatch.displayMinutesElement.innerHTML = "0" + this.stopwatch.minutes;
                } else {
                    this.stopwatch.displayMinutesElement.innerHTML = this.stopwatch.minutes;
                }
            }
        
            if(this.stopwatch.seconds == 0){
                this.stopwatch.minutes--;
                this.stopwatch.seconds = 60;
        
                if(this.stopwatch.minutes <= 9){
                    this.stopwatch.displayMinutesElement.innerHTML = "0" + this.stopwatch.minutes;
                } else {
                    this.stopwatch.displayMinutesElement.innerHTML = this.stopwatch.minutes;
                }
            }
            this.stopwatch.seconds--;
        
            if(this.stopwatch.seconds <= 9){
                this.stopwatch.displaySecondsElement.innerHTML = "0" + this.stopwatch.seconds;
            } else {
                this.stopwatch.displaySecondsElement.innerHTML = this.stopwatch.seconds;
            }
        
            if(this.stopwatch.minutes <= 9){
                this.stopwatch.displayMinutesElement.innerHTML = "0" + this.stopwatch.minutes;
            }
        
            if(this.stopwatch.hours <= 9){
                this.stopwatch.displayHoursElement.innerHTML = "0" + this.stopwatch.hours;
            }
        
            if(this.stopwatch.hours == 0 && this.stopwatch.minutes == 0 && this.stopwatch.seconds == 0){
                clearInterval(this.stopwatch.interval);
            }
        
            this.stopwatch.timerValueElement.setAttribute("value", `${this.stopwatch.hours}:${this.stopwatch.minutes}:${this.stopwatch.seconds}`);
        }
    };

    startReversedStopwatch(time){
        var splittedTime = time.split(":");
        // setting pomodoro start values
        this.stopwatch.hours = parseInt(splittedTime[0]); 
        this.stopwatch.minutes = parseInt(splittedTime[1]);
        this.stopwatch.seconds = parseInt(splittedTime[2]);
        this.stopwatch.interval = setInterval(() => { this.reversedStopwatch(this.stopwatch) }, 1000);
    };

    continueReversedStopwatch(){
        this.stopwatch.waitFlag = false;
    };

    stopReversedStopwatch(){
        this.stopwatch.waitFlag = true;
    }
    
    pomodoroCycle = async () => {
        for(var cycle = 1; cycle <= this.stopwatch.cycles; cycle++){
            if(cycle < this.stopwatch.cycles){
                this.startReversedStopwatch(this.stopwatch.workDuration);
                await wait(turnTimeIntoMs(this.stopwatch.workDuration));
                this.startReversedStopwatch(this.stopwatch.breakDuration);
                await wait(turnTimeIntoMs(this.stopwatch.breakDuration));
            } else {
                this.startReversedStopwatch(this.stopwatch.workDuration);
                await wait(turnTimeIntoMs(this.stopwatch.workDuration));
            }
        }
    }
};

export {Pomodoro};