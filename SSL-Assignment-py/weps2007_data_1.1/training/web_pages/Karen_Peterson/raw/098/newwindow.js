function newWindow(url,sw,sh) {
	var v=parseInt(navigator.appVersion);
	isNetscape=navigator.appName.indexOf('Netscape')>=0;
	isExplorer=navigator.appName.indexOf('Explorer')>=0;
	positionCode='';

	         w  = screen.availWidth/2-sw/2;
	         h  = screen.availHeight/2-sh/2;

	 if(isExplorer) {
	        positionCode=',left='+w+',top='+h;

	    }
	 if(isNetscape) {
	        positionCode=',screenX='+w+',screenY='+h;
	    }
		   positionCode+=',scrollbars=yes, resizable=yes'

	   newWin=window.open('','a','width='+sw+',height='+sh+','+positionCode);
	   newWin.document.location=url;
	   newWin.focus();
}
