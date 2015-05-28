var ns4 = (document.layers)? 1 : 0 ;
var ie = (document.all)? 1 : 0 ;
var usr = navigator.userAgent;
var objns6 = (usr.indexOf('Gecko')!=-1)? 1 : 0 ;
var ns6 = ((document.getElementById)&&(objns6))? 1 : 0 ;
var isUnix = (navigator.appVersion.indexOf('X11')!=-1)? 1 : 0 ;
var isLinux = (navigator.appVersion.indexOf('Linux')!=-1)? 1 : 0 ;

//css initialization
var css = "ie";
if(isLinux) { css = "linux";}
else if(isUnix) { css = "unix";}
else if( ns6 ) { css = "ns6";}
else if(ns4) { css = "ns4";}
else if(ie) { css = "ie";}



