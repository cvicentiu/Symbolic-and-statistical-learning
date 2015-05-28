// JavaScript Document
<!--

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_jumpMenu(targ,selObj,restore, bookMarkPage, title){ //v3.0
	if (selObj.options[selObj.selectedIndex].value == "bookmark")
	{
		bookmark();
	}
	  else{
		 eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
		  if (restore) selObj.selectedIndex=0;  
	  }
}

function bookmark(){
	if ((navigator.appName == 'Microsoft Internet Explorer') && (parseInt(navigator.appVersion) >= 4)){
		window.external.AddFavorite(this.location.href, document.title);
	} else if (navigator.appName == "Netscape") {
		alert ("You are Netscape. \n Press (Ctrl + D) to bookmark this page.")
		
	}
}

function newWindow(myPage,myName,w ,h) {
var winT = (screen.height-h)/ 2;
var winL = (screen.width-w)/ 2;
winProps = 'height='+h+',width='+w+',top='+winT+',left='+winL+',toolbar=no ,scrollbars=no,resizable=no';
win = window.open(myPage, myName, winProps);
if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}

function newWindow_Scroll(myPage,myName,w,h,scroll) {
var winT = (screen.height-h)/ 2;
var winL = (screen.width-w)/ 2;
winProps = 'height='+h+',width='+w+',top='+winT+',left='+winL+',toolbar=no,scrollbars=yes,resizable=no';
win = window.open(myPage, myName, winProps);
if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}

function PrinterFriendly(url, w, h) {
var winT = (screen.height-h)/ 2;
var winL = (screen.width-w)/ 2;
winProps = 'height='+h+',width='+w+',top='+winT+',left='+winL+',toolbar=no,scrollbars=yes,resizable=yes';
win = window.open(url, 'printerfriendly', winProps);
if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}


//-->