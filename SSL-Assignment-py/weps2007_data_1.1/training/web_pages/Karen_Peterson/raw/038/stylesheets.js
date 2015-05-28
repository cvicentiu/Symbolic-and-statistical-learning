

var detect = navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;

if (checkIt('konqueror'))
{
	browser = "Konqueror";
	OS = "Linux";
}
else if (checkIt('omniweb')) browser = "OmniWeb"
else if (checkIt('opera')) browser = "Opera"
else if (checkIt('webtv')) browser = "WebTV";
else if (checkIt('icab')) browser = "iCab"
else if (checkIt('msie')) browser = "Internet Explorer"
else if (!checkIt('compatible'))
{
	browser = "Netscape Navigator"
	version = detect.charAt(8);
}
else browser = "An unknown browser";

if (!version) version = detect.charAt(place + thestring.length);

if (!OS)
{
	if (checkIt('linux')) OS = "Linux";
	else if (checkIt('x11')) OS = "Unix";
	else if (checkIt('mac')) OS = "Mac"
	else if (checkIt('win')) OS = "Windows"
	else OS = "an unknown operating system";
}

function checkIt(string)
{
	place = detect.indexOf(string) + 1;
	thestring = string;
	return place;
}

if (OS == "Mac")
	if (browser == "Netscape Navigator")
	document.write("<LINK REL='STYLESHEET' TYPE='text/css' HREF='/mac_netscape.css'>")
	else
	document.write("<LINK REL='STYLESHEET' TYPE='text/css' HREF='/mac_ie.css'>")
else
	if (browser == "Netscape Navigator")
	document.write("<LINK REL='STYLESHEET' TYPE='text/css' HREF='/win_netscape.css'>")
	else
	document.write("<LINK REL='STYLESHEET' TYPE='text/css' HREF='/win_ie.css'>")

