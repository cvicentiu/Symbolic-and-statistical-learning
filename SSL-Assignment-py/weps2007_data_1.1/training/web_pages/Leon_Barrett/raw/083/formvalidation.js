/*

Copyright SkySports.com - written by Andy Taylor

examples:
//fields to check are not blank
CheckArray["FIELDNAME"] = "TEXT TO ALERT";
CheckArray["name_prefix"] = "your title";
CheckArray["first_name"] = "First name";
CheckArray["last_name"] = "Surname";

//email fields to check
emailCheckArray["email"] = "email";


bSubmit should be passed in as false when calling with the form tag
and a return value is expected e.g. onSubmit="return CheckForm(document.form1,false);"
bSubmit should be passed in as true if using a local function for process

*/
var CheckArray = new Array(); //fields to check are not blank
var pcCheckArray = new Array(); //postcode fields to check
var emailCheckArray = new Array(); //email fields to check
var numericCheckArray = new Array(); //fields that have to be numeric e.g. numericCheckArray["issue"] = "Issue number"; 
var dateCheckArray = new Array(); //date fields to check, e.g. new Array("dobday","dobmonth","dobyear","Date of birth")
var issueArray = new Array();//for switch issue number - only ONE allowed on page
var ccCheckArray = new Array();//for credit card number field
var monthCheck = new Array();//for month check e.g.monthCheck["expiry_month"] = new Array("expiry_year","Expiry month");//need corresponding year field
var compareFields= new Array();//to compare two  text/password/textarea fields e.g. compareFields["password"] = new Array("password_confirm","Passwords");


function CC_Validate(ccNum,ccType)//credit card number,credit card type, e.g. new Array("card_type","Card number");
{
	var checksum = 0;
	var i;
	var digit;
	var temp;
	var cclength=ccNum.length;
	var ccFirstOne = ccNum.substr(0,1);
	var ccFirstTwo = ccNum.substr(0,2);

	ccType = ccType.toUpperCase();
	
	if (ccType == "VISA")
	{
		if (!(cclength == 13 || cclength == 16))
			return false;
		if (!(ccFirstOne == "4"))
			return false;
	}
	else if (ccType == "MASTERCARD")
	{
		if (!(cclength == 16))
			return false;
		if (!(ccFirstTwo == "51" || ccFirstTwo == "52" || ccFirstTwo == "53" || ccFirstTwo == "54" || ccFirstTwo == "55") )
			return false;
	}
	else if (ccType == "AMEX")
	{
		if (!(cclength == 15))
			return false;
		if (!(ccFirstTwo == "34" || ccFirstTwo == "37") )
			return false;			
	}
	else if (ccType == "SWITCH" || ccType == "DELTA" || ccType == "SOLO")
	{
		//no check on length - valid length not known at present
	}	
	
	if (cclength % 2 != 0) {
		cclength += 1;
		ccNum = "0" + ccNum;
	}
	
	for (i = 0; i < cclength; i++) {
		digit = parseInt(ccNum.charAt(i));
		if ((i % 2) == 0) {
			digit *= 2;
			if (digit > 9)
				digit = parseInt(digit / 10) + parseInt(digit % 10);
		}
		checksum += digit;
	}

	
	if (checksum % 10 == 0)
		return(true);
	else
		return(false);
}

function trim(strText) {  
  while (strText.substring(0,1) == ' ')  // this will get rid of leading spaces
    strText = strText.substring(1, strText.length); 
    
  while (strText.substring(strText.length-1,strText.length) == ' ')  // this will get rid of trailing spaces 
    strText = strText.substring(0, strText.length-1);

  return strText;
} 

function setIssueCheck(Obj_SelectField,Obj_issuefield)
{
	var SelectValue = Obj_SelectField.options[Obj_SelectField.selectedIndex].value;
	if ( SelectValue == "switch" || SelectValue == "solo" || SelectValue == "delta" )
	{
		issueArray[3] = true;
	}
	else
	{
		issueArray[3] = false;
		Obj_issuefield.value = "";
	}
		
}

function isBlank(str) {return (str != "");}

function isAlpha(chr)
{
	chr = chr.toUpperCase();
	return !(chr < "A" || chr > "Z") //may need to make upper case? or use reg exp
}

function isNum(chr) {return !(chr < "0" || chr > "9");}

function isNumeric(str) {return !/[^0-9-]/.test(StripSpaces(str));}

function isEmail(str)
{
  var regex = /^['a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
  return regex.test(str);
}

function StripSpaces(str) {return str.replace(/ /g, "");} // removes ALL spaces in a string

function AddSpace(str,charsright) // charsright is num of chars to leave at end
{
	var strlen=str.length;
	str=str.substring(0,strlen-charsright)+" "+str.substring(strlen-charsright,strlen);
	
	return str;
}

function CheckLength(str) // input is a string
{
	var strlen = str.length;
	return !( (strlen!=6) && (strlen!=7) && (strlen!=8) )
}

function FindSpace(str) {return (str.indexOf(" "));} // input is a string with a space

function GetFirstPart(str) // input is a string with one space, returns blank if no space
{
	var place = FindSpace(str);
	return (str.substring(0,place));
}

function GetSecondPart(str) // input is a string with one space, returns all if no space
{
	var place = FindSpace(str);
	var strlen = str.length;
	return (str.substring(place+1,strlen));
}

function CheckFirstPart(str) // check alpha & numerics is right place AND ensures length is valid
{
	str = GetFirstPart(str);
	var strlen = str.length;
	if ( isAlpha(str.charAt(0)) ) //A***
	{
		if ( isNum(str.charAt(1)) ) //A9**
		{
			if (strlen == 2)  // A9
				return true;
			else if ( (strlen == 3) && ( isNum(str.charAt(2)) || isAlpha(str.charAt(2)) ) ) // A99 or A9A
				return true		
		} 
		else if ( isAlpha(str.charAt(1)) ) //AA**
		{
			if ( isNum(str.charAt(2)) ) //AA9*
			{
				if (strlen == 3)  // AA99
					return true;
				else if ( (strlen == 4) && ( isNum(str.charAt(3)) || isAlpha(str.charAt(3)) ) )// AA99 or AA9A
					return true		
			} 
		}
		
	}
	return false
}

function CheckSecondPart(str)
{
	str = GetSecondPart(str);
	var strlen = str.length;
	if ( (strlen == 3) && (isNum(str.charAt(0))) && (isAlpha(str.charAt(1))) && (isAlpha(str.charAt(2))) )
		return true;
	else
		return false;	
}

function FormatPC(str)
{
	str = str.toUpperCase();
	str = StripSpaces(str);
	str = AddSpace(str,3);
	return str;
}

function CheckPC(str)
{
	str = FormatPC(str);
	
	if ( CheckLength(str) && CheckFirstPart(str) && CheckSecondPart(str) )
		return true;
	else
		return false
}

function CheckTextField(Obj_TextField,ShowAlert)
{
	if (!isBlank(trim(Obj_TextField.value)))
	{
		if (ShowAlert)
		{
			alert (CheckArray[Obj_TextField.name] + " cannot be blank.");
			Obj_TextField.focus();
		}
		return false;
	}
	else
		return true;
}

function CheckSelectField(Obj_SelectField,ShowAlert)
{

	var TestValue = Obj_SelectField.options[Obj_SelectField.selectedIndex].value;

	if (TestValue < 0 || TestValue == "")
	{
		if (ShowAlert)
		{
			alert ("Please select a value for " + CheckArray[Obj_SelectField.name] + ".");
			Obj_SelectField.focus();
		}
		return false;
	}
	else
		return true;

}


function CheckCheckBox(Obj_CheckBox,ShowAlert)
{
	if (Obj_CheckBox.checked != true)
	{
		if (ShowAlert)
		{
			alert ("You must accept " + CheckArray[Obj_CheckBox.name] + ".");
			Obj_CheckBox.focus();
		}
		return false;
	}
	else
		return true;
}


function CheckForm(F,bSubmit)
{

	var i = 0;
	var FoundError = false;
	if ("" + bSubmit == "undefined")
		bSubmit = false;

	while (i < F.length && !FoundError)
	{
		var E = F.elements[i];

		if ((E.type == "text") || (E.type == "textarea") || (E.type == "password"))
		{
			if (CheckArray[E.name] ) // required fields
			{
				if (!CheckTextField(E,true)) 
					FoundError = true;
			}
			
			if (compareFields[E.name] && !FoundError) {
			
				if (E.value !=  eval("F." + compareFields[E.name][0] + ".value")) {
					alert(compareFields[E.name][1] + ' do not match');
					E.focus();
					FoundError = true;
				}
			}
			
			if (pcCheckArray[E.name] && !FoundError) //check if postcode field
			{
				var PC = FormatPC(E.value);
				E.value = PC;		
				if (!CheckPC(PC))
				{
					var PClen = PC.length;
					var newPC = PC;
					var Diff = 28 - PClen;
					if ( Diff > 0 )
						{
						for (var i=1;i<=Diff;i++)
							{
							newPC = " " + newPC;	
							}
					    }
	
					alert(newPC + ' is not a valid postcode' + '\r\n' + 'Please enter in the form of XX XXX or XXX XXX or XXXX XXX' + '\r\n' + ' and ensure there are only Alpha and Numeric characters.');
					E.focus();
					FoundError = true;
				}
			}
		
			if ( (emailCheckArray[E.name] && CheckTextField(E)) || (emailCheckArray[E.name] && CheckArray[E.name]) && !FoundError)
			{
				if (!isEmail(E.value))
				{
					alert (emailCheckArray[E.name] + " is not a valid address.");
					E.focus();
					FoundError = true;			
				}
			}

			if (numericCheckArray[E.name] && !FoundError)
			{
				if (!isNumeric(E.value))
				{
					alert (numericCheckArray[E.name] + " must be a number.");
					E.focus();
					FoundError = true;			
				}
			}

			if (issueArray[0] == E.name && !FoundError)
			{
				if (issueArray[3] == true && !CheckTextField(E))
				{
					alert("Issue number cannot be blank");
					E.focus();
					FoundError = true;
				}
			}	
			
			if (ccCheckArray[E.name] && !FoundError)
			{
				if (!CC_Validate(E.value,eval("F." + ccCheckArray[E.name][0] + ".value")))
				{
					alert (ccCheckArray[E.name][1] + " is not valid.");
					E.focus();
					FoundError = true;			
				}
			}								
					
		}
		else if (E.type == "select-one")
		{
			if (CheckArray[E.name] ) // required fields
			{			
				if (!CheckSelectField(E,true)) // required fields
					FoundError = true;
			}
			if ((dateCheckArray[E.name] && CheckSelectField(E)) || (dateCheckArray[E.name] && CheckArray[E.name]) && !FoundError)
			{
				var YearElement = eval("F." + dateCheckArray[E.name][2] + ".value");
				var MonthElement = eval("F." + dateCheckArray[E.name][1] + ".value"); 
				var DayElement = eval("F." + dateCheckArray[E.name][0] + ".value");

				var TestDate = new Date(YearElement,MonthElement-1,DayElement)
				if ( (TestDate.getMonth() + 1) != MonthElement)
				{
					alert (dateCheckArray[E.name][3] + " is not valid.");
					E.focus();
					FoundError = true;			
				}
			}
		
			if ((monthCheck[E.name] && CheckSelectField(E)) || (monthCheck[E.name] && CheckArray[E.name]) && !FoundError)
			{
				var YearElement = eval("F." + monthCheck[E.name][0] + ".value");
				var MonthElement = E.value; 
				var dateToday = new Date();
				if ( (dateToday.getMonth() + 1) > MonthElement && dateToday.getYear() == YearElement)
				{
					alert (monthCheck[E.name][1] + " is not valid.");
					E.focus();
					FoundError = true;			
				}
			}		
			
		}
		else if (E.type == "checkbox")
		{
			if (CheckArray[E.name] ) // required fields
			{
				if (!CheckCheckBox(E,true))
					FoundError = true
			}
		}		
		i++;
	}
			
	if (!FoundError)
	{
		if (bSubmit)
		{
			F.submit();
		}
		else
			return true;
	}
	else if (!bSubmit)
		return false;
	
	

		
}
