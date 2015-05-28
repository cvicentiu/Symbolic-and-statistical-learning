// whitespace characters
var whitespace = " \t\n\r";
var splchars ="\$%\'^*#@!~\\/\"\`><";
var splchars1 ="\$%\^*#@!~`><+-_)(?';:=.,[]\"\{}|";
function sortItems(from,lo,up)
{var i, j, t, x, y;while(up > lo){i = lo;j = up;t = from.options[lo].text;x = from.options[lo].value;y = from.options[lo].selected;while(i < j){while(from.options[j].text > t)j -= 1;from.options[i].text = from.options[j].text;from.options[i].value = from.options[j].value;from.options[i].selected = from.options[j].selected;while((i < j) && (from.options[i].text <= t ))i++;from.options[j].text = from.options[i].text;from.options[j].value = from.options[i].value;from.options[j].selected = from.options[i].selected;
}from.options[i].text = t;from.options[i].value = x;from.options[i].selected = y;if(i - lo < up - i){sortItems(from,lo,i-1); lo = i+1;} else {sortItems(from,i+1,up); up = i-1;}}} 
function trimValue(inputString) {if (typeof inputString != "string"){ return inputString; }
var retValue = inputString;var ch = retValue.substring(0, 1);
while (ch == " ") {retValue = retValue.substring(1, retValue.length);ch = retValue.substring(0, 1);}
ch = retValue.substring(retValue.length-1, retValue.length);
while (ch == " ") {retValue = retValue.substring(0, retValue.length-1);ch = retValue.substring(retValue.length-1, retValue.length);}
while (retValue.indexOf("  ") != -1) {retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length);
}return retValue;} 
function isEmpty(s){return ((s == null) || (s.length == 0))}
function IsNumeric(strString)
{var strValidChars = '0123456789';var returnbol = false;
var strChar;var blnResult = true;var i;if (strString.length == 0) return returnbol; 
for (i = 0; i < strString.length && blnResult == true; i++){strChar = strString.charAt(i);if (strValidChars.indexOf(strChar) == -1){blnResult = false;}}return blnResult;}
function ForceDecimal(objField, FieldName)
{var strField = new String(RTrim(objField.value));var arrItems=new Array();
if (isWhitespace(strField)) return true;var i = 0;
for (i = 0; i < strField.length; i++){if ((strField.charAt(i) < '0' || strField.charAt(i) > '9') && (strField.charAt(i) != '.' && strField.charAt(i) != '-' &&  strField.charAt(i) != ',')) {
alert(FieldName + " must be a valid numeric entry.  Please do not use any non-numeric symbols.");
objField.focus();return false;}}
arrItems = strField.split(".");
if(arrItems[1]){if (arrItems[1].length>2){alert("Only two decimal places allowed in " + FieldName);objField.focus();
return false;}}
return true;}
function ForceSort(objField, FieldName)
{var strField = new String(RTrim(objField.value));var arrItems=new Array();
if (isWhitespace(strField)) return true;var i = 0;
for (i = 0; i < strField.length; i++){if ((strField.charAt(i) == '-') && (i==1)){
alert(FieldName + " accepts only numeric values 0123456789-");objField.focus();return false;}
if ((strField.charAt(i) < '0' || strField.charAt(i) > '9') && (strField.charAt(i) != '-')) {alert(FieldName + " accepts only numeric values 0123456789-");
objField.focus();return false;}}return true;}
function ForceWeight(objField, FieldName){
var strField = new String(RTrim(objField.value));var arrItems=new Array();
if (isWhitespace(strField)) return true;
var i = 0;for (i = 0; i < strField.length; i++){
if ((strField.charAt(i) < '0' || strField.charAt(i) > '9') && (strField.charAt(i) != '.')) {
alert(FieldName + " accepts only numeric values 0123456789.");objField.focus();return false;}}return true;}
function ForceMoney(objField, FieldName)
{var strField = new String(RTrim(objField.value));var arrItems=new Array();
if (isWhitespace(strField)) return true;var i = 0;for (i = 0; i < strField.length; i++){
if ((strField.charAt(i) < '0' || strField.charAt(i) > '9') && (strField.charAt(i) != '.' &&  strField.charAt(i) != ',')) {
alert(FieldName + " accepts only numeric values 1234567890.,");
objField.focus();return false;}}arrItems = strField.split(".");
if(arrItems.length>2){alert(FieldName + " must be a valid positive number entry.");objField.focus();return false;
}if(arrItems[1]){if (arrItems[1].length>2){alert("Only two decimal places allowed in " + FieldName);objField.focus();return false;}}
return true;}
function isWhitespace (s){var i;if (isEmpty(s)) return true;for (i = 0; i < s.length; i++){   
var c = s.charAt(i);if (whitespace.indexOf(c) == -1) return false;}return true;}
function RTrim(strTrim){var str = new String(strTrim);var i = 0;var c = "";var endpos = 0
for (i = str.length; i >= 0 && endpos == 0; i = i - 1) {c = str.charAt(i);if (whitespace.indexOf(c) == -1)
endpos = i;}return str.substring(0,endpos+1);}
function LTrim(strTrim)
{var str = new String(strTrim);var i = 0;var c = "";var endpos = 0
for (i = 0; i<=str.length ; i = i + 1) {c = str.charAt(i);if (whitespace.indexOf(c) ==-1)
return str.substring(endpos,str.length);else{
endpos = i+1;}
}return str.substring(endpos,str.length);}
function ForceFloat(objField, FieldName)
{var strTField=RTrim(objField.value);var strField = new String(strTField);
if (isWhitespace(strField)) return true;var i = 0;for (i = 0; i < strField.length; i++)
if (isNaN(objField.value)) {alert(FieldName + " only accepts numeric values 1234567890.-");
try{objField.focus();}catch(er) {return false;}return false;}else if ( parseFloat(objField.value) > parseFloat("1.79E+308"))
{alert("Float OverFlow");try{objField.focus();}catch(er) {return false;}
return false;}else if(parseFloat(objField.value) < parseFloat("-1.79E+308"))
{alert("Float UnderFlow");try{objField.focus();}catch(er) {return false;}return false;}return true;}
function ForceEntry(objField, FieldName)
{var strField = new String(objField.value);
if (isWhitespace(strField)) {alert("The " + FieldName + " is a required field.");
try{objField.focus();}catch(er) {return false;}
return false;}return true;}
function ValidEmail(src){if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(src)){return true;}else{return false;}}
function fnMove(objSource,objDest)
{var objOPT,objSOPT;var objREF;
if(objSource.hasChildNodes()){
objOPT = objSource.firstChild;
while(objOPT != null){
if(objOPT.selected){
objSOPT = document.createElement("<option>");objSOPT.value = objOPT.value;
objSOPT.innerText = objOPT.innerText;objDest.appendChild(objSOPT);
if((objOPT != null) && (objOPT.nextSibling != null))
{objOPT = objOPT.nextSibling;objREF = objOPT.previousSibling;objREF.value="";objREF.innerText="";objREF.removeNode();}
else if(objOPT.nextSibling == null){objOPT.value="";objOPT.innerText="";objOPT.removeNode();break;}
}else objOPT = objOPT.nextSibling;}}}
function isDateNumber(strNum,method)
{var str = new String(strNum);var i = 0;
if (isNaN(parseInt(str)) || parseInt(str) < 0) return false;
if (method == 2)
if (parseInt(str) > 31)
return false;if (method == 1)if (parseInt(str) > 12)
return false;for (i = 0; i < str.length; i++)
if (str.charAt(i) < '0' || str.charAt(i) > '9')
return false;return true;}

function PromptErrorMsg(Field,strError)
{alert("You have entered an invalid date for " + strError + ".  Please make sure your date format is in MM/DD/YYYY format.");
Field.focus();}
function ForceDate(strDate,strField)
{var str = new String(RTrim(strDate.value));
if (isWhitespace(str)) {return true;}var i = 0, count = str.length, j = 0;
while ((str.charAt(i) != "/" && str.charAt(i) != "-") && i < count)i++;
if (i == count || i > 2) {PromptErrorMsg(strDate,strField);
return false;}var addOne = false;
if (i == 2) addOne = true;if (!isDateNumber(str.substring(0,i),1)) {
PromptErrorMsg(strDate,strField);return false;
}j = i+1;i = 0;
while ((str.charAt(i+j) != "/" && str.charAt(j+i) != "-") && i+j < count)
i++;if (i+j == count || i > 2) {
PromptErrorMsg(strDate,strField);
return false;}if (!isDateNumber(str.substring(j,i+j),2)) {
PromptErrorMsg(strDate,strField);
return false;}
j = i+3;i = 0;if (addOne) j++;
while (i+j < count)i++;
if (i != 2 && i != 4) {PromptErrorMsg(strDate,strField);return false;}
if (!isDateNumber(str.substring(j,i+j),3)) {PromptErrorMsg(strDate,strField);
return false;}if (!CheckDate(str.substring(j,i+j),3)) {
PromptErrorMsg(strDate,strField);return false;}
return true;}
function CheckDate(rvalue)
{var timeperiodrvalue;var seperator,TotalMonthDays;var Month,Year,Todate,startdateval;
Months = [1, 2, 3, 4, 5, 6,7, 8,9,10,11,12];
MonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
lMonthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
if (rvalue==null || rvalue=="null" || rvalue=="" || rvalue=="undefined")
return false;
if ((rvalue.length > 10) || (rvalue.length < 5))
return false;
if (((rvalue.indexOf("-") > 0) && (rvalue.indexOf("/") > 0)) || ((rvalue.indexOf("-") < 0) && (rvalue.indexOf("/") < 0)))
return false;
if (((rvalue.indexOf("/"))==(rvalue.lastIndexOf("/"))) && ((rvalue.indexOf("-"))==(rvalue.lastIndexOf("-"))))
return false;
if(isNaN(Date.parse(rvalue))) 
return false; 
if ((rvalue.indexOf("/")) > 0)
seperator="/";
else{if ((rvalue.indexOf("-")) > 0)
seperator="-";else
return false;}  
Month=(rvalue.substring(0, rvalue.indexOf(seperator)));
if (Month >12)return false;
Year=rvalue.substring((rvalue.lastIndexOf(seperator)+1),rvalue.length);
if (Year.length <4)return false;
if (Year < 1)
return false;
todate=rvalue.substring(rvalue.indexOf(seperator)+1,rvalue.lastIndexOf(seperator));
if (isNaN(Month) || isNaN(todate) || isNaN(Year))
return false;
if ((Year%4==0 || Year%400==0) && Year%100!=0 )
TotalMonthDays=lMonthDays[Month-1];
else
TotalMonthDays=MonthDays[Month-1];
if (todate > TotalMonthDays)
return false;return true;}
function LeapYear(intYear){if (intYear % 100 == 0){if (intYear % 400 == 0) return true; }else {if ((intYear % 4) == 0) return true;}return false;}		
function chkDateGreater(chkDate ,strFieldName,chkDate2,strFieldName2)
{		
/*var dtmToday = new Date();
//var dtmToday =chkDate2;
var dtmCurrDate	= dtmToday.getDate();var dtmCurrMonth = dtmToday.getMonth() + 1;var dtmCurrYear = dtmToday.getYear();
var dtmTodayDate = dtmCurrMonth + "/" + dtmCurrDate  + "/" + dtmCurrYear;alert(dtmTodayDate);
var dtmDay  = chkDate.substring(0,2);var dtmMonth  = chkDate.substring(3,5);var dtmYear = chkDate.substring(6,10);
var dtmSelDate = dtmMonth + '/' + dtmDay + "/" + dtmYear;
*/
if (Date.parse(chkDate2) < Date.parse(chkDate)){alert( strFieldName2 + " should be greater than or equal to " + strFieldName);return false;}
return true;}
function chkDateLesser(chkDate ,strFieldName)
{var dtmToday = new Date();var dtmCurrDate	= dtmToday.getDate();
var dtmCurrMonth = dtmToday.getMonth() + 1;var dtmCurrYear = dtmToday.getYear();
var dtmTodayDate = dtmCurrMonth + "/" + dtmCurrDate  + "/" + dtmCurrYear;
var dtmDay  = chkDate.substring(0,2);var dtmMonth  = chkDate.substring(3,5);var dtmYear = chkDate.substring(6,10);
var dtmSelDate = dtmMonth + '/' + dtmDay + "/" + dtmYear;
if (Date.parse(dtmSelDate) > Date.parse(dtmTodayDate)) {alert( strFieldName + " should be less than or equal to today's date");
return false;}return true;}
function isSpecialusername (s)
{var i;var splchars;
splchars="+-;,:*[]?|\\/><'";
for (i = 0; i < s.length; i++){   
// Check that current character isn't whitespace.
var c = s.charAt(i);	
if (splchars.indexOf(c) != -1) 
{alert("The Username may not contain the characters + - ; , : * [ ] ? | \\ / > < '");return true;}
}return false;}
function isSpecial (s)
{var i;	
for (i = 0; i < s.length; i++){  
var c = s.charAt(i);
if (splchars.indexOf(c) != -1) 
{alert("Fields should not contain the Characters $%^*#@!~'`<, > /  ; ?  and " + '"');return true;}}return false;}
function replaceSubstring(inputString, fromString, toString) {
var temp = inputString;if (fromString == "") {
return inputString;
}if (toString.indexOf(fromString) == -1) { // If the string being replaced is not a part of the replacement string (normal situation)
while (temp.indexOf(fromString) != -1) {
var toTheLeft = temp.substring(0, temp.indexOf(fromString));
var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
temp = toTheLeft + toString + toTheRight;}
} else {
var midStrings = new Array("~", "`", "_", "^", "#");
var midStringLen = 1;var midString = "";
while (midString == "") {
for (var i=0; i < midStrings.length; i++) {var tempMidString = "";
for (var j=0; j < midStringLen; j++) { tempMidString += midStrings[i]; }
if (fromString.indexOf(tempMidString) == -1) {
midString = tempMidString;
i = midStrings.length + 1;}}
} 
while (temp.indexOf(fromString) != -1) {
var toTheLeft = temp.substring(0, temp.indexOf(fromString));
var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
temp = toTheLeft + midString + toTheRight;}

while (temp.indexOf(midString) != -1) {
var toTheLeft = temp.substring(0, temp.indexOf(midString));
var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
temp = toTheLeft + toString + toTheRight;}
}return temp;}
function DisableEnableObject(obj,objState){
var z = (obj.disabled) ? 'disabled' : 'enabled';
if(!(z == objState)){obj.disabled = !(obj.disabled);}
var z = (obj.disabled) ? 'disabled' : 'enabled';}
function ForcePercent(objField, FieldName){
var strTField=RTrim(objField.value);
var strField = new String(strTField);
var taxPercent = RTrim(objField.value);
if (isWhitespace(strField)) return true;
var i = 0;
for (i = 0; i < strField.length; i++)
if (isNaN(objField.value)) {
alert(FieldName + " only accepts numeric values 1234567890.");
try{objField.focus();}catch(er){return false;}return false;
}else if ( parseFloat(objField.value) > parseFloat("1.79E+308")){
alert("Float OverFlow");try{
objField.focus();}catch(er){return false;}
return false;}else if(parseFloat(objField.value) < parseFloat("-1.79E+308"))
{alert("Float UnderFlow");try{objField.focus();}catch(er){return false;}
return false;}else if(taxPercent.substring(0,1) == '-'){alert(FieldName + ' must be a valid positive number.');
try{objField.focus();}catch(er){return false;}return false;}
return true;}
//Validates if the string has at least one numeric character
function valNumberCharInStr( objvalue )
{var blnHasNumericChar = false;
var chrCurChar = "";var strStringToCheck=objvalue.value;
for (x=0; x<strStringToCheck.length; x++){
chrCurChar = strStringToCheck.substring( x, (x+1) );
if (/\d/.test(chrCurChar)){
blnHasNumericChar = true;
break;}}objvalue.focus();return blnHasNumericChar;}
function valAlphaCharInStr( objvalue ){
var chrCurChar = "";var intNum=0;var strChar=0;var splchars;
splchars="+-;,:*[]?|\\/><'";var strStringToCheck=objvalue.value;
for (x=0; x<strStringToCheck.length; x++){
chrCurChar = strStringToCheck.substring( x, (x+1) );
if (splchars.indexOf(chrCurChar) != -1){
return false;}
if (/[A-Z]|[a-z]/.test(chrCurChar)){
strChar=1;}
if(/[0-9]/.test(chrCurChar)){intNum=1;}
}if (intNum==1 && strChar==1 )
return true;else return false;
objvalue.focus();}
function valForbiddenwords(objvalue)
{str1=objvalue;
var arr1=["security","vin","vin#","cardverification","ccv","atm","cvn","cvs","cvcode","cv2","pin","cvv","cvv2","pinnumber","pvv","cardverificationvalue","creditverificationvalue","pvv2","cardvv","cvc","cvc2","cid","cardmemberid","cardid","cid2","vid","creditcardvalidationvalue","cardvalidationvalue","cardidentification","personalid","personalidentificationnumber"]
objvalue=objvalue.toLowerCase();objvalue=replaceAll(objvalue," ","")
objvalue=replaceAll(objvalue,"-","")
objvalue=replaceAll(objvalue,".","");	
for (i=0; i < arr1.length; i++){
var result=arr1[i].match(objvalue);			
if (result!=null){alert('Due to regulations controlling data storage MC does not permit the collection of the ' + str1);return false;
}}
return true;}
function replaceAll(s, fromStr, toStr)
{var new_s = s;
for (i = 0; i < 100 && new_s.indexOf (fromStr) != -1; i++)
{new_s = new_s.replace (fromStr, toStr);
}return new_s;}

