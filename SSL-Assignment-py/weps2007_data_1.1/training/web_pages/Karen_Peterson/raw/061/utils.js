function popUpQuadrant(id){
	var url = "/DisplayDocument?doc_cd=" + id;
	var sb_width=20;
	var w=778+sb_width;
	var h=569;
	var features="location=no,scrollbars=yes,status=no,toolbar=no,resizable=yes";
	var newWin=null;
	target = "_blank";
	var left = (screen.width - w)/2;
	var top = (screen.height - h)/2;
	var settings = 'width=' + w + ',height=' + h + ',top=' + top + ',left=' + left + ', ' + features;
	newWin = window.open(url, target, settings);
	newWin.focus();	
}


//added temporarily by Chris Vitti  can be removed after 24 April 2004
function openTermsWin(href) {
   window.open(href,'_blank','height=320,width=600,scrollbars=no');
}