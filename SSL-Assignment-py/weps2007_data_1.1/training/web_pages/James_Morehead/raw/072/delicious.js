function getURL() {
        var str = window.document.URL.toString();
        var x = str.split('&');
        var newTitle = encodeURIComponent(document.title.toString());
        u = "http://www.prnewswire.com/cgi-bin/stories.pl?ACCT=109" + "&" + x[1] + "&";
	   	if (x[2])
		  {
			  u += x[2];
		  }
    	u1 = encodeURIComponent(u) + ";partner=prnews" + "&jump=doclose";

	    news1 = "http://del.icio.us/post?url="+u1+"&amp;title="+ newTitle;
	    window.open(news1,"_blank","toolbar=no, location=yes, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=yes, width=700, height=500");
        return true;      
}
//  added for PRN.Com _1.3- for post to diggit 
function getdiggURL() {
        var str = window.document.URL.toString();
        var x = str.split('&');
        var newTitle = encodeURIComponent(document.title.toString());
        u = "http://www.prnewswire.com/cgi-bin/stories.pl?ACCT=109" + "&" + x[1] + "&";
	   	if (x[2])
		  {
			  u += x[2];
		  }
    	u1 = encodeURIComponent(u);

	    news1 = "http://digg.com/submit?phase=2&url="+u1+"&title="+ newTitle;
	    window.open(news1,"_blank");
        return true;      
}
// change for PRN.Com _1.3- ends 
//  added for PRN.Com _1.4- for Technorati implementation
function gettechURL() {
        var str = window.document.URL.toString();
        var x = str.split('&');
        var newTitle = encodeURIComponent(document.title.toString());
        u = "http://www.prnewswire.com/cgi-bin/stories.pl?ACCT=109" + "&" + x[1] + "&";
	   	if (x[2])
		  {
			  u += x[2];
		  }
    	u1 = encodeURIComponent(u);

	    news1 = "http://technorati.com/search/"+u1;
	    window.open(news1,"_blank");
        return true;      
}
// change for PRN.Com _1.4- ends 