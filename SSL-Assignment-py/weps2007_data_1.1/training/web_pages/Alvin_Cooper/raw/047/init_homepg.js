// ultimate browser sniffer from netscape
// see http://developer.netscape.com/docs/examples/javascript/browser_type.html for docs
// convert all characters to lowercase to simplify testing 
var agt=navigator.userAgent.toLowerCase(); 
// *** BROWSER VERSION *** 
// Note: On IE5, these return 4, so use is_ie5up to detect IE5. 
var is_major = parseInt(navigator.appVersion); 
var is_minor = parseFloat(navigator.appVersion); 
// Note: Opera and WebTV spoof Navigator.  We do strict client detection. 
// If you want to allow spoofing, take out the tests for opera and webtv. 
var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1) 
            && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1) 
            && (agt.indexOf('webtv')==-1)); 
var is_nav2 = (is_nav && (is_major == 2)); 
var is_nav3 = (is_nav && (is_major == 3)); 
var is_nav4 = (is_nav && (is_major == 4)); 
var is_nav4up = (is_nav && (is_major >= 4)); 
var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) || 
                      (agt.indexOf("; nav") != -1)) ); 
var is_nav5 = (is_nav && (is_major == 5)); 
var is_nav5up = (is_nav && (is_major >= 5)); 

var is_ie   = (agt.indexOf("msie") != -1); 
var is_ie3  = (is_ie && (is_major < 4)); 
var is_ie4  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")==-1) ); 
var is_ie4up  = (is_ie  && (is_major >= 4)); 
var is_ie5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) ); 
var is_ie5up  = (is_ie  && !is_ie3 && !is_ie4); 

// KNOWN BUG: On AOL4, returns false if IE3 is embedded browser 
// or if this is the first browser window opened.  Thus the 
// variables is_aol, is_aol3, and is_aol4 aren't 100% reliable. 
var is_aol   = (agt.indexOf("aol") != -1); 
var is_aol3  = (is_aol && is_ie3); 
var is_aol4  = (is_aol && is_ie4); 

var is_opera = (agt.indexOf("opera") != -1); 
var is_webtv = (agt.indexOf("webtv") != -1); 

// *** JAVASCRIPT VERSION CHECK *** 
var is_js; 
if (is_nav2 || is_ie3) is_js = 1.0 
else if (is_nav3 || is_opera) is_js = 1.1 
else if ((is_nav4 && (is_minor <= 4.05)) || is_ie4) is_js = 1.2 
else if ((is_nav4 && (is_minor > 4.05)) || is_ie5) is_js = 1.3 
else if (is_nav5) is_js = 1.4 
// NOTE: In the future, update this code when newer versions of JS 
// are released. For now, we try to provide some upward compatibility 
// so that future versions of Nav and IE will show they are at 
// *least* JS 1.x capable. Always check for JS version compatibility 
// with > or >=. 
else if (is_nav && (is_major > 5)) is_js = 1.4 
else if (is_ie && (is_major > 5)) is_js = 1.3 
// HACK: no idea for other browsers; always check for JS version with > or >= 
else is_js = 0.0; 

// *** PLATFORM ***
var is_win   = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
// NOTE: On Opera 3.0, the userAgent string includes "Windows 95/NT4" on all
//        Win32, so you can't distinguish between Win95 and WinNT.
var is_win95 = ((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1));

// is this a 16 bit compiled version?
var is_win16 = ((agt.indexOf("win16")!=-1) || 
           (agt.indexOf("16bit")!=-1) || (agt.indexOf("windows 3.1")!=-1) || 
           (agt.indexOf("windows 16-bit")!=-1) );  

var is_win31 = ((agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("win16")!=-1) ||
                (agt.indexOf("windows 16-bit")!=-1));

// NOTE: Reliable detection of Win98 may not be possible. It appears that:
//       - On Nav 4.x and before you'll get plain "Windows" in userAgent.
//       - On Mercury client, the 32-bit version will return "Win98", but
//         the 16-bit version running on Win98 will still return "Win95".
var is_win98 = ((agt.indexOf("win98")!=-1) || (agt.indexOf("windows 98")!=-1));
var is_winnt = ((agt.indexOf("winnt")!=-1) || (agt.indexOf("windows nt")!=-1));
var is_win32 = (is_win95 || is_winnt || is_win98 || 
                ((is_major >= 4) && (navigator.platform == "Win32")) ||
                (agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1));

var is_os2   = ((agt.indexOf("os/2")!=-1) || 
                (navigator.appVersion.indexOf("OS/2")!=-1) ||   
                (agt.indexOf("ibm-webexplorer")!=-1));

var is_mac    = (agt.indexOf("mac")!=-1);
var is_mac68k = (is_mac && ((agt.indexOf("68k")!=-1) || 
                           (agt.indexOf("68000")!=-1)));
var is_macppc = (is_mac && ((agt.indexOf("ppc")!=-1) || 
                            (agt.indexOf("powerpc")!=-1)));


// pick stylesheet based on browser

// if windows + nav 6
if (is_win && is_nav5up) {
	document.write('<link rel="stylesheet" type="text/css" href="/win_ns6.css" title="master">');
	}
// windows + navigator
else if (is_win && is_nav) {
	document.write('<link rel="stylesheet" type="text/css" href="/win_ns.css" title="master">');
	}
// windows + opera
else if (is_win && is_opera) {
	document.write('<link rel="stylesheet" type="text/css" href="/win_ns.css" title="master">');
	}
// windows + ie
else if (is_win && is_ie) {
	document.write('<link rel="stylesheet" type="text/css" href="/win_ie.css" title="master">');
	}
	// windows + ie (hopefully ie 6)
else if (is_win && is_ie5up) {
	document.write('<link rel="stylesheet" type="text/css" href="/win_ie.css" title="master">');
	}
// mac + nav6
else if (is_mac && is_nav5up) {
	document.write('<link rel="stylesheet" type="text/css" href="/mac_ns6.css" title="master">');
	}
// mac + navigator
else if (is_mac && is_nav) {
	document.write('<link rel="stylesheet" type="text/css" href="/mac_ns.css" title="master">');
	}
// mac + ie
else if (is_mac && is_ie) {
	document.write('<link rel="stylesheet" type="text/css" href="/mac_ie.css" title="master">');
	}
// everybody else
else {
	document.write('<link rel="stylesheet" type="text/css" href="/win_ie.css" title="master">');
	}
// popup an error window if agent is mac ie 4.01 
if ((is_mac && is_ie4) && (navigator.appVersion.indexOf("4.01")!=-1) && (getCookie("hide_upgrade_window") != "true")) {
	createWindow("/upgrade_from_ie401mac.html","upgrade_me","statusbar,menubar,height=300,width=300,resizable");
}
// **************** Netscape Resize bug ********************
/**
 * resize.js 0.3 970811
 * by gary smith
 * js component for "reloading page onResize"
 */
if(!window.saveInnerWidth) {
  window.onresize = resizeIt;
  window.saveInnerWidth = window.innerWidth;
  window.saveInnerHeight = window.innerHeight;
}

function resizeIt() {
    if (saveInnerWidth < window.innerWidth || 
        saveInnerWidth > window.innerWidth || 
        saveInnerHeight > window.innerHeight || 
        saveInnerHeight < window.innerHeight ) 
    {
        window.history.go(0);
    }
}
// **************** Netscape Resize bug ********************	
	
/* function used in the forums so form elements have an onClick associated with them */

function changeUrl(url)
{
	window.location.assign(url);
}

/*****************************************************
* ypSlideOutMenu
* 3/04/2001
* 
* a nice little script to create exclusive, slide-out
* menus for ns4, ns6, mozilla, opera, ie4, ie5 on 
* mac and win32. I've got no linux or unix to test on but 
* it should(?) work... 
*
* --youngpup--
*****************************************************/
ypSlideOutMenu.Registry = []
ypSlideOutMenu.aniLen = 200
ypSlideOutMenu.hideDelay = 100
ypSlideOutMenu.minCPUResolution = 10
function ypSlideOutMenu(id, dir, left, top, width, height)
{
this.ie = document.all ? 1 : 0
this.ns4 = document.layers ? 1 : 0
this.dom = document.getElementById ? 1 : 0
if (this.ie || this.ns4 || this.dom) {
this.id = id
this.dir = dir
this.orientation = dir == "left" || dir == "right" ? "h" : "v"
this.dirType = dir == "right" || dir == "down" ? "-" : "+"
this.dim = this.orientation == "h" ? width : height
this.hideTimer = false
this.aniTimer = false
this.open = false
this.over = false
this.startTime = 0
this.gRef = "ypSlideOutMenu_"+id
eval(this.gRef+"=this")
ypSlideOutMenu.Registry[id] = this
var d = document
d.write('<style type="text/css">')
d.write('#' + this.id + 'Container { visibility:hidden; ')
d.write('left:' + left + 'px; ')
d.write('top:' + top + 'px; ')
d.write('overflow:hidden; }')
d.write('#' + this.id + 'Container, #' + this.id + 'Content { position:absolute; ')
d.write('width:' + width + 'px; ')
d.write('height:' + height + 'px; ')
d.write('clip:rect(0 ' + width + ' ' + height + ' 0); ')
d.write('}')
d.write('</style>')
this.load()
}
}
ypSlideOutMenu.prototype.load = function() {
var d = document
var lyrId1 = this.id + "Container"
var lyrId2 = this.id + "Content"
var obj1 = this.dom ? d.getElementById(lyrId1) : this.ie ? d.all[lyrId1] : d.layers[lyrId1]
if (obj1) var obj2 = this.ns4 ? obj1.layers[lyrId2] : this.ie ? d.all[lyrId2] : d.getElementById(lyrId2)
var temp
if (!obj1 || !obj2) window.setTimeout(this.gRef + ".load()", 100)
else {
this.container = obj1
this.menu = obj2
this.style = this.ns4 ? this.menu : this.menu.style
this.homePos = eval("0" + this.dirType + this.dim)
this.outPos = 0
this.accelConst = (this.outPos - this.homePos) / ypSlideOutMenu.aniLen / ypSlideOutMenu.aniLen 
if (this.ns4) this.menu.captureEvents(Event.MOUSEOVER | Event.MOUSEOUT);
this.menu.onmouseover = new Function("ypSlideOutMenu.showMenu('" + this.id + "')")
this.menu.onmouseout = new Function("ypSlideOutMenu.hideMenu('" + this.id + "')")
this.endSlide()
}
}
ypSlideOutMenu.showMenu = function(id)
{
var reg = ypSlideOutMenu.Registry
var obj = ypSlideOutMenu.Registry[id]
if (obj.container) {
obj.over = true
for (menu in reg) if (id != menu) ypSlideOutMenu.hide(menu)
if (obj.hideTimer) { reg[id].hideTimer = window.clearTimeout(reg[id].hideTimer) }
if (!obj.open && !obj.aniTimer) reg[id].startSlide(true)
}
}
ypSlideOutMenu.hideMenu = function(id)
{
var obj = ypSlideOutMenu.Registry[id]
if (obj.container) {
if (obj.hideTimer) window.clearTimeout(obj.hideTimer)
obj.hideTimer = window.setTimeout("ypSlideOutMenu.hide('" + id + "')", ypSlideOutMenu.hideDelay);
}
}
ypSlideOutMenu.hide = function(id)
{
var obj = ypSlideOutMenu.Registry[id]
obj.over = false
if (obj.hideTimer) window.clearTimeout(obj.hideTimer)
obj.hideTimer = 0
if (obj.open && !obj.aniTimer) obj.startSlide(false)
}
ypSlideOutMenu.prototype.startSlide = function(open) {
this[open ? "onactivate" : "ondeactivate"]()
this.open = open
if (open) this.setVisibility(true)
this.startTime = (new Date()).getTime() 
this.aniTimer = window.setInterval(this.gRef + ".slide()", ypSlideOutMenu.minCPUResolution)
}
ypSlideOutMenu.prototype.slide = function() {
var elapsed = (new Date()).getTime() - this.startTime
if (elapsed > ypSlideOutMenu.aniLen) this.endSlide()
else {
var d = Math.round(Math.pow(ypSlideOutMenu.aniLen-elapsed, 2) * this.accelConst)
if (this.open && this.dirType == "-") d = -d
else if (this.open && this.dirType == "+") d = -d
else if (!this.open && this.dirType == "-") d = -this.dim + d
else d = this.dim + d
this.moveTo(d)
}
}
ypSlideOutMenu.prototype.endSlide = function() {
this.aniTimer = window.clearTimeout(this.aniTimer)
this.moveTo(this.open ? this.outPos : this.homePos)
if (!this.open) this.setVisibility(false)
if ((this.open && !this.over) || (!this.open && this.over)) {
this.startSlide(this.over)
}
}
ypSlideOutMenu.prototype.setVisibility = function(bShow) { 
var s = this.ns4 ? this.container : this.container.style
s.visibility = bShow ? "visible" : "hidden"
}
ypSlideOutMenu.prototype.moveTo = function(p) { 
this.style[this.orientation == "h" ? "left" : "top"] = this.ns4 ? p : p + "px"
}
ypSlideOutMenu.prototype.getPos = function(c) {
return parseInt(this.style[c])
}
ypSlideOutMenu.prototype.onactivate = function() { }
ypSlideOutMenu.prototype.ondeactivate = function() { }

/**********************************
End of drop down menus
**********************************/
// the following two functions are the rollover image swaps in the search.inc file
function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

function changeImages() {
	if (document.images) {
		for (var i=0; i<changeImages.arguments.length; i+=2) {
			document[changeImages.arguments[i]].src = changeImages.arguments[i+1];
		}
	}
}

//end of search.inc rollover functions

/* function or opening a popup window */
function createWindow(cUrl,cName,cFeatures) {
	var xWin = window.open(cUrl,cName,cFeatures);
	xWin.focus();
}
/* cookie functions, used to tell the user to update their browser 
 * modified from public domain functions found at http://www.hidaho.com/cookies/
 */

// 'internal' function used by the other cookie functions
function getCookieVal (offset) 
{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}
//  Function to return the value of the cookie specified by "name".
//    name - String object containing the cookie name.
//    returns - String object containing the cookie value, or null if
//      the cookie does not exist.
//
function getCookie (name) 
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) 
	{
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return getCookieVal (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

// sets a cookie. 
function setCookie (name,value,expires,path,domain,secure) 
{
	document.cookie = name + "=" + escape (value) +
	((expires) ? "; expires=" + expires.toGMTString() : "") +
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
}
// delete the cookie
function deleteCookie (name,path,domain) 
{
	if (getCookie(name)) 
	{
		document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

