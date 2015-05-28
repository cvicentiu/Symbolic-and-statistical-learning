<!--
var wa_bc="http://tag2.webabacus.com";
var wa_s="https://tag2.webabacus.com";
var wa_bi="Justgiving";
var wa_y=730;
var wa_a="";
var wa_ad=0;
var wa_k="";
var wa_v=new Date();
var wa_i=wa_v.getTime();
var wa_bv="";
var wa_bb="0";
var wa_ba="0";
var wa_az="0";
var wa_bj=Math.floor(Math.random()*1000000001);
var wa_o="1.89jg3";
var wa_bu="-";
var wa_br=0;
var wa_bq=0;
var wa_bp=0;
var wa_ay=0;
var wa_ax=0;
var wa_bo="-";
var wa_bn="-";
var wa_bh="-";
var wa_aw="";
var wa_av="-";
var wa_bm=0;
var wa_bt="-";
var wa_bs=0;
var wa_bl="-";
var wa_ai="-";
var wa_ae;
var wa_ab="-";
var wa_au="-";
var wa_be=0;
var wa_at=0;
var wa_aa="-";
var wa_n="";
var wa_bd="-";
var wa_bg="-";
var wa_x="";
var wa_e="";
var wa_h="";
var wa_al=0;
keys=new Array();
values=new Array();
var wa_m="";
var src="-";
var wa_ak=wa_y*86400000;
cexp=new Date(wa_v.getTime()+wa_ak);
var wa_c=0;
var wa_="";
var wa_l="";
var wa_g="-";
function logclientdata(wa_bw,wa_ae){
wa_b=wa_bw;
if(wa_b=="01"){
wa_h=new Date();
wa_al=wa_h.getTime();
wa_bb=(wa_al-wa_i);
wa_g=wa_bj;
}
else if(wa_b=="02"){
wa_h=new Date();
wa_al=wa_h.getTime();
wa_ba=(wa_al-wa_i);
wa_g=wa_bj;
}
else if(wa_b=="03"){
wa_h=new Date();
wa_al=wa_h.getTime();
wa_az=(wa_al-wa_i);
wa_g=wa_bj;
}
else{
wa_bb=0;
wa_ba=0;
wa_az=0;
wa_g=Math.floor(Math.random()*1000000001);
wa_b="-";
}
if(navigator.appName=='Netscape')wa_aw="NS";
else{
if(navigator.appName=='Microsoft Internet Explorer')wa_aw="IE";
else wa_aw="OT";
}
wa_bo=navigator.javaEnabled()?"Y":"N";
wa_bh=document.domain;
wa_bn=wa_aw=="NS"?navigator.language:navigator.browserLanguage;
wa_br=Math.pow(2,screen.colorDepth);
sp=screen.pixelDepth;
wa_bq=screen.width;
wa_bp=screen.height;
wa_h=new Date();
wa_av=escape(wa_bi);
if(wa_av==null||wa_av=="")wa_av="-";
wa_bm=wa_h.getTimezoneOffset();
wa_bt=history.length;
wa_bs=wa_h.getTime();
wa_bl=wa_bq+"x"+wa_bp;
wa_ai=escape(document.URL);
wa_ab=escape(document.referrer);
if(wa_ab==null||wa_ab=="")wa_ab="-";
wa_au=escape(document.title);
if(wa_au==null||wa_au=="")wa_au="-";
if(wa_b!="01"){
wa_at=0;
try{
wa_be=document.fileSize*1;
var wa_as=new Object();
for(wa_t=0;wa_t<document.images.length;wa_t++){
if(!wa_as[document.images[wa_t].src]){
wa_at+=parseInt(document.images[wa_t].fileSize);
wa_as[document.images[wa_t].src]=true;
}
}
}catch(e){wa_be=0;wa_at=0;}
if(wa_aw=='IE'){
if(document.documentElement&&document.documentElement.clientWidth){
wa_ay=document.documentElement.clientWidth;
wa_ax=document.documentElement.clientHeight;
}
else if(document.body){
wa_ay=document.body.clientWidth;
wa_ax=document.body.clientHeight;
}
}
else{
try{
wa_ay=window.outerWidth;wa_ax=window.outerHeight;
}catch(e){wa_ay=0;wa_ax=0;}
}
var wa_bg=wa_ay+"x"+wa_ax;
if(typeof(wacustomvarnames)!="undefined"){
wa_="";
for(wa_t=0;wa_t<wacustomvarnames.length;wa_t++){
wa_=wa_+wacustomvarnames[wa_t]+"~"+wacustomvarvalues[wa_t];
if(wa_t!=wacustomvarnames.length-1)wa_=wa_+"~";
}
}else
wa_="-";
}
else{
wa_be="-";
wa_at="-";
wa_bg="-";
wa_="-";
}
parseQS();
wa_l=getCookie("nocookie");
if(wa_l!="1"){
wa_n=getQSParam("w_id");
if(wa_n==null||wa_n==""){
wa_aa=getCookie("webabacus_id");
}else{
wa_aa=wa_n;
}
if(wa_aa==null||wa_aa=="-1"){
wa_aa=wa_h.getTime()+"-1";
wa_bd="1"
}else{
wa_bd="0"
}
document.cookie="webabacus_id="+escape(wa_aa)+"; expires="+cexp.toUTCString()+"; path=/"+(wa_a==""?"":"; domain="+wa_a);
}else{
wa_aa="nocookie";
wa_bd="-1";
}
wa_m=getQSParam(wa_k);
if(wa_m!=null){
src=escape(wa_m);
wa_c=wa_v.getTime();
if(wa_l!="1"){
document.cookie="wa_last_source="+escape(wa_m)+"; expires="+cexp.toUTCString()+"; path=/"+(wa_a==""?"":"; domain="+wa_a);
document.cookie="wa_last_source_date="+wa_c+"; expires="+cexp.toUTCString()+"; path=/"+(wa_a==""?"":"; domain="+wa_a);
}
}else{
if(wa_l!="1"){
src=getCookie("wa_last_source");
wa_c=getCookie("wa_last_source_date");
}
if(src==null)src="-";
if(wa_c==null)wa_c=0;
}
if(wa_ai.substring(0,5)=="https")
wa_x=wa_s+"/clientinfo.gif?"+wa_o+"&"+wa_bs+"&";
else
wa_x=wa_bc+"/clientinfo.gif?"+wa_o+"&"+wa_bs+"&";
if(wa_ae){
var wa_ai=escape('http://')+wa_bh+'/'+escape(wa_ae);
}
wa_e=wa_av+"&"+wa_bm+"&"+wa_aa+"&"+wa_bd+"&"+wa_br+"&"+wa_bl+"&"+wa_bg+"&"+wa_bu+"&"+wa_bo+"&"+wa_bn+"&"+wa_bh+"&"+wa_ai+"&"+wa_ab+"&"+wa_au+"&"+wa_be+"&"+wa_at+"&"+wa_g+"&"+wa_b+"&"+wa_bb+"&"+wa_ba+"&"+wa_az+"&"+src+"&"+wa_c+"&"+wa_;
var wa_z=2000;
var wa_ar=wa_e.length;
if(wa_ar>wa_z)wa_e=wa_e.substring(0,wa_z);
var wa_aj=new Image();
wa_aj.src=wa_x+wa_e+"&-";
}
function getCookie(wa_u){
var wa_aq=document.cookie;
var wa_ah=wa_u+"=";
var wa_ap=wa_aq.length;
var wa_d=0;
while(wa_d<wa_ap){
var wa_r=wa_d+wa_ah.length;
if(wa_aq.substring(wa_d,wa_r)==wa_ah){
var wa_ac=wa_aq.indexOf(";",wa_r);
if(wa_ac==-1)wa_ac=wa_ap;
return unescape(wa_aq.substring(wa_r,wa_ac));
}
wa_d=wa_aq.indexOf(" ",wa_d)+1;
if(wa_d==0)break;
}
return null;
}
function getQSParam(wa_bk)
{
var wa_w=null;
for(var wa_t=0;wa_t<keys.length;wa_t++)
{
if(keys[wa_t]==wa_bk)
{
wa_w=values[wa_t];
break;
}
}
return wa_w;
}
function parseQS()
{
var wa_ag="";
try{
wa_ag=window.location.search.substring(1);
}catch(e){}
var wa_ao=wa_ag.toLowerCase();
var wa_p=wa_ao.split("&");
for(var wa_t=0;wa_t<wa_p.length;wa_t++)
{
var wa_an=wa_p[wa_t].indexOf('=');
if(wa_an>=0)
{
keys[keys.length]=wa_p[wa_t].substring(0,wa_an);
values[values.length]=wa_p[wa_t].substring(wa_an+1);
}
}
}
function tagFields(wa_am){
var wa_f;
if(wa_am!=""){
for(wa_f=0;wa_f<document.forms.length;wa_f++){
if(document.forms[wa_f].wa_u==wa_am)break;
}
if(wa_f==document.forms.length)wa_f=0;
}else wa_f=0;
var wa_af=document.forms[wa_f];
wa_am=wa_af.wa_u;
var wa_q="&"+(escape(wa_am)==""?"-":escape(wa_am));
var wa_j,vName,vVal;
for(wa_j=0;wa_j<wa_af.elements.length;wa_j++){
vName=escape(wa_af.elements[wa_j].wa_u);
if(vName==""||vName==null)vName="-";
vVal=escape(wa_af.elements[wa_j].wa_w);
if(vVal==""||vVal==null)vVal="-";
wa_q=wa_q+"~"+vName+"~"+vVal;
}
if(wa_q=="&")wa_q="&-";
var wa_bf=new Image();
wa_bf.src=wa_x+wa_e+wa_q;
}
if(wa_ad==1){
logclientdata("01");
}else{
logclientdata("");
}
