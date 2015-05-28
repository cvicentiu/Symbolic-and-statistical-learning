var id_1 = 1;
var id_2 = 2;
var id_3 = 3;

Layer[1] = new LayerSpecs(1,188,101,130,'1','/happenings/|^|Main Page|^||^|2','/articles/aroundtown.asp|^|Around Town|^||^|2','http://comics.com|^|Comics|^||^|2','/dining/|^|Dining|^||^|2','http://movies.yahoo.com/showtimes/showtimes.html?z=37402&r=sim|^|Movies|^||^|2','/articles/onstage.asp|^|On Stage|^||^|2','http://www.quizland.com/cotd.htm|^|Puzzles|^||^|2','http://www.tvguide.com/listings/|^|TV Listings|^||^|2' );
Layer[2] = new LayerSpecs(1,411,101,130,'2','/classifieds/home.asp?section=1|^|General|^||^|2','/classifieds/home.asp?section=2|^|Realty|^||^|2','/classifieds/home.asp?section=3|^|Vehicle|^||^|2','/classifieds/results.asp?all=yes|^|View All|^||^|2','/classifieds/add.asp|^|Add a Classified|^||^|2' );
Layer[3] = new LayerSpecs(1,553,101,130,'3','/business/|^|Business|^||^|2','/church/|^|Church|^||^|2','/livingwell/|^|Living Well|^||^|2','/memories/|^|Memories|^||^|2','/outdoors/|^|Outdoors|^||^|2','/realestate/|^|Real Estate|^||^|2','/student/|^|Student Scene|^||^|2','/travel|^|Travel|^||^|2' );

var idstring = '1|2|3';
idarr = idstring.split("|");
idarr = idarr.reverse();
//j = (Layer[0]) ? 0:1;
for(k=0; k<idarr.length; k++) {
	i = idarr[k]
	//alert(Layer[q])
	if (Layer[i]){
		if((document.all && No3)) { document.write("<SPAN onMouseOver='clearTimeout(timer)' onMouseOut='Hide("+i+")' ID='L"+i+"' STYLE='position:absolute; visibility:hidden; background:"+Layer[i].background+"; top:"+Layer[i].top+"; left:"+Layer[i].left+";'><TABLE CLASS='nav' STYLE='border:solid "+menu_border+" "+border_color+"'>"+Layer[i].info+"</TABLE></SPAN>"); }
		else if((document.layers && No3)) { document.write("<LAYER onMouseOver='clearTimeout(timer)' onMouseOut='Hide("+i+")' ID='L"+i+"' POSITION=ABSOLUTE VISIBILITY=HIDDEN BGCOLOR='"+Layer[i].bgcolor+"' BACKGROUND='"+Layer[i].background+"' TOP="+Layer[i].top+" LEFT="+Layer[i].left+">"+Layer[i].info+"</LAYER>"); }
		else if(NS6) {document.write("<DIV onMouseOver='clearTimeout(timer)' onMouseOut='Hide("+i+")' ID='L"+i+"' STYLE='position:absolute; visibility:hidden; background:"+Layer[i].background+"; top:"+Layer[i].top+"; left:"+Layer[i].left+";'><TABLE CLASS='nav' STYLE='border:solid "+menu_border+" "+border_color+"'>"+Layer[i].info+"</TABLE></DIV>");}
	}
}
