if(isNaN(document.axel)) {
	document.axel = Math.random() + "";
	ord = document.axel * 1000000000000000000;
	AdTile = 0;
}

AdTile = AdTile + 1;

if(AdTile == 1) {
	AdDcopt = 'dcopt=ist;';
} else {
	AdDcopt = '';
}

var AdSz = '728x90';
var adSrc = 'http://ad.doubleclick.net/adj/quizilla.nol/generic;section=generic;sz=' + AdSz + ';tile=' + AdTile + ';' + AdDcopt + 'ord=' + ord + '?';

document.write('<script src="' + adSrc + '" type="text/javascript"><\/script>');
