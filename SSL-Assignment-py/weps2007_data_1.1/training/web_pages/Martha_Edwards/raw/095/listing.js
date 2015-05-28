

function popup(filename,width,height)
{
result = window.open(filename, "popped1", "width="+ width + ", height="+height+", location=no, menubar=no, status=no, toolbar=no, scrollbars=yes, resizable=no");
if (result != null) html = "is not blocking";
else alert("Your Browser is blocking popups which is preventing a 3dCart window to appear.");
}

function popupsimple(filename,width,height)
{
var w = 480, h = 340;

if (document.all || document.layers) {
   w = screen.availWidth;
   h = screen.availHeight;
}

var leftPos = (w-width)/2, topPos = (h-height)/2;
result = window.open(filename, "popped1", "width="+ width + ", height="+height+",top=" + topPos + ",left=" + leftPos + ",location=no, menubar=no, status=no, toolbar=no, scrollbars=no, resizable=no");
if (result != null) html = "is not blocking";
else alert("Your Browser is blocking popups which is preventing a 3dCart window to appear.");
}

  var stocknum='';

function SearchAndReplace(Content, SearchFor, ReplaceWith) {

   var tmpContent = Content;
   var tmpBefore = new String();   
   var tmpAfter = new String();
   var tmpOutput = new String();
   var intBefore = 0;
   var intAfter = 0;

   if (SearchFor.length == 0)
      return;


   while (tmpContent.toUpperCase().indexOf(SearchFor.toUpperCase()) > -1) {
   
      // Get all content before the match
      intBefore = tmpContent.toUpperCase().indexOf(SearchFor.toUpperCase());
      tmpBefore = tmpContent.substring(0, intBefore);
      tmpOutput = tmpOutput + tmpBefore;

      // Get the string to replace
      tmpOutput = tmpOutput + ReplaceWith;


      // Get the rest of the content after the match until
      // the next match or the end of the content
      intAfter = tmpContent.length - SearchFor.length + 1;
      tmpContent = tmpContent.substring(intBefore + SearchFor.length);

   }

   return tmpOutput + tmpContent;

}

function Len(str)
/***
IN: str - the string whose length we are interested in

RETVAL: The number of characters in the string
***/
{ return String(str).length; }


function Left(str, n)
/***
IN: str - the string we are LEFTing
n - the number of characters we want to return

RETVAL: n characters from the left side of the string
***/
{
if (n <= 0) // Invalid bound, return blank string
return "";
else if (n > String(str).length) // Invalid bound, return
return str; // entire string
else // Valid bound, return appropriate substring
return String(str).substring(0,n);
}


function Right(str, n)
/***
IN: str - the string we are RIGHTing
n - the number of characters we want to return

RETVAL: n characters from the right side of the string
***/
{
if (n <= 0) // Invalid bound, return blank string
return "";
else if (n > String(str).length) // Invalid bound, return
return str; // entire string
else { // Valid bound, return appropriate substring
var iLen = String(str).length;
return String(str).substring(iLen, iLen - n);
}
}


function Mid(str, start, len)
{
// Make sure start and len are within proper bounds
if (start < 0 || len < 0) return "";

var iEnd, iLen = String(str).length;
if (start + len > iLen)
iEnd = iLen;
else
iEnd = start + len;

return String(str).substring(start,iEnd);
}

function InStr(strSearch, charSearchFor)
{
for (i=0; i < Len(strSearch); i++)
{
if (charSearchFor == Mid(strSearch, i, 1))
{
return i;
}
}
return -1;
} 





function validateValues(what,alerting) {
    var valid = true;
    var fieldnamemod= new String(); 
    var fieldvaluemod= new String();  
    var checkBoxes = false;
    var checkboxChecked = false;
    var price=0;    
    var radioButtons = false;
    var radioChecked = false;
    var imagename= new Image;

  
	stocknum='';
   

	if (document.add.std_price==null)
	{
	//'Item has no options.
	
	}
	else
	{


	price=document.add.std_price.value;

    for (var i=0, j=what.elements.length; i<j; i++) {
        myType = what.elements[i].type;
        

        
        fieldnamemod=what.elements[i].name;
if (fieldnamemod!='recipientselect') 
{
        var field_array;
 
 		//alert(fieldnamemod);
 		// IMAGE dropdown's
 		//alert(fieldnamemod + fieldnamemod.indexOf("di_"));
 		if (fieldnamemod.indexOf("di_") > -1) 
 		{
 		
 		// Have its own image per drop down
 		SetSrc(what,"img_" + fieldnamemod,GetValue(what,"image_" + what.elements[i].options[what.elements[i].selectedIndex].value));
 		
 		// change main image
 		//SetSrc(what,"large",GetValue(what,"image_" + what.elements[i].options[what.elements[i].selectedIndex].value));
 		
 		}

        if (myType == 'radio') {
            radioButtons = true;
           if (what.elements[i].checked)
           {radioChecked = true;
           
           price=eval(price)+eval(GetValue(what,"price_" + what.elements[i].value))
           
           }
        }
        if (myType == 'checkbox') {
            checkBoxes = true;
            if (what.elements[i].checked)
            {
            
            if (fieldnamemod>"")

	     price=eval(price)+eval(GetValue(what,"price_" + fieldnamemod))
           
            }
        }
        if (myType == 'hidden' || myType == 'password' || myType == 'text' || myType == 'textarea')
            if (what.elements[i].value == what.elements[i].defaultValue) valid = false;
        if (myType == 'select-one' || myType == 'select-multiple')
            {
            //if (what.elements[i].selectedIndex == 0) valid = false;
            
            if (what.elements[i].options[what.elements[i].selectedIndex].value>"")
            {
            //alert(what.elements[i].options[what.elements[i].selectedIndex].value + '::' + GetValue(what,"price_" + what.elements[i].options[what.elements[i].selectedIndex].value));

	    fieldvaluemod=what.elements[i].options[what.elements[i].selectedIndex].value; 
	    field_array=fieldvaluemod.split(":::");    
	    if (field_array[0]!=undefined){ stocknum=stocknum + field_array[1] + "#"}
              	    

	    price=eval(price)+eval(GetValue(what,"price_" + what.elements[i].options[what.elements[i].selectedIndex].value));
  
			}
			
			
            }
    }
}
    if ((checkBoxes && !checkboxChecked) || (radioButtons && !radioChecked)) valid = false;

    //if (!valid)
    //        alert('Form not completely filledxxx');

	//alert(price);
    	changeprice(price);
	if (alerting==1)
	{	
	return check_stock(what,stocknum);
	}
    //return valid;
    }
    
}






function GetValue(formx,name) {
//alert(name);
var i;
    for(i=0;i<formx.elements.length;i++) {
      if(formx.elements[i].name==name) {
        return formx.elements[i].value;
      }
    } 
  }

function SetSrc(formx,sname,sourcename) {

imgs=document.getElementsByTagName('img');
 for(i=0;i<imgs.length;i++)
 {
// alert(imgs[i].name + "-" + sname);	
// test if the class 'roll' exists
  if(imgs[i].name==sname)
  {
  //alert("XX");
   imgs[i].src=sourcename;
   
  }
 }




  }


function recalculate()
{                    	 
}


function changecontent(fieldname,content1)
{
var txt=content1;

  if (document.getElementById)
  {
	if (document.getElementById(fieldname)!=null)
	{
     	document.getElementById(fieldname).innerHTML = txt;
	document.getElementById(fieldname).style.visibility = 'visible';
	}
  }
  else if (document.all)
  {
	if (document.all[fiendname]!=null)
	{
    document.all[fiendname].innerHTML = txt;
    document.all[fieldname].style.visibility = 'visible';
	}
  }
  else if (document.layers)
  {
	
	if (document.layers[fieldname]!=null)
	{
     document.layers[fieldname].document.open();
     document.layers[fieldname].document.write(txt);
     document.layers[fieldname].document.close();
     document.layers[fieldname].visibility = 'show';
	}
  }
}


function changeprice(price)
{
var txt=formatCurrency(price);
changecontent('price',txt);
}

function formatCurrency(num) {
num = num.toString().replace(/\$|\,/g,'');
if(isNaN(num))
num = "0";
sign = (num == (num = Math.abs(num)));
num = Math.floor(num*100+0.50000000001);
cents = num%100;
num = Math.floor(num/100).toString();
if(cents<10)
cents = "0" + cents;
for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
num = num.substring(0,num.length-(4*i+3))+','+
num.substring(num.length-(4*i+3));
return (((sign)?'':'-') + '$' + num + '.' + cents);
}
