/*
---------------------------------------------------------------------------------------------------

//--------------------------------------------------------
// Use for long select boxes

var alphabet = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

//Jumps down select box to first option text that starts with letter

function goToLetter(selectBox,letter) {
    var idx;
    for (var n = 0; n < selectBox.options.length; n ++) {
        var firstLetter = selectBox.options[n].text.charAt(0).toUpperCase();
        if (firstLetter == letter) {
            idx = n;
            var scroll = selectBox.options.length - 1;
           //This places selected option at top of select box
            selectBox.selectedIndex = scroll;
            selectBox.selectedIndex = idx;
            break;
        } else if (n == selectBox.options.length - 1) {
            if (letter == "A") {
                selectBox.selectedIndex = 0;
            } else if (letter == "Z") {
                selectBox.selectedIndex = selectBox.options.length - 1;
            } else {
                for (var t = 0; t < alphabet.length; t ++) {
                    if (alphabet[t] == letter) {
                        var newLetter = alphabet[t + 1];
                    }
                }
                //IF no options begin with letter, display option that begins with next letter in alphabet
                goToLetter(selectBox,newLetter);
            }
        }
    }
}



---------------------------------------------------------------------------------------------------
*/


/*
---------------------------------------------------------------------------------------------------
*/

function doLoad() {}

/*
---------------------------------------------------------------------------------------------------
*/


function doUnload() {}

/*
---------------------------------------------------------------------------------------------------
*/


function getObjectSerializationString(obj)
{
    cookie    = "";    // cookie
    delim     = ""; // delimeter
    firstTime = true;
        
    for (crumb in obj)
    {
        cookie = cookie + delim + crumb + '=' + escape(obj[crumb]); 
        
        if (firstTime)
        {
            delim = "#"; // add # for subsequent
            firstTime = false;
        }
    }
    
    return cookie;
}


/*
---------------------------------------------------------------------------------------------------
*/


function XBgetElementById(name)
{
  var rtn;
  
  if (document.getElementById)
  {
  	rtn =  document.getElementById(name);
  }
  else if (document.all)
  {
	rtn = document.all[name];
  }
  else if (document.layers)
  {
   	rtn = document.layers[name];
  }
  
  return rtn;
}

/*
---------------------------------------------------------------------------------------------------
*/

/*
WM_setCookie(), WM_readCookie(), WM_killCookie()
A set of functions that eases the pain of using cookies.

Source: Webmonkey Code Library
(http://www.hotwired.com/webmonkey/javascript/code_library/)

Author: Nadav Savio
Author Email: nadav@wired.com
*/


// This next little bit of code tests whether the user accepts cookies.
var WM_acceptsCookies = false;
if(document.cookie == '') {
    document.cookie = 'WM_acceptsCookies=yes'; // Try to set a cookie.
    if(document.cookie.indexOf('WM_acceptsCookies=yes') != -1) {
	WM_acceptsCookies = true; 
    }// If it succeeds, set variable
} else { // there was already a cookie
  WM_acceptsCookies = true;
}


function WM_setCookie (name, value, hours, path, domain, secure) {
    if (WM_acceptsCookies) { // Don't waste your time if the browser doesn't accept cookies.
	var not_NN2 = (navigator && navigator.appName 
		       && (navigator.appName == 'Netscape') 
		       && navigator.appVersion 
		       && (parseInt(navigator.appVersion) == 2))?false:true;

	if(hours && not_NN2) { // NN2 cannot handle Dates, so skip this part
	    if ( (typeof(hours) == 'string') && Date.parse(hours) ) { // already a Date string
		var numHours = hours;
	    } else if (typeof(hours) == 'number') { // calculate Date from number of hours
		var numHours = (new Date((new Date()).getTime() + hours*3600000)).toGMTString();
	    }
	}
	document.cookie = name + '=' + escape(value) + ((numHours)?(';expires=' + numHours):'') + ((path)?';path=' + path:'') + ((domain)?';domain=' + domain:'') + ((secure && (secure == true))?'; secure':''); // Set the cookie, adding any parameters that were specified.
    }
} // WM_setCookie


function WM_readCookie(name) {
    if(document.cookie == '') { // there's no cookie, so go no further
	return false; 
    } else { // there is a cookie
	var firstChar, lastChar;
	var theBigCookie = document.cookie;
	firstChar = theBigCookie.indexOf(name);	// find the start of 'name'
	var NN2Hack = firstChar + name.length;
	if((firstChar != -1) && (theBigCookie.charAt(NN2Hack) == '=')) { // if you found the cookie
	    firstChar += name.length + 1; // skip 'name' and '='
	    lastChar = theBigCookie.indexOf(';', firstChar); // Find the end of the value string (i.e. the next ';').
	    if(lastChar == -1) lastChar = theBigCookie.length;
	    return unescape(theBigCookie.substring(firstChar, lastChar));
	} else { // If there was no cookie of that name, return false.
	    return false;
	}
    }	
} // WM_readCookie

function WM_killCookie(name, path, domain) {
  var theValue = WM_readCookie(name); // We need the value to kill the cookie
  if(theValue) {
      document.cookie = name + '=' + theValue + '; expires=Fri, 13-Apr-1970 00:00:00 GMT' + ((path)?';path=' + path:'') + ((domain)?';domain=' + domain:''); // set an already-expired cookie
  }
} // WM_killCookie


function WM_getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  return false;
}

/*
---------------------------------------------------------------------------------------------------
*/


function verifyEmail(frmField, fieldName) {

if (frmField.value.indexOf(' ') != -1 || frmField.value.indexOf(';') != -1)
{
	alert('The e-mail address may not contain spaces or semicolons. Please remove spaces/semicolons '
			+' \nfrom the ' + fieldName + ' field and try again.\n'
			+ '(Use a comma to seperate multiple e-mail addresses)');
	frmField.select();
	return false;
}
else
{
	
	if ((frmField.value.indexOf('@') == -1) || (frmField.value.indexOf('.') == -1))
	{   alert ('Please check the e-mail address you have entered in the ' + fieldName + ' field.\n' +
		'The e-mail address should look something like "name@domain.com"\n');
		frmField.select();
		return false; 
		} else {
		return true;
	}
}

}
/*
---------------------------------------------------------------------------------------------------
*/


function verifyNotEmpty(frmField, fieldName) {
	if (frmField.value.length < 3) {
		alert ('Please check what you have entered in the ' + fieldName + ' field.\n' +
		'The ' + fieldName + ' field is required.\n');
		frmField.select();
		return false;
		} else { 
		return true;
		}
}


