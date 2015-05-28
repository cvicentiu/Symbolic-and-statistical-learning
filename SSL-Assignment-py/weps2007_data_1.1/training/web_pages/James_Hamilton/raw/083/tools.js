<!--
function docmt() {
document.articleform.url.value = document.location;
document.articleform.title.value = document.title;
document.articleform.submit();
}

 function Content(size){
document.getElementById('Content').style.fontSize=size+"pt";
}
//-->
document.write("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
document.write("<tr>");
document.write("<td><span class=\"v7\"><b>Font</b>");
document.write(" <a href=\"javascript:Content(12)\">Large</a> <a href=\"javascript:Content(11)\">Medium</a> <a href=\"javascript:Content(9)\">Small</a></span></td>");
document.write("</tr>");
document.write("<tr height=\"10\">");
document.write("<td></td>");
document.write("</tr>");
document.write("<tr>"); 
document.write("<td><a href=\"#\" onclick=\"javascript:window.open ('http://app3.chinadaily.com.cn/webdev/PageRcmdToMail.shtml?url='+document.location+'&title='+document.title, 'newwindow', 'height=380, width=480');\">"); 
document.write("<span class=\"v7\"><b>E-Mail</b> This Story</span> </a></td>");
document.write("</tr>");
document.write("<tr height=\"10\">");
document.write("<td></td>");
document.write("</tr>");
document.write("<tr>"); 
document.write("<td><a href=\"javascript:Print()\"><span class=\"v7\"><b>Print</b> Friendly Format</span> </a></td>");
document.write("</tr>");
document.write("<tr height=\"10\">");
document.write("<td></td>");
document.write("</tr>");
document.write("<tr>"); 
document.write("<form name=\"articleform\" action=\"http://bbs.chinadaily.com.cn/articlecmt.shtml\" method=\"post\">");
document.write("<td><a href=\"javascript:docmt()\"><span class=\"v7\"><b>Comment</b> On This Story</span></a></td>");
document.write("<input type=\"hidden\" name=\"url\">");
document.write("<input type=\"hidden\" name=\"title\">");
document.write("</form>");
document.write("</tr>");
document.write("<tr height=\"10\">");
document.write("<td></td>");
document.write("</tr>");
document.write("<tr> ");
document.write("<td><a href=\"#\" onclick=document.execCommand(\"saveAs\")><span class=\"v7\"><b>Save</b> This Story</span></a></td>");
document.write("</tr>");
document.write("<tr>");
document.write("<td height=2></td>");
document.write("</tr>");
document.write("</table>");