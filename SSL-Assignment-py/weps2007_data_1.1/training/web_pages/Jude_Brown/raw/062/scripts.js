
if(window.event + "" == "undefined") event = null;
function f_PopUp(){return false};
function f_PopDown(){return false};
popUp = f_PopUp;
popDown = f_PopDown;

pFontFamily = 'Times New Roman,Times,serif';
pFontSize = 10;
pFontBold = 1;
pFontItalic = 0;
pBorderWidth = 1;
pBorderColor = '#000000';
pBorderStyle = 'solid';
pSeparatorSize = 1;
pSeparatorColor = '#000000';
pImageSrc = 'images/arrow.gif';
pImageSrcLeft = '';
pImageSize = 5;
pImageHorizSpace = 0;
pImageVertSpace = 2;
pKeepHilite = 0; 
pClickStart = 0;
pClickKill = 0;
pChildOverlap = 5;
pChildOffset = 5;
pChildPerCentOver = 2;
pTopSecondsVisible = 2;
pStatusDisplayBuild = 0;
pStatusDisplayLink = 1;
pUponDisplay = null;
pUponHide = null;
pRightToLeft = false;
pCreateTopOnly = 1;
pShowLinkCursor = 1;
pNSFontOver = true;
     
var V5 = (document.getElementById) ? true : false;
var NS4 = (document.layers) ? true : false;
var IE = (document.all) ? true : false;
var IE4 = IE && !V5;
var Mac = (navigator.appVersion.indexOf('Mac') != -1);
var IE4M = IE4 && Mac;
var IE5M = IE && Mac;
var IE5W = IE && !Mac;

var Moz = (navigator.userAgent.indexOf('rv:0.9.') != -1) && (navigator.vendor != 'Netscape6');
var NS61 = (navigator.userAgent.indexOf('rv:0.9.') != -1) && (navigator.vendor == 'Netscape6');
var NS6 = (navigator.vendor == 'Netscape6') || (navigator.product == 'Gecko') && (navigator.userAgent.indexOf('rv:0.9.') == -1);
var NS6x = Moz && NS6 && NS61;

var IEDTD = (IE && document.doctype) ? document.doctype.name.indexOf('.dtd')!=-1 : false;
var IEnoDTD = IE && !IEDTD;
var IsMenu = (V5 || NS4 || (IE4 && !IE4M));
var brwsr = NS4 ? 'NS4' : V5 ? 'V5' : 'IE4';


function centerMenu(topmenu) {
	var TheMenu = V5 ? document.getElementById(topmenu) : IE4 ? document.all(topmenu) : eval('window.' + topmenu);
	var TheMenuWidth = V5 ? parseInt(TheMenu.style.width) : IE4 ? TheMenu.style.pixelWidth : TheMenu.clip.width;
	var TheWindowWidth = IE ? document.body.clientWidth : window.innerWidth;
	var menuPos;

	if (NS4) menuPos = (TheWindowWidth - TheMenuWidth + 82) / 2;
	
	else if (V5 && !IE) {
	     if (TheWindowWidth <= 800) menuPos = ((TheWindowWidth + 82) - TheMenuWidth) / 2;
	     else menuPos = ((TheWindowWidth + 97) - TheMenuWidth) / 2;
	}

	else menuPos = (TheWindowWidth - TheMenuWidth + 104) / 2;

     return (menuPos);
}

function topMenu() {
	var menuTop = 93;
     if (V5 && !IE) menuTop = menuTop - 6;
     return (menuTop);
}


if(IsMenu) {
	document.write('<scri' + 'pt language="JavaScript1.2" src="js/arrays.js" type="text/javascript"><\/scr' + 'ipt>');
	document.write('<scri' + 'pt language="JavaScript1.2" src="js/' + brwsr + '.js" type="text/javascript"><\/scr' + 'ipt>');
}

function gotLoaded(){
     alert('JS for browser type ' + brwsr + ' got loaded.')
     }