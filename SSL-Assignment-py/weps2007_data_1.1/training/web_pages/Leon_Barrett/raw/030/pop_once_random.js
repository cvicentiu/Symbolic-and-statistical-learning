/* Message Board Script */
function open_img(url) 
{
    mywin = window.open(url,"win2",'toolbar=1,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=730,height=500');
}

function URLEncode( )
{
	// The Javascript escape and unescape functions do not correspond
	// with what browsers actually do...
	var SAFECHARS = "0123456789" +					// Numeric
					"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetci
					"abcdefghijklmnopqrstuvwxyz" +
					"-_.!~*'()";					// RFC2396 Mark characters
	var HEX = "0123456789ABCDEF";
	var plaintext = window.location.href;
	var encoded = "";
	for (var i = 0; i < plaintext.length; i++ ) {
		var ch = plaintext.charAt(i);
			    if (ch == " ") {
		    encoded += "+";				// x-www-urlencoded, rather than %20
		} else if (SAFECHARS.indexOf(ch) != -1) {
		    encoded += ch;
		} else {
		    var charCode = ch.charCodeAt(0);
			if (charCode > 255) {
			    alert( "Unicode Character '" + ch + "' cannot be encoded using standard URL encoding.\n" +
				        "(URL encoding only supports 8-bit characters.)\n" +
						"A space (+) will be substituted." );
				encoded += "+";
			} else {
				encoded += "%";
				encoded += HEX.charAt((charCode >> 4) & 0xF);
				encoded += HEX.charAt(charCode & 0xF);
			}
		} 
	} // for

	document.write('<img src="http://weblog.rivalsdm.com/nocache/trans.gif?' + encoded + '" width=1 height=1 border=0>');
	
	return false;
}


function openTicker(w) {
       OpenWin = this.open(w,'CtrlWindow','toolbar=0,status=0,scrollbars=1,resizable=1,width=265,height=475');
}


var MAXHITS = 1;        // number of time you want it to pop
var cookiename= "survey";
var popuptitle = "child";
var width=340;          // width of popup
var height=300;         // height of popup
var options='';         // options for popup 
var randomness='40';   // 1 in randomness chance of popping up
var url="http://www.soccer365.com/survey.html"; //path to popup content

var nHits = eval(getCookie(cookiename)); // get current count

var expdate = new Date();
expdate.setTime(expdate.getTime() +  (24 * 60 * 60 * 1000 * 365));

// setCookie
function setCookie (name, value, expires) {
        if (!expires) expires = new Date();
document.cookie = name + "=" + escape (value) + "; expires=" +
expires.toGMTString() +  "; path=/";
}

// number of page hits so far stored in cookie
nHits += 1;
setCookie(cookiename, nHits, expdate);

// getCookie
function getCookie (name) {
var dcookie = document.cookie;
var cname = name + "=";
var clen = dcookie.length;
var cbegin = 0;
while (cbegin < clen) {
 var vbegin = cbegin + cname.length;
 if (dcookie.substring(cbegin, vbegin) == cname) {
 var vend = dcookie.indexOf (";", vbegin);
 if (vend == -1) vend = clen;
 return unescape(dcookie.substring(vbegin, vend));
 }
 cbegin = dcookie.indexOf(" ", cbegin) + 1;
 if (cbegin == 0) break;
 }
return null;
}

 //** AOL
aol_checkjd='Mozilla/4.61 [en] (WinNT; I)';


var ableToPop = true;
if(aol_checkjd.indexOf("AOL") > 0) {
 ableToPop = false;
}

if (nHits > MAXHITS) {
 ableToPop = false;
}

//** browser **
bName = navigator.appName;
bVer = parseInt(navigator.appVersion);
version="n2";
if (bName == "Netscape" && bVer == 2) version = "n2";
if (bName == "Netscape" && bVer >= 3) version = "n3";
if (bName == "Microsoft Internet Explorer" && bVer >= 2) version = "e3";
if (bName == "Microsoft Internet Explorer" && bVer >= 4) version = "e4";

if ( version == "n2" || version == "e3" ) ableToPop = false;
if (navigator.appName.indexOf("WebTV") > -1 ) ableToPop=false;

// return true if random number generated == 1
function random() {
    if (1 == Math.floor(Math.random()*randomness)) {
        return true;
    } else {
        return false;
    }
}


// openPromo() pops the mini promo window.
function openPromo() {
 remote = window.open("",popuptitle,"width="+width+",height="+height);
 remote.location.href = url;
 if (remote.opener == null)  {
 remote.opener = window;
 }
 remote.opener.name = "opener";
}

// allow popup if generate correct random number
if (random()) {
    ableToPop = true;
} else {
    ableToPop = false;
}

if ( ableToPop )  {
 if (nHits==null) { setCookie (name, 1); openPromo(); }
 else
 { if (nHits<=MAXHITS) {
     setCookie (name, ++nHits);
     openPromo();
   }
 }
}
