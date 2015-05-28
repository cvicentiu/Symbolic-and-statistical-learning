function browseNotes (url, w, h, name) {
	var winopts = "toolbar=no,location=no,directories=no,status=no,";
	winopts = winopts + "menubar=no,scrollbars=auto,resizable=no,";
	winopts = winopts + "width=" + w + ",height=" + h; remote = window.open(url,name,winopts);
}

function browseNotesScroll (url, w, h, name) {
	var winopts = "toolbar=no,location=no,directories=no,status=no,";
	winopts = winopts + "menubar=no,scrollbars=yes,resizable=no,";
	winopts = winopts + "width=" + w + ",height=" + h; remote = window.open(url,name,winopts);
}

function openAnySize (url, w, h, name) {
	var winopts = "toolbar=no,location=no,directories=no,status=no,";
	winopts = winopts + "menubar=no,scrollbars=yes,resizable=yes,";
	winopts = winopts + "width=" + w + ",height=" + h; remote = window.open(url,name,winopts);
}

function openBox (url, name) {
	var winopts = "width=355,height=200,toolbar=no,location=no,directories=no,";
	winopts = winopts + "status=no,menubar=no,scrollbars=yes,resizable=yes,";
	remote = window.open(url,name,winopts);
}

function target_gran (url) {
	if (top.opener.location != "http://petefit.swale.ananova.net/alerts/webalerts/k_link.php") {
		if (!(top.opener.location.href = url)) { window.open (url, "ananova") }
	} else { window.open (url, "ananova") }
}

function setSearchBox () {
	if (((navigator.appVersion).charAt(0)  != "2") || navigator.appName != "Netscape") {
		if (pagevisit == 0 && document.forms[0].search.value == "London") {
			document.forms[0].search.value = "";
			pagevisit = 1;
		}
	}
}
var pagevisit = 0;
