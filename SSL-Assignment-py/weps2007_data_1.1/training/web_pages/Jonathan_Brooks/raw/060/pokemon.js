<!--
function MM_openBrWindow(theURL,winName,features) 
	{
  window.open(theURL,winName,features);
	}


window.name = 'professor'

function ValidDCI (dcinumber) {
	var CheckDigit = "";
	var i, c, nCheckDigit = 0;
	var aPrimes = new Array(43, 47, 53, 71, 73, 31, 37, 41);
	var temp1, temp2;
	
//	4-7 digits = great.  8 digits = check digit.  otherwise not valid.
	if (dcinumber.length >= 4 && dcinumber.length <= 7) {
		return (1);
	}
	if (dcinumber.length > 8 || dcinumber.length < 4) {
		return(0);
	}
	
//	compute check digit
	for (i=1; i < dcinumber.length; i++) {
		c = dcinumber.charAt(i);
		nCheckDigit = nCheckDigit + Number(c) * aPrimes[i-1];
	}
	temp1 = nCheckDigit / 10;
	temp2 = (temp1 % 9);
//	CheckDigit = chr(temp2 + 49);
	CheckDigit = Math.floor(temp2)+1;
// alert ("checkdigit = " + CheckDigit);
	if (CheckDigit == Number(dcinumber.charAt(0))) {
		return (1);
	}
	// else
	return (0);
}


function Form_Validator(theForm) {


  if (theForm.dcinum.value == "") {
    alert("Please enter your DCI number.");
    theForm.dcinum.focus();
    return (false);
  }
  
	//	digit characters only please.
  if (theForm.dcinum.value.match(/[^0-9]/))	 {
		alert("Your DCI number may only contain numbers.  Please enter it again.");
		theForm.dcinum.focus();
		return (false);
  }

  // calculate the dci number checknum
  if (ValidDCI(theForm.dcinum.value) == 0) {
    alert("The DCI number you typed is incorrect. Please reenter the number.");
    theForm.dcinum.focus();
    return (false);
  }

  if (theForm.bdyear.value < 1800 || theForm.bdyear.value > 2999)  {
    alert("Please enter a four-digit value for the \"Birthdate Year\" field (example: 1980).");
    theForm.bdyear.focus();
    return (false);
  }
  if (Date.parse(theForm.bdmonth.value + "/" + theForm.bdday.value + "/" + theForm.bdyear.value) > Date.parse(Date())) {
	alert ("Your birthdate is after the current date!  Please reenter your birthdate.");
	theForm.bdyear.focus();
	return(false);
  }
  return (true);
}


//-->
