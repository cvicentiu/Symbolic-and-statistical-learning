var popupWindow;
var popupWindowMessage;
var popupWindowPath;
var popupWindowFeatures;

function checkpopupWindow()
{

	if (popupWindow == null)
	{
		var ret = confirm(popupWindowMessage);
		window.open(popupWindowPath, "", popupWindowFeatures)
	}else{
		popupWindow.focus();
	}
}  

//'@APPVERSION: 50.4014.0.2
function show_page(path){
	var sPath
	sPath = new String(path)
	var sFeatures, h, w, win, i,ind
	var urlncodedPath
	h = window.screen.availHeight 
	w = window.screen.availWidth 
	sFeatures = "height=" + h*.50 + ",width=" + w*.52 + ",screenY=" + (h*.30) + ",screenX=" + (w*.33) + ",top=" + (h*.30) + ",left=" + (w*.33) + ",resizable=yes"
sPath=sPath.replace("#","%23")
//was going to to escape on all characters after = but sometimes there are multiple = and we would encode those
//window.alert(ind)
//ind=sPath.indexOf("?")
//urlncodedPath=sPath.substring(0,ind+1) + escape(sPath.substring(ind+1))
//window.alert(urlncodedPath)
//if (urlncodedPath=="")
//{urlncodedPath=path}

//	win = window.open(sPath,"",sFeatures)
	popupWindowMessage = "This site uses pop-ups to implement specific functionality. It appears you have pop-ups blocked.";
	popupWindowPath = sPath;
	popupWindowFeatures = sFeatures;
	window.setTimeout("checkpopupWindow();",1000);
	popupWindow = window.open(sPath,"",sFeatures)
}  


function show_stockinfo(path){
	var sFeatures, h, w, win, i
	h = window.screen.availHeight 
	w = window.screen.availWidth 
	sFeatures = "scrollbars=yes,height=" + h*.50 + ",width=" + w*.52 + ",screenY=" + (h*.30) + ",screenX=" + (w*.33) + ",top=" + (h*.30) + ",left=" + (w*.33) + ",resizable=yes"
	win = window.open(path,"",sFeatures)
}  


function show_invmsg() 
	{
	var sFeatures, h, w, win, i
	path ='invenmessage.asp'
	h = window.screen.availHeight 
	w = window.screen.availWidth 
	sFeatures = "height=" + h*.42 + ",width=" + w*.40 + ",screenY=" + (h*.30) + ",screenX=" + (w*.33) + ",top=" + (h*.30) + ",left=" + (w*.33) + ",resizable"
	win = window.open(path,"",sFeatures)
	
}


function emailwishlist(){
	var sFeatures, h, w, friendWin,path
	h = window.screen.availHeight 
	w = window.screen.availWidth 
	path='EmailWishList.asp'
	sFeatures = "height=" + h*.75 + ",width=" + w*.80 + ",resizable"
	friendWin = window.open(path,"",sFeatures)
	
}

    	 
function linkCorrect() {
	if (window.document.links.length > 1) {
		for (i=0;i<window.document.links.length;i++) {
			if (window.document.links[i].href != "javascript:window.close()") {
				temp = window.document.links[i].href
				window.document.links[i].href = "javascript:openParent('" + temp + "')"
			}
		}
	}
}

function openParent(sHref) {
	window.opener.location = sHref;
	window.close();
}

