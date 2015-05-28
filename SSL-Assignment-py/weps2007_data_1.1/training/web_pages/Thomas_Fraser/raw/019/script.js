//	Scripts used by the HTML pages to show and hide text and anmiate a picture slideshow.
//
//	HISTORY
//	19-Jun-2005	GenoPro			Created and written the PV_*() routines.
//	23-Jul-2005	Ron Prior       	Added the "Explorer Tree"
//	23-Nov-2005	Ron Prior       	Added the hide/show map functions
//	13-Nov-2006	Ron Prior		Added Google Maps API functions & showGoogleMap
//
// Common HTML page initialisation code
function PageInit(title,tree, fCacheToggles) {
	var i = arguments.length;
	if (self == parent) document.getElementById('divFrameset').style.display='block';
	if (i > 0) top.document.title = title;
	if (i > 1 && (tree)) explorerTreeRefresh(tree);
	if (i < 3 || fCacheToggles) InitToggleTree();

        if (self == parent) {
		// redirect to the home page with the current page in query string
		var beginWebFileName = location.pathname.lastIndexOf('/');
		var beginFileName = location.pathname.lastIndexOf('\\');
		var fileName; 
		if (beginFileName < beginWebFileName) {
			fileName = location.pathname.substring(beginWebFileName + 1);
		} else {
			fileName = location.pathname.substring(beginFileName + 1);
 		}	
		
		top.location = 'default.htm?page=' + fileName;
	}
}

//	HISTORY
//	12-Oct-2006	GenoPro			Creation
// Open an individual page if specified in the querystring or referrer
function HomePageInit() {
	// check if a url is specify in the querystring
	var indexPageToLoad = location.search.indexOf("page=");
	if (indexPageToLoad != -1) {
		var pageToLoad = location.search.substring(indexPageToLoad + 5); // page= is 5 characters width
		document.getElementById("detail").src = pageToLoad;
	}
}

//	Core routine for the Picture Viewer (PV) to animate the slideshow.
function PV_PickCore(id, nDirection)
	{
	var oPicker = document.getElementById("idPVs_" + id);
	var cPictures = oPicker.options.length;	
	var iSelected = (oPicker.selectedIndex + cPictures + nDirection) % cPictures; 
	var strValue = oPicker.options[iSelected].value;
	var ich = strValue.indexOf('\x1f');
	document.getElementById("idPVp_" + id).innerHTML = strValue.substring(0, ich);
	var strValue = strValue.substring(ich + 1, strValue.length);
	var ich = strValue.indexOf('\x1f');
	var oName = document.getElementById("idPVn_" + id);
 	if (oName) oName.innerHTML = (ich == -1)?strValue:strValue.substring(0, ich);
	if (ich > -1 ) {
		var strValue = strValue.substring(ich + 1, strValue.length);
		var ich = strValue.indexOf('\x1f');
		document.getElementById("idPVc_" + id).innerHTML = strValue.substring(0, ich);
		var strValue = strValue.substring(ich + 1, strValue.length);
		var ich = strValue.indexOf('\x1f');
		var strDescription = strValue.substring(ich + 1, strValue.length);

		var oVisibility = document.getElementById("idPVv_" + id);
		if (oVisibility) {
			if (strDescription) {
				elementRemoveClass(oVisibility, "hide");
				elementAddClass(oVisibility, "show");
			} else {
				elementRemoveClass(oVisibility, "show");
				elementAddClass(oVisibility, "hide");
			}
		}
		var oDescription = document.getElementById("idPVd_" + id);
		if (oDescription) oDescription.innerHTML = strDescription;
	}
	oPicker.selectedIndex = iSelected;
	} // PV_PickCore()

function PV_Info(id)
	{
	PV_PickCore(id, 0);
	}
function PV_Next(id)
	{
	PV_PickCore(id, +1);
	}
function PV_Prev(id)
	{
	PV_PickCore(id, -1);
	}

var g_idTimer;	// Global variable to store the id of the timer, so we can stop it later

function PV_Pause(id)
	{
	// The id is not used, but passed for code orthogonality
	if (g_idTimer != null)
		clearTimeout(g_idTimer);
	g_idTimer = null;
	}
 // Start the picture slideshow to display a new picture every 3 second
function PV_Play(id)
	{
	PV_Pause(id);
	PV_Next(id);
	// get picture interval from associated speed slider
	var nInterval=getSliderVal(document.getElementById("idPVslider_" + id));
	g_idTimer = setTimeout("PV_Play('" + id + "');", nInterval);
	}


// Set the text of the status bar
function ss(s){window.status=s;return true;}

// Clear the text of the status bar
function cs(){window.status='';}

/*

Explorer Tree 1.6
=================
by Andrew Gregory
http://www.scss.com.au/family/andrew/webdesign/explorertree/

This work is licensed under the Creative Commons Attribution License. To view a
copy of this license, visit http://creativecommons.org/licenses/by/1.0/ or send
a letter to Creative Commons, 559 Nathan Abbott Way, Stanford, California 94305,
USA.

IMPORTANT NOTE:
Variables and functions with names starting with an underscore (_) are
'internal' and not to be used.

*/

// var explorerTreeAutoCollapse = {'names':true};
var explorerTreeAutoCollapse = {'names':false};
var explorerTreeBulletWidth = {'default':10};


// Expand all explorer trees
function explorerTreeExpandAll(group) {
  var li, c, lis = getElementsByClass('li','xT' + group + '-c');
  c = lis.length
  for (var lii = 0; lii < c; lii++) {
    li = lis[lii];
    if (li.nodeName.toLowerCase() == 'li') _explorerTreeOpen(li, group);
  }
}

// Collapse all explorer trees
function explorerTreeCollapseAll(group) {
  var li, lis = getElementsByClass('li','xT' + group + '-o');
  for (var lii = 0; lii < lis.length; lii++) {
    li = lis[lii];
    if (li.nodeName.toLowerCase() == 'li') _explorerTreeClose(li, group);
  }
}

// Refresh the specified explorer tree
function explorerTreeRefresh(id) {
  var obj= document.getElementById(id);
  if (obj) _explorerTreeInitUL(obj);
}

// Get the root element (<ul>) of the tree the given element is part of.
function _explorerTreeGetRoot(element) {
  for (var e = element; e != null; e = e.parentNode) {
    if (e.nodeName.toLowerCase() == 'ul' && elementHasClass(e, 'xT')) {
      break;
    }
  }
  return e;
}

// Get the ID of the tree the given element is part of. Returns the ID or
// 'default' if there is no ID.
function _explorerTreeGetId(element) {
  var e = _explorerTreeGetRoot(element);
  var id = e ? e.getAttribute('id') : '';
  return (!id || id == '') ? 'default' : id;
}

// Initialise the given list
function _explorerTreeInitUL(ul) {
  if (window.IE7) return;
  if (navigator.userAgent.indexOf('Gecko') != -1) {
    addEvent(ul, 'mousedown', _explorerTreeStopGeckoSelect, false);
  }
  if (!ul.childNodes || ul.childNodes.length == 0) return;
//  this function split and following line commented out in GenoPro.com code as all initialisation is preset to improve performance
//  _explorerTreeInit2(ul);
}
function _explorerTreeInit2(ul) {
  // Iterate LIs
  for (var itemi = 0; itemi < ul.childNodes.length; itemi++) {
    var item = ul.childNodes[itemi];
    if (item.nodeName.toLowerCase() == 'li') {
      addEvent(item, 'click', xTclk, false);
      // Iterate things in this LI
      var hassubul = false;
      for (var subitemi = 0; subitemi < item.childNodes.length; subitemi++) {
        var subitem = item.childNodes[subitemi];
        if (subitem.nodeName.toLowerCase() == 'a') {
          addEvent(subitem, 'click', xTclk, false);
        }
        if (subitem.nodeName.toLowerCase() == 'ul') {
          hassubul = true; 
          _explorerTreeInitUL(subitem);
        }
      }
      if (hassubul) {
        // item is expandable, but don't change it if it's already been set to
        // something else
        if (!elementHasClass(item, 'xT-o') &&
            !elementHasClass(item, 'xT-b')) {
          elementAddClass(item, 'xT-c');
        }
      } else {
        // item has no sub-lists, make sure it's non-expandable
        elementRemoveClass(item, 'xT-o');
        elementRemoveClass(item, 'xT-c');
        elementAddClass(item, 'xT-b');
      }
    }
  }
}

// Gecko selects text when bullets are clicked on - stop it!
function _explorerTreeStopGeckoSelect(evt) {
  if (!evt) var evt = window.event;
  if (evt.preventDefault) {
    evt.preventDefault();
  }
  return true;
}

// Handle clicking on LI and A elements in the tree.
function xTclk(evt, group) {
  var element = (evt.target) ? evt.target : evt.srcElement;
  // make li text within <span> element clickable.
  if (elementHasClass(element,"xT-i")) element = element.parentNode;

  if (element.nodeName.toLowerCase() == 'li') {
    // toggle open/closed state, if possible
    if (elementHasClass(element, 'xT'+group+'-o')) {
      elementRemoveClass(element, 'xT'+group+'-o');
      elementAddClass(element, 'xT'+group+'-c');
      if (elementHasClass(element, 'XT-clr')) {
	elementRemoveClass(element, 'clear');
	elementAddClass(element, 'clearleft');
      }
    } else if (elementHasClass(element, 'xT'+group+'-c')) {
      elementRemoveClass(element, 'xT'+group+'-c');
      elementAddClass(element, 'xT'+group+'-o');
      if (elementHasClass(element, 'XT-clr')) {
	elementRemoveClass(element, 'clearleft');
	elementAddClass(element, 'clear');
      }
    } else {
      return true;
    }

  } else if (element.nodeName.toLowerCase() == 'a') {
    // let hyperlinks work as expected
    // TO DO: target support untested!!!
    var href = element.getAttribute('href');
    if (href) {
      if (explorerTreeAutoCollapse[_explorerTreeGetId(element)]) {
        _explorerTreeCollapseAllButElement(element, group);
      }
      var target = element.getAttribute('target');
      if (target) {
        switch (target) {
          case '_blank':
            window.open(href);
            break;
          case '_self':
            window.location.href = href;
            break;
          case '_parent':
            window.parent.location.href = href;
            break;
          case '_top':
            window.top.location.href = href;
            break;
          default:
            window.open(href, target);
            break;
        }
      }
    }
  } else {
    return true;
  }
  // we handled the event - stop it from propagating any further
  evt.cancelBubble = true;
  if (evt.stopPropagation) {
    evt.stopPropagation();
  }
  return false;
}

// Open the specified tree branch
function _explorerTreeOpen(li, group) {
  if (!elementHasClass(li, 'xT-b')) {
    elementRemoveClass(li, 'xT'+group+'-c');
    elementAddClass(li, 'xT'+group+'-o');
    if (elementHasClass(li, 'XT-clr')) {
	elementRemoveClass(li, 'clearleft');
	elementAddClass(li, 'clear');
    }
  }
}

// Close the specified tree branch
function _explorerTreeClose(li, group) {
  if (!elementHasClass(li, 'xT-b')) {
    elementRemoveClass(li, 'xT'+group+'-o');
    elementAddClass(li, 'xT'+group+'-c');
    if (elementHasClass(li, 'XT-clr')) {
	elementRemoveClass(li, 'clear');
	elementAddClass(li, 'clearleft');
    }
  }
}

// Collapse the specified tree
function explorerTreeCollapse(id) {
  _explorerTreeSetState(document.getElementById(id), true, null);
}

// Fully expand the specified tree
function explorerTreeExpand(id) {
  if (!explorerTreeAutoCollapse[id]) {
    _explorerTreeSetState(document.getElementById(id), false, null);
  }
}

// Collapse all the branches of tree except for those leading to the specified
// element. 
function _explorerTreeCollapseAllButElement(e, group) {
  var excluded = new Array();
  var tree = null;
  for (var element = e; element != null; element = element.parentNode) {
    if (element.nodeName.toLowerCase() == 'li') {
      excluded[excluded.length] = element;
    }
    if (element.nodeName.toLowerCase() == 'ul' && elementHasClass(element, 'xT')) {
      tree = element;
      break;
    }
  }
  if (tree) {
    _explorerTreeSetState(tree, true, excluded, group);
  }
}

// Set the open/closed state of all the LIs under the tree.
// The excludedElements parameter is used to implement the auto-collapse feature
// that automatically collapses tree branches other than the one actively being
// opened by the user.
function _explorerTreeSetState(ul, collapse, excludedElements, group) {
  if (window.IE7) return;
  if (!ul.childNodes || ul.childNodes.length == 0) return;
  // Iterate LIs
  for (var itemi = 0; itemi < ul.childNodes.length; itemi++) {
    var item = ul.childNodes[itemi];
    if (item.nodeName.toLowerCase() == 'li') {
      var excluded = false;
      if (excludedElements) {
        for (var exi = 0; exi < excludedElements.length; exi++) {
          if (item == excludedElements[exi]) {
            excluded = true;
            break;
          }
        }
      }
      if (!excluded) {
        if (collapse) {
          _explorerTreeClose(item, group);
        } else {
          _explorerTreeOpen(item, group);
        }
      }
      for (var subitemi = 0; subitemi < item.childNodes.length; subitemi++) {
        var subitem = item.childNodes[subitemi];
        if (subitem.nodeName.toLowerCase() == 'ul') {
          _explorerTreeSetState(subitem, collapse, excludedElements, group);
        }
      }
    }
  }
}

// Open the tree out so the list item with the link with the specified href or name is
// visible. Optionally scrolls so the item is visible. Optionally opens the
// found branch. Returns the LI that contains the specified HREF, or null if
// unsuccessful.
function explorerTreeOpenTo(win, id, href, scroll, expand, group) {
//  var li = _explorerTreeSearch(win.document.getElementById(id), _explorerTreeNormalizeHref(href));
  var li = _explorerTreeSearch(win.document.getElementById(id), href);
  if (li) {
    if (!win.IE7) {
      if (explorerTreeAutoCollapse[id]) {
        _explorerTreeCollapseAllButElement(li, group);
      }
      if (expand) {
// replaced following line with the for loop below it (Ron Jul 2006)
//       _explorerTreeOpen(li, group);
        for (var element = li; element != null; element = element.parentNode) {
          if (element.nodeName.toLowerCase() == 'li') {
            _explorerTreeOpen(element, group);
          }
          if (element.nodeName.toLowerCase() == 'ul' && elementHasClass(element, 'xT')) {
            break;
          }
        }
      }
    }
    if (scroll) {
      // get height of window we're in
      var h;
      if (win.innerHeight) {
        // Netscape, Mozilla, Opera
        h = win.innerHeight;
      } else if (win.document.documentElement && win.document.documentElement.clientHeight) {
        // IE6 in 'standards' mode
        h = win.document.documentElement.clientHeight;
      } else if (win.document.body && win.document.body.clientHeight) {
        // other IEs
        h = win.document.body.clientHeight;
      } else {
        h = 0;
      }
      // scroll so the list item is centered on the window
      win.scroll(0, li.offsetTop - h / 2);
    }
  }
  return li;
}

// Search the list (and sub-lists) for the given href. Returns the LI object if
// found, otherwise returns null.
function _explorerTreeSearch(ul, href) {
  if (!ul.childNodes || ul.childNodes.length == 0) return null;
  // Iterate LIs
  for (var itemi = 0; itemi < ul.childNodes.length; itemi++) {
    var item = ul.childNodes[itemi];
    if (item.nodeName.toLowerCase() == 'li') {
      for (var subitemi=0; subitemi < item.childNodes.length; subitemi++) {
        var subitem = item.childNodes[subitemi];
        if (subitem.nodeName.toLowerCase() == 'a') {
//         if (_explorerTreeNormalizeHref(subitem.getAttribute('href')) == href) {
          if (subitem.getAttribute('href') == href || subitem.getAttribute('name') == href) {
            return item;
          }
        }
        if (subitem.nodeName.toLowerCase() == 'ul') {
          var found = _explorerTreeSearch(subitem, href);
          if (found) {
            _explorerTreeOpen(item);
            return found;
          }
        }
      }
    }
  }
  return null;
}

// When Opera performs HTMLElement.getAttribute('href'), it *doesn't* actually
// return the raw HREF like it's supposed to. It 'normalizes' it, adding in any
// missing protocol, host name/port, and converts relative HREFs (eg
// '../../index.html') into absolute HREFs (eg '/index.html'). It does exactly
// the same thing in CSS generated content for the attr(href) function. If all
// browsers did that it would make URL comparisons trivial. Unfortunately, other
// browsers don't, and they're probably doing the right thing too by returning
// the href as it appears in the HTML.
// What this function does is normalize HREFs so we can do a meaningful
// comparison in *all* browsers.
function _explorerTreeNormalizeHref(href) {
  var i, h = href, l = window.location;
  // immediately return explicit protocols
  if (href.substring(0, 7) == 'telnet:') return href;
  if (href.substring(0, 7) == 'mailto:') return href;
  if (href.substring(0, 7) == 'gopher:') return href;
  if (href.substring(0, 5) == 'http:'  ) return href;
  if (href.substring(0, 5) == 'news:'  ) return href;
  if (href.substring(0, 5) == 'rtsp:'  ) return href;
  
  // handle absolute references
  if (h.charAt(0) == '/') {
    return l.protocol + '//' + l.host + h;
  }
  
  // strip off the filename (if any) of the location to leave the folder we're in
  l = l.toString();
  i = l.lastIndexOf('/');
  if (i != -1) {
    l = l.substring(0, i + 1);
  }
  
  // handle any relative directory references, i.e. '../'
  while (h.substring(0, 3) == '../') {
    h = h.substring(3);
    i = l.lastIndexOf('/', l.length - 2);
    if (i != -1) {
      l = l.substring(0, i + 1);
    }
  }
  return l + h;
}

/*
CSS Utilities
by Andrew Gregory
http://www.scss.com.au/family/andrew/

I have placed this code in the public domain. Feel free to use it however you
wish.

v1.4 26-Aug-2004 [GenoPro.com] Speed improvements.  The function getElementsByClass() takes more than 2 minutes on a 3.0 GHz machine with 10,000 nodes.
v1.3  6-Oct-2004 Added el.className checks
v1.2  5-Aug-2004 Simplified code by using regular expressions.
v1.1 12-Apr-2004 Fixed bug in elementRemoveClass() which removed partially matching classnames.
v1.0 29-Mar-2004 Initial version. Allows non-destructive setting and removal of CSS class names.
*/
// Test if an element has the given CSS class
function elementHasClass(el,cl){return (el.className&&el.className.search(new RegExp('\\b'+cl+'\\b'))>-1);}
// Ensure an element has the given CSS class
function elementAddClass(el,cl){var c=el.className;if(!c)c='';if(!elementHasClass(el,cl))c+=((c.length>0)?' ':'')+cl;el.className=c;}
// Ensure an element no longer has the given CSS class 
function elementRemoveClass(el,cl){if(el.className)el.className=el.className.replace(new RegExp('\\s*\\b'+cl+'\\b\\s*'),' ').replace(/^\s*/,'').replace(/\s*$/,'');}

function getElementsByClass(elem, classname)
	{
	var classes, rx, alltags, ctags, i, tag, classlist
	classes = new Array();
	rx = new RegExp('\\b' + classname + '\\b')
	alltags = document.getElementsByTagName(elem);
	cTags = alltags.length
	for (i=0; i<cTags; i++)
		{
		tag=alltags[i]
		if (tag.nodeName.toLowerCase() == elem)
			{
			if (tag.className)
				{
				if (tag.className.search(rx) >= 0)
					classes[classes.length] = tag;
				}
			}
		}
	return classes;
	}

// Cross-browser event handling
// by Scott Andrew LePera
// http://www.scottandrew.com/weblog/articles/cbs-events

// Modified 2004-08-10 by Andrew Grgeory to work around Konqueror bug
// Modified 2004-06-04 by Andrew Gregory to support legacy (NS3,4) browsers
// http://www.scss.com.au/family/andrew/

// eg. addEvent(imgObj, 'mousedown', processEvent, false);
function addEvent(obj, evType, fn, useCapture) {
  // work around Konqueror bug #57913 which prevents
  // window.addEventListener('load',...) from working
  var ua = navigator.userAgent;
  var konq = ua.indexOf('KHTML') != -1 && ua.indexOf('Safari') == -1 && obj == window && evType == 'load';
  // don't use addEventListener for Konq, have Konq fall back to the old
  // obj.onload method
  if (obj.addEventListener && !konq) {
    obj.addEventListener(evType, fn, useCapture);
    return true;
  } else if (obj.attachEvent) {
    return obj.attachEvent('on' + evType, fn);
  } else {
    if (!obj.cb_events) {
      obj.cb_events = new Object();
      obj.cb_ftemp = null;
    }
    var events = obj.cb_events[evType];
    if (!events) {
      events = new Array();
      obj.cb_events[evType] = events;
    }
    var i = 0;
    while ((i < events.length) && (events[i] != fn)) {
      i++;
    }
    if (i == events.length) {
      events[i] = fn;
      obj['on' + evType] = new Function("var ret=false,e=this.cb_events['"+evType+"'];if(e){for(var i=0;i<e.length;i++){this.cb_ftemp=e[i];ret=this.cb_ftemp()||ret;}return ret;}");
    }
    return true;
  }
}

// eg. removeEvent(imgObj, 'mousedown', processEvent, false);
function removeEvent(obj, evType, fn, useCapture) {
  // work around Konqueror bug #57913 which prevents
  // window.addEventListener('load',...) from working
  var ua = navigator.userAgent;
  var konq = ua.indexOf('KHTML') != -1 && ua.indexOf('Safari') == -1 && obj == window && evType == 'load';
  // don't use addEventListener for Konq, have Konq fall back to the old
  // obj.onload method
  if (obj.removeEventListener && !konq) {
    obj.removeEventListener(evType, fn, useCapture);
    return true;
  } else if (obj.detachEvent) {
    return obj.detachEvent('on' + evType, fn);
  } else {
    var ret = false;
    if (obj.cb_events) {
      var events = obj.cb_events[evType];
      if (events) {
        // remove any matching functions from the events array, shuffling items
        // down to fill in the space before truncating the array
        var dest = 0;
        for (var src = 0; src < events.length; src++) {
          if (dest != src) {
            events[dest] = events[src];
          }
          if (events[dest] == fn) {
            ret = true;
          } else {
            dest++;
          }
        }
        events.length = dest;
      }
    }
    return ret;
  }
}

// AutoSize - launch auto-sized, centred window
// Sources --
// http://www.therotunda.net/code/autosized-popup-window.html
// most code taken from above, with addition of code to fit on screen if image larger than window

// http://javascript.internet.com/page-details/auto-resizable-pop-up.html
// ~~~ AND ~~~
// open SCREEN-CENTERED window .. kudos to Doc JavaScript
// www.webreference.com/js
// however, his version called for image height and width as args...


function viewPic(img)
{ picfile=new Image(); picfile.src=(img); fileCheck(img); }

function fileCheck(img)
{ if((picfile.width!=0)&&(picfile.height!=0))
	{ makeWindow(img); }
	else {
		funzione="fileCheck('"+img+"')"; intervallo=setTimeout(funzione,10); }}

function makeWindow(img)
{ ht=picfile.height; wd=picfile.width; 
	if (window.screen) 
	{ var avht=screen.availHeight - 40; var avwd=screen.availWidth - 40;
                if (ht > avht) {
			wd=wd*avht/ht
                        ht=avht
		}
		if (wd > avwd) {
			ht=ht*avwd/wd
			wd=avwd
		}
		var xcen=(avwd-wd)/2; var ycen=(avht-ht)/2;
		var args="height="+(ht+40)+",innerHeight="+ht;
		args+=",width="+(wd+40) +",innerWidth="+wd;
		args+=",left="+xcen+",screenX="+xcen;
		args+=",top="+ycen+",screenY="+ycen+",resizable=1,scrollbars=1"; }
		return window.open(img, '', args); 
}


function CenterMap(x,y,hlight)
{
document.cookie='CenterMap='+x+','+y+','+hlight
}

function showPopUpFrame(percent,svg) {
	if (!svg && top.popupToggleState != top.popupMaxButton.src) {
		parent.parent.document.getElementById('lower').cols = top.saveLower;
		parent.document.getElementById('rhs').rows = top.saveRhs;
		top.popupToggleState = top.popupMaxButton.src;
	}
	var pc=percent;
	if(top.document.getElementById('rhs').rows=="*,0" || pc != "")      // don't change if already changed by user
	{	if(pc=='') pc='65%';
		top.document.getElementById('rhs').rows="*,"+pc;
	}
}
function hidePopUpFrame(e, newpage) {
	parent.document.getElementById('rhs').rows="*,0";
	if (top.popupToggleState != top.popupMaxButton.src) {
		parent.parent.document.getElementById('lower').cols = top.saveLower;
		top.popupToggleState = top.popupMaxButton.src;
	}
	top.frames["popup"].location = (newpage)?newpage:'popup.htm'
}
function hideSvgFrame(e) {
	if (!e && window.event) e=window.event;
	if (!e) return false;

	var button;
	if (e.target) button=e.target;
	if (e.srcElement) button=e.srcElement;
	button = button.previousSibling.previousSibling;
	if (button.src != top.popupMaxButton.src) {
		parent.parent.document.getElementById('lower').cols = top.saveLower;
		parent.document.getElementById('rhs').rows = top.saveRhs;
		top.popupToggleState = top.popupMaxButton.src;
		button.src = top.popupToggleState;
	}
	hidePopUpFrame(e, '../popup.htm')
}


function initPopupToggle(button) {
	document.images[button].src = top.popupToggleState;
}

function togglePopUpFrame(button)
{
	if (top.popupToggleState == top.popupMaxButton.src) {
		top.saveLower = parent.document.getElementById('lower').cols;
		top.saveRhs = parent.document.getElementById('rhs').rows;
		parent.parent.document.getElementById('lower').cols = "0,*";
		parent.document.getElementById('rhs').rows = "0,*";
		top.popupToggleState = top.popupResButton.src;
		document.images[button].src= top.popupToggleState;
	}
	else {
		parent.parent.document.getElementById('lower').cols = top.saveLower;
		parent.document.getElementById('rhs').rows = top.saveRhs;
		top.popupToggleState = top.popupMaxButton.src;
		document.images[button].src= top.popupToggleState;
	}
}
function getArgs(  ) {
    var args = new Object(  );
    var query = window.location.search.substring(1);     
      // Get query string
    var pairs = query.split(",");
     // Break at comma
    for(var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
          // Look for "name=value"
        if (pos == -1) continue;
          // If not found, skip
        var argname = pairs[i].substring(0,pos);
          // Extract the name
        var value = pairs[i].substring(pos+1);
          // Extract the value
        args[argname] = unescape(value);
         // Store as a property
    }
    return args;     // Return the object
}

function ContactAuthor()
	{
	// Find which page the user is viewing.
	// This information may be useful to the author if contacted to correct an error. 
	if (parent != null && parent.detail != null)
		{
		window.open("http://familytrees.genopro.com/Contact-Author.aspx?url=" + parent.detail.location);
		return false;	// Stop further processing
		}
	return true;
	}

var flip = new Image(16, 16)
var flop = new Image(16, 16)
var flip2 = new Image(16, 16)
var flop2 = new Image(16, 16)

function InitToggleTree() {
	flip.src = 'images/collapse.jpg'
	flop.src = 'images/expand.jpg'
	flip2.src = 'images/collapse2.jpg'
	flop2.src = 'images/expand2.jpg'
}

function ToggleTree(img,group) {
	switch (group) {
	case '' : 
		if (document.images[img].src == flop.src) {
			explorerTreeExpandAll("");
			document.images[img].src = flip.src;
		} 
		else {
			explorerTreeCollapseAll("");
			document.images[img].src = flop.src;
		}
		break;
	case '2' : 
		if (document.images[img].src == flop2.src) {
			explorerTreeExpandAll("2");
			document.images[img].src = flip2.src;
		}
		else {
			explorerTreeCollapseAll("2");
			document.images[img].src = flop2.src;
		}
		break;
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Slider control is partially based on http://www.arantius.com/article/lightweight+javascript+slider+control
so below is the associated copyright notice:-

Originally from:
  http://www.arantius.com/article/lightweight+javascript+slider+control

Copyright (c) 2006 Anthony Lieuallen, http://www.arantius.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var sliderKnob;
var sliderMax = 10000;
var sliderMin = 1000;
var sliderActive = false;

function drawSliderByVal(slider, val) {
	var p=(val-sliderMin)/(sliderMax-sliderMin);
	var x=-slider.width+(slider.width-sliderKnob.width)*p;
	sliderKnob.style.left=x + "px";
	var v=(Math.round((sliderMax+sliderMin-val)/100)/10)+'';
	sliderKnob.title=v;
	sliderKnob.alt=v;
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function setSliderByClientX(slider, clientX) {
	var p=(clientX-slider.offsetLeft-(sliderKnob.width/2))/(slider.width-sliderKnob.width);
	var v=(sliderMax-sliderMin)*p + sliderMin;
	if (v>sliderMax) v=sliderMax;
	if (v<sliderMin) v=sliderMin;
	drawSliderByVal(slider, v);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function getSliderVal(slider) {
	sliderKnob = slider.nextSibling;
	var p=(sliderKnob.offsetLeft-slider.offsetLeft-(sliderKnob.width)/2)/(slider.width-sliderKnob.width);
	return sliderMax-(sliderMax-sliderMin)*p;
}	
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function sliderClick(e) {
	var el=sliderFromEvent(e);
	if (!el) return;
	setSliderByClientX(el, e.clientX);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function sliderMouseMove(e) {
	var el=sliderFromEvent(e);
	if (!el) return;
	if (!sliderActive) return;
	setSliderByClientX(el, e.clientX);
	stopEvent(e);
}
function sliderMouseDown(e) {
//	sliderClick(e);
	sliderActive = true;
	var el=sliderFromEvent(e);
	if (!el) return;
	stopEvent(e);
}
function sliderMouseUpOut(e) {
	sliderActive=false;
	stopEvent(e);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function sliderFromEvent(e) {
	if (!e && window.event) e=window.event;
	if (!e) return false;

	var slider;
	if (e.target) slider=e.target;
	if (e.srcElement) slider=e.srcElement;

	sliderKnob = slider;
	slider = slider.previousSibling;
	return slider;
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//borrowed from prototype: http://prototype.conio.net/
function stopEvent(event) {
	if (event.preventDefault) {
		event.preventDefault();
		event.stopPropagation();
	} else {
		event.returnValue=false;
		event.cancelBubble=true;
	}
}
/*----------------------------------------------------------------------------*/
//
// Google Maps 
//
    // Some of the following script is based on code provided by the
    // Blackpool Community Church Javascript Team
    // on their excellent Google Maps API tutorial at  
    // http://www.econym.demon.co.uk/googlemaps/

var mapZoom, mapPlace

function exitGoogleMap() {
	if (top.gMapBack) window.location = top.gMapBack;
}
function initGoogleMap() {
	var el=document.getElementById('GoogleMap');
	var ht=document.body.parentNode.clientHeight;
	if (!ht) ht=document.clientHeight;
	if ((ht-70)>0) el.style.height = (ht - 70) + 'px';
}
function addMarker(point, tooltip, html) {
        var marker = new GMarker(point, {title: tooltip});
        if (html) {
		GEvent.addListener(marker, "click",
			function() {
          			marker.openInfoWindowHtml(html);
        		}
		);
//        	GEvent.addListener(marker,"mouseover", function() {
//          			marker.openInfoWindowHtml(html);
//        		}       
//		);
	}
        return marker;
      }

function showGoogleMap() {
       	if (top.gMapLat != '' && top.gMapLng != '' ) {
       		var gMap = new GMap2(document.getElementById("GoogleMap"));
		gMap.checkResize();
		gMap.setCenter(new GLatLng(top.gMapLat, top.gMapLng), top.gMapZoom);
		gMap.enableDoubleClickZoom()
		gMap.addControl(new GSmallMapControl());
		gMap.addControl(new GMapTypeControl());
		marker = addMarker(new GLatLng(top.gMapLat, top.gMapLng), top.gMapPlace, top.gMapHtml);
		gMap.addOverlay(marker);
	} else {
		var geocoder = new GClientGeocoder();
		geocoder.getLocations(strPlace, addAddressToMap);
	}
}
function checkGoogleMap(strLat, strLng, strPlace, zoom, back, show) {
	top.gMapBack = location;
	if (GBrowserIsCompatible()) {
		top.gMapZoom = zoom;
		top.gMapPlace = strPlace;
		top.gMapShow = show;
		top.gMapHtml = '';
		var marker, gMap; 
		if (back) top.gMapBack = back;
		top.gMapLat = getCoord(strLat);
		top.gMapLng = getCoord(strLng);
        	if (top.gMapLat != '' && top.gMapLng != '' ) {
			if (show) {
				showGoogleMap();
			} else {
				top.frames["popup"].location = 'gmap_place.htm';
				showPopUpFrame('', false);
			}
		} else {
			var geocoder = new GClientGeocoder();
			geocoder.getLocations(strPlace, addAddressToMap);
		}
	}
}
function getCoord(strAddr) {
	if (strAddr) {
		var dec=0, negate = 1, multiplier = 1;
		var coord = strAddr.replace(/[WSws]/,'-')
		if (coord.indexOf('-') > -1) negate = -1;
		coord = coord.replace(/[^\d\.]/g,' ')
		coord=coord.split(' ');
		for (var i=0; i<coord.length; i++) {
			if (coord[i]) {
				dec += coord[i] * multiplier;
				multiplier /= 60;
			}
		}
		return(dec * negate);
	} else {
		return('');
	}
}
function addAddressToMap(response) {
	if (!response || response.Status.code != G_GEO_SUCCESS) {
		var reason="Code "+response.Status.code;
		if (top.gMapReasons[response.Status.code]) {
			reason = top.gMapReasons[response.Status.code]
		} 
        	var el= document.getElementById("GoogleMapWrapper")
		if (el) {
			el.innerHTML = top.gMapReasons['ErrorMessage'] + '('+response.name+') - ' + reason;
		} else {
			alert(top.gMapReasons['ErrorMessage'] + '('+response.name+') \n ' + reason);
		}
	} else {
		place = response.Placemark[0];
		top.gMapLat = place.Point.coordinates[1];
		top.gMapLng = place.Point.coordinates[0];
		top.gMapHtml = place.address + '<br>' +
			'<b>Country code:</b> ' + place.AddressDetails.Country.CountryNameCode + '<br>' +
			'<g>Grid Reference:</b> ' + place.Point.coordinates[1] + '/' + place.Point.coordinates[0];
		if (top.gMapShow) {
			showGoogleMap();
		} else {
			top.frames["popup"].location = 'gmap_place.htm';
			showPopUpFrame('', false);
		}
	}
}


function makeGoogleMap() {
	if (GBrowserIsCompatible()) {
       		var gMap = new GMap2(document.getElementById("GoogleMap"));
		showPopUpFrame('', false);
		gMap.enableDoubleClickZoom()
		gMap.setCenter(new GLatLng(0,0),0);
		gMap.addControl(new GSmallMapControl());
		gMap.addControl(new GMapTypeControl());
		var clusterer = new Clusterer(gMap);
		var bounds = new GLatLngBounds();
		for (var i=0; i<gMapData.markers.length; i++) {
			var point = new GLatLng(getCoord(gMapData.markers[i].lat), getCoord(gMapData.markers[i].lng));
			var marker = addMarker(point, gMapData.markers[i].label, gMapData.markers[i].html);
			clusterer.AddMarker(marker, gMapData.markers[i].label);
			bounds.extend(point);
       		}
		var zoomfunc = zoomGoogleMapLater(gMap, bounds);
		setTimeout(zoomfunc, 500)
	}
}
function zoomGoogleMapLater(map, bounds) {
	return function () {
		if (map.getBoundsZoomLevel(bounds) > 0 ) {
			var clat = (bounds.getNorthEast().lat() + bounds.getSouthWest().lat()) /2;
			var clng = (bounds.getNorthEast().lng() + bounds.getSouthWest().lng()) /2;
			map.setZoom(map.getBoundsZoomLevel(bounds));
			map.setCenter(new GLatLng(clat,clng));
		} else {
			var zoomfunc = zoomGoogleMapLater(map, bounds);
			setTimeout(zoomfunc, 500)
		}
	}
}

	

