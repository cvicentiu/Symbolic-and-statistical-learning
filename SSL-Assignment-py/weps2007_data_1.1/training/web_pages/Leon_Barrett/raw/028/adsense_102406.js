function google_ad_request_done(google_ads)
{
  if (google_ads.length < 1 )
    return;

	document.write("<p class=\"headergoogletext\">");
	if (google_info.feedback_url)
  {
		document.write("<a href=\"" + google_info.feedback_url + "\">Ads by Google</a> on " + industry);
	}
	else
	{
		document.write("Ads by Google on " + industry);
	}

  document.write("&dagger;</p>");
  
  if (google_ads[0].type == 'text')
  {
    for(i = 0; i < google_ads.length; ++i)
    {
      document.write("<p class=\"browsegoogletext\"><a href=\"" +  google_ads[i].url + "\">" + google_ads[i].line1 + "</a> " + google_ads[i].line2 + " " + google_ads[i].line3 + "</p>");
  	}
  }
  document.write("<p class=\"footergoogletext\">&dagger;The ads are not affiliated with " + company_name + "</p>");
}