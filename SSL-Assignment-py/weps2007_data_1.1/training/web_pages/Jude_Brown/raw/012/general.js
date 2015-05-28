<!--
function form_popup(quiz,width,height){
  properties = 'width=' + width +
               ',height=' + height +
               'scrollbars=no,resizeable';
  window.open('','popup',properties);
  quiz.target = "popup";
  quiz.submit();
  return true;
}

function popup(url,width,height){
  properties = 'width=' + width +
               ',height=' + height +
               'scrollbars=no,resizeable';
  window.open(url,'popup',properties);
  return true;
}

function popup_scrolling(url,width,height){
  properties = 'width=' + width +
               ',height=' + height +
               ',scrollbars=yes,resizeable';
  window.open(url,'popup',properties);
  return true;
}

function popup_flash(url,width,height){
  properties = 'width=' + width +
               ',height=' + height +
               ',scrollbars=yes,resizeable';
  window.open(url,'popup',properties);
}

function close_redirect(url){
  opener.location = url;
  self.close();
}

function close_popupredirect(url,width,height){
  popup_scrolling(url,width,height);
  self.close();
}

function redirect(url){
  if(url != ""){
     document.location = url;
  }
}

function showYear(whichYear) {
	var ob = document.getElementById("sy"+whichYear).style;
	ob.display = 'block';
	var ob2 =  document.getElementById("start"+whichYear).style;
	ob2.display = 'none';
}

function showCurYear() {
	try {
		var yearRE = /\/200\d\//;
		var curYear = yearRE.exec(document.location)[0];
		showYear(curYear.substring(1, 5));
	}
	catch (exception) { }
}

var lt = String.fromCharCode(60);
var gt = String.fromCharCode(62);
var dquot = String.fromCharCode(34);
var squot = String.fromCharCode(39);

//-->