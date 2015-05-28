		if((navigator.userAgent.indexOf("MSIE") != -1) && (navigator.userAgent.indexOf("Mac") != -1) && (parseInt(navigator.appVersion) > 3)) {
			document.write("<LINK REL=stylesheet HREF=\"http://www.nevadaappeal.com/css/macie.css\" TYPE=\"text/css\">");
		}
		else if((navigator.userAgent.indexOf("Mac") != -1) && (parseInt(navigator.appVersion) > 3)) {
			document.write("<LINK REL=stylesheet HREF=\"http://www.nevadaappeal.com/css/macns.css\" TYPE=\"text/css\">");
		}
		else if((navigator.appName=="Netscape" && navigator.userAgent.indexOf("Mozilla") !=-1)) {
			document.write("<LINK REL=stylesheet HREF=\"http://www.nevadaappeal.com/css/winns.css\" TYPE=\"text/css\">");
		}
		else {
   			document.write("<LINK REL=stylesheet HREF=\"http://www.nevadaappeal.com/css/win.css\" TYPE=\"text/css\">"); 
		}