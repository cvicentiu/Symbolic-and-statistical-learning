//<!--START OF SmartSource Data Collector TAG -->
//<!-- Copyright 2002 NetIQ Corporation -->
//<!-- V6.1 -->
//<!-- $DateTime: 2003/07/15 11:52:11 $ -->
//<!-- $Revision:   1.8  $ -->

// Add customizations here
//WT.sp="@@SPLITVALUE@@";


var gImages = new Array();

function initReporting() {
	var ReportingVars = new Array();
	ReportingVars["WTgDomain"] = "dcs.wtlive.com";
	ReportingVars["WTgDcsId"] = "dcsh0vxjjpljwpw4etji1l79m_7o7z";
	return ReportingVars;
}


function dcsVar(dCurrent, DCS, WT, DCSext, reportParms){
	WT.tz=dCurrent.getTimezoneOffset()/60*-1;
	WT.bh=dCurrent.getHours();
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		WT.ti=document.title;
	}
	WT.js="Yes";
	if (typeof(gVersion)!="undefined"){
		WT.jv=gVersion;
	}
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;
	if (window.location.search){
		DCS.dcsqry=window.location.search;
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=window.document.referrer;
		}
	}
	dcsMeta(DCS, WT, DCSext, reportParms);
}

function A(N,V){
	return "&"+N+"="+dcsEscape(V);
}

function dcsEscape(S){
	
	var RE={"%09":/\t/g, "%20":/ /g, "%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g};
	if (typeof(RE)!="undefined"){
		var retStr = new String(S);
		for (R in RE){
			retStr = retStr.replace(RE[R],R);
		}
		return retStr;
	}
	else{
		return escape(S);
	}
}

function dcsCreateImage(dcsSrc){

	if (document.images){
		var image=new Image();
		image.src=dcsSrc;
		gIndex = ++gImages.length;
                gImages[gIndex]=image;

	}

	else{
		document.write('<IMG BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
	}
	
}

function dcsMeta(DCS, WT, DCSext, reportParms){
	var myDocumentElements;
	if (document.all){
		myDocumentElements=document.all.tags("meta");
	}
	else if (document.documentElement){
		myDocumentElements=document.getElementsByTagName("meta");
	}
	if (typeof(myDocumentElements)!="undefined"){
		for (var i=1;i<=myDocumentElements.length;i++){
			myMeta=myDocumentElements.item(i-1);
			if (myMeta.name){
				if (myMeta.name.indexOf('WT.')==0){
					WT[myMeta.name.substring(3)]=myMeta.content;
				}
				else if (myMeta.name.indexOf('DCSext.')==0){
					DCSext[myMeta.name.substring(7)]=myMeta.content;
				}
				else if (myMeta.name.indexOf('DCS.')==0){
					DCS[myMeta.name.substring(4)]=myMeta.content;
				}
			}
		}
	}
	dcsTag(DCS, WT, DCSext, reportParms);
}

function dcsTag(DCS, WT, DCSext, reportParms){
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+reportParms.gDomain+(reportParms.gDcsId==""?'':'/'+reportParms.gDcsId)+"/dcs.gif?";
	for (N in DCS){
		if (DCS[N]) {
			P+=A(N,DCS[N]);
		}
	}
	for (N in WT){
		if (WT[N]) {
			P+=A("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]) {
			P+=A(N,DCSext[N]);
		}
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	dcsCreateImage(P);
}

function setWTLParms() {
	var reportParms = initReporting();
	var WTLParms=new Object();
	WTLParms.gDomain=reportParms["WTgDomain"];
	WTLParms.gDcsId=reportParms["WTgDcsId"];
	return WTLParms;

}


//The following document.write includes the ForeSee js files to make the survey pop-up appear.
//The first function is called at the end of triggerParams.js.
//Lines are to be deleted when survey collection is complete.



function cppUrlPatch(s) {
	var translated = "";
	var i; 
	var found = 0;
	for(i = 0; (found = s.indexOf(':', found)) != -1; ) {
		translated += s.substring(i, found) + "|";
		i = found + 1;
		found++;
	}
	translated += s.substring(i, s.length);
	return translated;
}
function initForeSeeParams() {
	var triggerParms = new Array(); 
	triggerParms["dt"] = 0; // disable trigger if 1
	triggerParms["mid"] = "dh4QBcM8h8cYdN8hIFdIlQ=="; // model instance id
	triggerParms["cid"] = "BAZQsB5xRUYZtxB5gM5BUw=="; // customer id
	triggerParms["lf"] = 3; // loyalty factor
	triggerParms["sp"] = 0.25; // sample percentage
	triggerParms["npc"] = 1; // no persistent cookies if 1
	triggerParms["rw"] = 129600; // resample wait (value in minutes)
	triggerParms["pu"] = 0; // pop-under control
	triggerParms["olpu"] = 1; // On Load pop-under control
	triggerParms["lfcookie"] = "ForeseeLoyalty_MID_dh4QBcM8h8";
	triggerParms["ascookie"] = "ForeseeSurveyShown_dh4QBcM8h8";
	triggerParms["width"] = 420; // survey width
	triggerParms["height"] = 500; // survey height
	triggerParms["domain"] = ".irs.gov"; // domain name
	triggerParms["omb"] = "1505-0186"; // OMB number
	//triggerParms["cmetrics"] = "90010257"; // coremetrics client id
	triggerParms["cpp_1"] = "userURL:"+ cppUrlPatch (window.location.protocol+"://" + window.location.host + window.location.pathname); // customer parameter 1 - user URL
	//triggerParms["cpp_2"] = "Browser:"+ cppUrlPatch (navigator.userAgent); // customer parameter 2 - Browser
	triggerParms["capturePageView"] = 1;
	return triggerParms;
}
function initForeSeeExcludeList() {
	
	var excludeList = new Array();
	//excludeList[0] = "/exclude/"; //trigger script will not work under this path
	return excludeList;
	
}


// Customer : U.S. Department of Treasury - Internal Revenue Service
// Version : Advance Trigger 1.4
function getPopUpUrl() {
	var popUpURL = "http://www.foreseeresults.com/survey/display"; // base URL to the survey
	return popUpURL;
}
function getCKAlreadyShown() {
	var triggerParms = initForeSeeParams();
	var ckAlreadyShown = triggerParms["ascookie"]; // name of the persistent/session cookie
	return ckAlreadyShown;
}
function getCKLoyaltyCount() {
	var triggerParms = initForeSeeParams();
	var ckLoyaltyCount = triggerParms["lfcookie"]; // name of the loyalty count cookie
	return ckLoyaltyCount;
}
function getPersistentExpires() {
	var triggerParms = initForeSeeParams();
	var persistentExpires = new Date(); // persistent cookie expiration 
	persistentExpires.setTime(persistentExpires.getTime() + (triggerParms["rw"]*60*1000));
	return persistentExpires;
}
function ForeCStdGetCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return ForeCStdGetCookieVal (j);
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) {
			break;
		}
	}
	return null;
}
function ForeCStdSetCookie (name, value) {
	var argv = ForeCStdSetCookie.arguments;
	var argc = ForeCStdSetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name + "=" + escape (value) +
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	((path == null) ? "" : ("; path=" + path)) +
	((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");
}
function ForeCStdGetCookieVal(offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) {
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
}
function specialEscape(str) {
	var translated = "";
	var i; 
	var found = 0;
	for(i = 0; (found = str.indexOf('+', found)) != -1; ) {
		translated += str.substring(i, found) + "%2B";
		i = found + 1;
		found++;
	}
	translated += str.substring(i, str.length);
	return translated;
}
// this function checks to see if we are in path included in the excluded list. 
function currentLocationExcluded() {	
	var parentURLPath = window.location.pathname;//location path
	var excludeList = initForeSeeExcludeList(); 
	for(key in excludeList) {
		if(parentURLPath.indexOf(excludeList[key]) != -1) {
			return true;
		}
	}
	return false;
}
function Poll() { 
	var triggerParms = initForeSeeParams();
	if(triggerParms["dt"] == 1) {
		return;
	}
	//checks if we are in path included in the excluded list.
	if(currentLocationExcluded()) {
		return;
	}
	var stickyCounter = ForeCStdGetCookie(getCKLoyaltyCount()); // check counter cookie
	var alreadyShown = ForeCStdGetCookie(getCKAlreadyShown()); // check if we already have shown survey
	var pageCount;
	var randNum = Math.random();
	randNum *= 100;
	
	if (stickyCounter == null) {
		// create the loyalty factor cookie if we don't already have one
		pageCount = 1; 
		ForeCStdSetCookie(getCKLoyaltyCount(), pageCount, null,'/',triggerParms["domain"]);		
		stickyCounter = ForeCStdGetCookie(getCKLoyaltyCount());
	}
	if (stickyCounter != null) {
		pageCount = stickyCounter;
		if(pageCount >= triggerParms["lf"]) {
			// apply the samplingPercentage algorithm
			if(alreadyShown == null) {
				if(randNum <= triggerParms["sp"]) {
					var winOptions = "width= 1,height= 1,top= 4000,left= 4000,resizable=yes,scrollbars=yes";
					var fullURL = getPopUpUrl() + "?" + "width=" + triggerParms["width"] +
					"&height=" + triggerParms["height"] +
					"&cid=" + specialEscape(escape(triggerParms["cid"])) + "&mid=" + specialEscape(escape(triggerParms["mid"]));
					if ((triggerParms["omb"] ) != null) {
						fullURL += "&omb=" + escape(triggerParms["omb"]);
					}
					
					//Coremetrics support
					if ((triggerParms["cmetrics"] ) != null) {
						fullURL += "&cmetrics=" + escape(triggerParms["cmetrics"]);
					}
					// added for pop control after window is loaded
					if (triggerParms["olpu"] == 1) {
						fullURL += "&olpu=1";
					}
					// capturing Page Viewed in CPP
					if (triggerParms["capturePageView"] == 1) {
						triggerParms["cpp_3"] = "PageView:"+ pageCount; // customer parameter 3 - Page View
					}
					// extract customer passed parameters if any
					var customerParams = "";
					for(paramKey in triggerParms) {
						if(paramKey.substring(0,3) == "cpp"){
							fullURL += "&" + paramKey + "=" + escape(triggerParms[paramKey]);
						}
					}
					// insure that we only pop up once during the lifetime of the cookie
					if(triggerParms["npc"] == 1) {
						ForeCStdSetCookie(getCKAlreadyShown(), 'true',null,'/',triggerParms["domain"]);
					} else {
						ForeCStdSetCookie(getCKAlreadyShown(), 'true', getPersistentExpires(),'/',triggerParms["domain"]);
					}
					var myPopUp = window.open(fullURL, 'survey',winOptions);
					if (triggerParms["pu"] == 1){
						self.focus();
					} else {
						myPopUp.focus(); //focusing on survey window								
					}
				}
			}
		}	
		// increment it and set the new cookie value
		pageCount++;
		ForeCStdSetCookie(getCKLoyaltyCount(), pageCount, null,'/',triggerParms["domain"]);		
	} 
}


function reportWTLInfo() {
	var wtlObj=setWTLParms();
	var dCurrent=new Date();
	var DCS=new Object();
	var WT=new Object();
	var DCSext=new Object();
	DCS.dcscfg = 00000004;	
	dcsVar(dCurrent, DCS, WT, DCSext, wtlObj);
}
function runForeSee() {
	Poll();
}

function execute() {
	reportWTLInfo();
	runForeSee();
}

execute();
