//*** Used to show/hide a form element based on the value of another form element
//*** call this with something like
//*** onChange="javascript:showHideOtherText('edit-profile_discipline','edit-foobar','Other...');
//*** where menu is the controlling item, textitem is the item to be shown or hidden, and otherValue is the value of menu which controls
//*** whether showing or hiding takes place
function ShowHideOtherText( menu, textitem, inversetextitem, otherValue )
{
	value = document.getElementById(menu).value;
	
	if (value==otherValue) {
		//hide 
		document.getElementById(textitem).style.display = 'block';
		document.getElementById(inversetextitem).style.display = 'none';
	}
	else {
		// show
		document.getElementById(textitem).style.display = 'none';
		document.getElementById(inversetextitem).style.display = 'block';
	}
}
