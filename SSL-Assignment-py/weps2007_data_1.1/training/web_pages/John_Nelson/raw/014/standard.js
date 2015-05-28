/* expand on standard dom for those browsers with trouble */
if (typeof Array.prototype.push=='undefined')
{
	Array.prototype.push = function() 
	{
		var i=0;
		a = arguments;
		b = this.length;
		for(i;i<a.length;i++)
			this[b+i]=a[i];
		return this.length
	};
}

/* useful when using window.onload/resize in various places */
function addLoadEvent(f)																																
{
	var oldOnload = window.onload;
	if (typeof window.onload!='function')
		window.onload = f;
	else
	{
		window.onload = function() 
		{
			oldOnload();
			f();
		}
	}
}

function addResizeEvent(f)
{
	var oldResize = window.onload;
	if (typeof window.onresize!='function')
		window.onresize = f;
	else
	{
		window.onresize = function() 
		{
			oldResize();
			f();
		}
	}
}


/* move objects */
function hideNestedObjects(p,n)
{	
	var a = p.getElementsByTagName(n);
	for(var i=0;i<a.length;i++)
	{
		//a[i].style.display = "none";
		changeDisplay(a[i],'none');
	}
}

function changeDisplay(id,displayType)
{
	id.style.display = displayType;
}

function doListSwap(id)
{
	o = document.getElementById(id);
	if (o.style.display=='none'){
	
		changeDisplay(o,'block');
	} else {
		changeDisplay(o,'none');
	}
}


/* urgh, popup code?! */
var newWindow = null;

function closeWin(){
	if (newWindow != null){
		if(!newWindow.closed)
			newWindow.close();
	}
}

function popUpWin(url, type, strWidth, strHeight){
	closeWin();
	
	if (type == "fullScreen"){
		strWidth = screen.availWidth - 10;
		strHeight = screen.availHeight - 160;
	}
	
	var tools="";
	if (type == "standard" || type == "fullScreen") tools = "resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width="+strWidth+",height="+strHeight+",top=0,left=0";
	if (type == "console") tools = "resizable,toolbar=no,location=no,scrollbars=no,width="+strWidth+",height="+strHeight+",left=0,top=0";
	newWindow = window.open(url, 'newWin', tools);
	newWindow.focus();
}


/* urgh, stupid function?! */
function clearDefault(el) {
  if (el.defaultValue==el.value) el.value = ""
}


/* footer height */
function getWindowHeight()
{
	var windowHeight = 0;
	if (typeof(window.innerHeight) == 'number')
	{
		windowHeight = window.innerHeight;
	}
	else
	{
		if (document.documentElement && document.documentElement.clientHeight)
		{
			windowHeight = document.documentElement.clientHeight;
		}
		else
		{
			if (document.body && document.body.clientHeight)
			{
				windowHeight = document.body.clientHeight;
			}
		}
	}
	return windowHeight;
}

function setFooter()
{
	if (document.getElementById)
	{
		var windowHeight = getWindowHeight();
		if (windowHeight > 0)
		{
			var contentHeight = document.getElementById('container').offsetHeight;
			var headerElement = document.getElementById('header');
			var footerElement = document.getElementById('footer');
			var footerHeight  = footerElement.offsetHeight;
			var contentCont = document.getElementById('contentCont');
			
			if (contentHeight>windowHeight)// && windowHeight<contentHeight)
			{
				sHeight = contentHeight;
			}
			else
			{
				contentCont.style.height = ((windowHeight-headerElement.offsetHeight)-35)+'px';
			}
		}
	}
}


/* right colume widths */
function resizeContentCont()
{
	var contentCont = document.getElementById('contentCont');
	var rightCol = document.getElementById('rightCol');
	if (rightCol==null)
	{
		contentCont.style.width = '525px';
		contentCont.style.margin = '0';
	}
	else
	{
		contentCont.style.width = "330px";
	}
}


