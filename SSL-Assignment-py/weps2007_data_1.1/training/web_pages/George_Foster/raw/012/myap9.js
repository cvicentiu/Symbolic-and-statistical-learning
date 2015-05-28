//How long the cookie should last... In Days
var cookieLife = 30;	 

//Overwrite Cookies?
//1=Yes and 0=No 
//Ex: If user visits with kbid=1001, then later with kbid=1002, do you want to overwrite the first cookie? 
var overwriteCookies = 1; 

var scriptLoc = ''; //URL to the users Processor.aspx script. 
 
//Determine http or https 
if (document.URL.indexOf('https:') > -1) 
{ 
	scriptLoc = 'https://'; 
} 
else 
{ 
	scriptLoc = 'http://'; 
} 

var domain = scriptLoc + 'affiliates.yaprice.com/';

//Finish off url 
scriptLoc = domain + 'MAPProc.aspx';	//URL to the users Processor.aspx script. 
 
 
//------------------------------------------------------- 
//         Don't edit anything below this line!! 
//------------------------------------------------------- 
var img = new Image(); 
var aImg = new Image();
var kbId = 0; 
var qs = location.search.substring(1); 
 
//Build the url 
var url = scriptLoc + '?'; 
url += '&curUrl=' + escape(document.URL); 
url += '&refUrl=' + escape(document.referrer); 
url += '&c=' + escape(window.screen.colorDepth) 
url += '&sw=' + escape(self.screen.width); 
url += '&sh=' + escape(self.screen.height); 
url += '&winid=' + escape(window.name); 
url += '&ow=' + overwriteCookies.toString();

SetCookie('test', '1', 1);
var testVal = GetCookie('test');
DeleteCookie('test');

var hasCookies = 0;

if(testVal == '1')
	hasCookies = 1;

url += "&cookies=" + hasCookies.toString();

img.src = url; 

if ((GetCookie('kbid') == null) || (overwriteCookies == 1)) 
{ 
	//Only look for kbid if there is a query string 
	if (qs.length > 0) 
	{ 
		var pairs = qs.split('&'); 
								 
		for(var i = 0; i < pairs.length; i++) 
		{ 
			var pairs2 = pairs[i].split('='); 
			 
			switch(pairs2[0].toLowerCase()) 
			{ 
				case 'kbid': 
					kbId = pairs2[1]; 
					break; 
			} 
		} //end for 
	}//end if 
} 
 
//If kbId is set, then set a cookie. 
if (kbId != 0) 
{ 
	SetCookie('kbid', kbId, cookieLife);		//'kbid' is cookie name, kbId is the javascript variable, 1 (or the last variable) is the amount of days before the cookie expires. 
} 

//----------------
//Action Processor
//----------------

function AProc(aID, profit, id, life)
{
	aImg = new Image();
	var x = Math.round(Math.random()*9999999);
	aImg.src = domain + 'AProc.aspx?aID=' + aID.toString() + '&p=' + profit.toString() + '&id=' + escape(id.toString()) + '&l=' + escape(life) + '&curUrl=' + escape(document.URL) + '&x=' + x.toString();
	pause(500);
//	alert('');
}
 

function pause(ms)
{

	d = new Date(); //today's date
	while (1)
	{
		mill=new Date(); // Date Now
		diff = mill-d; //difference in milliseconds
		if( diff > ms ) {break;}
	}
}

//----------------
//Cookie Functions 
//----------------

function getCookieVal (offset)  
{ 
	var endstr = document.cookie.indexOf (';', offset); 
	if (endstr == -1) 
		endstr = document.cookie.length; 
 
	return unescape(document.cookie.substring(offset, endstr)); 
} 
 
function GetCookie (name)  
{ 
	var arg = name + '='; 
	var alen = arg.length; 
	var clen = document.cookie.length; 
	var i = 0; 
	 
	while (i < clen)  
	{ 
		var j = i + alen; 
		if (document.cookie.substring(i, j) == arg) 
			return getCookieVal (j); 
		 
		i = document.cookie.indexOf(' ', i) + 1; 
 
		if (i == 0) break;  
	} 
	 
	return null; 
} 
 
function WriteCookie (name, value, expires)  
{ 
	var argv = SetCookie.arguments; 
	var argc = SetCookie.arguments.length; 
	var path = (argc > 3) ? argv[3] : null; 
	var domain = (argc > 4) ? argv[4] : null; 
	var secure = (argc > 5) ? argv[5] : false; 
	 
	var cookie = name + '=' + escape(value) + 
		((expires == null) ? '' : ('; expires=' + expires.toGMTString())) + 
		((path == null) ? '' : ('; path=' + path)) + 
		((domain == null) ? '' : ('; domain=' + domain)) + 
		((secure == true) ? '; secure' : ''); 
	 
	document.cookie = cookie; 
} 
 
function DeleteCookie (name)  
{ 
	var exp = new Date(); 
	exp.setTime (exp.getTime() - 1000000000);  // This cookie is history (changed -1 to make it previous time) 
	var cval = GetCookie (name); 
	document.cookie =name + '=' + cval + '; expires=' + exp.toGMTString(); 
} 
 
function SetCookie(name, value, expiredays) 
{ 
	var expdate = new Date();  
	expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * expiredays));  
	WriteCookie(name, value, expdate);   
} 
 
