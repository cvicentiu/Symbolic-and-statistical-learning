function showAd(ad) {
    obj = document.getElementById("ad_" + ad);
    bgObj = document.getElementById("bg_" + ad);
	
    bgObj.style.width = obj.style.width;
    bgObj.style.height = obj.style.height;
		
    offsetX = 0;
    offsetY = 0;
			
    while (obj.nodeName != "BODY") {
		
        offsetX += obj.offsetLeft;
        offsetY += obj.offsetTop;
		//alert( obj.nodeName +" "+ offsetX +" "+ offsetY)
        obj = obj.offsetParent;
    }
	
    bgObj.style.left = offsetX+"px";
    bgObj.style.top = offsetY+"px";
    bgObj.style.display = "";
}


function setCookie(name, value, days) { 
	//days = 1; // default to 1 day if empty 
	var expdate = new Date(); 
	expdate.setTime(expdate.getTime() + days*24*60*60*1000); 
	document.cookie = name + "=" + escape(value) + "; expires=" + expdate.toGMTString(); 
} 

function getCookie (name) {
	var dc = document.cookie;
	var cname = name + "=";
	var clen = dc.length;
	var cbegin = 0;

	while (cbegin < clen) { 
		var vbegin = cbegin + cname.length;

		if (dc.substring(cbegin, vbegin) == cname) { 
			var vend = dc.indexOf (";", vbegin);
			if (vend == -1) vend = clen;

			return unescape(dc.substring(vbegin, vend));
		}

		cbegin = dc.indexOf(" ", cbegin) + 1;

		if (cbegin== 0) break;
	}

	return null;
}