//$Id: global.js,v 1.124 2007/02/16 17:51:30 nick Exp $
// common functions

var gaDefaultTags = {'work':0, 'travel':0, 'personal':0};
var gLastTimerId=0;
function delayCode(str, msecs)
{
	clearTimeout(gLastTimerId);
	gLastTimerId = setTimeout(str, msecs);
}


function isDayViewShowing()
{
	el=getEl('dayViewPopup');
	return (el.style.visibility && el.style.visibility != 'hidden');
}

function isEditEventVisible()
{
	el=getEl('eventEditPopup');
	return (el.style.visibility && el.style.visibility != 'hidden');
}

function isSearchViewVisible()
{
	return isDivDisplayed('searchResultsView');
}

function isWeekViewVisible()
{
	return isDivDisplayed('weekViewPopup');
}

function isWebtopVisible()
{
	return isDivDisplayed('webtop');
}

function isBuddyUpdatesVisible()
{
	return isDivDisplayed('buddyUpdatesPopup');
}

function isTodoVisible()
{
	return isDivDisplayed('todoPopup');
}

function isSupermailVisible()
{
	return isDivDisplayed('supermailPopup');
}

function isDivDisplayed(id)
{
	el=getEl(id);
	if (!el)
		return false;
	return (el.style.display && (el.style.display == 'block' || el.style.display == 'inline'));
}

hoverDiv = function(buttonId, popupId, align, extraOnShowCode, extraOnHideCode)
{
	this.timer = 0;
	this.buttonId = buttonId;
	this.popupId=popupId;
	this.align=align;
	this.extraOnShowCode=extraOnShowCode;
	this.extraOnHideCode=extraOnHideCode;
}

gHoverDivs = new Array();
function setHoverDiv(buttonId, popupId, align, extraOnShowCode, extraOnHideCode)
{
	i=gHoverDivs.length;
	gHoverDivs[i] = new hoverDiv(buttonId, popupId, align, extraOnShowCode, extraOnHideCode);
	
	elButton = getEl(buttonId);
	elButton.onmouseover = new Function("showHoverDiv(arguments[0],'"+i+"');");
	elButton.onmouseout = new Function("hideHoverDiv(arguments[0],'"+i+"');");

	elPopup = getEl(popupId);
	elPopup.onmouseover = new Function("showHoverDiv(arguments[0],'"+i+"');");
	elPopup.onmouseout = new Function("hideHoverDiv(arguments[0],'"+i+"');");
}

function hideHoverDiv(evt, i)
{
	hover = gHoverDivs[i];
	evt = (evt) ? evt : event;
	elPopup = getEl(hover.popupId);

	// don't hide if we're on a child window
	var elTarget = evt.relatedTarget ? evt.relatedTarget : evt.toElement;
	if (!elTarget)
		return;
	if (getEl('dm6m1')&&(getEl('dm6m1').style.visibility == 'visible'))
//	if (getEl('dm6m1'))
		return;
	while ( elTarget = elTarget.parentNode )
		if ( elTarget == elPopup )
			return;

	hover.timer = setTimeout("onHideHoverTimer("+i+");",100);
}

function onHideHoverTimer(i)
{
	hover = gHoverDivs[i];
	elPopup = getEl(hover.popupId);
	elPopup.style.visibility = 'hidden';
	eval(hover.extraOnHideCode);
}

function keepHoverOnPage(coords, el)
{
	// keep it on the page
	winWidth = getWinWidth();
	if (coords.x + el.offsetWidth > winWidth)
		coords.x = winWidth-el.offsetWidth-2;
	if (coords.x < 0)
		coords.x = 0;
		
	winBottom = getWinBottom();
	if(coords.y+el.offsetHeight > winBottom)
		coords.y = winBottom - el.offsetHeight;
	if (coords.y < 0)
		coords.y = 0;
		
	return coords;
}

function showHoverDiv(evt, i)
{
	hover = gHoverDivs[i];
	if (hover.timer)
	{
		clearTimeout(hover.timer);
		hover.timer=0;
	}
	evt ? evt : window.event;

	elPopup = getEl(hover.popupId);
	if (elPopup.style.visibility == 'visible')
		return;
	
	eval(hover.extraOnShowCode);
	
	elButton = getEl(hover.buttonId);
	coords = getElementPos(elButton);
	coords.y += elButton.offsetHeight;
	if (hover.align == 'rightEdges')
	{
		coords.x += elButton.offsetWidth - elPopup.offsetWidth;
	}
	else // bottomLeft
	{
	}
	
	coords = keepHoverOnPage(coords, elPopup);
	setElementPos(elPopup, coords);
	elPopup.style.visibility = 'visible';
}

function getEl(id)
{
	return document.getElementById(id);
}

function getElementPos(element)
{
  var coords = {x: 0, y: 0}; 
  do { 
    coords.x += element.offsetLeft; 
    coords.y += element.offsetTop; 
  } 
  while ((element = element.offsetParent)); 
  return coords; 
}

function setElementPos(element, coords)
{
	element.style.left = coords.x+"px";
	element.style.top = coords.y+"px";
}


function NewWindow(url,name,w,h,scroll,additionalSettings)
{
  var left = (screen.width-w)/2;
  var top = (screen.height-h)/2;
  var settings  ='height='+h+',';
      settings +='width='+w+',';
      settings +='top='+top+',';
      settings +='left='+left+',';
      settings +='resizable,scrollbars,';
  win = window.open(url,name,settings+additionalSettings);
  win.focus();
}

function CheckLogin(msg)
{
	msg += "\n\nComplete the quick and easy signup now?";
	if (isLoggedIn())
		return true;
	else
	{
		if (confirm(msg))
			document.location.href='/signup.php';
		return false;
	}
}

function hashPassword()
{
	el = getEl('passVisible');
	if (el.value.length <= 0)
	{
		alert('Please enter a Password');
		return false;
	}

	plain = getEl("plaintext").checked;
	if (plain)
		getEl('pass').value = el.value;
	else
		getEl('pass').value = hex_md5(el.value);
	return true;
}

function getValueFromQueryString(name, queryString)
{
	if (queryString==null) return '';
    start = queryString.indexOf(name+'=', 0);
    if (start < 0)
    	return '';
    start += name.length+1;
	end = queryString.indexOf ("&", start);
	if (end == -1)
        end = queryString.length;
    return unescape(queryString.substring(start, end));
}


function getWinWidth()
{
    if (window.innerWidth)
    {
    	w = window.innerWidth;
    	if (document.body.scrollHeight && document.body.scrollHeight >= getWinHeight())
    		w-=16;
    	return w;
    }
    else if (document.documentElement && document.documentElement.clientWidth) 
  		return document.documentElement.clientWidth;
    else if (document.body && document.body.clientWidth) 
  		return document.body.clientWidth;
  	else if (document.body && document.body.parentNode && document.body.parentNode.clientWidth) 
 		return document.body.parentNode.clientWidth;
}

function getWinHeight()
{
    if (window.innerHeight) return window.innerHeight;
  	else if (document.documentElement && document.documentElement.clientHeight) 
  		return document.documentElement.clientHeight;
  	else if (document.body && document.body.clientHeight) 
  		return document.body.clientHeight;
  	else if (document.body && document.body.parentNode && document.body.parentNode.clientHeight) 
  		return document.body.parentNode.clientHeight;
}

function getWinLeft() {return typeof window.pageXOffset != 'undefined' ? window.pageXOffset:document.documentElement && document.documentElement.scrollLeft? document.documentElement.scrollLeft:document.body.scrollLeft? document.body.scrollLeft:0;}
function getWinTop() {return typeof window.pageYOffset != 'undefined' ? window.pageYOffset:document.documentElement && document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop?document.body.scrollTop:0;}
function getWinRight() {return getWinLeft()+getWinWidth();}
function getWinBottom() {return getWinTop()+getWinHeight();}

function showWindowShade(id, displayMode) // block or none
{
	el = getEl(id);

	if (!el || el.style.display == displayMode)
		return;
	
	if (displayMode == 'block')
	{
		var biggestHeight = document.body.scrollHeight;
		if (getWinHeight() > biggestHeight)
			biggestHeight = getWinHeight();

		el.style.width=document.body.scrollWidth+'px';
		el.style.height=biggestHeight+'px';
	}
	
	el.style.display = displayMode;
}

function textToForm(text,id)
{
	element = getEl(id);
	element.value += ' '+text;
}


var globalInputBackgroundColor = '';
function highlightInput(id,borderInfo)
{
	el = getEl(id);
	if (el.value == 'New Entry | Edit Me!')
		el.value = '';
	globalInputBackgroundColor = el.style.backgroundColor;
	el.style.backgroundColor = '#fff';
	el.style.backgroundImage = 'none'
	el.style.border = borderInfo;
}

function blurInput(id,borderInfo)
{
	el = getEl(id);
	if ((el.value == '')&&(el.name == 'summary'))
		el.value = 'New Entry | Edit Me!';
	el.style.border = borderInfo;
	el.style.backgroundColor = globalInputBackgroundColor;
}

function selectTab(id)
{
	for(var i=0; i<gaTabs.length; i++) // gaTabs must be defined in script
	{
		if (id == gaTabs[i])
			toggleDisplayOn(gaTabs[i]);		
		else
			toggleDisplayOff(gaTabs[i]);
	}
}

function toggleDisplay(id)
{
	el = getEl(id);
	if (el.style.display == 'block')
		el.style.display = 'none';
	else
		el.style.display = 'block';
}

function toggleVisibility(id)
{
	el = getEl(id);
	if (el.style.visibility == 'visible')
		el.style.visibility = 'hidden';
	else
		el.style.visibility = 'visible';
}

function toggleVisibilityOn(id)
{
	el = getEl(id);
	el.style.visibility = 'visible';
}

function toggleVisibilityOff(id)
{
	el = getEl(id);
	el.style.visibility = 'hidden';
}

function toggleDisplayOn(id)
{
	el = getEl(id);
	el.style.display = 'block';
}

function toggleDisplayOff(id)
{
	el = getEl(id);
	el.style.display = 'none';
}


function displayCenteredDiv(id,offsetTop)
{
	el = getEl(id);
	el.style.display = 'inline';

	winTop = getWinTop();
	if (offsetTop > 20)
		el.style.top = winTop + offsetTop + 'px';
	else
		el.style.top = winTop + 20 + 'px';
	el.style.left= (getWinWidth()/2 - el.offsetWidth/2) +'px';
	el.style.visibility = 'visible';
}


function hideFocus()
// requires div#hidden display: none
// and a text form id hideme
{
	if (navigator.userAgent.indexOf("Firefox") != -1)
	{
		getEl('hideme').focus();
	}
}

function showAddBuddyForm(locationId, email)
{
	pos = getElementPos(getEl(locationId));
	setElementPos(getEl('addShareForm'),pos);
	toggleDisplayOn('addShareForm');
	getEl('newBuddyEmail').value=email;
	hideFocus();
}

function delContact(name, id)
{
	if (confirm('Remove '+name+' from your contacts?'))
	{
		getEl('contactRow'+id).style.display = 'none'; // could be table part, don't use innerHTML
		makeXmlHttpRequest('delContact', 'id='+id);
	}
}

function delBuddy(id)
{
	getEl('buddyRow'+id).style.display = 'none'; // could be table part, don't use innerHTML
	makeXmlHttpRequest('delBuddy', 'id='+id);
}

function createBuddy(id, sName)
{
	sReaction = getEl('buddy_'+id).innerHTML = sName+' is now a Buddy';
	makeXmlHttpRequest('createBuddy', 'id='+id, sReaction);
}

var gbNextRequestToDoc = 0;
var gaLastRequest = new Array;
function makeXmlHttpRequest(action, args, reaction)
{
    if (window.XMLHttpRequest)
    	req = new XMLHttpRequest();
    else if (window.ActiveXObject)
        req = new ActiveXObject("Microsoft.XMLHTTP");
    if (!req)
    {
    	alert("Your browser is outdated (missing XMLHttpRequest). This feature will not work on your broswer.");
    	return;
    }

    gaLastRequest['action'] = action;
	gaLastRequest['reaction'] = reaction;
	if (!window.gAltUserInfo)
		gAltUserInfo='';
	url = '/ajax.php?action='+action+'&'+args+'&'+gAltUserInfo;
	if (gbNextRequestToDoc)
	{
		document.location.href=url;
		return;
	}
    req.onreadystatechange = processReqChange;
    req.open("GET", url, true);
    req.send(null);
}
function makeXmlHttpPOSTRequest(action, data, reaction)
{
    if (window.XMLHttpRequest)
    	req = new XMLHttpRequest();
    else if (window.ActiveXObject)
        req = new ActiveXObject("Microsoft.XMLHTTP");
    if (!req)
    {
    	alert("Your browser is outdated (missing XMLHttpRequest). This feature will not work on your broswer.");
    	return;
    }
    
    data += '&'+gAltUserInfo;
    
	if (gbNextRequestToDoc)
	{
		document.location.href='/ajax.php?'+data;
		return;
	}

    gaLastRequest['action'] = action;
	gaLastRequest['reaction'] = reaction;
    req.onreadystatechange = processReqChange;
    req.open("POST", '/ajax.php', true);
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
    req.send(data);
}

function processReqChange()
{
	// only if req shows "loaded"
    if (req.readyState == 4)
    {
        if (req.status == 200) // only if "OK"
        {
        	str = req.responseText;
        	if (gaLastRequest['action'] == 'moreData' ||
        		gaLastRequest['action'] == 'newEvent' ||
        		gaLastRequest['action'] == 'moveEvent' ||
        		gaLastRequest['action'] == 'editEvent' ||
        		gaLastRequest['action'] == 'createTodo' ||
        		gaLastRequest['action'] == 'delTodo' ||
        		gaLastRequest['action'] == 'editTodo' ||
        		gaLastRequest['action'] == 'emailTodos' ||
        		gaLastRequest['action'] == 'toggleTodoDone' ||
        		gaLastRequest['action'] == 'newSMMessage' ||
        		gaLastRequest['action'] == 'getSMMessages')
        	{
//alert(str);
        		eval(str);
        	}
        	
        	eval(gaLastRequest['reaction']);
        }
        else
            alert("There was a problem retrieving the data:" + req.statusText);
    }
}

function goToUrlOnConfirm(message, url)
{
	if (confirm(message))
		document.location.href=url;
}


///////////
///////////
// start one-box popup (invites, tags)
gOneBoxPopupMode = ''; // can be 'invite' or 'tag' or 'remind'
function testOneBoxInput(inputId, evt)
{
	code = evt.keyCode;
	elInput = getEl(inputId);
	value = elInput.value.toLowerCase();
	bOneBoxPopupVisible = getEl('oneBoxPopup').style.display == 'block';

	// open up the one box popup?
	if (!bOneBoxPopupVisible)
	{
		if (value.length && value.lastIndexOf('+') == value.length-1)
			showOneBoxPopup(inputId, 'invite');
		else if (value.length >= 4 && value.lastIndexOf('tag ') == value.length-4)
			showOneBoxPopup(inputId, 'tag');
		else if (value.length >= 7 && value.lastIndexOf('remind ') == value.length-7)
			showOneBoxPopup(inputId, 'remind');
		else if (value.length >= 9 && value.lastIndexOf('reminder ') == value.length-9)
			showOneBoxPopup(inputId, 'reminder');
		return true;
	}
	else if (value.indexOf('+') < 0 &&
		value.indexOf('tag ') < 0 &&
		value.indexOf('remind ') < 0 &&
		value.indexOf('reminder ') < 0) // it's visible, should we close it?
	{
		oneBoxPopupDone(false, inputId);
		return true;
	}

	elSelect = getEl('oneBoxPopupSelect');
	if (code == 40) // down arrow
	{
		elSelect.selectedIndex = Math.min(elSelect.selectedIndex+1, elSelect.length-1);
		return false;
	}
	else if (code == 38) // up arrow
	{
		elSelect.selectedIndex = Math.max(elSelect.selectedIndex-1, 0);
		return false;
	}
	if (code == 13 || code == 9 || code == 39)
	{
		oneBoxPopupDone(true, inputId);
		return false;
	}
	else // try to pick a match
	{
		var sMatchKey = '+'; // invite
		if (gOneBoxPopupMode != 'invite')
			sMatchKey = gOneBoxPopupMode+' ';
		strMatch = value.substr(value.lastIndexOf(sMatchKey)+sMatchKey.length).toLowerCase();
		if (!strMatch.length)
			return true;
		for (var i=0; i<elSelect.options.length; i++)
		{
			value = elSelect.options[i].value.toLowerCase();
			if (value.indexOf(strMatch)==0)
			{
				elSelect.selectedIndex=i;
				return true;
			}
		}
		// no match - clear selection
		elSelect.selectedIndex=-1;
	}
	return true;
}

function onOneBoxFocus(input)
{
	str = input.value;
	if (str == 'Add a new event here...')
		input.value='';
}

function hideBdayPopup()
{
	toggleDisplayOff('bdayPopup');
	showWindowShade('editEventWindowShade','none');
	
	inputId = getEl('bdayInputId').value;
	var strInput = getEl(inputId).value;

	el=getEl('bdayRepeat');
	if (el && el.checked)
		strInput += ' repeat yearly';

	el=getEl('bdayRemind');
	if (el && el.checked)
		strInput += ' remind in 1 Day';
		
	el=getEl('bdayYear');
	if (el)
	{
		var bYear=el.value+'';
		if (bYear.length==4)
		{
			var desc='Born';
			if (strInput.search(/\b(anniv)|(anniversary)/i) >= 0)
				desc='Began';
	
			if (strInput.indexOf(')') < 0)
				strInput += ' ('+desc+' in '+bYear+'.)';
			else
				strInput = strInput.replace(/\)/, ' '+desc+' in '+bYear+'.)');
		}
		
	}
	
	getEl(inputId).value = strInput;
	onSubmitOneBox(inputId, true)
}

function closeTagOrInvitePopup(inputId)
{
	if (getEl('oneBoxPopup').style.display == 'block')
	{
		oneBoxPopupDone(true, inputId);
		return true;
	}
	
	return false;
}

function onSubmitOneBox(inputId, bSkipBdayTest)
{
	strInput = getEl(inputId).value;

	if (closeTagOrInvitePopup(inputId))
		return false;
	
	// for todos, that's it
	if (inputId == 'todoInput')
		return true;
		
	// if it's JUST a date, jump to it without creating an event!
	aResults = strInput.match(/^(\d\d?)[\/\-\.](\d\d?)[\/\-\.]?(\d?\d?\d?\d?)$/);
	if (aResults)
	{
		d = new Date();
		m=gDateInputFormat ? RegExp.$2 : RegExp.$1;
		m = parseInt(m)-1;
		day=gDateInputFormat ? RegExp.$1 : RegExp.$2;
		d.setDate(RegExp.$2);
		d.setMonth(m);
		if (RegExp.$3 && RegExp.$3.length == 4)
			d.setFullYear(RegExp.$3);
		getEl(inputId).value = '';
		drawMainCalendar(d.valueOf());
		flashHighlightedDate(d);
		return false;
	}

	// check for birthday/anniversary
	if (!bSkipBdayTest)
	{
		bNewEvent = (inputId.indexOf('input') >= 0 || inputId.indexOf('dayViewInput') >= 0);
		var bBday=0;
		var sDesc='a Birthday';
		var sStartDesc="this person's birth YEAR?  If so, enter it and we'll show his/her age.";
		if (bNewEvent && strInput.search(/\b(bday)|(birthday)|(b\-day)/i) >= 0)
		{
			bBday=1;
		}
		else if (bNewEvent && strInput.search(/\b(anniv)|(anniversary)/i) >= 0)
		{
			bBday=1;
			sDesc='an Anniverary';
			sStartDesc="the YEAR this began?  If so, we\'ll show you how many years it\s been.";
		}
		if (bBday)
		{
			var repeat='';
			var year='';
			var remind='';
			getEl('bdayPopHeading').innerHTML='Is this '+sDesc+'?';
			if (strInput.search(/\brepeat/i) < 0)
				repeat='<span class="bold">Repeat Event</span><br /><input type="checkbox" checked id="bdayRepeat" /> Repeat this every year on the same day?<br /><br />';
			if (strInput.search(/\(.*?\b\d\d\d\d\b.*?\)/) < 0)
				year='<span class="bold">Year</span><br /><input type="text" size=5 class="input" id="bdayYear" /> Do you know '+sStartDesc+'  Enter all digits (e.g. "1972").<br /><br />';
			if (strInput.search(/\bremind/i) < 0)
				remind='<span class="bold">Reminder</span><br /><input type="checkbox" checked id="bdayRemind" /> Send a reminder 1 day ahead of time?<br /><br />';
			if (repeat.length || year.length || remind.length)
			{
				getEl('bdayInputId').value=inputId;
				getEl('bdayRepeatDesc').innerHTML=repeat;
				getEl('bdayYearDesc').innerHTML=year;
				getEl('bdayRemindDesc').innerHTML=remind;
				displayCenteredDiv('bdayPopup');
				showWindowShade('editEventWindowShade','block');
				hideFocus();
				return false;
			}
		}
	}
	// new events by ajax 10/28/06
	if (bNewEvent)
	{
		if (!strInput.length)
		{
			alert('To add an event, use this format:  event date time (notes).\n\nExample: Haircut 4/10 3-4pm (with Bob)');
			return false;
		}
		
		if (!isLoggedIn() && !gAltUserInfo.length)
			return true;
		
		toggleNewEventInputs(true);
		if (strInput.search(/(\btodo\b)/i) >= 0)
		{
			strInput = strInput.replace(/\s*todo\s*/i, '');
			makeXmlHttpRequest('createTodo', 'input='+encodeURIComponent(strInput), "showTodos();");
		}
		else
		{
			var data = 'action=newEvent&input='+encodeURIComponent(strInput);
			if (inputId == 'dayViewInput')
				data += '&source=dayView&defaultTime='+encodeURIComponent(getEl('defaultTime').value);
			makeXmlHttpPOSTRequest('newEvent', data, '');			
		}
		getEl(inputId).value = '';
		return false;
	}
	
	return false;
}

function onSubmitEventEdit(form)
{
	if (closeTagOrInvitePopup('editEventInvites'))
		return false;
	
	if (!isLoggedIn() && !gAltUserInfo.length)
		return true;
	
	toggleEditEventInputs(true);
	els=form.elements;
	var data='';
	for (i=0; i<els.length; i++)
	{
		if (els[i].name.length && els[i].value)
		{
			if ((els[i].type=='checkbox' || els[i].type=='radio') && !els[i].checked)
				continue;
			data += '&'+els[i].name+'='+encodeURIComponent(els[i].value);
		}
	}
	if (isDayViewShowing())
		data += '&showDayView=1';
	makeXmlHttpPOSTRequest('editEvent', data, '');
	return false;
}

function toggleNewEventInputs(bDisable)
{
	var stateSubmit='inline';
	var stateTwiddle='none';
	if (bDisable)
	{
		stateSubmit='none';
		stateTwiddle='inline';
	}
	
	getEl('dayViewInput').disabled = bDisable;
	getEl('dayViewInputSubmit').style.display = stateSubmit;
	getEl('dayViewInputTwiddle').style.display = stateTwiddle;
	getEl('input').disabled = bDisable;
	getEl('inputSubmit').style.display = stateSubmit;
	getEl('inputTwiddle').style.display = stateTwiddle;	
}

function toggleEditEventInputs(bDisable)
{
	var stateSubmit='inline';
	var stateTwiddle='none';
	if (bDisable)
	{
		stateSubmit='none';
		stateTwiddle='inline';
	}
	
	getEl('editEventSubmit').style.display = stateSubmit;
	getEl('editEventTwiddle').style.display = stateTwiddle;
}

function showOneBoxPopup(inputId, mode)
{
	gOneBoxPopupMode = mode;
	elParent = getEl(inputId);
	// create the options
	var sOptions='';
	if (gOneBoxPopupMode == 'invite')
	{
		for (var id in gaUsers)
		{
			if (id == 'u'+gUserId)
				continue;
			user = gaUsers[id];
			sEmail = user.getPrimaryEmail();
			sName = user.getFullName();
			sOptions += "<option value='"+sEmail+"'>"+sEmail+" ("+sName+")</option>\n";
		}
		if (!sOptions.length)
		{
			sOptions = "<option value=''>Enter an email address</option>\n";
			sOptions += "<option value=''>and we'll remember it for next time.</option>";
		}
	}
	else if (gOneBoxPopupMode == 'remind' || gOneBoxPopupMode == 'reminder')
	{
		options = Array('5 Mins','15 Mins','30 Mins','1 Hour','2 Hours','4 Hours','12 Hours','1 Day','2 Days','3 Days','4 Days','1 Week','2 Weeks','4 Weeks');
		for (var i=0; i<options.length; i++)
			sOptions += "<option value='in "+options[i]+"'>in "+options[i]+"</option>\n";
	}
	else // tags
	{
		bProcessingTodos = (inputId.indexOf('todoInput') >= 0);
		if (bProcessingTodos)
			for (i=0; i<gaTodoTags.length; i++)
				sOptions += "<option value='"+gaTodoTags[i]+"'>"+gaTodoTags[i]+"</option>\n";
		else
			for (var tag in gaTags)
				sOptions += "<option value='"+tag+"'>"+tag+"</option>\n";
		if (!sOptions.length)
		{
			for (var tag in gaDefaultTags)
				sOptions += "<option value='"+tag+"'>"+tag+"</option>\n";
		}
	}
	var sSelect = "<select id='oneBoxPopupSelect' size='8' width='20' onChange='oneBoxPopupDone(true, \""+inputId+"\")'>";
	sSelect += sOptions+'</select><p class="bold small" style="text-align: right; margin: 4px 0 0 4px;"><a href="javascript:oneBoxPopupDone(false, \'\')">Cancel</a>&nbsp;&nbsp;</p>';
	getEl('oneBoxPopup').innerHTML = sSelect;

	coords = getElementPos(elParent);
	coords.y += elParent.offsetHeight;
	
	elOptions = getEl('oneBoxPopup');
	setElementPos(elOptions, coords);
	toggleDisplayOn('oneBoxPopup');
}

function oneBoxPopupDone(bSave, inputId)
{
	if (bSave)
	{
		elSelect = getEl('oneBoxPopupSelect');
		if (elSelect.selectedIndex >= 0)
		{
			elInput = getEl(inputId);
			var sMatchKey = '+'; // invite
			if (gOneBoxPopupMode != 'invite')
				sMatchKey = gOneBoxPopupMode+' ';
	
			strMatch = elInput.value;
			if (elInput.value.lastIndexOf(sMatchKey) >= 0)
				strMatch = elInput.value.substring(0, elInput.value.lastIndexOf(sMatchKey)+sMatchKey.length);
			elInput.value = strMatch + elSelect.value + ' ';
			
			elInput.focus();
			elInput.value=elInput.value;
		}		
	}

	toggleDisplayOff('oneBoxPopup');
}
// end one-box one-box popup (invites, tags)
///////////
///////////

function sortByNum(a,b)
{
	return a-b;
}

