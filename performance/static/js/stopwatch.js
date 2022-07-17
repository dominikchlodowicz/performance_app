var hours = 0;
var minutes = 0;
var seconds = 0;
var displayHours = document.getElementById("hours");
var displayMinutes = document.getElementById("minutes");
var displaySeconds = document.getElementById("seconds");
var buttonStart = document.getElementById("start");
var buttonStop = document.getElementById("stop");
var buttonReset = document.getElementById("reset");
var timerValue = document.getElementById("timerValue");

var Interval;

function startStopwatch(){
    document.getElementById("timerValue").removeAttribute("value");
    seconds++;

    if(minutes == 59 && seconds == 59){
        minutes = 0;
        seconds = 0;
        displayMinutes.innerHTML = "0" + minutes;
        displaySeconds.innerHTML = "0" + seconds;
        
        hours++;
        if(hours <= 9){
            displayHours.innerHTML = "0" + hours;
        } else {
            displayHours.innerHTML = hours;
        }
    }

    if(seconds == 59){
        seconds = 0;
        displaySeconds.innerHTML = "0" + seconds;

        minutes++;
        if(minutes <+ 9){
            displayMinutes.innerHTML = "0" + minutes;
        } else {
            displayMinutes.innerHTML = minutes;
        }
    }

    if(seconds <= 9){
        displaySeconds.innerHTML = "0" + seconds;
    } else {
        displaySeconds.innerHTML = seconds;
    }

    timerValue.setAttribute("value", `${hours}:${minutes}:${seconds}`);
}

function stopStopwatch(){
    clearInterval(Interval);
}

function start(){
    Interval = setInterval(startStopwatch, 1000)
}


function reset(){
    clearInterval(Interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    displaySeconds.innerHTML = "0" + seconds;
    displayMinutes.innerHTML = "0" + minutes;
    displayHours.innerHTML = "0" + hours;
}

buttonStart.onclick = start;
buttonStop.onclick = stopStopwatch;

buttonReset.addEventListener('click', () => {
    reset();
});


