function getCookieVal(offset){
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie(name){
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
        if (i == 0) {
            break;
        }
    }
}
function SetCookie(name, value, expires, path, domain, secure){
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path() : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure=" + secure : "");
}

var exp = new Date();
var tenYearsFromNow = exp.getTime() + (365*24*60*60*1000*10);
exp.setTime(tenYearsFromNow);

if (GetCookie("pmuser") == null) {
    var rand = Math.floor(Math.random() * 10000000)+1;
    SetCookie("pmuser", "pm"+rand, exp);
}
