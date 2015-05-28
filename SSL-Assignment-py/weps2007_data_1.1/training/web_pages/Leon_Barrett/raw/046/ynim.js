document.write('<object classid="clsid:41695A8E-6414-11D4-8FB3-00D0B7730277" ID="Ymsgr"  width="1" height="1"><span id=not_Ymsgr></span></object>');
var immsg = "<!!>Check out this story on Yahoo! Canada News</!!>:";
// plug an onload handler.
function iminit(altimmsg){
	if(altimmsg) immsg = altimmsg;
	var w,v;
	if(document.all){
	  v = document.all.not_Ymsgr;
	}else{
	  v = document.getElementById("not_Ymsgr");
	}
	
	if (v){
		// gecko detection.
		w = document.getElementById("Ymsgr");
		if (w&&w.offsetHeight){
			msgr_installed=1;
			msgr_version="5";
			msgr_platform="w32";
		}else{
			//msgr_installed=0;
			
			//FOR NOW JUST LET IT ASSUME ITS INSTALLED
			msgr_installed=1;
		}
	}else{
		msgr_installed=1;
		msgr_version="5";
		msgr_platform="w32";
	}

	// see if the plugin is there
	if (navigator.mimeTypes && navigator.mimeTypes.length){
		for (i = 0 ; i < navigator.mimeTypes.length ; i++){
			if (navigator.mimeTypes[i].suffixes.indexOf("yps") > -1){
				msgr_installed=1;
				msgr_version="";
				msgr_platform="";
				break;
			}
		}
	}
}


function hasMsgr(){
	var a = document.cookie;
	var b = a.split("; ");
	for (c = 0; c < b.length; c++){
		var d = b[c].indexOf("=");
		var e = b[c].substring(0, d);
		var f = b[c].substring(d + 1);
		if (e == "C"){
			alert(f);
			var g = f.split("& ");
			for (h = 0; h < g.length; h++){
				var i = g[h].indexOf("=");
				var j = g[h].substring(0, i);
				var k = g[h].substring(i + 1);
				if (j == "mg" && k == "1")
				return true;
			}
		}
	}
	return false;
}

function imStory(storyheadline,storylink){
	if (msgr_installed){
		// user has messenger installed -
		// open an im window to a user
		location.href="ymsgr:im?msg="+immsg+"+"+storyheadline+"+"+storylink;
	}else{
		// user does not have messenger installed - 
		// so go to messenger to download it
		if(confirm("You do not appear to have Yahoo! Messenger installed. Would you like to install it now?")){
			location.href = "http://messenger.yahoo.com";
		}
	}
	return false; 
}
