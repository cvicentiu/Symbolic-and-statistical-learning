//-----( @CheckForFeedUpdates )-------------------------------------------------
// DESCRIPTION: responds to the user checking for updates on their feeds
// URL: /channel/check_for_updates/
var CheckForFeedUpdates = {
	fadeInTimeout: null,
	fadeOutTimeout: null,
	init : function()
		{
		var c = CheckForFeedUpdates;
		if (!document.getElementById) return false;
		if (!document.getElementById('check-for-updates')) return false;	
		addEventToObject(document.getElementById('check-for-updates'),'onclick',c.click);
		var aWaitingImages = new Array('/img/bg-wait.gif','/img/bg-wait.png','/img/wait.gif');
		preloadImages(aWaitingImages);
		},
	click : function(ev)
		{
		var c = CheckForFeedUpdates;
		if (document.getElementById('wait-outer')) return false;
		var oDiv = document.createElement('div');
		oDiv.setAttribute('id','wait-outer');
		oDiv.innerHTML = '<div id="wait-inner"><img alt="Please wait. This might take a few minutes..." src="/img/wait.gif" width="90" height="90" title="Click to hide this message" /></div>';
		oDiv.style.KHTMLOpacity = 0; // Safari<1.2, Konqueror
		oDiv.style.MozOpacity = 0; // Older Mozilla and Firefox
		oDiv.style.opacity = 0; // Safari 1.2, newer Firefox and Mozilla, CSS3
		oDiv.style.filter = 'alpha(opacity:0)'; // IE/Win
		oDiv.fadeCount = 0;
		oBody = document.getElementsByTagName('body')[0];
		oBody.appendChild(oDiv);
		var oWrap = document.getElementById('wrap');
		oWrap.fadeCount = 100;
		if (!ev) ev = window.event;
		var eventElement = (window.event) ? window.event.srcElement : ev.target;
		while (eventElement.nodeName.toLowerCase() != 'a') {eventElement = eventElement.parentNode;}
		var sHref = eventElement.href;
		c.fadeIn(oDiv,sHref);
		c.fadeOut(oWrap);
		addEventToObject(document.getElementById('wait-inner'),'onclick',c.remove);
		//ajaxRequest2(eventElement.href,c.clickReqChange,'CheckForFeedUpdates-click');
		stopDefaultAction(ev);
		return false;
		},
	clickReqChange : function(req)
		{
		if (req.readyState == 4)
			{
			location.href = location.href;
			}
		},
	fadeIn : function(obj,sHref)
		{
		var c = CheckForFeedUpdates;
		if (obj.fadeCount >= 100)
			{
			clearTimeout(c.fadeInTimeout);
			setTimeout(function(){location.href=sHref},3000);
			}
		else
			{
			obj.fadeCount += 20;
			if (obj.fadeCount <= 100)
				{
				var opac = ((obj.fadeCount/100) > 0.999) ? 0.999 : (obj.fadeCount/100);
				obj.style.KHTMLOpacity = opac; // Safari<1.2, Konqueror
				obj.style.MozOpacity = opac; // Older Mozilla and Firefox
				obj.style.opacity = opac; // Safari 1.2, newer Firefox and Mozilla, CSS3
				obj.style.filter = 'alpha(opacity:'+obj.fadeCount+')'; // IE/Win
				}
			c.fadeInTimeout = setTimeout(function(){c.fadeIn(obj,sHref)},10);
			}
		},
	fadeOut : function(obj)
		{
		var c = CheckForFeedUpdates;
		if (obj.fadeCount <= 40)
			{
			clearTimeout(c.fadeOutTimeout);
			}
		else
			{
			obj.fadeCount -= 20;
			if (obj.fadeCount <= 100)
				{
				var opac = ((obj.fadeCount/100) > 0.999) ? 0.999 : (obj.fadeCount/100);
				obj.style.KHTMLOpacity = opac; // Safari<1.2, Konqueror
				obj.style.MozOpacity = opac; // Older Mozilla and Firefox
				obj.style.opacity = opac; // Safari 1.2, newer Firefox and Mozilla, CSS3
				//obj.style.filter = 'alpha(opacity:'+obj.fadeCount+')'; // IE/Win
				}
			c.fadeOutTimeout = setTimeout(function(){c.fadeOut(obj)},10);
			}
		},
	remove : function()
		{
		//var c = CheckForFeedUpdates;
		//ajaxReqs['CheckForFeedUpdates-click'].abort();
		removeElement(document.getElementById('wait-outer'));
		var oWrap = document.getElementById('wrap');
		oWrap.style.KHTMLOpacity = 1; // Safari<1.2, Konqueror
		oWrap.style.MozOpacity = 0.999; // Older Mozilla and Firefox
		oWrap.style.opacity = 1; // Safari 1.2, newer Firefox and Mozilla, CSS3
		oWrap.style.filter = 'alpha(opacity:100)'; // IE/Win
		}
	};
//-----( END )-------------------------------------------------


//-----( @AudioAction )---------------------------------------------
var AudioActionLastNav = null;
var AudioAction = {
	init : function()
		{
		if (!document.getElementById) return false;
		var nav = document.getElementById('actn-nav');
		if (!nav) return false;
		var nodes = nav.childNodes;
		var len = nodes.length;
		for (var i = 0; i < len; i++) {
			var link = nodes[i].firstChild;
			if (link && /-nav/.test(link.id) && !/delete/.test(link.id)) {
				addEventToObject(link,'onclick',AudioAction.click);
				}
			}
		},
	click : function(ev)
		{
		if (!ev) ev = window.event;
		var target = (window.event) ? window.event.srcElement : ev.target;
		if (!document.getElementById) return false;
		var forms = document.getElementById('actn-forms');
		var nodes = forms.childNodes;
		var len = nodes.length;
		for (var i = 0; i < len; i++) {
			if (/-box/.test(nodes[i].id)) {
				if (nodes[i].id.slice(0,-4) == target.id.slice(0,-4)) {
					if (nodes[i].style.display == 'none') {
						nodes[i].style.display = 'block';
						target.className = 'selected';
						if (AudioActionLastNav && AudioActionLastNav != target) { AudioActionLastNav.className = 'deselected'; }
						AudioActionLastNav = target;
						}
					else {
						nodes[i].style.display = 'none';
						target.className = 'deselected';
						}
					}
				else {
					if (nodes[i].style.display == 'block') { 
						nodes[i].style.display = 'none';
						}
					}
				}
			}
			stopDefaultAction(ev);
			return false;
		}
	};
//-----( END )-------------------------------------------------


//-----( @Comment )-------------------------------------------------
// DESCRIPTION: these functions let users add comments using ajax, so they appear instantly
var Comment = {
	init : function()
		{
		if (!document.getElementById) return false;
		if (!document.getElementsByTagName) return false;
		if (!setTimeout) return false;
		if (!document.getElementById('cmnt-form')) return false;	
		var formForm = document.getElementById('cmnt-form');
		var formTextarea = document.getElementById('cmnt-textarea');
		var formSubmit = document.getElementById('cmnt-submit');
		addEventToObject(formForm,'onsubmit',Comment.addSubmit);
		},
	addSubmit : function(ev)
		{
		var formDiv = document.getElementById('audio-comment-box');
		//formDiv.style.display = 'none';
		var formAction = document.getElementById('cmnt-form').action;
		var formTextareaValue = escape(document.getElementById('cmnt-textarea').value);
		var formAudioCommentValue = escape(document.getElementById('cmnt-audio-id').value);
		var oNoCmnts = document.getElementById('no-cmnts');
		var sInner = (oNoCmnts) ? '' : document.getElementById('cmnt-list').innerHTML;
		window.scrollBy(0, 10000);
		var sAdding = '<li id="adding-cmnt"><p>Adding your comment. Please wait a moment...</p></li>';
		document.getElementById('cmnts').style.display = 'block';
		document.getElementById('cmnt-list').innerHTML = sInner+sAdding;
		var newDate = new Date();
		var uniqueId = newDate.getTime();
		cycleThroughClassNames(uniqueId,document.getElementById('adding-cmnt'),'add-cmnt-fade',23,23);
		setTimeout(function(){ajaxRequest(formAction+'ajax/?comment[audio_id]='+formAudioCommentValue+'&comment[body]='+formTextareaValue,Comment.addReqChange)},1000);
		stopDefaultAction(ev);
		return false;
		},
	addReqChange : function(req)
		{
		if (req.readyState == 4)
			{
			document.getElementById('cmnt-list').innerHTML = req.responseText;
			var iListCount = document.getElementById('cmnt-list').getElementsByTagName('li');
			var oCmntNum2 = document.getElementById('cmnt-num-2');
			if (iListCount) {
				oCmntNum2.innerHTML = '(' + iListCount.length + ')';
				oCmntNum2.style.display = 'inline';
			}
			document.getElementById('cmnt-textarea').value2 = document.getElementById('cmnt-textarea').value;
			document.getElementById('cmnt-textarea').value = '';
			Comment.hilightNew(document.getElementById('cmnt-textarea'));
			}
		},
	hilightNew : function(textarea)
		{
		var pars = document.getElementById('cmnt-list').getElementsByTagName('p');
		for (var i=0;i<pars.length;i++)
			{
			if (/cmnt-cmnt/.test(pars[i].className))
				{
				if (pars[i].innerHTML == textarea.value2 || pars[i].innerHTML == textarea.value2.toLowerCase())
					{
					var newDate = new Date();
					var uniqueId = newDate.getTime();
					cycleThroughClassNames(uniqueId,pars[i].parentNode,'add-cmnt-fade',23,23);
					}
				}
			}
		}
	};
//-----( END )-------------------------------------------------


//-----( @ShareAudioBox )-------------------------------------------------
// DESCRIPTION: sets the value for the "share with a friend" box on various user events
var ShareAudioBox = {
	init : function()
		{
		var oSBox = document.getElementById('shareaudio-input');
		if (oSBox)
			{
			addEventToObject(oSBox,'onclick',ShareAudioBox.click);
			addEventToObject(oSBox,'onblur',ShareAudioBox.blur);
			}
		},
	click : function()
		{
		var oSBox = document.getElementById('shareaudio-input');
		if (oSBox.value == 'Email Address')
			{
			oSBox.value = '';
			}
	  	},
	blur : function()
		{
		var oSBox = document.getElementById('shareaudio-input');
		if (oSBox.value == '' || oSBox.value == ' ') {oSBox.value = 'Email Address';}
		}
	};
	
//-----( END )-------------------------------------------------


//-----( @ShareAudioSidebar )-------------------------------------------------
// DESCRIPTION: displays hidden form elements for share audio sidebar
var ShareAudioSidebar = {		
	init : function()
		{
		var oSASidebar = document.getElementById('share-form');
		if (oSASidebar)
			{
			addEventToObject(oSASidebar,'onclick',ShareAudioSidebar.click);
			}
		},
	click : function()
		{
		document.getElementById('contact-list-long').style.display='inline';
		document.getElementById('post_notes').style.display='inline';	
		document.getElementById('email-inst').style.display='inline';			
		document.getElementById('display-all').style.display='none';
		}	
};
//-----( END )-------------------------------------------------

//-----( @CommentRecordLink )-------------------------------------------------
// DESCRIPTION: displays recorder for audio comments
var CommentRecordLink = {		
	init : function()
		{
		var oCrcdlink = document.getElementById('cmnt-rcrd-link');
		if (oCrcdlink)
			{
			addEventToObject(oCrcdlink,'onclick',CommentRecordLink.click);
			}
		},
	click : function()
		{
			document.getElementById('cmnt-rcrd-link').style.display='none';
			document.getElementById('cmnt-rcrd').style.display='inline';
		}	
};
//-----( END )-------------------------------------------------



//-----( @Tag )-------------------------------------------------
// DESCRIPTION: these functions add and remove tags from a show or channel
var Tag = {
	addInit : function()
		{
		if (!document.getElementById) return false;
		if (!document.getElementsByTagName) return false;
		if (!setTimeout) return false;
		if (!document.getElementById('tag-list')) return false;
		if (!document.getElementById('tag-list-form')) return false;	
		var tagList = document.getElementById('tag-list');
		var formForm = document.getElementById('tag-list-form');
		var formInput = document.getElementById('tag-list-input');
		var formSubmit = document.getElementById('tag-list-submit');
		formInput.setAttribute('autocomplete','off');
		addEventToObject(formForm,'onsubmit',Tag.addSubmit);
		addEventToObject(formInput,'onfocus',Tag.focus);
		addEventToObject(formInput,'onblur',Tag.blur);
		},
	addSubmit : function(ev)
		{
		var formAction = document.getElementById('tag-list-form').action;
		var formInputValue = document.getElementById('tag-list-input').value;
		ajaxRequest(formAction+'ajax/?tag='+formInputValue,Tag.addReqChange);
		stopDefaultAction(ev);
		return false;
		},
	addReqChange : function(req)
		{
		if (req.readyState == 4)
			{
			document.getElementById('tag-list').innerHTML = req.responseText;
			Tag.hilightNew(document.getElementById('tag-list-input').value);
			document.getElementById('tag-list-input').value = '';
			Tag.delInit();
			if (typeof tagList != 'undefined') tagList.init();
			}
		},
	focus : function()
		{
		if (document.getElementById('tag-list-input').value == 'Add tags')
			{
			document.getElementById('tag-list-input').value = '';
			}
		},
	blur : function()
		{
		if (document.getElementById('tag-list-input').value == '' || document.getElementById('tag-list-input').value == ' ')
			{
			document.getElementById('tag-list-input').value = 'Add tags';
			}
		},
	hilightNew : function(input)
		{
		var ahrefs = document.getElementById('tag-list').getElementsByTagName('a');
		var tagArray = input.split(' ');
		for (var i=0;i<ahrefs.length;i++)
			{
			if (!/delete/.test(ahrefs[i].className))
				{
				for (var j=0;j<tagArray.length;j++)
					{
					if (ahrefs[i].innerHTML == tagArray[j] || ahrefs[i].innerHTML == tagArray[j].toLowerCase())
						{
						var newDate = new Date();
						var uniqueId = newDate.getTime();
						cycleThroughClassNames(uniqueId,ahrefs[i],'narrow add-tag-fade',23,23);
						}
					}
				}
			}
		},
	delInit : function()
		{
		if (!document.getElementById) return false;
		if (!document.getElementsByTagName) return false;
		if (!document.getElementById('tag-list')) return false;
		var ahrefs = document.getElementById('tag-list').getElementsByTagName('a');
		for (var i=0;i<ahrefs.length;i++)
			{
			if (/delete/.test(ahrefs[i].className)) {addEventToObject(ahrefs[i],'onclick',Tag.delClick);}
			}
		},
	delClick : function(ev)
		{
		if (!ev) ev = window.event;
		var eventElement = (window.event) ? window.event.srcElement : ev.target;    
		while (eventElement.nodeName.toLowerCase() != 'a') {eventElement = eventElement.parentNode;}
		var tagLink = eventElement.previousSibling.previousSibling;
		tagLink.style.backgroundColor = '#FFFFE8';
		var listItem = tagLink.parentNode;
		listItem.fadeCount = 110;
		var newDate = new Date();
		var uniqueId = newDate.getTime();
		Tag.delFade(uniqueId,listItem);
		var temp = eventElement.href;
		var pos = temp.indexOf('?');
		var temp1 = temp.substring(0,pos);
		var temp2 = temp.substring(pos);
		temp = temp1+'ajax/'+temp2;
		ajaxRequest(temp);
		stopDefaultAction(ev);
		return false;
		},
	delFade : function(id,obj)
		{
		if (obj.fadeCount <= 0)
			{
			obj.style.display = 'none';
			clearTimeout(timeouts[id]);
			}
		else
			{
			obj.fadeCount -= 10;
			if (obj.fadeCount <= 100)
				{
				var opac = ((obj.fadeCount/100) > 0.999) ? 0.999 : (obj.fadeCount/100);
				obj.style.KHTMLOpacity = opac; // Safari<1.2, Konqueror
				obj.style.MozOpacity = opac; // Older Mozilla and Firefox
				obj.style.opacity = opac; // Safari 1.2, newer Firefox and Mozilla, CSS3
				}
			var delay = (obj.fadeCount == 0.999) ? 1000 : 65;
			timeouts[id] = setTimeout(function(){Tag.delFade(id,obj);},delay);
			}
		}
	};
//-----( END )-------------------------------------------------


//-----( @PlayNext )-------------------------------------------------
// DESCRIPTION: for going to next url and scan and stuff
function scan() {
//	if (scan_mode && scan_mode=="on") location.href = next_url;
}

function setScan(i) {
	if (i.src.indexOf("scan_on") > -1) toggleScan("off");
	else toggleScan("on");
}

function toggleScan(v) {
	document.getElementById("scan_tog").src = "/img/scan_"+v+".gif"
	scan_mode = v
	setCookie("scan_time", document.getElementById("scan_time").value, 1000, "/", "", "");
	setCookie("scan_mode", scan_mode, 1000, "/", "", "");	
}

function blogOpen(audio_id) {
	f = document.getElementById('blog_this_frame');
	f.style.display='inline';
}

//-----( END )-------------------------------------------------
addEventToObject(window,'onload',AudioAction.init);
addEventToObject(window,'onload',CheckForFeedUpdates.init);
addEventToObject(window,'onload',Comment.init);
addEventToObject(window,'onload',ShareAudioBox.init);
addEventToObject(window,'onload',ShareAudioSidebar.init);
addEventToObject(window,'onload',CommentRecordLink.init);
addEventToObject(window,'onload',Tag.addInit);
addEventToObject(window,'onload',Tag.delInit);
