var agt=navigator.userAgent.toLowerCase();
var is_major=parseInt(navigator.appVersion);
var is_minor=parseFloat(navigator.appVersion);
var is_nav=((agt.indexOf("mozilla")!=-1)&&(agt.indexOf("spoofer")==-1)&&(agt.indexOf("compatible")==-1)&&(agt.indexOf("opera")==-1)&&(agt.indexOf("webtv")==-1)&&(agt.indexOf("hotjava")==-1));
var is_ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
var is_ie3=(is_ie&&(is_major<4));
var is_ie4=(is_ie&&(is_major==4)&&(agt.indexOf("msie 4")!=-1));
var is_ie4up=(is_ie&&(is_major>=4));
var is_ie5=(is_ie&&(is_major==4)&&(agt.indexOf("msie 5.0")!=-1));
var is_ie5_5=(is_ie&&(is_major==4)&&(agt.indexOf("msie 5.5")!=-1));
var is_ie5up=(is_ie&&!is_ie3&&!is_ie4);
var is_ie5_5up=(is_ie&&!is_ie3&&!is_ie4&&!is_ie5);
var is_ie6=(is_ie&&(is_major==4)&&(agt.indexOf("msie 6.")!=-1));
var is_ie6up=(is_ie&&!is_ie3&&!is_ie4&&!is_ie5&&!is_ie5_5);
var is_ie7=(is_ie&&(is_major==4)&&(agt.indexOf("msie 7.")!=-1));
var is_ie7up=(is_ie&&!is_ie3&&!is_ie4&&!is_ie5&&!is_ie5_5&&!is_ie6);
var is_iecc=(is_ie&&(agt.indexOf("comcast")!=-1));
var is_safari=(navigator.appVersion.indexOf("Safari")>-1);
var is_firefox=(agt.indexOf("firefox")!=-1);
var is_win=((agt.indexOf("win")!=-1)||(agt.indexOf("16bit")!=-1));
var is_win95=((agt.indexOf("win95")!=-1)||(agt.indexOf("windows 95")!=-1));
var is_winme=((agt.indexOf("win 9x 4.90")!=-1));
var is_win2k=((agt.indexOf("windows nt 5.0")!=-1));
var is_winXP=((agt.indexOf("windows nt 5")!=-1));
var is_win98=((agt.indexOf("win98")!=-1)||(agt.indexOf("windows 98")!=-1));
var is_winnt=((agt.indexOf("winnt")!=-1)||(agt.indexOf("windows nt")!=-1));
var is_win32=(is_win95||is_winnt||is_win98||((is_major>=4)&&(navigator.platform=="Win32"))||(agt.indexOf("win32")!=-1)||(agt.indexOf("32bit")!=-1));
var is_mac=(agt.indexOf("mac")!=-1);
var is_mac68k=(is_mac&&((agt.indexOf("68k")!=-1)||(agt.indexOf("68000")!=-1)));
var is_macppc=(is_mac&&((agt.indexOf("ppc")!=-1)||(agt.indexOf("powerpc")!=-1)));
var is_macosx=(is_mac&&((agt.indexOf("os x")!=-1)||(agt.indexOf("osx")!=-1)));
var is_linux=(agt.indexOf("linux")!=-1);
var domain="";
var sessiondomain=".comcast.net";
if(document.location.href.indexOf("wwwj")!=-1){
domain="http://www.comcast.net";
}else{
domain="http://"+document.domain;
}
var loggedin=false;
var haspreferences=false;
var isPrimary=false;
var firstName="";
var greeting="";
var zipCode="";
var areaCode="";
var user="";
var pollPath="";
var param="";
var yhmcount=-2;
var iscobrand;
if(document.location.href.indexOf("http://comcast.net")!=-1){
document.location.href="http://www.comcast.net";
}
if((loggedin)&&((document.location.href.indexOf("home.html")!=-1)||(document.location.href.indexOf("comcast.html")!=-1))){
document.location.href="http://www.comcast.net";
}
var migrated_urls=["/games/","/games/arcade/","/games/playgames/","/games/playgames/details.jsp","/games/playgames/webplayable/","/games/playgames/downloadable/index.jsp"];
for(i=0;i<migrated_urls.length;i++){
if(document.location.pathname==migrated_urls[i]){
document.location.href="http://playgames.comcast.net";
}
}
if(document.location.pathname=="/games/invasion/setup/"){
document.location.href="http://gameinvasion.comcast.net/gameinvasion/setup/";
}
if(document.location.pathname=="/games/invasion/sales/"){
document.location.href="http://gameinvasion.comcast.net/gameinvasion/sales/";
}
if(document.location.pathname=="/games/invasion/"){
document.location.href="http://gameinvasion.comcast.net";
}
if(document.location.pathname=="/gameinvasion/setup"){
document.location.href="http://gameinvasion.comcast.net/gameinvasion/setup/";
}else{
if(document.location.pathname=="/gameinvasion/sales"){
document.location.href="http://gameinvasion.comcast.net/gameinvasion/sales/";
}else{
if(document.location.pathname=="/gameinvasion"){
document.location.href="http://gameinvasion.comcast.net";
}
}
}
var tabData={active:[],types:{dvd:[0,31,66],movies:[0,80],playgames:[0,87,218]}};
function getRedirectArguments(){
var _1=window.location;
if(new String(_1).indexOf("?")==-1){
return "?redirectUrl="+document.location;
}else{
var _2="?redirectUrl="+_1.protocol+"//"+_1.host+_1.pathname;
var _3=_1.search.substr(1,_1.search.length);
var _4=_3.split("&");
if(_4.length){
for(i=0;i<_4.length;i++){
_2+="&redirectArg"+(i+1)+"="+_4[i];
}
}
return _2;
}
}
function setSigninRedirect(_5){
var _6=document.getElementById(_5);
if(_6==null){
return false;
}
_6.href=domain+"/signin.jsp"+getRedirectArguments();
}
function getGreeting(){
var _7=new Date();
var _8=_7.getHours();
var _9="<span>";
if(_8<12){
_9+="Good Morning";
}else{
if(_8<17){
_9+="Good Afternoon";
}else{
_9+="Good Evening";
}
}
return _9;
}
var mn=60000;
var hr=3600000;
var dy=hr*6;
var months=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var days=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
function getElapsed(_a){
var _b=(new Date()).getTime();
var dt=makeDate(_a);
var _d=dt.getTime();
var _e=_b-_d;
var _f="";
if(_e>dy){
_f=days[dt.getDay()]+" ";
_f+=months[dt.getMonth()]+" ";
_f+=dt.getDate()+", ";
min=dt.getMinutes();
if(min<10){
min="0"+min;
}
if(dt.getHours()>12){
_f+=(dt.getHours()-12)+":"+min+" ";
_f+="PM";
}else{
_f+=dt.getHours()+":"+min+" ";
_f+="AM";
}
}else{
if(_e>hr){
var tm=Math.round(_e/hr);
var s=(tm>1)?"s":"";
_f=tm+" hour"+s+" ago";
}else{
if(_e>mn){
var tm=Math.round(_e/mn);
var s=(tm>1)?"s":"";
_f=tm+" minute"+s+" ago";
}
}
}
return _f;
}
function makeDate(_12){
var _13=_12.substr(0,4);
var _14=_12.substr(4,2)-1;
var day=_12.substr(6,2);
var _16=_12.substr(9,2);
var _17=_12.substr(11,2);
var dt=new Date();
dt.setUTCFullYear(_13);
dt.setUTCMonth(_14);
dt.setUTCDate(day);
dt.setUTCHours(_16);
dt.setUTCMinutes(_17);
return dt;
}
function getArgs(){
var _19=new Object();
try{
var _1a=top.location.search.substring(1);
}
catch(e){
var _1a="";
}
var _1b=_1a.split("&");
for(var i=0;i<_1b.length;i++){
var pos=_1b[i].indexOf("=");
if(pos==-1){
continue;
}
var _1e=_1b[i].substring(0,pos);
var _1f=_1b[i].substring(pos+1);
_19[_1e]=unescape(_1f);
}
return _19;
}
function getParam(_20){
var _21=getArgs();
var _22=_21[_20];
if(typeof _22=="undefined"){
_22="";
}
return _22;
}
function isProduction(){
var dom=new String(location.hostname);
if(dom.indexOf("comcast.net")>=0||dom.indexOf("attbi.com")>=0){
return true;
}else{
return false;
}
}
function stringReplace(_24,_25,_26){
var _27;
var _28="";
var _29="";
for(var x=0;x<_25.length;x++){
_28=_25.substr(x,1);
if(_28=="$"||_28=="^"||_28=="*"||_28=="("||_28==")"||_28=="+"||_28=="?"||_28=="\\"){
_28="\\"+_28;
}
_29+=_28;
}
_27=new RegExp(_29,"gi");
results=_24.replace(_27,_26);
return results;
}
function trim(_2b){
if(typeof _2b!="string"){
return _2b;
}
var _2c=_2b;
var ch=_2c.substring(0,1);
while(ch==" "){
_2c=_2c.substring(1,_2c.length);
ch=_2c.substring(0,1);
}
ch=_2c.substring(_2c.length-1,_2c.length);
while(ch==" "){
_2c=_2c.substring(0,_2c.length-1);
ch=_2c.substring(_2c.length-1,_2c.length);
}
while(_2c.indexOf("  ")!=-1){
_2c=_2c.substring(0,_2c.indexOf("  "))+_2c.substring(_2c.indexOf("  ")+1,_2c.length);
}
return _2c;
}
var minNum=10000000;
var maxNum=99999999;
var randomNumber=Math.round(Math.random()*(maxNum-minNum))+minNum;
var status=((loggedin)?"logged":"anon");
var term=getParam("query");
var pagename=getFirstFolder();
var placement=((loggedin)?"Left":"Right");
if((pagename=="comcast.html")||(pagename=="home.html")||(pagename=="explore.html")){
pagename="home";
}
function writeBannerSkyScraper(_2e){
document.write("<scr"+"ipt language=\"JavaScript1.1\" src=\"http://oascentral.comcast.net/RealMedia/ads/adstream_jx.ads/comcast.net/searchresults/1"+randomNumber+"@Right?c="+status+"&query="+term+"\">");
document.write("</scr"+"ipt>");
}
function writeSkyBan(_2f,_30){
if(_30!=null){
pagename=_30;
}
if((document.getElementById("comcastnet").className.indexOf("lite")==-1)){
if((_2f=="navbar"&&loggedin)||(_2f=="assistant"&&!loggedin)){
document.write("<iframe id=\"skyban\" src=\"/providers/banners/skyscraper/index.html\" marginwidth=\"0\" marginheight=\"0\" frameborder=\"0\" scrolling=\"no\"></iframe>");
}
}
}
function getFirstFolder(){
var _31=new String(window.location.pathname);
var _32=_31.split("/");
return _32[1];
}
function getChannelName(){
var _33=(iscobrand==true)?cobrand:pagename;
var _34=new String(window.location.pathname).split("/");
var _35=(_33=="qry");
if(_35){
_33="search/?tab=web";
}
var _36=new String(location.hostname).split(".");
if(_36[0]=="acctmgt"){
_33="account";
}else{
if(_36[0]=="shopping"||(new String(window.location.pathname).indexOf("pricegrabber")!=-1)){
_33="shopping";
}
}
return _33;
}
function navTracking(){
if(document.getElementById!=null){
var _37=document.getElementById("nav");
if(_37!=null){
var _38=_37.getElementsByTagName("a");
for(i=0;i<_38.length;i++){
if(_38[i].className=="menu"){
continue;
}
var _39=new String(_38[i].href);
if(_39.indexOf("javascript:")!=-1){
continue;
}
_38[i].href+=((_39.indexOf("?")!=-1)?"&":"?")+"CM.src=Navigation";
}
}
}
}
var chnlPath="";
if(document.location.href.indexOf("invasion")!=-1){
chnlPath="games";
}else{
if(document.location.href.indexOf("playgames")!=-1){
chnlPath="gamesplay";
}else{
chnlPath=pagename;
}
}
function searchQry(_3a){
if(_3a!="videosearch"){
document.location.href="/qry/"+_3a+"?query="+getParam("query");
}else{
document.location.href="http://videosearch.comcast.net/ss-query/videosearch.jsp?q="+getParam("query");
}
}
function submitAskComcast(frm){
if(frm.q.value==""){
return false;
}
var _3c="scrollbars=no,status=no,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes";
var _3d=_3c+",width=500,height=435";
var _3e=new String(frm.q.value).split(" ");
var _3f=frm.action+"?q="+_3e.join("+");
window.open(_3f,"ask",_3d);
return false;
}
function externalLinks(){
if(!document.getElementsByTagName){
return;
}
var _40=document.getElementsByTagName("a");
for(var i=0;i<_40.length;i++){
var _42=_40[i];
var _43="scrollbars=no,status=no,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes";
var _44=_43+",width=650,height=320";
var _45=_43+",width=560,height=625";
var _46=_43+",width=560,height=625";
var _47=_43+",width=500,height=435";
var _48=". This link will open in a new window.";
var _49=". This link will open in a new window.";
var _4a="View a photo slideshow starting with this picture. This link will open in a new window.";
if(window.self.location!=window.top.location){
if(_42.getAttribute("target")!="_blank"){
_42.setAttribute("target","_top");
}
}
if(_42.getAttribute("rel")){
if(_42.getAttribute("rel").indexOf("external")!=-1){
_42.target="_blank";
}
if(_42.getAttribute("rel").indexOf("popup")!=-1){
_42.onclick=function(){
var _4b=(this.href.indexOf("Comic")!=-1||this.href.indexOf("comic")!=-1)?_44:_43;
window.open(this.href,this.rel,_4b);
return false;
};
}
if(_42.getAttribute("rel")=="fan"){
_42.onclick=function(){
window.open(this.href,"fan",_45);
return false;
};
}
if(_42.getAttribute("rel")=="ask"){
_42.onclick=function(){
window.open(this.href,"ask",_47);
return false;
};
}
if(_42.getAttribute("rel").indexOf("symbollookup")!=-1){
_42.onclick=function(){
var _4c=this.href;
var _4d=document.getElementById("searchfor");
if(_4d!=null){
_4c+="?searchfor="+_4d.value;
}
window.open(_4c,this.rel,_47);
return false;
};
}
if(_42.className&&_42.className.indexOf("channel")!=-1){
_42.onclick=function(){
subnav(this.getAttribute("rel"),this);
return false;
};
}
if(_42.getAttribute("rel")=="opener"){
_42.onclick=function(){
opener.document.location.href=this.getAttribute("href");
self.close();
return false;
};
}
}
}
}
function subnav(_4e,_4f){
if(!document.getElementById){
return;
}
var _4e=document.getElementById(_4e);
if(_4e.style.display=="none"){
_4e.style.display="";
_4f.className=stringReplace(_4f.className,"menu","menu-s");
}else{
_4e.style.display="none";
_4f.className=stringReplace(_4f.className,"menu-s","menu");
}
}
function writeNav(){
document.write("<iframe src=\"http://www.comcast.net/includes/layout/inav.html\" id=\"navframe\" frameborder=\"0\" scrolling=\"no\"></iframe>");
}
function writeNavBody(){
if(parent.document.location.href.indexOf("finance.comcast.net")!=-1){
if(parent.document.location.href.indexOf("/rich/us_markets")!=-1){
document.write("<body id=\"comcastnet\" class=\"finance markets rich standard\">");
}else{
document.write("<body id=\"comcastnet\" class=\"finance main rich standard\">");
}
}
}
function writeAssistant(){
var _50=document.getElementsByTagName("body")[0];
if(_50.className.indexOf("rich")!=-1){
var pop="<div id=\"assistant-pop\"><a href=\"#\" onclick=\"popAssistant(); return false;\" title=\"Launch the Popup Assistant. This link will open in a new window.\"><span>Comcast Assistant</span></a></div>";
var _52="<div id=\"assistant-modify\"><div><a href=\"#\"><span>Modify Assistant</span></a></div></div>";
var _53="<div class=\"skip\"><a href=\"#a-assistant\">Skip this Flash Movie</a></div>";
var _54="<a name=\"a-assistant\"></a><div class=\"skip\"><a href=\"#a-pagetop\">Back to Top</a><br /></div>";
var _55="<div id=\"assistant-faux\"><a href=\"/signin.jsp\" title=\"Access the Comcast Assistant by signing in to Comcast.net\"><span>Comcast Assistant</span></a></div>";
var _56="<div id=\"assistant-teaser\"><a href=\"http://www.comcast.net/security/mcafee/?cm.src=VirusScanAssistantPromo\"><img src=\"/images/global/teaser.jpg\" alt=\"Comcast High-Speed Internet includes: McAfee Virus Protection. Free Download.\" /></a></div>";
var _57="<div id=\"assistant-teaser\"><iframe src=\"/providers/assistant/teaser/index.html\" scrolling=\"no\" frameborder=\"0\" width=\"200\" height=\"300\"></iframe></div>";
var _58="?is=common/assistant";
_58+="&un="+user;
if((hasRightVersion)&&(loggedin)){
document.write(pop);
document.write(_53);
document.write("<div id=\"assistant-flash\">");
writeFlash("assistantFlash","/Canvas.swf"+_58,200,1900,"#19314B","Window");
document.write("</div>");
document.write(_54);
}else{
if((hasRightVersion)&&(isInNetwork)){
document.write(pop);
writeSkyBan("assistant");
}else{
if((hasRightVersion)&&((!isInNetwork)&&(!loggedin))){
writeSkyBan("assistant");
}
}
}
}
}
function writePopupAssistant(){
if((hasRightVersion)&&(loggedin)){
self.focus();
var _59="?is=common/assistant";
_59+="&un="+user;
var _5a=600;
if(typeof (window.innerWidth)=="number"){
_5a=window.innerHeight;
}else{
if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){
_5a=document.documentElement.clientHeight;
}else{
if(document.body&&(document.body.clientWidth||document.body.clientHeight)){
_5a=document.body.clientHeight;
}
}
}
writeFlash("assistantFlash","/Canvas.swf"+_59,200,1300,"#19314B");
}else{
self.close();
}
}
function popAssistant(){
if((hasRightVersion)&&(loggedin)){
var h=(eval((screen.height)-100));
window.open("/providers/assistant/popup.html","popup_assistant","scrollbars=yes,status=no,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes,width=220,height="+h+",top=10,left=10");
}else{
document.location.href="/signin.jsp?redirectUrl="+document.location;
}
}
function writeCover(_5c){
if(hasRightVersion){
var _5d="?channel="+_5c+"&";
_5d+="isLoggedIn=true&";
h=466;
_5d+="tod="+getParam("tod")+"&lvl="+getParam("lvl");
document.write("<div id=\"cover\">");
writeFlash("coverFlash","/swf/classic/cover/CoverSA.swf"+_5d,592,h);
document.write("</div>");
}
}
function writePoll(_5e){
}
function writeScores(_5f,_60){
if((hasRightVersion)&&(document.location.href.indexOf("golf")==-1)){
document.write("<div class=\"module wide scores\">");
document.write("<h3 id=\"h-scores\">Scoreboard</h3>");
document.write("<div class=\"skip\"><a href=\"#a-scores\">Skip this Flash Movie</a><br /></div>");
writeFlash("scoresFlash","/swf/common/module/scores/scores.swf?backgroundColor=FFFFFF&islgin="+loggedin,200,420);
document.write("<a name=\"a-scores\"></a>");
document.write("</div>");
document.write("<div class=\"module-divider\"></div>");
}
}
function writeFlashHome(){
var _61=GetCrumb(myportal,"em");
document.write("<div id=\"flashhome-wrapper\">");
document.write("<div id=\"flashhome\">");
document.write("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" width=\"592\" height=\"2000\" id=\"site\" align=\"middle\">");
document.write("  <param name=\"allowScriptAccess\" value=\"sameDomain\" />");
document.write("  <param name=\"movie\" value=\"Canvas.swf\" />");
document.write("  <param name=\"FlashVars\" value=\"is=classic&loggedin=true&ion=true&un="+_61+"&tod="+getParam("tod")+"&lvl="+getParam("lvl")+"\" />");
document.write("  <param name=\"quality\" value=\"high\" />");
document.write("  <param name=\"menu\" value=\"false\" />");
document.write("  <param name=\"salign\" value=\"lt\" />");
document.write("  <param name=\"bgcolor\" value=\"#EBEDEF\" />");
document.write("  <embed src=\"Canvas.swf\" quality=\"high\" FlashVars=\"is=classic&loggedin=true&ion=true&un="+_61+"\" salign=\"lt\" bgcolor=\"#19314B\" width=\"592\" height=\"2000\" name=\"site\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />");
document.write("</object>");
document.write("</div></div>");
}
var sessionHomeCookie=GetCookie("SESSIONHOME");
function writeExpress(){
var _62=new String(window.location.search);
_62=_62.substr(1);
if(_62.length>0){
_62+="&";
}
_62+="un="+GetCrumb(myportal,"em")+"&";
_62+="&is=express&";
_62+="ion="+isInNetwork+"&";
_62+=stamp;
var w="100%";
if(isIE){
w="995";
}
document.write("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" width=\""+w+"\" height=\"2000\" id=\"site\" align=\"middle\">");
document.write("  <param name=\"allowScriptAccess\" value=\"sameDomain\" />");
document.write("  <param name=\"movie\" value=\"Canvas.swf\" />");
document.write("  <param name=\"FlashVars\" value=\""+_62+"\" />");
document.write("  <param name=\"quality\" value=\"high\" />");
document.write("  <param name=\"menu\" value=\"false\" />");
document.write("  <param name=\"salign\" value=\"lt\" />");
document.write("  <param name=\"bgcolor\" value=\"#19314B\" />");
document.write("  <embed src=\"Canvas.swf\" quality=\"high\" FlashVars=\""+_62+"\" salign=\"lt\" bgcolor=\"#19314B\" width=\""+w+"\" height=\"2000\" name=\"site\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />");
document.write("</object>");
document.write("<iframe id=\"page\" name=\"page\" src=\"page.html?section=0&content=0&name=HOME - Comcast.net\" noresize=\"noresize\" width=\"400\" height=\"0\" frameborder=\"0\" scrolling=\"no\"></iframe>");
}
function metaBypass(){
if((sessionHomeCookie=="express")||(sessionHomeCookie=="forcedexpress")){
}else{
if(loggedin){
document.write("<meta http-equiv=\"refresh\" content=\"5; URL=/explore.html\" />");
}else{
}
}
}
function writeEmbeddedFan(){
}
function viewTheFan(_64){
}
function hideTheFan(){
var _65=document.getElementById("fanLayer");
_65.style.left=-2500;
_65.style.display="none";
}
function popTheFan(vid,_67){
window.open("/providers/fan/popup.html?"+vid+"&config="+_67,"thefan","width=560,height=625");
}
function hideStatusMsg(){
document.getElementById("statusmsg").style.display="none";
}
function initTabs(){
if(document.getElementsByTagName){
var _68=document.getElementsByTagName("dl");
for(i=0;i<_68.length;i++){
if(!_68[i].className||_68[i].className!="tab-set"){
continue;
}
var _69=new String(_68[i].id).split("-")[2];
var _6a=new String(_68[i].id).split("-")[3];
var _6b=new String(_68[i].id).split("-");
var _6c=(_6b[4]!=null)?_6b[4]:160;
tabData.active[_6a]={tabRefs:[],contentRefs:[],currTab:null,type:_69};
var _6d=new Date();
var _6e=_6d.getDay();
var _6f=(_6e==0||_6e>4);
var _70=((_6a=="intheaters")&&_6f);
var _71=0;
var _72=0;
var _73=null;
for(var o=0;o<_68[i].childNodes.length;o++){
if(_68[i].childNodes[o].nodeType==1){
var _75=new String(_68[i].childNodes[o].nodeName).toLowerCase();
if(_75=="dt"){
tabData.active[_6a].tabRefs[_71]=_68[i].childNodes[o];
if((_70&&_71==1)||_73==null){
_73=_68[i].childNodes[o];
}
var _76=tabData.types[_69][_71];
var _77=(tabData.types[_69][_71+1]!=null)?tabData.types[_69][_71+1]:null;
var _78=(_77!=null?_77:_6c)-_76;
_72+=tabData.types[_69][_71];
_68[i].childNodes[o].id="tab-set-hdr-"+_6a+"-"+_71;
_68[i].childNodes[o].style.backgroundImage="url(http://media3.comcast.net/images/headings/tabs-"+_69+".gif)";
_68[i].childNodes[o].style.backgroundPosition="-"+_76+"px 0px";
_68[i].childNodes[o].style.marginLeft=(_76+"px");
_68[i].childNodes[o].style.width=(_78+"px");
_68[i].childNodes[o].onclick=function(){
activateTab(this);
};
}else{
if(_75=="dd"){
tabData.active[_6a].contentRefs[_71]=_68[i].childNodes[o];
if(!_71++){
_68[i].childNodes[o].style.visiblity="visible";
}
}
}
}else{
lastTag=null;
}
}
if(_73!=null){
activateTab(_73);
}
}
}
}
function activateTab(_79){
var _7a=new String(_79.id).split("-");
var _7b=_7a[3];
var _7c=tabData.active[_7b].type;
var _7d=_7a[4];
if(tabData.active[_7b].currTab!=null){
var _7e=tabData.active[_7b].currTab;
var _7f=tabData.types[_7c][_7e];
tabData.active[_7b].tabRefs[_7e].style.backgroundPosition="-"+_7f+"px 0px";
tabData.active[_7b].contentRefs[_7e].style.display="none";
}
var _80=tabData.types[_7c][_7d];
tabData.active[_7b].tabRefs[_7d].style.backgroundPosition="-"+_80+"px -18px";
tabData.active[_7b].contentRefs[_7d].style.display="block";
tabData.active[_7b].currTab=_7d;
}
var myportal="";
myportal=GetCookie("MYPORTAL");
if(myportal!=""){
user=GetCrumb(myportal,"em");
if(user!=""){
loggedin=true;
}
greeting=GetCrumb(myportal,"gt");
zipCode=GetCrumb(myportal,"zip");
areaCode=GetCrumb(myportal,"npa");
isPrimary=(GetCrumb(myportal,"ipr")=="y")?true:false;
var p=GetCrumb(myportal,"p");
if(p!=""){
haspreferences=true;
}
}
function getZipCode(){
return zipCode;
}
function fanPopup(url){
if(hasRightVersion){
window.open(url,"thefan","scrollbars=no,status=no,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes,width=560,height=625");
if(this.href){
return false;
}
}else{
document.location.href="/flashUpgrade.html";
}
}
function radioPopup(url){
window.open(url,"rhapPlayer","width=270,height=395,hotkeys=no,status=no,resizable=no,scrollbars=no,toolbar=no,menubar=no");
return false;
}
function nhlPopup(_83,_84){
var url=(_83=="3")?"http://hockeylive.comcast.net/player/wide/index.html?gameType=game"+_83:"http://hockeylive.comcast.net/player/index.jsp?gameType=game"+_83;
var win=(_83=="3")?"width=800,height=649":"width=730,height=688";
window.open(url,_83,"scrollbars=no,status=yes,statusbar=yes,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes,"+win);
}
function askPopup(url){
window.open(url,"askcomcast","scrollbars=no,status=no,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes,width=520,height=482");
return false;
}
function askPopupF(url){
window.open(url,"askcomcast","scrollbars=no,status=no,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes,width=520,height=482");
return false;
}
function slidePopup(url){
window.open(url,"slideshow","scrollbars=auto,status=no,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes,width=600,height=650");
}
function slideClose(url){
opener.document.location.href=url;
self.close();
return false;
}
function addLoadEvent(_8b){
var _8c=window.onload;
if(typeof window.onload!="function"){
window.onload=_8b;
}else{
window.onload=function(){
_8c();
_8b();
};
}
}
function addClass(_8d,_8e){
if(!_8d.className){
_8d.className=_8e;
}else{
var _8f=_8d.className.split(" ");
for(var i=0;i<_8f.length;i++){
if(_8f[i]==_8e){
return;
}
}
_8d.className+=" "+_8e;
}
}
function removeClass(_91,_92){
if(!_91.className){
return false;
}
var _93=_91.className.split(" ");
var _94=[];
for(var i=0;i<_93.length;i++){
if(_93[i]!=_92){
_94[i]=_93[i];
}
}
_91.className=_94.join(" ");
return true;
}
function getElementsByClassName(_96,_97,_98){
var _99=(_97=="*"&&document.all)?document.all:_96.getElementsByTagName(_97);
var _9a=new Array();
_98=_98.replace(/\-/g,"\\-");
var _9b=new RegExp("(^|\\s)"+_98+"(\\s|$)");
var _9c;
for(var i=0;i<_99.length;i++){
_9c=_99[i];
if(_9b.test(_9c.className)){
_9a.push(_9c);
}
}
return (_9a);
}
function toggleBlockElement(_9e,vis){
if(typeof (_9e)=="string"||typeof (_9e)=="number"){
var _9e=document.getElementById(_9e);
}
_9e.style.display=vis?"block":"none";
_9e.style.visibility=vis?"visible":"hidden";
}
function toggleInlineElement(_a0,vis){
if(typeof (_a0)=="string"||typeof (_a0)=="number"){
var _a0=document.getElementById(_a0);
}
_a0.style.display=vis?"inline":"none";
_a0.style.visibility=vis?"visible":"hidden";
}
function pageLoad(){
externalLinks();
if(typeof (initTabs)!="undefined"){
initTabs();
}
if(document.location.hash!=null&&document.location.hash!=""){
return;
}
if(document.getElementById("search-field")==null){
return;
}
var _a2=(typeof (setSearchFocus)!="undefined"&&!setSearchFocus);
var _a3=document.getElementById("user");
if(_a3!=null&&(pagename!="home")){
setTimeout("document.getElementById('user').focus();",1);
}else{
var _a4=true;
var _a5=[];
var _a6=document.getElementsByTagName("input");
for(var f=0;f<_a6.length;f++){
var _a8=getElementType(_a6[f]);
var _a9=_a6[f].name;
if(((_a8=="text"&&_a9=="user")||_a8=="password")&&(_a6[f].value!="")){
_a4=false;
continue;
}
}
if(_a4&&_a2){
_a4=false;
}
if(_a4){
setTimeout("document.getElementById('search-field').focus();",1);
}
}
if(is_firefox||_a2){
return false;
}
document.onkeydown=function(evt){
var evt=(evt!=null)?evt:((event!=null)?event:null);
if(!evt){
return;
}
if(evt.altKey||evt.ctrlKey){
return;
}
var _ab=(evt.target)?evt.target:((evt.srcElement)?evt.srcElement:null);
if(_ab==null){
return;
}
var _ac=(_ab.nodeName!=null)?new String(_ab.nodeName).toLowerCase():"";
var _ad=(_ab.type!=null)?new String(_ab.type).toLowerCase():"";
if(_ab.id!=null&&_ab.id=="search-field"){
var _ae=parseInt(evt.keyCode);
if(_ae==13){
return;
}
if(_ae==38||_ae==40||_ae==33||_ae==34){
setTimeout("document.getElementById('search-field').blur();",1);
}
}else{
if((_ac=="input"&&(_ad=="text"||_ad=="password"))||_ac=="textarea"){
return;
}else{
if(evt.keyCode==null){
return;
}
var _af=document.getElementById("search-field");
if(evt.keyCode>47&&evt.keyCode<112){
var _b0=String.fromCharCode(evt.keyCode)[evt.shiftKey?"toUpperCase":"toLowerCase"]();
if(!is_safari){
_af.value+=_b0;
}
setTimeout("document.getElementById('search-field').focus();",1);
}
}
}
};
}
function getElementType(_b1){
if(_b1==null){
return false;
}
var _b2=_b1.type;
if(!_b2){
var _b3=_b1[0];
if(_b3==null){
return false;
}
var _b2=_b3.type;
if(!_b2){
return false;
}
}
return new String(_b2).toLowerCase();
}
function randomizeURL(url){
return url+((url.indexOf("?")!=-1)?"&random=":"?random=")+Math.floor(Math.random()*999999);
}
function disneyConnection(url){
var _b6="Welcome to Disney Connection!";
var _b7="disneyConnectionAuth";
var _b8="800";
var _b9="500";
var _ba=(screen.width-_b8)/2;
var _bb=(screen.height-_b9)/2;
features="toolbar=yes,height="+_b9+",width="+_b8+",top="+_bb+",left="+_ba+",scrollbars=yes,";
if(self.SymRealWinOpen){
window.open=SymRealWinOpen;
}
var uri="/kids/";
var _bd="";
var _be="";
var _bf=false;
if(uri.indexOf(".exlink")==-1){
if(_bf){
uri+=".inlink";
}else{
uri+=".exlink";
}
}
setTitle(_b6);
DCS=new Object();
DCS.dcsuri=uri;
DCS.dcspro=window.location.protocol;
DCS.dcssip=window.location.hostname;
var _c0=new Date();
DCS.dcsdat=_c0.getTime();
if(_bd.length==0){
_bd=window.location.href;
}
DCS.dcsref=_bd;
var _c1=getTitle()+dcsDCS()+_be+((url.length>0)?"&CM.url="+url:"");
dcsTrack(_c1);
if(url.length>0){
if(_bf){
window.location=url;
}else{
_b8=castInt(_b8);
_b9=castInt(_b9);
var _c2="";
if(_b8>0){
_c2+=(_c2!=null&&_c2.length>0)?",":"";
_c2+="width="+_b8;
}
if(_b9>0){
_c2+=(_c2!=null&&_c2.length>0)?",":"";
_c2+="height="+_b9;
}
if(features!=null&&features.length>0){
_c2+=(_c2!=null&&_c2.length>0)?",":"";
_c2+=features;
}
window.open(url,"tracking",_c2);
}
}
}
window.onload=pageLoad;
function cacheImage(_c3){
var _c4=new Image();
_c4.src=_c3;
return _c4;
}
function appendBreadcrumbList(_c5){
if(document.getElementById("breadcrumb2")){
for(x=0;x<_c5.length;x++){
appendBreadcrumb(_c5[x]);
}
}
}
function appendBreadcrumb(_c6){
if(typeof (_c6)!="object"||_c6.text==null||_c6.href==null){
return false;
}
var _c7=document.getElementById("breadcrumb");
var _c8=_c7.getElementsByTagName("dd")[0];
var _c9="&#160;<span>&gt;</span>&#160"+"<a href=\""+_c6.href+"\">"+_c6.text+"</a>";
_c8.innerHTML+=_c9;
}
function removeFaqCrumbs(){
if(document.getElementById("breadcrumb2")){
var _ca=document.getElementById("content");
var _cb=_ca.getElementsByTagName("div")[0];
var _cc=_cb.getElementsByTagName("h4")[0];
var _cd=_cc.getElementsByTagName("a");
var _ce=[];
for(x=0;x<_cd.length;x++){
var _cf=new String(_cd[x].href);
if(_cf.indexOf(".com/")==-1){
var _d0=_cf;
}else{
var _d0=_cf.substr(_cf.indexOf(".com/")+4);
}
_ce[_ce.length]={text:_cd[x].innerHTML,href:_d0};
}
_cc.style.display="none";
_cc.style.visibility="hidden";
return _ce;
}
}
function photoPopup(){
var _d1="400";
var _d2="533";
_d1=(_d1!=null&&_d1.length!=0)?parseInt(_d1)+148:700;
_d2=(_d2!=null&&_d2.length!=0)?parseInt(_d2)+32:600;
window.open("".concat("/data/home/photopopup.html?random=",Math.random()),"Photo","width="+_d2+",height="+_d1+",hotkeys=no,status=no,resizable=yes,scrollbars=no");
}
function ScrollProps(){
this.begin;
this.end;
this.start;
this.change;
this.dur=1000;
}
var xScroll=new ScrollProps();
var yScroll=new ScrollProps();
var psintv;
function easeOut(t,b,c,d){
return -c*(t/=d)*(t-2)+b;
}
function pageScroll(){
var _d7=(new Date()).getTime()-yScroll.start;
if(_d7<yScroll.dur){
scrollTo(easeOut(_d7,xScroll.begin,xScroll.change,xScroll.dur),easeOut(_d7,yScroll.begin,yScroll.change,yScroll.dur));
}else{
scrollTo(xScroll.end,yScroll.end);
clearInterval(psintv);
}
}
function jumpTo(x,y){
yScroll.begin=getWindowYOffset();
yScroll.end=y;
yScroll.start=(new Date()).getTime();
yScroll.change=yScroll.end-yScroll.begin;
xScroll.begin=getWindowXOffset();
xScroll.end=x;
xScroll.start=yScroll.start;
xScroll.change=xScroll.end-xScroll.begin;
clearInterval(psintv);
psintv=setInterval("pageScroll()",10);
}
var d=document;
var checkObj=d.all?(d.getElementById?3:2):(d.getElementById?4:(d.layers?1:0));
function getWindowXOffset(){
if(checkObj==2||checkObj==3){
if(document.documentElement&&document.documentElement.scrollTop){
return document.documentElement.scrollLeft;
}else{
return d.body.scrollLeft;
}
}else{
if(checkObj==1||checkObj==4){
return window.pageXOffset;
}
}
}
function getWindowYOffset(){
if(checkObj==2||checkObj==3){
if(document.documentElement&&document.documentElement.scrollTop){
return document.documentElement.scrollTop;
}else{
return document.body.scrollTop;
}
}else{
if(checkObj==1||checkObj==4){
return window.pageYOffset;
}
}
}
function openFlash8InstallerPopup(){
window.open("/flash/installer/flash8/genericInstaller.html?redirectURL="+document.location.href,"flash8Install","scrollbars=no,status=no,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes,width=300,height=300");
}
function trackCover(_da,_db){
}
function getCoverLink(_dc,_dd,_de,_df,_e0){
_dc=unescape(_dc);
_dd=unescape(_dd);
_de=unescape(_de);
_e0=unescape(_e0);
_hbPageView(_dd,"cover/"+pagename+"/"+_df+"/linkclicks/"+_dc);
if(_de.indexOf("fan/popup")!=-1){
fanPopup(_de);
}else{
if(_e0=="_blank"){
window.open(_de);
}else{
document.location.href=_de;
}
}
}
function trackEvolutionListImpression(_e1){
}
function trackEvolutionListLink(_e2,_e3,_e4,_e5){
_hbPageView(_e2,"cover/"+pagename+"/lists/"+_e4);
_e2=unescape(_e2);
_e3=unescape(_e3);
_e4=unescape(_e4);
_e5=unescape(_e5);
if(_e3.indexOf("fan/popup")!=-1){
fanPopup(_e3);
}else{
if(_e5=="_blank"){
window.open(_e3);
}else{
document.location.href=_e3;
}
}
}
function trackpassPromo(){
if(document.location.pathname.match(/^\/sports\/motorsports\//)){
var s=document.getElementById("sidebar");
if(s==null){
return false;
}
var d=s.getElementsByTagName("div")[1];
var m=document.createElement("div");
m.className="module";
var a=document.createElement("a");
a.setAttribute("href","http://www.comcast.net/help/faq/index.jsp?cat=Comcast_net_Site#NASCAR");
var i=document.createElement("img");
i.setAttribute("src","/images/misc/trackpass.gif");
i.setAttribute("alt","TrackPass and PitCommand Information");
a.appendChild(i);
m.appendChild(a);
s.insertBefore(m,d);
}
}
addLoadEvent(function(){
trackpassPromo();
});
addLoadEvent(function(){
if(document.location.pathname.match(/^\/news\/international\//)){
if(document.location.pathname.match(/\/international\/africa\//)){
var _eb="ad_africa_160x160.jpg";
var _ec="en?region=reg1&ref=A_B_Africa_comcast.net_120106&utm_source=comcast.net&utm_medium=&utm_term=Affiliate_Banner&utm_content=intl-tv&utm_campaign=Africa_120106";
}else{
if(document.location.pathname.match(/\/international\/asia\//)){
var _eb="ad_asia_160x160.jpg";
var _ec="en?region=reg2&ref=A_B_Asia_comcast.net_120106&utm_source=comcast.net&utm_medium=&utm_term=Affiliate_Banner&utm_content=intl-tv&utm_campaign=Asia_120106";
}else{
if(document.location.pathname.match(/\/international\/europe\//)){
var _eb="ad_europe_160x160.jpg";
var _ec="en?region=reg4&ref=A_B_Europe_comcast.net_120106&utm_source=comcast.net&utm_medium=&utm_term=Affiliate_Banner&utm_content=intl-tv&utm_campaign=Europe_120106";
}else{
if(document.location.pathname.match(/\/international\/latinamerica\//)){
var _eb="ad_latin_160x160.jpg";
var _ec="en?region=reg6&ref=A_B_Latam_comcast.net_120106&utm_source=comcast.net&utm_medium=&utm_term=Affiliate_Banner&utm_content=intl-tv&utm_campaign=Latam_120106";
}else{
if(document.location.pathname.match(/\/international\/middleeast\//)){
var _eb="ad_middleeast_160x160.jpg";
var _ec="en?region=reg8&ref=A_B_MENA_comcast.net_120106&utm_source=comcast.net&utm_medium=&utm_term=Affiliate_Banner&utm_content=intl-tv&utm_campaign=MENA_120106";
}else{
var _eb="ad_international_160x160.jpg";
if(document.location.pathname.match(/\/international\/canada\//)){
var _ec="?language=English&ref=A_B_Canada_comcast.net_120606&utm_source=comcast.net&utm_medium=&utm_term=Affiliate_Banner&utm_content=intl-tv&utm_campaign=Canada_120606";
}else{
if(document.location.pathname.match(/\/international\/australia\//)){
var _ec="?language=English&ref=A_B_Australia_comcast.net_120606&utm_source=comcast.net&utm_medium=&utm_term=Affiliate_Banner&utm_content=intl-tv&utm_campaign=Australia_120606";
}else{
var _ec="?language=English&ref=A_B_International_comcast.net_120606&utm_source=comcast.net&utm_medium=&utm_term=Affiliate_Banner&utm_content=intl-tv&utm_campaign=International_120606";
}
}
}
}
}
}
}
var _ed=document.createElement("div");
var _ee=document.getElementById("sidebar");
var _ef=document.getElementById("h-inthenews");
var _f0=document.getElementById("fanvideo");
if(_ef){
_ee.insertBefore(_ed,_ef.parentNode);
}else{
_ee.appendChild(_ed);
}
_ed.className="module";
_ed.innerHTML="<a target='_blank' href='http://comcast.jumptv.com/"+_ec+"'><img src='/news/images/"+_eb+"' border='0' width='160' height='160' /></a>";
}
});
var emailQuery={ref:{frame:null,frameDoc:null},request:null,url:"/qry/yhm.js?rand="+randomNumber};
function triggerCover(){
if(window.location.href.indexOf("explore.html")==-1){
if(document.getElementById("cover")==null){
return false;
}else{
window.document.coverFlash.SetVariable("pageLoaded","true");
}
}else{
window.document.site.SetVariable("pageLoaded","true");
}
}
addLoadEvent(triggerCover);
function getAjaxRequestObj(){
if(window!=null&&window.XMLHttpRequest!=null){
return new XMLHttpRequest();
}else{
if(window!=null&&window.ActiveXObject!=null&&!is_mac){
return new ActiveXObject("Microsoft.XMLHTTP");
}else{
return null;
}
}
}
function writeEmailIcon(){
if(!loggedin||!hasRightVersion){
return false;
}
emailQuery.request=getAjaxRequestObj();
if(emailQuery.request==null){
initEmailFrameRequest();
return false;
}
emailQuery.request.onreadystatechange=function(){
if(emailQuery.request.readyState!=4){
return false;
}
if(emailQuery.request.responseXML==null){
return false;
}
var _f1=emailQuery.request.responseXML;
var _f2=new String(getElementTextNS("","status",_f1,0)).toLowerCase();
if(_f2!="success"){
return false;
}
var _f3=parseInt(getElementTextNS("","newmail",_f1,0));
if(_f3&&_f3!="0"){
document.getElementById("email-icon").innerHTML="<span>"+_f3+"</span>";
}
};
var tmp=emailQuery.request.open("GET",emailQuery.url,true);
emailQuery.request.send(null);
}
function initEmailFrameRequest(){
var _f5=document.createElement("iframe");
_f5.setAttribute("id","email-icon-frame");
_f5.setAttribute("name","email-icon-frame");
_f5.style.border="0px";
_f5.style.height="0px";
_f5.style.width="0px";
_f5.src=emailQuery.url;
emailQuery.ref.frame=document.getElementById("email-icon").appendChild(_f5);
if(emailQuery.ref.frame.contentDocument){
emailQuery.ref.frameDoc=emailQuery.ref.frame.contentDocument;
}else{
if(emailQuery.ref.frame.contentWindow){
emailQuery.ref.frameDoc=emailQuery.ref.frame.contentWindow.document;
}else{
if(emailQuery.ref.frame.document){
emailQuery.ref.frameDoc=emailQuery.ref.frame.document;
}
}
}
}
function getElementTextNS(_f6,_f7,_f8,_f9){
var _fa="";
if(_f6&&isIE){
_fa=_f8.getElementsByTagName(_f6+":"+_f7)[_f9];
}else{
var _fb=_f8.getElementsByTagName(_f7);
_fa=_fb[_f9];
}
if(_fa){
if(_fa.childNodes.length>1){
return _fa.childNodes[1].nodeValue;
}else{
return _fa.firstChild.nodeValue;
}
}else{
return null;
}
}
function loadMoveEmailIcon(){
if(yhmcount>-1){
var s=document.createElement("span");
var st=document.createTextNode(yhmcount);
s.appendChild(st);
var e=document.getElementById("email-icon");
if(e!=null||!document.getElementById){
e.appendChild(s);
}
}else{
if(yhmcount==-2){
setTimeout("loadMoveEmailIcon()",1000);
}
}
}
function displayLoginLogoutButton(){
if(loggedin){
var _ff=document.getElementsByTagName("body")[0];
if(_ff.className.indexOf("oberon")!=-1){
return "<div id=\"t-signout\"><a href=\"http://www.comcast.net/signout/\" title=\"Sign Out\">Sign Out<span id=\"s-signout\" class=\"signin\"></span></a></div>";
}else{
if(_ff.className.indexOf("comstocknew")!=-1){
return "<div id=\"t-signout\"><a href=\"http://finance-new.comcast.net/user/logout.html\" title=\"Sign Out\">Sign Out<span id=\"s-signout\" class=\"signin\"></span></a></div>";
}else{
return "<div id=\"t-signout\"><a href=\""+domain+"/signout.jsp\" title=\"Sign Out\">Sign Out<span id=\"s-signout\" class=\"signin\"></span></a></div>";
}
}
}else{
if((document.location.href.indexOf("home.html")!=-1)||(document.location.href.indexOf("comcast.html")!=-1)){
return "<div id=\"t-signin\"><a href=\""+domain+"/signin.jsp\" title=\"Sign In\">Sign In<span id=\"s-signin\" class=\"signin\"></span></a></div>";
}else{
if(window.self.location!=window.top.location){
return "<div id=\"t-signin\"><a href=\""+domain+"/signin.jsp?redirectUrl="+domain+"\" title=\"Sign In\">Sign In<span id=\"s-signin\" class=\"signin\"></span></a></div>";
}else{
return "<div id=\"t-signin\"><a href=\""+domain+"/signin.jsp"+getRedirectArguments()+"\" title=\"Sign In\">Sign In<span id=\"s-signin\" class=\"signin\"></span></a></div>";
}
}
}
}
function displaySwitchButton(){
return "<a href=\""+domain+"/express\" title=\"Switch to the Express View. Requires the Flash 7 plugin.\" onclick=\"setSessionCookie('SESSIONHOME', 'forcedexpress', '/', '"+sessiondomain+"', false);top.document.location.href='"+domain+"/';return false;\" target=\"_top\" />Go to Express</a>";
}
function displayGreetingYHM(){
var tmp="<span>Welcome, Guest!</span>";
if(loggedin){
tmp=getGreeting();
if(greeting.length>=1){
tmp+=", "+"<a href=\""+domain+"/providers/greeting/\" title=\"Modify your greeting name\" class=\"greet\" onclick=\"window.open(this.href, 'greeting', 'scrollbars=no,status=no,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes,width=335,height=205'); return false;\">"+greeting+"</a>!</span>";
}
}
return tmp;
}
function writeLogo(){
document.write("<h2><a href=\"/"+(iscobrand!=true?(getChannelName()+"\">"+getChannelName()):(CBchannel+"\">"+CBchannel))+"</a></h2>");
}
var searchObj={getOptions:function(){
var _101=GetCookie("searchOptions");
var _102=false;
if(_101==""){
return {useSafe:1,useHistory:(_102?1:0)};
}
var _103=_101.split("-&-");
var _104=[];
for(var x=0;x<_103.length;x++){
var tmp=_103[x].split("=");
_104[tmp[0]]=tmp[1];
}
if(!_102){
_104.useHistory=0;
}
return _104;
},init:function(){
handleHeaderTabClick();
this.ref.field=document.getElementById("search-field");
this.ref.box=document.getElementById("search-history");
this.ref.nub=document.getElementById("search-nub");
if(isSearchResultsPage!=null&&isSearchResultsPage){
this.options.isResult=true;
}
toggleBlockElement(this.ref.nub,(this.getOptions().useHistory==1));
this.populateHistory();
var _107=document.getElementById("footer-search");
if(!is_safari||_107==null){
return;
}
var _108=_107.getElementsByTagName("label");
for(var l=0;l<_108.length;l++){
_108[l].onclick=function(){
document.getElementById(this.getAttribute("for")).checked=true;
};
}
},options:{histLength:10,isResult:false},populateHistory:function(){
if(this.getOptions().useHistory!=1){
return;
}
var hist=new String(GetCookie("searchHistory")).split("-&-");
this.ref.box.innerHTML="";
for(var x=0;x<hist.length;x++){
if(hist[x]==""){
continue;
}
var tmpD=document.createElement("div");
tmpD.onclick=clickHistoryItem;
var tmpS=document.createElement("span");
tmpS.innerHTML=new String(hist[x]).replace(/\+/g," ");
tmpD.appendChild(tmpS);
this.ref.box.appendChild(tmpD);
}
},ref:{box:null,nub:null,field:null},setHeaderSearchType:function(_10e,_10f){
var _110=document.getElementById("search-form");
if(_10f==null){
var _10f=false;
}
if(document.getElementById("searchtabs")!=null){
var _111=document.getElementById("searchtab-"+headerSearch.currTab).firstChild;
_111.className="";
var _112=document.getElementById("searchtab-"+_10e).firstChild;
_112.className="selectedtab";
}
if(_10f&&_10e!="web"){
for(fieldName in headerSearch.data.web.fields){
var _113=document.getElementById(fieldName);
if(_113!=null){
_113.parentNode.removeChild(_113);
}
}
}
if(headerSearch.currTab!=null){
var _114=document.getElementsByTagName("input");
for(fieldName in headerSearch.data[headerSearch.currTab].fields){
for(var i=0;i<_114.length;i++){
if(_114[i].name!=fieldName){
continue;
}
_114[i].parentNode.removeChild(_114[i]);
}
}
}
if(headerSearch.currTab!=null){
headerSearch.data[headerSearch.currTab].uninstall();
}
headerSearch.currTab=_10e;
var _116="q";
for(fieldName in headerSearch.data[_10e].fields){
var _117=headerSearch.data[_10e].fields[fieldName];
if(fieldName=="fieldname"){
_116=_117;
continue;
}
var _113=document.createElement("input");
_113.type="hidden";
_113.id=fieldName;
_113.name=fieldName;
_113.value=_117;
_110.appendChild(_113);
}
document.getElementById("search-field").name=_116;
_110.action=headerSearch.data[_10e].action;
document.getElementById("search-label").innerHTML=headerSearch.data[_10e].label+":";
headerSearch.data[_10e].install();
},submitHeader:function(_118,_119){
if(_119==null){
var _119=false;
}
var term=this.ref.field.value;
trackBanners(headerSearch.data[headerSearch.currTab].action,headerSearch.currTab);
if(term!=""){
return true;
}
var _11b=new String(headerSearch.currTab).charAt(0).toUpperCase()+new String(headerSearch.currTab).substr(1);
if(_119){
document.location.href=search_action_url+"?cat="+_11b;
}
return false;
},submitFooter:function(_11c,_11d){
if(_11c.name!="swr"||(_11c.q.value=="")){
return false;
}
if(document.getElementById("search_type_1").checked){
var _11e=document.createElement("input");
_11e.type="hidden";
_11e.id="refine";
_11e.name="refine";
_11e.value=new String(_11c.q.value);
_11c.q.value=new String(_11c.orig_query.value);
_11c.replaceChild(_11e,_11c.orig_query);
}
if(_11d!=null){
_11c.elements["cat"].value=_11d;
_11c.elements["con"].value=(_11d=="Games")?"gi":"net";
}
_11c.submit();
return true;
},toggleDropdown:function(_11f){
if(_11f==null){
var _11f=!this.visible;
}
this.ref.nub.style.backgroundPosition=(_11f?"-10px":"0px")+" 0px";
toggleBlockElement(this.ref.box,_11f);
this.visible=_11f;
},toggleNavigator:function(node,_121){
var _122=(new String(node.className).indexOf("visible")!=-1);
node.className="search-nav nav-"+(_122?"hidden":"visible");
if(!_122&&_121){
node.className+="-full";
}
var _123=node.getElementsByTagName("a");
_123[_123.length-1].innerHTML=_122?"More":"Close";
},toggleNewsResult:function(node){
var _125=(new String(node.className).indexOf("open")!=-1);
node.className="results-news-article result-"+(_125?"closed":"open");
node.getElementsByTagName("a")[1].innerHTML=(_125?"Read":"Close")+" Summary";
},userClickSubmit:function(_126){
if(_126==null){
return false;
}
this.setHeaderSearchType(_126);
if(this.ref.field.value==""){
return false;
}
document.getElementById("search-form").submit();
},visible:false};
function clickHistoryItem(){
searchObj.ref.field.value=this.firstChild.innerHTML;
searchObj.toggleDropdown(false);
return false;
}
function HdrSearch(_127,_128,_129,_12a,_12b,_12c){
this.title=_127;
this.action=_128;
this.label=_129;
this.fields=(_12a!=null)?_12a:[];
this.install=(_12b!=null)?_12b:function(){
return true;
};
this.uninstall=(_12c!=null)?_12c:function(){
return true;
};
}
var shopSch="http://shopping.comcast.net/search.php";
var videoSch="http://videosearch.comcast.net/ss-query/videosearch.jsp";
var search_action_url="http://search.comcast.net/";
var headerSearch={currTab:"web",data:{web:new HdrSearch("Web",search_action_url,"Search the Web",{"fieldname":"q","cat":"Web","con":"net"}),video:new HdrSearch("Video",videoSch,"Search Videos",{"fieldname":"q","dr":"1","cp":"1"}),images:new HdrSearch("Images",search_action_url,"Search Images",{"fieldname":"q","cat":"Images","con":"net"}),news:new HdrSearch("News",search_action_url,"Search News",{"fieldname":"q","cat":"News","con":"net"}),shopping:new HdrSearch("Shopping",shopSch,"Search Products",{"fieldname":"form_keyword"}),entertainment:new HdrSearch("Entertainment","http://sitesearch.comcast.net/","Search Entertainment",{"fieldname":"q","c":"net","cat1":"Entertainment"}),finance:new HdrSearch("Finance","http://sitesearch.comcast.net/","Search Finance",{"fieldname":"q","c":"net","cat1":"Finance"}),games:new HdrSearch("Comcast Games",search_action_url,"Search Games",{"fieldname":"q","c":"net","cat1":"Games"}),oberon:new HdrSearch("Games","http://sitesearch.comcast.net/","Search Games",{"fieldname":"q","c":"net","cat1":"Games"}),help:new HdrSearch("Help","http://sitesearch.comcast.net/","Search Help",{"fieldname":"q","c":"net","cat1":"Help"}),movies:new HdrSearch("Movies","http://sitesearch.comcast.net/","Search Movies",{"fieldname":"q","c":"net","cat1":"Movies"}),music:new HdrSearch("Music","http://sitesearch.comcast.net/","Search Music",{"fieldname":"q","c":"net","cat1":"Music"}),relationships:new HdrSearch("Relationships","http://sitesearch.comcast.net/","Search Relationships",{"fieldname":"q","c":"net","cat1":"Relationships"}),sports:new HdrSearch("Sports","http://sitesearch.comcast.net/","Search Sports",{"fieldname":"q","c":"net","cat1":"Sports"}),tv:new HdrSearch("TV","http://sitesearch.comcast.net/","Search TV",{"fieldname":"q","c":"net","cat1":"TV"}),yellow:new HdrSearch("Yellow Pages",search_action_url,"Search Yellow Pages",{"fieldname":"q","cat":"yp"},function(){
var row=document.createElement("td");
row.id="local-extra";
row.appendChild(document.createElement("div"));
var _12e=document.createElement("input");
_12e.type="text";
_12e.className="single";
_12e.id="search-field-2";
_12e.name="l";
_12e.value="City & State or Zip";
_12e.style.color="#848995";
_12e.onfocus=function(){
this.value="";
this.style.color="#0A142B";
};
row.childNodes[0].appendChild(_12e);
var _12f=document.getElementById("search-field");
if(_12f==null){
return false;
}
_12f.className="single";
var _130=_12f.parentNode.parentNode;
_130.parentNode.insertBefore(row,_130.nextSibling);
},function(){
var row=document.getElementById("local-extra");
if(row!=null){
row.parentNode.removeChild(row);
}
var _132=document.getElementById("search-field");
if(_132!=null){
_132.className="";
}
})},map:{custom:{web:2,video:1,images:1,news:1,shopping:1},home:{web:2,video:1,images:1,news:1,shopping:1},web:{web:2,video:1,images:1,yellow:1,news:1,shopping:1},video:{web:1,video:2,images:1,news:1,shopping:1},images:{web:1,video:1,images:2,news:1,shopping:1},local:{web:1,video:1,images:1,yellow:2,news:1,shopping:1},news:{web:1,video:1,images:1,news:2,shopping:1},shopping:{web:1,video:1,images:1,news:1,shopping:2}},channelsTabs:{account:"help",entertainment:"entertainment",games:"games",help:"help",movies:"movies",music:"music",oberon:"oberon",relationships:"relationships",security:"help",sports:"sports",tv:"tv",toolbar:"toolbar"}};
function writeHeaderSearchTabs(_133){
if(is_ie&&is_mac){
return;
}
if((_133!=null)&&(_133.length)){
var _134=new String(_133).toLowerCase();
var _135=(headerSearch.map[_134]!=null)?headerSearch.map[_134]:headerSearch.map["web"];
}else{
var _135=headerSearch.map["web"];
var _134=getChannelName();
if(headerSearch.channelsTabs[_134]!=null){
_135[headerSearch.channelsTabs[_134]]=1;
}
}
document.write("<ul>");
for(tabName in _135){
if(headerSearch.data[tabName]==null){
continue;
}
writeHeaderTab(tabName,(_135[tabName]==2));
}
document.write("</ul>");
}
function writeHeaderTab(_136,_137){
if(_137){
headerSearch.currTab=_136;
}
var _138="searchtab-"+_136;
var _139=_137?"selectedtab":"";
var _13a=headerSearch.data[_136].title;
var _13b="<li id='"+_138+"'>"+"<a onclick=\"handleHeaderTabClick('"+_136+"');\" class='"+_139+"'>"+_13a+"</a></li>";
document.write(_13b);
}
function handleHeaderTabClick(_13c){
var _13d=document.getElementById("search-form");
var _13e=false;
if(_13c==null){
var _13c=headerSearch.currTab;
_13e=true;
}else{
if(headerSearch.currTab==_13c){
return false;
}else{
document.getElementById("search-field").focus();
}
}
searchObj.setHeaderSearchType(_13c,_13e);
if(_13e||document.getElementById("search-field").value==""){
return false;
}
_13d.submit();
}
function getCookieVal(_13f){
var _140=document.cookie.indexOf(";",_13f);
if(_140==-1){
_140=document.cookie.length;
}
return unescape(document.cookie.substring(_13f,_140));
}
function GetCookie(name){
var arg=name+"=";
var alen=arg.length;
var clen=document.cookie.length;
var i=0;
while(i<clen){
var j=i+alen;
if(document.cookie.substring(i,j)==arg){
return getCookieVal(j);
}
i=document.cookie.indexOf(" ",i)+1;
if(i==0){
break;
}
}
return "";
}
var myportal="";
myportal=GetCookie("MYPORTAL");
if(myportal!=""){
user=GetCrumb(myportal,"em");
if(user!=""){
loggedin=true;
}
greeting=GetCrumb(myportal,"gt");
zipCode=GetCrumb(myportal,"zip");
areaCode=GetCrumb(myportal,"npa");
isPrimary=(GetCrumb(myportal,"ipr")=="y")?true:false;
var p=GetCrumb(myportal,"p");
if(p!=""){
haspreferences=true;
}
}
function setCookie(name,_148,days,path,_14b,_14c){
if(isNaN(days)){
days=1;
}
var _14d=days*24*60*60*1000;
var now=new Date();
var d;
if(!isNaN(now.valueOf())){
var then=now.valueOf()+_14d;
d=new Date(then);
}else{
d=now;
}
var _151=name+"="+escape(_148)+"; expires="+d.toGMTString()+((path==null)?"":("; path="+path))+((_14b==null)?"":("; domain="+_14b))+((_14c==true)?"; secure":"");
document.cookie=_151;
}
function getCrumbVal(_152,_153){
var _154=_152.indexOf("&",_153);
if(_154==-1){
_154=_152.length;
}
var temp=_152.substring(_153,_154);
temp=stringReplace(temp,"+"," ");
return unescape(temp);
}
function GetCrumb(_156,name){
var arg=name+"=";
var alen=arg.length;
var clen=_156.length;
var i=0;
while(i<clen){
var j=i+alen;
if(_156.substring(i,j)==arg){
return getCrumbVal(_156,j);
}
i=_156.indexOf("&",i)+1;
if(i==0){
break;
}
}
return "";
}
function setSessionCookie(name,_15e,path,_160,_161){
var _162=name+"="+escape(_15e)+";"+((path==null)?"":("; path="+path))+((_160==null)?"":("; domain="+_160))+((_161==true)?"; secure":"");
document.cookie=_162;
}
function setSessionAndFlip(name,_164){
setSessionCookie(name,_164,"/",sessiondomain,false);
document.location.href="/";
}
var flash2Installed=false;
var flash3Installed=false;
var flash4Installed=false;
var flash5Installed=false;
var flash6Installed=false;
var flash7Installed=false;
var flash8Installed=false;
var flash9Installed=false;
var maxVersion=9;
var actualVersion=0;
var requiredVersion=7;
var hasRightVersion=false;
var jsVersion=1;
var ie7AlertSwitch=true;
var ie7SearchAlertSwitch=true;
var isIE=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;
var isWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false;
jsVersion=1.1;
if(isIE&&isWin){
document.write("<SCR"+"IPT LANGUAGE=\"VBScript\"> \n");
document.write("on error resume next \n");
document.write("flash2Installed = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.2\"))) \n");
document.write("flash3Installed = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.3\"))) \n");
document.write("flash4Installed = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.4\"))) \n");
document.write("flash5Installed = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.5\"))) \n");
document.write("flash6Installed = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.6\"))) \n");
document.write("flash7Installed = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.7\"))) \n");
document.write("flash8Installed = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.8\"))) \n");
document.write("flash9Installed = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.9\"))) \n");
document.write("</SCR"+"IPT> \n");
}
function detectFlash(){
if(navigator.plugins){
if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){
var _165=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";
var _166=navigator.plugins["Shockwave Flash"+_165].description;
var _167=parseInt(_166.substring(16));
flash2Installed=_167==2;
flash3Installed=_167==3;
flash4Installed=_167==4;
flash5Installed=_167==5;
flash6Installed=_167==6;
flash7Installed=_167==7;
flash8Installed=_167==8;
flash9Installed=_167>=9;
}
}
for(var i=2;i<=maxVersion;i++){
if(eval("flash"+i+"Installed")==true){
actualVersion=i;
}
}
if(navigator.userAgent.indexOf("WebTV")!=-1){
actualVersion=4;
}
if(actualVersion<requiredVersion){
}else{
hasRightVersion=true;
}
}
function writeFlash(name,file,_16b,_16c,_16d,_16e){
_16d=(_16d==null)?"#FFFFFF":_16d;
_16e=(_16e==null)?"opaque":_16e;
document.write("<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' id='"+name+"' width='"+_16b+"' height='"+_16c+"'>");
document.write("  <param name=\"allowScriptAccess\" value=\"sameDomain\" />");
document.write("  <param name='movie' value='"+file+"'>");
document.write("  <param name='wmode' value='"+_16e+"'>");
document.write("  <param name='quality' value='high'>");
document.write("  <param name='bgcolor' value='"+_16d+"'>");
document.write("  <param name='menu' value='false'>");
document.write("  <embed src='"+file+"' bgcolor='"+_16d+"' name='"+name+"' width='"+_16b+"' height='"+_16c+"' wmode='"+_16e+"' quality='high' menu='false' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed>");
document.write("</object>");
}
var flashcookie=GetCookie("FPO");
var clientprefs=GetCookie("CLIENTPREFS");
if(clientprefs!=""){
var flashVersion=GetCrumb(clientprefs,"fpo");
var upgradeMsg=GetCrumb(clientprefs,"umsg");
var upgradeMsgIE=GetCrumb(clientprefs,"ieumsg");
var upgradeMsgIEcc=GetCrumb(clientprefs,"ieccumsg");
}
function upgrade(){
if(iscobrand==true){
return false;
}
var _16f="";
var _170="Visit our Upgrade page to download the Macromedia Flash 7 player.";
var _171="Visit our Upgrade page to download a new web browser.";
var _172="<div id=\"upgradebar\"><p>";
var _173=" <span id=\"upgrade-close\"><a href=\"#\" onclick=\"hideUpgrade('fpo')\" title=\"Do not show me this message again.\">Do not show me this message again.</a></span>";
var _174="</p></div>";
if(upgradeMsg!="off"){
if((!document.getElementById)&&(!hasRightVersion)){
_16f="We recommend that you upgrade your <a href=\"/browserUpgrade.html\" title=\""+_171+"\">Web browser</a> and <a href=\"/flashUpgrade.html\" title=\""+_170+"\">Macromedia Flash</a> to view the full experience of Comcast.net.";
}else{
if((!hasRightVersion)&&(document.getElementById)){
_16f="We recommend that you upgrade to the latest version of <a href=\"/flashUpgrade.html\" title=\""+_170+"\">Macromedia Flash</a> to view the full experience of Comcast.net.";
var _175=document.getElementById("breadcrumb");
if(_175!=null){
_175.style.top="130px";
}
}else{
if(!document.getElementById){
_16f="We recommend that you upgrade your <a href=\"/browserUpgrade.html\" title=\""+_171+"\">Web browser</a> to view the full experience of Comcast.net.";
}else{
hideUpgrade("fpo");
_172="";
_16f="";
_173="";
_174="";
}
}
}
document.write(_172+_16f);
if(document.getElementById){
document.write(_173);
}
document.write(_174);
}else{
if((upgradeMsgIEcc!="off")&&(is_ie7)&&(is_win)&&(!is_iecc)&&(ie7SearchAlertSwitch)&&((document.location.href.indexOf("/home.html")!=-1)||(document.location.href.indexOf("/explorer.html")!=-1)||(document.location.href.indexOf("/comcast.html")!=-1))){
_172="<div id=\"ieccsearchupgradebar\" onclick=\"javascript:window.external.AddSearchProvider('/downloads/ie7/ie7comcastsearch.xml');hideUpgrade('ieccumsg');return false;\"><p>";
_173=" <span id=\"ieccupgrade-close\"><a href=\"#\" onclick=\"evt = window.event;evt.cancelBubble = true; evt.returnVal = false;if (evt.preventDefault) evt.preventDefault();hideUpgrade('ieccumsg');return false;\" title=\"Do not show me this message again.\">Do not show me this message again.</a></span>";
_174="</p></div>";
var _175=document.getElementById("breadcrumb");
if(_175!=null){
_175.style.top="170px";
}
addLoadEvent(function(){
var _176=document.getElementById("assistant");
if(_176!=null){
_176.style.top="61px";
}
});
document.write(_172);
if(document.getElementById){
document.write(_173);
}
document.write(_174);
}
}
}
function hideUpgrade(_177){
if(_177=="fpo"){
if(document.getElementById("upgradebar")){
document.getElementById("upgradebar").style.display="none";
document.getElementById("breadcrumb").style.top="110px";
}
var _178="fpo="+flashVersion+"&umsg=off";
setCookie("CLIENTPREFS",_178,360,"/");
}else{
if(_177=="ieumsg"){
if(document.getElementById("ieupgradebar")!=null){
document.getElementById("ieupgradebar").style.display="none";
}
if(document.getElementById("breadcrumb")!=null){
document.getElementById("breadcrumb").style.top="110px";
}
if(document.getElementById("assistant")!=null){
document.getElementById("assistant").style.top="0";
}
if(!(clientprefs.match("ieumsg"))){
var _178="fpo="+flashVersion+"&umsg=off&ieumsg=off";
setCookie("CLIENTPREFS",_178,360,"/");
}
}else{
if(document.getElementById("ieccsearchupgradebar")!=null){
document.getElementById("ieccsearchupgradebar").style.display="none";
}
if(document.getElementById("breadcrumb")!=null){
document.getElementById("breadcrumb").style.top="110px";
}
if(document.getElementById("assistant")!=null){
document.getElementById("assistant").style.top="0";
}
if(!(clientprefs.match("ieccumsg"))){
var _178="fpo="+flashVersion+"&umsg=off&ieumsg=off&ieccumsg=off";
setCookie("CLIENTPREFS",_178,360,"/");
}
}
}
}
function setOverride(ver){
var _17a="fpo="+ver+"&umsg="+upgradeMsg;
setCookie("CLIENTPREFS",_17a,360,"/");
window.location.replace("/");
}
detectFlash();
if(typeof deconcept=="undefined"){
var deconcept=new Object();
}
if(typeof deconcept.util=="undefined"){
deconcept.util=new Object();
}
if(typeof deconcept.SWFObjectUtil=="undefined"){
deconcept.SWFObjectUtil=new Object();
}
deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a,_b){
if(!document.getElementById){
return;
}
this.DETECT_KEY=_b?_b:"detectflash";
this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);
this.params=new Object();
this.variables=new Object();
this.attributes=new Array();
if(_1){
this.setAttribute("swf",_1);
}
if(id){
this.setAttribute("id",id);
}
if(w){
this.setAttribute("width",w);
}
if(h){
this.setAttribute("height",h);
}
if(_5){
this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));
}
this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();
if(c){
this.addParam("bgcolor",c);
}
var q=_8?_8:"high";
this.addParam("quality",q);
this.setAttribute("useExpressInstall",_7);
this.setAttribute("doExpressInstall",false);
var _d=(_9)?_9:window.location;
this.setAttribute("xiRedirectUrl",_d);
this.setAttribute("redirectUrl","");
if(_a){
this.setAttribute("redirectUrl",_a);
}
};
deconcept.SWFObject.prototype={setAttribute:function(_e,_f){
this.attributes[_e]=_f;
},getAttribute:function(_10){
return this.attributes[_10];
},addParam:function(_11,_12){
this.params[_11]=_12;
},getParams:function(){
return this.params;
},addVariable:function(_13,_14){
this.variables[_13]=_14;
},getVariable:function(_15){
return this.variables[_15];
},getVariables:function(){
return this.variables;
},getVariablePairs:function(){
var _16=new Array();
var key;
var _18=this.getVariables();
for(key in _18){
_16.push(key+"="+_18[key]);
}
return _16;
},getSWFHTML:function(){
var _19="";
if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){
if(this.getAttribute("doExpressInstall")){
this.addVariable("MMplayerType","PlugIn");
}
_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\"";
_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";
var _1a=this.getParams();
for(var key in _1a){
_19+=key+"=\""+_1a[key]+"\" ";
}
var _1c=this.getVariablePairs().join("&");
if(_1c.length>0){
_19+="flashvars=\""+_1c+"\"";
}
_19+="/>";
}else{
if(this.getAttribute("doExpressInstall")){
this.addVariable("MMplayerType","ActiveX");
}
_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\">";
_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";
var _1d=this.getParams();
for(var key in _1d){
_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";
}
var _1f=this.getVariablePairs().join("&");
if(_1f.length>0){
_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";
}
_19+="</object>";
}
return _19;
},write:function(_20){
if(this.getAttribute("useExpressInstall")){
var _21=new deconcept.PlayerVersion([6,0,65]);
if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){
this.setAttribute("doExpressInstall",true);
this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));
document.title=document.title.slice(0,47)+" - Flash Player Installation";
this.addVariable("MMdoctitle",document.title);
}
}
if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){
var n=(typeof _20=="string")?document.getElementById(_20):_20;
n.innerHTML=this.getSWFHTML();
return true;
}else{
if(this.getAttribute("redirectUrl")!=""){
document.location.replace(this.getAttribute("redirectUrl"));
}
}
return false;
}};
deconcept.SWFObjectUtil.getPlayerVersion=function(){
var _23=new deconcept.PlayerVersion([0,0,0]);
if(navigator.plugins&&navigator.mimeTypes.length){
var x=navigator.plugins["Shockwave Flash"];
if(x&&x.description){
_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));
}
}else{
try{
var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
}
catch(e){
try{
var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
_23=new deconcept.PlayerVersion([6,0,21]);
axo.AllowScriptAccess="always";
}
catch(e){
if(_23.major==6){
return _23;
}
}
try{
axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
}
catch(e){
}
}
if(axo!=null){
_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
}
}
return _23;
};
deconcept.PlayerVersion=function(_27){
this.major=_27[0]!=null?parseInt(_27[0]):0;
this.minor=_27[1]!=null?parseInt(_27[1]):0;
this.rev=_27[2]!=null?parseInt(_27[2]):0;
};
deconcept.PlayerVersion.prototype.versionIsValid=function(fv){
if(this.major<fv.major){
return false;
}
if(this.major>fv.major){
return true;
}
if(this.minor<fv.minor){
return false;
}
if(this.minor>fv.minor){
return true;
}
if(this.rev<fv.rev){
return false;
}
return true;
};
deconcept.util={getRequestParameter:function(_29){
var q=document.location.search||document.location.hash;
if(q){
var _2b=q.substring(1).split("&");
for(var i=0;i<_2b.length;i++){
if(_2b[i].substring(0,_2b[i].indexOf("="))==_29){
return _2b[i].substring((_2b[i].indexOf("=")+1));
}
}
}
return "";
}};
deconcept.SWFObjectUtil.cleanupSWFs=function(){
var _2d=document.getElementsByTagName("OBJECT");
for(var i=0;i<_2d.length;i++){
_2d[i].style.display="none";
for(var x in _2d[i]){
if(typeof _2d[i][x]=="function"){
_2d[i][x]=null;
}
}
}
};
if(typeof window.onunload=="function"){
var oldunload=window.onunload;
window.onunload=function(){
deconcept.SWFObjectUtil.cleanupSWFs();
oldunload();
};
}else{
window.onunload=deconcept.SWFObjectUtil.cleanupSWFs;
}
if(Array.prototype.push==null){
Array.prototype.push=function(_30){
this[this.length]=_30;
return this.length;
};
}
var getQueryParamValue=deconcept.util.getRequestParameter;
var FlashObject=deconcept.SWFObject;
var SWFObject=deconcept.SWFObject;
function getFlashJsObject(_1a9){
if(navigator.appName.indexOf("Microsoft")!=-1){
return window[_1a9];
}else{
return document[_1a9];
}
}
function loadPlaylist(p){
this.fan.getFileData(p);
}
function playVideoByVideoAndConfig(s){
s=unescape(s);
a=s.split("&");
video=a[0].split("=")[1];
config=a[1].split("=")[1];
this.fan.playByVideoAndConfig(video,config);
}
function loadPlaylistByConfig(s){
this.fan.loadPlaylistByConfig(s);
}
function setCallBack(_1ad,_1ae){
this.fan.setCallBack(_1ad,_1ae);
}
function playVideoById(id){
this.fan.playVideoById(id);
}
function getCurrentMediaId(){
return this.fan.getCurrentMediaId();
}
function getCurrentPlaylistName(){
return this.fan.getCurrentPlaylistName();
}
function getCurrentPlayheadTime(){
return this.fan.getCurrentPlayheadTime();
}
function getInitConfigFile(){
return this.fan.getInitConfigFile();
}
function pauseVideo(){
this.fan.pauseVideo();
}
function resetVideoPlayer(){
this.fan.resetVideoPlayer();
}
function showClickToPlayScreen(){
this.fan.showClickToPlayScreen();
}
function getCurrentMediaIndex(){
return this.fan.getCurrentMediaIndex();
}
function JSFan(s){
this.fan=getFlashJsObject(s);
this.loadPlaylist=loadPlaylist;
this.playVideoByVideoAndConfig=playVideoByVideoAndConfig;
this.loadPlaylistByConfig=loadPlaylistByConfig;
this.playVideoById=playVideoById;
this.setCallBack=setCallBack;
this.getCurrentMediaId=getCurrentMediaId;
this.getCurrentPlaylistName=getCurrentPlaylistName;
this.getCurrentPlayheadTime=getCurrentPlayheadTime;
this.pauseVideo=pauseVideo;
this.showClickToPlayScreen=showClickToPlayScreen;
this.getCurrentMediaIndex=getCurrentMediaIndex;
this.resetVideoPlayer=resetVideoPlayer;
this.getInitConfigFile=getInitConfigFile;
}
var f;
function fanReady(){
f=new JSFan("miniFan");
f.loadPlaylistByConfig("/config/common/fan/music.xml");
f.setCallBack("videoChosen","onNewVideo");
f.showClickToPlayScreen();
}
function onNewVideo(){
var idx=Number(f.getCurrentMediaIndex());
unsetNowPlaying();
setNowPlaying(idx);
}
function fanPlayVideoById(id){
f.playVideoById(id);
}
function launchMidFan(){
var _1b3=f.getCurrentMediaId();
var pl=f.getCurrentPlaylistName();
var _1b5=f.getCurrentPlayheadTime();
var _1b6=f.getInitConfigFile();
window.open("/providers/fan/popup.html?v="+_1b3+"&pl="+pl+"&seekTo="+_1b5+"&viewmode=fullScreenMode&config="+_1b6,"thefan","scrollbars=no,status=no,location=no,toolbar=no,favorites=no,address=no,menubar=no,resizable=yes,width=560,height=625");
f.resetVideoPlayer();
unsetNowPlaying();
}
var testStr=document.domain+"/music/";
var docStr=String(window.location);
if((docStr.indexOf(testStr)!=-1)&&(docStr.indexOf("redirectUrl")==-1)){
addLoadEvent(modifyVideosList);
}
function modifyVideosList(){
if(is_ie&&is_mac){
return false;
}
var s=document.getElementById("sidebar");
if(s==null){
return false;
}
var d=s.getElementsByTagName("div")[1];
var fv=document.getElementById("fanvideo");
if(fv==null){
return false;
}
var f=document.createElement("div");
f.setAttribute("id","inline_fan_container");
d.insertBefore(f,fv);
var _1bb=deconcept.SWFObjectUtil.getPlayerVersion()["major"];
_1bb=Number(_1bb);
if(loggedin||isInNetwork){
if(_1bb>7){
var _1bc=document.createElement("p");
_1bc.setAttribute("id","fanenlarge");
var lnk=document.createElement("a");
lnk.setAttribute("href","javascript:launchMidFan()");
var _1be=document.createTextNode("Enlarge");
lnk.appendChild(_1be);
_1bc.appendChild(lnk);
f.appendChild(_1bc);
var inF=document.createElement("div");
inF.setAttribute("id","inline_fan");
inF.setAttribute("title","Click to launch the Fan");
f.appendChild(inF);
var _1c0=document.createElement("div");
var so=new SWFObject("/swf/fan/miniFan.swf?width=180&height=160&jsConnection=true&config=/config/fan/properties_minifan.xml","miniFan","180","160","8","#FFFFFF","true");
so.write("inline_fan");
var _1c2=fv.getElementsByTagName("a");
for(var i=0;i<_1c2.length-1;i++){
_1c2[i].setAttribute("rel","");
_1c2[i].setAttribute("title","Click to play video");
_1c2[i].onclick=function(){
unsetNowPlaying();
addClass(this.parentNode.parentNode,"nowplaying");
addPlayImage(this.parentNode.parentNode);
var _1c4=this.getAttribute("href");
var vStr=_1c4.split("v=")[1];
vStr=vStr.split("&")[0];
fanPlayVideoById(vStr);
return false;
};
}
var dl=fv.getElementsByTagName("dl");
addClass(dl[0],"first");
for(i=0;i<5;i++){
addClass(dl[i],"playlist");
}
addClass(fv,"playlist");
}else{
var so=new SWFObject("/swf/fan/miniFanUpdater.swf","miniFanUpdater","180","160","8","#FFFFFF","true");
so.write("inline_fan_container");
f.className="inlineFanMessaging";
}
}else{
if(_1bb>7){
var _1c7=document.createElement("img");
_1c7.setAttribute("src","/images/global/signinforinlinefan.gif");
_1c7.onclick=function(){
document.location.href="/signin.jsp?redirectUrl="+document.location.href;
};
f.appendChild(_1c7);
f.className="inlineFanMessaging";
}else{
var so=new SWFObject("/swf/fan/miniFanUpdater.swf","miniFanUpdater","180","160","8","#FFFFFF","true");
so.write("inline_fan_container");
f.className="inlineFanMessaging";
}
}
}
function unsetNowPlaying(){
var fv=document.getElementById("fanvideo");
var dl=fv.getElementsByTagName("dl");
if(fv==null){
return false;
}
for(var i=0;i<dl.length;i++){
removeClass(dl[i],"nowplaying");
}
var _1cb=document.getElementById("fv-nowplaying-dd");
if(_1cb!=null){
_1cb.parentNode.removeChild(_1cb);
}
}
function setNowPlaying(idx){
var fv=document.getElementById("fanvideo");
var dl=fv.getElementsByTagName("dl");
if(fv==null){
return false;
}
addClass(dl[idx],"nowplaying");
addPlayImage(dl[idx]);
}
function addPlayImage(_1cf){
var d=document.createElement("dd");
var dt=document.createTextNode("Now Playing");
d.appendChild(dt);
d.className="fv-nowplaying";
d.setAttribute("id","fv-nowplaying-dd");
_1cf.appendChild(d);
}
if(((document.location.hostname.indexOf("www.comcast.net")!=-1)||(document.location.hostname.indexOf("preview.comcast.net")!=-1))&&(document.location.href.indexOf(".comcast.net/cobrand")==-1)){
var _networkDebug=false;
var isInNetwork=false;
var hasIsInNetworkCookieSet=false;
var networkCookie=GetCookie("ISINNETWORK");
if(networkCookie!=""){
var isInNetworkCheck=GetCrumb(networkCookie,"network");
isInNetwork=(isInNetworkCheck=="comcast")||(networkCookie=="comcast");
if(_networkDebug){
alert("isInNetworkCheck="+isInNetworkCheck);
}
hasIsInNetworkCookieSet=true;
}
if(_networkDebug){
alert("isInNetwork="+isInNetwork+",hasIsInNetworkCookieSet="+hasIsInNetworkCookieSet+",networkCookie="+networkCookie);
}
if(!hasIsInNetworkCookieSet){
window.location="/CheckIsInNetwork?redirectUrl="+document.URL;
}
}
var dcsTesting=false;
if(dcsTesting&&isProduction()){
dcsTesting=false;
}
var dcsHTML=0;
var dcsPOLL=1;
var dcsEXPLORE=2;
var dcsEXPRESS=3;
var dcsLITE=4;
var dcsDomain="ssdc.comcast.net";
var dcsURI="";
var dcsTitle="";
var dcsHeadlines="";
var dcsModules="";
var dcsBanners="";
var dcsRef="";
var gImages=new Array;
var gIndex=0;
var DCS=new Object();
var WT=new Object();
var COMCAST=new Object();
function dcsClearValues(){
dcsID="";
dcsURI="";
dcsTitle="";
dcsModules="";
dcsBanners="";
dcsRef="";
dcsSIP=window.location.hostname;
}
function setModule(name){
if(dcsModules.length==0){
dcsModules=name;
}else{
dcsModules+=";"+name;
}
}
function setHeadlines(name){
if(dcsHeadlines.length==0){
dcsHeadlines=name;
}else{
dcsHeadlines+=";"+name;
}
}
function setBanner(name){
if(dcsBanners.length==0){
dcsBanners=name;
}else{
dcsBanners+=";"+name;
}
}
function addBanner(name){
setBanner(name);
}
function setTitle(_1d6){
if(typeof _1d6=="undefined"||_1d6==null){
_1d6="";
}
dcsTitle=_1d6;
}
function setURI(uri){
if(typeof uri=="undefined"||uri==null){
uri="";
}
dcsURI=uri;
}
function setReferrer(ref){
if(typeof ref=="undefined"||ref==null){
ref="";
}
dcsRef=ref;
}
function getID(type){
var id="dcskz8vvr00000c9f3oy3ybgs_3d5h";
if(isProduction()){
switch(type){
case dcsPOLL:
id="dcs7bjhh110000oyioyaka1kl_7j9u";
break;
case dcsHTML:
id="dcskz8vvr00000c9f3oy3ybgs_3d5h";
break;
case dcsEXPLORE:
id="dcs8ir0f010000oyioyaka1kl_8j7n";
break;
case dcsEXPRESS:
id="dcsc5owwq00000kv5xgto5tru_4j8e";
break;
case dcsLITE:
id="dcsigvpg110000oyioyaka1kl_7j7v";
break;
}
}else{
id="dcscah7h110000oyioyaka1kl_7j8d";
}
return id;
}
function getModule(){
return append("CM.mn",dcsModules);
}
function getHeadlines(){
return append("CM.hl",dcsHeadlines);
}
function getBanner(){
return append("WT.ad",dcsBanners);
}
function getTitle(){
return append("WT.ti",dcsTitle);
}
function getURI(){
return append("dcsuri",dcsURI);
}
function getSIP(){
return append("dcssip",dcsSIP);
}
function getFlashVersion(){
return append("CM.flashver",actualVersion);
}
function getReferrer(){
if(dcsRef.length>0){
return append("dcsref",dcsRef);
}else{
if((window.document.referrer!="")&&(window.document.referrer!="-")){
return append("dcsref",new String(window.document.referrer));
}
}
return "";
}
function append(name,_1dc){
if(typeof _1dc=="undefined"||_1dc==null){
_1dc="";
}else{
_1dc+="";
}
if(_1dc.length>0){
return "&"+name+"="+escape(_1dc);
}else{
return "";
}
}
function dcsComcast(){
var _1dd="";
for(name in COMCAST){
if(COMCAST[name]){
_1dd+=append(name,COMCAST[name]);
}
}
return _1dd;
}
function dcsDCS(){
var _1de="";
for(name in DCS){
if(DCS[name]){
if(name=="dcsuri"){
var str=DCS[name];
var _1e0="/qry/myhome";
var _1e1=str.indexOf(_1e0);
if(_1e1>=0){
_1e1+=_1e0.length;
DCS[name]=str.substring(0,_1e1);
}
}
_1de+=append(name,DCS[name]);
}
}
return _1de;
}
function dcsWT(){
var _1e2="";
for(name in WT){
if(WT[name]){
_1e2+=append("WT."+name,WT[name]);
}
}
return _1e2;
}
function dcsTag(){
var _1e3="";
_1e3+=dcsComcast();
_1e3+=dcsDCS();
_1e3+=dcsWT();
_1e3+=getModule()+getBanner()+getHeadlines()+getFlashVersion();
dcsTrack(_1e3);
}
function dcsCreateImage(_1e4){
if(dcsTesting){
displayInWindow(_1e4);
}else{
}
}
function dcsTrack(_1e5,type){
if(typeof type=="undefined"){
type=dcsHTML;
}
var path="http"+(window.location.protocol.indexOf("https:")==0?"s":"")+"://"+dcsDomain+"/"+getID(type)+"/dcs.gif?";
if(_1e5.indexOf("&")==0){
_1e5=_1e5.substring(1);
}
path+=_1e5;
if(path.length>2040&&navigator.userAgent.indexOf("MSIE")>=0){
path=path.substring(0,2040)+"&WT.tu=1";
}
dcsCreateImage(path);
dcsClearValues();
}
function dcsVar(){
var _1e8=new Date();
WT.tz=_1e8.getTimezoneOffset()/60*-1;
WT.bh=_1e8.getHours();
WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
if(typeof (screen)=="object"){
WT.cd=screen.colorDepth;
WT.sr=screen.width+"x"+screen.height;
}
if(typeof (navigator.javaEnabled())=="boolean"){
WT.jo=navigator.javaEnabled()?"Yes":"No";
}
WT.ti=document.title;
WT.js="Yes";
if(typeof (gVersion)!="undefined"){
WT.jv=gVersion;
}
DCS.dcsuri=window.location.pathname;
DCS.dcsqry=window.location.search;
if((window.document.referrer!="")&&(window.document.referrer!="-")){
if(!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
DCS.dcsref=window.document.referrer;
}
}
DCS.dcssip=window.location.hostname;
DCS.dcsdat=_1e8.getTime();
}
function dcsMeta(){
var _1e9;
if(document.all){
_1e9=document.all.tags("meta");
}else{
if(document.documentElement){
_1e9=document.getElementsByTagName("meta");
}
}
if(typeof (_1e9)!="undefined"){
for(var i=0;i<_1e9.length;i++){
myMeta=_1e9.item(i);
if(myMeta.name){
if(myMeta.name.indexOf("WT.")==0){
WT[myMeta.name.substring(3)]=myMeta.content;
}else{
if(myMeta.name.indexOf("DCS.")==0){
DCS[myMeta.name.substring(4)]=myMeta.content;
}else{
COMCAST[myMeta.name]=myMeta.content;
}
}
}
}
}
}
function castBoolean(_1eb){
if(typeof _1eb!="boolean"){
_1eb=castString(_1eb).toLowerCase();
if(_1eb.length==0||_1eb=="true"||_1eb=="1"){
_1eb=true;
}else{
_1eb=false;
}
}
return _1eb;
}
function castString(_1ec){
if(typeof _1ec=="undefined"||_1ec==null){
_1ec="";
}else{
if(typeof _1ec!="string"){
_1ec+="";
}
}
return _1ec;
}
function castInt(_1ed){
if(isNaN(_1ed)){
_1ed=-1;
}else{
_1ed=parseInt(_1ed,10);
}
return _1ed;
}
function displayInWindow(str){
if(dcsTesting){
var win=window.open("","","height=400,width=400,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");
win.document.writeln("<html><head><title>Tracking Testing</title></head><body><textarea style=\"height:375px;width:375px;\">"+str+"</textarea></body></html>");
}
}
function displayArguments(){
if(dcsTesting){
var _1f0="";
for(var x=0;x<arguments.length;x++){
if(arguments[x].length>0){
_1f0+=x+": "+arguments[x]+"\n";
}
}
if(_1f0.length>0){
displayInWindow("Parameters:<br />"+_1f0);
}
}
}
function wtParseParamString(_1f2){
var args=new Object();
var _1f4=_1f2.split("&");
for(var i=0;i<_1f4.length;i++){
var pos=_1f4[i].indexOf("=");
if(pos==-1){
continue;
}
var _1f7=_1f4[i].substring(0,pos);
var _1f8=_1f4[i].substring(pos+1);
args[_1f7]=unescape(_1f8);
}
return args;
}
function wtGetParam(_1f9,_1fa){
var _1fb=wtParseParamString(_1f9);
var _1fc=castString(_1fb[_1fa]);
return _1fc;
}
function trackBanners(uri,name,_1ff,url,_201,_202){
uri=castString(uri);
name=castString(name);
_1ff=castString(_1ff);
url=castString(url);
_202=castString(_202);
_201=castBoolean(_201);
if(uri.indexOf(".banner")==-1){
uri+=".banner";
}
if(name.length==0){
name="UnknownName";
}
DCS=new Object();
DCS.dcsuri=uri;
DCS.dcspro=window.location.protocol;
DCS.dcssip=window.location.hostname;
var _203=new Date();
DCS.dcsdat=_203.getTime();
if(_1ff.length==0){
_1ff=window.location.href;
}
DCS.dcsref=_1ff;
var _204=append("WT.ac",name)+dcsDCS()+_202;
dcsTrack(_204);
if(url.length>0){
if(_201){
window.open(url,"tracking");
}else{
window.location=url;
}
}
}
function trkLink(uri,_206,_207,url,_209,_20a,_20b,_20c,_20d){
uri=castString(uri);
_206=castString(_206);
_207=castString(_207);
url=castString(url);
_209=castString(_209);
_20d=castString(_20d);
_20a=castBoolean(_20a);
if(uri.indexOf(".exlink")==-1){
if(_20a){
uri+=".inlink";
}else{
uri+=".exlink";
}
}
setTitle(_206);
DCS=new Object();
DCS.dcsuri=uri;
DCS.dcspro=window.location.protocol;
DCS.dcssip=window.location.hostname;
var _20e=new Date();
DCS.dcsdat=_20e.getTime();
if(_207.length==0){
_207=window.location.href;
}
DCS.dcsref=_207;
var _20f=getTitle()+dcsDCS()+_209+((url.length>0)?"&CM.url="+url:"");
dcsTrack(_20f);
if(url.length>0){
if(_20a){
window.location=url;
}else{
_20b=castInt(_20b);
_20c=castInt(_20c);
var _210="";
if(_20b>0){
_210+=(_210!=null&&_210.length>0)?",":"";
_210+="width="+_20b;
}
if(_20c>0){
_210+=(_210!=null&&_210.length>0)?",":"";
_210+="height="+_20c;
}
if(_20d!=null&&_20d.length>0){
_210+=(_210!=null&&_210.length>0)?",":"";
_210+=_20d;
}
window.open(url,"tracking",_210);
}
}
}
function trkExLink(uri,_212,_213,url,_215){
trkLink(uri,_212,_213,url,_215,false);
}
function linkTracking(name,_217,_218,_219){
trkLink(name,"Old Tracking","",_217,"",false);
}
function trackExternalLink(uri,_21b,_21c,url,_21e){
trkLink(uri,_21b,_21c,url,_21e,false);
}
function trackPoll(uri,_220){
uri=castString(uri);
_220=castString(_220);
setURI(uri);
setTitle("Comcast Polls");
var _221=getURI()+getTitle()+"&"+_220;
dcsTrack(_221,dcsPOLL);
}
function trackPortal(_222){
var _223="";
_223+=dcsComcast();
_223+=dcsDCS();
_223+=dcsWT();
_223+=getModule()+getBanner()+getHeadlines()+getFlashVersion();
_222=castString(_222);
_222=unescape(_222);
_222=_223+_222;
if(_222.indexOf("CM.site=explore")>-1){
dcsTrack(_222,dcsEXPLORE);
}else{
if(_222.indexOf("CM.site=express")>-1){
dcsTrack(_222,dcsEXPRESS);
}else{
if(_222.indexOf("CM.site=lite")>-1){
dcsTrack(_222,dcsLITE);
}else{
dcsTrack(_222);
}
}
}
}
function trackPortalLink(_224,url,trgt){
var _227="";
_227+=dcsComcast();
_227+=dcsDCS();
_227+=dcsWT();
_227+=getModule()+getBanner()+getHeadlines()+getFlashVersion();
_224=castString(_224);
_224=unescape(_224);
_224=_227+_224;
url=castString(url);
url=unescape(url);
trgt=castString(trgt);
trgt=unescape(trgt);
if(_224.indexOf("CM.site=explore")>-1){
dcsTrack(_224,dcsEXPLORE);
}else{
if(_224.indexOf("CM.site=express")>-1){
dcsTrack(_224,dcsEXPRESS);
}else{
if(_224.indexOf("CM.site=lite")>-1){
dcsTrack(_224,dcsLITE);
}else{
dcsTrack(_224);
}
}
}
window.open(url,trgt);
}
function pTopNav(_228){
var uri="/topnav.swf";
var _22a=wtGetParam(_228,"r");
var _22b=wtGetParam(_228,"l");
var _22c=wtGetParam(_228,"e");
_22c=stringReplace(_22c,";;;","&")+"&CM.gc="+wtGetParam(_228,"i");
if(_22c.indexOf("&sw=1")>-1){
_22c=stringReplace(_22c,"&sw=1","");
trkLink(uri,"",_22a,_22b,_22c,true);
}else{
var _22d=wtGetParam(_228,"w");
var _22e=wtGetParam(_228,"h");
var _22f=wtGetParam(_228,"f");
_22c=stringReplace(_22c,"&sw=0","");
trkLink(uri,"",_22a,_22b,_22c,false,_22d,_22e,_22f);
}
}
function pCoverL(_230){
_230=castString(_230);
var uri=wtGetParam(_230,"u");
var _232=wtGetParam(_230,"t");
var _233=wtGetParam(_230,"r");
var _234=wtGetParam(_230,"l");
var _235=wtGetParam(_230,"e");
_235=unescape(_235);
_235=stringReplace(_235,";;;","&");
if(_235.indexOf("&sw=1")>-1){
_235=stringReplace(_235,"&sw=1","");
trkLink(uri,_232,_233,_234,_235,true);
}else{
_235=stringReplace(_235,"&sw=0","");
trkLink(uri,_232,_233,_234,_235,false);
}
}
function pCover(_236){
_236=castString(_236);
var uri=wtGetParam(_236,"u");
var _238=wtGetParam(_236,"t");
var _239=wtGetParam(_236,"r");
var _23a=wtGetParam(_236,"e");
_23a=unescape(_23a);
_23a=stringReplace(_23a,";;;","&");
trackFlash(uri,_238,_239,_23a);
}
function pFan(_23b){
var _23c=wtGetParam(_23b,"ts");
var uri=_23c+"/fan"+wtGetParam(_23b,"u")+".swf";
var _23e=wtGetParam(_23b,"t");
var _23f="/fan"+wtGetParam(_23b,"r")+".swf";
var _240=wtGetParam(_23b,"e");
_240=stringReplace(_240,";;;","&");
trackFlash(uri,_23e,_23f,_240);
}
function pFanL(_241){
var _242=wtGetParam(_241,"ts");
var uri=_242+"/fan"+wtGetParam(_241,"u")+".swf";
var _244=wtGetParam(_241,"t");
var _245="/fan"+wtGetParam(_241,"r")+".swf";
var _246=wtGetParam(_241,"l");
var _247=wtGetParam(_241,"e");
_247=stringReplace(_247,";;;","&");
trkLink(uri,_244,_245,_246,_247,false);
}
function trackFlash(uri,_249,_24a,_24b){
uri=castString(uri);
_249=castString(_249);
_24a=castString(_24a);
_24b=castString(_24b);
setTitle(_249);
DCS=new Object();
DCS.dcsuri=uri;
DCS.dcspro=window.location.protocol;
DCS.dcssip=window.location.hostname;
var _24c=new Date();
DCS.dcsdat=_24c.getTime();
if(_24a.length==0){
_24a=window.location.href;
}
DCS.dcsref=_24a;
var _24d=getTitle()+dcsDCS()+_24b;
dcsTrack(_24d);
}
dcsVar();
dcsMeta();
function isProduction(){
var dom=new String(location.hostname);
if(dom.indexOf("comcast.net")>=0||dom.indexOf("attbi.com")>=0){
return true;
}else{
return false;
}
}
var _hbEC=0;
var _hbE=new Array;
function _hbEvent(a,b){
b=_hbE[_hbEC++]=new Object();
b._N=a;
b._C=0;
return b;
}
var hbx=_hbEvent("pv");
hbx.vpc="HBX0100u";
hbx.gn="serviceh.comcast.net";
if(isProduction()){
hbx.acct="DM550914NIBE";
}else{
hbx.acct="DM550618GPRV";
}
hbx.pn="PUT+PAGE+NAME+HERE";
hbx.mlc="CONTENT+CATEGORY";
hbx.pndef="title";
hbx.ctdef="full";
hbx.fv="";
hbx.lt="auto";
hbx.dlf="n";
hbx.dft="n";
hbx.elf="n";
function changeFlashPage(_251){
_hbPageView(_251,hbx.pn);
}

