function getFileName() {
  var parts = document.location.pathname.split("/");
  var len = parts.length;
  len = len - 1;
  var page = parts[len];
  return page;
} 
var filename = getFileName();
if (!filename) {
filename = "index.html";
}

<!------ OAS SETUP begin ------>
<!--

var tcdacmd="dt";
document.write('<SCR' + 'IPT LANGUAGE="Javascript" SRC="http://an.tacoda.net/an/11746/slf.js"></SCR' + 'IPT>');

strlen = document.location.search.length;
qstring = document.location.search.substring(1,strlen);

//configuration
OAS_url ='http://oas.signonsandiego.com/RealMedia/ads/';
OAS_listpos = 'TopRight,Top,Middle,Bottom';
OAS_query = qstring;
OAS_target = '_top';
OAS_sitepage = "www.uniontrib.com/uniontrib/" + filename; // <-- USE THIS ONE ONLY

//end of configuration

OAS_version = 10;
OAS_rn = '001234567890'; OAS_rns = '1234567890';
OAS_rn = new String (Math.random()); OAS_rns = OAS_rn.substring (2, 11);
function OAS_NORMAL(pos) { 
document.write('<A HREF="' + OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" TARGET=_blank>');
document.write('<IMG SRC="' + OAS_url + 'adstream_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" BORDER=0></A>');
}
//-->

<!--
OAS_version = 11;
if (navigator.userAgent.indexOf('Mozilla/3') != -1)
OAS_version = 10;
if (OAS_version >= 11)
document.write('<SCRIPT LANGUAGE=JavaScript1.1 SRC="' + OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '?' + OAS_query + '"><\/SCRIPT>');
//-->

<!-- 
document.write('');
function OAS_AD(pos) {
if (OAS_version >= 11)
OAS_RICH(pos);
else
OAS_NORMAL(pos);
}
//-->




//phantompop top check
var toppopscript = 1;

