// Client-side Javascript used for dragging edit console and opening 
// and closing menus.

var dragOn=0
var dragDiv=null;
var dragX=0,dragY=0;
var zMax=0;
var dragInit=0;

function initDrag() {
	if (document.layers) 
	   document.captureEvents(Event.MOUSEMOVE|Event.MOUSEDOWN|Event.MOUSEUP);
	document.onmousemove=dragf;
	document.onmousedown=dragf;
	document.onmouseup=dragf;
	dragDiv=null;
	dragInit=1;
	if (document.getElementsByTagName) 
	   zMax=document.getElementsByTagName("DIV").length;
	else if (document.all) zMax=document.body.all.tags("DIV").length;
	else if (document.layers) zMax=document.layers.length;
}

function dragf(arg) {
	ev=arg?arg:event;
	if (dragDiv && ev.type=="mousedown") {
		dragOn=1;
		dragX=(ev.pageX?ev.pageX:ev.clientX)-parseInt(dragDiv.style.left);
		dragY=(ev.pageY?ev.pageY:ev.clientY)-parseInt(dragDiv.style.top);
		dragDiv.style.zIndex=zMax++; // remove this line to preserve z-indexes
		return false;
	}
	if (ev.type=="mouseup") {
		dragOn=0;
	}
	if (dragDiv && ev.type=="mousemove" && dragOn) {
		dragDiv.style.left=(ev.pageX?ev.pageX:ev.clientX)-dragX;
		dragDiv.style.top=(ev.pageY?ev.pageY:ev.clientY)-dragY;
		return false;
	}
	if (ev.type=="mouseout") {
		if (!dragOn) dragDiv=null;
	}
}

function drag(div) {
	if (!dragInit) initDrag();
	if (!dragOn) {
		dragDiv=document.getElementById?document.getElementById(div): 
		document.all?document.all[div]:document.layers?document.layers[div]:null;
		if (document.layers) dragDiv.style=dragDiv;
		dragDiv.onmouseout=dragf;
	}
}

function OpenCloseDiv(divName){
	if (divName.style.display == "none") {
		divName.style.display="block";
	}
	else {
		divName.style.display="none";
	}
}