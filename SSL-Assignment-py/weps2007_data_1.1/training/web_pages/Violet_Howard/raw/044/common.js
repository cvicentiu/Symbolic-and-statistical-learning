function initPage() {
    checkVersion();
    initLogin();
    preloadImages();
    // a few hooks
    checkLoggedIn();
    loadJacks();
}
ord=Math.random()*10000000000000000;
window.onload=initPage;
var UPDATE_RATING_IN_SWF = false;

function doNothing() {}

// in the notloggedin control
// and on coresponding pages
var checkLoggedIn = doNothing;
// used on the cablelisting and ppvlisting pages
var loadJacks = doNothing;
function checkVersion()
{
	var siteVersion = getCookie("__REELZ_SITE_VERSION");
	var profileId = getCookie("__REELZ_ACCOUNT_ID");
	
	if(new String(document.location).indexOf("login.aspx")< 0 )
	{
	    if ((siteVersion == null && profileId != null) || (siteVersion != SITEVERSION && profileId != null))
	    {
		    window.location = BASE_URL + "profile/signout.aspx";
	    }
	}
}
function logOut()
{
    document.cookie ="";
    document.location = BASE_URL + "profile/signout.aspx";
}

function getKeyCode(e)
{
    return window.event ? e.keyCode : e.which;
}


function getElement(id) {
	if (document.getElementById) {
		return document.getElementById(id);
	}
	
	if (document.all || document.layers) {
		return document.all[id];
	}
	
	return null;
}

function getFirstTime() {
  if (getCookie("__REELZ_FIRST_VIEW") == null)
  {
   	setCookie("__REELZ_FIRST_VIEW","1");
   	return "true";
  }
  else {
    return "false";
  }

}

function setChannelSelectorWindowState(windowId) {
//	alert('__REELZ_CURRENT_WINDOWID :: ' + windowId);
	setCookie("__REELZ_CURRENT_WINDOWID", windowId);
}

function getChannelSelectorWindowState() {
	if(getCookie("__REELZ_CURRENT_WINDOWID") == null) {
		return -1;
	}
	else {
		return getCookie("__REELZ_CURRENT_WINDOWID");
	}
}

function setCurrentClipState(currentClip) {
//	alert('__REELZ_CURRENT_CLIP :: ' + currentClip);
	
	setCookie("__REELZ_CURRENT_CLIP", currentClip);
}

function getCurrentClipState() {
	if(getCookie("__REELZ_CURRENT_CLIP") == null) {
		return -1;
	}
	else {
		return getCookie("__REELZ_CURRENT_CLIP");
	}
}

function setCurrentItemState(currentItem){
//	alert('__REELZ_CURRENT_ITEM :: ' + currentItem);

	setCookie("__REELZ_CURRENT_ITEM", currentItem);
}

function getCurrentItemState() {
	if(getCookie("__REELZ_CURRENT_ITEM") == null) {
		return -1;
	}
	else {
		return getCookie("__REELZ_CURRENT_ITEM");
	}
}

function setCurrentItemAndWindowState(currentItem, currentWindow){
//	alert('__REELZ_CURRENT_ITEM(new) :: ' + currentItem);
//	alert('__REELZ_CURRENT_WINDOWID(new) :: ' + currentWindow);
	setCookie("__REELZ_CURRENT_ITEM", currentItem);
	setCookie("__REELZ_CURRENT_WINDOWID", currentWindow);

}

function initLogin() {
    if (getCookie("__REELZ_ACCOUNT_ID") == null) {
        showLoginDiv();
    }
    else {
        hideLoginDiv();
    }
}

function isLoggedIn() {
    if (getCookie("__REELZ_ACCOUNT_ID") == null) {
        return 0;
    }
    else {
        return 1;
    }
}

function byPassFlash() {
	if (getCookie("__REELZ_BYPASS_FLASH") != null) {
		return 1;
	} else {
		return null;
	}
}

function setByPassFlash() {
	setCookie("__REELZ_BYPASS_FLASH","1");
	window.location = window.location;
}

function showLoginDiv() {
    var divLogin = window.document.getElementById("loginControls");
    divLogin.style.visibility = "visible";
    divLogin.style.display = "block";
    
    var divLoggedIn = window.document.getElementById("loggedIn");
    divLoggedIn.style.visibility = "hidden";
    divLoggedIn.style.display = "none";
}

function hideLoginDiv() {
    var divLogin = window.document.getElementById("loginControls");
    divLogin.style.visibility = "hidden";
    divLogin.style.display = "none";
    
    var divLoggedIn = window.document.getElementById("loggedIn");
    divLoggedIn.style.visibility = "visible";
    divLoggedIn.style.display = "block";
    
    var spanLoginName = window.document.getElementById("loginName");
    
    var returnURL = window.document.location;
    spanLoginName.innerHTML = getCookie("__REELZ_LOGIN_NAME") + " ";
}

function hideShowObject(objectName)
{
	var object = window.document.getElementById(objectName);

	if (object.style.visibility == "hidden")
	{
		object.style.visibility = "visible";
		object.style.display = "block";	
	} else {
	    object.style.visibility = "hidden";
		object.style.display = "none";
	}
}

function  goToLoginPage() {
//alert(window.document.location);

    setCookie("__REELZ_LAST_LOGIN",window.document.location);
    document.location = getBaseURL() + "profile/profile.aspx";
    
}

function getMovieRating(movieId)
{	
	curRatings = getCookie("__REELZ_RATINGS1");
	if (curRatings == null || curRatings.length == 0) { return 0; }
	
	var ratingMoviePosition = curRatings.indexOf(movieId);

	if (ratingMoviePosition >= 0)
	{
		var ratingToGet = "";
	
		var ratingEndPosition = curRatings.indexOf(',', ratingMoviePosition);
		
		if (ratingEndPosition < 0) //Should mean this is the last rating in file
		{
			ratingToGet = curRatings.substring(ratingMoviePosition);
		} else {
			ratingToGet = curRatings.substring(ratingMoviePosition, ratingEndPosition);
		}
		
		var aryRating = ratingToGet.split('=');
		
		if (aryRating.length > 1)
		{
			if (aryRating[1] == "a") {
				return 10;
			} else {
				return aryRating[1];
			}
		}
	}
	
	return 0;
}

//SET MOVIE RATING*******************
//Shawn 
function setMovieRating(movieId, rating)
{
	var siteGuid = getCookie("__REELZ_ACCOUNT_ID");
	
	if (siteGuid != null && siteGuid.length > 0)
	{
		makeRequest(BASE_URL + "data/flashset.aspx?type=profilerating&siteguid=" + siteGuid + "&movid=" + movieId + "&rating=" + rating, getRatingRequest);
	}
	
	//call into flash to update rating
	try {
        if(UPDATE_RATING_IN_SWF)
	    {
	        updateRating("m" + movieId, rating)
	    }
	} catch(e) {}
}

function setMovieRatingInCookie(movieId, rating)
{	
	//Try to update cookies
	var curRatings = "";

	curRatings = getCookie("__REELZ_RATINGS1");
	
	if (rating == 10)
		rating = "a";
	
	if (curRatings != null && curRatings.indexOf(movieId) >= 0)
	{
		var ratingMoviePosition = curRatings.indexOf(movieId);
		var ratingEndPosition = curRatings.indexOf(',', ratingMoviePosition);
		var ratingToReplace = "";
		
		if (ratingMoviePosition >= 0)
		{
			if (ratingEndPosition < 0) //Should mean this is the last rating in file
			{
				ratingToReplace = curRatings.substring(ratingMoviePosition);
			} else {
				ratingToReplace = curRatings.substring(ratingMoviePosition, ratingEndPosition);
			}
		}
		
		curRatings = curRatings.replace(ratingToReplace, movieId + "=" + rating);
		setCookie("__REELZ_RATINGS1", curRatings, COOKIEDATE); //***TODO: need to grab timeout time from globalconfig
		// is this and the end the only exit points?
        adjustSwfRatings(movieId);
		return;
	}
	
	//If we haven't returned yet, then we haven't updated anything
	if (curRatings == null || curRatings.length == 0) //Create first file
	{
		curRatings = movieId + "=" + rating;
		setCookie("__REELZ_RATINGS1", curRatings, COOKIEDATE);
		return;
	}
	
	var aryRating = curRatings.split(',');
	
	
	
	if (aryRating.length + 1 > MAXRATINGSPERFILE) //Delete 1st rating in the cookie and replace it with this one
	{
		var ratingToReplace = "";
		ratingToReplace = curRatings.substring(0, curRatings.indexOf(','));

		curRatings = curRatings.replace(ratingToReplace, movieId + "=" + rating);
		setCookie("__REELZ_RATINGS1", curRatings, COOKIEDATE);
	}
	else //Update last cookie in the jar
	{	
		deleteCookie("__REELZ_RATINGS1");
		curRatings += ',' + movieId + "=" + rating;	
		setCookie("__REELZ_RATINGS1", curRatings, COOKIEDATE);
	}
	
	adjustSwfRatings(movieId);
}
function adjustSwfRatings(movieId) {
    var scripts = document.getElementsByTagName("SCRIPT");
    for (var i = 0; i < scripts.length; i++) {
        // id would be "rtswf_<%#GetHashCode()%>_<%=movieId%>"
        if (scripts[i].id != null && scripts[i].id.indexOf("rtswf") == 0 && scripts[i].id.indexOf(movieId) > 0) {

			if(scripts[i].innerHTML.indexOf("getMovieRating") >= 0) {
				eval(scripts[i].innerHTML);
			}

			
        }
    }
}


function setCookie(name, value, expires, domain, secure)
{
	deleteCookie(name);
    document.cookie= name + "=" + value +
        ((expires) ? "; expires=" + expires.toGMTString() : "") + "; path=/" +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
//	alert(document.cookie);
}

function setCookieExpire(name, value, domain, secure)
{
	deleteCookie(name);
    document.cookie= name + "=" + value +
//        ((expires) ? "; expires=" + expires.toGMTString() : "") + "; path=/" +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getBaseURL() {

    return  BASE_URL;
}

function getProfileEmail()
{
   if (getCookie('__REELZ_EMAIL') == null)
   {
        return "";
   }
   else
   {
       return getCookie('__REELZ_EMAIL');
   }
}

function getFirstVisit()
{
   if (getCookie('__REELZ_FIRST_VISIT') == null)
   {
        return "true";
   }
   else
   {
       return getCookie('__REELZ_FIRST_VISIT');
   }
}

function getCookie(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

function deleteCookie(name, path, domain)
{
    if (getCookie(name))
    {    
        document.cookie = name + "=" + 
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

//*****Generic geojax call, everyone should use this!*****
function makeRequest(url, eventToFire, parameters) {
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
    
       // alert('Giving up :( Cannot create an XMLHTTP instance');//
        return false;
    }
   
    http_request.onreadystatechange = eventToFire;
    
    if (parameters == null)
    {
		http_request.open('GET', url, true);
		http_request.send(null);
	}
	else
	{
	    http_request.open('POST', url, true);
		http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http_request.setRequestHeader("Content-length", parameters.length);
		http_request.setRequestHeader("Connection", "close");
		http_request.send(parameters);
	}    
    
}

//This is the geojax response event for setRating
function getRatingRequest()
{	
     if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            var response = http_request.responseText;
            
            if (response.length > 0)
            {
				var aryResponse = http_request.responseText.split(';');
				
				if (aryResponse.length > 0)
				{
					var movieId = aryResponse[0].toString().split('=');
					var rating = aryResponse[1].toString().split('=');
				}
				
				if (movieId.length > 0 && rating.length > 0)
				{
					 setMovieRatingInCookie(movieId[1], rating[1]);
				}
			}
        }
    }
}

// to handle screwiness with the search submit
function disableReturn() {
	if (event && ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13))) {
		return false;
	} else {
		return true;
	}
}
function disableInputBoxes(id) {
    var div = getDiv(id);
    if (div != null) {
        var inputs = div.getElementsByTagName("INPUT");
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].className == "txt" || inputs[i].className == "zip" || inputs[i].className == "pwd") {
                inputs[i].onkeydown = disableReturn;
            }
        }
    }
}

function getTextBoxLength(object)
{
	return document.getElementById(object).value.length;
}
function invokeSearch()
	{
        var txtSearch = window.document.getElementById("txtSearch");
        if (txtSearch.value != "")
        {
			if(txtSearch.value != "Movies, People, Videos")
			{ 
				document.location = BASE_URL + "search.aspx?keywords=" + txtSearch.value;
			}
			else
			{
				txtSearch.focus();
			} 
        }
        return false;
	}
	function clearSearchText(txt)
	{
	    if (txt != null) {
	        txt.value = "";
	    }
	}
function submitOnReturn() {
		if (event && ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13))) {
			var btn = getDiv("srchBtn");
			if (btn) {
				return btn.click();
			}
			return false;
		} else {
			return true;
		}
	}
	
//flash external API call
function ExternalInterfaceManager()
{
    this.registerMovie = function(movieName) {
        if(!window.fakeMovies) window.fakeMovies = new Array();
        window.fakeMovies[window.fakeMovies.length] = movieName;
    }
    this.initialize = function() {
        if(document.all)
        {
            if(window.fakeMovies)
            {
                for(i=0;i<window.fakeMovies.length;i++)
                {
                    window[window.fakeMovies[i]] = new Object();
                }
                window.onload = initializeExternalInterface;
            }
        }
    }
}
function initializeExternalInterface()
{
    for(i=0;i<window.fakeMovies.length;i++)
    {
        var movieName = window.fakeMovies[i];
        var fakeMovie = window[movieName];
        var realMovie = document.getElementById(movieName);

        for(var method in fakeMovie)
        {
            realMovie[method] = function() {flashFunction = "<invoke name=\"" + method.toString() + "\" returntype=\"javascript\">" + __flash__argumentsToXML(arguments, 0) + "</invoke>";this.CallFunction(flashFunction);}
        }
        window[movieName] = realMovie;
    }
}
function PrintThisPage(divId) 
{ 
   var sOption="toolbar=yes,location=no,directories=yes,menubar=yes,"; 
       sOption+="scrollbars=yes,width=750,height=600,left=100,top=25"; 

   var sWinHTML = document.getElementById(divId).innerHTML; 
   
   var winprint=window.open("printpage?print=true","",sOption); 
       winprint.document.open(); 
       winprint.document.write('<html><LINK href=/main.css rel=Stylesheet><body>'); 
       winprint.document.write(sWinHTML);          
       winprint.document.write('</body></html>'); 
       winprint.document.close(); 
       winprint.focus(); 
}

function disableFlash() {
    var div = getDiv(id);
    if (div != null) {
        var inputs = div.getElementsByTagName("INPUT");
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].className == "txt" || inputs[i].className == "zip" || inputs[i].className == "pwd") {
                inputs[i].onkeydown = disableReturn;
            }
        }
    }
}
