function closeTips(theDiv)
{
	layeroff(getlayer(theDiv))
	SetCookie('show_' + theDiv, 'N');
}

function 	checkTips(theDiv)
{
	if (GetCookie('show_' + theDiv) == 'N')
		{layeroff(getlayer('note_future'))}
}

function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

//div switching
var agt = navigator.userAgent.toLowerCase();
var isNN = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1) &&
(agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1) &&
(agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1)); var isMajor = parseInt(navigator.appVersion); var isMinor = parseFloat(navigator.appVersion); var isNN4 = (isNN && (isMajor <= 4)); var isNN6up = (isNN && (isMajor >= 5)); var isIE = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));

function getlayer(layername) {
if (document.layers)
{var theLayer=document.layers[layername]}
else
{
	if (document.getElementById)
	{var theLayer=document.getElementById(layername)}
	else if(document.all)
	{var theLayer=document.all[layername]}
}
return theLayer;
}

function layeron(slayer) {
if(slayer)
	{
	if(slayer.style)
	{
    	slayer.style.visibility="visible"
		slayer.style.display="inline"
	}
	else if(slayer.visibility)
	{slayer.visibility="visible"}
}
}

function layeroff(slayer) {
if(slayer)
{
	if(slayer.style)
	{
		slayer.style.visibility="hidden"
		slayer.style.display="none"
	}
	else if(slayer.visibility)
	{slayer.visibility="hide"}
}
}

function getlayerdisplay(thelayer) {
   if (isNN4) {
      return (thelayer.display)
   } else {
      return thelayer.style.display
   }
}

function getlayervisibility(thelayer) {
   if (isNN4) {
      var vis = (thelayer.visibility=="hide") ? "hidden" : "visible"
   } else {
      var vis = thelayer.style.visibility
   }
   return vis
}

function layerdisplayon(slayer) {
   layeron(slayer);
}

function layerdisplayoff(slayer) {
   layeroff(slayer);
}

function changeLayer(theLayer)
{
   if (getlayervisibility(theLayer) == 'hidden')

   {
      layerdisplayon(theLayer);
   }
   else
   {
      layerdisplayoff(theLayer);
   }
}

function changeLayerOn(theLayer)
{
      layerdisplayon(theLayer);
}

function changeLayerOff(theLayer)
{
      layerdisplayoff(theLayer);
}

//enter submits forms
function submitter(f) {
	var key;
	if (document.all) {
		e = window.event;
		key = e.keyCode;
		if (key==13) {
			document.forms(f).submit();
			e.returnValue = false;
		}
	}
	if (document.layers) {
	   key = e.which;
	   if (key==13) {
	    document.forms[f].submit();
	   }
	  }
}

//search
var varSrchString = 'Type place here';
var varAllSrchStrings = new Array();
varAllSrchStrings[0] = 'Type your school name here'
varAllSrchStrings[1] = 'Type your division/base here'
varAllSrchStrings[2] = 'Type your college name here'
varAllSrchStrings[3] = 'Type your street name here'
varAllSrchStrings[4] = 'Type your pub name here'
varAllSrchStrings[5] = 'Type your team name here'
varAllSrchStrings[6] = 'Type your work name here'
varAllSrchStrings[7] = 'Type place here';

function flipFields()
{
	var nameCat = document.namesearch.category.value;
	var nameSrch = document.namesearch.search;

	if (nameCat=='name')
		{changeLayerOn(getlayer('twofields'));
		changeLayerOff(getlayer('onefield'));
		changeLayerOff(getlayer('inactive'))}
	else if (nameCat==-1)
		{changeLayerOff(getlayer('onefield'));
		changeLayerOff(getlayer('twofields'));
		changeLayerOn(getlayer('inactive'))}
	else
		{changeLayerOn(getlayer('onefield'));
		changeLayerOff(getlayer('twofields'));
		changeLayerOff(getlayer('inactive'))}

	if (nameCat=='schools')
		{
		if (nameSrch.value==varAllSrchStrings[0] || nameSrch.value==varAllSrchStrings[1] || nameSrch.value==varAllSrchStrings[2] || nameSrch.value==varAllSrchStrings[3] || nameSrch.value==varAllSrchStrings[4] || nameSrch.value==varAllSrchStrings[5] || nameSrch.value==varAllSrchStrings[6] || nameSrch.value==varAllSrchStrings[7] || nameSrch.value=='')
			{nameSrch.value=varAllSrchStrings[0];}
		varSrchString=varAllSrchStrings[0];}
	else if (nameCat=='army')
		{
		if (nameSrch.value==varAllSrchStrings[0] || nameSrch.value==varAllSrchStrings[1] || nameSrch.value==varAllSrchStrings[2] || nameSrch.value==varAllSrchStrings[3] || nameSrch.value==varAllSrchStrings[4] || nameSrch.value==varAllSrchStrings[5] || nameSrch.value==varAllSrchStrings[6] || nameSrch.value==varAllSrchStrings[7] || nameSrch.value=='')
			{nameSrch.value=varAllSrchStrings[1];}
		varSrchString=varAllSrchStrings[1];}
	else if (nameCat=='college')
		{
		if (nameSrch.value==varAllSrchStrings[0] || nameSrch.value==varAllSrchStrings[1] || nameSrch.value==varAllSrchStrings[2] || nameSrch.value==varAllSrchStrings[3] || nameSrch.value==varAllSrchStrings[4] || nameSrch.value==varAllSrchStrings[5] || nameSrch.value==varAllSrchStrings[6] || nameSrch.value==varAllSrchStrings[7] || nameSrch.value=='')
			{nameSrch.value=varAllSrchStrings[2];}
		varSrchString=varAllSrchStrings[2];}
	else if (nameCat=='streets')
		{
		if (nameSrch.value==varAllSrchStrings[0] || nameSrch.value==varAllSrchStrings[1] || nameSrch.value==varAllSrchStrings[2] || nameSrch.value==varAllSrchStrings[3] || nameSrch.value==varAllSrchStrings[4] || nameSrch.value==varAllSrchStrings[5] || nameSrch.value==varAllSrchStrings[6] || nameSrch.value==varAllSrchStrings[7] || nameSrch.value=='')
			{nameSrch.value=varAllSrchStrings[3];}
		varSrchString=varAllSrchStrings[3];}
	else if (nameCat=='pubs')
		{
		if (nameSrch.value==varAllSrchStrings[0] || nameSrch.value==varAllSrchStrings[1] || nameSrch.value==varAllSrchStrings[2] || nameSrch.value==varAllSrchStrings[3] || nameSrch.value==varAllSrchStrings[4] || nameSrch.value==varAllSrchStrings[5] || nameSrch.value==varAllSrchStrings[6] || nameSrch.value==varAllSrchStrings[7] || nameSrch.value=='')
			{nameSrch.value=varAllSrchStrings[4];}
		varSrchString=varAllSrchStrings[4];}
	else if (nameCat=='team')
		{
		if (nameSrch.value==varAllSrchStrings[0] || nameSrch.value==varAllSrchStrings[1] || nameSrch.value==varAllSrchStrings[2] || nameSrch.value==varAllSrchStrings[3] || nameSrch.value==varAllSrchStrings[4] || nameSrch.value==varAllSrchStrings[5] || nameSrch.value==varAllSrchStrings[6] || nameSrch.value==varAllSrchStrings[7] || nameSrch.value=='')
			{nameSrch.value=varAllSrchStrings[5];}
		varSrchString=varAllSrchStrings[5];}
	else if (nameCat=='work')
		{
		if (nameSrch.value==varAllSrchStrings[0] || nameSrch.value==varAllSrchStrings[1] || nameSrch.value==varAllSrchStrings[2] || nameSrch.value==varAllSrchStrings[3] || nameSrch.value==varAllSrchStrings[4] || nameSrch.value==varAllSrchStrings[5] || nameSrch.value==varAllSrchStrings[6] || nameSrch.value==varAllSrchStrings[7] || nameSrch.value=='')
			{nameSrch.value=varAllSrchStrings[6];}
		varSrchString=varAllSrchStrings[6];}
	else
		{
		if (nameSrch.value==varAllSrchStrings[0] || nameSrch.value==varAllSrchStrings[1] || nameSrch.value==varAllSrchStrings[2] || nameSrch.value==varAllSrchStrings[3] || nameSrch.value==varAllSrchStrings[4] || nameSrch.value==varAllSrchStrings[5] || nameSrch.value==varAllSrchStrings[6] || nameSrch.value==varAllSrchStrings[7] || nameSrch.value=='')
			{nameSrch.value=varAllSrchStrings[7];}
		varSrchString=varAllSrchStrings[7];}
}

//top search
function checkSrchVal()
{
	if (document.namesearch.search.value==varSrchString)
		{document.namesearch.search.value=''}
	if (document.namesearch.search.value=='surname')
		{alert('No')}
}

function submitNameSearch() {
	var nameSrch = document.namesearch.search;

		if (document.namesearch.search_forename.value !='Forename' && document.namesearch.search_forename.value !='') {
			if (document.namesearch.search.value !='Surname' && document.namesearch.search.value !='') {
			return true;
			} else {
			alert('Please fill in a surname');
				return false;
			}
		} else {
			alert('Please fill in a forename');
			return false;
		}

}

function selectAllBox(formname){
	for (var i=0;i<formname.elements.length;i++) {
		var e = formname.elements[i];
		if (e.name.substring(0,3)=='del') {
			if (e.checked==false) {
				e.checked=true;
			} else {
				e.checked=false;
			}
		}
	}
}

//bookmark
if(typeof FRsite != 'undefined'){
	switch (FRsite)
	{
	case 'UK':
		var bmtitle="Friends Reunited"
		var bmurl="http://www.friendsreunited.co.uk";
		break;
	case 'NZ':
		var bmtitle="Find A Kiwi - Friends Reunited"
		var bmurl="http://www.findakiwi.co.nz";
		break;
	case 'SA':
		var bmtitle="Friends Reunited"
		var bmurl="http://www.friendsreunited.com/sa";
		break;
	case 'AU':
		var bmtitle="Friends Reunited"
		var bmurl="http://www.friendsreunited.com.au";
		break;
	case 'AS':
		var bmtitle="Friends Reunited"
		var bmurl="http://www.friendsreunitedAsia.com";
		break;
	default:
		var bmtitle="Friends Reunited"
		var bmurl="http://www.friendsreunited.co.uk";
		break;
	}
}

function addbookmark(){
if (document.all)
window.external.AddFavorite(bmurl,bmtitle)
}

var loadad = false;

var isSmall = false;
//	if ((window.screen.width<=800) && (window.screen.height<=600)){
//		isSmall = true;
//	}

var tooBig = false;

var halfMeg = 524288;
var oneMeg = 1048576;
var twoMeg = 2097152;

function checkSize(sFilename)
{
	tooBig = false;
	var img = new Image(); //Create a temporary image
	img.src = "file:///" + sFilename;

	var startLoad = new Date(); //store when we start loading the temp image
	var endLoad = new Date(); //store when we finish loading the temp image
	
	if (img.fileSize == -1){
		return true;
	}
	do //wait until the image is loaded or we timeout...
		{endLoad = new Date();}
	while (img.fileSize == -1 && (endLoad.getTime() - startLoad.getTime()) / 1000 < 10) //Timeout after 10 seconds

	if (img.fileSize)
	{
		if (img.fileSize > 0) //check the size and that the image has loaded properly
		{
			if (img.fileSize > oneMeg)
				{tooBig = true;}
		}
		else //timed out - proabably due to image being WAY too big, but could be a corrupt image.
			{tooBig = true;}
	}
	
	if (tooBig)
		{return false;}
	else
		{return true;}
}



//rollover rotating image
function getlayer(layername) {
	if (document.layers) {
		var theLayer=document.layers[layername]
	} else {
		if (document.getElementById) {
			var theLayer=document.getElementById(layername)
		} else {
			var theLayer=document.all[layername]
		}
	};

	return theLayer;

}
function layeron(slayer) {
	if(slayer){
		if (document.layers) {
			slayer.visibility="visible"
		} else {
			slayer.style.visibility="visible"
			slayer.style.display="inline"
		}
	}
}

function layeroff(slayer) {
	if(slayer){
		if (document.layers) {
			slayer.visibility="hide"
		} else {
				slayer.style.visibility="hidden";
				slayer.style.display="none"
		}
	}
}
function addLoadEvent(func){
	/* appends a function to the onload event */
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
