// ============================================================================
// Default Variables
//
// browser constants
var BRWR_NAME = navigator.appName;
var BRWR_PFRM = navigator.platform;
var BRWR_VERS = parseFloat(navigator.appVersion);

// ============================================================================
// Render Appropriate Stylesheet
//
if (BRWR_NAME.indexOf("Netscape") != -1)
	document.write('<link rel="stylesheet" type="text/css" media="screen" href="/styles/styles2.0_netscape.css">');
else
	document.write('<link rel="stylesheet" type="text/css" media="screen" href="/styles/styles2.0_ie.css">')