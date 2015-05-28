<!--

//a collection of various functions for handling layer appearance swapping

var menuActive = 0;
var menuOn = 0;
var onLayer = null;
var timeOn = null;

isIE = (document.all ? true : false);
isDOM = (document.getElementById ? true : false);

function getDivStyle(divname) {
 var style;
 if (isDOM) { style = document.getElementById(divname).style; }
 else { style = isIE ? document.all[divname].style
                     : document.layers[divname]; } // NS4
 return style;
}

function hideElement(divname) {
 getDivStyle(divname).visibility = 'hidden';
}

function showElement(divname) {
 divstyle = getDivStyle(divname);
   if (timeOn != null) {
    clearTimeout(timeOn);
    hideElement(onLayer);
   }
	 divstyle.visibility = 'visible';
	 onLayer = divname;
}

function tabOut() {
 if (menuActive == 0) {
  hideElement(onLayer);
  }
}

function menuOver() {
 clearTimeout(timeOn);
 menuActive = 1;
}

function pageOut() {
 menuActive = 0;
 MM_swapImgRestore();
 tabOut(); }

function menuOut() {
 menuActive = 0;
 timeOn = setTimeout("tabOut()", 100); }
 
function overStuff(which) {
	whichdiv = which+"layer";
	showElement(whichdiv);
	menuOver(); }
	
//-->