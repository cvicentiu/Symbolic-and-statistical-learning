	if( !imageRoot || imageRoot == null ) {
		var imageRoot = "" ;
	}

// Netscape 3.0 compatibility test (for javascript image swapping)
	compat = false;
	if( parseInt( navigator.appVersion ) >= 3 ) {
		compat = true ; 
	}

// cache images for quick swapping
	if( compat ) {

		l_experience = new Image();
		l_experience.src = imageRoot + "/nav/l_experience.gif";
		lo_experience = new Image();
		lo_experience.src = imageRoot + "/nav/lo_experience.gif";
		
		l_professionals = new Image();
		l_professionals.src = imageRoot + "/nav/l_professionals.gif";
		lo_professionals = new Image();
		lo_professionals.src = imageRoot + "/nav/lo_professionals.gif";
		
		l_services = new Image();
		l_services.src = imageRoot + "/nav/l_services.gif";
		lo_services = new Image();
		lo_services.src = imageRoot + "/nav/lo_services.gif";
		
		l_industries = new Image();
		l_industries.src = imageRoot + "/nav/l_industries.gif";
		lo_industries = new Image();
		lo_industries.src = imageRoot + "/nav/lo_industries.gif";
		
		l_locations = new Image();
		l_locations.src = imageRoot + "/nav/l_locations.gif";
		lo_locations = new Image();
		lo_locations.src = imageRoot + "/nav/lo_locations.gif";
						
		l_about = new Image();
		l_about.src = imageRoot + "/nav/l_about.gif";
		lo_about = new Image();
		lo_about.src = imageRoot + "/nav/lo_about.gif";
		
		l_news = new Image();
		l_news.src = imageRoot + "/nav/l_news.gif";
		lo_news = new Image();
		lo_news.src = imageRoot + "/nav/lo_news.gif";
		
		l_events = new Image();
		l_events.src = imageRoot + "/nav/l_events.gif";
		lo_events = new Image();
		lo_events.src = imageRoot + "/nav/lo_events.gif";
		
		l_pubs = new Image();
		l_pubs.src = imageRoot + "/nav/l_pubs.gif";
		lo_pubs = new Image();
		lo_pubs.src = imageRoot + "/nav/lo_pubs.gif";
		
		l_careers = new Image();
		l_careers.src = imageRoot + "/nav/l_careers.gif";
		lo_careers = new Image();
		lo_careers.src = imageRoot + "/nav/lo_careers.gif";
		
		l_alumni = new Image();
		l_alumni.src = imageRoot + "/nav/l_alumni.gif";
		lo_alumni = new Image();
		lo_alumni.src = imageRoot + "/nav/lo_alumni.gif";
		
		l_language = new Image();
		l_language.src = imageRoot + "/l_language.gif";
		lo_language = new Image();
		lo_language.src = imageRoot + "/lo_language.gif";
		
		l_login = new Image();
		l_login.src = imageRoot + "/l_login.gif";
		lo_login = new Image();
		lo_login.src = imageRoot + "/lo_login.gif";
		
		l_logout = new Image();
		l_logout.src = imageRoot + "/l_logout.gif";
		lo_logout = new Image();
		lo_logout.src = imageRoot + "/lo_logout.gif";
		
		l_sitesearch = new Image();
		l_sitesearch.src = imageRoot + "/l_sitesearch.gif";
		lo_sitesearch = new Image();
		lo_sitesearch.src = imageRoot + "/lo_sitesearch.gif";
						
	}
	

// swap images using the cached images

function change(x, y) {
	if( compat ) {
		document.images[x].src=eval(y+'.src'); 
		}
	}








