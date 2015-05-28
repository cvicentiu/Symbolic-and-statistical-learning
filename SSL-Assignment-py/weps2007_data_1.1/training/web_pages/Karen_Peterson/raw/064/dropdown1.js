<!--

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function P7_OpResizeFix(a) { //v1.1
if(!window.opera){return;}if(!document.p7oprX){
 document.p7oprY=window.innerWidth;document.p7oprX=window.innerHeight;
 document.onmousemove=P7_OpResizeFix;
 }else{if(document.p7oprX){
  var k=document.p7oprX-window.innerHeight;
  var j=document.p7oprY - window.innerWidth;
  if(k>1 || j>1 || k<-1 || j<-1){
  document.p7oprY=window.innerWidth;document.p7oprX=window.innerHeight;
  location.reload();}}}
}
P7_OpResizeFix();
//-->