<!-- Begin Javascript
// FRAME ELIMINATOR
// Checks to see if the site is being framed, and pulls the site out.
if (window.location!=top.location) {
	top.location = window.location;
}


// OPEN WINDOW FUNCTION
// pulls in customized link, width, height, scrollability
function popUpNew(Page, Width, Height, Scroll) {
window.open(Page,"popUpWindow",'width='+Width+',height='+Height+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars='+Scroll+',copyhistory=no,resizable=yes');
  }
// the rest...
// toolbar - icons;  location - URL address bar;  directories - links bar;   status - progress bar at bottom;
// menubar - File, Edit, etc;  copyhistory - retains history list from parent window;  resizable - allows resizing



// FIX N4 CSS ISSUE	
// Netscape 4 has a nasty bug of forgetting an external stylesheet is attached when the browswer is resized
// This script compensates for Netscape's shortsightedness
if (document.layers) {
	origWidth = innerWidth;
	origHeight = innerHeight;
	}

function reloadPage () {
	if (innerWidth != origWidth || innerHeight != origHeight) {
		location.reload();
		}
	}

if (document.layers) onresize = reloadPage;




// SCROLLBAR CHANGES COLOR  
// Makes the color of the scrollbars match the background, if color entered correctly
function changeScrollbarColor(C) {
   if (document.all) {
      document.body.style.scrollbarBaseColor = C;
   }
}

  
// SWAP IMAGE
function swapImage (name, source) {
	var image;
	image = findDOMimage(name);
	image.src = source;
}  



//SET NEW Z-INDEX LEVEL
//Change a DIVs Z Level on the page
function setZIndex(objectName, newIndex) {
	var refObject = findDOM(objectName,1);
	refObject.zIndex = newIndex;

}

//DROPDOWN URL CHANGER
function chgURL(frm) {
			var url = frm.options[frm.selectedIndex].value;
			var ext = ".shtml";
			window.location.href = url + ext;
}

	
// ANTI-SPAM
	function antispam(name,domain) {
    	document.location = "mailto:" + name + "@" + domain;
	}


	
//LOWER BROWSER BORDER FIX
//Remove the blue border around linked images
	function submitbuttonwithborderfix() {
		document.write('<input type="image" src="/egov/portal.nsf/allfiles/images/$file/button-go.gif" alt="Start Search" id="goButton" name="goButton" align="middle" onmouseover="this.src=\'/egov/portal.nsf/allfiles/images/$file/button-go-over.gif\';" onmouseout="this.src=\'/egov/portal.nsf/allfiles/images/$file/button-go.gif\';" tabindex="10" accesskey="G"');
		if (ns4) {
			document.write(' border = "0"');
		}
		
		document.write('>');
		
	}

//External Link Confirm
//Usage <a onclick="javascript:nonState('http://www.test.gov'); return false;" href="http://www.test.gov">test</a>
	function nonState(url) {
	 if (confirm("The link you selected points to a \n non-State of Delaware website. \n Do you want to continue?"))
	 window.location = url;
	 else 
	 return false;   
	}

// End Javascript -->

