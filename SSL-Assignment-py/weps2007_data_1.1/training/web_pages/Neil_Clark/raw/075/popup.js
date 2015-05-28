

function feedbackForm(){
	if (document.cookie != "")
    {
        var cookieInfo, counter;
        var foundCookie = false;       
        
        // Split the cookies
        cookieInfo = document.cookie.split("; ");
        for (counter=0; counter<cookieInfo.length; counter++)
        {
            // Get the name
            if (cookieInfo[counter].split("=")[0]== "thirdVisit"){
				foundCookie = true;
            }
            
        }
    }
		
	
	if (foundCookie == false){
		var top=self.screenTop; 
		if (top > 9000){
			displayPopup(2,'feedback.aspx','popup2',363,432,(version4 ? event : null))
		}
	} 
}




<!--
// This script allows you to display a popup that does not pop
// off the edge of the screen if the link is toward the edge
// If the link sits on the edge of the screen, the popup will
// pop the other direction
// also allows a popcenter in the middle of the screen
// -->

var version4 = (navigator.appVersion.charAt(0) == "4"); 
var popupHandle;
function closePopup() {
if(popupHandle != null && !popupHandle.closed) popupHandle.close()
}


function displayPopup(position,url,name,height,width,evnt)
{
// position=1 POPUP: makes screen display up and/or left, 
//    down and/or right
// depending on where cursor falls and size of window to open
// position=2 CENTER: makes screen fall in center

var properties = "toolbar=0,location=0,height="+height
properties = properties+",width="+width
properties = properties+",scrollbars=yes, resizeable=yes"

var leftprop, topprop, screenX, screenY, cursorX, cursorY, padAmt

if(navigator.appName == "Microsoft Internet Explorer") 
{
	screenY = document.body.offsetHeight
	screenX = window.screen.availWidth
}
else
{ // Navigator coordinates
	screenY = window.outerHeight
	screenX = window.outerWidth
}

if(position == 1)	// if POPUP not CENTER
{
	cursorX = evnt.screenX  
	cursorY = evnt.screenY 
	padAmtX = 10
	padAmtY = 10
	
	if((cursorY + height + padAmtY) > screenY)	
	// make sizes a negative number to move left/up
	{
		padAmtY = (-30) + (height*-1);	
		// if up or to left, make 30 as padding amount
	}
	if((cursorX + width + padAmtX) > screenX)
	{
		padAmtX = (-30) + (width*-1);	
		// if up or to left, make 30 as padding amount
	}

	if(navigator.appName == "Microsoft Internet Explorer") 
	{
		leftprop = cursorX + padAmtX
		topprop = cursorY + padAmtY
	}
	else
	{ // adjust Netscape coordinates for scrolling
		leftprop = (cursorX - pageXOffset + padAmtX)
		topprop = (cursorY - pageYOffset + padAmtY)
	}
}
else	// CENTER
{
	leftvar = (screenX - width) / 2
	rightvar = (screenY - height) / 2
		
	if(navigator.appName == "Microsoft Internet Explorer") 
	{
		leftprop = leftvar
		topprop = rightvar
	}
	else
	{ // adjust Netscape coordinates for scrolling
		leftprop = (leftvar - pageXOffset)
		topprop = (rightvar - pageYOffset)
	}
}

if(evnt != null)
{
properties = properties+",left="+leftprop
properties = properties+",top="+topprop
}
closePopup()
popupHandle = open(url,name,properties)
}

//-->
