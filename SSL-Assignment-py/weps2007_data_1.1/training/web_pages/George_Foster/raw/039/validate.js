//<script>
//Form validation functions
//Author: Dylan Schorer
//*NOTE: FormValidator function was only supported by IE browsers
// It was modified on 01/16/2003 to add non-ie compatible code (Susmita Kundu)
/* 12/05/2002 Jayashree Nagaraj. 
	Changed Validate.js to parse through all the form 
	elements and validate and concatenate the error messages and pass it back 
	to the calling function rather than display the alert directly as the 
	calling function may have other checks to make.
    Also added a new elements to the input tags called "required" that can be set to
	"yes" if its a required field. This way valdiateform can do both the required field validation
	as well as validate the format of the input value if there any.

*** Modified by   : InApp ***
Modified on   : 06/27/2003
Purpose       :Added  regular expression RegExpDict.url to validate  url
Contact email : stanfordjobs@inapp.com

*** Modifications *** 

*/
/*****************************************************************************/
//Usage:
// Use either the function checkForm from the calling page direclty if only
// generic validation is required.
// If there are additional validations to be done at the calling page, use the 
// function validateForm. Further usage instructions mentioned at the function
//level
/*****************************************************************************/

var ns4 = (document.layers)? true:false
var ie4 = (document.all)? true:false
/*****************************************************************************/
/*
This function wraps core validation functions with the additional objective of achieving cross-browser compatibility
It is called from the caller app. with an input parameter that will either be a form object in case of IE or 
 null in case of non-IE browsers
In the latter case validation will occur over an array of custom form element objects which is populated from the caller App.
The earlier usage :
	Write a function in the calling page in form tag: onsubmit="return checkForm(this)" 
will continue to work, but only in IE
Input parameter - theForm (contains the form object in case of IE and null in case of NON-IE browsers
Returns - true/false
*/
var g_objFormElementArr = null;

function checkForm(theForm){
			   var sMsg;
			   //theForm is null in case of Non-IE browsers - In that case validation is done on array of custom form element object
			   if (theForm!=null) {
				   sMsg = validateForm(theForm);
			   } else {
				   //In this case validation is done on array of custom form element object if it exists. The array is populated from the caller app.
				   //In case the array is null - no validation takes place. This has been done for backward compatibility
				   if (g_objFormElementArr!=null){
					   sMsg = validateObjArray(g_objFormElementArr);
				   } 
			   }			
				if (sMsg == "")	{
					return true;
				}else {
					alert(sMsg);
					return false;
				} 
}

/*****************************************************************************/
/* Function checkForm(myForm)
   If only basic validation is required, use this function. 
	Usage: 
	Write a function in the calling page in form tag: onsubmit="return checkForm(this)"
*/
/*****************************************************************************/

/*
Form validator. Return the error messages as a string to display to the user if any validation fails
Usage: 
	Write a function in the calling page in form tag: onsubmit="return myCheckForm(this)"		
		function myCheckForm()
			{
			   var sMsg;
			   sMsg = validateForm(document.forms[0]);
			
				if (sMsg == "")	{
					return true;
				}else {
					alert(sMsg);
					return false;
				} 
			}	

					
To input field, add "validator", "requiredd" and "label" attributes as in:
<input type="text" name="startdate" validator="date" label="Start Date" required="yes">
*/
/*****************************************************************************/


//Called from caller App. initialize array
function initArray(){
	g_objFormElementArr = new Array();
}

/*
This is a custom form element structure. 
The names of the properties are the same as the attributes used in the <INPUT> tags
*/
function FormElement() {
	  this.value = "";
	  this.validator = "";
	  this.required = "";
	  this.label = "";
}

/*
This function -
1. Populates A custom form element object - i.e. sets its various properties
2. Adds it to the global array of custom form element objects
*/
function fillObject(strValue, strValidator, strRequired, strLabel) {
	g_objFormElement = new FormElement();  
	g_objFormElement.value = strValue ;
	g_objFormElement.validator = strValidator;
	g_objFormElement.required = strRequired;
	g_objFormElement.label = strLabel;
	g_objFormElementArr[g_objFormElementArr.length] = g_objFormElement;
	g_objFormElement = null;
}

/****************************************************************************
Datatype validations:
	number, num
	date, dat
	email
	url
	time
	zip
	zipUK
	time
	alpha
	alphanumeric
	creditcard
	numberPositive

when required="yes", required field validation is one.
*****************************************************************************/

function validateForm(theForm) {
	var elArr = theForm.elements; 
	var sMsg = "";
	sMsg = validateObjArray(elArr);
	if (sMsg.trim()== "") {
		return "";
	} else {
		return sMsg;
	}	
}

function validateObjArray(theArray) {
	var sMsg = "";
	var elArr = theArray; 
	for(var i = 0; i < elArr.length; i++) {
		with(elArr[i]) {
			var value = elArr[i].value;
			value=value.trim()					
			//Required Field Validation First
			var req = elArr[i].required;
			var reqValid = true;
			if(req) {
				req = String(req).toLowerCase();
				if (req=="yes") {//required field validation
					reqValid = chkrequired(value);
				}
				if(!reqValid) {
					var l = elArr[i].label;
					sMsg = sMsg.trim() + alertMsg(elArr[i],l,"req");
				}	
			} 
			if ((reqValid) && (value != "") ) {
				//Other validation
				var v = elArr[i].validator;
				if(!v) continue; 
				v = String(v).toLowerCase();
			
				if(v=="date"){
					var valid = validDate(value); 				
				} else {
					if(v=="num" || v=="number"){
						var valid = validNumber(value); 				
					}else{ //use regular expression
						var thePat = RegExpDict[v]; 
						var valid = thePat.exec(value); 
					}
				}
				if(! valid){
					var l = elArr[i].label			
					sMsg = sMsg.trim() + alertMsg(elArr[i],l,v)								
				}
			}
		}
	}
	if (sMsg.trim()== "") {
		return "";
	} else {
		return sMsg;
	}	
}

/*****************************************************************************/
// internal functions
//trim leading and trailing spaces
//use as: var sNewString = sMyString.trim();
/*****************************************************************************/
function String_trim(){
	var str=String(this);
	while(''+str.charAt(0)==' ') { str=str.substring(1,str.length) }
	while(''+str.charAt(str.length-1)==' ') { str=str.substring(0,str.length-1) }
	return str;	
}
String.prototype.trim=String_trim;

/*****************************************************************************/
//internal function
//highlight field and display alert;
/*****************************************************************************/
function alertMsg(field,label,type){
if(ie4){ field.style.backgroundColor="#FFFF33";}
	
	if(type=="req" || type=="required"){
		return(label + " is required!\n")}
	else{
		return(label + " should be a valid " + friendlyDatatypeName(type) + "!\n")	}
	
}
/*****************************************************************************/
//internal function
/*****************************************************************************/
function clearAlert(field){
	if(ie4){ field.style.backgroundColor="#FFFFFF";} //set back to white
}


/*****************************************************************************/
//internal function
/*****************************************************************************/
function validEmail(str)		{ return RegExpDict.email.test(str.trim())}
function validUrl(str)	        	{ return RegExpDict.url.test(str.trim())} // ***InApp 08/27/2003 ***

function validPassword(str)		{ return RegExpDict.goodPassword.test(str.trim())	}
function posInteger(str)		{ return RegExpDict.numberPositive.test(str.trim()) }
function validAlpha(str)		{ return RegExpDict.alpha.test(str.trim())			}
function validAlphanumeric(str)		{ return RegExpDict.alphanumeric.test(str.trim())	}
/*function validDate(str)			{ return RegExpDict.date.test(str.trim())	} */
function validZIP(str){
	var ok = RegExpDict.zip.test(str.trim());
	if(!ok) ok = RegExpDict.zipUK.test(str.trim());
	return ok;
}
function chkrequired(str){
	if(str.trim()=='') return(false);
	else return(true);
}

function validNumber(val){ return(! isNaN(val) ); }

function friendlyDatatypeName(datatype){
	switch(datatype){
		case "NUM": return("number")
		case "DAT": return("date")
		default: return(datatype);
	}
}


function validDate(str){
var delim = "/";
var Datevalue = "";
var day;
var month;
var year;
var leap = 0;
var retVal = true;
   err = 0;
   DateValue = str;
   

	month = DateValue.substr(0,DateValue.indexOf("/"));
	DateValue = DateValue.substr((DateValue.indexOf("/")+1), DateValue.length);

	day = DateValue.substr(0,DateValue.indexOf("/"));
	year = DateValue.substr((DateValue.indexOf("/")+1), DateValue.length);


	/* DO NOT REMOVE the 4-digit check of the year, ASP errors will result for some application.*/
	if (isNaN(month) || isNaN(day) || isNaN(year) || (year.length != 4)) {
		retVal = false
	}
	
	/* Validation of year, this is the range of smalldatetime data type for SQL server.*/
   if ((year < 1900) || (year > 2078)) {
      retVal = false;
   }

   /* Validation of month*/
   if ((month < 1) || (month > 12)) {	
      retVal = false;
   }

   /* Validation of day*/
   if (day < 1) {
      retVal = false;
   }

   /* Validation leap-year / february / day */
   if ((year % 4 == 0) || (year % 100 == 0) || (year % 400 == 0)) {
      leap = 1;
   }
   if ((month == 2) && (leap == 1) && (day > 29)) {
      retVal = false;
   }
   if ((month == 2) && (leap != 1) && (day > 28)) {
      retVal = false;
   }

   /* Validation of other months */
   if ((day > 31) && ((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) ||(month == 10) || (month == 12) )) {
      retVal = false;
   }
   if ((day > 30) && ((month == 4) || (month == 6) || (month == 9) ||(month == 11))) {
      retVal = false;
   }
   return retVal 
}


//******************************************
//* regular expression patterns dictionary
//******************************************
var RegExpDict = new Object();
	//matches three different formats of postal codes: 5 digit US ZIP code, 5 digit US ZIP code + 4, and 6 digit alphanumeric Canadian Postal Code. 
	RegExpDict.zip = /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/; 
	RegExpDict.zipUK =/^[a-zA-Z]{1,2}[1-9][0-9A-Za-z]{0,1} {0,1}[0-9][A-Za-z]{2}$/;

	// matches $17.23 or $14,281,545.45 or ...
	RegExpDict.currency = /\$\d{1,3}(,\d{3})*\.\d{2}/;

	// matches 5:04 or 12:34 but not 75:83
	RegExpDict.time = /^([1-9]|1[0-2]):[0-5]\d$/;

	//matched email Address
	RegExpDict.email = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; 

// ***InApp 08/27/2003 ***
	//matches url address
	RegExpDict.url=/^([(http|ftp):\/\/(www\.)]|[a-z0-9\.\-])+\.(com|edu|biz|org|gov|int|info|mil|net|name|museum|coop|aero|[a-z][a-z])\b(\d+)*(\/[^;"'<>()\[\]{}\s\x7f-\xff]*([.,?]+[^;"'<>()\[\]{}\s\x7f-\xff]+)*)?$/;
	
	
//The password's first character must be a letter, it must contain at least 4 characters and no more than 15 characters and no characters other than letters, numbers and the underscore may be used 
	RegExpDict.goodPassword = /^[a-zA-Z]\w{3,14}$/;

	//Matches any alphanumeric string (no spaces). 
	RegExpDict.alphanumeric = /^[a-zA-Z0-9]+$/;

	//Matches any alpha only
	RegExpDict.alpha = /^[a-zA-Z]+$/;

	//Credit card validator. checks that the format is either 16 numbers in groups of four separated by a &quot;-&quot; or a &quot; &quot; or nothing at all. 
	RegExpDict.creditCard = /^(\d{4}[- ]){3}\d{4}|\d{16}$/;

	//positive integer
	RegExpDict.numberPositive = /^\d+$/; 
	

/********************More NON-IE Browser compatibility stuff********/
/** trim() frunction is absent in IE4.x **/

//Leading space trim
function ltrim(inStr) {
	return inStr.replace(/^\s*/, "");
}


//Trailing space trim
function rtrim(inStr) {
	return inStr.replace(/\s*$/, "");
}


//Space trim
function trim(inStr) {
	return rtrim(ltrim(inStr));
}

/********************************************************************/

    

