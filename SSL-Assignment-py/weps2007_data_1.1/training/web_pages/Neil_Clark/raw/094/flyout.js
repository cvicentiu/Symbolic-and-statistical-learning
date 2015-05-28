
//Browser Detection

var noBooks;

NS4 = (document.layers) ? true : false;
IE4 = (document.all && !document.getElementById) ? true : false;
IE5 = (document.all && document.getElementById) ? true : false;
NS6 = (!document.all && document.getElementById) ? true : false;

isDom = (NS6 || IE5) ? true : false;

NS3 = (!NS4 && !IE4 && document.images) ? true : false;
IE3 = (!NS4 && !IE4 && !NS3 && (navigator.userAgent.indexOf("MSIE") != -1)) ? true : false;
NS2 = (!NS4 && !IE4 && !NS3 && !IE3 && !document.images) ? true : false;
isMac = (navigator.appVersion.indexOf("Mac") != -1) ? true : false;

isGo = 0;
doc = (NS4) ? "document" : "document.all";
sty = (NS4) ? "" : ".style";

//SETS THE ARRAYS FROM THE FILE menuinfo.js
function initArray(){
      if (document.images) {
      this.length = initArray.arguments.length;
      for (var i=0;i<= this.length; i++)
         this[i] = initArray.arguments[i];
   }
}

//THIS IS THE FUNCTION BEING CALLED FROM THE MENU LINKS ON MOUSEOVER
function mouseOver(imageID) {
		hideMenu = 0;
		eval("show('menu"+imageID+"')");
	
}

//THIS IS THE FUNCTION BEING CALLED FROM THE MENU LINKS ON MOUSEOUT
function mouseOut(imageID) {
		eval("hide('menu"+imageID+"')");

}

//WRITES THE INCLUDE FOR THE MENU INFO SCRIPT TO THE PAGE
if(NS4 || IE4 || isDom) document.write("<SCRIPT LANGUAGE='JavaScript' SRC='menuinfo.js'><\/SCRIPT>");

//DETECTS WHAT BROWSER IS BEING USED AND INCLUDES THE APPROPRIATE SCRIPT FILE 90% OF USERS WILL BE USING dom_menus.js THESE DAYS
if(NS4){
	document.write("<SCRIPT LANGUAGE='JavaScript' SRC='ns_menus.js'><\/SCRIPT>");
}
else if(IE4){
	document.write("<SCRIPT LANGUAGE='JavaScript' SRC='ie_menus.js'><\/SCRIPT>");
}
else if(isDom){
	document.write("<SCRIPT LANGUAGE='JavaScript' SRC='dom_menus.js'><\/SCRIPT>");
}
