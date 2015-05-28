function toggleBookmarkForm(id)
{
	var bk = $("bookmarkform");
	var savebtn = document.frmBk.btnSave;
	savebtn.onclick=function(){handleBookmark(id)};
	
	var title = $("bookmarkform-title");

	while(title.hasChildNodes())
			title.removeChild(title.firstChild);
	
	if(id == 0)
	{
		title.appendChild(document.createTextNode("Add Bookmark"));			
		
		if(bk.style.visibility=="hidden"||bk.style.visibility=="")
		{
			setBkTitle();
			bk.style.visibility = "visible";
		}
		else
		{
			bk.style.visibility = "hidden";	
			var prog = $("progress");
			prog.style.visibility = "hidden";
		}
	}
	else
	{
		
		var bookmark = $("link-"+id);

		title.appendChild(document.createTextNode("Edit Bookmark"));
					
		if(bk.style.visibility=="hidden"||bk.style.visibility=="")
		{
			if(document.all)
			{
				document.frmBk.bkTitle.value = bookmark.innerText;
			}
			else
			{
				document.frmBk.bkTitle.value = bookmark.textContent;
			}
			
			document.frmBk.bkLink.value = arr_links[id];
			bk.style.visibility = "visible";
		}
		else
		{
			bk.style.visibility = "hidden";	
			var prog = $("progress");
			prog.style.visibility = "hidden";
		}
	}
}

function setBkTitle()
{
	if( (document.frmBk != null) && (typeof(document.frmBk) != "undefined"))
	{
		if(document.title != null && typeof(document.frmBk.bkTitle) != "undefined" )
		{
			document.frmBk.bkTitle.value = document.title;
		}
		if(typeof(document.frmBk.bkTitle) != "undefined")
		document.frmBk.bkLink.value = window.location.href;

	}
}

function handleBookmark(id)
{

	var title = document.frmBk.bkTitle.value;
	var link = document.frmBk.bkLink.value;

	//deactivate buttons
	document.frmBk.btnSave.disabled = true;
	document.frmBk.btnClear.disabled = true;
	//show progress
	var prog = $("progress");
	prog.style.visibility = "visible";
	prog.innerHTML = "Saving...";

	var rpcclient = new xmlrpc_client("xmlremote", WEB_ADDRESS);
	rpcclient.addParam(id);
	rpcclient.addParam(title);
	rpcclient.addParam(link);
	rpcclient.call("header.handleBookmark", handleBk); 
}
	
function handleBk(retval)
{	
	//activate buttons
	document.frmBk.btnSave.disabled = false;
	document.frmBk.btnClear.disabled = false;
	
	//hide progress
	var prog = document.getElementById("progress");
	prog.innerHTML = retval;
	
	updateBookmarks();
}

function updateBookmarks()
{
	//update bookmark
	var rpcclient = new xmlrpc_client("xmlremote", WEB_ADDRESS);
	rpcclient.addParam(window.location.href);
	rpcclient.call("header.getBookmarks", handleUpdateBookmarks); 	
}

function handleUpdateBookmarks(retval)
{
	var html = retval[0];
	arr_links = retval[1];
	var bk = $("bookmarks");
	bk.innerHTML = html;
	setupEvents();
}


function setupEvents()
{

	var trs = document.getElementsByTagName('tr');
	var linkcount = 0;
	for(var i=0; i<trs.length; i++)
	{
		if(trs[i].id.substr(0,8) == "linkrow-")
			linkcount++;
	}
	if(linkcount > 7)
	{
		
		var bookmarks = $("bookmarks");
		if(bookmarks != null)
		{
			bookmarks.style.height = (document.all ? '150' : '140') + 'px';
			bookmarks.style.overflow = 'auto';
		}
	}
}

var bkcounter = 0;
var bkAllowHide = true;
function showBk()
{
	if(bkcounter > 1)
		return;
	var bt = $('bookmarktext');
	var bc = $('bookmarkContainer');
	var x = getPosX(bt);
	var y = getPosY(bt);
	bc.style.left = x - 100;
	bc.style.top = y + (document.all ? 0 : -3);
	bc.style.display="block";
}
function hideBk()
{
	if(!bkAllowHide)
		return;
	var bc = $('bookmarkContainer');
	bc.style.display="none";
	bkcounter = 0;
}	
function bk_MouseIn()
{
	bkcounter++;
	showBk();
}
function bk_MouseOut()
{
	bkcounter--;
	if(bkcounter < 0)
		bkcounter = 0;
	window.setTimeout("if(bkcounter < 1)hideBk()", 500);
}
	
function doDelete(id)
{	
	if(confirm("Are you sure you want to remove this bookmark?"))
	{
		var rpcclient = new xmlrpc_client("xmlremote", location.host);
		rpcclient.addParam(id);
		rpcclient.call("header.delBookmark", handleReturnBk); 
	}
}

function handleReturnBk(ret)
{
	if(ret=="OK")
	{
		updateBookmarks();	
	}
	else
	{
		alert(ret);	
	}
}

function doMove(id, dir)
{
	var rpcclient = new xmlrpc_client("xmlremote", location.host);
	rpcclient.addParam(id);
	rpcclient.addParam(dir);
	rpcclient.call("header.changeOrder", handleReturnBk); 
}
	
function getPosX(obj)
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
function getPosY(obj)
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

var bubble_forums_counter = 0;
function bubble_forums_mouseIn() {
	bubble_forums_counter++;
	bubble_forums_show();
}
function bubble_forums_mouseOut() {
	bubble_forums_counter--;
	window.setTimeout("if(bubble_forums_counter == 0)bubble_forums_hide()", 500);
}
function bubble_forums_hide()
{
	$('bubble_forums').style.display = "none";
}
function bubble_forums_show()
{
	$('bubble_forums').style.display = "block";
}
function bubble_forums_toggle()
{
	var d = $('bubble_forums').style;
	d.display = (d.display == "block" ? "none" : "block");
	return false;
}

function addLoadEvent(func)
{
	var oldonload = window.onload;
	if (typeof window.onload != 'function')	
	{
		window.onload = function()
		{
			func();
		}
	} 
	else 
	{
		window.onload = function() 
		{
			oldonload();
			func();
		}
	}
}
 
function headerOnPageLoad()
{
	var bForum = $("bubble_forums");
	if(document.all)
	{
		//IE can't calculate offsetTop or offsetLeft of relative-positioned elements
		bForum.style.top = "72px";
		bForum.style.left = "38px";
	}
	else
	{
		var aForum = document.getElementById("forums_arrow");
		var aX = getPosX(aForum);
		var aY = getPosY(aForum);
		bForum.style.top = (aY + 5) + "px";
		bForum.style.left = (aX - 243) + "px";
	}
}

function mouseBookmarkRow(bkid, bg, vis)
{
	$('linkrow-'+bkid).style.backgroundColor=bg;
	$('linkbuttons-'+bkid).style.visibility=vis;
}