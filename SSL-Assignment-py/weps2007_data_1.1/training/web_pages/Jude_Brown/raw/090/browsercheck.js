// BrowserCheck Object
// provides most commonly needed browser checking variables
// 19990326

// Copyright (C) 1999 Dan Steinman
// Distributed under the terms of the GNU Library General Public License
// Available at http://www.dansteinman.com/dynapi/

function BrowserCheck() {
	var bAgent = navigator.userAgent;
	var b = navigator.appName;
	if (b=="Netscape") this.b = "ns"
	else if (b=="Microsoft Internet Explorer") this.b = "ie"
	else this.b = b;
	this.v = parseInt(navigator.appVersion);
	this.ns = (this.b=="ns" && this.v>=4);
	this.ns4 = (this.b=="ns" && this.v==4);
	this.ns5 = (this.b=="ns" && this.v==5);
	this.ns6 = (this.b=="ns" && navigator.userAgent.indexOf('Netscape6')>0);
	this.ie = (this.b=="ie" && this.v>=4 && !navigator.userAgent.indexOf('Mac'));
	this.ie4 = (navigator.userAgent.indexOf('MSIE 4')>0 && !navigator.userAgent.indexOf('Mac'));
	this.ie5 = (navigator.userAgent.indexOf('MSIE 5')>0);
	if (this.ie5) this.v = 5;
	this.min = (this.ns||this.ie);
	this.ie45Mac = (navigator.userAgent.indexOf('MSIE 4')>0 && navigator.userAgent.indexOf('Mac')>=0);
	this.ie5Mac = (navigator.userAgent.indexOf('MSIE 5')>0 && navigator.userAgent.indexOf('Mac')>=0);

	this.Moz = (bAgent.indexOf("Gecko") != -1);
	this.SAFARI = (bAgent.indexOf("Safari",0) != -1);
	this.ICAB = (bAgent.indexOf("iCab",0) != -1);
	this.OPERA = (bAgent.indexOf("Opera",0) != -1);
	this.FIREFOX = (bAgent.indexOf( "Firefox",0) != -1);
}

is = new BrowserCheck();

function platform() {
	this.v = parseFloat(navigator.appVersion);
	this.uA = navigator.userAgent;
	this.mac = false;
	this.pc = false;

	navigator.appVersion.indexOf('Mac') != -1?(this.mac = true):(this.pc = true);
}

plat = new platform();

// object detection for DOM
var isW3C = (document.getElementById) ? true : false;
var isAll = (document.all) ? true : false;


////// test for frame

function frameTest(){
	if(top==self) {
		var currURL = unescape(window.location.pathname);
		var xedStr = /_d\//i;
		if (is.min || is.ie5) {
			if (currURL.lastIndexOf('_d/','/') != -1) {
				newURL = currURL.replace(xedStr,'/');
				location.replace(newURL);
			}
		}
	}
}