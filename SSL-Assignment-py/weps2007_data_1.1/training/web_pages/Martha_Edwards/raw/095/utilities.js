
function click_ship()
{
//return true;
}

function toggleoff()
{  
var obj1;
  var divs = document.getElementsByTagName("div");
  for (var x = 0; x < divs.length; ++x)
  {
    if ((divs[x].id.indexOf("shUSPS") >= 0) || (divs[x].id.indexOf("shUPS") >= 0) || (divs[x].id.indexOf("shCA Post") >= 0) || (divs[x].id.indexOf("shFEDEX") >= 0))
      obj1=document.getElementById(divs[x].id);
	if (obj1!=undefined) {
	obj1.style.display = 'none';
	}
  }    
} 


function toggleoff_mul(shipment)
{  
var obj1;
  var divs = document.getElementsByTagName("div");
  for (var x = 0; x < divs.length; ++x)
  {
    if ((divs[x].id.indexOf("sh" + shipment + "USPS") >= 0) || (divs[x].id.indexOf("sh" + shipment + "UPS") >= 0) || (divs[x].id.indexOf("sh" + shipment + "CA Post") >= 0) || (divs[x].id.indexOf("sh" + shipment + "FEDEX") >= 0))
      obj1=document.getElementById(divs[x].id);
	if (obj1!=undefined) {
	obj1.style.display = 'none';
	}
  }    
} 



function toggle(itemname)
{
var obj1;
obj1=document.getElementById(itemname);

if (obj1!=undefined) {

  if (obj1.style.display == 'none')
  {obj1.style.display = ''
  }
  else
  obj1.style.display = 'none'
} }

function doclick()
{

}

function filladdress(save_address){
		
		var frm = document.addresslist;
		
		var oElement = eval(save_address)

		if (oElement.selectedIndex < 0) oElement.selectedIndex = 0;

		if (oElement.selectedIndex > -1) {
			var oValues = oElement.options[oElement.selectedIndex].value.split("::");
			
			eval("document.checkoutform.shipping_address").value = oValues[0];
			eval("document.checkoutform.shipping_firstname").value = oValues[1];
			eval("document.checkoutform.shipping_lastname").value = oValues[2];
			eval("document.checkoutform.shipping_address2").value = oValues[3];
			eval("document.checkoutform.shipping_city").value = oValues[4];
			eval("document.checkoutform.shipping_zip").value = oValues[4];
			eval("document.checkoutform.shipping_state").value = oValues[6];
			eval("document.checkoutform.shipping_country").value = oValues[7];
			eval("document.checkoutform.shipping_phone").value = oValues[8];
			eval("document.checkoutform.shipping_company").value = oValues[9];
			
			
		} else {
			//alert("You must select an address to fill.");
		}
	}



var isSubmitComplete = false;
var paymentfound=0;
    
    function submitForm(){

         if ((!isSubmitComplete)){
		
		   isSubmitComplete = true;
                  
              	   return true;
			  
         }else{
              alert("Form already submitted please wait...");
	      return false;
         }
    }




/*
  -------------------------------------------------------------------------
	                    JavaScript Form Validator 
                                Version 2.0.2
	Copyright 2003 JavaScript-coder.com. All rights reserved.
	You use this script in your Web pages, provided these opening credit
    lines are kept intact.
	The Form validation script is distributed free from JavaScript-Coder.com

	You may please add a link to JavaScript-Coder.com, 
	making it easy for others to find this script.
	Checkout the Give a link and Get a link page:
	http://www.javascript-coder.com/links/how-to-link.php

    You may not reprint or redistribute this code without permission from 
    JavaScript-Coder.com.
	
	JavaScript Coder
	It precisely codes what you imagine!
	Grab your copy here:
		http://www.javascript-coder.com/
    -------------------------------------------------------------------------  
*/
function Validator(frmname)
{
  this.formobj=document.forms[frmname];
	if(!this.formobj)
	{
	 // alert("BUG: couldnot get Form object "+frmname);
		return;
	}
	if(this.formobj.onsubmit)
	{
	 this.formobj.old_onsubmit = this.formobj.onsubmit;
	 this.formobj.onsubmit=null;
	}
	else
	{
	 this.formobj.old_onsubmit = null;
	}
	this.formobj.onsubmit=form_submit_handler;
	this.addValidation = add_validation;
	this.setAddnlValidationFunction=set_addnl_vfunction;
	this.clearAllValidations = clear_all_validations;
}
function set_addnl_vfunction(functionname)
{
  this.formobj.addnlvalidation = functionname;
}
function clear_all_validations()
{
	for(var itr=0;itr < this.formobj.elements.length;itr++)
	{
		this.formobj.elements[itr].validationset = null;
	}
}
function form_submit_handler()
{




	for(var itr=0;itr < this.elements.length;itr++)
	{
		if(this.elements[itr].validationset &&
	   !this.elements[itr].validationset.validate())
		{
		  return false;
		}
	}
	if(this.addnlvalidation)
	{
	  str =" var ret = "+this.addnlvalidation+"()";
	  eval(str);
    if(!ret) return ret;
	}

	
	return true;
}
function add_validation(itemname,descriptor,errstr)
{
  if(!this.formobj)
	{
	 // alert("BUG: the form object is not set properly");
		return;
	}//if
	var itemobj = this.formobj[itemname];
  if(!itemobj)
	{
	 // alert("BUG: Couldnot get the input object named: "+itemname);
		return;
	}
	if(!itemobj.validationset)
	{
	  itemobj.validationset = new ValidationSet(itemobj);
	}
  itemobj.validationset.add(descriptor,errstr);
}
function ValidationDesc(inputitem,desc,error)
{
  this.desc=desc;
	this.error=error;
	this.itemobj = inputitem;
	this.validate=vdesc_validate;
}
function vdesc_validate()
{
 if(!V2validateData(this.desc,this.itemobj,this.error))
 {
    if (this.itemobj.type!='hidden'){
	this.itemobj.focus();
		return false;}
 }
 return true;
}
function ValidationSet(inputitem)
{
    this.vSet=new Array();
	this.add= add_validationdesc;
	this.validate= vset_validate;
	this.itemobj = inputitem;
}
function add_validationdesc(desc,error)
{
  this.vSet[this.vSet.length]= 
	  new ValidationDesc(this.itemobj,desc,error);
}
function vset_validate()
{
   for(var itr=0;itr<this.vSet.length;itr++)
	 {
	   if(!this.vSet[itr].validate())
		 {
		   return false;
		 }
	 }
	 return true;
}
function validateEmailv2(email)
{
// a very simple email validation checking. 
// you can add more complex email checking if it helps 
    if(email.length <= 0)
	{
	  return true;
	}
    var splitted = email.match("^(.+)@(.+)$");
    if(splitted == null) return false;
    if(splitted[1] != null )
    {
      var regexp_user=/^\"?[\w-_\.]*\"?$/;
      if(splitted[1].match(regexp_user) == null) return false;
    }
    if(splitted[2] != null)
    {
      var regexp_domain=/^[\w-\.]*\.[A-Za-z]{2,4}$/;
      if(splitted[2].match(regexp_domain) == null) 
      {
	    var regexp_ip =/^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
	    if(splitted[2].match(regexp_ip) == null) return false;
      }// if
      return true;
    }
return false;
}




function validatePhone(phonenumber)
{
// a very simple email validation checking. 
// you can add more complex email checking if it helps 
    if(phonenumber.length <= 0)
	{
	  return true;
	}

	var digits = "0123456789";
	var phoneNumberDelimiters = "()- ";
	var validWorldPhoneChars = phoneNumberDelimiters + "+";
	var minDigitsInIPhoneNumber = 10;

	s=stripCharsInBag(phonenumber,validWorldPhoneChars);
	if (isInteger(s) && s.length >= minDigitsInIPhoneNumber)
	{
	  return true;
	}

 return false;
}

function isInteger(s)
{   var i;
    for (i = 0; i < s.length; i++)
    {   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag)
{   var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++)
    {   
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function V2validateData(strValidateStr,objValue,strError) 
{ 
    var epos = strValidateStr.search("="); 
    var  command  = ""; 
    var  cmdvalue = ""; 
    if(epos >= 0) 
    { 
     command  = strValidateStr.substring(0,epos); 
     cmdvalue = strValidateStr.substr(epos+1); 
    } 
    else 
    { 
     command = strValidateStr; 
    } 
    switch(command) 
    { 
        case "req": 
        case "required": 
         { 

           if(eval(objValue.value.length) == 0) 
           { 
//alert(objvalue.name);


              if(!strError || strError.length ==0) 
              { 
                strError = objValue.name + " : Required Field"; 
              }//if 
              alert(strError); 
              return false; 
           }//if 
           break;             
         }//case required 
        case "checkbox": 
         { 
           if(eval(objValue.checked) != true) 
           { 
              if(!strError || strError.length ==0) 
              { 
                strError = objValue.name + " : Required Field"; 
              }//if 
              alert(strError); 
              return false; 
           }//if 
           break;             
         }//case required chk
        case "maxlength": 
        case "maxlen": 
          { 
             if(eval(objValue.value.length) >  eval(cmdvalue)) 
             { 
               if(!strError || strError.length ==0) 
               { 
                 strError = objValue.name + " : "+cmdvalue+" characters maximum "; 
               }//if 
               alert(strError + "\n[Current length = " + objValue.value.length + " ]"); 
               return false; 
             }//if 
             break; 
          }//case maxlen 
        case "minlength": 
        case "minlen": 
           { 
             if(eval(objValue.value.length) <  eval(cmdvalue)) 
             { 
               if(!strError || strError.length ==0) 
               { 
                 strError = objValue.name + " : " + cmdvalue + " characters minimum  "; 
               }//if               
               alert(strError + "\n[Current length = " + objValue.value.length + " ]"); 
               return false;                 
             }//if 
             break; 
            }//case minlen 
        case "alnum": 
        case "alphanumeric": 
           { 
              var charpos = objValue.value.search("[^A-Za-z0-9]"); 
              if(objValue.value.length > 0 &&  charpos >= 0) 
              { 
               if(!strError || strError.length ==0) 
                { 
                  strError = objValue.name+": Only alpha-numeric characters allowed "; 
                }//if 
                alert(strError + "\n [Error character position " + eval(charpos+1)+"]"); 
                return false; 
              }//if 
              break; 
           }//case alphanumeric 
        case "num": 
        case "numeric": 
           { 
              var charpos = objValue.value.search("[^0-9]"); 
              if(objValue.value.length > 0 &&  charpos >= 0) 
              { 
                if(!strError || strError.length ==0) 
                { 
                  strError = objValue.name+": Only digits allowed "; 
                }//if               
                alert(strError + "\n [Error character position " + eval(charpos+1)+"]"); 
                return false; 
              }//if 
              break;               
           }//numeric 
        case "alphabetic": 
        case "alpha": 
           { 
              var charpos = objValue.value.search("[^A-Za-z]"); 
              if(objValue.value.length > 0 &&  charpos >= 0) 
              { 
                  if(!strError || strError.length ==0) 
                { 
                  strError = objValue.name+": Only alphabetic characters allowed "; 
                }//if                             
                alert(strError + "\n [Error character position " + eval(charpos+1)+"]"); 
                return false; 
              }//if 
              break; 
           }//alpha 
		case "alnumhyphen":
			{
              var charpos = objValue.value.search("[^A-Za-z0-9\-_]"); 
              if(objValue.value.length > 0 &&  charpos >= 0) 
              { 
                  if(!strError || strError.length ==0) 
                { 
                  strError = objValue.name+": characters allowed are A-Z,a-z,0-9,- and _"; 
                }//if                             
                alert(strError + "\n [Error character position " + eval(charpos+1)+"]"); 
                return false; 
              }//if 			
			break;
			}
        case "email": 
          { 
               if(!validateEmailv2(objValue.value)) 
               { 
                 if(!strError || strError.length ==0) 
                 { 
                    strError = objValue.name+": Enter a valid Email address "; 
                 }//if                                               
                 alert(strError); 
                 return false; 
               }//if 
           break; 
          }//case email 
	 case "phone": 
          { 
               if(!validatePhone(objValue.value)) 
               { 
                 if(!strError || strError.length ==0) 
                 { 
                    strError = objValue.name+": Enter a valid Phone Number "; 
                 }//if                                               
                 alert(strError); 
                 return false; 
               }//if 
           break; 
          }//case phone
        case "lt": 
        case "lessthan": 
         { 
            if(isNaN(objValue.value)) 
            { 
              alert(objValue.name+": Should be a number "); 
              return false; 
            }//if 
            if(eval(objValue.value) >=  eval(cmdvalue)) 
            { 
              if(!strError || strError.length ==0) 
              { 
                strError = objValue.name + " : value should be less than "+ cmdvalue; 
              }//if               
              alert(strError); 
              return false;                 
             }//if             
            break; 
         }//case lessthan 
        case "gt": 
        case "greaterthan": 
         { 
            if(isNaN(objValue.value)) 
            { 
              alert(objValue.name+": Should be a number "); 
              return false; 
            }//if 
             if(eval(objValue.value) <=  eval(cmdvalue)) 
             { 
               if(!strError || strError.length ==0) 
               { 
                 strError = objValue.name + " : value should be greater than "+ cmdvalue; 
               }//if               
               alert(strError); 
               return false;                 
             }//if             
            break; 
         }//case greaterthan 
        case "regexp": 
         { 
		 	if(objValue.value.length > 0)
			{
	            if(!objValue.value.match(cmdvalue)) 
	            { 
	              if(!strError || strError.length ==0) 
	              { 
	                strError = objValue.name+": Invalid characters found "; 
	              }//if                                                               
	              alert(strError); 
	              return false;                   
	            }//if 
			}
           break; 
         }//case regexp 
        case "dontselect": 
         { 
//alert(objValue.selectedIndex);
            if(objValue.selectedIndex == null) 
            { 
              //alert("BUG: dontselect command for non-select Item"); 
              return false; 
            } 
            if(objValue.selectedIndex == eval(cmdvalue)) 
            { 
             if(!strError || strError.length ==0) 
              { 
              strError = objValue.name+": Please Select one option "; 
              }//if                                                               
              alert(strError); 
              return false;                                   
             } 
             break; 
         }//case dontselect 
    }//switch 
    return true; 
}
/*
	Copyright 2003 JavaScript-coder.com. All rights reserved.
*/


















// FOR MAILING LIST
//////////////////////////////////////////////////////////////////////////////////////////
function mailing_list()
{
if (document.mailing.email.value=="")
{
alert("Please enter an email!");
return false;
}
return true;
}


// FOR CHECKOUT 1
//////////////////////////////////////////////////////////////////////////////////////////
function Changeshippingtype(stype) 
{
		if (stype == 1)
		{
			
			country_object="document.checkoutform.shipping_country";
			if (eval(country_object)) 
			{
			document.checkoutform.shipping_type[0].checked=true;
			select_field(country_object,"US");
			}
			
		}
		else
		{
			document.checkoutform.shipping_type[1].checked=true;
		}


}


function select_field(objectname,objvalue)
{
for (i=0;i<=(eval(objectname+'.length')-1);i++)
{
if ((eval(objectname + '.options[' + i + '].value'))==objvalue)
{
eval(objectname+'.options['+i+'].selected=true');
}
else{
eval(objectname+'.options['+i+'].selected=false');
}}}
//////////////////////////////////////////////////////////////////////////////////////////

// FOR CHECKOUT 2
//////////////////////////////////////////////////////////////////////////////////////////
function checkselectedshipping()
{

}
//////////////////////////////////////////////////////////////////////////////////////////

// FOR CHECKOUT 3
//////////////////////////////////////////////////////////////////////////////////////////


//document.billing.billing_country.value='[shipping_country]';

// For each option in country drop down... find index of shipping country, and select it!

function select_field(objectname,objvalue)
{
for (i=0;i<=(eval(objectname+'.length')-1);i++)
{
if ((eval(objectname + '.options[' + i + '].value'))==objvalue)
{
eval(objectname+'.options['+i+'].selected=true');
}
else{
eval(objectname+'.options['+i+'].selected=false');
}}}

function Changeshippingtypeb(stype) 
{
		if (stype == 1)
		{
			if (eval(country_object)) 
			{
			document.billing.billing_type[0].checked=true;
			country_object="document.billing.billing_country";
			select_field(country_object,"US");
			}
		}
		else
		{
			document.billing.billing_type[1].checked=true;
		}
}
//////////////////////////////////////////////////////////////////////////////////////////

function checkreq_questions1()
{
	 var frm = document.forms["checkoutform"];
	 var fieldval;
  
  
  	
    for (var i = 0; i<frm.elements.length; i++) {
        if ((frm.elements[i].name.indexOf('OPTREQ') > -1)) {
            
            
            if (frm.elements[i].type == 'checkbox') 
            {
           	if ((frm.elements[i].checked)!=true) 
           	{alert ("Please fill in all required fields.");
            frm.elements[i].focus();   
            return false; 
            }
           	
            
           	}
            else
         	{
            if (frm.elements[i].value <='')
            {alert ("Please fill in all required fields.");
            frm.elements[i].focus();         
            return false;
            }
            
            }
            
        	
        }
    }
  
  return submitForm();

   }

function checkreq_questions3()
{
	 var frm = document.forms["billing"];
	 var fieldval;
  
  
  	
    for (var i = 0; i<frm.elements.length; i++) {
        if ((frm.elements[i].name.indexOf('OPTREQ') > -1) && (frm.elements[i].name.indexOf('cq') > -1)) {
            
            
            if (frm.elements[i].type == 'checkbox') 
            {
           	if ((frm.elements[i].checked)!=true) 
           	{alert ("Please fill in all required fields.");
            frm.elements[i].focus();   
            return false; 
            }
           	
            
           	}
            else
         	{
            if (frm.elements[i].value <='')
            {alert ("Please fill in all required fields.");
            frm.elements[i].focus();         
            return false;
            }
            
            }
            
        	
        }
    }
  
  

   }
   	
function checkreq_questions2()
{
	 var frm = document.forms["pickship"];
	 var fieldval;
  
  
  	
    for (var i = 0; i<frm.elements.length; i++) {
        if ((frm.elements[i].name.indexOf('OPTREQ') > -1) ) {
            
            
            if (frm.elements[i].type == 'checkbox') 
            {
           	if ((frm.elements[i].checked)!=true) 
           	{alert ("Please fill in all required fields.");
            frm.elements[i].focus();   
            return false; 
            }
           	
            
           	}
            else
         	{
            if (frm.elements[i].value <='')
            {alert ("Please fill in all required fields.");
            frm.elements[i].focus();         
            return false;
            }
            
            }
            
        	
        }
    }
  
  return submitForm();

   }
	



function checkotherreqfields()
{
	 var frm = document.forms["billing"];
	 var fieldval;
	var paymentinfo;
	  var paymentsel;

  var maxpmethods=0;
  
  if (frm.payment.length!=undefined)
  {
  maxpmethods=frm.payment.length;
  }


if (maxpmethods>0) 
{
// Loop from zero to the one minus the number of radio button selections
for (counter = 0; counter < maxpmethods; counter++)
{
// If a radio button has been selected it will return true
// (If not it will return false)
if (frm.payment[counter].checked)
paymentsel=frm.payment[counter].value;
}}
else
{
paymentsel=frm.payment.value;
}


 if (paymentsel>'')
  {
  	paymentinfo=paymentsel.split("-");
  
  
  	
    for (var i = 0; i<frm.elements.length; i++) {
        if ((frm.elements[i].name.indexOf('OPTREQ') > -1)) {
            if ((frm.elements[i].name.indexOf('ff'+paymentinfo[1]+'_') > -1)) {
            if (frm.elements[i].value <='')
            {alert ("Please fill in all required fields.");
            frm.elements[i].focus();         
            return false;
            }
        	}
        }
    }
  

   }
	
	if (CheckCreditCards()!=false) //' If credit cards pass, lets check submit wasnt done twice. 
	{
	if (checkreq_questions3()!=false) 
	{		
	return submitForm();
	}
	else
	{
	return false;
	}
	
	}
	else
	{
		return false;
	}
	
}

function CheckCreditCards()
{
	
  var frm = document.forms["billing"];
  var paymentsel;
  var maxpmethods=0;
  
  if (frm.payment.length!=undefined)
  {
  maxpmethods=frm.payment.length;
  }


if (maxpmethods>0) 
{
// Loop from zero to the one minus the number of radio button selections
for (counter = 0; counter < maxpmethods; counter++)
{
// If a radio button has been selected it will return true
// (If not it will return false)
if (frm.payment[counter].checked)
paymentsel=frm.payment[counter].value;
}}
else
{
paymentsel=frm.payment.value;
}

  if (paymentsel>'')
  {
  	paymentinfo=paymentsel.split("-");
  	//alert(paymentinfo(1));
  	
  		//Check if credit card field is present, if so, check validity...
  	var cc_field
  	var paymentid=paymentinfo[1];
  	var cc_expmonth;
  	var cc_expyear;
  	var cc_cvv2;
  	
  		cc_field=eval("document.forms['billing'].ff" + paymentid + "_ocardno");
  	    cc_expmonth=eval("document.forms['billing'].ff" + paymentid + "_ocardexpiresmonth");
  	    cc_expyear=eval("document.forms['billing'].ff" + paymentid + "_ocardexpiresyear");
  	    cc_cvv2=eval("document.forms['billing'].ff" + paymentid + "_ocardcvv2");
  	
if ((cc_cvv2!=undefined)) 
{
if (cc_cvv2.value=="" )
{
	alert("Please enter CVV2 (Card Verification Code)");
  	return false;
}
}


  	if ((cc_field!=undefined) && (cc_expmonth!=undefined) && (cc_expyear!=undefined))
  	    {
  	return CheckCardNumber(cc_field,cc_expmonth,cc_expyear);
  	}
  	else
  	{



  	return true;


  	}
  	
  }
  
  
  
 // if(frm.pwd1.value != frm.pwd2.value)
 // {
  //  alert('The Password and verified password don not match!');
  //  return false;
 // }
 // else
  //{
  //  return true;
 // }
}

var Cards = new makeArray(8);
Cards[0] = new CardType("MasterCard", "51,52,53,54,55", "16");
var MasterCard = Cards[0];
Cards[1] = new CardType("VisaCard", "4", "13,16");
var VisaCard = Cards[1];
Cards[2] = new CardType("AmExCard", "34,37", "15");
var AmExCard = Cards[2];
Cards[3] = new CardType("DinersClubCard", "30,36,38", "14");
var DinersClubCard = Cards[3];
Cards[4] = new CardType("DiscoverCard", "6011", "16");
var DiscoverCard = Cards[4];
Cards[5] = new CardType("enRouteCard", "2014,2149", "15");
var enRouteCard = Cards[5];
Cards[6] = new CardType("JCBCard", "3088,3096,3112,3158,3337,3528", "16");
var JCBCard = Cards[6];
var LuhnCheckSum = Cards[7] = new CardType();

/*************************************************************************\
CheckCardNumber(form)
function called when users click the "check" button.
\*************************************************************************/
function CheckCardNumber(cardnum,cardmonth,cardyear) {
var tmpyear;
if (cardnum.value.length == 0) {
alert("Please enter a Card Number.");
cardnum.focus();
return false;
}

if (cardyear.options[cardyear.selectedIndex].value > 2000)
tmpyear=cardyear.options[cardyear.selectedIndex].value;
else if (cardyear.options[cardyear.selectedIndex].value > 96)
tmpyear = "19" + cardyear.options[cardyear.selectedIndex].value;
else if (cardyear.options[cardyear.selectedIndex].value < 21)
tmpyear = "20" + cardyear.options[cardyear.selectedIndex].value;
else {                            
alert("The Expiration Year is not valid.");
return false;
}
tmpmonth = cardmonth.options[cardmonth.selectedIndex].value;


// The following line doesn't work in IE3, you need to change it
// to something like "(new CardType())...".
// if (!CardType().isExpiryDate(tmpyear, tmpmonth)) {
if (!(new CardType()).isExpiryDate(tmpyear, tmpmonth)) {
alert("This card has already expired.");
return false;
}

card = "MasterCard";
var retval = new CardType().checkCardNumber(cardnum.value,tmpyear,tmpmonth);
cardname = "";

if (retval){
	return true;}
else
{
	alert("Credit card number is incorrect");
	cardnum.focus();
	return false;}
}
/*************************************************************************\
Object CardType([String cardtype, String rules, String len, int year, 
                                        int month])
cardtype    : type of card, eg: MasterCard, Visa, etc.
rules       : rules of the cardnumber, eg: "4", "6011", "34,37".
len         : valid length of cardnumber, eg: "16,19", "13,16".
year        : year of expiry date.
month       : month of expiry date.
eg:
var VisaCard = new CardType("Visa", "4", "16");
var AmExCard = new CardType("AmEx", "34,37", "15");
\*************************************************************************/
function CardType() {
var n;
var argv = CardType.arguments;
var argc = CardType.arguments.length;

this.objname = "object CardType";

var tmpcardtype = (argc > 0) ? argv[0] : "CardObject";
var tmprules = (argc > 1) ? argv[1] : "0,1,2,3,4,5,6,7,8,9";
var tmplen = (argc > 2) ? argv[2] : "13,14,15,16,19";

this.setCardNumber = setCardNumber;  // set CardNumber method.
this.setCardType = setCardType;  // setCardType method.
this.setLen = setLen;  // setLen method.
this.setRules = setRules;  // setRules method.
this.setExpiryDate = setExpiryDate;  // setExpiryDate method.

this.setCardType(tmpcardtype);
this.setLen(tmplen);
this.setRules(tmprules);
if (argc > 4)
this.setExpiryDate(argv[3], argv[4]);

this.checkCardNumber = checkCardNumber;  // checkCardNumber method.
this.getExpiryDate = getExpiryDate;  // getExpiryDate method.
this.getCardType = getCardType;  // getCardType method.
this.isCardNumber = isCardNumber;  // isCardNumber method.
this.isExpiryDate = isExpiryDate;  // isExpiryDate method.
this.luhnCheck = luhnCheck;// luhnCheck method.
return this;
}

/*************************************************************************\
boolean checkCardNumber([String cardnumber, int year, int month])
return true if cardnumber pass the luhncheck and the expiry date is
valid, else return false.
\*************************************************************************/
function checkCardNumber() {
var argv = checkCardNumber.arguments;
var argc = checkCardNumber.arguments.length;
var cardnumber = (argc > 0) ? argv[0] : this.cardnumber;
var year = (argc > 1) ? argv[1] : this.year;
var month = (argc > 2) ? argv[2] : this.month;

this.setCardNumber(cardnumber);
this.setExpiryDate(year, month);

if (!this.isCardNumber())
return false;
if (!this.isExpiryDate())
return false;

return true;
}
/*************************************************************************\
String getCardType()
return the cardtype.
\*************************************************************************/
function getCardType() {
return this.cardtype;
}
/*************************************************************************\
String getExpiryDate()
return the expiry date.
\*************************************************************************/
function getExpiryDate() {
return this.month + "/" + this.year;
}
/*************************************************************************\
boolean isCardNumber([String cardnumber])
return true if cardnumber pass the luhncheck and the rules, else return
false.
\*************************************************************************/
function isCardNumber() {
var argv = isCardNumber.arguments;
var argc = isCardNumber.arguments.length;
var cardnumber = (argc > 0) ? argv[0] : this.cardnumber;
if (!this.luhnCheck())
return false;

for (var n = 0; n < this.len.size; n++)
if (cardnumber.toString().length == this.len[n]) {
for (var m = 0; m < this.rules.size; m++) {
var headdigit = cardnumber.substring(0, this.rules[m].toString().length);
if (headdigit == this.rules[m])
return true;
}
return false;
}
return false;
}

/*************************************************************************\
boolean isExpiryDate([int year, int month])
return true if the date is a valid expiry date,
else return false.
\*************************************************************************/
function isExpiryDate() {
var argv = isExpiryDate.arguments;
var argc = isExpiryDate.arguments.length;

year = argc > 0 ? argv[0] : this.year;
month = argc > 1 ? argv[1] : this.month;

if (!isNum(year+""))
return false;
if (!isNum(month+""))
return false;
today = new Date();
expiry = new Date(year, month);
if (today.getTime() > expiry.getTime())
return false;
else
return true;
}

/*************************************************************************\
boolean isNum(String argvalue)
return true if argvalue contains only numeric characters,
else return false.
\*************************************************************************/
function isNum(argvalue) {
argvalue = argvalue.toString();

if (argvalue.length == 0)
return false;

for (var n = 0; n < argvalue.length; n++)
if (argvalue.substring(n, n+1) < "0" || argvalue.substring(n, n+1) > "9")
return false;

return true;
}

/*************************************************************************\
boolean luhnCheck([String CardNumber])
return true if CardNumber pass the luhn check else return false.
Reference: http://www.ling.nwu.edu/~sburke/pub/luhn_lib.pl
\*************************************************************************/
function luhnCheck() {
var argv = luhnCheck.arguments;
var argc = luhnCheck.arguments.length;

var CardNumber = argc > 0 ? argv[0] : this.cardnumber;

if (! isNum(CardNumber)) {
return false;
  }

var no_digit = CardNumber.length;
var oddoeven = no_digit & 1;
var sum = 0;

for (var count = 0; count < no_digit; count++) {
var digit = parseInt(CardNumber.charAt(count));
if (!((count & 1) ^ oddoeven)) {
digit *= 2;
if (digit > 9)
digit -= 9;
}
sum += digit;
}
if (sum % 10 == 0)
return true;
else
return false;
}

/*************************************************************************\
ArrayObject makeArray(int size)
return the array object in the size specified.
\*************************************************************************/
function makeArray(size) {
this.size = size;
return this;
}

/*************************************************************************\
CardType setCardNumber(cardnumber)
return the CardType object.
\*************************************************************************/
function setCardNumber(cardnumber) {
this.cardnumber = cardnumber;
return this;
}

/*************************************************************************\
CardType setCardType(cardtype)
return the CardType object.
\*************************************************************************/
function setCardType(cardtype) {
this.cardtype = cardtype;
return this;
}

/*************************************************************************\
CardType setExpiryDate(year, month)
return the CardType object.
\*************************************************************************/
function setExpiryDate(year, month) {
this.year = year;
this.month = month;
return this;
}

/*************************************************************************\
CardType setLen(len)
return the CardType object.
\*************************************************************************/
function setLen(len) {
// Create the len array.
if (len.length == 0 || len == null)
len = "13,14,15,16,19";

var tmplen = len;
n = 1;
while (tmplen.indexOf(",") != -1) {
tmplen = tmplen.substring(tmplen.indexOf(",") + 1, tmplen.length);
n++;
}
this.len = new makeArray(n);
n = 0;
while (len.indexOf(",") != -1) {
var tmpstr = len.substring(0, len.indexOf(","));
this.len[n] = tmpstr;
len = len.substring(len.indexOf(",") + 1, len.length);
n++;
}
this.len[n] = len;
return this;
}

/*************************************************************************\
CardType setRules()
return the CardType object.
\*************************************************************************/
function setRules(rules) {
// Create the rules array.
if (rules.length == 0 || rules == null)
rules = "0,1,2,3,4,5,6,7,8,9";
  
var tmprules = rules;
n = 1;
while (tmprules.indexOf(",") != -1) {
tmprules = tmprules.substring(tmprules.indexOf(",") + 1, tmprules.length);
n++;
}
this.rules = new makeArray(n);
n = 0;
while (rules.indexOf(",") != -1) {
var tmpstr = rules.substring(0, rules.indexOf(","));
this.rules[n] = tmpstr;
rules = rules.substring(rules.indexOf(",") + 1, rules.length);
n++;
}
this.rules[n] = rules;
return this;
}
//  End -->


