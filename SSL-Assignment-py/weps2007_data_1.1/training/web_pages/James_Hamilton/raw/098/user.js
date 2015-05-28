// user.js
// (c)2001-2005 SparkNotes, LLC
// $Id: user.js 4289 2006-04-24 20:31:13Z web $

/* Sets up the "Return to studying..." bookmark */
function saveBookmark(title, url, page_type) {
	// If you pass title here (ie: via head/configure.epl) it should be as
	// short+sweet as possible.  Otherwise, this sub will attempt to parse
	// the HTML title, which should be in this format:
	//
	// SparkNotes: Document Title: Page Title
	//
	// 'Page Title' (and the colon before it) is optional.
	
	if (!title) {
		// Strip "SparkNotes: " from the beginning of title. Strip out
		// the second colon and anything following it (if present.)
		title = document.title;
		var res = title.match(/([^\s:][^:]+[^\s:])/g);
		title = res[1] || res[0] || title; 
	}
	
	if (!url) {
		// Determine the current URL
		url = window.location + "";
	}

	if (!page_type) {
		// Determine what type of page it is (www, mb, or tp)
		var identifier = url.substring(7,9);
		var page_type;
		if (identifier == "ww" && url.indexOf("testprep") > 0 ) { page_type = "tp"; }
		else if (identifier == "ww" && url.indexOf("testprep") == -1 ) { page_type ="www"; }
		else if (identifier == "mb") { page_type = "mb"; } 
		else { page_type =""; }
	}

	setCookie ("bookmark_title", title, "1000");
	setCookie ("bookmark_url", url, "1000");
	setCookie ("bookmark_type", page_type , "1000");
	
	// for debugging:
	//document.write('<h4>', title, ' ', url, ' ', page_type, '</h4>');
}

/** CURRENTLY DOESN'T HANDLE TESTPREP **/
function print_bookmark() {

	//if the user isn't logged in, then don't print anything
	if(is_loggedin()) {

		var bookmark_url = get_bookmark_url();
		var bookmark_title = get_bookmark_title();
		var bookmark_type = get_bookmark_type();
		var prefix;
		if(bookmark_url != "" && bookmark_url != null && bookmark_title != ""  && bookmark_title != null) {
			
			if (bookmark_type == "mb") { prefix = "Return to the "; }
			else { prefix = "Go back to studying "; }

			
			document.write (prefix + "<a href='" + bookmark_url + "'>" + bookmark_title + "</a>");
		}
	}

}

//sends the page to the url indicated in the parameters, with the origin passed in the "url" variable.
function addUrl (url) {

        window.location.href = url + "?uri=" + escape(window.location);

}

/*
** returns the correct help page, depending on where the user currently is
**
*/

function get_help_url() {

	var url = window.location.href;
	var help_url;
	if(url.indexOf("http://www.sparknotes.com/testprep/") != -1 || url.indexOf("http://testprep.sparknotes.com/") != -1) {		
		help_url = "http://www.sparknotes.com/testprep/help/";
	}
	else if (url.indexOf("http://www.sparknotes.com/college/") != -1 || url.indexOf("http://college.sparknotes.com/") != -1){
		help_url = "http://www.sparknotes.com/college/help/";
	}
	else {
	help_url = "http://www.sparknotes.com/help/";
	}
	window.location.href = help_url;

}

/*
** prints the user links for the right hand side of the subnavigation
**
*/

function print_user_links() {

	var userName = getUserNick();
	if (userName) {
	
		
		document.write("<a href='javascript:get_help_url();'>Help</a>&nbsp;<img src=\"http://img.sparknotes.com/nfs/branding/topsep.gif\" alt=\"|\">&nbsp;<a href='http://cgi.sparknotes.com/profile/'>Preferences</a>&nbsp;<img src=\"http://img.sparknotes.com/nfs/branding/topsep.gif\" alt=\"|\">&nbsp;<a href='javascript:addUrl(\"https://login.sparknotes.com/logout.sub\")'>Log out</a>");
	} else {
		document.write("<a href='javascript:get_help_url();'>Help</a>&nbsp;<img src=\"http://img.sparknotes.com/nfs/branding/topsep.gif\" alt=\"|\">&nbsp;<a href='javascript:addUrl(\"https://login.sparknotes.com/login.psp\")'>Log in</a>&nbsp;<img src=\"http://img.sparknotes.com/nfs/branding/topsep.gif\" alt=\"|\">&nbsp;<a href='javascript:addUrl(\"https://login.sparknotes.com/signup.psp\")'>Sign Up for a Free Account</a>");
	}

}

function print_user_links_newsl() {

	

	var userName = getUserNick();
	if (userName) {
	
		
		document.write("<a href='javascript:get_help_url();'>Help</a>&nbsp;<img src='http://img.sparknotes.com/nfs/branding/topsep.gif' alt='|'>&nbsp;<a href='http://cgi.sparknotes.com/profile/'>Preferences</a>&nbsp;<img src='http://img.sparknotes.com/nfs/branding/topsep.gif' alt=''>&nbsp;<a href='javascript:addUrl(\"https://secure.sparknotes.com/account/shoppingCart.psp\")'>Shopping Cart</a>&nbsp;<img src='http://img.sparknotes.com/nfs/branding/topsep.gif' alt=''>&nbsp;<span onClick=\"window.location.href='https://secure.sparknotes.com/account/shoppingCart.psp\"'>");
		
		var numItems = getCookie('cart_total_items');
			if (numItems > 1){
				document.write(numItems + " items");
			}else if (numItems == 1){
				document.write("1 item");
			}else{
				document.write("0 items");
			}

			var subTotal = getCookie('cart_subtotal');
			if (subTotal > 0){
				document.write(" : $" + subTotal);
			}else{
				document.write("");
			}
		
		document.write("</span>&nbsp;<img src='http://img.sparknotes.com/nfs/branding/topsep.gif' alt='|'>&nbsp;<a href='javascript:addUrl(\"https://secure.sparknotes.com/account/buyCheckout.psp\")'>Checkout</a>&nbsp;<img src='http://img.sparknotes.com/nfs/branding/topsep.gif' alt='|'>&nbsp;<a href='javascript:addUrl(\"https://login.sparknotes.com/logout.sub\")'>Log out</a>");
	
	} else {
	
		document.write("<a href='javascript:get_help_url();'>Help</a>&nbsp;<img src='http://img.sparknotes.com/nfs/branding/topsep.gif' alt='|'>&nbsp;<a href='javascript:addUrl(\"https://login.sparknotes.com/login.psp\")'>Log in</a>&nbsp;<img src=\"http://img.sparknotes.com/nfs/branding/topsep.gif\" alt=\"|\">&nbsp;<a href='javascript:addUrl(\"https://login.sparknotes.com/signup.psp\")'>Sign Up for a Free Account</a>&nbsp;<img src='http://img.sparknotes.com/nfs/branding/topsep.gif' alt=''>&nbsp;<a href='javascript:addUrl(\"https://secure.sparknotes.com/account/shoppingCart.psp\")'>Shopping Cart</a>&nbsp;<img src='http://img.sparknotes.com/nfs/branding/topsep.gif' alt=''>&nbsp;<span onClick=\"window.location.href='https://secure.sparknotes.com/account/shoppingCart.psp\"'>");
		
		var numItems = getCookie('cart_total_items');
			if (numItems > 1){
				document.write(numItems + " items");
			}else if (numItems == 1){
				document.write("1 item");
			}else{
				document.write("0 items");
			}

			var subTotal = getCookie('cart_subtotal');
			if (subTotal > 0){
				document.write(" : $" + subTotal);
			}else{
				document.write("");
			}
		
		document.write("</span>&nbsp;<img src='http://img.sparknotes.com/nfs/branding/topsep.gif' alt='|'>&nbsp;<a href='javascript:addUrl(\"https://secure.sparknotes.com/account/buyCheckout.psp\")'>Checkout</a>");
		
	}

}

function print_welcome_msg() {

	var userName = getUserNick();
	if (userName) {
		document.write("<b>Welcome " + userName + "!</b> ");
		
	} else {
		document.write("Welcome to SparkNotes! ");
	}


}


function get_bookmark_url () {
	
	return getCookie("bookmark_url");
}

function get_bookmark_title () {

	return getCookie("bookmark_title");

}

function get_bookmark_type () {

	return getCookie("bookmark_type");

}


//
//  returns a link (in the given style class) to the last visited Study Guide or null otherwise
//

function lastGuideVisited(cls) {

	var url = getCookie("last_guide_url");
	var title = getCookie("last_guide_title");
	
	show_bookmark = ((url != null) && (url != "") && (title != null) && (title != ""));

	if (show_bookmark) {
		return "<A HREF=\"" + url + "\" class=\"" + cls + "\">" + title + "</A>";
	} else {
	        return null;
	}
}


// return the user's nickname.  relies on PLogin to set cookie snu_nick.
function getUserNick() {
	return getCookie("snu_nick");
}


function is_loggedin() {
	var nickname = getCookie("snu_nick");
	if(nickname != null && nickname != "") { return true; }
	else { return false; }
}



//
// Stores the Current Page for the user, for up to one month
//
                
function saveBookmarkX() {

        var today = new Date();
        var currenturl = window.location + "";
        var currenttitle = document.title;
        var identifier = currenturl.substring(7,9);
//filter out the SparkNotes text from the title
	if (currenttitle.substr(0,12) == "SparkNotes: ")
		currenttitle = currenttitle.substr(12);
	if (currenttitle.substr(0,11) == "SparkNotes ")
		currenttitle = currenttitle.substr(11);
//        currenttitle = currenttitle.substring(12, currenttitle.length);

        setCookie ("bookmark", currenturl, "1000");
        setCookie ("new_bookmark", currenttitle, "1000");

	if (identifier == "ww") {
		if (currenturl.indexOf("testprep") > 0) {
			setCookie ("last_testprep_url", currenturl, "1000");
			setCookie ("last_testprep_title", currenttitle, "1000");
		} else 	if (currenturl.indexOf(".dir") == -1) {
			setCookie ("last_guide_url", currenturl, "1000");
			setCookie ("last_guide_title", currenttitle, "1000");
		}
	} else if (identifier == "mb") {
		var boardid_start = currenturl.indexOf("b=");
		var boardid_end = currenturl.indexOf("&");
		if (boardid_end == -1) {
			boardid_end = currenturl.indexOf("#");
			if (boardid_end == -1) boardid_end = currenturl.length+1
		};
		if (boardid_start != -1) {
			currenturl = "http://mb.sparknotes.com/mb.mpl?" + currenturl.substring(boardid_start, boardid_end);
		} else {
			currenturl = null;
			currenttitle = null;
		}
		setCookie ("last_board_url", currenturl, "1000");
	        setCookie ("last_board_title", currenttitle, "1000");
	} else if (identifier == "te") {
		setCookie ("last_testprep_url", currenturl, "1000");
		setCookie ("last_testprep_title", currenttitle, "1000");
	}
}

                      



