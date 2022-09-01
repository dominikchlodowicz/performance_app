class Pomodoro{

    constructor(stopwatchInstance){
        this.stopwatch = stopwatchInstance;
    }

    static wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async reversedStopwatch(){
        if(this.stopwatch.waitFlag === false) {
            console.log(`Current values ${this.stopwatch.hours}:${this.stopwatch.minutes}:${this.stopwatch.seconds}`);
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
                console.log("End of the interval");
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
        console.log(`These are the work values ${this.stopwatch.hours}:${this.stopwatch.minutes}:${this.stopwatch.seconds}`);
        this.stopwatch.interval = setInterval(() => { this.reversedStopwatch(this.stopwatch) }, 1000);
    };

    continueReversedStopwatch(){
        this.stopwatch.waitFlag = false;
    };

    stopReversedStopwatch(){
        console.log("stopping");
        this.stopwatch.waitFlag = true;
    }

    turnTimeIntoMs(time){
        const splittedTime = time.split(":");
        if(splittedTime[0] == "00"){
            return splittedTime[1] * 60000
        } else {
            return splittedTime[0] * 3600000
        }
    };
    
    pomodoroCycle = async (stopwatchStarter) => {
        for(var cycle = 1; cycle <= this.stopwatch.cycles; cycle++){
            if(cycle < this.stopwatch.cycles){
                await stopwatchStarter(this.stopwatch.workTime);
                await Pomodoro.wait(this.turnTimeIntoMs(this.stopwatch.workTime));
                await stopwatchStarter(this.stopwatch.breakTime);
                await Pomodoro.wait(this.turnTimeIntoMs(this.stopwatch.breakTime));
            } else {
                await stopwatchStarter(this.stopwatch.workTime, clickTimes);
                await Pomodoro.wait(this.turnTimeIntoMs(this.stopwatch.workTime));
            }
        }
    }
};

export {Pomodoro};