window.onload = initialize; 


function setTop(elementId, newTop)
{
    getStyleReference(elementId).top = newTop;
}

function showIt(elementId)
{
    getStyleReference(elementId).visibility = "visible";
}

function hideIt(elementId)
{
    getStyleReference(elementId).visibility = "hidden";
}

function isVisible(elementId)
{
    var vis = getStyleReference(elementId).visibility;
    return (vis == "visible" || vis == "show");
}

//Initial height

function determineIframeHeight(numHeadlines, showSection, location)
{
var desiredHeight=0;
/*
Sizing Approach:
1) Get total length of first four headlines, in # of chars.
2) Devise a formula to calculate iframe height based on #.
3) If any given headline is >presumed line length # chars, add some constant to account for line wrap.
4) Calcuation will have to occur upon page load and tab click.
*/

//If either collapsable or personalizable, add height for that button row.
if (bottomButtons)
    desiredHeight+=18;
//If section is available, then show tabs for site and section, and add corresponding height.				
if (showSection)
   desiredHeight+=18;

 
var totalCharacters = 0;
for (i=0; i<numHeadlines; ++i)
	{			
		if (location =="section")						
		 totalCharacters += module[sectionArrayNumber].content[i].linkText.length;		 
		else
		  totalCharacters += module[siteArrayNumber].content[i].linkText.length;
		 
	}
	

	
	if (totalCharacters > 115)
	{
	
	 desiredHeight = 59;
for (i=0; i<numHeadlines; ++i)
	{		
  if (location =="section")
		{
		desiredHeight+=calcCorrections(sectionArrayNumber);
		desiredHeight+=calcMultiplier(sectionArrayNumber);		
		}
	else
		{
		desiredHeight+=calcCorrections(siteArrayNumber);
		desiredHeight+=calcMultiplier(siteArrayNumber);
		}
	}			

	
} // if (totalCharacters > 105)
else
desiredHeight=192;

return desiredHeight;
}

function calcMultiplier(num)
{
var multiplier=1;
var heightFactor=0;
multiplier = Math.round ((module[num].content[i].linkText.length)/18);										
//approximate height of 1 line, within headline		
heightFactor+=(10*multiplier);
//approximate height of break between headlines.
heightFactor+=13;	
				
return heightFactor;

}
function calcCorrections(num)			
{

//This function assumes the length of a line in characters and uses some logical padding to handle cases off the mean.  The numbers here are developed in the grey area between reason and trial & error. 	
var heightIncrement=0;
var numSpaces=0;
var textLength =0;

textLength= module[num].content[i].linkText.length;				

				/*
Here we're dividing the estimated last line into three length possibilities: <=11	, mid length, and >=23.  If small, add 4 pixels.  If med, do nothing.  If large, subtract 4 pixels.  This correction handles the coincidental situation where all four headlines are either short or long remainders, which normally would give too little or too much height to the iframe, respectively.  
			*/
			
for (j=0; j< textLength; ++j)
	{
	if (module[num].content[i].linkText.charAt(j)==" ")
		{
		++numSpaces;
		}
	}		
	
if (textLength >=31 && numSpaces <=3)
heightIncrement+=14;
numSpaces=0;						
modulus = module[num].content[i].linkText.length%29;
if (textLength >30)
	{
	
	if (modulus <=10)
	{
		heightIncrement+=5;
			
	}	
	if (modulus >=20)
		{
		
		heightIncrement-=7;
		}
	}



return heightIncrement;
}	

function setVis (visElement, height)
{
//Hide all of the div tag contents except the one passed in.
var theElements = new Array("closedsection", "opensection", "closedsite", "opensite");
var currTop = startHeight;	
setIframeHeight(height);
setTop(visElement,currTop);
showIt(visElement);

for (i=0; i<theElements.length; ++i)
	{
	if (theElements[i] !=visElement)
		hideIt(theElements[i]);  
	}
}	
	
function showThese()
{
//Show tab features (e.g., dotted vs solid line, black vs white line)
for (i=0; i<arguments.length; ++i)
	{
	showIt(arguments[i]);
	}
}

function hideThese()
{
//Hide tab features (e.g., dotted vs solid line, black vs white line)
for (i=0; i<arguments.length; ++i)
	{
	hideIt(arguments[i]);
	}
}
	
function setPersonalization(color1, color2, closedTab, openTab, tab)
{
var length = 0;
var heightString = "";
if (showSectionTab)
	{		
	document.getElementById('leftcolor').style.background=color2;	
	document.getElementById('rightcolor').style.background=color1;
	}

if (allowPersonalization && minimize)
	{
  //Minimized				
  height = determineIframeHeight(1, true, tab); 
	heightString = (height-3)+"px"; 
	document.getElementById("heightener").style.height=heightString;
	setVis(closedTab, height);		
	}
else
	{
  //Expanded		
	
	if (tab =="section")
	length = maxLengthSection;
	else
	length = maxLengthSite;
  height = determineIframeHeight(length, true, tab);   									
	heightString = (height-3)+"px"; 
	document.getElementById("heightener").style.height=heightString;
	setVis(openTab, height);														
	}
}	
		
function initialize()
{ 
// This is called on page load.  
//Section is the default.  Set its height...
var height=0;
var heightString = "";

if (showSectionTab)
	{
  	if (isFromPersonalization)
			{								
   		//Show the newly personalized version of the site tab
			setPersonalization("#EEEEEE", "#FFFFFF", "closedsite", "opensite", "site");
			show ("groupB");
			} 
		else 						
			{ // !isFromPersonalization				
			setPersonalization("#FFFFFF", "#EEEEEE", "closedsection", "opensection", "section");
			show ("groupA");
			}
	}
else
	{  // !showSectionTab
  if (allowPersonalization && minimize)
		{
     //Minimized						
    height = determineIframeHeight(1, false, "site");  
	heightString = (height-3)+"px"; 
	document.getElementById("heightener").style.height=heightString;		 		
		setVis("closedsite", height);	
    }
  else
   	{
    //Expanded					
		
		height = determineIframeHeight(maxLengthSection, false, "site"); 
	heightString = (height-3)+"px"; 
	document.getElementById("heightener").style.height=heightString;		  	
		setVis("opensite", height);	
    }
		displayTopSolidLines();
	}
}
		
function setContents (color1, color2, tab, state, numHeadlines)
{
var opentab="";
var closedtab="";
if (tab == "section")
	{
	opentab ="opensection";
	closedtab="closedsection";
	}
else
	{
	opentab = "opensite";
	closedtab="closedsite";
	}
if (showSectionTab)
	{		
	document.getElementById('leftcolor').style.background=color2;	
	document.getElementById('rightcolor').style.background=color1;
	}	
if (state == "open")
	{			
	height = determineIframeHeight(numHeadlines, true, tab);   
	heightString = (height-3)+"px"; 
	document.getElementById("heightener").style.height=heightString;	
	setVis(opentab, height);						
	}
else
	{				
	height = determineIframeHeight(1, true, tab);  
	heightString = (height-3)+"px"; 
	document.getElementById("heightener").style.height=heightString;	
	setVis(closedtab, height);				
	}	
}		

function show(group)
{	
if (group =="groupA")
	{
	showThese("solidSectionLine", "bottomWhiteLineSection", "dottedSiteLine", "bottomBlackLineSite");
	hideThese ("dottedSectionLine","bottomBlackLineSection","solidSiteLine","bottomWhiteLineSite");
	}
else
	{
	showThese ("dottedSectionLine","bottomBlackLineSection","solidSiteLine","bottomWhiteLineSite");
	hideThese("solidSectionLine", "bottomWhiteLineSection", "dottedSiteLine", "bottomBlackLineSite");	
	}	
}

function displayTopSolidLines()
{
	showThese ("solidSectionLine", "solidSiteLine");
	hideThese("bottomWhiteLineSection", "dottedSectionLine", "bottomBlackLineSection", "bottomWhiteLineSite", "dottedSiteLine", "bottomBlackLineSite" );
}

function displayContent(tab, state, numHeadlines)
{

//This function is called on tab clicks and bottom button (Personalization and expand/min) clicks.

    if (tab == "section")
  	  {
			setContents("#FFFFFF", "#EEEEEE", "section", state, numHeadlines);			
			show ("groupA");			
    	}
    else
	    {
			setContents("#EEEEEE", "#FFFFFF", "site", state, numHeadlines);			        
      if (showSectionTab)
	     	{									 
				show ("groupB");		 
  	    }
       else
        {
					displayTopSolidLines();
        }
    }
}
