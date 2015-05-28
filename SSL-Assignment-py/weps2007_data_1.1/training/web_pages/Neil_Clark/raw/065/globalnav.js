/* Copyright (c) 2006 Adobe Systems Inc. $Revision: 1.60 $ */
function initMembership() {
if(!$("globalnav") && !$('user-menu') && window.location.hostname.indexOf('adobe.com') == -1) return;
var membershipElements = {
'greeting': $('greeting'),
'screen_name': $('screenName'),
'account_link': $('account'),
'signout': $('signout')
}
for (var prop in membershipElements) {
if (membershipElements[prop] == null) return;
}
function showScreenName () {
var name = getCookie('SCREENNAME');
if (name != null && (name != '' || name != 'undefined')) {
membershipElements['screen_name'].innerHTML = name;
}
}
var authLevel = 0;
authLevel = (getCookie('RMID') != null) ? 1 : authLevel;
authLevel = (getCookie('AUID') != null) ? 2 : authLevel;
var listitem = ((browser.ua.indexOf('mac') != -1) && (browser.appN.indexOf('microsoft') != -1)) ? 'inline-block' : 'block';
switch (authLevel) {
case 0:
membershipElements.greeting.style.display = 'none';
membershipElements.account_link.style.display = listitem;
break;
case 1:
showScreenName();
membershipElements.greeting.style.display = listitem;
break;
case 2:
showScreenName();
membershipElements.greeting.style.display = listitem;
membershipElements.signout.style.display = listitem;
break;
default: break;
}
}
browser = browser || new BrowserDescription();
if ((!window.opera && browser.ua.indexOf('netscape6') == -1) || (window.opera && browser.appV >= 7)) { 
registerOnReady(initMembership);
}
