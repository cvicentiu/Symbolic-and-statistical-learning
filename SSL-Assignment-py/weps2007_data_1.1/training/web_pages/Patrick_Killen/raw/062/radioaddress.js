// JavaScript Document



var req = false;

function getRss() {
var url = "getRadioAddress.php";
if (window.XMLHttpRequest) {
req = new XMLHttpRequest();
req.overrideMimeType('text/xml');
} else if (window.ActiveXObject) {
req = new ActiveXObject("Microsoft.XMLHTTP");
}
try {
req.open("GET", url, true);
req.onreadystatechange = function() {
// only if req shows "loaded"
if (req.readyState == 4) {
// only if "OK"
if (req.status == 200) {
var returnXml = req.responseXML;
var channel = returnXml.getElementsByTagName("channel");
var items = channel[0].getElementsByTagName("item");
// At this point, items contains all RSS items
// We only want the first link, title, and description
var guid = items[0].getElementsByTagName("guid")[0].firstChild.data;
var title = items[0].getElementsByTagName("title")[0].firstChild.data;
document.getElementById('latestRadioAddressTitle').innerHTML = title;
document.getElementById('latestRadioAddressLink').href = guid;
document.getElementById('latestRadioAddressLink').innerHTML = title;
} else {
alert("There was a problem retrieving the XML data:\n" +
req.statusText);
}
}
};
req.send(null);
}catch(e) {
alert(e.message);
}
}
