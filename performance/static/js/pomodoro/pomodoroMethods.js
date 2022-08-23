class pomodoroMethods {

    static stopwatchReversed(stopwatchInstance){
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
    };

    static startReversedStopwatch(stopwatchInstance, time){
        console.log(`This is hours property ${stopwatchInstance.hours}`);
        var splittedTime = time.split(":");
        var startHours = splittedTime[0]; 
        var startMinutes = splittedTime[1];
        var startSeconds = splittedTime[2];
        stopwatchInstance.hours = parseInt(startHours);
        stopwatchInstance.minutes = parseInt(startMinutes);
        stopwatchInstance.seconds = parseInt(startSeconds);
        stopwatchInstance.interval = setInterval(() => { pomodoroMethods.stopwatchReversed(stopwatchInstance) }, 1000);
    };

    static turnTimeIntoMs(time){
        const splittedTime = time.split(":");
        if(splittedTime[0] == "00"){
            console.log(`This is ms value: ${splittedTime[1]}`);
            return splittedTime[1] * 60000
        } else {
            console.log(`This is s value: ${time[0] * 3600000}`);
            return splittedTime[0] * 3600000
        }
    }
    
    static wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    
    static pomodoro = async (stopwatchStarter, stopwatchInstance, cycles, workTime, breakTime) => {
        for(var cycle = 1; cycle <= cycles; cycle++){
            if(cycle < cycles){
                stopwatchStarter(stopwatchInstance, workTime);
                await pomodoroMethods.wait(pomodoroMethods.turnTimeIntoMs(workTime));
                stopwatchStarter(stopwatchInstance, breakTime);
                await pomodoroMethods.wait(pomodoroMethods.turnTimeIntoMs(breakTime));
            } else {
                stopwatchStarter(stopwatchInstance, workTime);
                await pomodoroMethods.wait(pomodoroMethods.turnTimeIntoMs(workTime));
            }
        }
    }
}

export {pomodoroMethods};
