var browserID = 0;
var m_IE = false;
var m_Opera = false;
var m_Moz = false;
var m_Netscape = false;
if(navigator.appName == 'Microsoft Internet Explorer' && navigator.userAgent.indexOf('Opera', 0) == -1) {
	//document.write('<link rel="stylesheet" href="css/style_ie.css">');
}else if(navigator.userAgent.indexOf('Opera', 0) >= 0){
	//document.write('<link rel="stylesheet" href="css/style_op.css">');
	browserID = 1
}else if(navigator.userAgent.indexOf('Netscape', 0) >= 0){
	//document.write('<link rel="stylesheet" href="css/style_ns.css">');
	browserID = 2
}else{
	//document.write('<link rel="stylesheet" href="css/style_mz.css">');
	browserID = 3
}

if(browserID == 0) m_IE = true;
if(browserID == 1) m_Opera = true;
if(browserID == 2) m_Netscape = true;
if(browserID == 3) m_Moz = true;

if(m_Moz)
{
//since firefox LOVES to just be a pain, we have to prototype our own functions. Hurray.

   HTMLElement.prototype.__defineGetter__("innerText", function () {
      var r = this.ownerDocument.createRange();
      r.selectNodeContents(this);
      return r.toString();
   });

   HTMLElement.prototype.__defineGetter__("outerHTML", function () {
      var _emptyTags = {
         "IMG":   true,
         "BR":    true,
         "INPUT": true,
         "META":  true,
         "LINK":  true,
         "PARAM": true,
         "HR":    true
      };      
      var attrs = this.attributes;
      var str = "<" + this.tagName;
      for (var i = 0; i < attrs.length; i++)
         str += " " + attrs[i].name + "=\"" + attrs[i].value + "\"";

      if (_emptyTags[this.tagName])
         return str + ">";

      return str + ">" + this.innerHTML + "</" + this.tagName + ">";
   });

   HTMLElement.prototype.__defineSetter__("outerText", function (sText) {
   this.outerHTML = sText.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
   });
   
   HTMLElement.prototype.__defineSetter__("outerHTML", function (sHTML) {
   var r = this.ownerDocument.createRange();
   r.setStartBefore(this);
   var df = r.createContextualFragment(sHTML);
   this.parentNode.replaceChild(df, this);
   });
}

function SwitchUploadLib(select)
{
   if(select == null) return;
   
   var libid = select.options[select.selectedIndex].value;

   window.location = 'upload2.aspx?libid=' + libid;
}

function visitToolTip(url,item)
{
	if(url=='') { return; }
	var d = document.createElement('div');
	item.onclick = function(){
		location.href=url;
	}
	item.onmouseout = function(){ 
		item.className=item.className.replace('_HOVER',''); 
		if(browserID==3){
			item.removeChild(d); 
		}else{
			document.getElementsByTagName('BODY')[0].removeChild(d);
		}
	}
	item.className=item.className + '_HOVER';
	d.className='ToolTopBox';
	d.innerHTML='Click to visit \'' + url + '\'';
	if(browserID==3){
		item.appendChild(d);
	}else{
		d.style.left=event.x + 'px';
		d.style.top=(event.y + document.body.scrollTop) + 'px';
		document.getElementsByTagName('BODY')[0].appendChild(d);
	}
}
function showToolTip(tip,item)
{
	if(tip=='') { return; }
	var d = document.createElement('div');
	item.onmouseout = function(){ 
		item.className=item.className.replace('_HOVER',''); 
		if(browserID==3){
			item.removeChild(d); 
		}else{
			document.getElementsByTagName('BODY')[0].removeChild(d);
		}
	}
	item.className=item.className + '_HOVER';
	d.className='ToolTopBox';
	d.innerHTML=tip;
	if(browserID==3){
		item.appendChild(d);
	}else{
		d.style.left=event.x + 'px';
		d.style.top=(event.y + document.body.scrollTop) + 'px';
		document.getElementsByTagName('BODY')[0].appendChild(d);
	}
}

function clearSearchInput(item,mode)
{
	if(mode==0){
		if(item.value=='Search'){
			item.value='';
		}
	}else{
		if(item.value==''){
			item.value='Search';
		}
	}	
}

function clearUserNameInput(item,mode)
{
	if(mode==0){
		if(item.value=='Nickname'){
			item.value='';
		}
	}else{
		if(item.value==''){
			item.value='Nickname';
		}
	}	
}

function clearPasswordInput(item,mode)
{
	if(mode==0){
		if(item.value=='Password'){
			item.value='';
		}
	}else{
		if(item.value==''){
			item.value='Password';
		}
	}	
}

function showHideSegment(item,id)
{
	var segment = document.getElementById(id);
	if(segment.className=='Hide'){
		item.className='NavSubItem_Marker1';
		segment.className='';
		var segmentId = id.substring(8);
		saveForumViewStateCookie(segmentId,forumId,false);
	}else{
		item.className='NavSubItem_Marker2';
		segment.className='Hide';
		var segmentId = id.substring(8);
		saveForumViewStateCookie(segmentId,forumId,true);
	}
}

function setImageSizes(width)
{
   var images = document.getElementsByTagName('IMG');
   for(var i=0;i<images.length;i++){
      try{
         if(m_Opera == true){ width = 650; }
         if(safeToResizeImage(images[i].src)&&images[i].width>width){
            
            images[i].width = width;
            images[i].style.cursor = 'pointer';
            images[i].style.border = 'solid 2px #0A00D9';
            images[i].onclick = function(e) { window.open(this.src); }
         }
      }catch(e){}
   }
}
function safeToResizeImage(url)
{
   var domains = new Array("galciv2.com", "galciv1.com", "galciv.com", "wincustomize.com", "stardock.com", "joeuser.com", "stardockcentral.net", "guichamps.com", "xpthemes.com", "politicalmachine.com", "desktopgadgets.com", "societygame.com");
   for(var i=0;i<domains.length;i++){
      if(url.indexOf(domains[i])!=-1){ return false; }
   }
   return true;
}

function saveForumViewStateCookie(segmentID,ID,bIsSettingValue)
{
   var _existsPos = -1
   var _item = '[' + segmentID + ',' + ID + ']';
   var _userArray = ''
   var _debug = '';
   
   if(getCookie("ForumsViewState")!=null){ _userArray = getCookie("ForumsViewState"); }
	
	_debug += '\nLoading... ' + _userArray;
	
	if(_userArray){ 
	   if(_userArray.indexOf(',')==0){ _userArray = _userArray.substring(1); } //Remove comma at the beginning
	   _existsPos = _userArray.indexOf(_item);
	}

	if(bIsSettingValue){ //Add A Value To The Forums List Array (Will Hide Thread From View) (+)
	   if(_existsPos==-1){ _userArray += ',[' + segmentID + ',' + ID + ']'; }
	}else{ //Remove A Value From The Forum List Array (Will Show Thread) (-)
	   if(_existsPos!=-1){ _userArray = _userArray.replace(_item,''); }
	}
	
	if(_userArray){ //Clean up our array
	   if(_userArray.indexOf(',')==0){ _userArray = _userArray.substring(1); } //Remove comma at the beginning
	   if(_userArray.substring(_userArray.length-1).indexOf(',')==0){ _userArray = _userArray.substring(0, _userArray.length-1); } //Remove comma at the ending
	   if(_userArray.indexOf(',,')!=-1){ _userArray.replace(',,',','); } //Remoce double commas
	}
	
	_debug += '\nSaving... ' + _userArray;

   //alert(_debug)
   //_userArray = '';

   setForumViewStateCookie("ForumsViewState", _userArray);
}


function dispayForumsViewStateItems()
{
   var _userArray = ''
   if(getCookie("ForumsViewState")!=null){ _userArray = getCookie("ForumsViewState"); }
  
   for(var i=0; i<10;i++){
      try{
         var _str       = '[' + i + ',' + forumId + ']';
         var _item      = document.getElementById('_Segment' + i);
         var _itemIcon  = document.getElementById('_SegmentIcon' + i);
         if(_userArray){ 
            if(_userArray.indexOf(_str)==-1){ 
               _item.className = ''; 
               _itemIcon.className = 'NavSubItem_Marker1';
            }else{
               _item.className = 'Hide'; 
               _itemIcon.className = 'NavSubItem_Marker2';
            }
         }else{
            _item.className = ''; 
            _itemIcon.className = 'NavSubItem_Marker1';
         }  
      }catch(e){
         break;
      }
   }
}


//Cookie Parsing code
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

function setForumViewStateCookie(name,value){
	if(name==null && value==null){ return; }
	var domain = ''; //"domain=localhost/Wincustomize;"
	document.cookie = name + "=" + escape(value) + "; " + domain;
}




//Help Box Code Start =====================================
var m_helpLinkTabId = 0;
var m_helpLinkTabCount = 0;
function buildHelpBox()
{
   if(typeof(m_helpLinks) != 'object'){ return; }
   
   var d = document.createElement('div');
   d.id         = '_helpBox';
   d.className  = 'HelpBoxConstraints Hide';
   document.getElementsByTagName('BODY')[0].appendChild(d);
   
   var i = document.createElement('img');
   i.src        = '/images/spacer.gif';
   i.className  = 'HelpBoxCloseButton Hand';
   i.width      = 31;
   i.height     = 19;
   i.onclick    = function() { hideObject('_helpBox'); };
   i.title      = 'Close';                         
   d.appendChild(i);
   
   var d1 = document.createElement('div');
   d1.id        = '_helpBoxBody';
   d1.className = 'HelpBoxBodyConstraints';
   d.appendChild(d1);
   
   var d2 = document.createElement('div');
   d2.id        = '_helpBoxTabs';
   d2.className = 'HelpBoxTabConstraints';
   d.appendChild(d2);
   
   buildHelpLinks();
}
function buildHelpLinks()
{
   var _body = document.getElementById('_helpBoxBody');
   var _tabs = document.getElementById('_helpBoxTabs');
   var _className;
   var i = 0;
   for(prop in m_helpLinks){
      if(m_helpLinkTabId==i){
         _body.innerHTML = m_helpLinks[prop][1];
         _className = 'HelpBoxTab_Selected';
      }else{
         _className = 'HelpBoxTab_NotSelected';
      }
      	var d = document.createElement('div');
         d.id = '_helpBoxTab_' + i;
         d.className = _className
         d.innerHTML = "<a href=\"javascript:selectHelpBoxTab(" + i + ");\" class=\"HelpBoxTabLinks\">" + m_helpLinks[prop][0] + "</a>";
         _tabs.appendChild(d);
      i++;
   }
   m_helpLinkTabCount = i - 1;
}
function selectHelpBoxTab(tabId)
{
   for(var i=0; i <= m_helpLinkTabCount; i++){
      document.getElementById('_helpBoxTab_' + i).className='HelpBoxTab_NotSelected';
   }
   document.getElementById('_helpBoxTab_' + tabId).className='HelpBoxTab_Selected';
   var ii = 0;
   for(prop in m_helpLinks){
      if(tabId==ii){
         document.getElementById('_helpBoxBody').innerHTML = m_helpLinks[prop][1];
      }
      ii++;
   }
}
//Help Box Code End =====================================

function positionObject(id)
{
	var _maskZIndex = createLayerMask();
	var d = document.getElementById(id);
	var _className = d.className;
    	//Strip out Hide, Show, Invisible, Visible from className first.
    	_className = _className.replace(/Hide/g, "");
    	_className = _className.replace(/Show/g, "");
    	_className = _className.replace(/Invisible/g, "");
    	_className = _className.replace(/Visible/g, "");
	
	d.style.zIndex		= _maskZIndex + 1;
	d.style.position	= 'absolute';
	d.style.left		= newPopupPosition(1);
	d.style.top			= newPopupPosition(2);
   d.className = _className;
   
   try{
      var _obj = document.getElementsByTagName('SELECT');
      for(i=0;i<=_obj.length;i++){
         _className = _obj[i].className;
         _className = _className.replace(/Hide/g, "");
         _className = _className.replace(/Show/g, "");
         _className = _className.replace(/Invisible/g, "");
         _className = _className.replace(/Visible/g, "");
         _obj[i].className = _className + ' Invisible';
      }
   }catch(e){
   }
}
var m_MaskLayerIndex = 0;
function createLayerMask()
{
   try{
      var _maskZIndex = 2999;
      var mask = document.createElement('img');
      mask.src = '/images/spacer.gif';
      mask.id = '_layerMask_' + m_MaskLayerIndex;
      mask.className = 'LayerMask01';
      var _width = document.body.clientWidth;
      if(document.body.scrollWidth >= _width){ 
         _width = document.body.scrollWidth; 
      }
      var _height = document.body.clientHeight;
      if(document.body.scrollHeight >= _height){ 
         _height = document.body.scrollHeight; 
      }
      mask.style.width  = _width;
      mask.style.height = _height;
      
      var _maskIndex = 0;
      if(m_MaskLayerIndex!=0){
         _maskIndex = m_MaskLayerIndex - 1;
      }
      if(document.getElementById('_layerMask_' + _maskIndex)){
         _maskZIndex = document.getElementById('_layerMask_' + _maskIndex).style.zIndex + 10;
      }
      mask.style.zIndex = _maskZIndex;
      
      document.getElementsByTagName('BODY')[0].appendChild(mask);
      m_MaskLayerIndex = m_MaskLayerIndex + 1;
      return _maskZIndex;
   }catch(e){
      return m_MaskLayerIndex;
   }
}
function destroyLayerMask()
{
   try{
      var _maskIndex = 0;
      if(m_MaskLayerIndex!=0){
         _maskIndex = m_MaskLayerIndex - 1;
      }
      if(document.getElementById('_layerMask_' + _maskIndex)){
         var mask = document.getElementById('_layerMask_' + (m_MaskLayerIndex-1));
         document.getElementsByTagName('BODY')[0].removeChild(mask);
         m_MaskLayerIndex = m_MaskLayerIndex - 1;
      }
   }catch(e){ }
}
function newPopupPosition(mode)
{
	if(mode == 1){
		if((document.body.clientWidth) >= 760){
			return (document.body.clientWidth / 2) - 343;
		}else{
			return 138;
		}
	}else if(mode == 2){
		return document.body.scrollTop + 113;
	}else{
		if(document.getElementById("InfoPopupBox")){
			if((document.body.clientWidth) >= 760){
				document.getElementById("InfoPopupBox").style.left=(document.body.clientWidth / 2) - 343;
			}else{
				document.getElementById("InfoPopupBox").style.left=138;
			}
			document.getElementById("InfoPopupBox").style.top=infoPosition(2);
		}
	}
}
function hideObject(id)
{
	destroyLayerMask();
	var d = document.getElementById(id);
	var _className = d.className;
    	//Strip out Hide, Show, Invisible, Visible from className first.
    	_className = _className.replace(/Hide/g, "");
    	_className = _className.replace(/Show/g, "");
    	_className = _className.replace(/Invisible/g, "");
    	_className = _className.replace(/Visible/g, "");
    	d.className = _className + ' Hide';
    	
   try{
      var _obj = document.getElementsByTagName('SELECT');
      for(i=0;i<=_obj.length;i++){
         _className = _obj[i].className;
         _className = _className.replace(/Hide/g, "");
 	      _className = _className.replace(/Show/g, "");
 	      _className = _className.replace(/Invisible/g, "");
 	      _className = _className.replace(/Visible/g, "");
         _obj[i].className = _className;
      }
   }catch(e){
   }
}

function getCookieKey(mainKey,subKey) {
 var reg = new RegExp("(^| )"+mainKey+"=([^;]*)(;|$)");
 var arr = document.cookie.match(reg);
 if (arguments.length == 2) {
  if (arr!=null)
    return key(subKey,arr[2]);
  else
   return null;
 } else if (arguments.length == 1) {
   if (arr!=null)
   return unescape(arr[2]);
  else
   return null;
 }

 function key(subKey,findWith) {
  var arr,reg = new RegExp("(^| |&)"+subKey+"=([^&]*)(&|$)");
  var findWith = findWith?findWith:document.cookie;
  if (arr =  findWith.match(reg))
   return unescape(arr[2]);
  else
   return null;
 }
}

function initLogin()
{
   var nickname = '';
   var honorific = '';
   var avatar = '';
   var auth = '';
   var hasWCSite = 0;
   var temp = '';

   try{
      nickname = getCookieKey("UserInfo", "NickName");
   }catch(e){}

   try{
      honorific = getCookieKey("UserInfo", "Honorific");
   }catch(e){}
   
   try{
      avatar = getCookieKey("UserInfo", "Avatar");
   }catch(e){}

   try{
      auth = getCookieKey("UserInfo", "Authenticated");
   }catch(e){}   
   
   try{  
      hasWCSite = getCookieKey("UserInfo", "HasWCSite"); 
      if ( hasWCSite == null )
      {
         if (document.getElementById("_CreateSiteLink"))
         {
            document.getElementById("_CreateSiteLink").style.display = 'none';            
         }         
      }     
   }catch(e)
   { 
      hasWCSite = 0; 
   }
   
   if(nickname == null || nickname == ''){ nickname = 'Stardock User'; }
   if(honorific == null || honorific == ''){ honorific = ''; }
   if(auth == null || auth == ''){ auth = 'False'; }
   if(hasWCSite == null){hasWCSite = 0;}

   if(getCookie("AuthCookie2"))
   {
      var mylogininfo = document.getElementById("_MyLoginInfo");
      var logoutform = document.getElementById("_LogoutForm");
      var logoutnickname = document.getElementById("_LogoutNickname");
      var logouthonorific = document.getElementById("_LogoutHonorific");
      var mypagelink = document.getElementById('_MyPageLink');
      var logoutavatar = document.getElementById("_LogoutAvatar")
      var mylinks = document.getElementById('_MyLinks');
      
      logoutnickname.innerHTML = nickname;
      logouthonorific.innerHTML = honorific;
      
      if(hasWCSite == 1)
      {
         if (document.getElementById("_CreateSiteLink"))
         {
            document.getElementById("_CreateSiteLink").style.display = 'none';            
            if(mypagelink) mypagelink.href = 'http://users.wincustomize.com/' + nickname + '/';
         }                  
      }
      else
      {
         if(mypagelink) mypagelink.href = "/myaccount.aspx?site"
      }
      
      logoutform.className = '';
      logoutform.style.display = '';
      mylogininfo.className = '';
      mylogininfo.style.display = '';
      if(avatar != '' && avatar != null) logoutavatar.src = 'http://images2.stardock.com/' + avatar;

      mylinks.className = 'TopBarLinks';

   }
   else
   {
      var loginform = document.getElementById("_LoginForm");
      var loginusername = document.getElementById("_LoginUsername");
      var mypagelink = document.getElementById('_MyPageLink');
      var myskinsoption = document.getElementById('_MySkinsOption');
      var watchlistoption = document.getElementById('_WatchlistOption');
           
//      if(mypagelink) mypagelink.href = 'http://users.wincustomize.com/';
       
      if (document.getElementById("_CreateSiteLink"))
      {
         document.getElementById("_CreateSiteLink").style.display = 'none';         
      }
      
      loginform.className = '';
      loginform.style.display = '';
      myskinsoption.style.display = 'none';
      watchlistoption.style.display = 'none';
      
      try{
      loginusername.value = attemptedNickname;
      }catch(e) {}

   }
}

function format_quote(editorId)
{
   var str;

   if (document.getSelection) {
      str = document.getSelection();
   } 
   else if (document.selection && document.selection.createRange) {
      var range = document.selection.createRange();
      str = range.text;
   } 
   else {
   }

   str = str.replace(/\r\n/g, '<BR>');
   strs = str.replace(/\n/g, '<BR>');
   str = str.replace(/\r/g, '<BR>');

   str = "[quote]" + str + "[/quote]" + '\r\r';

   var config = document.getElementById(editorId).config;

   if(config.basic == false)
   {
      editor_insertHTML(editorId, str);
   }
   else
   {
      if(m_IE == true)
      {
         editor_insertHTML(editorId, str);
      }
      else
      {
         editor_formatselection(editorId, str, true);
      }
   }

   return;
}

function movePageAdv(page, lastpage)
{
   var p = queryString('p');
   var checknum = parseInt(page)
   if(isNaN(checknum))
   {
     return false;
   } 
     
   if(page < 1) page = 1;
   if(page > lastPage) page = lastPage;      
   
   if(parseInt(p) == page) return false;

   var loc = window.location.toString();
   
	var reploc = loc.replace(new RegExp('&p=[0-9]?', 'g'), '');
	reploc = reploc.replace(new RegExp('p=[0-9]?', 'g'), '');

	if(reploc != null) loc = reploc;

	loc = loc + '&p=' + page;

   window.location = loc;
}

function movePage(page, lastPage)
{
   var loc = window.location + '?'
   var skinId = queryString('skinid');
   var libId = queryString('libid');
   var articleId = queryString('aid');
   var search = queryString('search');
   var sort = queryString('sort');
   var g = queryString('g');
   var acid = queryString('acid');
   var p = queryString('p');
   var view = queryString('view');
   var type = queryString('type');
   var cat = queryString('cat');
   var pageSize = queryString('size');
   var cid = queryString('cid');
   var full = ''; // for the user replies
   
   if(window.location.search.indexOf('full') >= 0)
      full = 'full';
     
   var newloc = '';
   
   var checknum = parseInt(page)
   if(isNaN(checknum))
   {
     return false;
   } 
     
   if(page < 1) page = 1;
   if(page > lastPage) page = lastPage;      
   
   if(parseInt(p) == page) return false;
   if(p == '' && lastPage == 1) return false;
   
   if(g != '' && g != null)
      newloc = 'g=' + g;   
      
//   In the case where the code is using ParseSimpleNav for Urls like "skins.aspx?new" and we need to use paging,
//   the code file should use RegisterScript("SimpleNav", "var simpleNav = 'new';")
//   This will add the simple nav string to the paging url string.
   try{   
   if(simpleNav && simpleNav != 'undefined' & simpleNav != '')
      newloc = simpleNav;   
   }catch(e){}
  
   if(acid != '' && acid != null)
   {
      if(newloc == '')
         newloc = 'acid=' + acid;    
      else
         newloc = newloc + '&acid=' + acid; 
   }
   
   if(sort != '' && sort != null)
   {
      if(newloc == '')
         newloc = 'sort=' + sort;
      else
         newloc = newloc + '&sort=' + sort;
   }
  
   if(skinId != '' && skinId != null)
   {
      if(newloc == '')
         newloc = 'skinid=' + skinId;    
      else
         newloc = newloc + '&skinid=' + skinId; 
   }  
      
   if(libId != '' && libId != null)
   {
      if(newloc == '')
         newloc = 'libid=' + libId;    
      else
         newloc = newloc + '&libid=' + libId; 
   }        
      
   if(articleId != '' && articleId != null)
   {
      if(newloc == '')
         newloc = 'aid=' + articleId;    
      else
         newloc = newloc + '&aid=' + articleId; 
   }

   if(view != '' && view != null)
   {
      if(newloc == '')
         newloc = 'view=' + view;    
      else
         newloc = newloc + '&view=' + view; 
   }
   
   if(type != '' && type != null)
   {
      if(newloc == '')
         newloc = 'type=' + type;    
      else
         newloc = newloc + '&type=' + type; 
   }

   if(search != '' && search != null)
   {
      if(newloc == '')
         newloc = 'search=' + search;    
      else
         newloc = newloc + '&search=' + search; 
   }

   if(cat != '' && cat != null)
   {
      if(newloc == '')
         newloc = 'cat=' + cat;    
      else
         newloc = newloc + '&cat=' + cat; 
   }
   
   if(pageSize != '' && pageSize != null)
   {
      if(newloc == '')
         newloc = 'size=' + pageSize;
      else
         newloc = newloc + '&size=' + pageSize;
   }

   if(cid != '' && cid != null)
   {
      if(newloc == '')
         newloc = 'cid=' + cid;    
      else
         newloc = newloc + '&cid=' + cid; 
   }

   if(full != '')
      newloc = newloc + '&' + full;

   if(newloc == '')
      newloc = 'p=' + page;    
   else
      newloc = newloc + '&p=' + page; 

   window.location = '?' + newloc;
}

//QueryString Parsing Functions
function PageQuery(q) {

if(String(this.q) == 'undefined') this.q = '';

if(q.length > 1) 
	this.q = q.substring(1, q.length);
else
	this.q = null;

this.keyValuePairs = new Array();

if(q)
{
	if(this.q)
	{
		for(var i=0; i < this.q.split("&").length; i++)
		{
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}
}
this.getKeyValuePairs = function() { return this.keyValuePairs; }
this.getValue = function(s) {
for(var j=0; j < this.keyValuePairs.length; j++) {
if(this.keyValuePairs[j].split("=")[0] == s)
return this.keyValuePairs[j].split("=")[1];
}
return '';
}
this.getParameters = function() {
var a = new Array(this.getLength());
for(var j=0; j < this.keyValuePairs.length; j++) {
a[j] = this.keyValuePairs[j].split("=")[0];
}
return a;
}
this.getLength = function() { return this.keyValuePairs.length; } 
}

function queryString(key)
{
   var search = window.location.search;
   
   if(search == null) search = '';
   if(key == null) key = '';
   
   var page = new PageQuery(search.toLowerCase()); 
   return unescape(page.getValue(key.toLowerCase())); 
}

function displayItem(key){
if(queryString(key)=='false') 
{
document.write("you didn't enter a ?name=value querystring item.");
}else{
document.write(queryString(key));
}
}
function newWindow(X, Y, Target, URL, bToolbar){
   //window.open( [sURL] [, sName] [, sFeatures] [, bReplace])
   //Target should equal null if you do not wish to specify one.
   
   if(typeof(bToolbar)=='boolean'){
      if(bToolbar==true){
         bToolbar = 'yes';
      }else{
         bToolbar = 'no';
      }
   }else if(typeof(bToolbar)=='string'){
      if(bToolbar=='yes'||bToolbar=='no'){
      }else{
         bToolbar = 'no';
      }
   }
   window.open(URL, Target, "height=" + Y + ",width=" + X + ",status=yes,toolbar=" + bToolbar +  ",menubar=no,location=no");
}

function noenter(e) 
{
   if(e)
   {
      //Firefox, Moz
     return !(e && e.keyCode == 13);
   }
   else
   {
     return !(window.event && window.event.keyCode == 13);
   }
}

function initKeySearch(e)
{
   var Res = noenter(e);
   
   if(!Res)
   {
      initSearch();
      return false;
   }
   
   return true;
}

function initSearch()
{
   var query = document.getElementById('_SearchText');
	var search = Trim(query.value);
   var libId = queryString('libid');
   
	if(search == '' || search == null)
	{
	   alert('Please enter a search term and try again.');
	   return false;
	}
   
   if(libId != '' && libId != null)
   {
      window.location = 'skins.aspx?libid=' + libId + '&search=' + search;
   }
   else
   {
      window.location = 'skins.aspx?search=' + search;
   }
   
}

function Trim(s) 
{
  // Remove leading spaces and carriage returns
  
  while ((s.substring(0,1) == ' ') || (s.substring(0,1) == '\n') || (s.substring(0,1) == '\r'))
  {
    s = s.substring(1,s.length);
  }

  // Remove trailing spaces and carriage returns

  while ((s.substring(s.length-1,s.length) == ' ') || (s.substring(s.length-1,s.length) == '\n') || (s.substring(s.length-1,s.length) == '\r'))
  {
    s = s.substring(0,s.length-1);
  }
  return s;
}

function checkTextAreaLength(item,evt,ilength){
   var _bReturnValue = true;
   var e = window.event ? event.keyCode : evt.which;
   var evnt = window.event;
   if(!window.event){ evnt = evt; }
    
   if(evnt.ctrlKey){
      if((e == 17) || (e == 86)){ //Insert Key, V Char. 
         _bReturnValue = false;
      }
   }else{
      if((e == 32) || (e == 13) || (e > 47)){ //IE
        if(ilength && (item.value.length > ilength - 1)) {
            _bReturnValue = false;
        }
      }
   }
   if(_bReturnValue==false){
      if (window.event){
          window.event.returnValue = null;
      } else {
          evt.cancelDefault;
          return false;
      }
   }
}
function updateTextAreaLength(item,id,ilength){
   var _div = document.getElementById(id);
   _div.className = 'MyAccount_PSTab_CharsLeft';
   _div.innerHTML = parseInt(ilength - item.value.length) + ' Chars Left';
}


function MatchTextareaHTML(target)
{
	var ele = document.getElementById(target);
	var regEx = /<[^>]*>/g;
	var re = new RegExp(regEx);
	var m = re.exec(ele.value);

	if(m != null) 
		return m.length > 0;
	else
		return false;
}

function getChildById(what, childid)
{
   for(var i = 0; i <= what.childNodes.length; i++)
   {
      if(what.childNodes[i])
         if(childid == what.childNodes[i].id) return what.childNodes[i];
   }
}

function showFlashVideo(oProperties){
   //Constructor
   var _PathToFlashFile = oProperties.PathToVideoFile;
   var _PathToImagePlaceholder = oProperties.PathToImagePlaceholder;
   var _URL = oProperties.URL;
   var _Width = oProperties.Width;
   var _Height = oProperties.Height;
   var _arrPath = _PathToFlashFile.split('/');
   var _FlashFileName = _arrPath[_arrPath.length-1];

   var flashinstalled = 0;
   var flashversion = 0;
   MSDetect = "false";
   if (navigator.plugins && navigator.plugins.length){
      x = navigator.plugins["Shockwave Flash"];
      if(x){
         flashinstalled = 1;
         if (x.description){
            y = x.description;
            flashversion = y.charAt(y.indexOf('.')-1);
         }
      }
      if (navigator.plugins["Shockwave Flash 2.0"]){
         flashinstalled = 1;
         flashversion = 2;
      }
   }else if (navigator.mimeTypes && navigator.mimeTypes.length){
      x = navigator.mimeTypes['application/x-shockwave-flash'];
      if (x && x.enabledPlugin){
         flashinstalled = 1;
      }
   }else{
      MSDetect = "true";
   }
   if(window.ActiveXObject && MSDetect == "true"){
      for(var i=2; i <= 6; i++){
         try{
            var oObject = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
         }catch (e){
            flashinstalled = 1;
            flashversion = i;
         }
      }   
   }
   if (flashinstalled == 1){
      if(m_Moz == true || m_Opera==true){
         document.write('<object');
         document.write('    data="' + _PathToFlashFile + '"');
         document.write('    pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"');
         document.write('    type="application/x-shockwave-flash"');
         document.write('    width="' + _Width + '"');
         document.write('    height="' + _Height + '"');
         document.write('   menu="false"'); 	
         document.write('   loop="true"');
         document.write('   quality="high"');
         document.write('   bgcolor="#ffffff">');
         document.write('</object>');
      }else{
         document.write('<A HREF=' + _URL + '>');
         document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
         document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0"');
         document.write(' WIDTH=' + _Width + ' HEIGHT=' + _Height + ' VIEWASTEXT>');
         document.write(' <PARAM NAME=movie VALUE="' + _PathToFlashFile + '"> <PARAM NAME=menu VALUE=false> <PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE=#FFFFFF> <EMBED src="' + _FlashFileName + '" menu=false quality=high bgcolor=#FFFFFF  WIDTH=' + _Width + ' HEIGHT=' + _Height + ' TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></EMBED>');
         document.write('</OBJECT>');
         document.write('</A> ');
      }
   }else{
      document.write('<a href="' + _URL + '"><img src="' + _PathToImagePlaceholder + '" border=0></a>');
   }         
}