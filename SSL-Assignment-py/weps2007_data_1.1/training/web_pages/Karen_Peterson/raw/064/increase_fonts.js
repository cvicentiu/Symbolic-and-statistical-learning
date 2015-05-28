<!--
lct_fontsize = 11; 
function ChangeFontSize(size)	{
	document.getElementById('story').style.fontSize = size + "px";
}
function IncreaseFontSize(size)	{
	if(lct_fontsize < 24)
		lct_fontsize = lct_fontsize + size;
	ChangeFontSize(lct_fontsize);
	
}
function DecreaseFontSize(size)	{
	if(lct_fontsize > 8)
		lct_fontsize = lct_fontsize + size;
	ChangeFontSize(lct_fontsize);
}

//-->