/* menumachine.js v1.6.0.02 - a component of MenuMachine (c)2003 Big Bang Software Pty Ltd :: menumachine.com*/
_ud="undefined";if(typeof(bbMenu)==_ud)bbMenu=new Array();bb_fix=new Array();
function _bbroot(bbL,name,r2L,clkOp,hRelPos,vRelPos,hRPmargin,vRPmargin,smScr,scrSp,scrAm,tri,triDn,triL,t_Hr,s_Hr,fade,posID,s_bCol,s_bW,s_bBtw,s_fFam,s_fSz,s_fWt,s_fStl,s_txAl,s_lPad,s_tPad,hOL,vOL,sArr,bCol,bw,bBtw,fFam,fSz,fWt,fStl,txAl,lPad,tPad,top_vOL,top_hOL,tArr,spc,nhlP,bUp)
{
if(typeof(page)==_ud)
{
_b=new __bbBrChk();
page=new _bbPg();
_bbUld=function(){return}
if(typeof(window.onload)!=_ud)_bbUld=window.onload;
window.onload=_bbLd;
if(!_b.ie4m){if(window.onunload)_bbDmUnLd=window.onunload;}window.onunload=_bbUnLd;
}
var r=this;
r.spc=spc;
var t=new Image();
t.src=r.spc;
r.built=0;
r.bbL=bbL;
r.name=name;
r.r=r;
r.r2L=r2L;
r.tri=tri;
r.triDn=triDn;
r.triL=triL;
r.posID=posID;
r.boxName=r.vBoxName="window.document.layers."+name;
r.div=_b.n4?eval(r.boxName):_bbGtLr(name);
r.dcss=_b.n4?r.div:r.div.style;
r.fixpos=0;
r.scrSp=scrSp;
r.scrAm=scrAm;
r.smScr=smScr;
r.z=r.dcss.zIndex?r.dcss.zIndex:1000;
r.menus=new Array();
r.menusEnum=new Array();
r.c=new Array();
r.par=null;
r.lvl=-1;
r.t_Hr=t_Hr;
r.s_Hr=s_Hr;
r.topGlobals=this.styleCollection(top_hOL,top_vOL,tArr,bBtw,bw,bCol,lPad,tPad,fSz,fWt,fStl,fFam,txAl);
r.subGlobals=this.styleCollection(hOL,vOL,sArr,s_bBtw,s_bW,s_bCol,s_lPad,s_tPad,s_fSz,s_fWt,s_fStl,s_fFam,s_txAl);
r.x=0;
r.y=0;
r.Xo=0;
r.Yo=0;
r.hRelPos=hRelPos;
r.vRelPos=vRelPos;
r.hRPmargin=hRelPos==3?-hRPmargin:hRPmargin;
r.vRPmargin=vRPmargin;
r.clkOp=clkOp;
r.fade=fade;
r.overMenu=null;
r.timeOut=null;
r.p=parseInt;
r.mw=0;
r.mh=0;
r.bUp=bUp;
if(_b.n4)r.mL=page.d.layers[r.name];
r.navResize=0;
r.nhlP=nhlP?0:1;
}
_bbroot.prototype.bM=function(name,par,text,width,height,url,imgUrl,overUrl,bgcolor,bgOverColor,fc,foc,target,overAction,outAction,clickAction,opaque)
{
this.menus[name]=this.menusEnum[this.menusEnum.length]=new __menu(this,name,par,text,width,height,url,imgUrl,overUrl,bgcolor,bgOverColor,fc,foc,target,overAction,outAction,clickAction,opaque);
}
function __bbIEpgSz()
{
b=document.body;
_bb_scW=b.clientWidth+b.scrollLeft-16;
_bb_scH=b.clientHeight+b.scrollTop-16;
}
_bbroot.prototype.show=function(d)
{
this.menus[d].display(1,1);
this.menus[d].hilite(1,1);
}
function __menu(r,name,par,text,width,height,url,imgUrl,overUrl,bgcolor,bgOverColor,fc,foc,target,overAction,outAction,clickAction,opaque)
{
var m = this;
m.r=r;m.id=name;
m.name=m.r.name+name;
m.par=par?r.menus[par]:r;
m.par.c[m.par.c.length]=m;
m.index=m.par.c.length-1;
m.lvl=par?m.par.lvl+1:0;
m.s=m.lvl==0?r.topGlobals:r.subGlobals;
m.width=width;
m.height=height;
m.contentWidth=_b.dt||_b.ie4m?(m.width-m.s.lPad):m.width;
m.contentHeight=(_b.dt||_b.ie4m?(m.height-m.s.tPad):m.height);
var tb=m.lvl==0&&m.s.bBtw==0&&m.r.t_Hr==1?1:0;
var sb=m.r.t_Hr&&m.lvl==0?0:m.s.bBtw==0&&m.par.c.length>1?1:0;
m.dw=m.width+m.s.bw*(tb?1:2);
m.dh=m.height+m.s.bw*(sb?1:2);
m.contLeft=tb&&!(m.index==0)?0:m.s.bw;
m.contTop=sb&&!(m.index==0)?0:m.s.bw;
if(m.lvl==0)
{
m.r.mw+=m.r.p((r.t_Hr||m.r.mw==0)?(m.width+m.s.bw+(m.index==0?m.s.bw:0)):0);
m.r.mh+=m.r.p((!r.t_Hr||m.r.mh==0)?(m.height+m.s.bw+(m.index==0?m.s.bw:0)):0);
}
m.bgcolor=bgcolor;
m.bgOverColor=bgOverColor;
m.fc=fc;
m.foc=foc;
m.text=text;
m.url=url;
m.imgUrl=imgUrl;
m.overUrl=overUrl;
m.target=target;
m.overAction=overAction;
m.outAction=outAction;
m.clickAction=clickAction;
m.opaque=opaque;
m.hi=0;
m.visible=m.lvl==0?1:0;
m.c=new Array();
m.dBxId=m.lvl==0?m.r.name:m.par.name+"x"+m.lvl;
m.flp=0;
if(_b.n4)
{
m.vBoxName=m.par.vBoxName+(m.lvl==0?"":".document.layers."+m.dBxId);
m.boxName=m.vBoxName+".document.layers."+m.name;
if(m.imgUrl)
{
m.imgName=m.boxName+".document.layers."+m.name+"n.document.images."+m.name+"i";
if(m.overUrl)
m.overImgName=m.boxName+".document.layers."+m.name+"o.document.images."+m.name+"oi";
}
}
var prevItem=m.index==0?null:m.par.c[m.index-1];
if(m.lvl>0)
{
if(r.t_Hr&&m.lvl==1)
{
m.Xo=m.par.x+m.par.s.hOL;
m.Yo=m.par.height+m.par.s.bw+m.par.s.vOL;
}
else
{
m.Xo=Math.round(m.r.r2L?-(m.dw-(m.s.hOL*m.par.width+m.s.bw)):(1-m.s.hOL)*m.par.width+m.s.bw);
m.Yo=Math.round(m.par.y+(m.s.vOL*m.par.dh));
}
}
if(r.t_Hr&&m.lvl==0)
{
m.x=prevItem?prevItem.x+prevItem.width+m.contLeft:0;
m.y=0;
}
else
{
m.x=0;
m.y=prevItem?prevItem.y+prevItem.height+m.contTop+(m.index==1&&!m.s.bBtw?m.s.bw:0):0;
}
}
_bbroot.prototype.styleCollection=function(hOL,vOL,arrow,bBtw,bw,bCol,lPad,tPad,fSz,fWt,fStl,fFam,txAl)
{
var s=new Object();
s.hOL=hOL;
s.vOL=vOL;
s.arrow=arrow;
s.bBtw=bBtw;
s.bw=bw;
s.bCol=bCol;
s.txAl=txAl;
s.pd=_b.macop5?Math.floor(lPad*1.2):lPad;
s.lPad=txAl=="left"?s.pd:txAl=="right"?s.pd:0;
s.padText=txAl=="left"?"padding-left:"+s.lPad+"px;":txAl=="right"?"padding-right:"+s.lPad+"px;":"";
s.tPad=_b.macop5?Math.floor(tPad*1.2):tPad;
s.fSz=_b.macop5?Math.floor(fSz*1.2):fSz;
s.fWt=fWt;
s.fStl=fStl;
s.fFam=fFam;
s.txAl=txAl;
return s;
}
__menu.prototype.hilite=function(on,r)
{
var m=this;
if(_b.n4)
m.o.ocss.visibility=on?_b.show:_b.hide;
else
{
if(m.overUrl)
m.img.src=on?m.overUrl:m.imgUrl;
if(m.opaque)
{
if(_b.op)
m.o.ncss.background=on?m.bgOverColor:m.bgcolor;
else
{m.o.ncss.backgroundColor=on?m.bgOverColor:m.bgcolor}
}
m.o.ncss.color=on?m.foc:m.fc;
}
m.hi=on;
if(m.r.nhlP&&on&&r&&m.lvl>0)
m.par.hilite(1,1);
}
__menu.prototype.getPos=function(d)
{
var p=parseInt(eval("this.par.c[0].o.dBxS."+d));
if(this.lvl>0)
p+=this.par.getPos(d);
return p;
}
function __bbRsz()
{
for(var g=0;g<bbMenu.length;g++)
{
bbMenu[g].off();
bbMenu[g].rpos();
}
}
function _bbRzevt()
{
if(window.innerWidth!=bb_ow||window.innerHeight!=bb_oh)
{
for(var i=0;i<bb_fix.length;i++)
clearTimeout(bb_fix[i]);
if(_b.op6||_b.ie)
{
bb_ow=window.innerWidth;
bb_oh=window.innerHeight;
if(_b.op6)_bbRePo();
__bbRsz();
for(var g=0;g<bbMenu.length;g++)
{
var rr=bbMenu[g];
if(!bb_fix[g]&&rr.vRelPos==4)
{
bb_fix[g]=setInterval("_bbFix()",rr.scrSp);
}
}
}
else
{location.reload()}
}
if(_b.op||_b.ie)
setTimeout('_bbRzevt()',500);
}
_bbroot.prototype.rpos=function()
{
this.ww=this.p((_b.dt&&_b.ie&&!_b.mac)?page.d.documentElement.clientWidth:_b.ie?page.d.body.clientWidth:window.innerWidth);
this.wh=this.p((_b.dt&&_b.ie&&!_b.mac)?page.d.documentElement.clientHeight:_b.ie?page.d.body.clientHeight:window.innerHeight);
this.ls=parseInt(_b.ie?page.d.body.scrollLeft:window.pageXOffset);
this.ts=parseInt(_b.ie?page.d.body.scrollTop:window.pageYOffset);
this.c[0].rpos();
}
__menu.prototype.rpos=function()
{
var e=this,t=e.par.c,m=t[0];
if(e==m)
{
if(!_b.op&&!_b.ns4&&m.lvl>0)
{
var lm=e.par.c[e.par.c.length-1];
e.h=m.r.p(lm.y+lm.dh-e.s.bw*2);
m.o.dBxS.left=m.Xo+_b.px;
m.o.dBxS.top=m.Yo+_b.px;
e.lp=e.getPos("left");
var sml=m.Xo;
if(m.r.r2L)
{
if(sml<m.r.ls)
sml=-((e.r.t_Hr&&e.par.lvl==0)?m.r.ls:sml+(e.dw+(1-2*m.s.hOL)*e.par.dw));
if(e.lp+e.dw>m.r.ww+m.r.ls)
sml=m.r.ww+m.r.ls-e.dw;
}
else
{
if(e.lp+e.dw>m.r.ww)
{
sml=Math.round(m.s.hOL*e.par.dw-(e.width+m.s.bw));
sml=m.Xo-(e.lp+e.dw-m.r.ww);
}
if(e.lp<m.r.ls)
{
sml=m.r.ls;
}
}
m.o.dBxS.left=sml+_b.px;
if(m.r.bUp)
{
if(m.lvl==1&&m.r.t_Hr)
{
var smt=-(e.h-m.Yo+(m.par.dh-m.par.s.vOL))-m.par.s.vOL;
}
else
{
var of=Math.round(m.s.vOL*m.par.dh);var smt=-(e.h-m.Yo-of)+of;
}
m.o.dBxS.top=smt+_b.px;
}
}
}
for(var i=0;i<t.length;i++)
{
if(t[i].c.length)
t[i].c[0].rpos();
}
}
__menu.prototype.display=function(on,rec)
{
var e=this,t=e.par.c,m=t[0];
if(_b.n4)
{
if(on)
{
var r=e.r;
r.mL.clip.width=page.w;
r.mL.clip.height=page.h;
r.mL.clip.top=0;
r.mL.clip.left=0;
}
m.o.dBxS.clip.height=on?page.h:0;
m.o.dBxS.clip.width=on?page.w:0;
}
m.o.dBxS.visibility=on?_b.show:_b.hide;
if(_b.nsDom&&!on)
{
for(var i=0;i<t.length;i++)
{
if(t[i].imgUrl)
{
t[i].o.ncss.visibility=_b.hide;
t[i].o.ncss.visibility="inherit";
}
}
}
m.visible=on;
if(on&&rec&&e.lvl>1)
e.par.par.c[0].display(1,1);
}
function _bbroll()
{
var m=this.m;
if(_b.op5&&!m.o)_bbRbMo();
var r=m.r;
if(r.built)
{
if(r.timeOut)page.wn.clearTimeout(r.timeOut);
if(r.overMenu&&(m.par!=r.overMenu||r.overMenu.lvl>m.lvl))r.overMenu.hideChildren(m.lvl);
r.overMenu=m;
m.hilite(1);
if(m.lvl>0&&m.r.nhlP)m.par.hilite(1);
if(m.c.length)m.c[0].display(1);
if(m.url)status=m.url;
var act=m.r.clkOp?m.clickAction:m.overAction;
if(act)CSAction(new Array(act));
}
}
function _bbhide()
{
var m=this.m;
var r=m.r;
if(r.built)
{
m.hilite(0);
if(m==r.overMenu)
{
if(r.timeOut)page.wn.clearTimeout(r.timeOut);
r.timeOut=page.wn.setTimeout("bbMenu["+r.bbL+"].mreset()",r.fade);
}
status='';
if(m.outAction)CSAction(new Array(m.outAction));
}
}
function _bbcroll()
{
var m=this.m,r=m.r;
if(r.built)
{
if(r.timeOut)page.wn.clearTimeout(r.timeOut);
if(r.overMenu&&(m.par!=r.overMenu||r.overMenu.lvl>m.lvl))r.overMenu.hideChildren(m.lvl);
r.overMenu=m;
m.hilite(1);
if(m.lvl>0)m.par.hilite(1);
if(m.overAction)CSAction(new Array(m.overAction));
}
}
function _bblink()
{
var m=this.m;
var r=m.r;
if(r.built)
{
if(m.clickAction)CSAction(new Array(m.clickAction));
if(m.url)
{
r.mreset();
if(m.url.indexOf("javascript:")==-1)
{
if(m.target)
{
if(eval("page.wn."+m.target))
eval("page.wn."+m.target+".location.href='"+m.url+"'");
else
{page.wn.open(m.url,m.target,"directories,location,favorites,menubar,resizable,personalbar,scrollbars,status,titlebar,toolbar")}
}
else
{page.wn.location.href=m.url}
}
else
{eval(m.url)}
}
}
}
__menu.prototype.itemreset=function()
{
var m=this;
if(m!=m.r.overMenu)m.hilite(0);
if(m.c.length)m.c[0].display(0);
for(var i=0;i<m.c.length;i++)
{
m.c[i].itemreset();
}
}
_bbroot.prototype.mreset=function()
{
var r=this;
for(var i=0;i<r.c.length;i++)
r.c[i].itemreset();
if(_b.n4)
{
r.mL.clip.width=r.mw;
r.mL.clip.height=r.mh;
r.mL.clip.top=r.mLt;
r.mL.clip.left=r.mLl;
}
}
__menu.prototype.hideChildren=function(l)
{
var m=this;
m.hilite(0);
if(m.c.length)m.c[0].display(0);
if(m.lvl>l)m.par.hideChildren(l);
}
function _bbDmUnLd(){return 1}
function _bbUnLd()
{
if((_b.sf||_b.ie)&&!_b.n4)
{
for(var f=0;f<bbMenu.length;f++)
{
var r=bbMenu[f];r.built=0;
if(r.timeOut)clearTimeout(r.timeOut);
for(var i=0;i<r.menusEnum.length;i++)
{
var m=r.menusEnum[i],mo=m.o;
mo.dBxS=mo.dBx=mo.css=mo.dcss=mo.div.img=mo.div=mo.evt=mo.ncss=mo.normal=mo.over=m.img=m.c=null;
mo=null;m=null;
}
r.t=null;
r.dcss=null;
r.div=null;
r.menus=null;
r.menusEnum=null;
r.c=null;
r=null;
}
bbMenu=null;
page=null;
_b=null;
bb_fix=null;
}
_bbDmUnLd();
}
_bbroot.prototype.buildLayers=function()
{
if(_b.n4)return;
this.dcss.visibility=_b.hide;
if(!_b.op&&!_b.sf)this.off();
var r=this,dT="",bc="background-color:",en=0,lvl=-1,currentBoxid=null,n=this.name,p="position:absolute;visibility:",bs="overflow:hidden;",nnt=p+(_b.op5?"visible":"inherit");
for(var i=0;i<r.menusEnum.length;i++)
{
var m=r.menusEnum[i],no="font-size:"+m.s.fSz+"px;"+(m.s.fWt?"font-weight:bold;":"")+(m.s.fStl?"font-style:italic;":"")+"font-family:"+m.s.fFam+";text-align:"+m.s.txAl,zindex=(m.lvl+2)*this.z;
if(m.lvl>lvl&&m.lvl>0)
{
en=1;
dT+="<div id='"+m.dBxId+"' style='left:"+(_b.op?m.Xo:"0")+"px;top:"+(_b.op?m.Yo:"0")+"px;z-index:"+zindex+";"+p+(_b.op5?"visible":"hidden")+"'>\n";
}
else if (m.lvl<lvl)for(var g=0;g<lvl-m.lvl;g++)dT+="<\/div>\n";
var ol=lvl;
lvl=m.lvl;
dT+="<div id='"+m.name+"' style='display:block;"+bs+nnt+";width:"+m.dw+"px;height:"+m.dh+"px;left:"+m.x+"px;top:"+m.y+"px;"+(m.opaque?bc+m.s.bCol:"")+"'>";
dT+="<div id='"+m.name+"n' style='"+nnt+";"+no+";"+(m.opaque?bc+m.bgcolor+";":"")+"color:"+m.fc+";"+"left:"+m.contLeft+"px;top:"+m.contTop+"px;"+(m.imgUrl?"width:"+(m.contentWidth+(_b.dom&&_b.dt?m.s.pd:0))+"px;height:"+(m.contentHeight+(_b.dom&&_b.dt?m.s.tPad:0))+"px;":"width:"+m.contentWidth+"px;height:"+m.contentHeight+"px;overflow:hidden;"+m.s.padText+"padding-top:"+m.s.tPad+"px")+"'>"+(m.imgUrl?"<img name='"+m.name+"i' id='"+m.name+"i' src='"+(m.lvl==0?m.imgUrl:m.r.spc)+"' width='"+m.width+"' height='"+m.height+"' alt='"+m.text+"' title='"+m.text+"'>":m.text)+"<\/div>";
if(m.s.arrow&&m.c.length)
{
var thr=m.lvl==0&&m.r.t_Hr?1:0,aOff=Math.round(m.s.hOL*m.width+m.s.bw),ars="top:"+(thr?m.dh-7:m.dh/2-5)+"px;left:"+(thr?(m.r.r2L?(aOff+12):(m.dw-12-aOff)):(m.r.r2L?(aOff+7):(m.dw-7-aOff)))+"px;width:"+(thr?9:5)+"px;height:"+(thr?5:9)+"px";
dT+="<div id='"+m.name+"a' style='"+nnt+";"+no+";"+ars+"'><img src='"+(thr?m.r.triDn:m.r.r2L?m.r.triL:m.r.tri)+"'><\/div>";
}
var es="display:block;"+(m.url?"cursor:pointer;cursor:hand;":"cursor:default;")+"width:"+m.dw+"px;height:"+m.dh+"px;left:0px;top:0px";
dT+="<div id='"+m.name+"e' style='"+es+";"+bs+nnt+"'>"+(_b.nsDom?"&nbsp;":"<img border='0' width='"+m.dw+"' height='"+m.dh+"' src='"+r.spc+"'"+(_b.op?" title=' ' alt=' '":"alt='"+m.text+"' title='"+m.text+"'")+">")+"<\/div>\n";
dT+="<\/div>\n";
}
if(m.lvl<lvl)for(var g=0;g<lvl-m.lvl;g++)dT+="<\/div>\n";
document.write(dT+"<\/div>\n"+(en?"<\/div>\n":""));
for(var i=0;i<r.menusEnum.length;i++)
{
var m=r.menusEnum[i];
m.o=new _bbMnOb(m);
m.o.pos();
}
if(_b.op||_b.sf)r.off();
if(!_b.sf||(r.hRelPos==0&&r.vRelPos==0&&r.posID==""))this.dcss.visibility=_b.show;
r.built=1;
}
_bbroot.prototype._bbnsBuild=function()
{
function w(l,t)
{
l.document.write(t);
l.document.close();
}
var r=this,lvl=-1,currentBoxid=null,n=this.name;
r.off();
var s="Menu loading";
for(var i=0;i<r.menusEnum.length;i++)
{
s+=".";
status=s;
var m=r.menusEnum[i];
var tx=m.text;
var zi=(m.lvl+2)*this.z;
m.o=new _bbMnOb(m,1);
var o=m.o;
if(m.lvl>lvl&&m.lvl>0)
{
o.dBx=m.o.dBxS=new Layer(200,m.par.o.dBx);
o.dBx.left=m.Xo;
o.dBx.top=m.Yo;
o.dBx.zIndex=zi;
o.dBx.visibility=_b.hide;
}
else
{
o.dBx=o.dBxS=m.lvl==0?this.div:m.par.c[0].o.dBx;
}
var p=m.par.c[0].o.dBx;
lvl=m.lvl;
o.div=o.css=new Layer(m.dw,p);
if(m.opaque)o.div.bgColor=m.s.bCol;
o.normal=o.ncss=new Layer(m.width,p);
o.over=o.ocss=new Layer(m.width,p);
if(m.opaque)
{
o.normal.bgColor=m.bgcolor;
o.over.bgColor=m.bgOverColor;
}
var fs="font-size:"+m.s.fSz+"px;"+(m.s.fWt?"font-weight:bold;":"")+(m.s.fStl?"font-style:italic;":"")+"font-family:"+m.s.fFam+";text-align:"+m.s.txAl+";overflow:hidden;"+m.s.padText+"padding-top:"+m.s.tPad+"px";
var txt=m.imgUrl?"<img name='"+m.name+"i' id='"+m.name+"i' src='"+m.imgUrl+"' width='"+m.width+"' height='"+m.height+"' alt='"+m.text+"' title='"+m.text+"'>":"<div style='"+fs+";color:"+m.fc+"'>"+m.text+"<\/div><\/div>";
var otxt=m.overUrl?"<img name='"+m.name+"oi' id='"+m.name+"oi' src='"+m.overUrl+"' width='"+m.width+"' height='"+m.height+"' alt='"+m.text+"' title='"+m.text+"'>":m.imgUrl?txt:"<div style='"+fs+";color:"+m.foc+"'>"+m.text+"<\/div><\/div>";
w(o.normal,txt);
w(o.over,otxt);
if(m.s.arrow&&m.c.length)
{
var thr=m.lvl==0&&m.r.t_Hr?1:0;
o.arr=new Layer(thr?9:5,p);
o.arr.visibility="inherit";
o.arr.zIndex=zi+4;
w(o.arr,"<img src='"+(thr?m.r.triDn:m.r.r2L?m.r.triL:m.r.tri)+"'>");
}
o.evt=new Layer(m.dw,p);
o.div.zIndex=zi+1;
o.normal.zIndex=zi+2;
o.over.zIndex=zi+3;
o.evt.zIndex=zi+5;
w(o.evt,"<img border='0' width='"+m.dw+"' height='"+m.dh+"' src='"+r.spc+"'>");
o.div.visibility=o.normal.visibility=o.evt.visibility="inherit";
o.over.visibility="hide";
o.evt.m=m;
o.evt.captureEvents(Event.MOUSEUP);
o.evt.onmouseup=m.r.clkOp?m.c.length?_bbroll:_bblink:_bblink;
o.evt.onmouseover=m.r.clkOp?_bbcroll:_bbroll;
o.evt.onmouseout=_bbhide;
if(!_b.n4&&m.imgUrl)
{
m.img=eval(m.imgName);
if(m.overUrl)
m.overImg=eval(m.overImgName);
}
o.pos();
status='';
}
r.built=1;
}
function _bbRePo()
{
var f="for(var i=0;i<bbMenu.length;i++){bbMenu[i].off(1)}_bbFix();";
if(_b.ie&&_b.mac)
setTimeout(f,50);
else if(_b.op)
{
for(var i=0;i<bbMenu.length;i++)
{
var r=bbMenu[i];
for(var f=0;f<r.menusEnum.length;f++)
{
m=r.menusEnum[f];
m.o.pos();
}
r.off();
}
_bbFix();
}
else
{eval(f)}
}
_bbroot.prototype.off=function(g)
{
var r=this;
r.dcss.width=r.mw+_b.px;
r.dcss.height=r.mh+_b.px;
if(r.posID!="")
{
var p;
if (_b.ie)
{
p=document.all[r.posID];
}
else if (_b.dom&&!_b.op)
{
var im = document.getElementsByTagName("img");
for(var i=0;i<im.length;i++)
{
if(im[i].getAttribute("name")==r.posID)
break;
}
p=im[i];
}
else
{p=page.d.images[r.posID]}
eval("r.dcss."+(_b.op?"pixelL":"l")+"eft=(_bb_X(p)+(_b.iem?r.p(page.d.body.leftMargin):0))+_b.px");
eval("r.dcss."+(_b.op?"pixelT":"t")+"op=(_bb_Y(p)+(_b.iem&&g?r.p(page.d.body.topMargin):0))+_b.px");
}
else
{
r.tp=_b.op?r.dcss.pixelTop:r.p(r.dcss.top);r.tp-=_b.ie?page.d.body.scrollTop:page.wn.pageYOffset;
var ww=(_b.dt&&_b.ie&&!_b.mac)?page.d.documentElement.clientWidth:_b.ie?page.d.body.clientWidth:window.innerWidth;
var wh=(_b.dt&&_b.ie&&!_b.mac)?page.d.documentElement.clientHeight:_b.ie?page.d.body.clientHeight:window.innerHeight;
var tp=lp=0;
if(r.hRelPos!=0)
{
if(r.hRelPos!=1)
{
var s=(r.p(ww))-r.p(r.mw);
lp+=r.hRelPos==3?s:_b.op5||_b.n4?Math.round(s/2):Math.floor(s/2);
}
lp+=r.hRPmargin;
}
if(r.vRelPos!=0&&r.vRelPos!=4)
{
if(r.vRelPos!=1)
{
var s=(r.p(wh))-r.p(r.mh);
tp+=r.vRelPos==3?s:_b.op5||_b.n4?Math.round(s/2):Math.floor(s/2);
}
tp+=r.vRPmargin;
}
if(!(_b.dt&&_b.ie&&!_b.mac))r.dcss.visibility=_b.hide;
if(lp<0)lp=0;if(tp<0)tp=0;
if(_b.n4)
{
r.dcss.moveTo((r.hRelPos!=0?lp:r.dcss.left),(r.vRelPos!=0?lp:r.dcss.top));
}
else if(_b.op)
{
if(r.hRelPos!=0)r.dcss.pixelLeft=lp;
if(r.vRelPos!=0&&r.vRelPos!=4)r.dcss.pixelTop=tp;
}
else
{
if(r.hRelPos!=0)r.dcss.left=lp+_b.px;
if(r.vRelPos!=0&&r.vRelPos!=4)r.dcss.top=tp+_b.px;
}
if(r.vRelPos==4)
{r.fixpos=-1;r.tp--}
if(!(_b.dt&&_b.ie&&!_b.mac))r.dcss.visibility=_b.show;
}
}
function _bb_X(e){return parseInt(typeof(e.x)!=_ud?e.x:_bb_P(e,"Left"))}
function _bb_Y(e){return parseInt(typeof(e.y)!=_ud?e.y:_bb_P(e,"Top"))}
function _bb_P(e,w)
{
var p = 0;
while (e!=null)
{
p+=e["offset"+w];
e=e.offsetParent;
}
return p;
}
function _bbMnOb(m,n)
{
var o=this;
if(!n)
{
if(m.index==0)
{
o.dBx=_bbGtLr(m.dBxId);
o.dBxS=o.dBx.style;
}
else
{
o.dBx=m.par.c[0].o.dBx;
o.dBxS=m.par.c[0].o.dBxS;
}
o.dBxS.zIndex=(m.lvl+2)*m.r.z;
o.div=_bbGtLr(m.name);
o.css=o.div.style;
o.normal=_bbGtLr(m.name+"n");
o.ncss=o.normal.style;
o.evt=_bbGtLr(m.name+"e");
if(_b.op||_b.ie)
{
o.evt.onmouseover=m.r.clkOp?_bbcroll:_bbroll;
o.evt.onmouseout=_bbhide;
o.evt.onclick=m.r.clkOp?m.c.length?_bbroll:_bblink:_bblink;
o.div.onselectstart=o.normal.onselectstart=o.evt.onselectstart=function(){return false}
}
else
{
o.evt.addEventListener("mouseover",m.r.clkOp?_bbcroll:_bbroll,1);
o.evt.addEventListener("mouseout",_bbhide,1);
o.evt.addEventListener("click",(m.r.clkOp?m.c.length?_bbroll:_bblink:_bblink),1);
}
o.evt.m=m;
if(m.imgUrl)
{
m.img=_b.dom?page.d.getElementById(m.name+"i"):document.all[m.name+"i"];
}
}
o.m=m;
}
function _bbGtLr(id)
{
if (_b.dom)
return document.getElementById(id);
else
{return document.all[id]}
}
_bbMnOb.prototype.pos=function()
{
var o=this;
var m=o.m;
if(_b.n4)
{
var x=m.contLeft+m.x,y=m.contTop+m.y;
o.css.resizeTo(m.dw,m.dh);
o.css.moveTo(m.x,m.y);
o.ncss.resizeTo(m.width,m.height);
o.ncss.moveTo(x,y);
o.ocss.resizeTo(m.width,m.height);
o.ocss.moveTo(x,y);
if(m.s.arrow&&m.c.length)
{
var thr=m.lvl==0&&m.r.t_Hr?1:0;
var at=thr?y+m.height-7:Math.round(y+m.height/2-5);
var al=thr?x+m.width-12:x+m.width-7;
var aw=thr?9:5,ah=thr?5:9;
o.arr.resizeTo(aw,ah);
o.arr.moveTo(al,at);
}
o.evt.resizeTo(m.dw,m.dh);
o.evt.moveTo(m.x,m.y);
if(m.lvl>0&&m.index==0)
{
o.dBxS.moveTo(m.Xo,m.Yo);
o.dBxS.clip.height=0;
o.dBxS.clip.width=0;
o.dBxS.zIndex=(m.lvl+2)*m.r.z;
}
}
else if(_b.op)
{
if(m.lvl>0&&m.index==0)
{
o.dBxS.visibility=_b.hide;
o.dBxS.pixelLeft=m.Xo;
o.dBxS.pixelTop=m.Yo;
o.dBxS.zIndex=(m.lvl+2)*m.r.z;
}
}
else
{
if(m.lvl>0&&m.index==0)
{
o.dBxS.visibility=_b.hide;
o.dBxS.left="0"+_b.px;
o.dBxS.top="0"+_b.px;
o.dBxS.zIndex=(m.lvl+2)*m.r.z;
}
}
if(_b.ie40m&&!m.img)
o.ncss.posLeft=o.ncss.posTop=m.s.bw+m.s.lPad;
}
function _bbFix()
{
if(_b.op)_bbRzevt();
for(var i=0;i<bbMenu.length;i++)
{
var r=bbMenu[i];
var moveAmt=0;
if(r.vRelPos==4)
{
var scrTop=_b.ie?page.d.body.scrollTop:page.wn.pageYOffset;
if(scrTop!=r.fixpos)
{
if(r.smScr)
{
var diff=r.fixpos-scrTop;
moveAmt=(Math.abs(diff)<r.scrAm)?-diff:((diff>0)?-r.scrAm:r.scrAm);
moveAmt=(Math.abs(diff)>(r.scrAm*4))?moveAmt+moveAmt:moveAmt;
var mtp=(r.tp+=moveAmt)+_b.px;
_b.op?r.dcss.pixelTop=mtp:r.dcss.top=mtp;
r.fixpos+=moveAmt;
}
else
{
var mtp=(r.tp+scrTop)+_b.px;
_b.op?r.dcss.pixelTop=mtp:r.dcss.top=mtp;
r.fixpos=scrTop;
}
}
}
}
}
function __bbBrChk()
{
var b=this,d=document;
var ua=navigator.userAgent.toLowerCase();
b.dom=d.getElementById?1:0;
b.ns=(ua.indexOf('mozilla')!=-1&&ua.indexOf('compatible')==-1)?1:0;
b.nsDom=b.dom&&b.ns?1:0;
function o(n){return (ua.indexOf("opera "+n)>-1||ua.indexOf("opera/"+n)>-1)&&window.opera?1:0}
b.op5=o(5);
b.op6=o(6);
b.op7=o(7);
b.op=(b.op5||b.op6||window.opera)&&!b.op7?1:0;
b.ie=(ua.indexOf('msie')!=-1&&!b.op)?1:0;
b.ieDom=b.dom&&b.ie?1:0;
b.n4=b.ns&&!b.dom&&d.layers?1:0;
b.ie4=b.ie&&!b.dom&&d.all?1:0;
b.mac=ua.indexOf("mac")>-1?1:0;
b.ie4m=b.ie4&&b.mac?1:0;
b.ie40m=b.ie4m&&ua.indexOf("msie 4.0")>-1?1:0;
b.macop5=b.mac&&b.op5?1:0;
b.iem=b.ie&&b.mac?1:0;
b.ie50m=b.ie&&b.mac&&ua.indexOf("5.0")>-1?1:0;
b.ma=b.iem&&ua.indexOf("aol")>-1?1:0;
b.sf=ua.indexOf("applewebkit")>-1?1:0;
b.dt=(b.nsDom||(b.op5||b.op6)||(d.doctype&&d.doctype.name&&d.doctype.name.indexOf("http:\/\/")>-1)||d.compatMode&&(d.compatMode!="BackCompat"&&d.compatMode!="QuirksMode"))?1:0;
b.px=b.n4||b.op?"":"px";
b.show=b.n4?'show':'visible';
b.hide=b.n4?'hide':'hidden';
b.left=b.op?"pixelLeft":"left";
b.top=b.op?"pixelTop":"top";
}
__bbMmB=0;
function _bbRbMo()
{
for(var g=0;g<bbMenu.length;g++)
{
var r=bbMenu[g];
for(var i=0;i<r.menusEnum.length;i++)
{
var m=r.menusEnum[i];
m.o=new _bbMnOb(m);
m.o.pos();
}
r.off();
}
}
function _bbLd()
{
if(_b.op&&__bbMmB)_bbRbMo();
for(var g=0;g<bbMenu.length;g++)
{
var rr=bbMenu[g];
if(_b.n4)rr._bbnsBuild();
var r=rr.menusEnum;
if(!_b.n4)
{
for(var i=0;i<r.length;i++)
{
var m=r[i];
if(m.imgUrl&&m.lvl>0)
{
m.img.src=m.imgUrl;
}
if(m.overUrl)
{
var temp=new Image();
temp.src=m.overUrl;
}
}
}
if(!bb_fix[g]&&rr.vRelPos==4)
{
bb_fix[g]=setInterval("_bbFix()",rr.scrSp);
}
if(_b.n4)
{
rr.mLw=rr.mL.clip.width;
rr.mLh=rr.mL.clip.height;
rr.mLt=rr.mL.clip.top;
rr.mLl=rr.mL.clip.left;
rr.mL.clip.width=rr.mw;
rr.mL.clip.height=rr.mh;
}
rr.rpos();
}
if(_b.n4||_b.op)
{
bb_ow=window.innerWidth;
bb_oh=window.innerHeight;
if(!_b.n4)_bbRzevt();
}
else if(_b.iem)
window.onresize=function(){setTimeout("__bbRsz()",50)}
else
{window.onresize=__bbRsz}
for(var g=0;g<bbMenu.length;g++)
{
var r=bbMenu[g];
if(_b.op||_b.sf)r.off();
if(_b.sf)r.dcss.visibility=_b.show;
}
__bbMmB=1;
_bbUld();
}
function _bbPg()
{
var t=this;
t.wn=window;
t.d=t.wn.document;
t.w=(_b.dt&&_b.ie)?t.d.documentElement.clientWidth:_b.ie||_b.nsDom?t.d.body.clientWidth:t.wn.innerWidth;
t.h=(_b.dt&&_b.ie)?t.d.documentElement.clientHeight:_b.ie||_b.nsDom?t.d.body.clientHeight:t.wn.innerHeight;
t.wn.onresize=_b.n4?_bbRzevt:_bbRePo;
}