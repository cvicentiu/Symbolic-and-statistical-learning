<!--

// executes a "required" rule logic.

function SNAP_checkRule_required(_elements, _parameters, _required)
{
	var element = _elements[0];
	
	var value = SNAP_getElementValue(element);

	if (value == false) // checkboxes
		return false;
	if (typeof(value) == undefined) // we've got a number
		return true;
	else // we've got something else so we turn it into a string and test the length
		if (String(value).replace(/ /, "").length == 0)
			return false;
		else
			return true;
		
}



// executes an "equal" rule logic.

function SNAP_checkRule_equal(_elements, _parameters, _required)
{
	var first_element = _elements[0];
	var first_element_value = SNAP_getElementValue(first_element);

	if (first_element_value == '' && _required == true)
		return false;
	
	var nb_elements = _elements.length;
	var element;
	var element_value;
	if (nb_elements > 1)
	{
		for (i = 1; i < nb_elements; i ++)
		{
			element = _elements[i];
			element_value = SNAP_getElementValue(element);
			if (element_value == '' && _required == true)
				return false;
			if (first_element_value != element_value)
				return false;
		}
	}
	
	return true;
}




// Executes a "minimum" rule logic.

function SNAP_checkRule_minimum(_elements, _parameters, _required)
{
	var element = _elements[0];
	var minimum_value = Number(_parameters[0]);
	var element_value = Number(SNAP_getElementValue(element));
	
	// if nothing & required => failed
	if (element_value == '' && _required == true)
		return false;
	// if nothing & not required => passed
	if (element_value == '' && _required == false)
		return true;
	
	if (isNaN(element_value))
		return false;
	if (isNaN(minimum_value))
		return false;
	
	if (element_value > minimum_value)
		return true;
	else
		return false;
}



// Executes a "maximum" rule logic.

function SNAP_checkRule_maximum(_elements, _parameters, _required)
{
	var element = _elements[0];
	var maximum_value = Number(_parameters[0]);
	var element_value = Number(SNAP_getElementValue(element));

	
	// if nothing & required => failed
	if (element_value == '' && _required == true)
		return false;
	// if nothing & not required => passed
	if (element_value == '' && _required == false)
		return true;

	
	if (isNaN(element_value))
		return false;
	if (isNaN(maximum_value))
		return false;
	
	if (element_value > maximum_value)
		return false;
	else
		return true;
}



// Executes a "greater than" rule logic.

function SNAP_checkRule_greater(_elements, _parameters, _required)
{
	var element1 = _elements[0];
	var element2 = _elements[1];

	var value1 = SNAP_getElementValue(element1);
	var value2 = SNAP_getElementValue(element2);
	
	// if nothing & required => failed
	if (value1 == '' && value2 == '' && _required == true)
		return false;
	// if nothing & not required => passed
	if (value1 == '' && value2 == '' && _required == false)
		return true;

	
	if (!SNAP_Utils_isNumeric(value1))
		return false;
	if (!SNAP_Utils_isNumeric(value2))
		return false;
	
	
	var margin = 0;
	if (_parameters.length > 0)
		margin = _parameters[0];
	
	var strict = true;
	if (_parameters.length > 1)
		if (_parameters[1] == false)
			strict = false;		
	
	if (strict)
	{
		if (value1 - value2 <= margin)
			return false;
		return true;
	}
	else
	{
		if (value1 - value2 < margin)
			return false;
		return true;
	}
}



// Checks the format of a date

function SNAP_checkRule_date(_elements, _parameters, _required)
{
	var element = _elements[0];
	var value = SNAP_getElementValue(element);
	
	// if nothing & required => failed
	if (value == '' && _required == true)
		return false;
	// if nothing & not required => passed
	if (value == '' && _required == false)
		return true;
	
	
	var format = _parameters[0];
	return checkdate(value, format);
}



function checkdate(dateStr, format)
{
   if (format == null) { format = "MDY"; }
   format = format.toUpperCase();
   if (format.length != 3) { format = "MDY"; }
   if ( (format.indexOf("M") == -1) || (format.indexOf("D") == -1) || 
      (format.indexOf("Y") == -1) ) { format = "MDY"; }
   if (format.substring(0, 1) == "Y") { // If the year is first
      var reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
      var reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/
   } else if (format.substring(1, 2) == "Y") { // If the year is second
      var reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/
      var reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/
   } else { // The year must be third
      var reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/
      var reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/
   }
   // If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
   if ( (reg1.test(dateStr) == false) && (reg2.test(dateStr) == false) ) { return false; }
   var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was
   // Check to see if the 3 parts end up making a valid date
   if (format.substring(0, 1) == "M") { var mm = parts[0]; } else _
      if (format.substring(1, 2) == "M") { var mm = parts[1]; } else { var mm = parts[2]; }
   if (format.substring(0, 1) == "D") { var dd = parts[0]; } else _
      if (format.substring(1, 2) == "D") { var dd = parts[1]; } else { var dd = parts[2]; }
   if (format.substring(0, 1) == "Y") { var yy = parts[0]; } else _
      if (format.substring(1, 2) == "Y") { var yy = parts[1]; } else { var yy = parts[2]; }
   if (parseFloat(yy) <= 50) { yy = (parseFloat(yy) + 2000).toString(); }
   if (parseFloat(yy) <= 99) { yy = (parseFloat(yy) + 1900).toString(); }
   var dt = new Date(parseFloat(yy), parseFloat(mm)-1, parseFloat(dd), 0, 0, 0, 0);
   if (parseFloat(dd) != dt.getDate()) { return false; }
   if (parseFloat(mm)-1 != dt.getMonth()) { return false; }
   return true;
	
}




// Validates an email address format

function SNAP_checkRule_email(_elements, _parameters, _required)
{
	var element = _elements[0];
	var value = SNAP_getElementValue(element);
	
	// if nothing & required => failed
	if (value == '' && _required == true)
		return false;
	// if nothing & not required => passed
	if (value == '' && _required == false)
		return true;
	
	var result = String(value).match(/^\w+([\.\-]\w+)*@\w+([\.\-]\w+)*\.[a-z]{2,4}$/i);
	if (result != null)
		return true;
}




// Validates a Whole Number

function SNAP_checkRule_wholenumber(_elements, _parameters, _required)
{
	var element = _elements[0];
	var value = SNAP_getElementValue(element);
	
	// if nothing & required => failed
	if (value == '' && _required == true)
		return false;
	// if nothing & not required => passed
	if (value == '' && _required == false)
		return true;

	
	return SNAP_Utils_isWholeNumber(value);
}


// Validates a positive Whole Number

function SNAP_checkRule_positivewholenumber(_elements, _parameters, _required)
{
	var element = _elements[0];
	var value = SNAP_getElementValue(element);
	
	// if nothing & required => failed
	if (value == '' && _required == true)
		return false;
	// if nothing & not required => passed
	if (value == '' && _required == false)
		return true;
	
	if(SNAP_Utils_isWholeNumber(value) && !SNAP_Utils_isNegative(value))
		return true;
	else
		return false;
}


// Validates a positive Whole Number
function SNAP_checkRule_currency(_elements, _parameters, _required)
{
	var element = _elements[0];
	var value = SNAP_getElementValue(element);
	
	// if nothing & required => failed
	if (value == '' && _required == true)
		return false;
	// if nothing & not required => passed
	if (value == '' && _required == false)
		return true;

	var number = new Number(value);
	if(isNaN(number))
		return false;
	if (number*100 != Math.round(number*100))
		return false;
	else
		return true;
}


//-->