/* General javascript functions */
function hoverOver(elem) {
	document.getElementById(elem).style.backgroundImage = 'URL(/images/site/navigation/background_over.gif)';
}

function hoverOut(elem) {
	document.getElementBy(elem).style.backgroundImage = 'URL(/images/site/navigation/background_off.gif)';
}

function new_window(theURL,winName,features) {
	var page = theURL;
       // window.open(page,winName,features);
}

function emailStory() {

    var errors = "";
    var frm = document.email_isi_story;;

    if(frm.recipient.value == "") {
	errors += "- A recipient's e-mail address is required.\n";
    }
    if(frm.full_name.value == "") {
	errors += "- Your full name is required.\n";
    }
    if(frm.email.value == "") {
	errors += "- Your e-mail address is required.\n";
    }

    if(errors != "") {
	alert("Please check the following errors:\n \n" + errors);
	return false;
    }
    else {
	return true;
    }

}