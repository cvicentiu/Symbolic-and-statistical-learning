var agt=navigator.userAgent.toLowerCase();
 var is_major = parseInt(navigator.appVersion);
    var is_ie     = ((agt.indexOf("msie") != -1) );
    var is_ie3    = (is_ie && (is_major < 4));
    var is_ie4    = (is_ie && (is_major == 4) && (agt.indexOf("msie 5")==-1) );
    var is_ie4up  = (is_ie && (is_major >= 4));
    var is_ie5    = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
    var is_ie5_5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
    var is_aol   = (agt.indexOf("; aol") != -1);
    var is_aol3  = (is_aol && is_ie3);
	var is_aol4  = (is_aol && is_ie4);
    var is_aol5  = (agt.indexOf("aol 5") != -1);
    var is_aol6  = (agt.indexOf("aol 6") != -1);
    var is_compuserve = (agt.indexOf("CompuServe") != -1);
    var is_mac    = (agt.indexOf("mac")!=-1);
    if(is_compuserve) {
      document.write('<scr'+'ipt language="javascript" SRC="http://www.compuserve.com/header/fortune/csheader.js" ><' +'/' +'scr'+'ipt>');

    }

   else if(is_aol || is_aol3 || is_aol4 || is_aol5 || is_aol6) {
      	document.write('<scr'+'ipt language="javascript">');
       document.write(" '// ' + '<' + '!--' +'");
       document.write('	function redir(theForm)');
       document.write('{');
	 document.write('var anyString;');
	 document.write('var index;');
	 document.write('index=theForm.URL.selectedIndex');
	 document.write('anyString=theForm.URL.options[index].value;');
         document.write('if (anyString.substring(0,3) == "aol")');
	 document.write('{');
	 document.write('window.location=theForm.URL.options[index].value;');
	 document.write('theForm.URL.focus();');
	 document.write('}');
         document.write('else');
	 document.write('{');
         document.write('if (anyString.substring(0,4) == "null")');
	 document.write('{');
	 document.write('alert("AOL Personal Finance: No Department Selected. Please select a department from the menu, then click \"Go.\" ");');
	 document.write('}');
         document.write('else');
	 document.write('{');
	 document.write('window.location=theForm.URL.options[index].value;');
	 document.write('}');
         document.write('}');
	document.write('return (false);');
	 document.write('}');
	 document.write(" '//--' + '>' +'");
	 document.write('</scr'+'ipt>');
	 document.write('<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%" background="http://www.fortune.com/ui_images/bluetilehat.gif">');
	document.write('<TR>');
	document.write('<TD>');
        document.write('<IMG SRC="http://www.fortune.com/ui_images/clear.gif" WIDTH="585" HEIGHT="1" BORDER="0">');
        document.write('</TD>');
	document.write('</TR>');
	document.write('</TABLE>');
        document.write('<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%" background="http://www.fortune.com/ui_images/bluetilehat.gif"> ');
	document.write('<TR>');
	document.write('<TD WIDTH="188">');
	document.write('<A HREF="aol://1722:Personal Finanace">');
	document.write('<IMG SRC="http://www.fortune.com/ui_images/pfhat2.gif" WIDTH="170" HEIGHT="30" BORDER="0" ALT="AOL Personal Finance Search">');
        document.write('</a></td>');
     	document.write('<TD WIDTH="67">');
        document.write('<IMG SRC="http://www.fortune.com/ui_images/clear.gif" WIDTH="1" HEIGHT="1" BORDER="0">');
        document.write('</TD>');
	document.write('<FORM onSubmit="return redir(this)" NAME="AOL_PF">');
	document.write('<TD ALIGN="right" VALIGN="middle" WIDTH="330">');
	document.write('<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="330">');
        document.write(' <TR>');
        document.write('<TD WIDTH="290" ALIGN="right">');
	document.write('<SELECT SIZE="1" NAME="URL">');
	document.write('<OPTION VALUE="aol://1722:Personal Finance" selected>AOL Personal Finance Main</OPTION>');
	document.write('<OPTION VALUE="null"></OPTION>');
	document.write('<OPTION VALUE="aol://1722:Quotes">Quotes</OPTION>');
	document.write('<OPTION VALUE="aol://1722:Portfolios">My Portfolios</OPTION>');
	document.write('<OPTION VALUE="aol://1722:Charts">Charts</OPTION>');
	document.write('<OPTION VALUE="aol://1722:Market News">Market News Update</OPTION>');
	document.write('<OPTION VALUE="aol://1722:Symbol Lookup">Symbol Lookup</OPTION>');
	document.write('<OPTION VALUE="aol://1722:My Accounts">Accounts Manager</OPTION>');
	document.write('<OPTION VALUE="null"></OPTION>');
	document.write('<OPTION VALUE="aol://1722:Business News">Business News</OPTION>');
	document.write('<OPTION VALUE="aol://1722:Stocks">Stocks</OPTION>');
	document.write('<OPTION VALUE="aol://1722:Mutual Funds">Mutual Funds</OPTION>');
	document.write('<OPTION VALUE="null"></OPTION>');
	document.write('<OPTION VALUE="aol://1722:Retirement">Retirement</OPTION>');
	document.write('<OPTION VALUE="aol://1722:Planning">Saving &amp; Planning</OPTION>');
	document.write('<OPTION VALUE="aol://1722:Banking">Banking &amp; Loans</OPTION>');
	document.write('<OPTION VALUE="aol://1722:Real Estate">Real Estate</OPTION>');
	document.write('<OPTION VALUE="null"></OPTION>');
	document.write('<OPTION VALUE="aol://1722:PF Community">Chats &amp; Boards</OPTION>');
	document.write('<OPTION VALUE="aol://1722:Stock Game">Games</OPTION>');
	document.write('<OPTION VALUE="null"></OPTION>');
	document.write('<OPTION VALUE="aol://1722:PF A to Z">A to Z Subject List</OPTION>');
	document.write('<OPTION VALUE="aol://1722:PF Help">AOL Personal Finance Help</OPTION>');
	document.write('<OPTION VALUE="null"></OPTION>');
	document.write('<OPTION VALUE="aol://1722:AOL Help">AOL Help</OPTION>');
	document.write('</SELECT>');
	document.write('</TD>');
	document.write('<TD WIDTH="40">');
        document.write('<INPUT TYPE=image SRC="http://www.fortune.com/ui_images/gobutton.gif"  BORDER="0" HSPACE="2">');
        document.write('</TD>');
        document.write('</FORM>');
        document.write(' </TR>');
        document.write(' </TABLE>');
	document.write('</TD>');
        document.write('</TR>');
        document.write('</TABLE>');
	document.write('<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%" background="http://www.fortune.com/ui_images/bluetilehat.gif">');
	document.write('<TR>');
	document.write('<TD>');
        document.write('<IMG SRC="http://www.fortune.com/ui_images/clear.gif" WIDTH="585" HEIGHT="1" Border="0">');
        document.write('</TD>');
	document.write('</TR>');
	document.write('</TABLE>');
       


    	}


  else{


       document.write('<IFRAME SRC="http://toolbar.netscape.com/tw_hat/iframe/for.html" WIDTH="100%" FRAMEBORDER="0" HEIGHT="26" MARGINHEIGHT="0" MARGINWIDTH="0" SCROLLING="no">');
     document.write('<scr'+'ipt language="javascript" src="http://toolbar.netscape.com/toobar.twhat?dom=for">');
	document.write(" '// ' + '<' + '!--' +");
    document.write("<table width=\"100%\" height=\"24\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><TR><td bgcolor=\"006699\" align=\"left\">\n" +
				"<FONT FACE=\"Arial, Helvetica, sans-serif\" SIZE=1 COLOR=#FFFFFF> &nbsp;&nbsp;Welcome!</font></TD>\n" +
				"<TD bgcolor=\"#003366\" align=\"right\" width=\"373\"><a href=\"http://toolbar.netscape.com/nojs.twhat\" TARGET=\"_top\">\n" +
				"<img src=\"http://toolbar.netscape.com/tw_hat/chaos.gif\" height=\"24\" width=\"373\" align=\"right\" border=\"0\" hspace=\"0\" vspace=\"0\" ALT=\"Netscape Products and Services\" ismap>\n" +
				"</a></TD></TR></TABLE>\n");
	document.write(" '//--' + '>' +");
    document.write(' </SCRIPT> ');
   document.write('<NOSCRIPT> ');
   document.write('<table width="100%" height="24" cellpadding="0" cellspacing="0" border="0" hspace="0" vspace="0">');
   document.write('<TR>');
   document.write('<td bgcolor="006699" align="left">');
   document.write('<FONT FACE="Arial, Helvetica, sans-serif" SIZE=1 COLOR=#FFFFFF>');
   document.write('&nbsp; &nbsp; Welcome!');
   document.write(' </font>');
   document.write('</TD>');
  document.write('<TD bgcolor="#006699" align="right" width="374"> <a href="http://toolbar.netscape.com/nojs.twhat" TARGET="_top">');
  document.write('<img src="http://toolbar.netscape.com/tw_hat/chaos.gif" height="24" width="373" align="right" border="0" hspace="0" vspace="0" ALT="Netscape Products and Services" ismap >');
  document.write('</A>');
  document.write('</TD>');
  document.write('</TR>');
  document.write('</TABLE>');
  document.write('</NOSCRIPT>');
  document.write('</IFRAME>');

   }


