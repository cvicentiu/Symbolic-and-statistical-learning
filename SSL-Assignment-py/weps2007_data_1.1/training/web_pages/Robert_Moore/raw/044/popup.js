/*-------------------------------------------
Print the Current Page
--------------------------------------------*/
function printPage() {
bV = parseInt(navigator.appVersion);
if (bV >= 4) window.print();
}


/*-------------------------------------------
variable size Pop-Up Window script
call with  <a href="javascript:popUp('page.html','500','300')">link</a>
--------------------------------------------*/

function popUp(pPage, winw, winh)
{  var winOpts = 'toolbar=1,scrollbars=1,location=1,statusbar=1,menubar=1,resizable=1,width=' + winw + ',height=' + winh;
   popUpWin = window.open(pPage,'popWin',winOpts);
   if (parseInt(navigator.appVersion) >= 4)
     { popUpWin.window.focus();
     }
}

/*-------------------------------------------
fized size Pop-Up Window script
call with  <a href="javascript:offsite('page.html')">link</a>
--------------------------------------------*/

function offsite(pPage)
{  var winOpts = 'toolbar=1,scrollbars=1,location=1,statusbar=1,menubar=1,resizable=1,width=600,height=400';
   popUpWin = window.open(pPage,'offsiteWin',winOpts);
   if (parseInt(navigator.appVersion) >= 4)
     { popUpWin.window.focus();
     }
}

// should be the URL to the cgi script
var path_to_cgi="http://www.dallasfed.org/cgi-bin/recommend.cgi";

// You dont need to change anything else
function tell_friend(){
path_to_cgi += '?url=' + escape(document.location);
window.open(path_to_cgi,"FRIENDS01","STATUS=NO,TOOLBAR=NO,LOCATION=NO,DIRECTORIES=NO,COPYHISTORY=NO,MENU=NO,RESISABLE=YES,SCROLLBARS=YES,TOP=40,LEFT=20,WIDTH=300,HEIGHT=330");
}

// should be the URL to the cgi script
var path_to_cgi_es="http://www.dallasfed.org/cgi-bin/recommend-es.cgi";

// You dont need to change anything else
function tell_friend_es(){
path_to_cgi_es += '?url=' + escape(document.location);
window.open(path_to_cgi_es,"FRIENDS02","STATUS=NO,TOOLBAR=NO,LOCATION=NO,DIRECTORIES=NO,COPYHISTORY=NO,MENU=NO,RESISABLE=YES,SCROLLBARS=YES,TOP=40,LEFT=20,WIDTH=350,HEIGHT=330");
}

/* ********************** COLLAPSE/EXPAND MENUS *********************** */

// include all onload functions here
window.onload=function() {
	 initMenus(); // set up collapse and expand menus
}

//****************************************************************************************************
// http://www.howtocreate.co.uk/tutorials/jsexamples/listCollapseExample.html, with Nisad Sivcevic mod
// Please see http://www.howtocreate.co.uk/jslibs/ for details and a demo of this script
// Please see http://www.howtocreate.co.uk/jslibs/termsOfUse.html for terms of use
//****************************************************************************************************

// + image for a link that has a sublist (goes before the link)
var oPl = '<img src="http://www.dallasfed.org/images/ceplus.gif" align="baseline" border="0" hspace="5" height="9" width="9">'

// - image for a link that doesn't have a sublist (goes before the link)
var oP2 = '<img src="http://www.dallasfed.org/images/ceminus.gif" align="baseline" border="0" hspace="5" height="9" width="9">'

// arrow image for a link that has a sublist (goes after the link)
var oPla = '<img src="http://www.dallasfed.org/images/arrowdown.gif" align="baseline" border="0" hspace="5" height="9" width="9">'

// initialize menus
function initMenus() {
// allowed menu ids: menu1, menu2, menu3, menu4, menu5, menu6, menu7, menu8, menu9, menu10

//compactMenu('menu1',false,true,true);
// - menu1 = the id of the list to collapse/expand
// - false = whether or not close already open lists when opening a new list
// - true = whether or not to append images to the links
// - true = whether to put the +/- images before the text (true) or put the arrow image after the text (false)
// - [false] = (optional, default is false) whether or not <li>'s with sublists are links themselves

// ***************************** image menus
	var list1 = document.getElementById('imenu1'); 
	if( list1 ) { 
		compactMenu('imenu1',false,true,true);
		selfLink('imenu1');
	}
	var list2 = document.getElementById('imenu2'); 
	if( list2 ) { 
		compactMenu('imenu2',false,true,true);
		selfLink('imenu2');
	}
	var list3 = document.getElementById('imenu3'); 
	if( list3 ) { 
		compactMenu('imenu3',false,true,true);
		selfLink('imenu3');
	}
	var list4 = document.getElementById('imenu4'); 
	if( list4 ) { 
		compactMenu('imenu4',false,true,true);
		selfLink('imenu4');
	}
	var list5 = document.getElementById('imenu5'); 
	if( list5 ) { 
		compactMenu('imenu5',false,true,true);
		selfLink('imenu5');
	}
	var list6 = document.getElementById('imenu6'); 
	if( list6 ) { 
		compactMenu('imenu6',false,true,true);
		selfLink('imenu6');
	}
	var list7 = document.getElementById('imenu7'); 
	if( list7 ) { 
		compactMenu('imenu7',false,true,true);
		selfLink('imenu7');
	}
	var list8 = document.getElementById('imenu8'); 
	if( list8 ) { 
		compactMenu('imenu8',false,true,true);
		selfLink('imenu8');
	}
	var list9 = document.getElementById('imenu9'); 
	if( list9 ) { 
		compactMenu('imenu9',false,true,true);
		selfLink('imenu9');
	}
	var list10 = document.getElementById('imenu10'); 
	if( list10 ) { 
		compactMenu('imenu10',false,true,true);
		selfLink('imenu10');
	}
// *************************** arrow menus
	var blist1 = document.getElementById('bmenu1'); 
	if( blist1 ) { 
		compactMenu('bmenu1',false,true,false);
		selfLink('bmenu1');
	}
	var blist2 = document.getElementById('bmenu2'); 
	if( blist2 ) { 
		compactMenu('bmenu2',false,true,false);
		selfLink('bmenu2');
	}
	var blist3 = document.getElementById('bmenu3'); 
	if( blist3 ) { 
		compactMenu('bmenu3',false,true,false);
		selfLink('bmenu3');
	}
	var blist4 = document.getElementById('bmenu4'); 
	if( blist4 ) { 
		compactMenu('bmenu4',false,true,false);
		selfLink('bmenu4');
	}
	var blist5 = document.getElementById('bmenu5'); 
	if( blist5 ) { 
		compactMenu('bmenu5',false,true,false);
		selfLink('bmenu5');
	}
	var blist6 = document.getElementById('bmenu6'); 
	if( blist6 ) { 
		compactMenu('bmenu6',false,true,false);
		selfLink('bmenu6');
	}
	var blist7 = document.getElementById('bmenu7'); 
	if( blist7 ) { 
		compactMenu('bmenu7',false,true,false);
		selfLink('bmenu7');
	}
	var blist8 = document.getElementById('bmenu8'); 
	if( blist8 ) { 
		compactMenu('bmenu8',false,true,false);
		selfLink('bmenu8');
	}
	var blist9 = document.getElementById('bmenu9'); 
	if( blist9 ) { 
		compactMenu('bmenu9',false,true,false);
		selfLink('bmenu9');
	}
	var blist10 = document.getElementById('bmenu10'); 
	if( blist10 ) { 
		compactMenu('bmenu10',false,true,false);
		selfLink('bmenu10');
	}


}


		var openLists = [], oIcount = 0; // openlists = empty array, oIcount = counter

		function compactMenu(oID,oAutoCol,oImg,oPMA,oMinimalLink) {
		// - oID = string: ID of the <ul> or <ol>
		// - oAutoCol = bool: false = menu items must be clicked to collapse expand; 
		//                    true = clicking on a list to expand it will cause an already open list to collapse
		// - oImg = bool: whether or not to append images to the links
		// - oPMA = bool: true=put +/- images before, false=put arrow image after
		// - oMinimalLink = bool: (optional, default is false)
		//    set to true if li's with a sublist have links. if set to true, you must include an image bullet

			//test to see if javascript is working
			if( !document.getElementsByTagName || !document.childNodes || !document.createElement ) { return; }

			//test to see if the list is found
			var baseElement = document.getElementById( oID ); if( !baseElement ) { return; }

			//if here,javascript works and the list is found
			//call the script to work the menu
			compactChildren( baseElement, 0, oID, oAutoCol, baseElement.tagName.toUpperCase(), oImg, oPMA, oMinimalLink && oPl);
			// - baseElement = the <ul> list
			// - 0 = this is the root level
			// - oID = string: ID of the <ul> or <ol>
			// - oAutoCol = bool: false = menu items must be clicked to collapse expand; 
			//                    true = clicking on a list to expand it will cause an already open list to collapse
			// - baseElement.tagName.toUpperCase() = UL or OL
			// - oMinimalLink && oPl = bool: true if oMinimalLink is true and oP1 is not empty; 
			//                               false if oMinimalLink is false or if oP1 is empty
		}


		//traverses entire list, hiding all sublists and making the collapse/expand links with the bullets
		function compactChildren( oOb, oLev, oBsID, oCol, oT, oImg, oPMA, oML ) {
		// - oOb = the list
		// - oLev = a number saying what level the list is at, 0 = root level 
		// - oBsID = string: ID of the <ul> or <ol> 
		// - oCol = bool: false = menu items must be clicked to collapse expand; 
		//                true = clicking on a list to expand it will cause an already open list to collapse
		// - oT = UL or OL
		// - oML =  bool: true if oMinimalLink is true and oP1 is not empty; 
		//                false if oMinimalLink is false or if oP1 is empty
		//                = set to true if li's with a sublist have links. if set to true, you must include an image bullet
		// - oImg = bool: whether or not to append images to the links
		// - oPMA = bool: true=put +/- images before, false=put arrow image after

			//if this is the root level (0)? 
			if( !oLev ) { 
				// encode the list id for the cookie
				oBsID = escape(oBsID); 
				// if lists should be collapsed when opening new ones, set that up
				if( oCol ) { 
					openLists[oBsID] = []; 
				} 
			}

			//for each immediate LI child (just the closest level)
			for( var x = 0, y = oOb.childNodes; x < y.length; x++ ) { 
				
				// if there is an li
				if( y[x].tagName ) {

					// theNextUL = gets the sub ul of the li, if any
					var theNextUL = y[x].getElementsByTagName( oT )[0];

					// if a sub ul was found
					if( theNextUL ) {

						//collapse the sub ul
						theNextUL.style.display = 'none';

						//create a link for expanding/collapsing
						var newLink = document.createElement('A');
						newLink.setAttribute( 'href', '#' );
						newLink.onclick = new Function( 'clickSmack(this,' + oLev + ',\'' + oBsID + '\',' + oCol + ',\'' + escape(oT) + '\');return false;' );
						// the new link is <a href="#" onclick="clickSmack(this, oLev, oBsID, oCol, escape(oT));return false;">
						// - oLev = a number saying what level the list is at, 0 = root level 
						// - oBsID = string: ID of the <ul> or <ol> 
						// - oCol = bool: false = menu items must be clicked to collapse expand; 
						//                true = clicking on a list to expand it will cause an already open list to collapse
						// - escape(oT) = encodes UL or OL

						//wrap the link around the li text

						// if the li was already a link
						if( oML ) { var theHTML = ''; } // don't mess with its link (only the image bullet will be the link to c/e)

						// else the li is not already a link, so make it a link to collapse and expand the list
						else {
							var theT = y[x].innerHTML.toUpperCase().indexOf('<'+oT);
							var theA = y[x].innerHTML.toUpperCase().indexOf('<A');
							var theHTML = y[x].innerHTML.substr(0, ( theA + 1 && theA < theT ) ? theA : theT );
							while( !y[x].childNodes[0].tagName || ( y[x].childNodes[0].tagName.toUpperCase() != oT && y[x].childNodes[0].tagName.toUpperCase() != 'A' ) ) {
								y[x].removeChild( y[x].childNodes[0] ); }
						}

						// adds this: <a href="js code...">
						y[x].insertBefore(newLink,y[x].childNodes[0]);

						// then adds this: the + image bullet and li text</a>
						if (oImg)// if an image should be added
						{	
							if (oPMA) // if the image should go before
							{ y[x].childNodes[0].innerHTML = oPl + theHTML.replace(/^\s*|\s*$/g,''); }
							else //the image should go after
							{ y[x].childNodes[0].innerHTML = theHTML.replace(/^\s*|\s*$/g,'') + oPla; }
							
						}
						else // don't add an image
						{ y[x].childNodes[0].innerHTML = theHTML.replace(/^\s*|\s*$/g,''); }
						// increase the counter by 1 and set this as a unique id for the sublist
						theNextUL.MWJuniqueID = oIcount++;

						//now call the function again for the sublist
						compactChildren( theNextUL, oLev + 1, oBsID, oCol, oT, oImg, oPMA, oML );

					}// end of if a sub ul was found

					else {
					// else there is no sublist, so this is a standalone link

						if (oImg && oPMA)// if an image should be added and it should go before
						{	y[x].childNodes[0].innerHTML = oP2 + y[x].childNodes[0].innerHTML; 
						}
						 // else don't add an image

					}
				}// end of if there is an li
			} // end of for all li's at that level
		}// end of compactChildren

		function clickSmack( oThisOb, oLevel, oBsID, oCol, oT ) {
		// - oThisOb = the link object
		// - oLevel = a number saying what level the list is at, 0 = root level 
		// - oBsID = string: ID of the <ul> or <ol> 
		// - oCol = bool: false = menu items must be clicked to collapse expand; 
		//                true = clicking on a list to expand it will cause an already open list to collapse
		// - oT = encoded UL or OL

			if( oThisOb.blur ) { oThisOb.blur(); }

			oThisOb = oThisOb.parentNode.getElementsByTagName( unescape(oT) )[0]; // get the parent <ul> or <ol> of the link

			if( oCol ) { // if clicking on a list to expand it should collapse other lists

				for( var x = openLists[oBsID].length - 1; x >= oLevel; x-=1 ) // for each list that is open
				{	if( openLists[oBsID][x] ) 
					{	// if it is open
						openLists[oBsID][x].style.display = 'none'; // close the list
						//*******************************************************************************
						// Nisad Sivcevic - 20050107 ? this doesn't seem to work
						//replace the + image with the - image
						//openLists[oBsID][x].previousSibling.innerHTML = openLists[oBsID][x].previousSibling.innerHTML.replace(oPl,oP2); 
						//*******************************************************************************
						if( oLevel != x ) { openLists[oBsID][x] = null; } // remove it from the array of open lists
					} 
				}

				if( oThisOb == openLists[oBsID][oLevel] ) //if this list is already open
					{ openLists[oBsID][oLevel] = null; } //remove it from the open list, since we're closing it

				else //else this list is currently closed
					{	oThisOb.style.display = 'block'; //expand the list 
						//*******************************************************************************
						// Nisad Sivcevic - 20050107 ? this doesn't seem to work
						//replace the - image with the + image
						//oThisOb.previousSibling.innerHTML = oThisOb.previousSibling.innerHTML.replace(oP2,oPl); 
						//*******************************************************************************
						openLists[oBsID][oLevel] = oThisOb; 
					}
			} 
			else // else clicking on a list to expand it should NOT collapse other lists
			{ oThisOb.style.display = ( oThisOb.style.display == 'block' ) ? 'none' : 'block'; } //expand or collapse the list
		}

		function stateToFromStr(oID,oFStr) {
			if( !document.getElementsByTagName || !document.childNodes || !document.createElement ) { return ''; }
			var baseElement = document.getElementById( oID ); if( !baseElement ) { return ''; }
			if( !oFStr && typeof(oFStr) != 'undefined' ) { return ''; } if( oFStr ) { oFStr = oFStr.split(':'); }
			for( var oStr = '', l = baseElement.getElementsByTagName(baseElement.tagName), x = 0; l[x]; x++ ) {
				if( oFStr && MWJisInTheArray( l[x].MWJuniqueID, oFStr ) && l[x].style.display == 'none' ) { l[x].parentNode.getElementsByTagName('a')[0].onclick(); }
				else if( l[x].style.display != 'none' ) { oStr += (oStr?':':'') + l[x].MWJuniqueID; }
			}
			return oStr;
		}

		function MWJisInTheArray(oNeed,oHay) { 
			for( var i = 0; i < oHay.length; i++ ) 
			{ if( oNeed == oHay[i] ) { return true; } } 
			return false; 
		}

		// adds a class to a link to highlight it if the link goes to the current page
		function selfLink(oRootElement) {
			// oRootElement = the id of the list to check for these links

			var oClass = 'samePage';	// name of the class
			var oExpand = true;		// whether to automatically expand the list to show links to the current page

			if(!document.getElementsByTagName||!document.childNodes) { return; }//test to see if javascript is working

			oRootElement = document.getElementById(oRootElement); // select the element (ul) that has the id

			for( var x = 0, y = oRootElement.getElementsByTagName('a'); y[x]; x++ ) { // for each link in that element

				if ( y[x].getAttribute('href') &&							// if there is a link and 
					location == y[x].getAttribute('href') && 				// the link = the page or 
					y[x].getAttribute('href') != '#' &&						// the href does not = #
					y[x].getAttribute('href') != ''  ) {	 				// the href does not = ''
 
					y[x].className = (y[x].className?(y[x].className+' '):'') + oClass; 
					//add the class, appending to any already existing class on the <a> tag

					if( oExpand ) { // if the list should be expanded to show the highlighted link
						oExpand = false;
						for( var oEl = y[x].parentNode, ulStr = ''; oEl != oRootElement && oEl != document.body; oEl = oEl.parentNode ) 
						{
							if( oEl.tagName && oEl.tagName == oRootElement.tagName ) 
							{ ulStr = oEl.MWJuniqueID + (ulStr?(':'+ulStr):''); } 
						}
						stateToFromStr(oRootElement.id,ulStr);
					} //end if
				}//end if
			} //end for
		}//end function

		function getRealAddress(oOb) { 
			return oOb.protocol + ( ( oOb.protocol.indexOf( ':' ) + 1 ) ? '' : ':' ) + 
			oOb.hostname + ( ( typeof(oOb.pathname) == typeof(' ') && oOb.pathname.indexOf('/') != 0 ) ? '/' : '' ) + 
			oOb.pathname + oOb.search; }

/* ********************** END OF COLLAPSE/EXPAND MENUS *********************** */
