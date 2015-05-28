// dadaIMC: $Id: library.js,v 1.6 2005/09/26 03:22:20 spud Exp $
// license: GNU LGPL
// copyright 2001-2004: dada typo and contributors

var isW3C = (document.getElementById) ? true : false
var isAll = (document.all) ? true : false

function getObjectRef(doc,id) {
	if (isW3C) {
		if (obRef = doc.getElementById(id)) return obRef;
	} else if (isAll) {
		if (obRef = doc.all[id]) return obRef;
	}
	return false;
	//return (isW3C) ? doc.getElementById(id) : ((isAll) ? doc.all[id] : false);
}
function isEmpty(s) { return ((s == null) || (s.length == 0)) }
function isWhitespace (s) {
	if (isEmpty(s)) return true;
	if (s == "\t") return true;
	if (s == "\n") return true;
	if (s == "\r") return true;
	return false;
}
function hasWhitespace(s) {
	var i;
	var whitespace = " \t\n\r";
	for (i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (whitespace.indexOf(c) != -1) return true;
	}
	return false;
}
function isValidEmail(str) {
	var emailpat = /^[\w\.]+@[\w\.]+\.?[\w\.]?\.\w{2,4}/;
	if (emailpat.test(str)) {
		return true;
	} else {
		return false;
	}
}
function get_subdir(form) {
	var fname = form.filename.value;
	var num = 0;
	for (var x = 0; x < fname.length; x++) {
		num += fname.charCodeAt(x);
	}
	var total = num % 13 + 1;
	window.alert("Subdirectory for " + fname + " should be "  + total);
	return false;
}
function newWin(url) {
	if (newWin.arguments.length > 1) {
		var height = newWin.arguments[1];
		var width = newWin.arguments[2];
	} else {
		var height = 400;
		var width = 400;
	}
	window.open(url,'New','top=80,left=80,width='+width+',height='+height+',toolbar=no,menubar=no,scrollbars=yes');
	return false;
}
function showHide(ref,disp) {
	if (ref) {
		if (ref.style.display == disp) {
			ref.style.display = 'none';
		} else {
			ref.style.display = disp;
		}
	}
	return false;
}
