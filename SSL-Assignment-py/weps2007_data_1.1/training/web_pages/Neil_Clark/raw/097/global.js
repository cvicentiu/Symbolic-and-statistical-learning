var isIE = document.all;

function UPC_GetElement(id)
{
	var element = document.getElementById ? document.getElementById(id) : document.all ? document.all[id] : document.layers[id];
	return element;
}

// setStyleById: given an element id, style property and 
// value, apply the style.
// args:
//  i - element id
//  p - property
//  v - value
//
function setStyleById(i, p, v) {
    var n = UPC_GetElement(i);
    n.style[p] = v;
}


function winopen(url, winname, width, height) {
	if (winname == null) winname = "popwin";
	if (width == null) width = 400;
	if (height == null) height = 320;
	if (url != null && url.length > 0) {
		var popwin = window.open(url, winname, "width=" + width + ",height=" + height + ",status=no,titlebar=no,toolbar=no,resizeable=no");
		popwin.focus();
	}
}

function winclose(url) {
	if (window.opener)
	{
		if (url != null && url.length > 0 && url != 'refresh')
			window.opener.location.href = url;
		else if (url != null && url == 'refresh')
			window.opener.location.reload();
			
		window.opener.focus();
	}
	window.close();
}

function findPosX(obj)
{
 	var curleft = 0;
	
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	
	return curleft;
}

function findPosY(obj)
{
 	var curtop = 0;
	
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	
	return curtop;
}

// used for Blog CSS StyleSheetSwitcher
function setActiveStyleSheet(title)
{
	var i, a, main;
	for(i = 0; (a = document.getElementsByTagName("link")[i]); i++)
	{
		if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title"))
		{
			a.disabled = true;
			if(a.getAttribute("title") == title) 
				a.disabled = false;
		}
	}
}
	
// used for Blog CSS StyleSheetSwitcher
function movemenu()
{
	var pos;
	if(window.innerHeight)
		pos = window.pageYOffset
	else if(document.documentElement && document.documentElement.scrollTop)
		pos = document.documentElement.scrollTop
	else if(document.body)
		pos = document.body.scrollTop

	if(pos < theTop) 
		pos = theTop;
	
	if(pos == old)
		menu.style.top = pos + "px";
		
	old = pos;
	temp = setTimeout('movemenu()',100);
}

function getQueryString()
{
	var locationstring = location.search.substring(1,location.search.length);
	//gets rid of the leading ?

	if (locationstring.length != 0)
	{
		var args = locationstring.split("&");
		
		var array = new Object();
		
		for (var i = 0; i < args.length; i++) 
		{
			var namevalue = args[i].split("=");
			var thename = unescape(namevalue[0]).toLowerCase();
		
			array[thename] = (namevalue.length == 2 ? unescape(namevalue[1]) : "");
		}

		return array;
	}
}