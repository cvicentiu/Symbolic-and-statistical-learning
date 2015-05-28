/* FOX SPORTS FORM VALIDATION JS
    

	index -> 	
			new validation
			legacy validation
				
	
	Note, you need to escape two seperate interpreters. 
	So special characters need 4 backslashes. \\w, \\n, \\s etc.
			
*/
  


 
/* =new validation
------------------ */

 validators = new Array();
 
 validators["fullName"] = "[^ \\n]+"; 
 validators["full-name"] = "[^ \\n]+"; 
 validators["name"] = "[^ \\n]+"; 
 validators["letter"] = "[^ \\n]+"; 
 validators["address"] = "[^ \\n]+"; 
 validators["phone"] = "^[^a-zA-Z]{6,}$" // non-alphabetical
 validators["ltotelephone"] = "^[^a-zA-Z]{6,}$" // non-alphabetical
 // validators["location"] = "[^ \\n]+";
 validators["comment"] = "[^ n]+";
 validators["email"] = "^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z_]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$";
 validators["rcptName"] = "[^ \\n]+"; 
 validators["yourName"] = "[^ \\n]+"; 
 validators["your-name"] = "[^ \\n]+"; 
 validators["your-email"] = "[^ \\n]+";
 validators["your-location"] = "[^ \\n]+";
 validators["your-comment"] = "[^ \\n]+";
 validators["your-entry-nblwrap"] =  "[^ \\n]+";
 validators["your-entry-a1"] =  "[^ \\n]+";
 validators["yourEmail"] = "^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z_]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$";
 validators["rcptEmail"] = "^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z_]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$";
 validators["option"] = true;
 validators["your-topic"] = true;

/* matchfields for use with passwords.*/
 matchfields = new Array(); 
 matchfields["pwd"] = "pwdvalidate"; 
 
 /* error messages go here */
 messages = new Array();
 messages["default"] = "Please check the value of field '1', it does not validate."; // 1 will be replaced by name of form element
 messages["fullName"] = "Please enter your name";
 messages["full-name"] = "Please enter your name";
 messages["name"] = "Please enter your name";
 messages["email"] = "Please enter your (valid) email address";
 messages["address"] = "Please enter your street address";
 messages["letter"] = "Please enter your letter to the editor";
 messages["phone"] = "Please enter your phone number";
 messages["ltotelephone"] = "Please enter your phone number";
 //messages["location"] = "Please enter your location";
 messages["comment"] = "Please enter your comments";
 messages["rcptName"] = "Please enter a name for recipient";
 messages["rcptEmail"] = "Please enter valid email address for recipient";
 messages["your-name"] = "Please enter your name";
 messages["your-email"] = "Please enter a valid email address";
 messages["your-location"] = "Please enter your location";
 messages["yourName"] = "Please enter a name for sender";
 messages["your-comment"] = "Please enter your comment";
 messages["your-entry-nblwrap"] = "Please answer in 25 words or less, which Australian will be the next to play in the NBA, and why?";
 messages["your-entry-a1"] = "Please answer in 25 words or less, why you want All Access to A1 Team Australia.";
  
 messages["yourEmail"] = "Please enter a valid email address for sender";
 messages["option"] = "Please select an option";
 messages["your-topic"] = "Please select a topic";


/* Called on form submit */
function validate(form) {
	var out = ""
	for (var i=0; i<form.elements.length; i++) {
		var element = form.elements[i];
		var validated = true;
		if(element.className.indexOf("is-optional") < 0) {
		        switch (element.type) {
			        case "reset": break;
			        case "submit": break;
			        case "button": break;
			        case "hidden": validated = validatetext(element); break;
			        case "password": validated = validateText(element)&&validatePassword(element); break;
			        case "text": validated = validateText(element); break;
			        case "radio": validated = validateRadio(element, form); break;
			        case "textarea": validated = validateText(element); break;
			        case "checkbox": validated = validateCheckbox(element); break;
			        case "select": validated = validateSelect(element); break;
			        case "select-one": validated = validateSelectOne(element); break;
			        case "select-multiple": validated = validateSelectMultiple(element); break;
			        default: break;
		        }
			
		}
		
		if (!validated) {
			if (out.length > 0) out += "<br/>";
			out += ((messages[element.name])?messages[element.name]:messages["default"]).replace(/1/g, element.name);
			element.className += " error-highlight";
			element.onfocus = function() {
			    this.className = this.className.replace("error-highlight", "");
			}
		} else {
		    if((element.className != "") && (element.className != "undefined") && (element.className != null)) {
		        element.className = element.className.replace("error-highlight", "");
			}
		}
	}
	
	if(document.getElementById("comment")) {
		if(!(assertCharLimit(document.getElementById("comment")))) {
		    return false;
			document.getElementById("comment").className += " error-highlight";
			document.getElementById("comment").onfocus = function() {
			    document.getElementById("comment").className = document.getElementById("comment").className.replace("error-highlight", "");
			}
		}
    }
	
	
	if (out.length > 0) {
	    if(typeof(singleErrorMessage) != "undefined") {
	        out = singleErrorMessage;
	    }
        
		if(!(document.getElementById("single-error"))) {
		    var errorAlert = document.createElement("p");
		    errorAlert.className = "error";
		    errorAlert.id = "single-error";
		} else {
		    var errorAlert = document.getElementById("single-error");
			errorAlert.innerHTML = "";
		}
		//var errorAlertText = document.createTextNode(out);
		//errorAlert.appendChild(errorAlertText);
		errorAlert.innerHTML = out;
		formFieldset = form.getElementsByTagName("fieldset")[0];
		if(formFieldset) {
		    formErrorLegend = formFieldset.getElementsByTagName("legend")[0];
		    if(formErrorLegend) {
		        if((formFieldset.className).indexOf("error-parent") >= 0 ) {
			        formErrorLegend.innerHTML = out;
					formErrorLegend.id = "single-error";
					formErrorLegend.className += " error";
			    }
			} else if((formFieldset.className).indexOf("error-parent") >= 0 ) {
		        formFieldset.insertBefore(errorAlert, formFieldset.firstChild);
		    } else {	    
		        form.insertBefore(errorAlert, form.firstChild);
			} 
		} else {
		    form.insertBefore(errorAlert, form.firstChild);
		}
		return false;
	}
	else return true;
 } 
 
 function validateRadio(element, theForm) {
	var elements = theForm.getElementsByTagName("input");
	if(validators[element.name]) {
		var redundant = false;
		var firstEncounter = -1;
		for (var i=0; i<elements.length&&!redundant; i++) {
			if(elements[i].type==element.type&&elements[i].name==element.name) {
				if(firstEncounter==-1) {
				    firstEncounter = i;
				}
				if(elements[i].value==element.value&&firstEncounter!=i) {
				    return true;
				}
				if(elements[i].checked) {
				   return true;
				}
				
				// onclick seems to work for label too
				element.onclick = function() {
			        if(document.getElementById("single-error")) {
			            document.getElementById("single-error").style.display = "none";
			        }
			    }
			}
		}
		return false;
	}
	else return true;
 } 
 
 function validateText(element) {
	if (validators[element.name]) {
		switch (typeof validators[element.name]) {
			case "string":var re = new RegExp(validators[element.name]);
				return re.test(element.value);
			case "function": return validators[element.name](element);
		} return true;
	}
	else return true;
 } 
 
 function validateCheckbox(element) {
	if (validators[element.name]) {
		switch (typeof validators[element.name]) {
			case "string": return (element.checked);
			case "function": return validators[element.name](element);
		} return true;
	}
	else return true;
 }
 
 function validateSelect(element) {
    if (validators[element.name]) {
		switch (typeof validators[element.name]) {
			case "string": return (element.value.length > 0);
			case "function": return validators[element.name](element);
		} return true;
     }
     else return true; 
 }
 
 function validateSelectOne(element) {
	if (validators[element.name]) {
		switch (typeof validators[element.name]) {
			case "string": return (element.value.length > 0);
			case "function": return validators[element.name](element);
		} return true;
	}
	else return true;
 } 
 
 function validateSelectMultiple(element) {
	if (validators[element.name]) {
		switch (typeof validators[element.name]) {
			case "string": return (element.value.length > 0);
			case "function": return validators[element.name](element);
		} return true;
	}
	else return true;
 } 
 
 function validatePassword(element) {
	if (matchfields[element.name]) {
		return (element.value==element.form.elements[matchfields[element.name]].value);
	}
	else return true;
 }

 function assertCharLimit(caller) {
     if(caller.getAttribute("class") != "char-limit") {
	     return true;
	 }
     if (caller.value.length > 1200) { 
		 if(!(document.getElementById("single-error"))) {
		    var errorAlert = document.createElement("p");
		    errorAlert.className = "error";
		    errorAlert.id = "single-error";
		} else {
		    var errorAlert = document.getElementById("single-error");
			errorAlert.innerHTML = "";
		}
		
		errorAlert.innerHTML += "Feedback forms are limited to 1200 characters. If you need to send a longer message please send us an email.";
		parentForm = document.getElementById("story-your-say");
		parentForm.insertBefore(errorAlert, parentForm.firstChild);
		return false;
	 } else {
	     return true;
     }
 }
 
 function pollValidate(pollForm) {
	var option = selectedValue(pollForm.option);
	var addr = pollForm.getAttribute("action") + "?option="+option;
	if(validate(pollForm)) {
	    window.open(addr, 'nipoll', 'width=780, height=450');		
	}	
	return false;
}

/* =legacy validation (phase out)
--------------------------------- */
function validEmail(email) {
	invalidChars = " /:,;"

	if (email == "") {						// cannot be empty
		return false;
	}
	for (i=0; i<invalidChars.length; i++) {	// does it contain any invalid characters?
		badChar = invalidChars.charAt(i)
		if (email.indexOf(badChar,0) > -1) {
			return false;
		}
	}
	atPos = email.indexOf("@",1)			// there must be one "@" symbol
	if (atPos == -1) {
		return false;
	}
	if (email.indexOf("@",atPos+1) != -1) {	// and only one "@" symbol
		return false;
	}
	periodPos = email.indexOf(".",atPos)
	if (periodPos == -1) {					// and at least one "." after the "@"
		return false;
	}
	if (periodPos+3 > email.length)	{		// must be at least 2 characters after the "."
		return false;
	}
	domainName = email.substring(atPos+1, periodPos)
	if (domainName.length < 2) {			// Cannot have a domain less than 2 characters long
		return false;
	}
	return true
}

function submitIt(soapEmail) {
if (soapEmail.sb_name.value == "") {
	alert("Please enter your name");
	soapEmail.sb_name.focus()
	soapEmail.sb_name.select()
	return false;
	}
if (!validEmail(soapEmail.sb_email.value)) {
	alert("Please enter a valid email");	
	soapEmail.sb_email.focus()
	soapEmail.sb_email.select()
	return false;
	}
	return true;
}

	
function submitIt(emailFriend) {
if (emailFriend.send-name.value == "") {
	alert("Please enter your name");
	emailFriend.send-name.focus()
	emailFriend.send-name.select()
	return false
	}
if (!validEmail(emailFriend.emailTo.value)) {
	alert("Please enter a valid email");	
	emailFriend.emailTo.focus()
	emailFriend.emailTo.select()
	return false
	}
if (emailFriend.your-name.value == "") {
	alert("Please enter friend's name");	
	emailFriend.your-name.focus()
	emailFriend.your-name.select()
	return false
	}
if (!validEmail(emailFriend.emailFrom.value)){
	alert("Please enter a valid email");	
	emailFriend.emailFrom.focus()
	emailFriend.emailFrom.select()
	return false
	}
return true
}
	

