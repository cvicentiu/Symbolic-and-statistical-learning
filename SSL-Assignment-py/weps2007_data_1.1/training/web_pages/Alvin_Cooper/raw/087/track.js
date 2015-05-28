function detect_click()
{
	
	var match = /redorbit.com([^?]*)\?src=([^&]*)/i.exec(window.location.href);
	if(match)
	{
		page = match[1];
		src = match[2];
		//we now must request a trackpixel to log this event
		track_pixel= new Image(1,1); 
		track_pixel_src="http://www.redorbit.com/track_pixel.php?page="+page+"&src="+src; 
		track_pixel.src=track_pixel_src; 
	}
	return true;
}

document.onclick = detect_click;
function init_tracking()
{
	/*
	
		var a = document.getElementsByTagName('A');
		for (var i=0;i<a.length-1;i++)
			a[i].onclick = detect_click;

	*/
	return true;
}



