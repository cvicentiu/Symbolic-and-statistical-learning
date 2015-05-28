
//
// Sets cookie values.
//
function setCookie(name, value, expiredays) {
    var ExpireDate = new Date ();
    ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));

	document.cookie = name + "=" + escape(value)
         + "; path=/" +
	   "; domain=.sparknotes.com"
         + ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());

}

//
// Gets cookie values.
//
function getCookie(Name) {
	var search = Name + "=" ;
	if (document.cookie.length > 0) { // if there are any cookies
		offset = document.cookie.indexOf(search) ;
		if (offset != -1) { // if cookie exists
			offset += search.length ;
			// set index of beginning of value
			end = document.cookie.indexOf(";", offset) ;
			// set index of end of cookie value
			if (end == -1) end = document.cookie.length
			return unescape(document.cookie.substring(offset, end));
		}
	}
}


//
// Drops a test cookie
//
function setTestCookie() {
	var date = new Date();
	setCookie('testcookie', Math.floor(date.getTime() / 1000));
}
