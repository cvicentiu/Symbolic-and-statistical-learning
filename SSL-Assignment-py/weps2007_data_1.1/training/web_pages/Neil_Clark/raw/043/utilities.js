function event_attach( event , func )
{
	if ( window.attachEvent )
	{
		window.attachEvent( event , func );
	}
	else
	{
		if ( ( typeof( func ) ).toLowerCase() != 'function' )
		{
			return;
		}
		if ( ( typeof( document.event_handlers ) ).toLowerCase() == 'undefined' )
		{
			document.event_handlers = new Array();
		}
		if ( ( typeof( document.event_handlers[ event ] ) ).toLowerCase() == 'undefined' )
		{
			document.event_handlers[ event ] = new Array();
		}
		if ( ( typeof( eval( 'window.' + event ) ) ).toLowerCase() != 'function' )
		{
			eval( 'window.' + event + ' = function () { if ( ( typeof( document.event_handlers[ \'' + event + '\' ] ) ).toLowerCase() != \'undefined\' ) { for ( i = document.event_handlers[ \'' + event + '\' ].length - 1 ; i >= 0  ; i-- ) { document.event_handlers[ \'' + event + '\' ][ i ](); } } } ' );
		}
		document.event_handlers[ event ][ document.event_handlers[ event ].length ] = func;
	}
}

/* Browser Detect  v2.1.6
 * documentation: http://www.dithered.com/javascript/browser_detect/index.html
 * license: http://creativecommons.org/licenses/by/1.0/
 * code by Chris Nott (chris[at]dithered[dot]com)
 *
 * modified to include Dreamcast
 */
function browser_detect() 
{
	var ua			= navigator.userAgent.toLowerCase(); 
	this.isGecko		= (ua.indexOf('gecko') != -1 && ua.indexOf('safari') == -1);
	this.isAppleWebKit	= (ua.indexOf('applewebkit') != -1);
	this.isKonqueror	= (ua.indexOf('konqueror') != -1); 
	this.isSafari		= (ua.indexOf('safari') != - 1);
	this.isOmniweb		= (ua.indexOf('omniweb') != - 1);
	this.isDreamcast	= (ua.indexOf("dreamcast") != -1);
	this.isOpera		= (ua.indexOf('opera') != -1); 
	this.isIcab		= (ua.indexOf('icab') != -1); 
	this.isAol		= (ua.indexOf('aol') != -1); 
	this.isIE		= (ua.indexOf('msie') != -1 && !this.isOpera && (ua.indexOf('webtv') == -1)); 
	this.isMozilla		= (this.isGecko && ua.indexOf('gecko/') + 14 == ua.length);
	this.isFirebird		= (ua.indexOf('firebird/') != -1);
	this.isNS		= ((this.isGecko) ? (ua.indexOf('netscape') != -1) : ((ua.indexOf('mozilla') != -1) && !this.isOpera && !this.isSafari && (ua.indexOf('spoofer') == -1) && (ua.indexOf('compatible') == -1) && (ua.indexOf('webtv') == -1) && (ua.indexOf('hotjava') == -1)));
	this.isIECompatible	= ((ua.indexOf('msie') != -1) && !this.isIE);
	this.isNSCompatible	= ((ua.indexOf('mozilla') != -1) && !this.isNS && !this.isMozilla);
	this.geckoVersion	= ((this.isGecko) ? ua.substring((ua.lastIndexOf('gecko/') + 6), (ua.lastIndexOf('gecko/') + 14)) : -1);
	this.equivalentMozilla	= ((this.isGecko) ? parseFloat(ua.substring(ua.indexOf('rv:') + 3)) : -1);
	this.appleWebKitVersion	= ((this.isAppleWebKit) ? parseFloat(ua.substring(ua.indexOf('applewebkit/') + 12)) : -1);
	this.versionMinor	= parseFloat(navigator.appVersion); 
	if (this.isGecko && !this.isMozilla) {
		this.versionMinor = parseFloat(ua.substring(ua.indexOf('/', ua.indexOf('gecko/') + 6) + 1));
	}
	else if (this.isMozilla) {
		this.versionMinor = parseFloat(ua.substring(ua.indexOf('rv:') + 3));
	}
	else if (this.isIE && this.versionMinor >= 4) {
		this.versionMinor = parseFloat(ua.substring(ua.indexOf('msie ') + 5));
	}
	else if (this.isKonqueror) {
		this.versionMinor = parseFloat(ua.substring(ua.indexOf('konqueror/') + 10));
	}
	else if (this.isSafari) {
		this.versionMinor = parseFloat(ua.substring(ua.lastIndexOf('safari/') + 7));
	}
	else if (this.isOmniweb) {
		this.versionMinor = parseFloat(ua.substring(ua.lastIndexOf('omniweb/') + 8));
	}
	else if (this.isOpera) {
		this.versionMinor = parseFloat(ua.substring(ua.indexOf('opera') + 6));
	}
	else if (this.isIcab) {
		this.versionMinor = parseFloat(ua.substring(ua.indexOf('icab') + 5));
	}
	this.versionMajor	= parseInt(this.versionMinor); 
	this.isDOM1		= (document.getElementById);
	this.isDOM2Event	= (document.addEventListener && document.removeEventListener);
	this.mode		= document.compatMode ? document.compatMode : 'BackCompat';
	this.isWin		= (ua.indexOf('win') != -1);
	this.isWin32		= (this.isWin && (ua.indexOf('95') != -1 || ua.indexOf('98') != -1 || ua.indexOf('nt') != -1 || ua.indexOf('win32') != -1 || ua.indexOf('32bit') != -1 || ua.indexOf('xp') != -1));
	this.isMac		= (ua.indexOf('mac') != -1);
	this.isUnix		= (ua.indexOf('unix') != -1 || ua.indexOf('sunos') != -1 || ua.indexOf('bsd') != -1 || ua.indexOf('x11') != -1)
	this.isLinux		= (ua.indexOf('linux') != -1);
	this.isNS4x		= (this.isNS && this.versionMajor == 4);
	this.isNS40x		= (this.isNS4x && this.versionMinor < 4.5);
	this.isNS47x		= (this.isNS4x && this.versionMinor >= 4.7);
	this.isNS4up		= (this.isNS && this.versionMinor >= 4);
	this.isNS6x		= (this.isNS && this.versionMajor == 6);
	this.isNS6up		= (this.isNS && this.versionMajor >= 6);
	this.isNS7x		= (this.isNS && this.versionMajor == 7);
	this.isNS7up		= (this.isNS && this.versionMajor >= 7);
	this.isIE4x		= (this.isIE && this.versionMajor == 4);
	this.isIE4up		= (this.isIE && this.versionMajor >= 4);
	this.isIE5x		= (this.isIE && this.versionMajor == 5);
	this.isIE55		= (this.isIE && this.versionMinor == 5.5);
	this.isIE5up		= (this.isIE && this.versionMajor >= 5);
	this.isIE6x		= (this.isIE && this.versionMajor == 6);
	this.isIE6up		= (this.isIE && this.versionMajor >= 6);
	this.isIE4xMac		= (this.isIE4x && this.isMac);
}



/* handler for Netscape Navigator clients that screw up the display
 * of CSS pages when reloaded
 */
function NN_reloadPage( init )
{
	if ( init == true ) with ( navigator )
	{
		if ( ( appName == "Netscape" ) && ( parseInt ( appVersion ) == 4 ) )
		{
			document.NN_pgW = innerWidth;
			document.NN_pgH = innerHeight;
			event_attach ( 'onresize' , NN_reloadPage );
		}
	}
	else if ( innerWidth != document.NN_pgW || innerHeight != document.NN_pgH )
	{
		location.reload();
	}
}

/* Min Width v1.1.3 by PVII-www.projectseven.com
 * http://www.projectseven.com/tutorials/css/minwidth/index.htm
 *
 * modified for readability and ability to limit application to
 * IE only so CSS min-width property may be used by compliant
 * browsers.
 *
 * NOTE: horizontal spacing (margins, padding, borders) set in
 *       % values may cause IE to crash when using this script.
 *
 * ALSO: padding, margins, and borders on parents of the element
 *       you specify may result in IE getting suck in an infinite
 *       loop. Please be sure to check your layout before you 
 *       publish it!
 */
function set_min_width( obj_name , min_width , ieOnly )
{
	if ( ( typeof( ieOnly ) ).toLowerCase() == 'undefined' )
	{
		ieOnly = true;
	}
	if ( ieOnly == false || ( document.getElementById && navigator.appVersion.indexOf( "MSIE" ) > -1 && !window.opera ) )
	{
		document.min_width_obj_name = obj_name;
		document.min_width_size = min_width;
		document.resizing = false;
		event_attach( 'onload' , control_min_width );
		event_attach( 'onresize' , control_min_width );
	}
}
function control_min_width()
{
	var cw , w , pl , pr , ml , mr , br , bl , ad , theDiv = document.min_width_obj_name;
	var g = document.getElementById( theDiv );
	w = parseInt(document.min_width_size);
	if ( g && document.body && document.body.clientWidth )
	{
		gs = g.currentStyle;
		cw = parseInt( document.body.clientWidth );
		pl = parseInt( gs.paddingLeft );
		pr = parseInt( gs.paddingRight );
		ml = parseInt( gs.marginLeft );
		mr = parseInt( gs.marginRight );
		bl = parseInt( gs.borderLeftWidth );
		br = parseInt( gs.borderRightWidth );
		ml = ml ? ml : 0;
		mr = mr ? mr : 0;
		pl = pl ? pl : 0;
		pr = pr ? pr : 0;
		bl = bl ? bl : 0;
		br = br ? br : 0;
		ad = pl + pr + ml + mr + bl + br;
		if ( cw <= w )
		{
			w -= ad;
			g.style.width = w + "px";
		}
		else
		{
			g.style.width = "auto";
		}
	}
}

/* standard trim function to remove leading and trailing 
 * whitespace from a given string
 */
function trim( str )
{
   return str.replace(/^\s*|\s*$/g,"");
}



