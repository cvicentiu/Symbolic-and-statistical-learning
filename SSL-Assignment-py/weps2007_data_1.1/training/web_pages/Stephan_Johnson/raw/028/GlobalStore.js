if (window != top )
top.location.href = window.location.href;
function clearcart()
{var strCheck = confirm('Are you sure you wish to clear your cart ?');
if (strCheck == true)
document.location.href=("Index.asp?PageAction=CLEARCART");}
function confRemove(strName)
{var strConf = confirm('Are you sure you wish to remove ' + strName + ' from your cart ?')
return strConf}
function ChangeCursorHand(){document.body.style.cursor="hand";}
function ChangeCursorDefault(){document.body.style.cursor="default";}
function checkout_billinginfo(){document.frmCheckout2.action = 'index.asp?PageAction=CARTCHECKOUT'}
function checkout_shippinginfo(){document.frmCheckout3.action = 'index.asp?PageAction=CARTCHECKOUT&Step=2'}
function checkout_shipdiscounts(){ }
var strValidChars = '0123456789.,';
var returnbol = false;
function IsNumeric(strString){
var strChar;var blnResult = true;var i;
if (strString.length == 0) return returnbol;
for (i = 0; i < strString.length && blnResult == true; i++)
{strChar = strString.charAt(i);
if (strValidChars.indexOf(strChar) == -1)
{blnResult = false;
}}return blnResult;}
function checker(obj)
{strVal = obj.value
bolNegative = false
if (strVal.charAt(0) == "-")
{bolNegative = true
strVal = strVal.slice(1,strVal.length)}	
if (strVal.search("[.]") == strVal.length - 1) 
{strCheck="0123456789."
}else{strCheck="0123456789"}
strType = strVal.substr(strVal.length-1,1)
if (strVal.length <= 0)
{strType = "R" //reject}
if (strCheck.search("[" + strType + "]") == -1){
strParsed = strVal.substr(0,strVal.length-1)
if (strParsed.length <= 0){
strParsed = "\"\""
}}else{strParsed = strVal}
len = strParsed.length;
bolBanged = false 
for(i = 0; i < len;i++){ 
x = strParsed.substr(i,1)
strCheck="0123456789."
if (strCheck.search("[" + x + "]") == -1)
{bolBanged = true}
if (x == "."){
var regEp = /[.]/g //for RegEp
if(strVal.match(regEp).length > 1)
{bolBanged = true}}else{	
if (strCheck.search(x) == -1)
{bolBanged = true}}} 
if ( bolBanged == true)
{strParsed = ""
}if (bolNegative == true)
{strParsed = "-" + strParsed 
}obj.value = strParsed}
function AlertBox(sMsg, iSec) 
{var h = 130;var w = 200;
var t = (screen.availHeight/2) - (h/2); 
var l = (screen.availWidth/2) - (w/2); 
//iSec = (iSec || 10) * 1000; 
window.fakeWin = window.open("","fakeWin","height="+h+",width="+w+",top="+t+",left="+l); 
fakeWin.document.open(); 
fakeWin.document.write('<html><head><title>Info!</title>' + 
'<style type="text/css">' +  
'body {border:none;background-color:threedface; }' +  
'table,td {border-collapse:collapse;font:bold 10px arial;}' +
'font { font-face: arial; font-size: 10px; }' +               
'</style></head><body onblur="window.focus();"><table align="center" height="90%">' + 
'<tr><td valign="middle" align="center">' + sMsg +  
'</td></tr></table></body></html>');
fakeWin.document.close();}}
function TransitionAlert(strMsg){ 
var h = 178;var w = 500;var t = (screen.availHeight/2) - (h/2);var l = (screen.availWidth/2) - (w/2); 
window.cartmove = window.open("","cartmove","height="+h+",width="+w+",top="+t+",left="+l); 
cartmove.document.open(); 
cartmove.document.write('<html><head><title>My Account\'s Shopping Cart Contents</title>' +
   						 '<% BuildLastPosition%>' +
   						 '<style type="text/css">' +  
   						 'body {border:none;background-color:threedface; }' +  
   						 'table,td {border-collapse:collapse;font:bold 10px arial;}' +
   						 'font { font-face: arial; font-size: 10px; }' + 
   					     '</style></head><body onblur="window.focus();"><div align="center">' + strMsg + 
   						 '<br><br>Do you wish to bring the existing contents from your Shopping Cart into your Account Shopping Cart?<br/>' +
   						 '<form method="POST" name="frmMoveCart" action="index.asp" >' +
   						 '<input type="button" value="Move Products" name="btnMoveCart" style="font-size:8pt" onclick="refreshWindow();">' +
   						 '<input type="button" value="Cancel" name="btnCancel" style="font-size:8pt" onclick="refreshDenyWindow()">' +
   						 '<input type="hidden" name="PageAction" value="MOVEMACHINECART">' +
   						 '</form></div></body></html><script language="Javascript">' +
   						 'function refreshWindow(){' +
   						 '  window.opener.location.href="index.asp?PageAction=MOVEMACHINECART";' +
   						 '  window.close();' +
   						 '}' + 
   						 'function refreshDenyWindow(){' + 
   						 '  window.opener.location.href="index.asp?PageAction=REPLACEMACHINECART";' + 
   						 '  window.close();' +
   						 '}</script>');										     						 
cartmove.document.close();} 
function formatCurrency(num) {
num = num.toString().replace(/\$|\,/g,'');
if(isNaN(num))
num = "0";
sign = (num == (num = Math.abs(num)));
num = Math.floor(num*100+0.00000000001);
cents = num%100;
num = Math.floor(num/100).toString();
if(cents<10)
cents = "0" + cents;
for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
num = num.substring(0,num.length-(4*i+3))+','+
num.substring(num.length-(4*i+3));
return (((sign)?'':'-') + num + '.' + cents);}
function isArray(obj) {
if (obj.constructor.toString().indexOf("Array") == -1)
return false;
else
return true;}
function ProdViewincrease(frmF)
{if(document.forms[frmF].elements["intQty"].value < 0)
{document.forms[frmF].elements["intQty"].value = 1;
return;}
document.forms[frmF].elements["intQty"].value = ++document.forms[frmF].elements["intQty"].value}
function ProdViewdecrease(frmF)
{if(document.forms[frmF].elements["intQty"].value <= 0)
{document.forms[frmF].elements["intQty"].value = 1;
return;}
document.forms[frmF].elements["intQty"].value = --document.forms[frmF].elements["intQty"].value}
function validateProdQtyBox(frmF)
{if(IsNumeric(document.forms[frmF].elements["intQty"].value))
{if(document.forms[frmF].elements["intQty"].value.length > 6)
{alert('You Can Not Select A Quantity Higher Then 999,999');
document.forms[frmF].elements["intQty"].value = 1;
document.forms[frmF].elements["intQty"].focus();
}}else{alert('Please Insert A Numeric Value For Qty!');
document.forms[frmF].elements["intQty"].value = 1;		
document.forms[frmF].elements["intQty"].focus();}}
function replace(string,text,by)
{var strLength = string.length, txtLength = text.length;
if ((strLength == 0) || (txtLength == 0)) return string;
var i = string.indexOf(text);
if ((!i) && (text != string.substring(0,txtLength))) return string;
if (i == -1) return string;
var newstr = string.substring(0,i) + by;
if (i+txtLength < strLength)
newstr += replace(string.substring(i+txtLength,strLength),text,by);
return newstr;}
function sortItems(from,lo,up){
var i, j, t, x, y;
while(up > lo){
i = lo;j = up;t = from.options[lo].text;x = from.options[lo].value;y = from.options[lo].selected;
while(i < j){
while(from.options[j].text > t)
j -= 1;
from.options[i].text = from.options[j].text;
from.options[i].value = from.options[j].value;
from.options[i].selected = from.options[j].selected;
while((i < j) && (from.options[i].text <= t ))
i++;
from.options[j].text = from.options[i].text;
from.options[j].value = from.options[i].value;
from.options[j].selected = from.options[i].selected;
}from.options[i].text = t;
from.options[i].value = x;
from.options[i].selected = y;
if(i - lo < up - i){
sortItems(from,lo,i-1); lo = i+1;
} else {sortItems(from,i+1,up); up = i-1;}}} 
function globalpopup(strURL,xWidth, yHeight)
{var windowSizeSettings = "width=" + xWidth + ",height=" + yHeight + ",resizable=yes";
window.open(strURL,"",windowSizeSettings)}
function trim( stringToTrim ){var chr; 
chr = stringToTrim.substring( 0, 1 ); 
while( chr == " " ){ 
stringToTrim = stringToTrim.substring( 1, stringToTrim.length ); 
chr = stringToTrim.substring( 0, 1 );} 
chr = stringToTrim.substring( stringToTrim.length - 1, stringToTrim.length ); 
while( chr == " " ){stringToTrim = stringToTrim.substring( 0, stringToTrim.length - 1 ); 
chr = stringToTrim.substring( stringToTrim.length - 1, stringToTrim.length );} 
return stringToTrim;} 
function clearIt(theText){if (theText.value == theText.defaultValue){theText.value = ""}}
function replacetext(theText){if (theText.value == "") theText.value = "Enter Email Here!"}
function validateEmail(src) {
emailReg = "^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[a-zA-Z]$"
var regex = new RegExp(emailReg);
if(regex.test(src) == false){
alert('Please enter a valid email address and try again!');
document.frmEmailList.txtEmail.value = ""
document.frmEmailList.txtEmail.focus();
return false;}
return regex.test(src);}
