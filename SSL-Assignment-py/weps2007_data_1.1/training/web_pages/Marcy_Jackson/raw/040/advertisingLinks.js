if (typeof ourUrl != 'undefined') {
if (ourUrl.indexOf("http://www.washingtonpost.com/ac2/wp-dyn/admin/search/google") == -1) {

function selectDateType(date)
{


if ( (typeof adTemplate == 'undefined') || ((adTemplate & GOOGLE_LINKS) == GOOGLE_LINKS)) {

overture=(typeof thisNode == 'undefined')?null:true;

_octxtId = "";
_octxtCat = "";

if (overture != null) {

var oRan = Math.floor(Math.random() * 1000000);
var oUrl = document.location.href;

var overtureNode = thisNode.split("/")[0];

switch(overtureNode) {
// tier 1 categories
case "business":
case "cars":
case "education":
case "health":
case "jobs":
case "realestate":
case "rentals":
case "technology":
case "travel":
_partner = 'wpni_t1_ctxt';
_octxtId = "&ctxtId=wpni_"+overtureNode+"";
break;

// tier 2 categories
case "food":
case "metro":
case "print":
case "style":
case "weather":
_partner = 'wpni_t2_ctxt';
break;

default:_partner = 'wpni_t3_ctxt';break;

}

function determineType() {
if (oUrl.indexOf("article") != -1) _type = 'story';
else _type = 'index';
return("type="+overtureNode+"_"+_type);
}
_tL = _partner;

var displayCat = new Array('business','health','technology','weather','sports','world','politics','education','entertainment');
for (i=0; i<displayCat.length; i++) {
if (overtureNode == displayCat[i]) _octxtCat = "&ctxtCat="+overtureNode+"";
}

_oUrl = oUrl.split("type")[0];



buildString = "Partner="+ _partner + _octxtId + "&" + determineType() + _octxtCat + "&ctxtUrl=" + _oUrl;

var tag = '<s\cript language="JavaScript" src="http://cmhtml.wpni.overture.com/d/search/p/wpni/js/flat/us/ctxt/?'+buildString+'"></s\cript>';

document.write('<s\cript language="JavaScript" src="http://cmhtml.wpni.overture.com/d/search/p/wpni/js/flat/us/ctxt/?'+buildString+'"></s\cript>');

}

document.write('<s\cript src="http://www.washingtonpost.com/wp-adv/adproducts/advertisingLinks/js/article_display.js"></s\cript>');

}

}

}

}