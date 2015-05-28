window.categories = "top";
window.newscasts = "true";
window.topstories = "http://news.npr.org/";
window.station="KCUR_FM";
window.localize=true;

function CreateWindow(input){
	PopUp =
window.open(input,"PopUp","toolbar=no,width=574,height=420,directories=no,status=no,scrollbars=no,resizable=no,menubar=no");
	PopUpState = true;
}

// scripts used in the new dropdown header navigation.
// sfHover  is used to correct ie's suckiness

sfHover = function() {
  var sfEls = document.getElementById("nav").getElementsByTagName("LI");
  for (var i=0; i<sfEls.length; i++) {
    sfEls[i].onmouseover=function() {
      this.className+=" sfhover";
    }
    sfEls[i].onmouseout=function() {
      this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
    }
  }
}
if (window.attachEvent) window.attachEvent("onload", sfHover);


// used in the quicklinks select dropdown
function goHere(url) {
	window.location=url;
}

window.station="KCUR_FM";
window.localize=true;





var theImages = new Array() 


theImages[0] = 'http://www.kcur.org/media/header_images/header1.jpg'

theImages[1] = 'http://www.kcur.org/media/header_images/header2.jpg'

theImages[2] = 'http://www.kcur.org/media/header_images/header3.jpg'

theImages[3] = 'http://www.kcur.org/media/header_images/header4.jpg'

theImages[4] = 'http://www.kcur.org/media/header_images/header5.jpg'

theImages[5] = 'http://www.kcur.org/media/header_images/header6.jpg'



var j = 0

var p = theImages.length;

var preBuffer = new Array()

for (i = 0; i < p; i++){

   preBuffer[i] = new Image()

   preBuffer[i].src = theImages[i]

}

var whichImage = Math.round(Math.random()*(p-1));

function showImage(){

document.write('<img src="'+theImages[whichImage]+'" TITLE="KCUR" ALT="KCUR" WIDTH="799" HEIGHT="137" BORDER="0" USEMAP="#header">');

}




