/*
addEvent function found at http://www.scottandrew.com/weblog/articles/cbs-events
*/
function addEvent(obj, evType, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evType, fn, true);
		return true;
	} else if (obj.attachEvent) {
		var r = obj.attachEvent("on"+evType, fn); 
		return r;
	} else {
		return false;
	}
}

/*
createElement function found at http://simon.incutio.com/archive/2003/06/15/javascriptWithXML
*/
function createElement(element) {
	if (typeof document.createElementNS != 'undefined') {
		return document.createElementNS('http://www.w3.org/1999/xhtml', element);
	}
	if (typeof document.createElement != 'undefined') {
		return document.createElement(element);
	}
	return false;
}

function insertTop(obj) {
	// Create the two div elements needed for the top of the box
	d=createElement("div");
	d.className="bt"; // The outer div needs a class name
    d2=createElement("div");
    d.appendChild(d2);
	obj.insertBefore(d,obj.firstChild);
}

function insertBottom(obj) {
	// Create the two div elements needed for the bottom of the box
	d=createElement("div");
	d.className="bb"; // The outer div needs a class name
    d2=createElement("div");
    d.appendChild(d2);
	obj.appendChild(d);
}

function initCB()
{
	// Find all div elements
	var divs = document.getElementsByTagName('div');
	var arClass;
	var cbDivs = [];
	for (var i = 0; i < divs.length; i++) {
	// Allow for multiple class names
		arClass = divs[i].className.split(' ');
		for (var iCl = 0; iCl < arClass.length; iCl++) {
	// Find all div elements with cbb in their class attribute
			if (arClass[iCl] == 'cbb')
				cbDivs[cbDivs.length] = divs[i];
		}
	}
	// Loop through the found div elements
	for (var i = 0; i < cbDivs.length; i++) {
	// Save the original outer div for later
		var thediv = cbDivs[i];
	// 	Create a new div, give it the original div's class attribute, and replace 'cbb' with 'cb'
		var outer = createElement('div');
		outer.className = thediv.className;
		outer.className = thediv.className.replace('cbb', 'cb');
	// Create 
		thediv.className = 'i3';
		thediv.parentNode.replaceChild(outer, thediv);
		var i1 = createElement('div');
		i1.className = 'i1';
		outer.appendChild(i1);
		var i2 = createElement('div');
		i2.className = 'i2';
		i1.appendChild(i2);
		i2.appendChild(thediv);
		insertTop(outer);
		insertBottom(outer);
	}
}

if(document.getElementById && document.createTextNode)
{
	addEvent(window, 'load', initCB);
}