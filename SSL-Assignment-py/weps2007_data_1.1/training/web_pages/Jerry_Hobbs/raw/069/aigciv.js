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


function init(width,height,left,top) {
	if (!isNaN(left))
	   document.getElementById("windowContainer").style.left = left + "px";
   else if (left == "right")
	   document.getElementById("windowContainer").style.left = (window.screen.availWidth - width - 22) + "px";
   else if (left == "left")
	   document.getElementById("windowContainer").style.left = 0 + "px";
	else
	   document.getElementById("windowContainer").style.left = window.screen.availWidth / 2 - (width / 2) + "px";

	if (!isNaN(top))
	   document.getElementById("windowContainer").style.top = top + "px";
   else if (top == "top")
	   document.getElementById("windowContainer").style.top = 0 + "px";
   else if (top == "bottom")
	   document.getElementById("windowContainer").style.top = (window.screen.availHeight - height - 120) + "px";
	else
	   document.getElementById("windowContainer").style.top = window.screen.availHeight / 2 - (height / 2) + "px";

	document.getElementById("controlBox").style.left = (width - 20) + "px";
	document.getElementById("windowContainer").style.height = height;
	document.getElementById("windowContainer").style.width = width;
	document.getElementById("windowTitle").style.width = (width -8) + "px";
	document.getElementById("windowContainerBorder1").style.width = (width - 2) + "px";
	document.getElementById("windowContainerBorder1").style.height = (height-2) + "px";
	document.getElementById("contentArea").style.width = (width-10) + "px";
	document.getElementById("contentArea").style.height = (height-40) + "px";
   
	document.getElementById("theframe").style.width = (width-10);
	document.getElementById("theframe").style.height = (height-40);
}

function doClose() {
	document.getElementById("windowContainer").style.display = "none";
}


function inview(url,width,height,left,top) {
   if (cookieset) {
      document.all.theframe.src = url;
      init(width,height,left,top);
      document.all.windowContainer.style.visibility = "visible";
   }
}

var cookieset;
var today = new Date();
var expiry = new Date(today.getTime() + 24 * 60 * 60 * 1000);

if (!getCookie("aigciv") && document.all) {
   setCookie("aigciv", 1, expiry, "/", "rednova.com", "");
   cookieset = 1;
   var dz=document;
   dz.writeln("<div id=\"windowContainer\"  unselectable=on>");
   dz.writeln("<div id=\"windowContainerBorder1\"></div>");
   dz.writeln("<div onSelect=\"return false\" id=\"windowTitle\"></div>");
   dz.writeln("<div id=\"controlBox\"><img src=\"/user_files/InView/control_box.gif\" border=\"0\" onclick=\"javascript:doClose();\" onmouseover=\"this.style.cursor='hand'\" /></div>");
   dz.writeln("<div id=\"contentArea\">");
   dz.writeln("      <iframe src=\"\" marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no id=theframe name=theframe></iframe>");
   dz.writeln("</div>");
   dz.writeln("<img src=\"/user_files/InView/track.php?src=float_window\" width=\"0\" height=\"0\"  style=\"display:none;\">");
   dz.writeln("</div>");
}