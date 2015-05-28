var qcUrlRoot='http://la.indymedia.org/qc';

function qcPopupButton( reason, id, text )
{
	document.write("<form style='display:inline'><input type=button style='font-size:.8em;' onClick=\"qcReport('"+reason+"',"+id+");\" value=\""+text+"\"></form>");
}

function qcReport( reason, id )
{
	window.open(qcUrlRoot+'/report.php?q='+reason+'&id='+id, 'report', 'height=300,width=200,top=30,left=30');
}

function qcFraud( id )
{
	qcPopupButton( 'spam', id, 'fraud' );
}
function qcSpam( id )
{
	qcPopupButton( 'spam', id, 'spam' );
}
function qcDouble( id )
{
	qcPopupButton( 'double', id, 'double post' );
}
function qcAd( id )
{
	qcPopupButton( 'ad', id, 'advertisement' );
}
function qcHate( id )
{
	qcPopupButton( 'hate', id, 'hate/insult' );
}
function qcOfftopic( id )
{
	qcPopupButton( 'offtopic', id, 'offtopic' );
}

function qcBestOf( id )
{
	document.write('&nbsp;&nbsp;');
	qcPopupButton( 'bestof', id, 'bestOfIMC' );
	document.write('&nbsp;&nbsp;');
}

function qcTroll( id )
{
	document.write(' <small><a href="javascript:qcReport( \'troll\', '+id+' )">report troll post</a></small> ');
}
