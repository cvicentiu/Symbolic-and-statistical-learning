//Form Validation API
//© 2001 - 2002 V-Empower Inc. 
//@Authors Jp, Devi

//Used to check the size of a text area

//arguments: field and the maximum input size permitted
//example: <textarea onChange="return checkSize(this, '255');></textarea>
function checkSize(field, maxSize){
	var fValue = field.value;
	if(fValue.length >= maxSize){
		field.blur();
		field.value = fValue.substring(0, maxSize-1);
		alert("Sorry! You cannot enter more than " + maxSize + " characters!")
		return false;
	}
	//else
		//alert("OK");
		
}

//main form validation function

//args: pass first form reference using keyword 'this', then sets of three args for each field...
//first fieldname, next type (could be input, email or select), and finally Formal name of field.
//example: <form onSubmit="return checkForm(this, 'username', 'input', 'User Name', 'password', 'input', 'Password');">

var RadioValue
var dtCh= "/";
var minYear=1900;
var maxYear=2100;
var fieldName

function checkForm(frm){
	args = checkForm.arguments;
 	var fields = new Array();
	var types = new Array();
	var names = new Array();
	
	var k=0;
	var l=0;
	var m=0;
	
		
	for(var i=1;i<args.length;i++)
	{
	//here we are using i=1 b'cos we want to leave the first arg i.e. the form
	
	// Here we are extracting each field name,type and formal name,after that stored in to 3 array variables.
	
		if(i%3==1)
		{
			fields[k]=args[i];
			k=k+1
		}
		
		else if(i%3==2)
		{
			 types[l]=args[i];
			 l=l+1
		}
		else 
		{
			 names[m]=args[i];
			 m=m+1
		}
	}
	
	// Here we are checking one by one filed whether the entered data is valid or not.
	
	var check = true;
	checkloop:
	for (var i=0; i<fields.length; i++)
	{
	
	// suppose if input type is "Alphabetic" then enter in to this if 
	// and calling "checkAlphaInput" function.
	
	 if(types[i]=="Ainput")
	 {	 	  
	  	if(!checkAlphaInput(eval(args[0].name+"."+fields[i]), names[i]))
	 	{
			check=false;
			break checkloop;
		}
	}
	  
	
	// suppose if input type is "Numeric" then enter in to this if 
	// and calling "checkNumericInput" function.
	
	else if(types[i]=="Ninput")
	{

		 	if(!checkNumericInput(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
	}
	
	// suppose if input type is "AlphaNumeric" then enter in to this if 
	// and calling "checkAlphaNumericInput" function.
		
	   else if(types[i]=="ANinput")
	   {

		 	if(!checkAlphaNumericInput(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
		}
	
	
	
	// suppose if input type is "AlphaNumeric" then enter in to this if 
	// and calling "checkChrAlphaNumericInput" function.
		
	   else if(types[i]=="CANinput")
	   {

		 	if(!checkChrAlphaNumericInput(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
		}
	
	//For username
		else if(types[i]=="UserName")
	    {
		 	if(!checkUserName1(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
		}

		
	// suppose if input type is "Select" then enter in to this if 
	// and calling "checkSelect" function.
	
	
		else if(types[i]=="Select")
	    {
			if(!checkSelect(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
		}



	// suppose if input type is "SelectM" then enter in to this if 
	// and calling "checkSelectMultiple" function.
	
	
		else if(types[i]=="SelectM")
	    {
			if(!checkSelectMultiple(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
		}


	// suppose if input type is "Password" or "Confirm Password" then enter in to this if 
	// and calling "checkPassword" function.
		
		else if(types[i]=="Password" || types[i]== "CPassword")
	    {
                        
            if(!checkPassword(eval(args[0].name+"."+fields[i]), names[i]))
            {
                check=false;
				break checkloop;
            
            }
          
          // Here we are checking both Password and Confirm Password are same or not.
          // for this here we are calling one more function i.e "checkPassAndConfirm"
             
           if (names[i]=="Confirm Password")
		   {
  			  if (!checkPassAndConfirm(eval(args[0].name+"."+fields[i-1]),names[i-1],eval(args[0].name+"."+fields[i]), names[i]))
			  {
			      check=false;
				  break checkloop;
			
			  }
 
		  }
		  
		}
		
	   // suppose if input type is "Email" then enter in to this if 
	  // and calling "checkMail" function.
			
		else if(types[i]=="Email"){
			if(!checkMail(eval(args[0].name+"."+fields[i]), names[i]))
			{
				check=false;
				break checkloop;
			}
		}
	
	
	 	
	    // suppose if input type is "Multiple Email" then enter in to this if 
	  // and calling "checkMultipleMail" function.
			
		else if(types[i]=="MEmail"){
			if(!checkMultipleMail(eval(args[0].name+"."+fields[i]), names[i]))
			{
				check=false;
				break checkloop;
			}
		}	
		
	 	
	  // suppose if entered user name already exists.Then we are providing three option buttons and one textbox 
	  // for that purpose here we are calling "checUserName" function.
	
		else if(types[i]=="SelectUserName")
		{
		    		    
     		if(!checkUserName(eval(args[0].name+"."+fields[i]),names[i],eval(args[0].name+"."+fields[i+1]), names[i+1]))
			{
				check=false;
				break checkloop;
			}
		}
		
	// suppose if input type is "Radio" then enter in to this if 
	// and calling "checkRadioButton" function.
	
		else if(types[i]=="Radio")
		{
		    		    
     		if(!checkRadioButton(eval(args[0].name+"."+fields[i]),names[i]))
			{
				check=false;
				break checkloop;
			}
			
			
			/* else
			{
				if (RadioValue == 1)
				{
					if(!checkLink(eval(args[0].name+"."+fields[i+1]), names[i+1]))
		 			{		
						check=false;
						break checkloop;
					} 
				}
				
				 else if (RadioValue == 2)
				 {
					if(!checkAlphaNumericInput(eval(args[0].name+"."+fields[i+2]), names[i+2]))
		 			{
						check=false;
						break checkloop;
					}	
				  }
				
			  }
		
		    check=true;
			break checkloop; */
			
		}
	
	
	
	
	// suppose if input type is "ERadio" then enter in to this if 
	// and calling "checkRadioButton" function.
	
		else if(types[i]=="ERadio")
		{
		    		    
     		if(!checkERadioButton(eval(args[0].name+"."+fields[i]),names[i]))
			{
				check=false;
				break checkloop;
			}
			
			
			 else
			{
				if (RadioValue == 1)
				{
					if(!checkAlphaNumericInput(eval(args[0].name+"."+fields[i+1]), names[i+1]))
		 			{		
						check=false;
						break checkloop;
					}
					
					if(!checkAlphaNumericInput(eval(args[0].name+"."+fields[i+2]), names[i+2]))
		 			{		
						check=false;
						break checkloop;
					} 
					
				
				}
				
				
				 else if (RadioValue == 2)
				 {
					if(!checkAlphaNumericInput(eval(args[0].name+"."+fields[i+3]), names[i+3]))
		 			{
						check=false;
						break checkloop;
					}	
				  }
				
			  }
		
		    check=true;
			break checkloop; 
			
		}
	
	
	
	
	
	// suppose if input type is "CheckBox" then enter in to this if 
	// and calling "checkCheckBox" function.
	
		else if(types[i]=="CheckBox")
		{
		    		    
     		if(!checkCheckBox(eval(args[0].name+"."+fields[i]),names[i]))
			{
				
				//if(!checkAlphaNumeric(eval(args[0].name+"."+fields[i]),names[i]))
				
				check=false;
				break checkloop;
			}
		}
	
	
	
	
	  // suppose if input type is "Link" then enter in to this if 
	  // and calling "checkLink" function.
		
	   else if(types[i]=="Link")
	   {

		 	if(!checkLink(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
		}
	
	  
	 // suppose if input type is "Symbol" then enter in to this if 
	// and calling "checkSymbol" function.
	
		else if(types[i]=="Symbol")
		{
			if(!checkSymbol(eval(args[0].name+"."+fields[i]),names[i]))
			{
				check=false;
				break checkloop;
			}
		}
		
		
	  // suppose if input type is "Ddate then enter in to this if 
	  // and calling "checkDdate" function.
		
	   else if(types[i]=="Ddate")
	   {
		 	if(!checkDdate(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
		}
	
		
	  // suppose if input type is "Mdate then enter in to this if 
	  // and calling "checkMdate" function.
		
	   else if(types[i]=="Mdate")
	   {
		 	if(!checkMdate(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
		}
	
	
	
	  // suppose if input type is "ZipFive" then enter in to this if 
	  // and calling "checkZipFive" function.
		
	   else if(types[i]=="ZipFive")
	   {
		 	if(!checkZipFive(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
		}
	
	
	  // suppose if input type is "ZipFour" then enter in to this if 
	  // and calling "checkZipFour" function.
		
	   else if(types[i]=="ZipFour")
	   {
		 	if(!checkZipFour(eval(args[0].name+"."+fields[i]), names[i]))
		 	{
				check=false;
				break checkloop;
			}
		}
	
	
	
	
	
		
	}
	
	
	
	
	if (check ==false)
	   return false
	else
	   return true;
	
}


//Used for form validation called for general input validation from within the main form validation function

//arguments: field and the formal name of the field
//example: checkInput(frm.username, 'User Name');
//in case of error: the alert will read "The User Name field cannot be empty"




// This function is used to check whether the entered link is proper or not

  
function checkZipFive(field, name)
{

  if (field.value == "") 
  {
    alert( name + " should not be empty");
    if (field.type!="hidden")
    {
		field.focus()
	}
    return false
  }
  else if (field.value != "")
  {
   var str=field.value 
    
    if(str.length<5) 
    {
      alert(name + " should contains five digits");
      if (field.type!="hidden")
      {
		field.focus()
	  }
      return false
     }
      
     for(var i=0;i<str.length;i++)
     {
		if(str.charCodeAt(0)==32)
		{
			alert("The " +  name + " should not start with space");
			if (field.type!="hidden") 
			{
				field.focus()
			}
			return false
		}
		
		var Char=str.charAt(i)
        if((Char>=0) && (Char<=9))
        {
        
        }
        else
        {
         alert("Enter Numerics only");
         if (field.type!="hidden") 
         {
			field.focus()
		 }
			return false
		}
	}
        
 }
 	return true;
}




function checkZipFour(field, name)
{

  if (field.value == "") 
  {
    alert("If you don't know your Zip+4; please use the Zip + 4 search utility");
    return false;
  }
 else if (field.value != "")
  {
   var str=field.value 
    
    if(str.length<4) 
    {
      alert(name + " should contains four digits");
       if (field.type!="hidden") 
       {
			field.focus()
	   }
	   return false
     }
      
     for(var i=0;i<str.length;i++)
     {
		if(str.charCodeAt(0)==32)
		{
			alert("The " + name + " should not start with space");
			if (field.type!="hidden") 
			{
				field.focus()
			}
			return false
		}
		
		var Char=str.charAt(i)
        if((Char>=0) && (Char<=9))
        {
        
        }
        else
        {
         alert("Enter Numerics only");
         if (field.type!="hidden") 
         {
			field.focus()
		 }
			return false
		}
	}
        
 }      


 	return true;
}





// This function is used to check whether the entered date is in proper format (dd/mm/yyyy) or not

function checkDdate(field, name)
{
   fieldName=name
	if (isDate(field.value)==false)
	{
		if (field.type!="hidden") {
		field.focus()
		}
		return false
	}
	return true
}


function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}

function isDate(dtStr){
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh)
	var pos2=dtStr.indexOf(dtCh,pos1+1)
	var strDay=dtStr.substring(0,pos1)
	var strMonth=dtStr.substring(pos1+1,pos2)
	var strYear=dtStr.substring(pos2+1)
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
	if (pos1==-1 || pos2==-1){
		alert("The " + fieldName + " is in invalid format.\n Enter in 'dd/mm/yyyy' format")
		return false
	}
	if (strMonth.length<1 || month<1 || month>12){
		alert("Please enter the month part of the date in valid format")
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		alert("Please enter the day part of the date in valid format")
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
		return false
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		alert("The " + fieldName + " is in invalid format.\n Enter in 'dd/mm/yyyy' format")
		return false
	}
	return true
}




// This function is used to check whether the entered date is in proper format (mm/dd/yyyy) or not

function checkMdate(field, name)
{
	fieldName=name
	if (isDate1(field.value)==false)
	{	
		if (field.type!="hidden") {
			field.focus()
		}
		return false
	}
	return true
}


function isDate1(dtStr){
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh)
	var pos2=dtStr.indexOf(dtCh,pos1+1)
	var strMonth=dtStr.substring(0,pos1)
	var strDay=dtStr.substring(pos1+1,pos2)
	var strYear=dtStr.substring(pos2+1)
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
	if (pos1==-1 || pos2==-1){
		alert("The " + fieldName + " is in invalid format.\n Enter in 'mm/dd/yyyy' format")
		return false
	}
	if (strMonth.length<1 || month<1 || month>12){
		alert("Please enter the month part of the date in valid format")
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		alert("Please enter the day part of the date in valid format")
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
		return false
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		alert("The " + fieldName + " is in invalid format.\n Enter in 'mm/dd/yyyy' format")
		return false
	}
	return true
}



// This function is used to check whether the entered link is proper or not

  
function checkLink(field, name)
{
	if(field.value=="" )
	{
		alert("The "+name+" field cannot be empty");
		if (field.type!="hidden") {
			field.focus();
		}
		return false;
	}
	
	else if (field.value != "")
	{
     var mess=field.value 
     var char=mess.charAt(0)
     
     if (char==" ")
     {
       alert(name + " should not start with space")
       if (field.type!="hidden") {
		field.focus()
		}
       return false
     }
     
      pt=mess.substring(0,4);
      
      if ((pt=="http") || (pt=="HTTP"))
      {
		 pt=mess.substring(4,7) 
	
	     if(pt=="://")
	     {
	       if(mess.length > 7)
	       {
	       
	       }
	       else
	       {
			  alert("Invalid URL format.\n Enter in the 'http://www.somecompany.com' format.")
			  if (field.type!="hidden") {
			  field.focus()
			  }
              return false
	       
	       }
	       
	     }
	     else
	     {
	       alert("Invalid URL format.\n Enter in the 'http://www.somecompany.com' format.")
	       if (field.type!="hidden") {
		   field.focus()
		   }
           return false
	     }
	     
      }
      else
      {
       alert("Invalid URL format.\n Enter in the 'http://www.somecompany.com' format.")
       if (field.type!="hidden") {
       field.focus()
       }
       return false
      }
    
	} 
	
	return true;
}






// This function is used to check whether the entered data is accepting the special characters or not.

function checkSymbol(field, name)
{
  	if(field.value == "") 
    {
        alert(name + " should not be empty")
        if (field.type != "hidden")
        {
			field.focus();
		}	
        return false
    }
    else if (field.value != "") 
    {
        var str=field.value
        if (str.charCodeAt(0) == 32)
        {
			alert(name+" should not star with space")
			if (field.type != "hidden")
			{
				field.focus();
			}	
			return false
		}	
      }
      
   return true;	
}	
	



// This function is used to check whether the entered data is Numeric data or not.

function checkNumericInput(field, name)
{
	if(field.value=="" )
	{
		alert("The "+name+" field cannot be empty");
		if (field.type != "hidden")
		{
			field.focus();
		}	
		return false;
	}
	else
	{
	    var str=field.value
		var title=str.charCodeAt(0);
		if(title <= 32 || title > 138 || title == 92)
		{
			alert("The first character should not start with space or other special charcters");
			if (field.type != "hidden")
			{
				field.focus();
			}	
			return false;	
		}
		
		var char
		var str=field.value
		
		for(var i=0;i<str.length;i++)
		{
		    char=str.charCodeAt(i);
		    
		    if((char >= 48) && (char<=57))
		    {
		    
		    }
		    else
		    {
		        alert("Enter numerics only");
		        if (field.type != "hidden")
		        {
					field.focus();
				}	
			    return false;	
		    }
         }		
	}
	return true;
}



// This function is used to check whether the entered data is Alphabetic data or not.

function checkAlphaInput(field, name)
{
  if(field.value=="" )
	{
		alert("The "+name+" field cannot be empty");
		if (field.type != "hidden")
		{
			field.focus();
		}	
		return false;
	}
	else
	{
				
		var str=field.value
		var title=str.charCodeAt(0);
		
		
		if(title <= 32 || title > 138 || title == 92)
		{
			alert("The first character should not start with space or other special charcters");
			if (field.type != "hidden")
			{
				field.focus();
			}	
			return false;	
		}
		
		var char
		var str=field.value
		
		for(var i=0;i<str.length;i++)
		{
		    char=str.charCodeAt(i);
		    
		    if(((char >= 65) && (char<=91)) || ((char >= 97) && (char<=122))  || (char==32))
		    {
		    
		    }
		    else
		    {
		        alert("Enter Characters only");
		        if (field.type != "hidden")
		        {
					field.focus();
				}	
			    return false;	
		    }
         }		
	}
	return true;
}


// This function is used to check whether the entered data is Alpha Numeric data or not.

function checkAlphaNumericInput(field, name)
{
	if(field.value=="" )
	{
		alert("The "+name+" field cannot be empty");
		
		if (field.type != "hidden")
		{
			field.focus();
		}
		return false;
	}
	else
	{
	    var str=field.value
		var title=str.charCodeAt(0);
		
		if(title <= 32 || title > 138 || title == 92)
		{
			alert("The first character should not start with space or other special charcters");
			if (field.type != "hidden")
			{
				field.focus();
			}	
			return false;	
		}
		
		var char
		var str=field.value
		char=str.charCodeAt(i);
		
		for(var i=0;i<str.length;i++)
		{
		 if(((char >= 48) && (char<=57)) || ((char >= 65) && (char<=91)) || ((char >= 97) && (char<=122)) || (char==32))
		 {
		   
		 }
		 else
		  {
		        alert("Enter Characters/Numerics only");
		        if (field.type != "hidden")
		        {
					field.focus();
				}	
			    return false;	
		    }
         }		
	}
	return true;
}



// This function is used to check whether the entered data is Alpha Numeric data or not.

function checkChrAlphaNumericInput(field, name)
{
	if(field.value=="" )
	{
		alert("The "+name+" field cannot be empty");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	}
	else
	{
	    var str=field.value
		var title=str.charCodeAt(0);
		
		if(title <= 32 || title > 138 || title == 92)
		{
			alert("The first character should not start with space or other special charcters");
			if (field.type!="hidden") {
			field.focus();
			}
			return false;	
		}
		
		var char
		var str=field.value
		char=str.charCodeAt(i);
		
		if (str.length > 255)
		{
			alert("Maximum length should be 255 characters only");
			if (field.type!="hidden") {
			field.focus();
			}
			return false;	
		
		}
		
		
		for(var i=0;i<str.length;i++)
		{
		 if(((char >= 48) && (char<=57)) || ((char >= 65) && (char<=91)) || ((char >= 97) && (char<=122)) || (char==32))
		 {
		   
		 }
		 else
		  {
		        alert("Enter Characters/Numerics only");
		        if (field.type!="hidden") {
			    field.focus();
			    }
			    return false;	
		    }
         }		
	}
	return true;
}





// This function is used to check whether the entered Email address is in correct format or not.

function checkMail(field, name)
{
	if(field.value=="" )
	{
		alert("The "+name+" field cannot be empty");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	}
 	else 
	{ 
		var strEmail=field.value;
		
		for(var i=0;i<strEmail.length;i++)
		{	
	       if((strEmail.charCodeAt(i)>=48 && strEmail.charCodeAt(i)<=57)||(strEmail.charCodeAt(i)>=65 && strEmail.charCodeAt(i)<=91)||(strEmail.charCodeAt(i)>=97 && strEmail.charCodeAt(i)<=122)||(strEmail.charCodeAt(i)==45)||(strEmail.charCodeAt(i)==95)||(strEmail.charCodeAt(i)==46) ||(strEmail.charCodeAt(i)==64)) 
		   {
		   
		   }
		   else
		   {
		   		if(strEmail.charCodeAt(i)==32)
				{
					alert(name +" should not contain space and it should not end with space");
					if (field.type!="hidden") {
					field.focus();
					}
					return false;
				}
				else
				{
				    alert("Enter your " + name + " properly");
				    if (field.type!="hidden") {
					field.focus();
					}
			        return false;
				}
			 }
	      }
	
	
		var strNewValue=field.value;
		for(var i=0;i<strNewValue.length;i++)
		{	
		   if((strNewValue.charCodeAt(i)==45)&&(strNewValue.charCodeAt(i+1)==45)||(strNewValue.charCodeAt(i)==46)&&(strNewValue.charCodeAt(i+1)==46)||(strNewValue.charCodeAt(i)==95)&&(strNewValue.charCodeAt(i+1)==95))
		   {
			  alert(name + " should not have adjacent hyphens,underscores,dots or @ symbol");
			  if (field.type!="hidden") {
			  field.focus();
			  }
			  return false;
		   }
		}
				
	   var str=field.value;
	   var len=str.length;
	   if(len<5)
	   {
		  alert(name+ " length should be greater than or equal to five characters");
		  if (field.type!="hidden") {
		  field.focus();
		  }
		  return false;
	   }

	
	  if((str.charCodeAt(0)>=65 && str.charCodeAt(0)<=91) || (str.charCodeAt(0)>=97 && str.charCodeAt(0)<=122)) 
	  {
	  
	  }
	  else
	  {
		alert(name + " should not start with Symbols or Numbers or space. It should start with alphabet");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	  }

	  if((str.charCodeAt(len-1)>=65 && str.charCodeAt(len-1)<=91) || (str.charCodeAt(len-1)>=97 && str.charCodeAt(len-1)<=122))
	  {

	  }
	  else
	  {
		alert(name + " should not end with Symbols or Numbers or space. It should end with alphabet");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	  }

	  var pos1=str.indexOf('@');
	  var pos2=str.lastIndexOf('@');
	  var pos3=pos2-pos1;
	
	  if(pos3==0) 
	  {
	                 
	  }
	  else if(pos3>=1)
	  {
		alert(name + " should not have more than one @ symbol");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	  }       
	
	  if(pos1==-1)
	  {
		alert(name + " should contain atleast one @ symbol");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	  }

	  var dotpos=str.indexOf('.');
	  if(dotpos==-1)
	  {
		 alert(name + " should contain atleast one dot symbol");
		 if (field.type!="hidden") {
		 field.focus();
		 }
		 return false;
	  }

	  var atPos1=str.indexOf('@');
	  var atPos2=atPos1+1;
	  var atPos3=atPos1-1;

	  if((str.charAt(atPos2)=='.')||(str.charAt(atPos3)=='.'))
	  {
	    alert(name + " should not have adjecent Dots(.) to the @");
	    if (field.type!="hidden") {
		field.focus();
		}
		return false;   
	  }
		
	  var hePos1=str.indexOf('@');
	  var hePos2=hePos1+1;
	  var hePos3=hePos1-1;

	  if((str.charAt(hePos2)=='-')||(str.charAt(hePos3)=='-'))
	  {
	     alert(name + " should not have adjecent hyphens(-) to the @ symbol");
	     if (field.type!="hidden") {
         field.focus();
         }
		 return false;   
	  }
		
	  var uePos1=str.indexOf('@');
	  var uePos2=uePos1+1;
	  var uePos3=uePos1-1;

	  if((str.charAt(uePos2)=='_')||(str.charAt(uePos3)=='_'))
	  {
		 alert(name + " should not have adjecent underscores(_) to the @ symbol");
		 if (field.type!="hidden") {
         field.focus();
         }
		 return false;   
	  }

      var e1h=str.indexOf('-');
	  var e2h=e1h+1;
	  var e3h=e1h-1;

	  if((str.charAt(e2h)=='.')||(str.charAt(e3h)=='.'))
	  {
		 alert(name + " should not have adjecent Dots(.) to the hyphen -");
		 if (field.type!="hidden") {
	   	 field.focus();
	   	 }
		 return false;   
	  }
	
	  var ue1h=str.indexOf('-');
	  var ue2h=ue1h+1;
	  var ue3h=ue1h-1;

	  if((str.charAt(ue2h)=='_')||(str.charAt(ue3h)=='_'))
	  {
		 alert(name + " should not have adjecent underscores(_) to the - hyphen symbol");
		 if (field.type!="hidden") {
         field.focus();
         }
		 return false;   
	  }

	  var e1u=str.indexOf('_');
	  var e2u=e1u+1;
	  var e3u=e1u-1;

	if((str.charAt(e2u)=='.')||(str.charAt(e3u)=='.'))
	{
		alert(name + " should not have adjecent Dots(.) to the underscore _");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;   
	}
	
 } 
 
 return true;	
}






// This function is used to check whether the entered multiple Email address is in correct format or not.

function checkMultipleMail(field, name)
{
  	if(field.value=="" )
	{
		alert("The "+name+" field cannot be empty");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	}
 	else 
	{ 
		var strEmails=field.value;
		var strEmailArr=strEmails.split(",")
		
		
		for (var k=0;k<strEmailArr.length;k++)
		{
		
		strEmail=strEmailArr[k]
		
		for(var i=0;i<strEmail.length;i++)
		{	
	       if((strEmail.charCodeAt(i)>=48 && strEmail.charCodeAt(i)<=57)||(strEmail.charCodeAt(i)>=65 && strEmail.charCodeAt(i)<=91)||(strEmail.charCodeAt(i)>=97 && strEmail.charCodeAt(i)<=122)||(strEmail.charCodeAt(i)==45)||(strEmail.charCodeAt(i)==95)||(strEmail.charCodeAt(i)==46) ||(strEmail.charCodeAt(i)==64)) 
		   {
		   
		   }
		   else
		   {
		   		if(strEmail.charCodeAt(i)==32)
				{
					alert(k+1 + "   " + name +" should not contain space and it should not end with space");
					if (field.type!="hidden") {
					field.focus();
					}
					return false;
				}
				else
				{
				    alert("Enter your  " +  k + "   " + name + " properly");
				    if (field.type!="hidden") {
					field.focus();
					}
			        return false;
				}
			 }
	      }
	
	
		var strNewValue=strEmailArr[k];
		for(var i=0;i<strNewValue.length;i++)
		{	
		   if((strNewValue.charCodeAt(i)==45)&&(strNewValue.charCodeAt(i+1)==45)||(strNewValue.charCodeAt(i)==46)&&(strNewValue.charCodeAt(i+1)==46)||(strNewValue.charCodeAt(i)==95)&&(strNewValue.charCodeAt(i+1)==95))
		   {
			  alert(k+1 + "   " + name + " should not have adjacent hyphens,underscores,dots or @ symbol");
			  if (field.type!="hidden") {
			  field.focus();
			  }
			  return false;
		   }
		}
				
	   var str=strEmailArr[k];
	   var len=str.length;
	   if(len<5)
	   {
		  alert(k+1 + "   " + name+ " length should be greater than or equal to five characters");
		  if (field.type!="hidden") {
		  field.focus();
		  }
		  return false;
	   }

	
	  if((str.charCodeAt(0)>=65 && str.charCodeAt(0)<=91) || (str.charCodeAt(0)>=97 && str.charCodeAt(0)<=122)) 
	  {
	  
	  }
	  else
	  {
		alert(k+1 + "   " + name + " should not start with Symbols or Numbers or space. It should start with alphabet");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	  }

	  if((str.charCodeAt(len-1)>=65 && str.charCodeAt(len-1)<=91) || (str.charCodeAt(len-1)>=97 && str.charCodeAt(len-1)<=122))
	  {

	  }
	  else
	  {
		alert(k+1 + "   " + name + " should not end with Symbols or Numbers or space. It should end with alphabet");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	  }

	  var pos1=str.indexOf('@');
	  var pos2=str.lastIndexOf('@');
	  var pos3=pos2-pos1;
	
	  if(pos3==0) 
	  {
	                 
	  }
	  else if(pos3>=1)
	  {
		alert(k+1 + "   " + name + " should not have more than one @ symbol");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	  }       
	
	  if(pos1==-1)
	  {
		alert(k+1 + "   " + name + " should contain atleast one @ symbol");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	  }

	  var dotpos=str.indexOf('.');
	  if(dotpos==-1)
	  {
		 alert(k+1 + "   " + name + " should contain atleast one dot symbol");
		 if (field.type!="hidden") {
		 field.focus();
		 }
		 return false;
	  }

	  var atPos1=str.indexOf('@');
	  var atPos2=atPos1+1;
	  var atPos3=atPos1-1;

	  if((str.charAt(atPos2)=='.')||(str.charAt(atPos3)=='.'))
	  {
	    alert(k+1 + "   " + name + " should not have adjecent Dots(.) to the @");
	    if (field.type!="hidden") {
		field.focus();
		}
		return false;   
	  }
		
	  var hePos1=str.indexOf('@');
	  var hePos2=hePos1+1;
	  var hePos3=hePos1-1;

	  if((str.charAt(hePos2)=='-')||(str.charAt(hePos3)=='-'))
	  {
	     alert(k+1 + "   " + name + " should not have adjecent hyphens(-) to the @ symbol");
	     if (field.type!="hidden") {
         field.focus();
         }
		 return false;   
	  }
		
	  var uePos1=str.indexOf('@');
	  var uePos2=uePos1+1;
	  var uePos3=uePos1-1;

	  if((str.charAt(uePos2)=='_')||(str.charAt(uePos3)=='_'))
	  {
		 alert(k+1 + "   " + name + " should not have adjecent underscores(_) to the @ symbol");
		 if (field.type!="hidden") {
         field.focus();
         }
		 return false;   
	  }

      var e1h=str.indexOf('-');
	  var e2h=e1h+1;
	  var e3h=e1h-1;

	  if((str.charAt(e2h)=='.')||(str.charAt(e3h)=='.'))
	  {
		 alert(k+1 + "   " + name + " should not have adjecent Dots(.) to the hyphen -");
		 if (field.type!="hidden") {
	   	 field.focus();
	   	 }
		 return false;   
	  }
	
	  var ue1h=str.indexOf('-');
	  var ue2h=ue1h+1;
	  var ue3h=ue1h-1;

	  if((str.charAt(ue2h)=='_')||(str.charAt(ue3h)=='_'))
	  {
		 alert(k+1 + "   " + name + " should not have adjecent underscores(_) to the - hyphen symbol");
		 if (field.type!="hidden") {
         field.focus();
         }
		 return false;   
	  }

	  var e1u=str.indexOf('_');
	  var e2u=e1u+1;
	  var e3u=e1u-1;

	if((str.charAt(e2u)=='.')||(str.charAt(e3u)=='.'))
	{
		alert(k+1 + "   " + name + " should not have adjecent Dots(.) to the underscore _");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;   
	}
	
 } 
 
}
 
 return true;	
}







// This function is used to check, any item is selected or not in the select box.

function checkSelect(field, name)
{
 if((field.value=="null") || (field.value==" ") || (field.value=="0"))
 {
 	alert(name + " should be selected");
 	if (field.type!="hidden") {
	field.focus();
	}
	return false;	
 }  
return true	
}



// This function is used to check, any item is selected or not in the select box.

function checkSelectMultiple(field, name)
{
 if (field.selectedIndex < 0)  
 {
 	alert(name + " should be selected");
 	if (field.type!="hidden") {
	field.focus();
	}
	return false;	
 }  
return true	
}


// This function is used to check the Password and Confirm Password are entered or not.

function checkPassword(passfield,passname)
{

if (passfield.value == "")
 {
        alert(passname + " should not be empty")
        if (passfield.type!="hidden") {
        passfield.focus()
        }
        return false
  }
  
  return true
}


// This function is used to check both Password and Confirm Password are same or not.

function checkPassAndConfirm(pfield,pname,cfield,cname)
{ 
 if ((pfield.value)!=(cfield.value))
 {
         alert(pname + " and " + cname + " should be same")
         cfield.value=""
         if (cfield.type!="hidden") {
         cfield.focus()
         }
         return false
 }
    
 return true
}  


// This function is used to select any one option among the three radio buttons or enter the value in the textbox

function checkUserName(rfield,rname,tfield,tname)
{
  var i,j
  i=0
  j=0
 
  for(i=0;i<=2;i++)
   {
   	 if(rfield[i].checked)
   	 {
    	j=1;
	    break;
	  } 
   }
  
  if(j==0)
  {
	   if(tfield.value=="")
   	   {
		  alert(rname + " Or " + tname + " (i.e Your Choice) ");
		  //rfield.focus()
	      return false;
	   }
	   
	   else if(tfield.value!="")
   	   {
   	        var LoginName=tfield.value
   	        
   	        for(var i=0;i<LoginName.length;i++)
   	        {
   	          char=LoginName.charAt(i)
   	          if (char == " ")
   	          {
   	            alert("Spaces are not allowed")
   	            if (field.type!="hidden") {
   	            tfield.focus()
   	            }
   	            return false;
   	          }
   	         }
         }
   }
   else if(j==1)
   {
  	 if(tfield.value!="")
   	 {
   	        alert("Either "+  rname + " Or " + tname + " (i.e Your Choice) ");
	        tfield.value="";
	        rfield[i].checked=false;
	        //rfield.focus()
	        return false;
	        
	  }
    } 
   return true;
}           



// This function is used to check whether the Eradio button value is selected or not.


function checkERadioButton(field,name)
{
 var i,flag=0
 for(i=0;i<field.length;i++)
 {
        if (field[i].checked)
        {
        
          flag=1
          break
         } 
  }
  
     if(flag==0)
     {
        alert(name + " should be selected")
        return false
     }
     else
     {
		 if (field[i].value == "1")
		 {
			 RadioValue=1
		 }
		  else if (field[i].value == "2")
		  {
			 RadioValue=2
		  }
	  }
    
  return true
}




// This function is used to check whether the radio button value is selected or not.


function checkRadioButton(field,name)
{
 var i,flag=0
 for(i=0;i<field.length;i++)
 {
        if (field[i].checked)
        {
        
          flag=1
          break
         } 
  }
  
     if(flag==0)
     {
        alert(name + " should be selected")
        return false
     }
     /* else
     {
		 if (field[i].value == "1")
		 {
			 RadioValue=1
		 }
		  else if (field[i].value == "2")
		  {
			 RadioValue=2
		  }
	  }*/
    
  return true
}





// This function is used to check whether the check box is selected or not.
// This function is working for multiple check boxes and single check box also.


function checkCheckBox(field,name)
{
 var i,flag=0
 
 if (field.length > 1)
 {
   for(i=0;i<field.length;i++)
   {
        if (field[i].checked)
        {
          flag=1
          break
         } 
   }
  
 }
 else
 {
   if (field.checked)
   {
      flag=1
   }   
 }
 
     if(flag==0)
     {
        alert(name + " should be selected")
        return false
     }
    
  
  return true
}



// This function is used to foucs the pointer on the first field of the form.

 function focusFunc()
 {

 outer:
 for(var i=0; i<document.forms.length; i++)
 {
	 for(var j=0; j<document.forms[i].length; j++)
	 {
		 var field=document.forms[i].elements[j];
			 
			 if((field.type == "text") || field.type == "textarea" || field.type == "password")
			 {
			 	if(field.value==""){
					document.forms[i].elements[j].focus();
					break outer;
				}
		  	 }
		
	  }
 }
}

function assign()
{
 //alert("inside function")
   var i,j
   i=0
   j=0
   for(i=0;i<=2;i++)
   {
  	 if(document.loginch.rlogin[i].checked)
   	 {
    		j=1;
	        break;
	 } 
   }
  
  if(j==0)
  {
	   if(document.loginch.username.value=="")
   	   {
		alert("Select The Option Or Enter The text field (i.e Your Choice)");
	    return false;
	   }
	   
	   else if(document.loginch.username.value!="")
   	   {
   	        loginname=document.loginch.username.value
   	        for(var i=0;i<loginname.length;i++)
   	        {
   	          char=loginname.charAt(i)
   	          if (char == " ")
   	          {
   	            alert("Spaces are not allowed")
   	            document.loginch.username.focus()
   	            return false;
   	          }
   	        }
       }
   }
  else if(j==1)
  {
  	 if(document.loginch.username.value!="")
   	 {
   	        alert("Either Select The Option Or Enter The text field (i.e Your Choice)");
	        document.loginch.username.value="";
	        document.loginch.rlogin[i].checked=false;
	        return false;
	 }
	 
	 
  } 
  return true;
}  
//Checks exclusively for userName
function checkUserName1(field,name)
{
	if(field.value=="" )
	{
		alert("The "+name+" field cannot be empty");
		if (field.type!="hidden") {
		field.focus();
		}
		return false;
	}
	else
	{
		
	    var str=field.value
	    if (str.length<3)
	    {
			alert("The " + name + " should have atleast 3 characters");
			if (field.type!="hidden") {
			field.focus();
			}
			return false;	
	    }
		var title=str.charCodeAt(0);
		if(title <= 32 || title > 138 || title == 92)
		{
			alert("The first character should not start with space or other special charcters");
			if (field.type!="hidden") {
			field.focus();
			}
			return false;	
		}
		var char1;	
		for(var i=0;i<str.length;i++)
		{			

			char1=str.charCodeAt(i);
			
			 if(char1==32)
			 {
				alert("Spaces are not allowed");
				if (field.type!="hidden") {
				field.focus();
				}
				return false;	
			 }
			 if((char1==46) || (char1==95) || ((char1 >=48) && (char1<=57)) || ((char1 >= 65) && (char1<=91)) || ((char1 >= 97) && (char1<=122)))
			 {
			   
			 }
			 else
			  {
					alert("Enter Proper UserName.Special characters other than underscore are not allowed");
					if (field.type!="hidden") {
					field.focus();
					}
					return false;	
				}
         }

				
	}
	return true;
}   
