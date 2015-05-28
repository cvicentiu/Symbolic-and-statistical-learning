function getRightColCookie(name){
	var cname = name + "=";               
	var dc = document.cookie;
	if (dc.length > 0) {              
		begin = dc.indexOf(cname);
		 if (begin != -1) {           
			begin += cname.length;
			end = dc.indexOf(";", begin);
				if (end == -1) end = dc.length;
				return unescape(dc.substring(begin, end));
		 }
	}
	return null;
}

var usename = getRightColCookie("UserName");
document.write('<span class="bmBreadcrumbText"><br>');

if (usename) {
	document.write('<b>Hello, ' + usename + '.</b><br><a class="bmBreadcrumbs" href="/cgi-bin/register/prefs.cgi">&gt; Edit your profile</a>');
}
else {
	document.write('<b>Personalize Cool Running!</b><br><a class="bmBreadcrumbs" href="/cgi-bin/register/prefs.cgi">&gt; Sign in<' + '/a><br><a class="bmBreadcrumbs" href="/cgi-bin/register/kick_register.cgi">&gt; New user<' + '/a>');
}

document.write('</' + 'span><br>&nbsp;');
