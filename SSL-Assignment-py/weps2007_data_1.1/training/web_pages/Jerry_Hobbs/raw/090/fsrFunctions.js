var popUpURL="//www.foreseeresults.com/survey/display";
var FSRImgURL="//www.foreseeresults.com/survey/FSRImg";
var OTCImgURL="//controller.foreseeresults.com/fsrSurvey/OTCImg";
var ckAlreadyShown=triggerParms["ascookie"];
var ckLoyaltyCount=triggerParms["lfcookie"];
var fullURL=null;
var oldURL=null;
var myPopUp=null;
var fsr_aol=null;
var dcQString="";
var cpp_3="";
var winOptions="width= 1,height= 1,top= 4000,left= 4000,resizable=yes,scrollbars=yes";
var persistentExpires=new Date();
persistentExpires.setTime(persistentExpires.getTime()+(triggerParms["rw"]*60*1000));
function ForeCStdGetCookie(_1){
var _2=_1+"=";
var _3=_2.length;
var _4=document.cookie.length;
var i=0;
while (i<_4){
var j=i+_3;
if(document.cookie.substring(i,j)==_2){
return ForeCStdGetCookieVal(j);
}
i=document.cookie.indexOf(" ",i)+1;
if(i==0){
break;
}
}
return null;
}
function fsr_showWindow(){
if(myPopUp!=null&&!myPopUp.closed&&fsr_aol==false){
return;
}
var _7="";
cpp_3="Browser:"+cppUrlPatch(navigator.userAgent);
cpp_3+=";dhtml";
var _8=fullURL.indexOf("&cpp_3=");
var _9=fullURL.indexOf("&",_8+1);
if(_9==-1){
fullURL=fullURL.substring(0,_8);
}else{
_7=fullURL.substring(_9,fullURL.length);
fullURL=fullURL.substring(0,_8);
}
fullURL+="&cpp_3="+cpp_3+_7;
if(document.all&&document.all.fsr_window.filters){
eval("document.all.fsr_window").filters.revealTrans.transition=23;
eval("document.all.fsr_window").filters.revealTrans.Apply();
eval("document.all.fsr_window").style.visibility="visible";
eval("document.all.fsr_window").filters.revealTrans.Play();
}else{
if(document.all){
document.all.fsr_window.style.visibility="visible";
}else{
if(document.getElementById){
document.getElementById("fsr_window").style.visibility="visible";
}
}
}
}
function fsr_hideWindow(){
if(document.all&&document.all.fsr_window.filters){
eval("document.all.fsr_window").filters.revealTrans.transition=23;
eval("document.all.fsr_window").filters.revealTrans.Apply();
eval("document.all.fsr_window").style.visibility="hidden";
eval("document.all.fsr_window").filters.revealTrans.Play();
}else{
if(document.all){
document.all.fsr_window.style.visibility="hidden";
}else{
if(document.getElementById){
document.getElementById("fsr_window").style.visibility="hidden";
}
}
}
}
function ForeCStdSetCookie(_a,_b){
var _c=ForeCStdSetCookie.arguments;
var _d=ForeCStdSetCookie.arguments.length;
var _e=(_d>2)?_c[2]:null;
var _f=(_d>3)?_c[3]:null;
var _10=(_d>4)?_c[4]:null;
var _11=(_d>5)?_c[5]:false;
document.cookie=_a+"="+escape(_b)+((_e==null)?"":("; expires="+_e.toGMTString()))+((_f==null)?"":("; path="+_f))+((_10==null)?"":("; domain="+_10))+((_11==true)?"; secure":"");
}
function ForeCStdGetCookieVal(_12){
var _13=document.cookie.indexOf(";",_12);
if(_13==-1){
_13=document.cookie.length;
}
return unescape(document.cookie.substring(_12,_13));
}
function specialEscape(str){
var _15="";
var i;
var _17=0;
for(i=0;(_17=str.indexOf("+",_17))!=-1;){
_15+=str.substring(i,_17)+"%2B";
i=_17+1;
_17++;
}
_15+=str.substring(i,str.length);
return _15;
}
function Pop(){
myPopUp=window.open(fullURL,"survey",winOptions);
if(myPopUp!=null&&!myPopUp.closed){
if(triggerParms["pu"]==1){
self.focus();
}else{
myPopUp.focus();
}
}
}
function checkMAC(){
if(navigator.platform.indexOf("Win32")>=0){
return false;
}else{
return true;
}
}
var detect=navigator.userAgent.toLowerCase();
function checkAOL(){
if(detect.indexOf("aol")>=0){
return true;
}
return false;
}
function currentLocationExcluded(){
var _18=window.location.pathname;
for(key in excludeList){
if(_18.indexOf(excludeList[key])!=-1){
return true;
}
}
return false;
}
var newDt;
var currTime;
var OTCImg;
var FSRImg;
var surveyProcessCont=1;
function stdImgProc(){
if(triggerParms["compliant508"]==1){
fsr_showWindow();
}else{
setTimeout("fsr_showWindow();",1000,"JavaScript");
}
}
function fsrShowSurvey(){
if(dcQString==""){
stdImgProc();
}else{
newDt=new Date();
currTime=newDt.getTime();
FSRImg=new Image();
FSRImg.src=null;
FSRImg.onerror=imgErrorProc;
FSRImg.onload=imgOnloadProc;
FSRImg.src=FSRImgURL+"?"+dcQString+"&uid="+currTime;
}
}
function imgOnloadProc(){
if(surveyProcessCont==1&&FSRImg.width==3){
stdImgProc();
}
return true;
}
function imgErrorProc(){
surveyProcessCont=0;
return true;
}
function otcOnloadProc(){
if(surveyProcessCont==1&&OTCImg.width==3){
fsrShowSurvey();
}else{
surveyProcessCont=0;
}
return true;
}
function otcErrorProc(){
fsrShowSurvey();
return true;
}
function Poll(){
if(triggerParms["dt"]==1){
return;
}
if(currentLocationExcluded()){
return;
}
var _19=ForeCStdGetCookie(ckLoyaltyCount);
var _1a=ForeCStdGetCookie(ckAlreadyShown);
var _1b;
var _1c=Math.random();
_1c*=100;
if(_19==null){
_1b=1;
ForeCStdSetCookie(ckLoyaltyCount,_1b,null,"/",triggerParms["domain"]);
_19=ForeCStdGetCookie(ckLoyaltyCount);
}
if(_19!=null){
_1b=_19;
if(_1b>=triggerParms["lf"]){
if(_1a==null){
if(triggerParms["rso"]==1&&triggerParms["aro"]==1){
triggerParms["sp"]=100;
}
if(_1c<=triggerParms["sp"]){
fsr_aol=checkAOL();
var _1d=checkMAC();
var _1e="fsr_nn6";
if(document.all||document.getElementById){
_1e="fsr_ie";
}
if(document.layers){
_1e="fsr_nn";
}
fullURL=popUpURL+"?"+"width="+triggerParms["width"]+"&height="+triggerParms["height"]+"&cid="+specialEscape(escape(triggerParms["cid"]))+"&mid="+specialEscape(escape(triggerParms["mid"]));
if((triggerParms["omb"])!=null){
fullURL+="&omb="+escape(triggerParms["omb"]);
}
if((triggerParms["cmetrics"])!=null){
fullURL+="&cmetrics="+escape(triggerParms["cmetrics"]);
}
if(triggerParms["olpu"]==1){
fullURL+="&olpu=1";
}
if((triggerParms["dcUniqueId"])!=null){
fullURL+="&dcUniqueId="+escape(triggerParms["dcUniqueId"]);
}
if(triggerParms["rso"]==1){
fullURL+="&rso=1&rct="+triggerParms["rct"]+"&rds="+triggerParms["rds"]+"&mrd="+triggerParms["mrd"]+"&rws="+triggerParms["rw"];
}
if(triggerParms["capturePageView"]==1){
triggerParms["cpp_2"]="PageView:"+_1b;
}
if((triggerParms["midexp"])!=null){
fullURL+="&ndc=1&fsexp=5256000&midexp="+triggerParms["midexp"];
}
triggerParms["cpp_3"]="Browser:"+cppUrlPatch(navigator.userAgent)+";normal";
var _1f="";
for(paramKey in triggerParms){
if(paramKey.substring(0,3)=="cpp"){
fullURL+="&"+paramKey+"="+escape(triggerParms[paramKey]);
}
}
oldURL=fullURL;
if(triggerParms["rso"]!=1){
if(triggerParms["npc"]==1){
ForeCStdSetCookie(ckAlreadyShown,"true",null,"/",triggerParms["domain"]);
}else{
ForeCStdSetCookie(ckAlreadyShown,"true",persistentExpires,"/",triggerParms["domain"]);
}
}
if(fsr_aol==false){
myPopUp=window.open(fullURL,"survey",winOptions);
}
if(_1d==false&&(_1e!="fsr_nn")&&(triggerParms["dhtml"]==1)){
fullURL=oldURL;
fsr_left=(screen.width-triggerParms["dhtmlWidth"])/2;
fsr_top=Math.min((screen.height-triggerParms["dhtmlHeight"])/2,150);
document.write("<div id=\"fsr_window\" style=\"position:absolute; left:"+fsr_left+"px; top:"+fsr_top+"px; z-index:1; border:0; visibility:hidden; filter:revealTrans(Duration=0.5, Transition=23);\">"+"<iframe id=\"cframe\" src="+"\""+triggerParms["dhtmlURL"]+"?fullURL="+fullURL+"\" width="+triggerParms["dhtmlWidth"]+" height="+triggerParms["dhtmlHeight"]+"></iframe></div>");
if(triggerParms["rso"]==1){
dcQString="rso=1&rct="+triggerParms["rct"]+"&rds="+triggerParms["rds"]+"&mrd="+triggerParms["mrd"]+"&rws="+triggerParms["rw"];
if(triggerParms["dcUniqueId"]!=null){
dcQString+="&dcUniqueId="+specialEscape(escape(triggerParms["dcUniqueId"]));
}
}
if((triggerParms["midexp"])!=null){
dcQString="ndc=1&midexp="+triggerParms["midexp"]+"&mid="+specialEscape(escape(triggerParms["mid"]));
if(triggerParms["dcUniqueId"]!=null){
dcQString+="&dcUniqueId="+specialEscape(escape(triggerParms["dcUniqueId"]));
}
}
surveyProcessCont=1;
newDt=new Date();
currTime=newDt.getTime();
OTCImg=new Image();
OTCImg.src=null;
OTCImg.onerror=otcErrorProc;
OTCImg.onload=otcOnloadProc;
OTCImg.src=OTCImgURL+"?protocol="+window.location.protocol+"&uid="+currTime;
}
if(myPopUp!=null&&!myPopUp.closed){
if(triggerParms["pu"]==1){
self.focus();
}else{
myPopUp.focus();
}
}
}
}
}
_1b++;
ForeCStdSetCookie(ckLoyaltyCount,_1b,null,"/",triggerParms["domain"]);
}
}

