function google_ad_request_done(google_ads)
{
	if (google_ads.length < 1 )
		return;
	// company_page, heading_text, company_name variables set by calling perl program, if needed
	// company_page: a switch (true=yes, undefined=no), indicates if the ads are being displayed 
	//		on a company page. if on a company page, a foot note disclaimer is also displayed
	// company_name: a string, company name used in the foot note disclaimer
	// heading_text: a string, descriptive text about the topic of the ads (often SIC description)
	var foot_note_marker= "";
	if (!(typeof(company_page) == "undefined"))
	{
		if (company_page)
		{
			foot_note_marker= "&#134;";
		}
	}
	if (typeof(company_name) == "undefined")
	{
		company_name = "";
	}
	
	var ad_heading1 = "Ads by Google";
	var ad_heading2 = "";
	var header_align= "right";
	if (!(typeof(heading_text) == "undefined"))
	{
		if (heading_text)
		{
			ad_heading2 = " on " + heading_text;
			header_align= "left";
		}
	}
	
	document.write("<p class=\"headergoogletext\">");
	document.write("<div class='headergoogletext' style='width:100%; text-align:"+header_align+"'>");
	if (google_info.feedback_url)
	{
		document.write("<a href=\"" + google_info.feedback_url + "\">" + ad_heading1 + "</a>");
	}
	else
	{
		document.write(ad_heading1);
	}
	document.write(ad_heading2 + foot_note_marker);
	document.write("</div>");
	document.write("</p>");
	
	if (google_ads[0].type == 'text')
	{
		for(i = 0; i < google_ads.length; ++i)
		{
			document.write("<p class=\"browsegoogletext\"><a href=\"" +  google_ads[i].url + "\">" + google_ads[i].line1 + "</a> " + google_ads[i].line2 + " " + google_ads[i].line3 + "</p>");
		}
	}
	if (!(typeof(company_page) == "undefined"))
	{
		document.write("<p class=\"footergoogletext\">", foot_note_marker, "The ads are not affiliated with " + company_name + "</p>");
	}
}
