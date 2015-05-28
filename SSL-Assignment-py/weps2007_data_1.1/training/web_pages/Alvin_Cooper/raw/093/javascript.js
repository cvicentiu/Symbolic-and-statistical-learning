<!--

window.onerror = null;
var menuActive = 0;
var menuOn = 0;
var onLayer = null;
var timeOn = null;
var urlstring = "http://www.freepress.net/";

window.name = 'mainFPwin';

isIE = (document.all ? true : false);
isDOM = (document.getElementById ? true : false);

function getDivStyle(divname) {
 var style;
 if (isDOM) { style = document.getElementById(divname).style; }
 else { style = isIE ? document.all[divname].style
                     : document.layers[divname]; } // NS4
 return style;
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function MM_jumpMenuGo(selName,targ,restore){ //v3.0
  var selObj = MM_findObj(selName); if (selObj) MM_jumpMenu(targ,selObj,restore);
}

function OpenPopup(whichpage) {
	window.open(urlstring+whichpage,'detailsWin','width=425,height=440,scrollbars=yes,resizable=yes,status=no');
}

function OpenDetail(whichorg) {
  window.open(urlstring+'action/orgs/orgdetails.php?id='+whichorg,'detailsWin','width=425,height=440,scrollbars=yes,resizable=yes,status=no');
  }
  
function EventInfo(whichevent) {
  window.open(urlstring+'action/eventinfo.php?id='+whichevent,'detailsWin','width=425,height=440,scrollbars=yes,resizable=yes,status=yes');
  }

function SendPage(pagetype,id) {
  window.open(urlstring+'news/sendpage.php?type='+pagetype+'&id='+id,'detailsWin','width=425,height=440,scrollbars=yes,resizable=yes,status=yes');
  }

function FormProcess(elem,newstr) {
	elem.value=newstr;
	elem.form.submit();
	elem.disabled=true;
	}

function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function getCookie(name) {
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

function alterTextSize(direction) {

	var newSize, newSizePx, newLeading, newLeadingPx;
	
	if (document.styleSheets[1].cssRules) {
       myStyle = document.styleSheets[0].cssRules[1].style; }
	else if (document.styleSheets[0].rules) {
       myStyle = document.styleSheets[0].rules[1].style; }

	var currentSize = myStyle.fontSize;
	var currentLeading = myStyle.lineHeight;

	var trimstart = currentSize.indexOf('px');
	var currentSizeNum = Number(currentSize.substring(0,trimstart));
	
	if (direction == "+") {
		newSize = currentSizeNum + 1;
		newLeading = newSize + 5;
		newSizePx = newSize + "px";
		newLeadingPx = newLeading + "px";
	} else if (direction == "-") {
		newSize = currentSizeNum - 1;
		newLeading = newSize + 5;
		newSizePx = newSize + "px";
		newLeadingPx = newLeading + "px";
	} else {
		newSizePx = currentSize;
		newLeadingPx = currentLeading;
	}
		
	myStyle.fontSize = newSizePx;
	myStyle.lineHeight = newLeadingPx;
	
	var today = new Date();
	var expiry = new Date(today.getTime() + 90 * 24 * 3600 * 1000);
	setCookie('fp_fontsize',newSize,expiry,"/","freepress.net");
	
}

function CheckTextSizeCookie() {

	if (getCookie('fp_fontsize')) {
		textsize = getCookie('fp_fontsize');
		if (document.styleSheets[1].cssRules) {
       		myStyle = document.styleSheets[0].cssRules[1].style; }
		else if (document.styleSheets[0].rules) {
       		myStyle = document.styleSheets[0].rules[1].style; }
		myStyle.fontSize = textsize + "px";
		var lineVal = parseInt(textsize) + 5;
		myStyle.lineHeight = lineVal + "px";
	}

}

function PreloadImages() {

   var num_args = PreloadImages.arguments.length;
   preloaded = new Array();
   
   for (i = 0; i < num_args; i++)
      {
         preloaded[i]     = new Image();
         preloaded[i].src = urlstring + PreloadImages.arguments[i];
      }
}

function RestoreImage(whichImg) {
	if (document.images[whichImg].lowsrc!=null) document.images[whichImg].src = document.images[whichImg].lowsrc;
}

function SwapImage(whichImg, newImgSrc) {
	tempimg = new Image();
	tempimg.src = newImgSrc;
	document.images[whichImg].lowsrc = document.images[whichImg].src
	document.images[whichImg].src = tempimg.src;
}

CheckTextSizeCookie();

PreloadImages('images/essential/left_signup_o.gif','images/essential/left_action_o.gif','images/essential/left_issues_o.gif');

//-->