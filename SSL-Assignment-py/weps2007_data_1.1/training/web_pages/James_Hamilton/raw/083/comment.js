<!--
document.write("<div align=\"center\" >");
document.write("<img src=\"http://www.chinadaily.com.cn/image_e/dot_print.gif\" width=\"15\" height=\"11\"> <a href=\"javascript:Print()\" ><span class=\"arial9\"><strong>Print This Article</strong></span></a> &nbsp;&nbsp;<img src=\"http://www.chinadaily.com.cn/image_e/dot_email.gif\" width=\"15\" height=\"11\"> <span class=\"arial9\"><a href=\"#\" onclick=\"javascript:window.open ('http://app3.chinadaily.com.cn/webdev/PageRcmdToMail.shtml?url='+document.location+'&title='+document.title, 'newwindow', 'height=380, width=480');\"><strong>E-mail</strong></a></span>&nbsp;&nbsp;<span class=\"arial9\"><a href=\"#\" onclick=\"javascript:window.open ('http://app3.chinadaily.com.cn/webdev/ToMarketing.shtml?url='+document.location+'&title='+document.title, 'newwindow', 'height=380, width=480');\"><strong> </strong></a></span>");
document.write("</div><br><br>");
document.write("<div style=\"border:1px solid #c2ceda; padding:10px; width:640px; background-color:#FFF7E3;\">");
document.write("<form name=\"articleformend\" action=\"http://comment.chinadaily.com.cn/articlecmt.shtml\">");
document.write("<a href=\"javascript:docmtend()\" class=\"a-blue-3\" style=\"text-decoration:none; font-size:0.75em;\"><strong>Comments of the article</strong></a>&nbsp;<span  style=\"color:#990000\" class=\"arial9\">(total </span><span style=\"color:#990000\" class=\"arial9\" id=\"show_count\"></span><span style=\"color:#990000\" class=\"arial9\">)</span>");
document.write("<input type=\"hidden\" name=\"url\">");
document.write("<input type=\"hidden\" name=\"title\">");
document.write("</form>");																																																				document.write("</div>");
document.write("<br></div>");


function docmtend() {
document.articleformend.url.value = document.location;
document.articleformend.title.value = document.title;
document.articleformend.submit();
}

function Content(size){
document.getElementById('Content').style.fontSize=size+"pt";
}

function InitAjax()
{
 var ajax=false; 
 try { 
  ajax = new ActiveXObject("Msxml2.XMLHTTP"); 
 } catch (e) { 
  try { 
   ajax = new ActiveXObject("Microsoft.XMLHTTP"); 
  } catch (E) { 
   ajax = false; 
  } 
 }
 if (!ajax && typeof XMLHttpRequest!='undefined') { 
  ajax = new XMLHttpRequest(); 
 } 
 return ajax;
}

function getNum(newsID)
{
	if (typeof(newsID) == 'undefined')
	{
	return false;
	}
	var subfolder = Math.floor(newsID/100000);
	var url = "http://www.chinadaily.com.cn/ArticleComment/count/" + subfolder+ "/" + newsID + ".txt";
	var show = document.getElementById("show_count"); 
	var ajax = InitAjax();
	ajax.open("GET", url, true); 
	ajax.onreadystatechange = function() { 
	//alert(ajax.status);
	if (ajax.readyState == 4 && ajax.status == 200) { 
		show.innerHTML = ajax.responseText;
	}else{
		show.innerHTML = 0;
	}
}
ajax.send(null); 
}
function getArticleID(urlstr)
{

	var star = urlstr.lastIndexOf("content_")+8;
	var end = urlstr.lastIndexOf(".htm");
	var TmpArticleId = urlstr.substring(star,end);

	if (TmpArticleId.indexOf("_") == -1) { 
		articleId = TmpArticleId; 
	} else { 
		var TmpEnd = TmpArticleId.lastIndexOf("_");
		 
		articleId = TmpArticleId.substr(0,TmpEnd);
	} 
	return articleId;
}
var ArticleUrl = document.location.href;
var articleId = getArticleID(ArticleUrl);

getNum(articleId);
//-->
