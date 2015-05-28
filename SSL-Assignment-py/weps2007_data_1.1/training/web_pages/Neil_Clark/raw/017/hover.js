

// cookie-managed hover 
// call popup with onLoad="mainpop();
// domain (host) = www.growthtrac.com
// cookie = subscribe
// path = /
// cookie expires = expDays value

/*
 * dummy flash value
 */

var isFlash = 1;


/*
 * popup cookie ********************************
 */


<!-- Begin
var expDays = 30; // number of days the cookie should last


function GetCookie (name) {  
var arg = name + "=";  
var alen = arg.length;  
var clen = document.cookie.length;  
var i = 0;  
while (i < clen) {    
var j = i + alen;    
if (document.cookie.substring(i, j) == arg)      
return getCookieVal (j);    
i = document.cookie.indexOf(" ", i) + 1;    
if (i == 0) break;   
}  
return null;
}


function SetCookie (name, value) {  
var argv = SetCookie.arguments;  
var argc = SetCookie.arguments.length;  
var expires = (argc > 2) ? argv[2] : null;  
var path = "/";  
var domain = (argc > 4) ? argv[4] : null;   
var secure = (argc > 5) ? argv[5] : false;  
document.cookie = name + "=" + escape (value) + 
((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + 
((path == null) ? "" : ("; path=" + path)) +  
((domain == null) ? "" : ("; domain=" + domain)) +    
((secure == true) ? "; secure" : "");
}



function DeleteCookie (name) {  
var exp = new Date();  
exp.setTime (exp.getTime() - 1);  
var cval = GetCookie (name);  
document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
var exp = new Date(); 
exp.setTime(exp.getTime() + (expDays*24*60*60*1000));
function amt(){
var count = GetCookie('subscribe')
if(count == null) {
SetCookie('subscribe','1')
return 1
}
else {
var newcount = parseInt(count) + 1;
DeleteCookie('subscribe')
SetCookie('subscribe',newcount,exp)
return count
   }
}



function getCookieVal(offset) {
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}


function checkCount() {
var count = GetCookie('subscribe');
if (count == null) {
count=1;
SetCookie('subscribe', count, exp);

// hover layer display code 
document.getElementById('hover').style.display = 'block';

}
else {
count++;
SetCookie('subscribe', count, exp);
   }
}


function mainpop() {
if ( browserAcceptsCookies() && isFlash ) 
  checkCount(); }
  
  
function hideHover()
		{
			document.getElementById('hover').style.visibility = 'hidden';
		}

function browserAcceptsCookies() {
	var acceptsCookies = false;
	if ( document.cookie == '' ) {
		document.cookie = 'acceptsCookies=yes'; // Try to set a cookie.
		if ( document.cookie.indexOf( 'acceptsCookies=yes' ) != -1 ) {
			acceptsCookies = true;
		} // If it succeeds, set variable
	} else { // there was already a cookie
		acceptsCookies = true;
	}
	
	return ( acceptsCookies );
}

// begin validation

	function verifyform (hover)
	{


  		//email
		if ((document.hover.email.value == "") || 
        (document.hover.email.value.indexOf('@') == -1) || 
        (document.hover.email.value.indexOf('.') == -1)) {
        alert("Please verify your e-mail address.");
        return false;
        }  

		if (document.hover.email.value != document.hover.email_confirm.value) {
		alert ("The Confirm e-mail must match the corresponding e-mail address.");
		return false;
		}

	   	   //first name
		if (document.hover.firstname.value == "") {
        alert("Please enter your first name.");
        return false;
        }

        document.getElementById('hover').style.visibility = 'hidden';
        
	}

	function valCheckBoxes(whatCheckBox)
        {
		var f;
		f = document.hover;
		if (whatCheckBox == "church_flag"){
			f.optin.checked  = true;
        }
        if (whatCheckBox == "optin"){
			f.church_flag.checked  = false;
        }
}

//  End -->


