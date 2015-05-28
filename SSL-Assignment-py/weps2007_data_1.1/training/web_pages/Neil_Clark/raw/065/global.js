/* ===================================================
	Copyright (c) 2003-2005 Macromedia Inc.
	global JavaScript functions 
	$Revision: 1.75 $
==================================================== */
if( typeof com == "undefined" ) var com = new Object();
if( typeof com.adobe == "undefined" ) com.adobe = new Object();
if( typeof com.adobe.util == "undefined" ) com.adobe.util = new Object();
if( typeof com.adobe.www == "undefined" ) com.adobe.www = {
is: true,
isSecure: document.location.href.indexOf("https:") == 0
};
function OpenWindow( url, width, height, opt , name ) {
window.open( url, (name || "OutsideWindow"), "width="+(width || 714)+",height="+(height || 536)+","+(opt ||  "scrollbars=yes,menubar=yes,toolbar=yes,location=yes,status=yes,resizable=yes")).focus();
}
PNG = function (id,src,altsrc) {
var png = document.createElement('img');
png.setAttribute('id',id);
if (browser.ua.indexOf('msie 5.0') != -1) {
if (altsrc != null) png.src = altsrc;
else return;
} else if ((browser.appN.indexOf('microsoft') != -1) && (browser.ua.indexOf('mac') == -1)) {
png.src = '/images/alpha/blank.gif';
png.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"',sizingMethod='scale');";
} else {
png.src = src;
}
return png;
}
Randomize = function() { 
this.method = Math.random;
this.alphabet = "abcdefghijklmnopqrstuvwxyz";
return this;
}
Randomize.prototype = {
toNumber: function(num)
{
return Math.floor( this.method()*( Math.pow( 10, num || 1 ) ) );
},
inNumberRange: function( lo, hi)
{
return ( Math.floor( this.method()*(hi*2) )%( hi-lo+1 ) )+lo; 
},
toAlpha: function()
{
var i = this.inNumberRange( 0, this.alphabet.length-1);
return this.alphabet.charAt(i);
},
inAlphaRange: function(lo, hi)
{
var i = this.inNumberRange( this.alphabet.indexOf(lo), this.alphabet.indexOf(hi) );
return this.alphabet.charAt(i);
},
toId: function(num)
{
return this.toAlpha()+this.toNumber( num || 3 );
}
}
var randomize = new Randomize();
Function.prototype.method = function (name, func) {
this.prototype[name] = func;
return this;
};
function isAlien(a) {
return isObject(a) && typeof a.constructor != 'function';
}
function isArray(a) {
return isObject(a) && a.constructor == Array;
}
function isBoolean(a) {
return typeof a == 'boolean';
}
function isEmpty(o) {
var i, v;
if (isObject(o)) {
for (i in o) {
v = o[i];
if (isUndefined(v) && isFunction(v)) {
return false;
}
}
}
return true;
}
function isFunction(a) {
return typeof a == 'function';
}
function isNull(a) {
return typeof a == 'object' && !a;
}
function isNumber(a) {
return typeof a == 'number' && isFinite(a);
}
function isObject(a) {
return (a && typeof a == 'object') || isFunction(a);
}
function isString(a) {
return typeof a == 'string';
}
function isTag(a) {
return (a.nodeType && a.nodeType == 1);
}
function isUndefined(a) {
return typeof a == 'undefined';
} 
if (!isFunction(Function.apply)) {
Function.method('apply', function (o, a) {
var s = [], r, call;
if (!o) o = window;
if (!a) a = [];
for (var i = 0; i < a.length; i++) {
s[i] = "a["+i+"]";
}
call = "o.__method(" + s.join(",") + ");";
o.__method = this;
r = eval(call);
o.__method = null;
return r;
});
};
if (!isFunction(Array.prototype.pop)) {
Array.method('pop', function () {
return this.splice(this.length - 1, 1)[0];
});
};
if (!isFunction(Array.prototype.push)) {
Array.method('push', function () {
this.splice.apply(this,
[this.length, 0].concat(Array.prototype.slice.apply(arguments)));
return this.length;
});
};
if (!isFunction(Array.prototype.shift)) {
Array.method('shift', function () {
return this.splice(0, 1)[0];
});
};
if (!isFunction(Array.prototype.splice)) {
Array.method('splice', function (s, d) {
var max = Math.max,
min = Math.min,
a = [], 
e,  
i = max(arguments.length - 2, 0),   
k = 0,
l = this.length,
n,  
v,  
x;  
s = s || 0;
if (s < 0) {
s += l;
}
s = max(min(s, l), 0);  
d = max(min(isNumber(d) ? d : l, l - s), 0);    
v = i - d;
n = l + v;
while (k < d) {
e = this[s + k];
if (!isUndefined(e)) {
a[k] = e;
}
k += 1;
}
x = l - s - d;
if (v < 0) {
k = s + i;
while (x) {
this[k] = this[k - v];
k += 1;
x -= 1;
}
this.length = n;
} else if (v > 0) {
k = 1;
while (x) {
this[n - k] = this[l - k];
k += 1;
x -= 1;
}
}
for (k = 0; k < i; ++k) {
this[s + k] = arguments[k + 2];
}
return a;
});
};
if (!isFunction(Array.prototype.unshift)) {
Array.method('unshift', function () {
this.splice.apply(this,
[0, 0].concat(Array.prototype.slice.apply(arguments)));
return this.length;
});
};
if (!isFunction(Function.call)) {
Function.method('call', function () {
var o = arguments[0], s = [];
for (var i=1, len=arguments.length; i<len; i++) {
s.push("arguments["+i+"]");
}
o.__method = this;
r = eval("o.__method("+s.join(",")+")");
o.__method = null;
return r;
});
};
function $(s)
{
return document.getElementById(s);
}
function removeElementFromDOM (id) {
var element = $(id);
return element.parentNode.removeChild(element);
}
function resolveElemId(elem)
{
if(elem)
{
var id = elem.getAttribute('id');
if(!id) 
{			
id = randomize.toId();
while($(id))
{
id = randomize.toId();
}
elem.setAttribute('id', id);
}
return id;
}
return "";
}
var CachedElement = {
uberElements:{},
cacheElement:function(name) {
return CachedElement.uberElements[name]=document.createElement(name);
},
create:function(name) {
var query = CachedElement.uberElements[name] || CachedElement.cacheElement(name);
return query.cloneNode(false);
}
}
function getFirstTag(parent,tagname)
{
if(!parent) return null;
var nodes = parent.childNodes;
for(var i=0,len=nodes.length;i<len;i++)
{
var node = nodes[i];
if(node && node.nodeType == 1)
{
if(!tagname) return node;
else if(node.nodeName == tagname) return node;
else continue;	
}
}
return null;
}
function getChildTags(parent, tagname)
{
if(!parent) return null;
var output = new Array();
var nodes = parent.childNodes;
for(var i=0,len=nodes.length;i<len;i++)
{
var node = nodes[i];
if(node && node.nodeType == 1)
{
if(!tagname) output.push(node);
else if(node.nodeName == tagname) output.push(node);
else continue;
}
}
return output;
}
function attrExp(s)
{
return new RegExp("(^| )"+s+"( |$)"); 
}
function getAttrValue(node, attr)
{
if(node[attr] != null) return node[attr];
if(node.getAttribute(attr) != null) return node.getAttribute(attr);
return "";
}
function getAttributesAtMarker(attr,marker,name)
{
var output;
if(!attr) return output;
var params = attr.split(" ");
for(var i = 0, output, len=params.length; i<len; i++)
{
var p = params[i];
var m = (p.indexOf(marker) > -1);
var n = (p.indexOf(name) > -1);
if(m && n)
{
output = [];
continue;
}
else if(output)
{
if(m)
{
break;
}
else
{
output.push(p);
continue;
}
}
}
return output;
}
if( typeof com.adobe.css == "undefined" ) com.adobe.css = new Object();
com.adobe.css.makeLink = function( href, id, title, media, disabled )
{
var 
lk = document.createElement('link'),
i = arguments.length-1;
do
{
switch(i)
{
case 0: lk.setAttribute('href', arguments[0]); break;
case 1: lk.setAttribute('id', arguments[1]); break;
case 2: lk.setAttribute('title', arguments[2]); break;
case 3: lk.setAttribute('media', arguments[3]); break;
case 4: lk.setAttribute('disabled', arguments[4]); break;
}
}
while(i--);
lk.setAttribute('rel','stylesheet');
lk.setAttribute('type','text/css');
return lk;
}
com.adobe.css.getElementStyle = function( elem, attrstyle, propstyle )
{
if(typeof elem == 'string') elem = $(elem);
if(!elem) return "";
if(!propstyle) propstyle = attrstyle;
if (elem.style[propstyle]) 
{
return elem.style[propstyle];
}
else if(elem.currentStyle) 
{
return elem.currentStyle[propstyle];
}
else if(window.getComputedStyle) 
{
return window.getComputedStyle(elem,"").getPropertyValue(attrstyle);
}
else if (document.defaultView && document.defaultView.getComputedStyle) 
{
return document.defaultView.getComputedStyle(elem,"").getPropertyValue(attrstyle);
}
return "";
}
com.adobe.css.putRule = function( cssIndex,selectorIndex,selector,prop )
{
try
{
if(cssIndex.insertRule)
{
cssIndex.insertRule(selector+"{"+prop+"}",selectorIndex);
}
else if(css.addRule)
{
cssIndex.addRule(selector,prop,selectorIndex);
}
return selectorIndex;
}
catch(e)
{
return -1;
}
}
com.adobe.css.attachCssToDOM = function ( paths,dom )
{
if(!dom || !paths.length) return false;
var i = paths.length-1;
if(document.createStyleSheet)
{
do {
document.createStyleSheet(paths[i]);
} while (i--);
}
else if(document.createDocumentFragment)
{
var links = document.createDocumentFragment();
do {
links.appendChild(this.makeLink(paths[i]));
} while (i--);
dom.appendChild(links);
}
return true;
}
CSSProfile = function()
{
this.features = {};
this.seekfeatures = function() { return this};
return this;
}
CSSProfile.prototype.init = function()
{
var testready = this.buildtest.call(this.seekfeatures);
if(testready)
{
for(feature in this.featuretests)
{
this.features[feature] = this.featuretests[feature].call(this.seekfeatures);
}
this.isIE7 = (this.features.layout == true && this.features.stretch == false);
this.isIE5 = (this.features.layout == false && this.features.stretch == true);
}
this.removetest.call(this.seekfeatures);
}
CSSProfile.prototype.trace = function()
{
var str = "";
for(var i=0;i<arguments.length;i++)
{
var prop = this[arguments[i]];
if(prop && isObject(prop))
{
var sep = "";
for(v in prop)
{
str += (sep+v+"="+prop[v]);
sep = ", ";
}
}
}
alert(str);
}
CSSProfile.prototype.featuretests = {
base: function()
{
return com.adobe.css.getElementStyle(this.testelements[0],'position') == "absolute";
},
after: function()
{
return this.testelements[3].offsetHeight >= 4;
},
before: function()
{
var h = this.testelements[3].offsetHeight;
return h==4 || h > 5;
},
stretch: function()
{
return this.testelements[1].offsetHeight > 2; 
},
w3box: function()
{
return this.testelements[2].offsetWidth == 4;
},
iebox: function()
{
return this.testelements[2].offsetWidth == 2;
},
layout: function()
{
return com.adobe.css.getElementStyle(this.testelements[2],'hasLayout') == true; 
},
directchild: function()
{
return com.adobe.css.getElementStyle(this.testelements[2],'overflow') == 'hidden';
},
firstchild: function()
{
return com.adobe.css.getElementStyle(this.testelements[2],'direction') == 'rtl';
},
lastchild: function()
{
return com.adobe.css.getElementStyle(this.testelements[3],'direction') == 'rtl';
},
adjacent: function()
{
return com.adobe.css.getElementStyle(this.testelements[3],'clear') == 'right';
},
attribute: function()
{
return com.adobe.css.getElementStyle(this.testelements[1],'cursor') == 'crosshair';
}
}
CSSProfile.prototype.buildtest = function()
{
this.testelements = [];
var i=0;
while(i<5)
{
var div = CachedElement.create("div");
div.id = "testelem"+i;
this.testelements[i] = div;
i++
}		
this.testelements[0].appendChild(this.testelements[1]);
this.testelements[1].appendChild(this.testelements[2]);
this.testelements[1].appendChild(this.testelements[3]);
this.testelements[3].appendChild(this.testelements[4]);
document.body.appendChild(this.testelements[0]);
return true;
}
CSSProfile.prototype.removetest = function()
{
return this.testelements[0].parentNode.removeChild(this.testelements[0]);
}
com.adobe.cssprofile = new CSSProfile();
StyleEvent = function(elem)
{
this.elem = elem;
this.elem.styleEvent = this;
this.styles = new Object();
var styles = this.elem.className.split(' ');
for(var i=0, style; style=styles[i]; i++)
{
this.styles[style] = true;
}
this.add = function()
{
for(var i=0, argument; argument=arguments[i]; i++)
{
this.styles[argument] = (this.styles[argument]) ? true : false;
}
}
this.remove = function(stylename)
{
delete this.styles[stylename];
}
this.enable = function(stylename)
{
if(this.styles[stylename]) return;
if(this.styles[stylename] == 'undefined') return;
this.styles[stylename] = true;
this.elem.className = this.compile();
return;
}
this.disable = function(stylename)
{
if(!this.styles[stylename]) return;
this.styles[stylename] = false;
this.elem.className = this.compile();
return;
}
this.toggle = function(newstyle, currstyle)
{
if(this.styles[newstyle]) return false;
if(this.styles[currstyle]) this.styles[currstyle] = false;
this.styles[newstyle] = true;
this.elem.className = this.compile();
}
this.compile = function()
{
var output = "";
for(prop in this.styles)
{
if(this.styles[prop])
{
output += (prop+' ');
}
}
return output;
}
return this;
}	
var cookies;
function parseCookies() {
var cookiesHash = new Object();
var cookiesArray = document.cookie.split(';');
for (i=0; i < cookiesArray.length; i++) {
cookie = cookiesArray[i];
cookie = cookie.split('=');
cookiesHash[cookie[0]] = cookie[1];
}
return cookiesHash;
}
function getCookie (name) {
var value = null;
if (name != null) {
name = name.toUpperCase();
cookies = (cookies) ? cookies : parseCookies();
for (key in cookies) {
if (key.toUpperCase().match(name)) {
value = decodeURI(cookies[key]);
if (value.indexOf('%') != -1) value = unescape(value);
break;
}
}
}
return value;
}
function cookiesToString () { 
cookies = (cookies) ? cookies : parseCookies();
var fvString = new String();
if (arguments.length != 0) {
for (var i=0; i < arguments.length; i++) {
cookieName = arguments[i];
fvString += cookieName +'='+ getCookie(cookieName) +';';
}
} else {
for (cookie in cookies) {
fvString += cookie +'='+ cookies[cookie] +';';
}
}
return fvString;
}
function setCookie (name,value,msec,path,domain,secure) {
if (name != null) {
var now = new Date();
var exp_date = new Date(now.getTime()+(msec?msec:0));
var cookie = name+'='+escape(value)+';';
if (msec) cookie += 'expires='+exp_date.toUTCString()+';';
if (path) cookie += 'path='+path+';';
if (domain) cookie += 'domain='+domain+';';
if (secure) cookie += 'secure;';
document.cookie = cookie;
}
}
function selectFormAction (formID,dropdownID) { 
var selectedLink = document[formID][dropdownID].options[document[formID][dropdownID].selectedIndex].value;
if (selectedLink != '#') {
window.location=document[formID][dropdownID].options[document[formID][dropdownID].selectedIndex].value;
} else if (selectedLink == '#') {
document[formID][dropdownID].selectedIndex = 0;
}
}
Dimensions = function (w,h) { 
this.width = w || 0;
this.height = h || 0;
return this;
}
XYCoords = function (x,y) { 
this.x = x || 0;
this.y = y || 0;	
return this;
}
BoxCoords = function (x1,y1,x2,y2) {
this.x1 = x1 || 0;
this.y1 = y1 || 0;
this.x2 = x2 || 0;
this.y2 = y2 || 0;
return this;
}
function getEventCoords (e) {
var coords = new XYCoords();
if (e.pageX && e.pageY) {
coords.x = e.pageX;
coords.y = e.pageY;
} else if (e.clientX && e.clientY) {
coords.x = e.clientX + document.body.scrollLeft;
coords.y = e.clientY + document.body.scrollTop;
}
return coords;
}
function getElementBoxCoords(domElement) {
this.element = domElement;
this.calculated_offset;
this.calcOffsetFrom = function (element,from,reset) {
if (reset != false) this.calculated_offset = 0;
if (element != null)	{
switch (from) {
case 'top': 
this.calculated_offset += element.offsetTop;
break;
case 'left': 
this.calculated_offset += element.offsetLeft;
break;
}
if ((element.offsetParent == document.body) || (element.offsetParent.tagName == ('HTML'||'BODY'))) {				
return this.calculated_offset;
} else {
return this.calcOffsetFrom(element.offsetParent,from,false);
}
}
}
this.w = this.element.offsetWidth;
this.h = this.element.offsetHeight;
var coords = new BoxCoords();
coords.x1 = this.calcOffsetFrom(this.element,'left',true);
coords.y1 = this.calcOffsetFrom(this.element,'top',true);
coords.x2 = coords.x1 + this.w;
coords.y2 = coords.y1 + this.h;
return coords;
}
function getElementBoxCoordsById(elementID) {
var element = document.getElementById(elementID);
if (element != null) {
return getElementBoxCoords(element);
}
}
function getWindowDimensions () {
var width = (window.innerWidth) ? window.innerWidth : document.body.clientWidth;
var height = (window.innerHeight) ? window.innerHeight : document.body.clientHeight;
return new Dimensions(width,height);
}
function getContentDimensions () {
var width = Math.max(document.body.offsetWidth,document.body.scrollWidth);
var height = Math.max(document.body.offsetHeight,document.body.scrollHeight);
return new Dimensions(width,height);
}
function getScrollPosition () {
var scrollPosition = new XYCoords();
if (window.scrollX && window.scrollY) {
scrollPosition.x = window.scrollX;
scrollPosition.y = window.scrollY;
} else {
var docBody = document.body;
var parent_scrollLeft = (docBody.parentNode.scrollLeft) ? docBody.parentNode.scrollLeft : 0;
var parent_scrollTop = (docBody.parentNode.scrollTop) ? docBody.parentNode.scrollTop : 0;
scrollPosition.x = Math.max(docBody.scrollLeft,parent_scrollLeft);
scrollPosition.y = Math.max(docBody.scrollTop,parent_scrollTop);
}
return scrollPosition;
}
DropDownCollisionManager = function()
{
this.listcount = 0;
this.menuElements = new Array();
this.attr = attrExp('d-dropdown');
return this;
}
DropDownCollisionManager.prototype.getCollision = function(id,buffer)
{
var idpos = getElementBoxCoordsById(id);
var ddcount = this.updateMenuArray();
buffer = (buffer || 0);
for(var i = ddcount - 1; i > -1; i--) 
{
var menupos = this.menuElements[i].coords;
if((((menupos.y2+buffer)-idpos.y1) > 0) && (idpos.y1 > menupos.y2))
{
return this.menuElements[i].id; 
}
else
{
continue; 
}
}	
return ""; 
}
DropDownCollisionManager.prototype.updateMenuArray = function()
{
for(var i=this.listcount;(list = document.getElementsByTagName('UL')[i]);i++)
{
if(getAttrValue(list,"className").search(this.attr) > -1)
{
this.menuElements.push({id:resolveElemId(list),coords:getElementBoxCoords(list)});
}
this.listcount++;
}
return this.menuElements.length;
}
var ddmanager = new DropDownCollisionManager();
function getWM(id) 
{
return (ddmanager.getCollision(id,360)) ? 'transparent' : 'window';
}
function getOverlapId(id)
{
return (ddmanager.getCollision(id,360));
}
function defineEventHandler (element,eventName,handler,capture) {
try {
if (document.addEventListener) {
element.addEventListener(eventName,handler,capture);
} else if (document.attachEvent) {
eventName = 'on'+eventName;
element.attachEvent(eventName,handler);
}
} catch (ex) {
return;
}
}
function removeEventHandler (element,eventName,handler,capture) {
try {
if (document.removeEventListener) {
element.removeEventListener(eventName,handler,capture);
} else if (document.detachEvent) {
element.detachEvent('on'+eventName,handler);
}	
} catch (ex) {
return;
}
}
var onload_queue = new Array();
function execute_onload () {
for (var i=0; i < onload_queue.length; i++) {
onload_queue[i]();
}
}
function registerOnLoadFunc () {
for (var i=0; i < arguments.length; i++) {
if (typeof arguments[i] == 'function') onload_queue[onload_queue.length] = arguments[i];
}
if (document.addEventListener || document.attachEvent) {
var domElement = (window.opera) ? document : window;
removeEventHandler(domElement,'load',execute_onload,false);
defineEventHandler(domElement,'load',execute_onload,false);
} else {
onload = execute_onload;
}
}
var unload_queue = new Array();
function execute_unload () {
for (var i=0; i < unload_queue.length; i++) {
unload_queue[i]();
}
}
function registerUnLoadFunc () {
for (var i=0; i < arguments.length; i++) {
if (typeof arguments[i] == 'function') unload_queue[unload_queue.length] = arguments[i];
}
if (document.addEventListener || document.attachEvent) {
var domElement = (window.opera) ? document : window;
defineEventHandler(domElement,'unload',execute_unload,false);
} else {
onunload = execute_unload;
}
}
var onReadyQueue = new Array();
function registerOnReady()
{
for (var i=0; i < arguments.length; i++) {
if (typeof arguments[i] == 'function') onReadyQueue.push(arguments[i]);
}
}
function executeOnReady () {
if (arguments.callee.done) return; 
arguments.callee.done = true; 
for (var i=0, len = onReadyQueue.length; i < len; i++) {
onReadyQueue[i]();
}
onReadyQueue = new Array(0);
}
if (document.addEventListener) {
document.addEventListener("DOMContentLoaded", executeOnReady, false);
}
if (/WebKit/i.test(navigator.userAgent)) { 
var $timer = setInterval(function() {
if (/loaded|complete/.test(document.readyState)) {
clearInterval($timer);
$timer = null;
executeOnReady(); 
}
}, 10);
}
registerOnLoadFunc(executeOnReady);
BrowserDescription = function () {
this.appN = navigator.appName.toLowerCase();
this.appV = parseInt(navigator.appVersion);
this.ua = navigator.userAgent.toLowerCase();
this.plt = navigator.platform.toLowerCase();
this.lang = (navigator.language || navigator.userLanguage).substring(0,2); 
if (this.ua.indexOf('opera/7') != -1 || this.ua.indexOf('opera 7') != -1) {
this.appV = 7;
}
this.ax = window.ActiveXObject != "undefined";
this.isSafari = (this.ua.indexOf('safari') != -1); 
if(this.ua.indexOf('safari') != -1) 
{
var wk = 'applewebkit/';
var kitpos = this.ua.indexOf(wk);
if(kitpos == -1) return null;
var kit = this.ua.substring(kitpos+wk.length);
kit = kit.substring(0,kit.indexOf(" "));
this.kitV = parseInt(kit);
}
return this;
}
var browser = new BrowserDescription();
var fobjs = [];
function registerSWFObject(fobj,domtarg)
{
if(browser.ax && !browser.isSafari)
{
$(domtarg).style.visibility="hidden";
fobjs.push({ob:fobj,dm:domtarg});
}
else
{
fobj.write(domtarg);
}
}
function writeFOArr()
{
if(!fobjs) return 0;
for(var i=0,len=fobjs.length;i<len;i++)
{
var fobj = fobjs[i];
$(fobj.dm).style.visibility="visible";
fobj.ob.write(fobj.dm);
fobj=null;
}
return 1;
}
if(typeof com=="undefined"){var com=new Object();}
if(typeof com.deconcept=="undefined"){com.deconcept=new Object();}
if(typeof com.deconcept.util=="undefined"){com.deconcept.util=new Object();}
if(typeof com.deconcept.SWFObjectUtil=="undefined"){com.deconcept.SWFObjectUtil=new Object();}
com.deconcept.SWFObject = function( obj ){
if (!document.createElement || !document.getElementById) return;
if( typeof obj.swf == "undefined" ) return;
var swf = obj.swf;
if( typeof obj.id == "undefined" ) return;
var id = obj.id;
if( typeof obj.w == "undefined" ) return;
var w = obj.w;
if( typeof obj.h == "undefined" ) return;
var h = obj.h;
var ver 		= ( typeof obj.ver == "undefined" ) ? "6" : obj.ver;
var c			= ( typeof obj.c == "undefined" ) ? "#ffffff" : obj.c;
var q			= ( typeof obj.q == "undefined" ) ? "high" : obj.q;
var useExpressInstall = ( typeof obj.useExpressInstall == "undefined" ) ? false : obj.useExpressInstall;
var xir 		= ( typeof obj.xiRedirectUrl == "undefined" ) ? window.location : obj.xiRedirectUrl;
var redirectUrl = ( typeof obj.redirectUrl == "undefined" ) ? "" : obj.redirectUrl;
var salign 		= ( typeof obj.salign == "undefined" ) ? "tl" : obj.salign;
var wmode 		= ( typeof obj.wmode == "undefined" ) ? "window" : obj.wmode;
var menu 		= ( typeof obj.menu == "undefined" ) ? "false" : obj.menu;
var onFailFunc 	= ( typeof obj.onFailFunc == "undefined" ) ? "" : obj.onFailFunc;
var objID 		= ( typeof obj.objID == "undefined" ) ? "" : obj.objID;
var embedID 	= ( typeof obj.embedID == "undefined" ) ? "" : obj.embedID;
var name 		= ( typeof obj.name == "undefined" ) ? "" : obj.name;
var pluginspage = ( typeof obj.pluginspage == "undefined" ) ? "" : obj.pluginspage;
var codebase	= ( typeof obj.codebase == "undefined" ) ? "" : obj.codebase;
this.DETECT_KEY = ( typeof obj.detectKey == "undefined" ) ? "detectflash" : obj.detectKey ;
this.skipDetect = com.deconcept.util.getRequestParameter(this.DETECT_KEY);
this.params = new Object();
this.variables = new Object();
this.attributes = new Array();
this.useExpressInstall = useExpressInstall;
this.isInlineInstall = ( obj.isInlineInstall == "true" );
this.setAttribute( 'swf', swf );
this.setAttribute( 'id', id );
this.setAttribute( 'width', w );
this.setAttribute( 'height', h );
this.setAttribute( 'version', new com.deconcept.PlayerVersion(ver.toString().split(".")) );
this.installedVer = com.deconcept.SWFObjectUtil.getPlayerVersion(this.getAttribute('version'), useExpressInstall);
this.addParam( 'bgcolor', c );
this.addParam( 'quality', q );
this.setAttribute( 'redirectUrl', redirectUrl );
if( typeof obj.scale != "undefined" )
this.addParam( 'scale', obj.scale ); 
this.addParam( 'salign', salign );
this.addParam( 'wmode', wmode );
this.addParam( 'menu', menu );
this.setAttribute( 'onFailFunc', onFailFunc );
this.setAttribute( 'objID', objID );
this.setAttribute( 'embedID', embedID );
this.setAttribute( 'name', name );
this.setAttribute( 'codebase', codebase );
if( pluginspage != "" )
this.addParam( 'pluginspage', pluginspage );
}
com.deconcept.SWFObject.prototype = {
setAttribute: function(name, value){
this.attributes[name] = value;
},
getAttribute: function(name){
return this.attributes[name];
},
addParam: function(name, value){
this.params[name] = value;
},
getParams: function(){
return this.params;
},
addVariable: function(name, value){
this.variables[name] = value;
},
getVariable: function(name){
return this.variables[name];
},
getVariables: function(){
return this.variables;
},
createParamTag: function(n, v){
var p = document.createElement('param');
p.setAttribute('name', n);
p.setAttribute('value', v);
return p;
},
getVariablePairs: function(){
var variablePairs = new Array();
var key;
var variables = this.getVariables();
for(key in variables){
variablePairs.push(key +"="+ variables[key]);
}
return variablePairs;
},
getFlashHTML: function() {
var flashNode = "";
if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { 
var $ID = this.getAttribute( 'embedID' );
if( $ID == "" ) $ID = this.getAttribute( 'id' );
var $name = this.getAttribute( 'name' );
if( $name == "" ) $name = $ID;
if (this.getAttribute("doExpressInstall")) this.addVariable("MMplayerType", "PlugIn");
if( browser.isSafari && browser.kitV < 420 )
flashNode = '<img src="/images/pixel.gif" name="objectMask" width="'+this.getAttribute( 'width' )+'" height="'+this.getAttribute( 'height' ) + '" class="off" />';
flashNode += '<embed type="application/x-shockwave-flash" src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'"';
flashNode += ' id="'+ $ID +'" name="'+ $name +'" ';
var params = this.getParams();
for(var key in params){ flashNode += [key] +'="'+ params[key] +'" '; }
if( this.isInlineInstall ) this.addVariable( "MMPlayerType", "PlugIn" );
var pairs = this.getVariablePairs().join("&");
if (pairs.length > 0){ flashNode += 'flashvars="'+ pairs +'"'; }
flashNode += '/>';
} else { 
var $ID = this.getAttribute( 'objID' );
if( $ID == "" ) $ID = this.getAttribute( 'id' );
if (this.getAttribute("doExpressInstall")) this.addVariable("MMplayerType", "ActiveX");
if( browser.isSafari && browser.kitV < 420  )
flashNode = '<img src="/images/pixel.gif" name="objectMask" width="'+this.getAttribute( 'width' )+'" height="'+this.getAttribute( 'height' ) + '" class="off" />';
flashNode += '<object id="'+ $ID +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') + '"';
if( this.getAttribute('codebase') == "" )
flashNode += '>';
else
flashNode += ' codebase="'+ this.getAttribute('codebase') + '">';
flashNode += '<param name="movie" value="'+ this.getAttribute('swf') +'" />"';
var params = this.getParams();
for(var key in params) {
flashNode += '<param name="'+ key +'" value="'+ params[key] +'">';
}
if( this.isInlineInstall ) this.addVariable( "MMPlayerType", "ActiveX" );
var pairs = this.getVariablePairs().join("&");
if(pairs.length > 0) flashNode += '<param name="flashvars" value="'+ pairs +'">';
flashNode += "</object>";
}
if( getQueryParamValue( 'alert' ) == "true" )
alert( "writing:\n"+flashNode);
return flashNode;
},
write: function(elementId){
var m = getQueryParamValue("m");
var nf = getQueryParamValue("nf");
if( getCookie( 'mediapref' ) == "gif" || m == 'g' || m=="gif" || nf == "1" )
return;
if(this.useExpressInstall) {
var expressInstallReqVer = new com.deconcept.PlayerVersion([6,0,65]);
if (this.installedVer.versionIsValid(expressInstallReqVer) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
this.setAttribute('doExpressInstall', true);
this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
document.title = document.title.slice(0, 47) + " - Flash Player Installation";
this.addVariable("MMdoctitle", document.title);
}
} else {
this.setAttribute('doExpressInstall', false);
}
if(this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version'))){
var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
n.innerHTML = this.getFlashHTML();
}else{
if(this.getAttribute('redirectUrl') != "") {
document.location.replace(this.getAttribute('redirectUrl'));
}
if( this.getAttribute('onFailFunc') != "" )
{
var func = this.getAttribute( 'onFailFunc' );
func();
}
}
}
}
com.deconcept.SWFObjectUtil.getPlayerVersion = function(reqVer, xiInstall){
var PlayerVersion = new com.deconcept.PlayerVersion(0,0,0);
if(navigator.plugins && navigator.mimeTypes.length){
var x = navigator.plugins["Shockwave Flash"];
if(x && x.description) {
PlayerVersion = new com.deconcept.PlayerVersion(x.description.replace(/([a-z]|[A-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
}
}else{
try{
var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
for (var i=3; axo!=null; i++) {
axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
PlayerVersion = new com.deconcept.PlayerVersion([i,0,0]);
}
}catch(e){}
if (reqVer && PlayerVersion.major > reqVer.major) return PlayerVersion; 
if (!reqVer || ((reqVer.minor != 0 || reqVer.rev != 0) && PlayerVersion.major == reqVer.major) || PlayerVersion.major != 6 || xiInstall) {
try{
PlayerVersion = new com.deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
}catch(e){}
}
}
return PlayerVersion;
}
com.deconcept.PlayerVersion = function(arrVersion){
this.major = parseInt(arrVersion[0]) || 0;
this.minor = parseInt(arrVersion[1]) || 0;
this.rev = parseInt(arrVersion[2]) || 0;
}
com.deconcept.PlayerVersion.prototype.versionIsValid = function(fv){
if(this.major < fv.major) return false;
if(this.major > fv.major) return true;
if(this.minor < fv.minor) return false;
if(this.minor > fv.minor) return true;
if(this.rev < fv.rev) return false;
return true;
}
com.deconcept.util = {
getRequestParameter: function(param){
var q = document.location.search || document.location.href.hash;
if(q){
var startIndex = q.indexOf(param +"=");
var endIndex = (q.indexOf("&", startIndex) > -1) ? q.indexOf("&", startIndex) : q.length;
if (q.length > 1 && startIndex > -1) {
return q.substring(q.indexOf("=", startIndex)+1, endIndex);
}
}
return "";
},
removeChildren: function(n){
while (n.hasChildNodes()) n.removeChild(n.firstChild);
}
}
if (Array.prototype.push == null) { Array.prototype.push = function(item) { this[this.length] = item; return this.length; }}
var getQueryParamValue = com.deconcept.util.getRequestParameter;
var SWFObject = com.deconcept.SWFObject;
var SWFObjectUtil = com.deconcept.SWFObjectUtil;
