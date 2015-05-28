var msets=false;var msetm=true;mindex=0;thispage=0;thisparent=0;var popm=false;
var dii=document.images;
function mset(){
if(typeof(funcOnPageLoad)!='undefined')
 { funcOnPageLoad();}
if(dii['i'+thispage]!=null){dii['i'+thispage].src=bd+'sel_'+thispage+'.gif?r='+Math.floor(Math.random()*100000);}
if(thisparent!=0 && dii['i'+thisparent]!=null){dii['i'+thisparent].src=bd+'sel_'+thisparent+'.gif';}
if(mindex==0)return;
var b=irootsite+"/menu/over_";
if(msetm && msetm==true){
 for(x=0;x<mindex;x++)
 {i=mi[x];mi[x]=new Image();mi[x].src=b+i+".gif";}}
if(msets && msets==true){
 for(x=0;x<msindex;x++)
 {i=ms[x];ms[x]=new Image();ms[x].src=b+i+".gif";}}
}
function ovp(i,p){
pom=true;}
function ot(i){
if(popm){otpop(i);return;}
if(dii['i'+i]==null){return;}
if(i!=thispage)
  dii['i'+i].src=bd+i+'.gif';
else
  dii['i'+i].src=bd+'sel_'+i+'.gif';}
function ov(i,p){
if(popm){ovpop(i,p);return;}
dii['i'+i].src=bd+'over_'+i+'.gif';}
function iflashi(s,w,hi,al){
var d=document;
pn='<PARAM NAME=';
sz='WIDTH="'+w+'" HEIGHT="'+hi+'"';
d.writeln('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,0,0" '+sz+' id="tf" name="tf" ALIGN="">');
d.writeln(pn+'movie VALUE="'+s+'">');
if(al==true){d.writeln(pn+'ALIGN VALUE=L>');d.writeln(pn+'SALIGN VALUE=TL>');}
d.writeln(pn+'Loop VALUE=true>');
d.writeln(pn+'quality VALUE=best>');
d.writeln(pn+'"wmode" value="transparent">');
d.writeln(pn+'scale VALUE=noscale>');
d.writeln(pn+'play VALUE=true>');
d.writeln('<EMBED src="'+s+'" quality=best '+sz+' wmode="transparent"  align="left" salign=TL  scale="noscale" scalemode="noscale" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></EMBED>');
d.writeln('</OBJECT>');}
function iembedi(t)
{document.write(t);}

