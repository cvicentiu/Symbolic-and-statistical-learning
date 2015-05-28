client = new Object();
client.DOM = ( document.getElementById ) ? true : false;

function writeStyles(strOffset) {
	var cssname;
	if (!strOffset) strOffset = "";
	cssname = strOffset;
	cssname += ( client.DOM == true ) ? "dom.css" : "nodom.css";
	document.write("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + cssname + "\">");
}

function validClient() {
	
	valid = true;
	var bUseLayers = (document.layers) ? true : false;
	var bUseAllCollection = (document.all) ? true : false;
	var bUseCSS = bUseLayers || bUseAllCollection;
	var bUseDHTML = bUseLayers || bUseAllCollection

	return bUseCSS;

}