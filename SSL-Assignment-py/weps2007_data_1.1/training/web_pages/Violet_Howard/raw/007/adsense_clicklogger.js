function adsense_log_click(sChannel) {
	if ( window.status.indexOf('go to') == 0 ) {
		if ( check_click ) {
			check_click = false;
			send_adsense_log(window.status.substring(6), sChannel);
			window.status = '';
		}
	}
	top.focus();
}

function send_adsense_log(sTargetUrl, sChannel) {
	var iNow = (new Date()).getTime();
	if ( iNow - iPrevClick > 200 ) {
		// var sDebug = iStart + '_' + (iNow - iPrevClick);
		var sDebug = '';
		adsense_log_url_image.src = 'http://www.babynamesworld.com/adsense/adsense_clicklogger.php' + 
			'?R=' +	sSourcePage + 
			'&B=' +	sBillboardUrl + 
			'&Z=' +	sZone + 
			'&C=' +	sChannel + 
			'&U=' + escape(sTargetUrl) + 
			'&P=' + sReferrer +
			'&T=' + iNow + 
			'&D=' + escape(sDebug);
	}
	iPrevClick = iNow;
}

function enter_iframe(sChannel) {
	sCurrentChannel = sChannel;
	check_click = true;
}

function leave_iframe() {
	sCurrentChannel = '';
	check_click = false;
}

function check_adsense_click() {
	if ( check_click ) {
		// alert('click');
		check_click = false;
		var url = (window.status.indexOf('go to') == 0) ? window.status.substring(6) : 'unknown';
		send_adsense_log(url, (sCurrentChannel ? sCurrentChannel : 'unknown'));
		sleep();
			
	}
}

function sleep() {
	for ( var i = 0; i < 100000; i++ )
		var x = Math.random(i);
}

var sCurrentChannel = '';

try {

var aMatch 		= document.location.href.match(/billboard\/ad\.php\?site\=bnw\&zone\=(\w+)\&/);
var sZone 		= ( aMatch ? escape(aMatch[1]) : 'ads_by_google' );
var sReferrer		= ( top.document.referrer ? escape(top.document.referrer.replace(/http\:\/\/www\.babynamesworld\.com\//, '/')) : '' );
var iPrevClick		= (new Date()).getTime();
var iStart		= iPrevClick;
var sBillboardUrl	= escape(document.location.href.replace(/http\:\/\/www\.babynamesworld\.com\//, '/') + document.location.search);
var sSourcePage		= escape(top.location.href.replace(/http\:\/\/www\.babynamesworld\.com\//, '/') + top.location.search);

if ( sReferrer == 'http://www.babynamesworld.com' )
	sReferrer = '/';
if ( sSourcePage == 'http://www.babynamesworld.com' )
	sSourcePage = '/';

var adsense_log_url_image = new Image();
var check_click = false;

var elements;
if(document.getElementsByTagName)
	elements = document.body.getElementsByTagName("IFRAME");
else if (document.body.all)
	elements = document.body.all.tags("IFRAME");
else
	elements = Array();

for ( var i = 0; i < elements.length; i++ ) {
	if ( elements[i].src.indexOf('googlesyndication.com') > -1 ) {
		var aMatch = elements[i].src.match(/\&channel\=([^\&]+)\&/);
		var sChannel = aMatch ? aMatch[1] : 'unknown';
		if ( document.all ) 
			elements[i].onfocus = new Function('adsense_log_click(\'' + sChannel + '\');');
		elements[i].onmouseover = new Function('enter_iframe(\'' + sChannel + '\');');
		elements[i].onmouseout = new Function('leave_iframe();');
	}
}

if ( !document.all || navigator.userAgent.match(/IE\s7\./) ) 
	window.onunload = check_adsense_click;

} catch(e) { }
