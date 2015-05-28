var DH = 0;
var an = 0;
var al = 0;
var ai = 0;
if (document.getElementById) 
{
	ai = 1; 
	DH = 1;
}
else 
{
	if (document.all) 
	{
		al = 1; 
		DH = 1;
	} 
	else 
	{ 
		browserVersion = parseInt(navigator.appVersion);
		if ((navigator.appName.indexOf('Netscape') != -1) && (browserVersion == 4)) 
		{
			an = 1; 
			DH = 1;
		}
	}
} 

function fd(oi,ws) 
{
	if (ws == 1) 
	{
		if (ai) 
		{
			return (document.getElementById(oi).style);
		}
		else 
		{
			if (al) 
			{
				return (document.all[oi].style);
			} 
			else 
			{
				if (an) 
				{
					return (document.layers[oi]);
				}
			}
			;
		}
	}
	else 
	{
		if (ai) 
		{
			return (document.getElementById(oi));
		} 
		else 
		{
			if (al) 
			{
				return (document.all[oi]);
			} 
			else 
			{
				if (an) 
				{
					return (document.layers[oi]);
				}
			}
			;
		}
	}
}



function pw() 
{
	if (window.innerWidth != null) 
		return window.innerWidth; 
	if (document.body.clientWidth != null)
		return document.body.clientWidth; 
	return (null);
} 

function ph() 
{
	if (window.innerHeight != null) 
		return window.innerHeight; 
	if (document.body.clientHeight != null)
		return document.body.clientHeight; 
	return (null);
} 

function popUp(evt, oi, _fixed)
{
	if (DH) 
	{
		var wp = pw(); 
		var hp = ph(); 
		
		ds = fd(oi,1);
		dm = fd(oi,0); 
		st = ds.visibility; 
		if (dm.offsetWidth) 
			ew = dm.offsetWidth; 
		else if ((dm.clip) && (dm.clip.width))
			ew = dm.clip.width; 
		if (dm.offsetHeight) 
			eh = dm.offsetHeight; 
		else if ((dm.clip) && (dm.clip.height))
			eh = dm.clip.height; 

		if (evt.type == "mouseout") 
		{ 
			ds.visibility = "hidden"; 
			cmShowControl(dm);
		} 
		else  
		{ 
			if (_fixed == true)
			{
			}
			else if (evt.y || evt.pageY) 
			{
				if (evt.pageY) 
				{
					tv = evt.pageY + 20;
					lv = evt.pageX;
				} 
				else 
				{
					tv = evt.y + 20 + document.body.scrollTop; 
					lv = evt.x + document.body.scrollLeft;
				} 
				if (lv < 2)
					lv = 2; 
				else if (lv + ew > wp)
					lv -= ew/2;
				
				if (tv < 2)
					tv = 2; 
				else if (tv + eh > hp)
					tv -= eh/2;

				if (!an) 
				{
					lv += 'px';
					tv += 'px'
				};
				ds.left = lv; 
				ds.top = tv;
			} 

			if (document.all)	// it is IE
			{
				if (!dm.cmOverlap) {
					dm.cmOverlap = new Array ();
				}
				cmHideControl ("SELECT", dm);
			}

			ds.visibility = "visible";
		}
	}
}

//
// functions that obtain the coordinates of an HTML element
//
function cmGetX (obj)
{
	var x = 0;

	do
	{
		x += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	while (obj);
	return x;
}

function cmGetY (obj)
{
	var y = 0;
	do
	{
		y += obj.offsetTop;
		obj = obj.offsetParent;
	}
	while (obj);
	return y;
}

//
// hide a control such as IFRAME
//
function cmHideControl (tagName, toolTip)
{
	var x = cmGetX (toolTip);
	var y = cmGetY (toolTip);
	var w = toolTip.offsetWidth;
	var h = toolTip.offsetHeight;

	var i;
	for (i = 0; i < document.all.tags(tagName).length; ++i)
	{
		var obj = document.all.tags(tagName)[i];
		if (!obj || !obj.offsetParent)
			continue;

		// check if the object and the toolTip overlap

		var ox = cmGetX (obj);
		var oy = cmGetY (obj);
		var ow = obj.offsetWidth;
		var oh = obj.offsetHeight;

		//alert('x:'+x+' y:'+y+' w:'+w+' h:'+h+' ox:'+ox+' oy:'+oy+' ow:'+ow+' oh:'+oh);

		if (ox > (x + w) || (ox + ow) < x)
			continue;
		if (oy > (y + h) || (oy + oh) < y)
			continue;

		// if object is already made hidden by a different
		// toolTip then we dont want to put it on overlap list of
		// of a toolTip a second time.
		// - bug fixed by Felix Zaslavskiy
		if(obj.style.visibility == "hidden")
			continue;

		//toolTip.cmOverlap.push (obj);
		toolTip.cmOverlap[toolTip.cmOverlap.length] = obj;
		obj.style.visibility = "hidden";
	}
}

//
// show the control hidden by the subMenu
//
function cmShowControl (toolTip)
{
	if (toolTip.cmOverlap)
	{
		var i;
		for (i = 0; i < toolTip.cmOverlap.length; ++i)
			toolTip.cmOverlap[i].style.visibility = "visible";
	}
	toolTip.cmOverlap = null;
}
