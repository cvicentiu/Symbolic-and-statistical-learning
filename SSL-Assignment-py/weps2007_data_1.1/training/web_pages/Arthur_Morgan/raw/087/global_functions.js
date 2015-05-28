/******************************************************************************/
// Open Pop Up Window
function openPopup(pageToLoad, winName, width, height, center, location,menubar,resizable,scrollbars,status,titlebar,toolbar,hotkeys) {
	SDxposition=0; SDyposition=0;
	if ((parseInt(navigator.appVersion) >= 4 ) && (center)) {
		SDxposition = (screen.width - width) / 2;
		SDyposition = (screen.height - height) / 2;
	}
	SDlocation   = location   || 0;
	SDmenubar    = menubar    || 0;
	SDresizable  = resizable  || 1;
	SDscrollbars = scrollbars || 1;
	SDstatus     = status     || 0;
	SDtitlebar   = titlebar   || 0;
	SDtoolbar    = toolbar    || 0;
	SDhotkeys    = hotkeys    || 0;

	args = "width="      + width        + "," // param 3
	     + "height="     + height       + "," // param 4
	     + "location="   + SDlocation   + "," // param 6
	     + "menubar="    + SDmenubar    + "," // param 7
	     + "resizable="  + SDresizable  + "," // param 8
	     + "scrollbars=" + SDscrollbars + "," // param 9
	     + "status="     + SDstatus     + "," // param 10
	     + "titlebar="   + SDtitlebar   + "," // param 11
	     + "toolbar="    + SDtoolbar    + "," // param 12
	     + "hotkeys="    + SDhotkeys    + "," // param 13
	     + "screenx="    + SDxposition  + "," // NN Only
	     + "screeny="    + SDyposition  + "," // NN Only
	     + "left="       + SDxposition  + "," // IE Only
	     + "top="        + SDyposition;       // IE Only
	var win = window.open(pageToLoad, winName, args );
	win.focus();
}

/******************************************************************************/
//-->