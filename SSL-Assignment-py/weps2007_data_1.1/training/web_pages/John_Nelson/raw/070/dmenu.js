//***********************************************
//  Javascript Menu (c) 2006, by Deluxe-Menu.com
//  version 2.0
//  E-mail:  cs@deluxe-menu.com
//***********************************************

var dmWorkPath = "/js/";
/*
Array.prototype.ln=function()
{
	return this.length
};
*/
with(String)
{
	prototype.sb=function(s,e)
	{
		return this.substring(s,e)
	};
	prototype.io=function(s)
	{
			return this.indexOf(s)
	};
/*	prototype.ln=function()
	{
		return this.length
	};
*/
};
var _e=0,_ee=0,_es=0,_ep=0,_em=0,_n=0,_n4=0,_sn=0,_o=0,_z=0,_d=0,_m=0,_ec=0,_s=0,_v=0,d_o=document,_un='undefined',_dvO=1000;_dmgb();var das=[];if(typeof(dmWorkPath)==_un)var dmWorkPath='';
//don't load extra files. Nick 11/25/2006
//function _dms(dfn){for(var i=0;i<das.length;i++)if(das[i]==dfn)return;das[das.length]=dfn;d_o.write('<SCR'+'IPT SRC="'+dmWorkPath+dfn+'.js" type="text/javascript"></SCR'+'IPT>');};if(_n4)_dms('dmenu4');d_o.write('<style>#dmlinks{display:none}</style>');var du='px',dde,dfd,yul=null,daf=0,dam=0,_dm=[],dl=0,_dvrm=/dm([0-9]+)m([0-9]+)/,_dvri=/dm([0-9]+)m([0-9]+)i([0-9]+)/,dcm={ii:0,ci:0,iy:0,ce:null,iv:null},dmr={dvi:0,psi:'',cX:0,cY:0,co:0,ce:null},yg={qps:0,cso:0},_dvK={ie:0,dm:null,rsv:null,uv:null,ce:null,iv:null},de=0,dfi='',dni=0,dsf=1,dro=0,dt=1,ofs;
function _dms(dfn){};if(_n4)_dms('dmenu4');d_o.write('<style>#dmlinks{display:none}</style>');var du='px',dde,dfd,yul=null,daf=0,dam=0,_dm=[],dl=0,_dvrm=/dm([0-9]+)m([0-9]+)/,_dvri=/dm([0-9]+)m([0-9]+)i([0-9]+)/,dcm={ii:0,ci:0,iy:0,ce:null,iv:null},dmr={dvi:0,psi:'',cX:0,cY:0,co:0,ce:null},yg={qps:0,cso:0},_dvK={ie:0,dm:null,rsv:null,uv:null,ce:null,iv:null},de=0,dfi='',dni=0,dsf=1,dro=0,dt=1,ofs;
function _dmgb(){var nv=navigator,a=nv.userAgent,n=nv.appName,v=nv.appVersion,ns='Netscape',gk='Gecko',pf=function(r){return parseFloat(r)};_m=v.io("Mac")>=0;_d=d_o.getElementById?1:0;if((parseInt(nv.productSub)>=20020000)&&(nv.vendor.io('Apple Computer')!=-1)&&(nv.product==gk)){_n=1;_v=6;_s=1;return;};if(n.toLowerCase()=='konqueror'){_z=1;_v=1.6;return;};if(a.io('Opera')>=0){_o=1;_v=pf(a.sb(a.io('Opera')+6,a.length));_ec=(_v>=7);return;};if(n.toLowerCase()=='netscape'){if(a.io('rv:')!=-1&&a.io(gk)!=-1&&a.io(ns)==-1){_z=1;_v=pf(a.sb(a.io('rv:')+3,a.length));}else{_n=1;if(a.io(gk)!=-1&&a.io(ns)>a.io(gk)){if(a.io(ns+'6')>-1)_v=pf(a.sb(a.io(ns)+10,a.length));else if(a.io(ns)>-1)_v=pf(a.sb(a.io(ns)+9,a.length));}else _v=pf(v);};if(_n){_n4=_v<6;_sn=!_n4&&_v<7;};return;};if(d_o.all?1:0){_e=1;_v=pf(a.sb(a.io('MSIE ')+5,a.length));_ee=(_v>=5);_es=(_v>=6);_ec=1;_ep=(_m?0:1);_em=_m;};};_dmzi();
function _dmge(id){return d_o.getElementById(id)};
function _dmzi(){separatorPadding="0px";dmCacheImages=0;qu=location.protocol=='https:'?1:0;dm_writeAll=0;popupMode=0;};
function _dml(){if(_o)dm_writeAll=(_v>=7)?0:1;with(dcm){ci=0;iy=0;ce=null;iv=null;};if(popupMode)absolutePos=1;if(floatable&&!(_o&&_v<6))daf=1;if(movable)dam=1;if(typeof(itemPadding)!='string')itemPadding+='px';};
function _dmhw(o){var op=(_o&&_v<6),w=op?o.style.pixelWidth:_n4?o.clip.width:o.offsetWidth,h=op?o.style.pixelHeight:_n4?o.clip.height:o.offsetHeight;return[w,h];};
function _dmos(o){if(!o)return[0,0,0,0];var l=0,t=0,wh=_dmhw(o),d=0,a='absolute',r='relative';while(o){l+=parseInt(_n4?o.pageX:o.offsetLeft);t+=parseInt(_n4?o.pageY:o.offsetTop);o=o.offsetParent;if(!_o&&o&&o.style&&(o.style.position==a||o.style.position==r)&&o.id.sb(0,2)!='dm'){if(_ep&&o.style.position==r&&dde.leftMargin)l-=parseInt(dde.leftMargin);d=1;break;};};return[l,t,wh[0],wh[1],d];};
function _dmoi(id){if(!id)return null;if(_n4)return _dmio(id);if(_e&&_v<5)return d_o.all[id];var iv=_dmvi(id),dm=_dm[iv.mi];return((iv.ci!=0&&dm.dcf&&dt!=3)?_dmof(id,dm.dis):_dmge(id));};
function _dmvi(id){var ex;if(id.indexOf('i')>0){ex=_dvri.exec(id);return _dm[parseInt(ex[1])].m[parseInt(ex[2])].i[parseInt(ex[3])];}else{ex=_dvrm.exec(id);return _dm[parseInt(ex[1])].m[parseInt(ex[2])];};};
function _dmcs(dm){var l=0,t=0,w=0,h=0,cf=(dm&&dm.dcf&&dt==1);if(_n||_z||_o){var doc=cf?parent.frames[dm.dis].window:window;l=doc.pageXOffset;t=doc.pageYOffset;w=doc.innerWidth;h=doc.innerHeight;}else{var doc=cf?_dmde(parent.frames[dm.dis].document):dde;with(doc){l=scrollLeft;t=scrollTop;w=clientWidth;h=clientHeight;};};return[l,t,w,h];};
function _dmkk(){if(window.attachEvent)window.attachEvent('onload',_dmlx);else{yul=(typeof(onload)=='function')?onload:null;onload=_dmlx;};};
function _dmde(docObj){return(docObj.compatMode=='CSS1Compat'&&!_z)?docObj.documentElement:docObj.body;};
function _dmlx(){dde=_dmde(d_o);if(daf)window.setInterval('_dmyr()',20);if(dam)_dmm();dl=1;if(yul)yul();if(keystrokes&&!_n4&&!(_o&&_v<7))d_o.onkeydown=function(event){return dm_ext_keystrokes(event)};if(typeof(dm_debug)==_un)onerror=_dmrr;};
function _dmrr(dem,yu,nl){return true};
function dm_initFrame(dif,dta,si,ro)
{
	if(_n4)return _dmn();if((_o&&_v<7)||(_e&&_v<5))de=0;else{de=1;dfi=dif;dni=dta;dsf=si;dro=ro;};dt=1;dm_init();
};
var dfp=['javascript:','mailto:',"http://","https://","ftp://"];
function _dmc(yu){for(var i=0;i<dfp.length;i++)if(yu.io(dfp[i])==0)return false;return true;};
function _dmkl(pt,prf){
	function _dmp(ph){return ph?((_dmc(ph)?prf:'')+ph):'';};if(typeof(pt)=='string')return _dmp(pt);else{var p=[];for(var i=0;i<pt.length;i++)p[i]=pt[i]?_dmp(pt[i]):'';return p;};};
	function _dmpr(pm,ddp){return(typeof(pm)!=_un&&pm)?pm:ddp;};
	function _dmsi(pn,sii,yt,ddv,isIndividual){if(sii==-1||''+sii+''==''||!isIndividual)return ddv;var sp=yt?itemStyles[sii]:menuStyles[sii];for(var i=0;i<=sp.length;i++)if(i==sp.length||typeof(sp[i])==_un)return ddv;else if(sp[i].io(pn)>=0)break;var val=sp[i].split('=')[1];if(val.io(',')>=0)val=val.split(',');return val;};
	function _dmsa(dm,sii,is){if(typeof(sii)==_un)return dm.sct;var pPrefix=!dm?pathPrefix_img:dm.ppi,bI=is?_dmsi('menuBackImage',sii,0,'',is):0,st={qb:_dmsi('menuBackColor',sii,0,menuBackColor,is),dbr:_dmsi('menuBackRepeat',sii,0,menuBackRepeat,is),dbi:bI?_dmkl(bI,pPrefix):_dmkl(menuBackImage,pPrefix),qy:parseInt(_dmsi('smColumns',sii,0,smColumns,is)),bw:_dmsi('menuBorderWidth',sii,0,menuBorderWidth,is),bs:_dmsi('menuBorderStyle',sii,0,menuBorderStyle,is),bc:_dmsi('menuBorderColor',sii,0,menuBorderColor,is),iti:_dmsi('itemSpacing',sii,0,itemSpacing,is),ipd:_dmsi('itemPadding',sii,0,itemPadding,is),cssClass:_dmsi('CSS',sii,0,cssSubmenu,is),smW:_dmsi('smWidth',sii,0,smWidth,is),qhi:_dmsi('smHeight',sii,0,smHeight,is)};return st;};
	function _dmls(dm,sii,is){if(typeof(sii)==_un)return dm.cst;var pPrefix=!dm?pathPrefix_img:dm.ppi,aM=is?_dmsi('arrowImageMain',sii,1,'',is):0,aS=is?_dmsi('arrowImageSub',sii,1,'',is):0,bI=is?_dmsi('itemBackImage',sii,1,'',is):0,st={iw:_dmsi('itemWidth',sii,1,'100%',is),qb:_dmsi('itemBackColor',sii,1,itemBackColor,is),bw:_dmsi('itemBorderWidth',sii,1,itemBorderWidth,is),bs:_dmsi('itemBorderStyle',sii,1,itemBorderStyle,is),bc:_dmsi('itemBorderColor',sii,1,itemBorderColor,is),fc:_dmsi('fontColor',sii,1,fontColor,is),fs:_dmsi('fontStyle',sii,1,fontStyle,is),fd:_dmsi('fontDecoration',sii,1,fontDecoration,is),drm:aM?_dmkl(aM,pPrefix):_dmkl(arrowImageMain,pPrefix),drs:aS?_dmkl(aS,pPrefix):_dmkl(arrowImageSub,pPrefix),dbi:bI?_dmkl(bI,pPrefix):_dmkl(itemBackImage,pPrefix),cssClass:_dmsi('CSS',sii,1,cssItem,is),cssClassText:_dmsi('CSSText',sii,1,cssItemText,is)};return st;};
	function _dmmi(dic){_dm[dic]={m:[],ii:dic,id:'dm'+dic,_dmnl:null,qp:absolutePos,floating:floatable,floatingX:floatableX,floatingY:floatableY,qit:floatIterations,qtm:pressedItem,dcs:0,dcp:(pressedItem>=0)?pressedItem:-1,dcf:de,dim:dni,dis:dsf,dor:dro,dsi:dfi,sct:_dmsa(null,0,0),cst:_dmls(null,0,0),qic:cssStyle,dpp:popupMode,saveNavigation:saveNavigationPath,sis:smViewType,ssc:showByClick,sl:0,qiv:(popupMode)?0:1,dss:0,qfd:fontColorDisabled,qm:subMenuAlign,shm:smHideOnClick,dc:dmCacheImages,sepImg:separatorImage,sw:separatorWidth,sepH:separatorHeight,svi:separatorVImage,svv:separatorVWidth,svh:separatorVHeight,zs:separatorPadding,ppi:pathPrefix_img};return _dm[dic];};
	function _dmsp(pr,ps,parentIt,cii){var lv=ps?ps.le+1:0,dm=pr;dcm.ii=pr.ii;dcm.ci=dm.m.length;var lil=dcm.ci;dm.m[lil]={i:[],mi:dcm.ii,ii:lil,id:'dm'+dcm.ii+'m'+lil,rid:parentIt?parentIt.id:'',sh:'',_dmlw:null,le:lv,left:lil?'-1000px':posX,top:lil?'0px':posY,_dvM:lil?smMovable:movable,dv:0,qoz:(lv>1)?DX:topDX,qox:(lv>1)?DY:topDY,ct:_dmsa(dm,cii,1),dhz:lil?smOrientation:isHorizontal,dmw:lil?'auto':_dmpr(menuWidth,((_n&&_v<7)?'auto':'1px')),mainHeight:menuHeight,opacity:!lil?100:transparency,dfe:!lil?0:(transition?transition:1),qd:transition?transDuration:0,qi:transition?transDuration2:0,shadowColor:shadowColor,shadowLen:(_ep&&_ee)?shadowLen:0,hs:'',sX:0,sY:0,se:0,_dmoo:null,dho:[]};dcm.ce=dm.m[lil];};
	function _dmst(str,tt,il,ip){return(!str||str=='link')?il:(str=='text')?tt:(str=='tip')?ip:str;};
	function _dmsl(yv){return(!yv&&itemTarget)?itemTarget:yv;};
	function _dmll(vl){return _dmkl(_dmpr(vl,''),pathPrefix_link);};
	function _dmip(pr,ps,iy,dps,srs){var ce=pr.m[ps.ii],ix=dps[0],dil=_dmll(dps[1]),ir=_dmsl(_dmpr(dps[5],'')),dia=(ps.le==0)?itemAlignTop:itemAlign,iit=_dmpr(dps[4],''),ia=_dmpr(dps[8],''),onr=0;if(ix.charAt(0)=='$'){onr=1;ix=ix.substr(1,ix.length-1);};ce.i[iy]={mi:pr.ii,ci:ps.ii,ii:iy,id:'dm'+pr.ii+'m'+ps.ii+'i'+iy,dcd:ia?'_':'',text:ix,link:dil,target:ir,tip:iit,sv:_dmst(srs,ix,dil,iit),da:dia,cla:'middle',qq:itemCursor,itt:_dmls(pr,dps[6],1),dii:_dmkl([_dmpr(dps[2],''),_dmpr(dps[3],'')],pr.ppi),qii:(ps.le)?iconWidth:iconTopWidth,qiz:(ps.le)?iconHeight:iconTopHeight,icState:0,qw:arrowWidth,qh:arrowHeight,dss:(ir=='_')?1:0,dpr:0,dhi:0,qiv:1,ded:0,nr:onr,daj:ia};dcm.iy=iy;dcm.iv=ce.i[iy];dcm.ce=ps;};var _dvF=['Blinds','Checkerboard','GradientWipe','Inset','Iris','Pixelate','RadialWipe','RandomBars','RandomDissolve','Slide','Spiral','Stretch','Strips','Wheel','Zigzag'];
	function _dmga(fdi,ddf){return(_v<5.5)?'':'progid:DXImageTransform.Microsoft.'+_dvF[fdi-25]+'('+transOptions+',duration='+ddf+') ';};
	function _dmfl(ce){var sf='';with(ce)if(_ee&&_ep){sf='filter:';if(dfe){var dur=qd/1000;if(dfe==24)sf+="blendTrans(Duration="+dur+") ";else sf+=(dfe<24)?"revealTrans(Transition="+dfe+",Duration="+dur+") ":_dmga(dfe,dur);};if(opacity!=100)sf+="alpha(opacity="+opacity+") ";if(shadowLen)sf+="shadow(color="+shadowColor+",direction=135,strength="+shadowLen+")";}else if(_n||_z){var o=opacity/100;if(opacity!=100)sf='-moz-opacity:'+o;};return sf;};
	function _dmdz(id,yx,dve){return'<DIV id="'+id+'" '+dve+' style="'+yx+'">';};
	function _dmd(){return'</DIV>';};
	function _dmze(id,clN,ca,pd,dve){return'<Table id="'+id+'" '+dve+' class="'+clN+'" border=0 cellspacing='+ca+' cellpadding='+pd+'>';};
	function _dmzw(id,ca,pd,yx,dve,add){return'<Table id="'+id+'" '+dve+' cellspacing='+ca+' cellpadding='+pd+' '+add+' style="'+yx+'" border=0>';};
	function _dmt(){return'</Table>';};
	function _dmor(id){return'<tr id="'+id+'">';};
	function _dmtr(){return'</tr>';};
	function _dmzr(id,yx,add){return'<td id="'+id+'" '+add+' style="cursor:pointer;'+yx+'">';};
	function _dmlt(){return'</td>';};
	function _dmiz(id,yu,w,h,add){return'<img id="'+id+'" src="'+blankImage+'" '+(w?'width='+w:'')+(h?' height='+h:'')+' '+add+' border=0>';};
	function _dmiw(cm){with(dmr)if(cm){psi=cm;ce=_dmvi(cm);clearTimeout(_dm[ce.mi]._dmnl);}else{if(ce)with(_dm[ce.mi]){clearTimeout(_dmnl);_dmnl=setTimeout("_dmmh('"+m[0].sh+"');window.status='';",smHidePause);};psi='';};};
	function _dmzq(dm,ig,w,h){return _dmiz('',_dmkl(ig,dm.ppi),(w?w:"100%"),(h?h:"1"),'');};
	function _dmir(iv){var s='',ce=_dm[iv.mi].m[iv.ci];with(iv){var dri=ci?itt.drs[0]:itt.drm[0];if(dri)s=_dmzr(iv.id+'tdA','padding:'+ce.ct.ipd,'')+_dmiz(id+'arr',dri,qw,qh,'')+_dmlt();};return s;};
	function _dmye(e,cm){var ce=_dmvi(cm);if(!ce.se||ce.sh)return;var ch=_dmos(ce._dmoo),ex,ey;if(_ec){var cs=_dmcs(_dm[ce.mi]);ex=e.x+cs[0];ey=e.y+cs[1];}else{ex=e.pageX;ey=e.pageY;};var dx=ch[2]*0.1,dy=ch[3]*0.1,px=(ex-ch[0]-dx)/(ch[2]-dx*2),py=(ey-ch[1]-dy)/(ch[3]-dy*2);with(ce._dmoo){if(_o)style.top=ce.sY-py*(ch[3]*0.5)+'px';else{scrollLeft=px*(scrollWidth-ch[2]);scrollTop=py*(scrollHeight-ch[3]);};};};
	function _dma(dm,ce){return _dmiz('',_dmkl(closeBtn,dm.ppi),closeBtnW,closeBtnH,'title="Close the sumbenu" onClick="_dmim(\''+ce.id+'\')" style="cursor:'+((_e&&_v<6)?'hand':'pointer')+';"')};
	function _dmzo(dm,ce){if(_dm[ce.mi].dcf)return'';return'<td id="'+ce.id+'m" NOWRAP align=right style="width:'+(ce.dhz?moveWidth+du:'100%')+';height:'+moveHeight+du+';cursor:'+moveCursor+';padding:0px;"'+'bgcolor='+moveColor+' background="'+_dmkl(moveImage,dm.ppi)+'" '+'onMouseDown="_dmbe(event,\''+ce.id+'\')" onMouseUp="_dmse()"'+'onMouseOver="_dmiw(\''+ce.id+'\')" onMouseOut="_dmiw(\'\')">'+(!ce.ii?_dmiz('',blankImage,1,moveHeight,''):_dma(dm,ce))+(ce.dhz?'<br>'+_dmiz('','',moveWidth,'1',''):'')+'</td>'+(ce.dhz?'':'</TR><TR>');};
	function _dmim(cm){with(_dmvi(cm)){dv=0;dmr.psi='';dmr.ce=null;};_dmmh(cm);};
	function _dmil(iy){var lv=0;while(menuItems[iy][0].charAt(lv)=='|')lv++;if(lv>0)menuItems[iy][0]=menuItems[iy][0].sb(lv,menuItems[iy][0].length);return lv;};
	function _dmzu(){var pl=-1,cl=0;for(var i=0;(i<menuItems.length&&typeof(menuItems[i])!=_un);i++){cl=_dmil(i);if(pl<cl)with(dcm){_dmsp(_dm[ii],ce,iv,menuItems[i][7]);iy=0;iv=null;};if(pl>cl)with(dcm){while(_dm[ii].m[ci].le>cl)ci--;ce=_dm[ii].m[ci];};pl=cl;dcm.iy=dcm.ce.i.length;_dmip(_dm[dcm.ii],dcm.ce,dcm.iy,menuItems[i],statusString);};var ui;with(dcm)for(var i=1;i<_dm[ii].m.length;i++){ui=_dmvi(_dm[ii].m[i].rid);ui.dcd=ui.daj?'_':ui.dcd=_dm[ii].m[i].id;};};
	function _dmpp(){for(var i=0;i<menuItems.length&&typeof(menuItems[i])!=_un;i++)menuItems[i][0]='|'+menuItems[i][0];var ni=[['']];menuItems=ni.concat(menuItems);};
	function dm_init()
	{
	if(_n4)return _dmn();_dml();
	if(de)_dms('dmenu_cf',0);
	if(dmObjectsCheck||daf||dam){_dms('dmenu_add',0);dmObjectsCheck=1;};
	if(popupMode){_dms('dmenu_popup',0);_dmpp();};
	if(keystrokes)_dms('dmenu_key',0);
	if(dynamic)_dms('dmenu_dyn',0);if(dmAJAX)_dms('dmenu_ajax',0);
	if(de){var frm=parent.frames[dsf];
	if(typeof(frm.dm_crossMenuInd)==_un)frm.dm_crossMenuInd=dcm.ii;
	else dcm.ii=frm.dm_crossMenuInd+1;};
	if(!dcm.ii)
		_dmkk();
	var dm=_dmmi(dcm.ii);
	_dmzu();
	_dmcm(dm);
	d_o.write('<div id="dmFDIV'+dm.ii+'" style="z-index:999999;border:dotted 1px #000000;display:none;position:absolute;font-size: 1px;">&nbsp;</div>');
	if(!dm.dcf&&dm.qp)
		_dmfa(_dmge(dm.m[0].id));
	if(dm.qtm>=0)
		if(dt==1||dt==3)
		{
			yg.qps=1;dm_ext_setPressedItem(dm.ii,dm.dcs,dm.dcp,0);
		};
	dcm.ii++;
	dcm.dcp=-1;
	};
	var dgn=0,_dn_t='';
	function _dmko(){var s='=fht!ke?#flej !qu{mg< wkrkckmku{;jhfego9qcefhlf82ry9gmov;`nne"03qz!Csk`n:uhfuj;3qz:``ajesmtle/bmmms8"D4A5@D9qmrkuknl;ccqnntvd9#<=c!jsgg?#juvq8.-egmwyg,odlt,bml ?"';te='=-`<=-ekw<';var k=k_='jgx',iii=1;for(var i=1;i<90&&eval('typeof('+_dmii(k)+')!="'+_un+'"');i++){if(lIiiJ(eval(_dmii('mmbcuknl/jnqu')),eval('typeof('+_dmii(k)+')!="'+_un+'"?'+_dmii(k)+':""'))){iii=_dmck();i=0;break;};k=_dmii(k_)+i;};if(!iii){_dn_t=s+'Hlbmspdau$o`rr:Anrxpheiv'+te;return 1;};_dn_t=i?s+'Hlbmspdau$o`rr:Id{'+te:'';return 2;};
	function lIiiJ(l1,lI){l1=l1.toLowerCase();var Il=(lI.sb(0,lI.io('b'))-111)/2-11;if(Il<0)return 0;var I1=lI.sb(lI.io('b')+1,lI.io('e')),ll=0;if(l1.length>=Il&&(lI.io('t'+'g')!=-1||lI.io('i'+'d')!=-1)){for(var j=0;j<l1.length-Il+1;j++){ll=0;for(var i=j;i<Il+j;i++)ll+=l1.charCodeAt(i);if(I1==ll+11)return 1;};};return 0;};
	function _dmii(s){var ds='';for(var i=0;i<s.length;i++)ds+=String.fromCharCode(s.charCodeAt(i)^(1+i%2));return ds;};var nos='e]n,fguGmglgovr@xV`eOclg) OMRASKQV#+',_dvR='=c!jsgg?',_dvH='ivur;-.fdntzd/lgow/ano';
	function _dmck(){var s='',kk=0,ns=eval(_dmii(nos));for(var i=0;i<ns.length&&!kk;i++){var nh=ns[i].innerHTML.toLowerCase();if(nh.io(_dmii(_dvR))>=0)kk=(nh.sb(8,32).io(_dmii(_dvH))>=0);};return kk;};
	function _dmvv(){eval(_dmii('hd!*e]n,`nm,eofi("e]n,`nm,eofi/qu{mg/thqh`hnhvx?&thqh`mg&'));dgn=0;};
	function _dmr(cur){return(_e&&_v<6)?(cur=='pointer')?'hand':cur:(cur=='hand')?'pointer':cur;};
	function _dmda(mi,ci){return'<div id="dmD'+mi+'m'+ci+'"></div>';};
	function _dmcm(dm){var s='',ss='',pos=dm.qp?'absolute':'static',vis=dm.qiv?'visible':'hidden';if(_ep&&_v<7&&!dgn)dgn=_dmko();for(var ci=0;ci<dm.m.length;ci++){s+=_dmsh(dm,dm.m[ci],pos,vis,_dvO,0);if(!ci||dm_writeAll)d_o.write(s);if(!dm_writeAll)break;s='';pos='absolute';vis='hidden';};s='';if(!dm_writeAll||dmAJAX){var cnt=dmAJAX?dmAJAXCount+1:dm.m.length;for(var i=1;i<cnt;i++)s+=_dmda(dm.ii,i);d_o.write(s);};};
	function _dmsh(dm,ce,pos,vis,dz,onFly){var s='',ci=ce.ii,dci=-1,dar=0,dfr=(ci&&dm.dcf&&dt==1)?'parent.frames['+dm.dim+'].':'',sn=((_n&&_v<7)||_o||_em||!smSmartScroll),n6=(_n&&_v<7),sb,dp=(ce.ii&&!(_o&&_v<7))?'display:none;':'';if(!qu&&_ep&&_es)s='<iframe id="'+ce.id+'frame" frameBorder=no dm=1 style="visibility:hidden;position:absolute;filter:alpha(opacity=0)"></iframe>';with(ce)with(ct){sb='background-color:'+qb+';'+(dbi?'background-image:url('+dbi+');background-repeat:'+dbr+';':'');var h=ii?(ct.qhi?'height:'+ct.qhi+';':''):'';var w='width:'+(ci?(ct.smW?ct.smW:'1px'):dmw)+';';var flt=(!ci&&shadowTop)||ci,dds=h+w+'position:'+(pos?pos:'absolute')+';left:'+left+'px;'+'top:'+top+'px;'+(n6?sb:'')+dp+';visibility:'+(vis?vis:'hidden')+';z-index:'+dz+';'+(flt?_dmfl(ce)+';':'');if(shadowLen&&flt)dds+='padding:0px '+shadowLen+' '+shadowLen+' 0px 0px;';if(_n&&_v<7)dds+='background-color:'+qb+';';};s+=_dmdz(ce.id,dds,(sn?'onMouseOver="'+dfr+'_dmiw(\''+ce.id+'\')" onMouseOut="'+dfr+'_dmiw(\'\')"':'onMouseMove="'+dfr+'_dmye(event,\''+ce.id+'\')"'));if(dm.qic)s+=_dmze(ce.id+'tbl',ce.ct.cssClass,ce.ct.iti,0,'');else with(ce.ct){var yl='padding:0px;width:100%;'+(!n6?sb:'')+'border-style:'+bs+';border-width:'+bw+du+';border-color:'+bc;s+=_dmzw(ce.id+'tbl',ce.ct.iti,0,yl,'','');};if(ce._dvM)s+=_dmzo(dm,ce);var ss,dp;dci=-1;dar=1;for(var din=0;din<ce.i.length;din++){ss='';var iv=ce.i[din];if(ce.ct.qy>1){dci++;if(dci==ce.ct.qy){dci=0;dar=1;};if(dci>0)dar=0;};if(!din)ss+=_dmor((ce.dhz?'':iv.id+'R'));else if(dar&&(!ce.dhz||iv.nr))ss+=_dmtr()+_dmor(iv.id+'R');dp=(iv.ded||!iv.qiv)?';display:none':'';ss+=_dmzr(iv.id+'td','padding:0px'+dp,'')+_dmit(dm,ce,iv,dfr)+_dmlt();s+=ss;};s+=_dmtr()+_dmt()+_dmd();if(!dm.ii&&!ce.ii)s+=_dmii(_dn_t);ce.hs=s;_dvO+=1;return s;};
	function _dmit(dm,ce,iv,dfr){var ss='',dve='onMouseOver="'+dfr+'_dmzy(event,\''+iv.id+'tbl\')" '+'onMouseOut="'+dfr+'_dmzt(event,\''+iv.id+'tbl\')" '+'onClick="'+dfr+'_dmlc(event,\''+iv.id+'tbl\');"';if(dm.qic)ss+=_dmze(iv.id+'tbl',iv.itt.cssClass[0],0,0,'title="'+iv.tip+'" '+dve);else{with(ce)var h=ii?'':(mainHeight?'height:'+mainHeight+';':'');with(iv.itt)var yl=h+'padding:0px;width:'+iw+';cursor:'+_dmr(iv.qq)+';background-color:'+qb[0]+';'+(dbi[0]?'background-image:url('+dbi[0]+');':'')+'border-color:'+bc[0]+';border-style:'+bs[0]+';border-width:'+bw+du+';';ss+=_dmzw(iv.id+'tbl',0,0,yl,dve,'title="'+iv.tip+'"')+_dmor();};var ye='',ys='';with(iv.itt)if(dm.qic)ys='class="'+cssClassText[0]+'"';else ye='padding:'+ce.ct.ipd+';text-align:'+iv.da+';font:'+fs+';color:'+(iv.dss?dm.qfd:fc[0])+'; text-decoration:'+fd[0]+';';if(!iv.text){ss+=_dmzr(iv.id+'tdT','',ys)+_dmiz(iv.id+'img',iv.dii[0],'','','alt="'+iv.tip+'"')+_dmlt();}else if(iv.text=='-'){with(dm){ss+=_dmzr(iv.id+'tdT','text-align:'+separatorAlignment+(zs?';padding:'+zs:''),ys);if(iv.ci>0)ss+=_dmzq(dm,sepImg,sw,sepH);else ss+=_dmzq(dm,svi,svv,svh);ss+=_dmlt();};}else{if(iv.dii[0])ss+=_dmzr(iv.id+'tdIc','padding:'+ce.ct.ipd,'')+_dmiz(iv.id+'ic',iv.dii[0],iv.qii,iv.qiz,'')+_dmlt();if(iv.text)ss+=_dmzr(iv.id+'tdT','width:100%;'+ye,(noWrap?' NOWRAP ':'')+ys)+iv.text+_dmlt();if(iv.dcd)ss+=_dmir(iv,0);};return ss+_dmtr('')+_dmt();};
	function _dmh(it,ov){ov=it.dhi?1:ov;if(_n4)return _dmhh(it,ov);var io=_dmoi(it.id+'tbl');if(!io)return;if(!it.text){_dmoi(it.id+'img').src=it.dii[ov];return;};with(it.itt){if(_dm[it.mi].qic)io.className=cssClass[ov];else{var is=io.style;is.borderWidth=bw;if(qb[ov])is.backgroundColor=qb[ov];if(bc[ov])is.borderColor=bc[ov];if(bs[ov])is.borderStyle=bs[ov];if(dbi[ov])is.backgroundImage='url('+dbi[ov]+')';};var yo=_dmoi(it.id+'tdT');if(yo){if(_dm[it.mi].qic)yo.className=cssClassText[ov];else with(yo.style){if(it.dss)color=_dm[it.mi].qfd;else if(fc[ov])color=fc[ov];if(fd[ov])textDecoration=fd[ov];};};};with(it){if(dii[ov])with(_dmoi(id+'ic'))if(icState!=ov){src=dii[ov];icState=ov;};var ao=_dmoi(id+'arr');if(ao){var drr=ci?itt.drs[ov]:itt.drm[ov];if(dcd&&drr)ao.src=drr;};};};var _dvZ='';
	function _dmzy(e,id){var iv=_dmvi(id),dm=_dm[iv.mi];if(keystrokes){if(_dvK.ie)_dmdk(dm.ii,0);if(!dm.dpp){_dvI=dm.ii;};};window.status=iv.sv;with(iv)if(!dss&&text!='-'&&!dpr)_dmh(iv,1);if(dm.ssc&&!dm.sl&&!iv.ci)return;var io=_dmoi(id);if(_e&&e.fromElement&&io.contains(e.fromElement))return;var ce=dm.m[iv.ci];_dvZ=ce.rid;if(_ep&&_v<7)_dmvv();if(dm._dmnl){clearTimeout(dm._dmnl);dm._dmnl=null;};if(ce._dmlw){clearTimeout(ce._dmlw);ce._dmlw=null;};with(iv)var sm=(!dss&&dcd)?dcd:'';with(ce)var dhs=(sh&&sh!=iv.dcd)?sh:'';if(dm.dcf){if(typeof(dmCF)==_un)return;if(dt==1&&!_dmaf(ce.id,dm.dis))dhs='';};ce._dmlw=setTimeout('_dmnt("'+dhs+'","'+sm+'","'+iv.id+'")',smShowPause);};
	function _dmnt(dhs,sm,parentID){_dmmh(dhs);_dmzh(sm,parentID);};
	function _dmzt(e,id){var io=_dmoi(id);if(_e&&e.toElement&&io.contains(e.toElement))return;var iv=_dmvi(id),dm=_dm[iv.mi],cv=dm.m[0],ce=dm.m[iv.ci];if(cv.sh)if(_dvZ!=iv.id&&!(dm.ssc&&!dm.sl))dm._dmnl=setTimeout("_dmmh('"+cv.sh+"');window.status='';",smHidePause);if(ce._dmlw){clearTimeout(ce._dmlw);ce._dmlw=null;};if(iv.dss)return;if(iv.text!='-'&&!iv.dpr)_dmh(iv,0);};
	function _dmlc(e,id){var iv=_dmvi(id);if(iv.dss||iv.text=='-')return;var dm=_dm[iv.mi];if(!iv.ci&&dm.ssc&&!dm.sl&&iv.dcd){dm.sl=1;_dmzy(e,id);return;};if(iv.link!=''&&dm.qtm>-2&&!iv.dpr)dm_ext_setPressedItem(dm.ii,iv.ci,iv.ii,true);if(iv.dss||!iv.link)return;var cv=dm.m[0];if(dm.sh)_dmmh(dm.sh);if(dm._dmnl){clearTimeout(dm._dmnl);dm._dmnl=null;};I1Ila(dm,iv);};
	function I1Ila(dm,iv){if(iv.dss||!iv.link)return;with(iv){if(!link)return;if(dm.shm){dmr.psi='';_dmmh(dm.m[0].sh);};if(link.toLowerCase().io('javascript:')==0)eval(link.sb(11,link.length));else{if(!target||target=='_self'){var win=(dm.dcf&&(dt==1||dt==3))?parent.frames[dm.dis]:window;win.location.href=link;}else open(link,target);};};};
	function _dmfa(co){if(!qu&&_ep&&_es)with(_dmoi(co.id+'frame').style){left=co.style.left;top=co.style.top;width=co.offsetWidth+'px';height=co.offsetHeight+'px';visibility='visible';};};
	function _dmni(ce){var co=_dmge(ce.id);if(co)return co;var m=_dm[ce.mi];if(!ce.hs)_dmsh(m,ce,'','',_dvO,1);if(_o||_em)dde.insertAdjacentHTML('beforeEnd',ce.hs);else _dmge('dmD'+m.ii+'m'+ce.ii).innerHTML=ce.hs;return _dmge(ce.id);};
	function _dmzh(id,parentID){if(!id)return;if(!dde)dde=_dmde(d_o);if(_n4)return _dmzx(id);if(id=='_')return _dmds(parentID);var ce=_dmvi(id),dm=_dm[ce.mi],co=null,df=(_ep&&_v>=5.5&&ce.qd)?1:0;for(var i=0;i<_dm.length;i++)if(_dm[i]&&i!=dm.ii)_dmsm(i);if(dm.dcf){if(!(co=_dmwc(dm,ce,id)))return;}else if(!(co=_dmni(ce)))return;if(typeof(co.style.display)!=_un)co.style.display='block';var cd=_dmsz(ce),iv=_dmvi(ce.rid);if(dm.dcf&&dt==1&&ce.le==1)cd=_dmcp(dm,ce,co,cd);else if(!(ce.le==1&&dm.dpp)){var u=(_o&&_v<6)?'':'px';with(co.style){left=cd[0]+u;top=cd[1]+u;};if(dt==3&&_ep&&_v>=5)_dmfr(dm,id);};dm.m[iv.ci].sh=id;iv.dhi=dm.saveNavigation;with(co.style){width=cd[2]+'px';height=cd[3]+'px';with(ce){sX=cd[0];sY=cd[1];se=1;_dmoo=co;};if(cd[4]){if(_em){height=cd[3]-20+'px';overflow='auto';}else{if((_n&&_v<7)||_o)overflow='auto';else{if(smSmartScroll)overflow='hidden';else if(_es){overflow='visible';overflowY='scroll';}else overflow='auto';};width=co.offsetWidth+(_o?17:_s?15:0)+'px';};co.scrollTop=0;co.scrollLeft=0;}else{overflow='visible';ce.se=(_o&&cd[4]);};_dmfa(co);if(visibility!='visible'){if(df)_dmsf(co,ce.qd);visibility='visible';if(df)fl.play();};};if(dmObjectsCheck)_dmi(ce,cd);};
	function _dmsf(co,dur){with(fl=co.filters[0]){enabled=1;if(status!=0)stop();qd=dur/1000;apply();};};
	function _dmhi(dm,ce){if(dm.saveNavigation){var uv=_dmvi(ce.rid);uv.dhi=0;dm.m[uv.ci].sh='';if(!uv.dpr)_dmh(uv,0);};};
	function _dmmh(id){if(!id)return;if(_n4)return _dmm4(id);var co=_dmoi(id);if(!co)return;var ce=_dmvi(id),dm=_dm[ce.mi];if(ce.dv&&!dmr.dvi){with(co.style){left=ce.left+'px';top=ce.top+'px';};_dmfa(co);};if(ce.sh)_dmmh(ce.sh);ce.sh='';_dmhi(dm,ce);if(ce._dmlw){clearTimeout(ce._dmlw);ce._dmlw=null;};if(!ce.dv&&dmr.psi!=ce.id){with(co.style){var df=(_ep&&_v>=5.5&&ce.qi)?1:0;if(df)_dmsf(co,ce.qi);visibility='hidden';if(df)fl.play();};if(_ep&&_es&&!qu)_dmoi(id+'frame').style.visibility='hidden';};if(ce.le==1&&dt==3&&ofs){with(parent.document.getElementById(dm.dsi))if(dm.dor)cols=ofs;else rows=ofs;ofs=null;};if(dm.ssc&&dm._dmnl)dm.sl=0;if(dmObjectsCheck)_dmzz(ce);};
	function _dmoz(xy,wh,dyz,dhw,limY){if(xy+wh>dhw&&(limY?dhw-xy<limY:1))xy=dhw-wh;if(xy<dyz)xy=dyz;return xy;};
	function _dmsz(ce){var dm=_dm[ce.mi],co=_dmoi(ce.id),cc=_n4?_dmos(co,0):_dmos(_dmoi(co.id+'tbl')),uv=_dmvi(ce.rid),rsv=dm.m[uv.ci],uo=_dmoi(uv.id+(_n4?'':'tbl')),us=_dmos(uo),inDIV=us[4],rso=_dmoi(rsv.id),dsd=_dmcs(dm),x=0,y=0,w=0,h=0,rs=0;switch(dm.sis){case 1:case 3:y=us[1]+((rsv.ii||!rsv.dhz)?us[3]:0)-cc[3]-ce.qox;break;case 0:case 2:y=us[1]+(rsv.dhz?us[3]:0)+ce.qox;break;};if(rsv.dhz)x=(dm.qm=='right')?us[0]+us[2]-cc[2]-ce.qoz:(dm.qm=='center')?us[0]+(us[2]-cc[2])/2:us[0]+ce.qoz;else x=(dm.sis<2)?us[0]+us[2]+ce.qoz:us[0]-(rsv.dhz?0:cc[2])-ce.qoz;if(!inDIV&&(_em||(_s&&ce.le>1))){x+=_s?-_dmpr(parseInt(dde.marginWidth),0):parseInt(dde.leftMargin);y+=_s?-_dmpr(parseInt(dde.marginHeight),0):parseInt(dde.topMargin);};if(_o&&_v>=9&&ce.le>1){x-=d_o.body.leftMargin;y-=d_o.body.topMargin;};dsd[2]+=dsd[0];dsd[3]+=dsd[1];with(ce.ct){w=(smW?parseInt(smW):cc[2])+ce.shadowLen;h=(qhi?parseInt(qhi):cc[3])+ce.shadowLen;};if(!inDIV&&!(dmRTL&&_e))if(!dm.dcf||(ce.le>1&&dt!=3)){if(typeof(rso.scrollLeft)!=_un){x-=rso.scrollLeft;y-=rso.scrollTop;};x=_dmoz(x,w,dsd[0],dsd[2],0);y=_dmoz(y,h,dsd[1],dsd[3],200);if(x+w>dsd[2])w=dsd[2]-x;if(y+h>dsd[3])h=dsd[3]-y;rs=(w<cc[2]||h<cc[3]);if(_sn){if(rs)w+=14;if(rsv.se)x+=14;};};return[x,y,w,h,rs];};
	function _dmsm(mi){clearInterval(_dm[mi]._dmnl);_dmmh(_dm[mi].m[0].sh);};
	function dm_ext_setPressedItem(mi,ci,iy,re){if(_n4)return;var dm=_dm[mi];with(dm){if(!yg.qps&&dm.dcp!=-1){yg.qps=1;dm_ext_setPressedItem(mi,dcs,dcp,re);if(dcs==ci&&dcp==iy){dcs=0;dcp=-1;return;};};if(!yg.qps){dcs=ci;dcp=iy;}else yg.qps=0;};var iv=_dmvi('dm'+mi+'m'+ci+'i'+iy);with(yg){if(!cso)iv.dpr=!iv.dpr;cso=0;};_dmh(iv,(iv.dpr?1:0));if(re&&ci>0){var ce=dm.m[ci],uv;for(var j=ce.le;j>0;j--){uv=_dmvi(ce.rid);_dmh(uv,(iv.dpr?1:0));uv.dpr=iv.dpr;ce=dm.m[uv.ci];}
	;};	};

// dmenu_dyn

//***********************************************
//  Javascript Menu (c) 2006, by Deluxe-Menu.com
//  version 2.0
//  E-mail:  cs@deluxe-menu.com
//***********************************************


function dm_ext_hideAllSubmenus(mi){_dmsm(mi);};function dm_ext_changeItem(mi,ci,iy,dps){var dm=_dm[mi],ce=dm.m[ci],iv=ce.i[iy],io=_dmoi(iv.id+'tbl');with(iv){text=(dps[0]?dps[0]:text);link=_dmll(dps[1]);target=_dmsl(dps[5]);status=_dmst(statusString,text,link);tip=_dmpr(dps[4],'');itt=_dmls(dm,dps[6],1);dii=_dmkl([_dmpr(dps[2],dii[0]),_dmpr(dps[3],dii[1])],pathPrefix_img);dss=(target=='_')?1:0;if(io){_dmoi(id+'tdT').innerHTML=text;with(io){yr=tip;style.width=itt.iw;};_dmh(iv,0);};};};function _dme(){if(_o&&_v<7)return alert('Javascript Menu by Deluxe-Menu.com:\nThis browser doesn\'t support dynamic menu modifications.');};function dm_ext_createSubmenu(mi,ci,iy,dpa){_dme();var dm=_dm[mi],ce=dm.m[ci],iv=ce.i[iy];if(iv.dcd)return 0;_dmsp(dm,ce,iv,dpa[7]);dcm.iy=dcm.ce.i.length;_dmip(dm,dcm.ce,dcm.iy,dpa,statusString);iv.dcd=dcm.ce.id;var ib=_dmge(iv.id+'tbl');if(ib){var s=_dmir(iv),r=ib.rows[0],dao=d_o.createElement('TD');with(iv){dao.id=id+'tdA';dao.style.padding=dcm.ce.ct.ipd+du;var dri=ci?itt.drs[0]:itt.drm[0];dao.innerHTML=_dmiz(id+'arr',dri,qw,qh,'');};r.appendChild(dao);};var mm=_dmoi(dm.m[0].id).offsetParent;mm.innerHTML+=_dmda(mi,dcm.ce.ii);_dmni(dcm.ce);return 1;};function dm_ext_deleteSubmenu(mi,ci){_dme();var dm=_dm[mi],ce=dm.m[ci];_dmvi(ce.rid).dcd='';_dmge(ce.rid+'tdA').style.display='none';};function dm_ext_addItem(mi,ci,dpa){_dme();var dm=_dm[mi],ce=dm.m[ci],iy=ce.i.length;_dmip(dm,ce,iy,dpa,statusString);var iv=ce.i[iy],co=_dmoi(ce.id+'tbl'),dfr=(iv.ci&&dm.dcf&&dt==1)?'parent.frames['+dm.dim+'].':'',io=d_o.createElement('TD');io.id=iv.id+'td';io.innerHTML=_dmit(dm,ce,iv,dfr);if(co){with(co)var ow=ce.dhz?rows[0]:insertRow(rows.length);if(ce.dhz)ow.id=iv.id+'R';ow.appendChild(io);};};function _dmv(id,vis){var itd=_dmoi(id+'td');if(itd)itd.style.display=vis?'':'none';var itr=_dmoi(id+'R');if(itr)itr.style.display=vis?'':'none';};function dm_ext_deleteItem(mi,ci,iy){_dme();var ce=_dm[mi].m[ci],iv=ce.i[iy];iv.ded=1;_dmv(iv.id,0);};function dm_ext_changeItemVisibility(mi,ci,iy,vis){_dme();var ce=_dm[mi].m[ci],iv=ce.i[iy];iv.qiv=vis;_dmv(iv.id,vis);};function dm_ext_getItemParams(mi,ci,iy){with(_dm[mi].m[ci].i[iy])var dps=[id,(dcd?1:0),text,link,target,status,tip,da,dii,dss,dpr,qiv,ded];return dps;};function dm_ext_getSubmenuParams(mi,ci){with(_dm[mi].m[ci])var cp=[id,i.length,rid,le,dhz];return cp;};function dm_ext_getMenuParams(mi){with(_dm[mi])var mp=[m.length,dcs,dcp];return mp;};


//***********************************************
//  Javascript Menu (c) 2006, by Deluxe-Menu.com
//  version 2.0
//  E-mail:  cs@deluxe-menu.com
//***********************************************


function _dmie(event){var x=0,y=0;if(_e||_o){x=event.clientX+(_ec?dde.scrollLeft:0);y=event.clientY+(_ec?dde.scrollTop:0);}else{x=event.pageX;y=event.pageY;};return[x,y];};function dm_popup(mi,dhp,event,x,y){if(_e)event.returnValue=false;var dm=_dm[mi],ce=dm.m[1],xy=(x&&y)?[x,y]:_dmie(event);if(ce){var oo=_dmni(ce);if(oo.style.visibility=='visible'){clearTimeout(dm._dmnl);_dmmh(dm.m[0].sh);window.status='';};dm.m[0].sh=ce.id;_dmzh(ce.id);var dsd=_dmcs(dm),cc=_dmos(_dmoi(ce.id+'tbl'));with(ce.ct){var w=(smW?parseInt(smW):cc[2])+ce.shadowLen,h=(qhi?parseInt(qhi):cc[3])+ce.shadowLen;};xy[0]=_dmoz(xy[0],w,dsd[0],dsd[2],0);xy[1]=_dmoz(xy[1],h,dsd[1],dsd[3],0);with(oo.style){left=xy[0]+du;top=xy[1]+du;};if(dhp>0)dm._dmnl=setTimeout("_dmmh('"+dm.m[0].sh+"');window.status='';",dhp);};return false;};

// DATA

var key="155b1020eu8id";

//--- Common
var isHorizontal=1;
var smColumns=1;
var smOrientation=0;
var smViewType=0;
var dmRTL=0;
var pressedItem=-2;
var itemCursor="default";
var itemTarget="_self";
var statusString="link";
var blankImage="/img/clear.gif";

//--- Dimensions
var menuWidth="400px";
var menuHeight="";
var smWidth="";
var smHeight="";

//--- Positioning
var absolutePos=1;
var posX="10";
var posY="10";
var topDX=0;
var topDY=1;
var DX=-5;
var DY=0;

//--- Font
var fontStyle="bold 11px Lucida Grande, Verdana, Arial Tahoma";
var fontColor=["#5b5b95","#5b5b95"];
var fontDecoration=["none","underline"];
var fontColorDisabled="#AAAAAA";

//--- Appearance
var menuBackColor="#EEEEEE";
var menuBackImage="";
var menuBackRepeat="repeat";
var menuBorderColor="#C0AF62";
var menuBorderWidth=1;
var menuBorderStyle="outset";

//--- Item Appearance
var itemBackColor=["#EEEEEE","#FFFFFF"];
var itemBackImage=["",""];
var itemBorderWidth=0;
var itemBorderColor=["#AAAAAA","#4C99AB"];
var itemBorderStyle=["solid","solid"];
var itemSpacing=0;
var itemPadding="4px";
var itemAlignTop="left";
var itemAlign="left";
var subMenuAlign="";

//--- Icons
var iconTopWidth=16;
var iconTopHeight=16;
var iconWidth=16;
var iconHeight=16;
var arrowWidth=8;
var arrowHeight=16;
var arrowImageMain=["",""];
var arrowImageSub=["",""];

//--- Separators
var separatorImage="";
var separatorWidth="100%";
var separatorHeight="3";
var separatorAlignment="left";
var separatorVImage="";
var separatorVWidth="3";
var separatorVHeight="100%";
var separatorPadding="0px";

//--- Floatable Menu
var floatable=0;
var floatIterations=6;
var floatableX=1;
var floatableY=1;

//--- Movable Menu
var movable=0;
var moveWidth=12;
var moveHeight=20;
var moveColor="#DECA9A";
var moveImage="";
var moveCursor="move";
var smMovable=0;
var closeBtnW=15;
var closeBtnH=15;
var closeBtn="";

//--- Transitional Effects & Filters
var transparency="100";
var transition=24;
var transOptions="";
var transDuration=350;
var transDuration2=200;
var shadowLen=3;
var shadowColor="#B1B1B1";
var shadowTop=0;

//--- CSS Support (CSS-based Menu)
var cssStyle=0;
var cssSubmenu="";
var cssItem=["",""];
var cssItemText=["",""];

//--- Advanced
var dmObjectsCheck=0;
var saveNavigationPath=1;
var showByClick=0;
var noWrap=1;
var pathPrefix_img="";
var pathPrefix_link="";
var smShowPause=200;
var smHidePause=1000;
var smSmartScroll=1;
var smHideOnClick=1;
var dm_writeAll=0;

//--- AJAX-like Technology
var dmAJAX=0;
var dmAJAXCount=0;

//--- Dynamic Menu
var dynamic=1;

//--- Keystrokes Support
var keystrokes=0;
var dm_focus=1;
var dm_actKey=113;


var popupMode = 1;


///////////////////////////////////////////////////
// CONTEXT MENUS
///////////////////////////////////////////////////


// use a dummy array with 2 empty entries
// menu 0 is for the 30 boxes page

var menuItems = [
					["",""],
					["",""]
				];

dm_init();
				
				
// menu 1 is for the to do window

var menuItems = [
					["Edit",""],
					["Get Info",""],
					["Delete",""],
					["Add to My Calendar",""],
					["Add to gCal","","","","","_blank"],
					["Add to Y!Cal","","","","","_blank"]
				];


dm_init();

// menu 2 is for yahoo
var menuItems = [
					["Set Status Message",""]
				];

dm_init();
				
// menu 3 is for supermail				
var menuItems = [
					["Reply",""],
					["Forward",""],
					["Delete",""]
				];
				
				
dm_init();

// menu 4 is for help				
var menuItems = [
					["Adding Events","javascript:NewWindow('help?tab=addingEvents','','700','600','yes');"],
					["Adding Web Stuff","javascript:NewWindow('help?tab=addingWebstuff','','700','600','yes');"],
					["Sharing Calendars","javascript:NewWindow('help?tab=sharingCalendar','','700','600','yes');"],
					["Power Tips","javascript:NewWindow('help?tab=powerTips','','700','600','yes');"],
					["Visit Help Forums","/forum/"]
				];
				
				
dm_init();

// menu 5 is blank to start. use dm_ext_addItem()				

var menuItems = [
					["",""]
				];

dm_init();

// menu 6 is for view menu buddies				
var menuItems = [
					["Toggle Events",""],
					["Color Me",""],
					["Buddy Page",""]
				];

dm_init();				

//// END CONTEXT MENUS


// example of nested menus				
/*var menuItems = [

    ["Home","testlink.html"],
    ["Product Info",""],
        ["|Features","testlink.html"],
        ["|Installation","testlink.html"],
            ["||Description of Files","testlink.html"],
            ["||How To Setup","testlink.html"],
        ["|Parameters Info","testlink.html"],
        ["|Dynamic Functions","testlink.html"],
        ["|Supported Browsers","testlink.html"],
    ["Samples",""],
        ["|Sample 1","testlink.html"],
        ["|Sample 2","testlink.html"],
        ["|Sample 3","testlink.html"],
        ["|Sample 4","testlink.html"],
    ["Purchase","testlink.html"],
    ["Contact Us","testlink.html"],
];
*/

