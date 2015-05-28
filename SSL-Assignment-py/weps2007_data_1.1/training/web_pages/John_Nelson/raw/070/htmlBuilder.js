// $Id: htmlBuilder.js,v 1.303 2007/02/25 17:14:32 nick Exp $

function failIfNotLoggedIn(sAction)
{
	if (!isLoggedIn())
	{
		alert("Sorry, you can't "+sAction+" unless you're logged in.");
		return true;
	}
	return false;
}

////////////////
////////////////
// start Buddy Updates stuff

function hideBuddyUpdates()
{
	showWindowShade('buddyUpdatesWindowShade','none');
	toggleDisplayOff('buddyUpdatesPopup');
	toggleVisibilityOff('tbBuText');
}

function showBuddyUpdates(iDaysAgo)
{
	getEl('buddyUpdatesNotifier').innerHTML='';
	showHideWebtopFrames('hidden');
	showWindowShade('buddyUpdatesWindowShade','block');
	displayCenteredDiv('buddyUpdatesPopup');
	updateBuddyUpdates(iDaysAgo);
}

function updateBuddyUpdates(iDaysAgo)
{
	getEl("buddyUpdatesPopup").innerHTML = '<div style="width:300px; border:1px outset #aaa; padding:5px; background-color:#fff;" class="small centerElement">Loading more data - just a sec<br /><br /><img src="'+
			gThemeUrl+'/wait.gif" valign="absmiddle"/></div>';
	var args = '';
	if (iDaysAgo)
		args = "daysAgo="+iDaysAgo;
	makeXmlHttpRequest('getBuddyUpdates', args, 'getEl("buddyUpdatesPopup").innerHTML = str; arrangeBuddyUpdates();');
}

function sortHeightDesc(a,b)
{
	h1=getEl(a).offsetHeight;
	h2=getEl(b).offsetHeight;
	return h2-h1;
}

function arrangeBuddyUpdates()
{
	var aIds=new Array();
	var i=0;
	while (el=getEl('buddyUpdate_'+i))
	{
		aIds[i]='buddyUpdate_'+i;
		i++;
	}
	if (!aIds.length)
		return;
		
	aIds.sort(sortHeightDesc);
	var h1=getEl(aIds[0]).offsetHeight; var h2=0; var h3=0;
	var c1=getEl(aIds[0]).innerHTML; var c2=''; var c3='';
	var i=1;
	while (i<aIds.length)
	{
		el=getEl(aIds[i]);
		h=el.offsetHeight;
		s=el.innerHTML;
		if (h3 < h2)
		{
			h3 += h;
			c3 += s;
		}
		else if (h2 < h1)
		{
			h2 += h;
			c2 += s;
		}
		else
		{
			h1 += h;
			c1 += s;
		}
		i++;
	}
	
//	alert(h1+' '+h2 + ' '+h3);
	var s="<table align='center'><tr><td valign='top'>"+c1+"</td>"+"<td valign='top'>"+c2+"</td>"+"<td valign='top'>"+c3+"</td></tr></table>";
	getEl("arrangedBuddyUpdates").innerHTML = s;
}

// end Buddy Updates stuff
////////////////

////////////////
////////////////
// start Webtop stuff
function loadWebtop(bFirstLoad)
{
	if ((getEl('webtop').style.display=='block')&&(bFirstLoad != 1))
		hideWebtop();
	else
	{
		toggleDisplayOn('webtop');
		sDocks = getPrefInCookie('docks','');
		if (!sDocks.length)
			sDocks = '2,3';
		aDocks = sDocks.split(',');
		for (iDockItems=0; iDockItems<aDocks.length; iDockItems++)
		{
			iDock = aDocks[iDockItems];
			if (!iDock || !iDock.length)
				continue;
			if (iDock == 2)
				showWebtopMiniFrame('webSearch',true); 
			else if (iDock == 3)
				showWebtopMiniFrame('webtopUpdates',true);
			else
			{
				el = getEl('webtopFrame_' + iDock);
				if (el && el.style.display!='block')
					eval(aDockClicks[iDock]);
			}
		}
		updateWebtopEventCount();
	}
}

function updateWebtopEventCount()
{
	var c=0;
	var d = new Date();
	aEventIds = gaEvtsByDate[timeToDbDate(d)];
	if (aEventIds)
	{
		for (var i=0; i<aEventIds.length; i++)
		{
			eventId = aEventIds[i];
			var thisEvent = gaEvts['e'+eventId];
			if (!thisEvent) // deleted
				continue;
			
			if (!thisEvent.isOwner() || thisEvent.isHoliday() || thisEvent.isWeather() || thisEvent.isFeed())
				continue;
				
			c++;
		}
	}

	var s="wide open";
	if (c > 2)
		s="busy";
	else if (c)
		s="easy";
	getEl("webtopEventCount").innerHTML="Your day looks "+s+" ("+c+")";
}

function hideWebtop()
{
	toggleDisplayOff('dock0');
	toggleDisplayOff('webtop');
	document.getElementById('input').focus();
}

function showWebtopSettings()
{
	showHideWebtopFrames('hidden');
	showWindowShade('webtopSettingsWindowShade','block');
	displayCenteredDiv('webtopSettingsPopup');
	drawWebtopSettings();
}
function hideWebtopSettings()
{
	showHideWebtopFrames('visible');
	showWindowShade('webtopSettingsWindowShade','none');
	toggleDisplayOff('webtopSettingsPopup');
}

function showWebtopMiniFrame(id, bLoadUpdates)
{
	if (bLoadUpdates && id=='webtopUpdates')
		makeXmlHttpRequest('getRecentUpdatesForWebtop', '', 'getEl("webtopEventsUpdates").innerHTML = str;');
	
	toggleWebtopMiniFrame(id, true);
}

function showHideWebtopFrames(visible)
{
	for (i=0; i<giNumDockItems; i++)
	{
		el = getEl('webtopFrame_'+i);
		if (el)
			el.style.visibility = visible;
	}
}

function expandWebtopFrame(frameNum)
{
	toggleDisplayOff('webtopUpdates');
	toggleDisplayOff('webSearch');
	for (i=0; i<giNumDockItems; i++)
	{
		el = getEl('webtopFrame_'+i);
		if (el && el.style.display=='block' && i!=frameNum)
			toggleWebtopFrame(i, '');
	}
	arrangeFrames();
}

function webtopFrameToWin(frameNum)
{
	url = getEl('webtopFrameIframe_'+frameNum).src;
	NewWindow(url,'',800,600,'','menubar,location,toolbar');
	toggleWebtopFrame(frameNum, '');
}

function toggleWebtopMiniFrame(id, bForceOn)
{
	if (bForceOn)
		toggleDisplayOn(id);
	else
		toggleDisplay(id);
	arrangeFrames();
	
	if (id='webSearch')
		document.getElementById('webSearchEntry').focus();
}

function toggleWebtopFrame(frameNum, url)
{
	el = getEl('webtopFrame_'+frameNum);
	var display='block';
	if (el.style.display=='block')
		display='none';
	el.style.display=display;
	
	arrangeFrames();

	elIframe = getEl('webtopFrameIframe_'+frameNum);
	if (display=='block' && elIframe.src.indexOf('clear.gif') >= 0)
		elIframe.src=url;
}

function arrangeFrames()
{
	bottom = getElementPos(getEl('bottomOfPage')).y;
	getEl('webtopSpacer').style.height=bottom+'px';
	// how many frames?
	iNumFrames=0;
	for (i=0; i<giNumDockItems; i++)
	{
		el = getEl('webtopFrame_'+i);
		if (el && el.style.display=='block')
			iNumFrames++;
	}
		
	buffer=15;
	var right = getWinWidth();
	elUpdates = getEl('webtopUpdates');
	if (elUpdates.style.display=='block')
		right = getElementPos(elUpdates).x;
	elSearch = getEl('webSearch');
	if (elSearch.style.display=='block')
		right = getElementPos(elSearch).x;
	elDockImg = getEl('dockImg0');
	left = getElementPos(elDockImg).x + elDockImg.offsetWidth;
	height = (getWinHeight()-((iNumFrames+1)*buffer))/iNumFrames;
	
	var iPos = 0;
	var sOpenDocks = '';
	for (i=0; i<giNumDockItems; i++)
	{
		id='webtopFrame_'+i;
		if (i==2)
			id='webSearch';
		else if (i==3)
			id='webtopUpdates';
		el = getEl(id);
		elArrow = getEl('dockArrow'+i);
		if (el && el.style.display=='block')
		{
			sOpenDocks += i+',';
			elArrow.src="/img/dockArrow.gif";
			if (id.indexOf('webtopFrame') == 0)
			{
				headerHeight = getEl('webtopFrameHeader_'+i).offsetHeight;
				width = right-left-3*buffer;
				el.style.width = width+'px';
				el.style.height = height+'px';
				setElementPos(el, {x: left+buffer, y: iPos*(height+buffer)+buffer});
				elIframe = getEl('webtopFrameIframe_'+i);
				elIframe.style.width=width+'px';
				elIframe.style.height=(height-headerHeight-1)+'px';
				iPos++;
			}
		}
		else
		{
			elArrow.src="/img/clear.gif";
		}
	}
	setPrefInCookie('docks', sOpenDocks);
}

// end Webtop stuff
////////////////



////////////////
////////////////
////////////////
////////////////
// start To Do stuff

function showTodoCount()
{
	var str = "0";
	if (gaTodos.length == 1)
		str = "1";
	else
		str = gaTodos.length;
	getEl("todoListCount").innerHTML = str;
	getEl("todoListCount2").innerHTML = '('+str+')';
}

function showTodos()
{
	showHideWebtopFrames('hidden');
	showWindowShade('todoWindowShade','block');
	displayCenteredDiv('todoPopup');
	drawTodos();
}

function checkTodoOrder(returnNewOrder)
{
	items = getEl('todoListItems').childNodes;
		
	var sOrder='';
	var bChanged=0;
	var aNewTodos = Array();
	for (i=0; i<items.length-1; i++)
	{
		if (items[i].id.substr(0,8) != 'todoEdit')
		{
		id=items[i].id.substr(5);
		for (j=0; j<gaTodos.length; j++)
		{
			if (gaTodos[j].getId() == id)
				aNewTodos.push(gaTodos[j]);
		}
		if (gaTodos[i].getId() != id)
			bChanged=true;
		sOrder += id + ",";
		}
	}
	if (bChanged)
	{
		gaTodos = aNewTodos;
		if (!returnNewOrder)
			makeXmlHttpRequest('sortTodos', 'order='+sOrder);
	}
	return sOrder;
}

function hideTodos()
{
	showWindowShade('todoWindowShade','none');
	toggleDisplayOff('todoPopup');
	showTodoCount();
	checkTodoOrder();
	
	for (i=0; i<gaTodoDragDropObjects.length; i++)
		delete(gaTodoDragDropObjects[i]);
	gaTodoDragDropObjects.length=0;
}

function toggleTodoDone(id)
{
	checkTodoOrder();
	makeXmlHttpRequest('toggleTodoDone', 'id='+id, "drawTodos();showTodoCount();");
}

function formatTodoLine(todo, sDisplay)
{
	var checked = '';
	var sClass = 'textMedium medium pointer';
	var sDeleteStyle = '';
	var editTodo = '';
	var contextTodo = '';
	var moTodo = '';
	var copy = '';
	var tagHtml = '-none-';
	if (todo.getTags().length)
		tagHtml = todo.getTags();
	if (todo.getDone())
	{
		checked = 'checked';
		sClass = 'textLightest smallest';
	}
	else
	{
		copy = " &nbsp;<a href='#' onclick='return copyTodo("+todo.getId()+")' class='smallest'>Add to My Calendar</a> ";
		var str = todo.getText();
		tags = todo.getTags();
		aTags = todo.getTags().split(' ');
		for (iTagPos=0; iTagPos<aTags.length; iTagPos++)
		{
			if (aTags[iTagPos].length)
				str += ' tag '+aTags[iTagPos];
		}
		moTodo = " onmouseover='document.getElementById(\"todoContent_"+todo.getId()+"\").style.backgroundColor=\"#eee\";'";
		moTodo += " onmouseout='document.getElementById(\"todoContent_"+todo.getId()+"\").style.backgroundColor=\"transparent\";'";
		editTodo = " ondblclick='return editTodo("+todo.getId()+", \""+str+"\")'";
		sDeleteStyle = 'style="visibility: hidden;"';
		contextTodo = 'oncontextmenu=\'createTodoContextMenu("'+todo.getId()+'","'+str.replace(/&quot;/g,'')+'","'+todo.getText().replace(/&quot;/g,'')+'"); return dm_popup(1, 1500, event);\' ';
	}
	var line = "<li "+moTodo+" style='display:"+sDisplay+"; margin-bottom:5px; margin-left:20px; margin-right: 20px; text-indent:-40px;' class='left "+sClass+"' id='todo_"+todo.getId()+"'>\
		<div id='todoContent_"+todo.getId()+"'><span "+sDeleteStyle+"><a href='#' onclick='delTodo("+todo.getId()+",1);return false;'>\
		<img src='/theme/default/buttonDelete.gif' border='0'></a>&nbsp;</span>";
	var classTodo = getBold(todo.getText());
	var todoCreateDate = timeToDateString(new Date(todo.getCreateTime()),1,3,1,0);
	line += "<input type='checkbox' "+checked+" onClick='toggleTodoDone("+todo.getId()+");' />&nbsp;" + 
		"<span title='added "+ todoCreateDate + " with tags: "+tagHtml+"' " +contextTodo+editTodo+classTodo+">"+addStar(linkUrls(todo.getText()))+"</span><span onclick=\"toggleDisplay('tdDetails"+todo.getId()+"')\"> </span>" + 
		"<div id='tdDetails"+todo.getId()+"' style='display: none; margin-left: 36px; padding: 4px; ' class='small textLightest'>" +
		"<span class='smallest'><a href='#' onclick=\"toggleDisplay('tdDetails"+todo.getId()+"'); return false;\"> Hide</a></span>&nbsp; Tags: "+ tagHtml+
		". Created: " + todoCreateDate + ". "+copy+"</div>" +
		"</div><div class='left' style='display:none;' id='todoEdit_"+todo.getId()+"'></div></li>";

	return line;
}
function getBold(s)
{
	aResults = s.match(/(\*\*)/g);
	if (aResults)
		return ' class="bold" ';
	return ''; 
	
}

function addStar(s)
{
	aResults = s.match(/(\*\*)/g);
	if (aResults)
	{
		s = s.replace(RegExp.$1, '')
		return s;
	}
		
	aResults = s.match(/(\*)/g);
	if (aResults)
	{
		s = s.replace(RegExp.$1, '');
		s = "<img src='"+gThemeUrl+"/starColor.gif' valign='absmiddle'/> " + s;
	}
	return s; 

}


var gaTodoDragDropObjects;
function createTodoDragDropObjects()
{
	gaTodoDragDropObjects = [];
	for (todoCount=0; todoCount<gaTodos.length; todoCount++)
	{
		todo = gaTodos[todoCount];
		gaTodoDragDropObjects.push(new ygDDList('todo_'+todo.getId()));
	}
	
	gaTodoDragDropObjects.push(new ygDDListBoundary("todo_hidden"));
}

function clearTodoTags()
{
	checkTodoOrder();
	getEl('tag1Select').value = '';
	getEl('tag2Select').value = '';
	setPrefInCookie('todoT1', '');
	setPrefInCookie('todoT2', '');
}

function resetTodoTags(tag,bCompleted)
{
	checkTodoOrder();
	if (!tag)
		tag = '';
	getEl('tag1Select').value = tag;
	getEl('tag2Select').value = '';
	setPrefInCookie('todoT1', tag);
	setPrefInCookie('todoT2', '');
	drawTodos(bCompleted);
}

function todoContainsTags(todo, tag)
{
	var bContained = 1;
	if (tag.length)
	{
		tags = ' ' + todo.getTags() + ' ';
		if (tags.indexOf(' '+tag+' ') < 0)
			bContained = 0;
	}
	return bContained;
}

var gbContextTags = false;
function getTagOptions(id, selectedTag, sRemoveTag)
{
	var tagOptions = "<option value=''>-select-</option>";
	for (i=0; i<gaTodoTags.length; i++)
	{
		tag = gaTodoTags[i];
		var selected='';
		if (tag == selectedTag)
			selected = 'selected';
		if (tag.indexOf(sRemoveTag) < 0)
		{
			tagOptions += "<option value='"+tag+"' "+selected+">" + tag + "</option>";
		}
		if (!gbContextTags)
			dm_ext_addItem(5,1,["+"+tag,"javascript:document.getElementById(\'tag2Select').value='"+tag+"'; setPrefInCookie(\'todoT2\',\'"+tag+"\'); checkTodoOrder(); drawTodos();","",""]);
	}
	gbContextTags = true; 
	return "<select class='textLight' id='"+id+"' onchange='setPrefInCookie(\"todoT2\", this.value);checkTodoOrder();drawTodos();'>"+tagOptions+"</select>";
}

function createTodoTagContext(sFirstTag)
{
	dm_ext_changeItemVisibility(5,1,0,0); // last integer sets visibility

	for (i=0; i<gaTodoTags.length; i++)
	{
		tag = gaTodoTags[i];
//		if (tag.indexOf(sRemoveTag) < 0)
//		{
			if (gbContextTags)
				dm_ext_changeItem(5,1,i+1,["+"+tag,"javascript:resetTodoTags(); setPrefInCookie(\'todoT1\',\'"+sFirstTag+"\'); document.getElementById(\'tag2Select\').value='"+tag+"'; setPrefInCookie(\'todoT2\',\'"+tag+"\'); checkTodoOrder(); drawTodos();","",""]);
//		}
	}
}


function getTagLinks(selectedTag)
{
	var sTagMessage = 'Show Tag:<br />';
	if (gaTodoTags.length < 1)
		sTagMessage = '<br />tag your to do items to make lists!<br />';
	var sHtml = '<div class="small left textLight" style="padding: 4px 0px 4px 8px; background: #eee; border: 1px outset #aaa; width: 120px; position: absolute; top: -2px; right: -144px; z-index: 1000;">';
	sHtml += '<a href="#" class="bold" onclick="resetTodoTags(); return false;">all items</a><br />';
	sHtml += '<a href="#" onclick="resetTodoTags(\'\',1); setPrefInCookie(\'todoT1\',\'_all_completed\'); return false;">all completed</a><br />';
	sHtml += '<div style="margin: 0px 10px 6px 0px; padding-bottom: 6px; border-bottom: 1px solid #aaa;"><a href="#" onclick="clearTodoTags(); setPrefInCookie(\'todoT1\',\'_all_untagged\'); drawTodos(); return false;">untagged items</a></div>'+sTagMessage;
	
	for (i=0; i<gaTodoTags.length; i++)
	{
		var sStyle = '';
		tag = gaTodoTags[i];
		var sContext = 'onContextMenu="createTodoTagContext(\''+tag+'\'); return dm_popup(5, 1500, event);"';
		var selected = '';
		if (tag == selectedTag)
			sStyle = 'style="background: #eee;"';
		if (tag != -1)
			sHtml += '<a '+sContext+' href="#"'+sStyle+' onclick="setPrefInCookie(\'todoT1\', \''+tag+'\');resetTodoTags(\''+tag+'\'); return false;">'+tag+'</a><br />';
	}
	
	sHtml += "<br /><span class='smallest'>and tag:</span><br />";
	return sHtml;	
}

function emailTodos(tag1, tag2)
{
	getEl('emailTodosHref').innerHTML = '<img border="0" src="/theme/default/wait.gif" alt="wait" />';
	makeXmlHttpRequest('emailTodos', 'tag1='+tag1+'&tag2='+tag2, "getEl('emailTodosHref').innerHTML='Email me this list ';");
	return false;
}

function getTodoListDescription(tag1, tag2, bCompleted, bAllUntagged)
{	
	var strStart = "<div class='left textDark bold large centerElement' style='padding: 2px; margin-top: 8px; width: 460px;'>";
	var str = '';
	if (tag1.length)
	{
		str += tag1;
		if (tag2.length)
			str += ' and '+tag2;
	}
	else if (bCompleted == 1)
		str += 'all completed items';
	else if (bAllUntagged == 1)
		str += 'all untagged items';
	else
		str += 'all items';
		
	var sLinks = '<span style="float: right;" class="smallest"><a target="_blank" href="print.php?action=todos&amp;tag1='+tag1+'&amp;tag2='+
		tag2+'">Print</a> | <a id="emailTodosHref" href="#" onclick="return emailTodos(\''+tag1+'\',\''+
		tag2+'\');">Email me this list</a>&nbsp</span> ';
	str += '</div>';
	
	return strStart+sLinks+str;
}

function drawTodos(bCompleted, highlightId)
{
	getEl("todoWaitGif").style.display="none";
	getEl("todoSubmit").style.display="inline";
	getEl('todoSample').innerHTML = 'example: prepare for meeting tag work';

	var bAllCompleted = 0;
	var tag1FilterCheck = getPrefInCookie('todoT1', '');
	if (tag1FilterCheck == '_all_completed')
	{
		bAllCompleted = 1;
		bCompleted = 1;
		setPrefInCookie('todoT1', '');
	}

	var bAllUntagged = 0;
	var tag1FilterCheck = getPrefInCookie('todoT1', '');
	if (tag1FilterCheck == '_all_untagged')
	{
		bAllUntagged = 1;
		setPrefInCookie('todoT1', '');
	}
	
	var tag1Filter = getPrefInCookie('todoT1', '');
		
	if (tag1Filter)
		getEl('todoSample').innerHTML = 'automatically adding tag ' + tag1Filter

	tag1Select = getTagOptions('tag1Select', tag1Filter);
	var quickLinksHtml = getTagLinks(tag1Filter);
	
	var tag2Filter = getPrefInCookie('todoT2', '');
	if (tag2Filter)
		getEl('todoSample').innerHTML += ' and tag ' + tag2Filter
	tag2Select = getTagOptions('tag2Select', tag2Filter, tag1Filter);
	
	html = quickLinksHtml + tag2Select+"</div><div style='display: none; margin-left: 20px; margin-top: 4px' class='left small textLight'><a href='#' class='bold' onclick='resetTodoTags(); return false;'>Show All</a> \
	&nbsp;| &nbsp;Show items tagged: &nbsp;&nbsp;"+tag1Select+" &nbsp;and &nbsp;"+tag2Select+"</div>";
	
	var sInstructions = "<div style='clear: both; margin-top: 9px; margin-bottom: 10px; ' class='smallest textLight'>Right-click for options. Double-click to edit. Drag/drop re-order. Star * Bold **</div>";
	
	var iMatches = 0;
	var items='';
	for (i=0; i<gaTodos.length; i++)
	{
		var sDisplay='none';
		if (todoContainsTags(gaTodos[i], tag1Filter) && todoContainsTags(gaTodos[i], tag2Filter))
		{
			sDisplay='block';
			iMatches++;
		}
		if (bCompleted == 1) // used for all completed filter
			sDisplay ='none';
		if ((bAllUntagged == 1)&&(gaTodos[i].getTags().length)) // have to find if it has any tags
			sDisplay='none';
		items += formatTodoLine(gaTodos[i], sDisplay);
	}
	html += getTodoListDescription(tag1Filter, tag2Filter, bCompleted, bAllUntagged);
	html += "<ul style='list-style:none; margin-bottom: 0px; margin-top: 0px;' id='todoListItems'>"+items+
		"<li id='todo_hidden' style='visibility: hidden;'>do not remove me</li></ul>";
	
	iMatches = 0;
	items = '';
	sDrawLine = 0;
	for (i=0; i<gaTodosDone.length; i++)
	{
		var sDisplay='none';
		if (todoContainsTags(gaTodosDone[i], tag1Filter) && todoContainsTags(gaTodosDone[i], tag2Filter))
		{
			if ((bAllUntagged == 1)&&(gaTodosDone[i].getTags().length)) // have to find if it has any tags
				sDisplay='none';
			else
			{
				iMatches++;
				sDisplay='block';
				sDrawLine = 1;
			}
		}
		items += formatTodoLine(gaTodosDone[i], sDisplay);
	}
	if (sDrawLine == 1)
		html += "<div class='centerElement' style='width: 460px; border-bottom: 1px solid #8d8d8d; height: 1px;'></div><ul style='list-style: none;'>"+items+"</ul>";
	
	html += sInstructions;
	getEl("todoList").innerHTML = html;
	
	setTimeout("createTodoDragDropObjects();", 100);

	elTodoHref = getEl('todoRssUrl');
	var href = elTodoHref.href;
	part1 = href.substr(0, href.indexOf('/todos/')+7);
	part2 = href.substr(href.lastIndexOf('/rss/'));
	filter = '';
	if (tag1Filter)
		filter += tag1Filter;
	if (tag2Filter)
		filter += " "+tag2Filter;
	if (!filter.length)
		filter = 'all';
	elTodoHref.href = part1+escape(filter)+part2;

	if (bAllCompleted)
		setPrefInCookie('todoT1', '_all_completed');
	if (bAllUntagged)
		setPrefInCookie('todoT1', '_all_untagged');
	if (highlightId)
		flashHighlightedDate('', 'todo_'+highlightId);
}

function delTodo(id,iForce)
{
	if (failIfNotLoggedIn('delete to dos'))
		return;
	
	checkTodoOrder();
	if (iForce == 1) // skip confirmation
	{
		makeXmlHttpRequest('delTodo', 'id='+id, "drawTodos();");
		return false;
	}
	if (getPrefInCookie('todoT1', '') == '_all_completed') // handle all completed
	{
		makeXmlHttpRequest('delTodo', 'id='+id, "resetTodoTags('',1); setPrefInCookie('todoT1','_all_completed');");
		return false;
	}

	if (!confirm('Delete To Do Item?'))
		return;
	makeXmlHttpRequest('delTodo', 'id='+id, "drawTodos();");
	return false;
}

function editTodoDone(todoId)
{
	var input = getEl('editTodoInput_'+todoId).value;
	makeXmlHttpRequest('editTodo', 'id='+todoId+'&input='+encodeURIComponent(input), "drawTodos();");
	getEl('todo_'+todoId).innerHTML = '<img src="/theme/default/wait.gif" />';
}

function copyTodo(todoId)
{
	var todo=null;
	for(i=0; i<gaTodos.length;i++)
		if (gaTodos[i].getId() == todoId)
			todo = gaTodos[i];

	if (!todo)
		return;		
	showEditEvent(0);
	getEl('eventEditSummary').value = fixStrippedHtml(todo.getText(),true);
	getEl('eventEditTags').value = fixStrippedHtml(todo.getTags(),true);
}

function editTodo(todoId, str)
{
	for (var i=0; i<gaTodoDragDropObjects.length-1; i++)
		gaTodoDragDropObjects[i].disable();
		
	checkTodoOrder();
	html = "<textarea class='textMedium' rows='2' cols='35' style='margin-left: 20px; margin-bottom: 4px; border: 2px solid #aaa; width: 320px; height: 40px; padding: 4px' type='text' id='editTodoInput_"+todoId+"'>"+str+"</textarea>\
		<div style='margin-left: 20px;'><input type='submit' value='Save' onclick='editTodoDone("+todoId+"); return false;' /><span class='textLight smallest'> or </span>\
		<a class='smallest' href='#' onclick='drawTodos(); return false;'>Cancel</a></div>";
	getEl('todoEdit_'+todoId).innerHTML = html;
	toggleDisplayOn('todoEdit_'+todoId);
	toggleDisplayOff('todoContent_'+todoId);
	getEl('editTodoInput_'+todoId).focus();
	return false;
}

function createTodo(form)
{
	if (failIfNotLoggedIn('create to dos'))
		return;
	
	var input = form.input.value;
	if (!input)
	{
		alert("Please enter your To Do item.");
		return false;
	}
	
	// auto-tag if possible
	// check for clear tags
	if (input.indexOf('cleartags') < 0)
	{
		tag1Filter = getEl('tag1Select').value;
		if (tag1Filter)
			input += " tag "+tag1Filter;
		
		tag2Filter = getEl('tag2Select').value;
		if (tag2Filter)
			input += " tag "+tag2Filter;
	}
	else
		input = input.replace('cleartags','');

	
	getEl("todoWaitGif").style.display="inline";
	getEl("todoSubmit").style.display="none";
	newOrder = checkTodoOrder(1);
	if (newOrder.length)
		newOrder = "&order="+newOrder;
	makeXmlHttpRequest('createTodo', 'input='+encodeURIComponent(input)+newOrder, '');
	form.input.value = '';
	return false;
}

////////////////
////////////////
////////////////
// end To Do stuff


////////////////
////////////////
////////////////
// start mouse over code
function hideMouseOverDay()
{
	el = getEl('mouseOverDiv');
	if (el)
		el.style.visibility='hidden';
}

////////////////

function showMouseOverDay(date, dayBoxId)
{
	hideMouseOverDay();
	aEventIds = gaEvtsByDate[date];
	if (!aEventIds)
		return;
	var html = '';
	var additionalBuddyUpdates = '';
	var iAdditionalUpdatesCount = 0;
	for (var i=0; i<aEventIds.length; i++)
	{
		eventId = aEventIds[i];
		var thisEvent = gaEvts['e'+eventId];
		if (!thisEvent) // deleted
			continue;
		
		// skip hidden buddies
		if (!shouldShowUserCalendar(thisEvent))
			continue;
		
		// skip status updates	
		if (thisEvent.isFeed() && thisEvent.isStatus())
			continue;

		
		if (thisEvent.isWeather())
			continue;
		
		eventTime = 'all day &raquo; ';
		if (!thisEvent.isAllDay())
			eventTime = timeToTimeString(thisEvent.getStart())+' ';

		var extraSymbols = '';
		if (thisEvent.isFeed())
			extraSymbols += "<img src='"+gThemeUrl+"/updates.gif' /> ";
		else if (thisEvent.isICalSub())
			extraSymbols += "<img src='/img/subscribe.gif' /> ";

//		if (thisEvent.getImgUrl().length)
//			extraSymbols += "<img src='"+gThemeUrl+"/imageUpdates.gif' /> ";
			
		if (thisEvent.isTaggedImportant() && thisEvent.isOwner())
			extraSymbols += "<img src='"+gThemeUrl+"/starColor.gif' valign='absmiddle'/> ";

		if (thisEvent.getAttachmentHtml().length)
			extraSymbols += "<img src='/img/attach.gif' valign='absmiddle'/> ";

		if (thisEvent.getPrivacy() == 'private')
			extraSymbols += "<img src='"+gThemeUrl+"/lock.gif' valign='absmiddle'/> ";
			
		if (thisEvent.isInvite())
			extraSymbols += "<img src='"+gThemeUrl+"/envelope.gif' valign='absmiddle'/> ";
			
		if ((thisEvent.getRepeat() != 'no')&&(thisEvent.isOwner()))
			extraSymbols += "<img src='"+gThemeUrl+"/repeat.gif' valign='absmiddle'/> ";
		
		// alarms - don't show to buddies		
		if ((thisEvent.getReminder() != -1)&&(!thisEvent.isFeed())&&(thisEvent.isOwner()))
			extraSymbols += "<img src='"+gThemeUrl+"/reminder.gif' valign='absmiddle'/> ";

		var name = '';
		if (!thisEvent.isHoliday())
		{
			if (thisEvent.isInvite())
				name = 'from '+gaUsers['u'+thisEvent.getUserId()].getFirstName()+': ';
			else if (!thisEvent.isOwner())
				name = gaUsers['u'+thisEvent.getUserId()].getFirstName()+': ';
		}
		
		var sClass = 'mouseOverText';
		if (!thisEvent.isOwner() && !thisEvent.isInvite())
			sClass = 'mouseOverTextBuddy';

		if (shouldShowTagHighlight(thisEvent))
			sClass += ' tagHighlightMouseOver';
			
		sBirthdayAge = getBirthdayString(thisEvent, dbDateToJsDate(date));
		sAnniversaryAge = getAnniversaryString(thisEvent, dbDateToJsDate(date));
		
		if((thisEvent.isFeed())&&(!thisEvent.isOwner()))
		{
			if (i >5)
			{
				iAdditionalUpdatesCount++;
				additionalBuddyUpdates = "<div class='smallest textLight' style='text-align: right;'> additional buddy updates: "+ iAdditionalUpdatesCount +"</div>"
				continue;
			}
		}
		var sStyle = '';
		if (thisEvent.isTaggedStrike())
			sStyle += 'style="text-decoration: line-through;" ';
	
		html += "<div "+sStyle+"class='"+sClass+" smallest'>"+eventTime + 
			"<span class='bold small'>" +
			extraSymbols + name + thisEvent.getSummary() + sBirthdayAge + sAnniversaryAge + "</span></div>\n";
	}
	html += additionalBuddyUpdates;
	
	if (html.length)
	{
		el = getEl('mouseOverDiv');
		if (!el)
			return;
		el.innerHTML = html;
		
		elDayBox = getEl(dayBoxId);
		coords = getElementPos(elDayBox);
		coords.x += elDayBox.offsetWidth-75;
		coords.y += elDayBox.offsetHeight-20;
		
		coords = keepHoverOnPage(coords, el);
		setElementPos(el, coords);
		el.style.visibility='visible';
	}
}

// end mouse over code
////////////////
////////////////
////////////////

////////////////
////////////////
////////////////
// start calendar view code
function requestMoreData(iTime, reaction)
{
	iOldStart = gDataStart;
	iOldEnd = gDataEnd;
	
	var iStart = iTime - 60*60*24*7*6*1000;
	if (iStart > iOldStart)
		iStart = iOldEnd;
	else
		gDataStart = iStart;
		
	var iEnd = iTime + 60*60*24*7*12*1000;
	if (iEnd < iOldEnd)
		iEnd = iOldStart;
	else
		gDataEnd = iEnd;
		
//	alert(' old:'+iOldStart+' new:'+iStart+' center:'+iTime+' old:'+iOldEnd+' old:'+iEnd);
		
	var args = 'start='+iStart/1000+'&end='+iEnd/1000;
	makeXmlHttpRequest('moreData', args, reaction);
}

function getCalBoxHeight()
{
	return 40 + giMaxEvtsPerDay*20;
}

var gCenteredTime = 0;
var gStartTime = 0;
var gEndTime = 0;

function toggleWeekViewLink(iWeekNum)
{
	for (i=0; i<gNumWeeksToShow; i++)
	{
		if (getEl('week'+i))
			toggleVisibilityOff('week'+i);
	}
	if (iWeekNum != -1 && !gOnLiveServer)
		toggleVisibilityOn('week'+iWeekNum);	
}

function drawMainCalendar(iCenteredTimeToShow)
{
	gCenteredTime = iCenteredTimeToShow;
	gStartTime = calculateStartTime(gCenteredTime);
	
	var dateObj = new Date(gStartTime);
	clearYgCalDateDragDrops(ygCalDateDrags,ygCalDateDrops);
	
	var html="";
	iCalBoxHeight = getCalBoxHeight();
	for (i=0; i<gNumWeeksToShow; i++)
	{
		iTime=dateObj.valueOf()+i*60*60*24*7*1000;
		html += "<div style='position:relative' \
			onmouseover='toggleVisibilityOn(\"weekImg"+i+"\");toggleWeekViewLink("+i+");' \
			onmouseout='toggleVisibilityOff(\"weekImg"+i+"\")'><div id='week"+i+"' \
			style='position:absolute; font-size:18pt; \
			top:"+(iCalBoxHeight*i+10)+"px; height:"+(iCalBoxHeight-20)+"px; \
			left:1px; visibility: hidden;'><a href='javascript:showWeekView("+iTime+")' \
			title='Show Week View' class='hoverLink'>&#149;<br /><img src='/img/showWeek.gif' \
			style='visibility:hidden;' id='weekImg"+i+"' border=0 /></a></div></div>";
	}
	getEl('weekViewArrows').innerHTML=html;
	
	html = "<table id='mainCalendar' cellspacing='0' cellpadding='0'>";
	var dateToday = new Date();
	var iWeekNumber = 0;
	for (var iDayNum=0; iDayNum<7*gNumWeeksToShow; iDayNum++)
	{
		if (iDayNum % 7 == 0)
		{
			html += "<tr onmouseover='toggleWeekViewLink("+iWeekNumber+");' >";
			iWeekNumber++;
		}

		html +=htmlForOneDay(dateObj, iDayNum);

		if (iDayNum % 7 == 6)
			html += "</tr>";
		gEndTime = dateObj.valueOf(); // do this before incrementing
		dateObj.setDate(dateObj.getDate()+1);
	}
	html += "</table>";
	getEl('mainCalendarContainer').innerHTML = html;

	dStart = new Date(gStartTime);
	year = dStart.getFullYear();
	dEnd = new Date(gEndTime);
	if (dEnd.getFullYear() != year)
		year += '-'+dEnd.getFullYear();
	getEl('calendarYearDisplay').innerHTML = year;

	setTimeout("buildYgCalDateDragDrops(ygCalDateDrags,ygCalDateDrops,'mainCal');",200);
	
	// get more data if we need it
	if (gStartTime < gDataStart || gEndTime > gDataEnd)
		requestMoreData(gCenteredTime, 'drawMainCalendar(gCenteredTime);');
}

////////////////

function formatEventLine(thisEvent, sTextColorClass, sDate, sEventClass)
{
	var sClass = sEventClass;
	var sStyle = '';
	var sStyleFontColor = '';
	var sPrefix = '';
	var sContextMenu = '';
	if (thisEvent.isOwner() || thisEvent.isInvite())
		sClass += ' small textMyEvent '+ sTextColorClass;
	else
		sClass += ' smallest textLight textBuddyEvent';
		
		
	if (shouldShowTagHighlight(thisEvent))
		sClass += ' tagHighlightCalendarView';
// THESE 2 NEED TO WORK TOGETHER
	if (hasColoredBgTag(thisEvent))
	{
		tagBgColor = thisEvent.getTagBgColor();
		if (tagBgColor.length)
		{
			if (tagBgColor.indexOf('transparent') < 0)
			{
				tagBgColor = '#'+tagBgColor;
				sStyleFontColor = getContrastColor(tagBgColor);
			}
			sStyle += 'background: '+tagBgColor+' !important; margin:1px !important; ';
		}
	}
	else if (!thisEvent.isOwner())
	{
		var color = gaBuddyColors['u'+thisEvent.getUserId()];
		if (color && color.indexOf('transparent') < 0)
		{
			color = '#'+color;
			sStyleFontColor = getContrastColor(color);			
		}
		if (color)
			sStyle += 'background: '+color+' !important; margin:1px !important; ';
	}
	else if (thisEvent.isOwner() && thisEvent.isICalSub())
	{
		var color = gaWebcalColors['u'+thisEvent.getFeedId()];
		if (color && color.indexOf('transparent') < 0)
		{
			color = '#'+color;
			sStyleFontColor = getContrastColor(color);
		}
		if (color)
			sStyle += 'background: '+color+' !important; margin:1px !important; ';
	}
	
	tagColor = thisEvent.getTagColor();
	if (tagColor.length && thisEvent.isOwner())
		sStyleFontColor = 'color: '+tagColor+' !important; ';

	if (thisEvent.isTaggedStrike())
		sStyle += 'text-decoration: line-through; ';
		
	if (thisEvent.isTaggedImportant() && thisEvent.isOwner())
		sPrefix += "<img src='"+gThemeUrl+"/starColor.gif' valign='absmiddle'/> ";
	if (thisEvent.getPrivacy() == 'private')
		sPrefix += "<img src='"+gThemeUrl+"/lock.gif' valign='absmiddle'/> ";
//	if (thisEvent.isICalSub())
//		sPrefix += "<img src='/img/subscribe.gif' /> ";
	if (thisEvent.isInvite())
	{
//		sCount = countComments(thisEvent.getNotes());
		sPrefix += "<img src='"+gThemeUrl+"/envelope.gif' valign='absmiddle'/> ";
//		if (sCount > 0)
//			sPrefix += "<span class='indicator'>"+sCount+" </span>";
	}
		
	if (!thisEvent.isHoliday())
	{
		if (thisEvent.isInvite())
			sPrefix += ''+gaUsers['u'+thisEvent.getUserId()].getFirstName()+': ';
		else if (!thisEvent.isOwner())
			sPrefix += gaUsers['u'+thisEvent.getUserId()].getFirstName()+': ';
	}

	var oneEventDivId="";
	if (thisEvent.isEditable())
	{
		sContextMenu = 'onContextMenu="createContextMenu(\''+thisEvent.getId()+'\'); return dm_popup(0, 1500, event);"';
		oneEventDivId = 'oneEvent_'+sDate+'_'+sEventClass+'_'+thisEvent.getId();
		if (sEventClass == 'eventEntry')
		{
			ygCalDateDrags.push(oneEventDivId);
			sStyle += "cursor:move;";
		}
		else if (sEventClass == 'eventEntryWeekView')
		{
			ygWeekViewDrags.push(oneEventDivId);
			sStyle += "cursor:move;";
		}
	}
	else if (!thisEvent.isInvite() && !thisEvent.isOwner() && !thisEvent.isHoliday())
	{
		sFirstName = gaUsers['u'+thisEvent.getUserId()].getFirstName();
		sContextMenu = 'onContextMenu="createBuddyContextMenu(\''+thisEvent.getUserId()+'\',\''+sFirstName+'\'); return dm_popup(0, 1500, event);"';
	}
	
	var sTime = '';
	if (gShowTimeOnCal || sEventClass == 'eventEntryWeekView')
		sTime = thisEvent.isAllDay() ? '' : '<span style="'+sStyleFontColor+'" class="timeOnCal textLightest smallest">'+timeToTimeString(thisEvent.getStart(), 'tiny')+'</span> ';

	if ((sStyle.length)||(sStyleFontColor.length))
		sStyle = 'style="'+sStyle+sStyleFontColor+'"';		

	return '<div id="'+oneEventDivId+'" '+sContextMenu+' class="'+sClass+'" '+sStyle+' >&nbsp;' +
		sTime + sPrefix + thisEvent.getSummary() + 
		"</div>";
}

////////////////


function createContextMenu(eventId)
{
	var thisEvent = gaEvts['e'+eventId];
	var eventSummary = thisEvent.getSummary();
	if (dm_ext_getItemParams(0,1,1)[11] == 0) // make sure we have 2 menu items
		dm_ext_changeItemVisibility(0,1,1,1); // last integer sets visibility

	dm_ext_changeItem(0,1,0,["Edit Event","javascript:showEditEvent("+eventId+")","",""]);
	dm_ext_changeItem(0,1,1,["Delete","javascript:delEvent("+eventId+",'')","",""]);
}

function createTodoContextMenu(iTodoId,sTodoEditStr,sTodoTextStr)
{
	var time = timeToStringDate(new Date());
	
	dm_ext_changeItem(1,1,0,["Edit","javascript:editTodo(\'"+iTodoId+"\', \'"+sTodoEditStr+"\')","",""]);
	dm_ext_changeItem(1,1,1,["Get Info","javascript:toggleDisplay('tdDetails"+iTodoId+"')","",""]);
	dm_ext_changeItem(1,1,2,["Delete","javascript:delTodo(\'"+iTodoId+"\')",""]);
	dm_ext_changeItem(1,1,3,["Add to My Calendar","javascript:copyTodo(\'"+iTodoId+"\')","",""]);
	dm_ext_changeItem(1,1,4,["Add to gCal","http://www.google.com/calendar/event?action=TEMPLATE&text="+encodeURI(sTodoTextStr),"","","","_blank"]);
	dm_ext_changeItem(1,1,5,["Add to Y!Cal","http://calendar.yahoo.com/?v=60&VIEW=d&ST="+time+"&TITLE="+encodeURI(sTodoTextStr),"","","","_blank"]);
//	dm_ext_changeItem(0,1,1,["","","","","","_"]); // grays out the delete
//	dm_ext_changeItemVisibility(0,1,1,0); // last integer sets visibility
//	alert(dm_ext_getItemParams(0,1,0));
}


////////////////

function createBuddyContextMenu(userId,firstName)
{
	dm_ext_changeItem(0,1,0,["Hide Buddy","javascript:toggleUserCalendar(\'"+userId+"\','false')","",""]);
	dm_ext_changeItem(0,1,1,["Buddy Page","/user/"+userId,"",""]);
//	dm_ext_changeItem(0,1,1,["","","","","","_"]); // grays out the delete
//	dm_ext_changeItemVisibility(0,1,1,0); // last integer sets visibility
//	alert(dm_ext_getItemParams(0,1,0));
}


////////////////

function htmlForOneDay(dateObj, iDayNum)
{
	var sDate = timeToDbDate(dateObj);

	var dateToday = new Date();
	var sTextColorClass = 'textMedium';
	if (dateObj.getTime() < dateToday.getTime())
		sTextColorClass = 'textLight';
	if (dateObj.toDateString() == dateToday.toDateString())
		sTextColorClass = 'textBlack';
		
	
	var weatherHtml = '';
	var eventHtml = '';
	var iEventsShown = 0;
	var iEventsHidden = 0;
	var bHasFeed = false;
	if (dateObj.valueOf() < gDataStart)
		eventHtml = '<div class="smallest center">Gazing into your past<br /><br /><img src="'+
			gThemeUrl+'/wait.gif"  valign="absmiddle"/></div>';
	else if (dateObj.valueOf() > gDataEnd)
		eventHtml = '<div class="smallest center">Peering into your future<br /><br /><img src="'+
			gThemeUrl+'/wait.gif" valign="absmiddle"/></div>';
	else if (!gaEvtsByDate[sDate]) // we could be waiting for a previous load to complete
		eventHtml = '<div class="smallest center">Waiting for more data<br /><br /><img src="'+
			gThemeUrl+'/wait.gif" valign="absmiddle"/></div>';
	else 
	{
		aEventIds = gaEvtsByDate[sDate];
		for (var i=0; i<aEventIds.length; i++)
		{
			eventId = aEventIds[i];
			var thisEvent = gaEvts['e'+eventId];
			if (!thisEvent) // deleted
				continue;
			
			if (thisEvent.isFeed() && thisEvent.isStatus())
				continue;
//				document.getElementById('statusString').innerHTML = thisEvent.getSummary();
					
			if (!shouldShowUserCalendar(thisEvent))
				continue;
			if (thisEvent.isWeather() && !thisEvent.isOwner()) // hide buddy's weather
				continue;
						
			if (thisEvent.isWeather())
			{
				if (iDayNum==0 || dateObj.getDate() == 1)
					weatherHtml += '<span class="weatherInfo textMedium" style="padding-left: 16px;">' + thisEvent.getSummary() + '</span>';
				else	
					weatherHtml += '<span class="weatherInfo textMedium">' + thisEvent.getSummary() + '</span>';
			}
			else if (thisEvent.isFeed() && !thisEvent.isOutsideCalendarFeed())
			{
				bHasFeed = true;
				iEventsHidden++;
			}
			else if (iEventsShown < giMaxEvtsPerDay)
			{
				eventHtml += formatEventLine(thisEvent, sTextColorClass, sDate, 'eventEntry');
				iEventsShown++;
			}
			else
				iEventsHidden++;
		}
	}
	
	var bottomHtml = '';
	if (iEventsHidden)
		bottomHtml = "<div class='moreEventsArrow'><img alt='...' src='"+
			gThemeUrl+"/downOffCcc.gif' /></div>";
	
	var sTdClass = (dateObj.getMonth() % 2 == 0) ? 'calBox' : 'calBoxAltColor';
	var sTextColorClass = 'textLight';
	if (dateObj.toDateString() == dateToday.toDateString())
	{
		sTdClass = 'calBoxToday';
		sTextColorClass = 'textBlack';
	}
	
	var dateHtml = "<div class='calBoxDayLabel "+sTextColorClass+" large'>";
	if (iDayNum==0 || dateObj.getDate() == 1)
	{
		src = gThemeUrl+'/month'+dateObj.getMonth()+'.gif';
		dateHtml += '<img align="left" style="display:inline;" src="' + src + '" />';
	}
	if (bHasFeed)
		dateHtml += "<img style='padding-left:2px; float:left' src='"+gThemeUrl+"/updates.gif' alt='' />";
	if (iDayNum < 7)
		dateHtml += timeToDayOfWeekString(dateObj, 3)+' ';
	dateHtml += dateObj.getDate() + '</div>';
	// now we've got the parts, build the html
	iCalBoxHeight = getCalBoxHeight();
	var html = "<td nowrap valign='top' class='"+sTdClass+"' style='height:"+iCalBoxHeight+"px !important'> \
		<div class='calBoxOutline "+sTdClass+"' id='calBox"+sDate+"'\
		onmouseover=delayCode('showMouseOverDay(\""+sDate+"\",\"calBox"+sDate+"\")',50) \
		onmouseout=delayCode('hideMouseOverDay()',50) \
		onclick=showDayView("+dateObj.valueOf()+"); \
		style='height:"+iCalBoxHeight+"px !important' \
		>";
	html += dateHtml + eventHtml + weatherHtml + bottomHtml;
	
	html += "</div></td>";	

	ygCalDateDrops.push('calBox'+sDate);

	return html;
}

////////////////
////////////////

function shouldShowUserCalendar(thisEvent)
{
	// invites (owned by others) - show only if you're looking at your calendar
	if (thisEvent.isInvite())
	{
		value = getPrefInCookie("hide-"+gUserId+"-", '');
		return (value == '')
	}
	else
	{	
		// normal event, just check the user ID
		userId = thisEvent.getUserId();
		value = getPrefInCookie("hide-"+userId+"-", '');
		return (value == '');
	}
}

function shouldShowTagHighlight(thisEvent)
{
	if (thisEvent.isOwner())
	{
		sEventTags = thisEvent.getTags().toLowerCase();
		for (var sTag in gaTags)
		{
			if (gaTags[sTag])
			{
				if (sEventTags.indexOf(' '+sTag+' ') >= 0)
					return true;
			}
		}
	}
	return false;
}

function hasColoredBgTag(thisEvent)
{
	if (thisEvent.isOwner())
	{
		sEventTags = thisEvent.getTags().toLowerCase();
		for (var sTag in gaTagColors)
		{
			if (gaTagColors[sTag])
			{
				if (sEventTags.indexOf(' '+sTag+' ') >= 0)
					return true;
			}
		}
	}
	return false;
}
////////////////
////////////////

function showJustMyCalendar(userId,aBuddyIds)
{
	for (var iId in aBuddyIds)
	{
		buddyUserId = aBuddyIds[iId];
		hideUserCalendar(buddyUserId,true);	
	}
	drawMainCalendar(gCenteredTime);
	showUserCalendar(userId);	
}

function showAllCalendars(aBuddyIds)
{
	for (var iId in aBuddyIds)
	{
		userId = aBuddyIds[iId];
		showUserCalendar(userId,true);
	}
	drawMainCalendar(gCenteredTime);
}

function hideUserCalendar(userId, bDontDrawCalendar) 
{
	if (getEl('buddyCheck'+userId)) // sanity check
	{
		if (getEl('buddyCheck'+userId).checked)
			if (bDontDrawCalendar)
				toggleUserCalendar(userId, true, true);
			else
				toggleUserCalendar(userId, true);
	}
}

function showUserCalendar(userId, bDontDrawCalendar, reaction) // use this to force a user's calendar to be shown
{
	if (!reaction)
		reaction = '';
	if (getEl('buddyCheck'+userId)) // sanity check
	{
		if (!getEl('buddyCheck'+userId).checked)
		{
			toggleUserCalendar(userId, true, bDontDrawCalendar, reaction);
		}
		else
			eval(reaction);
	}			
}

function toggleUserCalendar(userId, bManualFlip, bDontDrawCalendar, reaction)
{
	if (!reaction)
		reaction = '';
	elCheckbox = getEl('buddyCheck'+userId);
	if (bManualFlip)
		elCheckbox.checked = !elCheckbox.checked;
	bShow = elCheckbox.checked;
	setPrefInCookie("hide-"+userId+"-", bShow ? '':'hide');
	// if we're showing it, load data
	if(bShow)
	{
		reaction += bDontDrawCalendar ? '' : 'drawMainCalendar(gCenteredTime);';
		gDataEnd=gCenteredTime;
		gDataStart=gCenteredTime;
		requestMoreData(gCenteredTime, reaction);
	}
	else
	{
		if (!bDontDrawCalendar) // not showing it, draw if necessary
			drawMainCalendar(gCenteredTime);
		eval(reaction);
	}
}

// end calendar view code
////////////////
////////////////
////////////////

////////////////
////////////////
////////////////
// start edit event code
function hideEditEvent()
{
	// these two are for a layer bug in IE
//	getEl("repeatSelect").style.visibility = 'hidden';
	getEl("eventEditReminder").style.visibility = 'hidden';

	showWindowShade('editEventWindowShade','none');
	el = getEl('eventEditPopup');
	el.style.visibility = 'hidden';
	hideFocus();
}

function showEditEvent(id)
{
	elForm = getEl("eventEditForm");
	reminderEl = getEl("eventEditReminder");
	var reminderSelection = 0;
	var repeatType = 'no';
	var repeatInterval=1;
	var repeatDays = new Array();
	var repeatWeekInMonth=0;
	var repeatEnd = '';
	var heading = 'Add a new event!';
	var summary = '';
	var submit = gThemeUrl + '/buttonAddEvent.gif';
	var submitValue = 'Add Event';
	var notes = '';
	var privacy = false;
	var tags = '';
	var startDate = timeToJsCalendarDate(new Date(), true,3,true,true);
	var startTime = '';
	var endDate = '';
	var endTime = '';
	var skipDates = '';
	var upcomingDates = '';
	var invites = 'No one has been invited<br />';
	var tagSuggestions = '';
	for (var tag in gaTags)
	{
		tagSuggestions += "<span class='pointer' onclick='javascript:getEl(\"eventEditTags\").value += \"" +tag+" \"'>"+
			tag+"</span> ";
	}
	if (!tagSuggestions.length)
	{
		for (var tag in gaDefaultTags)
			tagSuggestions += "<span class='pointer' onclick='javascript:getEl(\"eventEditTags\").value += \"" +tag+" \"'>"+
				tag+"</span> ";
	}
	
	if (id > 0 || (id.indexOf && id.indexOf('demo') >= 0))
	{
		var thisEvent = gaEvts['e'+id];
		heading = '<span class="textEmphasis">Editing "'+thisEvent.getSummary()+'"</span>';
		summary = fixStrippedHtml(thisEvent.getSummary(),true);
		submit = gThemeUrl + '/buttonUpdateEvent.gif';
		submitValue = 'Update Event';
		notes = fixStrippedHtml(thisEvent.getNotes(),true);
		privacy = thisEvent.getPrivacy() == 'private' ? true : false;
		tags = thisEvent.getTags();
		dStart = new Date(thisEvent.getStart())
		startDate = timeToJsCalendarDate(dStart, true,3,true,true);
		if (!thisEvent.isAllDay())
			startTime = timeToTimeString(dStart);
		if (thisEvent.getStart() != thisEvent.getEnd())
		{
			dEnd = new Date(thisEvent.getEnd());
			endDate = timeToJsCalendarDate(dEnd, true,3,true,true);
			if (!thisEvent.isAllDay())
				endTime = timeToTimeString(dEnd);
		}
		aInvites = thisEvent.getInvites();
		if (aInvites)
		{
			invites = '';
			for (var key in aInvites)
			{
				thisInvite = aInvites[key];
				user = gaUsers['u'+thisInvite.getUserId()];
				invites += user.getFirstName()+' &lt;'+user.getPrimaryEmail()+'&gt;<br />';
			}
		}
		for (i=0; i<reminderEl.options.length; i++)
		{
			if (reminderEl.options[i].value == thisEvent.getReminder())
				reminderSelection = i;
		}
		repeatType = thisEvent.getRepeat();
		repeatInterval = thisEvent.getRepeatInterval();
		if (thisEvent.getRepeatEnd().length && repeatType != 'no')
			repeatEnd = timeToJsCalendarDate(dbDateToJsDate(thisEvent.getRepeatEnd()));
		repeatWeekInMonth=thisEvent.getRepeatWeekInMonth();
		skipDates = thisEvent.getRepeatSkipDates();
		if (repeatType != 'no')
		{
			upcomingDates = showUpcomingSkipDates(id);
			for (i=0;i<7;i++)
			{
				if (thisEvent.getRepeatDays().indexOf(i)>=0)
					repeatDays['d'+i]=1;
			}
		}
	}
	
	showRepeatOption(repeatType);
	reminderEl.selectedIndex = reminderSelection;
	getEl('skipDateUpcoming').innerHTML = upcomingDates;
	getEl('eventEditId').value = id;
	getEl('eventEditHeading').innerHTML = heading;
	getEl('eventEditSummary').value = summary;
	getEl('eventEditSubmit').src = submit;
	getEl('eventEditSubmitButton').value = submitValue;
	getEl('eventEditNotes').value = notes;
	getEl('eventEditPrivacy').checked = privacy;
	getEl('eventEditTags').value = tags;
	getEl('eventEditDateStart').value = startDate;
	getEl('eventEditTimeStart').value = startTime;
	getEl('eventEditDateEnd').value = endDate;
	getEl('eventEditTimeEnd').value = endTime;
	getEl('eventEditInvites').innerHTML = invites;
	getEl('editEventInvites').value = '';
	getEl('repeatMonthlyInterval').value = repeatInterval;
	getEl('repeatWeeklyInterval').value = repeatInterval;
	getEl('repeatDailyInterval').value = repeatInterval;
	getEl('eventEditRepeatEnd').value = repeatEnd;
	getEl('editEventTagSuggestions').innerHTML = tagSuggestions;
	getEl('skipDateDates').value = skipDates;
	getEl('repeatMonthTypeDate').checked=(repeatWeekInMonth == 0);
	getEl('repeatMonthTypeDayOfWeek').checked=(repeatWeekInMonth != 0);
	getEl('repeatMonthWeekNum').selectedIndex=Math.max(repeatWeekInMonth-1, 0);
	
	for (i=0;i<7;i++)
		getEl('repeatDay'+i).checked = (repeatDays['d'+i] == 1);
	reminderEl.style.visibility = 'visible';
	displayCenteredDiv('eventEditPopup');
	getEl('eventEditSummary').focus();
	toggleDisplayOff('repeatOptions');
	showWindowShade('editEventWindowShade','block');
}

function addSkipDateToForm(dbDate)
{
	str = getEl('skipDateDates').value;
	if (str.indexOf(dbDate) < 0)
		getEl('skipDateDates').value += ' ' + dbDate;
}

function showUpcomingSkipDates(eventId)
{
	var upcomingDates = '';
	thisEvent = gaEvts['e'+eventId];

	d = new Date();
	var iCount=0;
	while (d.valueOf() < gDataEnd && iCount < 12)
	{
		dbDate = timeToDbDate(d);
		d.setDate(d.getDate()+1);
		events = gaEvtsByDate[dbDate];
		if (!events)
			continue;
		for (var i=0; i<events.length; i++)
		{
			if (events[i] == eventId)
			{
				upcomingDates += "<a href='#' onclick=\"addSkipDateToForm('"+dbDate+"'); return false;\">"+dbDate+"</a>" + '&nbsp;&nbsp; ';
				iCount++;
			}
		}
	}
	if (upcomingDates.length)
		upcomingDates = '<span class="smallest textLightest">Upcoming dates for this event:<br />' + upcomingDates + '<br />Click date to add it to the skip list</span>';

	return upcomingDates;
}

var gCalRepeatStartDate = Date();
function drawCalendarRepeatDates(t)
{
	gCalRepeatStartDate = t;
	dToday = new Date();
	dStart = new Date(gCalRepeatStartDate);
	dLast = new Date(dStart.valueOf());
	dLast.setMonth(dLast.getMonth()-1);
	dNext = new Date(dStart.valueOf());
	dNext.setMonth(dNext.getMonth()+1);
	var navOptions = '<a href="javascript:drawCalendarRepeatDates('+dLast.valueOf()+')"><img border="0" src="'+gThemeUrl+'/calUp.gif"/></a>'+
		'<a href="javascript:drawCalendarRepeatDates('+dToday.valueOf()+')"><img border="0" src="'+gThemeUrl+'/calToday.gif"/></a>'+
		'<a href="javascript:drawCalendarRepeatDates('+dNext.valueOf()+')"><img border="0" src="'+gThemeUrl+'/calDown.gif"/></a><br />';
	
	var html = navOptions+'<table cellpadding=0 cellspacing=0 align="center" class="smallest"><tr>';

	for (var i=0; i<7; i++)
	{
		iPos = (i+gStartDay) % 7;
		s = gDaysOfWeek[iPos].substring(0,1);
		html += '<td>&nbsp;<a href="javascript:repeatWeekClicked('+iPos+');">'+s+'</a>&nbsp;&nbsp;</td>';
	}
	html += '</tr></table>';
		
	dStart.setDate(1);
	for (var month=0; month<4; month++)
	{
		html += drawCalendarRepeatDatesMonth(dStart);
		dStart.setMonth(dStart.getMonth()+1)
	}
	
	getEl('pickDatesCalendar').innerHTML = html + navOptions;
	
	elPickedDates = getEl('pickedDates');
	aList = elPickedDates.value.split(';');
	for(i=0; i<aList.length; i++)
	{
		d=new Date(aList[i]);
		aList[i]=d.valueOf();
	}
	aList.sort(sortByNum);

	var html = '';
	for(i=0; i<aList.length; i++)
	{
		if (aList[i] > 0)
		{
			d = new Date(aList[i]);
			sDate = timeToDateString(d, true, 3, true, true);
			html += sDate+"<br />";
		}
	}
	if (html.length)
		html += '<br /><a class="smallest" href="javascript:clearCalendarRepeatDates()">Clear List</a>';
	else
		html = '-none-';
	getEl('pickedPickList').innerHTML = html;
}

function repeatWeekClicked(iDayOfWeek)
{
	d = new Date();
	while (d.getDay() != iDayOfWeek)
	{
		d.setDate(d.getDate()+1);
	}
	for (i=0; i<11; i++)
	{
		onCalendarRepeatDateClicked(d.valueOf(),1,1);
		d.setDate(d.getDate()+7);
	}
	d.setDate(d.getDate()+7);
	onCalendarRepeatDateClicked(d.valueOf(),0,1);
}

function clearCalendarRepeatDates()
{
	getEl('pickedDates').value='';
	getEl('pickedPickList').innerHTML = '';
	drawCalendarRepeatDates(gCalRepeatStartDate);
}

function onCalendarRepeatDateClicked(iTime, bSkipRedraw, bForceOn)
{
	d = new Date(iTime);
	sDate = timeToDateString(d, true, 0, true, true);
	elPickedDates = getEl('pickedDates');
	sExistingDates = elPickedDates.value;
	if (bForceOn)
		sExistingDates = sExistingDates.replace(sDate+';','');
	if (sExistingDates.indexOf(sDate) >= 0)
		sExistingDates = sExistingDates.replace(sDate+';','');
	else
		sExistingDates += sDate + ";";
	elPickedDates.value = sExistingDates;

	if (!bSkipRedraw)
		drawCalendarRepeatDates(gCalRepeatStartDate);
}

function drawCalendarRepeatDatesMonth(dStart)
{
	var d = new Date(dStart.valueOf());
	var html = '<div class="smallest center">'+timeToDateString(d, true, 0, false, true)+'</div>';
	html += '<table cellpadding=0 cellspacing=0 align="center">'+getCalendarNavWeekTag(d);
	var iPos=0
	for (var i=0; i<(d.getDay()-gStartDay+7)%7; i++)
	{
		iPos++;
		html += "<td></td>";
	}
	
	sPickedDates = getEl('pickedDates').value;
	var dToday = new Date();
	iMonth=d.getMonth();
	while (d.getMonth() == iMonth)
	{
		iPos++;
		html += '<td class="calNavDay"><a href="javascript:onCalendarRepeatDateClicked('+d.valueOf()+')" '+
			'onmouseover="this.className=\'calNavPopupDayHighlight\';" '+	
			'onmouseout="this.className=\'\';">';
		
		sDate = timeToDateString(d, true, 0, true, true);
		if (sPickedDates.indexOf(sDate) >= 0)
			html += '<span style="background-color: #8df;">'+d.getDate()+'</span>';
		else if (dToday.getDate()==d.getDate() && dToday.getMonth()==d.getMonth() && dToday.getYear()==d.getYear())
			html += '<span class="calNavTodayHighlight">'+d.getDate()+'</span>';
		else
			html += d.getDate()
		html += '</a></td>';
		if (iPos == 7)
		{
			iPos = 0;
			html += '</tr>'+getCalendarNavWeekTag(d);
		}
		d.setDate(d.getDate()+1);
	}
	
	for (var i=iPos; i<7; i++)
		html += '<td></td>';
	
	html += "</tr></table>";
	return html;
}

function showRepeatOption(idToShow)
{
	var ids=new Array('no','daily','weekly','monthly','yearly','pickDates');
	var descriptions=new Array('Does not repeat','Repeats daily','Repeats weekly','Repeats monthly','Repeats yearly','Repeats on selected dates');

	for (i=0; i<ids.length; i++)
	{
		if (idToShow == ids[i])
		{
			toggleDisplayOn('repeatOptions'+ids[i]);
			getEl('repeatType'+ids[i]).checked = true;
			getEl('repeatDescription').innerHTML=descriptions[i];
		}
		else
		{
			toggleDisplayOff('repeatOptions'+ids[i]);
			getEl('repeatType'+ids[i]).checked = false;
		}
		
		if (idToShow=='daily' || idToShow=='weekly' || idToShow=='monthly')
			toggleDisplayOn('repeatEndAndSkip');
		else
			toggleDisplayOff('repeatEndAndSkip');
	}
}

// end edit event code
////////////////
////////////////
////////////////

////////////////
////////////////
////////////////
// start week view code

gWeekViewTime=0;
function showWeekView(iTime)
{
	clearYgCalDateDragDrops(ygWeekViewDrags,ygWeekViewDrops);
	if (!iTime)
	{
		d = new Date();
		iTime=d.valueOf();
	}
	dateObj=new Date(iTime);
	dateObj.setHours(12);
	while (dateObj.getDay() != 0+gStartDay)
		dateObj.setDate(dateObj.getDate()-1);
	gWeekViewTime=iTime;
	sDate=timeToDbDate(dateObj);

	var html="<table width='100%'><tr><td align='left'>Week of "+timeToDateString(dateObj, 1, 0, 1, 1);
	html += "</td><td align='right'>";
	html += '<a target="_blank" href="print.php?action=week&t='+sDate+'"><img src="'+ gThemeUrl +'/printButton.gif" border="0" alt="Print" /></a>&nbsp;';
	html += "<a href='javascript:showWeekView("+(iTime-60*60*24*7*1000)+")'><img border='0' alt='&laquo;' src='"+gThemeUrl+"/buttonUpArrow.gif' /></a>";
	html += "<a href='javascript:showWeekView()'><img border='0' alt='&laquo;' src='"+gThemeUrl+"/buttonToday.gif' /></a>";
	html += "<a href='javascript:showWeekView("+(iTime+60*60*24*7*1000)+")'><img border='0' alt='&laquo;' src='"+gThemeUrl+"/buttonDownArrow.gif' /></a></td></tr></table>";
	getEl('weekViewHeader').innerHTML= html;
		
	var html='<table id="weekViewTable" cellspacing="0" cellpadding="0"><tr>';
	d=new Date(dateObj);
	for (iDayIndex=0; iDayIndex<7; iDayIndex++)
	{
		html+=htmlForOneDayWeekView(d, iDayIndex);
		d.setDate(d.getDate()+1);
	}
	html += '</tr><tr><td colspan=7>';
	html += htmlForMonthsOnWeekView(dateObj);
	html += '</td></tr></table>';

	if (iTime < gDataStart || iTime > gDataEnd)
	{
		html = '<br /><br /><div class="smallest center">Loading more data - just a sec<br /><br /><img src="'+
			gThemeUrl+'/wait.gif" valign="absmiddle"/></div>';
		requestMoreData(iTime, 'showWeekView('+iTime+');');
	}

	getEl('weekViewContainer').innerHTML= html;
	toggleDisplayOn('weekViewPopup');
	showWindowShade('weekViewShade','block');
	
	elWeekViewPopup = getEl('weekViewPopup');
	elWeekViewPopup.style.top = "30px";
	elWeekViewPopup.style.left= (getWinWidth()/2 - elWeekViewPopup.offsetWidth/2) +'px';
	delayCode("buildYgCalDateDragDrops(ygWeekViewDrags,ygWeekViewDrops,'weekView')", 300);
}

function hideWeekView()
{
	toggleDisplayOff('weekViewPopup');
	showWindowShade('weekViewShade','none');
}

function htmlForOneDayWeekView(dateObj, iDayNum)
{
	sDate=timeToDbDate(dateObj);

	var sDate = timeToDbDate(dateObj);

	var dateToday = new Date();
	var sTextColorClass = 'textMedium';
	if (dateObj.getTime() < dateToday.getTime())
		sTextColorClass = 'textLight';
	if (dateObj.toDateString() == dateToday.toDateString())
		sTextColorClass = 'textBlack';
		
	var weatherHtml = '';
	var eventHtml = '';
	if (gaEvtsByDate[sDate]) 
	{
		aEventIds = gaEvtsByDate[sDate];
		for (var i=0; i<aEventIds.length; i++)
		{
			eventId = aEventIds[i];
			var thisEvent = gaEvts['e'+eventId];
			if (!thisEvent) // deleted
				continue;
			
			if (thisEvent.isFeed() && thisEvent.isStatus())
				continue;
									
			if (!shouldShowUserCalendar(thisEvent))
				continue;
			if (thisEvent.isWeather() && !thisEvent.isOwner()) // hide buddy's weather
				continue;
						
			if (thisEvent.isWeather())
				weatherHtml += '<span class="textMedium weatherInfo">' + thisEvent.getSummary() + '</span>';
			else
				eventHtml += formatEventLine(thisEvent, sTextColorClass, sDate, 'eventEntryWeekView');
		}
	}
	
	var sTdClass = 'calBox';
	var sTextColorClass = 'textLight';
	if (dateObj.toDateString() == dateToday.toDateString())
	{
		sTdClass = 'calBoxToday';
		sTextColorClass = 'textBlack';
	}
	
	var dateHtml = "<div class='calBoxDayLabel "+sTextColorClass+" large'>";
	dateHtml += timeToDayOfWeekString(dateObj, 3)+' ';
	dateHtml += dateObj.getDate() + '</div>';
	
	elMainCal = getEl('mainCalendarContainer');
	height = elMainCal.clientHeight-40;
	var html = "<td valign='top' > \
		<div style='position:relative; height:"+height+"px; overflow-y:auto;' class='weekViewDay "+sTdClass+"' \
		onclick='showDayView("+dateObj.valueOf()+");' >";
	html += dateHtml + eventHtml + weatherHtml;
	html += "</div></td>";

	return html;	
}

function getMonthsOnWeekViewWeekTag(d)
{
	iTime = d.valueOf();
	var sClass = 'calNavPopupWeek';
	dWeekView = new Date(gWeekViewTime);
	if (d.toDateString() == dWeekView.toDateString())
		sClass = 'calNavPopupWeekVisible';

	html = '<tr class="'+sClass+'" style="cursor:pointer" onclick="showWeekView('+iTime+')" \
		onmouseover="if (this.className != \'calNavPopupWeekVisible\') this.style.backgroundColor=\'#eee\';" \
		onmouseout= "if (this.className != \'calNavPopupWeekVisible\')this.style.backgroundColor=\'#fff\';" \
	>';
		
	return html;
}

function htmlForMonthsOnWeekView(d)
{
	d.setDate(1);
	d.setMonth(d.getMonth()-1);
	var html ='<div id="monthsOnWeekViewMsg" class="centerElement bold textDark">Drop onto any of the days DOWN HERE</div>';
	html += '<table id="monthsOnWeekView" align="center" cellspacing=15 cellpadding=0><tr>';
	for (var month=0; month<4; month++)
	{
		html += '<td><div class="calNavMonthYear textMedium center">'+timeToDateString(d, true, 0, false, true)+'</div>';
		html += '<table cellpadding=0 cellspacing=0 align="center">'+getMonthsOnWeekViewWeekTag(d);
		var iPos=0
		for (var i=0; i<(d.getDay()-gStartDay+7)%7; i++)
		{
			iPos++;
			html += "<td></td>";
		}
		
		var dToday = new Date();
		iMonth=d.getMonth();
		while (d.getMonth() == iMonth)
		{
			iPos++;
			sDate = timeToDbDate(d);
			id=	'calBoxWeekView'+sDate;
			html += '<td class="calNavDay" id="'+id+'">';
			ygWeekViewDrops.push(id);
			if (dToday.getDate()==d.getDate() && dToday.getMonth()==d.getMonth() && dToday.getYear()==d.getYear())
				html += '<span class="calNavTodayHighlight">'+d.getDate()+'</span>';
			else
				html += d.getDate()
			html += '</td>';
			d.setDate(d.getDate()+1);
			if (iPos == 7)
			{
				iPos = 0;
				html += '</tr>'+getMonthsOnWeekViewWeekTag(d);
			}
		}
		
		for (var i=iPos; i<7; i++)
			html += '<td></td>';

		html += "</tr></table></td>";
	}

	return html+'</tr></table>';
}

// end week view code
////////////////
////////////////
////////////////

////////////////
////////////////
////////////////
// start day view code

function getEventEndTimeHtml(thisEvent)
{
	var endTimeHtml = '';
	if (thisEvent.getStart() != thisEvent.getEnd())
	{
		dStart = new Date(thisEvent.getStart());
		dEnd = new Date(thisEvent.getEnd());
		endTimeHtml = '&nbsp;<span class="smallest bold textLight">until ';
		if (dStart.getDate() != dEnd.getDate() || dStart.getMonth() != dEnd.getMonth() || dStart.getYear() != dEnd.getYear())
			endTimeHtml += timeToDateString(dEnd, true, 0, true);
		else
			endTimeHtml += timeToTimeString(dEnd);
		endTimeHtml += '</span>';
	}
	return endTimeHtml;
}

gaMyResponsesToOtherInvite = {'unknown':'Undecided', 'yes':'Accepted', 'no':'Declined'};
function getMyResponseToOtherInvite(thisEvent)
{
	var changeUrl = "/index.php?action=invitePickup&amp;id="+thisEvent.getInviteId()+
		"&amp;code="+thisEvent.getInviteCode()+"&amp;decision=";
		
	var html = '<div class="smallest textLight" style="margin-bottom: 2px;"><img src="'+gThemeUrl+'/'+thisEvent.getInviteResponse()+'.gif" /><span class="bold">' +
		gaMyResponsesToOtherInvite[thisEvent.getInviteResponse()] +
		'.</span> &nbsp;<a href="'+changeUrl+'yes">Accept</a> | '+
		'<a href="'+changeUrl+'no">Decline</a> | '+
		'<a href="'+changeUrl+'unknown">Undecided</a>' +
		'</div>';
	
	return html;
}

gaOtherResponsesToMyInvite = {'unknown':'has not responded/decided', 'yes':'will join you', 'no':'cannot make it'};
function getResponsesToMyInvites(thisEvent)
{
	html = '';
	aInvites = thisEvent.getInvites();
	if (aInvites)
	{
		html = '<p class="dayViewHighlightBox smallest textLight">';
		for (var key in aInvites)
		{
			thisInvite = aInvites[key];
			if(thisInvite.getUserId())
			{
			user = gaUsers['u'+thisInvite.getUserId()];
			html += user.getFirstName()+' '+gaOtherResponsesToMyInvite[thisInvite.getResponse()]+'<br />';
			}

		}
		html += '</p>';
	}
	return html;
}

function hideDayView()
{
	el = getEl('dayViewPopup');
	el.style.visibility = 'hidden';
	hideFocus();
}

// set event handler
document.onkeypress = escHandler;
function escHandler(e)
{
	var evtobj=window.event? event : e;
	var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode;

	//if escape is pressed	
	if (unicode == 27)
	{
		hideEditEvent();
		hideDayView();
		showWindowShade('indexWindowShade','none');
		hideSearchView();
		hideTodos();
		oneBoxPopupDone(false, 'input');
		oneBoxPopupDone(false, 'todoInput');
		oneBoxPopupDone(false, 'editEventInvites');
		oneBoxPopupDone(false, 'dayViewInput');
		oneBoxPopupDone(false, '');
		return (false);
	}
}


var gDayViewTime=0;
function showDayViewFromDbDate(dbDate)
{
	d = dbDateToJsDate(dbDate);
	showDayView(d.valueOf());
}
function showDayView(iTime)
{
	if (!iTime)
	{
		d = new Date();
		iTime = d.valueOf();
	}
	gDayViewTime=iTime;
	
	// may have to fetch data if we scrolled out of range!
	// get more data if we need it
	var weatherHtml = '';
	var photoHtml = '';
	var eventsHtml = '';
	var d = new Date(iTime);
	var sDate = timeToDbDate(d);
	showWindowShade('indexWindowShade','block');
	getEl('dayViewDateHelp').innerHTML = timeToDateString(d, true, 0, true, true);
	getEl('defaultTime').value = timeToDbDate(d);
	getEl('dayViewInput').value = '';
	
	var dateHtml = '<span class="smallest dayMonth">'+timeToDayOfWeekString(d)+' '+timeToDateString(d, true)+'</span><br />' +
		'<span class="dayViewHeaderArrows">' +
		'<a target="_blank" href="print.php?t='+sDate+'"><img src="'+ gThemeUrl +'/printButton.gif" border="0" alt="Print" /></a>&nbsp;' +
		'<a href="javascript:showDayView('+(iTime-60*60*24*1000)+');"><img border="0" alt="&laquo;" src="'+gThemeUrl+'/leftArrow.gif" /></a>' +
		'<a href="javascript:showDayView('+(iTime+60*60*24*1000)+');"><img border="0" alt="&raquo;" src="'+gThemeUrl+'/rightArrow.gif" /></a>' +
		'</span>' +
		'<span class="dayViewHeaderNumeral">'+d.getDate()+'</span>';
	getEl('dayViewDate').innerHTML = dateHtml;

	if (iTime < gDataStart || iTime > gDataEnd)
	{
		eventsHtml = '<br /><br /><div class="smallest center">Loading more data - just a sec<br /><br /><img src="'+
			gThemeUrl+'/wait.gif" valign="absmiddle"/></div>';
		requestMoreData(iTime, 'showDayView('+iTime+');');
	}
	else
	{
		aEventIds = gaEvtsByDate[sDate];
		var myEvents = '';
		var buddyEvents = '';
		var inviteEvents = '';
		var iPhotoCount = 0;
		var iBuddyEventCount = 0;
		var iBuddyFeedCount = 0;
		for (var i=0; i<aEventIds.length; i++)
		{
			eventId = aEventIds[i];
			var thisEvent = gaEvts['e'+eventId];
			if (!thisEvent) // deleted
				continue;
			if (!shouldShowUserCalendar(thisEvent))
				continue;
			
			// skip status events	
			if (thisEvent.isFeed() && thisEvent.isStatus())
				continue;
	
	
			var summary = thisEvent.getSummary() + getBirthdayString(thisEvent, d);
			if (thisEvent.getLink().length)
				summary = "<a class='external textLight' target='_blank' href='"+thisEvent.getLink()+"'>"+summary+"</a>";
			
			if (thisEvent.isWeather())
			{
				if(gUserId == thisEvent.getUserId())
					weatherHtml = '<p class="smallest"><a class="hoverLink textLight" href="'+thisEvent.getLink()+'" target="_blank">'+thisEvent.getSummary() +'</a></p>';
				continue;
			}
			
			attachmentHtml = thisEvent.getAttachmentHtml();
			var notesHtml = '';
			var notes = thisEvent.getNotes();
			if (notes.length || thisEvent.isInvite() || attachmentHtml.length)
			{
				if (thisEvent.isOutsideCalendarFeed())
					notes = notes.substr(0,200)+'...';
				if (notes.length)
					notes += '<br />';
				notes = bracketsToMap(linkUrls(notes),eventId);
				notesHtml = '<p class="dayViewHighlightBox smallest textLight">'+notes;
				if (thisEvent.isInvite())
				{
					notesHtml += "<a href=# onclick='toggleDisplay(\"commentForm"+eventId+"\");if (getEl(\"commentForm"+eventId+"\")==\"block\")getEl(\"inviteComment"+eventId+"\").focus();'>Leave a comment</a>"+
						"<span id='commentForm"+eventId+"' style='display:none;'><form onsubmit='saveComment("+
						eventId+","+iTime+");return false;'><table><tr><td><input type='text' style='width: 170px' "+
						"id='inviteComment"+eventId+"'></td><td><input class='submitImage' type='image' src='"+gThemeUrl+"/buttonSave.gif' />"+
						"<input class='submitButton' type='submit' value='Save'></td></tr></table></form></span>";
				}
				if (attachmentHtml.length)
					notesHtml += attachmentHtml;
				notesHtml += '</p>';
			}
	
			if ((thisEvent.getImgUrl().length)&&(iPhotoCount < 5)) // limit because it looks bad with too many
			{
				photoHtml += '<div class="dayViewImage"><a href="'+thisEvent.getLink()+'" target="_blank">'+
					'<img border="0" height="60" src="' + thisEvent.getImgUrl() + '" /></a></div>';
				iPhotoCount++;
			}
		
			var iconHtml = '';
			if (thisEvent.isTaggedImportant() && thisEvent.isOwner())
				iconHtml += "<img src='"+gThemeUrl+"/starColor.gif' valign='absmiddle'/> ";
			if (thisEvent.getPrivacy() == 'private')
				iconHtml += "<img src='"+gThemeUrl+"/lock.gif' valign='absmiddle'/> ";
			if ((thisEvent.getRepeat() != 'no')&&(thisEvent.isOwner()))
				iconHtml += "<img src='"+gThemeUrl+"/repeat.gif' valign='absmiddle'/> ";	
			if ((thisEvent.getReminder() != -1)&&(!thisEvent.isFeed())&&(thisEvent.isOwner()))
				iconHtml += "<img src='"+gThemeUrl+"/reminder.gif' valign='absmiddle'/> ";
			if (thisEvent.isICalSub())
				iconHtml += "<img src='/img/subscribe.gif' /> ";
				
			dStart = new Date(thisEvent.getStart());
			var startTimeHtml = thisEvent.isAllDay() ? 'today &raquo;' : timeToTimeString(dStart);
			summary += getEventEndTimeHtml(thisEvent);
			var timeTdAttbributes = 'width="55" valign="top" align="right" class="smallest bold textLight"';
			sTitle = '';
			if (thisEvent.isOwner() || thisEvent.isHoliday())
			{
				inviteResponseHtml = getResponsesToMyInvites(thisEvent);
				myEvents += '<tr ';
				if (thisEvent.isEditable())
					myEvents += 'class="pointer" onmouseover="toggleDisplayOn(\'trash_'+thisEvent.getId()+'\')" '+
						' ondblclick="showEditEvent(\''+thisEvent.getId()+'\')"' +
						'onmouseout="toggleDisplayOff(\'trash_'+thisEvent.getId()+'\')"';
				myEvents += '><td valign="top" width="45" align="left"><img src="'+gThemeUrl+'/clear.gif" border="0" width="45" height="1" />';
				if (thisEvent.isEditable())
				{
					sTitle = 'title="double-click to edit"';
					myEvents += '<span id="trash_'+thisEvent.getId()+'" style="display:none;"><a '+
						'href="javascript:delEvent(\''+thisEvent.getId()+'\','+iTime+');">'+
						'<img src="'+gThemeUrl+'/buttonDelete.gif" '+
						'alt="X" border="0" align="absmiddle" /></a>&nbsp;'+
						'<a class="smallest" href="javascript:showEditEvent(\''+thisEvent.getId()+'\')">Edit</a></span>';
				}
				padding='8';
				sClass='large';
				if (thisEvent.getLink())
				{
					padding='5';
					sClass='small';
				}
				if (shouldShowTagHighlight(thisEvent))
					sClass += ' tagHighlightDayView';
				
				sTextColorClass = 'textMedium';
				var dateToday = new Date();
				var dateYesterday = new Date();
				dateYesterday.setDate(dateYesterday.getDate() - 1);
				if (!thisEvent.isAllDay())
				{
					if (thisEvent.getStart() < dateToday.getTime())
						sTextColorClass = 'textLight';
				}
				else
				{
					if (thisEvent.getStart() < dateYesterday.getTime())
						sTextColorClass = 'textLight';
				}
				if ((thisEvent.getRepeat() != 'no') && (d.getTime() < dateToday.getTime()))
					sTextColorClass = 'textLight';
					
				var sStyle = '';
				if (thisEvent.isTaggedStrike())
					sStyle += ' style="text-decoration: line-through;" ';


				myEvents += '</td><td '+timeTdAttbributes+' style="padding-top:'+padding+'px;"><img src="'+gThemeUrl+'/clear.gif" border="0" width="55" height="1" /><br />'+startTimeHtml+'</td>' +
					'<td align="left" valign="top" width="282"><span '+sTitle+sStyle+'class="'+sClass+' bold '+sTextColorClass+'">' +
					iconHtml + summary+'</span>'+notesHtml+inviteResponseHtml+'</td></tr>';
			}
			else if (thisEvent.isInvite())
			{
				sTextColorClass = 'textMedium';
				var dateToday = new Date();
				if (!thisEvent.isAllDay())
				{
					if (thisEvent.getStart() < dateToday.getTime())
						sTextColorClass = 'textLight';
				}
				
				inviteEvents += '<tr onmouseover="toggleDisplayOn(\'trash_'+thisEvent.getId()+'\')" ' +
					'onmouseout="toggleDisplayOff(\'trash_'+thisEvent.getId()+'\')"' +
					'><td width="45" valign="top" align="left"><span id="trash_'+thisEvent.getId()+'" style="display:none;"><a '+
					'href="javascript:if(confirm('+
					'\'Really%20delete%20this%20invitation?\'))delInvite('+thisEvent.getId()+','+iTime+');">'+
					'<img src="'+gThemeUrl+'/buttonDelete.gif" '+
					'alt="X" border="0" align="absmiddle" /></a></span>' + 
					'</td><td '+timeTdAttbributes+' style="padding-top:5px;">' +
					startTimeHtml + '</td><td align="left" valign="top" >'+iconHtml +
					"<img src='"+gThemeUrl+"/envelope.gif' />&nbsp;<span class='small "+sTextColorClass+"'>"+
					'from <a href="/user/'+thisEvent.getUserId()+'">' + 
					gaUsers['u'+thisEvent.getUserId()].getFirstName() + '</a>: ' +
					summary+'</span>'+getMyResponseToOtherInvite(thisEvent)+notesHtml;
				if (thisEvent.getOtherInvitees().length)
				{
					inviteEvents += '<p class="dayViewHighlightBox smallest textLight">Other invitees: '+
						thisEvent.getOtherInvitees()+'</p>';
				}
				inviteEvents +=	'</td></tr>';
			}
			else
			{
				var sHideLink = '';
				var sHideMouseOver = '';
				iBuddyEventCount++;
				if (thisEvent.isFeed() || thisEvent.isICalSub())
				{
					sHideLink = '<a title="hide this stuff from your calendar" id="hide_'+thisEvent.getId();
					sHideLink += '" style="display: none;" href="/?action=hideFeed&buddyUserId='+thisEvent.getUserId();
					sHideLink += '&feedId='+thisEvent.getFeedId()+'">Hide</a>';
					sHideMouseOver = ' onmouseover="toggleDisplayOn(\'hide_'+thisEvent.getId()+'\')" ' +
						'onmouseout="toggleDisplayOff(\'hide_'+thisEvent.getId()+'\')"';
					iBuddyFeedCount++;
				}
				buddyEvents += '<tr'+sHideMouseOver+'><td width="45" class="smallest" valign="top"><img src="'+gThemeUrl+'/clear.gif" width="45" height="1" /><br />'+sHideLink+'</td><td '+timeTdAttbributes+' style="padding-top: 5px;">';
				buddyEvents += startTimeHtml;
				buddyEvents += '</td><td width="282" align="left" valign="top" >'+iconHtml;
				var name='';
				if (!thisEvent.isHoliday())
					name = '<a href="/user/'+thisEvent.getUserId()+'">'+gaUsers['u'+thisEvent.getUserId()].getFirstName()+'</a>: ';
				buddyEvents += '<span class="small textLight">'+name+summary+'</span>'+notesHtml+'</td></tr>';
			}
		}
	
		// right column
		if (photoHtml.length)
			photoHtml = "<div class='dayViewImages'><p class='smallest textMedium' style='margin-bottom: 4px;"+
				" margin-top: 2px;'>Photos:</p>"+photoHtml+'</div>';
		// window height hack
		var heightTable = '<table style="float: left;" cellpadding="0" cellspacing="0" border="0"><tr><td height="434"><img style="visibility: hidden;" src="'+gThemeUrl+'/clear.gif" width="10" height="434" /></td><td valign="top">';
		// events
		var headerStart = '<table width="100%" cellpadding="3" cellspacing="0" border="0"><tr>'+
			'<td colspan="3"  width="400" align="left" class="dayViewEventHeader textLight small">';
		if (!myEvents.length)
			myEvents = '<tr><td width="45"><img src="'+gThemeUrl+'/clear.gif" width="45" height="1" /></td><td width="55" valign="top" align="right" '+
				'class="smallest bold textLight" style="padding-top:5px;"><img src="'+gThemeUrl+'/clear.gif" width="55" height="1" /><br />'+
				'today &raquo;</td><td width="282" align="left" valign="top" class="small textLight"><img src="'+gThemeUrl+'/clear.gif" width="1" height="1" /><br />nothing scheduled</td></tr>';
		eventsHtml = heightTable + headerStart + 'My Stuff:</td></tr>' + myEvents + '</table>';
		if (inviteEvents.length)
			eventsHtml += headerStart + 'Invitations:</td></tr>' + inviteEvents + '</table>';
		if (buddyEvents.length)
		{
			if ((iBuddyFeedCount + iBuddyEventCount > 16)) // hide buddy updates
				eventsHtml += headerStart + 'Buddy Updates: ' + iBuddyEventCount + ' &nbsp;<a class="bold" href="javascript:toggleDisplay(\'buddy'+iTime+'\');">show all?</a></td></tr></table><div id="buddy'+ iTime +'"style="display: none;"><table width="100%" cellpadding="3" cellspacing="0" border="0">' +
					buddyEvents + '</table></div>';
			else
				eventsHtml += headerStart + 'Buddy Updates: ' + iBuddyEventCount + '</td></tr>' + buddyEvents + '</table>';			
		}
	}
	eventsHtml += '</td></tr><tr><td colspan="2" align="right"><div class="closeDayView small"><a id="closeInfoHref" href="#" accesskey="x" onclick="hideDayView(); showWindowShade(\'indexWindowShade\',\'none\'); return false;"><img src="'+gThemeUrl+'/buttonClose.gif" border="0"/></a></div></td></tr></table>';
	getEl('dayViewEvents').innerHTML = eventsHtml;
	getEl('dayViewRightCol').innerHTML = weatherHtml + photoHtml;

	displayCenteredDiv('dayViewPopup');
	getEl('dayViewInput').focus();
}

// end day view code
////////////////
////////////////
////////////////

////////////////
////////////////
////////////////
// start search views

function hideSearchView()
{
	el = getEl('searchResultsView');
	el.innerHTML = '';
	el.style.visibility = 'hidden';
	el = getEl('searchResultsClear');
	el.style.visibility = 'visible';
	el.style.visibility = 'hidden';
	showWindowShade('indexSearchShade','none');
}

function showSearchView(action, args)
{
	makeXmlHttpRequest(action, args, 'getEl("searchResultsView").innerHTML = str;');
	showWindowShade('indexSearchShade','block');
	displayCenteredDiv('searchResultsView');
}
// end search views
////////////////
////////////////

////////////////
////////////////
////////////////
// start popup calendar navigation code
var gCalendarNavStartTime = 0;
function showCalendarNavPopup(iStartTime, iMonths)
{
	gCalendarNavStartTime = iStartTime;
	if (!gCalendarNavStartTime)
		gCalendarNavStartTime = gStartTime;

	el = getEl('calNavPopup');
	el.innerHTML = drawCalendarNavPopup(iMonths);
}

function drawCalendarNavPopup(iMonths)
{	
	dToday = new Date();
	dLast = new Date(gCalendarNavStartTime);
	dLast.setMonth(dLast.getMonth()-1);
	dNext = new Date(gCalendarNavStartTime);
	dNext.setMonth(dNext.getMonth()+1);
	var navOptions = '<a href="javascript:showCalendarNavPopup('+dLast.valueOf()+','+iMonths+')"><img border="0" src="'+gThemeUrl+'/calUp.gif"/></a>'+
		'<a href="javascript:showCalendarNavPopup('+dToday.valueOf()+','+iMonths+')"><img border="0" src="'+gThemeUrl+'/calToday.gif"/></a>'+
		'<a href="javascript:showCalendarNavPopup('+dNext.valueOf()+','+iMonths+')"><img border="0" src="'+gThemeUrl+'/calDown.gif"/></a><br />';
	
	var html = navOptions;
	var d = new Date(gCalendarNavStartTime);
	d.setDate(1);
	for (var month=0; month<iMonths; month++)
	{
		html += drawCalendarNavMonth(d, iMonths);
		d.setMonth(d.getMonth()+1)
	}
	
	html += navOptions;
	return html;
}

function getCalendarNavWeekTag(d)
{
	iTime = d.valueOf();
	var sClass = 'calNavPopupWeek';
	buffer = 60*60*24*1000;
	if (iTime >= gStartTime-buffer && iTime < gEndTime-buffer)
		sClass = 'calNavPopupWeekVisible';

	html = '<tr class="'+sClass+'">';
		
	return html;
}

function onCalendarNavClicked(iTime, iMonths)
{
	if (typeof(onCalendarNavClickedOverride) == 'function')
		return onCalendarNavClickedOverride(iTime);
	if (iTime < gStartTime || iTime > gEndTime)
	{
		drawMainCalendar(iTime);
		showCalendarNavPopup(gCalendarNavStartTime, iMonths); // redraw popup with same start, new highlighting
	}
	flashHighlightedDate(new Date(iTime));
}

function drawCalendarNavMonth(dStart, iMonths)
{
	var d = new Date(dStart.valueOf());
	var html = '<div class="calNavMonthYear textMedium center">'+timeToDateString(d, true, 0, false, true)+'</div>';
	html += '<table cellpadding=0 cellspacing=0 align="center">'+getCalendarNavWeekTag(d);
	var iPos=0
	for (var i=0; i<(d.getDay()-gStartDay+7)%7; i++)
	{
		iPos++;
		html += "<td></td>";
	}
	
	var dToday = new Date();
	iMonth=d.getMonth();
	while (d.getMonth() == iMonth)
	{
		iPos++;
		html += '<td class="calNavDay"><a href="javascript:onCalendarNavClicked('+d.valueOf()+','+iMonths+')" '+
			'onmouseover="this.className=\'calNavPopupDayHighlight\';" '+	
			'onmouseout="this.className=\'\';">';
		if (dToday.getDate()==d.getDate() && dToday.getMonth()==d.getMonth() && dToday.getYear()==d.getYear())
			html += '<span class="calNavTodayHighlight">'+d.getDate()+'</span>';
		else
			html += d.getDate()
		html += '</a></td>';
		if (iPos == 7)
		{
			iPos = 0;
			html += '</tr>'+getCalendarNavWeekTag(d);
		}
		d.setDate(d.getDate()+1);
	}
	
	for (var i=iPos; i<7; i++)
		html += '<td></td>';
	
	html += "</tr></table>";
	return html;
}

// end popup calendar navigation code
////////////////
////////////////
////////////////

////////////////
////////////////
////////////////
// start calendar motion
function moveCalendarNow()
{
	d = new Date();
	drawMainCalendar(d.valueOf());
}

function moveCalendar(increment)
{
	drawMainCalendar(gCenteredTime + increment);
	return;
	
	// just testing stuff below...
	iLoops = 0;
	delay = 40;
	for (var i=0; i<iLoops; i++)
	{
		offset = (i+1)*(100/iLoops);
		str = 'el=getEl("mainCalendar");';
		if (increment > 0)
			str+='el.style.marginTop="-'+offset+'px"; el.style.paddingBottom="'+offset+'px";';
		else
			str+='el.style.marginTop="'+offset+'px"; el.style.marginBottom="-'+offset+'px";';
	
		setTimeout(str, i*delay);
	}
	
	str = "drawMainCalendar("+(gCenteredTime + increment)+")";
	setTimeout(str, (iLoops+1)*delay);
}

// end calendar motion
////////////////
////////////////
////////////////

////////////////
////////////////
////////////////
// start Find menu stuff

function updateTagsInFindMenu()
{
	var sHtml = '';
	for (var tag in gaTags)
	{
		sLinkColor = gaTagColors[tag] ? getContrastColor('#'+gaTagColors[tag]) : '';
		sTagColor = gaTagColors[tag] ? gaTagColors[tag] : 'fff';
		sHtml += "<div class='menuItem small bolder textMedium' id='"+tag+"' onmouseover=\"getEl('"+tag+
			"').style.backgroundColor = '#fff';\" onmouseout=\"getEl('"+tag+
			"').style.backgroundColor = 'transparent';\" ><img id='"+tag+"Color' onclick=\"showColorPicker('Tag', '"+tag+"', '"+tag+"', this);\" "+
			"class='pointer colorInMenu' style='background-color:#"+sTagColor+";' title='Click to change color' "+
			"src='/img/clear.gif' /> <a style='padding: 1px 2px 1px 2px; background-color:#"+sTagColor+";"+sLinkColor+"' href='#' onclick=\"showSearchView('tagSearch','tag="+tag+
			"'); return false;\">"+tag+"</a></div>";
	}
	
	if (!sHtml.length)
		sHtml = "<div class='menuItem smallest textMedium'>You have no tags.<br /><br />If you add tags to your events, you can assign colors to them!</div>";
	
	getEl('tagsInFindMenu').innerHTML = sHtml;
}

// end Find menu stuff
////////////////
////////////////
////////////////

////////////////
// start Share menu stuff
function hideShareOptions()
{
	showWindowShade('shareOptionsWindowShade','none');
	if (getEl('shareOnBlog'))
		getEl('shareOnBlog').style.visibility = 'hidden';
	if (getEl('shareOnMySpace'))	
		getEl('shareOnMySpace').style.visibility = 'hidden';
	hideFocus();
}
// end Share menu stuff
////////////////


////////////////
////////////////
////////////////
// start color stuff

var gColorPickerType = '';
var gColorPickerKey = '';
var gColorPickerColors = '';
function showColorPicker(type, label, key, elSwatch)
{
	gColorPickerType = type;
	gColorPickerKey = key;
	if (type == 'Buddy')
		gColorPickerColors = gaBuddyColors;
	else if (type == 'Webcal')
		gColorPickerColors = gaWebcalColors;
	else
		gColorPickerColors = gaTagColors;

	getEl('colorPickerTitle').innerHTML = label;
	setColor(gColorPickerColors[key]);
	elPopup = getEl('colorPickerPopup');
	elPopup.style.visibility = 'visible';
	coords = getElementPos(elSwatch);
	coords.x += 20;
	setElementPos(elPopup, coords);
	showWindowShade('editEventWindowShade','block');
}

function setColor(sColor, skipRedraw)
{
	if (!sColor)
		sColor = 'transparent';
	aColors = new Array('FF9191','FF99CC','E97B53','FFDC91','F9FF91','99CCFF','C2C2C2','91FFC5','913AFF','transparent');
	elCustom = getEl('customColor');
	elCustom.style.background='transparent';
	for (var i=0; i<aColors.length; i++)
	{
		el = getEl('color'+aColors[i]);
		if (el)
			el.style.border = '1px outset #aaa';
	}

	var sColorForStyle = sColor;
	if (sColorForStyle != 'transparent')
		sColorForStyle = '#'+sColorForStyle;
	
	elSelected = getEl('color'+sColor);
	if (elSelected)
		elSelected.style.border = '1px inset #aaa';
	else
	{
		elCustom.style.background=sColorForStyle;
		elCustom.style.border = '1px inset #aaa';
	}
	
	gColorPickerColors[gColorPickerKey] = sColor;
	
	elMainCalendar = getEl('mainCalendarContainer');
	if (!skipRedraw && elMainCalendar)
		drawMainCalendar(gCenteredTime);
	
	if (gColorPickerType == 'Buddy')
	{
		getEl('buddyColor_'+gColorPickerKey).style.backgroundColor = sColorForStyle;
		getEl('buddyColorHref_'+gColorPickerKey).style.backgroundColor = sColorForStyle;
	}
	else if (gColorPickerType == 'Webcal')
		getEl('webcalColor_'+gColorPickerKey).style.backgroundColor = sColorForStyle;
	else if (gColorPickerType == 'Tag' && getEl('colorInTagManager_'+gColorPickerKey))
		getEl('colorInTagManager_'+gColorPickerKey).style.backgroundColor = sColorForStyle;
}

function hideColorPicker()
{
	sColor = gColorPickerColors[gColorPickerKey];
	if (sColor && sColor.length)
		makeXmlHttpRequest('set'+gColorPickerType+'Color', 'key='+gColorPickerKey+'&color='+sColor);
	getEl('colorPickerPopup').style.visibility = 'hidden';
	showWindowShade('editEventWindowShade','none');
}

function showCustomColor()
{
	var sColor = '-none-';
	if (gColorPickerColors[gColorPickerKey])
		sColor = gColorPickerColors[gColorPickerKey];
	label = getEl('colorPickerTitle').innerHTML;
	NewWindow('colorPicker.php?label='+escape(label)+'&color='+sColor,'colorPicker',400,280);
}


// end color stuff
////////////////
////////////////
////////////////

////////////////
////////////////
////////////////
// start Tag Management

function renameTagSubmit(sTag, bSave, sType)
{
	if (bSave)
	{
		sOldTag = getEl('oldTagToRename'+sType+'_'+sTag).value;
		sNewTag = getEl('newTagToRename'+sType+'_'+sTag).value;
		if (sOldTag != sNewTag)
		{
			showSearchView('manageTags','renameTag='+sOldTag+'&newTag='+sNewTag+'&type='+sType)
		}
	}
	
	toggleDisplayOff('renameTagForm'+sType+'_'+sTag);
	return false;
}

function renameTag(sTag, sType)
{
	toggleDisplayOn('renameTagForm'+sType+'_'+sTag);
}

// end Tag Management
////////////////
////////////////
////////////////

////////////////
////////////////
////////////////
// start general stuff

function getBirthdayString(thisEvent, date)
{
	if (thisEvent.getSummary().search(/\b(bday)|(birthday)|(b\-day)/i) < 0)
		return '';

	notes = thisEvent.getNotes();
	iStart = notes.search(/\b\d\d\d\d\b/);
	if (iStart < 0)
		return '';
	iYear = date.getFullYear() - notes.substring(iStart, iStart+4);
	if (iYear > 120 || iYear < 1)
		return '';
	return ' - ' + iYear + ' years old!';
}

function getAnniversaryString(thisEvent, date)
{
	if (thisEvent.getSummary().search(/\b(anniv)|(anniversary)/i) < 0)
		return '';

	notes = thisEvent.getNotes();
	iStart = notes.search(/\b\d\d\d\d\b/);
	if (iStart < 0)
		return '';
	iYear = notes.substring(iStart, iStart+4);
	sNoun = 'years';
	if ((date.getFullYear() - iYear) < 2)
		sNoun = 'year';
	return ' - ' + (date.getFullYear() - iYear) + ' ' + sNoun + ' and counting!';
}



function showPopupCalendar(inputId, hrefId, defaultInputId)
{
	var initialValue = getEl(inputId).value;
	if (!initialValue.length)
		initialValue = getEl(defaultInputId).value;
		
	format = (gDateInputFormat == 1) ? 'd/M/yyyy': 'M/d/yyyy';
		
	calendar.select(getEl(inputId), hrefId, format, initialValue);
}

function onClickSearchResult(userId, sDate)
{
	showUserCalendar(userId);
	d = new Date(sDate);
	showDayView(d.valueOf());
}

function linkUrls(s,linkTitle)
{
	aResults = s.match(/(https?:)/gi);
	if (aResults)
		s = s.replace(RegExp.$1, " " + RegExp.$1);

	var hlink = /\b(https?):\/\/([^ \:\!\)\(\"\'\<\>\n\r\s])+/g; // don't put in ';' - used in &amp;
    return (s.replace (hlink, function ($0,$1,$2)
    {
    		s = $0; 
			// remove trailing dots, if any
   			while (s.length>0 && s.charAt(s.length-1)=='.') 
				s=s.substring(0,s.length-1);
				// add hlink
 			randomId = (Math.round((Math.random()*100000)+1));
			title = 'more info';
			if (linkTitle)
				title = linkTitle;
//			makeXmlHttpRequest('getUrlTitle', 'url='+s+'&linkId=linkId'+randomId, "getEl('linkId'+"+randomId+").innerHTML = str;");
			return "<a title='linkId" + randomId + "' id='linkId"+randomId+"' class='external textLight' target='_blank' href='"+s+"'>"+title+"</a>"; 
	}
	));
}



function stripTags(s)
{
	a = s.indexOf("<");
	b = s.indexOf(">");
	len = s.length;
	c = s.substring(0, a);
	if(b == -1)
	b = a;
	d = s.substring((b + 1), len);
	s = c + d;
	tagCheck = s.indexOf("<");
	if(tagCheck != -1)
	s = stripTags(s);
	return s;
}


function countComments(s)
{
	// find a string " said:" and count instances
	aResults = s.match(/(.said:)/g);
	if (aResults)
		return aResults.length;
	else
		return 0;
}

function escapeAddress(s)
{
	// address in notes my have '&' in them rewritten as '&amp;'
	return encodeURIComponent(s.replace('&amp;', '&'));
}

function bracketsToMap(s,eventId)
{
	// find a string inside [].  add a map link and weather info if possible
	var bracketRE = /\[(.+?)\]/;
	var mapUrl;
	aResults = bracketRE.exec(s);
	weather = '<span id="weatherConditions'+eventId+'"></span>';
	if (aResults)
	{
		if (aResults[0].indexOf('|') >= 0)
		{
			var aDirectionsArray = new Array();
			aDirectionsArray = aResults[0].split("|");
			var sStartAddr = '';
			if (aDirectionsArray[0].indexOf('home') >= 0)
				sStartAddr = gaUsers['u'+gUserId].getHomeString();
			else if (aDirectionsArray[0].indexOf('work') >= 0)
				sStartAddr = gaUsers['u'+gUserId].getWorkString();
			if (sStartAddr.length) // might not have a home/work set
				mapUrl = 'http://maps.google.com/maps?saddr='+escapeAddress(sStartAddr)+'&daddr='+escapeAddress(aDirectionsArray[1]);
			else		
				mapUrl = 'http://maps.google.com/maps?q='+escapeAddress(aDirectionsArray[1]);
		}
		else
		{
			mapUrl = 'http://maps.google.com/maps?q='+escapeAddress(removeBrackets(aResults[0]));
			var weatherString = aResults[1];
			var queryString = '';
			var zipRE = /(\d\d\d\d\d)/;
			aZipMatch = zipRE.exec(weatherString);
			if (aZipMatch)
				queryString = aZipMatch[0];
			else
			{
				var aLocationArray = new Array()
				aLocationArray = weatherString.split(",");
				if (aLocationArray.length == 2)
					queryString = aLocationArray[0]+','+aLocationArray[1];
				else if (aLocationArray.length == 3)
					queryString = aLocationArray[1]+','+aLocationArray[2];
			}
		}
		if (queryString)
		{
			str = "makeXmlHttpRequest('getWeather', 'q="+queryString+"', 'getEl(\"weatherConditions"+eventId+"\").innerHTML = str;');";
			delayCode(str, 100);
		}
		
		s = s.replace (aResults[0], '<a class="external textLight" target="_blank" href="' +mapUrl+ '">Map - '+aResults[0]+'</a>');
		s = removeBrackets(s);
	}
	return s+weather;
}

function removeBrackets(s)
{
	s = s.replace (/\[/, '');
	s = s.replace (/\]/, '');
	return s;		
}

function fixStrippedHtml(s, bIncludeBreaks) // replace special chars stripped from user input
{
	s=s.replace(/&laquo;/g,'');
	s=s.replace(/&raquo;/g,'');
	s=s.replace(/&quot;/g,'"');
	s=s.replace(/&#039;/g,"'");
	s=s.replace(/&lt;/g,'<');
	s=s.replace(/&gt;/g,'>');
	s=s.replace(/&amp;/g,'&');
	s=s.replace(/&copy;/g,'©');
//	s=s.replace(/&circ;/g,'â'); breaks ie6
	
	if (bIncludeBreaks)
	{
		s=s.replace(/<br>/g,"\r\n");
		s=s.replace(/<br\/>/g,"\r\n");
		s=s.replace(/<br \/>/g,"\r\n");
	}
	
	return s;
}

function delEvent(eventId, iTime)
{
	thisEvent = gaEvts['e'+eventId];
	if (thisEvent.getRepeat() != 'no')
	{
		if(!confirm('This is a repeating event.\n\nIf you just want to remove ONE occurrence, edit the event and use the "skip date" tool.\n\nOtherwise, to completely delete ALL occurences of this event, press Okay.'))
			return;
	}
	else
	{
		if(!confirm('Really delete this event?'))
			return;
	}
		
	gaEvts['e'+eventId] = null;
	if(iTime)
		showDayView(iTime);
	drawMainCalendar(gCenteredTime);
	updateWebtopEventCount();
	if (iTime)
		flashHighlightedDate(new Date(iTime));
	
	makeXmlHttpRequest('delEvent', 'id='+eventId);
}

function delInvite(eventId, iTime)
{
	gaEvts['e'+eventId] = null;
	showDayView(iTime);
	drawMainCalendar(gCenteredTime);
	flashHighlightedDate(new Date(iTime));
	
	makeXmlHttpRequest('delInvite', 'id='+eventId);
}

function saveComment(eventId, iTime)
{
	thisEvent = gaEvts['e'+eventId];
	
	name=gaUsers['u'+gUserId].getFirstName();
	comment = getEl('inviteComment'+eventId).value;
	var newNotes = name+' said: '+comment;
	thisEvent.setNotes(thisEvent.getNotes() + "<br />" + newNotes);
	showDayView(iTime);
	
	makeXmlHttpRequest('saveComment', 'id='+eventId+'&comment='+encodeURIComponent(newNotes));
}

function getContrastColor(s)
{
	var sHexTotal = totalHexValue(s);
	if ((s == '#FFDC91')||(s == '#91FFC5')) // small hack to ensure good looking defaults
		return '';
		
	if (sHexTotal > 620)
		return '';
	else
		return 'color: #fff !important; ';
}

function totalHexValue(s)
{
	var sHex = s;
	iRed = HexToR(s);
	iGreen = HexToG(s);
	iBlue = HexToB(s);
	return iRed+iGreen+iBlue;
}

function HexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function HexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function HexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

function flashHighlightedDate(dateObj,elementId,finishCode,startColor,cycles) 
{
	var id='';
	if (elementId)
		id = elementId;
	else
		id = 'calBox'+timeToDbDate(dateObj);

	if (!getEl(id))
		return;
		
	var hstr = '#';
	var hdig = "0123456789abcdef";
	var cbeg = '#ffff66'; // starts with a yellow
	if (startColor)
		cbeg = startColor;
	var cCoorectEnd = getEl(id).style.backgroundColor; // this correctly gets the color. The fade code is buggy
	var cend = '#ffffff';
	var iter = 20; // cycles
	if (cycles)
		iter = cycles;
	var time = 80; // ms

	var rbeg = hdig.indexOf(cbeg.substr(1,1))*16 + hdig.indexOf(cbeg.substr(2,1));
	var gbeg = hdig.indexOf(cbeg.substr(3,1))*16 + hdig.indexOf(cbeg.substr(4,1));
	var bbeg = hdig.indexOf(cbeg.substr(5,1))*16 + hdig.indexOf(cbeg.substr(6,1));
	var rend = hdig.indexOf(cend.substr(1,1))*16 + hdig.indexOf(cend.substr(2,1));
	var gend = hdig.indexOf(cend.substr(3,1))*16 + hdig.indexOf(cend.substr(4,1));
	var bend = hdig.indexOf(cend.substr(5,1))*16 + hdig.indexOf(cend.substr(6,1));
	for ( i = 1, r = rbeg, g = gbeg, b = bbeg;
	i <= iter;
	r = Math.round(rbeg + i * ((rend - rbeg) / (iter-1))),
	g = Math.round(gbeg + i * ((gend - gbeg) / (iter-1))),
	b = Math.round(bbeg + i * ((bend - bbeg) / (iter-1))), i++ )
	{
		hstr = '#' + hdig.charAt(Math.floor(r/16)) + hdig.charAt(r%16) +
		hdig.charAt(Math.floor(g/16)) + hdig.charAt(g%16) +
		hdig.charAt(Math.floor(b/16)) + hdig.charAt(b%16);
		setTimeout('var el = getEl("' + id + '"); el.style.backgroundColor = "' + hstr + '";', i * time);
	}
   	setTimeout('var el = getEl("' + id + '"); el.style.backgroundColor = "' + cCoorectEnd + '";', (i+1) * time);
   	if (finishCode && finishCode.length)
	   	setTimeout(finishCode, (i+2) * time);	
}

function calculateStartTime(iCenteredTime)
{
	// it should be in the previous week
	dCentered = new Date(iCenteredTime);
	dCentered.setHours(12);
	dCentered.setMinutes(0);
	dStart = new Date(dCentered.valueOf() - ((dCentered.getDay() + 7 - gStartDay)%7+7)*60*60*24*1000)
	dStart.setHours(12);
	dStart.setMinutes(0);
	dStart.setSeconds(0);
	dStart.setMilliseconds(0);
	
	// time of day should be noon toaccount for potential daylight savings issues
	return dStart.valueOf();
}

function isTimeVisible(t)
{
	return (t <= gEndTime && t >= gStartTime);
}

////////////////
////////////////

function timeToJsCalendarDate(dateObj)
{
	month = dateObj.getMonth()+1;
	day = dateObj.getDate();
	year = dateObj.getFullYear();
	if (gDateInputFormat == 1)
		return day+'/'+month+'/'+year;
	else
		return month+'/'+day+'/'+year;
}
function dbDateToJsDate(s)
{
	year = s.substring(0,4);
	month = s.substring(5,7)-1; // zero-based
	day = s.substring(8,10);
	return new Date(year, month, day);
}

////////////////
////////////////
var gMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function timeToDateString(dateObj, showMonth, monthLength, showDate, showYear)
{
	var s ='';
	if (showMonth)
	{
		s += gMonths[dateObj.getMonth()];
		if (monthLength)
			s = s.substring(0, monthLength);
	}
	if (showDate)
	{
		if (showMonth)
			s+= ' ';
		s += dateObj.getDate();
	}
	if (showYear)
	{
		if (showDate)
			s += ',';
		if (showDate || showMonth)
			s+= ' ';
		s += dateObj.getFullYear();
	}
	return s;
}

////////////////
////////////////

var gDaysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function timeToDayOfWeekString(dateObj, length)
{
	var s = gDaysOfWeek[dateObj.getDay()];
	if (length)
		s = s.substring(0, length);
	return s;
}

////////////////
////////////////


function timeToDbDate(d)
{
	day = d.getDate()+"";
	if (day.length == 1)
		day = "0"+day;

	month = (d.getMonth()+1)+"";
	if (month.length == 1)
		month = "0"+month;

	return d.getFullYear() + '-' + month + '-' + day;
}

////////////////
////////////////

function timeToStringDate(d)
{
	day = d.getDate()+"";
	if (day.length == 1)
		day = "0"+day;

	month = (d.getMonth()+1)+"";
	if (month.length == 1)
		month = "0"+month;

	return d.getFullYear() + month  + day;
}


function timeToTimeString(time, format) // unix time to a time of day
{
	var mer = '';
	var d = new Date(time);
	var hour = d.getHours();
	
	if (!gUse24HourClock)
	{
		if (hour < 12)
			mer = (format == 'tiny') ? 'a' : 'am';
		else
			mer = (format == 'tiny') ? 'p' : 'pm';
		
		if (hour == 0)
			hour = 12;
		else if (hour > 12)
			hour -= 12;
	}
	
	var minute = ":" + d.getMinutes();
	
	if (minute.length == 2)
		minute = ":0" + d.getMinutes();
	
	if (minute == ':00' && !gUse24HourClock)
		minute = '';
	
	return hour + minute + mer;
}

function createViewSubMenu(i,sName,elSwatch)
{
	dm_ext_changeItem(6,1,0,["Toggle Events","javascript:toggleUserCalendar("+i+",true)","",""]);
	dm_ext_changeItem(6,1,1,["Color "+sName,"javascript:showColorPicker(\'Buddy\', '"+sName+"', 'u"+i+"', getEl('buddyColor_u"+i+"'))","",""]);
	dm_ext_changeItem(6,1,2,["Buddy Page","javascript:document.location.href='/user/"+i+"'","",""]);
}
////////////////
////////////////
