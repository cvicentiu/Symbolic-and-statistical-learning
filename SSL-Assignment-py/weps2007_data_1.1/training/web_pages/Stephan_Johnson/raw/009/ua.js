
window.saveNavigator = window.navigator;

function defaultOnError(msg, url, line)
{
    window.onerror = null;
    top.onerror = null;
    top.document.location = '/devedge/xbProjects/_files/errors/not-supported.html';
}

function detectBrowser()
{
    var oldOnError = window.onerror;
    var element = null;
    
    window.onerror = defaultOnError;

    navigator.OS        = '';
    navigator.version   = 0;
    navigator.org       = '';
    navigator.family    = '';

    var platform = window.navigator.platform.toLowerCase();
    if (platform.indexOf('win') != -1)
        navigator.OS = 'win';
    else if (platform.indexOf('mac') != -1)
        navigator.OS = 'mac';
    else if (platform.indexOf('unix') != -1 || platform.indexOf('linux') != -1)
        navigator.OS = 'nix';

    var i = 0;
    var ua = window.navigator.userAgent.toLowerCase();
    
    if (ua.indexOf('opera') != -1)
    {
        i = ua.indexOf('opera');
        navigator.family    = 'opera';
        navigator.org       = 'opera';
        navigator.version   = parseFloat('0' + ua.substr(i+6), 10);
    }
    else if ((i = ua.indexOf('msie')) != -1)
    {
        navigator.org       = 'microsoft';
        navigator.version   = parseFloat('0' + ua.substr(i+5), 10);
        
        if (navigator.version < 4)
            navigator.family = 'ie3';
        else
            navigator.family = 'ie4'
    }
    else if (typeof(window.controllers) != 'undefined' && typeof(window.locationbar) != 'undefined')
    {
        i = ua.lastIndexOf('/')
        navigator.version = parseFloat('0' + ua.substr(i+1), 10);
        navigator.family = 'gecko';

        if (ua.indexOf('netscape') != -1)
            navigator.org = 'netscape';
        else if (ua.indexOf('compuserve') != -1)
            navigator.org = 'compuserve';
        else
            navigator.org = 'mozilla';
    }
    else if ((ua.indexOf('mozilla') !=-1) && (ua.indexOf('spoofer')==-1) && (ua.indexOf('compatible') == -1) && (ua.indexOf('opera')==-1)&& (ua.indexOf('webtv')==-1) && (ua.indexOf('hotjava')==-1))
    {
        i = ua.lastIndexOf('/')
        navigator.version = parseFloat('0' + ua.substr(i+1), 10);
        navigator.org = 'netscape';
        navigator.family = 'nn' + parseInt('0' + ua.substr(i+1), 10);
    }
    else if ((i = ua.indexOf('aol')) != -1 )
    {
        // aol
        navigator.family    = 'aol';
        navigator.org       = 'aol';
        navigator.version   = parseFloat('0' + ua.substr(i+4), 10);
    }

    navigator.DOMCORE1  = (typeof(document.getElementsByTagName) != 'undefined' && typeof(document.createElement) != 'undefined');
    navigator.DOMCORE2  = (navigator.DOMCORE1 && typeof(document.getElementById) != 'undefined' && typeof(document.createElementNS) != 'undefined');
    navigator.DOMHTML   = (navigator.DOMCORE1 && typeof(document.getElementById) != 'undefined');
    navigator.DOMCSS1   = ( (navigator.family == 'gecko') || (navigator.family == 'ie4') );

    navigator.DOMCSS2   = false;
    if (navigator.DOMCORE1)
    {
        element = document.createElement('p');
        navigator.DOMCSS2 = (typeof(element.style) == 'object');
    }

    navigator.DOMEVENTS = (typeof(document.createEvent) != 'undefined');

    window.onerror = oldOnError;
}

detectBrowser();

function gotosite(site) {
    if (site != "") {
        self.location=site;
    }
}

/**
function launchGameCast(sport,hteam,season,date,live) {
	window.name = "_gamecast";
	if (sport == "mlb") {
		var url = "http://sports.espn.go.com/"+sport+"/gamecast/index?year="+season+"&date="+date+"&homeTeamAbbrev="+hteam+"&isLive="+live+"";					
	} else {
		var url = "http://scores.espn.go.com/cgi/gamecast/"+sport+"/index.asp?season="+season+"&date="+date+"&hteam="+hteam+"&live="+live+"";
	}		
	var name = "gamecast_" + hteam;
	launchWindow (url, name, 620, 580);
}
**/