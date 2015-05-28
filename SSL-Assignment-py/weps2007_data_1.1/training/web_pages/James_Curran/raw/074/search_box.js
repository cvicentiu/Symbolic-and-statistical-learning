
<!--
	// Excerpts from Ultimate client-side JavaScript client sniff. Version 3.02
	// (C) Netscape Communications 1999.
	// convert all characters to lowercase to simplify testing
    var agt=navigator.userAgent.toLowerCase();
	// *** BROWSER VERSION ***
    // Note: On IE5, these return 4, so use is_ie5up to detect IE5.
    var is_major = parseInt(navigator.appVersion);
    var is_minor = parseFloat(navigator.appVersion);
	
	var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
    var is_nav4dwn = (is_nav && (is_major <= 4));
    var is_nav6up = (is_nav && (is_major >= 5));
	
	function clear_textbox()
	{
		if (document.search.qt.value == "Search ND Website")
		document.search.qt.value = "";
	} 
	
	if((agt.indexOf('mac') != -1) && (agt.indexOf('msie') != -1)){
		document.write('<input type=text name="qt" onFocus="clear_textbox();" value="Search ND Website" size="15" class="pulldown"><input type="image" name="go" src="http://www.nd.edu/~cba/011221/images/search_go2.gif" alt="go search" border="0" class="searchgo">');
	}
    else if((agt.indexOf('mac') != -1) && (agt.indexOf('nav4dwn') != -1)){
			document.write('<input type=text name="qt" onFocus="clear_textbox();" value="Search ND Website" size="20" class="pulldownmac"><input type="image" name="go" src="http://www.nd.edu/~cba/011221/images/search_go2.gif" alt="go search" align="top" class="searchgo" border="0">');
		}
		else if((agt.indexOf('mac') != -1) && (is_nav6up)){
			document.write('<input type=text name="qt" onFocus="clear_textbox();" value="Search ND Website" size="16" class="pulldownmac"><input type="image" name="go" src="http://www.nd.edu/~cba/011221/images/search_go2.gif" alt="go search" align="top" border="0" class="searchgo" border="0">');
		}
	else if(agt.indexOf('mac') != -1){
			document.write('<input type=text name="qt" onFocus="clear_textbox();" value="Search ND Website" size="25" class="pulldownmac"><input type="image" name="go" src="http://www.nd.edu/~cba/011221/images/search_go2.gif" alt="go search" align="top" class="searchgo" border="0">');
		}
	else if((agt.indexOf('win') != -1) && (agt.indexOf('msie') != -1)){
			document.write('<input type=text name="qt" onFocus="clear_textbox();" value="Search ND Website" size="22" class="pulldown"><input type="image" name="go" src="http://www.nd.edu/~cba/011221/images/search_go2.gif" alt="go search" align="top" class="searchgo" border="0">');
		} 
	else if((agt.indexOf('win') != -1) && (is_nav4dwn)){
			document.write('<input type=text name=\"qt\" onFocus=\"clear_textbox();\" value=\"Search ND Website\" size=\"13\" class=\"pulldown\"><input type=\"image\" name=\"go\" src=\"http://www.nd.edu/~cba/011221/images/search_go2.gif\" alt=\"go search\" align=\"top\" border=\"0\" class=\"searchgo\">');
		}
		else if((agt.indexOf('win') != -1) && (is_nav6up)){
			document.write('<style type=\"text/css\">	.pulldown2a {font : 10px Verdana, Geneva, Arial, Helvetica, sans-serif;	color : Black;	font-family : Arial, Helvetica, sans-serif;	font-size : 10px;}</style><input type=text name=\"qt\" onFocus=\"clear_textbox();\" value=\"Search ND Website\" size=\"13\" class=\"pulldown2a\"><input type=\"image\" name=\"go\" src=\"http://www.nd.edu/~cba/011221/images/search_go2.gif\" alt=\"go search\" align=\"top\" border=\"0\" class=\"searchgo\">');
		}
	else if(agt.indexOf('win') != -1) {
		document.write('<input type=text name="qt" onFocus="clear_textbox();" value="Search ND Website" size="15" class="pulldown"><input type="image" name="go" src="http://www.nd.edu/~cba/011221/images/search_go2.gif" alt="go search" align="top" class="searchgo" border="0">');
		}
	else {
	document.write('<input type=text name="qt" onFocus="clear_textbox();" value="Search ND Website" size="15" class="pulldown"><input type="image" name="go" src="http://www.nd.edu/~cba/011221/images/search_go2.gif" alt="go search" align="top" class="searchgo" border="0">');
		}

//-->
