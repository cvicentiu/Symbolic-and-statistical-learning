// new window - dynamic

newWindow = new Object;

newWindow.closed = true;

function popUpWindow(URLStr, left, top, width, height, s, r)
{
	if(!newWindow.closed) {
	newWindow.close();
  }
  
	newWindow = window.open(URLStr, 'newWindow', 
	'toolbar=no,location=no,directories=no,status=no,menub ar=no,copyhistory=yes,width='+width+',height='+height+',left='+left+', top='+top+',screenX='+left+',screenY='+top+', scrollbars='+s+', resizable='+r+'');
}

/*This is an example of a link with the onclick event:

<a href="#" onClick="popUpWindow('path/to/new/window.html', 50, 3, 300, 200, 'no', 'yes'); return false;">open window 1</a>

Change the path so that it points to the file you wish to open. (Make sure the single quotes remain in place!) The attributes:

50, 3, 300, 200, 'no', 'yes'

tell the browser to open a window that is 50 pixels from the left margin, 3 pixels from the top margin, 300 pixels wide, 200 pixels high, 
there will be no window controls, and yes, the window is resizable. All of these can be altered to suit your needs. 
*/
            
//new window end