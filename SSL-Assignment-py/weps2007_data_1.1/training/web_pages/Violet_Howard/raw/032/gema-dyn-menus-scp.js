
var mainleftnav= [  // BEGIN FAMILY -- do not remove 
["ONLINE STORE","",1,"/store/gema-store.html",1,""],
["AUCTIONS","",1,"http://auctions.gomason.com/","",""],
["AUDIO/VIDEO","",1,"/multimedia/gema-multimedia.html","",""],
["CAMPS","",1,"/camps/gema-camps.html","",""],
["COMPLIANCE","",1,"/school-bio/gema-compliance.html","",""],
["FACILITIES","",1,"/facilities/gema-facilities.html","",""],
["LINKS","",1,"/links/gema-links.html","",""],
["PATRIOT CLUB","",1,"/boosters/gema-boosters.html","",""],
["PATRIOT PLATOON","",1,"/trads/gema-patriot-platoon.html","",""],
["REC SPORTS / IM","",1,"http://recsports.gmu.edu/","_blank",""],
["RECRUITING","",1,"/school-bio/gema-prospectives.html","",""],
["SCOREBOARD","",1,"/superscoreboard/","",""],
["SCHEDULES","",1,"/calendar/events/","",""],
["SITE MAP","",1,"/s-finder/gema-s-finder.html","",""],
["SPIRIT","",1,"/trads/gema-trads.html","",""],
["SPONSORSHIP","",1,"/tickets/gema-sponsorships.html","",""],
["STAFF DIRECTORY","",1,"/school-bio/gmu-staff-dir.html","",""],
["STUDENT ATHLETE <br>&nbsp;HANDBOOK (pdf)","",2,"http://www.fansonly.com/photos/schools/gema/genrel/auto_pdf/stud-ath-handbook.pdf","",""],
["SAAC INFORMATION","",2,"/school-bio/gema-saac-info.html","",""],
["TICKETS","",1,"/tickets/gema-tickets.html","",""],
["UNIVERSITY","",1,"/school-bio/gema-school-bio.html","",""],
["VISIT GEORGE <br>&nbsp;MASON","",2,"/travel/gema-travel.html","",""],
["WIRELESS","",1,"/wireless/","",""]
] // END OF FAMILY -- do not remove


var timerid=0;
dcount=0;
rundisplay=[];
bcount=0;
blindit=[];
function addimg(imgname,wide,hi,alt){
imgObj = "<img src=\"http://graphics.fansonly.com/"+imgname+"\" width="+wide+" height="+hi+" alt=\""+alt+"\" border=0>";
return imgObj;
}
function navbuilder(par,name,ary,cssfam,w,h,brdr,off,on,spc){
//************* special case for afa
//spc = (NS4) ? 1 : spc;
divline='<img src="http://graphics.fansonly.com/graphics/spacer.gif" width='+w+' height=1 border=0>';
spaceline= (spc > 0) ? '<br><img src="http://graphics.fansonly.com/graphics/spacer.gif" width=1 height='+spc+' border=0>':'';
var build = "";
 
var divtype = (NS4) ? "span" : "div";
var brtype = (NS4) ? "<br>" : "";
var parO= '<'+divtype;
var parC= '</'+divtype+'>';
var aryname= eval(ary).reverse();
var hspac =parseInt(spc);
var j =eval(ary).length-1;
var i=0;
do{
var moff = 'onMouseOver=\'showObj("'+name+'_'+i+'_roll_on","'+par+'.document.'+name+'_'+i+'");Timeclr(parseInt(timerid))\' onMouseOut=\'hideObj("'+name+'_'+i+'_roll_on","'+par+'.document.'+name+'_'+i+'");Timeout("'+par+'",250,parseInt(timerid));\'';
var loc_moff = moff;
var popthis = 'onmouseover=\'timerid=0;Timeclr(parseInt(timerid));blind();origin("'+aryname[j][5]+'","'+name+'_'+i+'",'+(w+2)+','+(h-h)+');showObj("'+aryname[j][5]+'");showObj("'+name+'_'+i+'_roll_on","'+name+'_'+i+'")\' onmouseout=\'Timeout("'+aryname[j][5]+'",250,parseInt(timerid));hideObj("'+name+'_'+i+'_roll_on","'+name+'_'+i+'")\'';//used to pop layer and roll layer
if (aryname[j][5] != ""){
loc_moff = popthis;
}else if(par=="window"){
loc_moff = 'onMouseOver="showObj(\''+name+'_'+i+'_roll_on\',\''+name+'_'+i+'\')" onMouseOut="hideObj(\''+name+'_'+i+'_roll_on\',\''+name+'_'+i+'\')"';
}
var urltarg = (aryname[j][4] == "")? "" : "target=\"_new\"";
var parname=' id="'+name+'_'+i;
var onname=' id="'+name+'_'+i+'_roll_on';
var lidname=' id="'+name+'_'+i+'_roll';
var linename=' id="'+name+'_'+i+'_roll_line';
var ontext = (aryname[j][1] == "") ? aryname[j][0]: aryname[j][1];
var bObj= parO+parname+'" class="'+cssfam+'obj">&nbsp;'+aryname[j][0]+spaceline;
bObj+=parO+onname+'" class="'+cssfam+'roll">&nbsp;'+ontext+spaceline+parC;
bObj+=parO+linename+'" class="'+cssfam+'line">'+divline+parC;
bObj+=parO+lidname+'" class="'+cssfam+'lid"><a href="'+aryname[j][3]+'" '+urltarg+loc_moff+'>'+addimg('graphics/spacer.gif',w,(h+hspac)*aryname[j][2],'')+'</a>'+parC;
bObj+=parC+brtype;
build+=bObj;
i++;
}while(j--);
addnav(par,build,w,brdr);
rundisplay[dcount] = par+","+name+","+ary+","+w+","+h+","+brdr+","+off+","+on+","+spc;
dcount++;
if(par != "window"){
blindit[bcount]= par;
bcount++;
}
}
function blind(){
var j=blindit.length-1;
do{hideObj(blindit[j]);}while(j--);
} // END FUNC
function nsevt(par,name,ary,width,height,brdr,off,on,spc){
var j =eval(ary).length-1;
var aryname= eval(ary).reverse();

do{
if(NS4){
var	lpar = (par=="window")? "" : par+".document.";
var evtObjRon = browser(name+"_"+j+"_roll_on",lpar+name+"_"+j);//the second text layer
evtObjRon.bgColor= on;
evtObjRon.clip.width= width;
if(par!="window"){
evtObjRon.parentLayer.parentLayer.bgColor= off;
}
var evtline = browser(name+"_"+j+"_roll_line",lpar+name+"_"+j);//the spacer layer
evtline.bgColor= (brdr=="")? off: brdr;
var evtObj = browser(name+"_"+j+"_roll",lpar+name+"_"+j);//the spacer layer
evtObj.clip.width= width;
evtObj.parentLayer.bgColor= off;
evtObj.parentLayer.clip.width= width;
evtObj.parentLayer.clip.height= (parseInt(height)+parseInt(spc))*aryname[j][2]+2;
evtObj.parentLayer.visibility= 'inherit';
}else{
var evtline = browser(name+"_"+j+"_roll_line");
evtline.style.backgroundColor = (brdr=="")? off: brdr;
var evtObj = browser(name+"_"+j+"_roll_on");
evtObj.style.backgroundColor = on;
evtObj.style.width = width;
var evtObjPar = browser(name+"_"+j);
evtObjPar.style.width = width;
evtObjPar.style.backgroundColor = off;
evtObjPar.style.visibility = 'inherit';
if(par!="window"){
var evtObjParPar = browser(par);
evtObjParPar.style.backgroundColor = off;
}
}// END IF
}while(j--);//END DO WHILE
}
function addnav(par,name,w,brdr){
var parObj =((NS4)&&(par!="window"))? eval("document."+par+".document"): document;
var endline = (brdr =="")?"":"<table width="+w+" bgcolor=\""+brdr+"\" cellpadding=0 cellspacing=0 border=0><tr><td width="+w+">"+addimg('graphics/spacer.gif',w,1,'')+"</td></tr></table>";
parObj.open();
parObj.write(name+endline);
parObj.close();
} // END FUNC
////////////////// INITIALIZE ACTIVITIES ////////////////////
function makeitso(){
var i=rundisplay.length-1;
do{
txtobj = rundisplay[i].split(",");
nsevt(txtobj[0],txtobj[1],txtobj[2],txtobj[3],txtobj[4],txtobj[5],txtobj[6],txtobj[7],txtobj[8]);
}while(i--);
}// END FUNC

if (NS4) {
origWidth = innerWidth;
origHeight = innerHeight;
}
function reDo() {
if (innerWidth != origWidth || innerHeight != origHeight) 
location.reload();
}
if (NS4) window.onresize = reDo;
