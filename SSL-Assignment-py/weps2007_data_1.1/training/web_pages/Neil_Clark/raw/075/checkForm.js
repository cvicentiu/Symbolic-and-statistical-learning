					
					
	function checkForm(){
		
		//check name
		if (document.forms[0].fname.value == ""){
			alert("Please enter your first name.");
			return false;
		}
		
		//check name
		if (document.forms[0].lname.value == ""){
			alert("Please enter your last name.");
			return false;
		}
		
		//check email
		if (document.forms[0].email.value == ""){
			alert("Please enter your email address.");
			return false;
		}	
		
		
			
	}	


function isValidSearch(formName) {
   if(formName.query.value == "" || formName.query.value == "Site Search") {
     alert("Please supply a search term.");
     formName.query.focus();
     return false
   }
   else {
     return true;
   }
 }