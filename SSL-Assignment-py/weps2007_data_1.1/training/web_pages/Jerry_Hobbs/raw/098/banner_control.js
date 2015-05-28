//Below are percentage for 24/7 ad server per section and position, 0-100 range
lpathname = document.location.pathname.toLowerCase();

//***************************************
//TOP banner: 468, 728
//***************************************
THIRTEENTH_JUROR_TOP = 100;
CHAT_TOP = 100;
 
//regular index pages, news, people, trials, message_boards, etc
GENERIC_HEADER_TOP = 100;
GENERIC_TOP = 100;
NEWS_TOP = 100;

ONAIR_TOP = 100;
//ONAIR_TOP might not be in used

PEOPLE_TOP = 100;
STORE_TOP = 100;
TRIALS_TOP = 100;
VIDEO_TOP = 100;
BOOKSTORE_TOP = 100;
MESSAGEBOARDS_TOP = 100;

//***************************************
//RIGHT BANNER: 120,160
//***************************************
NEWS_RIGHT = 100;
GENERIC_RIGHT = 100;
	
ONAIR_RIGHT = 100;
//special conditions, 100% 24/7 for all forensics section
if (lpathname.indexOf("/tsg/") >=0)
{
	ONAIR_RIGHT = 100;
}

MESSAGEBOARDS_RIGHT = 100;

//***************************************
//MIDDLE BANNER: 300
//***************************************
//all middle is articles
ARTICLE_MIDDLE = 100;
GENERIC_MIDDLE = 100;

//multimedia middle is for photogalleries, 13thjuror, etc
MULTIMEDIA_MIDDLE = 50;
if (lpathname.indexOf("/onair/shows/hollywood_heat/") >=0)
{
	MULTIMEDIA_MIDDLE = 100;
}



//***************************************
//DO NOT EDIT BELOW
//***************************************
//advertising.com functions

function setCookie24(NameOfCookie, value, expirehours) {
var ExpireDate = new Date ();
ExpireDate.setTime(ExpireDate.getTime() + (expirehours * 3600 * 1000));
document.cookie = NameOfCookie + "=" + escape(value) + ((expirehours == null) ? "" : "; expires=" + ExpireDate.toGMTString()) + "; path=/;" ;
}
 
function getCookie24(name) {
 var beg = document.cookie.indexOf(name+"=");
 var len = beg+name.length+1;
 var end = document.cookie.indexOf(";",len);
 if (end == -1){
  end = document.cookie.length;
 }
 return unescape(document.cookie.substring(len,end));
}
 
function openWin24(site){
 var bnum=new Number(Math.floor(99999999 * Math.random())+1);
 
 document.write('<SCR'+'IPT LANGUAGE="JavaScript" ');
 document.write('SRC="http://servedby.advertising.com/site='+site+'/size=468060/bnum='+bnum+'/optn=1">');
 document.write('</SCR'+'IPT>');
}
function openWin120(site){
 var bnum=new Number(Math.floor(99999999 * Math.random())+1);
 
 document.write('<SCR'+'IPT LANGUAGE="JavaScript" ');
 document.write('SRC="http://servedby.advertising.com/site='+site+'/size=120600/bnum='+bnum+'/optn=1">');
 document.write('</SCR'+'IPT>');
}
function openWin300(site){
 var bnum=new Number(Math.floor(99999999 * Math.random())+1);
 
 document.write('<SCR'+'IPT LANGUAGE="JavaScript" ');
 document.write('SRC="http://servedby.advertising.com/site='+site+'/size=300250/bnum='+bnum+'/optn=1">');
 document.write('</SCR'+'IPT>');
}
 
//end advertising.com functions

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
  else begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1) end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

function setCookie(name, value, expires, path, domain, secure)
{
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}
function fixDate(date) 
{
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0) date.setTime(date.getTime() - skew);
}

//not used
function incAdView(pos)
{	
}