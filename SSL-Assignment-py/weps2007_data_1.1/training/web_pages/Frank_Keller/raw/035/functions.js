/**
* Lxmenu v1.02
* Copyright 2005 Georg Lorenz
* DHTML Menu Module for Mambo Open Source
* Mambo Open Source is Free Software
* Released under GNU/GPL License: http://www.gnu.org/copyleft/gpl.html
**/

function popupWindow(url,width,height,toolbar,location,status,menubar,scrollbars)
{
	var options = 'toolbar='+toolbar+',location='+location+',status='+status+',menubar='+menubar+',scrollbars='+scrollbars+',resizable=yes';
	if(width > 0 && height > 0)
	{
		var centered;
		x = (screen.availWidth - width) / 2;
		y = (screen.availHeight - height) / 2;
		centered ='width=' + width + ',height=' + height + ',left=' + x + ',top=' + y + ',' + options;
	}else
	{
		centered = options;
	}	
	var popup = window.open(url, '_blank', centered);
    if (!popup.opener) popup.opener = self;
	popup.focus();
}
