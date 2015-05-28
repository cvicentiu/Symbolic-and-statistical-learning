function ToggleQuote(qtid)
{
	var divQuote;
	var divHide;
	var divShow;
	divQuote = eval("document.getElementById('qt_" + qtid + "')");
	divShow = eval("document.getElementById('qt_" + qtid + "_show')");
	divHide = eval("document.getElementById('qt_" + qtid + "_hide')");

	if (divQuote.style.display == 'block')
	{
		divQuote.style.display = 'none';
		divShow.style.display = 'block';
		divHide.style.display = 'none';
	}
	else
	{
		divQuote.style.display = 'block';
		divShow.style.display = 'none';
		divHide.style.display = 'block';
	}
}
function WriteEmailAddress(mailbox, subject)
{
	document.write("<a href=\"&#109;&#097;&#105;&#108;&#116;&#111;&#058;" + mailbox + "&#64;&#100;&#101;&#118;&#110;&#101;&#119;&#115;&#103;&#114;&#111;&#117;&#112;&#115;&#46;&#110;&#101;&#116;?Subject=" + subject + "\">" + mailbox + "&#64;&#100;&#101;&#118;&#110;&#101;&#119;&#115;&#103;&#114;&#111;&#117;&#112;&#115;&#46;&#110;&#101;&#116;</a>");
}
