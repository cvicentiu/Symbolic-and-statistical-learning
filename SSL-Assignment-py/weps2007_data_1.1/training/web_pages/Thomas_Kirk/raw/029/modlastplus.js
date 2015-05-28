<!--hide script from old browsers
var abc1 = "J.L. McKenzie";
var abc2 = "admin1a";
var abc3 = "JadeCat.com";
document.write('<p align="center">')
document.write('<font size="-1" face="arial,geneva">')
document.write('This Web Site designed and maintained by<br>')
document.write("<a href=" + "mail" + "to:" + abc2 + "&#064;" + abc3 + "?Subject=" + document.URL  + "><i>" + abc1 + "</i></a><br>")
document.write('<img src="http://www.JadeCat.com/common/jadecatmoonvsm.jpg" width="78" ')
document.write('height="45" border="0" alt="JadeCat Graphics"><br>')
document.write('Copyright')
document.write(' © 1998 - 2007 ')
document.write( abc1 )
document.write('<br>')
document.write('All rights reserved.')
document.write('<br>')
document.write('URL: <a href="' + document.URL + '">' + document.URL + '</a>');
document.write('</font>')
document.write('<br>')
document.write('<font size="-1" face="arial,geneva">')
// please keep these lines on when you copy the source
// script below made by: Nicolas - http://www.javascript-page.com

var default_date = "7/26/00"
var lm = document.lastModified

if (Date.parse(lm) == 0) {
lm = default_date
}
document.write("Last modified: " + lm)
// end Nicholas' script
document.write('</font><br>')
document.write('<font size="-1" face="arial,geneva">')
document.write('<a href="http://www.JadeCat.com/index.htm">Home</a>')
document.write('&nbsp;&nbsp;&nbsp;&nbsp;')
document.write('<a href="http://www.JadeCat.com/sitemap.html">Site Map</a></P>')
document.write('</font></center>')
//-- end hiding -->