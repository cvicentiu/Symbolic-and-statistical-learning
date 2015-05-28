//-----( Global functions )-------------------------------------------------
//event handler
function addEventToObject(obj,evt,func) {
	var oldhandler = obj[evt];
	obj[evt] = (typeof obj[evt] != 'function') ? func : function(ev){oldhandler(ev);func(ev);};
}

// preload images
function preloadImages(imageArray) {
	var tempImages = new Array();
	for(var i=0;i<imageArray.length;i++){tempImages[i] = new Image();tempImages[i].src = imageArray[i];}
}

// stop default action of an event
function stopDefaultAction(ev) {
	if (!ev) ev = window.event;
	(ev.stopPropagation) ? ev.stopPropagation() : ev.cancelBubble = true;
	(ev.preventDefault) ? ev.preventDefault() : ev.returnValue = false;
	return false;
}

// start an ajax request
function ajaxRequest(url,func,obj) {
	if (window.XMLHttpRequest) {var req = new XMLHttpRequest();}
	else if (window.ActiveXObject) {try {req = new ActiveXObject("Msxml2.XMLHTTP");}catch(e) {req = new ActiveXObject("Microsoft.XMLHTTP");}}
	if (func) {req.onreadystatechange = function() {func(req,obj);}}
	req.open('GET',url,true);
	req.setRequestHeader('X-Requested-With','XMLHttpRequest');
	req.setRequestHeader('If-Modified-Since','Wed, 15 Nov 1995 00:00:00 GMT');
	req.send(null);
	return false;
}

// cycle through a list of class names (usually used for css-fades)
function cycleThroughClassNames(id,obj,objClass,start,i) {
	if (i > 0) {obj.className = objClass+i;i--;timeouts[id] = setTimeout(function(){cycleThroughClassNames(id,obj,objClass,start,i)},90);}
	else {clearTimeout(timeouts[id]);}
}

// remove an element
function removeElement(el) {       
	if (el.parentNode){el.parentNode.removeChild(el);}
}

// insert content after an existing element
function insertAfter(newElement,existingElement) {
	var parentElement = existingElement.parentNode;
	if(parentElement.lastChild == existingElement){return parentElement.appendChild(newElement);}
	else{return parentElement.insertBefore(newElement,existingElement.nextSibling);}
}

// retrieve a cookie
function getCookie( name ) {
  var start = document.cookie.indexOf( name + "=" );
  var len = start + name.length + 1;
  if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
    return null;
  }
  if ( start == -1 ) return null;
  var end = document.cookie.indexOf( ";", len );
  if ( end == -1 ) end = document.cookie.length;
  return unescape( document.cookie.substring( len, end ) );
}

// set a cookie
function setCookie( name, value, expires, path, domain, secure ) {
  var today = new Date();
  today.setTime( today.getTime() );
  if ( expires ) {
    expires = expires * 1000 * 60 * 60 * 24;
  }
  var expires_date = new Date( today.getTime() + (expires) );
  document.cookie = name+"="+escape( value ) +
    ( ( expires ) ? ";expires="+expires_date.toGMTString() : "" ) + //expires.toGMTString()
    ( ( path ) ? ";path=" + path : "" ) +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
}

function hover(img, whichway) {
	if (whichway == "over") img.src = img.src.substring(0, img.src.length-4) + "-over" + img.src.substring(img.src.length-4)
	else if (img.src.indexOf("over") != -1) img.src = img.src.substring(0, img.src.length-9) + img.src.substring(img.src.length-4)	
}

function getContentsViaAjax(url, obj) {
	ajaxRequest(url, getContentsReq, obj);
}

function getContentsReq(req, obj) {
	if (req.readyState == 4) {
		obj.innerHTML = req.responseText;
		if (document.getElementById("user-name")) document.getElementById("user-name").focus();
	}
}

function signOver(revert) {
	fadeBackground(revert);
	if (!revert) {
		var oDiv = document.createElement('div');
		oDiv.setAttribute('id','signup');
		oBody = document.getElementById('wrap');
		oBody.appendChild(oDiv);
		getContentsViaAjax('/account/signup_over', document.getElementById('signup'));
	} else {
		oDiv = document.getElementById("signup")
		document.getElementById('wrap').removeChild(oDiv)
	}
	
}


function fadeBackground(revert) {
	op = 0.3
	if (revert) op = 1;
	oDiv = document.getElementById("fader");
	oDiv.style.KHTMLOpacity = op; // Safari<1.2, Konqueror
	oDiv.style.MozOpacity = op; // Older Mozilla and Firefox
	oDiv.style.opacity = op; // Safari 1.2, newer Firefox and Mozilla, CSS3
	op = op*100
	document.getElementById("main").style.filter = "alpha(opacity:" + op +")"; // IE/Win
	document.getElementById("header").style.filter = "alpha(opacity:" + op +")"; // IE/Win
	if (document.getElementById("head-ad")) document.getElementById("head-ad").style.visibility = "hidden"; 
}


//-----( END )-------------------------------------------------


//-----( Global variables )-------------------------------------------------
// DESCRIPTION: global variables for the bubbles and fades
var timeouts = {};
var bubbleImages = new Array('/img/bg-bubble-pink-top.png','/img/bg-bubble-pink-btm.png','/img/bg-bubble-pink-top.gif','/img/bg-bubble-pink-btm.gif','/img/bg-bubble2-pink-top.png','/img/bg-bubble2-pink-btm.png','/img/bg-bubble2-pink-top.gif','/img/bg-bubble2-pink-btm.gif');
preloadImages(bubbleImages);
var loginImages = new Array('/img/bg-login-blue-top.png','/img/bg-login-blue-btm.png','/img/bg-login-blue-top.gif','/img/bg-login-blue-btm.gif','/img/btn-cancel.gif','/img/btn-cancel-hov.gif');
preloadImages(loginImages);
var buttonImages = new Array('/img/btn-queue-add-hov.gif','/img/btn-queue-remove-hov.gif','/img/btn-subs-add-hov.gif' ,'/img/btn-subs-remove-hov.gif');
preloadImages(buttonImages);
//-----( END )-------------------------------------------------


//-----( @EscapeReset )-------------------------------------------------
// DESCRIPTION: when the user presses the escape key these functions kick in
var EscapeReset = {
	init : function()
		{
		addEventToObject(document,'onkeydown',EscapeReset.keydown);
		},
	keydown : function(ev)
		{
		if (!ev) ev = window.event;
		if (ev.keyCode && ev.keyCode == 27)
			{
			var oTagBox = document.getElementById('tag-list-input');
			if (oTagBox) {oTagBox.value = 'Add tags';}
			var oShareBox = document.getElementById('shareaudio-input');
			if (oShareBox) {oShareBox.value = 'Email Address';}
			return false;
			}
		}  
	};
//-----( END )-------------------------------------------------


//-----( @FormSubmit )-------------------------------------------------
// DUNSTAN SAYS: THIS NEEDS TO BE COMPLETED
// DESCRIPTION: strips off the x and y co-ordinates from forms submitted using a grapical button
var FormSubmit = {
	init: function()
		{
		if (!document.getElementsByTagName) return false;
		var forms = document.getElementsByTagName('form');
		for (var i=0;i<forms.length;i++)
			{
			addEventToObject(forms[i],'onsubmit',FormSubmit.submit);
			}
		},
	submit: function(ev)
		{
		if (!ev) ev = window.event;
		var eventElement = (window.event) ? window.event.srcElement : ev.target;
		
		}
	};
//-----( END )-------------------------------------------------


//-----( @FormButton )-------------------------------------------------
// DESCRIPTION: does image-swaps for form buttons
var FormButton = {
	init : function()
		{
		if (!document.getElementById) return false;
		if (!document.getElementsByTagName) return false;
		var inputs = document.getElementsByTagName('input');
		for (var i=0;i<inputs.length;i++)
			{
			if (inputs[i].type == 'image') 	
		  		{                                                 
				FormButton.events(inputs[i]);
				}
			}
		var imgs = document.getElementsByTagName('img');
		for (i=0;i<imgs.length;i++)
			{
			if (/hover-button/.test(imgs[i].className))
				{                                             
				FormButton.events(imgs[i]);
				}
			}
		},
	events : function(obj)
		{
		addEventToObject(obj,'onmouseover',FormButton.hover);
		addEventToObject(obj,'onclick',FormButton.click);
		addEventToObject(obj,'onmouseout',FormButton.out);
		},
	hover: function(ev)
		{
		if (!ev) ev = window.event;
		var eventElement = (window.event) ? window.event.srcElement : ev.target;
		if (!/-hov.gif/.test(eventElement.src)) {eventElement.src = eventElement.src.replace(/.gif/,'-hov.gif');}
		},
	click : function(ev)
		{
		if (!ev) ev = window.event;
		var eventElement = (window.event) ? window.event.srcElement : ev.target;
		if (/-hov.gif/.test(eventElement.src)) {eventElement.src = eventElement.src.replace(/-hov.gif/,'.gif');}
		},
	out : function(ev)
		{
		if (!ev) ev = window.event;
		var eventElement = (window.event) ? window.event.srcElement : ev.target;
		eventElement.src = eventElement.src.replace(/-hov.gif/,'.gif');
		}
	};
//-----( END )-------------------------------------------------


//-----( @Loginout )-------------------------------------------------
// DESCRIPTION: when the user clicks on the loginout link in the header
var Loginout = {
	bSeeMe: 0,
	init : function()
		{
		var l = Loginout;
		if (!document.getElementById) return false;
		var oLoginout = document.getElementById('head-loginout');
		var oBox = document.getElementById('head-loginout-box');
		if (!oLoginout) return false;
		if (!oBox) return false;
		if (navigator.userAgent.toLowerCase().indexOf('opera') != -1) return false; // opera fails to change the css correctly
		if (oLoginout.href.indexOf('in') != -1)
			{
			addEventToObject(oLoginout,'onclick',l.click);
			}
			
		var oPBox = document.getElementById('head-user-password');
		if (oPBox)
			{
			addEventToObject(oPBox,'onkeydown',Loginout.submit);
			}
		},
	submit : function(ev)
		{
			if (!ev) ev = window.event;
			if (ev.keyCode && ev.keyCode == 13)
				{
					var oForm = document.getElementById('head-loginout-form');
					if (oForm) { oForm.submit(); }
					return true;
				}
		},
	click : function(ev)
		{
		var l = Loginout;
		if (!ev) ev = window.event;
		(l.bSeeMe == 0) ? l.show() : l.hide();
		stopDefaultAction(ev);
		return false;
		},
	show : function()
		{
		var l = Loginout;
		var oCancel = document.getElementById('head-user-cancel');
		if (!oCancel)
			{
			oCancel = document.createElement('img');
			oCancel.setAttribute('src','/img/btn-cancel.gif');
			oCancel.setAttribute('id','head-user-cancel');
			oCancel.setAttribute('class','hover-button');
			var oSubmit = document.getElementById('head-user-submit');
			if (oSubmit) {insertAfter(oCancel,oSubmit);}
			addEventToObject(oCancel,'onclick',l.hide);
			FormButton.events(oCancel);
			}
		if (document.getElementById("head-ad")) document.getElementById("head-ad").style.visibility = "hidden"; 
		var oBox = document.getElementById('head-loginout-box');
		oBox.style.bottom = '-'+(oBox.offsetHeight + 4)+'px';
		oBox.style.visibility = 'visible';
		var oName = document.getElementById('head-user-name');
		if (oName) {oName.focus();}
		l.bSeeMe = 1;
		},
	hide : function()
		{
		var l = Loginout;
		document.getElementById('head-loginout-box').style.visibility = 'hidden';
		l.bSeeMe = 0;
		}
	};
//-----( END )-------------------------------------------------


//-----( @Userbox )-------------------------------------------------
// DESCRIPTION: when the user clicks on the loginout link in the header
var Userbox = {
	bSeeMe: 0,
	init : function()
		{
		var u = Userbox;
		if (!document.getElementById) return false;
		var oUsername = document.getElementById('head-user');
		var oBox = document.getElementById('head-user-box');
		if (!oUsername) return false;
		if (!oBox) return false;
		if (navigator.userAgent.toLowerCase().indexOf('opera') != -1) return false; // opera fails to change the css correctly
		addEventToObject(oUsername,'onclick',u.click);
		},
	click : function(ev)
		{
		var u = Userbox;
		if (!ev) ev = window.event;
		(u.bSeeMe == 0) ? u.show() : u.hide();
		stopDefaultAction(ev);
		return false;
		},
	show : function()
		{
		var u = Userbox;
		var oBox = document.getElementById('head-user-box');
		oBox.style.bottom = '-'+(oBox.offsetHeight + 4)+'px';
		oBox.style.visibility = 'visible';
		u.bSeeMe = 1;
		},
	hide : function()
		{
		var u = Userbox;
		document.getElementById('head-user-box').style.visibility = 'hidden';
		u.bSeeMe = 0;
		}
	};
//-----( END )-------------------------------------------------


//-----( @Searchbox )-------------------------------------------------
// DESCRIPTION: sets the value for the search box on various user events
var Searchbox = {
	init : function()
		{
		var oSBox = document.getElementById('search-input');
		if (oSBox)
			{
			addEventToObject(oSBox,'onclick',Searchbox.click);
			}	
		},
	click : function()
		{
		var oSBox = document.getElementById('search-input');
		if (oSBox.value == 'Search Odeo')
			{
			oSBox.value = '';
			}
	  	}
	};
//-----( END )-------------------------------------------------


//-----( @scroll )-------------------------------------------------
// DESCRIPTION: smoothly scrolls between in-page links
// URL EG: /help/faq/
var SmoothScroll = {
	interval: null,
	init : function()
		{
		var s = SmoothScroll;
		if (!document.getElementById) return true;
		if (!document.getElementsByTagName) return true;
		var hrefs = document.getElementsByTagName('a');
		for (var i=0;i<hrefs.length;i++)
			{
			var oLink = hrefs[i];
			if ((oLink.href && oLink.href.indexOf('#') != -1) && ( (oLink.pathname == location.pathname) || ('/'+oLink.pathname == location.pathname) ) && (oLink.search == location.search))
				{
				addEventToObject(oLink,'onclick',s.click);
				}
			}
		},
	click : function(ev)
		{
		var s = SmoothScroll;
		if (!ev) ev = window.event;
		var eventElement = (window.event) ? window.event.srcElement : ev.target;
		while (eventElement.nodeName.toLowerCase() != 'a') {eventElement = eventElement.parentNode;}
		var sAnchor = eventElement.hash.substr(1);
		var oDest = document.getElementById(sAnchor);
		if (!oDest) return true;
		var iDestY = oDest.offsetTop;
		var iDestX = oDest.offsetLeft;
		// IE fix
		var oThisNode = oDest;
		while (oThisNode.offsetParent && (oThisNode.offsetParent != document.body)) 
			{
			oThisNode = oThisNode.offsetParent;
			iDestY += oThisNode.offsetTop;
			iDestX += oThisNode.offsetLeft;
			}
		clearInterval(s.interval);
		var iCurrentY = s.calcY();
		var iStepSize = parseInt((iDestY - iCurrentY)/15);
		s.interval = setInterval(function(){s.scroll(iStepSize,iDestY,sAnchor)},10);
		stopDefaultAction(ev);
		return false;
		},
	calcY : function()
		{
		if (document.body && document.body.scrollTop) {return document.body.scrollTop;} // ie5 and ie5.5
		if (document.documentElement && document.documentElement.scrollTop) {return document.documentElement.scrollTop;} // ie6
		if (window.pageYOffset) {return window.pageYOffset;} // netscape etc
		return 0;
		},
	scroll : function(iStepSize,iDestY,sAnchor)
		{
		var s = SmoothScroll;
		var iStartY = s.calcY();
		var bIsAbove = (iStartY < iDestY);
		window.scrollTo(0,iStartY + iStepSize);
		var iNowY = s.calcY();
		var bIsAboveNow = (iNowY < iDestY);
		if ((bIsAbove != bIsAboveNow) || (iStartY == iNowY))
			{
			window.scrollTo(0,iDestY);
			clearInterval(s.interval);
			var newDate = new Date();
			var uniqueHash = newDate.getTime();
			location.hash = uniqueHash;
			s.interval = setTimeout(function(){s.update(sAnchor)},0);
			}
		},
	update : function(sAnchor)
		{
		var s = SmoothScroll;
		location.hash = sAnchor;
		clearTimeout(s.interval);	
		}
	};
//-----( END )-------------------------------------------------

addEventToObject(window,'onload',EscapeReset.init);
addEventToObject(window,'onload',FormButton.init);
addEventToObject(window,'onload',Loginout.init);
addEventToObject(window,'onload',Userbox.init);
addEventToObject(window,'onload',Searchbox.init);
addEventToObject(window,'onload',SmoothScroll.init);