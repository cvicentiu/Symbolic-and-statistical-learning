
bbcjs.trace('<b><font color="green">jst_win.js</font> was included.</b>',2);bbcjs.win={};bbcjs.win.prototype=new bbcjs.Module("win",1,"$Revision: 1.16 $","$Date: 2007/01/30 15:40:26 $");bbcjs.win.numWindows=0;bbcjs.win.open=function(url,width,height)
{var win,featstr,t;bbcjs.trace("Window open function called...",3);if(typeof(this.url)!="undefined")t=this;else t=new bbcjs.win.Window(url,width,height);if(typeof(url)=="undefined")url=t.url;featstr="";for(var i in t.features)
{featstr+=i+"="+t.features[i]+",";}
featstr=featstr.substring(0,featstr.length-1);bbcjs.trace("Feature String is: <br /><b>"+featstr+"</b>",4);bbcjs.trace("Opening new window for:<br />&nbsp;&nbsp;&nbsp;"+t.url,3);bbcjs.trace("&nbsp;&nbsp;&nbsp;Window name is: <b>"+t.name+"</b>",4);bbcjs.trace("Full window.open command:<br />window.open('"+t.url+"', '"+t.name+"', '"+featstr+"', "+t.replace+")",5);win=window.open(url,t.name,featstr,t.replace);win.focus();t.openWindow=win;return win;};bbcjs.win.Window=function(url,width,height)
{this.url=url;this.features={width:width,height:height,location:'no',scrollbars:'yes',fullscreen:'no',status:'yes',menubar:'no',toolbar:'no',directories:'no',resizable:'yes'};bbcjs.win.numWindows++;this.name='popwin_'+(bbcjs.win.numWindows);this.replace=false;this.openWindow=false;};bbcjs.win.Window.prototype.open=function(){return;};bbcjs.win.Window.prototype.open=bbcjs.win.open;