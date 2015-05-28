

// URL: any channel page
var currentHighlightId = null;
function highlightAudio(id) {
   if (currentHighlightId && document.getElementById("audio"+currentHighlightId)) {
		document.getElementById("audio"+currentHighlightId).style.backgroundColor = "#E8F3F6";
		if (id==0) return;
	}
	currentHighlightId = id;
	if (currentHighlightId && document.getElementById("audio"+id)) {
		document.getElementById("audio"+id).style.backgroundColor = "#FBF4DB";
	}	
}

// URL: /account/profile/
function check_password_change_status() {
  if($('new_password_message').innerHTML == "Password changed!") {
    Toggle.display('change_password_box');
    Toggle.display('change_password_link');
    $('new_password_success_message').innerHTML = "Password changed!";
    $('new_password_message').innerHTML = "";
  }
}

// URL: /account/profile/
function check_email_change_status() {
  if($('new_email_message').innerHTML == "Email address changed!") {
    Toggle.display('change_email_box');
    Toggle.display('change_email_link');
    $('new_email_success_message').innerHTML = "Email address changed!";
    $('new_email_message').innerHTML = "";
  }
}

// URL: /account/profile/
function check_privacy_change_status() {
  if($('new_privacy_message').innerHTML == "Privacy settings changed!") {
    Toggle.display('change_privacy_box');
    Toggle.display('change_privacy_link');
    $('new_privacy_success_message').innerHTML = "Privacy settings changed!";
    $('new_privacy_message').innerHTML = "";
  }
}

// URL: /account/profile/
function check_username_change_status() {
  if($('new_username_message').innerHTML == "Username changed!") {
    Toggle.display('change_username_box');
    Toggle.display('change_username_link');
    $('new_username_success_message').innerHTML = "Username changed!";
    $('new_username_message').innerHTML = "";
  }
}




// I don't think anything below here is used.
// If you know for sure something below here is used please move it above
// this line and comment it with the URL where it is called
// -- Dunstan



// RAY: Is this used anywhere?
function getStudioElements() {
	if (navigator.appName.indexOf ("Microsoft") !=-1) {
     window.odeostudio.TPlay("elementLoader_mc");
  } else {
     alert(document.odeostudio)
     document.odeostudio.TPlay("elementLoader_mc");
  }
}



/*
function initialize() {
	//pre-fetch images
	var sem = new Image();
	sem.src = "/img/subscribe.gif";
	sem.src = "/img/unsubscribe.gif";
	sem.src = "/img/queue-add.gif";	
	sem.src = "/img/queue-subtract.gif";
}
*/


function toggle_disabled(element_id) {
  target = document.getElementById(element_id);
  if(target.disabled) {
    target.disabled = false;
  } else {
    target.disabled = true;
  }

}

function toggle( targetId ){
	  if (document.getElementById){
			target = document.getElementById( targetId );
			target.style.display = "inline";
		}
	}
function toggleOff( targetId ){
	  if (document.getElementById){
			target = document.getElementById( targetId );
					target.style.display = "none";
		}
	}

function expandCollapse() { //taken from http://www.blakems.com/archives/000087.html
  for (var i=0; i<expandCollapse.arguments.length; i++) {
    var element = document.getElementById(expandCollapse.arguments[i]);
    element.style.display = (element.style.display == "none") ? "block" : "none";
  }
}

function setEnableAuto(){
  var value = setEnableAuto.arguments[0];
  var element = document.getElementById(setEnableAuto.arguments[1]);
  var elecheck = document.getElementById(setEnableAuto.arguments[2]);
  
  if (value == "on"){
    elecheck.checked = true;
    element.style.display = "block";
    }
  else{ 
    elecheck.checked = false;
    element.style.display = "none";
  }
}


function queue(not_logged_in, id, img) {
	if (logged_in(not_logged_in)) {
		if (img.src.indexOf("queue-subtract") != -1) {	
			remoteAction("/audio/remove_from_queue/" + id);
			img.src = "/img/queue-add.gif";
		} else {
			remoteAction("/audio/add_to_queue/" + id);
			img.src = "/img/queue-subtract.gif";			
		}	
	} 
}

function remove_from_queue(id, obj) {
	remoteAction("/audio/remove_from_queue/" + id);
	obj.parentNode.parentNode.style.display = "none"
}

function subscribe(not_logged_in, id, img) {
	if (logged_in(not_logged_in)) {	
		if (img.src.indexOf("unsubscribe") != -1) {
			remoteAction("/channel/unsubscribe/" + id);
			img.src = "/img/subscribe.gif";
		} else {
			remoteAction("/channel/subscribe/" + id);
			img.src = "/img/unsubscribe.gif";
		}
	} 
}

function logged_in(not_logged_in) {
	if (not_logged_in) {
		toggle("signin-alert");
		scroll(0,0);
		return false;
	} else {
		return true;
	}
}


function remoteAction(action) {
	var i = new Image;
	i.src = action;
}


function pleaseWait(el) {
	el.display = "none";
//	el.parentElement.innerHTML = "hi"
	document.getElementById("submit-container").innerHTML = "<span style='background:#FBFCC7;font-weight:bold;padding:5px'>Please wait...</span>";
}
