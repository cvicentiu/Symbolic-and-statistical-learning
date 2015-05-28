/*
	Vertical Scroller

	This is a hopefully configurable vertical scroll toy for
	clients who just have to have the gee-whiz stuff.
*/

/*
	Define the global variables for a scrolling area as the
	data members of an object. All the global variables will
	be referenced as members of this object. The reference
	to this object is initialized in Content_DonationsVScroll.tpt
	as vs[[A4]] to render a unique name.
*/

function VSGlobals(nameValue) {

	this.name            = nameValue; // unique id of this scrolling area
	this.scrollHeight		= 160;	    // height of scrolling area
	this.scrollPause		= 100;	    // controls scroll speed !!! must not be zero !!!
	this.scrollDistance	= 5;		    // negative number means the list will scroll down
	this.scrollPID			= 0;		    // used to kill the scroll if necessary
	this.bottomDiv			= "";		    // which <div> element is on the bottom
	this.textCount			= 0; 		    // which of the sliderText elements is next

	/*
		sliderText[] is the text that will be scrolled in the display area.
		This array must be at least as long as sliderBlocks below. This
		permits us to have many more entries than there is room in the
		scrolling area. The content of this array should match the initial
		content of the sliding <div> elements
	*/
	this.sliderText 		= new Array();

	/*
		sliderBlocks[] holds the names of the servlet generated <div>
		elements.
	*/
	this.sliderBlocks		= new Array();

}

// move all the divs
function shiftAll(whichScroller) {
	var divCount = 0;

	for (divCount = 0; divCount < whichScroller.sliderBlocks.length; divCount++) {

		moveTextBlock(whichScroller.sliderBlocks[divCount], whichScroller);

	}

	whichScroller.scrollPID = setTimeout("shiftAll(" + whichScroller.name + ")", whichScroller.scrollPause);

}

function moveTextBlock(whichDiv, whichScroller) {
	var thisDiv, thisBottom


	// if IE5 or NS6/Gecko
	if (document.getElementById) {

		thisDiv = document.getElementById(whichDiv);
		thisBottom = document.getElementById(whichScroller.bottomDiv);

		// if it's still visible
		if (parseInt(thisDiv.style.top) >= parseInt(thisDiv.style.height) * -1) {

			thisDiv.style.top = parseInt(thisDiv.style.top) - whichScroller.scrollDistance;

		// if it's out of view at the top
		} else {

			// move the <div> to just below the bottom element
			thisDiv.style.top = parseInt(thisBottom.style.top) + parseInt(thisBottom.style.height);
			whichScroller.bottomDiv = thisDiv.id;

			// set the new content for the <div> we just shifted to the bottom
			thisDiv.innerHTML = whichScroller.sliderText[whichScroller.textCount];
			// set the next content item
			if (whichScroller.textCount == whichScroller.sliderText.length - 1) {
				whichScroller.textCount = 0;
			} else {
				whichScroller.textCount++;
			}
		}

	// if NS4
	} else if (document.layers) {

		thisDiv = document.layers[whichScroller.name + "scrollArea"].document.layers[whichDiv];
		thisBottom = document.layers[whichScroller.name + "scrollArea"].document.layers[whichScroller.bottomDiv];

		if (thisDiv.top >= thisDiv.clip.height * -1) {

			thisDiv.top -= whichScroller.scrollDistance;

		} else {

			// 'scrollArea' is the parent div element
			if (thisDiv.name != whichScroller.name + "scrollArea") {

				thisDiv.top = thisBottom.top + thisBottom.clip.height;
				whichScroller.bottomDiv = thisDiv.name;

				thisDiv.document.open();
				thisDiv.document.write(whichScroller.sliderText[whichScroller.textCount]);
				thisDiv.document.close();
				if (whichScroller.textCount == whichScroller.sliderText.length - 1) {
					whichScroller.textCount = 0;
				} else {
					whichScroller.textCount++;
				}
			}
		}

	// else IE4
	} else if (document.all) {

		thisDiv = document.all(whichDiv);
		thisBottom = document.all(whichScroller.bottomDiv);

		if (thisDiv.style.pixelTop >= thisDiv.offsetHeight * -1) {

			thisDiv.style.pixelTop -= whichScroller.scrollDistance;

		} else {

			thisDiv.style.pixelTop = thisBottom.style.pixelTop + thisBottom.offsetHeight;
			whichScroller.bottomDiv = thisDiv.name;

			thisDiv.innerHTML = whichScroller.sliderText[textCount]
			if (whichScroller.textCount == whichScroller.sliderText.length - 1) {
				whichScroller.textCount = 0;
			} else {
				whichScroller.textCount++;
			}
		}
	}
}

// Start the scrolling from page load
function initScrolling(whichScroller) {
	var thisObject, scrollObject;

	// initialize the identity of the bottom block
	whichScroller.bottomDiv = whichScroller.sliderBlocks[whichScroller.sliderBlocks.length - 1];

	// set parent object for IE5 and Gecko
	if (document.getElementById) {
		scrollObject = document.getElementById(whichScroller.name + "scrollArea");
	}
	// set up the parent object for NS4
	else {
		scrollObject = document.layers[whichScroller.name + "scrollArea"];
	}

	for (var loopCounter = 0; loopCounter < whichScroller.sliderBlocks.length; loopCounter++) {
		if (document.getElementById) {
			thisObject = document.getElementById(whichScroller.sliderBlocks[loopCounter]);
			thisObject.style.top = loopCounter * 50;
			thisObject.style.left = 4;
			thisObject.style.height = 50;
			thisObject.style.visibility = "visible";
		}
		else if (document.layers) {
			thisObject = scrollObject.layers[whichScroller.sliderBlocks[loopCounter]];
			thisObject.top = loopCounter * 50;
			thisObject.left = scrollObject.left + 4;
			thisObject.visibility = "show";
		}
		else if (document.all) {
			document.all(whichScroller.sliderBlocks[loopCounter]).left = 4;
			document.all(whichScroller.sliderBlocks[loopCounter]).top = loopCounter * 50;
			document.all(whichScroller.sliderBlocks[loopCounter]).visibility = "visible";
		}
	}
	shiftAll(whichScroller);
}

// Start the scrolling after calling stopScroll()
// (don't initialize bottomDiv)
function startScroll(whichScroller) {

	// only stat if not already started
	if (!whichScroller.scrollPID) {
		shiftAll(whichScroller);
	}

}

// Stop the scrolling
function stopScroll(whichScroller) {

	// only stop if started
	if (whichScroller.scrollPID) {

		clearTimeout(whichScroller.scrollPID);
		whichScroller.scrollPID = false;

	}
}

/*
	Change the speed of scrolling by altering scrollDistance
	or scrollPause. speedType may be "distance" or "pause"
	defaulting to "pause." changeAmmount may any integer.
	The function will keep scrollDistance in the range of
	-10 - 10 and scrollPause in the range of 10 to 500.
*/
function changeSpeed(speedType, changeAmmount) {

	if (speedType == "distance") {

		scrollDistance += changeAmmount;

		if (scrollDistance < -10) { scrollDistance = -10; }
		if (scrollDistance > 10) { scrollDistance = 10; }

	// if it ain't "distance" then it's "pause"
	} else {

		scrollPause += changeAmmount;

		if (scrollPause < 5) { scrollPause = 5 }
		if (scrollPause > 500) { scrollPause = 500 }

	}
}

// Write the appropriate tag depending on NS or IE
function writeDivOrLayer(tagname, value) {

	if (isNS(4) && !isNS(5)) {
		document.write('<layer name="'+tagname+'" width="142" height="50" visibility="hide" clip="142,50">');
		document.write(value);
		document.write("</layer>");
	}
	else {
		document.write('<div id="'+tagname+'" class="scrollingArea">');
		document.write(value);
		document.write("</div>");
	}
}
