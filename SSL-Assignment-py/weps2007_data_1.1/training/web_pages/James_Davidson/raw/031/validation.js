function validationrequired( field, message )
{
    valid = true;

    if   ((field.type == 'text') 
       || (field.type == 'password') 
       || (field.type == 'textarea'))
    {
        valid = validateText(field);
    }
    else if ((field.type =='select-one') || (field.type == 'select-multiple'))
    {
        valid = validateSelect(field);
    }
    else
    {
        valid = validateGroup(field);
    }

    if (! valid)
    {
        alert(message);
        return false;
    }
    
	return true;
}

// general purpose function to see if a suspected numeric input 
// is a positive or negative number 

function isNumber(inputVal) 
{ 
	oneDecimal = false;
	inputStr = inputVal.toString();

 	for (var i = 0; i < inputStr.length; i++) 
	{ 
		var oneChar = inputStr.charAt(i);

		if (i == 0 && oneChar == "-") 
		{ 
			continue; 
		} 


		if (oneChar == "." && !oneDecimal) 
		{ 
			oneDecimal = true;
			continue; 
		} 

		if (oneChar < "0" || oneChar > "9") 
		{ 
			return false;
		} 
	} 

	return true; 
} 

function validationnumeric( field, message )
{
    if (isNumber(field.value))
    {
        return true;
    }
    else
    {
        alert(message);
        return true;
    }
}

// general purpose function to see if a suspected numeric input 
// is a positive or negative integer 

function isInteger(inputVal) 
{ 
    inputStr = inputVal.toString(); 

    for (var i = 0; i < inputStr.length; i++) 
    { 
        var oneChar = inputStr.charAt(i); 
        
        if (i == 0 && oneChar == "-") 
        { 
            continue; 
        } 
        
        if (oneChar < "0" || oneChar > "9") 
        { 
            return false;
        } 
     } 
     
     return true;
} 

function validationinteger( field, message )
{
    if (isInteger(field.value))
    {
        return true;
    }
    else
    {
        alert(message);
        return true;
    }
}

function validationdate( field, message )
{
    if (isDate(field.value, 'd/M/y')) 
    {
	    return true;
    }
    else
    {
        alert(message);
        return false;
    }
}

function validationemail( field, message )
{
	if (field.value.length<3 || field.value.indexOf('@')==-1)
	{
		field.focus();
		alert(message);
		return false;
	}
	return true;
}

function validateGroup(field)
{
    for (var i = 0; i < field.length; i++)
    {
        if (field[i].checked)
            return true;    
    }

    return false;
}

function validateSelect(field)
{
    for (var i = 0; i < field.length; i++)
    {
        if (field[i].selected)
            return true;    
    }

    return false;
}

function validateText(field)
{
    if (field.value.length == 0)
    {
        field.focus();
        return false;
    }

    return true;
}

