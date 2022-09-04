export function turnTimeIntoMs(time){
    const splittedTime = time.split(":");
    if(splittedTime[0] == "00"){
        return splittedTime[1] * 60000
    } else {
        return splittedTime[0] * 3600000
    }
};

export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
