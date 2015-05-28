function isInteger(theField, emptyOK, theMessage)
{
	if (theField.value == "")
	{
	if (emptyOK)
	{
		return(true);
	}
	{
		alert(theMessage);
		theField.focus();
		theField.select();
		return (false);
	}
	}

	var i;
	var s = theField.value;
	for (i = 0; i < s.length; i++)
	{
	    var c = s.charAt(i);
	    if (!((c >= "0") && (c <= "9")))
	    {
			alert(theMessage);
			theField.focus();
			theField.select();
	        return (false);
	    }
	}
	if (s > 0)
	{
	return (true);
	}
	{
	alert(theMessage);
	theField.focus();
	theField.select();
	return (false);
	}
}

function isValidEmailAddress(email)
{
	if ((email.indexOf("@") == -1) || (email.indexOf(".") == -1))
	{
		return false;
	}

	return true;
}

function hiderror() {
  document.getElementById('err').innerHTML=""
}

function showError(msg,url,l)
{
	error="<strong>A Javascript error has occured!<br>"
	error+="____________________________________________________<br><br>"
	error+="Error message: " + msg + ".<br>"
	error+="URL: " + url + "<br>"
	error+="Line: " + l + "<br>"
	error+="____________________________________________________<br></strong>"
	error+="<span onmouseover='hiderror()' class='small'>[mouseOver here to hide error message]</span>"
	document.getElementById('err').innerHTML= error;
	self.scroll(0,0);
	
	alert("A Javascript error has occured!\n\nError message: " + msg + "\n\Line: " + l);
	return false;
}

function blockError(){return true;}

function setJSErrorHandling()
{
  //window.onerror = blockError;
  //window.onerror = showError;
  //document.write("<span id='err' onclick='hiderror()'></span>");
}
	
