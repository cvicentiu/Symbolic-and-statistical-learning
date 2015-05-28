
<!--
var Navit=1;
var Section;
var Monav = new Array('nav-dating', 'nav-email', 'nav-gift', 'nav-marriage', 'nav-parent', 'nav-wedding','nav-personal','nav-home');
var MoImage = new Array();
for (i=0;i<8;i++) {
	MoImage[i] = new Image();
	MoImage[i].src = "/img/"+Monav[i]+".gif";
	}
	
function doit(where,how) {
	where.src = MoImage[how].src;
	}
function dooff(where) {
	where.src = MoImage[Section].src;
	}
	
function writenav() {
var temp = '';
temp +='';
temp +='<TABLE CELLPADDING=0 CELLSPACING=0 BORDER=0 WIDTH=303><TR VALIGN=top>';
temp +='<TD><A HREF="http://www.lovegevity.com/dating/index.html" CLASS="med" onmouseover="doit(Navit, 0); return true;" onmouseout="dooff(Navit); return true;">Dating&nbsp;</A><BR>';
temp +='<A HREF="http://www.lovegevity.com/marriage/index.html" CLASS="med" onmouseover="doit(Navit, 3); return true;" onmouseout="dooff(Navit); return true;">Marriage&nbsp;</A><BR>';
temp +='<A HREF="http://www.usbridalguide.cceasy.com/order/index.cfm?rand=2356O5642X7451" CLASS="med" onmouseover="doit(Navit, 6); return true;" onmouseout="dooff(Navit); return true;">Stationery</A><BR>';
temp +='<A HREF="http://www.lovegevity.com/aboutlovegevity/index.html" CLASS="med" onmouseover="doit(Navit, 1); return true;" onmouseout="dooff(Navit); return true;">Contact Us</A></TD>';
temp +='<TD><A HREF="http://www.lovegevity.com/engagement/index.html" CLASS="med" onmouseover="doit(Navit, 5); return true;" onmouseout="dooff(Navit); return true;">Engagement&nbsp;</A><BR>';
temp +='<A HREF="http://www.lovegevity.com/parenting/index.html" CLASS="med" onmouseover="doit(Navit, 4); return true;" onmouseout="dooff(Navit); return true;">Parenting&nbsp;</A><BR>';
temp +='<A HREF="http://www.nexternal.com/lovegevity/?Target=products.asp&CategoryID=126" CLASS="med" onmouseover="doit(Navit, 2); return true;" onmouseout="dooff(Navit); return true;">Products</A><BR>';
temp +='<A HREF="http://www.lovegevity.com/aboutlovegevity/jobs/index.html" CLASS="med" onmouseover="doit(Navit, 7); return true;" onmouseout="dooff(Navit); return true;">Jobs</A></TD>';
temp +='<TD WIDTH="63" valign=middle align=center><IMG name=Navit SRC="'+MoImage[Section].src+'" WIDTH="48" HEIGHT="53" BORDER="0"></TD></TR></TABLE>	';
document.write(temp);
}
//-->





