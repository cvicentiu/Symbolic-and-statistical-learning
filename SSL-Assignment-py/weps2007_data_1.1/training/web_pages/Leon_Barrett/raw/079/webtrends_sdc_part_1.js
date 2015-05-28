<!-- START OF SDC Advanced Tracking Code -->
<!-- Copyright (c) 1996-2005 WebTrends Inc.  All rights reserved. -->
<!-- V7.5 -->
<!-- $DateTime: 2005/07/20 17:14:11 $ -->
<!--
// This is the code to handle the impressions for the onsite Ad campaigns
function dcsAdSearch(){
	if (document.links){
		for (var i=0;i<document.links.length;i++){
			var myAnch=document.links[i]+"";
			var pos=myAnch.toUpperCase().indexOf("WT.AC=");
			if (pos!=-1){
				var start=pos+6;
				var end=myAnch.indexOf("&",start);
				if (end==-1){
				end=myAnch.length;
				}
				var adValue=myAnch.substring(start,end);
				WT.ad=WT.ad?WT.ad+";"+adValue:adValue;
			}
		}
	}
}
var gService = false;
var gTimeZone = -8;
// Code section for Enable First-Party Cookie Tracking
function dcsCookie(){
	if (typeof(dcsOther)=="function"){
		dcsOther();
	}
	else if (typeof(dcsPlugin)=="function"){
		dcsPlugin();
	}
	else if (typeof(dcsFPC)=="function"){
		dcsFPC(gTimeZone);
	}
}
function dcsGetCookie(name){
	var pos=document.cookie.indexOf(name+"=");
	if (pos!=-1){
		var start=pos+name.length+1;
		var end=document.cookie.indexOf(";",start);
		if (end==-1){
			end=document.cookie.length;
		}
		return unescape(document.cookie.substring(start,end));
	}
	return null;
}
function dcsGetCrumb(name,crumb){
	var aCookie=dcsGetCookie(name).split(":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
function dcsFPC(offset){
	if (typeof(offset)=="undefined"){
		return;
	}
	var name=gFpc;
	var dCur=new Date();
	dCur.setTime(dCur.getTime()+(dCur.getTimezoneOffset()*60000)+(offset*3600000));
	var dExp=new Date(dCur.getTime()+315360000000);
	var dSes=new Date(dCur.getTime());
	if (document.cookie.indexOf(name+"=")!=-1){
		var id=dcsGetCrumb(name,"id");
		var lv=parseInt(dcsGetCrumb(name,"lv"));
		var ss=parseInt(dcsGetCrumb(name,"ss"));
		if ((id==null)||(id=="null")||isNaN(lv)||isNaN(ss)){
			return;
		}
		WT.co_f=id;
		WT.vt_f="0";
		WT.vt_f_a="0";
		var dLst=new Date(lv);
		dSes.setTime(ss);
		if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
			dSes.setTime(dCur.getTime());
			WT.vt_f_s="1";
		}
		if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
			WT.vt_f_d="1";
		}
	}
	else{
		var tmpname=name+"_TMP=";
		document.cookie=tmpname+"1";
		if (document.cookie.indexOf(tmpname)!=-1){
			document.cookie=tmpname+"; expires=Thu, 01-Jan-1970 00:00:01 GMT";
			if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
				WT.co_f=gWtId;
				WT.vt_f="0";
			}
			else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
				WT.co_f=gTempWtId;
				WT.vt_f="1";
			}
			else{
				WT.co_f="2";
				var cur=dCur.getTime().toString();
				for (var i=2;i<=(32-cur.length);i++){
					WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
				}
				WT.co_f+=cur;
				WT.vt_f="1";
			}
			WT.vt_f_a=(typeof(gWtAccountRollup)!="undefined")?"0":"1";
			WT.vt_f_s="1";
			WT.vt_f_d="1";
		}
		else{
			WT.vt_f="2";
			WT.vt_f_a="2";
			return;
		}
	}
	WT.co_f=escape(WT.co_f);
	WT.vt_sid=WT.co_f+"."+dSes.getTime();
	var expiry="; expires="+dExp.toGMTString();
	document.cookie=name+"="+"id="+WT.co_f+":lv="+dCur.getTime().toString()+":ss="+dSes.getTime().toString()+expiry+"; path=/"+(((typeof(gFpcDom)!="undefined")&&(gFpcDom!=""))?("; domain="+gFpcDom):(""));
}

// Code section for Use the new first-party cookie generated with this tag.
var gFpc="WT_FPC";
var gWtId="";
var gTempWtId="";
if (gService){
	var gConvert=true;
}


function dcsMultiTrack(){
	for (var i=0;i<arguments.length;i++){
		if (arguments[i].indexOf('WT.')==0){
				WT[arguments[i].substring(3)]=arguments[i+1];
				i++;
		}
		if (arguments[i].indexOf('DCS.')==0){
				DCS[arguments[i].substring(4)]=arguments[i+1];
				i++;
		}
		if (arguments[i].indexOf('DCSext.')==0){
				DCSext[arguments[i].substring(7)]=arguments[i+1];
				i++;
		}
	}
	var dCurrent=new Date();
	DCS.dcsdat=dCurrent.getTime();
	dcsTag();
}

function dcsAdv(){
	// dcsFunc("dcsCookie");
	dcsFunc("dcsAdSearch");
}
//-->
<!-- END OF SDC Advanced Tracking Code -->