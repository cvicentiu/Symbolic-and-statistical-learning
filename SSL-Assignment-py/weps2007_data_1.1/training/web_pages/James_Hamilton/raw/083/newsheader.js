
<!--
today=new Date()
theYear = today.getYear()
if(theYear >= 100 && theYear < 2000) theYear=theYear-100+2000

function DayArray(){
  this.length=DayArray.arguments.length
  for(var i=0;i<this.length;i++)
  this[i+1]=DayArray.arguments[i] }

function MonthArray(){
  this.length=MonthArray.arguments.length
  for(var i=0;i<this.length;i++)
  this[i+1]=MonthArray.arguments[i] }

var d=new DayArray("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
m=new MonthArray("January", "February", "March", "April", "May", "June", "July","August","September","October","November","December")
//-->
document.write("<table width=\"760\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" height=\"56\" align=\"center\">");
document.write("<tr>");
document.write("<td rowspan=\"5\" height=\"6\" bgcolor=\"EBCE78\"><img src=\"http://www.chinadaily.com.cn/image/dot.gif\" width=\"1\" height=\"1\"></td>");
document.write("<td colspan=\"8\" height=\"6\" bgcolor=\"#FFFFFF\"><img src=\"http://www.chinadaily.com.cn/image/Dot.gif\" width=\"1\" height=\"1\"></td>");
document.write("</tr>");
document.write("<tr>");
document.write("<td rowspan=\"3\" bgcolor=\"#FFFFFF\"></td>");
document.write("<td rowspan=\"3\" bgcolor=\"#FFFFFF\"></td>");
document.write("<td rowspan=\"3\" bgcolor=\"#FFFFFF\" height=\"42\"><img src=\"http://www.chinadaily.com.cn/image/logo.gif\" width=\"84\" height=\"42\"></td>");
document.write("<td rowspan=\"3\" bgcolor=\"#FFFFFF\"></td>");
document.write("<td rowspan=\"3\" bgcolor=\"#FFFFFF\" width=\"11\"></td>");
document.write("<td width=\"4\" bgcolor=\"#FFFFFF\"></td>");
document.write("<td width=\"11\" bgcolor=\"#FFFFFF\"></td>");
document.write("<td height=\"19\" bgcolor=\"#FFFFFF\" align=\"right\"><img src=\"http://www.chinadaily.com.cn/image/toplist_e.gif\" name=\"toplistwh_1\" width=\"487\"  usemap=\"#toplistwh_1\" border=\"0\" ></td>");
document.write("</tr>");
document.write("<tr>"); 
document.write("<td rowspan=\"2\" bgcolor=\"#FFFFFF\" valign=\"bottom\"><img src=\"http://www.chinadaily.com.cn/image/i_2.gif\" width=\"4\" height=\"7\"></td>");
document.write("<td rowspan=\"2\" bgcolor=\"#FFFFFF\" valign=\"top\"><img src=\"http://www.chinadaily.com.cn/image/i_1.gif\" width=\"11\" height=\"13\"></td>");
document.write("<td height=\"3\" bgcolor=\"C2C2C2\"><img src=\"http://www.chinadaily.com.cn/image/Dot.gif\" width=\"1\" height=\"1\"></td>");
document.write("</tr>");
document.write("<tr>");
document.write("<td height=\"20\" bgcolor=\"#FFFFFF\" align=\"right\"><img src=\"http://www.chinadaily.com.cn/image/toplist_c.gif\" width=\"490\" height=\"17\" usemap=\"#toplistwh_2\" border=\"0\" name=\"toplistwh_2\"></td>");

document.write("</tr>");
document.write("<tr>"); 
document.write("<td colspan=\"4\" bgcolor=\"#FFFFFF\"><img src=\"http://www.chinadaily.com.cn/image/Dot.gif\" width=\"1\" height=\"1\"></td>");
document.write("<td colspan=\"2\" bgcolor=\"#FFFFFF\" rowspan=\"2\"><img src=\"http://www.chinadaily.com.cn/image/i_3.gif\" width=\"15\" height=\"8\"></td>");
document.write("<td width=\"11\" bgcolor=\"EBCE78\"></td>");
document.write("<td height=\"5\" bgcolor=\"EBCE78\"><img src=\"http://www.chinadaily.com.cn/image/dot.gif\" width=\"1\" height=\"1\"></td>");
document.write("</tr>");
document.write("<tr>");
document.write("<td width=\"6\" bgcolor=\"EBCE78\"></td>");
document.write("<td width=\"10\" bgcolor=\"#FFFFFF\"><img src=\"http://www.chinadaily.com.cn/image/i_4.gif\" width=\"10\" height=\"3\"></td>");
document.write("<td width=\"19\" bgcolor=\"B39D5B\"><img src=\"http://www.chinadaily.com.cn/image/Dot.gif\" width=\"1\" height=\"1\"></td>");
document.write("<td width=\"84\" bgcolor=\"B39D5B\"><img src=\"http://www.chinadaily.com.cn/image/Dot.gif\" width=\"1\" height=\"1\"></td>");
document.write("<td width=\"8\" bgcolor=\"B39D5B\"><img src=\"http://www.chinadaily.com.cn/image/Dot.gif\" width=\"1\" height=\"1\"></td>");
document.write("<td width=\"11\" bgcolor=\"EBCE78\"><img src=\"http://www.chinadaily.com.cn/image/dot.gif\" width=\"1\" height=\"1\"></td>");
document.write("<td height=\"3\" bgcolor=\"EBCE78\"></td>");
document.write("</tr>");
document.write("</table>");
document.write("<table width=\"760\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">");
  document.write("<tr>"); 
    document.write("<td width=\"6\" bgcolor=\"EBCE78\"><img src=\"http://www.chinadaily.com.cn/image/dot.gif\" width=\"1\" height=\"1\"></td>");
    document.write("<td width=\"10\" valign=\"top\" bgcolor=\"EBCE78\"><img src=\"http://www.chinadaily.com.cn/image/i_6.gif\" width=\"10\" height=\"13\"></td>");
    document.write("<td width=\"146\" valign=\"bottom\" bgcolor=\"EBCE78\"><img src=\"http://www.chinadaily.com.cn/image/news.gif\" ></td>");   
    document.write("<td width=\"12\" bgcolor=\"5778B5\" valign=\"top\"><img src=\"http://www.chinadaily.com.cn/image/i_5.gif\" width=\"12\" height=\"11\"></td>");
    document.write("<td bgcolor=\"5778B5\" height=\"21\" valign=\"baseline\" width=\"260\"><b><font color=\"#FFFFFF\" class=\"v7\">");
	document.write(m[today.getMonth()+1]," ",today.getDate(),", ",theYear);
      document.write("</font></b></td>");
    document.write("<form name=\"searchform\" action=\"http://tsearch.chinadaily.com.cn/was40/search?channelid=38056\" method=\"post\" OnSubmit=\"return do_search(this);\">");
      document.write("<td width=\"306\" bgcolor=\"5778B5\" align=\"right\">"); 
          document.write("<input type=\"text\" name=\"sw\" size=\"30\" value=\"Search\" onFocus=\"cleanword(this)\" class=\"v7\">");
		  document.write("<input type=\"hidden\" name=\"searchword\">");
		  document.write("<input type=\"image\" name=\"Submit\" src=\"http://www.chinadaily.com.cn/image/titlesearch.gif\" width=\"28\" height=\"21\" align=\"absmiddle\" >&nbsp;&nbsp;&nbsp;&nbsp;<font color=\"#66CCFF\"><span class=\"v7\"><b><a href=\"http://tsearch.chinadaily.com.cn/was40/advancesearch.htm\"><b><font color=\"#FFFFFF\">Advanced Search</font></b></a></b></span></font></td>");
      document.write("</form>");
    document.write("<td width=\"20\" bgcolor=\"5778B5\">&nbsp;</td>");
  document.write("</tr>");
  document.write("<tr>"); 
    document.write("<td width=\"6\" bgcolor=\"EBCE78\"><img src=\"http://www.chinadaily.com.cn/image/dot.gif\" width=\"1\" height=\"1\"></td>");
    document.write("<td width=\"10\" bgcolor=\"EBCE78\"><img src=\"http://www.chinadaily.com.cn/image/dot.gif\" width=\"1\" height=\"1\"></td>");
    document.write("<td width=\"146\" bgcolor=\"EBCE78\"><img src=\"http://www.chinadaily.com.cn/image/dot.gif\" width=\"1\" height=\"1\"></td>");
    document.write("<td colspan=\"4\" bgcolor=\"#000000\"><img src=\"http://www.chinadaily.com.cn/image/Dot.gif\" width=\"1\" height=\"1\"></td>");
  document.write("</tr>");
  document.write("<tr bgcolor=\"EBCE78\">"); 
    document.write("<td colspan=\"7\" height=\"3\"><img src=\"http://www.chinadaily.com.cn/image/dot.gif\" width=\"1\" height=\"1\"></td>");
  document.write("</tr>");
document.write("</table>");
 document.write("<map name=\"toplistwh_1\">"); 
 document.write("<area shape=\"rect\" coords=\"7,2,61,17\"  href=\"http://www.chinadaily.com.cn/english/home/index.html\">");
document.write("<area shape=\"rect\" coords=\"65,2,103,18\"  href=\"http://www.chinadaily.com.cn/english/home/news.html\">");
document.write("<area shape=\"rect\" coords=\"106,3,167,19\" href=\"http://www.chinadaily.com.cn/english/home/biznews.html\">");
document.write("<area shape=\"rect\" coords=\"172,2,258,21\" href=\"http://www.chinadaily.com.cn/english/livechina/livingchina.html\">");
document.write("<area shape=\"rect\" coords=\"264,3,305,20\" href=\"http://bbs.chinadaily.com.cn/\">");
document.write("<area shape=\"rect\" coords=\"313,2,371,20\"  href=\"http://www.chinadaily.com.cn/weather/en\">");
document.write("<area shape=\"rect\" coords=\"378,2,448,25\" href=\"http://app1.chinadaily.com.cn/static/subscribe/subscription_e.html\" target=\"_blank\">");
document.write("<area shape=\"rect\" coords=\"451,2,489,18\" href=\"http://www.chinadaily.com.cn/english/static/job.html\" target=\"_blank\">");
document.write("<map name=\"toplistwh_2\">"); 
 document.write("<area shape=\"rect\" coords=\"29,1,96,18\" href=\"http://www.chinadaily.com.cn/gb/worldrep/index.html\">");
document.write("<area shape=\"rect\" coords=\"97,1,155,15\"  href=\"http://language.chinadaily.com.cn/\">");
document.write("<area shape=\"rect\" coords=\"158,2,215,16\" href=\"http://www.21kc.cn/\">");
document.write("<area shape=\"rect\" coords=\"220,-1,251,17\" href=\"http://mms.chinadaily.com.cn\">");
document.write("<area shape=\"rect\" coords=\"257,1,290,16\" href=\"http://sms.chinadaily.com.cn/\">");
document.write("<area shape=\"rect\" coords=\"292,2,325,16\" href=\"http://www.newsphoto.com.cn/\">");
document.write("<area shape=\"rect\" coords=\"327,1,364,17\" href=\"http://www.newscartoon.com.cn/\">");
document.write("<area shape=\"rect\" coords=\"366,0,401,19\" href=\"http://www.chinadaily.com.cn/weather/gb\">");
document.write("<area shape=\"rect\" coords=\"404,0,453,17\"  href=\"http://app1.chinadaily.com.cn/static/subscribe/subscription.html\"  target=\"_blank\">");
document.write("<area shape=\"rect\" coords=\"455,1,489,18\" href=\"http://www.chinadaily.com.cn/english/static/job.html\" target=\"_blank\">");
document.write("</map>");

document.write("<script language=\"JavaScript\" src=\"http://www.chinadaily.com.cn/js/search.js\"></script>");
































