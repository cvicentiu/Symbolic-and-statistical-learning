(
function()
{
	// E|R|A related items interface link.
	var ERA_INTERFACE_LINK = "/EN/interface/getrelateditems.htm";
	// Default E|R|A client domain.
	var DEFAULT_DOMAIN = "telephony.firstlightera.com";
	
	/*
		Gets url of the E|R|A related items interface.
	*/
	function GetEraDomain(current_window) 
	{
		if (current_window.era_rc != null && current_window.era_rc["ERADomain"] != null) 
		{
				return "http://" + (current_window.era_rc["ERADomain"]) + ERA_INTERFACE_LINK;;
		} 
		
		return "http://" + DEFAULT_DOMAIN + ERA_INTERFACE_LINK;
	}
	
	/*
		Gets height from the era_rc array. 
	*/
	function GetEraBlockHeight(current_window) 
	{
		if (current_window.era_rc != null && current_window.era_rc["Height"] != null) 
		{
				return GetStringWithQuotes(current_window.era_rc["Height"]);
		} 
		
		return GetStringWithQuotes(500);
	}
	
	/*
		Gets width from the era_rc array. 
	*/
	function GetEraBlockWidth(current_window) 
	{
		if (current_window.era_rc != null && current_window.era_rc["Width"] != null) 
		{
				return GetStringWithQuotes(current_window.era_rc["Width"]);
		} 
		
		return GetStringWithQuotes(500);
	}
	
	/*
		Gets height from the era_rc array. 
	*/
	function GetEraMaxItems(current_window) 
	{
		if (current_window.era_rc != null && current_window.era_rc["MaxRelatedItems"]  != null) 
		{
				return current_window.era_rc["MaxRelatedItems"];
		} 
		
		return 10;
	}
	
	/*	
		Gets sort type from the era_rc array. 
	*/
	function GetEraSortType(current_window) 
	{
		if (current_window.era_rc != null && current_window.era_rc["SortBy"] != null) 
		{
				return current_window.era_rc["SortBy"];
		} 
		
		return 'Rank';
	}
	
	/*	
		Gets content type from the era_rc array. 
	*/
	function GetContentType(current_window) 
	{
		if (current_window.era_rc != null && current_window.era_rc["ContentType"] != null) 
		{
				return current_window.era_rc["ContentType"];
		} 
		
		return 'SSMicrosites';
	}
	
	
	/*	
		Gets the Content Url from the era_rc array if supplied otherwise uses the
		current Url and removes any trailing .html file name while retaining the ending slash.
	*/
	function GetTelephonyContentUrl(current_window)
	{
		if (current_window.era_rc != null && current_window.era_rc["ContentUrl"] != null) 
		{
			return encodeURIComponent(current_window.era_rc["ContentUrl"]);
		} 

		var contentUrl = location.href;
		contentUrl = FormatTelephonyUrl(contentUrl);
		return encodeURIComponent(contentUrl);
	}
	
	/*
		Gets the Telephony Content ID. This is the current request Url with the domain prefix
		removed and any .html file prefix removed but leaving the initial and trailing slash.
	*/
	function GetTelephonyContentId(current_window)
	{
		var contentId = location.href;
		contentId = FormatTelephonyUrl(contentId);
		var domainPattern = new RegExp('http(s)?://[^/]+', 'i');
		return encodeURIComponent(contentId.replace(domainPattern, ''));
	}
	
	/* 
		Prints the related links IFrame to the document. 
	*/
	function DisplayEraFrame(eraLink, current_document, current_window)
	{
		current_document.write('<iframe name="era_relatedLinks" width='+GetEraBlockWidth(current_window)+" height="+GetEraBlockHeight(current_window)+' frameborder=0 src='+ eraLink +' marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no">');
		current_document.write("</iframe>");
	}

	/*
		Takes a fully qualified Telephony Url and removes any trailing .html
		filename, any querystring information and retains a trailing slash on the Url.
	*/
	function FormatTelephonyUrl(contentUrl) 
	{
		if (contentUrl.lastIndexOf('.html') > -1) 
		{
			contentUrl = contentUrl.substring(0, contentUrl.lastIndexOf('/'));
		}

		if (contentUrl.indexOf('?') > -1)
		{
			contentUrl = contentUrl.substring(0, contentUrl.indexOf('?'));
		}

		if (contentUrl.lastIndexOf('/') != contentUrl.length - 1) 
		{
			contentUrl += '/';
		}

		return contentUrl;
	}
	
	/* 
		Adds double quotes to the provided string. 
	*/
	function GetStringWithQuotes(checkString)
	{
		return checkString!=null ?'"'+ checkString + '"':'""'
	}
	
	
	/* 
		 Generates the related links request link using the 
		 link parameters. 
	*/
	function CreateEraLink(current_window, current_document)
	{
		var eraLink= GetEraDomain(current_window) + "?";
		if (current_window.era_rc != null && current_window.era_rc["ContentId"]) 
		{
			eraLink += ("ContentId=" + current_window.era_rc["ContentId"]);
		} else {
			eraLink += ("ContentId=" + GetTelephonyContentId(current_window));
		}
		eraLink += ("&");
		eraLink += ("numrequests=1");
		eraLink += ("&");
		eraLink += ("req1=" + GetContentType(current_window) + "||");
		eraLink += (GetEraMaxItems(current_window)+ "|");
		eraLink += ("SortBy:" + GetEraSortType(current_window));
		eraLink += ("&");
		eraLink += ("OutputType=html");
			
		DisplayEraFrame(eraLink, current_document, current_window);
		current_window.era_rc = null;
	}
	
	/* 
		 Calls functions to print the related links frame. 
	*/
	function EraMain()
	{
		var current_window = window;
		var current_document = document;
		
		CreateEraLink(current_window, current_document);
	}
	
	EraMain();

})()
