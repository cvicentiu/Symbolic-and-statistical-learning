if (flashSrc.indexOf("/")==0){
	temp_var=flashSrc.substring(1,flashSrc.length);
} else if (flashSrc.indexOf("http://www.nba.com/")==0) {
	temp_var=flashSrc.substring(19,flashSrc.length);
} else {
	temp_var=flashSrc;
}
var pageURL=location.href;
the_array=temp_var.split(".");
var flashName=the_array[0];
//window.alert(flashName);
if (flashinstalled == 2) {
	if (flashversion >= 6) {
	document.write('<OBJECT classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"');
	document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"');
	document.write(' WIDTH="'+flashWidth+'" HEIGHT="'+flashHeight+'" id="'+flashName+'">');
	document.write('<param name="allowScriptAccess" value="sameDomain" />');
	document.write('<PARAM NAME=movie VALUE="'+flashSrc+'"> ');
	document.write('<PARAM NAME="FlashVars" VALUE="&movieName='+flashName+'&pageURL='+pageURL+'">');
	if (flashtrans==1){
		document.write('<param name="wmode" value="transparent">');	
	}
	document.write('<PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE="'+flashBg+'">');
	if (flashtrans==1){
		document.write('<EMBED name="'+flashName+'" src="'+flashSrc+'" quality=high bgcolor="'+flashBg+'" WIDTH="'+flashWidth+'" HEIGHT="'+flashHeight+'" FlashVars="&movieName='+flashName+'&pageURL='+pageURL+'" swliveconnect="true" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" allowScriptAccess="sameDomain" wmode="transparent"></EMBED>');
	}else{document.write('<EMBED name="'+flashName+'"  src="'+flashSrc+'" quality=high bgcolor="'+flashBg+'" WIDTH="'+flashWidth+'" HEIGHT="'+flashHeight+'" FlashVars="&movieName='+flashName+'&pageURL='+pageURL+'" swliveconnect="true"  TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" allowScriptAccess="sameDomain"></EMBED>');}
	document.write('</OBJECT>');
	}else {document.write("<br><center style=\"font-size:12px;font-family:verdana;font-weight:bold;\">You have Flash installed, but you must have the most current version.<br><a href=\"http://www.macromedia.com/support/flash/ts/documents/flashplayer_r40.htm\" target=\"_new\">Click here.</a></center>");}
}
else if (flashinstalled == 1) document.write("<br><center style=\"font-size:12px;font-family:verdana;font-weight:bold;\">You need Flash 6 to run this application.<br><a href=\"http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash&P5_Language=English\" target=\"_new\">Click here to download the plugin</a></center>");
else document.write("<br><center style=\"font-size:12px;font-family:verdana;font-weight:bold;\">I can't find out if you have Flash installed.<br>You need Flash 6 and above to run this application.<br><a href=\"http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash&P5_Language=English\" target=\"_new\">Click here to download the plugin</a></center>");