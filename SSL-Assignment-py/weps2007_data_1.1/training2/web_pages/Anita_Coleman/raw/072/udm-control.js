// UDMv4.2 //
/***************************************************************\

  ULTIMATE DROP DOWN MENU Version 4.2 by Brothercake
  http://www.udm4.com/

  This script may not be used or distributed without license

\***************************************************************/
var umTree=null;um.ready=0;um.pi=function(n){n=parseInt(n,10);return n;};um.un='undefined';um.m=document;um.gd=function(umD){return um.m.getElementById(umD);};um.xd=function(umD){umD.style.display='block';};um.xn=function(umD){umD.style.display='none';};um.xv=function(umD){umD.style.visibility='visible';};um.xh=function(umD){umD.style.visibility='hidden';};um.ne=function(umD){return umD.parentNode.className=='udm';};if(typeof um.reset==um.un){um.reset=['yes','yes','yes'];}if(typeof um.hstrip==um.un){um.hstrip=['none','yes'];}um.cx=['orientation','list','behaviors','navbar','items','menus','menuItems','menuClasses','itemClasses'];um.ei=0;um.e=[];um.v=[];um.w=[];um.vl=0;um.wl=0;um.ek=0;um.im=[];um.pcv=function(umE){if(umE&&/^[\-]?[0-9]+$/.test(umE)){umE=um.pi(umE);if((um.ei==10||um.ei==11)&&umE<1){umE=1;}}if(umE&&/\.(gif|png|mng|jpg|jpeg|bmp)/i.test(umE)){um.im[um.ek]=new Image;um.im[um.ek++].src=um.baseSRC+umE;}return umE;};var i=0;do{if(um.cx[i].indexOf('Classes')<0){um.cxl=um[um.cx[i]].length;var j=0;do{if(typeof um[um.cx[i]][j]!=um.un){um.pv=um.pcv(um[um.cx[i]][j]);um.e[um.ei]=um.pv;um.ei++;}j++;}while(j<um.cxl);}else{for(j in um[um.cx[i]]){um.cxl=um[um.cx[i]][j].length;var k=0;do{if(typeof um[um.cx[i]][j][k]!=um.un){um.pcv(um[um.cx[i]][j][k]);}k++;}while(k<um.cxl);if(um.cx[i]=='menuClasses'){um.v[j]=um[um.cx[i]][j];um.vl++;}else{um.w[j]=um[um.cx[i]][j];um.wl++;}}}i++;}while(i<9);um.d=(typeof um.m.getElementById!=um.un&&(typeof um.m.createElement!=um.un||typeof um.m.createElementNS!=um.un));um.u=navigator.userAgent.toLowerCase();um.o5=/opera[\/ ][56]/.test(um.u);um.k=(navigator.vendor=='KDE');if(um.o5||um.k){um.d=0;}um.b=(um.d||um.o5||um.k);if(um.e[9]=='yes'&&!(um.d||um.b)){document.write('<style type="text/css" media="screen">#udm ul{display:none;}</style>');}um.o7=(um.d&&typeof window.opera!=um.un);um.o73=0;um.o71=0;if(um.o7){um.ov=um.u;um.ov=um.ov.split(/opera[\/ ]7./);um.ov=um.pi(um.ov[1].charAt(0));um.o73=(um.ov>=3);um.o71=(um.ov<=1);}um.s=(navigator.vendor=='Apple Computer, Inc.'&&typeof um.m.childNodes!=um.un&&typeof um.m.all==um.un&&typeof navigator.taintEnabled==um.un);um.wie=(um.d&&typeof um.m.all!=um.un&&typeof window.opera==um.un);um.mie=(um.wie&&um.u.indexOf('mac')>0);um.mx=(um.u.indexOf('tasman 0.9')>0);if(um.mx){um.mie=1;}um.omie=0;if(um.mie){um.wie=0;um.iev=um.u;um.iev=um.iev.split('msie ');um.iev[1]=um.iev[1].split(';');um.iev=parseFloat(um.iev[1][0],10);um.omie=(um.iev<5.2);}um.ie=(um.wie||um.mie);um.wie5=(um.wie&&um.u.indexOf('msie 5')>0);um.wie55=(um.wie&&um.u.indexOf('msie 5.5')>0);um.wie50=(um.wie5&&!um.wie55);um.wie6=(um.wie&&um.u.indexOf('msie 6')>0);if(um.wie6){um.wie55=1;}um.q=(um.wie5||(um.mie&&!um.mx)||((um.mx||um.wie6||um.o7)&&um.m.compatMode!='CSS1Compat'));um.og=0;um.dg=0;if(um.u.indexOf('gecko')>0&&!um.s){um.sub=um.pi(navigator.productSub);um.og=(um.sub<20030312);um.dg=(um.sub<20010726);}um.kb=(typeof um.keys!=um.un&&!(um.mie||um.o7||um.s));um.sp=(typeof um.speech!=um.un&&um.wie);if(typeof um.speech!=um.un){um.e[12]='no';um.e[0]='vertical';}um.rp=(um.e[3]=='relative');if(um.mx||(um.wie50&&um.rp)){um.e[12]='no';}um.e[13]=(um.e[13]=='yes')?'default':(um.e[13]=='no')?'iframe':um.e[13];um.hz=((um.wie50&&um.e[13]=='default')||(um.wie&&um.e[13]=='hide'));um.p=(um.e[0]=='popup');i=4;do{if(parseFloat(um.e[i],10)<0){um.e[i]='0';}i++}while(i<6);if(um.p){um.va=['left','top','absolute','-2000px','-2000px'];i=0;do{um.e[i+1]=um.va[i];i++}while(i<5);um.e[14]=0;um.e[15]=0;}um.a=(um.e[1]=='right');um.h=(um.e[0]=='horizontal');um.rg=(um.h&&um.e[7]=='rigid');um.fe=false;if(um.e[3]=='allfixed'){um.e[3]='fixed';if(um.wie){um.fe=true;}}um.f=(um.e[3]=='fixed'&&!(um.ie||um.og));um.nc=(um.e[17]==0&&um.e[19]=='collapse');um.mc=(um.e[61]==0&&um.e[63]=='collapse');um.nm=((um.og&&um.rp) ||(um.omie&&um.h) );um.ns=(um.dg ||um.o71 ||(um.wie50&&um.rp) ||(um.o7&&um.f) ||um.mie );um.cns=(typeof um.m.createElementNS!=um.un);um.ss=(um.cns&&typeof um.m.styleSheets!=um.un&&!(um.s||um.k||um.mx));if(um.kb){i=0;do{um.keys[i]=um.pi(um.keys[i]);i++}while(i<5);if(um.keys[6]!='none'){um.keys[6]=um.pi(um.keys[6]);}else{um.keys[6]=-1;}}um.ni=/(gif|png|mng|jpg|jpeg|bmp)/i.test(um.e[45]);um.mi=/(gif|png|mng|jpg|jpeg|bmp)/i.test(um.e[89]);if(um.ni||um.mi){um.as=new Image;um.as.src=um.baseSRC+'udm-arrowShim.gif';}um.rn=0;um.rv=[];um.addReceiver=function(umFC,umEC){um.rv[um.rn++]=[umFC,umEC];};um.createElement=function(umE,umA){um.el=(um.cns)?um.m.createElementNS('http://www.w3.org/1999/xhtml',umE):um.m.createElement(umE);if(typeof umA!=um.un){for(var i in umA){switch(i){case 'text' :um.el.appendChild(um.m.createTextNode(umA[i]));break;case 'class' : um.el.className=umA[i];break;default : um.el.setAttribute(i,'');um.el[i]=umA[i];break;}}}return um.el;};