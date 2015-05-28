function cookie_defined(name) {
  if (GetCookie(name) != null) { return 1;  }
  else { return 0;  }
}

function getCookieDomain() {
  var parts = window.location.hostname.split(".");
  var domain = '.' + parts.slice(parts.length-2)[0] + '.' + parts.slice(parts.length-1)[0];
  return domain;
} 

var visits = 0;

if (cookie_defined('sovc') == 0) { //new visitor, set counter to 1
  var exp = new Date();
  exp.setTime(exp.getTime() + 31536000000);
  document.cookie = 'sovc=1; expires='+exp.toGMTString()+'; path=/; domain='+getCookieDomain();
  document.cookie = 'sovcsession=1; path=/; domain='+getCookieDomain(); //session cookie 
  visits = 0;
}
else { //return visitor
  var sovc = parseInt(GetCookie('sovc'));
  if (cookie_defined('sovcsession') != 1) { //only increment once per visit
    if (sovc < 3) {
      sovc = sovc + 1; //incr during 1st 3 visits
      visits = sovc;
      var exp = new Date();
      exp.setTime(exp.getTime() + 31536000000);
      sovc = 'sovc='+sovc.toString()+'; expires='+exp.toGMTString()+'; path=/; domain='+getCookieDomain();
      document.cookie = sovc; //reset cookie
      }
    else { visits = 4; }
    document.cookie = 'sovcsession=1; path=/; domain='+getCookieDomain(); //session cookie
    }  
}

var cookieExists = GetCookie('RDB');

//first time every session/visit
//if ((cookieExists == null) && (visits == 0)) {

if ((cookieExists == null) && (cookie_defined('sovcserved') != 1)) {
document.write('<iframe src="/scripts/reg/regbox.html" width="480" height="175" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style="padding:0;border:0;margin:0;"></iframe>');
document.cookie = 'sovcserved=1; path=/; domain='+getCookieDomain(); //session cookie
}

function GetCookie (name) {
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
	
function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
  }  
