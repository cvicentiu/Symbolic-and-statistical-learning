var agt = navigator.userAgent.toLowerCase();
var appVer = navigator.appVersion.toLowerCase();
var is_safari = (agt.indexOf("safari") != -1);
var build = appVer.substring(appVer.lastIndexOf("/")+1);
build = build.substring(0,build.indexOf("."));
var wp_ie = navigator.appName.toLowerCase().indexOf("explorer") != -1;
var wp_pc = navigator.userAgent.toLowerCase().indexOf("windows") != -1;
var wp_mac = navigator.platform.toLowerCase().indexOf("macppc") != -1; 

if (wp_mac && (wp_ie || (is_safari && !(build>86)))) {
	document.write('<style type="text/css">div.navitem:hover table, div.over table {display:none !important;}</style>'); 
}
else {
	function hideSelect() {
		if (wp_ie && wp_pc) {
			if (formObj = document.getElementById("NavHideSelectBox")) formObj.style.visibility = 'hidden';
		}
	}
	function showSelect() {
		if (wp_ie && wp_pc) {
			if (formObj = document.getElementById("NavHideSelectBox")) formObj.style.visibility = 'visible';
		}
	}

	startList = function() {
		if (document.all&&document.getElementById) {
			navRoot = document.getElementById("wp_navcontainer");
			if(navRoot){
				for (i=0; i<navRoot.childNodes.length; i++) {
					node = navRoot.childNodes[i];
					if (node.nodeName=="DIV") {
						node.onmouseover=function() {
							this.className+=" over";
						}
						node.onmouseout=function() {
							this.className=this.className.replace(" over", "");
						}
						node.onclick=function() {
							this.className=this.className.replace(" over", "");
						}
					}
				}
			}
		}
	}
}

if (wp_mac && (wp_ie || (is_safari && !(build>86)))) {
	document.write('<style type="text/css">div.navitem2:hover table, div.over table {display:none !important;}</style>'); 
}
else {
	function hideSelect2() {
		if (wp_ie && wp_pc) {
			if (formObj = document.getElementById("NavHideSelectBox")) formObj.style.visibility = 'hidden';
		}
	}
	function showSelect2() {
		if (wp_ie && wp_pc) {
			if (formObj = document.getElementById("NavHideSelectBox")) formObj.style.visibility = 'visible';
		}
	}

	startList2 = function() {
		if (document.all&&document.getElementById) {
			navRoot2 = document.getElementById("wp_navcontainer2");
			if(navRoot2){
				for (i=0; i<navRoot2.childNodes.length; i++) {
					node2 = navRoot2.childNodes[i];
					if (node2.nodeName=="DIV") {
						node2.onmouseover=function() {
							this.className+=" over";
						}
						node2.onmouseout=function() {
							this.className=this.className.replace(" over", "");
						}
						node2.onclick=function() {
							this.className=this.className.replace(" over", "");
						}
					}
				}
			}
		}
	}
}

function Call2js() {
//	alert("inside Call2js()");
	startList();
	startList2();
//	setTimeout("startList()",500);
//	setTimeout("startList2()",50);
}

//setTimeout("Call2js()",500);
