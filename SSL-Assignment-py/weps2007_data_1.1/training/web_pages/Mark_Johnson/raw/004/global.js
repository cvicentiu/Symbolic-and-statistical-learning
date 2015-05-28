// ----------------------------------------------------------------------------
//   browser / feature detection
// ----------------------------------------------------------------------------

var FRAMEWINDOW_FIXED = 0x1;
var FRAMEWINDOW_MODAL = 0x2;

isIE = window.clientInformation ? true : false;
isN4 = document.layers ? true : false;
isN6  = navigator.appName == "Netscape" && parseInt(navigator.appVersion) >= 5;
isO5 = navigator.userAgent.indexOf("Opera") != -1 && parseInt(navigator.appVersion) >= 4;

ie = document.all != null && !isO5;
safari = navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Safari/85") == -1;
moz = !ie && !safari && document.getElementById != null && document.layers == null && navigator.userAgent.indexOf("Netscape/7.02") == -1 && (navigator.userAgent.indexOf("Gecko") || navigator.userAgent.indexOf("Firefox"));
mac = (navigator.userAgent.indexOf("Macintosh") != -1 || navigator.userAgent.indexOf("Mac_PowerPC") != -1);

if (safari) {
  document.write("<style> input.button, input.button[disabled] { font-size: 12px; } </style>");
}

var SquarespaceConstants = {

  POPUPS_DISABLED_MESSAGE : "It appears that you may have a popup blocker enabled that is preventing Squarespace from opening a new window.  You should either disable your popup blocker, or explicitly allow this site to create popups.\n\nMore information on this problem is available in the Troubleshooting area of the FAQ from our front website."

};

var Squarespace = window.Squarespace || {};

// ----------------------------------------------------------------------------
//   auto login state reconstruction helpers
// ----------------------------------------------------------------------------

function ql_nt(loc) {
  n = new Array();
  qidx = loc.indexOf('?');
  if (qidx == -1) {
    return( loc );
  }
  p = loc.substring(0, qidx);
  s = loc.substring(qidx+1).split('&');
  for( i = 0; i < s.length; ++i ) {
    if(!(s[i].indexOf('returnUrl') == 0) && !(s[i].indexOf('SS_CSAT') == 0)) {
      n[n.length] = s[i];
    }
  }
  if (p.indexOf("/process/") != -1) {
    p = "/";
  }
  return( p + (n.length ? '?' : '') + n.join('&') );
}

function ql_sifs() { return(''); }
function ql_sfs() { return(""); }

function ql_csat() {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var i = 30;
  var key = String();
  while( i-- > 0 ) { key += letters.charAt( Math.round( Math.random() * 25 ) ); }
  return( key );
}


// ----------------------------------------------------------------------------
//   oo stuff
// ----------------------------------------------------------------------------

var Class = {

  create: function(protoDef) {

    var c;

    if (protoDef.initialize) {
      c = function() {
        this.initialize.apply(this, arguments);
      };
    } else {
      c = function() { };
    }

    c.prototype = protoDef;

    // convert constants

    for (property in protoDef) {
      if (typeof(protoDef[property]) != "function") {
        c[property] = protoDef[property];
      }
    }

    // allow extension

    c.extend = function(protoDef) { // create a new class based on this one

      c = Class.create(protoDef); // recursive - create this as a class..

      if (protoDef) { // then introduce inherited properties from the current class..
        var base = this;
        for (property in base.prototype) {
          if (typeof(base.prototype[property]) == "function" && !c.prototype[property]) { // if it's a function, and there isn't a derived version
            c.prototype[property] = base.prototype[property];
          }
        }
      }

      return c;

    };

    return c;

  }

};

Function.prototype.bind = function(object) {

  var method = this;
  return function() {
    method.apply(object, arguments);
  };

};

function isDefined(o) {
  return( typeof(o) == "undefined" );
}


// ----------------------------------------------------------------------------
//   form submission / effects processing
// ----------------------------------------------------------------------------

function disableButtonForAction(buttonObj) {
  buttonObj.disabled = 'true';
}

function smartSubmit(buttonObj, formName) {
  confirmPageExit = false;
  disableButtonForAction( buttonObj );
  document.forms[formName].submit();
  return true;
}

function smartLocation(buttonObj, loc) {
  confirmPageExit = false;
  disableButtonForAction( buttonObj );
  document.location = loc;
  return true;
}

function smartGoBack(buttonObj) {
  confirmPageExit = false;
  disableButtonForAction( buttonObj );
  history.go(-1);
  return true;
}

function smartCancel() {
  if (confirmPageExit && !confirm("Are you sure you wish to navigate away from this page?\n\nYou have unsaved changes.  These changes will be lost if you leave this page\n\nPress OK to continue, or Cancel to stay on the current page.")) {
    return;
  }
  confirmPageExit = false;
  if (window.parent.closeWindow) {
    window.parent.closeWindow();
  } else {
    window.close();
  }
}

function openWindow(url, width, height, options) {
  var w = window.open(url, "EditWindow" + Math.round(Math.random() * 100000), "width=" + width + ",height=" + height + ",modal=" + (options & FRAMEWINDOW_MODAL) + ",scrollbars=no,resizable=yes,titlebar=yes,menubar=no,toolbar=no");
  if (!w) { alert( SquarespaceConstants.POPUPS_DISABLED_MESSAGE ); }
}

function getOpenerWindow() {
  return window.opener;
}

function getUsingFrameWindows() {
  return false;
}

function closeWindow() {
  window.close();
}

function scrollToElement(name) {
  window.scrollTo(0, getYCoord(document.getElementById(name)) - 100 );
}


// ----------------------------------------------------------------------------
//   misc utils
// ----------------------------------------------------------------------------

functionMap = new Array();
oldButtonColors = new Array();
numericChars = "0123456789";

function noop() { }

function copyToClipboard(resourceName, str, resourceIsText) {
  if (!resourceIsText) { resourceName = "\'" + resourceName + "\'"; }
  if (window.ie) {
    window.clipboardData.setData('text', str);
    showHelpTip(window.event, '<strong>URL Copied to Clipboard</strong><br/>The URL for ' + resourceName + ' has been copied to your clipboard.  To give this file to someone, simply paste this URL to them.' );
  } else {
    showObject( document.getElementById("clipboardTextContainer") );
    document.getElementById("clipboardTextFilename").innerHTML = resourceName + " ";
    document.getElementById("clipboardTextContent").innerHTML = str;
  }
}

function urlAttributeAdjust(url, name, val) {

  if (url.match(new RegExp("(\\?|\\&)" + name + "=([^&]*)", "g"))) {
    url= url.replace(new RegExp("(\\?|\\&)" + name + "=([^&]*)", "g"), "$1" + name + "=" + val);
  } else {
    if (url.indexOf("?") == -1) {
      url = url + "?" + name + "=" + val;
    } else {
      url = url + "&" + name + "=" + val;
    }
  }

  return( url );

}

function inputContainsErrors(targetId) {

  // method 1: fine errorText in it's standard title

  var titleObj = document.getElementById(targetId + '_title');
  if (titleObj) {
    var scanDivs = titleObj.getElementsByTagName("div");
    for (var i = 0; i < scanDivs.length; ++i) {
      if (scanDivs[i].className == "errorText") { return( true ); }
    }
  }
  return( false );

}

function autoFocus(formName, defaultFocus) {

  var f = document.forms[formName];
  if (!f) return;

  var elCount = f.elements.length;
  var errorsSeen = false;
  var focusEl = false;

  for (var i = 0; i < elCount; ++i) {
    el = f.elements[i];
    if (el.type == 'text' || el.type == 'edit' || el.type == 'password' || el.type == 'textarea' || el.type == 'checkbox' || el.type == 'radio' || el.type == 'select-one') {
      if (inputContainsErrors( el.id ) && !focusEl) {
        errorsSeen = true;
        focusEl = el;
      } else if (defaultFocus && !focusEl) {
        focusEl = el;
      }
    }
  }

  if (focusEl) focusEl.focus();

}

function createBreakableUrl(v) {
  if (safari) {
    breakChar = "&shy;";
  } else {
    breakChar = "<wbr/>";
  }
  return( v.replace(new RegExp("&", "g"), "&" + breakChar).replace(new RegExp("\\?", "g"), "?" + breakChar).replace(new RegExp("/", "g"), "/" + breakChar) );
}

function initFormEffects(formName) {

  if (!formName) {
    formName = "dataform";
  }

  var f = document.forms[formName];
  if (!f) return;

  var elCount = f.elements.length;

  for (var i = 0; i < elCount; i++) {

    el = f.elements[i];

    if (el.type == 'text' || el.type == 'edit' || el.type == 'password' || el.type == 'textarea' || el.type == 'checkbox' || el.type == 'select-one' || el.type == 'input') {

      var inSequence = false;
      var elNum, elName;
      var n = el.name;
      for (j=0; j < n.length; j++) {
        if (numericChars.indexOf( n.charAt(j) ) == -1) continue; // if we found a number in the string
        elName = n.substring(0, j);
        elNum  = n.substring(j);
        // if this is not the first item, and it doesnt have its own title, its part of a sequence
        if (elNum != "1" && document.getElementById(elName + '_title')) { inSequence = true; }
        break;
      }

      if (inSequence) {
        focusObjName = elName + '1_title';
      } else {
        focusObjName = el.name + '_title';
      }

      o = document.getElementById(focusObjName);
      if (o != null) {
        functionMap[el.name] = focusObjName;
        if (el.type == 'checkbox') {
          functionMap[o.id] = focusObjName;
        }
        el.onfocus = function() { var o = document.getElementById(functionMap[this.name]); if (o) o.style.fontWeight = 'bold'; };
        el.onblur  = function() { var o = document.getElementById(functionMap[this.name]); if (o) o.style.fontWeight = 'normal'; };
      }

    } else if (el.type == 'button' || el.type == 'submit') {

       //el.onfocus = function() { oldButtonColors[this.name] = this.style.backgroundColor; this.style.backgroundColor = '#BBBBBB'; };
       //el.onblur  = function() { this.style.backgroundColor = oldButtonColors[this.name]; };

    }

  }

}

// ----------------------------------------------------------------------------
//   add string helpers
// ----------------------------------------------------------------------------

Date.prototype.getFullYear =  function () { return( window.moz || window.safari ? this.getYear() + 1900 : this.getYear() ); };

String.prototype.trim =  function () { return this.replace(/^\s+/,'').replace(/\s+$/,''); };

String.prototype.endsWith = function(sEnd) {
  return (this.substr(this.length-sEnd.length)==sEnd);
};

String.prototype.startsWith = function(sStart) {
  return (this.substr(0,sStart.length)==sStart);
};

function trim(str) {
  var idx_start = 0;
  var idx_end = str.length - 1;
  while (str.charAt(idx_start) == ' ') { idx_start++; }
  while (str.charAt(idx_end) == ' ') { idx_end--; }
  return( str.substr(idx_start, (idx_end - idx_start + 1)) );
}


// ----------------------------------------------------------------------------
//   positioning functions
// ----------------------------------------------------------------------------

function getMouseRelativeX() {
  return( parseInt(window.event.clientX) );
}

function getMouseRelativeY() {
  return( parseInt(window.event.clientY) );
}

function getMouseX(e) {
  if (!e) var e = window.event;
  if (e.pageX) return e.pageX;
  return e.clientX + getViewportScrollX();
}

function getMouseY(e) {
  if (!e) var e = window.event;
  if (e.pageY) return e.pageY;
  return e.clientY + getViewportScrollY();
}

function getWidth(obj) {
  return( parseInt(obj.offsetWidth) );
}
function getHeight(obj) {
  return( parseInt(obj.offsetHeight) );
}
function getLeft(obj) {
  return( parseInt(obj.offsetLeft) );
}
function getTop(obj) {
  return( parseInt(obj.offsetTop) );
}

function setLeft(obj, distance) {
  obj.style.left = distance + "px";
}

function setTop(obj, distance) {
  obj.style.top = distance + "px";
}

function getXCoord(obj) {
  x = getLeft(obj);
  while (obj.offsetParent.tagName.toLowerCase() != "body" && obj.offsetParent.tagName.toLowerCase() != "html") {
    obj = obj.offsetParent;
    if (obj.offsetParent.tagName.toLowerCase() != "form") { x += getLeft(obj); }
  }
  return( x );
}

function getYCoord(obj) {
  y = getTop(obj);
  while (obj.offsetParent.tagName.toLowerCase() != "body" && obj.offsetParent.tagName.toLowerCase() != "html") {
    obj = obj.offsetParent;
    if (obj.offsetParent.tagName.toLowerCase() != "form") { y += getTop(obj); }
  }
  return( y );
}

function isVisible(obj) {
  return( obj.style.display != "none" );
}

function hideObject(obj) {
  if (obj) obj.style.display = "none";
}

function showObject(obj) {
  if (obj) obj.style.display = "";
}

function toggleVisibility(obj) {
  if (isVisible(obj)) {
    hideObject(obj);
  } else {
    showObject(obj);
  }
}

function getWindowHeight() {
  if (ie) {
    return( document.body.offsetHeight );
  } else {
    return( window.innerHeight );
  }
}

function getWindowWidth() {
  if (ie) {
    return( document.body.offsetWidth );
  } else {
    return( window.innerWidth );
  }
}

function getDocumentHeight() {
  if (ie) {
    return( document.body.scrollHeight );
  } else {
    return( document.documentElement.offsetHeight );
  }
}

function expandWindowHeight(factor) {
  if (ie) {
    window.resizeBy( 0, factor );
  } else {
    window.innerHeight = window.innerHeight + factor;
  }
}

function expandWindowWidth(factor) {
  if (ie) {
    window.resizeBy( factor, 0 );
  } else {
    window.innerWidth = window.innerWidth + factor;
  }
}

function getWindowScroll(w) {
  if (!w) {
    if (document.documentElement && document.documentElement.scrollTop) { return document.documentElement.scrollTop; }
    else if (document.body.scrollTop) { return document.body.scrollTop; }
    else if (window.pageYOffset) { return window.pageYOffset; }
  } else {
    if (w.document.documentElement && w.document.documentElement.scrollTop) {  return w.document.documentElement.scrollTop; }
    else if (w.document.body.scrollTop) { return w.document.body.scrollTop; }
    else if (w.pageYOffset) { alert( w.pageYOffset ); return w.pageYOffset; }
  }
  return( 0 );
}

function getCurrentUrl() {
  if (SS_RETURN_URL) {
    return( SS_RETURN_URL );
  } else {
    return( "/" );
  }
}

function getIFrameWindow(fName) {
  if (window.safari) {
    return( window.frames[fName] );
  } else {
    return( document.getElementById(fName).contentWindow );
  }
}

function suppressEnter(e, f) {
  if (!e) { e = window.event; }
  if (e.keyCode==13) { if (f) { f(); } return false; }
  return true;
}


// ----------------------------------------------------------------------------
//   viewport functions
// ----------------------------------------------------------------------------

function getViewportHeight() {
  if (self.innerHeight) // all except Explorer
  {
    y = self.innerHeight;
  }
  else if (document.documentElement && document.documentElement.clientHeight)
    // Explorer 6 Strict Mode
  {
    y = document.documentElement.clientHeight;
  }
  else if (document.body) // other Explorers
  {
    y = document.body.clientHeight;
  }
  return( y );
}

function getViewportWidth() {
  if (self.innerHeight) // all except Explorer
  {
    x = self.innerWidth;
  }
  else if (document.documentElement && document.documentElement.clientHeight)
    // Explorer 6 Strict Mode
  {
    x = document.documentElement.clientWidth;
  }
  else if (document.body) // other Explorers
  {
    x = document.body.clientWidth;
  }
  return( x );
}


function getViewportScrollX() {
  if (self.pageYOffset) // all except Explorer
  {
    x = self.pageXOffset;
  }
  else if (document.documentElement && document.documentElement.scrollTop)
    // Explorer 6 Strict
  {
    x = document.documentElement.scrollLeft;
  }
  else if (document.body) // all other Explorers
  {
    x = document.body.scrollLeft;
  }
  return( x );
}

function getViewportScrollY() {
  if (self.pageYOffset) // all except Explorer
  {
    y = self.pageYOffset;
  }
  else if (document.documentElement && document.documentElement.scrollTop)
    // Explorer 6 Strict
  {
    y = document.documentElement.scrollTop;
  }
  else if (document.body) // all other Explorers
  {
    y = document.body.scrollTop;
  }
  return( y );
}

function toggleContentElement(srcCheckbox, tgtElement) {
  if ( srcCheckbox.checked ) {
    showObject(tgtElement);
  } else {
    hideObject(tgtElement);
  }
}

function toggleContentElementByValue(val, tgtElement) {
  if ( val ) {
    showObject(tgtElement);
  } else {
    hideObject(tgtElement);
  }
}

// ----------------------------------------------------------------------------
//   cookie functions
// ----------------------------------------------------------------------------

function setCookie(sName, sValue, expires, path, domain) {
  document.cookie = sName + "=" + escape(sValue) + "; expires=" + (expires == null ? new Date("January 1, 2023").toGMTString() : expires) + "; path=" + ((path == null)  ? "/" : path) + ((domain == null)  ? "" : "; domain=" + domain);
}

function delCookie(sName, path, domain) {
  document.cookie = sName + "=" + escape(getCookie(sName)) + ";expires=" + new Date("December 31, 1975").toGMTString() + "; path=" + ((path == null) ? "/" : path) + ((domain == null)  ? "" : "; domain=" + domain);
}

function getCookie(sCookie) {
  var aCookie = document.cookie.split(";");
  for (var i = 0; i < aCookie.length; i++)
  {
    var aCrumb = aCookie[i].split("=");
    if (sCookie == trim(unescape(aCrumb[0]))) {
      return( unescape(aCrumb[1]) );
    }
  }
  return( null );
}

function getCookieDomain(fullhost) {
  var hs = fullhost.split(".");
  if (hs.length - 2 < 0) {
    return( "" );
  } else {
    return( "." + hs[hs.length - 2] + "." + hs[hs.length - 1] );
  }
}


// ----------------------------------------------------------------------------
//   form radio button helpers
// ----------------------------------------------------------------------------

function setRadioValue(formname, radioname, val) {

  obj = document.forms[formname][radioname];
  for(i=0;i<obj.length;i++) {
    if (obj[i].value == val) obj[i].checked = true;
  }

}

function getRadioValue(formname, radioname) {

  obj = document.forms[formname][radioname];
  for(i=0;i<obj.length;i++) {
    if (obj[i].checked) return( obj[i].value );
  }

}

function getRadio(formname, radioname, val) {

  obj = document.forms[formname][radioname];

  for(i=0;i<obj.length;i++) {
    if (obj[i].value == val) return( obj[i] );
  }

}

function getSelectOptionTitleByValue(formname, fieldName, val) {

  obj = document.forms[formname][fieldName];
  for (var i = 0; i < obj.length; ++i) {
    if (obj[i].value == val) { return( obj[i].text ); }
  }
  return( null );

}

function setFieldValue(formname, fieldName, val) {

  obj = document.forms[formname][fieldName];

  if (obj.tagName.toLowerCase() == "select") {

    for (var i = 0; i < obj.length; ++i) {
      if (obj[i].value == val) { obj.selectedIndex = i; break; }
    }

  } else {

    obj.value = val;

  }

}

function setFieldDisabled(formname, fieldName) {

  obj = document.forms[formname][fieldName];
  obj.style.color = '#727272';
  obj.style.backgroundColor = '#F9F9F9';
  obj.readOnly = 1;

}

function setFieldEnabled(formname, fieldName) {

  obj = document.forms[formname][fieldName];
  obj.style.color = '#000000';
  obj.style.backgroundColor = '#FFFFFF';
  obj.readOnly = 0;

}

function debug(msg) {

  dm = document.getElementById("debugAreaMessages");

  if (!dm) {

    da = document.createElement("div");
    da.id = "debugArea";
    document.body.appendChild(da);

    dh = document.createElement("div");
    dh.id = "debugAreaHeader";
    dh.innerHTML = "Debug Messages";
    da.appendChild(dh);

    dm = document.createElement("div");
    dm.id = "debugAreaMessages";
    da.appendChild(dm);

  }

  dm.style.bottom = "0px";
  dm.style.right = "0px";

  m = document.createElement("div");
  m.innerHTML = msg;
  dm.appendChild(m);

}

function isDefined(o) {

  return( typeof(o) == "undefined" );

}


function getStyle(oElm, strCssRule){
  var strValue = "";
  if(document.defaultView && document.defaultView.getComputedStyle){
    strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
  }
  else if(oElm.currentStyle){
    strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }
  return strValue;
}

// ----------------------------------------------------------------------------
//   event management
// ----------------------------------------------------------------------------

/*
AddEvent Manager (c) 2005 Angus Turnbull http://www.twinhelix.com
Free usage permitted as long as this credit notice remains intact.
*/

if (typeof aeOL == 'undefined')
{
 var aeOL = [];
 var addEvent = function(o, n, f, l)
 {
  var d = 'addEventListener', h = 'on' + n, t, a;
  if (o[d] && !l) return o[d](n, f, false);
  if (!o.aE) { o.aE = aeOL.length || 1; aeOL[o.aE] = { o:o } }
  t = aeOL[o.aE][n] || (aeOL[o.aE][n] = []);
  for (var i = 0; i < t.length; i++)
   for (var j = 0; j < t[i].length; j++)
    if (t[i][j] == f) return;
  if (o[h] && o[h]._ae)
  {
   a = t[t.length - 1];
   a[a.length] = f;
  }
  else
  {
   t[t.length] = o[h] ? [o[h], f] : [f];
   o[h] = new Function('e', 'var r = true, i = 0, o = aeOL[' + o.aE + '].o,' +
    'a = aeOL[' + o.aE + ']["' + n + '"][' + (t.length - 1) + '];' +
    'for (; i < a.length; i++) { ' +
   'o._f = a[i]; r = o._f(e||window.event) != false && r; o._f = null;' +
    '} return r');
   o[h]._ae = 1;
  }
 };

 var removeEvent = function(o, n, f, l)
 {
  var d = 'removeEventListener', t, a, i, j, s;
  if (o[d] && !l) return o[d](n, f, false);
  if (!o.aE || !aeOL[o.aE]) return;
  t = aeOL[o.aE][n];
  i = t.length;
  while (i--)
  {
   a = t[i];
   j = a.length;
   s = 0;
   while (j--)
   {
    if (a[j] == f) s = 1;
    if (s) a[j] = a[j + 1];
   }
   if (s) { a.length--; break }
  }
 };

}