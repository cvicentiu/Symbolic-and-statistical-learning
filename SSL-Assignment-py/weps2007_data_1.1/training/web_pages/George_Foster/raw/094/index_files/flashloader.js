                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
function LoadPlayer(id,width,height,movie,quality,bgcolor,flashvars)
{

var clsid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
var codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0";
var PluginSpace="http://www.macromedia.com/go/getflashplayer";

document.write('<div id="inlinePlayer">')
document.write('<object classid=' + clsid + ' codebase=' + codebase + ' width=' + width + ' height=' + height + ' id=' + id + ' >');
document.write('<param name=movie value=' + movie + '>');
document.write('<param name=quality value=' + quality + '>');
document.write('<param name=bgcolor value=' + bgcolor + '>');
document.write('<param name=wmode value=opaque>');
document.write('<param name=flashvars value=' + flashvars + '>');
document.write('<embed src=' + movie + ' quality=' + quality + ' bgcolor=' + bgcolor + ' width=' + width + ' height=' + height);
document.write('name=' + id + ' align="" type="application/x-shockwave-flash" wmode="opaque"');
document.write('pluginspage=' + PluginSpace + ' flashvars=' + flashvars + '>');
document.write('</embed>');
document.write('</object>');
document.write('</div>');
}

function VideoPlayerPopup() {
window.open('/Media/Flash/PopUpPlayer.aspx?moremode=1',  null, 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=663,height=600');
}

function VideoPlayerPopup(videoID) {
window.open('/Media/Flash/PopUpPlayer.aspx?moremode=1&videoid=' + videoID,  null, 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=663,height=600');
}

function popUp(moremode) {

day = new Date();

id = day.getTime();
eval("page" + id + " = window.open('/Media/Flash/PopUpPlayer.aspx?moremode=" + moremode + "',  null, 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=663,height=600');");
}