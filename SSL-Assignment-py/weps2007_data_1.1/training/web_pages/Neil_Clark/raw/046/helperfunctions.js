function openEmailClient(p_UserID,p_Domain,p_Subject) {
   var m_arrParameters = openEmailClient.arguments;
   
   if (m_arrParameters.length==3) {
      document.location = 'mailto:' + m_arrParameters[0] + '@' + m_arrParameters[1] + '?subject=' + m_arrParameters[2];
   } else {
      document.location = 'mailto:' + m_arrParameters[0] + '@' + m_arrParameters[1];
   }
}

function showHideContent(p_Div,p_Img) {
   var m_oDivPerformers = document.getElementById(p_Div);
   var m_oExpandIcon = document.getElementById(p_Img);
   
   if (m_oDivPerformers.style.display == 'none') {
      m_oDivPerformers.style.display = 'block';
      m_oExpandIcon.src = '/images/collapse.png';
      m_oExpandIcon.title = 'Hide Details';
   } else {
      m_oDivPerformers.style.display = 'none';
      m_oExpandIcon.src = '/images/expand.png';
      m_oExpandIcon.title = 'Show Details';
   }
   
   return true
}

function showHideMsg(p_Div,p_Img) {
   var m_MsgDivPerformers = document.getElementById(p_Div);
   var m_MsgExpandIcon = document.getElementById(p_Img);
   
   if (m_MsgDivPerformers.style.display == 'none') {
      m_MsgDivPerformers.style.display = 'block';
      m_MsgExpandIcon.src = '/images/msgcollapse.png';
      m_MsgExpandIcon.title = 'Hide Details';
   } else {
      m_MsgDivPerformers.style.display = 'none';
      m_MsgExpandIcon.src = '/images/msgexpand.png';
      m_MsgExpandIcon.title = 'Show Details';
   }
   
   return true
}

function printWindow(){
	browserVersion = parseInt(navigator.appVersion)
	if (browserVersion >= 4) window.print();
}

/* 
Function name:	setMonthNumberOfDays(oYear, oMonth, oDay)
Description:	This function adjust the number of days selection for a selected month.  
			It supports leap years and is Y2K compliant.
				
Original creator:	Ben McFarlin (mcfarlin@netscape.net) 
Web site:		http://sites.netscape.net/mcfarlin
Source:		This script and many more are available free online at 
			The JavaScript Source!! http://javascript.internet.com

Modified by:	Roaniver P. Madrid (roan.madrid@asia-hotels.com; roan_madrid@yahoo.com)
Date modified:	04-Feb-2005
Modifications:	- function name and parameters.
			- descriptive variable names.
			- added value to the "value" parameter when creating OPTION objects.
			- auto selecting the previously selected day when changing month or year.
*/
function setMonthNumberOfDays(oYear, oMonth, oDay) {
	var oSelectedDate1stDayOfTheMonth;
	var oSelectedDateLastDayOfTheMonth;
	
	var iPreviouslySelectedDay;
	var iTimeDifference, iSelectedMonthNumberOfDays;
	
	var i;
	
	try {
		iPreviouslySelectedDay = oDay.options[oDay.selectedIndex].value;
		
		oSelectedDate1stDayOfTheMonth = new Date(oYear.options[oYear.selectedIndex].value, oMonth.options[oMonth.selectedIndex].value,1);
		iTimeDifference = oSelectedDate1stDayOfTheMonth - 86400000;
		
		oSelectedDateLastDayOfTheMonth = new Date(iTimeDifference);
		iSelectedMonthNumberOfDays = oSelectedDateLastDayOfTheMonth.getDate();
		
		for (var i = 0; i < oDay.length; i++) {
			oDay.options[0] = null;
		}
		
		for (var i = 0; i < iSelectedMonthNumberOfDays; i++) {
			oDay.options[i] = new Option(i+1,i+1);
		}

		if (iSelectedMonthNumberOfDays >= iPreviouslySelectedDay) {
			oDay.options[iPreviouslySelectedDay-1].selected = true;
		} else {
			oDay.options[0].selected = true;
		}
	} catch(e) {
		return
	}
}

/* description: get the index of the selected option in radio button array. */
function selectedRadioButtonIndex(oRadioButton) {
	var iCtr,iSelectedRadioButtonIndex;
	var blnSelected = false;
	
	for(iCtr=0;iCtr<oRadioButton.length;iCtr++) {
		if (oRadioButton[iCtr].checked) {
			iSelectedRadioButtonIndex = iCtr;
			blnSelected = true;
			break;
		}
	}
		
	if (blnSelected) {
		return iSelectedRadioButtonIndex
	} else {
		return -1
	}
}

function transferSelectedList(oListFrom,oListTo) {
	var iCtr = 0;
	
	if (oListFrom.selectedIndex != -1) {
		for(iCtr=0;iCtr<oListFrom.options.length;++iCtr) {
			if (oListFrom.options[iCtr].selected) {
				oListTo.options[oListTo.options.length] = new Option(oListFrom.options[iCtr].innerText, oListFrom.options[iCtr].value);
				oListTo.options[oListTo.options.length-1].selected = true;
				oListFrom.options[iCtr] = null;
				iCtr = iCtr-1;
			}
		}
	} else {
		alert('No choices were selected for transfer');
	}
}

function emptyListBox(oListBox) {
	var iCtr;
	
	for(iCtr=0;iCtr<oListBox.options.length;iCtr++) {
		oListBox.options[iCtr] = null;
	}
}

function selectAllList(oListBox) {
	var iCtr
		
	for(iCtr=0;iCtr<oListBox.options.length;iCtr++) {
		oListBox.options[iCtr].selected = true;
	}
}

function isAllowedStringValue(argString) {
	var ValidStringExp = /\w+/;	
	
	if (argString.match(ValidStringExp)==null){
		return false
   } else {
		return true
   }
}

function trimSpaces(argString) {
	var iCtr = 0;
	var StringA = argString;
	var StringB = argString;
	
	/*comment: remove leading spaces*/
	for(iCtr=0;iCtr<StringA.length;iCtr=0) {
		if (StringA.charAt(0)!=' ') {
			break;
		} else {
			/*comment: check if the string is not all spaces*/
			if (StringA.length>1) {
				StringB = StringA.substring(1,StringA.length);
				StringA = StringB;
			} else {
				StringA = '';
			}
		}
	}
	
	/*comment: remove trailing spaces*/
	for(iCtr=StringA.length-1;iCtr>0;iCtr--) {
		if (StringA.charAt(iCtr)!=' ') {
			break;
		} else {
			StringB = StringA.substring(0,iCtr);
			StringA = StringB;
		}
	}
	
	return StringA;
}

function openWindow(URL,argWidth,argHeight) {
	var NewWindowFeatures = "width=" + argWidth + ",height=" + argHeight + ",left=5,top=5,scrollbars=yes,resizable=no";
	window.open(URL,"oNewWindow",NewWindowFeatures);
}

function getDateDiff(argDate1, argDate2) {
	iDiff = Date.parse(argDate2.toString()) - Date.parse(argDate1.toString());
	
	iInSec = iDiff / 1000;
	iMin = iInSec / 60;
	iHr = iMin / 60;
	iDay = iHr / 24;
	
	getDateDiff = iDay;
}

function sortResult(){
	var m_oSortOptions = document.frmSort.cmbSort;
	var m_oSelectedSort = document.frmSort.sort;
	
	switch(selectedRadioButtonIndex(m_oSortOptions)) {
		case 0:	m_oSelectedSort.value = 'name'; break;
		case 1: m_oSelectedSort.value = 'price'; break;
		case 2: m_oSelectedSort.value = 'star'; break;
	}
	
	document.frmSort.submit();
}

/*This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
V1.1.3: Sandeep V. Tamhankar (stamhankar@hotmail.com)
Original:  Sandeep V. Tamhankar (stamhankar@hotmail.com)
Changes:
1.1.4: Fixed a bug where upper ASCII characters (i.e. accented letters
international characters) were allowed.

1.1.3: Added the restriction to only accept addresses ending in two
letters (interpreted to be a country code) or one of the known
TLDs (com, net, org, edu, int, mil, gov, arpa), including the
new ones (biz, aero, name, coop, info, pro, museum).  One can
easily update the list (if ICANN adds even more TLDs in the
future) by updating the knownDomsPat variable near the
top of the function.  Also, I added a variable at the top
of the function that determines whether or not TLDs should be
checked at all.  This is good if you are using this function
internally (i.e. intranet site) where hostnames don't have to 
conform to W3C standards and thus internal organization e-mail
addresses don't have to either.
Changed some of the logic so that the function will work properly
with Netscape 6.

1.1.2: Fixed a bug where trailing . in e-mail address was passing
(the bug is actually in the weak regexp engine of the browser; I
simplified the regexps to make it work).

1.1.1: Removed restriction that countries must be preceded by a domain,
so abc@host.uk is now legal.  However, there's still the 
restriction that an address must end in a two or three letter
word.

1.1: Rewrote most of the function to conform more closely to RFC 822.

1.0: Original  */

function isValidEmail(emailStr) {
	
	/* The following variable tells the rest of the function whether or not
	to verify that the address ends in a two-letter country or well-known
	TLD.  1 means check it, 0 means don't. */

	var checkTLD=1;

	/* The following is the list of known TLDs that an e-mail address must end with. */

	var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/i;

	/* The following pattern is used to check if the entered e-mail address
	fits the user@domain format.  It also is used to separate the username
	from the domain. */

	var emailPat=/^(.+)@(.+)$/;

	/* The following string represents the pattern for matching all special
	characters.  We don't want to allow special characters in the address. 
	These characters include ( ) < > @ , ; : ' \ " . [ ] */

	var specialChars="\\(\\)><@,;:\\'\\\\\\\"\\.\\[\\]";

	/* The following string represents the range of characters allowed in a 
	username or domainname.  It really states which chars aren't allowed.*/

	var validChars="\[^\\s" + specialChars + "\]";

	/* The following pattern applies if the "user" is a quoted string (in
	which case, there are no rules about which characters are allowed
	and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
	is a legal e-mail address. */

	var quotedUser="(\"[^\"]*\")";

	/* The following pattern applies for domains that are IP addresses,
	rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
	e-mail address. NOTE: The square brackets are required. */

	var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;

	/* The following string represents an atom (basically a series of non-special characters.) */

	var atom=validChars + '+';

	/* The following string represents one word in the typical username.
	For example, in john.doe@somewhere.com, john and doe are words.
	Basically, a word is either an atom or quoted string. */

	var word="(" + atom + "|" + quotedUser + ")";

	// The following pattern describes the structure of the user

	var userPat=new RegExp("^" + word + "(\\." + word + ")*$");

	/* The following pattern describes the structure of a normal symbolic
	domain, as opposed to ipDomainPat, shown above. */

	var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");

	/* Finally, let's start trying to figure out if the supplied address is valid. */

	/* Begin with the coarse pattern to simply break up user@domain into
	different pieces that are easy to analyze. */

	var matchArray=emailStr.match(emailPat);

	if (matchArray==null) {

	/* Too many/few @'s or something; basically, this address doesn't
	even fit the general mould of a valid e-mail address. */

	alert("Incorrect e-mail address. (check @ and .'s)");
	return false;
	}
	var user=matchArray[1];
	var domain=matchArray[2];

	// Start by checking that only basic ASCII characters are in the strings (0-127).

	for (i=0; i<user.length; i++) {
	if (user.charCodeAt(i)>127) {
	alert("The username contains invalid characters.");
	return false;
	   }
	}
	for (i=0; i<domain.length; i++) {
	if (domain.charCodeAt(i)>127) {
	alert("The domain name contains invalid characters.");
	return false;
	   }
	}

	// See if "user" is valid 

	if (user.match(userPat)==null) {

	// user is not valid

	alert("The email username is invalid.");
	return false;
	}

	/* if the e-mail address is at an IP address (as opposed to a symbolic
	host name) make sure the IP address is valid. */

	var IPArray=domain.match(ipDomainPat);
	if (IPArray!=null) {

	// this is an IP address

	for (var i=1;i<=4;i++) {
	if (IPArray[i]>255) {
	alert("Destination IP address is invalid!");
	return false;
	   }
	}
	return true;
	}

	// Domain is symbolic name.  Check if it's valid.
					 
	var atomPat=new RegExp("^" + atom + "$");
	var domArr=domain.split(".");
	var len=domArr.length;
	for (i=0;i<len;i++) {
	if (domArr[i].search(atomPat)==-1) {
	alert("The domain name is invalid.");
	return false;
	   }
	}

	/* domain name seems valid, but now make sure that it ends in a
	known top-level domain (like com, edu, gov) or a two-letter word,
	representing country (uk, nl), and that there's a hostname preceding 
	the domain or country. */

	if (checkTLD && domArr[domArr.length-1].length!=2 && 
		domArr[domArr.length-1].search(knownDomsPat)==-1) {
		alert("The address must end in a well-known domain or two letter " + "country.");
		return false;
	}

	// Make sure there's a host name preceding the domain.

	if (len<2) {
		alert("This address is missing a hostname!");
		return false;
	}

	// If we've gotten this far, everything's valid!
	return true;
}

function Expand(){   
   if (window.document.Form1.SearchType.value=="1"){           
	   document.getElementById("OtherFields").style.display='none'; 
	   document.getElementById("Advance").style.display=''; 
   }
   else {      
      document.getElementById("OtherFields").style.display='';
	  document.getElementById("Advance").style.display='none'; 
   }   
}
/*
Added By: Abenjel D. Manlangit
Date Added: November 27,2006
Purpose: For the CD page to check if the user is logged in or not and 
to be redirected to another page if the member is logged in*/

function IsUser(strSessionMemID, strURL, v_ItemCode){
	var NewWindowFeatures = "width=800,height=600,left=5,top=5,scrollbars=yes,resizable=no";
	var strMemberLogIn = "/membership/page.login.asp?item_code=" + v_ItemCode;
	
	if (strSessionMemID.length > 0) {
		window.open(strURL,"oNewWindow",NewWindowFeatures);
		} 
	else{
		var agree = confirm("Please log in first to continue.  Do you want to log in?");
		if (agree) 
			{ 
				location.href=strMemberLogIn;
			}	
		}
}

