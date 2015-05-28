                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
var strWebtrendsSite = "Redesign2006"; 
var strCustomWTParams = "";
var strMainSection = "";
var strSubSection = "";
var str3rdLevel = "";
var strTvgServerName = "";

// necessary domain setting !!!
try
{
    switch(navigator.appName.toLowerCase())
    {
        case "netscape" :
            break;
        default:
            setDocDomain();
            break;
    }
}
catch(err)
{
}  

function setDocDomain()
{
    var domParts = document.domain.split('.');
    
    switch(domParts.length)
    {
        case 0:
            break;
        case 1:
            break;
        default:
            document.domain = domParts[domParts.length-2] + '.' + domParts[domParts.length-1];
            break;
    }
}

function collectWebtrendsData()
{
	var tmpPath = document.location.pathname.split("/");
	for(var n=0; n < tmpPath.length; n++)
	{
		switch(n)
		{
			case 1:
				strMainSection = tmpPath[n];
				break;
			case 2:
				strSubSection = tmpPath[n];
				break;
			case 3:
			    str3rdLevel = tmpPath[n];
			    break;
		}
	}
	dcsVar();
}

function dcsVar()
{
	var dCurrent=new Date();
	WT.tz=dCurrent.getTimezoneOffset()/60*-1;
	if (WT.tz==0)
	{
		WT.tz="0";
	}
	WT.bh=dCurrent.getHours();
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object")
	{
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean")
	{
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title)
	{
		WT.ti=document.title;
	}
	WT.js="Yes";
	if (typeof(gVersion)!="undefined")
	{
		WT.jv=gVersion;
	}
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip='www.tvguide.com';
	DCS.dcsuri=window.location.pathname;
	
	if (window.location.search)
	{
		DCS.dcsqry=window.location.search;
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-"))
	{
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4))
		{
			DCS.dcsref=window.document.referrer;
		}
	}
    dcsTag();
}

function A(N,V)
{
	return "&"+N+"="+dcsEscape(V);
}

function dcsEscape(S)
{
	if (typeof(RE)!="undefined")
	{
		var retStr = new String(S);
		for (R in RE)
		{
			retStr = retStr.replace(RE[R],R);
		}
		return retStr;
	}
	else
	{
		return escape(S);
	}
}

function dcsCreateImage(dcsSrc)
{	
	var rnd = new Date();
	var xS, xY;
	dcsSrc += "&rnd=" + rnd.getTime();
	if (document.images)
	{
		gImages[gIndex]=new Image;
		gImages[gIndex].src=dcsSrc;
		xS = gImages[gIndex].width;
		yS = gImages[gIndex].height;
		gIndex++;
	}
	else
	{
		document.write('<IMG BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
	}
}

function dcsTag()
{
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+(gDcsId==""?'':'/'+gDcsId)+"/dcs.gif?dctype=0";
	for (N in DCS)
	{
		if (DCS[N]) 
		{
			P+=A(N,DCS[N]);
		}
	}
	for (N in WT)
	{
		if (WT[N]) 
		{
			P+=A("WT."+N,WT[N]);
		}
	}
	for (N in DCSext)
	{
		if (DCSext[N]) 
		{
			P+=A(N,DCSext[N]);
		}
	}
	
    if(strMainSection.length<=0)
	{
	    strMainSection = "Home.aspx";
	}
	
	P+="&WT.sv="+strTvgServerName;
	P+="&WT.cg_n="+strMainSection+"&WT.cg_s="+strSubSection;
	P+="&WT.site=" + strWebtrendsSite;
	P+=strCustomWTParams;
	
	// send detail page info if available
	var path = document.location.pathname;
	if(strTvObjectName.length>0)
	{
        P+="&WT.objtyp="+escape(strTvObjectType);
        P+="&WT.tvobj="+escape(strTvObjectName);
	    countDetailPage(strTvObjectName, strTvObjectType);
    }
	
    if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0)
    {
	    P=P.substring(0,2040)+"&WT.tu=1";
    }
	
	dcsCreateImage(P);
}

function getGridCountBase()
{
    var strBase = "http:\/\/sdc.tvguide.com\/dcs.gif?dctype=1";
	var dCurrent = new Date();
	strBase += "&dcsdat=" + dCurrent.getTime();
	strBase += "&dcssip=" + "www.tvguide.com";	
	strBase += "&dcsuri=" + document.location.pathname;
	strBase += "&WT.tz=" + dCurrent.getTimezoneOffset()/60*-1;
	strBase += "&WT.bh=" + dCurrent.getHours();
	return strBase;
}

var gcCountImage = null;

function executeGridCounter(strDcsImgUrl)
{
    gcCountImage = null;
    
	strDcsImgUrl += "&WT.site=ListingsGrid";
	strDcsImgUrl += "&WT.prof=listings";

	if (strDcsImgUrl.length>2048&&navigator.userAgent.indexOf('MSIE')>=0)
	{
		strDcsImgUrl=strDcsImgUrl.substring(0,2040)+"&WT.tu=1";
	}
	
	var rnd = new Date();
	strDcsImgUrl += "&rnd=" + rnd.getTime();
	
	if (document.images)
	{
 		gcCountImage = new Image();
		gcCountImage.src = strDcsImgUrl;
		var xS = gcCountImage.width;
		var yS = gcCountImage.height;
	}
}

function countGridAction(strAction, strValue)
{    
	var strDcsImgUrl = getGridCountBase();
    strDcsImgUrl += "&GRID.action=" + escape(strAction);
    strDcsImgUrl += "&GRID.value=" + escape(strValue);
    executeGridCounter(strDcsImgUrl);  
}

function countFlyover(strCat, strSubCat)
{    
	var strDcsImgUrl = getGridCountBase();
    strDcsImgUrl += "&GRID.flyCat=" + escape(strCat);
    strDcsImgUrl += "&GRID.flySubCat=" + escape(strSubCat);
    executeGridCounter(strDcsImgUrl);  
}

function countFlyoverEx(strCat, strSubCat, strTitle)
{    
	var strDcsImgUrl = getGridCountBase();
    strDcsImgUrl += "&GRID.flyCat=" + escape(strCat);
    strDcsImgUrl += "&GRID.flySubCat=" + escape(strSubCat);
    strDcsImgUrl += "&GRID.flyTitle=" + escape(strTitle);
    executeGridCounter(strDcsImgUrl);  
}

function countGridPrefs(strPrefs)
{    
	var strDcsImgUrl = getGridCountBase();
    strDcsImgUrl += "&GRID.prefs=" + escape(strPrefs);
    executeGridCounter(strDcsImgUrl);  
}

function countGridView(strViewType, strFilter)
{    
	var strDcsImgUrl = getGridCountBase();
    strDcsImgUrl += "&GRID.page=" + escape('Listings Grid');
    strDcsImgUrl += "&GRID.view=" + escape(strViewType);
    strDcsImgUrl += "&GRID.filter=" + escape(strFilter);
    executeGridCounter(strDcsImgUrl);  
}

function countListingsSetup(strPageDesc)
{    
	var strDcsImgUrl = getGridCountBase();
    strDcsImgUrl += "&GRID.page=" + escape(strPageDesc);
    executeGridCounter(strDcsImgUrl);  
}

function countDetailPage(strObjName, strObjType)
{
	var strDcsImgUrl = getGridCountBase();
    strDcsImgUrl += "&WT.objtyp=" + escape(strObjType);
    strDcsImgUrl += "&WT.tvobj=" + escape(strObjName);
    
    if(strMainSection.toLowerCase()=='detail')
    {
        strDcsImgUrl += "&WT.urltyp=" + escape(strObjType+" (querystring)");
    }
    else
    {
        strDcsImgUrl += "&WT.urltyp=" + escape(strObjType+" (friendly-url)");
    }
       
    executeGridCounter(strDcsImgUrl);  
}

function countGridViewEx(strViewType, strFilter, strProviderType, nChannels, nMinutes, iAjaxLoadTime, iAjaxRender, iAjaxBytes)
{
    nChannels = parseInt(nChannels,10);
    var strChans = "";
    
    if(nChannels<=20)
    {
        strChans = "1-20"; 
    }
    else if(nChannels<=50)
    {
        strChans = "21-50"; 
    }
    else if(nChannels<=100)
    {
        strChans = "51-100"; 
    }
    else if(nChannels<=150)
    {
        strChans = "101-150"; 
    }
    else if(nChannels<=200)
    {
        strChans = "151-200"; 
    }
    else if(nChannels<=250)
    {
        strChans = "201-250"; 
    }
    else if(nChannels<=300)
    {
        strChans = "251-300"; 
    }
    else if(nChannels<=400)
    {
        strChans = "301-400"; 
    }
    else if(nChannels<=500)
    {
        strChans = "401-500"; 
    }
    else
    {
        strChans = "501-xxx"; 
    }

      
	var strDcsImgUrl = getGridCountBase();
    strDcsImgUrl += "&GRID.page=" + escape('Listings Grid');
    strDcsImgUrl += "&GRID.view=" + escape(strViewType);
    strDcsImgUrl += "&GRID.ajax=true";
    
    if(nChannels>0) 
    {
        strDcsImgUrl += "&GRID.filter=" + escape(strFilter);
        strDcsImgUrl += "&GRID.prtype=" + escape(strProviderType);
        strDcsImgUrl += "&GRID.chans=" + escape(strChans+" channels");
        strDcsImgUrl += "&GRID.mins=" + escape(nMinutes+" minutes");
        strDcsImgUrl += "&GRID.aload=" + escape(iAjaxLoadTime+" secs");
        strDcsImgUrl += "&GRID.arender=" + escape(iAjaxRender+" secs");
        strDcsImgUrl += "&GRID.akbytes=" + escape(iAjaxBytes+" KB");
    }
    
    executeGridCounter(strDcsImgUrl);  
}