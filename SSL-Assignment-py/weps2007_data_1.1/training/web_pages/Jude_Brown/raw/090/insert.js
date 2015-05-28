// insert.js for CA info update cell
// string in function with <DIV> on page did not work in Netscape 4. Weird! this works.

var strToInsert = ""

strToInsert = "<P CLASS=header4a>";
strToInsert += "<a href=\"/CA/magazine/comp/\" target=\"_top\"><font color=FFFFFF>Competitions</FONT></a>";
strToInsert += "</P>";
strToInsert += "<P class=header4b>";
strToInsert += "<a href=\"/CA/magazine/comp/mag_ila.html\" target=\"_top\"><font color=433474>Illustration</font></a> &amp; <a href=\"/CA/magazine/comp/mag_pa.html\" target=\"_top\"><font color=433474>Photography</font></a><BR>";
strToInsert += "<a href=\"/CA/magazine/comp/\" target=\"_top\"><font color=CC3300>Deadline: March 13, 2007</font></a>";
strToInsert += "</P>";


// popup sub cookie
function popWin(url,name,parms) {
     var popW = window.open(url,name,parms);
     if (!popW.opener) 
			popW.opener = self;
	 if (window.focus)
     		popW.focus();	 
}

var today = new Date();
	days = 5;
	var exp = new Date(today.getTime() + (days * 86400000));

function Set_Cookie(name,value,expires,path,domain,secure) {
      document.cookie = name + "=" +escape(value) + ( (expires) ? ";expires=" + expires.toGMTString() : "") + ( (path) ? ";path=" + path : "") + ( (domain) ? ";domain=" + domain : "") + ( (secure) ? ";secure" : "");
  }
  
  function Get_Cookie(name) {
      var start = document.cookie.indexOf(name+"=");    
      var len = start+name.length+1;
      if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
      if (start == -1) return null;
      var end = document.cookie.indexOf(";",len);
      if (end == -1) end = document.cookie.length;
      return unescape(document.cookie.substring(len,end));
  }
  
function Delete_Cookie(name,path,domain) {
      if (Get_Cookie(name)) document.cookie = name + "=" + ( (path) ? ";path=" + path : "") + ( (domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-70 00:00:01 GMT";
  }

var checkCookie=unescape(document.cookie); 
if (checkCookie.indexOf('CA_subpop') != -1) {
		
	} else {
	Set_Cookie("CA_subpop","",exp,"/");
	popWin('http://www.commarts.com/CA/top/top_p.html','remote','scrollbars=0,resizable=1,top=20,left=10,width=200,height=132');

	
 }
 

// code for purchase issue
var prodID;

function inStockStr() {

var inStock = new Array("ISS199401","ISS199509","ISS199701","ISS199703","ISS199707","ISS199708","ISS199803","ISS199805","ISS199809","ISS199901","ISS199903","ISS200003","ISS200101","ISS200103","ISS200109","ISS200201","ISS200203","ISS200212","ISS200301","ISS200303","ISS200305","ISS200307","ISS200308","ISS200309","ISS200311","ISS200312","ISS200401","ISS200403","ISS200405","ISS200407","ISS200408","ISS200409","ISS200411","ISS200412","ISS200501","ISS200503","ISS200505","ISS200507","ISS200508","ISS200509","ISS200511","ISS200512","ISS200601","ISS200603","ISS200605","ISS200607","ISS200608","ISS200609","ISS200611","ISS200612","ISS200701","ISS200703","PAKADV0203","PAKIA0103","PAKILL0304","PAKPHO0304");

for (i=0;i<inStock.length; i++) {
		if (inStock[i] == prodID) {
			return ('<br><span class=header3><a href="http://www.commerce.commarts.com/shop/detail.asp?prod=' + prodID + '" target="_top">Purchase Issue</a></span>');
		}
	}
	return '';
}

