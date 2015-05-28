function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}
// this is needed for function newWindow below
var newWin = null

function newWindow(content, width, height, scroll, tool, menu, loc, dir, status, resize){
	//if (newWin != null)
	//	newWin.close()

	newWin = window.open(content, 'newWin', 'width=' + width + ',height=' + height + ',scrollbars=' + scroll + ',toolbar=' + tool + ',menubar=' + menu + ',location=' + loc + 'directories=' + dir + ',status=' + status + ',resizable=' + resize)
	
	if (newWin!=null) {
		newWin.focus()
	}
	
}

function newExtLinkWindow(content, width, height, scroll, tool, menu, loc, dir, status, resize){
	//if (newWin != null)
	//	newWin.close()

	newWin = window.open(content, 'newLinkWin', 'width=' + width + ',height=' + height + ',scrollbars=' + scroll + ',toolbar=' + tool + ',menubar=' + menu + ',location=' + loc + 'directories=' + dir + ',status=' + status + ',resizable=' + resize)
	
	if (newWin!=null) {
		newWin.focus()
	}
}

function checkCookies() {
    if (document.cookie.indexOf("JSESSIONID")==-1) {
	alert("Cookies must be enabled in your browser in order for this feature to work.  Please check your cookie settings and try again.");
	return false;
    } else {
	return true;
    }
}

function getCheckBox(){
	var box  = '<input type="checkbox" onClick="javascript:if (checkCookies()) { setSkipFlash(this.checked); } else { this.checked=false;  }" ';
	if ( skipFlash() ) {
		box += ' checked=""';
	}

	box += ' /> Check this box to hide the introduction next time you visit.';
	
	return box;

}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function doMouseOver(elem) {
	elem.style.backgroundColor='#F3F3EB';
	elem.style.cursor='pointer';
}

function doMouseOut(elem, color) {
	elem.style.backgroundColor=color;
	elem.style.cursor='auto';
}

function findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}

function doJump(href) {
	if (window.opener!=null) { 
		window.opener.document.jumper.to.value=href;
		window.opener.document.jumper.submit();
	} else { 
		document.jumper.to.value=href;
		document.jumper.submit();
	}
}