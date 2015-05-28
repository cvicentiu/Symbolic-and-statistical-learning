 // $Id: cookies.js,v 1.6 2006/08/26 03:55:09 nick Exp $

/* cookies.js */
/*
     Example File From "JavaScript and DHTML Cookbook"
     Published by O'Reilly & Associates
     Copyright 2003 Danny Goodman
*/

function isLoggedIn()
{
	cookie = getCookie('user');
	return (cookie && cookie.length > 10);
}

function getFirstName()
{
	return getValueFromQueryString('first', getCookie('user')); // defined in global.js
}
function getUserId()
{
	return getValueFromQueryString('id', getCookie('user')); // defined in global.js
}

function getExpDate(days, hours, minutes) {
    var expDate = new Date();
    if (typeof days == "number" && typeof hours == "number" && typeof hours == "number") {
        expDate.setDate(expDate.getDate() + parseInt(days));
        expDate.setHours(expDate.getHours() + parseInt(hours));
        expDate.setMinutes(expDate.getMinutes() + parseInt(minutes));
        return expDate.toGMTString();
    }
}

// utility function called by getCookie()
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    
    // javascript doesn't unescape '+' symbols (php encodes spaces as pluses), so do it manually.
    val = unescape(document.cookie.substring(offset, endstr));
    val = val.replace(/\+/g, ' ');
    return val;
}

// primary function to retrieve cookie by name
function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break; 
    }
    return '';
}

// store cookie value with optional details as needed
function setCookie(name, value, expires) {
    document.cookie = name + "=" + escape (value) +
        ((expires) ? "; expires=" + expires : "") +
        "; path=/; domain=.30boxes.com";
}

// remove the cookie by setting ancient expiration date
function deleteCookie(name,path,domain) {
    if (getCookie(name)) {
        document.cookie = name + "=; path=/; domain=.30boxes.com; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function getPrefInCookie(name, defaultValue)
{
	cookie = getCookie('prefs');
	if (cookie && cookie.length)
	{
//alert(name);
		start = cookie.indexOf('['+name+'|');
		if (start >= 0)
		{
			start += name.length+2;
			end = cookie.indexOf(']', start);
			return cookie.substring(start, end);
		}
	}

	return defaultValue;
}

function setPrefInCookie(name, value)
{
	oldValue = getPrefInCookie(name, '');
	// delete the old setting and add the new
	cookie = getCookie('prefs');
	strOld = '['+name+'|'+oldValue+']';
	start = cookie.indexOf(strOld);
	if (start >= 0)
	{
		part1 = cookie.substr(0, start);
		part2 = cookie.substr(start+strOld.length);
		cookie = part1 + part2;
	}
	// only add if there is a new value
	if (value.length)
		cookie += "["+name+"|"+value+"]";

	var expireDate = new Date();
	expireDate.setTime(expireDate.getTime() + (1000*60*60*24*365*10)); 
	setCookie('prefs', cookie, expireDate.toGMTString())
}
