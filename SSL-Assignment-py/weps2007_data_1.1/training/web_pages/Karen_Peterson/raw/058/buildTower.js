var Towerxhr = new TowerXHR( "/adindex/tower/get_tower.php", "POST", 30 );

var clubs_sections  = new Array("calendar","music","promotions","culture");
var dining_sections = new Array("dining","film","bestof");

function in_array(needle, haystack){
	var found = false;
	var i = 0;
	while (i<haystack.length) 
	{
		if (needle == haystack[i]) {found=true;}
		i++;
	}
	return found;
}

function adindex_tower(sectionbase)
{	
	var section;
		
	if( in_array(sectionbase,clubs_sections) )
	{
		section = 'clubs';		
	}
	else if( in_array(sectionbase,dining_sections) )
	{
		section = 'dining';
	}
	else
	{
		//document.write('no section');
		return;
	}
		
	
		
	onTowerXHRRecv = function () {
		document.getElementById("towerspot").innerHTML=Towerxhr.getResponseText();
	}
	
	Towerxhr.sendAndLoad("sectionbase=" + section);

}


