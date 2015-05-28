
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf(prefix);
  if (begin == -1)
    return null;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}
	
function Newsflash(string)
	{
	window.open("http://www.soundclick.com/frontpage/"+string,"displayWindow","toolbar=no,width=415,height=200,directories=no,status=no,scrollbars=yes,resize=yes,menubar=no,resizable=yes");
       }
	   
function Vote(string)
	{
	remote = window.open("","remotewin","width=468,height=174,resizable=no");
    remote.location.href = "http://www.soundclick.com/Util/VoteNew.cfm?ID="+string;
        if (remote.opener == null) remote.opener = window; 
    remote.opener.name = "opener"; 
	remote.focus();
	} 
	
function checkUncheckAll(field) {
	if (field[0])	{		
			var isChecked = field[0].checked;
			for (var i=0; i < field.length; i++)
		{
		if (isChecked) {
			field[i].checked = false ;
		} else {
			field[i].checked = true ;
		}
		}	
	}	else	{
		if (field.checked) {
			field.checked = false ;
		} else {
			field.checked = true ;
		}
		}
	}
	
function VoteInfo(string)
	{
	remote = window.open("","remotewin","width=468,height=174,resizable=no");
    remote.location.href = "http://www.soundclick.com/Util/VoteInfo.cfm?ID="+string;
        if (remote.opener == null) remote.opener = window; 
    remote.opener.name = "opener"; 
	remote.focus();
	}    
	   
function popUp(url,width,height) 
	{
	window.open(url,"win","toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width="+width+",height="+height); 
	}

function readCookie(cookieName) {
	var theCookie=""+document.cookie;
 	var ind=theCookie.indexOf(cookieName);
 	if (ind==-1 || cookieName=="") return ""; 
 	var ind1=theCookie.indexOf(';',ind);
 	if (ind1==-1) ind1=theCookie.length; 
 	return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}

// needs to be a global variable
var singlePlayWindow = '';
function Player(url) {
	var myAdmin = readCookie('ScreenAdmin');
	// if window is already open, just update content
	if (singlePlayWindow && !singlePlayWindow.closed && singlePlayWindow.location) {
		singlePlayWindow.location.href = url;
	} else {
		var mySize = readCookie('SC_size');
		if (mySize == 'small') {
			singlePlayWindow=window.open(url,"singlePlay","location=no,toolbar=no,width=500,height=226,directories=no,status=0,scrollbars=no,resize=no,menubar=no,resizable=no,titlebar=no");
		// band radios, playlists,... (for admin tests add "myAdmin.length>3 && ")
		} else if (url.indexOf('single_player.cfm')==-1) {
			singlePlayWindow=window.open(url,"singlePlay","location=no,toolbar=no,width=500,height=400,directories=no,status=no,scrollbars=no,resize=no,menubar=no,resizable=yes,titlebar=no");
		// single song (for admin tests add "} else if (myAdmin.length>3) {")
		} else {
			singlePlayWindow=window.open(url,"singlePlay","location=no,toolbar=no,width=500,height=365,directories=no,status=no,scrollbars=no,resize=no,menubar=no,resizable=yes,titlebar=no");
		}
	}
	if (singlePlayWindow) {
		singlePlayWindow.focus();
	}
}

function resizeMe(newX,newY) {
	// get current inner window dimensions
	 var iWidth=0,iHeight=0,d=document,w=window;
	  if(xDef(w.innerWidth,w.innerHeight)) {
		iWidth=w.innerWidth;
		iHeight=w.innerHeight;
		if(xDef(d.height) && d.height>w.innerHeight) iWidth-=16;
		if(xDef(d.height) && d.width>w.innerWidth) iHeight-=16;
	  }
	  else if(d.compatMode == 'CSS1Compat' && d.documentElement && d.documentElement.clientWidth)
		{iWidth=d.documentElement.clientWidth;iHeight=d.documentElement.clientHeight;}
	  else if(d.body && d.body.clientWidth)
		{iWidth=d.body.clientWidth;iHeight=d.body.clientHeight;}
	// do resizing to 500x365 (or 500x400 for player with list)
	iWidth = newX - iWidth;
	iHeight = newY - iHeight;
	window.resizeBy(iWidth,iHeight);
	window.focus();
}

function xDef()
{
  for(var i=0; i<arguments.length; ++i){if(typeof(arguments[i])=='undefined') return false;}
  return true;
}

// for the google search box (background required)
function googleSearch(formName) {
	var myObj=document.getElementById(formName);
	if (myObj.Realm.value==4 && myObj.SearchTerm.value.length==0) {
		myObj.SearchTerm.style.background="url(/images/navigation/googlesearch.gif) no-repeat";
	} else {
		myObj.SearchTerm.style.background="";
	}
}

/*  Get Width and Height of inner Client
function xClientWidth()
{
  var w=0,d=document,w=window;
  if(d.compatMode == 'CSS1Compat' && !w.opera && d.documentElement && d.documentElement.clientWidth)
    {w=d.documentElement.clientWidth;}
  else if(d.body && d.body.clientWidth)
    {w=d.body.clientWidth;}
  else if(xDef(w.innerWidth,w.innerHeight,d.height)) {
    w=w.innerWidth;
    if(d.height>w.innerHeight) w-=16;
  }
  return w;
}

function xClientHeight()
{
  var h=0,d=document,w=window;
  if(d.compatMode == 'CSS1Compat' && !w.opera && d.documentElement && d.documentElement.clientHeight)
    {h=d.documentElement.clientHeight;}
  else if(d.body && d.body.clientHeight)
    {h=d.body.clientHeight;}
  else if(xDef(w.innerWidth,w.innerHeight,d.width)) {
    h=w.innerHeight;
    if(d.width>w.innerWidth) h-=16;
  }
  return h;
} */

function textCounter(field, maxlimit) {
if (field.value.length > maxlimit) // if too long...trim it!
	{field.value = field.value.substring(0, maxlimit);
	alert("Sorry, you've reached the max of " + maxlimit + " characters!")
	}
}

function getPicExt(file) {
	 ext = file.substring(file.lastIndexOf('.')+1);
	 ext = ext.toLowerCase();
	 if (ext != 'jpg' && ext != 'gif') {
		alert("Please upload ONLY .jpg or .gif files!");
		document.myForm.reset();
		}
}

function move(foo,way) { j=-1; menuLen=foo.length;
if (way=='up') { lim=0; m=-1 } else { lim=menuLen-1; m=1 };
for (i=0;i<menuLen;i++) if (foo.options[i].selected) { j=i; i=menuLen; }
if (j==-1) alert('You have nothing selected.'); else if (j==lim) alert('You can\'t go '+way+' any further.')
else { k=j+m; tempt=foo.options[k].text; tempv=foo.options[k].value;
foo.options[k].text=foo.options[j].text
foo.options[k].value=foo.options[j].value
foo.options[j].text=tempt; foo.options[j].value=tempv;
foo.options[j].selected=false;
foo.options[k].selected=true; } }
function showMenu(foo) { temp=''; menuLen=foo.length; comma=''
for (i=0;i<menuLen;i++) { j=i+1; temp += comma + foo.options[i].value; comma=',' }
document.theForm.theResults.value=temp
}