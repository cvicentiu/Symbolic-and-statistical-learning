bName=navigator.appName;
bVer=parseInt(navigator.appVersion);
if ((bName=="Netscape" && bVer>=3) || (bName=="Microsoft Internet Explorer" && bVer>=4) || (bName=="Opera")) br="go";
else br="stop";

function imageWindow(imageName) {
  var thePage = "";  
  thePage += "<HTML>\n<HEAD><TITLE>Studio 9 one 2 - " + imageName;
  thePage += "</TITLE>\n<LINK REL='stylesheet' TYPE='text/css' HREF='studiostyle.css' TITLE='studiostyle'>";
  thePage += "\n<SCRIPT LANGUAGE='javascript' src='studio9one2.js'></SCRIPT>\n</HEAD>\n<BODY BGCOLOR='#FFFFFF'>";
  thePage += "\n<CENTER>\n<IMG SRC='images/photos/" + imageName;
  thePage += "' ALT='Space' BORDER='0'>\n</CENTER>\n<CENTER>\n";
  thePage += "<a CLASS='popup' href='javascript:window.close()'>+ Close Window +</a></CENTER>\n</BODY>\n</HTML>";
  newWindow = window.open("","","HEIGHT=585,WIDTH=680,toolbar=no,resizable=no,scrollbars=no,menubar=no,location=no");
  newWindow.document.write(thePage);
  newWindow.document.close();
  newWindow.focus();
}

function publicityWindow(htmlName) { 
  newWindow = window.open(htmlName,"","HEIGHT=585,WIDTH=680,toolbar=no,resizable=no,scrollbars=no,menubar=no,location=no");
  newWindow.focus();
}

function largeImage() {
  var image = document.mainImage.src;
  var stringLength = image.length;
  var index = stringLength;
  var foundSlash = "False";
  var firstLetter = 1;
  while (foundSlash != "True") {
      if (image.charAt(index) == '/') {
          firstLetter = index + 1;
          foundSlash = "True";
      }
      index = index - 1; 
  }
  var imageName = image.slice(firstLetter,(stringLength-6)) + "large" + image.slice((stringLength-6),stringLength);
  imageWindow(imageName);
}

function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

function changeImages() {
	if (document.images && (preloadFlag == true)) {
		for (var i=0; i<changeImages.arguments.length; i+=2) {
			document[changeImages.arguments[i]].src = changeImages.arguments[i+1];
		}
	}
}

var the_images = new Array();
the_images[0] = new Image();
the_images[0].src = "images/photos/studio01.jpg"
the_images[1] = new Image();
the_images[1].src = "images/photos/lamarina01.jpg"
the_images[2] = new Image();
the_images[2].src = "images/photos/dance02.jpg"
the_images[3] = new Image();
the_images[3].src = "images/photos/sakamoto01.jpg"
the_images[4] = new Image();
the_images[4].src = "images/photos/skechers01.jpg"
the_images[5] = new Image();
the_images[5].src = "images/photos/tucker01.jpg"
var the_timeout;
var index = 0;

function rotateImage() {
	window.document.slide.src = the_images[index].src;
	index++;
	if (index >= the_images.length)
	{
		index = 0;
	}
	the_timeout = setTimeout("rotateImage();", 10000);
}

var preloadFlag = false;
function preloadImages() {
	if (document.images) {
		home_over = newImage("images/home_over.gif");
		portfolio_over = newImage("images/portfolio_over.gif");
		resume_over = newImage("images/resume_over.gif");
		personel_over = newImage("images/personel_over.gif");
		contact_over = newImage("images/contact_over.gif");
		preloadFlag = true;
	}
}

function ResumePop(page) {
OpenWin = this.open(page, "Resume", 
"height=550,width=700,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes");
}

