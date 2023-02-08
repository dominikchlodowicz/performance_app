export function getCookie(cookie){
    const splittedCookiesList = cookie.split("; ");
    let cookies = {};
    for(let splittedCookie = 0; splittedCookie < splittedCookiesList.length; splittedCookie++){
        let cookie_name = '';
        let cookie_value = '';
        let flag = false;
        for(let char = 0; char < splittedCookiesList[splittedCookie].length; char++){
            if(splittedCookiesList[splittedCookie][char] == "="){
                flag = true;
                continue;
            }

            flag ? cookie_value += splittedCookiesList[splittedCookie][char] 
                : cookie_name += splittedCookiesList[splittedCookie][char];
        }
        cookies[cookie_name] = cookie_value;
    }
    return cookies;
}