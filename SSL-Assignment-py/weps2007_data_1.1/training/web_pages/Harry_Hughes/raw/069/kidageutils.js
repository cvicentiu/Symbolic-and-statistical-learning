// JavaScript Document
// Global variables
var isCSS, isW3C, isIE4, isNN4;
// initialize upon load to let all browsers establish content objects
function initCommon() {
    if (document.images) {
        isCSS = (document.body && document.body.style) ? true : false;
        isW3C = (isCSS && document.getElementById) ? true : false;
        isIE4 = (isCSS && document.all) ? true : false;
        isNN4 = (document.layers) ? true : false;
        isIE6CSS = (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) ? true : false;
    }
}
// set event handler to initialize API
//window.onload = initCommon;

// Seek nested NN4 layer from string name
function seekLayer(doc, name) {
    var theObj;
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name == name) {
            theObj = doc.layers[i];
            break;
        }
        // dive into nested layers if necessary
        if (doc.layers[i].document.layers.length > 0) {
            theObj = seekLayer(document.layers[i].document, name);
        }
    }
    return theObj;
}

// Convert object name string or object reference
// into a valid element object reference
function getRawObject(obj) {
    var theObj;
    if (typeof obj == "string") {
        if (isW3C) {
            theObj = document.getElementById(obj);
        } else if (isIE4) {
            theObj = document.all(obj);
        } else if (isNN4) {
            theObj = seekLayer(document, obj);
        }
    } else {
        // pass through object reference
        theObj = obj;
    }
    return theObj;
}

// Convert object name string or object reference
// into a valid style (or NN4 layer) reference
function getObject(obj) {
    var theObj = getRawObject(obj);
    if (theObj && isCSS) {
        theObj = theObj.style;
    }
    return theObj;
}

// Set the visibility of an object to visible
function show(obj) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.display = "block";
    }
}

// Set the visibility of an object to hidden
function hide(obj) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.display = "none";
    }
}

function showkids() {
	if(document.getElementById('kids-selected').value=='0') {
		hide('kids-none');
		hide('kids-one');
		hide('kids-two');
		hide('kids-three');
		hide('kids-four');
		hide('kids-five');
	} else if(document.getElementById('kids-selected').value=='1') {
		show('kids-none');
		show('kids-one');
		hide('kids-two');
		hide('kids-three');
		hide('kids-four');
		hide('kids-five');
	} else if(document.getElementById('kids-selected').value=='2') {
		show('kids-none');
		show('kids-one');
		show('kids-two');
		hide('kids-three');
		hide('kids-four');
		hide('kids-five');
	} else if(document.getElementById('kids-selected').value=='3') {
		show('kids-none');
		show('kids-one');
		show('kids-two');
		show('kids-three');
		hide('kids-four');
		hide('kids-five');
	} else if(document.getElementById('kids-selected').value=='4') {
		show('kids-none');
		show('kids-one');
		show('kids-two');
		show('kids-three');
		show('kids-four');
		hide('kids-five');
	} else if(document.getElementById('kids-selected').value=='5') {
		show('kids-none');
		show('kids-one');
		show('kids-two');
		show('kids-three');
		show('kids-four');
		show('kids-five');
	}
}

function showkids1() {
	if(document.getElementById('kids-selected1').value=='0') {
		hide('kids-none1');
		hide('kids-one1');
		hide('kids-two1');
		hide('kids-three1');
		hide('kids-four1');
		hide('kids-five1');
	} else if(document.getElementById('kids-selected1').value=='1') {
		show('kids-none1');
		show('kids-one1');
		hide('kids-two1');
		hide('kids-three1');
		hide('kids-four1');
		hide('kids-five1');
	} else if(document.getElementById('kids-selected1').value=='2') {
		show('kids-none1');
		show('kids-one1');
		show('kids-two1');
		hide('kids-three1');
		hide('kids-four1');
		hide('kids-five1');
	} else if(document.getElementById('kids-selected1').value=='3') {
		show('kids-none1');
		show('kids-one1');
		show('kids-two1');
		show('kids-three1');
		hide('kids-four1');
		hide('kids-five1');
	} else if(document.getElementById('kids-selected1').value=='4') {
		show('kids-none1');
		show('kids-one1');
		show('kids-two1');
		show('kids-three1');
		show('kids-four1');
		hide('kids-five1');
	} else if(document.getElementById('kids-selected1').value=='5') {
		show('kids-none1');
		show('kids-one1');
		show('kids-two1');
		show('kids-three1');
		show('kids-four1');
		show('kids-five1');
	}
}