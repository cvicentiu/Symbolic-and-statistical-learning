var __ajaxform_element_id;
var __ajaxform_callback;

function __ajaxform_submit_onclick(ajax_call, element_id, params, callback)
{
	var fields = document.forms["form1"];
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
	
	__ajaxform_element_id = element_id;
	__ajaxform_callback = callback;
	
	var xclient = new xmlrpc_client("xmlremote", document.location.hostname);
	xclient.addParam(ajax_call);
	xclient.addParam(nfields);
	xclient.addParam(params);
	//xclient.debug = true;
	xclient.call("ajaxformremote.call", __ajaxform_handler);
}

function __ajaxform_handler(val)
{
	if(getObjectClass(val) != 'Array')
	{
		var wi = document.getElementById(__ajaxform_element_id);
		wi.innerHTML = val;
		eval(__ajaxform_callback+"(\'"+escape(val)+"\');");
	}
	else
	{
		//assumed an array of values, first element is the text in the ajax window
		var wi = document.getElementById(__ajaxform_element_id);
		wi.innerHTML = val[0];
		val.shift();
		eval(__ajaxform_callback+"(\'"+escape(val)+"\');");
	}
}

function getObjectClass(obj)
{
    if (obj && obj.constructor && obj.constructor.toString)
    {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);
        return arr && arr.length == 2 ? arr[1] : undefined;
    }
    else
    {
        return undefined;
    }
}