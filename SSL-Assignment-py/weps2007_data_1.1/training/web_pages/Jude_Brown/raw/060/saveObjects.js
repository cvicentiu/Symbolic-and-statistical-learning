
/*
 $Header: /usr/home/giro1150/cvsroot/codebase/Includes/js/saveObjects.js,v 1.2 2004/08/04 15:00:53 giro1150 Exp $
*/

var initMessage="<div style='padding: 10px;'>Use the&nbsp;&nbsp;<img border=0 alt='[button image]' align=absmiddle src=\"/images/icon/addtolist-top.gif\">&nbsp;&nbsp;button<br>to store up to 10 villas here.</div>";
var viaObjectList=new Array();

var tools="<div id=\"ss_options\"><a href=\"javascript:void(0)\" onclick=\"clearList();\">Clear all</a></div>";

function viaObject(objectData) {
   objectInfo=objectData.split("::");
   this.objectId=objectInfo[0];
   this.objectType=objectInfo[1];
   this.display=objectInfo[2];
   this.image=objectInfo[3];
}

function shiftviaObjectList() {
 	l=viaObjectList.length;
 	for (i=l;i>0;i--)
   		viaObjectList[i]=viaObjectList[i-1];
}

function getObject(objectId, objectType){
	for(i=0;i<viaObjectList.length;i++){
		if (viaObjectList[i].objectId==objectId && viaObjectList[i].objectType==objectType)
		obj=viaObjectList[i];
	}
	return obj;
}

function delObject(objectId, objectType){
	obj=getObject(objectId, objectType);
	obj.read=true;
	clearRead();
}

function addObject(objectId, objectType, display, image) {
  if ((l=viaObjectList.length)==10)
  {
     alert("Only 10 items may be saved. To save a new item, please remove one from your list.");
     return;
  }

  inlist=false;
  
  if (l)
    for (i=0;i<l;i++)
      if (viaObjectList[i].objectId==objectId && viaObjectList[i].objectType==objectType)
	{
	  inlist=true;
	  break;
	}
  
  if (!(inlist))
    {
      objectData=objectId+"::"+objectType+"::"+display+"::"+image;
	  combinedObjectId=objectId+objectType;

      shiftviaObjectList();
      viaObjectList[0]=new viaObject(objectData);

      setCookieList();
      changeList();
      swapSaveGif(combinedObjectId,'saved');
    }
}

// Initialize menu
function startupSaved() {  //checks for mysavedstories cookie and tells document bacground to watch for clicks
  document.onclick=checkMenu;
  readCookieList();
  //checkForSavedImages();
}

function checkForSavedImages(){
	for(i=0;i<viaObjectList.length;i++){
		
		swapSaveGif(combinedObjectId,'saved');
	}
}

//Cookie Management
function getSSCookie() {
  var dc = document.cookie;
  var prefix = "viaobjects=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

function readCookieList() {
   if (cookstring=getSSCookie())
   {
      storyList=cookstring.split("**");
      for (i=0;i<storyList.length;i++)
	  {
	    viaObjectList[i]=new viaObject(storyList[i]);
	    if (document.getElementById('add'+viaObjectList[i].objectId+viaObjectList[i].objectType)){
			combinedObjectId=viaObjectList[i].objectId+viaObjectList[i].objectType;
	       swapSaveGif(combinedObjectId,'saved');
		}
	  }
      changeList();
   }
   else document.getElementById("ss_headlines").innerHTML=initMessage;
}

function setCookieList() {

   l=viaObjectList.length;
   cookstring='';
   for (i=0;i<l;i++)
   {
     if (i>0) cookstring+="**";
     cookstring+=viaObjectList[i].objectId+"::"+viaObjectList[i].objectType+"::"+viaObjectList[i].display+"::"+viaObjectList[i].image; 
   }
   var expdate = new Date();
   expdate.setTime(expdate.getTime()+31536000000);
   document.cookie="viaobjects="+escape(cookstring)+"; expires="+expdate.toGMTString()+"; path=/;";
}

// Image management
function swapSaveGif(combinedObjectId,state) {
  gifID="add"+combinedObjectId;
  if (!(savedImg=document.getElementById(gifID)))
     return;

  if ( savedImg.width==80 )
  {
     if (state=="saved")
        savedImg.src="/images/icon/inlist.gif";
     else if (state=="save")
        savedImg.src="/images/icon/addtolist.gif";
  }

  else
  {
     if (state=="saved")
        savedImg.src="/images/btn_inlist.gif";
     else if (state=="save")
        savedImg.src="/images/btn_addtolist.gif";
  }
  
}


// Menu management


function buildPullDown() {

  l=viaObjectList.length;
  viaObjectHTML="";
  
  for (i=0;i<l;i++)
  {
   oId=viaObjectList[i].objectId;     
   oType=viaObjectList[i].objectType;
   qString="/ENJOY/property/"+oId+"/?src=mylist";
   viaObjectHTML+="<table width=\"200\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">"
   		+"<tr><td align=left>"
  		+"<table onMouseover=\"this.style.backgroundColor='white';\" onMouseout=\"this.style.backgroundColor='#efefef';\" width=200 cellspacing=0 cellpadding=0>"
		+	"<tr><td>"
		+	"<a href=\"javascript:location.href='" + qString + "'\"><img class=thumb width=50 src="+viaObjectList[i].image+"></a></td>"
		+	"<td width=125 class=text align=left><a href=\"javascript:location.href='" + qString+ "'\">"+viaObjectList[i].display+"</a></td><td width=25 align=center>"
		+	"<a href=javascript:delObject("+oId+","+oType+");><img border=0 src=/images/icon/trash.jpg></a></td></tr>"
		+	"</table>"
		+"</td></tr></table>";
  }
  viaObjectHTML+=tools;
  return viaObjectHTML;
}

function changeNums() {
   l=viaObjectList.length;
   //document.getElementById('ss_count').innerHTML=l;
}

function changeList() {
  p=document.getElementById("ss_headlines");
  p.innerHTML=(viaObjectList.length)?buildPullDown():"<span class=\"mla\"><table width=\"100%\" cellpadding=3 cellspacing=0 border=0><tr valign=\"top\"></tr><td class=\"mla\">"+initMessage+"</td></tr></table></p><div align=\"right\"><a href=\"javascript:void(0)\">Close</a></span></span>";
  changeNums();
}

function clearList() {
   for (i=0;i<viaObjectList.length;i++){
		combinedObjectId=viaObjectList[i].objectId+viaObjectList[i].objectType;
		swapSaveGif(combinedObjectId,'save');
   }
   document.cookie="viaobjects=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/;";
   viaObjectList=new Array();
   changeNums();
   document.getElementById("ss_headlines").innerHTML=initMessage;
}

function clearRead() {
   newStoryList=new Array();
   for (i=0;i<viaObjectList.length;i++)
   {
     if (!(viaObjectList[i].read))
        newStoryList[newStoryList.length]=viaObjectList[i];
     else{
	 	combinedObjectId=viaObjectList[i].objectId+viaObjectList[i].objectType;
        swapSaveGif(combinedObjectId,'save');
	 }
   }
   viaObjectList=newStoryList;
   changeList();
   setCookieList();
}

function readThis(storyid) {
  for (i=0;i<viaObjectList.length;i++)
    if (viaObjectList[i].objectId==storyid)
    {
       viaObjectList[i].read=true;
       break;
    }
  setCookieList();
}

// Menu Show/Hide Functions
var openMenu=null;
    // variable to determine which pulldown is open - needed for closing menus by clicking on background

function toggleSS(which) {

   obj=document.getElementById(which).style.visibility;
   if ((obj=="hidden") || (obj==""))
      { showSS(which); }
   else { hideSS(which); }
}

function hideSS(which) {
   document.getElementById(which).style.visibility="hidden";
   openMenu=null;
}

function showSS(which) {
   document.getElementById(which).style.visibility="visible";
   // document.getElementById(which).style.zIndex=3000; 
   //	alert('changed to 3000');
   openMenu=which;
}

function checkMenu() {
  if (openMenu != null)
     hideSS(openMenu);
}

