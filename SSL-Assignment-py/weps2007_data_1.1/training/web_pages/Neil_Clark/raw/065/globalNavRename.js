/* ===================================================
	Copyright (c) 2006 Adobe
	Legacy Page Renaming of DIV ID "globalnav"
	$Revision: 1.1 $
==================================================== */
var globalDiv = document.getElementById('globalnav');
for( var x = 0; x < globalDiv.attributes.length; x++ ) {
if( globalDiv.attributes[x].nodeName.toLowerCase() == 'id' ) {
globalDiv.setAttribute('id','foo')
}
}
