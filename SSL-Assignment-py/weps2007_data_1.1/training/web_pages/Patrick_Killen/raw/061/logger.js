<!--
function S_setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}
function S_getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

// FOR ADMIN PURPOSES ONLY
function S_deleteCookie(name, path, domain) {
  if (S_getCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function fixDate(date) {
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0)
    date.setTime(date.getTime() - skew);
}

//create expire date (4 years out)
var now = new Date();
fixDate(now);
now.setTime(now.getTime() + 1460 * 24 * 60 * 60 * 1000);

//create session expire (120 minutes out)
var snow = new Date();
fixDate(snow);
snow.setTime(snow.getTime() + 120 * 60 * 1000);

var cookieID = S_getCookie("SwiftPersist");
var WTID = S_getCookie("SwiftPersist");
var sessionID = S_getCookie("SwiftSession");

if (!sessionID) {
    var curdate = new Date();
    h = curdate.getHours() + 10000;
    s = curdate.getSeconds() + 100;
    r = (h+s+Date.UTC() * -1);
    sessionID = r + Math.round (Math.random() * 1000000);
    
    //new visit, so update visit count
    var vc = S_getCookie("SwiftVC");
    if (vc) {
    	vc = parseInt(vc);
    	vc++;
    } else {
    	vc = 1;
    }
    S_deleteCookie("SwiftVC");
    S_setCookie("SwiftVC", vc, now, "/", "nevadaappeal.com");
}

if (!cookieID) {
    cookieID = sessionID;
    WTID = "-";
}
// set the cookies
S_setCookie("SwiftPersist", cookieID, now, "/", "nevadaappeal.com");
S_setCookie("SwiftSession", sessionID, snow, "/", "nevadaappeal.com");

  stats = "referrer=" + escape(window.document.referrer);
  stats += "&du=" + escape(location.href);
  stats += "&agent=" + escape(navigator.userAgent);
  stats += "&cid=" + WTID;

function RandomNumber(upper_limit)
{
return Math.round(upper_limit * Math.random());
}
var upper_limit = 500000;

  document.write('<img border="0" height="1" width="1" src="http://dcs.swiftnews.com/lw.php?'+stats+'&cb='+RandomNumber(upper_limit)+'">');

// -->
