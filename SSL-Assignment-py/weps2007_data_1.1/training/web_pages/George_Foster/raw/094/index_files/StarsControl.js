                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
var bIsRefresh = false;

function flyoverRating(iStars)
{
    if(!bIsRefresh)
    {
        if((bHasRated) || (!allowRating)) { return; }
        if(!bHasClicked)
        {
            return;
        }
    }
    var obj;
    for(var n=1; n<=5; n++)
    {
        obj = document.getElementById('ratestar'+n);
        if(obj!=null)
        {
            if(n<=iStars)
            {
                obj.src='../../images/ratings/starRatingRed.gif';
            }
            else
            {
                obj.src='../../images/ratings/starRatingGray.gif';
            }
        }
    }
}

function drawCurrentRating()
{
    var strs = nStars.split(".");
    var whole = 0;
    
    whole = parseInt(strs[0]);
    bIsRefresh = true;
    flyoverRating(whole);
    if(strs.length>1)
    {
        var ih = whole+1;
        obj = document.getElementById('ratestar'+ih);
        if(obj!=null)
        {
            obj.src='../../images/ratings/starRatingHalf.gif';
        }       
    }   
    bIsRefresh = false;
}

function clickRating(iStars)
{
    if(bHasRated) { return; }

    if(!allowRating) 
    { 
        // alert("Error: Not Logged In!");
        return; 
    }
    
    if(!bHasClicked)
    {
        // enable ratings
        bHasClicked = true;
        flyoverRating(0);    
        return;
    }
    
    bHasRated = true;

    var strUrl = "/UserControls/UserRatings/RateObject.aspx?format=text&stars=" + iStars + "&objectid=" + nObjectID;

	xmlHttpRatings = GetXmlHttpObject(xmlRatingsEvent);
		
	if(xmlHttpRatings!=null)
	{
		xmlHttpRatings.open("GET", strUrl , true);
		xmlHttpRatings.send(null);
	}
}

function xmlRatingsEvent()
{
	if (xmlHttpRatings.readyState==4 || xmlHttpRatings.readyState=="complete")
	{
	    var strText = xmlHttpRatings.responseText;    
	    var values = strText.split("\t");
	    if(values.length>1)
	    {
            nStars = values[3];
            nVotes = values[2];
            nObjectID = values[1].split("-");
            
            var str = "ObjectID=" + nObjectID[1] + " Stars=" + nStars + " TotalVotes=" + nVotes;
            // alert(str);
            drawCurrentRating();
            return;            
	    }    
        // alert(unescape(xmlHttpRatings.responseText));
	}
}

function GetXmlHttpObject(handler)
{ 
	var objXmlHttp = null;

	if (navigator.userAgent.indexOf("Opera")>=0)
	{
		return null; 
	}
	if (navigator.userAgent.indexOf("MSIE")>=0)
	{ 
		var strName="Msxml2.XMLHTTP";
		if (navigator.appVersion.indexOf("MSIE 5.5")>=0)
		{
			strName="Microsoft.XMLHTTP";
		} 
		try
		{ 
			objXmlHttp = new ActiveXObject(strName);
			objXmlHttp.onreadystatechange = handler;
			return objXmlHttp;
		} 
		catch(e)
		{ 
			// alert("Error. Scripting for ActiveX might be disabled");
			return null;
		} 
	} 
	if (navigator.userAgent.indexOf("Mozilla")>=0)
	{
		objXmlHttp = new XMLHttpRequest();
		objXmlHttp.onload = handler;
		objXmlHttp.onerror = handler;
		return objXmlHttp;
	}
	return null;
}

var xmlHttpListings = null;
var fullQueryString = "";

function getListings()
{
    var strUrl = "/detail/ajax_listings.aspx?" + fullQueryString;

	xmlHttpListings = GetXmlHttpObject(xmlListingsEvent);
		
	if(xmlHttpListings!=null)
	{
		xmlHttpListings.open("GET", strUrl , true);
		xmlHttpListings.send(null);
	}
}
function xmlListingsEvent()
{
	if (xmlHttpListings.readyState==4 || xmlHttpListings.readyState=="complete")
	{
	    var strText = xmlHttpListings.responseText;    
        var elemListings = document.getElementById("listings");
        elemListings.innerHTML = strText;
        //alert(unescape(xmlHttpListings.responseText));
        return;            
	}
}
