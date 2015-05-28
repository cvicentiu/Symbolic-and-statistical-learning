/////////////////////////////////////////////////////////////////////////
// Netscape 4 resize bugfix from Macromedia Dreamweaver
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
   if (init==true) with (navigator) {if 
((appName=="Netscape")&&(parseInt(appVersion)==4)) {
     document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; 
onresize=MM_reloadPage; }}
   else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) 
location.reload();
}
MM_reloadPage(true);
// End resize bugfix
/////////////////////////////////////////////////////////////////////////

// Global Javascript available for use by any page
function switchImage(imgSrc, imgName)
{

  // mouse on/off any image not contained in a layer
  if(document.images)
    {
	document[imgName].src = imgSrc;
    }
}

function preLoadImages()
{
  // preload images: pass in as many as you wish
  var images = new Array();
  for(i = 0; i<preLoadImages.arguments.length;i++)
  {
    images[i] = new Image();
    images[i].src = preLoadImages.arguments[i];
  }
}

// useful functions to control/limit special stuff showing up
// such as number of times a flash piece or popup shows
function showSpecial(cookieName, expDays) 
 {
   var exp = new Date(); 
   //exp.setTime(exp.getTime() + (expDays*24*60*60*1000)); // in days
   exp.setTime(exp.getTime() + (expDays*60*1000)); // in minutes

   var count = getCookie(cookieName);
   if (count == null) 
    {
      count = 1;
      setCookie(cookieName, count, exp);
	//alert ('showing ' + cookieName);
      return true;
    }
   else 
    {
        // having the next line in place changes the behavior: if you do it,
	// then the expiration date will be extended after every visit, instead
	// of being based off the first visit (or the last time the Flash piece
	// was shown)
	//count++;
        //setCookie('showFlash', count, exp); 
	//alert ('no flash');
      return false;
    }
 }


// new routine July/11/2005
function showSpecialSession(cookieName, expDays)
{
   // should we do something special? if we haven't done it for expDays days, 
   //  then return true, otherwise return false.
   // uses cookies good for this session only. stores the timestamp of the last view.
			
   last_viewed = getCookie(cookieName)*1.; // timestamp
   now_ts = new Date().getTime();
			
   if( last_viewed && last_viewed>1120866554791 )
   { 
			
      // cookie exists...they've seen it before
      if( now_ts < (last_viewed + expDays*24*60*60*1000) ) {
          return false; // waiting period not yet over
      }
      // waiting period IS over, reset cookie with current timestamp
          setCookie(cookieName,now_ts); 
          return true;
				
   }			
   else 
   {
			
      // not previously viewed
      setCookie(cookieName,now_ts);
      return true;
   }

}




function getCookie (cookieName)
 {   
   cookieName = cookieName + "=";  
   var cookieNameLength = cookieName.length;  
   var cookieLength = document.cookie.length;  

   var i = 0;  
   while (i < cookieLength) 
    {    
      var j = i + cookieNameLength;    
      if (document.cookie.substring(i, j) == cookieName)      
	return getCookieVal (j);    
      i = document.cookie.indexOf(" ", i) + 1;    
      if (i == 0)
	break;   
    }  
   return null;
 }

 function setCookie (cookieName, cookieValue) 
  {  
    var argv = setCookie.arguments;  
    var argc = setCookie.arguments.length;  
    var expires = (argc > 2) ? argv[2] : null;  
    var path = (argc > 3) ? argv[3] : null;  
    var domain = (argc > 4) ? argv[4] : null;  
    var secure = (argc > 5) ? argv[5] : false;  
    document.cookie = cookieName + "=" + escape (cookieValue) + 
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + 
	((path == null) ? "" : ("; path=" + path)) +  
	((domain == null) ? "" : ("; domain=" + domain)) +    
	((secure == true) ? "; secure" : "");
  }

function deleteCookie (cookieName) 
 {  
   var exp = new Date();  
   exp.setTime (exp.getTime() - 1);  
   var cval = getCookie (cookieName);  
   document.cookie = cookieName + "=" + cval + "; expires=" + exp.toGMTString();
 }


function getCookieVal(offset) 
 {
   var endstr = document.cookie.indexOf (";", offset);
   if (endstr == -1)
	endstr = document.cookie.length;
   return unescape(document.cookie.substring(offset, endstr));
 }

// Slightly less complex than the onload one below,
// because it doesn't need to deal so much with <body onload=>
// situations
function addOnResizeEvent(generic)
{
       //if there's an existing onresize function
        if(typeof window.onresize == 'function')
        {
                //store it
                var existing = onresize;

                //add new onload handler
                window.onresize = function()
                {
                        //call existing onload function
                        existing();

                        //call generic onload function
                        generic();
                };
        }
        else
        {
                //setup onresize function
                window.onresize = generic;
        }

}

// Generic event "adder"--pass in either "resize" or "load" for 
// "onResize" or "onLoad" -- based on code from 
// http://www.brothercake.com/site/resources/scripts/onload/
//setup onload function
function addOnLoadEvent(generic)
{
if(typeof window.addEventListener != 'undefined')
{
	//.. gecko, safari, konqueror and standard
	window.addEventListener('load', generic, false);
}
else if(typeof document.addEventListener != 'undefined')
{
	//.. opera 7
	document.addEventListener('load', generic, false);
}
else if(typeof window.attachEvent != 'undefined')
{
	//.. win/ie
	window.attachEvent('onload', generic);
}

//** remove this condition to degrade older browsers
else
{

	//.. mac/ie5 and anything else that gets this far
	
	//if there's an existing onload function
	if(typeof window.onload == 'function')
	{
		//store it
		var existing = onload;
		
		//add new onload handler
		window.onload = function()
		{
			//call existing onload function
			existing();
			
			//call generic onload function
			generic();
		};
	}
	else
	{
		//setup onload function
		window.onload = generic;
	}
}

}
