<!--

function CheckEmail(str) {
		 var filter  = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		 if (!filter.test(str)) {
		 	alert("Please enter a valid email address"); 
		 	return false; }
 		 return true;					
	}


function CheckEAZip(str) {
		 var filter  = /^([0-9]{5})+$/;
		 if (!filter.test(str)) {
		 	alert("Please enter a valid zip code"); 
		 	return false; }
 		 return true;					
	}

function ValidateForm(){
	var emailID=document.eactivist.email;
	
	if ((emailID.value==null)||(emailID.value=="")){
		alert("Please enter your email address");
		emailID.focus();
		return false;
	}
	
	if (CheckEmail(emailID.value)==false){
		emailID.focus();
		return false;
	}
	
		if (CheckEAZip(document.eactivist.zipcode.value)==false){
		document.eactivist.zipcode.focus();
		return false;
	}
	return true;
 }



//-->