function NewWindow(width,height,url) {
	window.open(url,"PopUp","menubars=0,scrollbars=1,resizable=1,height="+height+",width="+width);
}

function CheckInputData(frm) {
 var skip = false;
 var hobbyselected = false;
 if (!skip && frm.email.value == "") {
 	alert("E-Mail address is required");
 	skip = true;
 }
 
 
 if (!skip && frm.pwd.value =="") {
 	alert("Password is required");
 	skip = true;
 }
  
 if (!skip && frm.pwdr.value =="") {
 	alert("Please confirm password");
 	skip = true;
 }
   
 if (!skip && frm.gender.value == "none") {
 	alert("Please select gender");
 	skip = true;
 }
  
 if (!skip && frm.extra_birthyear.value =="") {
 	alert("Year of birth required");
 	skip = true;
 }



 if (!skip && frm.extra_zipcode.value.length < 5) {
	alert("Zip code is invalid");
	skip = true;
 }
   
 if (!skip && frm.extra_zipcode.value =="00000") {
 	alert("Zip code required");
 	skip = true;
 }
  
 if (!skip && frm.extra_income.value =="") {
 	alert("Household income required");
 	skip = true;
 }

 if (!skip && frm.extra_newspaper.selectedIndex < 1) {
 	alert("Please select usage");
 	skip = true;
 }
 if (!skip) {
        InitCookieSearchParams(frm);
 	pbsSetCookie(frm);
 	
 	}
 return (!skip);
}



function choosedate () {
 window.open('/g/kalender_eng.html?searchform.dateselected','','menubar=0,titlebar=0,width=268,height=236');
 document.searchform.Interval.options[document.searchform.Interval.options.length-1].selected = true;
}
function ResetDate () {
 if (document.searchform.Interval.selectedIndex != (document.searchform.Interval.options.length-1))
 {
  document.searchform.dateselected.value = "";
 }
}

function DoPrint () {
 var f = document.searchform;
 f.action = "events?category=print";
 f.submit();
}

function EatCookie() {
document.cookie="usernamepassword=;Path=/"
document.cookie="UserRegID=;Path=/"
document.location="/apps/pbcs.dll/frontpage?RegLogout=1"
}