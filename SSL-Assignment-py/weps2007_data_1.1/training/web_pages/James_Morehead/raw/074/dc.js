<!--//
	
	//Random Number Generator, place in body of page only once
	var ord = Math.random()*10000000000000000;

	// tracks ads on page
	var ads = new Array();

	// first do referer checks
	if(!window.dcSite)
	{
		//set the sitename
		var dcSite = "general";
		
		if(document.referrer && document.referrer.indexOf("/techindex/") != -1 && cType == "Article")
		{
			dcSite = "techindex";
		}
		else
		{
			switch(section)
			{
				case "News" :
					dcSite = "news";
					break;
				case "Test Center" :
					dcSite = "testcenter";
					break;
				case "Opinions" :
					dcSite = "opinions";
					break;
				case "CTO Network" :
					dcSite = "opinions";
					break;
				case "Home" :
					dcSite = "home";
					break;
				case "TechIndex" :
					dcSite = "techindex";
					break;
				case "ProductGuide" :
					dcSite = "productguide";
					break;
				case "Search" :
					dcSite = "search";
					break;
				case "Careers" :
					dcSite = "careers";
					break;
				case "execconnect" :
					dcSite = "execconnect";
					break;
				case "PrintThis" :
					dcSite = "print_this";
					break;
				case "Video" :
					dcSite = "video";
					break;
				default :	
					dcSite = section;
					break;
			}
		}
	}
        if(window.dcZone != null) {
                if(dcSite.indexOf("spotlight") ==-1  && dcZone.indexOf("/") != -1) {
                        dcZone = dcZone.substring(dcZone.indexOf("/") + 1, dcZone.length);

                }
    	}
	if(!window.dcZone)
	{
		
		// now set up the zone
		var dcZone = "index";
		
		if(document.URL.match(/src=sem/))
		{
			dcZone = "nopopup";
		}
		else if(document.URL.match(/article\/06\/07\/31\/31FEajax/) || document.URL.match(/reports\/31SRajax/))
		{
			dcSite = "video";
			dcZone = "editorialreview";	
		}
		else if(document.URL.match(/article\/06\/07\/31\/31OPeditor/))
		{
			dcSite = "video";
			dcZone = "editorsletter";
		}
		else if(document.URL.match(/s=feature/)){//have to check query string for special reports
			dcZone = "feature";
		}
		else
		{
			switch(cType)
			{
				case "Index" :
					dcZone = "index";
					break;
				case "Snippet" :
					dcZone = "index";
					break;
				case "Article" :
					dcZone = "article";
					break;
			}	
		}

	}
	
	//build the pkeys
	var dcPkey = "pkey=;";
	if(isValidArray("pkeys"))
	{
		dcPkey = buildDCKeyValue("pkey",pkeys);
	}
	
	// now build the skeys
	var dcSkey = "skey=;";
	if(isValidArray("skeys"))
	{
		dcSkey = buildDCKeyValue("skey",skeys);
	}
		
	var dcTData = "kw=;"; 
	var dartTDataCookie = getTacodaCookie("TData");
	if (dartTDataCookie != "" && dartTDataCookie != null)
	{  
		var tDataFields = dartTDataCookie.split("|");
		dcTData = buildDCKeyValue("kw",tDataFields);
	}
	
	// Get TID cookie for u value
	var dcTID = "";
	/*
	var dcTID = "u=;";
	var dartTIDCookie = getTacodaCookie("TID"); 
	if (dartTIDCookie != "" && dartTIDCookie != null) 
	{  
		dcTID = "u="+dartTIDCookie+";"; 
	}
	*/

	function buildDCKeyValue(key,values)
	{
		var keyString = "";
		if(values != null)
		{
		    for(i =0;i < values.length;i++)
		    {
		    	keyString += key + "=" + values[i].replace(/ /g,"_").toLowerCase() + ";";
		    }
	      	}
		//add vertical to pkey
		if(isValidArray("verticals")){
		if(key.indexOf("pkey") != -1)
		{
			for(i =0;i < verticals.length;i++)
			{
				keyString += key + "=" + verticals[i].replace(/ /g,"_").toLowerCase() + ";";
			}//end  for
		}
		}
      		return keyString;
	}
	
	function isValidArray(arrayName)
	{
		var isValidArray = false;
		if(eval('window.' + arrayName + ' && ' + arrayName + ' != null && ' + arrayName + '.length > 0'))
		{
			isValidArray = true;
		}
		return isValidArray;
	}


function adCall(width,height,pos)
{
	// store ad info in global array
	var curAd = null;
	curAd = new Array();
	curAd['width'] = width;
	curAd['height'] = height;
	curAd['pos'] = pos;
	curAd['tile'] = (ads.length == 0 ) ? 1 : (ads.length + 1) * 2;
	ads[ads.length] = curAd;
	
	//write out the ad tag
	document.write('<NOLAYER>');
	if(pos.indexOf("leader") !=-1 && pos.indexOf("leaderbottom") == -1){
		document.write('<IFRAME ID=' + curAd['tile'] + ' SRC="http://ad.doubleclick.net/adi/idg.us.info.'+dcSite+'/'+dcZone+';dcopt=ist;pos=' + pos + ';' + dcPkey + dcTData + dcTID + dcSkey +'tile=' + curAd['tile'] + ';sz=' + width + 'x' + height + ';ord=' + ord + '?" WIDTH="' + width + '" HEIGHT="' + height + '" FRAMEBORDER="no" BORDER="0" MARGINWIDTH="0" MARGINHEIGHT="0" SCROLLING="no">');
	}else{
		document.write('<IFRAME ID=' + curAd['tile'] + ' SRC="http://ad.doubleclick.net/adi/idg.us.info.'+dcSite+'/'+dcZone+';pos=' + pos + ';' + dcPkey + dcTData + dcTID + dcSkey +'tile=' + curAd['tile'] + ';sz=' + width + 'x' + height + ';ord=' + ord + '?" WIDTH="' + width + '" HEIGHT="' + height + '" FRAMEBORDER="no" BORDER="0" MARGINWIDTH="0" MARGINHEIGHT="0" SCROLLING="no">');
	}
  	document.write('<A HREF="http://ad.doubleclick.net/jump/idg.us.info.'+dcSite+'/'+dcZone+';pos=' + pos + ';' + dcPkey + dcTData + dcTID + dcSkey +'tile=' + curAd['tile'] + ';sz=' + width + 'x' + height + ';abr=!ie4;abr=!ie5;abr=!ie6;ord=' + ord + '?">');
  	document.write('<IMG SRC="http://ad.doubleclick.net/ad/idg.us.info.'+dcSite+'/'+dcZone+';pos=' + pos + ';' + dcPkey + dcTData + dcTID + dcSkey +'tile=' + curAd['tile'] + ';sz=' + width + 'x' + height + ';abr=!ie4;abr=!ie5;abr=!ie6;ord=' + ord + '?" WIDTH="' + width + '" HEIGHT="' + height + '" BORDER=0 ALT=""></A>');
  	document.write('</IFRAME>');
  	document.write('</NOLAYER>');
  	document.write('<ILAYER ID="layer' + curAd['tile'] + '" VISIBILITY="hidden" WIDTH="' + width + '" HEIGHT="' + height + '"></ILAYER>');
}

function endBodyAdCode()
{	
	for(var i = 0;i < ads.length;i++)
	{
		var endAd = ads[i];
		document.write('<LAYER SRC="http://ad.doubleclick.net/adl/idg.us.info.'+dcSite+'/'+dcZone+';pos=' + endAd['pos'] + ';' + dcPkey + dcTData + dcTID + dcSkey +'tile=' + endAd['tile'] + ';sz=' + endAd['width'] + 'x' + endAd['height'] + ';ord=' + ord + '?" width="' + endAd['width'] + '" height="' + endAd['height'] +  '" visibility="hidden" onLoad="moveToAbsolute(layer' + endAd['tile'] + '.pageX,layer' + endAd['tile'] + '.pageY);clip.width=' + endAd['width'] + ';clip.height=' + endAd['height'] + ';visibility=\'show\';"></LAYER>');
	}
	
	//document.write("<font color=white>site: " + dcSite + " zone: " + dcZone + " pkeys: " + dcPkey + " skeys: " + dcSkey + " tdata: " + dcTData + " tid: " + dcTID + "</font>");
}

function getTacodaCookie(name) 
{
var cname = name + "=";
var dc = document.cookie;
if (dc.length > 0) {
for(var begin = dc.indexOf(cname); begin != -1; begin = dc.indexOf(cname, begin)) {
if((begin != 0) && (dc.charAt(begin - 1) != ' ')) {
begin++;
continue;
}
begin += cname.length;
var end = dc.indexOf(";", begin);
if (end == -1)
end = dc.length;
return unescape(dc.substring(begin, end));
}
}
return null;
}
//-->
