/** 
 * Registers an image and a rollover image to a variable
 * on the calling page.
 *
 * @param	menuNumber			The DHTML menu id
 * @param	imageURL			URL of the "normal" image
 * @param	rolloverImageURL	URL of the rollover image
 *
 * @return						An array holding "normal"
 *								and rollover images for a
 *								menu object.
 */
function registerImage ( menuNumber, imageURL, rolloverImageURL )
{
	var SEDHTMLMenuImage = new Array();
	
	SEDHTMLMenuImage[0] = new Image();
	SEDHTMLMenuImage[1] = new Image();
	
	SEDHTMLMenuImage[0].src = imageURL;
	SEDHTMLMenuImage[1].src = rolloverImageURL;
	
	SEDHTMLMenu_RollOvers[SEDHTMLMenu_RollOvers.length] = menuNumber;
	
	return SEDHTMLMenuImage;
}

function SEDHTMLMenu_Rollover ( menuNum, state )
{
	try {
		document.images["SEDHTMLMenu_" + menuNum + "_IMG_Name"].src = eval("SEDHTMLImg_" + menuNum + "[" + (state ? 1 : 0) + "].src");
	}
	catch ( e ) {
	
	}
}

function push ( theArray, theValue )
{		
	var arrayLen = theArray.length;
	
	theArray[arrayLen] = theValue;
	return theArray[arrayLen];
}

function pop ( theArray )
{
	var arrayLen = theArray.length;
	
	if ( arrayLen > 0 ) {
		var tmp = theArray[arrayLen - 1];
		theArray.length--;
		return tmp;
	}
	else
		return null;
	
}

function SEDHTMLMenu_Init()
{
	SEDHTMLMenu_Initialized = true;

	if (!document.body)
	{
		setTimeout("SEDHTMLMenu_Init()", 100);
	}
	else
	{
		var menuDIVS = document.body.getElementsByTagName("DIV");
		
		for (var i = 0; i < menuDIVS.length; i++)
		{
			if (menuDIVS[i].id.substring(0, 12) == "SEDHTMLMenu_" && menuDIVS[i].id.substring(menuDIVS[i].id.length-4, menuDIVS[i].id.length) == "_DIV")
				SEDHTMLMenu_NumMenus++;
		}
	}
}

function SEDHTMLMenu_GetElementPosition(element)
{
	var currNode = element;
	var posObj = new Object();
	var posPrevObj = new Object();

	posObj.left = 0;
	posObj.top = 0;
	posObj.height = (currNode.offsetHeight);
	posObj.width = (currNode.offsetWidth);								

	while (currNode && currNode.nodeName != "BODY")
	{
		//if (currNode.nodeName != "TBODY" && currNode.nodeName != "TR") {
		posObj.left += (currNode.offsetLeft);
		posObj.top += (currNode.offsetTop);
		//}
		currNode = currNode.offsetParent;
	}

	return posObj;
}

function SEDHTMLMenu_MouseOverIMG(menuNum, menuOrient, innerMenu,e)
{
	if (!SEDHTMLMenu_Initialized)
		SEDHTMLMenu_Init();
	
	SEDHTMLMenu_OverIMG = "SEDHTMLMenu_" + menuNum + "_IMG";

	if(!innerMenu)
		SEDHTMLMenu_OverDIV = null;
	
	var menuIMG = document.getElementById("SEDHTMLMenu_" + menuNum + "_IMG");
	var menuDIV = document.getElementById("SEDHTMLMenu_" + menuNum + "_DIV");
	
	var posObj = SEDHTMLMenu_GetElementPosition(menuIMG);
				
	if (menuDIV)
	{				
		// this is to also tell if it is about to run off the screen
		var theBody = document.body;
		
		if ( browser.toUpperCase() == "IE" || browser.toUpperCase() == "MZ") {
			var browserWidth = theBody.clientWidth;
			var browserHeight = theBody.clientHeight;
		}
		else {
			var browserWidth = theBody.innerWidth;
			var browserHeight = theBody.innerHeight;
		}
		
		var futurePosInScreen	= "";
		var posMenu				= SEDHTMLMenu_GetElementPosition ( menuDIV );
		var menuWidth			= Math.max ( tableWidth, posMenu.width );

		if (innerMenu) { // if we are in an innermenu we want to show them in a different spot
		
			/*  we need to make sure the menu is not going to run off the screen, we then set it to pop
				out the opposite direction if it will */
			if ( menuOrient == 3 ) {
				futurePosInScreen = posObj.left - posMenu.width;
				
				if ( futurePosInScreen < 0 ) {
					// it was going to the left, we now move it to the right.
					// don't move it, though, if it will still go off the screen.
					// if it still goes off the screen, use the direction the user chose
					if ( ( posObj.left + posObj.width - 8 ) + posMenu.width < browserWidth ) {
						menuOrient = 2;
					}
				}
			}
			else
			{
				futurePosInScreen = ( posObj.left + posObj.width - 8 ) + posMenu.width;
				if ( futurePosInScreen > browserWidth ) {
					// it was going to the right, we now move it to the left.
					// don't move it, though, if it will still go off the screen.
					// if it still goes off the screen, use the direction the user chose
					if ( posObj.left - posMenu.width > 0 ) {
						menuOrient = 3;
					}
				}
			}
			
			var posMenu = SEDHTMLMenu_GetElementPosition ( menuDIV );
			
			switch (menuOrient) {
				// Bottom
				case 1:
					menuDIV.style.top = posObj.top - 2;
					menuDIV.style.left = posObj.left + posObj.width - 8;
					break;
				// Right
				case 2:
					menuDIV.style.top = posObj.top - 2;
					menuDIV.style.left = posObj.left + posObj.width - 8;
					break;
				// Left
				case 3:
					menuDIV.style.top = posObj.top - 2;
					menuDIV.style.left = posObj.left - menuDIV.offsetWidth;
					break;
				// Top
				case 4:
					menuDIV.style.top = posObj.top - 2;
					menuDIV.style.left = posObj.left + posObj.width - 8;
					break;
				default:
					menuDIV.style.top = posObj.top - 2;
					menuDIV.style.left = posObj.left + posObj.width - 8;
					break;
			}
			
			// make sure menu isn't too long for screen height
			// and adjust, if necessary
			var foldPosn	= document.body.scrollTop + browserHeight;
			var menuBottom	= parseInt ( menuDIV.style.top ) + posMenu.height;
			if ( posMenu.height < browserHeight ) {
				if ( menuBottom > foldPosn ) {
					var adjustment = Math.abs( foldPosn - menuBottom );
					menuDIV.style.top = parseInt ( menuDIV.style.top ) - adjustment;
				}
			}
		}
		else
		{
			/*  we need to make sure the menu is not going to run off the screen, we then set it to pop
				out the opposite direction if it will */
			if ( menuOrient == 3 ) {
				futurePosInScreen = posObj.left - posMenu.width;
				if ( futurePosInScreen < 0 ) {
					// it was going to the left, we now move it to the right
					menuOrient = 2;
				}
			}
			else if ( menuOrient == 2 ) {
				futurePosInScreen = posObj.left + posObj.width + posMenu.width;
				if ( futurePosInScreen > browserWidth ) {
					// it was going to the right, we now move it to the left
					menuOrient = 3;
				}
			}
			else {
				/*
					Oh my.  Looks like the menu that's opening is about to bleed off the
					edge of the screen.  We'll adjust by aligning the right edge of the
					opening menu with the right edge of the main menu item which is opening
					the new menu.
				*/
				futurePosInScreen = ( posObj.left + posObj.width - 8 ) + posMenu.width;
				if ( futurePosInScreen > browserWidth ) {
					shiftpx		= posMenu.width - posObj.width;
					posObj.left	= posObj.left - shiftpx;
				}
			}

			switch (menuOrient) {
				// Bottom
				case 1:
					menuDIV.style.top = posObj.top + posObj.height;
					menuDIV.style.left = posObj.left;
					break;
				// Right
				case 2:
					menuDIV.style.top = posObj.top;
					menuDIV.style.left = posObj.left + posObj.width;
					break;
				// Left
				case 3:
					menuDIV.style.top = posObj.top;
					menuDIV.style.left = posObj.left - menuDIV.offsetWidth;
					break;
				// Top
				case 4:
					menuDIV.style.top = posObj.top - menuDIV.offsetHeight;
					menuDIV.style.left = posObj.left;
					break;
				default:
					menuDIV.style.top = posObj.top + posObj.height;
					menuDIV.style.left = posObj.left;
					break;
			}
		}

		if(SEDHTMLMenu_OpenMenu!=menuNum)
			getMenusToStayOpen(menuNum,true,true); // this will get it's parents and show the menus
		
		if(!innerMenu) {
			SEDHTMLMenu_RolloverBack();
			SEDHTMLMenu_Rollover(menuNum, true);
		}

		document.body.onmouseover = SEDHTMLMenu_BodyMouseOver;
	}

	SEDHTMLMenu_OpenMenu = menuNum;
	cancelEventBubble(e);														

	return false;
}

// this is called initially and will get all the divs on the screen with the SEDTHMLMenu_ at the beginning
function getAllDivs()
{
	if(!getAllInit)
	{
		var menuDIVS = document.body.getElementsByTagName("DIV");
		
		for (var i = 0; i < menuDIVS.length; i++)
		{
			if (menuDIVS[i].id.substring(0, 12) == "SEDHTMLMenu_" && menuDIVS[i].id.substring(menuDIVS[i].id.length-4, menuDIVS[i].id.length) == "_DIV")
			{
				var AllMenuPieces = menuDIVS[i].id.split("_");
				
				var menuNumAppend = AllMenuPieces[1] + "_" + AllMenuPieces[2];
				
				push ( AllMenuDivsArray, menuNumAppend );
				// AllMenuDivsArray.push(menuNumAppend);
			}
		}
		getAllInit = true;
	}
}

// this function on all the onMouseOut events to gather the menus which should stay open
function getMenusToStayOpen(menuNum,pushPassed,emptyArray)
{
	if(!getAllInit) {
		getAllDivs();
	}
	
	// only if it called from outside of this function will we empty the first array
	if(emptyArray)
		while ( pop ( menusToStayOpen ) != null );
		// while( menusToStayOpen.pop() != null);
	
	// if we need to append the menu passed here
	if(pushPassed)
		push ( menusToStayOpen, menuNum );
		// menusToStayOpen.push(menuNum);
	
	if( SEDHTMLMenu_OverIMG=="SEDHTMLMenu_" + menuNum + "_IMG") {
		
		var alreadyExistsIMG = false;
		for(var n=0;n<menusToStayOpen.length;n++)
		{
			if(menusToStayOpen[n]==menuNum) {
				alreadyExistsIMG = true;
			}
		}
		
		if(!alreadyExistsIMG) {
			push ( menusToStayOpen, menuNum );
			// menusToStayOpen.push(menuNum);
		}
	}
	
	if(SEDHTMLMenu_OverDIV=="SEDHTMLMenu_" + menuNum + "_DIV") {
		
		var alreadyExistsDIV = false;
		for(var n=0;n<menusToStayOpen.length;n++)
		{
			if(menusToStayOpen[n]==menuNum) {
				alreadyExistsDIV = true;
			}
		}
		
		if(!alreadyExistsDIV) {
			push ( menusToStayOpen, menuNum );
			// menusToStayOpen.push(menuNum);
		}
		
	} 
	
	// this is checking for any child id's in the menus match the parent Id of the record passed here to hide
	var PassedMenuPieces = menuNum.split("_");
	for(var j=0; j<AllMenuDivsArray.length; j++)
	{
		var AllMenuPieces = AllMenuDivsArray[j].split("_");
		
		if(AllMenuPieces[1]==PassedMenuPieces[0]) // this is the check
		{
			var alreadyExists = false;
			
			for(var i=0;i<menusToStayOpen.length;i++)
			{
				if(menusToStayOpen[i]==AllMenuDivsArray[j])
				{
					alreadyExists = true;
				}
			}
			
			if(!alreadyExists) {
				push ( menusToStayOpen, AllMenuDivsArray[j] );
				// menusToStayOpen.push(AllMenuDivsArray[j]);
			}
			
			getMenusToStayOpen(AllMenuDivsArray[j],false,false); // recall this function to keep working our way up the divs
			break;
		}
		
		// once it is complete then we can show all of the menus
		if(j==AllMenuDivsArray.length-1)
		{
			showMenus();
		}
	}
}

// this function will open all the menus from the above function and close the rest
function showMenus()
{
	if(!getAllInit) {
		getAllDivs();
	}
	
	// open all the menus which should be showing 
	for(var i=0;i<menusToStayOpen.length;i++)
	{
		var menuDIV = document.getElementById("SEDHTMLMenu_" + menusToStayOpen[i] + "_DIV");
		
		if(menuDIV.style.visibility!='visible') {
			menuDIV.style.visibility = "visible";
		}
	}
	
	// and hide all the menus which should not be showing
	for(var j=0;j<AllMenuDivsArray.length;j++)
	{
		var openMenu = false;
		
		for(var k=0;k<menusToStayOpen.length;k++)
		{
			if(AllMenuDivsArray[j]==menusToStayOpen[k])
			{
				openMenu = true;
			}
		}
		
		if(!openMenu)
		{
			var closeMenuDIV = document.getElementById("SEDHTMLMenu_" + AllMenuDivsArray[j] + "_DIV");
			closeMenuDIV.style.visibility = "hidden";
		}
	}
}

function SEDHTMLMenu_MouseOverDIV(menuNum,e)
{
	if (SEDHTMLMenu_OpenMenu == menuNum) {
		SEDHTMLMenu_OverDIV = "SEDHTMLMenu_" + menuNum + "_DIV";
	} else {
		getMenusToStayOpen(menuNum,true,true);
	}
	
	document.body.onmouseover = SEDHTMLMenu_BodyMouseOver;
	
	cancelEventBubble(e);
	return false;
}

// called when you mouseout of a div
function SEDHTMLMenu_MouseOutDIV(menuNum,e)
{
	if (SEDHTMLMenu_OpenMenu == menuNum)
		SEDHTMLMenu_OverDIV = null;
	
	var element = "SEDHTMLMenu_" + menuNum + "_DIV";
	var functionContinue = getCoords(element,e);
	
	if(functionContinue)
	{
		SEDHTMLMenu_OverDIV = null;
		if(SEDHTMLMenu_OpenMenu != menuNum)
			getMenusToStayOpen(menuNum,false,true);
	}
	cancelEventBubble(e);
	return false;
}

// called when you mouseout of an image or of a sub-menu row
function SEDHTMLMenu_MouseOutIMG(menuNum,e)
{
	if (SEDHTMLMenu_OpenMenu == menuNum)
		SEDHTMLMenu_OverIMG = null;
	
	var element = "SEDHTMLMenu_" + menuNum + "_IMG";
	var functionContinue = getCoords(element,e);
	
	if(functionContinue)
	{
		SEDHTMLMenu_OverIMG = null;
		if(SEDHTMLMenu_OpenMenu!=menuNum)
			getMenusToStayOpen(menuNum,false,true);
	}
	cancelEventBubble(e);
	return false;
}

// called when you mouseout of an image or of a sub-menu row
function SEDHTMLMenu_MouseOutIMGROW(menuNum,e)
{
	var element = "SEDHTMLMenu_" + menuNum + "_IMG";
	var functionContinue = getCoords(element,e);
	
	if(functionContinue)
	{
		SEDHTMLMenu_OverIMG = null;
		if(SEDHTMLMenu_OpenMenu!=menuNum)
			getMenusToStayOpen(menuNum,false,true);
	}
	cancelEventBubble(e);
	return false;
}

// called when you mouseout of a regular link or a separator row
function SEDHTMLMenu_MouseOutLINKSEP(menuNum,linkelement,e)
{
	var element = "SEDHTMLMenu_" + linkelement + "_LINKSEP";
	var functionContinue = getCoords(element,e);
	
	if(functionContinue)
	{
		if(SEDHTMLMenu_OpenMenu!=menuNum)
			getMenusToStayOpen(menuNum,false,true);
	}
	cancelEventBubble(e);
	return false;
}

// called when you mouseover a regular link or a separator
function SEDHTMLMenu_MouseOverLINKSEP(menuNum,e)
{
	SEDHTMLMenu_OverDIV = "SEDHTMLMenu_" + menuNum + "_DIV";
	SEDHTMLMenu_OpenMenu = menuNum;
	getMenusToStayOpen(menuNum,true,true);
	document.body.onmouseover = SEDHTMLMenu_BodyMouseOver;
	
	cancelEventBubble(e);
	return false;
}

// called from the MouseOverIMG to set the body mouseover
function SEDHTMLMenu_BodyMouseOver()
{
	document.body.onmouseover = null;
	SEDHTMLMenu_OverDIV = null;
	SEDHTMLMenu_OverIMG = null;
	setTimeout("closeAllMenus();", 500);
}

// called to cancel the bubble effect from all the mouseover and mouseout events above
function cancelEventBubble(e)
{
	if( e != "undefined" )
	{
		e.cancelBubble = true;
	}
}

// called by the body mouseover to close all the menus on the page
function closeAllMenus()
{
	var closeMenu = true;
	var menuOpen = false;
	
	SEDHTMLMenu_OpenMenu = "0";
	
	if(!getAllInit) {
		getAllDivs();
	}
	
	if (SEDHTMLMenu_OverIMG!=null) {
		var openMenuPieces = SEDHTMLMenu_OverIMG.split("_");
		var menuNum = openMenuPieces[1] + "_" + openMenuPieces[2];
		
		while ( pop ( menusToStayOpen ) != null );
		push ( menusToStayOpen, menuNum );
		
		// while( menusToStayOpen.pop() != null);
		// menusToStayOpen.push(menuNum);
		
		document.body.onmouseover = SEDHTMLMenu_BodyMouseOver;
	} else if(SEDHTMLMenu_OverDIV!=null) {
		var openMenuPieces = SEDHTMLMenu_OverDIV.split("_");
		var menuNum = openMenuPieces[1] + "_" + openMenuPieces[2];
		
		while ( pop ( menusToStayOpen ) != null );
		push ( menusToStayOpen, menuNum );
		
		// while( menusToStayOpen.pop() != null);
		// menusToStayOpen.push(menuNum);
		
		document.body.onmouseover = SEDHTMLMenu_BodyMouseOver;
	} else {
		for(var i=0; i<AllMenuDivsArray.length; i++) 
		{
			var MenuToClose = document.getElementById("SEDHTMLMenu_" + AllMenuDivsArray[i] + "_DIV");
			MenuToClose.style.visibility = "hidden";
			SEDHTMLMenu_Rollover(AllMenuDivsArray[i], false);
		}
		document.body.onmouseover = null;
	}
}

// this will get any elements position on the page
function getCoords(element,e)
{
	var functionContinue = false;

	var theElement = document.getElementById(element);
	
	// let's check to see if we already have gotten the position of this element
	var posObj = posObjArray[element];
	
	// if we haven't gotten it yet then let's do get it....
	if(posObj==null)
	{
		posObj = SEDHTMLMenu_GetElementPosition(theElement);
		posObjArray[element]=posObj;
	}
	
	var topXDIV = posObj.left;
	var topYDIV = posObj.top;
	
	var bottomXDIV = posObj.left + posObj.width;
	var bottomYDIV = posObj.top + posObj.height;
	
	if ( browser.toUpperCase() == "IE" ) {
		var mouseX = e.clientX + document.body.scrollLeft;
		var mouseY = e.clientY;
	}
	else if ( browser.toUpperCase() == "MZ" ) {
		var mouseX = e.clientX + window.scrollX;
		var mouseY = e.clientY;
	}
	
	// now we check to see if the mouse is inside of the element because we don't want to continue with the calling function if so
	if( (mouseX >= topXDIV) && (mouseX <= bottomXDIV) && (mouseY >= topYDIV) && (mouseY <= bottomYDIV) ) {
		functionContinue = false;
	} else {
		functionContinue = true;
	}
	
	return functionContinue;
}

// this function is called right before the one below it to ensure that the other rollovers are changed back.
function SEDHTMLMenu_RolloverBack()
{
	if(!getAllInit) {
		getAllDivs();
	}
	
	for(var i=0; i<AllMenuDivsArray.length; i++) 
	{
		SEDHTMLMenu_Rollover(AllMenuDivsArray[i], false);
	}
}

function changeFontColor(menuNum,how,newFontColor)
{
	if( newFontColor!="" )
	{
		var element = "SEDHTMLMenu_" + menuNum + "_IMG";
		var elementID = document.getElementById(element);
		
		var fontTag = null;
		var currNodeChildren = elementID.childNodes;

		// if there is a mainlink uri we will need to go two levels to get the fonttag, else we don't
		for(var i=0;i<currNodeChildren.length;i++)
		{
			if ( currNodeChildren[i].nodeName=="SPAN" || currNodeChildren[i].nodeName=="A" ) {
				fontTag = currNodeChildren[i].style;
				var origColor = origColorArray[element];
				if(origColor==null) {
					origColor = fontTag.color;
					origColorArray[element]=origColor;
				}
				break;
			}
			else
			{
				for(var k=0;k<currNodeChildren[i].childNodes.length;k++)
				{
					var nextNodeChildren = currNodeChildren[i].childNodes;
					
					if ( nextNodeChildren[k].nodeName=="SPAN" || currNodeChildren[k].nodeName=="A" ) {
						fontTag = nextNodeChildren[k].style;
						var origColor = origColorArray[element];
						if(origColor==null) {
							origColor = fontTag.color;
							origColorArray[element]=origColor;
						}
						
						break;
					}
				}
			}
		}

		if( how=='over' && fontTag!=null ) {
			fontTag.color = "#" + newFontColor;
		} 
		else {
			fontTag.color = origColor; 
		}
	}
}

function changeFontColor_NoMenu(menuNum,how,newFontColor)
{
	if( newFontColor!="" )
	{
		var element = menuNum;
		var elementID = document.getElementById(element);
		
		var fontTag = null;
		var currNodeChildren = elementID.childNodes;
		
		// if there is a mainlink uri we will need to go two levels to get the fonttag, else we don't
		for(var i=0;i<currNodeChildren.length;i++)
		{
			if(currNodeChildren[i].nodeName=="SPAN") {
				fontTag = currNodeChildren[i].style;
				var origColor = origColorArray[element];
				if(origColor==null) {
					origColor = fontTag.color;
					origColorArray[element]=origColor;
				}
				
				break;
			}
			else
			{
				for(var k=0;k<currNodeChildren[i].childNodes.length;k++)
				{
					var nextNodeChildren = currNodeChildren[i].childNodes;
					
					if(nextNodeChildren[k].nodeName=="SPAN") {
						fontTag = nextNodeChildren[k].style;
						var origColor = origColorArray[element];
						if(origColor==null) {
							origColor = fontTag.color;
							origColorArray[element]=origColor;
						}
						
						break;
					}
				}
			}
		}
		
		if( how=='over' && fontTag!=null ) {
			fontTag.color = "#" + newFontColor;
		} else {
			fontTag.color = origColor; 
		}
	}
}

// added 2.1.4
function openNewWindow(where)
{
	var newWindow = window.open(where,'newwindow');
	newWindow.focus();
	return false;
}

function tgL(obj,on,bgcolor,pid,sid,e)
{
	obj.style.backgroundColor=bgcolor; 
	if (on) 
		return SEDHTMLMenu_MouseOverLINKSEP(pid,e);
	else
		return SEDHTMLMenu_MouseOutLINKSEP(pid,sid,e);
}
		
function tgI(obj,on,bgcolor,pid,mO,iM,e)
{
	obj.style.backgroundColor=bgcolor; 
	if (on) 
		return SEDHTMLMenu_MouseOverIMG(pid,mO,iM,e);
	else
		return SEDHTMLMenu_MouseOutIMGROW(pid,e);
}	