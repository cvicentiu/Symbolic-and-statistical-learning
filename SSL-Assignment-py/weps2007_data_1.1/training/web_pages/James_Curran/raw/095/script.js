function rollover(idx)
{
	var a;
	
	if(document.all)
		a = document.all("hl");
	else
		a = document.getElementsByName("hl");
	
	if(idx >= a.length)
	{
		return;
	}
	
	for(i=0; i<a.length;i++)
	{
		if(idx != i)
			a[i].style.display = "none";
		else
			a[i].style.display = "block";
	}
}

function writeDate()
{
	document.write((new Date()).toString().substr(0,20));
}


function showPlayer(url)
{
	var win = window.open(url, "rteplayer", "height=560,width=860,status=yes,toolbar=no,menubar=no,location=no");
	win.focus();
}

function showlisting(a,b)
{
	var el1 = document.getElementById("listing" + a);
	var el2 = document.getElementById("listing" + b);
	
	if(el1 != null && el2 != null)
	{
		el1.style.display = "none";
		el2.style.display = "block";
		el2.style.width = "100%";
	}
}


function changeStoryImage (img)
{
	var el = document.getElementById("storyImage" + img);

	for (i=1; document.getElementById("storyImage" + i) != null; i++)
	{
		document.getElementById("storyImageListItem" + i).className = "unselected";
		document.getElementById("storyImage" + i).style.display = "none";
	}
	if(el != null)
	{
		document.getElementById("storyImageListItem" + img).className = "selected";
		el.style.display = "block";
	}

}

function gotoDate(dt)
{
	var new_date = new Date(dt);
	
	if(new_date > today)
		return;
	
	var month = new_date.getMonth()+1;
	if(month < 10) month = "0" + month;

	var date = new_date.getDate();
	if(date < 10) date = "0" + date;

	var new_loc = String(window.location);
	if(re_url.exec(String(window.location)))
	{
		new_loc = new_loc.replace(re_url, "/" + new_date.getFullYear() + "/" +  month + date + "/");
		var pos = new_loc.lastIndexOf("/");
		new_loc = new_loc.substr(0, pos + 1) + "index.html";
	}
	else
	{
		var pos = new_loc.lastIndexOf("/");
		new_loc = new_loc.substr(0, pos + 1) + "/" + new_date.getFullYear() + "/" +  month + date + "/" + "index.html";
	}
	
	window.location = new_loc;
}

function gotoDateProg(dt)
{
	var new_date = new Date(dt);
	
	if(new_date > today)
		return;
	
	var month = new_date.getMonth()+1;
	if(month < 10) month = "0" + month;
	var date = new_date.getDate();
	if(date < 10) date = "0" + date;

	var new_loc = String(window.location);
	new_loc = "/news/" + new_date.getFullYear() + "/" +  month + date + "/" + PROG_FILENAME + ".html";
	
	window.location = new_loc;
}


var CALENDAR_DATE = new Date();
var PROG_FILENAME="index";
function getCalendarDatesAsync(url, dt)
{
	if(Sarissa)
	{
		CALENDAR_DATE = dt;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", url, true);
		
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4) {
		        renderCalendar(CALENDAR_DATE, "gotoDateProg", xmlhttp.responseText)
		    }
		}
		xmlhttp.send(null);
	}
}

function changeMonth(dt)
{
	dt = new Date(dt);
	getCalendarDatesAsync("/news/" + PROG_FILENAME + "/inc/archive.inc", dt.valueOf());
}



function PrintPreview()
{
	var win = window.open();
	win.document.write("<html>");
	win.document.write("<head>");	
	win.document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"/news/style/print.css\" />");
	win.document.write("</head>");
	win.document.write("<body>");	
	win.document.write("<img src=\"/news/images/logo_printable_news.gif\">\n");	
	win.document.write("<hr>");		
	win.document.write(document.getElementById("primaryContent").innerHTML);
	win.document.write("<p><strong>Story from RT&Eacute; News:<br />"+document.location+"</strong></p>");
	win.document.write("</body>");
	win.document.write("</html>");	
	win.document.close();
}

