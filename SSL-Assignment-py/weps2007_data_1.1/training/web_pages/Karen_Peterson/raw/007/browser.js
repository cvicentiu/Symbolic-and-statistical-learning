
var exclude=1;
var agt=navigator.userAgent.toLowerCase();
var win=0;var mac=0;var lin=1;
if(agt.indexOf('win')!=-1){win=1;lin=0;}
if(agt.indexOf('mac')!=-1){mac=1;lin=0;}
var lnx=0;if(lin){lnx=1;}
var ice=0;
var ie=0;var ie4=0;var ie5=0;var ie6=0;var com=0;var dcm;
var op5=0;var op6=0;var op7=0;
var ns4=0;var ns6=0;var ns7=0;var mz7=0;var kde=0;var saf=0;

//alert("agent="+agt+"\nversion="+parseInt(navigator.appVersion));
if(typeof navigator.vendor!="undefined" && navigator.vendor=="KDE"){
	var thisKDE=agt;
	var splitKDE=thisKDE.split("konqueror/");
	var aKDE=splitKDE[1].split("; ");
	var KDEn=parseFloat(aKDE[0]);
	if(KDEn>=2.2){
		kde=1;
		ns6=1;
		exclude=0;
		}
	}
else if(agt.indexOf('webtv')!=-1){exclude=1;}
else if(typeof window.opera!="undefined"){
	exclude=0;
	if(agt.indexOf("opera/5")!=-1||agt.indexOf("opera 5")!=-1){op5=1;}
	if(agt.indexOf("opera/6")!=-1||agt.indexOf("opera 6")!=-1){op6=1;}
	if(agt.indexOf("opera/7")!=-1||agt.indexOf("opera 7")!=-1){op7=1;}
	}
else if(typeof document.all!="undefined"&&!kde){
	exclude=0;
	ie=1;
	if(typeof document.getElementById!="undefined"){
		ie5=1;
//		alert("position of msie 6="+agt.indexOf("msie 6"));
		if(agt.indexOf("msie 6")!=-1){
			ie6=1;
			ie5=0;
			dcm=document.compatMode;
			if(dcm!="BackCompat"){com=1;}
			}
		}
	else{ie4=1;}
	}
else if(typeof document.getElementById!="undefined"){
	exclude=0;
	if(agt.indexOf("netscape/6")!=-1||agt.indexOf("netscape6")!=-1){ns6=1;}
	else if(agt.indexOf("netscape/7")!=-1||agt.indexOf("netscape7")!=-1){ns6=1;ns7=1;}
	else if(agt.indexOf("gecko")!=-1){ns6=1;mz7=1;}
	if(agt.indexOf("safari")!=-1 || (typeof document.childNodes!="undefined" && typeof document.all=="undefined" && typeof navigator.taintEnabled=="undefined")){mz7=0;ns6=1;saf=1;}
	}
else if((agt.indexOf('mozilla')!=-1)&&(parseInt(navigator.appVersion)>=4)){
	exclude=0;
	ns4=1;
	if(typeof navigator.mimeTypes['*']=="undefined"){
		exclude=1;
		ns4=0;
		}
	}
if(agt.indexOf('escape')!=-1){exclude=1;ns4=0;}
if(typeof navigator.__ice_version!="undefined"){exclude=1;ie4=0;}





//ADD N4 STYLESHEET
// Add a stylesheet that is better suited for Netscape 4 browsers, since they can not handle CSS2 properly

function addN4styleHome() {

//alert(agt);

 if (ns4 && win) { 
 	document.write("<link rel='stylesheet' media='screen' type='text/css' href='/egov/portal.nsf/allfiles/files/$file/nn4pc.css'>"); 
	}
 if (ns4 && mac) { 
 	document.write("<link rel='stylesheet' media='screen' type='text/css' href='/egov/portal.nsf/allfiles/files/$file/nn4mac.css'>"); 
	}
else if (op5) { 
 	document.write("<link rel='stylesheet' media='screen' type='text/css' href='/egov/portal.nsf/allfiles/files/$file/op5pc.css'>"); 
	}
else if (ie5 && win) { 
 	document.write("<link rel='stylesheet' media='screen' type='text/css' href='/egov/portal.nsf/allfiles/files/$file/ie5pc.css'>"); 
	}
	
 }
 
 
 
function addCSS() {

//alert(agt);

 if (ns4 && win) { 
 	document.write("<link rel='stylesheet' media='screen' type='text/css' href='/egov/portal.nsf/allfiles/files/$file/nn4pc.css'>"); 
	}
 if (ns4 && mac) { 
 	document.write("<link rel='stylesheet' media='screen' type='text/css' href='/egov/portal.nsf/allfiles/files/$file/nn4mac.css'>"); 
	}
else if (op5) { 
 	document.write("<link rel='stylesheet' media='screen' type='text/css' href='/egov/portal.nsf/allfiles/files/$file/op5pc.css'>"); 
	}
else if (ie5 && win) { 
 	document.write("<link rel='stylesheet' media='screen' type='text/css' href='/egov/portal.nsf/allfiles/files/$file/ie5pc.css'>"); 
	}
	
 }
 

 
    
 