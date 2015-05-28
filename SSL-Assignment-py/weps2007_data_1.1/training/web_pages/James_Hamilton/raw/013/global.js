
function assocArrayCount(arr) {
	var result = 0;

	for (var i in arr)
		if (arr[i] != null)
			result++;
	
	return result;
}

function doTooltip(e, msg) {
  if ( typeof Tooltip == 'undefined' || !Tooltip.ready ) return;
  Tooltip.show(e, msg);
}

function hideTip() {
  if ( typeof Tooltip == 'undefined' || !Tooltip.ready ) return;
  Tooltip.hide();
}

if (XMLHttpRequest && viewport && document.cookie.search('testjs=1') < 0)
{
	//new session, record window size
	viewport.getWinWidth();
	viewport.getWinHeight();

	if (viewport.width && viewport.height)
	{
		var temp = new XMLHttpRequest();
		temp.open("POST","/ajax-server/windowstats.php");
		temp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		temp.send("w=" + viewport.width + "&h=" + viewport.height);
	}
}

document.cookie = 'testjs=1; path=/';

