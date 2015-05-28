<!--
document.write('<div class="parMarker">');
jxurl = 'http://oas.signonsandiego.com/RealMedia/ads/adstream_jx.cgi/';
position = 'x32';
document.write('<SCRIPT TYPE="text/javascript" SRC="' + jxurl + OAS_sitepage + '@' + position + '"><\/SCRIPT>');
//OAS_AD('x32');
function alignAds(type){
	var pageTables = document.getElementsByTagName(type);
 	for(var i=0; i<pageTables.length; i++){
		if((pageTables[i].style.width >= '300px'||pageTables[i].style.width >= '300'||pageTables[i].width>=300||pageTables[i].className.indexOf('bigbox')>-1)&&(pageTables[i].style.height >= '250px'||pageTables[i].style.height >= '250'||pageTables[i].height>=250) && pageTables[i].parentNode.style.position != 'absolute'){
			pageTables[i].style.position = 'static';
			pageTables[i].style.clear = 'right';
			pageTables[i].style.styleFloat = 'right';
			pageTables[i].align = 'right';
			//alert(pageTables[i].outerHTML);
			if(navigator.appName == 'Microsoft Internet Explorer' && pageTables[i].parentNode.outerHTML.indexOf('parMarker')==-1){
				pageTables[i].parentNode.style.clear = 'right';
				pageTables[i].parentNode.style.styleFloat = 'right';
				pageTables[i].parentNode.align = 'right';
			}
			if(navigator.userAgent.indexOf('Gecko')!=-1) pageTables[i].style.cssFloat = 'right';
		}
	}
}
function adRealign(){
  	if(navigator.appName == "Microsoft Internet Explorer"){
		var flashObjs = document.getElementsByTagName('object');
		var adTables = document.getElementsByTagName('table');
		for(var j=0;j<adTables.length;j++){
			if(adTables[j].className == 'bigboxAlign'){
				for(var k=0; k<flashObjs.length; k++){
					if(flashObjs[k].style.width == "300px"||flashObjs[k].style.width == "300"||flashObjs[k].width==300){
						flashObjs[k].align = 'right';
						flashObjs[k].style.styleFloat = 'right';
					}
				}
			}
		}
	}
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
          if (oldonload) {
              oldonload();
          }
          func();
        }
    }
}
addLoadEvent(function(){alignAds('object');alignAds('iframe');alignAds('table');alignAds('img');})
setTimeout("adRealign()",5000);
document.write('</div>');
//-->