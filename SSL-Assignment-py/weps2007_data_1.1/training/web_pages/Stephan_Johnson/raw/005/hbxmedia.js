//hbxmedia.js,HBX2.0,COPYRIGHT 1997-2006 WEBSIDESTORY,INC. ALL RIGHTS RESERVED. U.S.PATENT No.6,393,479B1 & 6,766,370. INFO:http://websidestory.com/privacy
/* hbxmedia Usage:
    Declare hbx.media as the id of the media object to be tracked
    ex: hbx.media = "MyMediaObject";
    Include hbxmedia.js after the hbx.js is included
    The defer directive needs to be on either both JS includes or neither of them
*/
var _vjs="HBX0200.10m";
var _mis=1000;
var _mo=new Object(),_mt="",_mi="",_ms=-1,_ms0="stop",_ms1="play",_ms2="pause",_ms3="playp",_mac=0,_ma=new Array(),_mai=0,_m='',_mpf=0,_mtt="";
var _fl="",_plf=0,_pp=0,_ppv=120;

function _MT(){if(hbx.media&&hbx.media!="")_mo=eval("document."+hbx.media);if(_mo){_mt=_mo.classid;
if(!_mt&&_mo.type){for(var a=0;a<_mac;a++){if(_ma[a].tp.indexOf(_mo.type.toLowerCase())>-1){_mt=_ma[a].mt;break}}}
if(_mt&&_mt!="")_mi=_MTF()}}
function _MTS(){clearInterval(_mi)}
function _MUL(){_MTS();_MPT()}
function _MTV(a,b,c,d,e,f,g){if(a!=_fl){_fl=a;b=0}_SV('m.f',a);_SV('m.cp',b);_SV('m.ep',c);_SV('m.s',d);_SV('m.cl',e);_SV('m.cv',f);_SV('m.ar',g);
_SV('m.tt',_mtt);if(typeof _XT!="undefined")_XT("Media",d);_TV();_pp=0}
function _MTF(a){if(_mt&&_mt!=""){for(a=0;a<_mac;a++){if(_ma[a].mt.indexOf(_mt.toLowerCase())>-1){_mai=a;break}}_EV(window,"unload",_MUL);
if(_ma[_mai].pt!=""){_mtt="e";_EV(_mo,_ma[_mai].pt,_MPT,1);}else{_mtt="i";}return setInterval("_MPT(1)",_mis)}}   
function _MPT(a,b,c,d,e){if(_plf==0){_plf=1;var _t="try{eval(",_c=")}catch(e){";c=_ma[_mai];if(_mo){a=eval(_t+"c.ps"+_c+"''}");if(a==c.p){d=eval(_t+"c.cp"+_c+"0}");
e=eval(_t+"c.ep"+_c+"0}");if((e-d)*c.po<1500&&_pp>3){_pp=_ppv}_pp++}if((_ms!=a||_pp>_ppv)&&a!="undefined"&&(a==c.p||a==c.w||a==c.s)){_ms=a;
b=(a==c.s)?_ms0:(a==c.w)?_ms2:(a==c.p)?_ms1:"u";_mpf|=(b==_ms1);if(b!="u"&&(_mpf||_pp>_ppv)){if(_pp>_ppv&&a==c.p)b=_ms3;  
_MTV(eval(_t+"c.mn"+_c+"''}"),eval(_t+"c.cp"+_c+"0}")*c.po,eval(_t+"c.ep"+_c+"0}")*c.po,b,c.cl,eval(_t+"c.cv"+_c+"''}"),eval(_t+"c.ar"+_c+"''}"))}}}}_plf=0}

//Video Configurations
_m=_ma[_mac++]=new Object();
_m.mt="clsid:6bf52a52-394a-11d3-b153-00c04f79faa6";
_m.tp="";
_m.p=3;
_m.w=2;
_m.s=1;
_m.mn="_mo.url";
_m.pt="_mo.playStateChange";
_m.ps="_mo.playState";
_m.cp="_mo.controls.currentPosition";
_m.ep="_mo.currentMedia.duration";
_m.cv="_mo.versionInfo";
_m.ar="";
_m.po=1000;
_m.cl="Windows Media Player";

_m=_ma[_mac++]=new Object();
_m.mt="clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95";
_m.tp="video/x-ms-wmv,video/x-msvideo,video/x-ms-asf,application/x-oleobject";
_m.p=2;
_m.w=1;
_m.s=0;
_m.mn="_mo.filename";
_m.pt="_mo.PlayStateChange";
_m.ps="_mo.PlayState";
_m.cp="_mo.CurrentPosition";
_m.ep="_mo.SelectionEnd";
_m.cv="_mo.code+'6.4'";
_m.ar="_mo.AutoRewind";
_m.po=1000;
_m.cl="Windows Media Player";

_m=_ma[_mac++]=new Object();
_m.mt="clsid:02bf25d5-8c17-4b23-bc80-d3488abddc6b";
_m.tp="video/quicktime,video/mpeg";
_m.p=1;
_m.w=0;
_m.s=-10;
_m.mn="_mo.GetURL()";
_m.pt="";
_m.ps="_mo.GetRate()";
_m.cp="_mo.GetTime()/_mo.GetTimeScale()";
_m.ep="_mo.GetDuration()/_mo.GetTimeScale()";
_m.cv="_mo.GetQuickTimeVersion()";
_m.ar="";
_m.po=1000;
_m.cl="Quicktime";

_m=_ma[_mac++]=new Object();
_m.mt="clsid:cfcdaa03-8be4-11cf-b84b-0020afbbccfa";
_m.tp="video/realmedia,video/vnd.rn-realvideo,audio/x-pn-realaudio-plugin,audio/x-pn-realaudio,audio/x-pn-realvideo";
_m.p=3;
_m.w=4;
_m.s=0;
_m.mn="_mo.GetSource()";
_m.pt="";
_m.ps="_mo.GetPlayState()";
_m.cp="_mo.GetPosition()";
_m.ep="_mo.GetLength()";
_m.cv="_mo.GetVersionInfo()";
_m.ar="";
_m.po=1;
_m.cl="RealPlayer";

_MT();
