//-- Channel Intelligence Cookie Set Script
var aValue;
var nI = 0;
var aURLArguments = location.search.substring(1).split('&');
var today = new Date();
var cookie_length = 7; // Set to expire in 7 days
var expires_date = new Date(today.getTime() + (cookie_length * 1000 * 60 * 60 * 24));

for (nI = 0; nI < aURLArguments.length; nI++) {
aValue = aURLArguments[nI].split('=');
if (aValue[0].toLowerCase() == 'srccode') {
document.cookie = 'srccode=' + escape(aValue[1]) + ';expires=' + expires_date.toGMTString();
}
if (aValue[0].toLowerCase() == 'cpncode') {
document.cookie = 'cpncode=' + escape(aValue[1]) + ';expires=' + expires_date.toGMTString();
}
}
