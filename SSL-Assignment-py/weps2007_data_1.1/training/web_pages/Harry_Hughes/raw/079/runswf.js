function RunSWF()
{
    document.write('<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,2,0\" ID=kaiser_ticker1 WIDTH=437 HEIGHT=42>\n');
    document.write('<param name=\"movie\" value=\"http://www.kaisernetwork.org/images/kaiser_ticker.swf\" />\n');
	document.write('<PARAM NAME=menu VALUE=false>\n');
	document.write('<PARAM NAME=quality VALUE=autohigh>\n');
	document.write('<PARAM NAME=scale VALUE=exactfit>\n');
	document.write('<PARAM NAME=bgcolor VALUE=#FFFFFF>\n');
	document.write('</object>\n');

}