<!--
var win = null;
function NewWindow(mypage,myname,w,h,scroll,resize) {
	LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
	TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
	settings = 'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable=+resize+';
	win = window.open(mypage,myname,settings);
}
function bgchange(obj,clr) {
	obj.style.backgroundColor=clr;
}
var popUpWin=0;
function popUpWindow(URLStr, width, left, top) {
	if(popUpWin) {
		if(!popUpWin.closed) popUpWin.close();
	}
	popUpWin = window.open(URLStr, 'popUpWin', 'width='+width+', scrollbars=yes, left='+left+', top='+top+',screenX='+left+',screenY='+top);
}
function adPlace(src, tgt) {
	if (navigator.userAgent.indexOf('Netscape') > -1 && navigator.userAgent.indexOf('Netscape/8') == -1 && navigator.userAgent.indexOf('OS X') == -1) {
		if ((document.getElementById) && navigator.userAgent.indexOf('Netscape6') == -1) {
			var dgTgt = document.getElementById(tgt);
			if (dgTgt!=null) {
				var dgSrc = document.getElementById(src);
				dgTgt.innerHTML = dgSrc.innerHTML;
			}
		}
	} else {
		if (document.getElementById && document.createElement) {
			if (navigator.userAgent.indexOf('Mac_PowerPC') == -1) {
				var dgTgt = document.getElementById(tgt);
				if (dgTgt!=null) {
					var tgtCh = document.createElement("div");
					var dgSrc = document.getElementById(src);
					var temp = dgTgt.appendChild(tgtCh);
					var moveIt = dgTgt.replaceChild(dgSrc, temp);
					dgSrc.style.display="block";
				}
			}
		}
	}
}
// -->