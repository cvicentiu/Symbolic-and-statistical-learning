// GENERAL-PURPOSE FUNCTION TO LOAD MULTIPLE FUNCTIONS
function addLoadEvent(func) { 
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

// CREATE TITLE TAGS ON THE FLY - WRITTEN BY RJB 8/3/06
function createTitleTags() { 
	if (!document.getElementsByTagName) return false;
	var images = document.getElementsByTagName("IMG");
	for (var i=0; i < images.length; i++) {
		var image = images[i]
		if (!image.getAttribute("TITLE")) { // Check to see whether title tag already exists.
			if (image.getAttribute("ALT")) { // Check to see whether alt tag exists and it's not empty.
				var alttext = image.getAttribute("ALT");
				if (alttext !== " ") image.setAttribute("title",alttext);
			}
		}
	}
}

// ZEBRA-STRIPE TABLE (Modified by RJB 8/3/06 to allow multiple zebra tables on a page)
function zebraStripeTable() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementsByTagName("table")) return false;
	var tables = document.getElementsByTagName("table");
	if (tables.length < 1) return false;
	for (var i=0; i < tables.length; i++) {
		if (tables[i].getAttribute("class") == "zebra" || tables[i].getAttribute("className") == "zebra") {  // Apparently getAttribute('class') doesn't work in IE (must use getAttribute('className')) because "class" is an ECMAScript reserved name. 
			var rows = tables[i].getElementsByTagName("tr");
			for (j=0; j < rows.length; j++) {
				//manipulate rows
				if (j % 2 == 0) {
					rows[j].className = "even";
				} else {
					rows[j].className = "odd";
				}
			}
		}
	}
}

// POP UP A SMALL WINDOW -- From "DOM Scripting," Pages 88-89
function preparePopUp() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementsByTagName("a")) return false;
	var lnks = document.getElementsByTagName("a");
	if (lnks.length < 1) return false;
	for (var i=0; i<lnks.length; i++) {
		if (lnks[i].getAttribute("class") == "popup" || lnks[i].getAttribute("className") == "popup") {  // Apparently getAttribute('class') doesn't work in IE (must use getAttribute('className')) because "class" is an ECMAScript reserved name. 
			lnks[i].onclick = function() {
				popUp(this.getAttribute("href"));
				return false;
			}
		}
	}
}
function popUp(winURL) {
	window.open(winURL,"popup","width=500,height=300,scrollbars=yes,resizable=yes,menubar=no");
}

// CREATE "CLOSE THIS WINDOW" LINK ON THE FLY TO DISPLAY AT THE BOTTOM OF POP-UP WINDOWS - WRITTEN BY RJB 8/3/06
function autoCloseWindowLink () {
	if (window.name !== "popup") return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	var para = document.createElement("p");
	var link = document.createElement("a");
	var linktext = document.createTextNode("Close This Window");
	link.setAttribute("href","javascript:window.close();");
	link.appendChild(linktext);
	para.appendChild(link);
	document.body.appendChild(para);
}

// LOAD THE FUNCTIONS
addLoadEvent(createTitleTags);
addLoadEvent(zebraStripeTable);
addLoadEvent(preparePopUp);
addLoadEvent(autoCloseWindowLink);