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
	document.write('ID="left-more-about2" WIDTH="172" HEIGHT="256">');
	document.write('<PARAM NAME=movie VALUE="left-more-about2.swf"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#DFDFDF>');
	document.write('<EMBED src="left-more-about2.swf" quality=high bgcolor=#DFDFDF');
	document.write('swLiveConnect=FALSE WIDTH="172" HEIGHT="256" NAME="left-more-about2"');
	document.write('TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">');
	document.write('</EMBED>');
	document.write('</OBJECT>');
} else {
        // This is where JS writes in the NON-FLASH content
	document.write('<br /><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="http://www.arthurian-legend.com/" title="Arthurian Legend homepage" class="links"><strong>Arthurian Legend homepage</strong></a></p><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="more-about-arthur-1.php" title="The origins of King Arthur - 1" class="links"><strong>The origins of King Arthur - 1</strong></a></p><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="more-about-arthur-2.php" title="The origins of King Arthur - 2" class="links"><strong>The origins of King Arthur - 2</strong></a></p><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="more-about-arthur-3.php" title="The Knights of the Round Table" class="links"><strong>The Knights of the Round Table</strong></a></p><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="more-about-arthur-4.php" title="The Sangreal - 1" class="links"><strong>The Sangreal - 1</strong></a></p><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="more-about-arthur-5.php" title="The Sangreal - 2" class="links"><strong>The Sangreal - 2</strong></a></p><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="more-about-arthur-6.php" title="Sir Lancelot (Sir Launcelot)" class="links"><strong>Sir Lancelot (Sir Launcelot)</strong></a></p><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="more-about-arthur-9.php" title="Queen Guinevere" class="links"><strong>Queen Guinevere</strong></a></p><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="more-about-arthur-8.php" title="Morgan Le Fay" class="links"><strong>Morgan Le Fay</strong></a></p><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="more-about-arthur-10.php" title="The Merlin legend" class="links"><strong>The Merlin legend</strong></a></p><p class="text2">&#8226; <a accesskey=" " hreflang="en" href="more-about-arthur-7.php" title="Sir Thomas Malory" class="links"><strong>Sir Thomas Malory</strong></a></p><br /><br /><p class="text2">To fully view Arthurian Legend in a non text-only browser, your browser needs to be JavaScript-enabled and have the Flash 5 player.</p><p class="text2">.....................................</p>');
}
