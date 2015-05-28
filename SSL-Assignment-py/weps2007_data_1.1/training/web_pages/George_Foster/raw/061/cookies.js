/* dumps cookies into page variable */ 
	
	var oCookies = new Object();
	if (document.cookie && document.cookie != "") {	
		oCookies = processCookies();
	}

	
/* Rotates over all cookies and assigns them as attributes
to an object that is returned */
	
	function processCookies() {
		var strCookie = unescape(document.cookie);
		var arrCookies = strCookie.split(";");
		var oC = new Object();
		for(var i=0; i < arrCookies.length ; i++) {
			var c = arrCookies[i].split("=");	
			if (c.length == 2) {
				eval("oC." + c[0] + " = '" + c[1] + "'");
			}
		}
		return oC;
	}

	
/* Drops cookie of passed name, value and expiration time. intCookieFuture
is an offset from the time at which the cookie is dropped, measured in
seconds I believe */

	function dropCookie(strCookieName, strData, intCookieFuture) {
		if (!intCookieFuture) intCookieFuture = 0;
		var strCookie = strCookieName + "=" + escape(strData) + ";expires=" + cookieDate(intCookieFuture);
		document.cookie = strCookie;
		return true;
	}
	
	
/* Overwrites cookie with a date in the past so that
the cookie kills itself */

	function killCookie(strCookieName) {
		dropCookie(strCookieName, 0, -100000);
	}

	
/* Formats a date based on now + the passed number
of milliseconds */
	
	function cookieDate(intSeconds) {
		if (!intSeconds) intSeconds = 0;
		var now = new Date();
		now.setTime(now.getTime() + intSeconds);
		return now.toGMTString();
	}
	
	/**
 * Sets a Cookie with the given name and value.
 *
 * name       Name of the cookie
 * value      Value of the cookie
 * [expires]  Expiration date of the cookie (default: end of current session)
 * [path]     Path where the cookie is valid (default: path of calling document)
 * [domain]   Domain where the cookie is valid
 *              (default: domain of calling document)
 * [secure]   Boolean value indicating if the cookie transmission requires a
 *              secure transmission
 */
function setCookie(name, value, expires, path, domain, secure)
{
    document.cookie= name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function setSessionCookie (cookieName, cookieValue) {
 	document.cookie = escape(cookieName) + "=" + escape(cookieValue);
}

/**
 * Gets the value of the specified cookie.
 *
 * name  Name of the desired cookie.
 *
 * Returns a string containing value of specified cookie,
 *   or null if cookie does not exist.
 */
function getCookie(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

	