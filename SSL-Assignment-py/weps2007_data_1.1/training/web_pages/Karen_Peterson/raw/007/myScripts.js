// MY SCRIPTS
// Use this area to add new scripts that you need for your site

function addmyCSS() {

//alert(agt);

if (ns4 && win) { 
 	document.write("<link rel='stylesheet' type='text/css' href='/egov/portal.nsf/allfiles/files/$file/nn4pc.css'>"); 
	}
else if (ns4 && mac) { 
 	document.write("<link rel='stylesheet' type='text/css' href='/egov/portal.nsf/allfiles/files/$file/nn4mac.css'>"); 
	}
else if (op5) { 
 	document.write("<link rel='stylesheet'  type='text/css' href='/egov/portal.nsf/allfiles/files/$file/op5pc.css'>"); 
	}
else if (ie5 && win) { 
 	document.write("<link rel='stylesheet'  type='text/css' href='/egov/portal.nsf/allfiles/files/$file/ie5pc.css'>"); 
	}
	
 }