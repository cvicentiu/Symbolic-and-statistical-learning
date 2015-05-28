var isDHTML = 0;
var isID = 0;
var isAll = 0;
var isLayers = 0;


if (document.getElementById) 
	{isID = 1; isDHTML = 1;}
else {
	if (document.all) 
		{isAll = 1; isDHTML = 1;}
	else {
		browserVersion = parseInt(navigator.appVersion);
		if ((navigator.appName.indexOf('Netscape') != -1) && (browserVersion == 4)) 
			{isLayers = 1; isDHTML = 1;}
		}
	}

function findDOM(objectID,withStyle) {
	if (withStyle == 1) {
		if (isID) { return (document.getElementById(objectID).style) ; }
		else { 
			if (isAll) { return (document.all[objectID].style); }
		else {
			if (isLayers) { return (document.layers[objectID]);
			 }
		};}
	}
	else {
		if (isID) { return (document.getElementById(objectID)) ; }
		else { 
			if (isAll) { return (document.all[objectID]); }
		else {
			if (isLayers) { return (document.layers[objectID]); }
		};}
	}
}



// FIND THE NESTED DOM	
// if there are nested layers e.g. <div id="1">text<div id"2">moretext</div></div>
// new dectection will need to be added to the isLayers sections to accomidate N4's bug

	
function findNestedDOM (parentID, objectID, withStyle) {
	if(withStyle == 1) 	{
		if (isID) {
			return (document.getElementById(objectID).style);
		}
		else {
			if (isAll) {
				return (document.all[objectID].style);
			}
			else {
				if (isLayers) {
					if(parentID) {
						return (document.layers[parentID].layers[objectID]);
					}
					else {
						return document.layers[objectID];
					}
				}
			}
		}
	}
	else {
		if (isID) {
			return (document.getElementById(objectID)); 
		}
		else {
			if (isAll) {
				return (document.all[objectID]);
			}		
			else {
				if (isLayers) {
					if(parentID) {
						return (document.layers[parentID].layers[objectID]);
					}
					else {
						return document.layers[objectID];
					}
				}
			}
		}
	}
}

	
// FIND DOM IMAGE
// Used when needing to sort out the proper DOM for an image manipulation 
// Used currently with swapImage()	
function findDOMimage (imagename) {
	if (isID) {
		return (document.getElementById(imagename)); 
	} 
	else {
		if (isAll) {
			return (document.all[imagename]);
		} 
		else {
			if (isLayers) {
				return (document.images[imagename]);
			}
		}
	}
}