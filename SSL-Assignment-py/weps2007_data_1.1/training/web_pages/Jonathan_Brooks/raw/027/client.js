// Client side javascript 
// commonly used functions includes -
// Cookie handling
// 

// Cookie functionality - below.

// Sets cookie values. Expiration date is optional
//
function setCookie(name, value, days)
{
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  } else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

// retrieve a client side cookie.
//
function getCookie(Name) 
{
	var search = Name + "="   
	
	if (document.cookie.length > 0) 
	{ 
		// if there are any cookies      
		offset = document.cookie.indexOf(search)       
		
		if (offset != -1) 
		{ 
			// if cookie exists          
			offset += search.length          
			
			// set index of beginning of value         
			end = document.cookie.indexOf(";", offset)          
			
			// set index of end of cookie value         
			if (end == -1)             
				end = document.cookie.length         
				return unescape(document.cookie.substring(offset, end))      
		}    
	}
}

// Deletes a client-side cookie 
// 
function deleteCookie(name)
{
	// checks if the cookie is set, and sets the 
	// expiration date to Jan. 1st 1970.
	document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
} 

// please, don't change anything below this line
function updateFontSize () {

	if (document.getElementById) {

		var fontMedium = true;
		document.getElementById("medium").disabled=false;
		
		var fontSizeCookieEval=getCookie("fontSize");
		var fontSizeOptions=["small", "large"];
		
		for (var i=0; i < fontSizeOptions.length; i++) {
			if (fontSizeCookieEval == fontSizeOptions[i]) { 
				document.getElementById(fontSizeOptions[i]).disabled=false;
			} else {
				document.getElementById(fontSizeOptions[i]).disabled=true;
			}
		}
		
		document.getElementById("smallFont").style.fontWeight='normal';
		document.getElementById("mediumFont").style.fontWeight='normal';
		document.getElementById("largeFont").style.fontWeight='normal';
		
		if (fontSizeCookieEval == "small" ) {
			document.getElementById("smallFont").style.fontWeight='bolder';
		} 
		else if (fontSizeCookieEval == "large" ) {
			document.getElementById("largeFont").style.fontWeight='bolder';
		}
		else {
			document.getElementById("mediumFont").style.fontWeight='bolder';
		}
	}
}

// Allows user the ability to resize the text on the page.
// please, don't change anything below this line
function changeFontSize (size) {

	// set the cookie to expire after a year
	setCookie ("fontSize", size, 365);
	updateFontSize ();
}
