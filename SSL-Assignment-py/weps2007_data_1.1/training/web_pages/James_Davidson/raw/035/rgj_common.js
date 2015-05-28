//~ alert ("alpha");
//~ var start = new Date();

/**
  * Commmon RGJ.com JS library
  * Use this for common functions and objects
  *
  * Javascript versions for November 2004:
  * Version   Visitors  Percentage  Internet Avg.
  * 1.3       552,569   95.8%       94.7%
  * None      22,712    3.9%        5.0%
  * 1.2       1,298     0.2%        0.1%
  * 1.0       140       0.0%        0.1%
  * 1.1       31        0.0%        0.0%
  */
 
/* GLOBAL VARIABLES */

/* END GLOBAL VARIABLES */

/* STANDARD POPUP CODE */
var RGJ_Common_PopupTypes = new Array();
RGJ_Common_PopupTypes['emailstory']         = 'scrollbars=yes,location=no,toolbar=no,directories=no,menubar=no,resizable=yes,status=no,width=500,height=500';
RGJ_Common_PopupTypes['external']           = 'scrollbars=yes,location=yes,toolbar=yes,directories=yes,menubar=yes,resizable=yes,status=yes,width=640,height=480,left=300,screenX=300,top=200,screenY=200';
RGJ_Common_PopupTypes['dirmap']             = 'scrollbars=auto,toolbar=no,directories=no,menubar=no,resizable=yes,status=no,width=500,height=520';
RGJ_Common_PopupTypes['dircoupons']         = 'scrollbars=auto,toolbar=no,directories=no,menubar=no,resizable=yes,status=no,width=485,height=460';
RGJ_Common_PopupTypes['content_window']     = 'scrollbars=yes,location=yes,toolbar=no,directories=no,menubar=no,resizable=yes,status=no,width=640,height=480';
RGJ_Common_PopupTypes['photo_window']       = 'scrollbars=yes,toolbar=no,directories=no,menubar=no,resizable=yes,status=yes,width=640,height=480';
RGJ_Common_PopupTypes['poll_window']        = 'scrollbars=no,location=no,toolbar=no,directories=no,menubar=no,resizable=yes,status=no,width=450,height=300';
RGJ_Common_PopupTypes['email_story_window'] = 'scrollbars=yes,location=no,toolbar=no,directories=no,menubar=no,resizable=yes,status=no,width=500,height=500';
RGJ_Common_PopupTypes['dir_coupons_window'] = 'scrollbars=auto,toolbar=no,directories=no,menubar=no,resizable=yes,status=no,width=485,height=460';
RGJ_Common_PopupTypes['ezpass_window']      = 'scrollbars=auto,toolbar=no,directories=no,menubar=no,resizable=yes,status=no,width=400,height=500';


function RGJ_Common_Popup(uri, type)
{
  //~ alert(uri + "," + type);
  //~ if (arguments[2])
  //~ {
    //~ name = arguments[2];
  //~ }
  //~ else
  //~ {
  var name = 'rgjpop';
  //~ }

  // is this necessary?
  //~ self.name = 'popUpParent';
  
  var features  = RGJ_Common_PopupTypes[type];
  if (!features)
  {
    features = type;
  }
  
  //~ alert("open(" + uri + ',' + name + ',' + features + ')');
  
  self.name         = 'popUpParent';
  var newWindow         = window.open(uri, name, features);
  newWindow.parent  = self;
}

/* END STANDARD POPUP CODE */


var funstring = '';
for (type in RGJ_Common_PopupTypes)
{
  funstring += 'var ' + type + ' = new Function("uri", "RGJ_Common_Popup(uri, \'' + type + '\');");\n';
}
eval(funstring);


//export RGJ_Common_PopupTypes;

/* WINDOW NAVIGATION FUNCTION */
function winclose() {
	window.close();
}

function jump(url) {
	opener.location.href = url;
	window.close();
}

// Necessary for E-Tech Jscript promos
function jStech (elink) {
    document.location = "/tech/?URL=http://www.gannettonline.com/e/" + elink + "&AFFIL=RGJ"
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
/* END WINDOW NAVIGATION FUNCTION */



/* STORY TOOLS */
/*
 * Function to display a block
 * Parameters:
 *     id  = id of block
 *     
 */
function showInfo( id )
{
  if ( document.layers )
  {
    document.layers[id].display = "block";
  }
  else if ( document.all )
  {
    document.all[id].style.display = "block";
  }
  else if ( document.getElementById )
  {
    document.getElementById(id).style.display = "block";
  }
  // default case is to do nothing
}


/*
 * Function to hide a block
 * Parameters:
 *     id  = id of block
 *     
 */
function hideInfo( id )
{
  if ( document.layers )
  {
    document.layers[id].display = "none";
  }
  else if ( document.all )
  {
    document.all[id].style.display = "none";
  }
  else if ( document.getElementById )
  {
    document.getElementById(id).style.display = "none";
  }
  // default case is to do nothing
}



/*
 * Function to change the font family of a block
 * Parameters:
 *     id  = id of block
 *     
 */
var fontCount = 0;
var fontArray = [
                  'Courier New, Courier, mono',
                  'Times New Roman, Times, serif',
                  'Arial, Helvetica, sans-serif'
                ];
function RotateFontFamily( id )
{
	fontCurrent                                   = fontCount++ % fontArray.length;
  document.getElementById(id).style.fontFamily  = fontArray[fontCurrent];
}

/*
 * Function to change the background color of a block
 * Parameters:
 *     id  = id of block
 *     
 */
var colorCount = 0;
var colorArray = ['eeeeee','FFFFCC','ffffff'];
function RotateColor ( id )
{
  colorCurrent                                        = colorCount++ % colorArray.length;
  document.getElementById( id ).style.backgroundColor = colorArray[colorCurrent];
}

/*
 * Function to change the font size of a block
 * Parameters:
 *     id  = id of block
 *     inc = positive or negative increment for change
 *     
 */
function ChangeFontSizeInc ( id, inc )
{
  // Find current fontSize, isn't defined on page load...
  if ( document.defaultView && document.defaultView.getComputedStyle )
  {
    currentsize = document.defaultView.getComputedStyle(document.getElementById(id),'').getPropertyValue("font-size");
  }
  else if (document.all)
  {
    currentsize = document.getElementById(id).currentStyle.fontSize;
  }

  if (currentsize)
  {
    currentsize = currentsize.slice(0, -2);
  }
  document.getElementById(id).style.fontSize = ((currentsize - 0) + (inc - 0)) + "px";
}

/* END STORY TOOLS */


/* START MAPPING TOOLS */
function map_directory_entry(streetaddress, zip, width, height) {
  if (arguments.length > 4)
  {
    RGJMapAddress (streetaddress, zip, width, height, arguments[4]);
  } 
  else
  {
    RGJMapAddress (streetaddress, zip, width, height);
  }
}

function RGJMapAddress(streetaddress, zip, width, height)
{
	// Check for additional querystring values (added as an 'arguments[]' parameter to avoid upsetting existing pages.
	var extraQuery = '';
	if (arguments.length > 4) {
	    extraQuery = arguments[4];
	}
	
	mapURL          = 'http://www.rgj.com/include/mappage.php?' + 
                    'streetaddress=' + escape(streetaddress) + '&' +
                    'zipcode=' + escape(zip) + '&' +
                    'width=' + (width - 200) + '&' +
                    'height=' + (height - 100) +
                    extraQuery;
	
  windowFeatures  = 'scrollbars=yes,toolbar=no,directories=no,menubar=no,resizable=yes,status=yes,' + 
                    'width=' + width + ',' + 
                    'height=' + height;
  RGJ_Common_Popup(mapURL, windowFeatures, 'mapwindow');
}
/* END MAPPING TOOLS */

/* ONLOAD JAVASCRIPT CALLS */
self.name = 'popUpParent';

MM_reloadPage(true);

/* END ONLOAD JAVASCRIPT CALLS */
//~ alert ("omega");


//~ var end = new Date();
//~ var timed = end.getTime() - start.getTime();
//~ alert("Start: " + start.getTime() + "\nEnd: " + end.getTime() + "\nrgj_common.js took " + timed + " ms to load");