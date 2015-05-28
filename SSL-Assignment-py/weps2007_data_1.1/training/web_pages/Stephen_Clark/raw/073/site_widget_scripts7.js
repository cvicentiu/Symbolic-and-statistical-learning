var doc=document,sById=(doc.getElementById)?true:false,sInner=null,sByIdInner=null,widgets=null,widgetPreload=1;
// change tabs
function changeTabCOn(aLayer,aColor,hover,t,ts){if(sById){if(!t)var t=doc.getElementById(aLayer+"Tab"),ts=t.style;var l=doc.getElementById(aLayer+"Line"),ls=l.style;if(typeof(t.iColor)=="undefined"){t.iColor=ts.backgroundColor;l.iColor=ls.backgroundColor;}t.oColor=(hover)?ts.backgroundColor:aColor;ts.backgroundColor=aColor;if(!hover){ls.backgroundColor=aColor;t.active=1;}}}
function changeTabCOff(aLayer,hover,t){if(sById){if(!t)var t=doc.getElementById(aLayer+"Tab");t.style.backgroundColor=(hover)?t.oColor:t.iColor;if(!hover){var l=doc.getElementById(aLayer+"Line");l.style.backgroundColor=l.iColor;t.active=0;}}}
function changeTabHOn(aLayer,aColor,fColor,fUnder){if(sById){var t=document.getElementById(aLayer+"Tab"),ts=t.style;if(fColor){t.fColor=ts.color;ts.color=fColor;}if(fUnder){ts.textDecoration='underline';}if(aColor && !t.active)changeTabCOn(aLayer,aColor,1,t,ts);}}
function changeTabHOff(aLayer,aColor,fColor,fUnder){if(sById){var t=doc.getElementById(aLayer+"Tab");if(fColor){t.style.color=t.fColor;}if(fUnder){t.style.textDecoration='none';}if(aColor && !t.active)changeTabCOff(aLayer,1,t);}}

// change buttons
function widgetChangeButtons(aLayer,wname,widget,layer){if(sById){if(!widget)widget=widgets[wname];if(!layer)layer=widget.widgetGetLayer(aLayer);var pos=(layer.getAttribute('pos')-0),prev=widget.prev,next=widget.next,tids=widget.tids,tlast=widget.tlast;if(prev)prev.pos=tids[(pos)?pos-1:tlast];if(next)next.pos=tids[(pos!=tlast)?pos+1:0];}}

// hides or shows layer
function widgetLayerSwitch(aLayer,status,widget,layer){if(!layer)layer=widget.widgetGetLayer(aLayer);layer.style.display=(status=='hide')?'none':'block';}
// load layer content
function widgetLoadLayer(aLayer,widget,layer,dur){if(widget[aLayer])return;if(widgetPreload)setTimeout('get'+aLayer+'()',dur||0);else eval('get'+aLayer+'()');widget[aLayer]=1;}
// show layer, hide active - frame
function widgetShowLayer(aLayer,wname,widget,layer){if(sByIdInner){if(!widget)widget=widgets[wname];if(!layer)layer=widget.widgetGetLayer(aLayer);widgetLoadLayer(aLayer,widget,0);var cLayer=widget.cLayer,switchfunc=widget.switchfunc;if(cLayer)widgetLayerSwitch(cLayer,'hide',widget);if(switchfunc)switchfunc(aLayer,layer);widgetLayerSwitch(aLayer,'show',widget,layer);widgetChangeButtons(aLayer,wname,widget);widget.cLayer=aLayer;}}
// show layer, hide active - tab
function widgetShowTabLayer(aLayer,wname){if(sById){var widget=widgets[wname],cLayer=widget.cLayer;if(cLayer){changeTabCOff(cLayer);widgetLayerSwitch(cLayer,'hide',widget);}changeTabCOn(aLayer,widget.aColor);widgetLayerSwitch(aLayer,'show',widget);widget.cLayer=aLayer;}}
// show layer, hide active - tab w/ image
function widgetShowTabILayer(aLayer,wname){if(sById){var widget=widgets[wname],cLayer=widget.cLayer,tfu=widget.tfu;if(cLayer){changeImageOff(cLayer+'Tab',tfu);widgetLayerSwitch(cLayer,'hide',widget);}var aEl=doc.getElementById(aLayer+'Tab'),aname=aEl.getAttribute('asrc');if(aname)changeImageOn(aname,aLayer+'Tab',tfu);widgetLayerSwitch(aLayer,'show',widget);widget.cLayer=aLayer;}}

// Widget Auto methods
// show layer, stop auto
function widgetStopShowLayer(aLayer,wname){if(sByIdInner){var widget=widgets[wname];widgetStopAutoLayer(wname,widget);widgetShowLayer(aLayer,wname,widget);}}
// auto layer switch
function widgetAutoLayer(aLayer,wname,widget){if(!widget)widget=widgets[wname];var layer=widget.widgetGetLayer(aLayer);widgetShowLayer(aLayer,wname,widget,layer);var tids=widget.tids,pos=layer.getAttribute('pos')-0;if(!widget.widgetCheckAutoLayer(pos))return;var nLayer=tids[(pos!=(widget.tlast))?pos+1:0],dur=(layer.getAttribute('dur')-0);widget.timeout=setTimeout("widgetAutoLayer('"+nLayer+"','"+wname+"')",dur);if(widgetPreload)widgetLoadLayer(nLayer,widget,dur/2);}
// start auto layer
function widgetStartAutoLayer(wname){if(sByIdInner){var widget=widgets[wname],cLayer=widget.cLayer,startstopfunc=widget.startstopfunc,pos=0;widget.autoon=1;if(cLayer){pos=doc.getElementById(cLayer).getAttribute('pos')-0+1;if(pos==widget.tnum)pos=0;}if(widget.cloops==widget.loops)widget.cloops-=1;if(startstopfunc)startstopfunc('Start');widgetAutoLayer(widget.tids[pos],wname,widget);}}
// stop auto layer
function widgetStopAutoLayer(wname,widget){if(sByIdInner){if(!widget)widget=widgets[wname];widget.autoon=0;var timeout=widget.timeout,startstopfunc=widget.startstopfunc;if(timeout){clearInterval(timeout);widget.timeout=null;}if(startstopfunc)startstopfunc('Stop');}}
// determines index num based on freqtype and freqlen
function widgetWhichLayer(freqtype,freqlen){var t;switch(freqtype){case 'days':var date=new Date();t=date.getDay();break;case 'hours':var date=new Date();t=date.getHours();break;default:var mth=Math;t=mth.floor(freqlen*mth.random());}return t;}

// Widget Object Methods
// gets a layer
function widgetGetLayer(aLayer){var layer=this.tlayers[aLayer];if(layer)return layer;layer=doc.getElementById(aLayer);this.tlayers[aLayer]=layer;return layer;}
// intial widget display
function widgetDisplay(left,height){var h=doc.getElementById('holder'+this.name);h.className='widgetHolder';if(left)h.style.left=left+'px';if(height)h.style.height=height+'px';}
// check loop
function widgetCheckAutoLayer(pos){if(pos!=0)return 1;this.cloops+=1;if(this.cloops<=this.loops)return 1;widgetStopAutoLayer(this.name,this);return 0;}

// Widget Unsupported Feature
function widgetUnsupportedFeature(unsupported){if(unsupported)eval(unsupported);else unsupportedFeature();}

// Widget Object Constructors
// base widget object constructor
function widgetBaseObj(name){this.name=name;this.tlayers=new Object();this.widgetDisplay=widgetDisplay;this.widgetGetLayer=widgetGetLayer;}
// widget frame object constructor
function widgetFrameObj(name,tids){var tnum=tids.length;this.tids=tids;this.tnum=tnum;this.tlast=tnum-1;this.prev=doc.getElementById(name+'Prev');this.next=doc.getElementById(name+'Next');this.widgetBaseObj=widgetBaseObj;this.widgetBaseObj(name);}
// widget frame object auto constructor
function widgetFrameAutoObj(name,tids,auto,loops,switchfunc,startstopfunc,rotatefunc){this.auto=auto;this.autoon=auto;this.loops=loops;this.switchfunc=switchfunc;this.startstopfunc=startstopfunc;this.rotatefunc=rotatefunc;this.cloops=0;this.timeout=null;this.widgetCheckAutoLayer=widgetCheckAutoLayer;this.widgetFrameObj=widgetFrameObj;this.widgetFrameObj(name,tids);}

// Widget Initializers
// initialize standard widget
function widgetInitFramesStandard(tids,freqs,freqtype){if(sById){if(sInner==null){sInner=(doc.getElementById(tids[0]).innerHTML)?true:false;sByIdInner=sById&&sInner;}if(!widgets)widgets=new Object();var flen=freqs.length;return (flen)?freqs[widgetWhichLayer(freqtype,flen)]:tids[0];}}
function widgetInitTabsStandard(freqs,freqtype){if(!widgets)widgets=new Object();var flen=freqs.length;return freqs[widgetWhichLayer(freqtype,flen)];}
// initialize widget - frames auto type
function widgetInitFramesAuto(name,tids,auto,loops,freqs,freqtype,switchfunc,startstopfunc,unsupported,rotatefunc,left,height){var wLayer=widgetInitFramesStandard(tids,freqs,freqtype);if(!sByIdInner)return widgetUnsupportedFeature(unsupported);var widget=widgets[name]=new widgetFrameAutoObj(name,tids,auto,loops,switchfunc,startstopfunc,rotatefunc);if(rotatefunc)rotatefunc();if(startstopfunc)startstopfunc((auto)?'Start':'Stop');if(auto)widgetAutoLayer(wLayer,name,widget);else widgetShowLayer(wLayer,name,widget);widget.widgetDisplay(left,height);}
// initialize widget - frames type
function widgetInitFrames(name,tids,freqs,freqtype,unsupported,left,height){var wLayer=widgetInitFramesStandard(tids,freqs,freqtype);if(!sByIdInner)return widgetUnsupportedFeature(unsupported);var widget=widgets[name]=new widgetFrameObj(name,tids);widgetShowLayer(wLayer,name,widget);widget.widgetDisplay(left,height);}
// initialize widget - tabs type
function widgetInitTabs(name,freqs,freqtype,aColor,left,height,unsupported){if(!sById)return widgetUnsupportedFeature(unsupported);wLayer=widgetInitTabsStandard(freqs,freqtype);widget=widgets[name]=new widgetBaseObj(name);widget.aColor=aColor;widgetShowTabLayer(wLayer+name,name);widget.widgetDisplay(left,height);}
// initialize widget - tabs type w/ image
function widgetInitTabsI(name,freqs,freqtype,left,height,tfu,unsupported){if(!sById)return widgetUnsupportedFeature(unsupported);wLayer=widgetInitTabsStandard(freqs,freqtype);widget=widgets[name]=new widgetBaseObj(name);widget.tfu=tfu;widgetShowTabILayer(wLayer+name,name);widget.widgetDisplay(left,height);}

// Widget User Prefs
function setRotatePref(wname,rotate,currel){rotate-=0;var widget=widgets[wname],autoon=widget.autoon,rotatefunc=widget.rotatefunc;if(!rotate){var expires=new Date('January 01, 2038');setCookie(wname+'rotatenever',1,expires);if(autoon)widgetStopAutoLayer(wname);openWindow('http://www.boston.com/help/messagestousers/slideshow_neverrotate/','slideshow_neverrotate','width=350,height=230,resizable=yes,scrollbars=yes,toolbar=no,location=no,menubar=no,status=no');}else{expireCookie(wname+'rotatenever');if(!autoon)widgetStartAutoLayer(wname);}if(rotatefunc)rotatefunc(rotate);s_linkType='o';s_linkName=(rotate)?wname+'_rotatealways':wname+'_rotatenever';s_lnk=s_co(currel);s_gs('nytbglobe');}
function showRotatePref(id){if(sById){var rdiv=doc.getElementById(id);rdiv.style.display=(rdiv.style.display=='block')?'none':'block';}}