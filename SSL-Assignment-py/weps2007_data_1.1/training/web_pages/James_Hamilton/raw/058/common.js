//Edited by Mark O'G 28/02/2003 - added getPageName() function 


// Multi-Browser DOM operator
var isDHTML = 0;
var isLayers = 0;
var isAll = 0;
var isID = 0;

if (document.getElementById) {isID = 1; isDHTML = 1;}
else {
   browserVersion = parseInt(navigator.appVersion);
   if ((navigator.appName.indexOf('Netscape') != -1) && (browserVersion == 4)) {isLayers = 1; isDHTML = 1;}
   else {
     if (document.all) {isAll = 1; isDHTML = 1;}
}}

function findDOM(objectID,withStyle) {
	if (withStyle == 1) {
		if (isID) { return (document.getElementById(objectID).style) ; }
		else { 
			if (isAll) { return (document.all[objectID].style); }
		else {
			if (isLayers) { return (document.layers[objectID]); }
		};}
	}
	else {
		if (isID) { return (document.getElementById(objectID)) ; }
		else { 
			if (isAll) { return (document.all[objectID]); }
		else {
			if (isLayers) { return (document.layers[objectID]); }
		};}
	}
}

// page jump
function select_url(x) 
{ 
	var myRexp = /\.doc/;
	if(myRexp.test(x))
	{
		window.open(x);
	}
	else
	{
	location = x; 
	}
}

// Create Rollover image
//  img : image file name xxx [_0|1.gif] added here
//  url : address of destination
var lableinc = 0;
function rolloverbtn(img,url,alt) {
  tmp = new Image();
  tmp.src = img + "_1.gif"; // load image to cache
  lableinc += 1; // image label increment
  tmpstr  = '<a href="' + url + '" ';
  tmpext = url.split('//');
  if (tmpext[0] == 'http:') {
    tmpstr += 'target="_blank" ';
  }
  tmpstr += 'onmouseover="document.i' + eval(lableinc) + '.src=' + "'" + img + '_1.gif' + "'" + '" ';
  tmpstr += 'onmouseout="document.i' + eval(lableinc) + '.src=' + "'" + img + '_0.gif' + "'" + '" ';
  tmpstr += '><img name="i' + eval(lableinc) + '" src="' + img + '_0.gif' + '" border="0" alt="' + alt + '"' + ' title="' + alt + '"></a>';
  document.write(tmpstr);
}

// Switch acitive Promiary Navigation buttons
function SwapNav(nz) {
  switch(nz) {
    case 1 : SwapImage('prod','prod_1'); SwapImage('soln','soln_0'); SwapImage('supp','supp_0'); break;
    case 2 : SwapImage('prod','prod_0'); SwapImage('soln','soln_1'); SwapImage('supp','supp_0'); break;
    case 3 : SwapImage('prod','prod_0'); SwapImage('soln','soln_0'); SwapImage('supp','supp_1'); break;
    default:
  }
}
// Close all Primary Navigation buttons
function closenav() {
  SwapImage('prod','prod_0');
  SwapImage('soln','soln_0');
  SwapImage('supp','supp_0');
}

// Image Rollover code
//  id : image name
//  name : pre-declared image from cache
function SwapImage(id,name) {
	document.images[id].src = eval(name+".src");
}

// Pop-up Window
//  page : URL of page
//  x,y : size of pop-up window
function openwindow(page,x,y) {
	window.open(page,'us','menubar=no,toolbar=no,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=' + x + ',height=' + y);
}

// Pop-up Window
//Same as above but if window already open it resizes and keeps window on top
function openmyWindow(page,x,y) {
	myWindow =	window.open(page,'us','menubar=no,toolbar=no,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=' + x + ',height=' + y);
	//if the window is already open it may not be the correct size so I am resizing it here.
	myWindow.resizeTo(x,y)
	//if the window is already open it will load up the url but will have NO focus so we give it focus now.
	myWindow.focus()	

}

// Fix Netscape window resize
function FixNSResize() {
  if (isLayers == 1) { document.location.reload(true); }
}


// Changes the text color in a div/layer on ns6>,IE,opera - It does not attempt to change the text color in Netscape4
// Used on forms to hide show red star
function changeText_color(newcolor,layerID)
{
		if (isAll==1 && isID==0){document.all.layerID.style.color=newcolor;} //ie 4
		else{
		 	if (isID==1){document.getElementById(layerID).style.color=newcolor;} 			//IE 5+, NS 6+, opera
		}
}


//-----------Start of get page name function----------------------------
//If no URL passed to the function, it uses the current URL of the page.
//Else it takes a full url including the "http://" .e.g. http://lalala/ 
//Example of use at http://mygermany/pressbox/events/cebit/ - Called in the side nav menu

function getPageName(fullurl){
	//Find page name
	if (fullurl != null){
		var the_url = fullurl;
	}else{
		var the_url = document.location.href;
	}
	
	var first_split = the_url.split("//"); //splits the string and puts it into an array
	var after_domain = first_split[1]; // store all after "//"
	
	//alert (after_domain);
	var second_split = after_domain.split("/"); // split at the all "/" in the URL 	
	//get the last part of the split and forget about the middle folder names
	var full_page_name = second_split[second_split.length-1]; // -1 because length starts from 1 but arrays start from 0
	//alert(full_page_name);
	var full_page_name_split = full_page_name.split(".");
	//alert(full_page_name_split[0]);
	
	var only_page_name = full_page_name_split[0];
	return only_page_name;
}
//-----------End of get page name function----------------------------

//-----------Start Of Activate Menu ----------------------------------
//Changes the color of the active menu item.
function activateMenu(){
		//need square bracket to access array not "()" or ns4 thinks that a function is being accessed instead of the array position
		current_href = document.location.href;
		for (var i = 0; i < document.links.length; i++) {		//loop through link array
			if (document.links[i].href == current_href){	//Check for anchor href match with current page href
				if(document.links[i].className == "lnavoff"){		//check for Side Nav Links, they all are set to a class of "lnavoff".
					//alert(document.links[i].className)
					//alert(document.links[i]);	
					document.links[i].className = "lnavon"			
				}
			}	
		  }
}		  

