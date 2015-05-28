



// JavaScript for Southwest Utah Community Health Center, Saint George, Utah
// Author: Susan L. Bolander, Webworks7, except where otherwise noted




// ------------------------------------------------------------------------

// Prevents this site from being framed - if original window is used, opens new
// one and puts original back to page where click occurred

if(window != top)
{
  if(history.length==0)
  {
    top.location = self.location
  }
  else
  {
    window.open(location.href);
    history.go(-1);
  }
}


// ------------------------------------------------------------------------

// Displays expanding menus 

function show(thingtoshow)
{
if(document.layers)  // Netscape 4 can't do this so return to avoid script error message
  {
    return
  }
  if(document.all) // Internet Explorer
  {
    eval('document.all.' + thingtoshow + '.style.display="block"')
  }
  if(!document.all && document.getElementById) // Mozilla and Netscape 6
  {
    document.getElementById(thingtoshow).style.display="block";
  }
}













