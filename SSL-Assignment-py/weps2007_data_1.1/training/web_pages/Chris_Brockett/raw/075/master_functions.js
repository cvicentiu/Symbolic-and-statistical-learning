var agt=navigator.userAgent.toLowerCase();

var is_major = parseInt(navigator.appVersion);
var is_minor = parseFloat(navigator.appVersion);

var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
            && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
						&& (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
var NS4 = (is_nav && (is_major >= 4));
var is_ie   = (agt.indexOf("msie") != -1);
var is_ie3  = (is_ie && (is_major < 4));
var is_ie4  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")==-1) );
var IE4  = (is_ie  && (is_major >= 4));
var IE5  = (is_ie  && !is_ie3 && !is_ie4);
var ver4 = (NS4 || IE4) ? true : false;
var is_mac = (agt.indexOf("mac")!=-1);

function NewWindow(bredde,hoyde,url) {
	var oNewWin = window.open(url,"ShowProdWindow","menubars=0,scrollbars=1,resizable=1,height=" + hoyde + ",width=" + bredde + ",top=0,left=0,screenX=0,screenY=0");
	oNewWin.focus();
}
function NewWindowMultimedia(bredde,hoyde,url) {
	window.open(url,"ShowProdWindow","menubars=0,scrollbars=1,resizable=1,height=" + hoyde + ",width=" + bredde + ",top=0,left=0,screenX=0,screenY=0");
}
function NewWindowWMenu(bredde,hoyde,url) {
	window.open(url,"ShowProdWindowM","menubars=0,menu=1,scrollbars=1,resizable=1,height=" + hoyde + ",width=" + bredde + ",top=0,left=0,screenX=0,screenY=0");
}
function GuideWindow(url) {
	window.open(url, "","top=100,left=100,screenX=100,screenY=100,width=500,height=400,scrollbars=1,resizable=1,toolbar=0,location=0,directories=0,status=0,menubar=0,copyhistory=0,titlebar=0,dependant=1");
}
function Checkage(frmThisForm) {
	if (frmThisForm.age.selectedIndex == 0) {
		alert('COPA prohibits user registration by children below the age of 13.');
		CENewWindow("http://www.copacommission.org/",640,640,1,1,1);
		return false;
	}
}
//Date:		11/07/2005
function CheckInputData(frm) {

 var skip = false;
 if (!skip && frm.email.value == "") {
 	alert("An e-mail address is required to register. This will be your username to access nashuatelegraph.com. Without a verifiable email you will not be able to post in our forums or sign-up to receive the daily headlines newsletter.");
 	skip = true;
 }

 if (!skip && frm.email2.value =="") {
 	alert("Please confirm e-mail. This will be your username to access nashuatelegraph.com.");
 	skip = true;
  }

if (!skip && frm.email.value !== frm.email2.value) {
 	alert("Emails do not match. Please confirm the correct e-mail address appears in each field.");
 	skip = true;
  } 
 
if (!skip && frm.pwd.value =="") {
 	alert("Password is required");
 	skip = true;
 }
  
 if (!skip && frm.pwdr.value =="") {
 	alert("Please confirm password");
 	skip = true;
  }
 
if (!skip && frm.pwd.value !== frm.pwdr.value) {
 	alert("Passwords do not match. Please assure you have entered the same password in each field.");
 	skip = true;
  }
  
 if (!skip && frm.fname.value =="") {
 	alert("First Name Please");
 	skip = true;
 }
 
 if (!skip && frm.lname.value =="") {
 	alert("Last Name Please");
 	skip = true;
 }
 
 if (!skip && frm.address.value =="") {
 	alert("Street Address Required");
 	skip = true;
 }
 
 if (!skip && frm.city.value =="") {
 	alert("Town/City Required");
 	skip = true;
 }
  
   if (!skip && frm.zip.value == "") {
 	alert("Please enter your zip code");
 	skip = true;
 }
 
 if (!skip && frm.sex.value == "none") {
 	alert("Please select gender");
 	skip = true;
 }
 
 if (!skip && frm.extra_year.selectedIndex < 1) {
 	alert("Please enter birth year");
 	skip = true;
 }   
   
  if (!skip && frm.extra_newspaper.selectedIndex < 1) {
 	alert("Please select Telegraph usage");
 	skip = true;
 }
 
    
 if (!skip) {
        InitCookieSearchParams(frm);
 	pbsSetCookie(frm);
 	
 	}
 return (!skip);
}

//Date:		03/25/2002
//Purpose:	Open a new window with variables for the window options
function CENewWindow(url,width,height,menubars,scrollbars,resizable) {
	window.open(url,"","menubars=" + menubars + ",scrollbars=" + scrollbars + ",resizable=" + resizable + ",height=" + height + ",width=" + width + ",top=0,left=0,screenX=0,screenY=0");
}
//Author:	Sean Ogden
//Date:		09/27/2002
//Purpose:	Used for the two graphics' rollover in leftmenu.inc. Updated for browser compatiblilty
function SwapImg (ImgID,NewSrc) { 
	ImgID.src = NewSrc;
}
//Author:	Sean Ogden
//Date:		02/04/2002
//Purpose:	Translate the beginning Publication code and replace it with the actual newspaper name
function CETransPubCode(sPubSectionName) {
	var i;
	var aPubCodes = new Array("TT","TS","TP","DG","LE","TJ");
	var aPubNames = new Array("Times &amp; Transcript","SJ Telegraph-Journal","NB Telegraph-Journal","Daily Gleaner","L'toile","Telegraph-Journal");
	var sPubCode = sPubSectionName.substr(0,2); 				//Get the pub code (2 characters)
	var sPubCat = sPubSectionName.substr(sPubCode.length + 1);	//Get the name of the section starting after the pubcode
	
	for (i = 0; i < aPubCodes.length; i++) {
		//Translate the pub code to the full newspaper name
		if (aPubCodes[i] == sPubCode) {
			sPubCode = aPubNames[i];
			break;
		}
	}
	//Free up resources?
	aPubCodes = null;
	aPubNames = null; 
	
	//If the pub code was translated then it will be greater than 2 characters. Separate the newspaper 
	//name and category with a pipe. If there is no pubcode in the category description then send back
	//the value passed into to the function
	return (sPubCode.length > 2) ? (sPubCode + " | " + sPubCat) : sPubSectionName;
}
//Author:	Sean Ogden
//Date:		11/20/2002
//Purpose:	Send a string to the function and it overrides the title of the calling document
function CEChangePageTitle (sNewTitle) {
	if (document.title) {
		document.title = sNewTitle;
	}
}
//Author:	Sean Ogden
//Date:		01/01/2002
//Purpose:	Used for the two graphics' rollover in leftmenu.inc
//Note:		Stopped using this on 09/26/2002
/*function OLD_LowSrc_SwapImg (Img) { 
	var tempImg;

	if (Img.src == Img.lowsrc) {
		tempImg = Img.lowsrc;
		Img.lowsrc = Img.src;
		Img.src = tempImg;
	}
	else {
		tempImg = Img.src;
		Img.src = Img.lowsrc;
		Img.lowsrc = tempImg;
	}
}
*/
//Author:	Sean Ogden/Publicus
//Date:		03/11/2003
//Purpose:	open a Popup window with a calendar supplied by Saxotech Publicus
function CE_ChooseDate (frmCEForm,fldCEFormField) {
	window.open('/g/kalender_eng.html?' + frmCEForm.name + '.' + fldCEFormField.name + '&nobackdate','','menubar=0,titlebar=0,width=268,height=236');
	//document.searchform.Interval.options[document.searchform.Interval.options.length-1].selected = true;
}

//Author:	Sean Ogden
//Date:		03/25/2003
//Purpose:	Return a multi-line string with browser info
function CE_BrowserInfo() {
	return (
	"Name: " + navigator.appName + 
	"\nCodeName: " + navigator.appCodeName + 
	"\nVersion: " + navigator.appVersion.substring(0,4) + 
	"\nPlatform: " + navigator.platform + 
	"\nJavaEnabled?: " + navigator.javaEnabled() + 
	"\nScreen Width: " + screen.width + 
	"\nScreen Height: " + screen.height
	);
}

//Author:	Sean Ogden
//Date:		04/07/2003
//Purpose:	This function takes an even number of parameters in the form of VALUE, "ERROR MESSAGE" and returns a list of errors, if any
function CE_ValidateFormFields () {
	var i = 0;
	var sErrMsg = "";
	var iArgLen = CE_ValidateFormFields.arguments.length;
	var aArgs = new Array();
	
	// Assign the contents of the arguments array to a local array
	aArgs = CE_ValidateFormFields.arguments;

	// There must be an even number of function arguments passed to this function,
	// passed in the order of: field, error message
	if ((iArgLen % 2) == 1) {
		return ("Invalid number of arguments passed to validation function.\n\n");
	}

	// The number of arguments passed to the function was even
	// Loop through the arguments
	for (i; i < iArgLen; i+=2) {
		// Check text type form controls for empty string
		if ((aArgs[i].type == "text") || (aArgs[i].type == "textarea") || (aArgs[i].type == "hidden") || (aArgs[i].type == "password")) {
			// Trim leading and trailing spaces
			aArgs[i].value = CETrim (aArgs[i].value, " ");
			// Add error message if the current value is an empty string
			if (aArgs[i].value == "") {
				sErrMsg += aArgs[i+1] + "\n";
			}
		}
	}
	return sErrMsg;
}

//Author:	Andrea Link
//Date:		05/20/2004
//Purpose:	Turns floats into dollars
function NSCents(iTotal) {
	iTotal = Math.round(iTotal * 100) / 100;

	// convert number to string
	sTotal = iTotal + '';
	var sDotPointer = sTotal.indexOf('.');	
	
	if (sDotPointer < 0) { 
		return sTotal + '.00';
	} else {
		var iCents = sTotal.substring(sDotPointer + 1, sTotal.length);
		var sTotal = sTotal.substring(0,sDotPointer);
		if(iCents.length == 2) {
			return sTotal + '.' + iCents;
		} else {
			return sTotal + '.' + iCents + '0';
		}
	}
}


//Author:	Sean Ogden
//Date:		04/11/2003
//Purpose:	Trim any leading and trailing spaces. The trim variable will default to a space character if not specified
function CETrim (sString, sCharToTrim) {
	var sStartChar = "";
	var sEndChar = "";

	sCharToTrim = (sCharToTrim == "") ? " " : sCharToTrim;
	
	// Trim leading and trailing sCharToTrim characters until they are gone
	do {
		// Get the leading and trailing characters
		sStartChar = sString.charAt(0, 1);
		sEndChar = sString.charAt(sString.length - 1);
		
		// Cut any leading spaces
		sString = (sStartChar == sCharToTrim) ? sString.substr(1) : sString;
		// Cut any trailing spaces
		sString = (sEndChar == sCharToTrim) ? sString.substr(0, sString.length - 1) : sString;

	} while (sString.length > 0 && (sStartChar == sCharToTrim || sEndChar == sCharToTrim));
	
	return sString;
}
// Double space the text in a HTML textarea control for HTML e-mail submission
// Note: Moved into functions.js 20030425 SMO
function Text_DblSpace (txtString) {
	var i = 0;
	var thisArray = txtString.split("\n");
	for (i=0; i < thisArray.length; i++) {
		thisArray[i] += "\n";
	}
	// Will separate the lines the message when in HTML format
	return thisArray.join("<BR>");
}

// Return a negative number. If the referring page contains login then decrement the iBack variable. This is used in conjunction with history.go(CEPageBack());
// 20031017 SMO
function CEPageBack () {
	var sReferrer = window.document.referrer.toLowerCase();
	var iBack = -1;
	if (sReferrer.indexOf("login") > -1) {
		iBack--;
	}
	return iBack;
}

function open_popup(page) {
  if (is_nav && is_mac){
    // IS Netscape-Mac
    window_handle = window.open(page,'remote','scrollbars,resizable,width=500,height=500,left=0,top=0');
  }
  else
  {
    // NOT Netscape-Mac
    window_handle = window.open(page,'remote','scrollbars,resizable,width=100,height=100,left=0,top=0');
  }
  return false;
}
// Resize a window to the specified width and height and bring that window to the front
function myload(wide,high){
  self.resizeTo(wide,high);
  self.focus();
}

var CE_SubmitClicked = 0;
function CE_HasClicked() {
	if (CE_SubmitClicked == 1) {
		return false;
	}
}
function CE_DoSubmit(frmThisForm,NewAction) {
 	if (NewAction != "") {
 		frmThisForm.action = NewAction;
 	}
 	frmThisForm.submit();
 	CE_SubmitClicked = 1;
}

// These functions and variables belong to omista
var win=null;

function OmistaNewWindow(mypage,myname,w,h,scroll,pos)
{
	if(pos=="random")
	{
	LeftPosition=(screen.availWidth)?Math.floor(Math.random()*(screen.availWidth-w)):50;TopPosition=(screen.availHeight)?Math.floor(Math.random()*((screen.availHeight-h)-75)):50;
	}
	
	if(pos=="center")
	{
	LeftPosition=(screen.availWidth)?(screen.availWidth-w)/2:50;TopPosition=(screen.availHeight)?(screen.availHeight-h)/2:50;
	}
	
	if(pos=="default")
	{
	LeftPosition=50;TopPosition=50
	}
	else if((pos!="center" && pos!="random" && pos!="default") || pos==null)
	{
	LeftPosition=0;TopPosition=20
	}
	
	settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
	win=window.open(mypage,myname,settings);
	if(win.focus)
	{
	win.focus();
	}
}

function CloseNewWin()
{
if(win!=null && win.open)win.close()
}
window.onfocus=CloseNewWin;


/*
//*************************** UpdateCookie ***************************
 PARAMETERS:	
  CookieName   (String) The name of the cookie to set/update. 
			   Is also the name of the .js file that contains code to output.
  iMaxViews	   (Int) The maximum allowed number of views for the cookie.  Defaults to 1.
  DaysToExpire (Int) The number of days before the cookie expires. Defaults to 1.

   NOTE:		
   * A cookie is set during the last view that expires in the number of days specifed by DaysToExpire
   * ONEDAY = 1000 milliseconds * 60 seconds * 60 minutes * 24 hours = 86400000
*/ 
function UpdateCookie (CookieName, iMaxViews, DaysToExpire) {
	var ONE = 1;
	var ONEDAY = 86400000;
	var dExpiry = new Date();
	var iViews = Get_Cookie(CookieName); // Get the value of the cookie
	
	// Only show the ad when the cookie value is null or the number of views is less than the maximum allowed
	if (iViews == null || (iViews < iMaxViews)) {
		// If the cookie value read is not a number then default to 1
		// Else convert the value read to a number and increment by 1
		iViews = (isNaN(parseInt(iViews)) ? ONE : (parseInt(iViews) + ONE));
		// Set the expiry date of the cookie (in milliseconds) to 1 day times the value of DaysToExpire
		dExpiry.setUTCMilliseconds(ONEDAY * (isNaN(DaysToExpire) ? ONE : DaysToExpire));
		
		Set_Cookie(CookieName, iViews, dExpiry);
		// Write a script tag that uses the name of the cookie as the name of the file in the script tags's src. 
		// This file will contain specific code for the item being displayed.
		document.write("<SCRIPT language='JavaScript' src='/includes/ads/vokens/" + CookieName + ".js'><\/SCRIPT>");
		
		// Return a string that can be outputted from the calling function. Uncomment the return at the end of this function
		//return "<SCRIPT language='JavaScript' src='/includes/ads/vokens/" + CookieName + ".js'><\/SCRIPT>";
	}
}

//The functions Get_Cookie,Set_Cookie, Delete_Cookie were obtained from http://tech.irt.org/articles/js064/index.htm and based on the public domain cookie code produced by Bill Dortch
function Get_Cookie(name) {
    var start = document.cookie.indexOf(name+"=");
    var len = start+name.length+1;
    if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
    if (start == -1) return null;
    var end = document.cookie.indexOf(";",len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len,end));
}
function Set_Cookie(name,value,expires,path,domain,secure) {
	document.cookie = name + "=" + escape(value) +
        ( (expires) ? ";expires=" + expires.toGMTString() : "") +
        ( (path) ? ";path=" + path : "") + 
        ( (domain) ? ";domain=" + domain : "") +
        ( (secure) ? ";secure" : "");
}
function Delete_Cookie(name,path,domain) {
    if (Get_Cookie(name)) document.cookie = name + "=" +
        ( (path) ? ";path=" + path : "") +
        ( (domain) ? ";domain=" + domain : "") +
        ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

//	Copyright (C) 2000,2001 WebPlan as
//	Copyright (C) 2004 SAXoTEXH AS

	var csp_f;
	var csp_cname;
	var csp_cwork;
		
	function csp_MakeSelectCookie(fs) {
		cval = "";
		for (j=0;j<fs.length;j++) {
			if (fs[j].selected) {
				cval += "|" + fs[j].value;
			}
		}
		if (cval.length > 0) { return cval.substr(1); }
		else { return "" }
	}

	function csp_GetCheckedRadioIndex(rn) {
		fr = eval("csp_f."+rn);
		idx = -1;
		for (j=0;j<fr.length;j++) {
			if (fr[j].checked) {
				idx = j;
			}	
		}
		return idx;
	}
	
	function pbsSetCookie(excludelist) {
		var ca = new Array;
		var xl = "";
		if ((excludelist != null) && (!excludelist.name)) { xl = ","+excludelist+","; }
		for (var i=0;i<csp_f.length;i++) {
			if ((xl == "") || (xl.indexOf(","+csp_f[i].name+",") != -1)) {
				if ((csp_f[i].type == "text") || (csp_f[i].type == "password")) { 
					ca.length++;
					ca[ca.length-1] = csp_f[i].name + "=" + escape(csp_f[i].value);
				} else if ((csp_f[i].type == "select-multiple") || (csp_f[i].type == "select-one")) { 
					ca.length++;
					ca[ca.length-1] = csp_f[i].name + "=" + escape(csp_MakeSelectCookie(csp_f[i]));
				} else if (csp_f[i].type == "checkbox") {
					ca.length++;
					ca[ca.length-1] = csp_f[i].name + "=" + (csp_f[i].checked ? "1" : "0");
				} else if (csp_f[i].type == "radio") {
					if (csp_f[i].checked) {
						ca.length++;
						ca[ca.length-1] = csp_f[i].name + "=" + csp_GetCheckedRadioIndex(csp_f[i].name);
					}
				}
			}
		}
		if (ca.length > 0) {
			var cstr = ca.join("&");
			edate = new Date;
			edate.setFullYear(edate.getFullYear()+1);
			document.cookie = csp_cname + "=" + cstr + "; expires=" + edate.toGMTString() + "; path=/";
		}
	}

	function pbsRemoveCookie() {
		edate = new Date;
		edate.setFullYear(edate.getFullYear()-1);
		document.cookie = csp_cname + "=remove; expires=" + edate.toGMTString() + "; path=/";
	}

	function csp_GetCookieVal(cn) {
		val = csp_cwork.substr(csp_cwork.indexOf(cn+'='));
		val = val.substr(val.indexOf('=')+1);
		val = val.substr(0,val.indexOf('&'));
		return val;
	}
	
	function csp_CookieSetSelect(fs, cn) {
		if (document.cookie.indexOf(cn+"=") > -1) {
			val = "|"+unescape(csp_GetCookieVal(cn))+"|";
			for (k=0;k<fs.length;k++) { 
				fs[k].selected = val.indexOf("|"+fs[k].value+"|") > -1;
			}
		}
	}

    function csp_CookieSetText(fi, cn) {
		if (document.cookie.indexOf(cn+"=") > -1) {
			fi.value = unescape(csp_GetCookieVal(cn));
		}
	}

	function csp_CookieSetCheckbox(fc, cn) {
		if (document.cookie.indexOf(cn+"=") > -1) {
			fc.checked = csp_GetCookieVal(cn) == "1";
		}
	}
    
	function csp_CookieSetRadio(cn) {
		if (document.cookie.indexOf(cn+"=") > -1) {
			idx = csp_GetCookieVal(cn);
			if ((idx>-1) && (eval("csp_f."+cn)[idx])) {
				eval("csp_f."+cn)[idx].checked = true;
			}
		}
	}
    
    function InitCookieSearchParams(f) {
		csp_f = f;
		if (csp_f.cookiename) {
			csp_cname = csp_f.cookiename.value;
		} else {
			csp_cname = f.name;
		}
		if (document.cookie.indexOf(csp_cname+"=") != -1) {
			csp_cwork = document.cookie.substr(document.cookie.indexOf(csp_cname+"=")+csp_cname.length+1);
			if (csp_cwork.indexOf(";") != -1) { csp_cwork = csp_cwork.substr(0,csp_cwork.indexOf(";")) }
			csp_cwork += "&";
			for (i=0;i<csp_f.length;i++) {
				if (csp_f[i].type == "text") { csp_CookieSetText(csp_f[i], csp_f[i].name); }
				else if ((csp_f[i].type == "select-multiple") || ((csp_f[i].type == "select-one"))) { csp_CookieSetSelect(csp_f[i], csp_f[i].name); }
				else if (csp_f[i].type == "checkbox") {	csp_CookieSetCheckbox(csp_f[i], csp_f[i].name); }
				else if (csp_f[i].type == "radio") { csp_CookieSetRadio(csp_f[i].name); }
				else if (csp_f[i].type == "password") { csp_CookieSetText(csp_f[i], csp_f[i].name); }
			}
		}
	}

    function InitCookieSearchParamsOnly(f) {
		csp_f = f;
		if (csp_f.cookiename) {
			csp_cname = csp_f.cookiename.value;
		} else {
			csp_cname = f.name;
		}
	}

	if (document.searchform) { 
		InitCookieSearchParams(document.searchform)
	}
	
function DoPrint () {
 var f = document.searchform;
 f.action = "events?category=print";
 f.submit();
}
 
function ResetDate () {
 if (document.searchform.Interval.selectedIndex != (document.searchform.Interval.options.length-1))
 {
  document.searchform.dateselected.value = "";
 }
}
 
function choosedate () {
 window.open('/g/kalender_eng.html?searchform.dateselected','','menubar=0,titlebar=0,width=268,height=236');
 document.searchform.Interval.options[document.searchform.Interval.options.length-1].selected = true;
}

function OpenPlaceMyAdWindow(FileName, WindowWidth, WindowHeight) {
        PlaceMyAdWindow = open(FileName,"PlaceMyAdWindow","scrollbars=yes,resizable=yes,status=yes,height=" + WindowHeight + ",width=" + WindowWidth);
}
//-->


//circpopup

var expDays = 1; // number of days the cookie should last

var page = "/static/popup.htm";
var page1 = "/static/popunder.htm";

var windowprops = "width=300,height=720,location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=no";

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

window.open(page1, "", windowprops);

}
else {
count++;
SetCookie('count', count, exp);
   }
}
//  End -->


 

function openpopup(){

//configure

window.open("/static/popup_circ.htm","","width=720,height=350,location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=no")

}

 

function get_cookie(Name) {

  var search = Name + "="

  var returnvalue = "";

  if (document.cookie.length > 0) {

    offset = document.cookie.indexOf(search)

    if (offset != -1) { // if cookie exists

      offset += search.length

      // set index of beginning of value

      end = document.cookie.indexOf(";", offset);

      // set index of end of cookie value

      if (end == -1)

         end = document.cookie.length;

      returnvalue=unescape(document.cookie.substring(offset, end))

      }

   }

  return returnvalue;

}



function loadpopup(){

if (get_cookie('popped')==''){

openpopup()

document.cookie="popped=yes"

}

}

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2006 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16.push(key+"="+_18[key]);}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}return _23;};deconcept.PlayerVersion=function(_27){this.major=_27[0]!=null?parseInt(_27[0]):0;this.minor=_27[1]!=null?parseInt(_27[1]):0;this.rev=_27[2]!=null?parseInt(_27[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_29){var q=document.location.search||document.location.hash;if(q){var _2b=q.substring(1).split("&");for(var i=0;i<_2b.length;i++){if(_2b[i].substring(0,_2b[i].indexOf("="))==_29){return _2b[i].substring((_2b[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2d=document.getElementsByTagName("OBJECT");for(var i=_2d.length;i>0;i--){_2d[i].style.display="none";for(var x in _2d[i]){if(typeof _2d[i][x]=="function"){_2d[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);}if(Array.prototype.push==null){Array.prototype.push=function(_30){this[this.length]=_30;return this.length;};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject; 

if(typeof asual=="undefined"){var asual=new Object();}if(typeof
asual.util=="undefined"){asual.util=new Object();}asual.util.Browser=new
function(){var
_1=navigator.userAgent;this.supported=false;this.ie=false;this.gecko=
false;this.safari=false;this.opera=false;if(/MSIE/.test(_1)){this.ie=
true;this.supported=parseFloat(_1.substring(_1.indexOf("MSIE")+4))>=6;}
else{if(/AppleWebKit/.test(_1)){this.safari=true;this.supported=
parseFloat(_1.substring(_1.indexOf("Safari")+7))>=312;}else{if(/Opera/.
test(_1)){this.opera=true;this.supported=parseFloat(navigator.appVersion
)>=9.02;}else{if(/Firefox/.test(_1)){this.gecko=true;this.supported=
parseFloat(_1.substring(_1.indexOf("Firefox")+8))>=1;}else{if(/Camino/.
test(_1)){this.gecko=true;this.supported=parseFloat(_1.substring(_1.
indexOf("Camino")+7))>=1;}else{if(/Netscape/.test(_1)){this.gecko=true;
this.supported=parseFloat(_1.substring(_1.indexOf("Netscape")+9))>=8;}
else{if(/Mozilla/.test(_1)&&/rv:/.test(_1)){this.gecko=true;this.
supported=parseFloat(_1.substring(_1.indexOf("rv:")+3))>=1.8;}}}}}}}};
asual.util.Cookie=new function(){this.write=function(_2){var _3=new
Date();_3.setTime(_3.getTime()+(3*8640000));var _4=";
expires="+_3.toGMTString();document.cookie="swfaddress="+_2+_4+";
path="+location.pathname;};this.read=function(){var _5="swfaddress=";var
_6=document.cookie.split(";");for(var
i=0,c;c=_6[i];i++){while(c.charAt(0)=="
"){c=c.substring(1);}if(c.indexOf(_5)==0){return
c.substring(_5.length);}}};};asual.util.Functions=new
function(){this.extend=function(_9,_a){function
inheritance(){}inheritance.prototype=_9.prototype;_a.prototype=new
inheritance();_a.prototype.constructor=_a;_a.superConstructor=_9;_a.
superClass=_9.prototype;return
_a;};this.bindAsListener=function(_b,_c,_d){return function(_e){return
_b.call(_c,_e||((_d)?_d.event:window.event));};};};asual.util.Events=new
function(){var _f=new
Array();this.addListener=function(obj,_11,_12){if(obj.addEventListener){
obj.addEventListener(_11,_12,false);}else{if(obj.attachEvent){obj.
attachEvent("on"+_11,_12);}else{obj["on"+_11]=_12;}}_f.push({o:obj,t:_11
,l:_12});};this.removeListener=function(obj,_14,_15){if(obj.
removeEventListener){obj.removeEventListener(_14,_15,false);}else{if(obj
.detachEvent){obj.detachEvent("on"+_14,_15);}else{obj["on"+_14]=_15;}}};
var _16=function(){for(var
i=0,evt;evt=_f[i];i++){asual.util.Events.removeListener(evt.o,evt.t,evt.
l);}};if(asual.util.Browser.ie||asual.util.Browser.safari){this.
addListener(window,"unload",asual.util.Functions.bindAsListener(_16,this
));}};asual.SWFAddress=new function(){var _19,_1a,_1b;var _1c;var
_1d;var _1e=document.title;var _1f=history.length;var _20=new
Array();var js="swfaddress.js";var _22="swfaddress.html";var
_23=location.hash;var
_24=function(){if(asual.util.Browser.safari){if(_1f!=history.length){_1f
=history.length;if(typeof
_20[_1f-1]!="undefined"){_23=_20[_1f-1];}_25();}}else{if(asual.util.
Browser.ie){if(_23!=location.hash){asual.SWFAddress.setValue(location.
hash.replace(/#/g,""));}if(document.title!=_1e){asual.SWFAddress.
setTitle(_1e);}}else{if(_23!=location.hash){_23=location.hash;_25();}}}}
;var _25=function(){var
_26=_23.replace(/#/g,"");if(_26!=_1c){_1c=_26;if(document&&document.
getElementById(_1d)){document.getElementById(_1d).setSWFAddressValue(_26
);}}};var
_27=function(){if(_19.contentWindow&&_19.contentWindow.location){var
win=_19.contentWindow;win.document.title=top.document.title=_1e;var
src=win.location.href;if(src.indexOf("?")>-1){_23="#"+src.substring(src.
indexOf("?")+1);}else{_23="#";}if(_23!=location.hash){_25();location.
hash=_23;}}};var
_2a=function(){if(asual.util.Browser.ie||asual.util.Browser.safari){var
_2b=document.createElement("div");_2b.id="swfaddress";var
_2c=document.getElementsByTagName("script");for(var
i=0,s;s=_2c[i];i++){if(s.src.indexOf(js)>-1){_22=(new
String(s.src)).replace(js,_22);}}_2b.innerHTML="<iframe
id=\"swfaddress-iframe\" src=\""+_22+location.hash.replace(/#/g,"?")+"\"
frameborder=\"no\"
scrolling=\"no\"></iframe>";document.body.appendChild(_2b);_2b.style.
position="absolute";_2b.style.left=_2b.style.top="-9999px";_19=_2b.
getElementsByTagName("iframe")[0];}if(asual.util.Browser.ie){asual.util.
Events.addListener(_19,"load",asual.util.Functions.bindAsListener(_27,
this));}if(asual.util.Browser.safari){_1a=document.createElement("form")
;_1a.id="swfaddress-form";_1a.method="get";_1a.innerHTML+="<textarea
id=\"swfaddress-textarea\"></textarea>";_2b.appendChild(_1a);_1b=_1a.
getElementsByTagName("textarea")[0];var
_2f=asual.util.Cookie.read();if(_1b.value!=""){_20=_1b.value.split(",");
}else{if(typeof
_2f!="undefined"){_20=_2f.split(",");}}}};this.getId=function(){if(!
asual.util.Browser.supported){return;}return
_1d;};this.setId=function(id){if(!asual.util.Browser.supported){return;}
_1d=id;};this.getTitle=function(){if(!asual.util.Browser.supported){
return;}return
_1e;};this.setTitle=function(_31){if(!asual.util.Browser.supported){
return;}if(_31=="null"){_31="";}if(typeof
_31!="undefined"){_1e=_31;top.document.title=_1e;}};this.getValue=
function(){if(!asual.util.Browser.supported){return;}var
_32=_23.replace(/#/gi,"");return
_32;};this.setValue=function(_33){if(!asual.util.Browser.supported){
return;}if(_33=="null"){_33="";}if(_1c==_33){return;}var
_34;if(document&&document.getElementById(_1d)){_34=document.
getElementById(_1d).getSWFAddressValue();if(_34=="null"){_34="";}}_23="#
"+_33;if(_34==_33){_1c=_33;_25();}else{_25();_1c=_33;}if(asual.util.
Browser.safari){_1a.action=_23;_20[history.length]=_23;_1b.value=_20;
asual.util.Cookie.write(_20);_1f=history.length+1;_1a.submit();}else{
location.hash=_23;}if(asual.util.Browser.ie){var
win=_19.contentWindow;var
_36="?"+_23.substring(_23.indexOf("#")+1);win.location.assign(win.
location.pathname+_36);}};if(!asual.util.Browser.supported){return;}if(
asual.util.Browser.safari){for(var
i=1;i<_1f;i++){_20.push("");}_20.push(location.hash);}if(asual.util.
Browser.ie){if(_23==""){location.hash="#";}}setInterval(_24,50);asual.
util.Events.addListener(window,"load",asual.util.Functions.
bindAsListener(_2a,this));_1c=this.getValue();_25();};asual.
SWFAddressObject=asual.util.Functions.extend(deconcept.SWFObject,
function(swf,id,w,h,ver,c,_3e,_3f,_40,_41){asual.SWFAddressObject.
superConstructor.apply(this,arguments);asual.SWFAddress.setId(id);});
SWFObject=deconcept.SWFObject=asual.SWFAddressObject;SWFAddress=asual.
SWFAddress;
