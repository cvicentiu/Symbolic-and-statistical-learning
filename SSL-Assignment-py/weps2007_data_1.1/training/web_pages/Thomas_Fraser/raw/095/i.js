function k4() {
f=document.getElementsByTagName("form");
s='Sorry, this FreeWebs account is still provisional and forms are not permitted.  \nFreeWebs accounts are provisional for the first 7 days.';
for(var i=0;i<f.length;i++) {
if (f[i].action!='http://members.freewebs.com/guestbookA.jsp' 
&& f[i].action!='http://members.freewebs.com/guestbook.jsp'
&& f[i].action!='http://polls.freewebs.com/Members/Polls/vote.jsp'){
f[i].setAttribute("action","javascript:alert(s);");
f[i].onsubmit=function() {
alert(s);
return false;
};
}
}
}
function hashUN(u) {
   if(u.length<5){ return 0;}
   return u.charCodeAt(0)*31*31*31*31 + u.charCodeAt(1)*31*31*31 + u.charCodeAt(2) * 31*31 
         + u.charCodeAt(3) + 31 + u.charCodeAt(4);
}
function fw_getU(u) {
  u = u.toString(); var i;var re = new RegExp("http://(www.)?freeweb[sz].com/","i");var m = re.exec(u);if(m==null || m.index!=0) { return ""; } else { u = u.substring(m[0].length); if((i=u.indexOf("/")) > 0) {return u.substring(0,i);
    } else {return u;}}}
var fw_un,fw_tbc;
function fw_i() {
var np=0;
var al=-1;
var prov=0;
var ll=-1;
var stb=0;
var un=fw_getU(document.location);
var tbc='444444';

if(xmlp.readyState==4) {
if(xmlp.status==200) {
if (xmlp.responseText.indexOf("Not Found")<0){
eval(xmlp.responseText);
fw_un = un;
fw_tbc = tbc;
if(np==1 && al==2) {
window.status='This site is hosted for free at Freewebs.com.';
}
// hashUN(un) % 32 == 7 
if(typeof(fwt_hnt)=='undefined' && ((al!=2 && np==1 && self==top) ||stb==1)){
//if (false){
  //document.write('<script type="text/javascript" src="http://toolbar.freewebs.com/JS/checkLogin.jsp"></script><script type="text/javascript" src="http://images.freewebs.com/JS/Toolbar/libs.js"></script><script type="text/javascript" src="http://images.freewebs.com/JS/Toolbar/toolbar.js"></script>');
  var sc = document.createElement('script');
  /*sc.src = 'http://toolbar.freewebs.com/JS/checkLogin.jsp?noCache='+Math.random();
  sc.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(sc);
  sc = document.createElement('script');*/
  sc.src = 'http://images.freewebs.com/JS/Toolbar/libs.js';
  sc.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(sc);
    /*sc = document.createElement('script');
    window.setTimeout(function(){
    sc.src = 'http://images.freewebs.com/JS/Toolbar/toolbar.js';
    sc.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(sc);
    }, 500);*/
}
if (prov==1){
window.setInterval("k4()",1000);
k4();
}
}
}
}
}

function loadText() {
var a,b;
if (navigator.userAgent.indexOf('MSIE 5.0')>0) return;
if (navigator.userAgent.indexOf('MSIE 4.0')>0) return;
if (document.getElementById){
eval("try { xmlp = new XMLHttpRequest();} catch (e) {  xmlp = new ActiveXObject('Msxml2.XMLHTTP');}  try { netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead'); } catch (e) { }");
}
if (xmlp==null) return;
if(document.all) {
xmlp.open("GET",'.i?noCache='+Math.random(),true);
xmlp.onreadystatechange = fw_i;
xmlp.send(null);
} else {
xmlp.open("GET",'.i?noCache='+Math.random(),true);
xmlp.onreadystatechange = fw_i;
xmlp.send(null);
}
}
loadText();
 
