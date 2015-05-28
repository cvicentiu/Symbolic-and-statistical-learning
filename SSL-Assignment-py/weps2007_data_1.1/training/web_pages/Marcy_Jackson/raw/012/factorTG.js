var url = new String(document.location.href.split("?")[0]) ;
var gid = '' ;
var ftgCltSR = 50;

if ( url == 'http://www.washingtonpost.com/wp-srv/front.htm' || url == 'http://www.washingtonpost.com/' )
{
	// gid = 6220 ;
}
else if ( url == 'http://www.washingtonpost.com/wp-dyn/content/opinion/index.html' || url == 'http://www.washingtonpost.com/wp-dyn/content/opinion/' )
{
	gid = 6219 ;
	ftgCltSR = 30;
}
else if ( url == 'http://www.washingtonpost.com/wp-dyn/content/article/2005/07/06/AR2005070600283.html' )
{
	gid = 6221 ;
	ftgCltSR = 20;
}

if ( gid )
{
	if  ( (Math.round(Math.random()*50)%ftgCltSR) == 0 )
		document.write('<SCRI'+'PT LANGUAGE="JavaScript" SRC="http://sensor.suitesmart.com/sensorWH.js?GID='+gid+'"></SCR'+'IPT>');
}