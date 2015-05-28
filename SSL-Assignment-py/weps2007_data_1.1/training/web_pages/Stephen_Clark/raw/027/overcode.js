var navVer = navigator.appVersion;
if(navVer.substr(0,3) >= 4)
if((navigator.appName=="Netscape") && (parseInt(navigator.appVersion)==4))
document.write('<link rel="stylesheet" type="text/css" href="http://www.scfabs.co.uk/includes/overns.css">');
else
document.write('<link rel="stylesheet" type="text/css" href="http://www.scfabs.co.uk/includes/over.css">');