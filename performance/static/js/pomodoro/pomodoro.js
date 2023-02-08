import { wait, turnTimeIntoMs, timeToMinutes, fromMinutesToStringTimeFormat} from '../tools.js'

class Pomodoro{

    constructor(stopwatchInstance, workTimeElement, resetButton, workOrBreakElement){
        this.stopwatch = stopwatchInstance;
        this.block_id = null;
        // stack of pomodoro actions
        this.pomodoroCallStack = [];

        //workTime that we display on the next pomodoro cycle
        this.workTimeElement = workTimeElement;
        this.workMinutes = null;
        this.resetButton = resetButton;
        this.workOrBreakElement = workOrBreakElement;
    }

    //set pomodoro values when page loads
    setPomodoroValues(){
        let workValue = this.stopwatch.workDuration.split(":");
        this.stopwatch.displayHoursElement.innerHTML = workValue[0];
        this.stopwatch.displayMinutesElement.innerHTML = workValue[1];
        this.stopwatch.displaySecondsElement.innerHTML = workValue[2];
    }

    async reversedStopwatch(){
        if(this.stopwatch.waitFlag === false) {
            console.log("substracting second");

            if(this.stopwatch.minutes == 0 && this.stopwatch.seconds == 0){
                this.stopwatch.hours--;
                this.stopwatch.minutes = 59;
                this.stopwatch.seconds = 60;
                this.stopwatch.displayMinutesElement.innerHTML = this.stopwatch.minutes;
            }
        
            if(this.stopwatch.seconds == 0){
                this.stopwatch.minutes--;
                this.stopwatch.seconds = 60;
        
                if(this.stopwatch.minutes <= 9){
                    this.stopwatch.displayMinutesElement.innerHTML = "0" + this.stopwatch.minutes;
                    this.stopwatch.displayMinutesElement.innerHTML = this.stopwatch.minutes;

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
                this.stopwatch.displayMinutesElement.innerHTML = this.stopwatch.minutes;

            }
        
            if(this.stopwatch.hours <= 9){
                this.stopwatch.displayHoursElement.innerHTML = "0" + this.stopwatch.hours;
            }
        
        } else {
            this.pomodoroCallStack[this.block_id].push("waitSecond");
        }
    };

    startReversedStopwatch(time){
        let splittedTime = time.split(":");  
        clearInterval(this.stopwatch.interval);
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

    pomodoroStackCreator(){
        for(let cycle = 1; cycle <= this.stopwatch.cycles; cycle++){
            if(cycle < this.stopwatch.cycles){
                this.pomodoroCallStack.push([
                    "work",
                    "waitWork"
                ]);
                this.pomodoroCallStack.push([
                    "break",
                    "waitBreak"
                ]);
            } else {
                this.pomodoroCallStack.push([
                    "work",
                    "waitWork"
                ]);
            }
        }
    }

    pomodoroCycle = async() => {
        this.pomodoroStackCreator();
        for(let block_id = 0; block_id < this.pomodoroCallStack.length; block_id++){
            this.block_id = block_id;
            for(let action_id = 0; action_id < this.pomodoroCallStack[block_id].length; action_id++){
                switch(this.pomodoroCallStack[block_id][action_id]){
                    case "work":
                        this.workOrBreakElement.innerHTML = "Work!";
                        this.startReversedStopwatch(this.stopwatch.workDuration);
                        break;
                    case "break":
                        this.workOrBreakElement.innerHTML = "Break!";
                        this.startReversedStopwatch(this.stopwatch.breakDuration);
                        break;
                    case "waitWork":
                        await wait(turnTimeIntoMs(this.stopwatch.workDuration));
                        this.workMinutes += timeToMinutes(this.stopwatch.workDuration)
                        break;
                    case "waitBreak":
                        await wait(turnTimeIntoMs(this.stopwatch.breakDuration));
                        break;
                    case "waitSecond":
                        await wait(1000);
                        break;
                    default:
                        throw new Error("Switch statement found unknown type of action");
                }
            }
        }
        this.workTimeElement.removeAttribute("value");
        this.workTimeElement.setAttribute("value", fromMinutesToStringTimeFormat(this.workMinutes));

        this.resetButton.click()
    }
};
export {Pomodoro};