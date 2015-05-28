function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

//MenuMagic II scripts by PVII
//www.projectseven.com
//Copyright(c) 2002, All Rights Reserved
//
function P7_setMM2(){ //v2.0 by PVII
 //set the image over and down name convention
 document.p7TabOver="_over";
 document.p7TabDown="_down";
 var dt=false;if(document.getElementsByTagName){dt=true;}if(document.P7TabBar){return;}
 var i,k=-1,g,x,gg,tl,ts,ti,tm,tt,tsn,tu,el,args=P7_setMM2.arguments;
 P7TabProp=new Array();for(i=0;i<args.length;i++){P7TabProp[i]=args[i];}
 P7TabIM=new Array();P7TabSB=new Array();if(dt){tm=document.getElementsByTagName("IMG");
 }else{tm=document.images;}tm=document.images;tt=new Array();tt=tt.concat(tm);
 if(document.layers){for(i=0;i<document.layers.length;i++){ti=document.layers[i].document.images;
 if(ti){tt=tt.concat(ti);}for(x=0;x<document.layers[i].document.layers.length;x++){
 ti=document.layers[i].document.layers[x].document.images;if(ti){tt=tt.concat(ti);}}}tm=tt;}
 for(i=0;i<tm.length;i++){tl=tm[i].name; if(dt&&!tl){tl=tm[i].id;}
 if(tl.indexOf("p7TBim")==0){ts=tl.replace("p7TBim","");
 tsn="p7TBsub"+ts;k++;P7TabIM[k]=tl;if((g=MM_findObj(tsn))!=null){P7TabSB[k]=tsn;
 gg=(document.layers)?g:g.style;gg.visibility="hidden";}else{P7TabSB[k]='N';}}}
 document.P7_TBswapd=new Array();document.P7_TBswapo=new Array();for(i=0;i<P7TabIM.length;i++){
 g=MM_findObj(P7TabIM[i]);gg=g.src;g.p7TBim=g.src;tu=gg.lastIndexOf(".");
 g.p7TBimo=gg.substring(0,tu)+document.p7TabOver+gg.substring(tu,gg.length);
 g.p7TBimd=gg.substring(0,tu)+document.p7TabDown+gg.substring(tu,gg.length);
 if(P7TabProp[2]>1){document.P7_TBswapo[i]=new Image();document.P7_TBswapo[i].src=g.p7TBimo;}
 if(P7TabProp[2]>0){if(P7TabProp[2]==3){g.p7TBimd=g.p7TBimo;}document.P7_TBswapd[i]=new Image();
 document.P7_TBswapd[i].src=g.p7TBimd;}}if((g=MM_findObj('P7TabH'))!=null){gg=(document.layers)?g:g.style;
 gg.visibility="hidden";}if(dt&&P7TabProp[3]!='none'&&!window.opera){
 g=document.getElementsByTagName("A");for(i=0;i<g.length;i++){if(g[i].hasChildNodes()){el=g[i].firstChild;
 while (el){if(el.nodeType==3){gg=el.nodeValue;if(P7TabProp[3]==gg.replace("\n","")){
 g[i].className=P7TabProp[4];break;}}el=el.firstChild;}}}}document.P7TabBar=true;
}

function P7_trigMM2(bu){ //v2.0 by PVII
 if(!document.P7TabBar){return;}var i,g,d,dB=-1,tF=false,sF=false;
 for(i=0;i<P7TabSB.length;i++){sF=false;if((g=MM_findObj(P7TabSB[i]))!=null){g=MM_findObj(P7TabSB[i]);
 gg=(document.layers)?g:g.style;sF=true;}d=MM_findObj(P7TabIM[i]);if(P7TabIM[i]==P7TabProp[0]){
 dB=i;}if(P7TabIM[i]==bu){tF=true;if(sF){gg.visibility="visible";}if(P7TabProp[2]>0){
 if(i==dB){d.src=d.p7TBimd;}else if (P7TabProp[2]>1){d.src=d.p7TBimo;}}if((g=MM_findObj('P7TabH'))!=null){
 gg=(document.layers)?g:g.style;gg.visibility="visible";}}else{if(sF){gg.visibility="hidden";}
 if(P7TabProp[2]>0){d.src=d.p7TBim;}}}if(!tF){if(dB>-1){d=MM_findObj(P7TabIM[dB]);
 if((g=MM_findObj(P7TabSB[dB]))!=null&&P7TabProp[1]==0){gg=(document.layers)?g:g.style;
 gg.visibility="visible";}if(P7TabProp[2]>0){d.src=d.p7TBimd;}}
 if((g=MM_findObj('P7TabH'))!=null){gg=(document.layers)?g:g.style;gg.visibility="hidden";}}
}

