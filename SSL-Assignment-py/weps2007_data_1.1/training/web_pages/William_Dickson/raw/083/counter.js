
// Copyright (c)2005 Site Meter, Inc. 

var g_date=new Date();
var g_hours=0;
var g_minutes=0;
var g_r="";
var g_rtype="0";
var g_server ="70.84.88.130"
var g_ip="165.247.175.238";

// Get the User Agent Name
var g_agent = navigator.appName;

// if g_frames is true then try getting the framed referral (with out error checking)
if (typeof(g_frames) != "undefined")
	if (g_frames)
		g_r=top.document.referrer;

// Get the referral for non-multi-domained-framed sites using a Netscape browser
if ((g_r == "") || (g_r == "[unknown origin]") || (g_r == "unknown") || (g_r == "undefined"))
	if (document["parent"] != null) 
		if (parent["document"] != null) // ACCESS ERROR HERE!
			if (parent.document["referrer"] != null) 
				if (typeof(parent.document) == "object")
				{
					g_rtype="1";
					g_r=parent.document.referrer; 
				}

// Get the referral for the current document if a framed referral wasn't found
if ((g_r == "") || (g_r == "[unknown origin]") || (g_r == "unknown") || (g_r == "undefined"))
	if (document["referrer"] != null) 
	{
		g_rtype="4";
		g_r = document.referrer;
	}

// Get the hours
if (g_date)
	g_hours=g_date.getHours();

// Get the minutes
if (g_date)
	g_minutes=g_date.getMinutes();

// Convert all the 'unknown's into blank
if ((g_r == "") || (g_r == "[unknown origin]") || (g_r == "unknown") || (g_r == "undefined"))
	g_r = "";

// Create the image url and write it into the page. 

document.write("<a href=\"http://www.sitemeter.com/");
document.write("stats.asp?site="+site+"\" target=_top>");
document.write("<img src=\"http://" + g_server + "/");
document.write("meter.asp?site="+site); 
document.write("&refer="+escape(g_r));
if (g_ip != "")
	document.write("&ip="+g_ip);
document.write("&hours="+g_hours);
document.write("&minutes="+g_minutes);
document.write("&rtype="+g_rtype);
document.write("&rnd="+Math.random());
document.write("\" border=0 title=\"Site Meter\"></a>");
