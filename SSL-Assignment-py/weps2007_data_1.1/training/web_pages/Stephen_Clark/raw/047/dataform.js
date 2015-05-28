var __dataform_element_id;

function __dataform_dependency(field, value, ajax_call, form_name, params, delim)
{
	var f = document.getElementById("dataform_field_"+field);
	var fdata = document.getElementById("dataform_dependency_"+field).getAttribute("value").split(",");

	if(fdata[1]!="")
		var elem = document.getElementById(fdata[1]);

	//checking if multiple dependencies exist
	var dValues = new Array();
	if(fdata[0].indexOf(delim) != -1)
	{
		dValues = fdata[0].split(delim);
	}
	else
	{
		dValues[0] = fdata[0];
	}	
	
	for(var valPos=0; valPos < dValues.length; valPos++)
	{
		var dValue = dValues[valPos];
		if(dValue == value || (dValues.length == 1 && fdata[0] == "*"))
		{
			if(fdata[2] == "true")
			{
				//reload the element via xmlrpc
				var fields = document.forms[form_name];
				var nfields = new Object();
				for(var i=0; i<fields.length; i++)
				{	
					//TODO: add all other special types here
					if(fields[i].type=="radio"||fields[i].type=="checkbox")
					{
						if(fields[i].checked)
							nfields[fields[i].name] = fields[i].value;
					}
					else 
						nfields[fields[i].name] = fields[i].value;
				}
				nfields['__SUBMIT_TYPE'] = "RELOAD_FIELD";
				nfields['__RELOAD_FIELDNAME'] = field;
				nfields['__RELOAD_VALUE'] = value;
				
				__dataform_element_id = field;
				
				var xclient = new xmlrpc_client("xmlremote", document.location.hostname);
				//xclient.debug = true;
				xclient.addParam(ajax_call);
				xclient.addParam(nfields);
				xclient.addParam(params);
				
				//xclient.debug = true;
				xclient.call("ajaxformremote.call", __dataform_reload_field_handler);
			}
			
			if(fdata[1] != "")
				elem.style.display = document.all ? "block" : "TABLE-ROW";//FIREFOX doesn't like block instead prefers TABLE-ROW, but ie doesn't support TABLE-ROW
			
			if(f != null)
				f.style.visibility = "visible";
				
			//removing field from hidden_dependent_fields list (so dataform knows this value is supposed to be submitted)
			var hidDepFields = document.getElementById('hidden_dependent_fields');
			if(hidDepFields.value.indexOf(field) != -1)
			{
				var replaceVal = delim + field;
				var tmpVal = hidDepFields.value.replace(replaceVal, "");
				hidDepFields.value = tmpVal;
			}
			break; // ending once a match is found		
		}
		else
		{
			if(fdata[1]!="")
				elem.style.display = "none";
			
			if(f!=null)
				f.style.visibility = "hidden";
				
			//adding field to hidden_dependent_fields so dataform knows this doesn't need a value (because it is hidden)
			var hidDepFields = document.getElementById('hidden_dependent_fields');
			if(hidDepFields.value.indexOf(field) == -1)
			{
				hidDepFields.value += delim + field;
			}
		}
	}
}

function __dataform_reload_field_handler(val)
{
	var field_div = document.getElementById("dataform_field_div_"+__dataform_element_id);
	field_div.innerHTML = val;
}

function __dataform_on_submit(id)
{	
	var theform = document.getElementById(id);
	
	if (document.all || document.getElementById)
	{
		for (i = 0; i < theform.length; i++) 
		{
			var tempobj = theform.elements[i];
			
			if(tempobj.tagName == 'INPUT' )
			{
				if (tempobj.type.toLowerCase() == "submit")
				{
					tempobj.disabled = true;
					tempobj.value = "Processing...";
				}
			}
			else if(tempobj.tagName == "SELECT" && tempobj.disabled)
			{
				//enabling disabled select fields so that current value is submitted w/ form
				// (we use 'disabled' when we want to make the field read-only)
				tempobj.disabled = false;
			}
		}
	}
	
}