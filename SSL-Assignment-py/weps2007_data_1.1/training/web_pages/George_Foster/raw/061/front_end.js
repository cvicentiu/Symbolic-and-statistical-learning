function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
	
function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function getbrowserwidth() {
	var bWidth;
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		bWidth = document.body.clientWidth;
	} else {                                                
		bWidth = window.outerWidth;
	}
	return bWidth;   
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
 if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
   document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
 else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}

MM_reloadPage(true);

function MM_openBrWindow(theURL,winName,features) { //v2.0
	window.open(theURL,winName,features);
}

function openWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

// popup for a gallery browser
var oGallery = null;
function galleryPopup(strURL) {
	var strTargetName = "galleryRemote";
	var strOptions = "left=100,screenX=100,top=100,screenY=100,channelmode=0,directories=0,height=520,innerHeight=520,width=614,innerWidth=614,hotkeys=0,location=0,menubar=0,titlebar=0,toolbar=0,resizable=1,status=1,scrollbars=0";
	doPopup(oGallery, strURL, strTargetName, strOptions);
}

// popup for a media photo viewer
var oMediaPhoto = null;
function mediaPhotoPopup(strURL) {
	var strTargetName = "mediaPhotoRemote";
	var strOptions = "left=100,screenX=100,top=100,screenY=100,channelmode=0,directories=0,height=235,innerHeight=235,width=370,innerWidth=370,hotkeys=0,location=0,menubar=0,titlebar=0,toolbar=0,resizable=1,status=0,scrollbars=0";
	doPopup(oMediaPhoto, strURL, strTargetName, strOptions);
}

// home page ad popup
var oHomePopup = null;
/*
function homePagePopup(intNodeID) {
	strURL = "page.php?id=" + intNodeID;
	var strTargetName = "homeRemote";
	var strOptions = "left=50,screenX=50,top=50,screenY=50,channelmode=0,directories=0,height=283,innerHeight=283,width=300,innerWidth=300,hotkeys=0,location=0,menubar=0,titlebar=0,toolbar=0,resizable=1,status=0,scrollbars=0";
	doPopup(oHomePopup, strURL, strTargetName, strOptions);
}
*/
function homePagePopup(intNodeID, intHeight, intWidth) {
	strURL = "page.php?id=" + intNodeID;
	if (!intHeight) intHeight = 283;
	if (!intWidth) intWidth = 300;
	var strTargetName = "homeRemote";
	var strOptions = "left=50,screenX=50,top=50,screenY=50,channelmode=0,directories=0,height=" + intHeight + ",innerHeight=" + intHeight + ",width=" + intWidth + ",innerWidth=" + intWidth + ",hotkeys=0,location=0,menubar=0,titlebar=0,toolbar=0,resizable=1,status=0,scrollbars=0";
	if (!(getCookie('broncos_hp_popup') == strURL)) {
		setSessionCookie('broncos_hp_popup', strURL);
		doPopup(oHomePopup, strURL, strTargetName, strOptions);
	}
}



// linkable popup
var oGenericPopupWindow = null;
function popupLink(strURL, strOptions) {
	var strTargetName = "_new";
	doPopup(oGenericPopupWindow, strURL, strTargetName, strOptions);
}

// generic popup function
function doPopup(oStorage, strURL, strTargetName, strOptions) {
	if (!(oStorage && oStorage.open && !oStorage.closed)) {
		oStorage = window.open("", strTargetName, strOptions);
	}
	if (oStorage && oStorage.open && !oStorage.closed) {
		oStorage.focus();
		oStorage.location.href = strURL;
		return oStorage;
	}
	return null;
}


// redirects parent window to new HREF and closes
function parentRedirect(strHREF) {
	if ( window.opener ) {
		window.opener.document.location.href = strHREF;
	}
	window.close();
}

// used for the tailgater of the year voting

function openWin( windowURL, windowName, windowFeatures ) { 
 return window.open( windowURL, windowName, windowFeatures ) ; 
} 

function nameWindow(myName){
	this.window.name=myName;
}