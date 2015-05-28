function isNav() {
  if(navigator.appName == "Netscape"){
  isOld();
  }
}

function isOld() {
 var the_browser_version = navigator.appVersion;
 var the_version_number = parseFloat(the_browser_version);
  if(the_version_number > 4.5){
    year = year + 1900;
  }
  else{
    year = year + 2000;
  }
}

var now = new Date(document.lastModified);
var day = now.getDate();
var month = now.getMonth();
var year = now.getYear();

isNav();
document.write((month + 1) + "-" + day + "-" + year ); 

