
/*
TODO
handle multicall
add timeout
research gzip compression on large data
*/

/* 
 *  XMLRPC ENCODING SECTION
 *  prototype javascript objects to encode XMLRPC value 
 */
Object.prototype.toXMLRPC = function()
{
	var wo = this.valueOf();
	if(wo.toXMLRPC == this.toXMLRPC)
	{
		retstr = "<struct>";
		
		for(prop in this)
		{
			if(typeof wo[prop] != "function")
			{				
				retstr += "<member><name>" + prop + "</name><value>" + wo[prop].toXMLRPC() + "</value></member>";
			}
		}
		retstr += "</struct>";
		
		return retstr;
	}
	else
	{
		return wo.toXMLRPC();
	}
}

String.prototype.toXMLRPC = function()
{
	//<![CDATA[***your text here***]]>
	return "<string><![CDATA[" + this.replace(/\]\]/g, "] ]") + "]]></string>";//.replace(/</g, "&lt;").replace(/&/g, "&amp;")
}

Number.prototype.toXMLRPC = function()
{
	if(this == parseInt(this))
	{
		return "<int>" + this + "</int>";
	}
	else if(this == parseFloat(this))
	{
		return "<double>" + this + "</double>";
	}
	else
	{
		return false.toXMLRPC();
	}
}

Boolean.prototype.toXMLRPC = function()
{
	if(this) return "<boolean>1</boolean>";
	else return "<boolean>0</boolean>";
}

Date.prototype.toXMLRPC = function()
{
	//Could build in possibilities to express dates 
	//in weeks or other iso8601 possibillities
	//hmmmm ????
	//19980717T14:08:55
	return "<dateTime.iso8601>" + doYear(this.getUTCYear()) + doZero(this.getMonth()) + doZero(this.getUTCDate()) + "T" + doZero(this.getHours()) + ":" + doZero(this.getMinutes()) + ":" + doZero(this.getSeconds()) + "</dateTime.iso8601>";
	
	function doZero(nr) 
	{
		nr = String("0" + nr);
		return nr.substr(nr.length-2, 2);
	}
	
	function doYear(year) 
	{
		if(year > 9999 || year < 0) 
			XMLRPC.handleError(new Error("Unsupported year: " + year));
			
		year = String("0000" + year)
		return year.substr(year.length-4, 4);
	}
}

Array.prototype.toXMLRPC = function()
{
	var retstr = "<array><data>";
	for(var i=0;i<this.length;i++)
	{		
		retstr += "<value>" + this[i].toXMLRPC() + "</value>";
	}
	return retstr + "</data></array>";
}
/* 
 *  END XMLRPC ENCODING SECTION
 */

function xmlrpc_client(path, server, port)
{
	this.xmlhttp = new XMLHttpRequest();	
	this.path = path;
	this.server = server;
	this.port = port;
	this.params = new Array();
	this.debug = false;
	this.callback;

}

xmlrpc_client.prototype.call = function(method, callback)
{
	try
	{
		//open http call
		path = "http://"+this.server+"/"+this.path;
		this.xmlhttp.open("POST", path, true);
		this.callback = callback;
	
		//set event handler
		this_copy = this;
		this.xmlhttp.onreadystatechange=function()
		{
			if(this_copy.xmlhttp.readyState==4)
				this_copy.handleResponse(this_copy.xmlhttp, this_copy.callback);
		}
		
		//set header information
		this.xmlhttp.setRequestHeader("User-Agent", "XML-RPC (" + navigator.userAgent + ")");
		this.xmlhttp.setRequestHeader("Host", this.server.replace(/^https?:\/{2}([:\[\]\-\w\.]+)\/?.*/, '$1'));
		this.xmlhttp.setRequestHeader("Referer", window.location.href);
		this.xmlhttp.setRequestHeader("Content-type", "text/xml");
		
		//build xml message header
		var message = "";
		message += '<?xml version="1.0"?>\r\n';
		message += "<methodCall>\r\n";
		message += "<methodName>" + method + "</methodName>\r\n";
		
		//build xml message parameters
		message += "<params>\r\n";
			
		for(i=0;i<this.params.length;i++)
		{
			message += "<param><value>"+this.getXMLParam(this.params[i])+"</value></param>\r\n";
		}
		
		message += "</params>\r\n";
		message += "</methodCall>\r\n";
		
		if(this.debug)
			alert("DEBUG in call:\r\n"+message);
			
		this.xmlhttp.send(message);
	}
	catch(e)
	{
		//handle any errors
		alert(e);
	}
}

/*
 * Encodes javascript variable to corresponding XMLRPC value
 */
xmlrpc_client.prototype.getXMLParam = function(obj)
{
	if(typeof obj == "function")
	{
		this.handleError(new Error("Cannot Parse functions"));
	}
	else if(obj == null || obj == undefined || (typeof obj == "number" && !isFinite(obj)))
		return false.toXMLRPC();
	else
		return obj.toXMLRPC();
}

/*
 * Adds a parameter to the clients params array
 */
xmlrpc_client.prototype.addParam = function(param)
{
	this.params.push(param);		
}

xmlrpc_client.prototype.handleResponse = function(http, callback)
{
	if(this.debug)
		alert("DEBUG in handle:"+http.responseText);
		
	if(http.status == 200)
	{
		dom = http.responseXML;
	   	var rpcErr, main;
	   	//Check for XMLRPC Errors

		// the dom is not present, then we return
		if( !dom  )
		{
			return;
		}

	   	rpcErr = dom.getElementsByTagName("fault");
	   	if(rpcErr.length > 0)
	   	{
	   		rpcErr = this.toObject(rpcErr[0].firstChild);
	   		this.handleError(new Error(rpcErr.faultCode, rpcErr.faultString));
	   		return false
		}
	   	//handle method result
	   	main = dom.getElementsByTagName("param");
		if(main.length == 0) this.handleError(new Error("Malformed XMLRPC Message"));

		data = this.toObject(this.getNode(main[0], [0]));

		callback(data);
	}
	else
	{
//		this.handleError("status error");
//		this.handleError(new Error("status error"));
	}
}

xmlrpc_client.prototype.toObject = function(data)
{

//alert(data.tagName);
	var ret, i;
	switch(data.tagName)
	{
		case "string":

			var final_str = "";
			var ncount = data.childNodes.length;
			for( var i = 0 ; i < ncount ; i++ )
			{
				final_str += data.childNodes[i].nodeValue;
			}

			return new String(final_str);

// this is the old line... it only returns the first child.
// lesson to be learned... when the dom has a node that is greater than a set size, in this case 4096, it splits
// the value into different nodes.

//			return (data.firstChild) ? new String(data.firstChild.nodeValue) : "";
			break;
		case "int":
		case "i4":
		case "double":
			return (data.firstChild) ? new Number(data.firstChild.nodeValue) : 0;
			break;
		case "array":
			data = this.getNode(data, [0]);
			
			if(data && data.tagName == "data")
			{
				ret = new Array();	
				var i = 0;
				while(child = this.getNode(data, [i++]))
				{
  					ret.push(this.toObject(child));
				}				
				return ret;
			}
			else
			{
				this.handleError(new Error("Malformed XMLRPC Message1"));
				return false;
			}
			break;
		case "struct":
			ret = {};
			var i = 0;
			while(child = this.getNode(data, [i++]))
			{
				if(child.tagName == "member")
				{
					ret[this.getNode(child, [0]).firstChild.nodeValue] = this.toObject(this.getNode(child, [1]));
				}
				else
				{
					this.handleError(new Error("Malformed XMLRPC Message2"));
					return false;
				}
			}			
			return ret;
			break;
		case "boolean":
			return Boolean(isNaN(parseInt(data.firstChild.nodeValue)) ? (data.firstChild.nodeValue == "true") : parseInt(data.firstChild.nodeValue))
			break;
		case "value":
			child = this.getNode(data, [0]);
			return (!child) ? ((data.firstChild) ? new String(data.firstChild.nodeValue) : "") : this.toObject(child);
			break;
		default:
			this.handleError(new Error("Malformed XMLRPC Message: " + data.tagName));
			return false;
			break;
	}
}

xmlrpc_client.prototype.getNode = function(data, tree)
{

	var nc = 0;//nodeCount
	//node = 1
	if(data != null)
	{
		for(i=0;i<data.childNodes.length;i++)
		{
			if(data.childNodes[i].nodeType == 1)
			{
				if(nc == tree[0])
				{
					data = data.childNodes[i];
					if(tree.length > 1)
					{
						tree.shift();
						data = this.getNode(data, tree);
					}
					return data;
				}
				nc++
			}
		}
	}	
	return false;
}



xmlrpc_client.prototype.handleError=function(e)
{
	throw e;	
}



