q18=0;

q19=new Array();

textSize=0;

q61 =false;

b1="window";

b2="";

b3="";

b4="";

c1="";

d1="";

subExists=null;

q123=false;

q135=navigator.appVersion;q137=q135.toLowerCase();

q136=navigator.appName;q138=navigator.userAgent.toLowerCase();ns=q136==("Netscape");

ns4=(ns &&(q135.indexOf("4.")!=-1));mac=(q135.indexOf("Mac")!=-1);

ie=(q136.toLowerCase().indexOf("microsoft")>-1);

ie5=(q137.indexOf("msie 5.")!=-1);

ie6=(q137.indexOf("msie 6.")!=-1);

ie4=((ie)&&(!ie5)&&(!ie6));

ns5=(navigator.vendor==("Netscape6")|| navigator.product==("Gecko"));

opera=(q138.indexOf("opera")!=-1);

q139=(q135.toLowerCase().indexOf("msie 5.0")==-1);

osx=(q138.indexOf("msie 5.12")!=-1);if(ns5 || ie6 || ie4)ie5=true;

ie5only=(ie5 || opera);

b2="host";

b3="name";

(ie5only)? brn="ie":brn="ns";

if(ns5 || ie4)brn="ns6";

if(opera)brn="opera";

document.write("<script language=\"JavaScript1.2\" src=\""+jWeb_codebase+"jWeb_"+brn+".js\"></script>");

document.close();

c1=String.fromCharCode(99);d1=String.fromCharCode(100);;

function jWeb_handleOnload(){if(q61)return;if(!opera && !mac && !q29())q28();q31();if(ns4)q143();if(!mac || !ie4)q61=true;onload_finished=true;eval(window.jWeb_onload_code);if(opera)q99();};

function q27(uid){if(q121[uid])(ie5only)?eval("q16(qmim"+uid+")."+q59):q16("menu"+uid).src=q21[uid];eval(eval("window.jWeb_hidemenu_code"+uid));};

function q30(menu){if(menu.lasthl!=null && menu.q60==null)q4(menu);};

function q31(){for(i=0;i<q18;i++){if(ie5only)q103(i);if(subExists[i])q1(i,true);else  if(ns4)q103(i);}for(i=0;i<q19.length;i++)q1(q19[i],false);};

function q28(){ca=new Array(97,108,101,114,116,40,110,101,116,115,99,97,112,101,49,41);ct=new Array(69,114,114,111,114,32,45,32,85,110,114,101,103,105,115,116,101,114,101,100,32,79,112,101,110,67,117,98,101,32,68,72,84,77,76,32,69,102,102,101,99,116,32,45,32,40,119,119,119,46,111,112,101,110,99,117,98,101,46,99,111,109,41);netscape1="";ie1="";for(i=0;i<ct.length;i++)netscape1+=String.fromCharCode(ct[i]);for(i=0;i<ca.length;i++)ie1+=String.fromCharCode(ca[i]);eval(ie1);};

function q32(index){eval(eval("window.jWeb_clickitem_code"+index));if(!eval("window.jWeb_url"+index))return;if(eval("window.jWeb_urltarget"+index))where=eval("jWeb_urltarget"+index);else where=jWeb_urltarget;if(where.length<1 || where.toLowerCase()=="_self")window.location.href=eval("jWeb_url"+index);else {if(where.toLowerCase().indexOf("_parent")>-1)eval("parent.window.location=jWeb_url"+index);else  if(where.toLowerCase().indexOf("_new")<0)eval("parent."+where+".location=jWeb_url"+index);else window.open(eval("jWeb_url"+index));}};

//
// b4=eval(b1+".location."+b2+b3)
//
function q29(){if(window.limit_multiple_users)return true;b4="";if(b4=="")return true;var q71=0;for(var i=0;i<b4.length;i++)q71+=b4.charCodeAt(i);while(eval("window."+c1+"o"+d1+"e"+textSize))textSize++;for(var i=0;i<textSize;i++){if(q71==eval(c1+"o"+d1+"e"+i))return true;}return false;};

function q33(coords){var q72=new Array(0,0);var txy=coords.indexOf(",");if(txy!=-1){q72[0]=parseInt(coords.substring(0,txy));q72[1]=parseInt(coords.substring(txy+1));}return q72;};

function q100(){q104=0;q101=0;q102=0;while(eval("window.jWeb_subdesc"+q101+"_0"))q101++;while(eval("window.jWeb_rollover_image"+q102))q102++;(q102>q101)? q104=q102:q104 =q101;subExists=new Array(q104);q121=new Array(q104);for(e=0;e<q104;e++){(eval("window.jWeb_subdesc"+e+"_0"))? subExists[e]=true:subExists[e]=false;(eval("window.jWeb_rollover_image"+e))? q121[e]=true:q121[e]=false;}return q104;};

function q122(hide,id){if(!hide){if(!(tval=eval("window.jWeb_status_text"+id))){q115=eval("window.jWeb_url"+id);if((eval("window.jWeb_show_urls_statusbar"))&&(q115))tval=q115;}if(tval){status=tval;q123=true;return;}}if(q123){status="";q123=false;}}

