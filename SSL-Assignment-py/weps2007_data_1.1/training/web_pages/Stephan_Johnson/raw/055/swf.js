                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            	var bflash = false;
	var flashVersion = 0;
	sPlugin = "";
	if (navigator.plugins && navigator.plugins.length)
	{
		oPlugin = navigator.plugins["Shockwave Flash"];
		if (oPlugin)
		{
			bflash = true;
			if (oPlugin.description)
			{
				sPlugin = oPlugin.description;
				flashVersion = sPlugin.charAt(sPlugin.indexOf('.')-1);
			}
		}
		else
			bFlash = false;
		if (navigator.plugins["Shockwave Flash 2.0"])
		{
			bflash = true;
			flashVersion = 2;
		}
	}
	else if (navigator.mimeTypes && navigator.mimeTypes.length)
	{
		x = navigator.mimeTypes['application/x-shockwave-flash'];
		if (x && x.enabledPlugin)
			bFlash = true;
		else
			bFlash= false;
	}
	else
	{
		document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
		document.write('on error resume next \n');
		document.write('For vCount = 2 to 6 \n');
			document.write('If Not(IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & vCount))) Then \n');
			document.write('Else \n');
				document.write('bFlash = true \n');
				document.write('flashVersion = vCount \n');
			document.write('End If\n');
		document.write('Next \n');
		document.write('</SCR' + 'IPT\> \n');
	}	


function writeFlash (){
			if (this.isValid){
				sFlash="<OBJECT classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://active.macromedia.com/flash2/cabs/swflash.cab#version="+this.version+",0,0,0\" ID=\""+this.id+"\" WIDTH=\""+this.width+"\" HEIGHT=\""+this.height+"\">\n";
				sFlash+="<PARAM NAME=allowScriptAccess VALUE=\""+this.scriptaccess+"\">\n";
				sFlash+="<PARAM NAME=movie VALUE=\""+this.fullpath+"?h1=" + urlEncode(this.h1) + "&h2=" + urlEncode(this.h2) + "&lwidth=" + this.width+ "&lheight=" + this.height + "&lshadow="+this.shadow+  "&sFontColor=" +this.fontcolor+ "&sLink="+this.url+ "\">\n";						
				sFlash+="<PARAM NAME=quality VALUE=\""+this.quality+"\">\n";
				sFlash+="<PARAM NAME=scale VALUE=\""+this.scale+"\">\n";
				sFlash+="<PARAM NAME=wmode VALUE=\""+this.wmode+"\">\n";
				if (this.bgcolor){
					sFlash+="<PARAM NAME=bgcolor VALUE=\""+this.bgcolor+"\">\n";
				}
				if (this.salign) {
					sFlash+="<PARAM NAME=salign VALUE=\""+this.salign+"\">\n";
				}

				if (this.bgcolor){
				sFlash+="<EMBED SRC="+this.fullpath + "?h1=" + urlEncode(this.h1) + "&h2=" + urlEncode(this.h2) + "&lwidth=" + this.width+ "&lheight=" + this.height +"&lshadow="+this.shadow+ "&sFontColor="+this.fontcolor+ "&sLink="+this.url+ " WIDTH="+this.width+" HEIGHT="+this.height+" SALIGN="+this.salign+ " QUALITY="+this.quality+" SCALE="+this.scale+" wmode="+this.wmode+" ID="+this.id+" NAME="+this.id+" BGCOLOR="+this.bgcolor+" TYPE=application/x-shockwave-flash PLUGINSPAGE=http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash></EMBED></OBJECT>";
				} else {
				sFlash+="<EMBED SRC="+this.fullpath + "?h1=" + urlEncode(this.h1) + "&h2=" + urlEncode(this.h2) + "&lwidth=" + this.width+ "&lheight=" + this.height +"&lshadow="+this.shadow+ "&sFontColor="+this.fontcolor+ "&sLink="+this.url+ " WIDTH="+this.width+" HEIGHT="+this.height+" SALIGN="+this.salign+ "QUALITY="+this.quality+" SCALE="+this.scale+" wmode="+this.wmode+" ID="+this.id+" NAME="+this.name+" TYPE=application/x-shockwave-flash PLUGINSPAGE=http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash></EMBED></OBJECT>";
				}
			}
			else{
			   sFlash = this.alt
			}			
			return (sFlash)

}
function objSWF(){
	this.fullpath = "";
	this.bgcolor = "";
	this.salign="lt";
	this.width = 0;
	this.height= 0;
	this.url="";
	this.fontcolor="0x111111";
	this.h1 = "";
        this.h2 = "";
        this.shadow = 1;
	this.version = "5";
	this.cab = "5,0,0,0";
	this.alt = "";
	this.id = "rvflash";
	this.quality = "best";
	this.wmode= "transparent";
	this.scale = "noborder";
	this.scriptaccess = "sameDomain";
	this.drawflash = writeFlash;
	this.isValid = (this.version <= flashVersion);
}

function urlEncode(s){
	var sbag = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.!~*'()";
	var hex = "0123456789ABCDEF";
	var sEncode = "";
	for (var i = 0; i < s.length; i++ ) {
		var sChar = s.charAt(i);
	    if (sChar == " ") {
		   sEncode += "+";
		} else if (sbag.indexOf(sChar) != -1) {
		    sEncode += sChar;
		} else {
		    var sCode = sChar.charCodeAt(0);
			if (sCode > 255) {			
				sEncode += "+";
			} else {
				sEncode += "%";
				sEncode += hex.charAt((sCode >> 4) & 0xF);
				sEncode += hex.charAt(sCode & 0xF);
			}
		}
	} 
	return (sEncode);
}



