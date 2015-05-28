/***
function WM_netscapeCssFix() {
  // It gets around another unfortunate bug whereby Netscape 
  // fires a resize event when the scrollbars pop up. This 
  // checks to make sure that the window's available size 
  // has actually changed.
  if (document.WM.WM_netscapeCssFix.initWindowWidth != window.innerWidth || document.WM.WM_netscapeCssFix.initWindowHeight != window.innerHeight) {
    document.location = document.location;
  }
}

function WM_netscapeCssFixCheckIn() {
  // This function checks to make sure the version of Netscape 
  // in use contains the bug; if so, it records the window's 
  // width and height and sets all resize events to be handled 
  // by the WM_netscapeCssFix() function.
  if ((navigator.appName == 'Netscape') && (parseInt(navigator.appVersion) == 4)) {
    if (typeof document.WM == 'undefined'){
      document.WM = new Object;
    }
    if (typeof document.WM.WM_scaleFont == 'undefined') {
      document.WM.WM_netscapeCssFix = new Object;
      document.WM.WM_netscapeCssFix.initWindowWidth = window.innerWidth;
      document.WM.WM_netscapeCssFix.initWindowHeight = window.innerHeight;
    }
    window.onresize = WM_netscapeCssFix;
  }
}
WM_netscapeCssFixCheckIn()


**/




/**
 * resize.js 0.3 970811
 * by gary smith
 * js component for "reloading page onResize"
 */


if(!window.saveInnerWidth) {
  window.onresize = resizeIt;
  window.saveInnerWidth = window.innerWidth;
  window.saveInnerHeight = window.innerHeight;
}

function resizeIt() {
    if (saveInnerWidth < window.innerWidth || 
        saveInnerWidth > window.innerWidth || 
        saveInnerHeight > window.innerHeight || 
        saveInnerHeight < window.innerHeight ) 
    {
				P_popupoff();
        window.history.go(0);
    }
}






/*
-------------------------------------------------------------------------------
Version History

	v1.2.2: Nov-15-2000
		- Added jumpToUrl()
		
-------------------------------------------------------------------------------
*/

//=============================================================================
// paintVertRule(height,rowspan)
// paints a blue dotted vertical rule to seperate columns
//
function paintVertRule(height,rowspan) {
	// note: image must exist with the size specified and be the proper height otherwise it will stretch.
	document.write ('<td width="1" background="/ui_images/blue_rule_vert.gif" rowspan="' + rowspan + '">');
	if (navigator.appName=="Netscape") {
		// Netscape needs the rule to exist for earlier 4.0 browser
		document.write('<img src="/ui_images/blue_rule_vert_' + height + '.gif" width="1" height="' + height + '" border="0" />');
	}
	else {
		// IE will support tiling the image in the background so just hold the cell open.
		document.write('<img src="/ui_images/spacer.gif" width="1" height="' + height + '" border="0" />');
	}
	document.write('</td>');
}

//=============================================================================
// newImage(arg)
// creates a new image object
//
function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

//=============================================================================
// changeImages()
// changes the image src of an image to a new image
//
function changeImages(ns,sr) {
	
	document[ns].src= sr
	
}

//=============================================================================
// preloadImages()
// Preload these images so they are available for the rollover states
//
var preloadFlag = false;
function preloadImages() {
	if (document.images) {
		// images for header graphic
		hdr_home_over = newImage("/images/hdr_home_over.gif");
		hdr_comp_profiles_over = newImage("/images/hdr_comp_profiles_over.gif");
		hdr_investing_over = newImage("/images/hdr_investing_over.gif");		
		hdr_careers_over = newImage("/images/hdr_careers_over.gif");
		hdr_smallbiz_over = newImage("/images/hdr_smallbiz_over.gif");
		hdr_technology_over = newImage("/images/hdr_technology_over.gif");
		preloadFlag = true;
	}
}

//=============================================================================
// jumpToUrl()
// Jump to the selected URL
//
function jumpToUrl(form){
	window.location.href=form.options[form.selectedIndex].value;
}


//=============================================================================
// openWindow(url,name,width,height)
// open URL in popup window
//
function openWindow(url,name,width,height){
	params = "width="+width+",height="+height+",toolbar=no,scrollbar=no,directories=no,menu=no,location=no";
	popup = window.open(url,name,params);
}

//=============================================================================
// menu_fill()
// Widen Navigation Menu
//
function menu_fill(){
	// Get current height and width
	winW = (navigator.appName == "Netscape")? window.innerWidth : document.body.offsetWidth;

	// Check to see if the screen rez is optimal
	if (winW >= 900){
	document.writeln('	<td rowspan="2" valign="bottom">  ')
	document.writeln('	<table width="46" border="0" cellspacing="0" cellpadding="0"> ')
    	document.writeln('  	<tr>')
    	document.writeln('  		<td><img src="/ui_images/menu_spacer-wide.gif"  height="43" border="0"></td>')
    	document.writeln('  	</tr>')
    	document.writeln(' 	</table>')
	document.writeln('	</td> ')
	}
}



