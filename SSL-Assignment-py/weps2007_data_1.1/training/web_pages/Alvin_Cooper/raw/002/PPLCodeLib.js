//Javascript document

//This method will be used to open up new Browser windows for pages that can't be shown in the frame.
function openBrWindow(theURL,winName,features) { //v2.0
	newWindow = window.open(theURL,winName,features);
	newWindow.focus();
}

//This method will be used to find the current year.  The main reason for this is the copyright message
//at the bottom of every webpage.
function getYear(){
	d = new Date();
	jsYear = d.getYear();
	if (jsYear < 1000) jsYear += 1900;
		document.write(jsYear)
}

//END SCRIPTS
