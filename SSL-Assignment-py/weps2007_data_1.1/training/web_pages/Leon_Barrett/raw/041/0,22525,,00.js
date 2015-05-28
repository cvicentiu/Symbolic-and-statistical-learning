/* FOX SPORTS COMMON JS
    

	index -> 	
	        render ad
			bserver vars
			popup windows
			top nav dropdown
			tab-o-matic
			font resize
			tv highlights fader
			24/7 tracking
			function onload
			onload
			
*/


/* =render ad 
------------------*/

/* 
 * void renderAd ( divName = String 
 *                 aambTag = String )
 *
 * divName: The ID attribute associated with the destination element
 * aambTag: The AAMBx variable name
 *                      
 * Returns: nothing
 * 
 * Writes an AAMBx string to the document and then copies
 * the result to the appropriate element in the document
 * 
 */
                                                 
function renderAd(divName, aambTag) {
    var invObj = 'INV' + divName;
	var isMotif = 0;
	var templateKick = "<script type=\"text/javascript\">var inDapIF = true;</script>";    
    try { 
	    var aamCode = templateKick + eval(aambTag); 
		if(aamCode.indexOf('doubleclick') >= 0) {
		   isMotif = 1;
		}
		if(aamCode.indexOf("buster_url=" > 0)) {
		    aamCode = aamCode.replace("buster_url=", "buster_url=http://www.foxsports.com.au/atlas_rm.html");
		}
		aamCode += "<script type=\"text/javascript\">document.writeln('<scr' + 'ipt language=\"javascript\" defer=\"yes\">document.close();</scr' + 'ipt>'); </script>";

	}
    catch(aamErr) { }
      
    if (typeof(aamCode) != 'undefined') {   
        var msieIdx = navigator.userAgent.indexOf('MSIE');
        if(msieIdx > -1) {
            
            // IE
            var ifrString = '<iframe name="' + invObj + '" width="0" height="0" frameborder="0" AAM_EVENT="javascript:try { document.getElementById(\'' + divName + '\').insertAdjacentElement(\'beforeEnd\', window.frames[\'' + invObj + '\'].document.getElementById(\'adDiv\')) } catch(aamErr) { }"></iframe>';
               
            if(parseInt(navigator.userAgent.substring(msieIdx + 5).split(' ')[0]) < 7) {

                // IE6
				if(isMotif == 1) {
					    document.getElementById(divName).innerHTML += ifrString.replace(/AAM_EVENT/, 'onload');
				} else {
                   document.getElementById(divName).innerHTML += ifrString.replace(/AAM_EVENT/, 'onreadystatechange');
				}
                window.frames[invObj].document.writeln('<div id="adDiv">' + aamCode);

            } else {        
                // IE7 
                document.getElementById(divName).innerHTML += '<div id="TMP' + divName + '" style="display:none">' + escape('<body><div id="adDiv">' + aamCode + '</div>') + '</div>' + ifrString.replace(/AAM_EVENT/, 'onload');
                window.frames[invObj].document.location = 'javascript:unescape(parent.document.getElementById(\'TMP' + divName + '\').innerHTML)';
            }
               
            // Not IE         
        } else document.writeln('<div id="' + invObj + '" style="display:none">' + aamCode + '<script type="text/javascript" defer="true">document.getElementById(\'' + divName + '\').innerHTML = document.getElementById(\'' + invObj + '\').innerHTML;document.getElementById(\'' + invObj + '\').innerHTML = \'\';</scr' + 'ipt></div>');
    }
}


/* =bserver vars 
------------------*/

var adTags = new Array();
var adNames = new Array();
var adExceptions = new Array();
var numberOfAds = 1;

/* accipiter required variables */
var AAMB1 = "", AAMB2 = "", AAMB3 = "", AAMB4 = "", AAMB5 = "", AAMB6 = "",  
AAMB7 = "", AAMB8 = "", AAMB9 = "", AAMB10 = "", AAMB11 = "", AAMB12 = "", 
AAMB13 = "", AAMB14 = "", AAMB15 = "", AAMB16 = "", AAMB17 = "", AAMB18 = "", 
AAMB19 = "", AAMB20 = "";

/* set var for iframed motif ad */
//var inDapIF = true;
var gstrEbDisplayPos = "top";
gfEbInIframe = true;

/* =popup windows
----------------- */
function popUp(url, width, height, bars, isResizable) {
    var setResizable = "yes";
    if(isResizable != null) {
	    if(isResizable === "no");
	    setResizable = "no";
	}
	window.open(url, '',
	'width=' + width + ',height=' + height + ' ,scrollbars=' + bars + 
	    ',status=yes,toolbar=no,menubar=no,location=no,resizable='+setResizable);
}

/* =top nav dropdown
------------------- */

function startList(navId) {
	if (!document.all && !document.getElementById) {
	    return(false);
	}
	if(!document.getElementById(navId)) {
	    return(false);
	}
	var navRoot = document.getElementById(navId);
		for (var i = 0; i<navRoot.childNodes.length; i++) {
		node = navRoot.childNodes[i];
			if (node.nodeName=="LI" || node.nodeName=="DD") {
				node.onmouseover = function() {
				    this.className += " over";
				};
				node.onmouseout = function() {
				    this.className = this.className.replace(" over", "");
				};
			}
		}
	}

/* =tab-o-matic
--------------- */
function hasParent(e, id) {
	if (!e.parentNode) {
	    return false;
	}
	if (e.parentNode.id == id) {
	    return e.parentNode;
	}
	
	return hasParent(e.parentNode, id);
}

// show divs and active tab for each id (tab and div)
function showCBox(e) {  
  var eNews = hasParent(e, 'classifieds');
  if (eNews) {
    eNews.className = e.id;
  }
}

function showBNDiv(e) { 
  var eNews = hasParent(e, 'thumb-toggle');
  
  if (eNews) {
    eNews.className = e.id;
	}
}

/* =font resize
--------------- */
var curFontSize = 1; 	
var fontModifier = 0.1; 

function SetCookie(name,value,expires,path,domain,secure) {
	document.cookie = name + "=" + escape (value) +
	((expires) ? "; expires=" + expires.toGMTString() : "") +
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
}

function FixCookieDate(date) {
	var base = new Date(0);
	var skew = base.getTime();
	if (skew > 0) {
		date.setTime (date.getTime() - skew);
	}
}

function fontSize(act) {
    if (document.getElementById) {
        storyBody = document.getElementById("storybody");
		comments = document.getElementById("comments");
        if (act == 1) {
            curFontSize += fontModifier;
            curFontSize = Math.min(curFontSize, 2);
        }
        else if (act === 0) {
            curFontSize -= fontModifier;
            curFontSize = Math.max(curFontSize, 0.8);
        }
		
        if(storyBody) {
		    storyBody.style.fontSize = curFontSize + "em";
		}
		if(comments) {
		    comments.style.fontSize = curFontSize + "em";
		}
    }
	
	// set cookie with font size
	var expdate = new Date();
	FixCookieDate (expdate);
	expdate.setTime (expdate.getTime() + (672*60*60*1000)); // 4 weeks
	SetCookie("userfontc",curFontSize,expdate);		
	
	return(false);
}

/* =tv highlights fader
----------------------- */
var imagePos = 0;
var currPos = 0;
function fstvImageCycle(atPos) {
var highlights = document.getElementById("rp-highlights");
if (!highlights) {
    return(false);
}

/* check total number divs */
var divs = highlights.getElementsByTagName("div");
var count = (divs.length - 1);
	// check counter
    if(imagePos == count) { 
	    imagePos = 0;
	} else {
	    ++imagePos;
	}
	
	
	window.setTimeout("fstvImageCycle(imagePos)", 6500);
	/* hide all divs */
	for (var i=0; i <= count; i++) {
		document.getElementById("tw" + [i]).style.display = "none";
	}
	toDisplay = "tw" + imagePos;
	document.getElementById(toDisplay).style.display = "block";
}


function fstvInit() {
	window.setTimeout("fstvImageCycle()", 6500);
}

/* =24/7 tracking
----------------- */
var refr=escape(document.referrer); /* get the http referer and encode it */
var dom=location.hostname; /* get the host domain */
var stURL="http://link.decideinteractive.com/n/23755/23761/foxsports.news.com.au/dd08fa9f0025030000000006000000000355c2060000000000000000000000000000000100/i/c?0&pq=%2f&1pixgif&referer=" + 
        refr;
if ( (refr && refr.search(dom) == -1) && (location.href.toUpperCase().indexOf("247SEO=N") == -1) ) /* if the referrer is external preload the image request and does not contain 247SEO argument = "N" */
{
imageTR = new Image();
imageTR.src = stURL;
}

/* =function onload
-------------------- */
function addDomFunction(fn, dependencies) {
	var counter = 0, collections = {}, timer = setInterval( function()	{
		var ready = false;
		counter++;
	
		if (typeof document.getElementsByTagName != 'undefined' && 
		        (document.getElementsByTagName('body')[0] || document.body)) {
			ready = true;
			
		    if (typeof dependencies == 'object') {
			    for (var i in dependencies) {
			        if (dependencies[i] == 'id' && !document.getElementById(i)) {
				        ready = false;
				        break;
			        } else if (dependencies[i] == 'tag') {
				        var len = document.getElementsByTagName(i).length;
				        if (typeof collections[i] == 'undefined' || collections[i] != len || len < 1) {
					        collections[i] = len;
					        ready = false;
					        break;
				        }
			        }
		        }
	        }
	
	        if (ready) {
		        clearInterval(timer);
		        fn();
	        }
        }
			
	    if (counter >= 40) {
	        clearInterval(timer);
	    }
			
	}, 250);
}


/* Assign Events (Set class name 'assign-PUTEVENTHERE')
---------------------*/
function assignEvents() {
	if (!document.all&&!document.getElementById) {
	    return false;
	}
	var content = document.getElementsByTagName('*');

	for (i=0; i<content.length; i++) {
		node = content[i];
		if(content[i].className) {
			nodeClass = content[i].className;
			if (nodeClass.indexOf('assign-') != -1) {
				var nodeEvent = nodeClass.substring(nodeClass.indexOf("assign-") + 7, nodeClass.length);
				switch (nodeEvent) {
					case 'down': 
						node.onmousedown = function() {
							this.className += ' down';
						};	
						node.onmouseup = function() {
							this.className=this.className.replace(" down", "");
						};

						break;
						
					case 'popup':
						node.onclick = function() {
							initPopUp(this);
							return false;
						};
						
						break;		
						
					case 'fontinc':
						node.onclick = function() {
							fontSize(1);
						};
						
						break;
						
					case 'fontdec':
						node.onclick=function() {
							fontSize(0);
						};
						
						break;
				}
			}
		}
	}
}

/* for yahoo content matching */
function showListings(parentElementId, dlClassName) {
    var i=6;
	var newDL = document.createElement("dl");
	newDL.className = dlClassName;
    while (i < zSr.length) {
        var descr = zSr[i++]; // listing description
        var unused1 = zSr[i++]; // (ignore)
        var clickURL = zSr[i++]; // listing link
        var title = zSr[i++]; // listing title
        var sitehost = zSr[i++]; // advertiser's domain name
        var unused2 = zSr[i++]; // (ignore)
	    var newDT = document.createElement("dt");
		var newDD = document.createElement("dd");
		var newA = document.createElement("a");
		newDT.appendChild(newA);
		newA.setAttribute("target", "_new");
		newA.setAttribute("href", clickURL);
		var newA2 = document.createElement("a");
		newDD.appendChild(newA2);
		newA2.setAttribute("target", "_new");
		newA2.setAttribute("href", clickURL);
		var newStrong = document.createElement("strong");
		newA.appendChild(newStrong);
		var newTextTitle = document.createTextNode(title);
		newStrong.appendChild(newTextTitle);
		var newTextDescr = document.createTextNode(descr);
		newA2.appendChild(newTextDescr);
		
		newDL.appendChild(newDT);
		newDL.appendChild(newDD);
	}
	document.getElementById(parentElementId).appendChild(newDL);
	
}

/* =popup windows
------------------ */
function initPopUp(trigger) {
	
	//defaults
	var width =680 ;
	var height = 560 ;
	var bars = 'no';
	
	//popup specific
	switch(trigger.getAttribute('rel')) {
	
		case 'popup-gallery':
		width = 780;
		height = 550;
		break;
		
		case 'popup-email':
		width = 520;
		height = 400;
		break;
		
		case 'popup-tvguide':
		width = 680;
		height = 560;
		break;
		
		case 'popup-video':
		width = 780;
		height = 550;
		break;
		
		case 'sample':
		width = 700;
		height = 550;
		bars = 'yes';
		break;
	}
	
    popUp(trigger.href, width, height, bars);

}

/* onload
--------------- */
function init() {	
    // quit if this function has already been called
	if (arguments.callee.done) {
	    return;
	}
		
	// flag this function so we don't do the same thing twice
	arguments.callee.done = true;
		
	// kill the timer
	if (_timer) {
	    clearInterval(_timer);
		_timer = null;
	}
	var onloadOnly = 0;
	/*@cc_on @*/
    /*@if (@_win32)
	    onloadOnly = 1;
	/*@end @*/
	
	if(typeof(Ninbar) != "undefined") {
	    ninbar = new Ninbar();
	    setTimeout("ninbar.headlineTicker.nextHeadline(1, 0)", 300);
	}
	
	if(typeof(FoxCyclo) != "undefined") {
	    var foxCyclo = new FoxCyclo();
	    foxCyclo.init();
	}
	
	if(typeof(assignEvents) != "undefined") {
	    assignEvents();
	}
	
	if(typeof(fstvInit) != "undefined") {
	    fstvInit();
	}
	
	// full tv guide
	if(typeof(tvInit) != "undefined") {
	    tvInit();
	}
	
	if(typeof(extInit) != "undefined") {
	    extInit();
	}
} 
	
/* for Mozilla */
if (document.addEventListener) {
   // document.addEventListener("DOMContentLoaded", init, null);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
	document.write("<script id=__ie_onload defer src=javascript:void(0)></script>");
	var script = document.getElementById("__ie_onload");
	script.onreadystatechange = function() {
		if (this.readyState == "complete") {
			init(); // call the onload handler
		}
	};
/*@end @*/
	
/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
	var _timer = setInterval(function() {
		if (/loaded|complete/.test(document.readyState)) {
			init(); // call the onload handler
		}
	}, 10);
}

/* for other browsers */
window.onload = function() {
init();
/*@cc_on @*/
/*@if (@_win32)

/*@end @*/

if(typeof(contentMatchBootstrap) != "undefined") {
    contentMatchBootstrap();
}
}

/* =onload
---------- 
 addDomFunction(fstvInit, {'div' : 'rp-highlights'});*/ 