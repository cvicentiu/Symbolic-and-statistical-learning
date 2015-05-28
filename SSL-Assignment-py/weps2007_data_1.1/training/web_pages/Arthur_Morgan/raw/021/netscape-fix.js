if (document.layers) {
	origWidth = innerWidth;
	origHeight = innerHeight;
	}
function reloadPage() {
	if (innerWidth !=origWidth ||
	innerHeight != origHeight)
	location.reload();
	}
if(document.layers) onresize = reloadPage;