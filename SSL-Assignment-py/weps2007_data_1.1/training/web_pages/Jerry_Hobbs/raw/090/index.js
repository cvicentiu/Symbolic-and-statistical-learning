

  





  
  
   


var header_promos = new Array();
header_promos[header_promos.length] = {'channel':'defaultPromo', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'comcast.html', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'explore.html', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'home', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'sports', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'news', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'finance', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'entertainment', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'tv', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'music', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'kids', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'games', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'relationships', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
header_promos[header_promos.length] = {'channel':'photocenter', 'promos': new Array('<a href="http://www.comcast.net/powerboost/?id=headerpromo&link=Powerboost" ><img src="/assets/03/05/01/01/05/asset-52459.jpg" alt="" /></a>')};
  

document.write('<div id="assistant-banner">');
var arrayPromotions_headerPromo = new Array();
var useDefaultHeaderPromo = true;
var defaultPromos_headerPromo;
for(var i=0;i<header_promos.length;i++){
  if(header_promos[i].channel == getFirstFolder()){
    if(header_promos[i].promos.length>0){
      arrayPromotions_headerPromo = header_promos[i].promos;
      useDefaultHeaderPromo = false;
    }
  }
  if(header_promos[i].channel == "defaultPromo")
    defaultPromos_headerPromo = header_promos[i].promos;
}
if(useDefaultHeaderPromo)
  arrayPromotions_headerPromo = defaultPromos_headerPromo;

showRandPromo_headerPromo();
document.write('</div>');
function showRandPromo_headerPromo() {
	var _contentIndex = (Math.round((Math.random()*(arrayPromotions_headerPromo.length-1))));
 	if (arrayPromotions_headerPromo[_contentIndex]) {
  		document.write(arrayPromotions_headerPromo[_contentIndex]);
 	} else if (arrayPromotions_headerPromo.length > 0) { 
  		document.write(arrayPromotions_headerPromo[0]);
 	}
} 
