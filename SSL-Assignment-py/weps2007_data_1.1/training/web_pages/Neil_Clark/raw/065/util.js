/*
	HTML Template Utility
	$Revision: 1.24 $
*/
if( typeof com.adobe.htmltemplate == "undefined" ) com.adobe.htmltemplate = {
cssloaded:0,
featureTestReady: function()
{
return ($("test-css") && com.adobe.css);
},
loadCondAssets: function()
{
var head = document.getElementsByTagName('HEAD')[0]; 
if(!head) return;
var csspaths = new Array();
if(this.featureTestReady())
{
com.adobe.cssprofile.init();
if(browser.ua.indexOf('msie 5.2') == -1 && (browser.ua.indexOf('playstation') == -1) ) {
for(var i=0,len=arguments.length;i<len;i++)
{
var arg = arguments[i];
switch(arg)
{
case "pod": 
csspaths.push("/css/layout/units/pod.css");
if(com.adobe.cssprofile.features.iebox) csspaths.push("/css/layout/units/pod_ie.css");
com.adobe.ui.register('pods');
break;
case "tree": 
csspaths.push("/css/layout/modules/treelist.css");
com.adobe.ui.register('trees','explodes');
break;
case "map": 
csspaths.push("/css/layout/modules/map.css");
com.adobe.ui.register('maps');
break;
case "tab": 
csspaths.push("/css/layout/modules/tabsection.css");
if(com.adobe.cssprofile.features.stretch) csspaths.push("/css/layout/modules/tabsection_ie.css");
com.adobe.ui.register('tabs');
break;
case "dropdown": 
if(!com.adobe.cssprofile.features.directchild) csspaths.push("/css/layout/units/dropdown_help.css");
com.adobe.ui.register('dropdowns');
break;
case "backcompat": 
var compatmode = true;
break;
}
}
}
if(com.adobe.cssprofile.isIE7)
{
csspaths.push("/css/layout/modules/globalnav_ie7.css");
csspaths.push("/css/layout/units/pod_ie7.css");
}			
if(!com.adobe.cssprofile.features.after)
{
csspaths.push("/css/layout/units/compact_noafter.css");	
com.adobe.ui.register('markers');	
}
if(com.adobe.cssprofile.features.stretch)
{
csspaths.push("/css/layout/units/compact_ie.css");
csspaths.push("/css/layout/units/pullout_ie.css");
}
if(!com.adobe.cssprofile.features.adjacent)
{
csspaths.push("/css/themes/markers_help.css");	
}
if(com.adobe.cssprofile.features.iebox)
{
csspaths.push("/css/layout/units/menu_ie.css"); 
if(!compatmode)
{
csspaths.push("/css/layout/master_ie.css"); 
}
}
if(!com.adobe.cssprofile.features.directchild) 
{
csspaths.push("/css/layout/modules/globalnav_ie.css");
if(com.adobe.www.isSecure == true) csspaths.push("/css/layout/modules/globalnav_ie_secure.css");
}
if(browser.isSafari && browser.kitV < 420)
{
csspaths.push("/css/layout/units/swfcontent_help.css");	
}
if(browser.ua.indexOf('msie 5.2') != -1) {		
csspaths.push("/css/layout/master_macie.css");
csspaths.push("/css/layout/modules/tabsection.css");
}		
if(browser.ua.indexOf('playstation') != -1) {
document.write('<link href="/css/layout/ps3.css" type="text/css" rel="stylesheet" media="screen" />');
}
}
if(!com.adobe.www.is && csspaths.length) 
{
var i = csspaths.length-1;
do 
{
csspaths[i] = "http://www.adobe.com"+csspaths[i];
}
while (i--);
}
this.cssloaded = com.adobe.css.attachCssToDOM(csspaths,head);
return true;
}
};
