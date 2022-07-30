class Stopwatch{

    #hours = null
    #minutes = null
    #seconds = null
    #timerValueElement = null
    #displayHoursElement = null
    #displayMinutesElement = null
    #displaySecondsElement = null

    static Builder = class {
        #hours = null
        #minutes = null
        #seconds = null
        #timerValueElement = null
        #displayHoursElement = null
        #displayMinutesElement = null
        #displaySecondsElement = null

        setTime(hours, minutes, seconds){
            this.#hours = hours;
            this.#minutes = minutes;
            this.#seconds = seconds;
        }

        setTimeDisplay(displayHoursElement, displayMinutesElement, displaySecondsElement){
            this.#displayHoursElement = displayHoursElement;
            this.#displayMinutesElement = displayMinutesElement;
            this.#displaySecondsElement = displaySecondsElement;
        }

        setDataPassElement(timerValueElement){
            this.#timerValueElement = timerValueElement;
        }

        build(){
            const stopwatch = new Stopwatch(
                this.#hours,
                this.#minutes,
                this.#seconds,
                this.#displayHoursElement,
                this.#displayMinutesElement,
                this.#displaySecondsElement,
                this.#timerValueElement)
            return stopwatch  
        }
    }

    constructor(hours, minutes, seconds, displayHoursElement, displayMinutesElement, displaySecondsElement, timerValueElement){
        this.#hours = hours;
        this.#minutes = minutes;
        this.#seconds = seconds;
        this.#displayHoursElement = displayHoursElement;
        this.#displayMinutesElement = displayMinutesElement;
        this.#displaySecondsElement = displaySecondsElement;
        this.#timerValueElement = timerValueElement;
        this.#interval;
    }

    stopwatch(){
        document.getElementById(`${this.timerValueElement}`).removeAttribute("value");
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
            if(this.minutes <+ 9){
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

    start(){
        this.interval = setInterval(this.stopwatch(), 1000);
    }

    stop(){
        clearInterval(this.Interval);
    }

    reset(){
        clearInterval(this.Interval);
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.displaySecondsElement.innerHTML = "0" + seconds;
        this.displayMinutesElement.innerHTML = "0" + minutes;
        this.displayHoursElement = "0" + hours;
    }
    
}

class Pomodoro extends Stopwatch{
    //TODO:implement pomodoro front-end functionality
}