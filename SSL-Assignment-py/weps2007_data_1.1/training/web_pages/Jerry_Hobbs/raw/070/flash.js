//

//			1 )  F L A S H   D E T E C T   V A R S 




var requiredVersion = 6;

var flash2Installed = false;
var flash3Installed = false;
var flash4Installed = false;
var flash5Installed = false;
var flash6Installed = false;
var flash7Installed = false;
var maxVersion = 7;
var actualVersion = 0;
var hasRightVersion = false;
var jsVersion = 1.0;
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? true : false;

jsVersion = 1.1;

if(isIE && isWin){
  document.write('<scr' + 'ipt language=VBScript\> \n');
  document.write('on error resume next \n');
  document.write('flash2Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.2"))) \n');
  document.write('flash3Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.3"))) \n');
  document.write('flash4Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))) \n');
  document.write('flash5Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))) \n');  
  document.write('flash6Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6"))) \n');  
  document.write('flash7Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.7"))) \n');  
  document.write('</scr' + 'ipt\> \n');
}

//

//			2 )  F L A S H   D E T E C T   F U N C T I O N 



function detectFlash() {
  if (navigator.plugins) {
    if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
      var isVersion2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
      var flashDescription = navigator.plugins["Shockwave Flash" + isVersion2].description;

      var flashVersion = parseInt(flashDescription.charAt(flashDescription.indexOf(".") - 1));
     
      flash2Installed = flashVersion == 2;    
      flash3Installed = flashVersion == 3;
      flash4Installed = flashVersion == 4;
      flash5Installed = flashVersion == 5;
      flash6Installed = flashVersion == 6;
      flash7Installed = flashVersion >= 7;
    }
  }
  
  for (var i = 2; i <= maxVersion; i++) {  
    if (eval("flash" + i + "Installed") == true) actualVersion = i;
  }

  if(navigator.userAgent.indexOf("WebTV") != -1) actualVersion = 3;  
  
  if (actualVersion >= requiredVersion) hasRightVersion = true;
}

detectFlash();  


//

//			3 )  F L A S H   E M B E D   F U N C T I O N  



function Flash (w, h, idname, swf, elses, h3x) {
	if(hasRightVersion) {
	document.write('<object CLASSID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
	+ 'width="' +w+ '" height="' +h+ '" id="' +idname+ '"'
	+ 'CODEBASE="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">'
	+ '<param name="allowScriptAccess" value="sameDomain" />'
	+ '<param name="movie" value="' +swf+ '" />'
	+ '<param name="play" value="true" />'
	+ '<param name="loop" value="false" />'
	+ '<param name="quality" value="high" />'
	+ '<param name="menu" value="false" />'
	+ '<param name="bgcolor" value="#' +h3x+ '" />'
	+ '<embed src="' +swf+ '"'
	+ 'width="' +w+ '" height="' +h+' " swLiveConnect="true" id="' +idname+ '" name="' +idname+ '"'
	+ 'allowScriptAccess="sameDomain"'
	+ 'play="true"'
	+ 'bgcolor="#' +h3x+ '"'
	+ 'loop="false"'
	+ 'quality="high"'
	+ 'menu="false"'
	+ 'type="application/x-shockwave-flash"'
	+ 'PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">'
	+ '</embed>'
	+ '</object>');
	} else {
		document.write(elses);
	}
}