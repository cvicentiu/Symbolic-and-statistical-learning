//UDMv3.8.4

//*** DO NOT EDIT THIS LINE *****
var menuReadyState=0;var exclude=1; var agt=navigator.userAgent.toLowerCase();var win=0;var mac=0;var lin=1;if(agt.indexOf('win')!=-1){win=1;lin=0;}if(agt.indexOf('mac')!=-1){mac=1;lin=0;}var lnx=0;if(lin){lnx=1;}var ice=0;var ie=0;var ie4=0;var ie5=0;var ie6=0;var com=0;var dcm;var op5=0;var op6=0;var op7=0;var ns4=0;var ns6=0;var ns7=0;var mz7=0;var kde=0;var saf=0;if(typeof navigator.vendor!="undefined"){if (navigator.vendor=="KDE"){var thisKDE=agt;var splitKDE=thisKDE.split("konqueror/");var aKDE=splitKDE[1].split("; ");var KDEn=parseFloat(aKDE[0]);if(KDEn>=2.2){kde=1;ns6=1;exclude=0;}}}if(typeof navigator.__ice_version!="undefined"){exclude=0;ice=1;ie=1;ie4=1;}else if(agt.indexOf('webtv')!=-1){exclude=1;}else if(typeof window.opera!="undefined"){exclude=0;if(agt.indexOf("opera/5")!=-1||agt.indexOf("opera 5")!=-1){op5=1;}if(agt.indexOf("opera/6")!=-1||agt.indexOf("opera 6")!=-1){op6=1;}if(agt.indexOf("opera/7")!=-1||agt.indexOf("opera 7")!=-1){op7=1;}}else if(typeof document.all!="undefined"&&!kde){exclude=0;ie=1;if(typeof document.getElementById!="undefined"){ie5=1;if(agt.indexOf("msie 6")!=-1){ie6=1;dcm=document.compatMode;if(dcm!="BackCompat"){com=1;}}}else{ie4=1;}}else if(typeof document.getElementById!="undefined"){exclude=0;if(agt.indexOf("netscape/6")!=-1||agt.indexOf("netscape6")!=-1){ns6=1;}else if(agt.indexOf("netscape/7")!=-1||agt.indexOf("netscape7")!=-1){ns6=1;ns7=1;}else if(agt.indexOf("gecko")!=-1){ns6=1;mz7=1;}if(agt.indexOf("safari")!=-1){mz7=0;saf=1;}}else if((agt.indexOf('mozilla')!=-1)&&(parseInt(navigator.appVersion)>=4)){exclude=0;ns4=1;if(typeof navigator.mimeTypes['*']=="undefined"){exclude=1;ns4=0;}}if(agt.indexOf('escape')!=-1){exclude=1;ns4=0;}if(agt.indexOf("safari")!=-1 || (typeof document.childNodes!="undefined" && typeof document.all=="undefined" && typeof navigator.taintEnabled=="undefined")){ns6=1;ns7=0;mz7=0;win=0;mac=1;saf=1;}if(agt.indexOf('icab')!=-1){exclude=1;ie=0;ie5=0;}var mu="mu";var m=0;var sm=0;var cm=0;var sp=0;var mI=new Array;var sP=new Array;var sI=new Array;var cP=new Array;var rcP=new Array;var cI=new Array;var relPad;var mainRel=0;var subRel=0;function MI(ma,mb,mc,md,me,mf,mg,mh,mi,mj,mk,ml,mm){addMainItem(ma,mb,mc,md,me,mf,mg,mh,mi,mj,mk,ml,mm);}function addMainItem(ma,mb,mc,md,me,mf,mg,mh,mi,mj,mk,ml,mm){sm=0;if(menuALIGN=="virtual"){ma="";mb="";mc=10;md="";me="";mf="";mg=0;mh=0;mi="";mj="";mk="";ml="";mm="";}else{if(!mb||mb==""){mb="&nbsp;";}while(mb.indexOf('<BR>')!=-1){mb=mb.replace('<BR>','<br>');}while(mb.indexOf('<Br>')!=-1){mb=mb.replace('<Br>','<br>');}while(mb.indexOf('<br />')!=-1){mb=mb.replace('<br />','<br>');}while(mb.indexOf('<br/>')!=-1){mb=mb.replace('<br/>','<br>');}if(!mc||mc==""){mc="left";}if(!md||md==""){md="left";}if(!me||me==""){me="_self";}if((win&&ie5)&&(typeof fSIZE=="string")&&menuALIGN!="free"){while(mb.indexOf('<br>')!=-1){mb=mb.replace('<br>',' ');}mainRel=1;if(m==0){relPad='<span style="width:'+(tINDENT*2)+'px">';if(com){relPad+='<img width='+(tINDENT*2)+' height=1 alt="" border=0>';}relPad+='</span>';}if(md=="left"){mb=mb+relPad;}if(md=="right"){mb=relPad+mb;}if(md=="center"){mb=relPad+mb+relPad;}}if(!mf||mf==""){mf="none";if(ie5){mf="";}}if(!mg){mg=0;}if(!mh){mh=0;}if(!mi||mi==""||mi=="c"||mi=="C"){mi="-";}if(mi!="-"){mi=mi.toLowerCase();}if(!mj){mj="";}if(!mk){mk="";}if(!ml){ml="";}if(!mm){mm="";}}mI[m]=new Array(ma,mb,mc,md,me,mf,mg,mh,mi,mj,mk,ml,mm);m++;};function SP(spa,spb,spc,spd,spe,spf,spg,sph,spi,spj,spk,spl,spm){defineSubmenuProperties(spa,spb,spc,spd,spe,spf,spg,sph,spi,spj,spk,spl,spm);}function defineSubmenuProperties(spa,spb,spc,spd,spe,spf,spg,sph,spi,spj,spk,spl,spm){if(!ie5){spa+=(sbSIZE*2);}if(!spb||spb==""){spb="left";}if(!spc||spc==""){spc="left";}if(!spd){spd=0;}if(!spe){spe=0;}if(!spf){spf="";}if(!spg){spg="";}if(!sph){sph="";}if(!spi){spi="";}if(!spj){spj="";}if(!spk){spk="";}if(!spl){spl="";}if(!spm){spm="";}sP[(m-1)]=new Array(spa,spb,spc,spd,spe,spf,spg,sph,spi,spj,spk,spl,spm);if(sm==0){sI[(m-1)]=new Array; cP[(m-1)]=new Array; rcP[(m-1)]=new Array; cI[(m-1)]=new Array;}};function SI(sma,smb,smc,smd){addSubmenuItem(sma,smb,smc,smd);}function addSubmenuItem(sma,smb,smc,smd){cm=0;var sme=1;if(sme&&sma=="~"){sme=0;if(!ie&&!ns6&&!mz7&&!op5&&!op7){sma="";}smc="";}if(!sma||sma==""){sma="#";}if(!smb||smb==""){smb="&nbsp;";}while(smb.indexOf('<BR>')!=-1){smb=smb.replace('<BR>','<br>');}while(smb.indexOf('<Br>')!=-1){smb=smb.replace('<Br>','<br>');}while(smb.indexOf('<br />')!=-1){smb=smb.replace('<br />','<br>');}while(smb.indexOf('<br/>')!=-1){smb=smb.replace('<br/>','<br>');}if(((win&&ie5)||mz7||ns6)&&(typeof sfSIZE=="string")&&menuALIGN!="free"){if(m==1&&sm==0){subRel=1;relPad='<span style="width:'+(stINDENT*3)+'px">';if(com||mz7||ns6){relPad+='<img width='+(stINDENT*3)+' height=1 alt="" border=0>';}relPad+='</span>';}if(sP[(m-1)][2]=="left"){smb=smb+relPad;}if(sP[(m-1)][2]=="right"){smb=relPad+smb;}if(sP[(m-1)][2]=="center"){smb=relPad+smb+relPad;}}if(!smc||smc==""){smc="_self";}if(sma=="#"||sma=="~"){smc="_self";}if(!smd||smd==""){smd="none";if(ie5){smd="";}}sI[(m-1)][sm]=new Array(sma,smb,smc,smd,sme);sm++;};function CP(cpa,cpb,cpc,cpd,cpe,cpf,cpg,cph,cpi,cpj,cpk,cpl,cpm){defineChildmenuProperties(cpa,cpb,cpc,cpd,cpe,cpf,cpg,cph,cpi,cpj,cpk,cpl,cpm);}function defineChildmenuProperties(cpa,cpb,cpc,cpd,cpe,cpf,cpg,cph,cpi,cpj,cpk,cpl,cpm){if(!ie5){cpa+=(sbSIZE*2);}if(!cpb||cpb==""){cpb="left";}if(!cpc||cpc==""){cpc="left";}if(!cpd){cpd=0;}if(!cpe){cpe=0;}if(!cpf){cpf="";}if(!cpg){cpg="";}if(!cph){cph="";}if(!cpi){cpi="";}if(!cpj){cpj="";}if(!cpk){cpk="";}if(!cpl){cpl="";}if(!cpm){cpm="";}cP[(m-1)][(sm-1)]=new Array(cpa,cpb,cpc,cpd,cpe,cpf,cpg,cph,cpi,cpj,cpk,cpl,cpm);rcP[(m-1)][(sm-1)]=new Array(cpa,cpb,cpc,cpd,cpe,cpf,cpg,cph,cpi,cpj,cpk,cpl);cI[(m-1)][(sm-1)]=new Array;};function CI(cma,cmb,cmc,cmd){addChildmenuItem(cma,cmb,cmc,cmd);}function addChildmenuItem(cma,cmb,cmc,cmd){var cme=1;if(cma&&cma=="~"){cme=0;if(!ie&&!ns6&&!mz7&&!op5&&!op7){cma="";}cmc="";}if(!cma||cma==""){cma="#";}if(!cmb||cmb==""){cmb="&nbsp;";}while(cmb.indexOf('<BR>')!=-1){cmb=cmb.replace('<BR>','<br>');}while(cmb.indexOf('<Br>')!=-1){cmb=cmb.replace('<Br>','<br>');}while(cmb.indexOf('<br />')!=-1){cmb=cmb.replace('<br />','<br>');}while(cmb.indexOf('<br/>')!=-1){cmb=cmb.replace('<br/>','<br>');}if(((win&&ie5)||mz7||ns6)&&(typeof sfSIZE=="string")&&menuALIGN!="free"){if(cP[(m-1)][(sm-1)][2]=="left"){cmb=cmb+relPad;}if(cP[(m-1)][(sm-1)][2]=="right"){cmb=relPad+cmb;}if(cP[(m-1)][(sm-1)][2]=="center"){cmb=relPad+cmb+relPad;}}if(!cmc||cmc==""){cmc="_self";}if(cma=="#"||cma=="~"){cmc="_self";}if(!cmd||cmd==""){cmd="none";if(ie5){cmd="";}}cI[(m-1)][(sm-1)][cm]=new Array(cma,cmb,cmc,cmd,cme);cm++;}var keepSubLIT=1;var chvOFFSET=0;var chhOFFSET=-5;var openTIMER=0;var openChildTIMER=0;var closeTIMER=330;var cellCLICK=1;var aCURSOR="hand";var remoteTRIGGERING=0;var altDISPLAY="";var allowRESIZE=1;var redGRID=0;var gridWIDTH=0;var gridHEIGHT=0;var documentWIDTH=0;var hideSELECT=0;var allowForSCALING=0;var allowPRINTING=0;var arrWIDTH=0;var arrHEIGHT=0;var arrHOFFSET=0;var arrVOFFSET=0;var arrVALIGN="";var arrLEFT="";var arrLEFT_ROLL="";var arrRIGHT="";var arrRIGHT_ROLL="";function activateMenu(){};function deactivateMenus(){};
//*******************************
/////////////////////////////////
// custom window opening function
var nUrl,nW,nH;
var nWin=new Array;
var nw=0;
function openWindow(nUrl,nW,nH){
nWin[nw] = open(nUrl, "","width="+nW+",height="+nH+",status=yes,scrollbars=no,scrolling=no,toolbar=no,menubar=no,location=no,resizable=yes");
nw++;
}
/////////////////////////////////