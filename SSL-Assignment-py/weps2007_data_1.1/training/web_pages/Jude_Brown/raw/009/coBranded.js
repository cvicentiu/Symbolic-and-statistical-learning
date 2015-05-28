var agt=navigator.userAgent.toLowerCase()
var is_aol   = (agt.indexOf("aol") != -1);

var url = location.hostname;

if ((typeof(nbaHat) == "undefined") && (nbaHat == null)){

if (is_aol && url.toLowerCase() =="www.nba.com"){
// output AOL hat
	var aoljs='<SCR' +'IPT LANGUAGE=\"JavaScript1.1\" SRC=\"http://hats.channel.aol.com/main.adp?ch=sports\"></SCR' +'IPT>'
	document.write(aoljs);		
}
if (is_aol || url.toLowerCase() =="aol.nba.com"){
// output AOL hat
	var aoljs='<SCR' +'IPT LANGUAGE=\"JavaScript1.1\" SRC=\"http://hats.channel.aol.com/main.adp?ch=sports\"></SCR' +'IPT>'
	document.write(aoljs);		
	}	
if (url.toLowerCase() == "netscape.nba.com"){
	var netscapejs='<SCR' +'IPT LANGUAGE=\"JavaScript1.1\" SRC=\"http://hat.netscape.com/header/ns/nba/nsheader.js\"></SCR' +'IPT>'
	document.write(netscapejs);
	}

if (url.toLowerCase() == "compuserve.nba.com"){
	var compuservejs='<SCR'+ 'IPT LANGUAGE=\"JavaScript1.1\" SRC=\"http://hat.compuserve.com/header/nba/csheader.js\"></SCR' +'IPT>'
	document.write(compuservejs);
	}
if (url.toLowerCase() == "icq.nba.com") {
	var icqjs='<scr'+'ipt language=\"javascript\" src=\"http://web.icq.com/includes/karma/corp_bar/1,,,00.js\"></scr' + 'ipt>'
    document.write(icqjs);
	}
	// no action, no hat
} // end if nbaHat
var nbaHat = true;
