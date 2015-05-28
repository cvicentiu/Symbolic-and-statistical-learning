

//comments



/*
 * client info
 */
var PLATFORM = navigator.appVersion.toLowerCase();
var CLIENT = navigator.appName.toLowerCase();
var VERSION = parseInt (navigator.appVersion);
var AOLCLIENT = (navigator.userAgent.indexOf ("AOL") != -1) ? 1 : 0;
var AOLUA = AOLCLIENT ? 1 : 0;
var DOCREF = document.referrer.slice((document.referrer.indexOf("//") + 2),document.referrer.indexOf(".",document.referrer.indexOf(".") + 1));
var BASE = "http://www.growthtrac.com";


/*
 * page buttons
 */
function botUtilities () {
discuss() ;
email();
topten();
bookmark();
homepage();
printfriendly() ;
}

// next one is used for the cgi templates (omitted the email feature)
function topUtilities3 () {
bookmark2();
homepage2();
}

// next one used on Home page
function topUtilities2 () {
email2();
bookmark2();
homepage2();
}

function topUtilities () {
email();
topten();
bookmark();
homepage();
}


function email2() {
document.write('<table cellpadding="0" cellspacing="0" border="0" width="120"><tr><td><div align="right" class="link2"><a title="Tell a Friend about Growthtrac" href="javascript:emailFriend();">TELL A FRIEND</a></div></td></tr></table>');
}


function bookmark2() {
if ((PLATFORM.indexOf("mac") == -1) && (!AOLCLIENT)) {
if (CLIENT != "netscape") {
var bookmarkLink = "javascript:window.external.AddFavorite('" + this.location.href + "','" + document.title + "');";
} else {
var bookmarkLink = "javascript:alert('Click on &quot;OK&quot;, then type CTRL-D to add this page to your list of bookmarks.');";
}	
var bookmarkButton = '<table cellpadding="0" cellspacing="0" border="0" width="120"><tr><td class="link2"><div align="right"><a title="Bookmark this Page" href="' + bookmarkLink + '" >BOOKMARK US</a></div></td></tr></table>'; 
document.write(bookmarkButton);
}
}

// new function below uses popup
function homepage2() {
document.write('<table cellpadding="0" cellspacing="0" border="0" width="120"><tr><td class="link2"><div align="right"><a title="Open Popup Window" href="javascript:DoHomepagePop();" >HOME PAGE</a></div></td></tr></table>'); 
}


function DoEtrustPop() {
        window.open ('http://www.eassurance.org/eassur.php?4988','name','scrollbars=yes,status=no,resizable=no,width=570,height=450');
 return false;
}

function DoHomepagePop(newpage) {
        window.open ('http://www.growthtrac.com/pop_homepage.php','name','scrollbars=no,status=no,resizable=no,width=620,height=364');
}


function OLDhomepage() {
document.write('<TABLE CELLPADDING="0" CELLSPACING="0" BORDER="0"><TR><TD><A HREF="javascript:void(0);" onClick="this.style.behavior=\'url(#default#homePage)\';this.setHomePage(top.location.href);"><IMG SRC="' + BASE + '/images/icon_home.gif" WIDTH="20" HEIGHT="20" BORDER="0" ALT="Make Growthtrac your Home Page"></A></TD><TD><A title="Make Growthtrac Your Home Page" HREF="javascript:void(0);" onClick="this.style.behavior=\'url(#default#homePage)\';this.setHomePage(top.location.href);" CLASS="pageutility"><font face="Verdana, Arial, Helvetica, sans-serif" size="1">Home Page</font></A></TD></TR></TABLE>');
}

function OLDhomepage2() {
document.write('<table cellpadding="0" cellspacing="0" border="0" width="120"><tr><td class="link2"><div align="right"><a title="Make Growthtrac your Home Page" href="javascript:void(0);" onClick="this.style.behavior=\'url(#default#homePage)\';this.setHomePage(top.location.href);" >HOME PAGE</a></div></td></tr></table>'); 
}

function topten() {
document.write('<TABLE CELLPADDING="0" CELLSPACING="0" BORDER="0"><TR><TD><A HREF="http://www.growthtrac.com/popular.php"><IMG SRC="' + BASE + '/images/icon_popular.gif" WIDTH="20" HEIGHT="20" BORDER="0" ALT="Most Popular"></A></TD><TD><A HREF="http://www.growthtrac.com/popular.php" CLASS="pageutility"><font face="Verdana, Arial, Helvetica, sans-serif" size="1">Most Popular</font></A></TD></TR></TABLE>');
}

function discuss() {
document.write('<TABLE CELLPADDING="0" CELLSPACING="0" BORDER="0"><TR><TD><A HREF="http://www.growthtrac.com/boards"><IMG SRC="' + BASE + '/images/icon_discuss.gif" WIDTH="20" HEIGHT="20" BORDER="0" ALT="Discuss this Article"></A></TD><TD><A title="Discuss this Article" HREF="http://www.growthtrac.com/boards" CLASS="pageutility"><font face="Verdana, Arial, Helvetica, sans-serif" size="1">Discuss this Article</font></A></TD></TR></TABLE>');
}


function email() {
document.write('<TABLE CELLPADDING="0" CELLSPACING="0" BORDER="0"><TR><TD><A HREF="return emailFriend();return true;"><IMG SRC="' + BASE + '/images/icon_mail.gif" WIDTH="20" HEIGHT="20" BORDER="0" ALT="Tell a Friend"></A></TD><TD><A title="Tell a Friend About Growthtrac" HREF="javascript:emailFriend();" CLASS="pageutility"><font face="Verdana, Arial, Helvetica, sans-serif" size="1">Tell a Friend</font></A></TD></TR></TABLE>');
}


function bookmark () {
if ((PLATFORM.indexOf("mac") == -1) && (!AOLCLIENT)) {
if (CLIENT != "netscape") {
var bookmarkLink = "javascript:window.external.AddFavorite('" + this.location.href + "','" + document.title + "');";
} else {
var bookmarkLink = "javascript:alert('Click on &quot;OK&quot;, then type CTRL-D to add this page to your list of bookmarks.');";
}	
var bookmarkButton = '<TABLE CELLPADDING="0" CELLSPACING="0" BORDER="0"><TR><TD><A HREF="' + bookmarkLink + '"><IMG SRC="' + BASE + '/images/bookmark.gif" WIDTH="20" HEIGHT="20" BORDER="0" ALT="Bookmark this Page"></A></TD><TD><A title="Bookmark this Page" HREF="' + bookmarkLink + '" CLASS="pageutility"><font face="Verdana, Arial, Helvetica, sans-serif" size="1">Bookmark Us</font></A></TD></TR></TABLE>';
document.write(bookmarkButton);
}
}


function printPageOLD() {	
if (window.print) {
  window.print();
  //window.close(); 
}else{ 
  alert("Please use your browser's \"Print\" button to print this page.")
}
}

function printpage() {
var pagetoprint = "http://www.growthtrac.com/printpage.php?page="+escape(window.location);
document.write('<table cellpadding="0" cellspacing="0" border="0"><tr><td><a href="' +pagetoprint+ '"><img src="http://www.growthtrac.com/images/icon_print3.gif" width="102" height="12" border="0" alt="Print this Page"></a></td></tr></table>');
}



function printfriendly_OLD2() {
var pagetoprint = "/cgi-bin/masterpfp.cgi?doc="+escape(window.location);
	
}

function printfriendly_OLD() {
var pagetoprint = "/cgi-bin/masterpfp.cgi?doc="+escape(window.location);
document.write('<TABLE CELLPADDING="0" CELLSPACING="0" BORDER="0"><TR><TD><A HREF="' +pagetoprint+ '"><IMG SRC="' + BASE + '/images/icon_print.gif" WIDTH="20" HEIGHT="20" BORDER="0" ALT="Print this Page"></A></TD><TD><A HREF="' +pagetoprint+ '" CLASS="pageutility"><font face="Verdana, Arial, Helvetica, sans-serif" size="1">Print this Page</font></A></TD></TR></TABLE>');
}



/*
 * flash detect
 */

var isFlash = 0;
if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] ) {
	var plugin = navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin;
	if (plugin && parseInt(plugin.description.substring(plugin.description.indexOf(".") - 1)) >= 4) isFlash = 1;
} else if (CLIENT != "netscape" && navigator.userAgent.indexOf("Windows 3.1") == -1) {
	document.write('<SCRIPT LANGUAGE=VBScript\>\n');
	document.write('on error resume next\n');
	document.write('isFlash = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4")))\n');
	document.write('</SCRIPT\>\n');
}

/*
 * popup cookie ********************************
 */


<!-- Begin
var expDays = 15; // number of days the cookie should last

var page    = "http://www.growthtrac.com/pop_eharmony.php";
var windowprops  = "width=550,height=320,location=no,toolbar=no,menubar=no,scrollbars=no,resizable=no";

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
var path = (argc > 3) ? argv[3] : null;  
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
var count = GetCookie('count')
if(count == null) {
SetCookie('count','1')
return 1
}
else {
var newcount = parseInt(count) + 1;
DeleteCookie('count')
SetCookie('count',newcount,exp)
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
var count = GetCookie('count');
if (count == null) {
count=1;
SetCookie('count', count, exp);

window.open(page, "", windowprops);

}
else {
count++;
SetCookie('count', count, exp);
   }
}


/*
 * 20-april-2004 (Below) launchpopup is for eHarmony flash popup on Premarried channel********************************
 */

function launchpopup() {
if ( browserAcceptsCookies() && isFlash ) 
  checkCount(); }
 

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

//  End -->


function toggleBox(szDivID, iState) // 1 visible, 0 hidden
{
    if(document.layers)	   //NN4+
    {
       document.layers[szDivID].visibility = iState ? "show" : "hide";
    }
    else if(document.getElementById)	  //gecko(NN6) + IE 5+
    {
        var obj = document.getElementById(szDivID);
        obj.style.visibility = iState ? "visible" : "hidden";
    }
    else if(document.all)	// IE 4
    {
        document.all[szDivID].style.visibility = iState ? "visible" : "hidden";
    }
}

function emailFriend4() {
var newpage = "http://www.growthtrac.com/test_emailfriend.php" +
"?" +
"title=" + escape(document.title) +
"&" +
"fullpath=" + escape(window.location);
window.open (newpage,'name','scrollbars=no,status=no,resizable=no,width=535,height=515');
     
}
 

function emailFriend_generic() {
var newpage = "http://www.growthtrac.com/emailfriend_generic.htm" +
"?" +
"title=" + escape(document.title) +
"&" +
"fullpath=" + escape(window.location);
window.open (newpage,'name','scrollbars=no,status=no,resizable=no,width=635,height=515');
}	 

function emailFriend_devo() {
var newpage = "http://www.growthtrac.com/emailfriend_devopop.htm" +
"?" +
"title=" + escape(document.title) +
"&" +
"fullpath=" + escape(window.location);
window.open (newpage,'name','scrollbars=no,status=no,resizable=no,width=535,height=415');
}	

function emailFriend_church() {
var newpage = "http://www.growthtrac.com/emailfriend_churchpop.htm" +
"?" +
"title=" + escape(document.title) +
"&" +
"fullpath=" + escape(window.location);
window.open (newpage,'name','scrollbars=no,status=no,resizable=no,width=535,height=415');
}

function emailFriend() {
var newpage = "http://www.growthtrac.com/emailfriend.htm" +
"?" +
"title=" + escape(document.title) +
"&" +
"fullpath=" + escape(window.location);
window.open (newpage,'name','scrollbars=no,status=no,resizable=no,width=535,height=515');
     
}

function emailFriend_multi() {
var newpage = "http://www.growthtrac.com/emailfriend_multi.htm" +
"?" +
"title=" + escape(document.title) +
"&" +
"fullpath=" + escape(window.location);
window.open (newpage,'name','scrollbars=no,status=no,resizable=no,width=635,height=515');
     
}

 function audit() {
  session_start();
  $digit = $_SESSION['digit'];
  $userdigit = $_POST['userdigit']; 
  session_destroy();   
  
  if (($digit == $userdigit) && ($digit > 1)) {
    return true;
  } else {
    return false;
  }
 
}



