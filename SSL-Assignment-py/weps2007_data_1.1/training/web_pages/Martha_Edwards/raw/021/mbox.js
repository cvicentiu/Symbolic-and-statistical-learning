

var mboxCopyright = "Copyright 2003-2005 Offermatica Corporation. All Rights Reserved. This software is the proprietary information of Offermatica Corporation. Use is subject to license terms.";


if (typeof mboxIncluded == 'undefined') {
 var mboxIncluded = true;
 var mboxVersion = 17;

 var mboxClientCode = 'ideaforestinc';
 var mboxServerURL = 'http://mbox3.offermatica.com/m2/ideaforestinc/mbox/standard';

 var mboxTrafficDuration = 10368000;

 if (typeof mboxPCIdExpireTime == 'undefined') {
 
 
 var mboxPCIdExpireTime = 2 * 365 * 24 * 60 * 60;
 }
 
 
 function mboxCookiePageDomain() {
 var p0 = document.location.host;
 var k1 = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
 if (!k1.exec(document.location.host)) {
 var p2 = /[^\.]+\.[^\.]+$/;
 var q3 = p2.exec(document.location.hostname);
 if (q3) {
 p0 = q3[0];
 }
 }
 return p0;
 }
 var mboxCookies = new mboxCookieManager("mbox", mboxCookiePageDomain());
 
 var mboxSessionIdCookie = "session";
 var mboxPCIdCookie = "PC";
 var mboxDisableCookie = "disable";
 var mboxCheckCookie = "check";
 var mboxDebugModeCookie = "debug";
 var mboxTrafficLevelCookie="level";
 var mboxTrafficStateCookie="traffic";

 var mboxXDomainArg = "mboxXDomain";

 var mboxNameArg = "mbox";
 var mboxClientCodeArg = "mboxClient";
 var mboxPCIdArg = "mboxPC";
 var mboxSessionIdArg = "mboxSession";
 var mboxFirstPageInVisitArg = "mboxFirstPageInVisit";
 var mboxPageIdArg = "mboxPage";
 var mboxHostArg = "mboxHost";
 var mboxURLArg = "mboxURL";
 var mboxReferrerArg = "mboxReferrer";
 var mboxVersionArg = "mboxVersion";
 var mboxCountArg = "mboxCount";
 var mboxEnvironmentArg = "envId";
 var mboxMarkerDivPrefix = "mboxMarker-";
 var mboxImportDivPrefix = "mboxImported-";
 var mboxDefaultDivClass = "mboxDefault";
 var mboxSignalPrefix = "signal-";

 var mboxPageId = mboxGenerateId();
 var mboxSessionId = new mboxSession(mboxPageId, mboxSessionIdArg,
 mboxSessionIdCookie, 31 * 60);
 var mboxPCId = new mboxPC(mboxPageId, mboxPCIdCookie, mboxPCIdExpireTime);

 var mboxs = new Object(); 
 var mboxGlobalArguments = "";
 var mboxCount = 0; 
 var mboxSignalCount = 0;

 var mboxCampaignsStateVersion = 0;
 var mboxCampaigns = new Array();

 var mboxEnv = new mboxEnvironment("mboxDisable");

 var pageLoadStartTime = new Date().getTime();
 var pageLoadEndTime = pageLoadStartTime;
 mboxEnv.getSafeBodyOnload().add(
 new Function("pageLoadEndTime = new Date().getTime()"));

 var mboxDebugInfo = new mboxDebug(mboxDebugModeCookie, "mboxDebug", mboxEnv);

 if (mboxEnv.platform.isSupported()) {
 mboxEnv.getSafeBodyOnload().add(mboxCheckAll);

 mboxEnv.limitTraffic(100, 10368000);

 if (mboxEnv.isEnabled()) {
 mboxSignal();
 mboxDefaultContentDisplayNone();
 }
 else {
 
 }
 } 
}



function mboxCreate(v4 ) {
 if (!mboxEnv.platform.isSupported()) {
 return;
 }
 mboxEnv.getSafeBodyOnload().setup();

 var v5 = new Array();
 v5[0] = mboxNameArg + '=' + v4;
 for (var i = 1; i < arguments.length; i++) {
 v5[i] = arguments[i];
 }

 var g6 = new mbox(v4, v5);
 g6.put();
}


function mboxGlobalParameters() {
 for (var z7 = 0; z7 < arguments.length; z7++) {
 if (mboxGlobalArguments != "") {
 mboxGlobalArguments = mboxGlobalArguments + "&";
 } 
 mboxGlobalArguments = mboxGlobalArguments + arguments[z7];
 }
}


function mboxBase(s8, n9) {
 this.id = s8;
 this.url = n9;
 this.timeout = null;
 this.activated = 0;
 this.defaultDiv = null;

 this.offer = new mboxOfferContent();

 this.put = mbox_put;
 this.show = mbox_show;
 this.showContent = mbox_showContent;
 this.hide = mbox_hide;
 this.startTimeout = mbox_startTimeout;
 this.cancelTimeout = mbox_cancelTimeout;
 this.getDefaultDiv = mbox_getDefaultDiv;
 this.activate = mbox_activate;
 this.isActivated = mbox_isActivated;
 this.markerName = mbox_markerName;
 this.importName = mbox_importName;
 this.importDiv = mbox_getImportDiv;
 this.finalize = mbox_finalize;
 this.parameters = mbox_getParams;

 this.activateAction = mbox_show;
 this.setActivateAction = mbox_setActivateAction;
 this.setOffer = mbox_setOffer;

 this.time = new Object();
 this.activateCount = 0;
 this.setEventTime = mbox_setEventTime;


 this.error = null;

 if (mboxs[s8]) {
 this.error = "multiple mboxes with the id '" + s8 + "' exist on this page";
 this.put = mbox_putNothing;
 this.activateAction = mbox_hide;
 }

 mboxs[s8] = this;
}

function mbox(s8, v5) {
 this.base = mboxBase;
 v5[v5.length] = mboxCountArg + "=" + ++mboxCount;
 this.base(s8, mboxBuildURL(v5));
}

function mboxSignalMbox(s8, v5) {
 this.base = mboxBase;
 v5[v5.length] = mboxCountArg + "=" + --mboxSignalCount;
 this.base(s8, mboxBuildURL(v5));
}


function mbox_getParams() {
 return mboxGetParamsFromQueryString(this.url);
}

function mboxGetParamsFromQueryString(url) {
 var parameters = new Object();

 var position = url.indexOf("?");
 if (position == -1 || position == (url.length - 1)) {
 return parameters;
 }

 var queryString = url.substring(position + 1);
 var pairs = queryString.split("&");
 for (var i = 0; i < pairs.length; i++) {
 var pair = pairs[i].split("=");
 if (pair.length < 2 || pair[0] == "" || pair[1] == "") {
 continue;
 } else {
 parameters[pair[0]] = pair[1];
 }
 }

 return parameters;
}


function mbox_put() {
 if (mboxEnv.isEnabled()) {
 this.setEventTime("put.start");
 document.write(
 '<div id="' + this.markerName()
 + '" style="visibility:hidden;display:none">'
 + '<script language="JavaScript">'
 + 'mboxs["' + this.id + '"].startTimeout(15000);'
 + '<' + '\/script>'
 + '<script src="' + this.url + '" language="JavaScript"><'+ '\/script>'
 + '</div>');

 this.setEventTime("put.end");
 }
 else {
 document.write('<div id="' + this.markerName() + '"></div>');
 }
}

function mbox_putNothing() {
 document.write('<div id="' + this.markerName() + '"></div>');
}


function mbox_activate() {
 if (this.activated) {
 return this.activated;
 }
 this.setEventTime('activate' + ++this.activateCount + '.start');

 if (this.activateAction()) {
 this.cancelTimeout();
 this.activated = 1;
 }

 this.setEventTime('activate' + this.activateCount + '.end');
 return this.activated;
}


function mbox_isActivated() {
 return this.activated;
}


function mbox_setActivateAction(q10) {
 this.activateAction = q10;
}


function mbox_setOffer(u11) {
 this.offer = u11;
}


function mbox_show() {
 this.setEventTime('show.start');

 var result = this.offer.show(this);

 this.setEventTime(result == 1 ? "show.end.ok" : "show.end");

 return result;
}


function mbox_showContent(o12) {
 
 if (o12 == null) {
 return 0;
 }

 var j13 = this.getDefaultDiv();

 if (mboxEnv.platform.supportsReplace()) {
 if (j13 != null) {
 j13.parentNode.replaceChild(o12, j13);
 }
 
 
 else {
 var w14 = document.getElementById(this.markerName());

 
 if (w14 == null) {
 return 0;
 }

 mboxMakeDivVisible(w14);
 }
 }
 
 
 else {
 var w14 = document.getElementById(this.markerName());

 
 if (w14 == null) {
 return 0;
 }

 if (j13 != null) {
 mboxMakeDivInvisible(j13);
 }

 mboxMakeDivVisible(w14);
 }

 mboxMakeDivVisible(o12);

 
 
 return 1;
}

function mboxMakeDivVisible(h15) {
 h15.style.visibility = "visible";
 h15.style.display = "block";
}

function mboxMakeDivInvisible(h15) {
 h15.style.visibility = "hidden";
 h15.style.display = "none";
}


function mbox_hide() {
 this.setEventTime('hide.start');

 var w14 = document.getElementById(this.markerName());
 if (w14 != null) {
 w14.style.visibility = "hidden";
 w14.style.display = "none";
 }

 var j13 = this.getDefaultDiv();

 if (j13 != null) {
 j13.style.visibility = "visible";
 j13.style.display = "block";

 this.setEventTime('hide.end.ok');

 return 1;
 }

 this.setEventTime('hide.end.fail');

 return 0;
}


function mbox_finalize() {
 this.setEventTime('finalize.start');

 this.cancelTimeout();

 if (!this.activate()) {
 this.hide();

 this.setEventTime('finalize.end.hide');
 }

 this.setEventTime('finalize.end.ok');
}

function mbox_startTimeout(w16) {
 this.timeout =
 setTimeout('mboxCheckTimeoutById("' + this.id + '")', w16);
}

function mbox_cancelTimeout() {
 if (this.timeout != null) {
 clearTimeout(this.timeout);
 }
}

function mbox_getImportDiv() {
 return document.getElementById(this.importName());
}

function mbox_getDefaultDiv() {
 if (this.defaultDiv != null) {
 return this.defaultDiv;
 }

 var node = document.getElementById(this.markerName());
 while (node != null) {
 
 if ((node.nodeType == 1) && (node.nodeName == "DIV")) {
 if (node.className.indexOf(mboxMarkerDivPrefix) > 0) {
 return null;
 } else if (node.className == mboxDefaultDivClass) {
 this.defaultDiv = node;

 return node;
 }
 }
 node = node.previousSibling;
 }

 return null;
}


function mbox_setActivateAction(action) {
 this.activateAction = action;
}

function mbox_markerName() {
 return mboxMarkerDivPrefix + this.id
}

function mbox_importName() {
 return mboxImportDivPrefix + this.id
}

function mbox_setEventTime(event) {
 this.time[event] = (new Date()).getTime();
}

function mboxOfferContent() {
 this.show = mboxOfferContent_show;
}

function mboxOfferContent_show(o17) {
 var o12 = o17.importDiv();

 return o17.showContent(o12);
}

function mboxOfferDefault() {
 this.show = mboxOfferDefault_show;
}

function mboxOfferDefault_show(o17) {
 return o17.hide();
}


function mboxBuildURL(v5) {
 var l18 = mboxServerURL;

 if (document.location.protocol == "https:") {
 l18 = l18.replace("http:", "https:")
 }
 l18 += "?" + mboxHostArg + "=" + document.location.hostname;

 for (var z7 = 0; z7 < v5.length; z7++) {
 l18 += "&" + v5[z7];
 }

 if (mboxGlobalArguments.length > 0) {
 l18 += "&" + mboxGlobalArguments;
 }

 if (l18.indexOf(mboxSessionIdArg) == -1) {
 l18 += "&" + mboxSessionIdArg + "=" + mboxSessionId.getId();
 }

 if (mboxSessionId.isNew()) {
 l18 += "&" + mboxFirstPageInVisitArg + "=" + true;
 }

 l18 = l18 + "&" + mboxPCIdArg + "=" + mboxPCId.getId()
 + "&" + mboxPageIdArg + "=" + mboxPageId
 
 + "&" + mboxURLArg + "=" + escape(document.location);

 var y19 = escape(document.referrer);
 if (l18.length + y19.length < 2000) {
 l18 += "&" + mboxReferrerArg + "=" + y19
 }

 return l18 + "&" + mboxVersionArg + "=" + mboxVersion;
}


function mboxEnvironment(s20) {
 this.platform = new mboxPlatform();
 this.i21 = null;

 this.i22 = this.platform.isSupported();

 if (mboxGetPageParameter(s20) != null) {
 this.i22 = false;
 }

 
 
 if (!mboxCookies.isEnabled()) {
 this.i22 = false;
 }
 if (mboxCookies.getCookie(mboxDisableCookie) == "true") {
 this.i22 = false;
 }
 

 this.isEnabled = mboxEnvironment_isEnabled;
 this.disable = mboxEnvironment_disable;
 this.enable = mboxEnvironment_enable;
 this.isAdmin = mboxEnvironment_isAdmin;
 this.limitTraffic = mboxEnvironment_limitTraffic;
 this.getSafeBodyOnload = mboxEnvironment_getSafeBodyOnload;

 if (this.isAdmin()) {
 this.enable();
 }
}

function mboxEnvironment_isEnabled() {
 return this.i22;
}

function mboxEnvironment_getSafeBodyOnload() {
 if (this.i21 == null) {
 this.i21 = new mboxSafeOnload(window);
 }

 return this.i21;
}

function mboxEnvironment_disable(duration) {
 if (typeof duration == 'undefined') {
 duration = 60 * 60;
 }
 if (!this.isAdmin()) {
 this.i22 = false;
 mboxCookies.setCookie(mboxDisableCookie, "true", duration);
 }
}

function mboxEnvironment_enable() {
 this.i22 = true;
 mboxCookies.deleteCookie(mboxDisableCookie);
}

function mboxEnvironment_isAdmin() {
 return document.location.href.indexOf(mboxEnvironmentArg) != -1;
}

function mboxEnvironment_limitTraffic(level, duration) {
 if (level == 100) {
 return;
 }

 var d23 = mboxCookies.getCookie(mboxTrafficStateCookie);

 if (this.isAdmin()) {
 d23 = true;
 mboxCookies.setCookie(mboxTrafficLevelCookie, level, duration);
 mboxCookies.setCookie(mboxTrafficStateCookie, d23, duration);
 }
 else if (d23 == null || mboxCookies.getCookie(mboxTrafficLevelCookie) != level) {
 d23 = (Math.random() * 100) <= level;
 mboxCookies.setCookie(mboxTrafficLevelCookie, level, duration);
 mboxCookies.setCookie(mboxTrafficStateCookie, d23, duration);
 }

 if (d23) {
 this.enable();
 }
 else {
 this.disable();
 }
}

function mboxCookieManager(w24, p0) {
 this.name = w24;

 if (p0.indexOf(".") == -1) {
 
 p0 = "";
 }

 this.domain = p0 == "" ? "" : "; domain=" + p0;

 this.isEnabled = mboxCookieManager_isEnabled;
 this.getCookie = mboxCookieManager_getCookie;
 this.setCookie = mboxCookieManager_setCookie;
 this.deleteCookie = mboxCookieManager_deleteCookie;
 this.getCookieNames = mboxCookieManager_getCookieNames;
 this.loadCookies = mboxCookieManager_loadCookies;
 this.saveCookies = mboxCookieManager_saveCookies;

 this.loadCookies();
}

function mboxCookieManager_isEnabled() {
 this.setCookie(mboxCheckCookie, "true", 60);
 this.loadCookies()
 return this.getCookie(mboxCheckCookie) == "true";
}



function mboxCookieManager_setCookie(w24, h25, w16) {
 if (typeof w24 != 'undefined' &&
 typeof h25 != 'undefined' &&
 typeof w16 != 'undefined') {

 this.cookies[w24] = {
 name:w24,
 value:escape(h25),
 
 expireOn:Math.ceil(w16 + new Date().getTime() / 1000)
 }
 this.saveCookies();
 }
}

function mboxCookieManager_getCookie(w24) {
 var y26 = this.cookies[w24];
 if (typeof y26 == 'undefined' || y26 == null) {
 return null;
 }
 return unescape(y26.value);
}

function mboxCookieManager_deleteCookie(w24) {
 var g27 = new Object();
 for (y26 in this.cookies) {
 if (y26 != w24) {
 g27[y26] = this.cookies[y26];
 }
 }
 this.cookies = g27;
 this.saveCookies();
}

function mboxCookieManager_getCookieNames(m28) {
 var e29 = new Object();
 for (y26 in this.cookies) {
 if (y26.indexOf(m28) == 0) {
 e29[e29.length] = y26;
 }
 }
 return e29;
}

function mboxCookieManager_loadCookies() {
 this.cookies = new Object();
 var w30 = document.cookie.indexOf(this.name + "=");
 if (w30 != -1) {
 var r31 = document.cookie.indexOf(";", w30);
 if (r31 == -1) {
 r31 = document.cookie.indexOf(",", w30);
 if (r31 == -1) {
 r31 = document.cookie.length;
 }
 }

 var r32 = document.cookie.substring(
 w30 + this.name.length + 1, r31).split("|");

 var n33 = Math.ceil(new Date().getTime() / 1000);
 for (var i = 0; i < r32.length; i++) {
 var y26 = r32[i].split("#");
 if (n33 <= y26[2]) {
 this.cookies[y26[0]] =
 {name:y26[0], value:y26[1], expireOn:y26[2]}
 }
 }
 }
}

function mboxCookieManager_saveCookies() {

 var m34 = new Array();
 var y35 = 0;
 for (y26 in this.cookies) {
 if (this.cookies[y26] != null) {
 m34[m34.length] = this.cookies[y26].name + "#" +
 this.cookies[y26].value + "#" + this.cookies[y26].expireOn;

 if (y35 < this.cookies[y26].expireOn) {
 y35 = this.cookies[y26].expireOn;
 }
 }
 }

 var b36 = new Date(y35 * 1000);
 document.cookie = this.name + "=" + m34.join("|")
 + "; expires=" + b36.toGMTString() + "; path=/" + this.domain;

}

function mboxTimedOut() {
 return mboxCookies.getCookie(mboxDisableCookie) == "true";
}

function mboxCancelTimeoutById(id) {
 mboxActivateById(id);
}

function mboxActivateById(id) {
 mboxs[id].activate();
}

function mboxCheckTimeoutById(id) {
 mboxActivateById(id);

 if (!mboxs[id].isActivated()) {
 mboxEnv.disable();
 
 window.location.reload(false);
 }
}


function mboxCheckAll() {
 for (var mbox in mboxs) {
 mboxs[mbox].finalize();
 }
}


function mboxGetDefaultDiv(v4) {
 return mboxs[v4].getDefaultDiv();
}


function mboxMarkerName(v4) {
 return mboxs[v4].markerName();
}


function mboxImportName(v4) {
 return mboxs[v4].importName();
}


function mboxSetupSignal(b37, v4 ) {
 var v5 = new Array();
 for (var i = 1; i < arguments.length; i++) {
 v5[i-1] = arguments[i];
 }
 mboxCookies.setCookie(mboxSignalPrefix + b37, v5.join("&"), 45 * 60);
}


function mboxSignal() {
 var a38 = mboxCookies.getCookieNames(mboxSignalPrefix);
 for (e39 in a38) {
 var m40 = mboxCookies.getCookie(a38[e39]);
 var v5 = m40.split("&");
 var v4 = v5[0];
 v5[0] = mboxNameArg + '=' + v4;
 var h41 = new mboxSignalMbox(v4, v5);
 h41.put();
 mboxCookies.deleteCookie(a38[e39]);
 }
}


function mboxDefaultContentDisplayNone() {
 document.write("<style>." + mboxDefaultDivClass
 + " { visibility:hidden; }</style>");
}


function mboxArg(p42, h25) {
 return p42 + "=" + escape(h25);
}


function mboxSession(i43, w44, o45, l46) {
 this.idArg = w44;
 this.cookieName = o45;
 this.expireTime = l46;

 this.newSession = false;

 this.id = mboxGetPageParameter(this.idArg);

 if (this.id == null || this.id.length == 0) {
 this.id = mboxCookies.getCookie(mboxSessionIdCookie);
 if (this.id == null || this.id.length == 0) {
 this.id = i43;
 this.newSession = true;
 }
 }

 mboxSetCookie(mboxSessionIdCookie, this.id, l46);

 this.getId = mboxSession_getId;
 this.isNew = mboxSession_isNew;
 this.reset = mboxSession_reset;
 this.forceId = mboxSession_forceId;
}


function mboxSession_getId() {
 return this.id;
}


function mboxSession_isNew() {
 return this.newSession;
}

function mboxSession_reset() {
 this.id = mboxGenerateId();

 mboxCookies.setCookie(this.cookieName, this.id, this.expireTime);
}

function mboxSession_forceId(forcedId, isNewSession) {
 this.id = forcedId;

 
 
 
 
 
 
 if (typeof isNewSession == 'undefined') {
 if (mboxCookies.getCookie(mboxSessionIdCookie) == forcedId) {
 this.newSession = false;
 } else {
 this.newSession = true;
 }
 } else {
 this.newSession = isNewSession;
 }

 mboxCookies.setCookie(this.cookieName, this.id, this.expireTime);
}


function mboxPC(i43, o45, l46) {
 this.cookieName = o45;
 this.expireTime = l46;

 this.id = mboxCookies.getCookie(this.cookieName);

 if (this.id == null || this.id.length == 0) {
 this.id = i43;
 }

 this.getId = mboxPC_getId;
 this.forceId = mboxPC_forceId;
}


function mboxPC_getId() {
 
 mboxCookies.setCookie(mboxPCIdCookie, this.id, this.expireTime);

 return this.id;
}


function mboxPC_forceId(forcedId) {
 if (this.id != forcedId) {
 this.id = forcedId;

 mboxCookies.setCookie(this.cookieName, this.id, this.expireTime);

 return true;
 }

 return false;
}

function mboxGenerateId() {
 return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999);
}

function mboxGetPageParameter(name) {
 var l18 = null;

 var s47 = new RegExp(name + "=([^\&]*)");
 var z48 = s47.exec(document.location);
 if (z48 != null && z48.length >=2) {
 l18 = z48[1];
 }

 return l18;
}

function mboxDisplayDebugInfo() {
 mboxDebugInfo.show();
}

function mboxDebug(w49, y50, d51) {
 this.debugCookie = w49;

 this.isEnabled = mboxDebug_isEnabled;
 this.disable = mboxDebug_disable;
 this.show = mboxDebug_show;
 this.setShowAction = mboxDebug_setShowAction;
 this.action = null;

 var q52 = mboxGetPageParameter(y50);
 if (q52 == null) {
 q52 = mboxCookies.getCookie(this.debugCookie);
 }

 if (q52 != null) {
 if (q52.indexOf("x") == 0) {
 
 this.action = new mboxDebugActionNone();

 document.write('<script language="Javascript1.2" src="'
 + 'http://admin3.offermatica.com/admin/mbox/mbox_debug_' + q52 + '.js'
 + '"><' + '\/script>');
 }
 else if (q52.indexOf("log") == 0) {
 this.action = new mboxDebugActionLog(q52);
 }
 else if (q52 == "reset") {
 q52 = null;
 }
 else {
 this.action = new mboxDebugActionDefault();
 }
 }

 if (this.action != null) {
 if (d51.platform.isSupported()) {
 d51.getSafeBodyOnload().sortedAdd(mboxDisplayDebugInfo,
 d51.getSafeBodyOnload().orderLast);
 }
 else {
 alert("mbox functionality is not supported on this browser");
 mboxDebugInfo.disable();
 }
 }

 if (q52 != null) {
 mboxCookies.setCookie(this.debugCookie, q52, 45 * 60);
 }
 else {
 this.disable()
 }
}

function mboxDebug_isEnabled() {
 return this.action != null;
}


function mboxDebug_disable() {
 mboxCookies.deleteCookie(this.debugCookie);
}

function mboxDebug_setShowAction(q10) {
 this.action = q10;
}

function mboxDebug_show() {
 if (this.action != null) {
 this.action.show();
 }
}

function mboxDebugActionLog(mode) {
 this.mode = mode;
 this.start = (new Date()).getTime();

 this.show = mboxDebugActionLog_show;
}

function mboxDebugActionLog_show() {
 var end = (new Date()).getTime();

 var window = new mboxDebugWindow("Debug Log");

 window.putPageStart();
 window.put("<img src='http://mbox3.offermatica.com/admin/images/spacer.gif"
 + "?mboxDebug=" + this.mode
 + "&mboxClient=" + mboxClientCode
 + "&pageLoadTime=" + (end - this.start)
 + "&mboxCount=" + mboxCount
 + "&mboxSignalCount=" + mboxSignalCount + "'>");

 window.put("<br />");

 window.putCloseButton()
 window.putPageEnd();
}


function mboxDebugActionNone() {
 this.show = mboxDebugActionDefault_show;
}

function mboxDebugActionNone_show() {
 alert("mboxDebugAction not defined");
}

function mboxDebugActionDefault() {
 this.show = mboxDebugActionDefault_show;
}

function mboxDebugActionDefault_show() {
 var window = new mboxDebugWindow("Debug");

 window.putPageStart();
 window.put("  <b>Mbox Debug Window (version:" + mboxVersion + ")</b></br>");

 window.put("<p/>");
 window.put("<b>Page</b>: " + document.location);

 window.put(" <ul>");

 if (mboxEnv.isEnabled()) {
 window.put("  <li>Enabled: true</li>");
 } else {
 window.put(
 '  <li>Enabled: <span style="color:red"><b>false</b></span></li>');
 }

 window.put("  <li>Cookies enabled: " + mboxCookieIsEnabled() + "</li>");
 window.put("  <li>Global arguments: '" + mboxGlobalArguments + "'</li>");
 window.put("  <li>Referring URL: '" + document.referrer + "'</li>");
 window.put("  <li>Page URL: '" + document.location + "'</li>");
 window.put("  <li>Cookies: '" + document.cookie + "'</li>");
 window.put("  <li>Page Id: " + mboxPageId + "</li>");

 for (v4 in mboxs) {
 window.put("  <li>mbox: '" + mboxs[v4].id + "'");
 window.put("   <ul>");

 if (mboxs[v4].error) {
 window.put('   <li><span style="color: red"><b>Error: '
 + mboxs[v4].error + '</b></span></li>');
 }

 var w14 = document.getElementById(mboxMarkerName(mboxs[v4].id));
 if (w14 == null) {
 window.put('    <li><span style="color: red">'
 + '<b>Error: can not find mbox in dom</b></span></li>');
 } else {
 window.put("    <li>has mboxDefault content div tags: "
 + (mboxs[v4].defaultDiv != null) + "</li>");
 }

 window.put('    <li><a href="' + mboxs[v4].url + '">'
 + mboxs[v4].url + '</a></li>');

 window.put("   </ul>");
 window.put("  </li>");
 }

 window.put(" </ul>");

 window.putCloseButton()
 window.putPageEnd();
}

function mboxDebugWindow(name) {
 this.w24 = name + " " + document.location.hostname;

 var u53 = /\W/g;
 var g54 = this.w24.replace(u53, '_');

 this.put = mboxDebugWindow_put;
 this.putCloseButton = mboxDebugWindow_putCloseButton;
 this.putPageStart = mboxDebugWindow_putPageStart;
 this.putPageEnd = mboxDebugWindow_putPageEnd;

 this.window = window.open("", "mboxDebugWindow" + g54,
 "width=600,height=300,resizable,scrollbars=yes,toolbar=yes");

 if (this.window == null) {
 alert("Unable to open Offermatica's mboxDebugWindow Window.\n"
 + "Are you blocking popups?\n");
 return;
 }
}


function mboxDebugWindow_put(j56) {
 if (this.window == null) {
 return;
 }
 this.window.document.writeln(j56);
 this.window.scrollBy(0, 1000);
}

function mboxDebugWindow_putCloseButton() {
 this.put("<a href=\"javascript:mboxDebugWindowClose()\">"
 + "click here to close debug window</a>");
}

function mboxDebugWindow_putPageStart() {
 this.put("<html><head>")
 this.put(" <title>" + this.w24 + "</title>");
 this.put("  <script>");
 this.put("   function mboxDebugWindowOnClose() {");
 this.put("       window.opener.mboxDebugInfo.disable();");
 this.put("   }");
 this.put("   ");
 this.put("   function mboxDebugWindowClose() {");
 this.put("     try {");
 this.put("       window.opener.mboxDebugInfo.disable();");
 this.put("     } catch(e) {");
 this.put("       alert('Could not disable debug mode.\\n'");
 this.put("         + 'Browse to a page containing an mbox and\\n'");
 this.put("         + 'click on close link.');");
 this.put("     }");
 this.put("     window.close();");
 this.put("   }");
 this.put("  </" + "script>");
 this.put(" </head>")
 this.put(" <body onunload='mboxDebugWindowOnClose()'>")
}

function mboxDebugWindow_putPageEnd() {
 this.put("</body></html>");

 this.window.document.close();
}

function mboxSafeOnload(element) {
 this.a57 = new Array()

 this.orderFirst = 0;
 this.orderMiddle = 500;
 this.orderLast = 1000;

 this.add = mboxSafeOnload_add;
 this.sortedAdd = mboxSafeOnload_sortedAdd;
 this.setup = mboxSafeOnload_setup;
 this.action = mboxSafeOnload_action;
 this.element = element;
 this.actionStarted = false;

 
 
 
 if (typeof mboxSafeOnloadFunctions == "undefined") {
 mboxSafeOnloadFunctions = new Array();
 }

 
 
 var offset = mboxSafeOnloadFunctions.length;
 mboxSafeOnloadFunctions[offset] = this;
 this.z58 = new Function("event",
 "mboxSafeOnloadFunctions[" + offset + "].action(event)");

 this.setup();
}

function mboxSafeOnload_setup() {
 if (this.element.onload != this.z58) {
 if (this.element.onload) {
 this.add(this.element.onload);
 }

 this.element.onload = this.z58;
 }
}

function mboxSafeOnload_add(m59) {
 this.sortedAdd(m59, this.orderMiddle)
}

function mboxSafeOnload_sortedAdd(m59, u60) {
 var z58 = new Array()
 z58.order = u60;
 z58.action = m59;
 this.a57[this.a57.length] = z58;
}


function mboxSafeOnload_action(v61) {
 if (this.actionStarted == true) {
 return;
 }
 this.actionStarted = true;

 this.a57.sort(mboxSafeOnload_orderSort);

 for (var z7 = 0; z7 < this.a57.length; z7++) {
 
 
 this.element.onload = this.a57[z7].action;
 this.element.onload(v61);
 }
 this.element.onload = this.z58
}

function mboxSafeOnload_orderSort(t62, z63) {
 return t62.order - z63.order;
}


function mboxSetCookie(w24, h25, w16) {
 mboxCookies.setCookie(w24, h25, w16);
}


function mboxGetCookie(w24) {
 return mboxCookies.getCookie(w24);
}


function mboxDeleteCookie(w24) {
 mboxCookies.deleteCookie(w24);
}


function mboxGetCookieNames(m28) {
 return mboxCookies.getCookieNames(m28);
}

function mboxCookieIsEnabled() {
 mboxCookies.setCookie(mboxCheckCookie, "true", 60);
 return mboxCookies.getCookie(mboxCheckCookie) == "true";
}

function mboxIsSupported() {
 return true;
}

function mboxPlatform() {
 this.q64 = window.navigator.appVersion.indexOf("Mac") != -1;
 this.w65 = window.navigator.appVersion.indexOf("MSIE") != -1;

 var f66 = window.navigator.userAgent.indexOf("Opera") != -1;
 var g67 = window.navigator.userAgent.indexOf("Konqueror") != -1;
 var h68 = this.w65 &&
 (window.navigator.appVersion.indexOf("MSIE 4.") != -1);
 var m69 = (navigator.appName == 'Netscape') &&
 (parseInt(navigator.appVersion) == 4);

 this.supported = mboxIsSupported() &&
 !(m69 || h68 || f66 || g67);

 this.isSupported = mboxPlatform_isSupported;
 this.supportsReplace = mboxPlatform_supportsReplace;
}

function mboxPlatform_isSupported() {
 return this.supported;
}

function mboxPlatform_supportsReplace() {
 return !(this.w65 && this.q64)
}


function mboxForcePCId(forcedId) {
 if (mboxPCId.forceId(forcedId)) {
 mboxSessionId.reset();
 }
}


function mboxSetSessionId() {
 mboxSessionId.forceId(arguments[0],arguments[1]);
}


function mboxSafeBodyOnload() {
 if (arguments.length > 1) {
 mboxEnv.getSafeBodyOnload().add(arguments[0], arguments[1]);
 }
 else {
 mboxEnv.getSafeBodyOnload().add(arguments[0]);
 }
}

