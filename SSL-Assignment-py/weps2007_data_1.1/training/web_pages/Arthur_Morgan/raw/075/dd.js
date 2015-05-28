 function getTop(el) {
	iPos = 0;
	while (el!=null) {
	 	iPos += el.offsetTop;
		el = el.offsetParent;
	}
	return iPos;
}

function getLeft(el) {
	iPos = 0;
	while (el!=null) {
	 	iPos += el.offsetLeft;
		el = el.offsetParent;
	}
	return iPos;
}

function addEvent (el, evName, evFunction) {
	if (isIE) {
		eval("el.attachEvent('" + evName + "'," + evFunction + ")"); 
	} else {
		eval("el." + evName + " = " + evFunction);
	}
}

function getTarg (e) {
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	return targ;
}

function itemOver(e) {
	var targ = getTarg(e);
	targ.style.backgroundColor = targ.parentNode.onColor;
}

function itemOut(e) {
	var targ = getTarg(e);
	targ.style.backgroundColor = targ.parentNode.offColor;
}

function itemClick(e) {
	var targ = getTarg(e);
	location.href = targ.URL;
}

function menuOver(e) {
	clearTimeout(lastTimeout);
}

function menuOut(e) {
	var targ = getTarg(e);
	while (!targ.chanCode) {
		targ = targ.parentNode;
	}
	menuOffProcess(targ.chanCode);
}

function menuOffNow (chanCode) {
	getEl(chanCode).style.visibility = hid;
	if (isIE) selectVis(vis);
}

function menuOffProcess (chanCode) {
	lastTimeout = setTimeout("menuOffNow('" + chanCode + "Menu')", 1000);
}

function menuOnProcess (el) {
	clearTimeout(lastTimeout);
	if (el.style.visibility != vis) {
		rfrshMenuAd(el.chanCode);
		if (actMenu != "") getEl(actMenu+"Menu").style.visibility = hid;
		actMenu = el.chanCode;
		el.style.visibility = vis;
		if (isIE) selectVis(hid);
	}
}

function selectVis(state) {
	selects = document.getElementsByTagName("select");
	for (selectIndex = 0; selectIndex < selects.length; selectIndex++) {
		selects[selectIndex].style.visibility = state;
	}
}

function areaOver (e) {
	var targ = getTarg(e);
	menu = getEl(targ.chanCode + "Menu");
	menuOnProcess(menu);
}

function areaOut (e) {
	var targ = getTarg(e);
	menu = getEl(targ.chanCode + "Menu");
	menuOffProcess(targ.chanCode);
}

function newMenu (chanCode) {
	var menuDiv = makeEl("DIV");
	menuDiv.className = "outerMenu";
	menuDiv.id = chanCode + "Menu";
	menuDiv.chanCode = chanCode;
	menuDiv.offColor = (chanCode == activeTab) ? cColor : oColor;
	menuDiv.onColor = (chanCode == activeTab) ? hlActColor : actColor;
	menuDiv.style.zIndex = zInd++;
	menuDiv.style.visibility = hid;
	menuDiv.style.position = "absolute";
	addEvent (menuDiv, mOv, "menuOver");
	addEvent (menuDiv, mOt, "menuOut");
	addTopEl(menuDiv);
	positionMenu(menuDiv);
	var area = getEl(chanCode + "Area");
	area.chanCode = chanCode;
	addEvent(area, mOv, "areaOver");
	addEvent(area, mOt, "areaOut");
	return menuDiv;
}

function positionMenu(el) {
	var area = getEl(el.chanCode + "Area");
	if (area) {
		var menuTop = getTop(chanGif) + 17;
		var coords = area.coords.split(",");
		var width = 93;
		var left = ((getLeft(chanGif)) + parseInt(coords[0]));
		el.style.top = menuTop + px;
		el.style.width = width + px;
		//if (isIE) el.ieWidth = width;
		el.style.left = left + px;
	}
}

function posAllMenus() {
	for (menu in cm) {
		positionMenu(cm[menu]);
	}
	if (pCnt == 0) window.clearInterval(posLoop);
	
	pCnt--;
}

function makeEl(tagName) { return document.createElement(tagName); }
function makeTextEl (text) { return document.createTextNode(text) }
function addText (el, text) { el.appendChild( makeTextEl(text) ) }
function getEl (elName) { return document.getElementById(elName) }
function addTopEl (el) { document.body.insertBefore(el, document.body.firstChild) }
function areaExists (chanCode) { return (getEl(chanCode + "Area") ? true : false); }

function nIt ( menu, itemName, itemURL) {
	var itemDiv = makeEl("DIV");
	//if (isIE) itemDiv.style.width = menu.ieWidth - 1 + px;
	itemDiv.className = "item";
	addText(itemDiv, itemName);
	itemDiv.URL = itemURL;
	itemDiv.style.backgroundColor = menu.offColor;
	itemDiv.align="left";
	addEvent (itemDiv, mOv, itemOver)
	addEvent (itemDiv, mOt, itemOut)
	addEvent (itemDiv, "onclick", itemClick)
	menu.appendChild(itemDiv);
}

function rfrshMenuAd (chanCode) {
	var menuHierarchy247 = (adValues[chanCode] ? adValues[chanCode] : "");
	var adVars = menuHierarchy247 + "/" + (Math.random() * 1000000000000000000) + "@Top2!Top2";
	//var adVars = "chan=" + chanCode + "&sub=" + chanCode + "menu&adsize=88x31&pagepos=8&var=" + (Math.random() * 1000000000000000000);
	if (getEl(chanCode + "MenuAdLink")) getEl(chanCode + "MenuAdLink").href = "http://oascentral.businessweek.com/RealMedia/ads/click_nx.ads/businessweek.com" + adVars;
	getEl(chanCode + "MenuAdTrack").src = "http://oascentral.businessweek.com/RealMedia/ads/adstream_nx.ads/businessweek.com" + adVars;
}

function addAd ( menu, imgSrc ) {
	var chanCode = menu.chanCode;

	var adTrack = makeEl("IMG");
	adTrack.className = "menuAdTrack"
	adTrack.id = chanCode + "MenuAdTrack";
	addTopEl(adTrack);

	var adHref = makeEl("A");
	adHref.setAttribute ("HREF", "#");
	adHref.target = "_blank";
	adHref.id = menu.chanCode + "MenuAdLink";

	if ( imgSrc != "") {
		var adImg = makeEl("IMG");
		adImg.src = imgSrc;
		adImg.className = "menuAdImg";

		var itemDiv = makeEl("DIV");
		//if (isIE) itemDiv.style.width = menu.ieWidth - 1 + px;
		itemDiv.className = "item sponsorText";
		itemDiv.style.backgroundColor = (menu.chanCode == activeTab) ? cColor : oColor;
		addText(itemDiv, "Sponsored by:");
		itemDiv.appendChild(makeEl("BR"));

		adHref.appendChild(adImg)
		itemDiv.appendChild(adHref);
		menu.appendChild(itemDiv);
	}
}

UA = navigator.userAgent;
chanGif = getEl ("channelGif");

if (//UA.indexOf("Opera") == -1 && 
	//UA.indexOf("Safari") == -1 && 
	!(UA.indexOf("MSIE") != -1 && UA.indexOf("Mac") != -1) &&
	chanGif &&
	getEl("channelMap")) {
	
	var lastTimeout;
	actMenu = "";
	actColor = "#FFF";		// rollover color for regular menus
	hlActColor = "#dfdfdf";	// rollover color for highlighed menus
	cColor = "#FFF";	// highlighted menu item color
	oColor = "#DFDFDF";	// regular menu item bgcolor
	isIE = (UA.indexOf("MSIE") != -1) ? true : false;
	activeTab = getEl("channelGif").src;
	activeTab = activeTab.substring(activeTab.lastIndexOf("/")+1, activeTab.lastIndexOf("/")+3);
	mOv = "onmouseover";
	mOt = "onmouseout";
	px = "px";
	hid = "hidden";
	vis = "visible";
	zInd = 600;
	b = "http://www.businessweek.com";
	
	adValues = new Object();
	adValues["au"] = "/autos";
	adValues["bs"] = "/bschools";
	adValues["ca"] = "/careers";
	adValues["db"] = "/topnews";
	adValues["as"] = "/globalbiz/asia";
	adValues["eu"] = "/globalbiz/europe";
	adValues["mz"] = "/magazine";
	adValues["pi"] = "/investing";
	adValues["sb"] = "/smallbiz";
	adValues["tc"] = "/tech";
	adValues["di"] = "/innovation";
	adValues["hp"] = "/home";
	
	cm = new Object();
	
	ch = "hp";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"Latest News",b+"/index.html");
	nIt(cm[ch],"B-Schools News","/index.html?#bschools");
	nIt(cm[ch],"Company News",b+"/index.html?#company");
	nIt(cm[ch],"Global News",b+"/index.html?#global");
	nIt(cm[ch],"Investing News",b+"/index.html?#investing");
	nIt(cm[ch],"Political News",b+"/index.html?#politics");
	nIt(cm[ch],"Polls",b+"/index.html?#poll");
	nIt(cm[ch],"Smallbiz News",b+"/index.html?#smallbiz");
	nIt(cm[ch],"Special Reports",b+"/index.html?#specrep");
	nIt(cm[ch],"Tech News",b+"/index.html?#tech");
	nIt(cm[ch],"Video Views",b+"/index.html?#video");
	nIt(cm[ch],"Viewpoint",b+"/index.html?#views");
	
	addAd(cm[ch],"http://images.businessweek.com/sponsors/circulation/BW_88x31_v1.gif");
	}
	
	ch = "mz";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"Latest Issue",b+"/contents.htm");
	nIt(cm[ch],"Magazine Search",b+"/search/index.html?chan=mz");
	nIt(cm[ch],"Special Reports",b+"/common/special01.htm?chan=mz");
	nIt(cm[ch],"Tools",b+"/common/tools.htm?chan=mz");
	nIt(cm[ch],"Scoreboards",b+"/common/tools.htm?chan=mz");
	nIt(cm[ch],"BWTV Videos",b+"/mediacenter/?chan=mz");
	nIt(cm[ch],"Playbooks",b+"/playbook/?chan=playbook");
	
	nIt(cm[ch],"Subscribe to BW","https://w1.buysub.com/servlet/OrdersGateway?cds_mag_code=BWK&cds_page_id=23191&cds_response_key=I0505S4F");
	nIt(cm[ch],"Newsletter",b+"/newsletters.htm");
	addAd(cm[ch],"");
	}
	
	ch = "db";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"Top News Main",b+"/index.html");
	nIt(cm[ch],"News Archive",b+"/bwdaily/list/news01.htm");
	nIt(cm[ch],"News Search",b+"/search/search.htm");
	nIt(cm[ch],"Special Reports",b+"/common/special01.htm");
	
	nIt(cm[ch],"Newsmaker Videos",b+"/mediacenter/video/newsmakers/index.html");
	nIt(cm[ch],"Newsletter ",b+"/newsletters.htm");
	addAd(cm[ch],"http://images.businessweek.com/sponsors/circulation/BW_88x31_v1.gif");
	}
	
	ch = "pi";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"Investing Main",b+"/investing/index.html");
	nIt(cm[ch],"Markets",b+"/investor/markets.html");
	nIt(cm[ch],"Stocks",b+"/investor/stocks.html");
	nIt(cm[ch],"Funds",b+"/investor/funds.html");
	nIt(cm[ch],"Sectors",b+"/investor/sectors.html");
	nIt(cm[ch],"Economy & Bonds",b+"/investor/economybonds.html");
	nIt(cm[ch],"Europe: Investing",b+"/investor/europe.html");
	nIt(cm[ch],"Philanthropy",b+"/bwdaily/philanthropy/index.html");
	nIt(cm[ch],"Investing Columns",b+"/investor/list/mcoltoc01.htm");
	nIt(cm[ch],"Newsletter ",b+"/newsletters.htm");
	addAd(cm[ch],"http://images.businessweek.com/sponsors/circulation/BW_88x31_v3.gif");
	}
	
	ch = "as";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"Asia Main",b+"/globalbiz/asia/index.html");
	nIt(cm[ch],"China",b+"/globalbiz/asia/index.html?#China");
	nIt(cm[ch],"India",b+"/globalbiz/asia/index.html?#india");
	nIt(cm[ch],"Economics",b+"/globalbiz/asia/index.html?#EconomicsPolicy");

nIt(cm[ch],"Innovation",b+"/globalbiz/asia/index.html?#InnovationDesign");

nIt(cm[ch],"Investing",b+"/globalbiz/asia/index.html?#Investing");
	

nIt(cm[ch],"Asia Tech Blog",b+"/globalbiz/blog/asiatech/");
	
nIt(cm[ch],"Bangalore Tigers Blog",b+"http://www.businessweek.com/globalbiz/blog/bangaloretigers/index.html");
	nIt(cm[ch],"Newsletter",b+"/newsletters.htm");
	addAd(cm[ch],"http://images.businessweek.com/sponsors/circulation/BW_88x31_v5a.gif");
	}
	
	ch = "eu";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"Europe Main",b+"/globalbiz/europe/index.html");
	nIt(cm[ch],"Autos",b+"/globalbiz/europe/index.html?#Autos");
	nIt(cm[ch],"Economics",b+"/globalbiz/europe/index.html?#EconomicsPolicy");
	nIt(cm[ch],"Energy",b+"/globalbiz/europe/index.html?#Energy");
	nIt(cm[ch],"Innovation",b+"/globalbiz/europe/index.html?#InnovationDesign");
	nIt(cm[ch],"Investing",b+"/investing/europe/index.html");
	nIt(cm[ch],"Product Reviews",b+"/globalbiz/europe/index.html?#cnetuk");
	nIt(cm[ch],"Newsletter",b+"/newsletters.htm");
	addAd(cm[ch],"http://images.businessweek.com/sponsors/circulation/BW_88x31_v5a.gif");
	}
	
	ch = "tc";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"Tech Main",b+"/technology/index.html");
	nIt(cm[ch],"Blogs",b+"/the_thread/techbeat/index.html");
	nIt(cm[ch],"CEO Guide to Tech",b+"/technology/ceo_guide/");
	nIt(cm[ch],"Computers",b+"/technology/computers/?#computers");
	nIt(cm[ch],"Consumer Electronics",b+"/technology/consumer/?#consumerelectronics")
	;nIt(cm[ch],"Digital Entertainment",b+"/technology/entertainment/?#digitalentertainment");
	nIt(cm[ch],"Internet",b+"/technology/internet/?#internet");	
	nIt(cm[ch],"Product Reviews",b+"/technology/reviews/index.html");
	nIt(cm[ch],"Software",b+"/technology/software/?#software");
	nIt(cm[ch],"Special Reports",b+"/technology/index.html?#special");
	nIt(cm[ch],"Tech Investing",b+"/technology/index.html?#TechInvesting");
	nIt(cm[ch],"Tech Maven",b+"/technology/wildstrom.htm");
	nIt(cm[ch],"Tech Stats",b+"/technology/tech_stats/index.html");
	nIt(cm[ch],"Telecom",b+"/technology/telecom/?#telecommunications");
	nIt(cm[ch],"Viewpoint",b+"/technology/viewpoint/?#viewpoint");
	nIt(cm[ch],"Newsletter",b+"/newsletters.htm");
	addAd(cm[ch],"");
	}
	
	ch = "au";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"Autos Main",b+"/autos/index.html");
	nIt(cm[ch],"Auto Beat Blog",b+"/autos/autobeat/index.html");
	nIt(cm[ch],"Auto Design",b+"/innovate/carbuff/index.html");
	nIt(cm[ch],"Auto Reviews",b+"/autos/reviews/index.html");
	nIt(cm[ch],"Car Care and Safety",b+"/autos/car_care/index.html");
	nIt(cm[ch],"Classic Cars",b+"/autos/classic_cars/index.html");
	nIt(cm[ch],"Hybrids",b+"/autos/hybrids/index.html");
	nIt(cm[ch],"Podcast: Cruise Control","/mediacenter/podcasts/cruisecontrol/current.html");
	//nIt(cm[ch],"Newsletter ",b+"/newsletters.htm");
	addAd(cm[ch],"http://images.businessweek.com/sponsors/circulation/BW_88x31_v5a.gif");
	}
	
	ch = "di";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"Innovation Main",b+"/innovate/index.html");
	nIt(cm[ch],"Architecture",b+"/innovate/architecture/index.html");
	nIt(cm[ch],"Auto Design",b+"/innovate/carbuff/index.html");
	nIt(cm[ch],"Brand Equity",b+"/innovate/brandequity/index.html");
	nIt(cm[ch],"D-Schools",b+"/innovate/dschools/index.html");
	nIt(cm[ch],"Design Blog",b+"/innovate/NussbaumOnDesign/index.html");
	nIt(cm[ch],"Game Room",b+"/innovate/gameroom/index.html");
	nIt(cm[ch],"Media Blog",b+"/innovate/FineOnMedia/index.html");
	//nIt(cm[ch],"Innovation Metrics",b+"/innovate/metrics/index.html");
	nIt(cm[ch],"JD Power Ratings","http://images.businessweek.com/di/carbuff/jdpower/index_01.htm");
	//nIt(cm[ch],"Newsletter ",b+"/newsletters.htm");
	nIt(cm[ch],"Slideshows",b+"/slideshows/index.htm");
	addAd(cm[ch],"http://images.businessweek.com/sponsors/circulation/BW_88x31_v5a.gif");
	}
	
	ch = "sb";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"SmallBiz Main",b+"/smallbiz/index.html");
	nIt(cm[ch],"After Work",b+"/smallbiz/index.html?#AfterWork");
	nIt(cm[ch],"Getting Started",b+"/smallbiz/gettingstarted/index.html?#GettingStarted");
	nIt(cm[ch],"Information Center",b+"/smallbiz/index.html?#information");
	nIt(cm[ch],"Marketing",b+"/smallbiz/salesmarketing/index.html");
	nIt(cm[ch],"Leadership",b+"/smallbiz/leadership/index.html");	
	nIt(cm[ch],"Resource Center",b+"/smallbiz/servicecenter/index.htm");
	nIt(cm[ch],"Smart Answers",b+"/smallbiz/smartanswers/index.html");
	nIt(cm[ch],"Success Stories",b+"/smallbiz/successstories/index.html");
	nIt(cm[ch],"Technology",b+"/smallbiz/technology/index.html");
	nIt(cm[ch],"Viewpoint",b+"/smallbiz/index.html?#viewpoint");
	addAd(cm[ch],"");
	}
	
	ch = "bs";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"B-Schools Main",b+"/bschools/index.html");
	nIt(cm[ch],"Undergrad Programs",b+"/bschools/undergraduate/index.html");
	nIt(cm[ch],"MBA Insider",b+"/bschools/mbainsider/index.html");
	nIt(cm[ch],"MBA Blogs","http://www.mbablogs.businessweek.com/");
	nIt(cm[ch],"Calendar","http://bwnt.businessweek.com/calendar/index.asp");
	nIt(cm[ch],"Forums","http://forums.businessweek.com/bw-bschools/start/");
	nIt(cm[ch],"MBA Rankings & Profiles",b+"/bschools/06/index.html");
	nIt(cm[ch],"Admissions Q&As",b+"/bschools/mbainsider/admission_qa_index.html");
	nIt(cm[ch],"MBA Journals",b+"/bschools/mbajournal/index.htm");
	nIt(cm[ch],"B-School Videos",b+"/mediacenter/video/bschools/index.html");
	nIt(cm[ch],"Newsletter",b+"/newsletters.htm");
	addAd(cm[ch],"http://images.businessweek.com/sponsors/circulation/BW_88x31_v5a.gif");
	}
	
	ch = "ca";
	if (areaExists(ch)) {
	cm[ch] = newMenu(ch);
	nIt(cm[ch],"Careers Main",b+"/careers/index.html");
	nIt(cm[ch],"Archive",b+"/careers/resultlist/newsarch01.htm");
	nIt(cm[ch],"The Welch Way",b+"/careers/special_reports/thewelchway.htm");
	nIt(cm[ch],"Working Parents Blog",b+"/careers/workingparents/blog/index.html");
	nIt(cm[ch],"Compare Salaries","http://swz-businessweek.salary.com/salarywizard/layoutscripts/swzl_newsearch.asp");
	nIt(cm[ch],"D-Schools",b+"/innovate/dschools/index.html");
	nIt(cm[ch],"Executive Jobs",b+"/careers/index.html#executivejobs");
	nIt(cm[ch],"First Jobs",b+"/careers/firstjobs/index.html");
	nIt(cm[ch],"Management Strategies",b+"/careers/index.html#managementstrategies");
	nIt(cm[ch],"MBA Programs",b+"/bschools/06/index.html");
	nIt(cm[ch],"Podcasts",b+"/mediacenter/podcasts/welchway/current.html");
	nIt(cm[ch],"Power Plays",b+"/powerplays/");
	nIt(cm[ch],"Video",b+"/mediacenter/video/careers/index.html");
	nIt(cm[ch],"Tools",b+"/careers/index.html#tools");
	nIt(cm[ch],"Newsletter",b+"/newsletters.htm#careers");
	addAd(cm[ch],"http://ad.doubleclick.net/ad/N1823.business2.com/B1794517.18;sz=88x31;ord=[timestamp]?");
	}

	pCnt = 10;
	posLoop = window.setInterval("posAllMenus()", 1000);

}
