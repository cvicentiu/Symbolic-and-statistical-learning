
/********************** new common functions ********************/
function jump(str1,str2,n) 
{
	var s = document.forms[0].elements[str1].value;
	if(s.length==n) 
		document.forms[0].elements[str2].focus();
}

function getField(fName)
{
	if((form = document.forms[0]))
		if((field = form.elements["_ctl1:" + fName]))
			return field;
	return null;
}

function checkTextBox(field)
{
	if(field.value != "") return true;
	return false;
}

function checkList(field)
{
	if(field.selectedIndex != 0) return true;
	return false;
}

function checkEmailField(field)
{
	if(field.value != "") return checkEmail(field.value); //checkEmailOld(field.value)
	return false;
}

function checkRadioField(field)
{
	var i;
	for(i=0;i<field.length;i++)if(field[i].checked) return true;
	return false;
}

function checkCheckField(field)
{
	if(field.checked) return true;
	return false;
}

function checkDigitField(field)
{
	if(field.value != "")
		try{
			var val=parseInt(field.value,10);
			if(val==field.value && val>=0)
				return true;
		}
		catch(ex)
		{
		}
	return false;
}

function checkNonMandatoryDigitField(field)
{
	if(field.value == "") return true;
	return checkDigitField(field);
}

// array of functions
var checkField = [checkTextBox, checkList, checkEmailField, checkRadioField, checkCheckField, checkDigitField, checkNonMandatoryDigitField];

//return list of unfilled fields
function checkForm(Fields)
{
	var errStr = "", errCount = 0, focus = false;
	
	for(i=0; i<Fields.length; i++){
		var field = getField(Fields[i][0]);//Fields[i][0] - name of field
		if(field){
			if(!checkField[Fields[i][1]](field)){ //Fields[i][1] - type of field
				errStr += Fields[i][2] + "<br>";//Fields[i][2] - description
						// instead of "<br>" may ", " or other
				if(Fields[i][1]!=3) {field.style.background = "#FF8080";}
				if(!focus && Fields[i][1]!=1 && Fields[i][1]!=3) {field.focus(); focus=true;}
				errCount++;
				if(errCount>1) break; //exit after 2nd error
			}
			else
				if(Fields[i][1]!=3) {field.style.background = "#FFFFFF";}
		}
	}
	return errStr; 
}

function showError(errStr)
{
	var errorDiv = document.getElementById("errordiv");
	if(errorDiv)
		if(errStr != "") {
			errorDiv.innerHTML = errStr;
			errorDiv.style.color = "red";
			errorDiv.style.display = "block";
			window.location = "#top";
		}
		else
			errorDiv.style.display = 'none';
}

function checkEmail(EMail){
   var RegExpObj = new ActiveXObject("VBScript.RegExp");
   RegExpObj.Pattern = "^[\x21\x23-\x27\x2a-\x2d0-9\x3d\x3fA-Z\x5e-\x7e\.]+@(([A-Z0-9]([A-Z0-9\-]*[A-Z0-9])?)+((\.)[A-Z]([A-Z0-9\-]*[A-Z0-9])?)+)+$";
   RegExpObj.IgnoreCase = true;
   RegExpObj.Global = false;
   return RegExpObj.Test(EMail);
}

function checkEmailOld(email) {
var int = 0;
var domainArr = new Array("com","net","org", "us", "biz", "edu");
var s = email;
var mas = s.split("@");
if(mas.length!=2) { return false;}
 else
          {
            var mas1 = mas[1].split(".");
            if(mas1.length >= 2)
              {
                for(x=0;x<domainArr.length;x++) 
                if(compare_strings(mas1[mas1.length-1],domainArr[x])) int++;                 
                     if(int==0) {return false;}
               }      
             else return false;
           }
return true;
}


		var win= null;
		function NewWindow(mypage,myname,w,h,scroll){
	
	var winl = (screen.width-w)/2;
	var wint = (screen.height-h)/2;
	var settings  ='height='+h+',';
		settings +='width='+w+',';
		settings +='top='+wint+',';
		settings +='left='+winl+',';
		settings +='scrollbars='+scroll+',';
		settings +='resizable=yes';
	win=window.open(mypage,myname,settings);
	if (win != null) {
	if(parseInt(navigator.appVersion) >= 4){win.window.focus();}
	}
	}
	
	
	function OpenWindow(urlto) {
	window.open(urlto);	
	}