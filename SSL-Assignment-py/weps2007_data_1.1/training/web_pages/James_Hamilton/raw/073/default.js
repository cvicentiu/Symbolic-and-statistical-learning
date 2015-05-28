// A collection of JavaScript routines
// needed on practically every page of the site.

function ScrollingPopup (url, name, width, height)
{
	var hWnd = window.open(url,
		name,"width="+ width + ",height=" +height+
		",scrollbars=yes");
//	return false;
}


function Popup(url, name, width, height)
{
	var hWnd = window.open(url,
		name,"width="+ width + ",height=" +height+
		",scrollbars=no");
//	return false;
}


function openUserInfo( nick ) {
        ScrollingPopup('http://cgi.sparknotes.com/publicProfile/?nick=' + nick,
                Math.round(1000000 * Math.random()),616,500);
}



function changeURL(theElement) {

	window.location.href = theElement.value;

}

/*
** swapImage - pass in the ID of the image you want to swap, and the url of the image to swap it with
**
*/
function swapImage(theID, theURL) {
	
	document.getElementById(theID).src = theURL;

}



/**************************** Navigation Related Functions ************************/

var prefix = get_http();
var url_nav = prefix + "://img.sparknotes.com/nav/";
var url_subnav = prefix + "://img.sparknotes.com/nav/subs/";




/*
** returns http or https 
**
*/

function get_http () {

	url = window.location.href;
	//if current url contains the string 'https', then its a secure prefix
	if(url.indexOf("https") != -1) {
		return "https";
	}
	else {
		return "http";		
	}

}


function preload_nav() {
//Preload all the '-on' images for the nav buttons

  if (!document.images) return;

  var nav = new Array("eng","his","ms","os","tp", "col", "sl");
  var subnav = new Array("lit", "sh", "dr", "po", "mb_eng", "his", "bgy", "mb_his", "mat", "che", "bio", "phy", "ast", "cs", "mb_ms", "fil", "phi", "psy", "hh", "eco", "mb_os", "sat", "sat2", "newsat", "act", "mb_tp", "srch", "admissions", "financial", "life", "mb_col", "stalk", "stests", "wwr", "mb_sl"); 
  for (var i = 0; i < nav.length; i++) {

    nav_img_load = new Image();
    nav_img_load.src = url_nav + nav[i] + "-on.gif";

  }//endfor

  for (i = 0; i < subnav.length; i++) {

    subnav_img_load = new Image();
    subnav_img_load.src = url_subnav + subnav[i] + "-on.gif";

  }//endfor

}



function nav_on(itemName) {
if (document.getElementById(itemName)) {
	if (document.getElementById(itemName).src != url_nav + itemName + '-on.gif') {
		document.getElementById(itemName).src = url_nav + itemName + '-on.gif';
		document.getElementById('cell-' + itemName).style.background = '#FFFFFF';
		nav_sep(itemName, 1);
	}
}

}//end function

function nav_off(itemName) {
if(document.getElementById(itemName)) {
	document.getElementById(itemName).src = url_nav + itemName + '-off.gif';
	document.getElementById('cell-' + itemName).style.background = '';
	nav_sep(itemName, 0);
}
}

//handles the background color for the separator bars
function nav_sep(itemName, on_off) {
	var bg_color;
	if (on_off == 1){ bg_color='#FFFFFF'; }//endif
	else { bg_color=''; }

	switch (itemName){
		case "eng":
		if (on_off == 0 && document.getElementById('section-his')) { } 
		else { document.getElementById('sep-eng').style.background = bg_color; }
		break;

		case "his":
		if (on_off == 0 && document.getElementById('section-ms')) { } 
		else { document.getElementById('sep-his').style.background = bg_color; }		
		if(document.getElementById('sep-eng')) { document.getElementById('sep-eng').style.background = bg_color; }
		break;

		case "ms":
		if (on_off == 0 && document.getElementById('section-os')) { } 
		else { document.getElementById('sep-ms').style.background = bg_color; }
		if(document.getElementById('sep-his')) { document.getElementById('sep-his').style.background = bg_color; }
		break;

		case "os":		
		if (on_off == 0 && document.getElementById('section-tp')) { } 
		else { document.getElementById('sep-os').style.background = bg_color; }
		if (document.getElementById('sep-ms')) { document.getElementById('sep-ms').style.background = bg_color; }
		break;
		
		case "tp":		
		if (on_off == 0 && document.getElementById('section-col')) { } 
		else { document.getElementById('sep-tp').style.background = bg_color; }
		if (document.getElementById('sep-os')) { document.getElementById('sep-os').style.background = bg_color; }
		break;
		
		case "col":		
		if (on_off == 0 && document.getElementById('section-sl')) { } 
		else { document.getElementById('sep-col').style.background = bg_color; }
		if (document.getElementById('sep-tp')) { document.getElementById('sep-tp').style.background = bg_color; }
		break;

		case "sl":
		if (document.getElementById('sep-col')) { document.getElementById('sep-col').style.background = bg_color; }
		break;

	}//end switch

}

//subnav 
function subnav_on (itemName) {
	if(document.getElementById('sub-' + itemName)) {
	document.getElementById('sub-' + itemName).src = url_subnav + itemName + '-on.gif';
	}
}

function subnav_off (itemName) {
	if(document.getElementById('sub-' + itemName)) {
	document.getElementById('sub-' + itemName).src = url_subnav + itemName + '-off.gif';
	}
}

/*
**
**
****************************** END TOP NAVIGATION RELATED FUNCTIONS ********/


var url_nav_nfs = prefix + "://img.sparknotes.com/nfs/nav/";

/* NFS Nav Functions */
function preload_nav_nfs() {
//Preload all the '-on' images for the nav buttons

  if (!document.images) return;

  var nav_nfs = new Array("sn","sc","sch","nfs","tp","sl");
  for (var i = 0; i < nav_nfs.length; i++) {

    nav_nfs_img_load = new Image();
    nav_nfs_img_load.src = url_nav_nfs + nav_nfs[i] + "-on.gif";

  }//endfor


}



function nav_on_nfs(itemName) {
if (document.getElementById(itemName)) {
	if (document.getElementById(itemName).src != url_nav_nfs + itemName + '-on.gif') {
		document.getElementById(itemName).src = url_nav_nfs + itemName + '-on.gif';
		document.getElementById('cell-' + itemName).style.background = '#FFFFFF';
		nav_sep_nfs(itemName, 1);
	}
}

}//end function

function nav_off_nfs(itemName) {
if(document.getElementById(itemName)) {
	document.getElementById(itemName).src = url_nav_nfs + itemName + '-off.gif';
	document.getElementById('cell-' + itemName).style.background = '';
	nav_sep_nfs(itemName, 0);
}
}

//handles the background color for the separator bars
function nav_sep_nfs(itemName, on_off) {
	var bg_color;
	if (on_off == 1){ bg_color='#FFFFFF'; }//endif
	else { bg_color=''; }

	switch (itemName){
		case "sn":
		if (on_off == 0 && document.getElementById('section-sc')) { } 
		else { document.getElementById('sep-sn').style.background = bg_color; }
		break;

		case "sc":
		if (on_off == 0 && document.getElementById('section-sch')) { } 
		else { document.getElementById('sep-sc').style.background = bg_color; }		
		if(document.getElementById('sep-sn')) { document.getElementById('sep-sn').style.background = bg_color; }
		break;

		case "sch":
		if (on_off == 0 && document.getElementById('section-nfs')) { } 
		else { document.getElementById('sep-sch').style.background = bg_color; }
		if(document.getElementById('sep-sc')) { document.getElementById('sep-sc').style.background = bg_color; }
		break;

		case "nfs":		
		if (on_off == 0 && document.getElementById('section-tp')) { } 
		else { document.getElementById('sep-nfs').style.background = bg_color; }
		if (document.getElementById('sep-sch')) { document.getElementById('sep-sch').style.background = bg_color; }
		break;
		
		case "tp":		
		if (on_off == 0 && document.getElementById('section-sl')) { } 
		else { document.getElementById('sep-tp').style.background = bg_color; }
		if (document.getElementById('sep-nfs')) { document.getElementById('sep-nfs').style.background = bg_color; }
		break;
		
		case "sl":
		if (document.getElementById('sep-tp')) { document.getElementById('sep-tp').style.background = bg_color; }
		break;

	}//end switch

}


//home page, print the random banner
function print_random_banner() {
	
	var number_of_banners = 11;
	
	var random_number;
	random_number = Math.floor (Math.random() * number_of_banners);
	if(random_number == 0) { random_number = 1; }
	
	document.write ("<img src='http://img.sparknotes.com/content/home/banners/" + random_number + ".gif'>");

}



//home page, print the random banner
function print_random_banner_newhome() {

	var number_of_banners = 8;
	
	
	var random_number;
	random_number = Math.floor (Math.random() * number_of_banners);
	if(random_number == 0) { random_number = 7; }
	
	
	if(random_number == 1) {
	document.write ("<a href='http://nfs.sparknotes.com/'><img src='http://img.sparknotes.com/homepage/promo/" + random_number + ".gif'></a>");
	}
	else if (random_number == 2)
	{
	document.write ("<a href='http://community.sparknotes.com/'><img src='http://img.sparknotes.com/homepage/promo/" + random_number + ".gif'></a>");
	}
	else if (random_number == 3)
	{
	document.write ("<a href='http://testprep.sparknotes.com/testcenter/minisat/'><img src='http://img.sparknotes.com/homepage/promo/" + random_number + ".gif'></a>");
	}
	else if (random_number == 4)
	{
	document.write ("<a href='http://www.sparknotes.com/sparkcharts/'><img src='http://img.sparknotes.com/homepage/promo/" + random_number + ".gif'></a>");
	}
	else if (random_number == 5)
	{
	document.write ("<a href='http://college.sparknotes.com/match/'><img src='http://img.sparknotes.com/homepage/promo/" + random_number + ".gif'></a>");
	}
	else if (random_number == 6)
	{
	document.write ("<a href='http://www.theu.com/sparknotes/' target='_blank'><img src='http://img.sparknotes.com/homepage/promo/" + random_number + ".gif'></a>");
	} 
	else if (random_number == 7)
	{
	document.write ("<a href='http://www.sparknotes.com/sparklife/holidayguide/'><img src='http://img.sparknotes.com/homepage/promo/" + random_number + ".gif'></a>");
	} 


	
}

//displays a random sn, pd or mb of the month
function handle_month(channel) {
	//english is the only channel that has sn of the month
	if(channel == "english") { list_month = new Array("sn", "pd", "mb"); }
	else { list_month = new Array("sn", "mb"); }
	random_number = Math.floor (Math.random() * list_month.length);
	var month_to_display = "month-" + list_month[random_number];
	document.getElementById(month_to_display).style.display = "block";



}



