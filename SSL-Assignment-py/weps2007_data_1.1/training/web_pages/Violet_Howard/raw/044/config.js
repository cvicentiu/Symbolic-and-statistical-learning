var BASE_URL = "/reelz/";
var MAXRATINGFILES = 1;
var MAXRATINGSPERFILE = 300;
var SITEVERSION = "0.9";

// in milliseconds. 500 = 1/2 second
var POPUP_DELAY = 1000;
var POPUP_LOADING_IMG = "assets/global/reelzLoading.gif";
//var POPUP_LOADING_IMG = "assets/global/dj1.gif";

var COOKIEDATE = new Date("December 31, 2010 12:00:00");

if(new String(document.location).indexOf("localhost")<0)
{
    BASE_URL = "/";
}
