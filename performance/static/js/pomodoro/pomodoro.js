import { wait, turnTimeIntoMs } from '../tools.js'

class Pomodoro{

    constructor(stopwatchInstance){
        this.stopwatch = stopwatchInstance;
        // stack of pomodoro actions
        this.pomodoroCallStack = [];
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
        const start = () => {
            var splittedTime = time.split(":");
            // setting pomodoro start values
            this.stopwatch.hours = parseInt(splittedTime[0]); 
            this.stopwatch.minutes = parseInt(splittedTime[1]);
            this.stopwatch.seconds = parseInt(splittedTime[2]);
            this.stopwatch.interval = setInterval(() => { this.reversedStopwatch(this.stopwatch) }, 1000);
            console.log("run startReversedStopwatch");
        }
        return start
    };

    continueReversedStopwatch(){
        this.stopwatch.waitFlag = false;
    };

    stopReversedStopwatch(){
        this.stopwatch.waitFlag = true;
    }

    pomodoroStackCreator(){
        for(var cycle = 1; cycle <= this.stopwatch.cycles; cycle++){
            if(cycle < this.stopwatch.cycles){
                this.pomodoroCallStack.push([
                    this.startReversedStopwatch.call(this, this.stopwatch.workDuration),
                    wait(turnTimeIntoMs(this.stopwatch.workDuration))
                ]);
                this.pomodoroCallStack.push([
                    this.startReversedStopwatch.call(this, this.stopwatch.breakDuration),
                    wait(turnTimeIntoMs(this.stopwatch.breakDuration))
                ]);
            } else {
                this.pomodoroCallStack.push([
                    this.startReversedStopwatch.call(this, this.stopwatch.workDuration),
                    wait(turnTimeIntoMs(this.stopwatch.workDuration))
                ]);
            }
        }
    }

    pomodoroCycle = async() => {
        this.pomodoroStackCreator();
        for(var block_id = 0; block_id < this.pomodoroCallStack.length; block_id++){
            for(var function_id = 0; function_id < this.pomodoroCallStack[block_id].length; function_id++){
                let action = this.pomodoroCallStack[block_id][function_id];
                console.log(function_id);
                console.log(`action type: ${typeof(this.pomodoroCallStack[block_id][function_id])}`);
                const pomodoroFunc = async (action) => {
                    if(block_id == 1){
                        await action.call(this);
                    } else {
                        action.call(this);
                    }
                };
                pomodoroFunc(action);
            }
        }
    }
};

export {Pomodoro};



// function func(num){
//     return function(){
//       alert(num);
//     }
//   }