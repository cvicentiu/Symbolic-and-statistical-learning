<!--
//

function openConsole(pageType, pageID) {
	infoConsole = window.open('/cgi-bin/console/console.pl?page_type='+pageType+'&page_id='+pageID, 'console', 'toolbar=0,scrollbars=1,location=0,statusbar=1,menubar=0,resizable=0,width=250,height=350');
	infoConsole.moveTo(5,5);
	// USE: <body onload="javascript: openConsole()">
	// USE: <a href="javascript: openConsole()">
}

function closeConsole () {
	if (false == infoConsole.closed) {
		infoConsole.close ();
	}
	
	// USE: <body onunload="javascript: closeConsole()" >
}

//-->
