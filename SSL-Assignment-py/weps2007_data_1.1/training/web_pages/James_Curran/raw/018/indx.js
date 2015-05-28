  var wtvOn = "n";
  var args = new Object();
  var query = location.search.substring(1);	// get ?topic=sxxx
  var pos = query.indexOf('=');				// locate =
  if (pos > 0) {
    wtvOn = query.substring(pos+1);
  }
function setWtv() {
   if (wtvOn == "n") {
      wtvOn = "y";
   }
   else {
      wtvOn = "n";
   }
}
function getMB(ptopic) {
	if (wtvOn == "y") {
    document.location.href="base.htm?topic=" + ptopic;
	}
	else {
	document.location.href="main.htm?topic=" + ptopic;
	}
	return false;
}
