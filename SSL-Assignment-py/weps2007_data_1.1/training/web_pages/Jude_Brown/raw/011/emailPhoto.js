	//Check for undefined variables
	if ((typeof(iFrameEmbed) == "undefined") && (iFrameEmbed == null))
		var iFrameEmbed = false;
	if ((typeof(omitEmailPhoto) == "undefined") && (omitEmailPhoto == null))
		var omitEmailPhoto = false;
	if ((typeof(popupEmailPhoto) == "undefined") && (popupEmailPhoto == null))
		var popupEmailPhoto = false;
	if ((typeof(popupBuyThisPhoto) == "undefined") && (popupBuyThisPhoto == null))
		var popupBuyThisPhoto = false;
	if ((typeof(omitAmex) == "undefined") && (omitAmex == null))
		var omitAmex = false;
	if ((typeof(imageLink) == "undefined") && (imageLink == null))
		var imageLink = false;		
	if ((typeof(linkWindow) == "undefined") && (linkWindow == null))
		var linkWindow = false;		
		
	var target = document;
	if(iFrameEmbed)
		target = parent.document;

	var blankImage = "/images/blank.gif";
	
 	//Set Cookie
//	function SetCookie (name,value,expires,path,domain,secure) {
	
//	if(name == "path" || name == "expires" || name == "domain" || name == "version") {
//		name = "badCookieName";
//	}
	
//  		document.cookie = name + "=" + value +
//    		((expires) ? "; expires=" + expires.toGMTString() : "") +
//    		((path) ? "; path=" + path : "") +
//    		((domain) ? "; domain=" + domain : "") +
//    		((secure) ? "; secure" : "");
//	}
	
	//Set up cookies for sending the photo
	function submitEmailPhoto(indexPos) {
	
		SetCookie ("imageSRC", imageLoc[indexPos], null, "/");
		SetCookie ("imageCaption", imageCap[indexPos], null, "/");
		SetCookie ("imageCredit", imageCre[indexPos], null, "/");
		SetCookie ("articleURL", target.location, null, "/");
		SetCookie ("articleTitle", window.target.title, null, "/");
		SetCookie ("omitAmex", imageAmex[indexPos], null, "/");

		var host = location.hostname;
		host = host.substring(host.indexOf("."));

		if(host == ".nba.com" || host == "linuxweb1") {
		SetCookie ("teamPath", location.pathname.substring(1, location.pathname.indexOf('/', 1)), null, "/");
		SetCookie("site", 'NBA', null, "/");
		}

		
		attrs = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,,width=738,height=590';
		newPopup=window.open('/components/EmailAPhotoForm.html','EmailaPhoto',attrs);

		newPopup.focus();

	}
	function popupBuyPhoto(buyURL){
		newPopup=window.open(buyURL,'BuyThisPhoto', 'toolbar=1,menubar=1,scrollbars=1,scrolling=yes,resizable=yes');	
		newPopup.focus();
	}

function drawPhoto() {
	//Add cache to blank images if necessary
	if(imageLocation.indexOf("cache.nba.com") > 0)
		blankImage = "http://cache.nba.com/images/blank.gif";	
	
	var ns = (navigator.appName.indexOf('Netscape') != -1) ? true : false;
	var ns6 = (ns && document.getElementById) ? true : false
	
	var tdWidth = "99%";
	var tableWidth = "100%";
	
	if(imageWidth > 0) {
		tableWidth = imageWidth;
		tdWidth = imageWidth - 2;
	}
	else if(ns)
		tdWidth = "90";

	document.write("<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=emailPhotoTable>");
	document.write("<tr><td align=\"center\" width=\"" + tableWidth + "\" colspan=\"3\">");
	if (imageLink  && (imageLink.length > 0)){
	document.write("<a href=\"" + imageLink + "\"");     
	if (linkWindow && (linkWindow.length > 0)){
	document.write("target=_blank");
	}
	document.write(">");
	}
	document.write("<img src=\"" + imageLocation + "\" border=0>");
	if (imageLink && (imageLink.length > 0)){
	document.write("</a>");
	}
	document.write("</td></tr>");

	document.write("<tr>");
	document.write("<td	colspan=\"3\" height=\"1\" class=\"ePhotoBorder\"><img width=\"1\" src=\"" + blankImage + "\"></td></tr>");
	
	document.write("<tr>");
	document.write("<td	width=\"1\" class=\"ePhotoBorder\"><img width=\"1\" src=\"" + blankImage + "\"></td>");

	document.write("<td width=" + tdWidth + " class=\"ePhotoBox\" align=\"center\">");
	
	if ((typeof(buyPhotoURL) != "undefined") && (buyPhotoURL != null) && (buyPhotoURL.length > 0)){
		document.write("<div style=\"font-size:10px;color:#ffffff;margin:0px;\"><a class=\"ePhotoLink\" href=\"javascript:submitEmailPhoto('" + currentEPhoto + "');\">E-mail photo</a>&nbsp;|&nbsp;<a class=\"ePhotoLink\" ");
		if (popupBuyThisPhoto==true) {
			document.write("href=\"javascript:popupBuyPhoto('"+buyPhotoURL+"');");
		} else {
			document.write("href=\"" + buyPhotoURL );
		}		
		document.write("\">Buy photos</a></div>");
		}else{
		document.write("<div style=\"font-size:10px;color:#ffffff;margin:0px;\"><a  class=\"ePhotoLink\" style=\"font-weight:bold;\" href=\"javascript:submitEmailPhoto('" + currentEPhoto + "');\">E-mail photo</a>&nbsp;|&nbsp;<a class=\"ePhotoLink\" style=\"font-weight:bold;\" href=\"http:\/\/photostore.nba.com\/source\/Home.aspx\">Buy photos</a></div>");
	}
	document.write("</td><td width=\"1\" class=\"ePhotoBorder\"><img width=\"1\" src=\"" + blankImage + "\"></td></tr>");
	
	document.write("<tr>");
	document.write("<td	colspan=\"3\" height=\"1\" class=\"ePhotoBorder\"><img width=\"1\" src=\"" + blankImage + "\"></td></tr>");

	document.write("</table>");
	
	if(imageCaption.length < 1)
		imageCaption = "&nbsp;";
	if(imageCredit.length < 1)
		imageCredit = "&nbsp;";

	if(imageLocation.indexOf("cache.nba.com") > -1)
		imageLoc[currentEPhoto] = imageLocation.substring(imageLocation.indexOf("cache.nba.com") + 13, imageLocation.length);
	else if(imageLocation.indexOf("www.nba.com") > -1)
		imageLoc[currentEPhoto] = imageLocation.substring(imageLocation.indexOf("www.nba.com") + 11, imageLocation.length);
	else if(imageLocation.indexOf("media.nba.com") > -1)
		imageLoc[currentEPhoto] = imageLocation.substring(imageLocation.indexOf("media.nba.com") + 13, imageLocation.length);
	else
		imageLoc[currentEPhoto] = imageLocation;


	imageCap[currentEPhoto] = imageCaption;
	imageCre[currentEPhoto] = imageCredit;
	
	if(omitAmex)
		imageAmex[currentEPhoto] = true;
	else
		imageAmex[currentEPhoto] = false;

	currentEPhoto++;

}
	
if(omitEmailPhoto)
	document.write("<img src=\"" + imageLocation + "\">");
else
	drawPhoto()