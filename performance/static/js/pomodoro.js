timerValue.value = '0:0:0';

const config_values = ['intervals', 'workDuration', 'breakDuration'];

var cookie = document.cookie;

function getCookie(cookie){
    const splittedCookiesList = cookie.split("; ");
    var cookies = {};
    for(var splittedCookie = 0; splittedCookie < splittedCookiesList.length; splittedCookie++){
        var cookie_name = '';
        var cookie_value = '';
        var flag = false;
        for(var char = 0; char < splittedCookiesList[splittedCookie].length; char++){
            if(splittedCookiesList[splittedCookie][char] == "="){
                flag = true;
                continue;
            }

            flag ? cookie_value += splittedCookiesList[splittedCookie][char] : cookie_name += splittedCookiesList[splittedCookie][char];
        }
        cookies[cookie_name] = cookie_value;
    }
    return cookies;
}

console.log(getCookie(cookie));

function startPomodoro(numberOfIntervals, durationOfInterval, durationOfIntervalTime,
     durationOfBreak, durationBreakTime){
  
}