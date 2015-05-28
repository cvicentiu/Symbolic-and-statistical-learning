

<!------ OAS SETUP begin ------>
<!--

//tacoda ADP tags 11-28-2005 by brian
var tcdacmd="dt";
document.write('<SCR' + 'IPT LANGUAGE="Javascript" SRC="http://an.tacoda.net/an/11746/slf.js"></SCR' + 'IPT>');

strlen = document.location.search.length;
qstring = document.location.search.substring(1,strlen);

var path = document.location.pathname;
var patharr = path.split('/');
patharr[2] = parseInt(patharr[2]);

//configuration
OAS_url ='http://oas.signonsandiego.com/RealMedia/ads/';
//IF and ELSE puts Bottom position on page depending on section -- 
//It keeps popunders from running outside of news and sports. see Brian for details
if (patharr[1] == "news" || patharr[1] == "sports"){
OAS_listpos = 'TopRight,Position2,Position1,x05,x06,x07,x08,Right,Right1,Right2,Middle,Middle1,Middle3,Top,Bottom';
}
else {
OAS_listpos = 'TopRight,Position2,Position1,x05,x06,x07,x08,Right,Right1,Right2,Middle,Middle1,Middle3,Top';
}

OAS_query = qstring;
OAS_target = '_top';
OAS_sitepage = "www.uniontrib.com" + window.location.pathname; // <-- USE THIS ONE ONLY
//OAS_sitepage = "www.uniontrib.com/test.html"; // FOR TEST ONLY.
//end of configuration

OAS_version = 10;
OAS_rn = '001234567890'; OAS_rns = '1234567890';
OAS_rn = new String (Math.random()); OAS_rns = OAS_rn.substring (2, 11);
function OAS_NORMAL(pos) { 
document.write('<A HREF="' + OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" TARGET=_blank>');
document.write('<IMG SRC="' + OAS_url + 'adstream_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" BORDER=0></A>');
}
//-->

<!--
OAS_version = 11;
if (navigator.userAgent.indexOf('Mozilla/3') != -1)
OAS_version = 10;
if (OAS_version >= 11)
document.write('<SCR' + 'IPT LANGUAGE=JavaScript1.1 SRC="' + OAS_url + 'adstream_mjx.ads\/' + OAS_sitepage + '\/1' + OAS_rns + '@' + OAS_listpos + '?' + OAS_query + '"><\/SCR' + 'IPT>');
//-->

<!-- 
document.write('');
function OAS_AD(pos) {
if (OAS_version >= 11)
OAS_RICH(pos);
else
OAS_NORMAL(pos);
}
//-->




//######################################
//code below is for testing if cookies are allowed 
//second part of this project is in hitbox files

// this code goes in OAS

function getCookieDomain() {
  var parts = window.location.hostname.split(".");
  var domain = '.' + parts.slice(parts.length-2)[0] + '.' + parts.slice(parts.length-1)[0];
  return domain;
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


function SetCookie (name, value) {
      var argv = SetCookie.arguments;
      var argc = SetCookie.arguments.length;
      var expires = (argc > 2) ? argv[2] : null;
      var path = (argc > 3) ? argv[3] : null;
      var domain = (argc > 4) ? argv[4] : null;
      var secure = (argc > 5) ? argv[5] : false;
      document.cookie = name + "=" + escape (value) +
        ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
        ((path == null) ? "" : ("; path=" + path)) +
        ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");
}
    
function CookieUser(time, cname) {
	  // TIME IS THE NUMBER OF HOURS YOU PASS TO THE FUNCTION
        var expdate = new Date (); 
        expdate.setTime(expdate.getTime() + (time * 60 * 60 * 1000)); 
        SetCookie(cname, 'Yes', expdate, '/'); 
        return false;
		
}
//#######################################



//TACODA HEADER//Tacoda Header





//phantompop top check
//var toppopscript = 1;

