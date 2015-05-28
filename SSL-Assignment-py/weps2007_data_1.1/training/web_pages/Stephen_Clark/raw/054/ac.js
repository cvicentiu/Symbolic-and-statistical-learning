function addBookmark(title,url) {
	if (window.sidebar) { 
		window.sidebar.addPanel(title, url,""); 
	} else if( document.all ) {
		window.external.AddFavorite( url, title);
	} else if( window.opera && window.print ) {
	return true;
	}
}


/*NEW HEADER JS*/
 var formblock;		// will hold the seach_box_form reference handle
 var forminputs; 	// will hold the collection of checkbox input tags
 
//create our native trim handler since jscript does not have a built in one.  Same proto used in the migration.
String.prototype.trim = function() {
	str = this.replace(/^\s+/, '');
	return str.replace(/\s+$/, '');
};

 function prepare() {
 // prepares two key variables to be used later....see setSearch() 
    formblock= document.getElementById('search_box_form'); 
    forminputs = formblock.getElementsByTagName('input');
   }

   function setSearch(name, val) {  

   	var isAll = 0;
   	var numChecked = 0;
   	for (i = 0; i < forminputs.length; i++) { 
   	   /** regex here to check name attribute 
   	       the addition of square brackets causes trouble with JavaScript, especially with a "Select All" function.
   	       This script works around that using regular expressions
   	    **/
   	   var regex = new RegExp(name, "i"); 
   	   if (regex.test(forminputs[i].getAttribute('name'))) {    
   	   	  if ( forminputs[i].checked == true ) {
   	   	  	numChecked++;
   	   	  	if ( forminputs[i].value != 'all' ) {
	   	   	 } else if ( forminputs[i].value == 'all' ) {
	   	   	 	isAll = 1;					   	   	  	
	   	   	 }	   	   	 
   	   	  }
   	   } 
       } //end for
	   if ( isAll == 1 && numChecked > 1 && val=='all') {
		//if all type is selected make sure to turn-off the other types
		for ( x=1; x<forminputs.length; x++ ) {
			forminputs[x].checked = false;
		}
	   } else if ( val != 'all' ) {
		forminputs[0].checked = false;
	   }
  }//function setSearch
  
  function changeQueryStr() {

  //responsible for managing/concatenating the query string.  It is invoked when the onSubmit event is fired in the forms 'q' input tag.  It does 2 things:
  /*** 
  	1. check if 'all' is selected, if yes, then it builds the qstring like so: inurl:Video Or inurl:Audio ... search string
       2 . if all is not selected, it traverse the checkbox array and concatenate the qstring accordingly
  ***/
  	var q="inurl:";
  	var numChecked = 0;
 	 
	for (i = 0; i < forminputs.length; i++) { 
   	   // regex here to check name attribute 
   	   var regex = new RegExp(name, "i"); 
   	   if (regex.test(forminputs[i].getAttribute('name'))) {    
   	   	  if ( forminputs[i].checked == true ) {   	   	  	
   	   	  	if ( forminputs[i].value == 'all' ) {
   	   	  		//q='inurl:Video OR inurl:Audio OR inurl:Article OR inurl:Image ';
   	   	  		q='';
   	   	  	} else {
   	   	  		if ( numChecked > 0 ) {
   	   	  			q=q+" OR inurl:"+forminputs[i].value;
   	   	  		} else {
   	   	  			q=q+forminputs[i].value;
   	   	  		}
   	   	  		
   	   	  	}
   	   	     numChecked++;
   	   	  }
   	   } 
   	   
   	}
   	q = q+' '+document.forms['search_box_form'].q.value;		//now append the actual search string
   	if ( document.forms['search_box_form'].q.value.trim() == '' ) {
   		//empty for now, maybe an alert box?
   	} else {
  		document.forms['search_box_form'].q.value = q;
  	}
  }
    
   if (window.addEventListener) {	//here we register the search box form and its corresponding id upon successfully/completed load
     window.addEventListener("load", prepare, false);
    } else if (window.attachEvent) { 
    	 window.attachEvent("onload", prepare)
      } else if (document.getElementById) {  
      	window.onload = prepare;
   }
/*END NEW HEADER JS*/	
	
/////////////////////////////////////////
//NEW POP HELP JS (MOUSEOVER INFO BOX JS)

var offsetfromcursorX=12 //Customize x offset of tooltip
var offsetfromcursorY=10 //Customize y offset of tooltip

var offsetdivfrompointerX=10 //Customize x offset of tooltip DIV relative to pointer image
var offsetdivfrompointerY=14 //Customize y offset of tooltip DIV relative to pointer image. Tip: Set it to (height_of_pointer_image-1).

document.write('<div id="dhtmltooltip"></div>') //write out tooltip DIV
document.write('<img id="dhtmlpointer" src="images/arrow2.gif">') //write out pointer image

var ie=document.all
var ns6=document.getElementById && !document.all
var enabletip=false
if (ie||ns6)
var tipobj=document.all? document.all["dhtmltooltip"] : document.getElementById? document.getElementById("dhtmltooltip") : ""

var pointerobj=document.all? document.all["dhtmlpointer"] : document.getElementById? document.getElementById("dhtmlpointer") : ""

function ietruebody(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function ddrivetip(thetext, thewidth, thecolor){
if (ns6||ie){
if (typeof thewidth!="undefined") tipobj.style.width=thewidth+"px"
if (typeof thecolor!="undefined" && thecolor!="") tipobj.style.backgroundColor=thecolor
tipobj.innerHTML=thetext
enabletip=true
return false
}
}

function positiontip(e){
if (enabletip){
var nondefaultpos=false
var curX=(ns6)?e.pageX : event.clientX+ietruebody().scrollLeft;
var curY=(ns6)?e.pageY : event.clientY+ietruebody().scrollTop;
//Find out how close the mouse is to the corner of the window
var winwidth=ie&&!window.opera? ietruebody().clientWidth : window.innerWidth-20
var winheight=ie&&!window.opera? ietruebody().clientHeight : window.innerHeight-20

var rightedge=ie&&!window.opera? winwidth-event.clientX-offsetfromcursorX : winwidth-e.clientX-offsetfromcursorX
var bottomedge=ie&&!window.opera? winheight-event.clientY-offsetfromcursorY : winheight-e.clientY-offsetfromcursorY

var leftedge=(offsetfromcursorX<0)? offsetfromcursorX*(-1) : -1000

//if the horizontal distance isn't enough to accomodate the width of the context menu
if (rightedge<tipobj.offsetWidth){
//move the horizontal position of the menu to the left by it's width
tipobj.style.left=curX-tipobj.offsetWidth+"px"
nondefaultpos=true
}
else if (curX<leftedge)
tipobj.style.left="5px"
else{
//position the horizontal position of the menu where the mouse is positioned
tipobj.style.left=curX+offsetfromcursorX-offsetdivfrompointerX+"px"
pointerobj.style.left=curX+offsetfromcursorX+"px"
}

//same concept with the vertical position
if (bottomedge<tipobj.offsetHeight){
tipobj.style.top=curY-tipobj.offsetHeight-offsetfromcursorY+"px"
nondefaultpos=true
}
else{
tipobj.style.top=curY+offsetfromcursorY+offsetdivfrompointerY+"px"
pointerobj.style.top=curY+offsetfromcursorY+"px"
}
tipobj.style.visibility="visible"
if (!nondefaultpos)
pointerobj.style.visibility="visible"
else
pointerobj.style.visibility="hidden"
}
}

function hideddrivetip(){
if (ns6||ie){
enabletip=false
tipobj.style.visibility="hidden"
pointerobj.style.visibility="hidden"
tipobj.style.left="-1000px"
tipobj.style.backgroundColor=''
tipobj.style.width=''
}
}

document.onmousemove=positiontip

// END NEW POP HELP JS (MOUSEOVER INFO BOX JS)
/////////////////////////////////////////////





function pop_help (url) {
	window.open(url,'ac_help','height=400,width=300,left=100, top=100,resizable=yes,scrollbars=yes,toolbar=no,status=no');
}

function check_login(form) {
	if (document.login_form.user_name.value=="") {
		alert("The email address field is required.");
		document.login_form.user_name.focus();
		return false;
	}
	
	if (document.login_form.user_pass.value=="") {
	    alert("The password field is required.");
		document.login_form.user_pass.focus();
		return false;
	}
	
	return true;
} 
/*end function check_login(form)*/
			 
/*Function for clearing login form values (Firefox)*/
function clearfields() {
	document.login_form.user_name.value=""; 
	document.login_form.user_pass.value=""; 
}    

/*Function for switching divs from hidden to visible and visa versa*/
function changeDiv(the_div,the_change)
{
  var the_style = getStyleObject(the_div);
  if (the_style != false)
  {
    the_style.display = the_change;
  }
}

function hideAll()
{
  changeDiv("interests_2_hed","none");
  changeDiv("interests_2","none");
}

function getStyleObject(objectId) {
  if (document.getElementById && document.getElementById(objectId)) {
    return document.getElementById(objectId).style;
  } else if (document.all && document.all(objectId)) {
    return document.all(objectId).style;
  } else {
    return false;
  }
}

   

/* BEGIN AJAX CONTENT SWAPPING SCRIPT */
var loadedobjects=""
var rootdomain="http://"+window.location.hostname

function ajaxpage(url, containerid){
var page_request = false
if (window.XMLHttpRequest) // if Mozilla, Safari etc
page_request = new XMLHttpRequest()
else if (window.ActiveXObject){ // if IE
try {
page_request = new ActiveXObject("Msxml2.XMLHTTP")
} 
catch (e){
try{
page_request = new ActiveXObject("Microsoft.XMLHTTP")
}
catch (e){}
}
}
else
return false
page_request.onreadystatechange=function(){
loadpage(page_request, containerid)
}
page_request.open('GET', url, true)
page_request.send(null)
}

function loadpage(page_request, containerid){
if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1))
document.getElementById(containerid).innerHTML=page_request.responseText
}

function loadobjs(){
if (!document.getElementById)
return
for (i=0; i<arguments.length; i++){
var file=arguments[i]
var fileref=""
if (loadedobjects.indexOf(file)==-1){ //Check to see if this object has not already been added to page before proceeding
if (file.indexOf(".js")!=-1){ //If object is a js file
fileref=document.createElement('script')
fileref.setAttribute("type","text/javascript");
fileref.setAttribute("src", file);
}
else if (file.indexOf(".css")!=-1){ //If object is a css file
fileref=document.createElement("link")
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", file);
}
}
if (fileref!=""){
document.getElementsByTagName("head").item(0).appendChild(fileref)
loadedobjects+=file+" " //Remember this object as being already added to page
}
}
}
/* END AJAX SCRIPT */