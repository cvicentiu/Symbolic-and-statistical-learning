sfHover = function() {
	var mnav = document.getElementById("mnav");
	if(mnav) {
		var sfEls = mnav.getElementsByTagName("LI");
		for (var i=0; i<sfEls.length; i++) {
			sfEls[i].onmouseover=function() {
				this.className+=" sfhover";
				if( document.all ) {
					if(document.getElementById("newlanguage1"))
						document.tngmenu1.newlanguage1.style.visibility='hidden';
					if(leftside && document.getElementById("treeselect"))
						document.getElementById("treeselect").style.visibility='hidden';
				}
			}
			sfEls[i].onmouseout=function() {
				this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
				if( document.all ) {
					if(document.getElementById("newlanguage1"))
						document.tngmenu1.newlanguage1.style.visibility='visible';
					if(leftside && document.getElementById("treeselect"))
						document.getElementById("treeselect").style.visibility='visible';
				}
			}
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);
