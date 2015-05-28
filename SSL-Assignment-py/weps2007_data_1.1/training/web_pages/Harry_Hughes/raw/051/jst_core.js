
var BBCJS_UNDEFINED;var BBCJS_JSCRIPT_VERSION=null;/*@cc_on
BBCJS_JSCRIPT_VERSION=@_jscript_version;@*/if(typeof Function.prototype.apply=='undefined')
{Function.prototype.apply=function(o,a)
{var r;if(!o)o={};o.___apply=this;switch((a&&a.length)||0)
{case 0:r=o.___apply();break;case 1:r=o.___apply(a[0]);break;case 2:r=o.___apply(a[0],a[1]);break;case 3:r=o.___apply(a[0],a[1],a[2]);break;case 4:r=o.___apply(a[0],a[1],a[2],a[3]);break;case 5:r=o.___apply(a[0],a[1],a[2],a[3],a[4]);break;case 6:r=o.___apply(a[0],a[1],a[2],a[3],a[4],a[5]);break;default:for(var i=0,s="";i<a.length;i++)
{if(i!==0){s+=",";}
s+="a["+i+"]";}
r=eval("o.___apply("+s+")");break;}
o.__apply=null;return r;};}
if(typeof Function.prototype.call=='undefined')
{Function.prototype.call=function(o)
{var args=new Array(arguments.length-1);for(var i=1;i<arguments.length;i++)
{args[i-1]=arguments[i];}
return this.apply(o,args);};}
if(typeof Function.prototype.bind=='undefined')
{Function.prototype.bind=function(bind)
{var fn=this;return function()
{return fn.apply(bind,arguments);};};}
if(typeof Array.prototype.push=='undefined')
{Array.prototype.push=function()
{for(var i=0;i<arguments.length;i++)
{this[this.length]=arguments[i];}
return this.length;};}
if(typeof Array.prototype.pop=='undefined')
{Array.prototype.pop=function()
{if(this.length===0)return BBCJS_UNDEFINED;this.length--;return this[this.length];};}
if((BBCJS_JSCRIPT_VERSION&&(BBCJS_JSCRIPT_VERSION<5.5))||typeof new RegExp().global=='undefined')
{function _jst_fix_re_flags(re)
{var s=re.toString();var flags=s.substring(s.lastIndexOf('/'));re.global=flags.indexOf('g')!=-1;re.multiline=flags.indexOf('m')!=-1;re.ignoreCase=flags.indexOf('i')!=-1;}
RegExp.prototype.__exec__=RegExp.prototype.exec;RegExp.prototype.exec=function(s)
{if(typeof this.global=='undefined')
{_jst_fix_re_flags(this);}
var lastInd;if(typeof this.lastIndex=='undefined')
{lastInd=this.lastIndex=0;}
else
{lastInd=this.lastIndex;}
var res=this.__exec__(s.substring(lastInd));if(!res)
{this.lastIndex=0;return res;}
this.lastIndex=(RegExp.lastIndex+lastInd);res.index=this.lastIndex-res[0].length;if(lastInd===0)
{RegExp.__lastInput__=s;}
res.input=RegExp.__lastInput__;return res;};}
if("aa".replace(new RegExp('\\w','g'),function(){return arguments[1]+" ";})!=="0 1 ")
{String.prototype.__replace__=String.prototype.replace;String.prototype.replace=function(regexp,replacement)
{if(typeof replacement!='function')
{var v=this.__replace__(regexp,replacement);return v;}
if(typeof regexp.exec=='undefined')
{return BBCJS_UNDEFINED;}
var re=regexp;var a;var instr=this;var out_parts=[];var npasses=0;var prev_end=0;while((a=re.exec(instr)))
{npasses++;a.push(a.index);a.push(a.input);var res=replacement.apply(null,a);out_parts.push(this.substring(prev_end,a.index));out_parts.push(res);prev_end=a.index+a[0].length;if(!re.global)
{break;}}
if(npasses===0)
{return instr;}
out_parts.push(this.substring(prev_end));var s=out_parts.join('');return s;};}
if(!document.getElementById&&document.all)
{document.getElementById=function(id){return document.all[id];};}
function $()
{var elements=new Array();for(var i=0;i<arguments.length;i++)
{var element=arguments[i];if(typeof element=='string')element=document.getElementById(element);if(arguments.length==1)return element;elements.push(element);}
return elements;}
Object.extend=function(destination,source)
{for(property in source)
{destination[property]=source[property];}
return destination;};String.prototype.supplant=function(source)
{return this.replace(/[{]([^{}]*)[}]/g,function(a,b)
{var r=source[b];return typeof r!=='object'?r:a;});};var CONST=CONST||{};var GLOB=GLOB||{};var BBCJS_ONLOAD;var bbcjs={activex:(typeof(window.ActiveXObject)!="undefined"&&navigator.userAgent.indexOf("Mac")==-1),dhtml:(document.getElementById)?true:false,jscript_version:BBCJS_JSCRIPT_VERSION,documentLoaded:false,page:location.href.split("/")[location.href.split("/").length-1],qs:location.search.substr(1,location.search.length),version:1,cvs_version:"$Revision: 1.60 $",build_date:'$Date: 2007/01/30 15:31:31 $',defaultTraceLevel:3,quietMode:false,lib:{},client_ip:'',today:new Date()};bbcjs.addOnLoadItem=function(item)
{var f=(typeof item=='function')?item:function(){eval(item);};var s="<scr".concat("ipt defer src='//:' onreadyStatechange='if(this.readyState==\"complete\"){this.parentNode.removeChild(this);BBCJS_ONLOAD()}'></scr","ipt>");BBCJS_ONLOAD=(function(prev)
{return function()
{if(arguments.callee.done)return;arguments.callee.done=true;BBCJS_ONLOAD=function(){return;};f(prev?prev():prev);};})(BBCJS_ONLOAD);if(document.addEventListener){document.addEventListener("DOMContentLoaded",BBCJS_ONLOAD,false);}
if(new RegExp('WebKit|Khtml','i').test(navigator.userAgent)||(window.opera&&window.opera.version&&(parseInt(window.opera.version())<9)))
{(function(){new RegExp('loaded|complete').test(document.ready)?BBCJS_ONLOAD():setTimeout(arguments.callee,1);})();}/*@cc_on@*//*@if(@_win32)document.write(s);/*@end@*/window.onload=function(){return BBCJS_ONLOAD();};};bbcjs.addOnLoadItem(function(){bbcjs.documentLoaded=true;});bbcjs.copyObj=function(obj)
{var t={};if(typeof(obj.length)!="undefined")t=[];for(var i in obj)
{if(typeof(obj[i])=="object")t[i]=bbcjs.copyObj(obj[i]);else t[i]=obj[i];}
return t;};GLOB.o2lvl=0;GLOB.o2cnt=0;bbcjs.obj2list=function(o,name,hide)
{var str="";var c=0;var display="none";if(typeof(hide)!="undefined"){if(!(hide))display="block";}
else hide=true;if(typeof(name)=="undefined")name="_root";if(!GLOB.o2lvl)str+="<ul>\n";GLOB.o2lvl++;GLOB.o2cnt++;str+='<li><a href="javascript:void(0);" onclick="return bbcjs.o2swap('+GLOB.o2cnt+')">'+name+'</a></li>\n';str+='<ul style="display:'+display+';" id="bbcjsnode_'+GLOB.o2cnt+'">\n';for(var i in o)
{if(typeof(o[i])=='function')str+=('<li>'+i.bold()+'()</li>\n');else if(typeof(o[i])=='object'&&o[i]!==null)
{if((typeof(o[i].src)!="undefined")&&(typeof(o[i].alt)!="undefined"))
{str+=('<li><b>'+i+"</b>: "+o[i].src+' (image)</li>\n');}
else if(GLOB.o2lvl<100&&(i!="prototype"))str+=bbcjs.obj2list(o[i],i,hide);else if(GLOB.o2lvl>=100)str+="<li>Too much recursion...</li>\n";}
else if(o[i]!==null)str+=('<li>'+i+' ['+bbcjs.HTMLOut(o[i])+'] ('+typeof(o[i])+')</li>\n');else str+='<li><b>null item</b></li>';c++;}
if(!c)str+=('<li>'+o+'</li>\n');str+="</ul>\n";GLOB.o2lvl--;if(!GLOB.o2lvl)str+="</ul>\n";return str;};bbcjs.o2swap=function(nn)
{var node=document.getElementById("bbcjsnode_"+nn);if(node.style.display=="block")node.style.display="none";else node.style.display="block";return false;};bbcjs.HTMLOut=function(html)
{return"<xmp style='display:inline;'>"+html+"</xmp>";};bbcjs.trace=function(str,lvl)
{if(typeof(lvl)=="undefined")lvl=bbcjs.defaultTraceLevel;if(window.self!=window.top)
{if(typeof(window.top.harness)!="undefined")
{window.top.harness.trace.update(str,lvl);}
else if((typeof(window.top.frames.tools)!="undefined")&&typeof(window.top.frames.tools.jsh_debug)!="undefined")
{window.top.frames.tools.jsh_debug(str,lvl);}}
else if((!bbcjs.quietMode)&&(lvl==1)&&(location.href.match(/wc\.bbc/)))
{str=str.replace(/\<br ?\/?\>/g,"\n");str=str.replace(/\<[a-zA-Z0-9\=\"_\-\' \/]+\>/g,"");alert("JSTools error (this will not appear on live):\n\n"+str);}};bbcjs.clearTraceWindow=function()
{if(window.self!=window.top)
{if(typeof(window.top.harness)!="undefined")
{window.top.harness.trace.clear();}
else if((typeof(window.top.frames.tools)!="undefined")&&typeof(window.top.frames.tools.jsh_debug)!="undefined")
{window.top.frames.tools.jsh_reset();}}};bbcjs.clearTraceWindow();bbcjs.explore=function(object,name)
{if(window.self!=window.top)
{if(typeof(window.top.harness)!="undefined")
{window.top.harness.explorer.add(object,name);}}};bbcjs.Module=function(name,version,cvs_version,build_date)
{this.name=name;this.version=version;this.cvs_version=cvs_version;this.build_date=build_date;};bbcjs.trace("<b>Loaded url: "+bbcjs.page+"</b>",2);bbcjs.trace('<b><font color="green">jst_core.js</font> was included.</b>',2);