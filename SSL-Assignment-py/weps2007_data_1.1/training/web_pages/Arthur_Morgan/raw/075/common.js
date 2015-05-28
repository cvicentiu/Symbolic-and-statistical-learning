////////////////////////////////////////////////
//	        COMMON JAVASCRIPT FUNCTIONS       //
////////////////////////////////////////////////

/*- Run On Load --------------------------------------------------------------*/

// window.onload listener to share event with multiple functions
// Based on runOnLoad function from 
// "JavaScript: The Definitive Guide", 5th ed, p.434, example 17-7

runOnLoad.functionsQueue = new Array();
runOnLoad.isLoaded = false;

function runOnLoad(functionCall) {
	if (runOnLoad.isLoaded) functionCall();
	else runOnLoad.functionsQueue.push(functionCall);
}

runOnLoad.run = function() {
	if (runOnLoad.isLoaded) return;
	for (var i = 0; i < runOnLoad.functionsQueue.length; i++) {	
		//
		// runOnLoad.functionsQueue[i]();
		//
		try { runOnLoad.functionsQueue[i](); }		
		catch(functionError) { 
			if (functionError instanceof Error) {
				alert(functionError.name + ": " + functionError.message);
			}
		}
	}
	runOnLoad.isLoaded = true;
	delete runOnLoad.functionsQueue;
	delete runOnLoad.run;
};

if (window.addEventListener) {
	window.addEventListener("load", runOnLoad.run, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", runOnLoad.run)
} else {
	window.onload = runOnLoad.run;
}

//
//
// REGISTER FUNCTIONS WITH runOnLoad HERE
runOnLoad(checkPartner);
//
//

/*- Query String Values ------------------------------------------------------*/

// Gets, parses URL query string values into an object
// See "JavaScript: The Definitive Guide", 5th ed, p.272, example 14-1

var queryStringValues = getQueryStringValues();

function getQueryStringValues() {
	var args = new Object();
	var query = location.search.substring(1);
	var pairs = query.split("&");
	for (var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf("=");
		if (pos == -1) continue;
		var argName = pairs[i].substring(0, pos);
		var value = pairs[i].substring(pos + 1);
		value = decodeURIComponent(value);
		args[argName] = value;
	}
	return args;
}

/*- Partner Hats -------------------------------------------------------------*/

function checkPartner() {
	for (var i in queryStringValues) {
		if (i == "campaign_id") {
			switch (queryStringValues[i]) {
				case "yhoo":
					addPartnerHat("http://images.businessweek.com/gen/partner_hats/yahoo_finance_192x30.gif", 192, 30, "Go to Yahoo Finance", "http://finance.yahoo.com/");
					break;
				case "yhoouk":
					addPartnerHat("http://images.businessweek.com/gen/partner_hats/yahoouk_finance_170x30.gif", 170, 30, "Go to Yahoo UK Finance", "http://uk.finance.yahoo.com/");
					break;
				case "twxa":
					addPartnerHat("http://images.businessweek.com/gen/partner_hats/aol_finance_238x30.gif", 238, 30, "Go to AOL Personal Finance", "http://money.aol.com/");
					break;
				case "djm":
					addPartnerHat("http://images.businessweek.com/gen/partner_hats/cbs_marketwatch_161x30.gif", 161, 30, "Return to MarketWatch");
					break;
				case "twxn":
					addPartnerHat("http://images.businessweek.com/gen/partner_hats/netscape_105x30.gif", 105, 30, "Go to Netscape", "http://www.netscape.com/");
					break;
				case "twxc":
					addPartnerHat("http://images.businessweek.com/gen/partner_hats/compuserve_120x30.gif", 120, 30, "Go to CompuServe", "http://www.compuserve.com/");
					break;
			}
		}
	}
}

function addPartnerHat(imageURL, imageWidth, imageHeight, linkTitle, linkURL) {
	if (!document.createElement) return false;
	//
	var partnerHat = document.createElement("div");
	partnerHat.className = "partnerHat";
	//
	var partnerHatLink = document.createElement("a");
	partnerHatLink.setAttribute("title", linkTitle);
	if (linkURL == undefined) {
		partnerHatLink.setAttribute("href", "javascript:history.back();");
	} else {
		partnerHatLink.setAttribute("href", linkURL);
	}
	//
	var partnerImage = document.createElement("img");
	partnerImage.setAttribute("src", imageURL);
	partnerImage.setAttribute("alt", "");
	partnerImage.setAttribute("width", imageWidth);
	partnerImage.setAttribute("height", imageHeight);
	//
	partnerHatLink.appendChild(partnerImage);
	partnerHat.appendChild(partnerHatLink);
	var body = document.getElementsByTagName("body")[0];
	body.insertBefore(partnerHat, body.firstChild);
}

/*----------------------------------------------------------------------------*/

// random number for ng ads
var axel = Math.random() + "";
window.rnd = axel * 1000000000000000000;

function handleError() {}

function out (str) { document.write (str) }


// ====================================================================
// GLOSSARY

function showGlossaryTerm(term) {
	var browserVer = parseInt(navigator.appVersion);
	remote=window.open("http://bwnt.businessweek.com/Glossary/home.asp?Code="+term,"glossaryWindow","width=470,height=400,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=yes,resizable=yes");
	remote.focus();
}

// ====================================================================
// FLOATING TICKER

function showTicker(symbol, channel) {
	top.location = "http://host.businessweek.com/businessweek/Corporate_Snapshot.html?Symbol=" + symbol;
}


// ====================================================================
// PRINTER FRIENDLY OPENER
function bwPrint ( url ) {
	if ( window.adOb ) url += "?" + adOb["chSb"];
	window.open(url,'printWin','scrollbars=yes,resizable=yes,toolbar=yes,menubar=yes,location=yes');
}

// ====================================================================
// EMAIL STORY OPENER
function bwEmail ( url ) {
	if ( window.adOb ) url += "&" + adOb["chSb"];
	popup(url,320,650,'no','yes');
}


// ====================================================================
// GENERIC POPUP WINDOW FUNCTION

// POPUP WINDOW ADJUSTMENTS
function popup(file,width,height,sbars) {

// POPUP ATTRIBUTES
	var name = 'popwin';
	sbars = sbars + "" == "undefined" ? "yes" : sbars;
	width = width + "" == "undefined" ? "" : "width="+width+",";
	height = height + "" == "undefined" ? "" : "height="+height+",";
	var attributes = 'scrollbars='+sbars+',resizable=yes,target=popwin,' + width + height + '';
	p = window.open(file, name, attributes);
}

// ====================================================================
// CHANGE VISIBILITY (HIDE & REVEAL MENUS)

function changeVis(elName) {
	var box = document.getElementById(elName);
	if (box != null) {
		var display = box.style.display;	
		if (display != "block") {
			box.style.display = "block";
		} else {
			box.style.display = "none";
		}
	}
}

//GENERIC JS LINK FOR OPTION DROPDOWNS

function linkTo(option) {

		window.location = option.value;

}
// ====================================================================
// EXTRACTS A CGI FORMATTED VARIABLE

// gets the value of a given cgi var or returns ""
function extractQueryVar (term, queryStr) {

	if (queryStr.indexOf("?") != 0) queryStr = "?" + queryStr;

	var pos = queryStr.indexOf ("?" + term + "=")
	
	if (pos == -1) pos = queryStr.indexOf ("&" + term + "=")
	
	if (pos != -1) {
		pos += term.length + 2
		var endPos = queryStr.indexOf("&", pos)
		if (endPos == -1) endPos = queryStr.length
		term = queryStr.substring(pos, endPos)
	} else {
		term = "";
	}
	
	return unescape(term);

}

// ====================================================================
// SETS THE REGION AND COUNTRY VARS

function setRegionVars () {

	var cookies = document.cookie.split("; ");
	var cookieStr = cookies.join ("&");
	
	window.country = extractQueryVar ("country", cookieStr);
	
	window.region = extractQueryVar ("temp_region", cookieStr);
	
	if (window.region == "") window.region = extractQueryVar ("perm_region", cookieStr);

}

setRegionVars ();


// ====================================================================
// SETS REGION COOKIE

function setRegionCookie (region, country) {

	var futureDate = new Date();
	
	futureDate.setFullYear(futureDate.getFullYear() + 10);
	
	document.cookie = "perm_region=" + escape(region) + "; domain=.businessweek.com; path=/; expires=" + futureDate.toGMTString();

	document.cookie = "country=" + escape(country) + "; domain=.businessweek.com; path=/; expires=" + futureDate.toGMTString();

	setRegionVars ();
	
}

// ====================================================================
// MAKES REGIONAL TOC URLS

function makeRegionalTocLinks (url) {

	urlParts = url.split("/");
	
	filename = urlParts[urlParts.length-1];
	
	issue = urlParts[urlParts.length-2].split("_");
	
	convWeek = "335";
	
	currWeek = parseInt(issue[0]) + "" + parseInt(issue[1]);
	
	if (window.region == "bw_as" && currWeek >= convWeek) {
		filename = "asia" + filename;
	} else if (window.region == "bw_eu" && currWeek >= convWeek) {
		filename = "europe" + filename;
	}
	
	urlParts[urlParts.length-1] = filename;
	
	url = urlParts.join("/");
	
	return url;

}

// ====================================================================
// REDIRECT ASIA AND EUROPE

/*if (location.href.indexOf("http://asia.businessweek.com") != -1 || location.href.indexOf("http://europe.businessweek.com") != -1) {
	self.location = "http://www.businessweek.com/common/international_bridge.htm";
}*/

// returns an accurate top position for a given element
function getRealTopPos(el) {
	iPos = 0
	while (el!=null) {
	 	iPos += el.offsetTop
		el = el.offsetParent
	}
	return iPos
}

// returns an accurate left position for a given element
function getRealLeftPos(el) {
	iPos = 0
	while (el!=null) {
	 	iPos += el.offsetLeft
		el = el.offsetParent
	}
	return iPos
}


function getHeadline () {
	var metas = document.getElementsByTagName("META");

	for (i = 0; i < metas.length; i++) {
	
		if (metas[i].name == "headline") {
		
			return (metas[i].content);
		
		}
	
	}
}






function showZipper() {
	tickerURL = "/common_frames/ticker/ticker.htm";
	if	 (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.substring(0,1) >= 4){
		window.open(tickerURL,'Ticker1','width=691,height=129,scrollbars=no,resizable=no,left=6,top=6');
	}else if (navigator.appName == "Netscape" && navigator.appVersion.substring(0,1) == 3){
		window.open(tickerURL,'Ticker1','width=694,height=129,scrollbars=no,resizable=no,left=6,top=6');
	}else if (navigator.appName == "Netscape" && navigator.appVersion.substring(0,1) >= 4){
		window.open(tickerURL,'Ticker1','width=691,height=128,scrollbars=no,resizable=no,left=6,top=6');
	}else{
		window.open('http://research.businessweek.com/ticker/ticker_main.asp');
	}
}

function goThere(menu, height, width){
	if(menu.options[menu.selectedIndex].value != "") popup(menu.options[menu.selectedIndex].value, height, width);
	menu.selectedIndex = 0;
}












