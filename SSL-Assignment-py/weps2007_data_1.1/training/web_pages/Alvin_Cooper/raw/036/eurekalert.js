function visit(newURL) {
	if (newURL != "") {
		location=newURL
	}
}


var SciBubble, HHMINavPop;

var currentNavURL;

var win = null;


// (C) 2000 www.CodeLifter.com
// http://www.codelifter.com
// Free for all users, but leave in this  header
function printWindow(){
    bV = parseInt(navigator.appVersion);
    if (bV >= 4) window.print();
}

/*
Auto center window script- Eric King (http://redrival.com/eak/index.shtml)
*/
function NewPopupWindow(mypage,myname,w,h,scroll){
    LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
    TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
    settings =
	'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable,menubar'
	win = window.open(mypage,myname,settings)
	if(win.window.focus){win.window.focus();}
}

/* Adding "back" and "forward" buttons to the feature popups */
function NewFeaturePopupWindow(mypage,myname,w,h,scroll){
    LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
    TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
    settings =
	'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable,menubar,toolbar'
	win = window.open(mypage,myname,settings)
	if(win.window.focus){win.window.focus();}
}

/* For the "Be on the cover of Science" game - position the window higher */
function NewBOTCOSPopupWindow(mypage,myname,w,h,scroll){
    LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
    TopPosition = 10;
    settings =
	'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable,menubar'
	win = window.open(mypage,myname,settings)
	if(win.window.focus){win.window.focus();}
}


self.onerror = function() {

	return true;

}

function di(id,name){

  if (document.images) {document.images[id].src=eval(name+".src"); }

}



// function that displays status bar message



function dm(msgStr) {

  document.returnValue = false;

  if (document.images) { 

     window.status = msgStr;

     document.returnValue = true;

  }

}

var showMsg = navigator.userAgent != "Mozilla/4.0 (compatible; MSIE 4.0; Mac_PowerPC)";

function dmim(msgStr) {

  document.returnValue = false;

  if (showMsg) { 

    window.status = msgStr;

    document.returnValue = true;

  }

}




// function that will load the bubble with URL, opening the bubble if necessary (one bubble per page)

function loadBubble(URL) {
   	self.name = "scipix";
	SciBubble = window.open(URL, window.name+'bubble', 'toolbar=0,location=0,directories=0,status=0,scrollbars=yes,resizable=yes,width=430,height=350');			
	SciBubble.focus();


}

// function that will load full size popup with URL, opening the bubble if necessary (one bubble per page)

function loadRepak(URL) {
   	self.name = "scipix";
	SciBubble = window.open(URL, window.name+'RePak', 'toolbar=0,location=0,directories=0,status=0,scrollbars=yes,resizable=yes,width=580,height=420');			
	SciBubble.focus();


}



// function that safely closes the bubble

function closeBubble() {

	if ((SciBubble != undefined) && (SciBubble.close != undefined)) {

		SciBubble.close();

	}

}




// function that (re)opens a navpop with URL (one navpop per page)

function loadNavPop(URL) {

	HHMINavPop = window.open(URL, window.name+'navpop', 'toolbar=0,location=0,directories=0,status=0,scrollbars=1,resizable=no,width=340,height=420');			

	HHMINavPop.focus();

}



// function that safely loads and focuses on the main window with URL

function loadMain(URL) {

	if (window.opener) {

		window.opener.location = URL;

		window.opener.focus();

	}

}


