<!--
function openimage(url,himage,wimage) {
	var win;
	var appVer = navigator.appVersion.toLowerCase();
	var iePos  = appVer.indexOf('msie');
	if (window.screen) {
		if(wimage>=screen.availWidth) 
			var wimage=(screen.availWidth-50);
		if(himage>=screen.availHeight) 
			var himage=(screen.availHeight-100);
	}
	if (iePos !=-1) {
		var features ='width='+ (wimage+16) +',height='+ (himage+20) + ',scrollbars=yes,resizable=yes';
	}
	else {
		var features ='width='+ wimage +',height='+ himage + ',scrollbars=yes,resizable=yes';
	}
		win = window.open(url,'Photo',features);
		win.focus();

}
-->