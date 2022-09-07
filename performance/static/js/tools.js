export function turnTimeIntoMs(time){
    const splittedTime = time.split(":");
    if(splittedTime[0] == "00"){
        return splittedTime[1] * 60000
    } else {
        return splittedTime[0] * 3600000
    }
};

export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function waitTimeManipulation(pomodoroCallStack, blockId){
    pomodoroCallStack[blockId].push(wait(1000));
}

export function timeToMinutes(time){
    const splittedTime = time.split(":");
    let splittedTimeHours = splittedTime[0];
    let splittedTimeMinutes = splittedTime[1];
    let resultMinutes;
    if(splittedTimeHours == "00"){
        resultMinutes = parseInt(splittedTimeMinutes)
    } else {
        resultMinutes += 60 * parseInt(splittedTimeHours)
    }
    return resultMinutes;
}

export function fromMinutesToStringTimeFormat(minutes){
    let resultHours;
    let resultMinutes;
    if(minutes > 60){
        resultHours = Math.trunc(minutes/60);
        resultMinutes = minutes - (hours * 60);
    } else {
        resultHours = 0;
        resultMinutes = minutes;
    }
    return `${resultHours}:${resultMinutes}:00`
}