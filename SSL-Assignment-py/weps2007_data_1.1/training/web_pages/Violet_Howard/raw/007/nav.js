var aNavVisible = new Array();

function ShowNav(iId){ 
	document.getElementById('divNav_'+iId).style.display=''; 
	aNavVisible[iId] = true;
}

function HideNav(iId) { 
	aNavVisible[iId] = false;
	window.setTimeout('_HideNav(' + iId + ');', 200);
}

function _HideNav(iId){ 
	if ( !aNavVisible[iId] ) 
		document.getElementById('divNav_'+iId).style.display='none'; 
}
