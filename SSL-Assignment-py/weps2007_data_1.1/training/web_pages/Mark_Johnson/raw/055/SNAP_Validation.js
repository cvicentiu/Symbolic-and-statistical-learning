<!--



/*
	Rule Object
*/

function SNAP_Rule(_type, _elements, _parameters, _required, _message)
{
	this._type = _type;
	this._elements = _elements;
	this._parameters = _parameters;
	this._required = _required;
	this._message = _message;
	
	this.getType = SNAP_Rule_getType;
	this.getElements = SNAP_Rule_getElements;
	this.getParameters = SNAP_Rule_getParameters;
	this.getRequired = SNAP_Rule_getRequired;
	this.getMessage = SNAP_Rule_getMessage;
}

	
function SNAP_Rule_getType()
{
	return this._type;
}


function SNAP_Rule_getElements()
{
	return this._elements;
}


function SNAP_Rule_getParameters()
{
	return this._parameters;
}


function SNAP_Rule_getRequired()
{
	return this._required;
}


function SNAP_Rule_getMessage()
{
	return this._message;
}




/*
	valdiation Object
*/

function SNAP_Validation(_form_id)
{
	this._form_id = _form_id;
	this._rules = new Array();
	this._errors = new Array();
	
	this.addRule = SNAP_Validation_addRule;
	this.getRules = SNAP_Validation_getRules;
	this.addError = SNAP_Validation_addError;
	this.getErrorString = SNAP_Validation_getErrorString;
	this.validate = SNAP_Validation_validate;
}
	
	
function SNAP_Validation_addRule(_type, _elements, _parameters, _required, _message)
{
	this._rules[this._rules.length] = new SNAP_Rule(_type, _elements, _parameters, _required, _message);
}


function SNAP_Validation_getRules()
{
	return this._rules;
}



function SNAP_Validation_addError(_message)
{
	this._errors[this._errors.length] = _message;
}


function SNAP_Validation_getErrorString()
{
	return this._errors.join("\n");
}


function SNAP_Validation_validate(_mode)
{
	var rules = this.getRules();
	var length = rules.length;
	for (var i = 0; i < length; i++)
	{
		var rule = rules[i];
		
		var elements_ids = rule.getElements();
		var elements = new Array();
		
		try
		{
			for (var n = 0; n < elements_ids.length; n++)
				elements[n] = document.getElementById(elements_ids[n]);
		}
		catch (e_e)
		{
			alert('Could not get a reference on element from id ' + elements_ids[n]);
		}
		
		try
		{
			var rule_name = rule.getType().toLowerCase();
			if (!eval(rule_name)(elements, rule.getParameters(), rule.getRequired()))
				this.addError(rule.getMessage());
		}
		catch (e1)
		{
			try
			{
				rule_name = 'SNAP_checkRule_' + rule.getType().toLowerCase();
				if (!eval(rule_name)(elements, rule.getParameters(), rule.getRequired()))
					this.addError(rule.getMessage());
			}
			catch (e2)
			{
			}

		}
	}
	
	if (this._errors.length > 0)
	{
		if (String(_mode).toLowerCase() != 'quiet')
			alert(this.getErrorString())
		return false;
	}
	
	return true;	
}





/*
	Returns the element at index "_index" in array or error if element or index not valid.
*/

function SNAP_getElementIdAtIndex(_elements, _index)
{
	if (!SNAP_Utils_isArray(_elements))
	{
		alert("Invalid elements array.");
		return null;
	}
	
	var element = _elements[_index];
	if (element.type == "undefined")
	{
		alert("Undefined element (wrong index ?)");
		return null;
	}
	
	return element;
}



/*
	Included in a function just in case we need 
	to do a bit more work to wrap type detection.
*/

function SNAP_getElementType(_element)
{
	return _element.type;
}



/*
	Gets the value of an element (depending on its type).
*/

function SNAP_getElementValue(_element)
{
	switch (SNAP_getElementType(_element))
	{
		case "text" :
			return _element.value;
			break;
	
		case "password" :
			return _element.value;
			break;
			
		case "textarea" :
			return _element.value;
			break;
			
		case "checkbox" :
			return _element.checked;
			break;
		case "select-one" :
			return _element.options[_element.selectedIndex].value;
			break;
	}
}


function SNAP_Utils_isArray(_obj)
{
	if (_obj.constructor.toString().indexOf("Array") == -1)
		return false;
	else
		return true;
}


/*
	returns TRUE if a string contains only numbers, FALSE otherwise
*/
function SNAP_Utils_isNumeric(_string)
{
	var found = _string.search(/[0-9]/);
	if (found > 0)
	{
		found = _string.search(/[A-Za-z]/);
		if (found > 0)
			return false;
		
		return true;
	}
	
	return false;
}



/*
	returns TRUE if a string contains only alpha characters, FALSE otherwise
*/
function SNAP_Utils_isAlpha(_string)
{
	var found = _string.search(/[A-Za-z]/);
	if (found > 0)
	{
		found = _string.search(/[0-9]/);
		if (found > 0)
			return false;
			
		return true;
	}
	
	return false;
}



/*
	returns TRUE if a string contains any alpha or numeric character (+ the "_" and the "-")
*/
function SNAP_Utils_isAlphaNumeric(_string)
{
	var found = _string.search(/\w|(\w+-\w+)/);
	if (found > 0)
		return true;
	else
		return false;
}


/*
	returns true if the string is a whole number
*/
function SNAP_Utils_isWholeNumber(_value)
{
	var number = Number(_value);
	if (isNaN(number))	{
		return false;
	}
	if (parseInt(_value) != number)	{
		return false;
	}

	return true;
}

/*
	returns true if the number is negative
*/
function SNAP_Utils_isNegative(_value)
{
	var number = Number(_value);
	if (isNaN(number))
		return false;
	if (number < 0)
		return true;
	return false;
}



//-->