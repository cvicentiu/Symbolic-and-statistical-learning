Object.prototype.addEvent = function( type, fn ) 
{ 
  var obj = this;
  if ( obj.attachEvent ) 
  { 
    obj['e'+type+fn] = fn; 
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );} 
    obj.attachEvent( 'on'+type, obj[type+fn] ); 
  } else 
    obj.addEventListener( type, fn, false ); 
} 

//this is used to apply prototype inheritance in IE which by the way stinks
function domCreateElement(tagName)
{
	var ie = document.all?true:false;
	if(ie)
	    return document.applyInherit(document.createElement(tagName), new Object());
	else
		return document.createElement(tagName);
}

document.applyInherit = function(original, inter)
{
  for (method in inter)
    original[method] = inter[method];

  return original;
}

function AjaxWindow(id)
{
	this.id = id;
	this.title = "AjaxWindow";
	this.src = "";
	this.height = 300;
	this.width = 400;
	this.left = cursorX;
	this.top = cursorY;
	this.backgroundColor = "#ffffff";	
	this.titleColor = "#e9f4ff";
	this.borderColor = "#89baed";
	this.fontColor = "#25578b";
	this.icon = "/shared/images/header/document.gif";
	this.xmlrpc = new xmlrpc_client("xmlremote", location.hostname);
	this.callback = "";
	
	//add required js files
	//var body = document.getElementsByTagName("body")[0];
	//body.innerHTML += '<scr'+'ipt language="JavaScript" type="text/javascript" src="/shared/plugins/ajaxform/ajaxform.js"><\/scr'+'ipt>'; 
	//body.innerHTML += '<scr'+'ipt language="JavaScript" type="text/javascript" src="/shared/plugins/dataform/dataform.js"><\/scr'+'ipt>'; 
}

//used to store temp copy of the ajaxwindow instance
//because of xmlrpc the original object gets reset
var a_copy = null;

AjaxWindow.prototype.open = function(method, params, iframesrc, callback, callbackParams)
{
	if(parseInt(this.height)+parseInt(this.top) > screenY)
	{
		//move up, the window is hanging off the page
		this.top -= (this.width/2);
	}
	
	if(this.top < 0)
	{
		//move down, the window is too high
		this.top = 0;
		alert('setting top to 0');
	}
	
	if(parseInt(this.width)+parseInt(this.left) > screenX)
	{
		//move left, too far to the right of the screen
		this.left -= (this.width/2);
	}
	
	if (this.left < 0)
	{		
		//move right, too far to the left
		this.left = 0;
	}
	
	if(typeof(iframesrc) != 'string')
	{
		var iframesrc = false;	
	}
	
	this.callback = callback;
	
	if(document.getElementById(this.id))
	{
	
		//this.destroy(this.id);	
	}
	
	var body = document.getElementsByTagName("body")[0];
	var cbp = "";
	if(callbackParams != null)
	{
		
		for(i = 0 ; i <callbackParams.length; i++)
		{
			if(cbp != "")
			{
				
			
				cbp += ",";
			}
			if(typeof(callbackParams[i]) == 'String')
			{
				cbp += "'" + callbackParams[i] + "'";	
			}
			else
			{
				cbp += callbackParams[i];	
			}
		}
	}
	cbp = escape(cbp);
	
	
	//build main window
	var wi = document.createElement("div");
	wi.setAttribute("id", this.id+"-window");
	wi.setAttribute("callbackparams", cbp);
	wi.style.position = "absolute";
	wi.style.left = this.left;
	wi.style.top = this.top;
	wi.style.width = this.width;
	wi.style.height = this.height;
	wi.style.backgroundColor = this.backgroundColor;
	wi.style.border = "1px solid " + this.borderColor;
	wi.style.zIndex = '501';
	
	
	//build title bar
	var titlebar = document.createElement("div");
	titlebar.innerHTML = "<img src="+this.icon+" align=absmiddle>&nbsp;"+this.title;
	titlebar.setAttribute("id", this.id+"-handle");
	titlebar.style.fontSize = "10px";
	titlebar.style.fontWeight = "bold";
	titlebar.style.color = this.fontColor;
	titlebar.style.position = "absolute";
	titlebar.style.top = "1px";
	titlebar.style.left = "1px";
	titlebar.style.backgroundColor = this.titleColor;
	titlebar.style.width = this.width - 20;
	titlebar.style.height = "17px";
	titlebar.style.padding = "2 2 2 2";
	titlebar.style.whiteSpace = "nowrap";
	titlebar.style.cursor = "move";
	wi.appendChild(titlebar, wi);
	
	//build close button
	var cbutton = domCreateElement("div");
	cbutton.setAttribute("id", "buttons-"+this.id);
	//attach the click event
	
	var id = this.id;
	var destroyf = function()
		{
			AjaxWindow.destroy(id,callback);
		};
		
	
	cbutton.addEvent("click", destroyf);
	
	cbutton.style.position = "absolute";
	cbutton.style.backgroundColor = this.titleColor;
	cbutton.style.height = "20px";
	cbutton.style.width = "17px";
	cbutton.style.right = "1px";
	cbutton.style.display = "inline";
	cbutton.style.padding = "0px";
	cbutton.style.whiteSpace = "nowrap";
	cbutton.style.cursor = "pointer";
	cbutton.style.textAlign = "center";
	cbutton.innerHTML = "<img src=/shared/images/close.gif align=bottom style=\"position:relative;top:2px;\">";
	
	
	wi.appendChild(cbutton, wi);
	if(!iframesrc)
	{
		//build body of window
		var wbody = domCreateElement("div");
		wbody.setAttribute("id", this.id);
		wbody.style.position = "absolute";
		wbody.style.padding = "3px";
		wbody.style.top = "20px";
		wbody.style.left = "1px";
		wbody.style.width = this.width - 8;
		wbody.style.height = this.height - 26;
		wbody.style.backgroundColor = this.backgroundColor;
		wbody.style.overflow = "auto";
		
		wi.appendChild(wbody, wi);
	}
	else
	{
		//build body of window
		var wbody = domCreateElement("iframe");
		wbody.setAttribute("id", this.id);
		wbody.setAttribute("src", iframesrc);
		wbody.style.position = "absolute";
		wbody.style.top = "20px";
		wbody.style.left = "1px";
		wbody.style.width = this.width-3;
		wbody.style.height = this.height - 27;
		wbody.style.border = "none";
		wbody.style.backgroundColor = this.backgroundColor;
		wbody.style.overflow = "auto";
		
		wi.appendChild(wbody, wi);		
	}
	body.appendChild(wi,body);
	
	//make the window draggable
	new Draggable(this.id+'-window', {revert:false, handle:this.id+'-handle'});	
	if(!iframesrc)
	{
		//load data
		for(var i=0; i<params.length; i++)
		{
			this.xmlrpc.addParam(params[i]);
		}
		a_copy = this;
	
		//this.xmlrpc.debug = true;
		this.xmlrpc.call(method, a_copy.update);
	}
}

AjaxWindow.prototype.update = function(val)
{

	if(getObjectClass(val) != 'Array')
	{

		var wi = document.getElementById(a_copy.id);
		wi.innerHTML = val;
	}
	else
	{
		var wi = document.getElementById(a_copy.id);
		wi.innerHTML = val[0];
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

function var_dump(obj) {
   if(typeof obj == "object") {
      return "Type: "+typeof(obj)+((obj.constructor) ? "\nConstructor: "+obj.constructor : "")+"\nValue: " + obj;
   } else {
      return "Type: "+typeof(obj)+"\nValue: "+obj;
   }
}//end function var_dump


AjaxWindow.destroy = function(id,callback)
{

	id += '-window';
	
	var body = document.getElementsByTagName("body")[0];
	var win = document.getElementById(id);//TODO THIS NEEDS TO DESTROY ITSELF
	var cvars = unescape(win.getAttribute('callbackparams'));
	if(win!=null)
	{
		body.removeChild(win);
	}	

	if(callback != null)
	{
		
		eval(callback(cvars));
	}
}
