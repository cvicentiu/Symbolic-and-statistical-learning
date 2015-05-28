// gc_bPTPostingForm needs to be true if we're on the posting template posting form, in which
// case we do NOT want to validate type(s), so user can enter "tags" in place of values, etc.
var gc_bPTPostingForm = false;
function SetPTPostingForm() {
	gc_bPTPostingForm = true;
}

// Returns the control named sId in oForm, or null if the control 
// is not found. nIdx is set to the index of the control, or -1
// if the control is not found
function SearchControlTree(oForm, sId) {
	var oControl = null;
	if (oForm) {
		for (var i=0; oForm[i]; i++) {
			var sControlId = oForm[i].name;
			// next two lines chop off the names of parents in the control tree hierarchy
			if (sControlId.indexOf('$') != -1)
				sControlId = sControlId.substr(sControlId.lastIndexOf('$') + 1);
			if (sControlId == sId) {
				oControl = oForm[i];
				break;
			}
		}
	}
	return (oControl);
}

// Returns the form name sId in the current document
function GetForm(sId) {
	var oForm = null;
	for (var i=0; i<document.forms.length; i++) {
		var sControlId = document.forms[i].id;
		// next two lines chop off the names of parents in the control tree hierarchy
		if (sControlId.indexOf('$') != -1)
			sControlId = sControlId.substr(sControlId.lastIndexOf('$') + 1);
		else {
			// for .Net 1.1, we're setting the form name using underscores instead 
			// of colons--need to accommodate underscores instead of colons!
			if (sControlId.indexOf('_cln_') != -1) {
				sControlId = sControlId.substr(sControlId.lastIndexOf('_cln_') + 5);
			}
		}
		if (sControlId == sId) {
			oForm = document.forms[i];
			break;
		}
	}
	// hack--with .Net 1.1 hotfix KB818803 installed, ASP.Net will fix our form name
	// to __aspnetForm if it is inside of a user control (or other naming container),
	// so if we didn't find anything above--try looking for this form instead
	if (!oForm && sId != 'aspnetForm') {
		return (GetForm('aspnetForm'));
	}
	return (oForm);
}

// could update this to actually check list of valid tags, y'know ...
// could also check the tags against the type of data the tag holds ...
function bIsValidPTTag(sValue) {
	// regular replacement tags
	if ((sValue.indexOf('{{') == 0) && (sValue.indexOf('}}') == sValue.length - 2))
		return true;
	// function tags - Bug 4171
	else if ((sValue.indexOf('{{{') == 0) && (sValue.indexOf('}}}') == sValue.length - 3))
		return true;
	else
		return false;
}

function GetFormWithInputName(sInputName) {
	for (var i=0; document.forms[0]; i++) {
		if (document.forms[i][sInputName]) {
			return (document.forms[i]);
			break;
		}
	}
}

function SelectOption(oSelect, sValue) {
	for (var i=0; oSelect.options[i]; i++) {
		if (sValue == oSelect.options[i].value) {
			oSelect.selectedIndex = i;
			break;
		}
	}
	return;
}

function ClearSelectBox(oSelect) {
	for (var i=oSelect.options.length; oSelect.options.length && oSelect.options[i-1]; i--) {
		oSelect.options[i-1] = null;
	}
}

// ----------------------------------------------------------------------------------------
// GERMAN STORES -- MUST RETURN A CODE SO TRANSLATED STRINGS CAN BE USED BY THE CALLER
// Routines were altered to NOT do alerts but rather return a unique code for fail/success
// The caller can then use the code to decide what message to display and use the locale
// of the caller to retrieve translated resources.
// Routines containing alerts which were not used in stores were commented out.  They 
// can at a later date be altered to return a code if desireable, but would suggest
// using a unique code for each circumstance.
// Here are the codes used so far:
//
// -1 Control was empty
// -2 non numeric
// -3 not a whole number
// -4 <= 0
// -5 < 0
// -6 > 99999999
// -----------------------------------------------------------------------------------------


// GERMAN STORES -- MUST RETURN A CODE SO TRANSLATED STRINGS CAN BE USED BY THE CALLER
// returns
// -2 non numeric
// -3 not a whole number
// -4 <= 0
// otherwise
function validatePositive(oControl, sLabel, lRoverLocaleId) {
	
//	if (!(ValidateWholeNumber(oControl, sLabel, lRoverLocaleId)))
//		return false;

	var ValidatorReturnTemp;
	ValidatorReturnTemp = ValidateWholeNumber(oControl, sLabel, lRoverLocaleId); 
	if( ValidatorReturnTemp < 1 )
		return ValidatorReturnTemp; // -2 non numeric, -3 not a whole number
	
	var lValue = parseInt(sGetFormattedNumber(oControl.value, lRoverLocaleId, -1));
	
	if (lValue <= 0) {
		//alert ('The ' + sLabel + ' must be greater than 0.  Please re-enter this field.');
		oControl.focus();
		//return false;
		return (-4);
	}
	
	//return true;
	return (1);
}

// GERMAN STORES -- MUST RETURN A CODE SO TRANSLATED STRINGS CAN BE USED BY THE CALLER
// returns
// -1 OControl was empty ""
// -2 non numeric
// -3 not a whole number
// -5 < 0
// -6 > 99999999
//  1 otherwise
function validateQuantity(oControl, sLabel, lRoverLocaleId) {
	if ((gc_bPTPostingForm)) {if (bIsValidPTTag(oControl.value)) return true; }
	
	if (trim(oControl.value) == "") {
		//alert('Please enter the ' + sLabel + '.');
		oControl.focus();
		//return false;
		return -1;
	}
	
//	if (!(ValidateWholeNumber(oControl, sLabel, lRoverLocaleId)))
//		return false;
	
	var ValidatorReturnTemp;
	ValidatorReturnTemp = ValidateWholeNumber(oControl, sLabel, lRoverLocaleId); 
	if( ValidatorReturnTemp < 1 )
		return ValidatorReturnTemp; // -2 non numeric, -3 not a whole number
		
	var lQuantity = parseInt(sGetFormattedNumber(oControl.value, lRoverLocaleId, -1));
	
	if (lQuantity < 0) {
		//alert ('The ' + sLabel + ' cannot be less than 0.  Please re-enter this field.');
		oControl.focus();
		//return false;
		return (-5);
	}
	
	if (lQuantity > 99999999) {
		//alert ('The ' + sLabel + ' cannot exceed 99999999.  Please re-enter this field.');
		oControl.focus();
		//return false;
		return (-6);
	}
	
	//return true;
	return (1);
}

// GERMAN STORES -- MUST RETURN A CODE SO TRANSLATED STRINGS CAN BE USED BY THE CALLER
// returns
// -2 if non numeric
//  1 otherwise
function ValidateNumeric(oTextField, sFieldName, lRoverLocaleId) {
	if ((gc_bPTPostingForm)) {if (bIsValidPTTag(oTextField.value)) return true; }
	
	//if (!(isNumeric(trim(oTextField.value), lRoverLocaleId))) {
	if ( isNumeric(trim(oTextField.value), lRoverLocaleId) == -2 ) {
		var arLocales = GetLocaleArray();
		
		var lLocaleArrayIndex, sThousandsSep, sDecimalSep;
		lLocaleArrayIndex = lGetLocaleArrayIndex(arLocales, lRoverLocaleId);
		sThousandsSep = arLocales[lLocaleArrayIndex][gc_lThousandsSepArrayIdx];
		sDecimalSep = arLocales[lLocaleArrayIndex][gc_lDecimalSepArrayIdx];
		//alert('The ' + sFieldName + ' must be a number.  Do not enter the thousands separator (' + sThousandsSep + ') when entering ' + sFieldName + '.  Please re-enter this field.');
		oTextField.focus();
		//return (false);		
		return (-2);		
	}
	//return (true);
	return (1);
}

// this function is here b/c the posting forms which are pulled
// from Pro may call it!
// GERMAN STORES -- MUST RETURN A CODE SO TRANSLATED STRINGS CAN BE USED BY THE CALLER
// returns
// -2 non numeric
// -3 not a whole number
//  1 otherwise
function ValidateInt(oTextField, sFieldName) {
	if ((gc_bPTPostingForm)) {if (bIsValidPTTag(oTextField.value)) return true; }
	
	return ValidateWholeNumber(oTextField, sFieldName, -1);
}

// GERMAN STORES -- MUST RETURN A CODE SO TRANSLATED STRINGS CAN BE USED BY THE CALLER
// returns
// -2 non numeric
// -3 not a whole number
//  1 otherwise
function ValidateWholeNumber(oTextField, sFieldName, lRoverLocaleId) {
	if ((gc_bPTPostingForm)) {if (bIsValidPTTag(oTextField.value)) return true; }
	
//	if (!(ValidateNumeric(oTextField, sFieldName, lRoverLocaleId))){
//		oTextField.focus();
//		return (false);
//	}
	
	if( ValidateNumeric(oTextField, sFieldName, lRoverLocaleId) == -2 )
	{
		oTextField.focus();
		return(-2);
	}
	
	var sNumber = sGetFormattedNumber(trim(oTextField.value), lRoverLocaleId, -1)
	if (sNumber.indexOf('.') > -1) {
		//alert ('The ' + sFieldName + ' must be a whole number, with no decimal.  Please re-enter this field.');
		oTextField.focus();
		//return (false);
		return (-3);
	}
	//return (true);
	return (1);
}

// GERMAN STORES -- MUST RETURN A CODE SO TRANSLATED STRINGS CAN BE USED BY THE CALLER
// returns 
// -2 non numeric
//  1 otherwise
function isNumeric(sInputVal, lRoverLocaleId) {
	if ((gc_bPTPostingForm)) {if (bIsValidPTTag(sInputVal)) return true; }
	
	sInputVal = sGetFormattedNumber(sInputVal, lRoverLocaleId, -1);
	var sTemp = sInputVal;
	var sInput = sInputVal.toString();
	var fConvert = parseFloat(sTemp);
	if (!(isNaN(fConvert))) {
		var sConvert = fConvert.toString();
		if (sInput.indexOf('.') == 0) {
			sInput = '0' + sInput;
		}
		if ((sInput.indexOf('-') == 0) && (sInput.indexOf('.') == 1)) {
			sInput = '-0' + sInput.substr(1, sInput.length);
		}
		if (sConvert.indexOf('.') == 0) {
			sConvert = '0' + sConvert;
		}
		if ((sConvert.indexOf('-') == 0) && (sConvert.indexOf('.') == 1)) {
			sConvert = '-0' + sConvert.substr(1, sConvert.length);
		}
		if (sConvert.length < sInput.length) {
			if (sConvert.indexOf('.') == (-1)) { 
				sConvert = sConvert + '.'; 
			}
			while (sConvert.length < sInput.length) {
				sConvert = sConvert + '0';
			}
		}

		//return (sConvert == sInput);
		if(sConvert == sInput)
			return (1);
	}
	//return (false);
	return (-2);
}	
	
// UNUSED NOT CONVERTING -- GERMAN STORES
//function ValidateLength(oTextField, sFieldName, lMaxLength) {
//	var iLength = oTextField.value.length;
//	if (iLength > lMaxLength) {
//		alert('The ' + sFieldName + ' cannot contain more than ' + lMaxLength + ' characters.  Currently, this field contains ' + iLength + ' characters.  Please re-enter this field.');
//		oTextField.focus();
//		return (false);
//	}
//	return (true);
//}
	
// UNUSED NOT CONVERTING -- GERMAN STORES
//function ValidateEMail(oEMail, sLabel) {
//	if (!(sLabel))
//		sLabel = 'Buyer E-mail Address'
//	var sEMail = trim(oEMail.value);
//	var iLength = sEMail.length;
//	var iAt = sEMail.indexOf('@');
//	var iDot = sEMail.lastIndexOf('.');
//	var iSpace = sEMail.indexOf(' ');
//	var bValid = ((iAt > 0) && (iDot > iAt+1) && (iDot < iLength-1) && (iSpace == -1));
//	
//	if (sEMail == '') {
//		alert('Please enter a ' + sLabel + '.');
//		oEMail.focus();
//		return(false);
//	}
//	
//	if (!(bValid)) {
//		alert(sLabel + ' does not appear to be valid.');
//		oEMail.focus();
//		return(false);
//	}
//	return(true);
//}
	
function trim(str) {
	return (ltrim(rtrim(str)));
}
	
function ltrim(str) {
	while (str.charAt(0)==' ') {
		str = str.substring(1);
	}
	return str;
}

function rtrim(str) {
	while (str.charAt(str.length-1)==' ') {
		str = str.substring(0,str.length-1);
	}
	return str;
}

// UNUSED NOT CONVERTING -- GERMAN STORES
//function ValidateDollarAmount(oField, sDesc, lRoverLocaleId, bZeroAllowed, bReplaceBlankWithZero, bBlankAllowed) {
//	if ((gc_bPTPostingForm)) {if (bIsValidPTTag(oField.value)) return true; }
//	
//	var fNumber, bNumberTooSmall, sTooSmallMsg;
//	sNumber = trim(oField.value);
//	if ((sNumber == '') && (!bBlankAllowed) && (bBlankAllowed != null)) {
//		alert('Please enter a value for the ' + sDesc + '.');
//		oField.focus();
//		return(false);
//	}
//	if ((sNumber == '') && (bReplaceBlankWithZero)) {
//		oField.value = sGetFormattedCurrency(0, -1, lRoverLocaleId);
//		return (true);
//	}
//	if (sNumber != ''){
////		if (!(ValidateNumeric(oField, sDesc, lRoverLocaleId))){
////			return(false);
////		}
//		
//		if( ValidateNumeric(oField, sDesc, lRoverLocaleId) == -2 )
//		{
//			return(-2);
//		}
//		
//		// get number in default format before doing comparisons
//		fNumber = parseFloat(sGetFormattedNumber(sNumber, lRoverLocaleId, -1));
//		if (bZeroAllowed) {
//			bNumberTooSmall = (fNumber < 0);
//			sTooSmallMsg = "equal to or greater than";
//		}
//		else {
//			bNumberTooSmall = (fNumber <= 0);
//			sTooSmallMsg = "greater than";
//		}
//		if (bNumberTooSmall) {
//			alert('The ' + sDesc + ' must be ' + sTooSmallMsg + ' ' + sGetFormattedCurrency(0, -1, lRoverLocaleId, true) + '.  Please re-enter this field.');
//			oField.focus();
//			return(false);
//		}
//		if (fNumber > 99999999){
//			alert('The ' + sDesc + ' cannot exceed ' + sGetFormattedCurrency(99999999, -1, lRoverLocaleId, true) + '.  Please re-enter this field.');
//			oField.focus();
//			return(false);
//		}
//	
//		oField.value = sGetFormattedCurrency(fNumber, -1, lRoverLocaleId);
//	}
//	return (true);
//}

// UNUSED NOT CONVERTING -- GERMAN STORES
//function ValidateDollarAmount2(oField, sDesc, lRoverLocaleId, bZeroAllowed, bReplaceBlankWithZero, bBlankAllowed, fMinAllowed, fMaxAllowed) {
//	if ((gc_bPTPostingForm)) {if (bIsValidPTTag(oField.value)) return true; }
//	
//	var fNumber, bNumberTooSmall, sTooSmallMsg;
//	sNumber = trim(oField.value);
//	if ((sNumber == '') && (!bBlankAllowed) && (bBlankAllowed != null)) {
//		alert('Please enter a value for the ' + sDesc + '.');
//		oField.focus();
//		return(false);
//	}
//	if ((sNumber == '') && (bReplaceBlankWithZero)) {
//		oField.value = sGetFormattedCurrency(0, -1, lRoverLocaleId);
//		return (true);
//	}
//	if (sNumber != ''){
////		if (!(ValidateNumeric(oField, sDesc, lRoverLocaleId))){
////			return(false);
////		}
//		if( ValidateNumeric(oField, sDesc, lRoverLocaleId) == -2 )
//		{
//			return(-2);
//		}
//		
//		// get number in default format before doing comparisons
//		fNumber = parseFloat(sGetFormattedNumber(sNumber, lRoverLocaleId, -1));
//		if (!(bZeroAllowed) && fNumber == 0) {
//			alert('The ' + sDesc + ' cannot be ' + sGetFormattedCurrency(0, -1, lRoverLocaleId, true) + '.  Please re-enter this field.');
//			oField.focus();
//			return(false);
//		}
//		bNumberTooSmall = (fNumber < fMinAllowed);
//		sTooSmallMsg = "equal to or greater than";
//		if (bNumberTooSmall) {
//			alert('The ' + sDesc + ' must be ' + sTooSmallMsg + ' ' + sGetFormattedCurrency(fMinAllowed, -1, lRoverLocaleId, true) + '.  Please re-enter this field.');
//			oField.focus();
//			return(false);
//		}
//		if (fNumber > fMaxAllowed){
//			alert('The ' + sDesc + ' cannot exceed ' + sGetFormattedCurrency(fMaxAllowed, -1, lRoverLocaleId, true) + '.  Please re-enter this field.');
//			oField.focus();
//			return(false);
//		}
//		oField.value = sGetFormattedCurrency(fNumber, -1, lRoverLocaleId);
//	}
//	return (true);
//}

// UNUSED NOT CONVERTING -- GERMAN STORES
//function ValidatePercentage(oField, sDesc, lRoverLocaleId, bZeroAllowed, bReplaceBlankWithZero, bBlankAllowed) {
//	if ((gc_bPTPostingForm)) {if (bIsValidPTTag(oField.value)) return true; }
//	
//	//alert('verify ValidatePercentage works for all locales!');
//	var fNumber, bNumberTooSmall, sTooSmallMsg;
//	sNumber = trim(oField.value);
//	if ((sNumber == '') && (!bBlankAllowed) && (bBlankAllowed != null)) {
//		alert('Please enter a value for the ' + sDesc + '.');
//		oField.focus();
//		return(false);
//	}
//	if ((sNumber == '') && (bReplaceBlankWithZero)) {
//		oField.value = sGetFormattedCurrency(0, -1, lRoverLocaleId);
//		return (true);
//	}
//	if (sNumber != ''){
////		if (!(ValidateNumeric(oField, sDesc, lRoverLocaleId))){
////			return(false);
////		}
//		if( ValidateNumeric(oField, sDesc, lRoverLocaleId) == -2 )
//		{
//			return(-2);
//		}
//		
//		// get number in default format before doing comparisons
//		fNumber = parseFloat(sGetFormattedNumber(sNumber, lRoverLocaleId, -1));
//		if (bZeroAllowed) {
//			bNumberTooSmall = (fNumber < 0);
//			sTooSmallMsg = "equal to or greater than";
//		}
//		else {
//			bNumberTooSmall = (fNumber <= 0);
//			sTooSmallMsg = "greater than";
//		}
//		if (bNumberTooSmall) {
//			alert('The ' + sDesc + ' must be ' + sTooSmallMsg + ' ' + sGetFormattedNumber(sGetRoundedNumber(0, 2, lRoverLocaleId), -1, lRoverLocaleId) + '.  Please re-enter this field.');
//			oField.focus();
//			return(false);
//		}
//		if (fNumber > 100){
//			alert('The ' + sDesc + ' cannot exceed ' + sGetFormattedNumber(sGetRoundedNumber(100, 2, lRoverLocaleId), -1, lRoverLocaleId) + '.  Please re-enter this field.');
//			oField.focus();
//			return(false);
//		}
//		oField.value = sGetFormattedNumber(sGetRoundedNumber(fNumber, 2, lRoverLocaleId), -1, lRoverLocaleId);
//	}
//	return (true);
//}

function sGetRoundedNumber(fNumber, lDigitsAfterDecimal, lRoverLocaleId) {
	var sNumber = '';
	var arLocales = GetLocaleArray();
	var lRoverLocaleIdIndex = lGetLocaleArrayIndex(arLocales, lRoverLocaleId);
	var sDecimalSeperator = arLocales[lRoverLocaleIdIndex][gc_lDecimalSepArrayIdx];

	if (fNumber == 0) {
		sNumber = '0';
		if (lDigitsAfterDecimal > 0) {
			sNumber = sNumber + sDecimalSeperator;
			for(var i=0; i<lDigitsAfterDecimal; i++)
				sNumber = sNumber + '0';
		}
	}
	else {
		fNumber = Math.round(fNumber * Math.pow(10, lDigitsAfterDecimal)) / Math.pow(10, lDigitsAfterDecimal);
		sNumber = fNumber.toString();
//		var lDecimal = sNumber.indexOf(sDecimalSeperator);
		var lDecimal = sNumber.indexOf('.');
		sNumber = sNumber.replace('.', sDecimalSeperator); 
		if (lDecimal == -1) {
			sNumber = sNumber + sDecimalSeperator;
			for (var i=0; i<lDigitsAfterDecimal; i++)
				sNumber = sNumber + '0';
		}
		else {
			var lNumberLength = sNumber.length;
			if (lDigitsAfterDecimal > (lNumberLength - lDecimal - 1)) {
				for (var i=(lNumberLength - lDecimal - 1); i < lDigitsAfterDecimal; i++)
					sNumber = sNumber + '0';
			}
		}
	}
	return (sNumber);
}

// can be used to submit forms to popups instead of the current window/frame
function submitFormToWindow(oForm, oWindow)
{

	var sOldTarget = oForm.target
	var sWindowName = oWindow.name;
	
	oForm.target = sWindowName;
	oForm.submit();
	
	// for some stupid reason NS seems to re-set the target before 
	// the form's even submitted, so we need some sort of pause
	for (var i=0; i<1000; i++)
		;
	
	oForm.target = sOldTarget;
	
	return;
}

function ItemIsChecked(oElement, lCount) {
	if (lCount == 1) {
		return (oElement.checked);
	}
	else {
		for (var lIndex=0; lIndex<lCount; lIndex++) {
			if (oElement[lIndex].checked) {
				return(true);
			}
		}
		return (false);
	}
}

/* ------------------------------------------------------
note that sNumber1 and sNumber2 must be in the same locale
format!
------------------------------------------------------ */
function lCompareNumbers(sNumber1, sNumber2, lRoverLocaleId) {
	var lRetVal = 0;
	sNumber1 = parseFloat(sGetFormattedNumber(sNumber1, lRoverLocaleId, -1));
	sNumber2 = parseFloat(sGetFormattedNumber(sNumber2, lRoverLocaleId, -1));
	if (sNumber1 < sNumber2)
		lRetVal = -1;
	else if (sNumber1 == sNumber2)
		lRetVal = 0;
	else
		lRetVal = 1;
	return (lRetVal);
}

function sGetFormattedNumber(fNumber, lSourceRoverLocaleId, lDestRoverLocaleId) {
	// if same locale, exit early
	if (lSourceRoverLocaleId == lDestRoverLocaleId)
		return (fNumber);
	
	var arLocales = GetLocaleArray();
	if ((lSourceRoverLocaleId == null) || (lSourceRoverLocaleId == -1)) {
		lSourceRoverLocaleId = arLocales[0][gc_lLocaleIdArrayIdx];
	}
	if ((lDestRoverLocaleId == null) || (lDestRoverLocaleId == -1)) {
		lDestRoverLocaleId = arLocales[0][gc_lLocaleIdArrayIdx];
	}
	
	var lSourceLocaleArrayIndex, sSourceThousandsSep, sSourceDecimalSep;
	lSourceLocaleArrayIndex = lGetLocaleArrayIndex(arLocales, lSourceRoverLocaleId);
	sSourceThousandsSep = arLocales[lSourceLocaleArrayIndex][gc_lThousandsSepArrayIdx];
	sSourceDecimalSep = arLocales[lSourceLocaleArrayIndex][gc_lDecimalSepArrayIdx];
	
	var lDestLocaleArrayIndex, sDestThousandsSep, sDestDecimalSep;
	lDestLocaleArrayIndex = lGetLocaleArrayIndex(arLocales, lDestRoverLocaleId);
	sDestThousandsSep = arLocales[lDestLocaleArrayIndex][gc_lThousandsSepArrayIdx];
	sDestDecimalSep = arLocales[lDestLocaleArrayIndex][gc_lDecimalSepArrayIdx];
	
/*	var sReport;
	sReport = "lSourceRoverLocaleId = " + lSourceRoverLocaleId + "\n";
	sReport = sReport + "lDestRoverLocaleId = " + lDestRoverLocaleId + "\n";
	sReport = sReport + "lSourceLocaleArrayIndex = " + lSourceLocaleArrayIndex + "\n";
	sReport = sReport + "sSourceThousandsSep = " + sSourceThousandsSep + "\n";
	sReport = sReport + "sSourceDecimalSep = " + sSourceDecimalSep + "\n";
	sReport = sReport + "lDestLocaleArrayIndex = " + lDestLocaleArrayIndex + "\n";
	sReport = sReport + "sDestThousandsSep = " + sDestThousandsSep + "\n";
	sReport = sReport + "sDestDecimalSep = " + sDestDecimalSep + "\n";
	alert(sReport); */

	// if locales' numbers formatted same, exit early
	if ((sSourceThousandsSep == sDestThousandsSep) && (sSourceDecimalSep == sDestDecimalSep)) return (fNumber);

	var bSwapThousandsSep = false;
	var bSwapDecimalSep = false;
	if (sSourceThousandsSep != sDestThousandsSep) {
		bSwapThousandsSep = true;
	}
	if (sSourceDecimalSep != sDestDecimalSep) {
		bSwapDecimalSep = true;
	}
	
	var sRetVal = '';
	var sNumber = fNumber.toString();
	for (var i = 0; i < sNumber.length; i++) {
	
		if( sNumber.substr(i, 1) == sSourceThousandsSep ){
			sRetVal = sRetVal + sDestThousandsSep;
		}
		else if( sNumber.substr(i, 1) == sSourceDecimalSep ){
			sRetVal = sRetVal + sDestDecimalSep;
		}
		else
			sRetVal = sRetVal + sNumber.substr(i, 1);			
	}
	return (sRetVal);
}

function sGetFormattedCurrency(fNumber, lSourceRoverLocaleId, lDestRoverLocaleId, bIncludeCurrSymbol) {
	
	var sNumber = '';
	
	var arLocales = GetLocaleArray();
	var lDestLocaleId;
	if (lDestRoverLocaleId == null || lDestRoverLocaleId == -1){
		lDestLocaleId = arLocales[0][gc_lLocaleIdArrayIdx];
	} else {
		lDestLocaleId = lDestRoverLocaleId;
	}
	var lDestLocaleArrayIndex, sDestCurrSymbol, lDestCurrDigitsAfterDecimal;
	lDestLocaleArrayIndex = lGetLocaleArrayIndex(arLocales, lDestLocaleId);
	sDestCurrSymbol = arLocales[lDestLocaleArrayIndex][gc_lCurrSymbolArrayIdx];
	lDestCurrDigitsAfterDecimal = arLocales[lDestLocaleArrayIndex][gc_lCurrDigitsAfterDecimalArrayIdx];
	
	// get number in default format with decimals; remember to change to dest format before returning
	fNumber = parseFloat(sGetFormattedNumber(fNumber, lSourceRoverLocaleId, -1))
//	alert(fNumber);
	sNumber = sGetRoundedNumber(fNumber, lDestCurrDigitsAfterDecimal, lDestLocaleId);
//	alert(sNumber);
	
	// convert number to destination format and add curr symbol if appropriate
//	sNumber = sGetFormattedNumber(sNumber, -1, lDestLocaleId);
//	alert(sNumber);
	if (bIncludeCurrSymbol) {
		sNumber = sDestCurrSymbol + sNumber;
	}
	
	return (sNumber);
}

function lGetLocaleArrayIndex(arLocales, lRoverLocaleId) {
	var lRetVal = 0;
	for (var i=0; i<arLocales.length; i++) {
		if (arLocales[i][gc_lLocaleIdArrayIdx] == lRoverLocaleId) {
			lRetVal = i;
			break;
		}
		if (arLocales[i][gc_lRoverLocaleIdArrayIdx] == lRoverLocaleId) {
			lRetVal = i;
			break;
		}
	}
	return (lRetVal);
}

/* --------------------------------------------------------------------------------------
this function returns an x -by- 7 array of all defined locales, where x is the number
of locales we can support; the indexes in the second dimension in the array are--
0   roverlocaleid
1   locale id(lcid)
2   short name
3   thousands separator used in numbers
4   decimal separator used in numbers
5   currency symbol
6   for currencies, the number of digits after the decimal
-------------------------------------------------------------------------------------- */

var gc_lRoverLocaleIdArrayIdx = 0;
var gc_lLocaleIdArrayIdx = 1;
var gc_lShortNameArrayIdx = 2;
var gc_lThousandsSepArrayIdx = 3;
var gc_lDecimalSepArrayIdx = 4;
var gc_lCurrSymbolArrayIdx = 5;
var gc_lCurrDigitsAfterDecimalArrayIdx = 6;
var gc_lTimeFormatArrayIdx = 7;
var gc_lShortDateFormatArrayIdx = 8;
var gc_lDateSepArrayIdx = 9;

function GetLocaleArray() {
	var arRetVal = new Array(9);
	for (var i=0; i<arRetVal.length; i++) {
	   arRetVal[i] = new Array(10);
	}

	// USA
	arRetVal[0][0] = 1;
	arRetVal[0][1] = 1033;
	arRetVal[0][2] = 'USA';
	arRetVal[0][3] = ',';
	arRetVal[0][4] = '.';
	arRetVal[0][5] = '$';
	arRetVal[0][6] = 2;
	arRetVal[0][7] = 'h:mm:ss tt';
	arRetVal[0][8] = 'MM/dd/yyyy';
	arRetVal[0][9] = '/';

	// UK
	arRetVal[1][0] = 2;
	arRetVal[1][1] = 2057;
	arRetVal[1][2] = 'UK';
	arRetVal[1][3] = ',';
	arRetVal[1][4] = '.';
	arRetVal[1][5] = '£';
	arRetVal[1][6] = 2;
	arRetVal[1][7] = 'HH:mm:ss';
	arRetVal[1][8] = 'dd/MM/yyyy';
	arRetVal[1][9] = '/';

	// German (DM)
	arRetVal[2][0] = 3;
	arRetVal[2][1] = 1031;
	arRetVal[2][2] = 'German (DM)';
	arRetVal[2][3] = '.';
	arRetVal[2][4] = ',';
	arRetVal[2][5] = 'DM';
	arRetVal[2][6] = 2;
	arRetVal[2][7] = 'HH:mm:ss';
	arRetVal[2][8] = 'dd.MM.yyyy';
	arRetVal[2][9] = '.';

	// German (Euro)
	arRetVal[3][0] = 4;
	arRetVal[3][1] = 1031;
	arRetVal[3][2] = 'German (Euro)';
	arRetVal[3][3] = '.';
	arRetVal[3][4] = ',';
	arRetVal[3][5] = 'E';
	arRetVal[3][6] = 2;
	arRetVal[3][7] = 'HH:mm:ss';
	arRetVal[3][8] = 'dd.MM.yyyy';
	arRetVal[3][9] = '.';

	// French (F)
	arRetVal[4][0] = 5;
	arRetVal[4][1] = 1036;
	arRetVal[4][2] = 'French (F)';
	arRetVal[4][3] = '.';
	arRetVal[4][4] = ',';
	arRetVal[4][5] = 'F';
	arRetVal[4][6] = 2;
	arRetVal[4][7] = 'HH:mm:ss';
	arRetVal[4][8] = 'dd/MM/yyyy';
	arRetVal[4][9] = '/';

	// French (Euro)
	arRetVal[5][0] = 6;
	arRetVal[5][1] = 1036;
	arRetVal[5][2] = 'French (Euro)';
	arRetVal[5][3] = '.';
	arRetVal[5][4] = ',';
	arRetVal[5][5] = 'E';
	arRetVal[5][6] = 2;
	arRetVal[5][7] = 'HH:mm:ss';
	arRetVal[5][8] = 'dd/MM/yyyy';
	arRetVal[5][9] = '/';

	// Canada (Canadian $)
	arRetVal[6][0] = 7;
	arRetVal[6][1] = 4105;
	arRetVal[6][2] = 'Canada (Canadian $)';
	arRetVal[6][3] = ',';
	arRetVal[6][4] = '.';
	arRetVal[6][5] = 'CAN$';
	arRetVal[6][6] = 2;
	arRetVal[6][7] = 'h:mm:ss tt';
	arRetVal[6][8] = 'dd/MM/yyyy';
	arRetVal[6][9] = '/';

	// Japan
	arRetVal[7][0] = 8;
	arRetVal[7][1] = 1041;
	arRetVal[7][2] = 'Japan';
	arRetVal[7][3] = ',';
	arRetVal[7][4] = '.';
	arRetVal[7][5] = '¥';
	arRetVal[7][6] = 2;
	arRetVal[7][7] = 'H:mm:ss';
	arRetVal[7][8] = 'yyyy/MM/dd';
	arRetVal[7][9] = '/';

	// Australia
	arRetVal[8][0] = 9;
	arRetVal[8][1] = 3081;
	arRetVal[8][2] = 'Australia';
	arRetVal[8][3] = ',';
	arRetVal[8][4] = '.';
	arRetVal[8][5] = 'AUD$';
	arRetVal[8][6] = 2;
	arRetVal[8][7] = 'H:mm:ss';
	arRetVal[8][8] = 'yyyy/MM/dd';
	arRetVal[8][9] = '/';

	return arRetVal;

}

// please leave below var intact. --JSC
var sRoverLocaleIdReplacementTag = "<!-- ROVER_LOCALE_ID -->"


