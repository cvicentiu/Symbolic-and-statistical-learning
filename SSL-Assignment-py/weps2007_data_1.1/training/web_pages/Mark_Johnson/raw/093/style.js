/*********************** DYNAMIC STYLE BUILDER ***********************/

// assumes css filenames are in the format "style_" + platform + "_" + browser + ".css"

// where platform is either "pc" or "mac" and browser is either "ie" or "net"



//lets get rid of this whole thing cause it doesn't work anyway.













styleDir = "scripts/";		// directory of style sheet in relation to the root, use "/" if no directory.



isNS = (navigator.appName.indexOf("Netscape") != -1);							// check for Netscape.

isMac = (navigator.appVersion.indexOf("Mac") != -1);	//check for Mac.

isBADNS = (navigator.appVersion.indexOf("4.") != 0);	//check for Mac.						

isExc = ((isMac) && (!isNS) && (navigator.appVersion.indexOf("IE 5") != -1));	// Mac IE 5 exception.

//document.write('-->' + navigator.appVersion.indexOf("4.") +'<--');

styleName = styleDir + "style_";

styleName += ((isMac) && (!isExc)) ? "mac_" : "pc_";

styleName += (isNS) ? "net" : "ie";

styleName += ".css";

if (!isBADNS) {

//	document.write('<link rel="stylesheet" href="' + styleName + '" type="text/css">');

}



/****************************** THE END ******************************/