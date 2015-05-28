var currencySymbol;
var imagesArray = new Array("images/add_club_on.gif",
"images/add_cart_details_on.gif",
"images/add_to_cart_on.gif",
"images/add_club_details_on.gif",
"images/add_to_club_on.gif",
"images/add_to_shelf_on.gif",
"images/add_details_on.gif",
"images/add_extension_01_off.gif",
"images/add_extension_02_off.gif",
"images/add_extension_02_on.gif",
"images/add_extension_03_off.gif",
"images/add_extension_03_on.gif",
"images/view_all_details_on.gif",
"images/view_shelf_details_on.gif",
"images/view_club_details_off.gif",
"images/on.gif",
"images/mid.gif",
"images/buy_tab_down.gif",
"images/download_tab_down.gif",
"images/rent_tab_down.gif",
"images/mo_sidebg_on.gif",
"images/off.gif"
);



function preload() {
	for (pointer in imagesArray) {
		imagex = new Image();
		imagex.src = imagesArray[pointer];
	}
}




//var selOff = "images/sel_off.gif";
//var selOn = "images/sel_on.gif";
//var unselOff = "images/unsel_off.gif";
//var unselOn = "images/unsel_on.gif";

var x = 0;
var y = 0;

var faqWindow;


var layerTimeOut;
var buttonTimeOut;


var overDelay = 200;
var delayTimer = Array();
var xmlText;
var timecount = 1000;
var what = null;
var newbrowser = true;
var check = false;
var nafta;
var state = null;
var layerState = null;
var start = null;
var subTimer = null;
var navTimer;
var layerRef;
var styleSwitch;
var visibleVar;
var layerName;
var activeShelfTab;
var xmlhttp;





function checkAgent() {

	if (document.layers) {
		layerRef="document.layers";
		styleSwitch="";
		visibleVar="show";
		screenSize = window.innerWidth;
		what ="ns4";
	}
	else if(document.all) {
		layerRef="document.all";
		styleSwitch=".style";
		visibleVar="visible";
		screenSize = document.body.clientWidth + 18;
		what ="ie4";
	}
  	else if(document.getElementById) {
		layerRef="document.getElementByID";
		styleSwitch=".style";
		visibleVar="visible";
		what="dom1";
	}
	else {
			what="none";
			newbrowser = false;
	  	}

	check = true;

}

function flipShelf(id, targetUrl) {
	var shelves = new Array();
	shelves[0] = "buyTab";
	shelves[1] = "rentTab";
	shelves[2] = "dlTab";

	start = 0;

	shelfName = id + "Shelf";
	for (i=start; i<shelves.length; i++) {
		name = shelves[i] + "Shelf";
		if (name==shelfName) {
			element = document.getElementById(shelves[i]);
	    element.className = shelves[i].replace("Tab", "") + 'On';
	    document.getElementById(name).style.display = 'block';
	    runHeader(targetUrl, i);

		}else {
			element = document.getElementById(shelves[i]);
	    if(element) element.className = shelves[i].replace("Tab", "");
	    document.getElementById(name).style.display='none';
    }
	}
}


function shelfOut(elementId, defaultShelf) {
		if (!activeShelfTab) {
			activeShelfTab = defaultShelf;
		}
		if (activeShelfTab!=elementId) {
			isrc = document.getElementById(elementId).src;
			document.getElementById(elementId).src = isrc.replace(/_down/gi,'_up');
		}
}

function updateShelf(layerId, buttonId, buttonImage, targetUrl) {
		secondaryLayer = layerId + "Bar";
		activeShelfTab = layerId;
   if (document.getElementById(layerId).style.display=="block") {

		buttonName = "images/" + buttonImage + "down.gif";
		document.getElementById(layerId).style.visibility="hidden";
    	document.getElementById(layerId).style.display='none';
    	document.getElementById(secondaryLayer).style.display='block';
		document.getElementById(buttonId).src = buttonName;
		shelfState = 0;

    }
    else {

		buttonName = "images/" + buttonImage + "up.gif";
		document.getElementById(layerId).style.visibility="visible";
    	document.getElementById(layerId).style.display='block';
    	document.getElementById(secondaryLayer).style.display='none';
		document.getElementById(buttonId).src = buttonName;
    	shelfState = 1;

    }
    runHeader(targetUrl, shelfState);
}




function runHeader(targetUrl, newState ) {

   	//Let's try and instantiate

	//Try the newest version.
	try {
  		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (e) {
		try {
   			//Try the older one
   			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  		}
  		//If we're still throwing errors, abandon IE
  		catch (E) {
   			xmlhttp = false;
  		}
	}

	//Couldn't build for Ie, yet we read Mozilla support.
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
  		xmlhttp = new XMLHttpRequest();
	}

   //var element = document.getElementById('answer');
   xmlhttp.open("GET", targetUrl + '&state='+newState);
   xmlhttp.onreadystatechange = function() {
   	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	xmlText = xmlhttp.responseText;
     	//element


   	}
   }
    xmlhttp.send(null);

	//alert(targetUrl + '&state='+newState + "xxxx" + xmlText);

 }

function openFaq(targetURL) {
	if (faqWindow) {
		faqWindow.location=targetURL;
	}
	else {
		faqWindow = window.open(targetURL, "faqWindow", 'toolbar=no,resizable=no,scrollbars=yes,status=no, WIDTH=430, HEIGHT=500');

	}
}

function unloadFaq() {
	if (faqWindow) {
		faqWindow.close();
	}
}



function switchBackColour(identifier, colour) {
	if (exists(identifier)) {
		if (what!="dom1") {
			eval(layerRef+'["'+identifier+'"]'+styleSwitch+'.background=""');
			eval(layerRef+'["'+identifier+'"]'+styleSwitch+'.background="'+colour+'"');
		}
			else {
			document.getElementById(identifier).style.background=colour;
		}
	}
}

function getValue(identifier) {
	if (!what) {
		checkAgent();
	}


	if (what!="dom1") {
		return eval(layerRef+'["'+identifier+'"].value');
	}
		else {
		return document.getElementById(identifier).value;
	}

}

function setContents(identifier, message) {
	if (what!="dom1") {
		eval(layerRef+'["'+identifier+'"].innerHTML="'+message+'"');
	}
		else {
		document.getElementById(identifier).innerHTML = message;
	}

}

function flipRow(layerName) {
	if (document.getElementById(layerName).style.display=="block") {
		document.getElementById(layerName).style.visibility="hidden";
		document.getElementById(layerName).style.display="none";
	}
	else {
		document.getElementById(layerName).style.visibility="visible";
		document.getElementById(layerName).style.display="block";

	}
}


function setFocus(formName, elementName) {

	if (eval("document" + "." +formName)) {
		if (eval("document" + "." +formName+"."+elementName)) {
			eval("document" + "." +formName+"."+elementName+"."+"focus()");
		}
	}

}

function flipShip(shipCount, shipRows) {
	for (j=0; j<shipRows; j++) {
		shipTag = "shipPrice" + j;
		if (j==shipCount) {
			document.getElementById(shipTag).style.display="block";
		}
		else {
			document.getElementById(shipTag).style.display="none";
		}
	}

}


function cartCalculate(totalRows, shipRate, taxRate) {
	var runningTotal = 0;
	var giftTotal = 0;
	var taxRate = parseFloat(taxRate);

	if(!currencySymbol)
		currencySymbol = '$';

	wrapAll = document.getElementById('wrapAll').checked;

	for (i=0; i<totalRows; i++) {

		priceTag = 'price' + i;
		priceSubTag = 'priceSub' + i;
		quantityTag = 'quantity' + i;
		giftTag = 'giftWrap' + i;
		giftTagFull = 'giftWrapFull' + i;
		giftWrapper = 'giftWrapper' + i;
		price = document.getElementById(priceTag).innerHTML;
		price = price.substring(1);
		mediaType = document.getElementById(giftTag).value;
		quantity = document.getElementById(quantityTag).value;

		gift = document.getElementById(giftTag).checked;
		if (mediaType==1) {
			if (gift || wrapAll) {
				giftTotal += (3.49 * quantity);
				if (wrapAll) {
					if(document.getElementById(giftTagFull))
						document.getElementById(giftTagFull).style.display="none";
					if(document.getElementById(giftWrapper))
						document.getElementById(giftWrapper).style.display="none";
					document.getElementById('orderGiftMessageDiv').style.display="block";
				}
			}

			if (!wrapAll) {
				document.getElementById('orderGiftMessageDiv').style.display="none";
				document.getElementById(giftTagFull).style.display="block";
				if (gift) {
					document.getElementById(giftWrapper).style.display="block";
				}
			}
		}
		fullPrice = price*quantity;

		fullPrice =  Math.round(fullPrice*Math.pow(10,2))/Math.pow(10,2);
		fullPrice = fullPrice + "x";
		fullPrice = fullPrice.replace(/x/gi,'');

		decPos = fullPrice.indexOf('.');

		if (decPos == -1) {

			fullPrice = fullPrice + ".00";
		}

		if (fullPrice.length - decPos == 2) {
			fullPrice = fullPrice + "0";
		}

		runningTotal += (price*quantity);
		document.getElementById(priceSubTag).innerHTML = currencySymbol + (fullPrice);
	}

	giftTotal =  Math.round(giftTotal*Math.pow(10,2))/Math.pow(10,2);
	giftTotal = giftTotal + "x";
	giftTotal = giftTotal.replace(/x/gi,'');
	decPos = giftTotal.indexOf('.');

	if (decPos == -1) {
		giftTotal = giftTotal + ".00";
	}

	if (giftTotal.length - decPos == 2) {
		giftTotal = giftTotal + "0";
	}

	runningTotal =  (parseFloat(runningTotal) + parseFloat(shipRate) + parseFloat(giftTotal));

	if (taxRate > 0) {
		taxAmount = runningTotal * taxRate;
		taxAmount =  Math.ceil(taxAmount*Math.pow(10,2))/Math.pow(10,2);
		taxAmount = taxAmount + "x";
		taxAmount = taxAmount.replace(/x/gi,'');

		decPos = taxAmount.indexOf('.');
		if (decPos == -1) {
			taxAmount = taxAmount + ".00";
		}

		if (taxAmount.length - decPos == 2) {
			taxAmount = taxAmount + "0";
		}
		runningTotal = runningTotal * (1 + taxRate);
		document.getElementById('taxField').innerHTML = taxAmount;
	}


	runningTotal =  Math.round(runningTotal*Math.pow(10,2))/Math.pow(10,2);
	runningTotal = runningTotal + "x";
	runningTotal = runningTotal.replace(/x/gi,'');

	decPos = runningTotal.indexOf('.');
	if (decPos == -1) {
		runningTotal = runningTotal + ".00";
	}

	if (runningTotal.length - decPos == 2) {
		runningTotal = runningTotal + "0";
	}

	document.getElementById('totalLine').innerHTML = currencySymbol + runningTotal;
	document.getElementById('giftTotal').innerHTML = currencySymbol + giftTotal;
}


	function getmouse (e) {
		if (document.all)  {
			x = event.clientX + document.body.scrollLeft;
			y = event.clientY + document.body.scrollTop;
		}
		else {
			x = e.pageX;
			y = e.pageY;
		}
		x = x
		y = y + 20
	} // function getmouse

function openDescription(ident, title, body){

	titleBox = ident + "Title";
	bodyBox = ident + "Body";

	document.getElementById(titleBox).innerHTML=title;
	document.getElementById(bodyBox).innerHTML=body;
	document.getElementById(ident).style.top=y + 'px';
	document.getElementById(ident).style.left=x + 'px';
	document.getElementById(ident).style.visibility='visible';
}


function closeDescription(ident){
	document.getElementById(ident).style.visibility='hidden';
}

function initMenus(tabName) {
	if (document.layers) {
		layerRef="document.layers";
		styleSwitch="";
		visibleVar="show";
		screenSize = window.innerWidth;
		what ="ns4";
	}
	else if(document.all) {
		layerRef="document.all";
		styleSwitch=".style";
		visibleVar="visible";
		screenSize = document.body.clientWidth + 18;
		what ="ie4";
	}
  	else if(document.getElementById) {
		layerRef="document.getElementByID";
		styleSwitch=".style";
		visibleVar="visible";
		what="dom1";
	}
	else {
		what="none";
		newbrowser = false;
  	}
	check = true;
	if (tabName) {
		leaveOn(tabName);
	}
}

function changeLocation(newURL) {
	window.location=newURL;
}

function hideAll() {

	if (document.getElementById("learnmoreLayer")) {
		hideLayer('learnmoreLayer');
		turnOff('learnmore');
	}

	if (document.getElementById("findbooksLayer")) {
		hideLayer('findbooksLayer');
		turnOff('findbooks');
	}

	if (document.getElementById("morestuffLayer")) {
		hideLayer('morestuffLayer');
		turnOff('morestuff');
	}

	if (document.getElementById("myaccountLayer")) {
		hideLayer('myaccountLayer');
		turnOff('myaccount');
	}

}

function hideLayer(layerName) {

	if(check) {
	 	if (what =="none") {
	 	 	 return;
	 	}
		else if (what == "dom1") {
	 		document.getElementById(layerName).style.display="none";
		}
		else {
			eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.display="none"');
			IfrRef = document.getElementById("layerShim");
			if (IfrRef) {
   				IfrRef.style.display = "none";
   			}

		}
	}

	else {
		return;
	}
}

function showLayer(layerName) {
	if (!layerName) {

	}
	if(check) {
		if (what =="none") {
			return;
		}
		else if (what == "dom1") {
			document.getElementById(layerName).style.display="block";
		}
		else {

			eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.display="block"');
			/**
			DivRef = document.getElementById(layerName);
			IfrRef = document.getElementById("layerShim");
			IfrRef.style.width = DivRef.offsetWidth;
			IfrRef.style.height = DivRef.offsetHeight;
			IfrRef.style.top = DivRef.currentStyle.top;
			IfrRef.style.left = DivRef.currentStyle.left;
			IfrRef.style.zIndex = DivRef.currentStyle.zIndex - 1;
			IfrRef.style.display = "block";
			**/
		}
	}
	else {
		return;
	}
}

function turnOn(imageName) {
	identifier = imageName;
	layerId = identifier + "label";
	onpic = "images/on.gif";
	color = "#FFFFFF";
	identifier = imageName;

	clearTimeout(layerTimeOut);
	clearTimeout(buttonTimeOut);



	if (what!="dom1") {


		eval(layerRef+'["'+identifier+'"]'+styleSwitch+'.background=""');
		eval(layerRef+'["'+identifier+'"]'+styleSwitch+'.background="url('+onpic+')"');
		eval(layerRef+'["'+layerId+'"]'+styleSwitch+'.color="#FFFFFF"');

	}
		else {

		document.getElementById(identifier).style.background="url("+onpic+")";
		document.getElementById(layerId).style.color="#FFFFFF";

	}

}

function leaveOn(imageName) {
	imgsource = document[imageName].src;
	gifposition = imgsource.lastIndexOf(".gif");
	checkStatus = imgsource.lastIndexOf("-on.gif");
	if (checkStatus==-1) {
		cutstring = imgsource.substring(0, gifposition);
		document[imageName].src = cutstring + "-on.gif";
	}
	leaveOn[imageName] = true;
}

function turnOff(imageName) {

	if (!layerRef) {
		checkAgent();
	}
	identifier = imageName;
	layerId = identifier + "label";
	offpic = "images/off.gif";

	if (what!="dom1") {
		eval(layerRef+'["'+layerId+'"]'+styleSwitch+'.color="black"');
		eval(layerRef+'["'+identifier+'"]'+styleSwitch+'.background=""');
		eval(layerRef+'["'+identifier+'"]'+styleSwitch+'.background="url('+offpic+')"');
	}
	else {
		document.getElementById(identifier).style.background="url("+offpic+")";
		document.getElementById(layerId).style.color="black";
	}
}

function flipIntent(eventVar, currentId,actionType) {

	tag = "wrapper" + currentId;
	outerLayer = document.getElementById(tag);
	firstLayerId = "addImage" + currentId;
	secondLayerId = "exImage" + currentId;
	if (document.all) {
		toElement=window.event.toElement;
	}
	else {
		toElement = eventVar.relatedTarget;
	}

	targetLayer = toElement.id;
	//turns off
	if (actionType=="off") {
		if (!contains(outerLayer, eventVar.relatedTarget) && targetLayer!=secondLayerId && targetLayer!=firstLayerId ){
		oldsource = document.getElementById(firstLayerId).src;
		stateCheck = oldsource.indexOf('_off');
		if (stateCheck == -1) {
			newSource = oldsource.replace(/_on/gi, '_off');
			document.getElementById(firstLayerId).src = newSource;
		}
		}
	}
	else {

		oldsource = document.getElementById(firstLayerId).src;
		stateCheck = oldsource.indexOf('_on');

		if (stateCheck == -1) {

			newSource = oldsource.replace(/_off/gi, '_on');
			document.getElementById(firstLayerId).src = newSource;
		}
	}


}

function contains (container, containee) {
	while (containee) {
		try{
			if (containee.id == container.id) {
				return true;
			}
			containee = containee.parentNode;
		}catch(e){
			return false;
		}
	}
	return false;
}


function flipTip(targetUrl) {
	styleCheck = document.getElementById('quickSwitchOn').style.display;

	if (styleCheck=='none') {
		document.getElementById('quickSwitchOn').style.display = 'block';
		document.getElementById('quickSwitchOff').style.display = 'none';
		newState = 0;
	}
	else {
		document.getElementById('quickSwitchOn').style.display = 'none';
		document.getElementById('quickSwitchOff').style.display = 'block';
		newState = 1;
	}

	runHeader(targetUrl, newState);
}



function flipAdvSearchIndicator(){
	i = document.getElementById('advSearchIndicator');
	t = document.getElementById('advSearchTitle');
	if(!i) return;

	if( i.innerHTML == 'click for more' ){
		i.innerHTML = 'click to hide';
		if(t) t.className='loope-open float-l hand-icon';
	}else{
		i.innerHTML = 'click for more';
		if(t) t.className='loope float-l hand-icon';
	}
}