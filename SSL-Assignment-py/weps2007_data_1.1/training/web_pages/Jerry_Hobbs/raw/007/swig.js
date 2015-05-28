//swig_new8
//setup env vars for .js
var action = "/swig.asp"; 
var desktoprect = "";
var pluginStr = "";
var colordepth = "";
var scriptengine = "";
var queryGif = "";
var speed = "";
var useBeatnik = 0;
var pagePath = window.location;
var ref = document.referrer;
var versionNum = "";

// setup browser detection
var userAgent = navigator.userAgent.toLowerCase();
var isNetscape = (userAgent.indexOf("mozilla") != -1) && (!((navigator.appVersion.indexOf("MSIE") > 0)))
var isMSIE = ((navigator.appName.indexOf("Explorer") != -1) && (userAgent.indexOf("msie") != -1));
var isMSIESpoof = ((userAgent.indexOf("opera") != -1) || (userAgent.indexOf("omni") != -1));
var isMacMSIE = ((navigator.appName.indexOf("Explorer") != -1) && (userAgent.indexOf("mac") != -1));
var version = parseInt(navigator.appVersion);
var version_subversion = parseFloat(navigator.appVersion);
var MSIE4_up = isMSIE && (version >= 4);
var netscape3_up = isNetscape && (version >= 3);
var netscape4_up = isNetscape && (version >= 4);
var isIcab = (userAgent.indexOf("icab") != -1);
var isOpera = (userAgent.indexOf("opera") != -1);

//setup var for mime type detection bug case
var nsPC4_0_4_05 = isNetscape && (version == 4) && (userAgent.indexOf("win") != -1) && (((navigator.appVersion.substring(3,navigator.appVersion.indexOf(".")+1) == 0) && (navigator.appVersion.substring(4,navigator.appVersion.indexOf(".")+1) <= 5)) || ((parseInt(navigator.appVersion) == parseFloat(navigator.appVersion))))


// BEGIN script = 1.2
if ((!(isNetscape && (version < 4))) || (MSIE4_up)){
	var screen_width = screen.width;
	var screen_height = screen.height;
	desktoprect = "[rect(0,0," + screen.width + "," + screen.height + ")]";
	colordepth = screen.colorDepth;
	}

// BEGIN script=js1.1
if ((navigator.plugins) && (navigator.plugins.length) > 0) {

	var plugins = "";
	
	// refresh the plugins array but don't reload any open docs
	//refresh disabled due to Opera and mime type bug  -- Lewis
	//navigator.plugins.refresh(false); 
	
	numPlugs = navigator.plugins.length
	if (numPlugs > 0) // if there are plugins
		{
		for (i=0; i < numPlugs; i++) // for every plugin
			{
			plugin = navigator.plugins[i];
			pluginStr += "pName=" + plugin.name + 
					'::';
			pluginStr += "pDesc=" + 
					plugin.description + "::";
			//all mime reporting disabled		
			 //mime type detection disabled for PC NS 4.0-4.05 due to crashing bug
			 /* if (!(nsPC4_0_4_05)) {
			 	var len = plugin.length; 
				//for every mime type covered by this plugin 
			for (e = 0; e < len; e++) 
				{					  
				// if it is active log the mime type 
				mimetype = plugin[e]
				if (plugin[e].enabledPlugin)
					{
					pluginStr +=  "pMimeTypeDesc=" + 
					//plugin[e].description +  //mime type reporting disabled to prevent 414 errors 
					"::pMimeType=::" //+   //mime type reporting disabled to prevent 414 errors 
					//plugin[e].type + "::"; 
					}
				}
				} */
				
			pluginStr += "|"; // plugin separator
			}
		}
	} 

// setup ActiveX detection

if ((navigator.userAgent.indexOf('MSIE') != -1) && (navigator.userAgent.indexOf('Win') != -1)){
	if (!(isOpera)) {
		document.writeln('<SCRIPT language="VBScript">');
		document.writeln('On error resume next');
		document.writeln('screen_width = screen.width');
		document.writeln('screen_height = screen.height');
		document.writeln('desktoprect = "[rect(0,0," + screen.width + "," + screen.height + ")]"');
		document.writeln('colordepth = screen.colorDepth');
		document.writeln('useBeatnik = NOT IsNull(CreateObject("BEATNIKX.BeatnikXCtrl.1"))');
		
		document.writeln('Function VBGetShockwaveVer(i)');
		document.writeln('on error resume next');
		document.writeln('Dim swControl, swVersion');
		document.writeln('swVersion = "0.0"');
		document.writeln('set swControl = CreateObject("SWCtl.SWCtl." + CStr(i))');
		document.writeln('if (IsObject(swControl)) then');
		document.writeln('swVersion = CStr(i) + ".0"');
		document.writeln('swVersion = CStr(swControl.ShockwaveVersion(""))');
		document.writeln('end if');
		document.writeln('VBGetShockwaveVer = swVersion');
		document.writeln('End Function');

		document.writeln('Function VBGetFlashVer(i)');
		document.writeln('on error resume next');
		document.writeln('Dim flControl, flVersion');
		document.writeln('flVersion = "0.0"');
		document.writeln('set flControl = CreateObject("ShockwaveFlash.ShockwaveFlash." + CStr(i))');
		document.writeln('if (IsObject(flControl)) then');
		document.writeln('flVersion = CStr(i) + ".0"');
		document.writeln('flVersion = CStr(flControl.FlashVersion(""))');
		document.writeln('end if');
		document.writeln('VBGetFlashVer = flVersion');
		document.writeln('End Function');
		document.writeln('<\/script>');
	}
}

//Assign some general variables for JScript engine

if (((isMSIE && version >= 4) && (!(isMSIESpoof))) || (isIcab)){
	scriptengine  += ScriptEngine() + " Version ";
	scriptengine  += ScriptEngineMajorVersion() + ".";
	scriptengine  += ScriptEngineMinorVersion() + ".";
	scriptengine  += ScriptEngineBuildVersion();
}

//Detect IE 4+ and call function to detect ActiveX controls (should check for PC-only!)

if ((navigator.userAgent.indexOf("MSIE") > 0) && (parseInt(navigator.appVersion) >= 4)) {
		checkActiveX();
}

// Go detect ActiveX controls
		
function checkActiveX() {

//trap for Mac MSIE 5
	if ((!(isMacMSIE)) && (!(isOpera))) {

	var shockwaveVer = shockwaveDetectAxVer(); 
	if (shockwaveVer)
		{ 
		pluginStr = (pluginStr + "pName=ShockwaveDirector::" + 
				"pDesc="+shockwaveVer+"::pMimeTypeDesc=::pMimeType=::|");
		}
		
	var flashVer = flashDetectAxVer();  	
	if (flashVer)
		{ 
		pluginStr = (pluginStr + "pName=Flash::pDesc="+flashVer+"::" + 
				"pMimeTypeDesc=::pMimeType=::|");
		} 
		
	if (useBeatnik == 1)
		{
		pluginStr = (pluginStr + "pName=Beatnik::pDesc=::" + 
				"pMimeTypeDesc=::pMimeType=::|");
		}
	} 

}
	
// these functions returns a floating point value which should be the version of the Shockwave control or 0.0

 function shockwaveDetectAxVer() {

    // loop backwards through the versions until we get a bite
    for (i=8;i>0;i--) {
      versionString = VBGetShockwaveVer(i);
      if (versionString != "0.0") {
        // if we get 1.0 we assume it is actually 6.0
        versionNum = (versionString == "1.0" ? 6.0 : parseFloat(versionString))
        return (versionNum);
      }
    }
  return (versionNum); //added so NS 3 won't complain
}

function flashDetectAxVer() {

    // loop backwards through the versions until we get a bite
    for (i=8;i>0;i--) {
      versionString = VBGetFlashVer(i);
      if (versionString != "0.0") {
        versionNum = parseFloat(versionString);
        return (versionNum);
      }
    }
   return (versionNum); //added so NS 3 won't complain
}

//setup queryGif with swig data

	queryGif = "?DESKTOPRECT=" + escape(desktoprect) + "&PLUGINS=" +
	escape(pluginStr) + "&SCRIPTENGINE=" + escape(scriptengine) +
	"&BAUD=" + speed + "&COLORDEPTH=" + colordepth + "&REFERRER=" + ref + "&MOVIEPATH=" + pagePath;
		
// only submit swig if there is no cookie
if (!(document.cookie.indexOf('visited') >= 0)) {
	document.cookie = 'site=visited; path=/;'
	document.writeln('<img src="' + action + queryGif + '" height="1" width="1">');
}


	
