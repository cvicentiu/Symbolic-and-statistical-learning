function setCookie(name, value, expires, path, domain, secure)
{
	//next two lines so all pages on site can access cookie
	//domain = document.domain;
	path = "/";
	var curCookie = name + "=" + escape(value) +
	((expires) ? "; expires=" + expires.toGMTString() : "") +
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "")
	document.cookie = curCookie
}
function getCookie(name)
{
	var prefix = name + "="
	var cookieStartIndex = document.cookie.indexOf(prefix)
	if (cookieStartIndex == -1)
		return null
	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length)
	if (cookieEndIndex == -1)
		cookieEndIndex = document.cookie.length
	return unescape(document.cookie.substring(cookieStartIndex + prefix.length,cookieEndIndex))
}
function deleteCookie(name, path, domain)
{
   if (getCookie(name)) 
   {
      document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT"
   }
}
function fixDate(date)
{
   var base = new Date(0)
   var skew = base.getTime()
   if (skew > 0)
      date.setTime(date.getTime() - skew)
}
function daysFromNow(n) 
{
	var now = new Date();
	fixDate(now);
	now.setTime(now.getTime() + n * 86400000);
	return now;
}

function isCookie(name)
{
	return (getCookie(name) == "" || ""+getCookie(name) == "null" )?false:true;
}

