/* Copyright 2000-2004,Coremetrics 4.0.18 $Revision: 1.3 $*/_cm.prototype.addTP=function(){var tp=new cmTP(new cmApp());for(var o in tp){if(tp[o]==null||tp[o]==""||tp[o].toString().indexOf("function ")==0)continue;this[o]=cE(cD(tp[o]));}return this;};function cmApp(){var n=navigator,b=n.appName,c=this;if(b=="Netscape"){c.b="ns"}else if(b=="Microsoft Internet Explorer"){c.b="ie"}else{c.b=b}c.v=parseInt(n.appVersion);}function cmTP(c){var n=navigator,w=window.screen;this.jv=cmJv;if(c.b=="ns"&&c.v>=3)for(var i=0;i<n.plugins.length;i++)eval('this.np'+i+'=n.plugins['+i+'].name');if(c.v>3){if(c.v>=4&&(c.b=="ns"||c.b=="ie")){this.je=(n.javaEnabled()==true)?"y":"n";}if(c.b=="ie"){this.ce=n.cookieEnabled;this.cp=n.cpuClass;}this.sw=w.width;this.sh=w.height;this.pd=w.colorDepth;if(this.pd==0){this.pd=w.pixelDepth;}var fs=w.fontSmoothingEnabled;if(fs){this.fs=fs?"y":"n";}}var tz=new Date();this.tz=tz.getTimezoneOffset()/60;}