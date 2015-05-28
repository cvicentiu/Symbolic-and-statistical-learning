//if(parent.frames.length!=0) { window.top.location.replace(self.document.location); } // FrameBuster
function hide(strElementID){document.getElementById(strElementID).style.visibility = "hidden";}
function unhide(strElementID){document.getElementById(strElementID).style.visibility = "visible";}

function popup_shipping () {window.open("/content/item/shipping/shipping_popup.html","shipping_popup","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=226, height=446");}

function view_toggle(object_ID) {
	//	Purpose: A true visibility toggle (visibility is different from display).
	myObject = document.all(object_ID);
	if (myObject.style.visibility == "hidden") {myObject.style.visibility = "visible";}
	else {myObject.style.visibility = "hidden";}
}

function visibility_toggle(object_ID) {
	//	Purpose: Actually a "display" toggle, not a visibility toggle (visibility is different from display).

	myObject = document.getElementById(object_ID);

	if (myObject.style.display == "none") {myObject.style.display = "";}
	else {myObject.style.display = "none";}

	return true;
}

function SRC_toggle(object_ID, originalSRC, toggledSRC) {
	myObject = document.getElementById(object_ID);
	if (myObject.src.match(originalSRC)== originalSRC) {myObject.src = toggledSRC;}
	else {myObject.src = originalSRC;}
}

function RandomImage () {
// Author: David Lamb,  10/27/2000
// Accepts a variable-length argument list, returning one random argument.
	image = new Array;
	for (var i = 0; i < RandomImage.arguments.length; i++) {image[i] = RandomImage.arguments[i];}
	return image[Math.floor(Math.random() * i)];
}

function MM_findObj(n, d) { //v3.0
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}