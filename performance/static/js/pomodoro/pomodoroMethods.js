class pomodoroMethods {

    static wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    static async reversedStopwatch(stopwatchInstance){
        if(stopwatchInstance.waitFlag){
            console.log("waiting")
        } else {
            console.log(`Current values ${stopwatchInstance.hours}:${stopwatchInstance.minutes}:${stopwatchInstance.seconds}`);
            stopwatchInstance.timerValueElement.removeAttribute("value");
        
            if(stopwatchInstance.minutes == 0 && stopwatchInstance.seconds == 0){
                stopwatchInstance.hours--;
                stopwatchInstance.minutes = 59;
                stopwatchInstance.seconds = 60;
                
                if(stopwatchInstance.hours <= 9){
                    stopwatchInstance.displayMinutesElement.innerHTML = "0" + stopwatchInstance.minutes;
                } else {
                    stopwatchInstance.displayMinutesElement.innerHTML = stopwatchInstance.minutes;
                }
            }
        
            if(stopwatchInstance.seconds == 0){
                stopwatchInstance.minutes--;
                stopwatchInstance.seconds = 60;
        
                if(stopwatchInstance.minutes <= 9){
                    stopwatchInstance.displayMinutesElement.innerHTML = "0" + stopwatchInstance.minutes;
                } else {
                    stopwatchInstance.displayMinutesElement.innerHTML = stopwatchInstance.minutes;
                }
            }
            stopwatchInstance.seconds--;
        
            if(stopwatchInstance.seconds <= 9){
                stopwatchInstance.displaySecondsElement.innerHTML = "0" + stopwatchInstance.seconds;
            } else {
                stopwatchInstance.displaySecondsElement.innerHTML = stopwatchInstance.seconds;
            }
        
            if(stopwatchInstance.minutes <= 9){
                stopwatchInstance.displayMinutesElement.innerHTML = "0" + stopwatchInstance.minutes;
            }
        
            if(stopwatchInstance.hours <= 9){
                stopwatchInstance.displayHoursElement.innerHTML = "0" + stopwatchInstance.hours;
            }
        
            if(stopwatchInstance.hours == 0 && stopwatchInstance.minutes == 0 && stopwatchInstance.seconds == 0){
                console.log("End of the interval");
                clearInterval(stopwatchInstance.interval);
            }
        
            stopwatchInstance.timerValueElement.setAttribute("value", `${stopwatchInstance.hours}:${stopwatchInstance.minutes}:${stopwatchInstance.seconds}`);
        }
    };

    static startReversedStopwatch(stopwatchInstance, time){
        var splittedTime = time.split(":");
        // setting pomodoro start values
        stopwatchInstance.hours = parseInt(splittedTime[0]); 
        stopwatchInstance.minutes = parseInt(splittedTime[1]);
        stopwatchInstance.seconds = parseInt(splittedTime[2]);
        console.log(`These are the work values ${stopwatchInstance.hours}:${stopwatchInstance.minutes}:${stopwatchInstance.seconds}`);
        stopwatchInstance.interval = setInterval(() => { pomodoroMethods.reversedStopwatch(stopwatchInstance) }, 1000);
    };

    static continueReversedStopwatch(stopwatchInstance){
        console.log(stopwatchInstance.waitFlag);
        stopwatchInstance.waitFlag = false;
    };

    static stopReversedStopwatch(stopwatchInstance){
        console.log("stopping");
        stopwatchInstance.waitFlag = true;
    }

    static turnTimeIntoMs(time){
        const splittedTime = time.split(":");
        if(splittedTime[0] == "00"){
            return splittedTime[1] * 60000
        } else {
            return splittedTime[0] * 3600000
        }
    };
    
    static pomodoroCycle = async (stopwatchStarter, stopwatchInstance, cycles, workTime, breakTime) => {
        for(var cycle = 1; cycle <= cycles; cycle++){
            if(cycle < cycles){
                await stopwatchStarter(stopwatchInstance, workTime);
                await pomodoroMethods.wait(pomodoroMethods.turnTimeIntoMs(workTime));
                await stopwatchStarter(stopwatchInstance, breakTime);
                await pomodoroMethods.wait(pomodoroMethods.turnTimeIntoMs(breakTime));
            } else {
                await stopwatchStarter(stopwatchInstance, workTime, clickTimes);
                await pomodoroMethods.wait(pomodoroMethods.turnTimeIntoMs(workTime));
            }
        }
    }
};

export {pomodoroMethods};