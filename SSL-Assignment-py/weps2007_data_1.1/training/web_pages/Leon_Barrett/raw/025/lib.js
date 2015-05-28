function gotosite(site){if(site !=""){self.location=site;}}

function ViewThumbnail(image_id,window_width,window_height)
{
var width=window_width;
var height=window_height;
if (window_height < 200) window_height=260; else window_height=window_height+50;
if (window_width < 300) window_width=330; else window_width=window_width+50;
PopThumb=window.open("/admin/sitez/thumbnail.cfm?id="+image_id+"&height="+height+"&width="+width,"ThumbWindow","scrollbars,resizable,width="+window_width+",height="+window_height);PopThumb.focus();
}

function HearSound(sound_id,autoplay,loop)
{
PopMusic=window.open("/admin/sitez/music.cfm?id="+sound_id+"&autoplay="+autoplay+"&loop="+loop,"SoundWindow","scrollbars,resizable,width=260,height=80");PopMusic.focus();}

function setCookie(name, value) 
	{var expires = new Date();
	expires.setTime(expires.getTime()+2*60*60*1000); //2 hour
	document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
	}
function readCookie(name)
	{var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;}
function winBRopen(theURL, Name, popW, popH, scroll) 
		{
			var winleft = (screen.width - popW) / 2;
			var winUp = (screen.height - popH) / 2;
			winProp = 'width='+popW+',height='+popH+',left='+winleft+',top='+winUp+',scrollbars='+scroll+',resizable'
			Win = window.open(theURL, Name, winProp)
			if (parseInt(navigator.appVersion) >= 4) { Win.window.focus(); }
		}		
