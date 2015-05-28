  // This function displays the ad results.
  // It must be defined above the script that calls show_ads.js
  // to guarantee that it is defined when show_ads.js makes the call-back.
var _google_ads_array = null;
function google_ad_request_done(google_ads) {

    // Proceed only if we have ads to display!
	_google_ads_array = google_ads;
}

  function google_display_ads( start, num ) {

    // Proceed only if we have ads to display!
    if (_google_ads_array.length < 1 )
      return;

    // For text ads, display each ad in turn.
    // In this example, each ad goes in a new row in the table.
    if (_google_ads_array[0].type == 'text') {
 
	  for(i = start; i < num+start; ++i) {
		_visible_url = _google_ads_array[i].visible_url;
		//if(_visible_url.length > 23)
		//{
		_google_ads_array[i].visible_url = _visible_url.substring(0, 20) + ' ' +_visible_url.substring(23);
		//alert(_visible_url.length);
		//}
        document.write(
			"<h4>" +
				"<a href=\"" +  _google_ads_array[i].url + "\" target=\"_blank\">" +
				_google_ads_array[i].line1 + "</a></h4>"+
			"<p>" +
				_google_ads_array[i].line2 + _google_ads_array[i].line3 + "</p>" + 
			"<span style=\"display: block;\">" +
				"<a href=\"" + _google_ads_array[i].url + "\" target=\"_blank\">" + 
				_google_ads_array[i].visible_url +
				"</a></span>"
		); 
      }
    }
  }

  function setup_request() {
    // This script sets the attributes for requesting ads.
    //google_ad_client = "ca-redorbit_js";
	google_ad_client = "ca-pub-5440138744487553";           
    google_ad_output = "js";         
    google_safe     = "medium";
    google_feedback = "on";
	google_ad_type = "text";

    // Note: The following line is for testing purposes only.
    // Remove this line to have ads targeted correctly for your pages.
   // google_page_url = 'http://www.rednova.com/news/';         

  }  

