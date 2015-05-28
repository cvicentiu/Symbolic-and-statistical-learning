var hub;
var storyType = location.href.split("/")[6];
var xmlhttp;

/* NB: font size */
function fontSizer(){
	if(!d.getElementById("articleTools") || d.getElementById("fontSize")){ return; };
	
	var fS = parseInt(checkFontSize());
	newSize(fS);
	
	var fsHolder = d.createElement("li");
	fsHolder.id = "fontSize";
	
	var smallerObj = createFontSizer("fsSmaller");
	var largerObj = createFontSizer("fsLarger");
	
	d.getElementById("articleTools").appendChild(fsHolder);
	fsHolder.appendChild(smallerObj);
	fsHolder.appendChild(d.createTextNode("Text Size"));
	fsHolder.appendChild(largerObj);

	function checkFontSize(){
		function convertFontSize(){
			var cookie = getCookie("gam_style");
			if(cookie==null){ return; }
			cookie = cookie.split(";");
			for(x=0;cookie.length>x;x++){
				if(cookie[x].indexOf("fS")!=-1) {	
					switch(cookie[x].split("fS=")[1]){
						case -2:
							fS = 0;
							break;
						case 0:
							fS = 2;
							break;
						case 1:
							fS = 3;
							break;
						case 2:
							fS = 4;
							break;
						default:
							fS = 1;
							break;
					}
				}
			}
			deleteCookie("gam_style");
			setCookie("TGAM-fontSize", "fS="+fS+";");	
		}
		convertFontSize(); 
		
		var cookie = getCookie("TGAM-fontSize");
		if(cookie==null){ cookie = "fS=1;"; }
		cookie = cookie.split(";");
		for(x=0;cookie.length>x;x++){
			if(cookie[x].indexOf("fS")!=-1) {	
				var fS = cookie[x].split("fS=")[1];
				if(isNaN(fS)) { fS = 1; }
				setCookie("TGAM-fontSize", "fS="+fS+";");	
			}
		}
		return fS; 
	}
	
	function createFontSizer(v){
		switch(v){
			case "fsSmaller":
				var parms = [smallerObj,"Decrease","\u2212","minus",0];
				var smallerObj = d.createElement("img");
				break;
			case "fsLarger":
				var parms = [largerObj,"Increase","+","plus",4];
				var largerObj = d.createElement("img");
				break;
		}
		parms[0] = d.createElement("img");
		parms[0].src = "http://images.theglobeandmail.com/v5/images/icon/icon-"+parms[3]+".gif";
		parms[0].width = 12;
		parms[0].height = 11;
		parms[0].alt = parms[3];
		parms[0].id = v;
		parms[0].style.verticalAlign = "-1px";
		parms[0].style.margin = "0 2px";
		if(parms[4]!=fS) {
			addEvent(parms[0],"click",changeSize);
			parms[0].title = parms[1] +" the text size";
			parms[0].style.cursor = (d.all) ? "hand" : "pointer";
			parms[0].style.opacity = "1";
		} else {
			parms[0].title = "You cannot " + parms[1].toLowerCase() + " the text size any further";
			parms[0].style.cursor = "default";
			parms[0].style.opacity = "0.2";
		}
		return parms[0];
	}
	
	function changeSize(){
		switch(this.id){
			case "fsSmaller":
				var parms = [smallerObj,largerObj,"Decrease","Increase","\u2212","minus",0,-1];
				break;
			case "fsLarger":
				var parms = [largerObj,smallerObj,"Increase","Decrease","+","plus",4,1];
				break;
		}
		var fS = checkFontSize();
		var nfS =	eval(parseInt(fS)+parms[7]);
		if(parms[6]!=nfS){
			newSize(nfS);
			addEvent(parms[1],"click",changeSize);
			parms[1].title = parms[3] +" the text size";
			parms[1].style.opacity = "1";
			parms[1].style.cursor = (d.all) ? "hand" : "pointer";
		} else {
			newSize(nfS);
			removeEvent(parms[0],"click",changeSize);
			parms[0].title = "You cannot " + parms[2].toLowerCase() +" the text size any further";
			parms[0].style.opacity = "0.2";
			parms[0].style.cursor = "default";
		}
		
		if(d.getElementById("skyRHolder") && d.getElementById("skyR") ) {
			placeAC("skyR");
		}	
		if(d.getElementById("boxRHolder") && d.getElementById("boxR") ) {
			placeAC("boxR");
		}		
		
	}
	
	function newSize(fS){
		switch(fS) {
			case 0:
				size = 85;
				break;
			case 2:
				size = 115;
				break;
			case 3:
				size = 130;
				break;
			case 4:
				size = 150;
				break;
			default:
				size = 100;
				break;
		}
		if(d.getElementById("article")) { d.getElementById("article").style.fontSize = size+"%"; }
		setCookie("TGAM-fontSize", "fS="+fS+";");	
	}

}

/* NB: widen page on finance sites */
function writeWidenPage(){
	if(d.getElementsByTagName("BODY")[0].className.indexOf("globeinvestor")!=-1 || d.getElementsByTagName("BODY")[0].className.indexOf("globefund")!=-1){ 
		var pt = d.getElementById("articleTools");
		var li = d.createElement("LI");
		var an = d.createElement("A");
		li.className = "widen";
		an.href = "#";
		addEvent(an,"click",function () { widenPage(this); return false; });
		an.appendChild(d.createTextNode("Widen this Page"));
		li.appendChild(an);
		pt.appendChild(li);
	}

	function widenPage(el){
		var nObj = d.getElementById("articleTools").childNodes;
		var text = el.firstChild.nodeValue;
	
		if(text.indexOf("Widen")!=-1){
			d.getElementById("content").className = "widen";
			el.firstChild.nodeValue = "Narrow this Page";
			d.getElementById("boxRHolder").style.visibility = "hidden";		
			d.getElementById("skyRHolder").style.visibility = "hidden";	
			d.getElementById("halfpageRHolder").style.visibility = "hidden";	
			el.parentNode.className = "narrow";
		} else {		
			d.getElementById("content").className = "";
			d.getElementById("boxRHolder").style.visibility = "";			
			d.getElementById("skyRHolder").style.visibility = "";	
			d.getElementById("halfpageRHolder").style.visibility = "";	
			el.firstChild.nodeValue = "Widen this Page";
			el.parentNode.className = "widen";
		}
	}
}



/* NB: duplicate tools within aricles */
function addArticleTools(){
	if(d.getElementById("articleBottomTools") || !d.getElementById("articleBottomToolsHolder")) { return; }
	var aTools = d.getElementById("articleTools").cloneNode(true);
	aTools.id = "articleBottomTools";
	d.getElementById("articleBottomToolsHolder").appendChild(aTools);
	addArticleToolEvents(d.getElementById("articleTools").getElementsByTagName("A"));
	addArticleToolEvents(d.getElementById("articleBottomTools").getElementsByTagName("A"));
	
function addArticleToolEvents(aToolsLinks){
	function copyrightPopup(url){
		(window.copywrite==null||copywrite.closed) ? copywrite=window.open(url,'contentservices', 'width=440,height=550,scrollbars=yes,resizable=yes') : copywrite.location.href = url; 
		copywrite.focus();
	}
	if(aToolsLinks.length>0){
		if(d.getElementById("articleTools")){ 
			for(x=0;aToolsLinks.length>x;x++){
				if(aToolsLinks[x].parentNode.className=="comment" && d.getElementById("commentRSS")) { 
					aToolsLinks[x].title = (aToolsLinks[x].className=="closed") ? "Follow the conversation" : "Join the conversation";
				}
				else if(aToolsLinks[x].parentNode.className=="license") {
					addEvent(aToolsLinks[x], "click", function() {
						copyrightPopup(this.href);
						return false;
					});
				}
			}
		}
	}}
}

/* NB: get stories, and hide if listed */
function getSLinks(i,s_id,count){
	var s_links = d.getElementById(i).getElementsByTagName("a");
	for(x=0;s_links.length>x;x++){
		if((s_links[x].href.indexOf(s_id)>1) || (x>=count)){
			nObj = ((i=="relatedNewsNav" || i=="wiseNav") && s_links[x].parentNode.parentNode.nodeName=="LI") ? s_links[x].parentNode.parentNode : s_links[x].parentNode;
			nObj.style.display = "none";
			return;
		}
	}
}

/* NB: init */
function articleInit(){
	if(d.getElementById("articleTools") && location.href.indexOf("CommentStory")==-1) { 
		addArticleTools();
		if(window.print){ 
			printThis(d.getElementById("articleTools"));
			if(d.getElementById("articleBottomTools")) { printThis(d.getElementById("articleBottomTools")); }
		}	
	}
	if((location.href.indexOf("PPVStoryOwn")==-1) && (d.getElementsByTagName("BODY")[0].className.indexOf("bundle")==-1)) { fontSizer();  }
	if(d.getElementById("feedsAvailable")) { makeRSSLink("feedsAvailable","A"); }
	
	var shareLinks = getElementsByClassName(d.getElementById("chewy"), "A", "share-article");
	if(shareLinks.length > 0) {
		for(var i=0; i<shareLinks.length; i++)	{
			addEvent(shareLinks[i], "click", function() {
				return showHelp("shareThisPost",this,"switch","close-shareThisPost","","",40,40);
			});
		}
	}
		
	writeWidenPage();
	globalNav();
	tagInit();
	FTSinit();
}

function tagInit() {
	if(storyType == "BNStory" || storyType == "GAStory" || storyType == "WBStory") {  
		/* avoid JS errors on other story template files like GFStory */
		if(d.getElementById("showWhatAreTags")) {
			addEvent(d.getElementById("showWhatAreTags"), "click", function() {
				return showHelp("whatAreTags",this,"switch","close-whatAreTags","","",60,20);
			});
		}
	} 
}

function FTSinit() {
	if(storyType != "BNStory") { return; }	
	var objWriters = getElementsByClassName(d.getElementById("related"), "A", "ftsWriter"); /* grab writers from Follow this Writer in related to Article */
	if(objWriters.length > 0) {
		for(var c=0; c<objWriters.length; c++) {
				// add the event to prompt for each writer
				addEvent(objWriters[c], "click", function() {
					var col = this.id.split("-")[1];
					return showHelp("showEmailAlert-" + col,this,"switch","close-showEmailAlert-" + col);
				});
				// now add the event for each additon
				var columnist = objWriters[c].id.split("-")[1];
				addEvent($("createBNAlert-" + columnist), "click", createAlert);
		}//end for
	}
	/* follow this company */
	var objStock = getElementsByClassName(d.getElementById("related"), "A", "ftsStock");
	if(objStock.length > 0) {
		for(var g=0; g<objStock.length; g++) {
			addEvent(objStock[g], "click", function() {
				var name = this.id.split("-")[1];
				return showHelp("showEmailStockAlert-" + name,this,"switch","close-showEmailStockAlert-" + name);
			});	
		}
		var objLinks = getElementsByClassName(d.getElementById("content"), "A", "createBNStockAlert");
		for(var x=0; x<objLinks.length; x++) {
			addEvent(objLinks[x], "click", createAlert);	
		}
	}	
	/* get class whatAreAlerts and then add event */
	var objWhat = getElementsByClassName(d.getElementById("content"), "A", "whatAreAlerts");	
	if(objWhat.length > 0) {
		for(var b=0; b<objWhat.length; b++) {
			addEvent(objWhat[b], "click", function() { 
				return showHelp("showWhatAreAlerts",this,"switch","close-showWhatAreAlerts");	
			});
		}
	}
}	

function createAlert(e) {
	e = (!e) ? window.event : e;
	var url = this.href;
	var objId = this.id;
	var objTxt = this.href.split("=")[2]; /* ie. MSFT or TERRY+WEBER */
	var type, objShow, aAdd, objList, imgLock;
	
	if(objId.indexOf("createBNAlert-") != -1) {
		type = "writer";
	} else if(objId.indexOf("stockAlert-") != -1) {
		type = "stock";
	} else {
		return;
	}	

	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject){
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		return false;
	}	
	xmlhttp.open("GET", url, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 ||  xmlhttp.readyState=="complete") {
			if(type == "writer") {
				// we've gone getElementsByTagName crazy below since IE and FF differ in ues of code like
				objShow = d.getElementById("showEmailAlert-" + objTxt);
				objList = d.getElementById("showEmailAlert-" + objTxt).getElementsByTagName("UL")[0];
				if((xmlhttp.responseText.indexOf("Max writer") == -1) && (xmlhttp.responseText.indexOf("Sorry") == -1) && (xmlhttp.responseText.indexOf("Writer already exists") == -1)) {
						objShow.getElementsByTagName("H4")[0].firstChild.nodeValue = "Your alert has been created!";
				}
				objShow.getElementsByTagName("P")[0].innerHTML = xmlhttp.responseText;
				imgLock = objList.getElementsByTagName("IMG")[0]; // the lock image
				aAdd = objList.getElementsByTagName("LI")[0].getElementsByTagName("A")[0];	// the add link		
				objList.getElementsByTagName("LI")[0].removeChild(aAdd);
				objList.getElementsByTagName("LI")[0].removeChild(imgLock);
			} else if(type == "stock") {
				var name = objId.split("-")[1];				
				objShow = d.getElementById("showEmailStockAlert-" + name);
				objList = d.getElementById("stockAlert-" + name).parentNode;
				if(xmlhttp.responseText.indexOf("stockAdded") == -1){
					objList.innerHTML = xmlhttp.responseText;
				} else {
					objList.appendChild(d.createTextNode("E-mail alert for ticker symbol " + objTxt + " (" + name + ") has been added"));
					imgLock = objList.getElementsByTagName("IMG")[0];
					aAdd = objList.getElementsByTagName("A")[0];
					objList.removeChild(aAdd);
					objList.removeChild(imgLock);
				}
			} else {
				return;	
			}			
			objShow.className += " alertAdded";
			if(type == "writer" ) { new Effect.Highlight(objShow.getElementsByTagName("P")[0], {duration: 3.0 }); }
			new Effect.Highlight(objList, {duration: 3.0 });
		} 	
	}
	xmlhttp.send(url);	
	return false;
}

if(typeof init != "function"){ function init(){ articleInit(); } }
/* for IE browsers lower than ie7 *//*@cc_on
	@if (@_jscript_version < 5.7)
		d.write("<script src='/v5/scripts/onLoad-ie.js'><"+"/script>");
	@end
@*/