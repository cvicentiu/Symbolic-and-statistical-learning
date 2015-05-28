function newWindow( name, url )
{
	if( url.indexOf ("?") == -1 )
		url = url + "?kurrentPageID=" + kurrentPageID;
	else
		url = url + "&kurrentPageID=" + kurrentPageID;
	window.open( url, name, "toolbar=no,resizable=yes,scrollbars=yes,menubar=no,location=no,width=450,height=290,top=200,left=200" );
}
