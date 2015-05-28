/**********************************************************
 * External window                                        *
 **********************************************************/

function externalLinks() { 
 if (!document.getElementsByTagName) return; 
 var anchors = document.getElementsByTagName("a"); 
 for (var i=0; i<anchors.length; i++) { 
   var anchor = anchors[i]; 
   if (anchor.getAttribute("href") && 
       anchor.getAttribute("rel") == "external") 
     anchor.target = "_blank"; 
 } 
} 
window.onload = externalLinks;


/*********************************************************
* Validate contact forms                                 *
**********************************************************/

 function validateString(field, field_description, msg, min, max) {
	if (!min) { min = 1 }
	if (!max) { max = 65535 }
	if (!field.value){
		alert(msg);
		field.focus();
		field.select();
		return false;
	}
	if(field.value.length < min || field.value.max > max) {
		alert('The ' + field_description + ' field must be between ' + min + ' and ' + max + ' characters long');
		field.focus();
		field.select();
		return false;
	}
	return true;
}

function validateEmail(email, msg, optional) {
if (!email.value && optional) {
return true;
}
var re_mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z])+$/;
if (!re_mail.test(email.value)) {
alert(msg);
email.focus();
email.select();
return false;
}
return true;
}
