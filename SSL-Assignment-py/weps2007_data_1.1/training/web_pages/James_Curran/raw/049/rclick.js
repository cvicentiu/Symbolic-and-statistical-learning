<!-- This script and many more are available free online at -->
<!-- The JavaScript Source! http://javascript.internet.com -->

<!-- Begin
function right(e) {
var msg = "Sorry, you don't have permission to right-click.";
if (navigator.appName == 'Netscape' && e.which == 3) {
alert(msg);
return false;
}
if (navigator.appName ==
'Microsoft Internet Explorer' && event.button==2) {
alert(msg);
return false;
}
else return true;
}

function trap() {
if(document.images)
for(i=0;i<document.images.length;i++)
document.images[i].onmousedown = right;
}
// End -->
