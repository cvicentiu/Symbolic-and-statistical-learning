
/* NBC5.com scripts */
// Begin national js scripts
/**
 * Copyright 2006, Internet Broadcasting.
 * All Rights Reserved.
 *
 * Namespace management. Usage is: using("com.foo.bar") = { ... }
 *
 * Author:  $Author: ddjohnson $
 * Date:    $Date: 2006/07/25 19:47:42 $
 * Version: $Name:  $
 * ID:      $Id: base.js,v 1.2 2006/07/25 19:47:42 ddjohnson Exp $
 */

var ibsys = {
};

function using(namespace)
{
	var parts = namespace.split(/\./);
	var context = window;
	while(parts.length != 0)
	{
		var obj = parts.shift();
		if(!(obj in context))
			context[obj] = {};
		context = context[obj];
	}
	return context;
}


// Site Info Object
var siteinfo = {
tld:"com", lang:"en", timezone:"CST", id:"5330071", advertisingid:"chi", ultraseekregion:"nbc", matchcomid:"507788", affiliate:"nbc", state:"IL", owner:"nbc", region:"nbc", is_ia:"yes", 
 sitekeywords:{ }, 
 sitekey:{lc:"chi", uc:"CHI" }, 
 sitename:{lc:"nbc5", mx:"NBC5", uc:"NBC5", display:"NBC5.com" }, 
 callletters:{lc:"wmaq", uc:"WMAQ" }, 
 statecode:{uc:"IL", lc:"il" }, 
 statename:{uc:"ILLINOIS", lc:"illinois", mx:"Illinois" }, 
 city:{uc:"CHICAGO", lc:"chicago", mx:"Chicago" }, 
 contentrights:{cnn:"no", nbcoo:"yes", group:"blue", blue:"yes" }, 
 feedroom_links:{url:"http://chicagotv.feedroom.com/index.jsp?auto_band=X", url:"http://nbc5tv.feedroom.com/index.jsp?auto_band=X" }, 
 search:{ultraseekregion:"nbc" }, 
 thirdparty_info:{
  healthology:{bvalue:"NBC5"}, 
  moving:{id:"a12519"}, 
  tripadvisor:{id:"10762", subdomain:"nbc5"}, 
  autotrader:{id:"IBSCOBRNDSITE013", sell:"IBSCOBRNDSYC0013"}, 
  experion:{id:"6396"}, 
  eharmony:{cid:"1209", clicktracker_dfp:"12700841;8704162;y"}, 
  findlaw:{clicktracker_dfp:"6861466;8704162;q"}, 
  homestore:{clicktracker_id:"4294", code:"ib", clicktracker_dfp:"7412450;8704162;c"}, 
  valpak:{clicktracker:"4788", clicktracker_dfp:"7440776;8704162;o"}, 
  monster:{lid:"700,417,888,889,890,422,423,419,424,891,430"}, 
  titantv:{id1:"53451"}, 
  WT_info:{id:"dcs7sbsu7000004jhh17z9krt_6o2f"}, 
  omniture:{id:"nbcuwmaqbu"}, 
  coupons:{pid:"11384&zid=jp98&nid=16"}, 
  smartmoney:{clicktracker:"27401550;8704162;z"}, 
  lendingtree:{id:"445010"}, 
  tacoda:{id:"13730"}
 }, 
 video:{playerversion:"5", skin:"blue", wxicons:"nbc", headerlinks:"#ffffff", cpcode:"12906" }, 
 adsplit:{value:"local", value:"local", value:"national" }
}


// GLOBAL Variables
now = new Date();
expire = new Date((now.getFullYear()+1),now.getMonth(),now.getDate());
var child = 0;
var rnd = new Date();
rnd = rnd.getTime();

// Deprecated variables
//var IBS_Sitekey = siteinfo.sitekey.lc;
var IS_IA = siteinfo.is_ia;
IBSSite = new Object();
dotPosition = document.location.host.indexOf('.')+1;
IBSSite.domain = document.location.host.substring(dotPosition);

// Set environment variables
env = new Object();
env.bVer = navigator.appVersion;
env.bName = navigator.appName;
env.platform = navigator.platform;
env.userAgent = navigator.userAgent;
env.cookies = navigator.cookieEnabled;
env.NS4 = (document.layers)? 1 : 0;
env.MacIE = ((navigator.userAgent.indexOf("IE 4")  > -1) && (navigator.userAgent.indexOf("Mac")  > -1))? 1 : 0;
env.IE4 = (document.all && !env.MacIE)? 1 : 0;
env.Gen4 = (document.all || document.layers)? 1 : 0;
if(env.bName.indexOf('Netscape') != -1) isNN = true;
else isNN = false;
if(env.bName.indexOf('Microsoft') != -1) isIE = true;
else isIE = false;

//Open window - pass URL and Attributes
function popUp(URL, ATTRIBUTES)  {
	DEF_ATTRIB = 'width=200,height=200,top=100,left=100,resizable=yes,scrollbars=1';
	if (ATTRIBUTES == null) {
		ATTRIBUTES = DEF_ATTRIB;
	}
	child = window.open(URL, "spawn", ATTRIBUTES + ",scrollbars=1");
	// child.opener = self;
}



// FIX THE STRINGS ( apostrophes)
function fixString(strText) {
	if(!strText || strText == null) return "";
	var newstr = strText.replace(/~/g, "&#39;");
	return newstr;
}

// Replace white space around tags in teaser - used in TopStory and PhotoArray
function padTags(s){
	if(!s || s == null) return "";
	var tmp = s.replace(/(<\w)/ig, " $1");
	tmp = tmp.replace(/(<\/\w>)/ig, "$1 ");
	return tmp;
}

/**
 * returns the parent widget ID of the given indexID, for use
 * with jsIndex
 */
function getWidgetID(indexId)
{
	var el = document.getElementById("index"+indexId);
	if(el == null) return null;
	var p = el.parentNode;
	while(p)
	{
		if(p.id && p.id.match(/sw[0-9]+/))
			return p.id.replace(/sw/,"");
		p = p.parentNode;
	}
	return null;
}




var XMLObj = {
	impl: function() {
		return (window.XMLHttpRequest ? new XMLHttpRequest() : 
				(window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : 
					new Error("No XMLHttpRequest Implementation")));
	},
	
	get: function(url, handler) {
		var req = XMLObj.impl();
		req.open("get", url, true);
		req.onreadystatechange = function() {
			/* Opera may return status 304; unchanged */
			if(req.readyState == 4) {
				handler(req.responseXML, req.responseText);
			}
		};
		req.send(null);
	},
	
	post: function(url, params, handler) {
		var req = XMLObj.impl();
		req.open("post", url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.setRequestHeader("Referer", document.location.href);
		req.onreadystatechange = function() {
			/* Opera may return status 304; unchanged */
			if(req.readyState == 4 ) {
				handler(req.responseXML, req.responseText);
			}
		};
		req.send(params);
	}
};



// Define client cookie values
cookiesList = document.cookie.split('; ');
myCookies = new Array();
for(c=0; c<cookiesList.length; c++) {
	cookieTemp = cookiesList[c].split('=');
	myCookies[cookieTemp[0]] = cookieTemp[1];
}

// Added new variable to support multiple sub domains
var docDomain = document.domain.split('.');
var dd='';
for(var i=1; i<docDomain.length; i++) {
	dd+="."+docDomain[i];
}
docDomain=dd;

// Set cookie info
function setCookie( name, value, path, expires, domain, secure ) {
	expire.setTime(now.getTime() + expires * 24 * 60 * 60 * 1000);
	curCookie =  name + "=" + escape(value) +
		((expires) ? "; expires=" + expire.toGMTString() : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
	if ((name + "=" + escape(value)).length <= 4000) document.cookie = curCookie;
	else if (confirm("Cookie exceeds 4KB and will be cut!")) document.cookie = curCookie;
}

// Get cookie info
function getCookie(c) {
	if(typeof myCookies[c] != 'undefined') return myCookies[c];
	else return '';
}

// Remove cookie
function deleteCookie(name,path) {
	setCookie(name,"",path,-1,docDomain);
}

// In case old cookie functions are used somewhere...
WM_setCookie  = setCookie;
WM_readCookie = getCookie;
WM_killCookie = deleteCookie;



function fixPngImage(p) {
	var imgsrc;
	var trans = "http://images.ibsys.com/sh/images/spacer.gif";   
	if(typeof p.tested != undefined && !p.tested &&  typeof p.runtimeStyle != 'undefined') {
	   // retain image src
	   imgsrc = p.src;

	   // make sure the image is a PING
	   if ( /\.png$/.test( imgsrc.toLowerCase() ) ) {
	   	// If it is set it to a transparent image
		p.src = trans;
		// Set the runtime style to load the alpha image in the background
		p.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgsrc + "',sizingMethod='scale')";
		p.tested = true;
	   }
   }
}

// Calls 'func' on 'eventName' in 'obj'
function addEvent(obj, eventName, func)
{
	if(obj.addEventListener)
		return obj.addEventListener(eventName, func, true);
	else if(obj.attachEvent)
	{
		obj.attachEvent("on" + eventName, func);
		return true;
	}
	return false;
}
/**
 * Copyright 2006, Internet Broadcasting Systems. All Rights Reserved.
 * Author:    $Author: ddjohnson $
 * Date:      $Date: 2006/07/19 22:50:52 $
 * Version:   $Name:  $
 * ID:        $Id: AdObj.js,v 1.10 2006/07/19 22:50:52 ddjohnson Exp $
*/

/**
 * Generic AdObj holds properties to ease calling pixel ads for specific uses
 *
 * Usage of class methods:
 *	<li>AdObj.create(position,sz,swId,coId,section) - create and return a new AdObj</li>
 *  <li>AdObj.refreshPosition(positions...) - refresh one or more positions</li>
 *  <li>AdObj.refreshAll() - refresh all ads</li>
 *	<li>AdObj.remove(name) - remove ad</li>
 *
 * @constructor
 * @param {String} position Corresponds to ad position, like mediawidow, banner or tile
 * @param {String} sz Size, formatted as 2x2
 * @param {String} swId Section widget id
 * @param {String} coId Content id
 * @param {String} section Section widget section
 */
function AdObj(position, sz, swId, coId, section) {
	this.position = position;
	this.sz = sz;
	this.swId = swId;
	this.coId = coId ? "+"+coId : "";
	this.section = section;

	var size = this.sz.split("x");
	this.width = size[0];
	this.height = size[1];
}

/**
 * @deprecated in favor of {@link AdObj#refresh}
 *
 * Append iframe with ad call to end of document or refresh the ad of set position
 * NOTE: DART key set to ibs.[sitekey].interactive
 */
AdObj.prototype.callAd = function() {
	if (!document.getElementById(this.position)) {
		// append iframe to document
		document.getElementsByTagName("body")[0].appendChild(document.createElement("span")).innerHTML = "<iframe id="+this.position+" src='http://ad.doubleclick.net/adi/ibs."+siteinfo.sitekey.lc+".interactive/"+adZone+";kw="+this.section+"+"+this.position+this.coId+segQS+";comp="+adid+";ad=true;tile="+dcadposition+ ";pgtype=detail;sz="+this.sz+";ord="+rnd+"?' width='"+this.width+"' height='"+this.height+"' marginwidth='0' marginheight='0' frameborder='0' scrolling='no'></iframe>";
	} else {
		// refreshAd is defined in base js
		refreshAd(this.position);
	}
}

/**
 * Refresh this ad.
 */
AdObj.prototype.refresh = function(adid)
{
	adid = (typeof adid == "undefined") ? "" : adid;
	// var obj = document.getElementById(this.position);
	// if(obj == null)
	// {
		var arr = getByClassName(document.body, "ad"+this.position);
		if(arr.length == 0)
			return;
		// obj = arr[0];
	// }
	//http://ad.doubleclick.net/adi/ibs.chi.interactive/;kw=video+news+null+banner1+9385129;ad=true;pgtype=detail;sz=728x90;adid=36780253;ord=940767630?
	var src = "http://ad.doubleclick.net/adi/ibs."+siteinfo.sitekey.lc+".interactive/"+adZone+";kw="+this.section+"+"+this.position+"+"+this.coId+segQS+";ad=true;tile="+dcadposition+ ";pgtype=detail;sz="+this.sz+";"+adid+";ord="+rnd+"?";
	// if(/iframe/i.exec(obj.nodeName) != null)
	// {
	// 	obj.src = "";
	// 	obj.src = src;
	// }
	// else
	arr[0].innerHTML = "<iframe id="+this.position+" src='"+src+"' width='"+this.width+"' height='"+this.height+"' marginwidth='0' marginheight='0' frameborder='0' scrolling='no'></iframe>";
}

/** AdObj class members */

/**
 * collection of Ad Objects
 */
AdObj.elements = new Object();

/**
 * Create a AdObj instance and add it to the collection
 */
AdObj.create = function create(position,sz,swId,coId,section)
{
	return AdObj.elements[position] = new AdObj(position,sz,swId,coId,section);
}

/**
 * Refresh ads by position: AdObj.refreshPosition("banner1","tile1","square");
 */
AdObj.refreshPosition = function refreshPosition()
{
	for(var j=0; j < arguments.length; j++)
		if(AdObj.elements[arguments[j]])
			AdObj.elements[arguments[j]].refresh();
}

/**
 * Refresh all ads
 */
AdObj.refreshAll = function refreshAll(adid)
{
	for(var p in AdObj.elements)
		AdObj.elements[p].refresh(adid);
}

AdObj.adIds = new Object();

/**
 * Returns an event handler for WMP CurrentItemChange event.
 *
 * The returned handler refreshes ads if the currentMedia has a
 * "dcAdTag" parameter.
 *
 * @param <String> videoPlugID
 * @return <function>
 */
AdObj.createAdRefreshHandler = function createAdRefreshHandler(videoPlugID)
{
	return (function()
	{
		if(!document ||
		   !document.body ||
		   !document.getElementById(videoPlugID))
		{
			return;
		}

		// NOTE: may need to change this if the format of the 'adid' parameter
		// value changes.  currently it is 'adid=[0-9]+'
		var adTagParam = document.getElementById(videoPlugID).currentMedia.getItemInfo("dcAdTag");

		if(/adid=[0-9]+/.exec(adTagParam) != null && !AdObj.adIds[adTagParam])
		{
			AdObj.adIds[adTagParam] = true;
			// log("Refreshing: " + adTagParam);
			AdObj.refreshAll(adTagParam);
			window.setTimeout(
				(function()
				{
					AdObj.adIds[adTagParam] = false;
				}), 1000);
		}
		else
		{
			// log("NOT Refreshing ads; adid="+adTagParam);
		}
	});
}

function log(str)
{
	if(!document.body || /preview/.exec(window.location.host) == null)
		return;
	var el = document.getElementById("log");
	if(el == null)
	{
		el = document.createElement("textarea");
		el.id = "log";
		el.wrap = "off";
		el.style.cssText = "position:absolute;bottom:0px;left:0px;width:420px;height:200px;font:normal 11px fixedmedium6x13,monospace;";
		document.body.appendChild(el);
	}
	el.value += str + '\n';
}

/**
 * Remove an ad by name.
 * @param <String> name
 * @return true if the object was deleted.
 */
AdObj.remove = function(name)
{
	if(AdObj.elements[name])
		return delete AdObj.elements[name];
	else
		return false;
}

/**
 * TODO: put this function somewhere else
 */
function getByClassName(parent,className)
{
	var nl = parent.getElementsByTagName("*");
	var arr = [];
	for(var j=0; j < nl.length; j++)
	{
		if(nl.item(j).className && nl.item(j).className.indexOf(className) != -1)
			arr.push(nl.item(j));
	}
	return arr;
}

/*
// wrapper function - inserted into XSL
function callMediaWindowPixel(coId) {
	var mwpix = new AdObj("mediawindow", "2x2", "9161858", coId, "testpage");
	mwpix.callAd();
}

// call from swf
callMediaWindowPixel(coId);
*/
// 

function setDCSid(id) {
     gDcsId=id;
}

function mwpop(path,w,h) {
	var atts = 'width='+w+',height='+h+',\'scrollbars=yes,toolbar=no,status=no,location=no,menubar=no,top=50,left=50';
	popUp(path, atts);
}

function setMediaPlayerCookie (num) {
  setCookie("mediaWindow",num,"",30,window.location.host,"");
  return "done";
}

function getMediaPlayerCookie () {
  var myCookie = new String(getCookie("mediaWindow"));
  return myCookie;
}


/* toggleData function
 * toggles all elements inside a parent element
 * 2 params 
 *   id - the parent element id
 *   cn - class name of elements you want to hide
 */
function toggleData(id,cn){
	var div = document.getElementById(id);
	var cond = div.getElementsByTagName('*');
	for(var i = 0;i<cond.length;i++){
		if(cond[i].className.indexOf(cn) != -1) {
		cond[i].style.display = (cond[i].style.display != 'none') ? 'none' : '';
		}
	}
}
/* hideData function
 * hides all elements inside a parent element
 * same params as toggleData
 * current usage - full display of current conditions weather object calls this function 
 */
function hideData(id,cn){
	var div = document.getElementById(id);
	var cond = div.getElementsByTagName('*');
	for(var i = 0;i<cond.length;i++){
		if(cond[i].className.indexOf(cn) != -1) {
			if(cond[i].style.display != 'none') cond[i].style.display = 'none';
		}
	}
}
	


/***
* Function to launch nbc video pop-up window player added 8.22.06
***/
    function  launchNbcVideo(pathid) { 
	site='http://video.'+ siteinfo.sitename.lc  +'.'+ siteinfo.tld +'/player.html'; 
	param = '?dlid='; 
	newwindow=window.open(site+param+pathid,'sendtofriend','toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no,resizable=no,width=750,height=550');	
	if (window.focus) {
		newwindow.focus()
	}
}



/***
* Changed by Aron B-- 8.23.06
* Changed by Joe L -- 1/24/07
***/
function launchvideo(pathid)
{
/* uncomment 1/9/07 -- */
if (siteinfo.video.dmps == 'true') {
/*if (siteinfo.sitekey.lc == 'har' || siteinfo.sitekey.lc == 'la' || siteinfo.sitekey.lc == 'dc' || siteinfo.sitekey.lc == 'phi' || siteinfo.sitekey.lc == 'ny') { */
site='http://video.'+ siteinfo.sitename.lc  +'.'+ siteinfo.tld +'/player/?id=' + pathid;
document.location = site;
} else {
site='http://video.'+ siteinfo.sitename.lc  +'.'+ siteinfo.tld +'/player.html';

param = '?dlid=';
newwindow=window.open(site+param+pathid,'sendtofriend','toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no,resizable=no,width=750,height=550');
if (window.focus) {newwindow.focus()}
//return false;
}
}
function launchvideodir(pathid)
{
site='http://video.'+ siteinfo.sitename.lc  +'.'+ siteinfo.tld +'/player.html';

param = '?dl=';
newwindow=window.open(site+param+pathid,'sendtofriend','toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no,resizable=no,width=750,height=550');
if (window.focus) {newwindow.focus()}
//return false;
}




function openPlayer() {

   window.open('http://phylo.video.nbbc.com/mms/rt/1/site/oando-cp-nbbcpub01-live/current/launch.html?playerId=nbcplayer', '', 'left=20,top=20,width=750,height=475,status=0,toolbar=0,resizable=0,scrollbars=0,location=0');

}


// End national_js scripts

