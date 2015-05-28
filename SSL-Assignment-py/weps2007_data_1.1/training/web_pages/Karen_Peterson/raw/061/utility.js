// Utility.js - Copyright (c) 2000, 2001, 2002 Gartner Inc.  All rights reserved.
// Modified clickBetaSearchLink() method to open BetaSearchLanding.jsp for g.com 6.12
// --Shrileckha Chaithanya

// Modified showEntitlementMessagePopup() to include the layering code.
//-- 11/15/2006. Shrileckha Chaithanya

// global variables
var signinPopup;
var librarianPopup;
var winCTR;
var strzCode = new String("z").charCodeAt(0);
var strZCode = new String("Z").charCodeAt(0);
var straCode = new String("a").charCodeAt(0);
var strACode = new String("A").charCodeAt(0);
var popUrl="/0_admin/UsageEntitlementMessage.jsp";


function nameForWindow(suffix) {

   // creates a name for the window based on the domain i.e. gartner.com becomes gartner_com
   // possibly not needed
   var newname = eval('document.domain') + '_' + eval('suffix');
   return newname.replace(/\./g, '_');
}


function browseDataquestCluster(n) {

   openSearch('/7_search/Search2Frame.jsp?bop=4&n=' + n + '&v=6&DQF=DQ');
}

function cleanString(str, allowExtra) {
   var rtn = "";
   for (a=0; a <str.length; a++)
   {
      charStr = str.charAt(a);
      if ((allowExtra.length > 0) && (allowExtra.indexOf(charStr) != -1))
         rtn += charStr;
      else if (isCharAlpha(charStr) || isCharNumeric(charStr))
        rtn += charStr;
   }
   return rtn;
}


function isCharAlpha(ch) {
   charCode = ch.charCodeAt(0)
   return ((charCode >= straCode && charCode <= strzCode) ||
           (charCode >= strACode && charCode <= strZCode));
}

function isCharNumeric(ch) {
   return !isNaN(parseInt(ch));
}

function isAlpha(str) {
   alpha = true
   for (a=0; a<str.length; a++) {
      charStr = str.charAt(a)
      charCode = charStr.charCodeAt(0)
      if (charStr == " "
            || (charCode >= straCode && charCode <= strzCode)
            || (charCode >= strACode && charCode <= strZCode)) {
         // do nothing
      } else {
         alpha = false;
      }
   }
   return alpha
}


function isAlphaNumeric(str) {
   for(i=0; i<str.length; i++){
      if (!isAlpha(str.charAt(i)) && !isNumeric(str.charAt(i))) {
         return false;
      }
   }
   return true;
}


function isBlank(s) {
   if ((s == ' ') || (s == '\n') || (s == '\t')) {
      return true;
   } else {
      return false;
   }
}

//checks spaces

function isSpaces(str) {
    for (a=0; a<str.length; a++){
      charStr = str.charAt(a)
      if (charStr==" ") return false
   }
   return true
}


function isNumeric(str) {
   for (a=0; a<str.length; a++){
      charStr = str.charAt(a)
      if (isNaN(parseInt(charStr))) return false
   }
   return true
}


function isValidDate(strDate) {
   intYear = parseInt(strDate.substring(0,4))
   intMonth = parseInt(strDate.substring(4,6))
   intDay = parseInt(strDate.substring(6,8))
   month_length = new Array(31,29,31,30,31,30,31,31,30,31,30,31)
   if (intMonth == 2 && intDay > 28 && (intYear%4 > 0) ) {
      return false;
   }
   if (intDay > month_length[intMonth-1]) {
      return false;
   }
   return true;
}

function trim(strText) {
   // this will get rid of leading spaces
   while (strText.substring(0,1) == ' ') {
      strText = strText.substring(1, strText.length);
   }

   // this will get rid of trailing spaces
   while (strText.substring(strText.length-1,strText.length) == ' ') {
      strText = strText.substring(0, strText.length-1);
   }
   return strText;
}

function validateEmails(emailStr,separator) {

   // splitup emails by separator
   emailArray = emailStr.split(separator);

   // loop through the array of emails
   // validating one email at-a-time
   i = 0;
   do {
      email = trim(emailArray[i]);

      if (email.length == 0 || isValidWildEMail(email) == false) {
         return false;
      }
   } while (++i < emailArray.length);

   // no bad emails found
   return true;
}

function isValidWildEMail(str) {
   var indDot = str.lastIndexOf(".");
   var indAt = str.indexOf("@");
   var semi = str.indexOf(";");
   var space = str.indexOf(" ");
   var tick = str.indexOf("`");
   var quote = str.indexOf("\"");

  // Check for invalid characters and obvious errors
  if ((semi > 0) || (space > 0) || (tick > 0) || (quote > 0)
    || (indDot == (str.length - 1)) || (indAt == 0) || (indAt == (str.length - 1)))
  {
    return false;
  }

  // If there is an @ sign, validate 2 strings
  if (indAt != -1)
  {
    if (validateString(str.substring(0, indAt), 0, false) == false)
      return false;
    if (validateString(str.substring(indAt+1), 1, false) == false)
      return false;
  }
  // Validate entire string
  else if (validateString(str, 0, true) == false)
    return false;

  return true;
}

function validateString(str, dotsRequired, wildRequired)
{
  // Check length
  if (str.length == 0)
    return false;

  // Check for illegal characters
  var semi = str.indexOf(";");
  var space = str.indexOf(" ");
  var tick = str.indexOf("`");
  var quote = str.indexOf("\"");

  // Cannot have more than one in a string
  var at = str.indexOf("@");

  if ((semi > 0) || (space > 0) || (tick > 0) || (quote > 0) || (at > 0))
    return false;

  var dotCnt = 0;
  var indDot, indWild, prevIndDot=-1;

  indDot = str.indexOf(".");
  indWild = str.indexOf("*");

  // A dot cannot be the first character in the string
  if (indDot == 0)
    return false;

  while (indDot > 0)
  {
    dotCnt++;

    // A dot cannot be the last character in the string
    if (indDot == (str.length-1))
      return false;

    // We cannot have sequential dots
    if ((prevIndDot != -1) && (indDot == (prevIndDot + 1)))
      return false;

    // Get the next dot in the string - If no more stop looping
    prevIndDot = indDot;
    indDot = str.indexOf(".", indDot + 1);
    if (indDot == -1)
      break;
  }

  // Are we required to have at least one wildcard character?
  if ((wildRequired == true) && (indWild == -1))
    return false;

  // If there is no wildcard character, we need to meet the required number of dots
  if (indWild == -1)
    return (dotCnt >= dotsRequired);
  return true;
}



function isValidPhoneNumber(s) {
   // Phone number can be empty, or may contain only: numeric digits, '(', ')', '+', '-' and spaces.
   var s1 = trim(s)
   if (s1!=null && s1!='') {
      return (s1.search(/[^0-9\(\)\-\+\ ]+/g) == -1);
   }
   return true;
}



function isValidEMail(str) {
   email = str ;
   var indDDot = email.lastIndexOf("..");
   var indDot = email.lastIndexOf(".");
   var indAt = email.indexOf("@");
   var indDAt = email.indexOf("@@");
   var semi = email.indexOf(";");
   var space = email.indexOf(" ");
   var tick = email.indexOf("`");
   var quote = email.indexOf("\"");
   if ((indDot <= 0)
         || (semi > 0)
         || (space > 0)
         || (tick > 0)
         || (quote > 0)
         || (indAt <= 0)
       || (indDAt > 0)
       || (indDDot > 0)
         || ((indDot - indAt) <= 1)
         || (indDot == (email.length - 1))) {
      return false;
   } else {
      return true;
   }
}


function isValidPassword(str) {
   alpha_count = 0
   numeric_count = 0
   for(i=0; i<str.length; i++) {
      if (isAlpha(str.charAt(i))) {
         alpha_count++;
      }
      if (isNumeric(str.charAt(i))) {
         numeric_count++;
      }
   }
   if (alpha_count && numeric_count && isAlphaNumeric(str)) {
      return true;
   } else {
      return false;
   }
}


function toAlphaNumber(checkString) {
   newString = "";
   count = 0;
   for (i = 0; i < checkString.length; i++) {
      ch = checkString.substring(i, i+1);
      if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") ||
      (ch >= "0" && ch <= "9")) {
      newString += ch;
      }
   }
   if (checkString != newString) {
      if (confirm("The value you have entered\n"
            + "contains invalid characters,\n"
            + "please correct them and resubmit.")) {
         return false;
      } else {
         return true;
      }
   }
   return true;
}




// parses a string from a starting point for a certain length
function Mid(str, start, len) {
  if (start < 0 || len < 0) {
    return "";
  }
  var iEnd, iLen = String(str).length;
  if (start + len > iLen) {
    iEnd = iLen;
  } else {
    iEnd = start + len;
  }
  return String(str).substring(start,iEnd);
}


// SEARCH RELATED
function submitSearch() {

   // initial search function
   query = document.frmSearch.txtSearch.value;

   if (validSearch(query)) {

      query = cleanupSearchKeywords(query);

      openSearch('/7_search/Search2Frame.jsp?keywords='+ query);

  }

  return false;
}

function validSearch(query) {
   // checks search string to see if it is long enough, etc

   var keywords = query;

   if (keywords.match(/[A-Z]+/g) ||
      keywords.match(/[a-z]+/g) ||
      keywords.match(/[0-9]+/g)) {

         return true;
  }

  if (keywords.match(/^ *$/g)) {

   alert('Please provide keywords for your search.');
    return false;

  }

  alert('Your search is too general.  Please provide keywords for your search.');

  return false;

}

function cleanupSearchKeywords(query) {

   // replace non-ASCII characters with html escapes... don't know why this is required
   var keywords = query;

   if (keywords!=null) {
      keywords = keywords.replace(/\%/g,"%25");
      keywords = keywords.replace(/\"/g,"%22");
      keywords = keywords.replace(/\#/g,"%23");
      keywords = keywords.replace(/\&/g,"%26");
      keywords = keywords.replace(/\'/g,"%27");
      keywords = keywords.replace(/\+/g,"%2B");
      keywords = keywords.replace(/\,/g,"%2C");
      keywords = keywords.replace(/\./g,"%2E");
      keywords = keywords.replace(/\//g,"%2F");
      keywords = keywords.replace(/\:/g,"%3A");
      keywords = keywords.replace(/\;/g,"%3B");
      keywords = keywords.replace(/\</g,"%3C");
      keywords = keywords.replace(/\=/g,"%3D");
      keywords = keywords.replace(/\>/g,"%3E");
      keywords = keywords.replace(/\?/g,"%3F");
      keywords = keywords.replace(/\@/g,"%40");
      keywords = keywords.replace(/\[/g,"%5B");
      keywords = keywords.replace(/\]/g,"%5D");
      keywords = keywords.replace(/\^/g,"%5E");
      keywords = keywords.replace(/\{/g,"%7B");
      keywords = keywords.replace(/\|/g,"%7C");
      keywords = keywords.replace(/\}/g,"%7D");
      keywords = keywords.replace(/\~/g,"%7E");
      keywords = keywords.replace(/ /g,"+");

      for (x = 0; x < keywords.length; x++) {
         d = keywords.charCodeAt(x);
         if (d == 8216 || d == 8217 || d == 8220 || d == 8221) {
            if (x == 0) {
               if (d == 8216 || d == 8217) {
                  keywords = "%27"
                     + keywords.substring(1, keywords.length);
               } else {
                  keywords = "%22"
                     + keywords.substring(1, keywords.length);
               }
            } else if (x == keywords.length) {
               if (d == 8216 || d == 8217) {
                  keywords = keywords.substring(0, x) + "%27";
               } else {
                  keywords = keywords.substring(0, x) + "%22";
               }
            } else {
               if (d == 8216 || d == 8217) {
                  keywords = keywords.substring(0, x)
                     + "%27"
                     + keywords.substring(x + 1, keywords.length);
               } else {
                  keywords = keywords.substring(0, x)
                     + "%22"
                     + keywords.substring(x + 1, keywords.length);
               }
            }
         }
      }
   }
   return keywords
}


// REGIONAL SIGN OUT

function regionalsignout(region) {

   var textStr = location.href;
   var domainStr = document.domain;
   var domainPosition = textStr.indexOf(domainStr);
   var domainPrefix = textStr.substr(0,domainPosition);
   var newPrefix = domainPrefix.replace("https","http");
   var newUrl = newPrefix + domainStr;

   document.cookie="regUC=;domain=.gartner.com;path=/;expires=Sat, 16 Nov 2002 20:29:25 UTC";
   document.cookie="regQuery=;domain=.gartner.com;path=/;expires=Sat, 16 Nov 2002 20:29:25 UTC";
   document.cookie="idForRegionals=;domain=.gartner.com;path=/;expires=Sat, 16 Nov 2002 20:29:25 UTC";
   document.cookie="unForRegionals=loggedout;domain=.gartner.com;path=/;expires=Sat, 16 Nov 2002 20:29:25 UTC";
   window.location=(newUrl + "/Terminate/doPost?locale=" + region);
   return false;
}









// POPUP FUNCTIONS
function rawPopUp(url, width, height, features, target) {

   // main raw popup
   // written by Peter Mahnke 20 May 2004
   //
   // attempt to clean up all random js popups

   var u = url;
   var t = target;
   var w = width;
   var h = height;
   var f = features;

  // return if there is no URL
  if (u == null) {
      return false;
  }

   // set up default values if none passed
   t = t ? t : "_blank";
   w = w ? w : 750;
   h = h ? h : 550;
   f = f ? f : "resizable=yes,scrollbars=yes,toolbar=no";

   // find middle x and y position of the screen
   var left = (window.screen.width - w)/2;
   var top  = (window.screen.height - h)/2;

   var newWin=null;
   var settings = 'width=' + w + ',height=' + h + ',top=' + top + ',left=' + left + ', ' + f;

   newWin = window.open(u, t, settings);
   newWin.focus();
   return(newWin);

}

function openFooterLink(href) {

	// opens Contact Us from footer
	//rawPopUp(href,'800','600','resizable=yes,scrollbars=yes,menubar=yes,status=yes','_blank');
	rawPopUp(href,'800','600','resizable=yes,scrollbars=yes,toolbar=no','_blank');

	return false;

}

// CLEANED UP POP-UPS
//  uses format   rawPopUp(url, width, height, features, target);

// HOMEPAGE
function openFaf(){

   // opens Focus Area Guide
   //   need to remove from homepage (included as a script src)
   //   should probably add url to homepage, not in script -- safer

   rawPopUp('/pages/docs/common/faf/faf.html', '735', '465', 'resizable=yes,scrollbars=no,toolbar=no');
   return false;

}

function jumper(newLoc,target) {

   // for the dropdowns that open a new page
        var newPage=newLoc.options[newLoc.selectedIndex].value;
   var target = target;

   if (newPage!="") {
      if (target!="") {
         window.open(newPage, "_self");
      } else {
         window.open(newPage, target);
         return false;
      }
   } else {
      newLoc.selectedIndex=0;
   }
   return;
}

// RESEARCH RELATED

function openResult(href) {
   // appending referrer for webtrends 
   // opens documents from anywhere on the site 
   href =  href + "&ref=g_SiteLink";
   return openResultHome(href);
}

function openResultHome(href) {
   // opens documents from homepage with no referrer (the referrer is hardcoded in hpg temp)
  rawPopUp(href,'798','569','resizable=no,scrollbars=yes,menubar=yes,resizable=yes,status=yes','_blank');
  return false;
}

//OpenDocResult - popup from homepage

function openDocResult(href){
   href =  href + "&ref=g_emalert";
   return openResultHome(href);
}


function openDocFromDoc(href) {
   // appending referrer for webtrends 
   href =  href + "&ref=g_fromdoc";

   // opens a research document from within another research document
   rawPopUp(href, '798', '569', 'scrollbars=yes,menubar=yes,resizable=yes,status=yes','_blank');
   return false;

}


function openBio(href) {

   // opens Analysts Bio
    rawPopUp(href, '579', '450', 'scrollbars=yes,resizable=yes','_blank');
   return false;

}

function popUpQuadrant(id){

   // opens MQ
   rawPopUp('/DisplayDocument?doc_cd=' + id, '798', '569', 'location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes','_blank');
   return false;

}


// ALERT RELATED
function openDeliveryPreferences(href) {

   // opens delievery preferences for alerts from Alerts page

   rawPopUp(href,'340','350','resizable=no,scrollbars=no,toolbar=no,menubar=no','alertdeliverypreferences');
  return false;

}

// TOOLBARS
function openLibrarianPopup(href) {

   // opens Librarian popup and then kills it after 50 min

   librarianPopup = rawPopUp(href,'290','430','scrollbars=no,menubar=no','LibrarianPopup');
  var killLibrarianPopup = setTimeout("librarianPopup.close()", 180000);
   return false;

}


// FOOTERS
function openAdminWindow(href) {

   // opens Gartner Admin module from rec_homepage
   // rather than figure out how big someones screen is... I just picked a largish size

   rawPopUp(href, '780', '580', ',scrollbars=yes,status=yes,resizable=yes,personalbar=no', 'AdminWindow');
  return false;

}

function openNewAdmin(href) {

   // opens Contact Us from footer

   rawPopUp(href, '632', '520', '', '_blank');
   return false;

}


function openNewAdminFooter(href) {

   // opens Ask an Analyst from footer

   rawPopUp(href, '790', '550', 'scrollbars=yes,status=yes,resizable=yes', 'askanalyst');
   return false;

}



// META-SEARCH RELATED
function validMetaSearch(query) {
	// checks search string to see if it is long enough, etc
	var keywords = query;

	if (keywords.match(/[A-Z]+/g) ||
      keywords.match(/[a-z]+/g) ||
      keywords.match(/[0-9]+/g)) {
      return true;
   }

   if (keywords.match(/^ *$/g)) {
       alert('Please provide keywords for your search.');
       return false;
   }
  alert('Your search is too general.  Please provide keywords for your search.');
  return false;
}

function openBetaSearch(href) {
	// main search pop-up
	var newname= nameForWindow('prototypesearch');
	rawPopUp(href, '1024', '768', 'scrollbars=yes,resizable=yes', newname);
  	return false;
}

function submitBetaSearch() {
	// initial search function
	var keywords = document.frmBetaSearch.txtBetaSearch.value
	if (validSearch(keywords)) {
		keywords = cleanupSearchKeywords(keywords);
		openBetaSearch('/15_search/Search2Frame.jsp?keywords='+ keywords);
   }
   return false;
}


function clickBetaSearchLink() {
	// initial search function
	//openBetaSearch('/15_search/Search2Frame.jsp');
	openBetaSearch('/15_search/BetaSearchLanding.jsp');
}


function openMetaSearch(href) {
	// main search pop-up
	var newname= nameForWindow('metasearch');
	rawPopUp(href, '750', '540', 'scrollbars=yes,resizable=yes', newname);
  	return false;
}

function submitMetaSearch() {
	// initial search function
	var keywords = document.frmMetaSearch.txtMetaSearch.value
	if (validMetaSearch(keywords)) {
		keywords = cleanupSearchKeywords(keywords);
		openMetaSearch('/meta_search/Search2Frame.jsp?keywords='+ keywords);
  }
  return false;
}


// SEARCH RELATED
function openSearch(href) {

   // main search pop-up
    var newname= nameForWindow('search');
   rawPopUp(href, '750', '540', 'scrollbars=yes,resizable=yes', newname);
  return false;

}

function openPreferences(href, windowName) {
	var newname = nameForWindow(windowName);
	newWin = window.open(href, newname,
			'width=350,height=335,resizable=no,scrollbars=no,toolbar=no,menubar=no');
	newWin.focus();
	return false;
}

function advancedSearch(){

   // opens Avanced Search tab on a search pop-up

   openSearch('/7_search/Search2Frame.jsp?op=31');
   return false;


}

function browse() {

   // opens Browse tab on a search pop-up
   openSearch('/7_search/Search3Frame.jsp?bop=6');
   return false;

}

function openSiteSearch(href) {

   // opens Site Search, which isn't released yet
  rawPopUp(href, '750', '750', 'scrollbars=yes,resizable=yes', 'siteSearch');
  return false;
}

function openSiteSearchPopup(href) {

   // opens Site Search, which isn't released yet
   rawPopUp(href, '400', '550', 'scrollbars=no,menubar=no,resizable=no,status=no','_blank');
   return false;

}

function openAllLatestResearch(){

   //opens Search with Latest Research, from homepages

   openSearch('/7_search/Search2Frame.jsp?op=10');
   return false;

}

function browseDynamicNode(n) {

   // opens Browse tree

   openSearch('/7_search/Search2Frame.jsp?bop=4&n=' + n + '&v=5');
  return false;

}



//POSSIBLY DEAD
function openTechSup(href) {
   rawPopUp(href, '625', '550', 'scrollbars=yes','_blank');
   return false;
}

function openWindow(href) {
   rawPopUp(href, '563', '550', 'scrollbars=yes','_blank');
  return false;
}

function openBlankWindow(href) {
   rawPopUp(href, '750', '450', 'toolbar=yes,location=yes,scrollbars=yes,resizeable=yes','_blank');
  return false;
}

function openAdminFooter(href) {
   rawPopUp(href, '563', '550', 'scrollbars=yes','_blank');
   return false;
}

function openNewSubAdminFooter(href) {
   rawPopUp(href, '640', '550', 'scrollbars=yes,status=yes,resizable=yes');
  return false;
}

function openAdmin(href) {
   rawPopUp(href, '563', '550', 'scrollbars=yes','_blank');
   return false;
}
function openRegistration(href) {
   rawPopUp(href, '675', '550', 'scrollbars=yes','_blank');
  return false;
}
function openNewRegWinFromSearchWin(href) {
   rawPopUp(href, '632', '520', 'scrollbars=yes','_blank');
  return false;
}









// DEAD ONES?
function openHomepagePopup(href) {
   homepagePopup = rawPopUp(href, '310', '390', 'scrollbars=no,menubar=no','_blank');
   var killPopup = setTimeout("homepagePopup.close()", 180000);
  return false;
}
function openHelp(href) {
   openNewAdmin(href);
   return false
}
function openSigninPopup(href) {
   var iMyLeft = (window.screen.width/2) - (140 + 10);
   var iMyTop = (window.screen.height/2) - (135 + 27);
   var sWinStr="left=" + iMyLeft + ",top=" + iMyTop + ",screenX=" + iMyLeft + ",screenY=" + iMyTop;
   signinPopup = window.open(href+'&parentWindow='+self.name,'LoginPopup', sWinStr + ',height=308,width=280,scrollbars=no,menubar=no');
   var killPopup = setTimeout("signinPopup.close()", 180000);
   signinPopup.focus();
}
function popUp(URL) {
   day = new Date();
  id = day.getTime();
  eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=275,height=250,left=150,top=135');");
}
function openMyLatestResearch(){
   openSearch('/7_search/Search2Frame.jsp?op=9');
   return false;
}
function advPopup(href) {
  window.open(href,"","width=568,height=600,scrollbars=yes")
  return false;
}
function openInHomepage(href) {
   var newName = nameForWindow('homepage');
   newWin = window.open(href, newName);
   newWin.focus();
}
function openAlert(href) {
   var newName = nameForWindow('homepage');
   newWin = window.open(href, newName);
   newWin.focus();
}
function openAlert(href, windowName) {
  newWin = window.open(href, windowName);
  newWin.focus();
}
function openPrivacyPolicy(href) {
   var newName = nameForWindow('homepage');
   newWin = window.open(href, newName);
   newWin.focus();
}
function openAlertFromHomePage(href) {
   var newName = nameForWindow('homepage');
   newWin = window.open(href, newName);
   newWin.focus();
}
function openGartnerDotCom(url) {
   name = nameForWindow('homepage');
   thing = window.open(url, name);
   thing.focus();
   return false;
}


// DEAD
function gPopUpCentered(url, w, h, features, target) {
   target = target ? target : "_blank";
   var left = (window.screen.width/2) - ((w/2) + 10);
   var top = (window.screen.height/2) - ((h/2) + 27);
   var dim="left=" + left + ",top=" + top +
           ",screenX=" + left + ",screenY=" + top +
           ",height="+h+",width="+w+","+features;
   window.open(url,target,dim);
}

function maximizeWin(newWin)
{
   newWin.moveTo(0,0);
   if (document.all)
      newWin.resizeTo(screen.availWidth,screen.availHeight);
   else if (document.layers || document.getElementById)
   {
      if (newWin.outerHeight < screen.availHeight || newWin.outerWidth < screen.availWidth)
      {
         newWin.outerHeight = screen.availHeight;
         newWin.outerWidth = screen.availWidth;
      }
   }
}
function getBrowserHeight() {
   if (bw.ns4){
      return window.innerHeight
   } else {
      return document.body.clientHeight
   }
}
function getBrowserWidth() {
   if (bw.ns4){
      return window.innerWidth
   } else {
      return document.body.clientWidth
   }
}
function fnCenteredWin(newURL,scrWidth,scrHeight,winFeatures,windowname) {

   var scrLeft = (window.screen.width/2) - ((scrWidth/2) + 10);
   var scrTop = (window.screen.height/2) - ((scrHeight/2) + 27);

   windowparams = "width=" + scrWidth + ",height=" + scrHeight + ",top=" + scrTop + ",left=" + scrLeft + "," + winFeatures ;
   newWin = window.open(newURL, windowname, windowparams);
   newWin.focus();
   return false;
}
// DEAD SIGN OUT FUNCTIONS
function storeNewWin( newWin ) {
   winCTR = winCTR + 1 ;
   if (winCTR > 40) {
      alert ("No more windows allowed");
      return false;
   } else  {
    childWindow[winCTR] = newWin ;
   }
}

function signout(){
   for ( i = 1; i < winCTR + 1 ; i++) {
      if(childWindow[i] != null){
         childWindow[i].close();
      }
   }
   return true;
}

function closeLogin(){
    if (signinPopup != null) {
      signinPopup.close();
    }
    if (librarianPopup != null) {
       librarianPopup.close();
    }
}


function writeCopyright() {
  document.write("&copy; 2007 Gartner, Inc. and/or its Affiliates. All Rights Reserved.");
}

function http(uri) {
  return "http://" + document.domain + uri;
}

function showEntitlementMessagePopup() {
    TB_show(null, "/0_admin/UsageEntitlementMessage.html?height=330&width=360")
	
 }

function showReverseMessagePopup(resid) {
   winattribs = 'width=460,height=180,resizable=no,scrollbars=no,toolbar=no,menubar=no'
   var newWin = window.open('/0_admin/ReverseMessage.jsp?resid='+resid,'ReverseCharge',winattribs);
   newWin.focus();
}

// example: isDefined(window, 'varNameToChek')
function isDefined(objnm, varnm)
{
  return (typeof(eval(objnm)[varnm]) != 'undefined');
}

// Removes all options from the given <Select > object
function clearOptions(theSelectObj) {

   // Clear all the dropdown fields
   if (bw.ns4 || bw.ns6) {
       theSelectObj.options.length = 0;
   } else {
       for (x = theSelectObj.length -1; x >= 0; x--) {
           theSelectObj.remove(x);
       }
   }
}


// example: showHideObj(document.mainform.textFieldName, 0)
function showHideObj(obj, val) {

  if (val == 1 && obj.style.display != 'inline'){
    obj.style.display = 'inline'
  } else if (val == 0 && obj.style.display != 'none') {
    obj.style.display = 'none'
  } else if (val == 2 && obj.style.display != 'block') {
    obj.style.display = 'block'
  }
}

// example: showHideObj(textField_ID, 0)
// example: showHideObj(textField_NAME, 0)
function showHide(name, val) {

  // Get the object to show/hide
  var datablock = document.getElementById(name);
  if (datablock == undefined) {
    datablock = document.getElementByTagName(name).item(0);
  }
  if (datablock == undefined) {
    return;
  }

  if (val == 1 && datablock.style.display != 'inline'){
    datablock.style.display = 'inline'
  } else if (val == 0 && datablock.style.display != 'none') {
    datablock.style.display = 'none'
  }
}

function isNumericKey(theTextField)
{
 var theVal = theTextField.value;
 var newVal = "";
 for (ndx=0; ndx < theVal.length; ndx++)
 {
   theChar = theVal.charAt(ndx);
   if (isNumeric(theChar))
      newVal += theChar;
 }
 if (newVal != theVal)
   theTextField.value = newVal;
}

// END OF FILE
