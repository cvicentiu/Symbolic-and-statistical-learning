function setadisland()
{
	var src = document.getElementById("island");
	var tgr = document.getElementById("story_island");
	
	if(src && tgr)
	{
		src.style.position = 'absolute';	
		src.style.left = get_pos_X(tgr ) + 'px';
		src.style.top =  get_pos_Y(tgr ) + 'px';
		src.style.display = 'block';
	}
}

function setadtiles()
{
	if (window.addEventListener) //DOM method for binding an event
		window.addEventListener("load", _setadtiles, false)
	else if(document.addEventListener)
		document.addEventListener("load", _setadtiles, false)
	else if (window.attachEvent) //IE exclusive method for binding an event
		window.attachEvent("onload", _setadtiles)
	else  //support older modern browsers
	{
		var old = window.onload;
		window.onload=function(e)
		{
			old(e);
			_setadtiles();
		};
	}
}

function _setadtiles()
{
	var src = document.getElementById("leftTiles");
	var tgr = document.getElementById("tilesHolder");
	
	if(src && tgr)
	{
		src.style.position = 'absolute';	
		src.style.left = get_pos_X(tgr ) +'px';
		src.style.top =  get_pos_Y(tgr ) + 'px';
		src.style.display = "block";
	}
}


function get_pos_X(element) {
	var current_left = 0;
	
	if (element.offsetParent) {
		while (element.offsetParent) {
			current_left += element.offsetLeft + (document.all ? element.clientLeft : 0);
			element = element.offsetParent;
		}
	} else if (element.x)
		current_left += element.x;

	return current_left;
}

function get_pos_Y(element) {
	var current_top = 0;
	
	if (element.offsetParent) {
		while (element.offsetParent) {
			current_top += element.offsetTop + (document.all ? element.clientTop : 0);
			element = element.offsetParent;
		}
	} else if (element.y)
		current_top += element.y;
	
	return current_top;
}

function searchFocus(obj)
{
	obj.className = "scs";
	if (obj.value == "search")
		obj.value = "";
}

function searchBlur(obj)
{
	if (obj.value == "search" || obj.value == "")
	{
		obj.className = "sc";
		obj.value = "search";
	}
}

function MailToAFriend(url)
{

	if (url == null)
	{
	 var win = window.open(null, "mailtoafriend", "height=500,width=350,status=yes,toolbar=no,menubar=no,location=no");
	} 
	else {
	var win = window;
	}


 win.document.write("<\!DOCTYPE html PUBLIC \"\-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1\-transitional.dtd\">");
 win.document.write("<html>");
 win.document.write("<head>");
 win.document.write("<meta http-equiv=\"content-type\" content=\"text/html\; charset=iso-8859-15\" />");
 win.document.write("<title>RT&Eacute; Mail to a friend</title>");
 win.document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.rte.ie/style/email.css\" />");
 win.document.write("</head>");
 win.document.write("<body>");
 win.document.write("<div id='logo'></div>");
 win.document.write("<form method='post' action='http://dynamic.rte.ie/formhandle/process.php'>");
 win.document.write("<div id='content'>");
 win.document.write("<h1>Email this story to a friend</h1>");
 win.document.write("<div class='itemTitle'>Enter your friend's e-mail address:</div><input type='text' name='to' size='30'/><br/>");
 win.document.write("<div class='itemTitle'>Enter your e-mail address:</div><input type='text' name='from' size='30'/><br/>");

	
	if (url == null)
	{
	 win.document.write("<input type='hidden' name='title' value='"+document.title+"'/>");
	 win.document.write("<input type='hidden' name='url' value='"+document.location+"'/>");
	} 
	else {
	 win.document.write("<input type='hidden' name='url' value='"+url+"'/>");
	}
 
 win.document.write("<div class='itemTitle'>Enter the code in the image below:</div><input type='text' name='input_code'/><br/>");
 win.document.write("<img src='http://dynamic.rte.ie/captcha/captcha2.php'/><br/>");
 win.document.write("<input type='submit' class='button'/><input type='reset' value='Clear' class='button'/><br/>");
 win.document.write("</form>");
 win.document.write("</div>");
 win.document.write("</body>");
 win.document.write("</html>");
 win.document.close();

}
