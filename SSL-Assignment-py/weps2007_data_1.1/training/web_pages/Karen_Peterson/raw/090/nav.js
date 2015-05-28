var pageMap = new Array();

pageMap["/en/cms/?9"] = "navtalentmanagement";
	pageMap["/en/cms/?10"] = "navattractingtalent";
	pageMap["/en/cms/?11"] = "navretainingtalent";
	pageMap["/en/cms/?12"] = "navdevelopingtalent";
	pageMap["/en/cms/?13"] = "navtransitioningtalent";
	pageMap["/en/cms/?14"] = "navindustryexpertise";
	pageMap["/en/cms/?7"] = "navtech";
pageMap["/en/cms/?1"] = "navexecutivecoaching";
	
	
	pageMap["/en/cms/?20"] = "navselectingacoach";
	pageMap["/en/cms/?21"] = "navfaqs";
pageMap["/en/cms/?8"] = "navoutplacement";
	
pageMap["/en/cms/?22"] = "navknowledgecenter";
pageMap["/en/physicallocations/search.asp"] = "navcpilocations";
pageMap["/en/cms/?23"] = "navresourcedirectories";
	pageMap["/en/jobs/search.asp"] = "navjobboard";
	pageMap["/en/directories/search.asp"] = "navrecruitersdirectories";
pageMap["/en/calendarevents/monthly.asp"] = "navevents";
pageMap["/en/cms/?418"] = "navnewsroom";
	pageMap["/en/releases/search.asp"] = "navpressroompage";
	pageMap["/en/cms/?421"] = "navcompanyinformation";
pageMap["/en/cms/?16"] = "navaboutcpi";
	pageMap["/contact/member.asp"] = "navbecomeapartner";
	pageMap["/en/cms/?119"] = "navmanagementteam";
	pageMap["/en/cms/?120"] = "navindustryexpertise";
pageMap["/contact/index.asp"] = "navcontactus";
pageMap["/index.asp"] = "navhome";
	

function initNav(){
	initBtnStates();
	initBtnActions();
}

function initBtnStates(){
	var loc = window.location.href;
	
	//if there is a variable passed on the query string (such as userid=xxxx) strip off the query string data
	//this should ignore cms specific query strings which have no equal signs (=) in them
	if (loc.indexOf("=") != -1){
		var page = window.location.pathname;
	} else {
		var page = window.location.pathname + window.location.search;
	}
	//alert(page);
	
	var navId = pageMap[page];
	if (navId != null){
		var navDiv = document.getElementById(navId);
		//if it's a subnav also select the main nav
		if (navDiv.className.indexOf("subNav") != -1){
			navDiv.className = "subNavLive";
			navDiv.parentNode.style.display = "block";
			var id = navDiv.parentNode.getAttribute("id");
			id = id.substring(6);
			document.getElementById("nav" + id).className = "mainNavLive";
		} else {
			navDiv.className = "mainNavLive";
			//show subnav if one exists
			var id = navId.substring(3);
			if (document.getElementById("subNav" + id)){
				document.getElementById("subNav" + id).style.display = "block";
			}
		}
	}
}

/** 
* Sets up mouseover, mouseout, and click actions for each nav button
*/
function initBtnActions(){
	
	var nav = document.getElementById('navigation');
	if (!nav) return;
	var navItems = nav.getElementsByTagName('div');
	var className;
	for (var i=0; i<navItems.length; i++){
		className = navItems[i].className;
		if (className == "mainNav"){
			navItems[i].onmouseover = mainNavRollOver;
			navItems[i].onmouseout = mainNavRollOut;
			navItems[i].onclick = navClick;
		} else if (className == "subNav"){
			navItems[i].onmouseover = subNavRollOver;
			navItems[i].onmouseout = subNavRollOut;
			navItems[i].onclick = navClick;
		} else if (className == "mainNavLive" || className == "subNavLive"){
			navItems[i].onclick = navClick;
		}
	}
}


function navClick(){
	var url = this.getElementsByTagName('a')[0].getAttribute("href");
	window.location = url;
}

function mainNavRollOver(){
	this.className = "mainNavOver";
}
function mainNavRollOut(){
	this.className = "mainNav";
}
function subNavRollOver(){
	this.className = "subNavOver";
}
function subNavRollOut(){
	this.className = "subNav";
}
