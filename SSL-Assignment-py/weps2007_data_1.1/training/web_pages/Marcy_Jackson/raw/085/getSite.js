<!-- Begin

var ArrayTrackedURLs = new Array();
var i=0;
var expDays = 365;
var yearExpiration = new Date(); 
yearExpiration.setTime(yearExpiration.getTime() + (expDays*24*60*60*1000));

var ImageLeft = new Array();
var ImageMiddle = new Array();
var ImageRight = new Array();
var TabDesc = new Array();

function getCookieVal (offset) {  
	var endstr = document.cookie.indexOf (";", offset);  
	if (endstr == -1)    
	endstr = document.cookie.length;  
	return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {  
	var arg = name + "=";  
	var alen = arg.length;  
	var clen = document.cookie.length;  
	var i = 0;  
	while (i < clen) {    
	var j = i + alen;    
	if (document.cookie.substring(i, j) == arg)      
	return getCookieVal (j);    
	i = document.cookie.indexOf(" ", i) + 1;    
	if (i == 0) break;   
	}  
	return null;
}

function SetCookie (name, value) {  
	var argv = SetCookie.arguments;  
	var argc = SetCookie.arguments.length;  
	var expires = (argc > 2) ? argv[2] : yearExpiration;  
	var path = (argc > 3) ? argv[3] : null;  
	var domain = (argc > 4) ? argv[4] : null;  
	var secure = (argc > 5) ? argv[5] : false;  
	document.cookie = name + "=" + escape (value) + 
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + 
	((path == null) ? "" : ("; path=" + path)) +  
	((domain == null) ? "" : ("; domain=" + domain)) +    
	((secure == true) ? "; secure" : "");
}

ImageLeft['blue'] = 'FRU_L.gif'
ImageLeft['orange'] = 'DA_L.gif'
ImageLeft['green'] = 'GC_L.gif'
ImageLeft['paleblue'] = 'CO_L.gif'
ImageLeft['grey'] = 'CE_L.gif'
ImageLeft['palegreen'] = 'JO_L.gif'
ImageLeft['purple'] = 'LO_L.gif'

ImageMiddle['blue'] = 'FRU_M.gif'
ImageMiddle['blue_on'] = 'FRU_M_ON.gif'
ImageMiddle['orange'] = 'DA_M.gif'
ImageMiddle['orange_on'] = 'DA_M_ON.gif'
ImageMiddle['green'] = 'GC_M.gif'
ImageMiddle['green_on'] = 'GC_M_ON.gif'
ImageMiddle['paleblue'] = 'CO_M.gif'
ImageMiddle['paleblue_on'] = 'CO_M_ON.gif'
ImageMiddle['grey'] = 'CE_M.gif'
ImageMiddle['purple'] = 'LO_M.gif'
ImageMiddle['palegreen'] = 'JO_M.gif'

ImageRight['blue'] = 'FRU_R.gif'
ImageRight['orange'] = 'DA_R.gif'
ImageRight['green'] = 'GC_R.gif'
ImageRight['paleblue'] = 'CO_R.gif'
ImageRight['grey'] = 'CE_R.gif'
ImageRight['purple'] = 'LO_R.gif'
ImageRight['palegreen'] = 'JO_R.gif'

var ArrayFriendsTabURL = new Array();
var ArrayFriendsTabText = new Array();
var ArrayFriendsTab = new Array();
var ArrayFriendsTabDesc = new Array();

var ArrayFriendsMPSTabURL = new Array();
var ArrayFriendsMPSTabText = new Array();
var ArrayFriendsMPSTab = new Array();
var ArrayFriendsMPSTabDesc = new Array();

var ArrayFriendsDofETabURL = new Array();
var ArrayFriendsDofETabText = new Array();
var ArrayFriendsDofETab = new Array();
var ArrayFriendsDofETabDesc = new Array();

var ArrayDatingTabURL = new Array();
var ArrayDatingTabText = new Array();
var ArrayDatingTab = new Array();
var ArrayDatingTabDesc = new Array();

var ArrayGenesTabURL = new Array();
var ArrayGenesTabText = new Array();
var ArrayGenesTab = new Array();
var ArrayGenesTabDesc = new Array();

var ArrayExtrasTabURL = new Array();
var ArrayExtrasTabText = new Array();
var ArrayExtrasTab = new Array();
var ArrayExtrasTabDesc = new Array();

var ArrayCensusTabURL = new Array();
var ArrayCensusTabText = new Array();
var ArrayCensusTab = new Array();
var ArrayCensusTabDesc = new Array();

var ArrayConnTabURL = new Array();
var ArrayConnTabText = new Array();
var ArrayConnTab = new Array();
var ArrayConnTabDesc = new Array();

var ArrayJobsTabURL = new Array();
var ArrayJobsTabText = new Array();
var ArrayJobsTab = new Array();
var ArrayJobsTabDesc = new Array();

var ArrayBuySellTabURL = new Array();
var ArrayBuySellTabText = new Array();
var ArrayBuySellTab = new Array();
var ArrayBuySellTabDesc = new Array();


var ArrayNav = new Array();

//Friends
ArrayTrackedURLs[0] = 'friendsreunited.com/au'; i++ //AU
ArrayTrackedURLs[1] = 'friendsreunited.com.au'; i++ //AU
ArrayTrackedURLs[2] = 'admin2.friendsreunited.co.uk/au'; i++ //AU
ArrayTrackedURLs[3] = 'friendsreunited.co.nz'; i++ //NZ
ArrayTrackedURLs[4] = 'findakiwi.co.nz'; i++ //NZ
ArrayTrackedURLs[5] = 'friendsreunited.com/sa'; i++ //SA
ArrayTrackedURLs[6] = 'friendsreunited.co.uk/sa'; i++ //SA
ArrayTrackedURLs[7] = 'friendsreunited.co.uk'; i++ //UK
ArrayTrackedURLs[8] = 'admin3.friendsreunited.com'; i++ //UK
ArrayTrackedURLs[9] = 'secure.friendsreunited.co.uk'; i++ //UK
ArrayTrackedURLs[10] = 'mpsreunited.co.uk'; i++ // mps UK
//Duke of Edinburgh
ArrayTrackedURLs[11] = 'dofereunited.'; i++ //DU
ArrayTrackedURLs[12] = 'awardreunited.'; i++ //DU
//Dating
ArrayTrackedURLs[20] = 'friendsreuniteddating.com.au'; i++ //AU
ArrayTrackedURLs[21] = 'singlesdirekt.de'; i++ //DE
ArrayTrackedURLs[22] = 'findakiwidate.co.nz'; i++ //NZ
ArrayTrackedURLs[23] = 'friendsreuniteddating.co.uk'; i++ //UK
//Genes
ArrayTrackedURLs[30] = 'ninemsn.genesreunited'; i++ // Nine Msn AU
ArrayTrackedURLs[31] = 'genesreunited.com.au'; i++ //AU
ArrayTrackedURLs[32] = 'genesreunited.com/genesreunited.asp?wci=genesmainau'; i++ //AU
ArrayTrackedURLs[33] = 'genesreunited.com/index_de.htm'; i++ //DE
ArrayTrackedURLs[34] = 'genesreunited.co.nz'; i++ //NZ
ArrayTrackedURLs[35] = 'genesreunited.com/genesreunited.asp?wci=genesmainnz'; i++ //NZ
ArrayTrackedURLs[36] = 'genesreunited.co.za'; i++ //SA
ArrayTrackedURLs[37] = 'genesreunited.com/genesreunited.asp?wci=genesmainsa'; i++ //SA
ArrayTrackedURLs[38] = 'genesreunited.za.com'; i++ //SA
ArrayTrackedURLs[39] = 'genealogy'; i++ // Msn UK
ArrayTrackedURLs[40] = 'genesreunited.co.uk'; i++ // UK
ArrayTrackedURLs[41] = 'genesreunited.com'; i++ // UK
//SchoolFriends
ArrayTrackedURLs[50] = 'schoolfriends.com.au'; i++ //AU
ArrayTrackedURLs[51] = 'schoolfriends.co.nz'; i++ //NZ
ArrayTrackedURLs[52] = 'schoolfriends.com/hk'; i++ //HK
ArrayTrackedURLs[53] = 'schoolfriends.com/my'; i++ //MA
ArrayTrackedURLs[54] = 'schoolfriends.com.sg'; i++ //SG
ArrayTrackedURLs[55] = 'schoolfriends.co.za'; i++ //SA
ArrayTrackedURLs[56] = 'schoolfriends.com/uk'; i++ //UK
ArrayTrackedURLs[57] = 'friendsreunitedasia'; i++ //AU
ArrayTrackedURLs[58] = 'leaguereunited'; i++ //AU
//Others
ArrayTrackedURLs[60] = '212.100.243.31'; i++ //UK
ArrayTrackedURLs[61] = 'friendsreunitedjobs'; i++ //UK
ArrayTrackedURLs[62] = 'topdogjobs'; i++ //UK
ArrayTrackedURLs[63] = '192.168.1.27'; i++ //UK
ArrayTrackedURLs[99] = 'local'; i=100 //Local set to UK

for(a=0; a < i; a++)
{
	if (document.location.href.toLowerCase().indexOf(ArrayTrackedURLs[a]) > 0)
		{
			SetCookie('navCookie', a);
			break;
		}
}
function writeTab(colour, country, URL, text, Desc)
{
var ImageLocation = "http://www.friendsreunited.co.uk/image/grahamtab/";
	return '<td class="between"><img src="'+ ImageLocation + ImageLeft[colour] + '"></td>' +
			'<td class="title" background="'+ ImageLocation + ImageMiddle[colour] + '" >' +
			'<a href="' + URL + '" target="_top"><img src="'+ ImageLocation + text + '.gif"><br>' + Desc + '</a></td>' +
			'<td class="between"><img src="'+ ImageLocation + ImageRight[colour] + '"></td>';
}


function nav() {
	var nav;
	nav = '<style>.between{width:6px;}.title{text-align:center; vertical-align:top; padding-top:6px; width:141px; color:#fff; font-size:10px; } .title a, .title a:visited, .title a:hover{color:#fff; text-decoration:none; font-family:Arial, Helvetica;}.titledark, .titledark a, .titledark a:visited{color:#069}</style><table border="0" cellspacing="0" cellpadding="0"><tr>'
	nav = nav + ArrayNav[ArrayTrackedURLs[a]]
	nav = nav + '</tr></table>'
	document.write(nav);
	//window.status="-"+GetCookie('navCookie')+"-";
}
var FRsite;
if (a.toString()=='100')
{a=GetCookie('navCookie')}

switch (a.toString())
{
case null: case '41':
	FRsite = 'Default'
	break;
case '7': case '8': case '9': case '10': case '23': case '40': case '56': case '60': case '61': case '62': case '63': case '99':
	FRsite = 'UK'
	break;
case '3': case '4': case '22': case '34': case '35': case '51':
	FRsite = 'NZ'
	break;
case '5': case '6': case '36': case '37': case '38': case '55':
	FRsite = 'SA'
	break;
case '0': case '1': case '2': case '20': case '30': case '31': case '32': case '50':
	FRsite = 'AU'
	break;
case '57':  case '52': case '53': case '54':
	FRsite = 'AS'
	break;
case '11': case '12':
	FRsite = 'DU'
	break;
case '21': case '33':
	FRsite = 'DE'
	break;
case '30':
	FRsite = 'ninemsn'
	ArrayNav['ninemsn.genesreunited'] = '';
	break;
case '39':
	FRsite = 'MSN'
	ArrayNav['genealogy'] = '';
	break;
case '58':
	FRsite = 'LR'
	ArrayNav['leaguereunited'] = '';
	break;
default:
	FRsite = 'Default'

}

function hideScript()
{
		changecss('_Only','display','none');
		changecss('_Only','visibility','hidden');

}

function changecss(theClass,element,value) {
	 var cssRules;
	 if (document.all) {cssRules = 'rules';}
	 else if (document.getElementById) {cssRules = 'cssRules';}
	 for (var S = 0; S < document.styleSheets.length; S++){
	  for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
	   if (document.styleSheets[S][cssRules][R].selectorText.toLowerCase().indexOf(theClass.toLowerCase()) > 0) {
		   if(document.styleSheets[S][cssRules][R].selectorText.toLowerCase().indexOf(FRsite.toLowerCase() + '_')==-1)
		   {
			   document.styleSheets[S][cssRules][R].style[element] = value;
			   }
	   }
	  }
	 }	
	}

function changeIntl(theClass,element,value) {
	 var cssRules;
	 if (document.all) {cssRules = 'rules';}
	 else if (document.getElementById) {cssRules = 'cssRules';}
	 for (var S = 0; S < document.styleSheets.length; S++){
	  for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
	   if (document.styleSheets[S][cssRules][R].selectorText == theClass) {
	    document.styleSheets[S][cssRules][R].style[element] = value;
	   }
	  }
	 }	
	}

function selectCountryDDL()
{
	var countryDDL = document.namesearch.countryDDL;
	for (var i = 0; i < countryDDL.options.length; i++)
	{
		if(countryDDL.options[i].value == FRsite)
			{countryDDL.options[i].selected = true;}
	}
}

function selectSite(){
var ddlval;
switch (FRsite) {
		case 'UK' :
		ddlval = 1
		break;
		case 'NZ' :
		ddlval = 2
		break;
		case 'SA' :
		ddlval = 3
		break;
		case 'AU' :
		ddlval = 4
		break;
		case 'AS' :
		ddlval = 7
		break;
		case 'default' :
		ddlval = 1
		break;
	}
	var countryDDL = document.namesearch.site;
	for (var i = 0; i < countryDDL.options.length; i++)
	{
		if(countryDDL.options[i].value == ddlval)
			{countryDDL.options[i].selected = true;}
	}
}

// End -->