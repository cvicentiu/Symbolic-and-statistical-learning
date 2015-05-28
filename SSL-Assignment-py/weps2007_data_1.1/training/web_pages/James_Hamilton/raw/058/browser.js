/* 
	browser detection NS4 - NS6 - IE
	then load appropriate style sheet	
*/

var browser = navigator.appName;
var version = navigator.appVersion;
if ((browser.indexOf("Netscape") > -1) && (version.indexOf("4") > -1))
{ 
	//alert("This is a " + browser + ": " + version);
	document.writeln('<link href="="http://www.3com.com/solutions/en_US/enterprise/emea_docs/entp_ns.css" rel="stylesheet" type="text/css">'); 
}
else if ((browser.indexOf("Netscape") > -1) && (version.indexOf("5") > -1))
{
	//alert("This is a " + browser + ": " + version);
	document.writeln('<link href="http://www.3com.com/solutions/en_US/enterprise/emea_docs/entp_ie.css" rel="stylesheet" type="text/css">');
}
else if (browser.indexOf("Microsoft") > -1) 
{
	//alert("This is a " + browser + ": " + version);
	document.writeln('<link href="http://www.3com.com/solutions/en_US/enterprise/emea_docs/entp_ie.css" rel="stylesheet" type="text/css">');
}
else
{	//supply IE's Style Sheet to all other browsers
	document.writeln('<link href="http://www.3com.com/solutions/en_US/enterprise/emea_docs/entp_ie.css" rel="stylesheet" type="text/css">');
}

