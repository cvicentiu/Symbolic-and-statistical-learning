var expDays = '1'; // number of days the cookie should last
var expHours = ''; // number of hours the cookie should last

function SetCookie (name, value) {  
var argv = SetCookie.arguments;  
var argc = SetCookie.arguments.length;  
var expires = (argc > 2) ? argv[2] : null;  
var path = "/";
var domain = (argc > 4) ? argv[4] : null;  
var secure = (argc > 5) ? argv[5] : false;  
document.cookie = name + "=" + escape (value) + 
((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + 
((path == null) ? "/" : ("; path=" + path)) +  
((domain == null) ? "" : ("; domain=" + domain)) +    
((secure == true) ? "; secure" : "");
}

function getCookie (name) {  
	var arg = name + "=";  
	var alen = arg.length;  
	var clen = document.cookie.length;  
	var i = 0;  
	while (i < clen) {    
		var j = i + alen;    
		if (document.cookie.substring(i, j) == arg)      
		return getCookieVal (j);    
		i = document.cookie.indexOf(" ", i) + 1;    
		if (i == 0) break;   
	}  
	return null;
}

function getCookieVal(offset) {
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}


function DeleteCookie (name) {  
var exp = new Date();  
exp.setTime (exp.getTime() - 1);  
var cval = getCookie (name);  
document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
var exp = new Date(); 
if (!(expDays > 0)) expDays=1;
if (!(expHours > 0)) expHours=24;
exp.setTime(exp.getTime() + (expDays*expHours*60*60*1000));
function amt(){
var count = getCookie(cookieName)
if(count == null) {
SetCookie(cookieName,'1')
return 1
}
else {
var newcount = parseInt(count) + 1;
DeleteCookie(cookieName)
SetCookie(cookieName,newcount,exp)
return count
   }
}


