<!--
var MM_contentVersion = 5; // This value matches the movies exported version 
var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
if ( plugin ) {
		var words = navigator.plugins["Shockwave Flash"].description.split(" ");
	    for (var i = 0; i < words.length; ++i)
	    {
		if (isNaN(parseInt(words[i])))
		continue;
		var MM_PluginVersion = words[i]; 
	    }
	var MM_FlashCanPlay = MM_PluginVersion >= MM_contentVersion;
}
else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 
   && (navigator.appVersion.indexOf("Win") != -1)) {
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n'); //FS hide this from IE4.5 Mac by splitting the tag
	document.write('on error resume next \n');
	document.write('MM_FlashCanPlay = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & MM_contentVersion)))\n');
	document.write('</SCR' + 'IPT\> \n');
}
if ( MM_FlashCanPlay ) {
        // This is where JS writes the Flash OBJECT code if the plugin is present 
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
	document.write('codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" ');
	document.write('ID="header" WIDTH="700" HEIGHT="93">');
	document.write('<PARAM NAME=movie VALUE="../header2.swf"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#C8DCE1>');
	document.write('<EMBED src="../header2.swf" quality=high bgcolor=#C8DCE1');
	document.write('swLiveConnect=FALSE WIDTH="700" HEIGHT="93" NAME="header"');
	document.write('TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">');
	document.write('</EMBED>');
	document.write('</OBJECT>');
} else {
        // This is where JS writes the non-Flash content into the page
	document.write('<p class="header">ARTHURIAN LEGEND</p><p class="text2a">To view the images you need the <a href="http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash&application/x-shockwave-flash" target="_blank">Flash 5 player</a></p>');
}
//-->