<!--

/* Contains various often-used functions for checking form elements.
   Copyright 2004, 2005 Ben Byrne (bbyrne@freepress.net)
   Feel free to use for your own purposes -- we believe in 
   sharing information here at Free Press!  */
   
//checks for an integer of a certain length
function CheckNumber(thefield,minvalue,message) {
	var filter = /^([0-9]*)+$/;
	if ((!filter.test(thefield.value)) || (thefield.value < minvalue)) {
	 	thefield.focus();
	 	alert(message); 
	 	return false; }

	return true;
}

//checks to make sure a maximum length hasn't been exceeded
function CheckLength(thefield,maxlength,message) {
	if (thefield.value.length > maxlength) {
		alert(message);
		thefield.focus();
		return false;
		}
	return true;
} 

//checks to make sure a field isn't totally blank
function CheckEmpty(thefield,message) {
	if ((thefield.value==null)||(thefield.value=="")){
		alert(message);
		thefield.focus();
		return false;
	}
 	return true;		
}

//checks to make sure a date is mysql-format
function CheckDateFormat(thefield,message) {
	var filter  = /^([0-9]{4})+(-)+([0-9]{2})+(-)+([0-9]{2})+$/;
	if (!filter.test(thefield.value)) {
		 	alert(message); 
		 	return false;
	}
 	return true;		
}

//checks for a valid zip code
function CheckValidZip(thefield) {
	var filter = /^([0-9]{5})+$/;
	if (!filter.test(thefield.value)) {
	 	alert("Please enter a valid zip code"); 
	 	thefield.focus();
	 	return false; }
	else if (thefield.value==null || thefield.value==""){
		alert("Please enter an a zip code");
	 	thefield.focus();
		return false;
	}
	return true;					
}

//checks for a valid zip code
function CheckZip(thefield) {
	var filter = /^([0-9]{5})+$/;
	if (!filter.test(thefield.value)) {
	 	alert("Please enter a valid zip code"); 
	 	thefield.focus();
	 	return false; }
	else if (thefield.value==null || thefield.value==""){
		alert("Please enter an a zip code");
	 	thefield.focus();
		return false;
	}
	return true;					
}

//checks to make sure the maximum number of words (roughly) hasn't been exceeded
function CheckWords(thefield,maxwords,message) {

	var fullStr = thefield.value + " ";
	var initial_whitespace_rExp = /^[^A-Za-z0-9]+/gi;
	var left_trimmedStr = fullStr.replace(initial_whitespace_rExp, "");
	var non_alphanumerics_rExp = /[^A-Za-z0-9]+/gi;
	var cleanedStr = left_trimmedStr.replace(non_alphanumerics_rExp, " ");
	var numwords = cleanedStr.split(" ");
		
	if (numwords.length > maxwords) {
	 	alert(message);
	 	thefield.focus();
	 	return false; 
	 	}
	return true;
}

//checks for a valid email address   
function CheckEmailAddr(thefield) {
	var filter  = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!filter.test(thefield.value)) {
	 	alert("Please enter a valid email address");
	 	thefield.focus();
	 	return false; }
	else if (thefield.value==null||thefield.value==""){
		alert("Please enter an email address!");
	 	thefield.focus();
		return false;
	}
 	return true;		
}


//checks to make sure there are no quotation marks
function CheckQuotes(thefield,message) {
	quote = new String("\"");
	if (thefield.value.indexOf(quote)!=-1) {
	 	alert(message);
	 	thefield.focus();
	 	return false; 
	 }
 	return true;		
}


//-->