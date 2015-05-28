function setA(){
	var elements;

	elements = document.getElementsByTagName("a");					// list of all a href tags

	var k = elements.length;  // total amount of a tags
	if (k > 30)               // the breadcrumbs start at link 21 and usually end by link 25
	{ k = 30;				  // so, we only search that range (plus a buffer)
	}

	for(var i = 20; i < k; i++){						// for all a's in the range
		var node = elements.item(i);								// get the tag
		for(var j = 0; j < node.attributes.length; j++) {			// for each of its attributes
			if(node.attributes.item(j).nodeName == 'class') {		// if the attribute is a class

				switch (node.attributes.item(j).nodeValue)			// set value according to class name
				{
					case "nav_breadcrumb_off":									
						eval('node.style.color = "#000000"');	    // change breadcrumb text color		
						break;
					case "nav_breadcrumb_on":									
						eval('node.style.color = "#cc0000"');	    // change breadcrumb text color			
						break;
					case "whitelink":
						eval('node.style.color = "#ffffff"');		// change whitelink text color
						break;
					default:										// otherwise do nothing
						break;
				}
			}
		}
	}
}

function setId() {
	document.getElementById("showprintonly").style["display"] = "block";		// shown only on print only page

	document.getElementById("changecrumb").style["backgroundColor"] = "#ffffff";	// hide breadcrumb background
	document.getElementById("changedate").style["backgroundColor"] = "#ffffff";	// hide breadcrumb background
	document.getElementById("changecrumb").style["color"] = "#6600CC";			// color breadcrumb text
	document.getElementById("changedate").style["color"] = "#0066CC";			// color date text

	document.getElementById("hidetop1").style["display"] = "none";				// hide top navigation

	document.getElementById("hideleft1").style["display"] = "none";				// hide left corner of breadcrumb row
	document.getElementById("hideleft2").style["display"] = "none";				// hide left arc of breadcrumb row
	document.getElementById("hideleft3").style["display"] = "none";				// hide left red border
	document.getElementById("hideleft4").style["display"] = "none";				// hide left blue area & bottom arc
	document.getElementById("hideleft5").style["display"] = "none";				// hide left column
	document.getElementById("hideleft6").style["display"] = "none";				// hide left column divider

	document.getElementById("hideright1").style["display"] = "none";			// hide right arc of breadcrumb row
	document.getElementById("hideright2").style["display"] = "none";			// hide right corner of breadcrumb row
	document.getElementById("hideright3").style["display"] = "none";			// hide right column divider
	document.getElementById("hideright4").style["display"] = "none";			// hide right column
	document.getElementById("hideright5").style["display"] = "none";			// hide right blue area & bottom arc
	document.getElementById("hideright6").style["display"] = "none";			// hide right red border

	document.getElementById("hidemid1").style["display"] = "none";				// hide print only button
	//document.getElementById("hidemid2").style["display"] = "none";				// hide "back to top"
	document.getElementById("hidemid3").style["display"] = "none";				// hide disclaimer

	document.getElementById("hidebottom1").style["display"] = "none";			// hide bottom navigation
	document.getElementById("hidebottom2").style["display"] = "none";			// hide bottom spacer
}

function setBody() {
	document.body.style["background-color"] = "white"; // set background color to white
	document.body.style["background"] = "white";
}

function printWindow() {
bV = parseInt(navigator.appVersion); // open the print dialog for applicable browsers
if (bV >= 4) window.print();
}

function PrintVersion() { 

	setId(); // set classes by id
	setA();  // set classes by the a tag
	setBody(); // set the body tag
	printWindow(); // open the print dialog
}	
